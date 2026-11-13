// Autoavaliação de Marca (ferramenta da aula): recebe as 17 respostas, classifica e
// dispara a Inteligência Artificial em segundo plano. O relatório das regras fica salvo como reserva.
import { classificar, relatorioDeReserva, validarEntrada } from "../../autoavaliacao/regras.mjs";
import { json, limiteDeRelatorios, loja, usuarioDaSessao } from "../ferramenta/base.mjs";

export default async (req) => {
  if (req.method !== "POST") return json({ erro: "Use POST." }, 405);
  const s = await usuarioDaSessao(req);
  if (s.erro) return json({ erro: s.erro, expirado: !!s.expirado }, s.status);
  const usados = (s.usuario.relatorios || []).length;
  if (usados >= limiteDeRelatorios()) return json({ erro: "Você já usou todas as autoavaliações disponíveis no seu acesso. Seus relatórios continuam disponíveis no painel." }, 403);
  const v = validarEntrada(await req.json().catch(() => null));
  if (!v.ok) return json({ erro: v.erro }, 400);

  const classe = classificar(v.dados.respostas);
  const id = "r-" + crypto.randomUUID();
  const token = crypto.randomUUID();
  const store = loja();
  await store.setJSON(id, {
    dono: s.chave, status: "gerando", token, dados: v.dados, classe,
    resultado: { ...relatorioDeReserva(classe), fonte: "regras" }, criadoEm: new Date().toISOString(),
  });
  s.usuario.relatorios = [...(s.usuario.relatorios || []), id];
  await store.setJSON(s.chave, s.usuario);

  await fetch(new URL("/.netlify/functions/ferramenta-gerar-background", req.url), {
    method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ id, token }),
  }).catch((e) => console.error("Falha ao disparar o relatório", e));

  return json({ id, status: "gerando" });
};

export const config = { path: "/api/ferramenta/iniciar" };
