// Recebe as respostas do Teste de Autoavaliação de Marca, classifica pelas regras e
// dispara a Inteligência Artificial em segundo plano para escrever o texto do resultado.
import { classificar, textosDeReserva, validarEntrada } from "../../valorpercebido/regras.mjs";
import { avaliacoes, json, reservarUsoDoDia } from "../autoavaliacao/armazenamento.mjs";

export default async (req) => {
  if (req.method !== "POST") return json({ erro: "Use POST." }, 405);
  const corpo = await req.json().catch(() => null);
  const v = validarEntrada(corpo);
  if (!v.ok) return json({ erro: v.erro }, 400);

  const dados = v.dados;
  const classe = classificar(dados.respostas);
  const reserva = textosDeReserva(classe, dados.dificuldades);
  const id = crypto.randomUUID();
  const comIA = await reservarUsoDoDia().catch(() => false);
  const token = crypto.randomUUID();

  await avaliacoes().setJSON(id, {
    status: comIA ? "gerando" : "pronto",
    token: comIA ? token : null,
    dados,
    classe,
    resultado: { ...reserva, fonte: "regras" },
    criadoEm: new Date().toISOString(),
  });

  if (comIA) {
    await fetch(new URL("/.netlify/functions/autoavaliacao-gerar-background", req.url), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id, token }),
    }).catch((e) => console.error("Falha ao disparar a geração", e));
  }

  return json({ id, status: comIA ? "gerando" : "pronto", classe, resultado: { ...reserva, fonte: "regras" } });
};

export const config = { path: "/api/autoavaliacao/iniciar" };
