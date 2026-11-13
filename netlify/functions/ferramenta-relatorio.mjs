// Autoavaliação de Marca (ferramenta da aula): devolve um relatório do próprio participante (ou para a Kelly, no painel dela).
import { adminAutorizado, json, loja, usuarioDaSessao } from "../ferramenta/base.mjs";

export default async (req) => {
  const id = new URL(req.url).searchParams.get("id") || "";
  if (!/^r-[0-9a-f-]{36}$/.test(id)) return json({ erro: "Identificador inválido." }, 400);
  const registro = await loja().get(id, { type: "json" });
  if (!registro) return json({ erro: "Relatório não encontrado." }, 404);
  if (!adminAutorizado(req)) {
    const s = await usuarioDaSessao(req);
    if (s.erro) return json({ erro: s.erro, expirado: !!s.expirado }, s.status);
    if (registro.dono !== s.chave) return json({ erro: "Relatório não encontrado." }, 404);
  }
  return json({ id, status: registro.status, criadoEm: registro.criadoEm, dados: registro.dados, classe: registro.classe, resultado: registro.resultado });
};

export const config = { path: "/api/ferramenta/relatorio" };
