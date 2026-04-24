# Log de Decisões · KA

> Registro de decisões importantes tomadas ao longo do projeto. Ordem cronológica (mais recente no topo).

---

## v81 · Abril 2026

- **Página /bio/ — hierarquia do diagnóstico refinada** conforme feedback Kelly:
  - **Verde do badge "GRATUITO" de volta ao tom vibrante** (`#22c55e` — não `#15803d` escurecido). Sobre fundo escuro marinho, esse verde cria chamariz forte.
  - **Título h3 "Descubra agora o que está travando a sua marca" MUITO maior**: `2.4rem !important` no mobile, `2.6rem !important` no desktop (≥720px). Peso 700, line-height 1.1, letter-spacing -.02em — cria destaque hero-style dentro do card.
  - **Pill "DIAGNÓSTICO DA SUA MARCA" reduzida**: de `.65rem` → `.58rem` font-size. Agora é legenda/contexto, não compete com o título.
  - **"✦ 100% gratuito · resultado imediato ✦" discreto e pequeno**: de `.72rem uppercase letter-spacing:.15em color:dourado font-weight:600` → `.72rem letter-spacing:.15em color:rgba(237,232,221,.7) font-weight:400` + `text-transform:none`. Bem mais sutil, em 2 linhas como na home.
  - **Texto dentro do botão ligeiramente aumentado**: inline style adicionado `font-size:.88rem; padding:1.1rem 2rem` — mais harmônico sem forçar.
  - Hierarquia final: GRATUITO (pulso verde) > pill contexto > **TÍTULO BEM GRANDE** > descrição > botão dourado pulsante > textinho apoio discreto.

## v84 · Abril 2026 · Padronização CSS · Etapas 1-3 da auditoria

Execução parcial da auditoria comparativa (`auditoria-e-padrao-cores-ka.md`). Feito:

**Etapa 1 · Pesos tipográficos reconciliados com o guia oficial**
- `h2`: `font-weight:500` → **600** (bloco canônico linhas 776-811)
- `h3`: `font-weight:500` → **600** + `font-size:1.3rem` → **1.8rem** (alinhando com guia)
- `h3`: cor `--t-800` → **`--t-900`** (unificado)
- `h1`: cor `--t-black` → **`--t-900`** (referência válida; `--t-black` era ambígua)
- `.btn`: `font-weight:600` → **700**

**Etapa 2 · Duplicações globais removidas do `style.css`**
- Deletadas declarações duplicadas de `h1`, `h2`, `h3` que estavam nas linhas 74-80 (zona antiga). Mantida apenas a declaração canônica nas linhas 776-811.
- Deletado bloco intermediário de `h2`/`h3` com `!important` que estava entre linhas 694-714 (duplicava o responsivo principal).
- Deletado bloco `TYPOGRAPHY RESPONSIVE` antigo (linhas 704-724) com `h1 1.8rem` / `h2 1.6rem` em mobile — conflitava com o canônico `h2 1.8rem` em ≤640px. Mantido apenas o bloco responsivo canônico em linhas ~860-900.

**Etapa 3 · Variantes de botão extraídas para o CSS**
Criadas 4 novas classes de botão pra serem usadas em cards coloridos (antes eram inline):
- `.btn--on-caramelo` · branco / texto caramelo #C47830 · "Saiba Mais" sobre card Livro
- `.btn--on-cobre` · mostarda #E0B880 / texto marinho #152535 · card Programa
- `.btn--on-essencia` · branco / texto azul essência #3D6B7E · card Mentoria
- `.btn--on-marinho` · mostarda #E0B880 / texto marinho · card Direção

**Etapas 4, 5, 6 · pendentes**
- Refatoração de `/livro` (360 inline styles), `/mentoria` (258), `/programa` (292) — precisa sessão dedicada com validação seção por seção.
- `/bio` fica de fora da refatoração global (CSS isolado intencional, visual de link-in-bio).

**Validação**
- Linter: `✅ PASSOU`
- Preview visual: home, sobre, livro, mentoria testadas em desktop 1440px · zero quebra visual
- Ganho: `.btn` agora em peso 700 globalmente (autoridade correta), títulos padronizados em peso 600, responsivos sem conflito interno.

## v83 · Abril 2026 · Finalização absoluta /bio/

- **Espaçamento entre linhas do título ainda mais apertado**: line-height `0.95` → `1.05` (só testei com 0.95 e por causa das serifas da Playfair parecia ainda com espaço grande) + **reduzido font-size de 2.4rem → 2.1rem** (mobile) e 2.6rem → 2.3rem (desktop) pra caber 3 linhas mais harmonicamente: "Descubra agora o" / "que está *travando*" / "a sua marca".
- **Texto do botão aumentado de novo**: `1rem` → **`1.15rem`** + `padding:1.3rem 2rem` + `letter-spacing:.06em` + `font-weight:700`. Botão agora tem presença forte e legibilidade absoluta.
- **Travessões removidos de toda a /bio/** (mesmo dos comentários HTML/CSS invisíveis): "GRID de logos no hero — marcas que já passaram..." → "...·..."; "QUEM ESTÁ POR TRÁS — Kelly..." → "...·...". Agora zero travessões na página inteira, mesmo em meta tags e comentários.

## v82 · Abril 2026 · Finalização /bio/

- **Espaçamento entre linhas do título do diagnóstico apertado**: `line-height:1.1` → `0.95` — padrão mais próximo do que a /sobre/ usa. Título "Descubra agora o que está travando a sua marca" agora respira bem menos entre linhas, ganhando impacto visual.
- **Texto do botão aumentado** mais uma vez: `font-size:.88rem` → `1rem`, `padding:1.1rem 2rem` → `1.2rem 2rem`, `letter-spacing:.08em`. Botão mais proeminente e proporcional.
- **Subtexto "100% gratuito · resultado imediato" reformatado pra 2 linhas centralizadas**:
  - Linha 1: "✦ 100% gratuito"
  - Linha 2: "Resultado imediato ✦"
  - `<br>` entre as duas, `line-height:1.6`, `text-align:center` explicit
- **Travessão removido do `<meta description>`**: "Kelly Albert — KA Inteligência..." → "Kelly Albert · KA Inteligência...". Agora a /bio/ inteira não tem travessões visíveis nem em SEO/share (os únicos restantes são em comentários HTML/CSS, invisíveis).
- Badge "GRATUITO" piscando — mantido como combinado.

## v81 · Abril 2026

- **Hierarquia visual do diagnóstico refinada** na /bio/:
  - **Verde do "GRATUITO" restaurado para vibrante `#22c55e`** (v80 tinha escurecido por causa do fundo claro, mas agora com fundo escuro volta a funcionar)
  - **Título "Descubra agora o que está travando a sua marca" BEM MAIOR**: h3 de `1.6rem` → **`2.4rem` mobile / `2.6rem` desktop** com peso 700 e `!important` pra sobrescrever qualquer override. Agora é o elemento dominante da seção — a pessoa lê o título de cara.
  - **Pill "DIAGNÓSTICO DA SUA MARCA" menor e mais discreta**: font-size `.65rem` → `.58rem`. Serve só como "etiqueta" — não compete com o título.
  - **Texto dentro do botão ligeiramente maior**: adicionado `font-size:.88rem` + `padding:1.1rem 2rem` inline no `.btn--diag`. Mais proporcional ao botão largão.
  - **Subtexto "100% gratuito · resultado imediato" discretíssimo**: `text-transform` removido (não é mais uppercase), peso 400, cor `rgba(237,232,221,.7)`, sem bold. Idêntico ao padrão da home (`/`).

## v80 · Abril 2026

- **Página /bio/ — seção diagnóstico refeita com padrão visual do site**:
  - **Travessão removido** do texto do hero: "E posso te ajudar — com..." → "E posso te ajudar com..."
  - **Fundo do diagnóstico trocado de bege claro para azul marinho `#152535`** (mesmo do hero) — continuidade visual, mais sóbrio e profissional
  - **Botão do diagnóstico trocado pelo padrão do site**: `.btn.btn--diag.btn--lg.btn--pulse` (dourado `#B89B6A`, caixa alta, com pulse animation — mesmo botão usado em toda página de produto/case via `cta-potencia.html`). Não inventa roda, usa o botão já estabelecido e consistente.
  - **Verde do badge "Gratuito" escurecido**: de `#22c55e` (verde fluorescente que brigava com o fundo) → `#15803d` (verde forest elegante/institucional). Animação `greenPulse` também suavizada (1.3s → 1.6s, scale reduzido de 1.06 → 1.04). Harmonia total com o fundo escuro.
  - **Textos ajustados pra fundo escuro**: h3 em `#EDE8DD` (creme), p em `rgba(237,232,221,.85)` — contraste total preservado.

## v79 · Abril 2026

- **Logos removidos do hero da /bio/** (reversão intencional v77). Após análise estratégica com a Kelly, decidido que logos de cara passavam sensação de "hall da fama" / autopromoção (pedante), afastando o público-alvo real do link-in-bio (pequenas e médias empresas). Autoridade agora fica apenas no texto — que faz o trabalho sem intimidar.
- **Texto do hero refinado**: *"Olá, meu nome é Kelly Albert, seja bem-vindo. Sou fundadora da **KA | Inteligência para Marcas** e já tive a oportunidade de atuar junto a **pequenas, médias e grandes empresas**. E posso te ajudar — com o mesmo olhar estratégico que entrego às grandes marcas."* — final acolhedor com SUGESTÃO sutil: "mesmo olhar estratégico que entrego às grandes marcas" dá a entender que ela aplica o rigor de multinacional no cliente menor, sem precisar dizer "multinacional" explicitamente.
- **Nova seção "Empresas que já passaram por nós"** inserida **entre o diagnóstico e os produtos**. Idêntica à seção da /sobre/ (label + h2 "Marcas que confiaram em nosso trabalho" + grid de 8 logos coloridos). Posição estratégica: a pessoa entra acolhida → considera o diagnóstico → vê autoridade (justamente quando está avaliando contratar) → desce pros produtos. Prova social no momento certo em vez de logo de cara.
- **Badge "★ FAÇA VOCÊ MESMO + IA" piscando dourado no topo do card Livro**: ícone de estrela + texto em uppercase; animação `goldPulse` de 1.6s (scale 1→1.04, box-shadow glow dourado expandindo, cor alternando entre `#D4C49E` e `#E8D9B3`). Enfatiza o diferencial do livro (IA integrada) — crítico pra Kelly porque é o argumento principal do produto.

## v78 · Abril 2026

- **Página /bio/ — refinamentos de hero e diagnóstico** conforme feedback Kelly:
  - **Logos no hero sem quadradinhos** (visual fluido): 8 logos convertidos de JPG (fundo branco) para PNG com fundo transparente via PIL — diretório `/images/logos-transparent/`. Script detecta automaticamente a cor de fundo (no caso `rgb(241,236,230)`, bege claro dos JPGs originais) e remove via alpha channel (83-93% de transparência aplicada). CSS usa `filter:brightness(0) invert(1)` pra deixar os logos todos brancos monocromáticos — padrão clean de apresentação em hero escuro.
  - **Texto do hero reescrito** com tom mais pessoal: *"Olá, meu nome é Kelly Albert, seja bem-vindo. Sou fundadora da **KA | Inteligência para Marcas** e já tive a oportunidade de atuar junto a **pequenas empresas, marcas nacionais e multinacionais**. Posso te ajudar, seja você uma pequena, média ou grande empresa."* — acolhedor, deixa claro que ela conhece os 3 universos (pequeno, médio, grande).
  - **"KA | Inteligência para Marcas" sempre em linha única**: adicionado `white-space:nowrap` no `<strong>` envolvendo o texto com `&nbsp;` entre as palavras, garantindo que nunca quebre em duas linhas.
  - **Seção diagnóstico com contraste forte**: fundo alterado de `linear-gradient(azul-essencia → azul-médio)` para `linear-gradient(#FAF8F4 → #F1EDE6)` (bege claro). Todos os textos reajustados: label cobre (antes dourado), h3 azul marinho (antes creme), parágrafo cinza escuro (antes creme transparente). Contraste salto absurdo.
  - **Botão do diagnóstico redesenhado**:
    - Setinha SVG **removida**
    - Texto aumentado de `.78rem` → `1rem` com peso **800**
    - Maiúsculas removidas (agora "Fazer Diagnóstico Gratuito" em capitalize natural, mais humano)
    - Cor alterada de dourado para **verde vibrante `#22c55e`** (mesmo do badge Gratuito piscando — coerência visual)
    - Largura expandida (`width:100%; max-width:340px`) — botão ocupa toda a largura disponível, bem mais chamativo
    - Hover: escurece para `#16a34a` com shadow glow
  - **Logos ChatGPT/Google Docs/Spotify no card Livro aumentados**: de `height:22px` → `36px` (64% maior). Gap aumentado de `.7rem` → `1.1rem`. Muito mais visíveis e legíveis.

## v77 · Abril 2026

- **Página /bio/ — ajustes de tom e hierarquia visual** conforme feedback da Kelly:
  - **Hero com tom acolhedor e autoridade suavizada**: texto reescrito de "Fundadora da KA..., com mais de 20 anos de mercado. Atuou junto a marcas nacionais e multinacionais como..." para "Que bom te ver por aqui. Sou fundadora da KA | Inteligência para Marcas e já tive a oportunidade de atuar junto a marcas como as de baixo. E posso te ajudar, seja você uma pequena, média ou grande empresa." — transmite autoridade **sem ser arrogante**, acolhe pequenas/médias/grandes sem excluir ninguém.
  - **Grid de logos diretamente no hero** (8 marcas: McDonald's, Atacadão, Sebrae, Suvinil, Ramarim, ComfortFlex, Usaflex, BandFM) em formato 4x2 com cards de fundo creme claro, separados por borda superior do texto. Entrega prova social visual imediata sem precisar ler.
  - **Seção duplicada "Marcas que confiaram em nosso trabalho" removida** (aparecia duas vezes: no hero textualmente + em grid depois dos produtos). Agora só no hero, resolvendo a redundância.
  - **Cards Mentoria/Direção/Programa com fundo bege claro (`#FAF8F4`)** em vez de branco puro. Mantém hierarquia (o Livro continua como card destaque com fundo cobre escuro), mas cria diferenciação visual sutil e coerência com o resto do site.
  - **Badge "GRATUITO" piscando bem mais forte**: animação reforçada de 2.2s → 1.3s, adicionado `transform:scale(1 → 1.06)`, expansão de glow ao redor (0 → 10px), transição de cor (verde claro → verde médio). Gera atenção real para o diagnóstico (crítico para a captura de leads para a sequência de emails KA).

## v76 · Abril 2026

- **Página /bio/ — ajustes pontuais** (versão link-in-bio da Kelly):
  - **Produtos reordenados**: Livro (01) → Mentoria (02) → **Direção (03)** → **Programa (04)** — antes estava Livro / Mentoria / Programa / Direção. Agora consistente com menu e footer do site todo.
  - **HTML quebrado corrigido**: havia `</div></a>` órfãos no fim do bloco de produtos (resquício de edição anterior).
  - **Nova seção "CONECTE-SE" de redes sociais** adicionada entre o CTA final e o footer: ícones circulares dourados sobre fundo azul marinho `#152535` (coerente com o CTA final), com 2 redes iniciais:
    - **Instagram** → @kellyalbert.brand
    - **WhatsApp** → `+5551993163333` com mensagem pré-preenchida "Vim através do link da bio e gostaria de saber mais"
  - CSS `.bio-socials` adicionado no style da página com responsive (`min-width:720px` aumenta ícones). Estrutura preparada pra receber LinkedIn, TikTok e YouTube no futuro — só adicionar novos `<a class="bio-social">` dentro do `.bio-socials-grid` quando a Kelly passar os @ reais.

## v75 · Abril 2026

- **Reversão**: `aspect-ratio:4/5` + `object-fit:cover` removidos das imagens da /mentoria/ mobile. Volta ao estado da v71 — largura total da tela (edge-to-edge) mas com proporção natural 16:9 das imagens originais.
- A classe `ment-img-fw` e a regra mobile de ocupar 100vw seguem funcionando, só a altura forçada foi removida.

## v74 · Abril 2026

- **Rodapé em TODAS as 21 páginas**: Direção adicionada acima de Programa (ordem final: Livro → Mentoria → **Direção** → Programa → Cases). Algumas páginas não tinham Direção no footer; outras tinham mas na ordem errada — tudo consolidado.
- **Menu dropdown Produtos em TODAS as 21 páginas**: Direção reordenada pra ficar acima de Programa (ordem final: Livro → Mentoria → **Direção** → Programa).
- **Títulos h2 internos nas 4 páginas de produto (Mentoria, Direção, Livro, Programa) ajustados para 2.4rem** — mesmo tamanho que a /sobre/ usa herdando do CSS global. Estavam em 2.0-2.2rem (pequenos demais):
  - `/mentoria/`: 4 h2 ajustados (Método Marca com Essência, Kelly Albert, Mentoria é para você, h2 CTA final)
  - `/direcao/`: 2 h2 ajustados (Kelly Albert, h2 CTA final)
  - `/livro/`: 8 h2 ajustados (Como funciona, Veja por dentro, Brand Book, Método, Kelly, O que dizem, Quem já está lendo, CTA final)
  - `/programa/`: 2 h2 ajustados (Método, Kelly Albert)
  - Os h2s que são "NÃO é para você se" foram **preservados em 1.8rem** pois criam contraste intencional com os "É para você se" (design decision).
- **Imagens da /mentoria/ mais altas no mobile**: `aspect-ratio:4/5` (portrait) + `object-fit:cover` aplicados nas 3 imagens principais (`mentoria-aula-posicionamento`, `porqueestamosaqui`, `turma-grupo`). Antes eram 16:9 (largas e baixas), agora 4:5 (largas e bem mais altas) no mobile — ocupam quase a tela inteira como tu pediu.

## v73 · Abril 2026

- **Cards Fernando Beteti e Ramarim na /programa/ agora mostram imagens reais** (antes tinham ícones SVG genéricos — boneco silhouette no Beteti e triângulo vazio no Ramarim — que no mobile passavam a impressão de "capa faltando"):
  - Fernando Beteti → `/images/cases/beteti-capa.png` (foto do microfone + estúdio)
  - Ramarim → `/images/ramarim/capa-cases.jpg` (colagem modelo + letra R em cobre)
- Agora os 7 cards da seção "CASOS REAIS — Marcas que passaram pela KA" têm capas reais (Suvinil, Amor de Bicho, Shapes, YUFIL, Beteti, Ramarim, ComfortFlex)
- **Cards no mobile agora empilham 1 por linha** (antes ficavam 4 apertados em grid pequeno, imagens quase ilegíveis):
  - Corrigido HTML inválido: grid tinha `class="animate-on-scroll scroll-fade"` + `class="prog-grid-3"` duplicado (browser ignorava o segundo)
  - Regra `@media(max-width:640px)` reforçada com `!important` pra sobrescrever inline `grid-template-columns:repeat(4,1fr)`
  - Altura da imagem dos cards aumentada de 110px → 200px no mobile (visualização muito melhor)

## v72 · Abril 2026

- **Mobile: todos os boxes de texto em grids 2 ou 3 colunas da /mentoria/ agora empilham um por linha** (um item por linha, nunca dois lado a lado):
  - Antes/Depois da Mentoria (seção "O que a Mentoria resolve")
  - 4 Etapas do processo (Revelação, Construção, Definição, Posicionamento)
  - 3 pilares (Pilar 01/02/03) da seção "Como Funciona"
  - 5 cards "Para quem é" (Mentoria é para você se)
  - Comparativo Livro vs Mentoria (Livro empilha em cima, Mentoria embaixo com badge RECOMENDADO)
  - "Tudo que você recebe" (8 features empilhadas)
- **Regra CSS forte** adicionada em `@media(max-width:768px)`: `.ment-grid-2, .ment-grid-3, .schedule-grid { grid-template-columns:1fr !important; gap:1rem !important; }` — usa `!important` pra sobrescrever o `grid-template-columns` inline que estava ganhando por specificity
- **Corrigido HTML inválido** em 2 lugares (linhas 324 e 427) onde existia `class` duplicado (um dentro, outro fora do style); só o primeiro era aplicado pelo browser, deixando `ment-grid-2` ignorado
- **Adicionada classe `ment-grid-2`** no grid das 4 etapas (linha 213) que estava sem classe

## v71 · Abril 2026

- **Data "Início 20 de Maio de 2026" com destaque pulsante** na /mentoria/: pill dourada, peso 700, animação `dateBlink` de 1.6s que alterna opacidade, scale (1 → 1.035) e box-shadow (cria efeito de brilho/pulso suave). CSS adicionado inline no `<style>` da página.
- **Imagens grandes na /mentoria/ ocupam largura total da tela no mobile**: as 3 imagens principais (`mentoria-aula-posicionamento`, `mentoria-aula-porqueestamosaqui`, `mentoria-turma-grupo`) marcadas com classe `ment-img-fw`. CSS com `@media(max-width:768px)` força `width:100vw`, `margin-left:calc(50% - 50vw)` e `border-radius:0` — cria efeito edge-to-edge no mobile, mantendo o layout original no desktop.
- **Seção Depoimentos da /mentoria/ substituída pela exatamente igual à /sobre/**: fundo claro `bg-1`, mesma estrutura de carousel com 10 depoimentos completos (antes tinha só 4 truncados sobre fundo azul marinho escuro). Trocou completude + consistência visual com o resto do site.
- **Espaçamento "12x de" e "R$98,04"** na seção "GARANTA A SUA VAGA": `margin-bottom` do "12x de" reduzido de `1rem` → `.2rem`; `margin-top` do símbolo "R$" reduzido de `1rem` → `.8rem` pra compensar — valores ficaram mais coesos visualmente.
- **FAQ da /mentoria/ com layout idêntico ao da /livro/**: fundo da section trocado de `amb-marinho` (azul marinho escuro) → `#F7F3EA` (bege claro). Estrutura HTML dos cards `<details>` já era a mesma, só o contraste visual mudou. Cards agora têm o mesmo visual "leve" da /livro/, com cards brancos sobre fundo bege.

## v70 · Abril 2026

- **Imagem de assinatura visual KA + VM Rocks (`/images/creditos/assinatura-ka-vmrocks.png`) removida de todos os 4 cases onde aparecia**: Amor de Bicho, ComfortFlex, Ramarim, Shapes. Arquivo físico e diretório `/images/creditos/` também deletados.
- **Ficha Técnica da YUFIL ajustada**: a linha "Design e identidade visual: VM Rocks Design (Gabi Lucato)" foi substituída por "**VM Rocks:** Personalização da linha visual nas redes sociais (Gabi Lucatto)" — reflete corretamente o serviço prestado pela VM Rocks nesse case específico (o design estratégico foi feito pela KA; a VM Rocks personalizou a linha visual nas redes sociais)
- Reverte parcialmente a decisão v65 (que introduziu a imagem nos cases como crédito visual compartilhado); a autoria visual co-criada agora só aparece onde realmente se aplica, na ficha técnica de cada case.

## v69 · Abril 2026

- **Tela de resultado do diagnóstico (/quiz/) — todos os sublinhados/destaques coloridos removidos**, substituídos por bold sutil (ligeiramente mais forte que o texto normal):
  - Títulos dos 3 níveis de diagnóstico (Ativa / Latente / Adormecida): removido `<span style="background:rgba(61,107,126,.25);...">` → `<strong style="font-weight:650;">` — agora "não é memorável", "desperdiçando" e "operando no escuro" aparecem em peso 650 sem fundo colorido
  - Bloco de transição "O primeiro passo para mudar o posicionamento...": removido `<em>enxergar com clareza</em>` → `<strong style="font-weight:750;">enxergar com clareza</strong>` — sem itálico, peso um pouco mais forte que o já bold do parágrafo (weight 600)
  - Parágrafo intro do ecossistema: removido `<span class="hl">Estruturação</span>` → `<strong style="font-weight:650;">Estruturação</strong>` — sem destaque em background colorido
- Destaques `.hl` e `.em-key` **dentro dos cards** do ecossistema (Livro, Programa, Direção + Inteligência Artificial, Base Estratégica) **preservados** pois fazem parte do design idêntico à home, não são sublinhados textuais
- Hierarquia visual mais elegante e menos poluída, preserva a ênfase sem quebrar o fluxo de leitura

## v68 · Abril 2026

- **Página de resultado do diagnóstico (/quiz/) reconstruída com os 4 cards do Ecossistema Marca com Essência© da home**, layout idêntico:
  - 4 cards: **Livro** (caramelo `#C47830`) · **Mentoria** (azul essência `#3D6B7E`, featured) · **Programa** (cobre `#8B5A2B`) · **Direção** (azul marinho `#1A2E3D` com accent dourado)
  - Cada card com ícone SVG animado (exceto Livro, que usa mockup real), tag uppercase em tracking, título Marca com Essência©, descrição, 3 features com bullets, botão colorido específico
  - Antes eram 3 cards genéricos (Livro, Mentoria, Programa) — agora o ecossistema completo (4), exatamente como na home
- **Estilos `.eco-*` movidos para CSS global (`/css/style.css`)** para serem reutilizados em qualquer página. Home continua com inline, zero conflito.
- **Container do quiz expande dinamicamente de 640px para 1100px na tela de resultado** via JS na função `showResult()` — mantém quiz estreito pras perguntas e libera largura cheia pro ecossistema
- **Mobile**: cards empilham em 1 coluna com `grid-template-columns:1fr` via media query `max-width:768px` já existente no CSS global, sem ajustes adicionais necessários
- CSS antigo `.quiz-products-row` (grid 3 colunas que espremia os cards) removido do inline

## v67 · Abril 2026

- **Título Suvinil padronizado para "Suvinil Pintou Parceria"** na /cases/ (era "KA × Suvinil Pintou Parceria") e na /casesuvinil/ (era apenas "Suvinil"). "Pintou Parceria" em itálico via `<em>` nos dois.
- **/caseyufil/ — linha "Criado por KA | Inteligência para Marcas (Kelly Albert) + VM Rocks Design (Gabi Lucato)" removida do topo.** As informações de autoria ficam agora apenas na Ficha Técnica (estratégia KA + design VM Rocks Design), evitando redundância.
- **5 novas imagens do brand book oficial YUFIL integradas na /caseyufil/:**
  - `brand-modelo.jpg` (nova · modelo ruiva com folha verde + logo yufil) → adicionada após stats, antes de "Por que nos procurou"
  - `personalidade.jpg` (substituída · logo + caixas de sabonete + pente de bambu)
  - `produto.jpg` (substituída · sabonete sólido + embalagem de bambu artesanal)
  - `manifesto.jpg` (substituída · logo sobre paisagem água + floresta)
  - `brand-logo.jpg` (nova · logo limpo em fundo verde sálvia) → adicionada antes da Ficha Técnica como fechamento visual
- Reforça a narrativa visual do case: processo estratégico (slides existentes) + resultado real da marca (novas imagens) + fechamento simbólico (logo)

## v66 · Abril 2026

- **Página /cases/ reorganizada com 6 cases (Beteti removido da listagem):**
  - Ordem final: Suvinil · Amor de Bicho · Shapes · YUFIL · Ramarim · ComfortFlex
  - "O que foi feito" movido da pill cobre de baixo → linha textual abaixo do segmento
  - **Formato definitivo**: itálico + cinza (t-500) + bold (font-weight:700) — mesmo tom do segmento, só com peso 700 pra diferenciar
  - Pills cobre uppercase antigas abandonadas (ficaram muito chamativas)
  - Todas as frases "Veja o case / o resultado / como ficou / o antes e o depois / a transformação" removidas dos textos descritivos
- **YUFIL reclassificado**: segmento "Acessórios de Praia" → **"Indústria de Cosméticos"**; serviço "Posicionamento Estratégico" → **"Posicionamento Estratégico + Personalização das Redes Sociais"**
- **Beteti**: card do case removido da listagem /cases/. Depoimento dele (voz de cliente, 2,3M seguidores) **mantido no carrossel** de "O que dizem sobre nós" pois é testimonial valioso independente do case estar listado
- **Capa da Ramarim**: imagem real `/images/ramarim/capa-cases.jpg` (1600×900 · 100KB · colagem modelo + letra R em cobre/vermelho) substituiu placeholder "Substituir por imagem"
- **Case /caseyufil/**: cover principal (`/images/yufil/cover.jpg`) substituída pelo mockup guarda-sol + toalha (1358×762 · 109KB)
- Segmentos ajustados: Amor de Bicho → "Hospital Veterinário", Shapes → "Estúdio de Design Autoral", Ramarim → "Indústria de Calçados", ComfortFlex → "Indústria de Calçados"

## v65 · Abril 2026

- **Assinatura visual KA + VM Rocks** integrada nos 4 cases com co-autoria (Amor de Bicho, Shapes, Ramarim, ComfortFlex)
- Imagem PNG `/images/creditos/assinatura-ka-vmrocks.png` (1100×333 · 108KB) substituiu a linha textual "Criado por KA... + VM Rocks..." que existia nos 4 cases
- Posicionada abaixo do hero, na mesma section de conteúdo (fundo Papel `#F8F7F2` com textura grid)
- `max-width: 520px`, centralizada, `margin: 0 auto 2.5rem`, com class `animate-on-scroll`
- Alt descritivo com dupla atribuição: "Linguagem e visual desenvolvidos por KA | Inteligência para Marcas (Kelly Albert) + VM Rocks Design (Gabi Lucatto)"
- Cases Suvinil e Beteti **não recebem** a imagem (não têm co-autoria · decisão v63)
- **Assets hospedados para e-mail marketing**: `/images/kelly-email.jpg` (104×104 · foto circular Kelly) está no site apenas para ser referenciada externamente pelos e-mails via URL pública. Não referenciada em nenhum HTML interno. Preservar em todas as entregas futuras.

## v63 · Abril 2026

- **Padronização de "Case | X"**: trocado "Case de X / Y" em 2 linhas por "Case | X Y" em 1 linha, com barra vertical como divisor
- **Linha "Criado por KA..." removida** do hero dos cases Suvinil e Beteti (não têm co-autoria)
- **Ficha técnica do Ramarim** padronizada — antes era fundo preto com header dourado, agora está igual aos outros 6 (fundo bege `var(--bg-2)`, label azul essência, linha decorativa)

## v62

- **Textura dos heros de case**: mudada de xadrez para pontos diagonais (quincunx) `rgba(0,0,0,.04)` 26px com offset 13px
- **Traço entre tipo e nome** voltou, mas bem apertado (36px, margem .4rem/.8rem)
- **Tipo de entrega em regular** (não itálico) · Playfair 400
- **Navegação Anterior/Próximo entre cases REMOVIDA** — substituída por botão único "Ver todos os cases" (pílula outline preto, letter-spacing .25em)

## v61

- Experimentação com xadrez — rejeitado por conflitar com grid quadrado da seção abaixo
- Opacidade do xadrez reduzida várias vezes (5.5% → 1.8% → 0.8%)

## v60

- Espaçamentos do hero apertados: line-height tipo 1.35 → 1.15, margin-tipo .7rem → .3rem, margin-h1 1.8rem → 1rem

## v58

- Traço decorativo entre tipo e nome REMOVIDO (depois voltaria na v62)

## v57

- Hero dos cases **padronizado**: fundo `#f8f7f2` + xadrez + texto preto alto contraste
- Todos os 7 cases ficaram com mesmo visual de hero

## v55

- **Tentativa 1 de padronização** com fundo bege `#F4F0E9` — Kelly pediu mais claro

## v54 · Case Ramarim refeito

- **Paleta institucional da Ramarim corrigida**: preto `#0F1112` + bege `#F4F0E9` + cobre `#8B5A2B` + dourado `#B89B6A`
- **Pitanga `#ED4E2C` NÃO usada como destaque** (Kelly rejeitou versão anterior que usava)
- 11 imagens reais do brand book integradas: capa, essência, propósito, pilares, missão, posicionamento, mulher, editorial, detalhes, grafismo, logotipo
- Layout da ComfortFlex + identidade visual Ramarim

## v53

- `/cases` com **hero azul marinho centralizado** (não mais "Portfólio")
- Subtítulo: "Marcas reais transformadas pelo Método Marca com Essência©"
- 7 cards com **segmento em itálico** acima do parágrafo
- Textos focados em transformação + CTA convidativo ("Veja o case.", "Veja como ficou.")

## v52 · Ajustes grandes

- `/direcao`: hero mobile corrigido (label "MENSAL" não mais cortado)
- `/direcao`: todas seções 1 coluna
- `/direcao`: investimento refeito no padrão /livro — "Não é programa mensal. Pode ser contratado sob demanda. São 3 encontros, 1 por semana." R$ 1.200,00 · 5x de R$ 288,72 · R$ 1.200 no Pix
- Guia KA-Identidade-Visual-Completa.md criado para chat de emails

## Decisões de design antigas (ainda válidas)

- **Marker dourado** (class `hl-gold` com background gradient) REMOVIDO globalmente — trocado por cor + peso 700
- **Sublinhados** REMOVIDOS globalmente via `text-decoration:none !important`
- **© sempre herda a cor** da palavra anterior
- **Nav `#f8f7f2`** em todas as páginas
- **Classes `.amb-*`** forçadas com !important (amb-marinho, amb-cobre, amb-essencia etc) para não serem sobrescritas pelo .hero global
- **Mobile**: 4 produtos em 1 coluna (media query @1fr)
- **Card Livro** texto branco / **Card Programa** cobre oficial `#8B5A2B` / **Card Direção** `#1A2E3D`
- **Dropdown Produtos** com fundo `#f8f7f2`, hover com bordas azul-essência top+bottom, letter-spacing .15em

## Workflow estabelecido

- Lint obrigatório antes de ZIP (`python3 lint-project.py`)
- Heros escuros precisam da classe `amb-*`
- Previews gerados com Playwright antes da entrega
- ZIP excluindo `.DS_Store`, `docs/`, `programa/hero-video.mp4`
