# _components/ — Biblioteca de componentes do site KA

Snippets HTML prontos que já seguem o sistema visual e passam no linter.

## Quando usar

Sempre que for criar uma página nova ou adicionar uma seção padronizada em página existente. Em vez de copiar de outra página (e arriscar pegar variação divergente), copie daqui.

## Componentes disponíveis

| Arquivo | Para que serve | Onde colar |
|---------|----------------|------------|
| `head.html` | `<head>` padrão com meta tags, OG, favicon, CSS | topo do HTML |
| `nav.html` | Nav padrão com dropdown Produtos | logo após `<body>` |
| `footer.html` | Footer padrão com 3 colunas + CNPJ | antes de `</body>` |
| `cta-potencia.html` | Seção final "Sua marca tem Potência" | antes do footer |
| `secao-kelly.html` | "Quem está por trás" com foto + bio + Time KA | em produtos (Livro/Mentoria/Programa/Direção) |
| `secao-empresas.html` | "Empresas que já passaram" com 8 logos | institucional |

## Placeholders

Arquivos com `{{VARIAVEL}}` precisam de substituição antes de usar:

- `{{TITLE}}` — título da página (ex: "Livro Marca com Essência")
- `{{DESCRIPTION}}` — meta description (máx 160 caracteres)
- `{{PATH}}` — path URL sem trailing slash (ex: "/livro")

## Regras

1. **Nunca editar um componente sem discutir com Kelly.** Se precisar ajustar o texto da Kelly (bio, Time KA etc), isso é decisão editorial, não técnica.
2. **Nunca reescrever seção padronizada em outra página.** Copie daqui.
3. **Componentes são fonte única de verdade.** Se divergir entre arquivos do site, a verdade está aqui.
4. **Antes de gerar ZIP, rodar `lint-project.py`** — componentes já passam, mas páginas que os usam podem quebrar contexto.

## Atualização

Quando Kelly decidir mudança em texto padrão (ex: atualizar bio dela), atualizar o componente aqui E atualizar manualmente cada página que já usa. Para evitar desvio, a ordem é:

1. Editar o componente
2. Usar `grep` pra achar todas as páginas com o trecho antigo
3. Atualizar uma a uma
4. Rodar linter
5. ZIP
