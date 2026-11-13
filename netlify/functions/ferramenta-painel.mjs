// Autoavaliação de Marca (ferramenta da aula): dados do participante e lista de relatórios.
import { json, limiteDeRelatorios, loja, usuarioDaSessao } from "../ferramenta/base.mjs";

export default async (req) => {
  const s = await usuarioDaSessao(req);
  if (s.erro) return json({ erro: s.erro, expirado: !!s.expirado }, s.status);
  const store = loja();
  const relatorios = [];
  for (const id of (s.usuario.relatorios || []).slice().reverse()) {
    const r = await store.get(id, { type: "json" });
    if (r) relatorios.push({ id, criadoEm: r.criadoEm, status: r.status, empresa: r.dados.empresa, pilares: { 1: r.classe.pilares[1], 2: r.classe.pilares[2] } });
  }
  return json({
    nome: s.usuario.nome, email: s.usuario.email, expiraEm: s.usuario.expiraEm,
    relatorios, restantes: Math.max(0, limiteDeRelatorios() - (s.usuario.relatorios || []).length),
  });
};

export const config = { path: "/api/ferramenta/painel" };
