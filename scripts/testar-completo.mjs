// Testa o Diagnóstico Completo (ambiente de teste) no site publicado, com a Inteligência Artificial real.
const base = process.argv[2] || "https://kellyalbert.com.br";
const espera = (ms) => new Promise((r) => setTimeout(r, ms));
const corpo = {
  segmento: "Loja de roupas femininas", clientes: "Consumidores finais", compra: "Algumas vezes por ano",
  respostas: { P1: 1, P2: 1, P3: 3, P4: 2, P5: 1, P6: 2, P7: 2, P8: 2, P9: 2, P10: 2, P11: 3 }, dificuldades: ["Preço", "Instagram e redes sociais"],
  completo: { respostas: { CE: "Ateliê Mariana", CO: "Roupas femininas, consultoria de estilo e peças sob medida", CC: ["Instagram", "WhatsApp", "Loja ou escritório físico"],
    E1: 1, E2: 2, E3: 2, E4: 1, E5: 1, E6: 2, E7: 2, E8: 2, E9: 1, E10: 1, E11: "Demora para responder no WhatsApp em dias de muito movimento",
    M1: "Pelo atendimento próximo e porque ajudo a montar os looks", M2: 1, M3: 1, M4: 2, M5: 2, M6: 1, M7: 1, M8: 1, M9: 1, M10: 1 } },
};
const inicio = Date.now();
const r = await fetch(base + "/api/completo-teste/iniciar", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(corpo) });
const d = await r.json();
console.log("iniciar:", r.status, d.id, d.status, JSON.stringify(d.classe?.pilares || d.erro));
let final = d;
while (final.status !== "pronto" && Date.now() - inicio < 240000) { await espera(4000); final = await fetch(base + "/api/completo-teste/resultado?id=" + d.id).then((x) => x.json()); }
console.log(`\n(${((Date.now() - inicio) / 1000).toFixed(0)}s, fonte: ${final.resultado?.fonte})\n` + JSON.stringify(final.resultado, null, 1));
if (final.resultado?.fonte !== "ia") process.exitCode = 1;
