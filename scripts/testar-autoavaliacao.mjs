// Testa o Teste de Autoavaliação de Marca com a Inteligência Artificial real, no site publicado.
// Uso: node scripts/testar-autoavaliacao.mjs https://kellyalbert.com.br
const base = process.argv[2] || "https://kellyalbert.com.br";
const casos = {
  "Loja de roupas femininas": { produto: "Roupas femininas", clientes: "Consumidores finais", segmento: "Moda e vestuário",
    respostas: { P1: 1, P2: 2, P3: 2, P4: 2, P5: 1, P6: 2, P7: 2, P8: "Porque temos roupas lindas e ótimo atendimento.", P9: 3, P10: 2, P11: 3, P4b: "" }, dificuldades: ["Preço", "Instagram e redes sociais"] },
  "Clínica odontológica": { produto: "Tratamentos odontológicos", clientes: "Consumidores finais", segmento: "Odontologia",
    respostas: { P1: 0, P2: 0, P3: 0, P4: 1, P5: 0, P6: 1, P7: 1, P8: "Tratamentos com planejamento digital e acompanhamento pós-consulta para pacientes com medo de dentista.", P9: 1, P10: 1, P11: 1, P4b: "Atendimento para quem tem medo de dentista" }, dificuldades: ["Diferencial"] },
  "Escritório de contabilidade": { produto: "Contabilidade para pequenas empresas", clientes: "Outras empresas", segmento: "Contabilidade e finanças",
    respostas: { P1: 0, P2: 1, P3: 1, P4: 0, P5: 0, P6: 0, P7: 0, P8: "Ajudamos pequenas empresas a organizar a gestão financeira com acompanhamento mensal e relatórios simples.", P9: 0, P10: 0, P11: 0, P4b: "" }, dificuldades: ["Nenhuma dificuldade identificada"] },
  "Indústria de elevadores": { produto: "Instalação de elevadores industriais", clientes: "Outras empresas", segmento: "Indústria",
    respostas: { P1: 4, P2: 1, P3: 0, P4: 0, P5: 0, P6: 0, P7: 1, P8: "Instalamos elevadores de carga com manutenção 24h e laudo técnico mensal.", P9: 1, P10: 1, P11: 1, P4b: "Manutenção 24h" }, dificuldades: ["Concorrência"] },
};
const espera = (ms) => new Promise((r) => setTimeout(r, ms));
let falhas = 0;
for (const [nome, corpo] of Object.entries(casos)) {
  const inicio = Date.now();
  const r = await fetch(base + "/api/autoavaliacao/iniciar", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(corpo) });
  const j = await r.json();
  if (!r.ok) { console.log(nome, "ERRO", r.status, j); falhas++; continue; }
  let final = j;
  for (let i = 0; i < 40 && final.status !== "pronto"; i++) {
    await espera(1500);
    final = await (await fetch(base + "/api/autoavaliacao/resultado?id=" + j.id)).json();
  }
  const t = final.resultado;
  console.log(`\n===== ${nome} (${((Date.now() - inicio) / 1000).toFixed(1)}s, texto: ${t.fonte}) =====`);
  console.log("Perfil:", final.classe.perfil, JSON.stringify(final.classe.pilares));
  console.log("Leitura:", t.leitura);
  console.log("Positivos:\n - " + (t.positivos.join("\n - ") || "(nenhum)"));
  console.log("Atenção:\n - " + (t.atencao.join("\n - ") || "(nenhum)"));
  console.log("Orientação:", t.orientacao);
  if (t.fonte !== "ia") falhas++;
}
process.exit(falhas ? 1 : 0);
