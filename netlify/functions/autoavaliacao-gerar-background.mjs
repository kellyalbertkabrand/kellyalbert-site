// Segundo plano: a Inteligência Artificial escreve o texto do resultado.
// Se falhar, o resultado das regras (já salvo) continua valendo.
import { avaliacoes } from "../autoavaliacao/armazenamento.mjs";
import { escreverResultado } from "../autoavaliacao/ia.mjs";

export default async (req) => {
  const { id, token } = await req.json().catch(() => ({}));
  if (!id || !token) return;
  const store = avaliacoes();
  const registro = await store.get(String(id), { type: "json" });
  // O token impede que alguém de fora dispare gerações (e custos) por conta própria.
  if (!registro || registro.token !== token || registro.status !== "gerando") return;
  try {
    const texto = await escreverResultado(registro.dados, registro.classe);
    await store.setJSON(String(id), { ...registro, status: "pronto", token: null, resultado: { ...texto, fonte: "ia" }, geradoEm: new Date().toISOString() });
  } catch (erro) {
    console.error("Falha ao escrever a autoavaliação", id, erro);
    await store.setJSON(String(id), { ...registro, status: "pronto", token: null, erro: String(erro) });
  }
};
