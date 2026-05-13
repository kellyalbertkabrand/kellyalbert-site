// Cria campanhas no MailerLite a partir de arquivos .md em campaigns/
// Idempotente: pula campanhas já criadas (compara pelo "name" interno)
//
// Env vars necessárias:
//   MAILERLITE_API_KEY       - token de API do MailerLite (secret)
//   MAILERLITE_FROM_EMAIL    - email remetente (precisa estar verificado na conta)
//   MAILERLITE_FROM_NAME     - nome do remetente (default: "Kelly Albert")
//   MAILERLITE_DEFAULT_GROUP_ID - grupo destino padrão se .md não especificar
//
// Frontmatter aceito no .md:
//   subject:    string (obrigatório) - assunto do email
//   preheader:  string - texto de preview (mobile)
//   name:       string - nome interno (default: derivado do filename)
//   from_email: string - sobrepõe MAILERLITE_FROM_EMAIL
//   from_name:  string - sobrepõe MAILERLITE_FROM_NAME
//   groups:     array  - IDs OU nomes de grupos (resolvidos via API)
//                       se omitido, usa MAILERLITE_DEFAULT_GROUP_ID

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const API_BASE = "https://connect.mailerlite.com/api";
const KEY = process.env.MAILERLITE_API_KEY;
const FROM_EMAIL = process.env.MAILERLITE_FROM_EMAIL;
const FROM_NAME = process.env.MAILERLITE_FROM_NAME || "Kelly Albert";
const DEFAULT_GROUP = process.env.MAILERLITE_DEFAULT_GROUP_ID || null;
const CAMPAIGNS_DIR = path.resolve(process.cwd(), "campaigns");

if (!KEY) {
  console.error("❌ MAILERLITE_API_KEY ausente");
  process.exit(1);
}
if (!FROM_EMAIL) {
  console.error("❌ MAILERLITE_FROM_EMAIL ausente");
  process.exit(1);
}

async function api(p, opts = {}) {
  const res = await fetch(API_BASE + p, {
    ...opts,
    headers: {
      Authorization: `Bearer ${KEY}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(opts.headers || {}),
    },
  });
  const text = await res.text();
  let json = {};
  try { json = text ? JSON.parse(text) : {}; } catch (_) { json = { raw: text }; }
  if (!res.ok) {
    const err = new Error(`API ${res.status}: ${JSON.stringify(json).slice(0, 500)}`);
    err.status = res.status;
    err.body = json;
    throw err;
  }
  return json;
}

async function listAllCampaigns() {
  const out = [];
  let page = 1;
  while (true) {
    const resp = await api(`/campaigns?limit=100&filter[status]=draft&page=${page}`).catch(() => ({ data: [] }));
    const data = resp.data || [];
    out.push(...data);
    if (data.length < 100) break;
    page += 1;
    if (page > 10) break;
  }
  return out;
}

async function listAllGroups() {
  const resp = await api("/groups?limit=200");
  return resp.data || [];
}

function slugify(s) {
  return s
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

function wrapHtml(bodyHtml, preheader) {
  // Wrapper email-safe simples. Cada campanha define o próprio visual interno.
  return `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title></title></head><body style="margin:0;padding:0;background:#f4f1eb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">${preheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${preheader}</div>` : ""}<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f1eb;padding:20px 0;"><tr><td align="center"><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#fff;border-radius:8px;padding:30px;color:#333;line-height:1.6;font-size:15px;">${bodyHtml}</table><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;margin-top:20px;"><tr><td style="text-align:center;color:#888;font-size:12px;padding:10px;">Kelly Albert · KA Inteligência para Marcas · <a href="https://kellyalbert.com.br" style="color:#888;text-decoration:underline;">kellyalbert.com.br</a><br><a href="{$unsubscribe}" style="color:#888;text-decoration:underline;">Cancelar inscrição</a></td></tr></table></td></tr></table></body></html>`;
}

async function processCampaign(file, groupsByName, existingNames) {
  const fullPath = path.join(CAMPAIGNS_DIR, file);
  const raw = fs.readFileSync(fullPath, "utf8");
  const parsed = matter(raw);
  const fm = parsed.data || {};
  const md = parsed.content || "";

  if (!fm.subject) {
    console.log(`⏭️  ${file} — sem 'subject' no frontmatter, pulando`);
    return { status: "skip", reason: "no_subject" };
  }

  const slug = slugify(file.replace(/\.md$/, ""));
  const internalName = fm.name || `[ka] ${slug}`;

  if (existingNames.has(internalName)) {
    console.log(`✓ ${file} — já existe no MailerLite ("${internalName}"), pulando`);
    return { status: "exists", name: internalName };
  }

  // Resolve groups
  let groupIds = [];
  if (Array.isArray(fm.groups) && fm.groups.length) {
    for (const g of fm.groups) {
      const gs = String(g);
      if (/^\d+$/.test(gs) || gs.length > 15) {
        groupIds.push(gs);
      } else {
        const found = groupsByName.get(gs.toLowerCase());
        if (found) groupIds.push(found.id);
        else console.warn(`⚠️  Grupo "${gs}" não encontrado, ignorando`);
      }
    }
  }
  if (groupIds.length === 0 && DEFAULT_GROUP) groupIds = [DEFAULT_GROUP];

  if (groupIds.length === 0) {
    console.error(`❌ ${file} — sem grupos destino (use 'groups:' no frontmatter ou setMAILERLITE_DEFAULT_GROUP_ID)`);
    return { status: "error", reason: "no_groups" };
  }

  const bodyHtml = marked.parse(md, { mangle: false, headerIds: false });
  const fullHtml = wrapHtml(bodyHtml, fm.preheader);

  const payload = {
    name: internalName,
    language_id: 17, // pt-BR
    type: "regular",
    emails: [
      {
        subject: fm.subject,
        from_name: fm.from_name || FROM_NAME,
        from: fm.from_email || FROM_EMAIL,
        content: fullHtml,
      },
    ],
    groups: groupIds,
  };

  console.log(`📨 Criando: ${internalName}`);
  try {
    const resp = await api("/campaigns", { method: "POST", body: JSON.stringify(payload) });
    const id = resp?.data?.id;
    console.log(`✅ Criada como draft (id ${id})`);
    return { status: "created", id, name: internalName };
  } catch (err) {
    console.error(`❌ Falha ao criar ${file}:`, err.message);
    return { status: "error", reason: err.message };
  }
}

async function main() {
  if (!fs.existsSync(CAMPAIGNS_DIR)) {
    console.log("Diretório campaigns/ não existe, nada a fazer.");
    return;
  }
  const files = fs.readdirSync(CAMPAIGNS_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_") && f !== "README.md");

  if (files.length === 0) {
    console.log("Nenhum arquivo .md em campaigns/");
    return;
  }
  console.log(`📂 ${files.length} arquivo(s) em campaigns/`);

  const [existingCampaigns, groups] = await Promise.all([listAllCampaigns(), listAllGroups()]);
  const existingNames = new Set(existingCampaigns.map((c) => c.name));
  const groupsByName = new Map(groups.map((g) => [String(g.name).toLowerCase(), g]));

  console.log(`Encontrados ${groups.length} grupo(s) e ${existingCampaigns.length} draft(s) existente(s) no MailerLite\n`);

  const results = [];
  for (const file of files) {
    const r = await processCampaign(file, groupsByName, existingNames);
    results.push({ file, ...r });
  }

  const created = results.filter((r) => r.status === "created").length;
  const existing = results.filter((r) => r.status === "exists").length;
  const errors = results.filter((r) => r.status === "error").length;
  console.log(`\n────────────────────`);
  console.log(`Resumo: ${created} criada(s) · ${existing} já existia(m) · ${errors} erro(s)`);
  if (errors > 0) process.exit(1);
}

main().catch((err) => {
  console.error("💥 Erro fatal:", err);
  process.exit(1);
});
