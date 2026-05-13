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
