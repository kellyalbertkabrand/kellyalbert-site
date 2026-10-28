// Recebe as 35 respostas, guarda e dispara a geração do diagnóstico.
// Também serve para tentar de novo quando uma geração falhou (sem gastar outro uso do código).
import { randomUUID } from "node:crypto";
import { diagnosticos, dispararGeracao, json, normalizarCodigo, registrarUso, situacaoDoCodigo } from "../diagnostico/armazenamento.mjs";
import { validarRespostas } from "../diagnostico/conteudo.mjs";

const DEZ_MINUTOS = 10 * 60 * 1000;

export default async (req) => {
  if (req.method !== "POST") return json({ erro: "método não permitido" }, 405);
  const corpo = await req.json().catch(() => null);
  if (!corpo) return json({ erro: "pedido inválido" }, 400);

  const store = diagnosticos();

  // Nova tentativa de um diagnóstico que falhou ou travou.
  if (corpo.id) {
    const registro = await store.get(String(corpo.id), { type: "json" });
    if (!registro) return json({ erro: "diagnóstico não encontrado" }, 404);
    const travado = registro.status === "gerando" && Date.now() - new Date(registro.iniciadoEm).getTime() > DEZ_MINUTOS;
    if (registro.status !== "erro" && !travado) return json({ id: corpo.id, status: registro.status });
    registro.status = "gerando";
    registro.iniciadoEm = new Date().toISOString();
    registro.token = randomUUID();
    registro.erro = null;
    await store.setJSON(String(corpo.id), registro);
    await dispararGeracao(req, corpo.id, registro.token);
    return json({ id: corpo.id, status: "gerando" });
  }

  const codigo = normalizarCodigo(corpo.codigo);
  const situacao = await situacaoDoCodigo(codigo);
  if (!situacao.valido) return json({ erro: "código inválido" }, 403);
  if (situacao.restantes <= 0) return json({ erro: "este código já foi usado" }, 429);

  const problemas = validarRespostas(corpo.perfil, corpo.respostas);
  if (problemas.length) return json({ erro: "há respostas faltando", problemas }, 400);

  const id = randomUUID();
  const token = randomUUID();
  const agora = new Date().toISOString();
  await store.setJSON(id, {
    status: "gerando",
    codigo,
    perfil: corpo.perfil,
    respostas: corpo.respostas,
    criadoEm: agora,
    iniciadoEm: agora,
    token,
  });
  await registrarUso(codigo);
  await dispararGeracao(req, id, token);
  return json({ id, status: "gerando" });
};

export const config = { path: "/api/diagnostico/iniciar" };
