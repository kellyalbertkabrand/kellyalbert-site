# CLAUDE.md — Memória do projeto KA

> Este arquivo é lido automaticamente em **toda nova sessão**. Não apagar.

## Comece por aqui

**LEIA SEMPRE PRIMEIRO:** [`INICIO-DE-CHAT-KA.md`](./INICIO-DE-CHAT-KA.md)

Esse arquivo contém:
- Quem é a Kelly Albert e o contexto do projeto
- Estado atual do site
- Regras visuais que NUNCA podem ser quebradas
- Como ela trabalha (gaúcha, voz-para-texto, valida antes de implementar)

## Frentes ativas

### 1. Site `kellyalbert.com.br`
- Repositório atual deste worktree
- Deploy: **Netlify** (branch `main` → produção automática)
- Workflow: edita → commit → push pra `main` → deploy
- Não usar ZIP nem `--no-verify` em commits
- **Preferência da Kelly:** sempre publicar direto em produção sem perguntar. Quando estiver num branch de feature, mergear/fast-forward pra `main` ao final do ajuste e dar push. Não precisa abrir PR nem pedir confirmação.

### 2. Lead form na página `/mentoria/`
- Form em popup que **bloqueia o preço** até preenchimento (nome, email, WhatsApp)
- Backend duplo:
  - **Netlify Forms** (backup, painel Netlify)
  - **MailerLite** via função `netlify/functions/subscribe.js`
- Lead entra automaticamente no grupo configurado em `MAILERLITE_GROUP_ID`
- Idempotência por `localStorage` (`ka_mentoria_lead`)

### 3. Pipeline de campanhas MailerLite (chat → markdown → draft)
**Quando Kelly disser "cria uma campanha sobre X", siga este fluxo:**

1. Crie arquivo em `campaigns/AAAA-MM-DD-slug.md` com frontmatter (`subject`, `preheader`, opcional `groups`, `name`)
2. Corpo em markdown padrão (links, listas, bold, etc.) — o script converte pra HTML
3. Commit + push pra `main`
4. **GitHub Action** (`.github/workflows/mailerlite-campaigns.yml`) dispara automaticamente
5. Em ~2min: aparece **draft no MailerLite** que Kelly revisa e envia/agenda

**Documentação completa:** [`campaigns/README.md`](./campaigns/README.md)

**Importante:**
- A API do MailerLite **NÃO** permite criar automações — só campaigns. Para automações Kelly cria no painel (textos em [`MENTORIA-EMAIL-FLOW.md`](./MENTORIA-EMAIL-FLOW.md))
- Campanhas sempre saem como **draft** — Kelly revisa antes de enviar
- Idempotente: script compara pelo `name`, não duplica

**Secrets configurados no GitHub (não exposto em código):**
- `MAILERLITE_API_KEY`
- `MAILERLITE_FROM_EMAIL`
- `MAILERLITE_FROM_NAME`
- `MAILERLITE_DEFAULT_GROUP_ID`

### 4. Próxima turma da Mentoria
- **Início:** 16 de junho de 2026 (terça)
- **Fim:** 09 de julho de 2026 (quinta)
- **Encontros:** 16, 18, 23, 25, 30 de junho + 02, 07, 09 de julho
- **Horário:** terças e quintas, 19h30 às 21h30 (Brasília)
- **Preço:** R$ 990 à vista ou 10x R$ 118,98
- **Pagamento:** Hotmart (`https://pay.hotmart.com/J105727850F`)

---

## Frente ativa: página `/mentoria-teste/`

**Arquivo:** `mentoria-teste/index.html`
**URL:** `kellyalbert.com.br/mentoria-teste/`
**Objetivo:** página de vendas alternativa da Mentoria Marca com Essência© — sendo refinada em copy, design e mobile antes de substituir a `/mentoria/`.

### Decisões técnicas já implementadas

- **Lead form:** captura nome, email e WhatsApp em modal popup. Chama a API do MailerLite **diretamente do browser** (mesmo padrão do `/quiz/`), sem Netlify Function. Group ID: `187386066189157525` (LP Mentoria). localStorage key: `ka_mentoria_modal_v2`.
- **Botão CTA principal** (`.ka-cta-main`): verde WhatsApp `#25D366`, pulse animation, abre o modal.
- **WhatsApp flutuante:** ícone fixo na lateral direita (bottom 28px), classe `.ka-float-whats`, link com mensagem pré-preenchida via `encodeURIComponent` no `onclick`.
- **Design system KA aplicado:** Playfair Display + Montserrat (do `css/style.css` global), underline laranja `::after` nos H2 de seções escuras centralizadas, labels no modal, cor `#3D6B7E` para acentos azuis.
- **Mobile otimizado:** CSS em `@media(max-width:640px)` com IDs de seção (`mob-s2`, `mob-nuvem`, etc.), gradientes diagonais por seção, bordas coloridas no topo, left-borders nos cards, foto da Kelly acima do texto na seção Quem conduz.

### Paleta restrita desta página

| Uso | Cor |
|-----|-----|
| Fundo escuro base | `#152535` (marinho) |
| Laranja acento | `#C47830` (caramelo) |
| Azul acento | `#3D6B7E` (essência) |
| Texto claro | `#EDE8DD` |
| Verde CTA / WhatsApp | `#25D366` |
| Vermelho (para quem não é) | `rgba(239,68,68,…)` |

> **Não usar:** cobre, dourado, bege — ficam discordantes no fundo escuro.

### Seções da página (em ordem)

1. **Hero** — título principal, dor, data da turma, pillars, CTA
2. **Segunda dobra** (`mob-s2`) — copy de promessa + livro-guia
3. **Nuvem de Reconhecimento** (`mob-nuvem`) — 14 termos de dores em pílulas visuais + card ATENÇÃO
4. **Para quem é** (`mob-paraquem`) — 5 cards com copy novo (jun/2026)
5. **Por que fazer** (`mob-porquefazer`) — dores elegantes + pivot + grid "Na prática" + fechamento
6. **Base Estratégica** (`mob-base`) — 8 cards práticos + frase final em destaque
7. **Como funciona** (`mob-como`) — 2 cards teoria/prática + 5 steps numerados
8. **O que você vai construir** (`mob-construir`) — jornada em pilares e encontros
9. **O que está incluso** (`mob-incluso`) — lista de itens + livro guia + CTA
10. **Para quem não é** (`mob-naoe`) — cards vermelhos
11. **Quem conduz** (`mob-kelly`) — foto da Kelly + bio
12. **Próxima turma** (`mob-turma`) — datas, horário, schedule grid
13. **Investimento** — preços, parcelamento, CTA final
14. **FAQ** — accordion com 10 perguntas
15. **Footer**

### Copy pendente de revisão / próximos passos possíveis
- Seções 7–14 ainda com copy anterior (não foram atualizadas nesta rodada)
- Quando Kelly aprovar a `/mentoria-teste/`, substituir pela `/mentoria/` ou redirecionar
