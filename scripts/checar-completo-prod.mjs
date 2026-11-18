// Confere, no site publicado, que o Diagnóstico Completo exige um código válido.
const base = process.argv[2] || "https://kellyalbert.com.br";
const post = (p, b) => fetch(base + p, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(b) }).then(async (r) => [r.status, await r.json().catch(() => ({}))]);
console.log("código inexistente:", ...(await post("/api/completo/codigo", { codigo: "KA-AAAAAA" })));
console.log("enviar sem código:", ...(await post("/api/completo/iniciar", { codigo: "" })));
const pg = await fetch(base + "/valorpercebido/").then((r) => r.text());
console.log("página tem o campo do código:", pg.includes("rx-cod-campo"), "· sem faixa de teste:", !pg.includes("Ambiente de teste"));
