// Entrega as perguntas do diagnóstico para a página.
import { acessoAberto } from "../diagnostico/armazenamento.mjs";
import { conteudoPublico } from "../diagnostico/conteudo.mjs";

export default async () =>
  new Response(JSON.stringify({ ...conteudoPublico(), exigeCodigo: !acessoAberto() }), {
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "public, max-age=60" },
  });

export const config = { path: "/api/diagnostico/conteudo" };
