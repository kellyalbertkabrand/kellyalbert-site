// Confere um código de acesso antes de a pessoa começar a responder.
import { json, situacaoDoCodigo } from "../diagnostico/armazenamento.mjs";

export default async (req) => {
  if (req.method !== "POST") return json({ erro: "método não permitido" }, 405);
  const { codigo } = await req.json().catch(() => ({}));
  return json(await situacaoDoCodigo(codigo));
};

export const config = { path: "/api/diagnostico/codigo" };
