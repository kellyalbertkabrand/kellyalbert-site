# Campanhas do MailerLite

Pasta onde ficam as campanhas que viram **drafts** no MailerLite via GitHub Actions.

## Como funciona

1. Você fala comigo no chat: *"cria campanha sobre X"*
2. Eu crio um `.md` aqui (ex: `2026-01-15-novo-bonus.md`)
3. Push pra `main`
4. **GitHub Action** dispara, lê o `.md`, chama a API do MailerLite
5. Aparece **draft no MailerLite** (você revisa e envia/agenda)

## Anatomia de uma campanha (.md)

```markdown
---
subject: "Assunto do email aqui"
preheader: "Texto de preview que aparece em alguns clientes de email"
name: "[Mentoria] Nome interno opcional"
groups:
  - "Mentoria - Leads"
from_email: "kelly@kellyalbert.com.br"
from_name: "Kelly Albert"
---

# Markdown normal

Oi {{name|fallback:""}},

Parágrafo do email aqui. **Bold** funciona, *itálico* também.

[Link →](https://kellyalbert.com.br/mentoria/)

- Bullet 1
- Bullet 2
```

### Campos obrigatórios
- `subject` — assunto do email

### Campos opcionais
- `preheader` — texto de preview (recomendado, melhora abertura)
- `name` — identificador interno (se omitir, gera do filename)
- `groups` — IDs ou nomes de grupos (se omitir, usa `MAILERLITE_DEFAULT_GROUP_ID`)
- `from_email` / `from_name` — sobrepõem o remetente padrão

### Sintaxe do corpo
- Markdown padrão (gerado por `marked`)
- Variáveis do MailerLite funcionam: `{{name|fallback:""}}`, `{$unsubscribe}`, etc.
- HTML também é aceito (markdown deixa passar)

## Idempotência

O script compara pelo campo `name`. Se já existir uma campanha com aquele nome no MailerLite, **pula sem recriar**. Pode rodar quantas vezes quiser sem duplicar.

Pra forçar recriar: muda o `name` no frontmatter ou renomeia o arquivo.

## Secrets necessárias no GitHub

Repo settings → Secrets and variables → Actions → New repository secret:

| Secret | Conteúdo |
|---|---|
| `MAILERLITE_API_KEY` | Token gerado em MailerLite → Integrations → Developer API |
| `MAILERLITE_FROM_EMAIL` | Email remetente verificado (ex: `kelly@kellyalbert.com.br`) |
| `MAILERLITE_FROM_NAME` | Nome do remetente (ex: `Kelly Albert`) |
| `MAILERLITE_DEFAULT_GROUP_ID` | ID do grupo padrão (Mentoria – Leads) |

## Rodar localmente (debug)

```bash
cd scripts
npm install
MAILERLITE_API_KEY=xxx MAILERLITE_FROM_EMAIL=kelly@... node create-campaigns.mjs
```
