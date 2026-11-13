// Testa o Teste de Autoavaliação de Marca com a Inteligência Artificial real, no site publicado.
// Uso: node scripts/testar-autoavaliacao.mjs https://kellyalbert.com.br
const base = process.argv[2] || "https://kellyalbert.com.br";
const casos = {
  "Farmácia de bairro": { segmento: "Farmácia de bairro", clientes: "Consumidores finais", compra: "Toda semana ou todo mês",
    respostas: { P1: 1, P2: 2, P3: 3, P4: 3, P5: 1, P6: 3, P7: 2, P8: 3, P9: 2, P10: 2, P11: 3 }, dificuldades: ["Concorrência", "Preço"] },
  "Escritório de branding (respostas otimistas)": { segmento: "Escritório de branding", clientes: "Outras empresas", compra: "Normalmente uma vez só",
    respostas: { P1: 3, P2: 1, P3: 0, P4: 0, P5: 0, P6: 0, P7: 0, P8: 1, P9: 0, P10: 1, P11: 0 }, dificuldades: ["Diferencial", "Posicionamento"] },
  "Loja de roupas femininas": { segmento: "Loja de roupas femininas", clientes: "Consumidores finais", compra: "Algumas vezes por ano",
    respostas: { P1: 1, P2: 1, P3: 3, P4: 2, P5: 1, P6: 2, P7: 2, P8: 2, P9: 2, P10: 2, P11: 3 }, dificuldades: ["Preço", "Instagram e redes sociais"] },
  "Clínica odontológica": { segmento: "Clínica odontológica", clientes: "Consumidores finais", compra: "Algumas vezes por ano",
    respostas: { P1: 0, P2: 0, P3: 0, P4: 0, P5: 0, P6: 0, P7: 1, P8: 1, P9: 2, P10: 1, P11: 1 }, dificuldades: ["Diferencial"] },
  "Escritório de contabilidade": { segmento: "Escritório de contabilidade digital", clientes: "Outras empresas", compra: "Toda semana ou todo mês",
    respostas: { P1: 0, P2: 0, P3: 1, P4: 0, P5: 0, P6: 0, P7: 0, P8: 0, P9: 0, P10: 0, P11: 0 }, dificuldades: ["Nenhuma dificuldade identificada"] },
  "Indústria de elevadores": { segmento: "Fábrica e instalação de elevadores industriais", clientes: "Outras empresas", compra: "Uma vez a cada poucos anos",
    respostas: { P1: 3, P2: 1, P3: 3, P4: 1, P5: 2, P6: 3, P7: 4, P8: 0, P9: 1, P10: 3, P11: 1 }, dificuldades: ["Concorrência"] },
};
const espera = (ms) => new Promise((r) => setTimeout(r, ms));
let falhas = 0;
for (const [nome, corpo] of Object.entries(casos)) {
  const inicio = Date.now();
  const r = await fetch(base + "/api/autoavaliacao/iniciar", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(corpo) });
  const j = await r.json();
  if (!r.ok) { console.log(nome, "ERRO", r.status, j); falhas++; continue; }
  let final = j;
  for (let i = 0; i < 50 && final.status !== "pronto"; i++) {
    await espera(1500);
    final = await (await fetch(base + "/api/autoavaliacao/resultado?id=" + j.id)).json();
  }
  const t = final.resultado;
  console.log(`\n===== ${nome} (${((Date.now() - inicio) / 1000).toFixed(1)}s, texto: ${t.fonte}) =====`);
  console.log("Perfil:", final.classe.perfil, JSON.stringify(final.classe.pilares));
  console.log("1. Leitura:", t.leitura);
  console.log("2. Cada resposta:\n" + (t.respostas || []).map((x) => ` - ${x.id}: ${x.leitura}`).join("\n"));
  console.log("2. Pontos fortes:\n" + (t.pontos_fortes.map((x) => ` - [${x.natureza}] ${x.titulo}: ${x.texto}`).join("\n") || " (nenhum)"));
  console.log("3. Fragilidades:\n" + (t.fragilidades.map((x) => ` - [${x.natureza}] ${x.titulo}: ${x.texto}`).join("\n") || " (nenhuma)"));
  console.log("4. Consequências:\n" + (t.consequencias.map((x) => ` - ${x.area}: ${x.texto}`).join("\n") || " (nenhuma)"));
  console.log("5. Recomendação:", t.recomendacao.prioridade, "|", t.recomendacao.porque, "|", t.recomendacao.orientacao);
  { const tudo = [t.leitura, ...(t.respostas||[]).map(x=>x.leitura), ...t.pontos_fortes.flatMap(x=>[x.titulo,x.texto]), ...t.fragilidades.flatMap(x=>[x.titulo,x.texto]), ...t.consequencias.map(x=>x.texto), t.recomendacao.prioridade, t.recomendacao.porque, t.recomendacao.orientacao].join(" "); console.log("TOTAL DE PALAVRAS:", tudo.split(/\s+/).filter(Boolean).length); }
  if (t.fonte !== "ia") falhas++;
}
process.exit(falhas ? 1 : 0);
