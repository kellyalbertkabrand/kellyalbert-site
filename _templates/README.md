# _templates/ — Templates de páginas e conteúdo

Esqueletos prontos para criar página nova, case novo, newsletter, roteiro ou legenda. Cada template já vem com estrutura correta, classes do sistema e placeholders `{{VARIAVEL}}` pra substituir.

## Como usar

1. Copiar o arquivo do template para onde vai ser usado (ex: `/home/claude/site-full/nova-pagina/index.html`)
2. Substituir TODOS os `{{PLACEHOLDERS}}` por conteúdo real
3. Se for página do site, rodar `lint-project.py` antes do ZIP
4. Se for conteúdo (roteiro/legenda/newsletter), validar contra a skill de tom de voz antes de entregar

## Templates disponíveis

| Arquivo | Para que serve | Quando usar |
|---------|----------------|-------------|
| `pagina-nova.html` | Esqueleto de página do site com nav, hero amb-*, seções, footer | Criar página nova no site |
| `case-novo.html` | Estrutura completa de case no padrão /caseamordebicho | Adicionar cliente novo nos cases |
| `newsletter.html` | Template HTML de email KA (MailerLite) | Criar novo email/newsletter |
| `roteiro.md` | Estrutura completa de roteiro estilo Rony/Well | Kelly pede roteiro novo |
| `legenda-instagram.md` | Estrutura de legenda só (sem roteiro) | Post de foto/carrossel |

## Placeholders universais

- `{{TITLE}}`, `{{DESCRIPTION}}`, `{{PATH}}` — meta tags de página
- `{{CLIENTE}}`, `{{TAGLINE}}`, `{{IMG_FOLDER}}` — dados de case
- `{{TEMA}}`, `{{MARCA_EXEMPLO}}`, `{{CTA_DESTINO}}` — dados de conteúdo

## Processo ao criar conteúdo (roteiro/legenda/newsletter)

1. **Ler as skills obrigatórias primeiro:**
   - `/mnt/skills/user/kelly-tom-de-voz/SKILL.md`
   - `/mnt/skills/user/kelly-tom-estilo-rony-well/SKILL.md`
2. **Pedir briefing à Kelly com `ask_user_input_v0`** (tema, marca-exemplo, CTA)
3. **Escrever seguindo o template + tom de voz**
4. **Rodar checklist do template** antes de entregar
5. **Entregar em chat** (não gerar .md a menos que Kelly peça)

## Processo ao criar página nova

1. Copiar `pagina-nova.html` para nova pasta
2. Escolher ambiente do hero no mapa (REGRAS-PROJETO.md) — não repetir vizinho
3. Substituir placeholders
4. Adicionar seções específicas do conteúdo
5. Rodar `lint-project.py`
6. Adicionar link da página nova no nav/footer/sitemap conforme o caso
7. Gerar ZIP

## Processo ao criar case novo

1. Copiar `case-novo.html` para `case{nomecliente}/index.html`
2. **Extrair paleta do Brand Book do cliente** (das imagens `/images/{cliente}/cover.jpg` e afins)
3. Substituir cores e conteúdo
4. Adicionar link em `/cases/index.html`
5. Rodar linter
6. Atualizar PENDENCIAS.md
