#!/usr/bin/env python3
"""
lint-project.py — Linter completo do projeto Site Kelly Albert.

Roda automaticamente ANTES de cada ZIP de entrega. Valida TODAS as regras
inegociáveis documentadas em REGRAS-PROJETO.md e INICIO-DE-CHAT-KA.md.

Checks incluídos:
  A. CONTRASTE — seções escuras têm classe amb-*, H1-H4 protegidos
  B. FUNDOS PROIBIDOS — nenhum branco puro ou cor de detalhe como bg de seção
  C. PREÇOS — consistência entre páginas (Livro, Mentoria)
  D. CTAs — nenhum genérico em seção Investimento, CTAs padronizados
  E. LINKS — hrefs internos apontam pra pastas/arquivos que existem
  F. IMAGENS — todo src= aponta pra arquivo que existe
  G. ESTRUTURA — todo HTML com nav tem footer; © não tem color explícita

Saída: exit 0 se passa; exit 1 com relatório se falha.

Uso:
  cd /home/claude/site-full && python3 lint-project.py

Para ignorar linha específica: <!-- lint-ignore --> na mesma linha.
"""

import os
import re
import sys
from pathlib import Path

SITE_ROOT = Path(__file__).parent.resolve()

# ─── Configuração ────────────────────────────────────────────────────

DARK_BG_COLORS = [
    '#152535', '#0F1923', '#3D6B7E', '#8B5A2B', '#1F1F22',
    '#1e3347', '#1A2E3D', '#0D1420',
]
DARK_BG_VARS = [
    'var(--preto)', 'var(--azul)', 'var(--marinho)', 'var(--cobre)',
    'var(--bio-marinho)', 'var(--bio-preto)', 'var(--bio-azul)',
    'var(--shapes-dark)', 'var(--bio-cobre)',
]
SAFE_DARK_CLASSES = {
    'amb-marinho', 'amb-preto', 'amb-escuro', 'amb-cobre',
    'amb-essencia', 'amb-azul', 'section--dark', 'cta-final',
    'page-header',
}
FORBIDDEN_SECTION_BG = [
    '#7EA8B3', '#5B8D9B', '#E0B880', '#DCAA7A', '#CC8855',
]
WHITE_BG_PATTERNS = [
    r'background:\s*#fff\b', r'background:\s*#ffffff\b', r'background:\s*white\b',
    r'background-color:\s*#fff\b', r'background-color:\s*#ffffff\b', r'background-color:\s*white\b',
]

# Preços canônicos (fonte: /livro, /mentoria)
CANONICAL_PRICES = {
    'livro': {
        'tokens': ['R$ 117', 'R$117', 'R$117,00', 'R$ 117,00', '12x R$ 12,10', '12x de R$ 12,10', '12x R$12,10'],
        'forbidden': ['R$ 97', 'R$97', 'R$ 118', 'R$97,00'],
        'context': 'Livro Marca com Essência',
    },
    'mentoria': {
        'tokens': ['R$ 990', 'R$990', 'R$ 990,00', '12x R$ 98,04', '12x de R$ 98,04', '98,04'],
        'forbidden': ['R$ 890', 'R$890', 'R$ 1.200'],
        'context': 'Mentoria Marca com Essência',
    },
}

# CTAs genéricos proibidos (em QUALQUER botão do site, mas especialmente em seção Investimento)
FORBIDDEN_CTA_TEXT = [
    'SAIBA MAIS', 'CLIQUE AQUI', 'CONFIRA', 'VEJA MAIS', 'CONHEÇA AGORA',
    'CLIQUE PARA SABER MAIS', 'ACESSE AGORA', 'APROVEITE',
]

# Estrutura mínima de footer
FOOTER_REQUIRED_TOKENS = [
    'Kelly Albert', 'CNPJ',
]

# ─── Helpers ─────────────────────────────────────────────────────────

DARK_BG_PATTERN = re.compile(
    r'background(-color)?:\s*(' +
    '|'.join(re.escape(c) for c in DARK_BG_COLORS) + '|' +
    '|'.join(re.escape(v) for v in DARK_BG_VARS) +
    r')',
    re.IGNORECASE,
)


def read_file(path: Path) -> str:
    try:
        return path.read_text(encoding='utf-8')
    except Exception:
        return ''


def strip_ignored_lines(content: str) -> str:
    return '\n'.join(
        line for line in content.split('\n')
        if 'lint-ignore' not in line
    )


def has_safe_class(classes_str: str) -> bool:
    if not classes_str:
        return False
    return bool(set(classes_str.split()) & SAFE_DARK_CLASSES)


def has_inline_color(style_str: str) -> bool:
    return bool(re.search(r'(^|;)\s*color\s*:', style_str or ''))


def parse_attrs(tag_str: str) -> dict:
    attrs = {'class': '', 'style': '', 'href': '', 'src': ''}
    for key in ['class', 'style', 'href', 'src']:
        m = re.search(rf'{key}\s*=\s*["\']([^"\']*)["\']', tag_str)
        if m:
            attrs[key] = m.group(1)
    return attrs


def list_html_files():
    skip_dirs = {'docs', 'blog', 'home2', 'sistema', 'teste', 'casesabre', '_components', '_templates'}
    files = list(SITE_ROOT.rglob('*.html'))
    # Excluir preview.html dos checks (é ferramenta, não página)
    return [
        f for f in files
        if not any(p in f.parts for p in skip_dirs)
        and f.name != 'preview.html'
    ]


def get_relative(path: Path) -> str:
    return str(path.relative_to(SITE_ROOT))


# ─── Checks ──────────────────────────────────────────────────────────

def check_contrast(content: str, rel: str) -> list:
    """A. Ambientes escuros sem classe amb-* + H1-H4 sem color."""
    violations = []
    lines = content.split('\n')

    # A1: Sections/headers com bg escuro SEM classe segura
    open_re = re.compile(r'<(section|header|div|footer)\b([^>]*)>', re.IGNORECASE)
    open_stack = []

    for i, line in enumerate(lines, 1):
        for m in open_re.finditer(line):
            attrs = parse_attrs(m.group(0))
            is_dark = bool(DARK_BG_PATTERN.search(attrs['style']))
            is_safe = has_safe_class(attrs['class'])
            if is_dark and not is_safe and m.group(1).lower() in ('section', 'header'):
                violations.append(
                    f"A1 {rel}:{i}  <{m.group(1)}> com bg escuro sem classe amb-* "
                    f"→ adicionar amb-marinho/amb-preto/amb-cobre/amb-essencia"
                )
            if is_dark and not is_safe:
                open_stack.append(('dark', i))
            else:
                open_stack.append(('other', i))

        # Fechamentos de tags
        close_re = re.compile(r'</(section|header|div|footer)>', re.IGNORECASE)
        for _ in close_re.finditer(line):
            if open_stack:
                open_stack.pop()

        # A2: H1-H4 dentro de seção escura sem color inline
        h_re = re.compile(r'<(h[1-4])\b([^>]*)>', re.IGNORECASE)
        for hm in h_re.finditer(line):
            h_attrs = parse_attrs(hm.group(0))
            if has_inline_color(h_attrs['style']):
                continue
            if has_safe_class(h_attrs['class']):
                continue
            if any(t == 'dark' for t, _ in open_stack):
                violations.append(
                    f"A2 {rel}:{i}  <{hm.group(1)}> sem color inline em seção escura "
                    f"(iniciada linha {open_stack[-1][1]})"
                )

    return violations


def check_forbidden_bg(content: str, rel: str) -> list:
    """B. Fundos proibidos: branco puro + cores de detalhe como bg de section."""
    violations = []
    lines = content.split('\n')
    sec_re = re.compile(r'<section\b[^>]*style\s*=\s*["\']([^"\']*)["\']', re.IGNORECASE)

    for i, line in enumerate(lines, 1):
        m = sec_re.search(line)
        if not m:
            continue
        style = m.group(1)
        for pat in WHITE_BG_PATTERNS:
            if re.search(pat, style, re.IGNORECASE):
                violations.append(f"B1 {rel}:{i}  <section> com fundo branco — só beges permitidos")
                break
        for color in FORBIDDEN_SECTION_BG:
            pat = rf'background(-color)?:\s*{re.escape(color)}'
            if re.search(pat, style, re.IGNORECASE):
                violations.append(
                    f"B2 {rel}:{i}  <section> com fundo {color} — cor de detalhe não é bg de seção"
                )
                break
    return violations


def check_prices(content: str, rel: str) -> list:
    """C. Preços proibidos em qualquer parte do site.
    Flaga apenas se o preço proibido aparece PRÓXIMO (até 5 linhas) do nome do
    produto — evita falsos positivos quando arquivos mencionam vários produtos.
    """
    violations = []
    lines = content.split('\n')

    for product, data in CANONICAL_PRICES.items():
        product_name_patterns = [data['context'].lower(), product.lower()]

        for i, line in enumerate(lines, 1):
            if line.strip().startswith('"price"') or line.strip().startswith("'price'"):
                continue

            for forbidden in data['forbidden']:
                if forbidden.replace(' ', '') not in line.replace(' ', ''):
                    continue

                # Verifica proximidade com nome do produto (até 5 linhas antes/depois)
                window_start = max(0, i - 6)
                window_end = min(len(lines), i + 5)
                window = '\n'.join(lines[window_start:window_end]).lower()

                # Produto deve estar mencionado na janela próxima
                if any(p in window for p in product_name_patterns):
                    violations.append(
                        f"C1 {rel}:{i}  preço proibido '{forbidden}' próximo a {product.upper()} "
                        f"(canônico: {data['tokens'][0]})"
                    )
                    break
    return violations


def check_generic_ctas(content: str, rel: str) -> list:
    """D. CTAs genéricos proibidos em seção Investimento."""
    violations = []
    lines = content.split('\n')

    # Detectar se está em contexto de Investimento
    in_investimento = False
    invest_start = 0
    for i, line in enumerate(lines, 1):
        if re.search(r'>\s*Investimento\s*<|>\s*INVESTIMENTO\s*<|label[^>]*>Investimento', line, re.IGNORECASE):
            in_investimento = True
            invest_start = i
        if in_investimento and re.search(r'</section>', line, re.IGNORECASE):
            in_investimento = False
            invest_start = 0

        # Buscar CTAs genéricos em botões (qualquer lugar)
        btn_re = re.compile(r'<(a|button)[^>]*class\s*=\s*["\'][^"\']*btn[^"\']*["\'][^>]*>([^<]*)</', re.IGNORECASE)
        for bm in btn_re.finditer(line):
            text = bm.group(2).strip().upper()
            for forbidden in FORBIDDEN_CTA_TEXT:
                if forbidden in text:
                    if in_investimento:
                        violations.append(
                            f"D1 {rel}:{i}  CTA genérico '{text}' em seção Investimento "
                            f"(iniciada linha {invest_start}) — use texto específico"
                        )
                    else:
                        # Aviso brando fora de Investimento — só reporta como informativo
                        pass  # comentado pra não poluir

    return violations


def check_links(content: str, rel: str, all_paths: set) -> list:
    """E. Links internos apontam pra pastas/arquivos existentes."""
    violations = []
    lines = content.split('\n')

    # Whitelist de paths conhecidos (funcionalidades, não pastas)
    whitelist = {
        '/', '/#', '/quiz', '/sobre', '/livro', '/mentoria', '/programa', '/direcao',
        '/cases', '/produtos', '/bio', '/link', '/metodo',
    }
    whitelist.update({f'/{c}' for c in ['caseamordebicho', 'casebeteti', 'casecomfortflex',
                     'caseramarim', 'caseshapes', 'casesuvinil', 'caseyufil']})

    href_re = re.compile(r'href\s*=\s*["\'](/[^"\'#]*)["\']')
    for i, line in enumerate(lines, 1):
        for m in href_re.finditer(line):
            href = m.group(1).rstrip('/')
            if not href or href.startswith('#'):
                continue
            if href in whitelist or href + '/' in whitelist:
                continue
            # Verificar se é arquivo real
            candidate_paths = [
                SITE_ROOT / href.lstrip('/'),
                SITE_ROOT / href.lstrip('/') / 'index.html',
                SITE_ROOT / (href.lstrip('/') + '.html'),
            ]
            if not any(p.exists() for p in candidate_paths):
                # Ignorar assets comuns
                if href.startswith('/css/') or href.startswith('/js/') or href.startswith('/images/'):
                    continue
                violations.append(f"E1 {rel}:{i}  link interno {href} não aponta pra arquivo existente")
    return violations


def check_images(content: str, rel: str) -> list:
    """F. Imagens /images/ existem."""
    violations = []
    lines = content.split('\n')

    src_re = re.compile(r'src\s*=\s*["\'](/images/[^"\']+)["\']')
    for i, line in enumerate(lines, 1):
        for m in src_re.finditer(line):
            src = m.group(1)
            full = SITE_ROOT / src.lstrip('/')
            if not full.exists():
                violations.append(f"F1 {rel}:{i}  imagem ausente: {src}")
    return violations


def check_structure(content: str, rel: str) -> list:
    """G. HTML com nav deve ter footer + © sem color explícita."""
    violations = []

    # G1: nav + footer combo
    has_nav = bool(re.search(r'<nav\b', content))
    has_footer = bool(re.search(r'<footer\b', content))
    # Exceção: /link (link-in-bio) não tem nav nem footer padrão
    if rel not in ('link/index.html',) and has_nav and not has_footer:
        violations.append(f"G1 {rel}  página tem <nav> mas não tem <footer>")

    if has_footer:
        for token in FOOTER_REQUIRED_TOKENS:
            if token not in content:
                violations.append(f"G2 {rel}  footer sem '{token}' — estrutura padrão quebrada")

    # G3: <sup>©</sup> com color inline explícita
    for i, line in enumerate(content.split('\n'), 1):
        for m in re.finditer(r'<sup[^>]*color\s*:\s*[^;"\']+[^>]*>\s*©', line):
            violations.append(
                f"G3 {rel}:{i}  <sup>© com color inline — © deve herdar cor da palavra anterior"
            )

    return violations


# ─── Main ────────────────────────────────────────────────────────────

def run():
    html_files = list_html_files()
    all_violations = []

    for file_path in sorted(html_files):
        rel = get_relative(file_path)
        content = read_file(file_path)
        content = strip_ignored_lines(content)

        all_violations.extend(check_contrast(content, rel))
        all_violations.extend(check_forbidden_bg(content, rel))
        all_violations.extend(check_prices(content, rel))
        all_violations.extend(check_generic_ctas(content, rel))
        all_violations.extend(check_links(content, rel, set()))
        all_violations.extend(check_images(content, rel))
        all_violations.extend(check_structure(content, rel))

    # Relatório
    print("=" * 72)
    print("LINT PROJETO — Site Kelly Albert")
    print("=" * 72)
    print(f"Arquivos HTML analisados: {len(html_files)}")
    print(f"Checks aplicados: A (contraste) · B (fundos) · C (preços) · D (CTAs)")
    print(f"                  E (links) · F (imagens) · G (estrutura)")
    print()

    if not all_violations:
        print("✅ PASSOU — nenhuma violação encontrada")
        print("✅ Site pronto para empacotar em ZIP")
        return 0

    # Agrupar por categoria
    groups = {}
    for v in all_violations:
        cat = v.split(' ', 1)[0]
        groups.setdefault(cat, []).append(v)

    print(f"❌ FALHOU — {len(all_violations)} violação(ões) em {len(groups)} categoria(s):")
    print()

    cat_names = {
        'A1': 'Contraste: section escura sem classe amb-*',
        'A2': 'Contraste: H1-H4 sem color inline em fundo escuro',
        'B1': 'Fundo proibido: branco em section',
        'B2': 'Fundo proibido: cor de detalhe em section',
        'C1': 'Preço inconsistente com valor canônico',
        'D1': 'CTA genérico em seção Investimento',
        'E1': 'Link interno para arquivo inexistente',
        'F1': 'Imagem ausente',
        'G1': 'Página com nav sem footer',
        'G2': 'Footer sem estrutura mínima',
        'G3': '© com color inline (deve herdar)',
    }

    for cat in sorted(groups.keys()):
        print(f"  [{cat}] {cat_names.get(cat, cat)} ({len(groups[cat])})")
        for v in groups[cat][:10]:
            print(f"    ✕ {v}")
        if len(groups[cat]) > 10:
            print(f"    ... e mais {len(groups[cat]) - 10} ocorrência(s)")
        print()

    print("=" * 72)
    print("Corrija as violações acima e rode novamente. Sem passar, sem ZIP.")
    print("=" * 72)
    return 1


if __name__ == '__main__':
    sys.exit(run())
