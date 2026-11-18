// Diagnóstico Completo (AMBIENTE DE TESTE): recebe as 35 respostas, classifica e dispara a Inteligência Artificial em segundo plano.
import { classificarCompleto, completoDeReserva, validarCompleto } from "../../diagnostico-completo-teste/regras.mjs";
import { avaliacoes, json, reservarUsoDoDia } from "../autoavaliacao/armazenamento.mjs";

export default async (req) => {
  if (req.method !== "POST") return json({ erro: "Use POST." }, 405);
  const v = validarCompleto(await req.json().catch(() => null));
  if (!v.ok) return json({ erro: v.erro }, 400);
  const cc = classificarCompleto(v.dados.respostas, v.dados.completo.respostas);
  const reserva = { ...completoDeReserva(cc), fonte: "regras" };
  const uuid = crypto.randomUUID(), id = "completo-teste-" + uuid, token = crypto.randomUUID();
  const comIA = await reservarUsoDoDia().catch(() => false);
  await avaliacoes().setJSON(id, { status: comIA ? "gerando" : "pronto", token: comIA ? token : null, dados: v.dados, classe: cc, resultado: reserva, criadoEm: new Date().toISOString() });
  if (comIA) {
    await fetch(new URL("/.netlify/functions/completo-teste-gerar-background", req.url), {
      method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ id, token }),
    }).catch((e) => console.error("Falha ao disparar o diagnóstico completo", e));
  }
  return json({ id: uuid, status: comIA ? "gerando" : "pronto", classe: cc, resultado: reserva });
};

export const config = { path: "/api/completo-teste/iniciar" };
