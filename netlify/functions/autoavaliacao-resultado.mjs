// Devolve o resultado do Teste de Autoavaliação de Marca (a página consulta até ficar pronto).
import { avaliacoes, json } from "../autoavaliacao/armazenamento.mjs";

export default async (req) => {
  const id = new URL(req.url).searchParams.get("id");
  if (!id || !/^[0-9a-f-]{36}$/.test(id)) return json({ erro: "Identificador inválido." }, 400);
  const registro = await avaliacoes().get(id, { type: "json" });
  if (!registro) return json({ erro: "Não encontrado." }, 404);
  return json({ id, status: registro.status, classe: registro.classe, resultado: registro.resultado });
};

export const config = { path: "/api/autoavaliacao/resultado" };
