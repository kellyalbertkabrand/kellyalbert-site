// Função de segundo plano: conversa com a Inteligência Artificial e salva o diagnóstico.
import { diagnosticos } from "../diagnostico/armazenamento.mjs";
import { faixaDaNota } from "../diagnostico/conteudo.mjs";
import { gerarDiagnostico } from "../diagnostico/ia.mjs";

export default async (req) => {
  const { id, token } = await req.json().catch(() => ({}));
  if (!id || !token) return;

  const store = diagnosticos();
  const registro = await store.get(String(id), { type: "json" });
  // O token impede que alguém de fora dispare gerações (e custos) por conta própria.
  if (!registro || registro.token !== token || registro.status !== "gerando") return;

  try {
    const resultado = await gerarDiagnostico(registro.perfil, registro.respostas);
    const notaGeral = Math.round(resultado.dimensoes.reduce((s, d) => s + d.nota, 0) / resultado.dimensoes.length);
    const faixa = faixaDaNota(notaGeral);
    await store.setJSON(String(id), {
      ...registro,
      status: "pronto",
      token: null,
      notaGeral,
      faixa: { nome: faixa.nome, resumo: faixa.resumo },
      resultado,
      geradoEm: new Date().toISOString(),
    });
  } catch (erro) {
    console.error("Falha ao gerar diagnóstico", id, erro);
    // Numa atualização que falhou, o resultado anterior continua disponível.
    const voltaAoAnterior = registro.resultado ? "pronto" : "erro";
    await store.setJSON(String(id), { ...registro, status: voltaAoAnterior, token: null, erro: String(erro) });
  }
};
