// Diagnóstico Completo de Marca · códigos de liberação (cada código libera um diagnóstico).
import { randomBytes } from "node:crypto";
import { loja } from "../ferramenta/base.mjs";

const ALFABETO = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
export const normalizarCodigo = (c) => { const s = String(c ?? "").toUpperCase().replace(/[^A-Z0-9]/g, ""); return s.startsWith("KA") ? s.slice(2) : s; };
const chave = (c) => "cod-" + normalizarCodigo(c);
export const formatar = (c) => "KA-" + normalizarCodigo(c);

export function gerarCodigo() {
  const b = randomBytes(6);
  let s = "";
  for (let i = 0; i < 6; i++) s += ALFABETO[b[i] % ALFABETO.length];
  return s;
}

export async function lerCodigo(codigo) {
  const c = normalizarCodigo(codigo);
  if (c.length !== 6) return null;
  return loja().get(chave(c), { type: "json" });
}

export async function salvarCodigo(registro) {
  await loja().setJSON(chave(registro.codigo), registro);
}

export async function criarCodigos(qtd, nome, whatsapp) {
  const criados = [];
  for (let i = 0; i < qtd; i++) {
    let c = gerarCodigo();
    while (await lerCodigo(c)) c = gerarCodigo();
    const r = { codigo: c, nome: nome || "", whatsapp: whatsapp || "", criadoEm: new Date().toISOString(), usadoEm: null, relatorio: null, empresa: null };
    await salvarCodigo(r);
    criados.push(r);
  }
  return criados;
}

export async function listarCodigos() {
  const store = loja();
  const { blobs } = await store.list({ prefix: "cod-" });
  const lista = [];
  for (const b of blobs) { const r = await store.get(b.key, { type: "json" }); if (r) lista.push(r); }
  return lista.sort((a, b) => (b.criadoEm || "").localeCompare(a.criadoEm || ""));
}
