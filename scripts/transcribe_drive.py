#!/usr/bin/env python3
"""Transcreve vídeos de uma pasta do Google Drive usando a Whisper API da OpenAI.

Pipeline:
    Drive (OAuth) -> download -> ffmpeg (extrai áudio 16kHz mono mp3)
    -> OpenAI Whisper -> markdown com timestamps + .srt

Uso:
    python scripts/transcribe_drive.py \\
        --folder 1rzeBSXL9OxlVU6Bkg3hFriwRKqnAy4nv \\
        --output videos/transcricoes

Consulte scripts/README.md para o passo-a-passo de setup de credenciais.
"""
from __future__ import annotations

import argparse
import io
import json
import logging
import os
import re
import shutil
import subprocess
import sys
import tempfile
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

DEFAULT_FOLDER_ID = "1rzeBSXL9OxlVU6Bkg3hFriwRKqnAy4nv"
DEFAULT_OUTPUT_DIR = Path("videos/transcricoes")
DEFAULT_LANGUAGE = "pt"
DEFAULT_MODEL = "whisper-1"

CONFIG_DIR = Path.home() / ".config" / "ka-transcribe"
CREDENTIALS_PATH = CONFIG_DIR / "credentials.json"
TOKEN_PATH = CONFIG_DIR / "token.json"
SCOPES = ["https://www.googleapis.com/auth/drive.readonly"]

VIDEO_MIME_PREFIXES = ("video/",)
WHISPER_MAX_BYTES = 25 * 1024 * 1024  # limite da Whisper API

log = logging.getLogger("transcribe")


@dataclass
class DriveFile:
    file_id: str
    name: str
    mime_type: str
    size: int


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--folder", default=DEFAULT_FOLDER_ID, help="ID da pasta no Drive")
    p.add_argument("--output", type=Path, default=DEFAULT_OUTPUT_DIR, help="Diretório de saída")
    p.add_argument("--language", default=DEFAULT_LANGUAGE, help="Código ISO do idioma (ex: pt, en)")
    p.add_argument("--model", default=DEFAULT_MODEL, help="Modelo Whisper da OpenAI")
    p.add_argument("--force", action="store_true", help="Retranscrever mesmo se já houver output")
    p.add_argument("--limit", type=int, default=0, help="Processa no máximo N vídeos (0 = todos)")
    p.add_argument("--dry-run", action="store_true", help="Só lista os vídeos que seriam processados")
    p.add_argument("-v", "--verbose", action="store_true")
    return p.parse_args()


def build_drive_service():
    from google.auth.transport.requests import Request
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow
    from googleapiclient.discovery import build

    CONFIG_DIR.mkdir(parents=True, exist_ok=True)

    creds = None
    if TOKEN_PATH.exists():
        creds = Credentials.from_authorized_user_file(str(TOKEN_PATH), SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not CREDENTIALS_PATH.exists():
                sys.exit(
                    f"ERRO: {CREDENTIALS_PATH} não encontrado. "
                    "Veja scripts/README.md para gerar o OAuth client no Google Cloud."
                )
            flow = InstalledAppFlow.from_client_secrets_file(str(CREDENTIALS_PATH), SCOPES)
            creds = flow.run_local_server(port=0)
        TOKEN_PATH.write_text(creds.to_json())
        log.info("Token salvo em %s", TOKEN_PATH)

    return build("drive", "v3", credentials=creds, cache_discovery=False)


def list_videos(service, folder_id: str) -> list[DriveFile]:
    query = f"'{folder_id}' in parents and trashed = false"
    fields = "nextPageToken, files(id, name, mimeType, size)"
    files: list[DriveFile] = []
    page_token: str | None = None

    while True:
        resp = service.files().list(
            q=query,
            fields=fields,
            pageSize=100,
            pageToken=page_token,
            supportsAllDrives=True,
            includeItemsFromAllDrives=True,
        ).execute()

        for f in resp.get("files", []):
            mime = f.get("mimeType", "")
            if not any(mime.startswith(p) for p in VIDEO_MIME_PREFIXES):
                continue
            files.append(DriveFile(
                file_id=f["id"],
                name=f["name"],
                mime_type=mime,
                size=int(f.get("size", 0) or 0),
            ))

        page_token = resp.get("nextPageToken")
        if not page_token:
            break

    files.sort(key=lambda f: f.name.lower())
    return files


def download_file(service, drive_file: DriveFile, dest: Path) -> None:
    from googleapiclient.http import MediaIoBaseDownload

    request = service.files().get_media(fileId=drive_file.file_id, supportsAllDrives=True)
    with dest.open("wb") as fh:
        downloader = MediaIoBaseDownload(fh, request, chunksize=8 * 1024 * 1024)
        done = False
        while not done:
            status, done = downloader.next_chunk()
            if status:
                log.debug("  download %s: %d%%", drive_file.name, int(status.progress() * 100))


def extract_audio(video_path: Path, audio_path: Path) -> None:
    if not shutil.which("ffmpeg"):
        sys.exit("ERRO: ffmpeg não encontrado no PATH. Instale com 'sudo apt install ffmpeg'.")

    cmd = [
        "ffmpeg", "-y", "-loglevel", "error",
        "-i", str(video_path),
        "-vn", "-ac", "1", "-ar", "16000",
        "-c:a", "libmp3lame", "-b:a", "64k",
        str(audio_path),
    ]
    subprocess.run(cmd, check=True)


def transcribe(audio_path: Path, language: str, model: str) -> dict:
    from openai import OpenAI

    if audio_path.stat().st_size > WHISPER_MAX_BYTES:
        raise RuntimeError(
            f"Áudio extraído {audio_path.stat().st_size} bytes > limite da Whisper API "
            f"({WHISPER_MAX_BYTES}). Reduza o bitrate ou implemente chunking."
        )

    client = OpenAI()
    with audio_path.open("rb") as fh:
        resp = client.audio.transcriptions.create(
            model=model,
            file=fh,
            language=language,
            response_format="verbose_json",
            timestamp_granularities=["segment"],
        )

    if hasattr(resp, "model_dump"):
        return resp.model_dump()
    return json.loads(resp.json()) if hasattr(resp, "json") else dict(resp)


def format_timestamp_srt(seconds: float) -> str:
    ms = int(round(seconds * 1000))
    h, ms = divmod(ms, 3_600_000)
    m, ms = divmod(ms, 60_000)
    s, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


def format_timestamp_hhmmss(seconds: float) -> str:
    total = int(round(seconds))
    h, rem = divmod(total, 3600)
    m, s = divmod(rem, 60)
    return f"{h:02d}:{m:02d}:{s:02d}"


def write_markdown(md_path: Path, video_name: str, result: dict) -> None:
    segments = result.get("segments") or []
    lines = [f"# {video_name}", ""]
    duration = result.get("duration")
    language = result.get("language")
    meta_bits = []
    if duration is not None:
        meta_bits.append(f"duração: {format_timestamp_hhmmss(float(duration))}")
    if language:
        meta_bits.append(f"idioma: {language}")
    if meta_bits:
        lines.append(f"_{' · '.join(meta_bits)}_")
        lines.append("")

    if segments:
        for seg in segments:
            start = format_timestamp_hhmmss(float(seg.get("start", 0)))
            text = (seg.get("text") or "").strip()
            if not text:
                continue
            lines.append(f"**[{start}]** {text}")
            lines.append("")
    else:
        lines.append((result.get("text") or "").strip())
        lines.append("")

    md_path.write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")


def write_srt(srt_path: Path, result: dict) -> None:
    segments = result.get("segments") or []
    if not segments:
        return
    blocks = []
    for idx, seg in enumerate(segments, 1):
        start = format_timestamp_srt(float(seg.get("start", 0)))
        end = format_timestamp_srt(float(seg.get("end", 0)))
        text = (seg.get("text") or "").strip()
        if not text:
            continue
        blocks.append(f"{idx}\n{start} --> {end}\n{text}\n")
    srt_path.write_text("\n".join(blocks), encoding="utf-8")


def slugify(name: str) -> str:
    stem = Path(name).stem
    slug = re.sub(r"[^\w\-]+", "-", stem, flags=re.UNICODE).strip("-")
    return slug or "video"


def process_files(
    service,
    files: Iterable[DriveFile],
    output_dir: Path,
    language: str,
    model: str,
    force: bool,
) -> tuple[int, int, int]:
    output_dir.mkdir(parents=True, exist_ok=True)
    ok = skipped = failed = 0

    with tempfile.TemporaryDirectory(prefix="ka-transcribe-") as tmpdir:
        tmp = Path(tmpdir)

        for drive_file in files:
            slug = slugify(drive_file.name)
            md_path = output_dir / f"{slug}.md"
            srt_path = output_dir / f"{slug}.srt"

            if md_path.exists() and not force:
                log.info("· %s (já transcrito, pulando)", drive_file.name)
                skipped += 1
                continue

            log.info("▶ %s (%.1f MB)", drive_file.name, drive_file.size / 1_048_576)
            video_path = tmp / drive_file.name
            audio_path = tmp / f"{slug}.mp3"

            try:
                download_file(service, drive_file, video_path)
                extract_audio(video_path, audio_path)
                result = transcribe(audio_path, language=language, model=model)
                write_markdown(md_path, drive_file.name, result)
                write_srt(srt_path, result)
                log.info("  ✓ %s", md_path)
                ok += 1
            except Exception as exc:  # noqa: BLE001 — queremos continuar com os próximos
                log.exception("  ✗ falhou: %s", exc)
                failed += 1
            finally:
                for p in (video_path, audio_path):
                    if p.exists():
                        p.unlink()

    return ok, skipped, failed


def main() -> int:
    args = parse_args()
    logging.basicConfig(
        level=logging.DEBUG if args.verbose else logging.INFO,
        format="%(message)s",
    )

    if not os.environ.get("OPENAI_API_KEY") and not args.dry_run:
        sys.exit("ERRO: defina OPENAI_API_KEY no ambiente antes de rodar.")

    service = build_drive_service()
    files = list_videos(service, args.folder)

    if not files:
        log.warning("Nenhum vídeo encontrado na pasta %s", args.folder)
        return 0

    if args.limit:
        files = files[: args.limit]

    log.info("Encontrados %d vídeo(s) em %s", len(files), args.folder)
    for f in files:
        log.info("  - %s (%.1f MB, %s)", f.name, f.size / 1_048_576, f.mime_type)

    if args.dry_run:
        return 0

    ok, skipped, failed = process_files(
        service,
        files,
        output_dir=args.output,
        language=args.language,
        model=args.model,
        force=args.force,
    )
    log.info("")
    log.info("Resumo: %d ok · %d pulados · %d falhas", ok, skipped, failed)
    return 0 if failed == 0 else 1


if __name__ == "__main__":
    raise SystemExit(main())
