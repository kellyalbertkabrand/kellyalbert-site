# KA | Inteligência para Marcas
## Guia Definitivo da Identidade Visual e Tom de Voz

> **Uso deste documento:** este arquivo consolida toda a identidade visual, tom de voz, produtos e padrões do site kellyalbert.com.br. Use-o como referência única para criar qualquer peça em nome da KA — e-mails, newsletters, propostas, apresentações, landing pages, posts. Nada que for produzido fora desses padrões representa a marca.

---

## 1. Sobre a marca

### 1.1 Identificação

- **Nome:** KA | Inteligência para Marcas
- **Fundadora:** Kelly Albert
- **Domínio:** kellyalbert.com.br (também kellyalbert.netlify.app)
- **CNPJ:** 15.096.943/0001-37
- **Instagram:** @kellyalbert_ka
- **WhatsApp CTA:** +55 51 99316-3333
- **Método proprietário:** Método Marca com Essência© (© é obrigatório em todas as menções)
- **Público:** "Os Protagonistas" — fundadores de marcas pessoais e empresariais que querem clareza estratégica
- **Escritório baseado em:** Gravataí / RS, Brasil

### 1.2 Posicionamento

A KA é um escritório de branding especializado em **posicionamento e reposicionamento** de marcas — pessoais e empresariais. O trabalho é conduzido a partir da **essência dos fundadores**, não de modelos genéricos.

**Frase-manifesto:** *"Essência sem direção se dispersa. Direção sem essência se esvazia."*

**Sub-frase recorrente:** *"Sua marca não precisa de mais ideias. Precisa de clareza e direção contínua."*

### 1.3 Promessa

- Revelar a essência da marca (que já existe, mas ainda não foi nomeada)
- Traduzir essa essência em posicionamento, linguagem verbal e identidade visual
- Integrar Inteligência Artificial como aliada do processo — não substituta

---

## 2. Paleta de Cores (HEX)

### 2.1 Ambientes (fundos de seção — NUNCA usar como acento)

| Nome | HEX | Uso principal |
|------|-----|---------------|
| **Papel** | `#F8F7F2` | Cabeçalho (nav) em todas as páginas |
| **Bege Leve** | `#F7F3EA` | Fundo claro geral · seções de conteúdo |
| **Bege Papel** | `#EDE8DD` | Fundo claro secundário |
| **Bege Quente** | `#E8DFCE` | Seção "Como funciona" da /direcao |
| **Cobre** | `#8B5A2B` | Hero /programa · card Programa · destaque quente |
| **Caramelo** | `#C47830` | Hero /livro · card Livro · energia |
| **Azul Essência** | `#3D6B7E` | Hero /mentoria · card Mentoria · reflexão |
| **Azul Marinho** | `#152535` | Hero da home · hero /direcao · hero /cases · autoridade |
| **Preto** | `#0F1923` | Hero /sobre · footer · seção Kelly · rigor |

### 2.2 Acentos (NUNCA fundo de seção — só em botões, pills, highlights, ícones)

| Nome | HEX | Uso |
|------|-----|-----|
| **Dourado** | `#B89B6A` | Botão CTA principal, labels de destaque |
| **Dourado Claro** | `#D4C49E` | Palavras grifadas em fundo escuro |
| **Mostarda** | `#E0B880` | Botões sobre cobre/marinho · accents em fundo escuro |
| **Verde Diagnóstico** | `#4ADE80` | Badge "Gratuito" pulsante |
| **Verde WhatsApp** | `#25D366` | Botão "Falar no WhatsApp" |
| **Verde Botão** | `#2E8B57` | Botão "Quero Meu Livro / Acompanhamento" com pulso verde |

### 2.3 Neutros (texto)

| Nome | HEX | Uso |
|------|-----|-----|
| `t-900` | `#1A1A1A` | Títulos sobre fundo claro |
| `t-800` | `#2A2A2A` | Subtítulos sobre fundo claro |
| `t-700` | `#3D3D3D` | Corpo de texto sobre fundo claro |
| `t-600` | `#5A5A5A` | Texto secundário · legendas |
| `t-500` | `#777777` | Texto terciário · segmentos em cursiva · rodapé |
| `Creme` | `#EDE8DD` | Texto sobre fundo escuro (preferido ao branco puro) |
| `Branco` | `#FFFFFF` | Botões com fundo colorido (Diagnóstico, WhatsApp) |

---

## 3. Tipografia

### 3.1 Famílias

| Fonte | Google Fonts | Uso | Pesos |
|-------|--------------|-----|-------|
| **Playfair Display** | Sim | H1, H2, H3, quotes, assinatura Kelly, números romanos de etapa | 400, 500, 600, 700 (regular + itálico) |
| **Montserrat** | Sim | Corpo de texto, botões, menu, labels pill, formulários | 200, 300, 400, 500, 600, 700 (regular + itálico) |
| **Outfit** | Sim | Valores monetários em destaque (R$ 117, R$ 1.200) | 700 apenas |

**Importe assim (no `<head>`):**

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@700&display=swap" rel="stylesheet">
```

### 3.2 Hierarquia de tamanhos

| Elemento | Fonte | Tamanho | Peso | Notas |
|----------|-------|---------|------|-------|
| H1 (hero) | Playfair | 2.6–4.2rem | 600 | line-height 1.15 |
| H2 (seção) | Playfair | 1.8–2.4rem | 600 | line-height 1.25 |
| H3 (subseção) | Playfair | 1.3–1.5rem | 600 | line-height 1.3 |
| Corpo (p) | Montserrat | 0.92–1rem | 400 | line-height 1.75 |
| Quote | Playfair itálico | 1.0–1.5rem | 500 | |
| Label pill | Montserrat | 0.6–0.68rem | 700 | uppercase · letter-spacing .22em |
| Botão | Montserrat | 0.72–0.78rem | 700 | uppercase · letter-spacing .12em |
| Preço grande | Outfit | 4.5rem | 700 | line-height 1 |
| R$ + centavos | Outfit 1.2rem + Playfair 1.2rem | 700 + 500 | | |

### 3.3 Regras de estilo

- **Sem sublinhados.** Nada de `text-decoration:underline` em links ou palavras.
- **Sem marker dourado** sob palavras. Destaque é feito só com cor + peso 700.
- **© sempre herda a cor da palavra anterior.** Formatação: `<sup style="font-size:.55em;">©</sup>`
- **Itálico** é permitido em: nomes de métodos ("Marca com Essência"), quotes, subtítulos de case (segmentos), cursiva de énfase curta.

---

## 4. Botões

Todos os botões seguem o mesmo formato: **pílula** (border-radius 100px), uppercase, letter-spacing, peso 700, sombra sutil.

### 4.1 Tipos aprovados

| Nome | Fundo | Texto | Uso |
|------|-------|-------|-----|
| **CTA Diagnóstico** | `#B89B6A` (dourado) | `#FFF` | CTA principal em todas as páginas — "Fazer Diagnóstico Gratuito" |
| **WhatsApp** | `#25D366` (verde Whats) | `#FFF` | Sempre lado a lado com Diagnóstico |
| **Quero Meu Livro/Acompanhamento** | `#2E8B57` (verde pulso) | `#FFF` | Botão de compra/conversão com animação pulsante |
| **Saiba Mais (card claro)** | `#FFF` | `#C47830` | Dentro de card caramelo |
| **Saiba Mais (card escuro)** | `#E0B880` (mostarda) | `#8B5A2B` ou `#152535` | Dentro de card cobre/marinho |
| **Card Mentoria Saiba Mais** | `#FFF` | `#3D6B7E` | Dentro de card azul essência |

### 4.2 CSS base do botão

```css
.btn {
  padding: 1rem 2rem;
  border-radius: 100px;
  font-family: 'Montserrat', sans-serif;
  font-size: .75rem;
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;
  text-decoration: none;
  transition: all .3s ease;
  border: none;
  cursor: pointer;
}
.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0,0,0,.15);
}
```

### 4.3 Animação "pulso verde" (usado em Quero Meu Livro / Acompanhamento)

```css
@keyframes btnPulseGreen {
  0%, 100% { box-shadow: 0 4px 20px rgba(46,139,87,.3), 0 0 0 0 rgba(46,139,87,.4); }
  50% { box-shadow: 0 4px 20px rgba(46,139,87,.5), 0 0 0 14px rgba(46,139,87,0); }
}
```

### 4.4 Regras de proibição

- NUNCA botão verde sobre fundo verde
- NUNCA botão dourado sobre fundo dourado/bege
- NUNCA dois CTAs primários lado a lado (sempre Diagnóstico + WhatsApp, ou CTA + secundário)
- NUNCA botão retangular ou sem uppercase

---

## 5. Componentes Visuais

### 5.1 Label em pill (identificador de seção)

```html
<span style="background:rgba(139,90,43,.12);color:#8B5A2B;padding:.35rem 1rem;
  border-radius:100px;text-transform:uppercase;font-size:.6rem;
  letter-spacing:.25em;font-weight:700;">ECOSSISTEMA KA</span>
```

Em fundo escuro: usar `color:#D4C49E` e `background:rgba(224,184,128,.15)`.

### 5.2 Linha decorativa (entre H1 e subtítulo)

```html
<div style="display:flex;align-items:center;justify-content:center;gap:.6rem;margin:1.2rem auto;">
  <div style="width:30px;height:1px;background:linear-gradient(to right,transparent,#B89B6A);"></div>
  <svg width="6" height="6"><circle cx="3" cy="3" r="2.5" fill="#B89B6A" opacity=".5"/></svg>
  <div style="width:30px;height:1px;background:linear-gradient(to left,transparent,#B89B6A);"></div>
</div>
```

### 5.3 Anatomia de uma seção (padrão)

Toda seção do site segue:

1. **Label pill** uppercase (ex.: "ECOSSISTEMA KA")
2. **H2** com palavra-chave destacada em cor dourada (peso 700, sem marker)
3. **Linha decorativa** centralizada
4. **Parágrafo de apoio** (opcional, 1–3 linhas)
5. **Conteúdo principal** (cards / grid / imagem / quote / CTA)

Padding vertical padrão: **5–7rem** em seções, **8–11rem** em heros. Max-width do container: **1100–1120px**.

### 5.4 Estampas de textura (classes CSS)

Usadas como fundo sutil em seções escuras. **Uma estampa por seção.**

| Classe | Padrão | Uso |
|--------|--------|-----|
| `est-grid` | Quadriculado 32px | Iceberg, info |
| `est-dots` | Pontos 22px | Hero principal |
| `est-diamond` | Losangos 45° | Seções de reflexão |
| `est-verticais` | Listras verticais | Método |

---

## 6. Produtos (Ecossistema Marca com Essência©)

A KA tem **4 produtos** em momentos diferentes de maturidade do cliente. Cada um com **cor-assinatura** distinta.

### 6.1 Livro Marca com Essência©
- **Preço:** R$ 117,00 · ou 12x R$ 12,10 · **De R$ 217,00 por R$ 117,00**
- **Cor-assinatura:** Caramelo `#C47830` (card) / Cobre mais profundo para o fundo hero
- **Formato:** Livro físico (entregue) + versão online
- **Estrutura:** 126 páginas, 4 Pilares, 11 capítulos
- **Diferencial:** Agentes de IA no ChatGPT (Cap. 04–11), áudios no Spotify, exercícios no Google Docs
- **CTA:** "Quero Meu Livro"
- **Link de compra:** `https://pay.hotmart.com/I102266210W?off=uqkiq5lb`
- **Entregável final:** Brand Book completo da marca do cliente
- **Para quem é:** fundadores que querem fazer o processo com autonomia

### 6.2 Mentoria Marca com Essência©
- **Preço:** R$ 990,00 · ou 12x R$ 98,04
- **Cor-assinatura:** Azul Essência `#3D6B7E`
- **Formato:** 8 encontros ao vivo em grupo
- **Calendário:** Maio 2026 · Terças e Quintas · 19h30–21h30
- **Inclui:** Livro físico + digital, acompanhamento, devolutivas individuais, exercícios entre encontros
- **CTA:** "Garantir Minha Vaga"
- **Fale:** WhatsApp +55 51 99316-3333
- **Para quem é:** quem quer o livro + acompanhamento estratégico da Kelly

### 6.3 Programa Marca com Essência©
- **Preço:** consultoria (sob demanda)
- **Cor-assinatura:** Cobre `#8B5A2B`
- **Formato:** projeto completo de posicionamento 1:1
- **3 Planos:** Plano 01 Essência · Plano 02 Clareza · Plano 03 Direção (este é o "Mais Escolhido")
- **Inclui:** Revelação de essência, base estratégica, identidade verbal, plano de comunicação, Agentes de IA exclusivos da marca
- **CTAs por plano:** "Fale com a gente" (WhatsApp)
- **Conduzido por:** Kelly Albert + equipe + parceiros (Gabi Lucato / VM Rocks Design cuida da identidade visual)

### 6.4 Direção com Essência©
- **Preço:** R$ 1.200,00 · ou 5x R$ 288,72 · R$ 1.200 no Pix
- **Cor-assinatura:** Azul Marinho `#1A2E3D`
- **Formato:** **3 encontros · 1 por semana · sob demanda (não é mensal)**
- **Inclui:** 1h por encontro, gravação, resumo estratégico em PDF, revisão em cada encontro seguinte
- **CTA:** "Quero Meu Acompanhamento"
- **Para quem é:** empresários e marcas que já têm posicionamento e precisam de clareza contínua em Branding + Comunicação + Marketing

---

## 7. Cases (referências de transformação)

Todos os cases seguem um **padrão editorial**: nunca enquadram o cliente negativamente. Mostram como a KA ajudou a marca a comunicar o que ela já é.

### 7.1 Lista ativa

| Case | Segmento (itálico, acima do texto) | O que foi feito |
|------|-------------------------------------|-----------------|
| Suvinil × KA | *Indústria de Tintas* | Aula de Branding |
| Amor de Bicho | *Saúde Animal — Hospital Veterinário* | Posicionamento Estratégico + Identidade Visual |
| Shapes | *Design Autoral em Impressão 3D* | Posicionamento Estratégico + Identidade Visual |
| YUFIL | *Acessórios de Praia* | Posicionamento Estratégico |
| Fernando Beteti | *Jornalismo · Marca Pessoal* | Posicionamento Estratégico + Identidade Visual |
| Ramarim | *Calçados Femininos* | Posicionamento Estratégico |
| ComfortFlex | *Calçados Femininos com Foco em Conforto* | Posicionamento Estratégico |

### 7.2 Destaques específicos para uso em comunicação

- **Amor de Bicho:** "O primeiro Hospital Veterinário de Gravataí/RS, com 20+ anos de história"
- **Fernando Beteti:** 2,3 milhões de seguidores · 30 anos de profissão · de "O seu Repórter Saúde" para "O seu Jornalista de Confiança"
- **Outros clientes que já passaram pela KA:** McDonald's, Sebrae, Atacadão (Grupo Carrefour), Band FM, Usaflex, Suvinil, Grupo Ramarim

---

## 8. Páginas do Site — Mapa

| URL | Hero | Ambiente |
|-----|------|----------|
| `/` (home) | Azul Marinho + est-dots | Iceberg, O problema |
| `/sobre` | Preto + bg-grid-dark | Kelly bio, Método, Ecossistema |
| `/bio` | Redireciona para /sobre | |
| `/livro` | Caramelo `#C47830` + bg-grid-warm + vídeo do livro | |
| `/mentoria` | Azul Marinho (diamond) | |
| `/programa` | Cobre `#8B5A2B` (grid) | |
| `/direcao` | Azul Marinho (diamond) | |
| `/cases` | Azul Marinho (diamond) | Lista dos 7 cases |
| `/cases*` (individuais) | Paleta do cliente | Cada case em sua cor própria |
| `/produtos` | Bege escuro | Resumo dos 4 produtos |

---

## 9. Tom de Voz

A Kelly escreve em **português gaúcho culto** — direto, elegante, sem jargões publicitários.

### 9.1 Como escrevemos

- **Frases diretas.** "Sua marca não precisa de mais ideias. Precisa de clareza."
- **Pergunta seguida de afirmação curta.** Cria ritmo.
- **Citações de Kelly** sempre em itálico com aspas. Ex.: *"Branding não é luxo de marca grande. É o que faz o pequeno sobreviver e crescer."*
- **Vocabulário recorrente:** essência · posicionamento · clareza · direção · revelação · autoimagem · protagonismo · lembrada, desejada, escolhida
- **Evitar:** "incrível", "potencializar sua marca", "alavancar", "transformar vidas", "desbloquear seu potencial", jargão de coach/curso online.
- **Tratamento:** tu ou você, conforme o canal. Em e-mail formal, "você". Em stories, "tu" funciona.

### 9.2 Frases-assinatura da marca

- "Essência sem direção se dispersa. Direção sem essência se esvazia."
- "Sua marca tem Potência. Vamos revelar."
- "Porque essência conecta e posicionamento faz vender."
- "A maior parte de uma marca é invisível. E é justamente essa parte que precisa ser pensada, sentida e gerida com mais intenção."
- "Branding é o lugar que a marca ocupa na cabeça do cliente. É como ele pensa e sente sobre a sua marca."
- "Quando o empresário começa pelo logo, ele decora a fachada de uma casa sem alicerce."

---

## 10. Template de E-mail (Newsletter)

Este é o padrão aprovado para todos os e-mails enviados em nome da KA.

### 10.1 Estrutura

```
[HERO] — Fundo Azul Essência (#3D6B7E) com SVG sparkles dourados
  Badge pill (ex.: "DIAGNÓSTICO DE MARCA")
  H1 em Playfair Display 600 · cor creme
  Subtítulo em Montserrat 400 · creme 80%

[CORPO] — Fundo #FAF8F4 (mais quente que F7F3EA)
  Imagem ou ilustração embutida como base64
  Parágrafos em Montserrat 400 · cor t-700
  Palavras-chave em dourado B89B6A com peso 700
  Citações em Playfair itálico, com borda lateral azul (#3D6B7E)
  Botão dourado #B89B6A com animação btnPulse
  
[COMPARATIVO] (opcional) — tabela lado a lado "Antes / Depois"

[ASSINATURA]
  Foto circular Kelly (64px diâmetro)
  "Kelly Albert" em Playfair itálico 500
  "Fundadora · KA | Inteligência para Marcas" em Montserrat 400, menor

[FOOTER]
  Outer bg #F2F0EB · borda top dourada
  Link site · Kelly Albert® 2026 · CNPJ 15.096.943/0001-37
  Link unsubscribe
```

### 10.2 Colors HEX para e-mail (clientes de e-mail suportam limitadamente)

- **Background outer:** `#F2F0EB`
- **Background inner:** `#FAF8F4`
- **Hero bg:** `#3D6B7E`
- **Hero text:** `#EDE8DD`
- **Dourado principal:** `#B89B6A`
- **Azul citação:** `#3D6B7E`
- **Corpo texto:** `#3D3D3D`
- **Links:** `#3D6B7E` (sem underline)

### 10.3 Fontes para e-mail

Clientes de e-mail (Gmail, Outlook, Apple Mail) suportam Google Fonts parcialmente. Use **fallbacks seguros**:

```css
font-family: 'Playfair Display', 'Georgia', serif;   /* títulos */
font-family: 'Montserrat', 'Helvetica', 'Arial', sans-serif;  /* corpo */
```

Use `@import` no topo do `<style>` e sempre declare a stack completa em cada elemento.

### 10.4 Largura

- **Container:** 600px (padrão-ouro de e-mail marketing)
- **Imagem hero:** 600px de largura, máx. 300px de altura
- **Imagens internas:** 560px de largura (20px de padding dos dois lados)

---

## 11. Newsletters já criadas (referência)

Kelly tem 5 e-mails prontos em `PADRAO-NEWSLETTERS-KA.md` (está no ZIP do site):

1. **Email 1 — Essência Adormecida** (diagnóstico <50%)
2. **Email 1 — Essência Latente** (diagnóstico 50–79%)
3. **Email 1 — Essência Ativa** (diagnóstico 80%+)
4. **Email 2 — Livro** (enviado a todos)
5. **Email 3 — Programa** (enviado a todos após ~7 dias)

Quando for criar um e-mail novo, **abra esse MD do ZIP primeiro** pra replicar o padrão de design com precisão. A estrutura visual é sempre a mesma — o que muda é o conteúdo.

---

## 12. Padrões de Copy (micro)

### 12.1 Assinaturas

- "Kelly Albert" — quando assina uma fala / quote
- "Kelly Albert · Fundadora da KA | Inteligência para Marcas" — quando assina um e-mail
- "KA | Inteligência para Marcas" — quando é o escritório falando (institucional)

### 12.2 Chamadas recorrentes

- "Sua marca tem Potência. Vamos revelar." (CTA final de várias páginas)
- "Fazer Diagnóstico Gratuito" (botão primário do site)
- "Falar no WhatsApp" (botão secundário)
- "Ver Case Completo" (cards de case)
- "Quero Meu Livro" (conversão de livro)
- "Quero Meu Acompanhamento" (conversão de Direção)
- "Garantir Minha Vaga" (conversão de Mentoria)

### 12.3 Selos e badges

- **"GRATUITO"** em verde pulsante (diagnóstico)
- **"MAIS ESCOLHIDO"** em pills dourados (Plano Direção no Programa)
- **"DISPONÍVEL AGORA"** em pills neutros

---

## 13. Regras de proibição (hard no's)

Nenhum conteúdo KA pode:

- ❌ Usar **itálico colorido com background-image** (marker dourado) — proibido
- ❌ Usar **text-decoration: underline** em qualquer texto
- ❌ Misturar **2 ambientes** numa mesma seção (ex.: cobre + marinho juntos)
- ❌ Usar **nav com fundo colorido** — é sempre `#F8F7F2`
- ❌ Usar **Playfair em corpo de texto** (só em títulos e quotes)
- ❌ Pintar o símbolo **©** com cor diferente da palavra anterior
- ❌ Comprimir seções — espaçamento generoso é parte da estética
- ❌ **Botão retangular** ou **sem uppercase**
- ❌ **Emoji excessivo** em copy profissional (até 1 por peça, em contexto emotivo justificado)
- ❌ Enquadrar clientes negativamente em cases
- ❌ Prometer resultado ("triplique suas vendas", "dobre seu faturamento")
- ❌ Linguagem de coach / guru / desenvolvimento pessoal

---

## 14. Estrutura de arquivos do ZIP do site

```
kellyalbert-site-v52.zip
├── index.html              # Home
├── sobre/index.html        # /sobre (também acessado por /bio → redirect)
├── bio/index.html          # Link-in-bio
├── livro/index.html        # /livro
├── mentoria/index.html     # /mentoria
├── programa/index.html     # /programa
├── direcao/index.html      # /direcao
├── cases/index.html        # Listagem de cases
├── casesuvinil/            # Case individual
├── caseamordebicho/
├── caseshapes/
├── caseyufil/
├── casebeteti/
├── caseramarim/
├── casecomfortflex/
├── quiz/index.html         # Quiz diagnóstico
├── obrigado/               # Páginas de agradecimento por tier
├── produtos/index.html     # Resumo dos 4 produtos
├── css/
│   └── style.css           # CSS global
├── images/                 # Todas as imagens do site
├── videos/
│   ├── livro-hero.mp4      # Vídeo hero da /livro (628KB)
│   └── livro-hero-poster.jpg
├── _components/            # Componentes reutilizáveis
├── _templates/             # Templates padrão
├── PADRAO-NEWSLETTERS-KA.md    # Referência visual dos e-mails
├── REGRAS-PROJETO.md           # Regras operacionais
├── DECISOES.md                 # Log de decisões
└── lint-project.py             # Validador de contraste
```

---

## 15. Como usar este guia ao criar um e-mail

1. Leia a **Seção 9 (Tom de Voz)** antes de escrever qualquer palavra.
2. Estruture o e-mail conforme **Seção 10 (Template)**.
3. Use APENAS as cores da **Seção 2** e as fontes da **Seção 3**.
4. Para botões, copie os **tipos da Seção 4.1** — cada botão tem um uso específico.
5. Nenhum sublinhado, nenhum marker dourado, nenhuma fonte fora da paleta.
6. Revise contra as **proibições da Seção 13** antes de enviar.

Se ainda tiver dúvida, consulte o arquivo `PADRAO-NEWSLETTERS-KA.md` dentro do ZIP para ver e-mails já aprovados como referência.

---

**Versão:** 1.0 · Abril 2026  
**Mantido por:** Kelly Albert · KA | Inteligência para Marcas  
**Última atualização do site:** v52
