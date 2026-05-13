# INÍCIO DE CHAT · KA | Inteligência para Marcas

> **LEIA ESTE ARQUIVO PRIMEIRO em toda conversa nova**, antes de qualquer ação.

---

## 1. Quem é a cliente

**Kelly Albert** — fundadora do KA | Inteligência para Marcas, escritório de branding especializado em posicionamento e reposicionamento de marcas pessoais e empresariais.

- Criadora do **Método Marca com Essência©**
- Site em produção: **kellyalbert.com.br** (também acessível via kellyalbert.netlify.app)
- CNPJ: 15.096.943/0001-37
- WhatsApp CTA: +55 51 99316-3333
- Localizada em Gravataí/RS · comunica em português gaúcho culto, via voz-para-texto
- Especialista em Branding, Marketing e Comunicação. Hoje atua só com Branding. Quer IA aliada ao Branding.

Parceiros recorrentes:
- **Gabi Lucato** (VM Rocks Design) — identidade visual
- **Larissa Barreto Adad** (Shapes) — cliente
- **Carol** (Amor de Bicho) — cliente

Audiência dela: "**Os Protagonistas**" — fundadores que querem clareza estratégica.

---

## 2. Como funciona o trabalho neste projeto

### 2.1 Entrega

- Trabalho é **sempre entregue em ZIP** do site inteiro (para drag-and-drop manual no Netlify)
- Netlify Site ID: `df8969af-b599-4016-b259-c5e72617b355`
- Deploy MCP falha com erro de fetch — use manual sempre
- **Nunca gere documentos Markdown separados** a menos que Kelly peça explicitamente

### 2.2 Workflow obrigatório em toda sessão

1. Leia este arquivo na íntegra
2. Se Kelly não tiver anexado um ZIP atualizado, **peça pra ela anexar**
3. Leia `DECISOES.md` e `PENDENCIAS.md` do ZIP (raiz)
4. Leia `REGRAS-PROJETO.md` antes de qualquer alteração no site
5. Só depois aja

### 2.3 Comando de empacotamento

```bash
cd /home/claude/site-full && zip -rq /mnt/user-data/outputs/kellyalbert-site-vXX.zip . -x "*.DS_Store" "docs/*" "programa/hero-video.mp4"
```

### 2.4 Validação obrigatória antes do ZIP

```bash
cd /home/claude/site-full && python3 lint-project.py
```

Se `exit != 0`, **não gere o ZIP.** Corrija antes.

---

## 3. Estado atual do projeto (versão v63)

### 3.1 Páginas existentes

| URL | Estado |
|-----|--------|
| `/` (home) | Completa · hero marinho · 4 produtos · depoimentos |
| `/sobre` | Completa · hero preto · bio Kelly · método · 4 produtos iguais à home · "De dentro para fora" e "Método" em 1 coluna |
| `/bio` | Igual /sobre (link in bio) |
| `/livro` | Completa · hero caramelo · vídeo hero · 4 pilares 11 capítulos · "Para quem é" 1 coluna · R$ 117 · Hotmart pay.hotmart.com/I102266210W?off=uqkiq5lb |
| `/mentoria` | Completa · hero marinho · 8 encontros · Maio 2026 · R$ 990 |
| `/programa` | Completa · hero cobre `#8B5A2B` · vídeo reuniões |
| `/direcao` | Completa · hero marinho (mobile corrigido) · todas seções 1 coluna · investimento R$ 1.200 padrão /livro · "3 encontros, 1 por semana, sob demanda" |
| `/cases` | Completa · hero marinho centralizado · 7 cards com segmento em itálico acima do parágrafo |
| `/case{suvinil,amordebicho,shapes,yufil,beteti,ramarim,comfortflex}` | Todos com hero padronizado (v62-v63) |
| `/quiz` | Completa · MailerLite group 183324004183967092 |
| `/produtos` | Completa · resumo dos 4 produtos |

### 3.2 Padrão dos heros de case (estabelecido em v62-v63)

**Estrutura unificada em todos os 7 cases:**

- Fundo: `#f8f7f2` (Papel · mesmo do nav)
- Textura: pontos diagonais `rgba(0,0,0,.04)` tamanho 26px offset 13px (DIFERENTE da seção abaixo que usa grid 32x32 padrão)
- Tipo de entrega: Playfair regular 400 (NÃO itálico), cor `#000`, formato `Case | [O que foi feito]`
- Linha decorativa preta sólida 36px, margin `.4rem auto .8rem`
- Nome da marca: Playfair bold 3.8rem, preto, line-height 1
- Descrição: Montserrat 500, `#1A1A1A`, line-height 1.75, max-width 640px
- Tudo centralizado

**Títulos de cada case (formato "Case | X"):**
- Suvinil → `Case | Aula de Branding`
- Amor de Bicho → `Case | Posicionamento e Identidade Visual`
- Shapes → `Case | Posicionamento e Identidade Visual`
- YUFIL → `Case | Posicionamento Estratégico`
- Fernando Beteti → `Case | Posicionamento e Identidade Visual`
- Ramarim → `Case | Posicionamento Estratégico`
- ComfortFlex → `Case | Posicionamento Estratégico`

### 3.3 Ficha técnica padronizada (v63)

Todos os 7 cases usam:

```
<div padding:2rem;background:var(--bg-2);border-radius:16px>
  <span class="label">Ficha Técnica</span>
  <div class="line"></div>
  Cliente: X · Segmento
  Escopo: Y
  Estratégia e linguagem: KA | Inteligência para Marcas (Kelly Albert)
  Design e identidade visual: VM Rocks Design (Gabi Lucato)
```

### 3.4 Navegação no fim dos cases

Todos os 7 cases terminam com botão único "Ver todos os cases":
- Pílula com outline preto 1.5px
- Padding .95rem 2.4rem
- Uppercase letter-spacing .25em
- Centralizado, separado por linha sutil no topo
- Sem navegação "Anterior / Próximo" (removida na v62)

### 3.5 Linha "Criado por KA..." acima da primeira imagem

- **Suvinil e Beteti**: não têm (removido em v63)
- **Outros 5 cases**: têm "Criado por KA + VM Rocks Design" por causa da co-autoria

---

## 4. Arquivos críticos

| Arquivo | Uso |
|---------|-----|
| `/home/claude/site-full/INICIO-DE-CHAT-KA.md` | ESTE arquivo |
| `/home/claude/site-full/DECISOES.md` | Log de decisões |
| `/home/claude/site-full/PENDENCIAS.md` | Pendências abertas |
| `/home/claude/site-full/REGRAS-PROJETO.md` | Regras operacionais de código |
| `/home/claude/site-full/lint-project.py` | Linter de contraste + padrões |
| `/mnt/user-data/outputs/KA-Identidade-Visual-Completa.md` | Guia visual definitivo (para chat de emails) |

---

## 5. Princípios que NUNCA devem ser quebrados

1. **Marker dourado** (`hl-gold` com `background-image: linear-gradient`) está PROIBIDO. Destaque = cor + peso 700 · fim.
2. **Sublinhados** em qualquer link ou texto — PROIBIDOS (text-decoration:none !important global).
3. **© sempre herda a cor da palavra anterior** (`<sup style="font-size:.55em;">©</sup>`).
4. **Pitanga `#ED4E2C`** (Ramarim) NÃO é usada como destaque — Kelly rejeitou. Usa-se só preto, bege, cobre sutil, dourado.
5. **Nav sempre `#f8f7f2`** (Papel) em todas as páginas.
6. **Botões sempre pílula** (border-radius 100px), uppercase, letter-spacing, peso 700.
7. **Seções com fundo escuro** precisam de classe `amb-*`.
8. **Rodar lint-project.py antes de empacotar o ZIP** — sem exceção.
9. **Nunca enquadrar cliente de case negativamente** — sempre mostrar como KA ajudou a comunicar o que a marca é.
10. **Tipografia fixa:** Playfair Display (títulos/quotes), Montserrat (corpo/UI), Outfit 700 (só preços grandes tipo R$ 1.200).

---

## 5.5 MailerLite — captação de leads e disparo de campanhas

### Lead form na `/mentoria/`
- Bloqueia o preço até preencher (nome, email, WhatsApp)
- Backend duplo: **Netlify Forms** (backup) + **MailerLite** via função `netlify/functions/subscribe.js`
- Lead entra no grupo configurado em `MAILERLITE_GROUP_ID` (env var no Netlify)
- Próximo passo planejado: criar uma automação no painel MailerLite (trigger "joins group") com os 5 emails de [`MENTORIA-EMAIL-FLOW.md`](./MENTORIA-EMAIL-FLOW.md)

### Pipeline de campanhas (chat → markdown → draft)

**Quando Kelly disser "cria uma campanha sobre X":**

1. Criar `campaigns/AAAA-MM-DD-slug.md` com frontmatter (`subject`, `preheader`, opcional `groups`, `name`)
2. Corpo em markdown padrão — o script converte pra HTML
3. Commit + push pra `main`
4. **GitHub Action** dispara automaticamente
5. Em ~2min aparece **draft no MailerLite** — Kelly revisa e envia/agenda

**Arquivos do pipeline:**
- `scripts/create-campaigns.mjs` — script Node que chama MailerLite API
- `.github/workflows/mailerlite-campaigns.yml` — Action que executa
- `campaigns/README.md` — doc completa do formato

**Limitação importante:** API do MailerLite **NÃO** suporta criar automações — só listar. Para sequências disparadas por evento (welcome flow, nurture), Kelly cria no painel visual.

**Secrets configurados no GitHub Actions:**
`MAILERLITE_API_KEY`, `MAILERLITE_FROM_EMAIL`, `MAILERLITE_FROM_NAME`, `MAILERLITE_DEFAULT_GROUP_ID`

### Próxima turma da Mentoria
- **Início:** 16 de junho de 2026 (terça)
- **Fim:** 09 de julho de 2026 (quinta)
- **Encontros:** 16, 18, 23, 25, 30 de junho + 02, 07, 09 de julho
- **Horário:** terças e quintas, 19h30 às 21h30 (Brasília)
- **Preço:** R$ 990 à vista ou 10x R$ 118,98 (Hotmart `pay.hotmart.com/J105727850F`)

---

## 6. Contexto de conversa

Kelly fala em português gaúcho culto via voice-to-text — frases podem vir com erros de digitação e pontuação ausente. Compreensão é por intenção.

Ela valida texto antes de implementar. Quando pede algo específico, implementa literalmente — sem improviso criativo.

Prefere entregas concisas:
- ZIP + 2-4 previews
- Descrição enxuta do que mudou
- Sem excesso de meta-comentário

Se tiver dúvida, pergunta antes de fazer. Melhor uma pergunta a mais do que um retrabalho.

---

**Versão deste documento:** v3 · Abril 2026 · Estado do site: v63
