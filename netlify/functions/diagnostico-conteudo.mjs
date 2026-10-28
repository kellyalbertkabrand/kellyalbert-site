// Entrega as perguntas do diagnóstico para a página.
import { conteudoPublico } from "../diagnostico/conteudo.mjs";

export default async () =>
  new Response(JSON.stringify(conteudoPublico()), {
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "public, max-age=300" },
  });

export const config = { path: "/api/diagnostico/conteudo" };
