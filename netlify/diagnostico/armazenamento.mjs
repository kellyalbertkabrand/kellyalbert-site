// Armazenamento do diagnóstico (Netlify Blobs) e códigos de acesso.
import { getStore } from "@netlify/blobs";

export const diagnosticos = () => getStore({ name: "diagnosticos", consistency: "strong" });
const usosDeCodigo = () => getStore({ name: "diagnostico-codigos", consistency: "strong" });

export function json(dados, status = 200) {
  return new Response(JSON.stringify(dados), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

export function normalizarCodigo(codigo) {
  return String(codigo ?? "").trim().toUpperCase();
}

// Códigos válidos ficam na variável DIAGNOSTICO_CODIGOS, separados por vírgula.
function codigosValidos() {
  return (Netlify.env.get("DIAGNOSTICO_CODIGOS") ?? "").split(",").map(normalizarCodigo).filter(Boolean);
}

function limiteDeUsos() {
  return Number(Netlify.env.get("DIAGNOSTICO_USOS_POR_CODIGO") ?? "2");
}

// Modo aberto (testes): DIAGNOSTICO_ABERTO=sim dispensa o código de acesso.
// Por segurança, limita o total de diagnósticos por dia (DIAGNOSTICO_LIMITE_DIA, padrão 30).
export function acessoAberto() {
  return (Netlify.env.get("DIAGNOSTICO_ABERTO") ?? "").trim().toLowerCase() === "sim";
}

function chaveDoDia() {
  return "ABERTO-" + new Date().toISOString().slice(0, 10);
}

// Diz se o código existe e quantos diagnósticos ainda podem ser gerados com ele.
export async function situacaoDoCodigo(codigo) {
  if (acessoAberto()) {
    const limite = Number(Netlify.env.get("DIAGNOSTICO_LIMITE_DIA") ?? "30");
    const registro = (await usosDeCodigo().get(chaveDoDia(), { type: "json" })) ?? { usos: 0 };
    return { valido: true, restantes: Math.max(0, limite - registro.usos), aberto: true };
  }
  const c = normalizarCodigo(codigo);
  if (!c || !codigosValidos().includes(c)) return { valido: false, restantes: 0 };
  const registro = (await usosDeCodigo().get(c, { type: "json" })) ?? { usos: 0 };
  return { valido: true, restantes: Math.max(0, limiteDeUsos() - registro.usos) };
}

export async function registrarUso(codigo) {
  const c = acessoAberto() ? chaveDoDia() : normalizarCodigo(codigo);
  const store = usosDeCodigo();
  const registro = (await store.get(c, { type: "json" })) ?? { usos: 0 };
  registro.usos += 1;
  registro.ultimoUso = new Date().toISOString();
  await store.setJSON(c, registro);
}

// Dispara a função de segundo plano que conversa com a Inteligência Artificial.
export async function dispararGeracao(req, id, token) {
  await fetch(new URL("/.netlify/functions/diagnostico-gerar-background", req.url), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ id, token }),
  });
}
