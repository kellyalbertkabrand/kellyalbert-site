# Transcrição de vídeos do Google Drive

Script em Python que lista vídeos de uma pasta do Google Drive, baixa cada um,
extrai o áudio com `ffmpeg` e envia para a Whisper API da OpenAI. O resultado
fica em `videos/transcricoes/<slug>.md` (com timestamps por segmento) e
`videos/transcricoes/<slug>.srt` (legendas).

## 1. Pré-requisitos do sistema

```bash
sudo apt update
sudo apt install -y python3 python3-pip ffmpeg
```

Verifique:

```bash
python3 --version   # 3.10+
ffmpeg -version
```

## 2. Ambiente Python

A partir da raiz do repo:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r scripts/requirements.txt
```

## 3. Credenciais do Google Drive (OAuth desktop)

Precisamos de um OAuth client do tipo **Desktop app** com o escopo
`drive.readonly`. Passos (faz uma vez só):

1. Acesse <https://console.cloud.google.com/>.
2. Crie (ou reutilize) um projeto — nome livre, ex.: `ka-transcribe`.
3. No menu lateral: **APIs & Services → Library**. Procure **Google Drive
   API** e clique em **Enable**.
4. **APIs & Services → OAuth consent screen**:
   - User type: **External**
   - Preencha nome do app, e-mail de suporte e e-mail do desenvolvedor.
   - Em **Test users**, adicione o e-mail da conta Google que tem acesso à
     pasta dos vídeos.
   - Pode deixar o app em modo **Testing** — não precisa publicar.
5. **APIs & Services → Credentials → Create credentials → OAuth client ID**:
   - Application type: **Desktop app**
   - Nome livre, ex.: `ka-transcribe-cli`
   - Clique em **Create** e depois em **Download JSON**.
6. Salve o arquivo baixado como:

   ```bash
   mkdir -p ~/.config/ka-transcribe
   mv ~/Downloads/client_secret_*.json ~/.config/ka-transcribe/credentials.json
   ```

Na primeira execução, o script abre o navegador para você aprovar o acesso e
salva um token em `~/.config/ka-transcribe/token.json`. Execuções seguintes
reusam esse token automaticamente.

> A pasta `1rzeBSXL9OxlVU6Bkg3hFriwRKqnAy4nv` precisa estar acessível pela
> conta Google usada no passo 4 (dono ou compartilhada com ela).

## 4. Chave da OpenAI

```bash
export OPENAI_API_KEY="sk-..."
```

Custo estimado: ~US$ 0,006/minuto de áudio (Whisper `whisper-1`). Para os 22
vídeos de até 2 min cada, dá aproximadamente **US$ 0,27 no total**.

## 5. Rodar

```bash
# listar o que seria processado (sem baixar nada)
python scripts/transcribe_drive.py --dry-run

# rodar normal
python scripts/transcribe_drive.py

# só os 3 primeiros, para testar
python scripts/transcribe_drive.py --limit 3

# retranscrever tudo do zero
python scripts/transcribe_drive.py --force
```

Flags úteis:

| Flag | Descrição |
| --- | --- |
| `--folder <id>` | ID da pasta do Drive (default: a pasta dos 22 vídeos) |
| `--output <dir>` | Diretório de saída (default: `videos/transcricoes`) |
| `--language pt`  | Código ISO do idioma (default `pt`) |
| `--model whisper-1` | Modelo Whisper da OpenAI |
| `--limit N` | Processa no máximo N vídeos |
| `--force` | Retranscrever mesmo se o `.md` já existe |
| `--dry-run` | Só lista os vídeos |
| `-v` | Logs verbosos |

## 6. O que o script faz com cada vídeo

1. Baixa o arquivo para um diretório temporário (limpo ao final).
2. Extrai áudio mono 16 kHz MP3 @ 64 kbps com `ffmpeg` (fica bem abaixo do
   limite de 25 MB da Whisper API, mesmo para vídeos grandes).
3. Envia para `audio.transcriptions` com `response_format=verbose_json` e
   `timestamp_granularities=["segment"]`.
4. Gera:
   - `videos/transcricoes/<slug>.md` — texto com timestamps `[hh:mm:ss]`
     por segmento.
   - `videos/transcricoes/<slug>.srt` — legendas prontas para vídeo.
5. Se o `.md` já existe, pula (a menos que você passe `--force`).

## 7. Troubleshooting

- **`ffmpeg não encontrado`** → `sudo apt install ffmpeg`.
- **`credentials.json não encontrado`** → refaça o passo 3.
- **403 do Drive** → verifique se a conta adicionada em *Test users* é a
  mesma que tem acesso à pasta.
- **`Áudio extraído ... > limite da Whisper API`** → só acontece com áudios
  muito longos; para os vídeos de 2 min isso não ocorre. Se precisar, reduza
  `-b:a 64k` para `32k` no script.
- **Token expirado** → apague `~/.config/ka-transcribe/token.json` e rode de
  novo para reautorizar.
