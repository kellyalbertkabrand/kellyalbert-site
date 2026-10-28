// Devolve a situação e o resultado de um diagnóstico pelo seu identificador.
import { diagnosticos, json } from "../diagnostico/armazenamento.mjs";

export default async (req) => {
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return json({ erro: "informe o id" }, 400);
  const registro = await diagnosticos().get(id, { type: "json" });
  if (!registro) return json({ erro: "diagnóstico não encontrado" }, 404);

  const { status, perfil, respostas, notaGeral, faixa, resultado, geradoEm } = registro;
  if (status !== "pronto") return json({ status });
  return json({
    status,
    perfil: { nome: perfil.nome, marca: perfil.marca, segmento: perfil.segmento, tempo: perfil.tempo || "" },
    respostas,
    notaGeral,
    faixa,
    resultado,
    geradoEm,
  });
};

export const config = { path: "/api/diagnostico/resultado" };
