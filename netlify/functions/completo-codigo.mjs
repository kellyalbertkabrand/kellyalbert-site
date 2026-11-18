// Diagnóstico Completo de Marca: confere o código de liberação antes de abrir as 24 perguntas.
import { json } from "../autoavaliacao/armazenamento.mjs";
import { lerCodigo } from "../completo/codigos.mjs";

export default async (req) => {
  if (req.method !== "POST") return json({ erro: "Use POST." }, 405);
  const { codigo } = await req.json().catch(() => ({}));
  const r = await lerCodigo(codigo);
  if (!r) return json({ valido: false, erro: "Código não encontrado. Confira as letras e os números." }, 404);
  if (r.usadoEm) return json({ valido: false, erro: "Este código já foi usado. Fale com a Kelly se precisar de ajuda." }, 409);
  return json({ valido: true });
};

export const config = { path: "/api/completo/codigo" };
