// Testa a ferramenta Autoavaliação de Marca no site publicado: cria um acesso de teste, responde, lê o relatório e remove o acesso.
// Uso: node scripts/testar-ferramenta.mjs https://kellyalbert.com.br SENHA_ADMIN
const [base = "https://kellyalbert.com.br", adm = ""] = process.argv.slice(2);
const espera = (ms) => new Promise((r) => setTimeout(r, ms));
const post = (p, corpo, h = {}) => fetch(base + p, { method: "POST", headers: { "content-type": "application/json", ...h }, body: JSON.stringify(corpo) }).then(async (r) => ({ s: r.status, d: await r.json().catch(() => ({})) }));
const email = "teste-ferramenta-" + Date.now() + "@exemplo.com";
const admin = { "x-admin-senha": adm };
const c = await post("/api/ferramenta/admin", { acao: "criar", pessoas: [{ nome: "Teste Automático", email }] }, admin);
console.log("criar:", c.s, JSON.stringify(c.d.erros || c.d.erro || ""));
const senha = c.d.criados?.[0]?.senha;
if (!senha) process.exit(1);
const e = await post("/api/ferramenta/entrar", { email, senha });
console.log("entrar:", e.s, e.d.nome, e.d.expiraEm);
const errada = await post("/api/ferramenta/entrar", { email, senha: "XXXX-0000" });
console.log("senha errada:", errada.s, errada.d.erro);
const auth = { authorization: "Bearer " + e.d.token };
const painel = await fetch(base + "/api/ferramenta/painel", { headers: auth }).then((r) => r.json());
console.log("painel:", JSON.stringify(painel));
const respostas = { E1: 1, E2: 2, E3: 1, E4: 2, E5: 2, E6: 1, C1: 2, C2: 2, C3: 2, C4: 2, C5: 2, C6: 1 };
const i = await post("/api/ferramenta/iniciar", { empresa: "Pão da Vila", segmento: "Padaria artesanal de bairro", oferta: "Pães de fermentação natural, bolos, cafés e encomendas para festas", clientes: "Consumidores finais", frequencia: "Toda semana ou todo mês", perfil: "Famílias do bairro e pessoas que trabalham perto", canais: ["Loja ou escritório físico", "Instagram", "WhatsApp", "Outro canal: iFood"], dificuldades: ["Concorrentes mais baratos", "Dificuldade para explicar o diferencial", "Muitos descontos e margem baixa"], respostas }, auth);
console.log("iniciar:", i.s, JSON.stringify(i.d));
const inicio = Date.now();
let r;
while (Date.now() - inicio < 240000) {
  await espera(4000);
  r = await fetch(base + "/api/ferramenta/relatorio?id=" + i.d.id, { headers: auth }).then((x) => x.json());
  if (r.status === "pronto") break;
}
console.log(`\nrelatório (${((Date.now() - inicio) / 1000).toFixed(0)}s, fonte: ${r.resultado.fonte}):\n` + JSON.stringify(r.resultado, null, 1));
const outro = await fetch(base + "/api/ferramenta/relatorio?id=" + i.d.id).then((x) => x.status);
console.log("relatório sem login:", outro);
const rem = await post("/api/ferramenta/admin", { acao: "remover", email }, admin);
console.log("remover:", rem.s);
