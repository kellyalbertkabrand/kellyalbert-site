import { getStore } from "@netlify/blobs";

// Guarda só as respostas e o resultado (sem nome, e-mail ou WhatsApp).
export const avaliacoes = () => getStore({ name: "autoavaliacoes", consistency: "strong" });

export function json(dados, status = 200) {
  return new Response(JSON.stringify(dados), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

// Limite diário de textos escritos pela Inteligência Artificial (protege o custo se o anúncio explodir).
// Passando do limite, a pessoa recebe o resultado das regras, que é completo do mesmo jeito.
export async function reservarUsoDoDia() {
  const limite = Number(Netlify.env.get("AUTOAVALIACAO_LIMITE_DIA") ?? "600");
  const chave = "uso-" + new Date().toISOString().slice(0, 10);
  const store = avaliacoes();
  const registro = (await store.get(chave, { type: "json" })) ?? { usos: 0 };
  if (registro.usos >= limite) return false;
  registro.usos += 1;
  await store.setJSON(chave, registro);
  return true;
}
