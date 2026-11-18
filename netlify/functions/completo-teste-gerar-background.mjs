// Segundo plano (AMBIENTE DE TESTE): a Inteligência Artificial escreve o Diagnóstico Completo.
import { avaliacoes } from "../autoavaliacao/armazenamento.mjs";
import { escreverCompleto } from "../completo-teste/ia.mjs";

export default async (req) => {
  const { id, token } = await req.json().catch(() => ({}));
  if (!id || !token) return;
  const store = avaliacoes();
  const reg = await store.get(String(id), { type: "json" });
  if (!reg || reg.token !== token || reg.status !== "gerando") return;
  try {
    const texto = await escreverCompleto(reg.dados, reg.classe);
    await store.setJSON(String(id), { ...reg, status: "pronto", token: null, resultado: { ...texto, fonte: "ia" }, geradoEm: new Date().toISOString() });
  } catch (erro) {
    console.error("Falha no diagnóstico completo (teste)", id, erro);
    await store.setJSON(String(id), { ...reg, status: "pronto", token: null, erro: String(erro) });
  }
};
