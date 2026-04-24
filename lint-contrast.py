#!/usr/bin/env python3
"""
lint-contrast.py — Linter de contraste para o site Kelly Albert.

Roda automaticamente ANTES de cada ZIP de entrega. Valida que nenhuma
regra inegociável do SISTEMA-VISUAL-SITE-KA seja violada.

Regras checadas:
  1. Ambiente escuro (amb-marinho, amb-preto, amb-escuro, amb-cobre,
     amb-essencia, amb-azul, seções com background escuro inline ou
     section--dark, cta-final, page-header escuro) NÃO PODE conter
     texto sem cor clara.
  2. Nenhum <section> pode ter background #fff, white, ou branco puro.
  3. Cores de detalhe (Mostarda, Caramelo, Caramelo Claro, Azul Claro,
     Azul Médio) não podem ser background de seção.

Saída: exit 0 se passa; exit 1 com relatório se falha.

Uso:
  cd /home/claude/site-full && python3 lint-contrast.py

Para ignorar uma violação específica (uso raro), coloque o comentário
HTML <!-- lint-ignore-contrast --> na mesma linha do elemento.
"""

import os
import re
import sys
from pathlib import Path

SITE_ROOT = Path(__file__).parent.resolve()

# ─── Definições do sistema visual ───────────────────────────────────

DARK_BG_COLORS = [
    '#152535', '#0F1923', '#3D6B7E', '#8B5A2B', '#1F1F22',
    '#1e3347', '#1A2E3D', '#0D1420',
]
DARK_BG_VARS = [
    'var(--preto)', 'var(--azul)', 'var(--marinho)', 'var(--cobre)',
    'var(--bio-marinho)', 'var(--bio-preto)', 'var(--bio-azul)',
    'var(--shapes-dark)', 'var(--bio-cobre)',
]

# Classes que garantem a proteção de contraste automática via style.css global.
# Elementos dentro dessas classes são considerados SEGUROS por herança CSS.
SAFE_DARK_CLASSES = {
    'amb-marinho', 'amb-preto', 'amb-escuro', 'amb-cobre',
    'amb-essencia', 'amb-azul', 'section--dark', 'cta-final',
    'page-header',
}

# Cores de detalhe que NUNCA podem ser fundo de seção inteira.
FORBIDDEN_SECTION_BG = [
    '#7EA8B3',  # Azul Claro
    '#5B8D9B',  # Azul Médio
    '#E0B880',  # Mostarda
    '#DCAA7A',  # Caramelo Claro
    '#CC8855',  # Caramelo
]

# Fundos brancos proibidos em <section>
WHITE_BG_PATTERNS = [
    r'background:\s*#fff\b',
    r'background:\s*#ffffff\b',
    r'background:\s*white\b',
    r'background-color:\s*#fff\b',
    r'background-color:\s*#ffffff\b',
    r'background-color:\s*white\b',
]

DARK_BG_PATTERN = re.compile(
    r'background(-color)?:\s*(' +
    '|'.join(re.escape(c) for c in DARK_BG_COLORS) + '|' +
    '|'.join(re.escape(v) for v in DARK_BG_VARS) +
    r')',
    re.IGNORECASE,
)

# Tags que carregam texto e precisam de cor visível
TEXT_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'li', 'a']


# ─── Helpers ─────────────────────────────────────────────────────────

def has_safe_class(classes_str: str) -> bool:
    """Retorna True se a string de classes contém alguma classe segura."""
    if not classes_str:
        return False
    classes = set(classes_str.split())
    return bool(classes & SAFE_DARK_CLASSES)


def has_inline_color(style_str: str) -> bool:
    """Retorna True se o atributo style tem uma propriedade color definida."""
    if not style_str:
        return False
    return bool(re.search(r'(^|;)\s*color\s*:', style_str))


def parse_attrs(tag_str: str) -> dict:
    """Extrai atributos class e style de uma string de tag de abertura."""
    attrs = {'class': '', 'style': ''}
    cls_match = re.search(r'class\s*=\s*["\']([^"\']*)["\']', tag_str)
    if cls_match:
        attrs['class'] = cls_match.group(1)
    style_match = re.search(r'style\s*=\s*["\']([^"\']*)["\']', tag_str)
    if style_match:
        attrs['style'] = style_match.group(1)
    return attrs


def find_sections_with_dark_bg(content: str):
    """
    Retorna lista de (linha_abertura, linha_fechamento, classes_da_abertura, style_da_abertura)
    para cada section/header/div que tenha fundo escuro inline.

    Usa um stack simples pra casar abertura/fechamento.
    """
    lines = content.split('\n')
    results = []

    # Procura por tags de abertura com bg escuro inline
    open_re = re.compile(
        r'<(section|header|div|footer)\b([^>]*)>',
        re.IGNORECASE,
    )

    # Stack de elementos abertos que têm bg escuro
    for i, line in enumerate(lines, start=1):
        for m in open_re.finditer(line):
            tag_full = m.group(0)
            attrs = parse_attrs(tag_full)
            style = attrs['style']
            classes = attrs['class']

            # Se já tem classe segura, ignoramos (protegido pelo CSS global)
            if has_safe_class(classes):
                continue

            # Checa se tem bg escuro inline
            if DARK_BG_PATTERN.search(style):
                # Registra início
                results.append({
                    'start_line': i,
                    'tag': m.group(1),
                    'classes': classes,
                    'style': style,
                })

    return results


def check_dark_bg_has_safe_class(content: str, rel_path: str):
    """
    Regra 1: toda section/header com bg escuro inline deve usar classe segura
    OU ter todos os textos dentro com cor clara explícita.
    """
    violations = []
    sections = find_sections_with_dark_bg(content)

    for sec in sections:
        start = sec['start_line']
        violations.append(
            f"{rel_path}:{start}  seção <{sec['tag']}> com bg escuro SEM classe de ambiente "
            f"(use amb-marinho, amb-preto, amb-cobre, amb-essencia, etc.)"
        )

    return violations


def check_no_white_sections(content: str, rel_path: str):
    """Regra 2: nenhuma <section> pode ter bg branco."""
    violations = []
    lines = content.split('\n')

    section_open_re = re.compile(
        r'<section\b[^>]*style\s*=\s*["\']([^"\']*)["\']',
        re.IGNORECASE,
    )

    for i, line in enumerate(lines, start=1):
        m = section_open_re.search(line)
        if not m:
            continue
        style = m.group(1)
        for pat in WHITE_BG_PATTERNS:
            if re.search(pat, style, re.IGNORECASE):
                violations.append(
                    f"{rel_path}:{i}  <section> com fundo branco — só beges permitidos"
                )
                break

    return violations


def check_no_detail_as_bg(content: str, rel_path: str):
    """
    Regra 3: cores de detalhe (mostarda, caramelo, azul claro/médio) não
    podem ser fundo de <section>.
    """
    violations = []
    lines = content.split('\n')

    section_open_re = re.compile(
        r'<section\b[^>]*style\s*=\s*["\']([^"\']*)["\']',
        re.IGNORECASE,
    )

    for i, line in enumerate(lines, start=1):
        m = section_open_re.search(line)
        if not m:
            continue
        style = m.group(1)
        for color in FORBIDDEN_SECTION_BG:
            pat = rf'background(-color)?:\s*{re.escape(color)}'
            if re.search(pat, style, re.IGNORECASE):
                violations.append(
                    f"{rel_path}:{i}  <section> com fundo {color} — cor de detalhe, não pode ser fundo de seção"
                )
                break

    return violations


def check_h1_without_class_or_color_in_dark(content: str, rel_path: str):
    """
    Regra 4 (defesa em profundidade): procura h1/h2/h3/h4 dentro de seções
    com fundo escuro inline e que não tenham color inline nem classe que
    faça parte do sistema amb-*. Cobre casos onde o cara simplesmente colou
    um style com bg escuro sem classe.
    """
    violations = []
    lines = content.split('\n')

    in_dark_section = False
    dark_start_line = 0
    safe_section = False
    depth = 0

    open_sec_re = re.compile(r'<(section|header|div|footer)\b([^>]*)>', re.IGNORECASE)
    close_re = re.compile(r'</(section|header|div|footer)>', re.IGNORECASE)
    h_re = re.compile(r'<(h[1-4])\b([^>]*)>', re.IGNORECASE)

    # Estratégia: varre linha a linha, detecta início de ambiente escuro
    # (section|header com bg escuro inline E sem classe segura), e reporta
    # h1-h4 SEM color inline dentro.
    open_stack = []  # empilha (tipo_de_ambiente, linha_inicio)

    for i, line in enumerate(lines, start=1):
        for m in open_sec_re.finditer(line):
            attrs = parse_attrs(m.group(0))
            is_dark = bool(DARK_BG_PATTERN.search(attrs['style']))
            is_safe = has_safe_class(attrs['class'])
            if is_dark and not is_safe:
                open_stack.append(('dark', i))
            else:
                open_stack.append(('light-or-safe', i))

        # h tags
        for hm in h_re.finditer(line):
            h_attrs = parse_attrs(hm.group(0))
            if has_inline_color(h_attrs['style']):
                continue  # protegido
            if has_safe_class(h_attrs['class']):
                continue  # protegido
            # Verifica se está dentro de uma seção dark sem proteção
            if open_stack and any(t == 'dark' for t, _ in open_stack):
                violations.append(
                    f"{rel_path}:{i}  <{hm.group(1)}> sem color inline dentro de seção escura "
                    f"(iniciada em linha {open_stack[-1][1]})"
                )

        # Fechamento
        for _ in close_re.finditer(line):
            if open_stack:
                open_stack.pop()

    return violations


# ─── Main ────────────────────────────────────────────────────────────

def run_lint() -> int:
    all_violations = []
    ignored_count = 0

    html_files = list(SITE_ROOT.rglob('*.html'))
    # Ignora arquivos em pastas obsoletas
    skip_dirs = {'docs', 'blog', 'home2', 'sistema', 'teste', 'casesabre'}
    html_files = [
        f for f in html_files
        if not any(p in f.parts for p in skip_dirs)
    ]

    for file_path in sorted(html_files):
        rel = str(file_path.relative_to(SITE_ROOT))
        try:
            content = file_path.read_text(encoding='utf-8')
        except Exception as e:
            print(f"Erro lendo {rel}: {e}")
            continue

        # Remove linhas com <!-- lint-ignore-contrast --> pra contagem
        content_for_check = '\n'.join(
            line for line in content.split('\n')
            if 'lint-ignore-contrast' not in line
        )
        ignored_count += content.count('lint-ignore-contrast')

        all_violations.extend(check_dark_bg_has_safe_class(content_for_check, rel))
        all_violations.extend(check_no_white_sections(content_for_check, rel))
        all_violations.extend(check_no_detail_as_bg(content_for_check, rel))
        all_violations.extend(check_h1_without_class_or_color_in_dark(content_for_check, rel))

    # Relatório
    print("=" * 70)
    print("LINT DE CONTRASTE — Site Kelly Albert")
    print("=" * 70)
    print(f"Arquivos HTML analisados: {len(html_files)}")
    if ignored_count:
        print(f"Linhas ignoradas (lint-ignore-contrast): {ignored_count}")

    if not all_violations:
        print("\n✅ PASSOU — nenhuma violação de contraste encontrada")
        print("✅ Site pronto para empacotar em ZIP")
        return 0

    print(f"\n❌ FALHOU — {len(all_violations)} violação(ões) encontrada(s):\n")
    for v in all_violations:
        print(f"  ✕ {v}")

    print("\n" + "=" * 70)
    print("Como corrigir:")
    print("  1. Seção com bg escuro → adicionar classe amb-* correspondente")
    print("     Ex: <section class=\"section amb-marinho\" style=\"background:#152535;\">")
    print("  2. H1/H2 dentro de bg escuro → adicionar color inline explícita")
    print("     Ex: <h1 style=\"color:#EDE8DD;\">...</h1>")
    print("  3. Fundo branco em seção → trocar por um bege (#F7F3EA, #EDE8DD...)")
    print("  4. Cor de detalhe como fundo → usar só em bordas/labels/highlights")
    print("=" * 70)
    return 1


if __name__ == '__main__':
    sys.exit(run_lint())
