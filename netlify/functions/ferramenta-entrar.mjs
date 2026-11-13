// Autoavaliação de Marca (ferramenta da aula): entrada com e-mail e senha.
import { chaveUsuario, conferirSenha, criarToken, emailValido, json, loja, normalizarEmail } from "../ferramenta/base.mjs";

export default async (req) => {
  if (req.method !== "POST") return json({ erro: "Use POST." }, 405);
  const { email, senha } = await req.json().catch(() => ({}));
  const e = normalizarEmail(email);
  if (!emailValido(e) || !senha) return json({ erro: "Informe o e-mail e a senha." }, 400);
  const store = loja();
  const chave = chaveUsuario(e);
  // Proteção contra tentativas repetidas: 8 erros bloqueiam o e-mail por 15 minutos.
  const chaveTent = "t-" + chave;
  const tent = (await store.get(chaveTent, { type: "json" })) ?? { n: 0, ate: 0 };
  if (tent.ate > Date.now()) return json({ erro: "Muitas tentativas. Aguarde 15 minutos e tente de novo." }, 429);
  const usuario = await store.get(chave, { type: "json" });
  if (!usuario || !conferirSenha(senha, usuario)) {
    tent.n += 1;
    if (tent.n >= 8) { tent.n = 0; tent.ate = Date.now() + 15 * 60000; }
    await store.setJSON(chaveTent, tent);
    return json({ erro: "E-mail ou senha não conferem." }, 401);
  }
  if (tent.n) await store.delete(chaveTent);
  if (new Date(usuario.expiraEm).getTime() < Date.now()) return json({ erro: "Seu acesso de 60 dias terminou. Fale com a Kelly para saber como continuar.", expirado: true }, 403);
  usuario.ultimoAcesso = new Date().toISOString();
  await store.setJSON(chave, usuario);
  return json({ token: criarToken(chave), nome: usuario.nome, expiraEm: usuario.expiraEm });
};

export const config = { path: "/api/ferramenta/entrar" };
