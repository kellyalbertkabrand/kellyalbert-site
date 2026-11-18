// Diagnóstico Completo de Marca: recebe as 35 respostas e o código, marca o código como usado e dispara a Inteligência Artificial.
import { classificarCompleto, completoDeReserva, validarCompleto } from "../../valorpercebido/regras.mjs";
import { avaliacoes, json } from "../autoavaliacao/armazenamento.mjs";
import { lerCodigo, salvarCodigo } from "../completo/codigos.mjs";

export default async (req) => {
  if (req.method !== "POST") return json({ erro: "Use POST." }, 405);
  const corpo = await req.json().catch(() => null);
  const cod = await lerCodigo(corpo?.codigo);
  if (!cod) return json({ erro: "Código de liberação inválido." }, 403);
  if (cod.usadoEm) return json({ erro: "Este código já foi usado." }, 409);
  const v = validarCompleto(corpo);
  if (!v.ok) return json({ erro: v.erro }, 400);
  const cc = classificarCompleto(v.dados.respostas, v.dados.completo.respostas);
  const reserva = { ...completoDeReserva(cc), fonte: "regras" };
  const uuid = crypto.randomUUID(), id = "completo-" + uuid, token = crypto.randomUUID();
  await salvarCodigo({ ...cod, usadoEm: new Date().toISOString(), relatorio: uuid, empresa: v.dados.completo.empresa });
  await avaliacoes().setJSON(id, { status: "gerando", token, codigo: cod.codigo, dados: v.dados, classe: cc, resultado: reserva, criadoEm: new Date().toISOString() });
  await fetch(new URL("/.netlify/functions/completo-gerar-background", req.url), {
    method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ id, token }),
  }).catch((e) => console.error("Falha ao disparar o diagnóstico completo", e));
  return json({ id: uuid, status: "gerando", classe: cc, resultado: reserva });
};

export const config = { path: "/api/completo/iniciar" };
