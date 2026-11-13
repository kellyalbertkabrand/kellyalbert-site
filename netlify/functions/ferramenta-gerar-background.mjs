// Segundo plano: a Inteligência Artificial escreve o relatório da Autoavaliação de Marca.
// Se falhar, o relatório das regras (já salvo) continua valendo.
import { loja } from "../ferramenta/base.mjs";
import { escreverRelatorio } from "../ferramenta/ia.mjs";

export default async (req) => {
  const { id, token } = await req.json().catch(() => ({}));
  if (!id || !token) return;
  const store = loja();
  const registro = await store.get(String(id), { type: "json" });
  if (!registro || registro.token !== token || registro.status !== "gerando") return;
  try {
    const texto = await escreverRelatorio(registro.dados, registro.classe);
    await store.setJSON(String(id), { ...registro, status: "pronto", token: null, resultado: { ...texto, fonte: "ia" }, geradoEm: new Date().toISOString() });
  } catch (erro) {
    console.error("Falha ao escrever o relatório da ferramenta", id, erro);
    await store.setJSON(String(id), { ...registro, status: "pronto", token: null, erro: String(erro) });
  }
};
