// Autoavaliação de Marca (ferramenta da aula): painel da Kelly para liberar e gerenciar acessos.
// Protegido pela variável FERRAMENTA_ADMIN_SENHA (enviada no cabeçalho x-admin-senha).
import { criarCodigos, formatar, listarCodigos } from "../completo/codigos.mjs";
import { adminAutorizado, chaveUsuario, emailValido, gerarSenha, json, loja, normalizarEmail, protegerSenha, publico, validadePadrao } from "../ferramenta/base.mjs";

const limpa = (v, max) => String(v ?? "").replace(/\s+/g, " ").trim().slice(0, max);

export default async (req) => {
  if (req.method !== "POST") return json({ erro: "Use POST." }, 405);
  if (!adminAutorizado(req)) return json({ erro: "Senha de administração incorreta." }, 401);
  const corpo = await req.json().catch(() => ({}));
  const store = loja();

  // Diagnóstico Completo de Marca: códigos de liberação.
  if (corpo.acao === "codigos-listar") {
    const lista = await listarCodigos();
    return json({ codigos: lista.map((c) => ({ ...c, codigo: formatar(c.codigo) })) });
  }
  if (corpo.acao === "codigos-criar") {
    const qtd = Math.max(1, Math.min(50, Number(corpo.quantidade) || 1));
    const criados = await criarCodigos(qtd, limpa(corpo.nome, 80), limpa(corpo.whatsapp, 30));
    return json({ criados: criados.map((c) => ({ ...c, codigo: formatar(c.codigo) })) });
  }

  if (corpo.acao === "listar") {
    const { blobs } = await store.list({ prefix: "u-" });
    const pessoas = [];
    for (const b of blobs) {
      const u = await store.get(b.key, { type: "json" });
      if (u) pessoas.push({ ...publico(u), ids: (u.relatorios || []).slice().reverse() });
    }
    pessoas.sort((a, b) => (b.criadoEm || "").localeCompare(a.criadoEm || ""));
    return json({ pessoas, validadePadrao: validadePadrao() });
  }

  if (corpo.acao === "criar") {
    // Aceita uma pessoa ou várias de uma vez.
    const lista = Array.isArray(corpo.pessoas) ? corpo.pessoas.slice(0, 200) : [];
    const criados = [], erros = [];
    for (const p of lista) {
      const email = normalizarEmail(p.email), nome = limpa(p.nome, 80), whatsapp = limpa(p.whatsapp, 30);
      if (!emailValido(email) || nome.length < 2) { erros.push({ linha: p.email || p.nome || "", erro: "Nome ou e-mail inválido." }); continue; }
      const chave = chaveUsuario(email);
      const existente = await store.get(chave, { type: "json" });
      if (existente) { erros.push({ linha: email, erro: "Já tem acesso. Use “Nova senha” se precisar." }); continue; }
      const senha = gerarSenha();
      const u = { nome, email, whatsapp, ...protegerSenha(senha), criadoEm: new Date().toISOString(), expiraEm: p.expiraEm || validadePadrao(), relatorios: [] };
      await store.setJSON(chave, u);
      criados.push({ ...publico(u), senha });
    }
    return json({ criados, erros });
  }

  const email = normalizarEmail(corpo.email);
  const chave = chaveUsuario(email);
  const u = await store.get(chave, { type: "json" });
  if (!u) return json({ erro: "Pessoa não encontrada." }, 404);

  if (corpo.acao === "nova-senha") {
    const senha = gerarSenha();
    Object.assign(u, protegerSenha(senha));
    await store.setJSON(chave, u);
    return json({ pessoa: publico(u), senha });
  }
  if (corpo.acao === "validade") {
    const d = new Date(String(corpo.expiraEm || "") + "T23:59:00-03:00");
    if (isNaN(d)) return json({ erro: "Data inválida." }, 400);
    u.expiraEm = d.toISOString();
    await store.setJSON(chave, u);
    return json({ pessoa: publico(u) });
  }
  if (corpo.acao === "remover") {
    await store.delete(chave);
    return json({ ok: true });
  }
  return json({ erro: "Ação desconhecida." }, 400);
};

export const config = { path: "/api/ferramenta/admin" };
