// Diagnóstico Completo de Marca: devolve o relatório (a página consulta até ficar pronto).
import { avaliacoes, json } from "../autoavaliacao/armazenamento.mjs";

export default async (req) => {
  const id = new URL(req.url).searchParams.get("id");
  if (!id || !/^[0-9a-f-]{36}$/.test(id)) return json({ erro: "Identificador inválido." }, 400);
  const reg = await avaliacoes().get("completo-" + id, { type: "json" });
  if (!reg) return json({ erro: "Não encontrado." }, 404);
  return json({ id, status: reg.status, classe: reg.classe, resultado: reg.resultado });
};

export const config = { path: "/api/completo/resultado" };
