// Autoavaliação de Marca (ferramenta da aula): armazenamento, senhas e sessões.
import { getStore } from "@netlify/blobs";
import { createHash, createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

export const loja = () => getStore({ name: "ferramenta-autoavaliacao", consistency: "strong" });

export function json(dados, status = 200) {
  return new Response(JSON.stringify(dados), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

export const normalizarEmail = (e) => String(e ?? "").trim().toLowerCase();
export const emailValido = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);
const hash = (t) => createHash("sha256").update(t).digest("hex");
export const chaveUsuario = (email) => "u-" + hash(normalizarEmail(email)).slice(0, 40);

// Data da aula: o acesso vale 60 dias a partir dela (ajustável pelas variáveis do Netlify).
export function validadePadrao() {
  const inicio = Netlify.env.get("FERRAMENTA_INICIO") || "2026-11-21";
  const dias = Number(Netlify.env.get("FERRAMENTA_DIAS") || "60");
  const base = new Date(inicio + "T12:00:00-03:00");
  const comeco = Date.now() > base.getTime() ? new Date() : base;
  return new Date(comeco.getTime() + dias * 86400000).toISOString();
}

export const limiteDeRelatorios = () => Number(Netlify.env.get("FERRAMENTA_RELATORIOS_MAX") || "6");

// Senhas: guardadas só como hash (scrypt com sal).
const ALFABETO = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
export function gerarSenha() {
  const b = randomBytes(8);
  let s = "";
  for (let i = 0; i < 8; i++) s += ALFABETO[b[i] % ALFABETO.length];
  return s.slice(0, 4) + "-" + s.slice(4);
}
const normalizarSenha = (s) => String(s ?? "").trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
export function protegerSenha(senha) {
  const sal = randomBytes(16).toString("hex");
  return { sal, senhaHash: scryptSync(normalizarSenha(senha), sal, 32).toString("hex") };
}
export function conferirSenha(senha, usuario) {
  if (!usuario?.sal || !usuario?.senhaHash) return false;
  const a = scryptSync(normalizarSenha(senha), usuario.sal, 32);
  const b = Buffer.from(usuario.senhaHash, "hex");
  return a.length === b.length && timingSafeEqual(a, b);
}

// Sessão: token assinado (válido por 30 dias, e sempre limitado à validade do acesso).
function segredo() {
  const s = Netlify.env.get("FERRAMENTA_SEGREDO") || "";
  if (s.length >= 16) return s;
  return hash("ka-ferramenta|" + (Netlify.env.get("ANTHROPIC_API_KEY") || "") + "|" + (Netlify.env.get("FERRAMENTA_ADMIN_SENHA") || ""));
}
const b64 = (t) => Buffer.from(t).toString("base64url");
export function criarToken(chave) {
  const corpo = b64(JSON.stringify({ k: chave, x: Date.now() + 30 * 86400000 }));
  return corpo + "." + createHmac("sha256", segredo()).update(corpo).digest("base64url");
}
function lerToken(token) {
  const [corpo, assinatura] = String(token ?? "").split(".");
  if (!corpo || !assinatura) return null;
  const certa = createHmac("sha256", segredo()).update(corpo).digest("base64url");
  if (certa.length !== assinatura.length || !timingSafeEqual(Buffer.from(certa), Buffer.from(assinatura))) return null;
  try {
    const d = JSON.parse(Buffer.from(corpo, "base64url").toString());
    return d.x > Date.now() ? d.k : null;
  } catch { return null; }
}

// Confere a sessão e a validade do acesso. Devolve { usuario, chave } ou { erro, status }.
export async function usuarioDaSessao(req) {
  const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  const chave = lerToken(token);
  if (!chave) return { erro: "Sessão expirada. Entre novamente.", status: 401 };
  const usuario = await loja().get(chave, { type: "json" });
  if (!usuario) return { erro: "Acesso não encontrado.", status: 401 };
  if (new Date(usuario.expiraEm).getTime() < Date.now()) return { erro: "Seu acesso de 60 dias terminou. Fale com a Kelly para saber como continuar.", status: 403, expirado: true };
  return { usuario, chave };
}

export function adminAutorizado(req) {
  const senha = Netlify.env.get("FERRAMENTA_ADMIN_SENHA") || "";
  const enviada = req.headers.get("x-admin-senha") || "";
  if (senha.length < 8 || !enviada) return false;
  const a = Buffer.from(hash(senha)), b = Buffer.from(hash(enviada));
  return timingSafeEqual(a, b);
}

// Resumo seguro do usuário (sem senha).
export function publico(u) {
  return { nome: u.nome, email: u.email, whatsapp: u.whatsapp || "", criadoEm: u.criadoEm, expiraEm: u.expiraEm, ultimoAcesso: u.ultimoAcesso || null, relatorios: (u.relatorios || []).length };
}
