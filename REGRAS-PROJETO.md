# Regras do Projeto · KA

> Regras operacionais obrigatórias antes de qualquer alteração no site.

---

## Antes de editar

1. **Ler `INICIO-DE-CHAT-KA.md` em toda nova conversa**
2. **Ler `DECISOES.md`** para entender o histórico recente
3. **Ler `PENDENCIAS.md`** para saber o que está aberto

---

## Ao editar

### Padrões técnicos

1. **Toda seção com fundo escuro precisa da classe `amb-*`**:
   - `amb-marinho` · `#152535`
   - `amb-preto` · `#0F1923`
   - `amb-cobre` · `#8B5A2B`
   - `amb-essencia` · `#3D6B7E`
   - `amb-escuro` · bege escuro
   - Elas têm `!important` no CSS para não serem sobrescritas pelo `.hero` global

2. **Texturas de fundo** usam `est-*`:
   - `est-grid` (quadrados 32px) — padrão do body
   - `est-dots` (pontos 22px)
   - `est-diamond` (losangos)
   - `est-verticais` (listras verticais)

3. **Hero dos cases individuais** NÃO usa `amb-*` nem `est-*`. Tem textura de pontos diagonais inline (ver INICIO-DE-CHAT-KA seção 3.2).

### Cores aprovadas (HEX)

**Ambientes (fundo):**
- Papel `#F8F7F2` · Bege Leve `#F7F3EA` · Bege Papel `#EDE8DD` · Bege Quente `#E8DFCE`
- Cobre `#8B5A2B` · Caramelo `#C47830` · Azul Essência `#3D6B7E` · Azul Marinho `#152535` · Preto `#0F1923`

**Acentos (nunca fundo de seção):**
- Dourado `#B89B6A` · Dourado Claro `#D4C49E` · Mostarda `#E0B880`
- Verde Diagnóstico `#4ADE80` · Verde WhatsApp `#25D366` · Verde Botão `#2E8B57`

**Neutros:**
- t-900 `#1A1A1A` · t-800 `#2A2A2A` · t-700 `#3D3D3D` · t-600 `#5A5A5A` · t-500 `#777`
- Creme `#EDE8DD` (texto sobre escuro) · Branco `#FFFFFF`

### Tipografia

- **Playfair Display**: H1, H2, H3, quotes, números romanos (400, 500, 600, 700 + itálico)
- **Montserrat**: corpo, botões, menu, labels pill (400, 500, 600, 700 + itálico)
- **Outfit 700**: APENAS preços grandes (R$ 117, R$ 1.200)

### Hero padrão dos cases

Ver `INICIO-DE-CHAT-KA.md` seção 3.2. Não usar marker, não usar sublinhado, não usar pitanga.

---

## Antes de empacotar

1. **Rodar linter**: `python3 /home/claude/site-full/lint-project.py`
2. Se falhou, **corrigir** antes de prosseguir
3. Se passou com "✅ PASSOU", gerar ZIP:

```bash
cd /home/claude/site-full && zip -rq /mnt/user-data/outputs/kellyalbert-site-vXX.zip . -x "*.DS_Store" "docs/*" "programa/hero-video.mp4"
```

---

## NUNCA fazer

- ❌ Marker dourado com `background-image: linear-gradient` (use cor + peso 700)
- ❌ `text-decoration: underline` (proibido globalmente)
- ❌ Pintar © com cor diferente da palavra anterior
- ❌ Usar Pitanga `#ED4E2C` como destaque
- ❌ Botão retangular ou sem uppercase
- ❌ Comprimir seções — respiração vertical é parte da estética
- ❌ Seção com fundo escuro sem classe `amb-*`
- ❌ Empacotar ZIP sem rodar linter
- ❌ Gerar documento .md separado a menos que Kelly peça
- ❌ Enquadrar cliente de case negativamente

---

## Linter — o que ele verifica

A, B, C, D, E, F, G — sete categorias:
- A · Contraste entre fundo e texto
- B · Fundos sem classe `amb-*`
- C · Preços
- D · CTAs
- E · Links
- F · Imagens (tamanho / formato)
- G · Estrutura

Localização: `/home/claude/site-full/lint-project.py`
Deve retornar `exit 0` antes de gerar ZIP.
