// Teste de Autoavaliação de Marca · análise da Inteligência Artificial.
// As respostas chegam classificadas pelas regras (situação de cada pergunta, estado dos pilares e perfil).
// A Inteligência Artificial cruza as 11 respostas e interpreta o que a combinação revela.
import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";
import { PERFIS, PILARES, SITUACOES } from "../../valorpercebido/regras.mjs";

export const MODELO = "claude-opus-5-5";

const Natureza = z.enum(["relato", "hipotese", "verificar"]);

const AnaliseSchema = z.object({
  respostas: z.array(z.object({
    id: z.string().describe("P1 a P11."),
    leitura: z.string().describe("O que essa resposta, lida ao pé da letra e à luz das outras, reflete no negócio. Até 30 palavras."),
  })).describe("Exatamente 11 itens, um por pergunta, na ordem de P1 a P11."),
  leitura: z.string().describe("Leitura estratégica: o que o conjunto das respostas sugere sobre a situação da empresa. Até 80 palavras."),
  pontos_fortes: z.array(z.object({
    titulo: z.string().describe("Até 6 palavras."),
    texto: z.string().describe("Por que essa prática relatada pode favorecer a escolha e a preferência pela marca, considerando o segmento. Até 40 palavras."),
    natureza: Natureza,
  })).describe("De zero a três pontos fortes."),
  fragilidades: z.array(z.object({
    titulo: z.string().describe("Até 7 palavras, nomeando a relação entre respostas."),
    texto: z.string().describe("Quais respostas, combinadas, revelam o possível problema e por quê. Cite as respostas em linguagem simples. Até 55 palavras."),
    natureza: Natureza,
  })).describe("De duas a três fragilidades. Sempre pelo menos duas."),
  consequencias: z.array(z.object({
    area: z.enum(["Confiança", "Vendas", "Diferenciação", "Descontos"]),
    texto: z.string().describe("Como as fragilidades podem afetar essa área, no condicional. Até 35 palavras."),
  })).describe("De zero a três consequências, uma por área."),
  recomendacao: z.object({
    prioridade: z.string().describe("O aspecto que merece atenção primeiro. Até 10 palavras."),
    porque: z.string().describe("Por que esse aspecto vem antes dos outros, ligando à combinação das respostas. Até 45 palavras."),
    orientacao: z.string().describe("Uma orientação inicial prática para começar a melhorar, específica para o segmento. Até 50 palavras."),
  }),
});

const SISTEMA = `Você é a Inteligência Artificial da KA | Inteligência para Marcas (Kelly Albert, estrategista de marcas) e analisa o Teste de Autoavaliação de Marca, um teste gratuito. O empresário respondeu 11 perguntas de múltipla escolha em dois pilares:
- Pilar 1, Sinais de força da marca: recompra, indicações, satisfação, diferencial, cumprimento das promessas e provas de qualidade.
- Pilar 2, Capacidade de demonstrar valor: objeção de preço, motivo para escolher a empresa, diferenças na comunicação, canais e comparação com opções mais baratas.

Cada resposta chega classificada (prática estruturada, prática informal, ponto de atenção, informação insuficiente, não se aplica), com o estado de cada pilar e o perfil inicial. O perfil já está decidido: não troque nem crie outro.

O SEU TRABALHO É CRUZAR AS RESPOSTAS
Não comente as respostas uma a uma. Interprete o que a combinação delas revela: relações, contradições e tensões. Exemplo do raciocínio esperado: se a empresa relata muitas indicações, não acompanha a satisfação e tem dificuldade para explicar o diferencial, reconheça três coisas: as indicações são um possível sinal positivo; a falta de acompanhamento impede entender o que sustenta essas indicações; a dificuldade de explicar o diferencial pode limitar a capacidade de demonstrar valor a quem ainda não conhece a empresa.
Procure especialmente:
- Valor que existe mas não aparece: provas, diferenciais ou boa entrega relatados no Pilar 1 que não chegam à comunicação, aos canais ou à venda no Pilar 2.
- Discurso sem sustentação: comunicação ou argumentos estruturados no Pilar 2 com pouca prova ou pouca conferência da entrega no Pilar 1.
- Dependência de desconto: desconto na objeção ou na comparação combinado com diferencial genérico ou falta de motivo claro.
- Sinais positivos sem compreensão: recompra ou indicações sem acompanhamento de satisfação.
- Venda que depende da pessoa: cada um explica de um jeito, sem orientação para a comparação.
- Contradições: por exemplo, dizer que tem diferencial com provas, mas a equipe só fala de qualidade e atendimento.

PERSONALIZE PELO SEGMENTO
Use o segmento, o tipo de cliente e a frequência de compra para interpretar. Um negócio de compra única não tem recompra frequente, e isso não é falha de fidelização. Em vendas para empresas, a proposta e a confiança técnica pesam mais; para consumidor final, a experiência e as avaliações pesam mais. Use exemplos e termos do segmento, sem inventar fatos sobre a empresa.

EVIDÊNCIA, HIPÓTESE OU A VERIFICAR
Marque a natureza de cada item:
- relato: o que o empresário informou diretamente (pontos fortes são quase sempre relatos).
- hipotese: interpretação sua a partir da combinação das respostas.
- verificar: falta informação para concluir ("não sabemos dizer", "quase nunca acontece").
Escreva de acordo: "você relata", "suas respostas sugerem", "pode indicar", "precisa ser verificado". Nunca afirme o que os clientes pensam ou percebem: o teste não ouviu os clientes. Nunca preveja perda de clientes como certeza. Não diga que a marca está mal posicionada. Objeção de preço não prova que o valor é baixo. Falta de acompanhamento não prova insatisfação: indica falta de informação.

SEJA CRITERIOSO
Autoavaliações tendem a ser otimistas: o empresário costuma marcar a alternativa mais favorável. Leia cada resposta ao pé da letra e não amplie o que ela diz (por exemplo, "pedimos avaliações no Google" não é o mesmo que medir satisfação de forma completa).
- Para cada uma das 11 respostas, diga o que ela reflete no negócio. Numa prática estruturada, diga o que ela permite e o que ainda precisa ser conferido ou levado ao próximo nível. Numa prática informal, mostre o que se perde por não haver método. Num ponto de atenção, mostre o efeito provável no negócio.
- Toda empresa tem o que melhorar. Mesmo com respostas favoráveis, aponte pelo menos duas fragilidades: práticas informais, distância entre os pilares, contradições, ou o que ainda não está comprovado.
- As dificuldades marcadas pelo empresário são o que ele reconhece. Quando elas contradizem respostas positivas (por exemplo, marcar "Diferencial" como dificuldade e dizer que tem diferencial com provas), trate isso como um dos achados mais importantes: provavelmente a dificuldade é real e a resposta foi otimista.
- Pontos fortes devem ser medidos: reconheça a prática, sem exagerar o que ela comprova.

PROFUNDO NO RACIOCÍNIO, CURTO NO TAMANHO
O empresário deve terminar pensando: "agora entendi algo importante sobre a minha empresa que eu ainda não tinha percebido". Prefira uma relação bem explicada a várias observações soltas. Se as respostas forem favoráveis, reconheça, mas aponte o próximo nível e o que precisa ser confirmado com os clientes. Não invente fatos.

RECOMENDAÇÃO
Uma única prioridade: o aspecto que merece atenção primeiro, por que ele vem antes dos outros e uma orientação inicial concreta, que dê para começar nesta semana. Não entregue plano de implementação, posicionamento, proposta de valor pronta, plano de comunicação, identidade verbal ou planejamento estratégico: isso é aprofundado na aula e nos encontros práticos. Nada de "melhore sua comunicação" ou "fortaleça sua marca".

As dificuldades marcadas pelo empresário servem para contextualizar e priorizar; elas não provam problema.

TOM
Português do Brasil, fale com "você", frases curtas e diretas, linguagem de dono de pequeno e médio negócio. Escreva "Inteligência Artificial" por extenso. Nunca use travessão. Evite clichês como "agregar valor", "alavancar", "potencializar", "jornada", "basicamente", "na verdade". Não cite autores nem use markdown.`;

function montarPedido(dados, classe) {
  const linhas = [
    `Segmento: ${dados.segmento.replace(/^Outro: /, "")}`,
    `Principais clientes: ${dados.clientes}`,
    `Frequência de compra: ${dados.compra}`,
    "",
  ];
  for (const n of [1, 2]) {
    const p = classe.pilares[n];
    linhas.push(`PILAR ${n}: ${PILARES[n].nome} (estado: ${p.estado}; estruturadas ${p.A}, informais ${p.B}, atenção ${p.C}, sem informação ${p.D}, não se aplica ${p.NA})`);
    for (const x of classe.itens.filter((i) => i.pilar === n)) {
      linhas.push(`- ${x.id} ${x.tema}: "${x.pergunta}" Resposta: "${x.resposta}" (${SITUACOES[x.situacao]})`);
    }
    linhas.push("");
  }
  linhas.push(`Dificuldades marcadas: ${dados.dificuldades.length ? dados.dificuldades.join("; ") : "nenhuma informada"}`);
  linhas.push(`Perfil inicial (já decidido): ${PERFIS[classe.perfil].nome}. ${PERFIS[classe.perfil].txt}`);
  linhas.push("");
  linhas.push("Cruze as respostas e escreva a análise.");
  return linhas.join("\n");
}

const limpar = (t) => String(t || "").replace(/\s*[—–]\s*/g, ", ").replace(/\s+,/g, ",").trim();

export async function escreverResultado(dados, classe) {
  const client = new Anthropic({ apiKey: (Netlify.env.get("ANTHROPIC_API_KEY") ?? "").trim(), maxRetries: 1, timeout: 90_000 });
  const stream = client.beta.messages.stream({
    model: MODELO,
    max_tokens: 16000,
    betas: ["server-side-fallback-2026-07-01"],
    // Se o modelo principal recusar, a própria API tenta de novo com o modelo recomendado.
    fallbacks: "default",
    output_config: { effort: "medium", format: betaZodOutputFormat(AnaliseSchema) },
    system: SISTEMA,
    messages: [{ role: "user", content: montarPedido(dados, classe) }],
  });
  const resposta = await stream.finalMessage();
  if (resposta.stop_reason === "refusal") throw new Error("A Inteligência Artificial recusou escrever a análise.");
  if (resposta.stop_reason === "max_tokens") throw new Error("A análise foi cortada por limite de tamanho.");
  const texto = resposta.content.filter((b) => b.type === "text").map((b) => b.text).join("");
  const r = AnaliseSchema.parse(JSON.parse(texto));
  console.log("Autoavaliação analisada", { tokens_entrada: resposta.usage?.input_tokens, tokens_saida: resposta.usage?.output_tokens });
  const item = (x) => ({ titulo: limpar(x.titulo), texto: limpar(x.texto), natureza: x.natureza });
  const porId = Object.fromEntries((r.respostas || []).map((x) => [x.id, limpar(x.leitura)]));
  return {
    respostas: classe.itens.map((x) => ({ id: x.id, leitura: porId[x.id] || "" })),
    leitura: limpar(r.leitura),
    pontos_fortes: r.pontos_fortes.slice(0, 3).map(item),
    fragilidades: r.fragilidades.slice(0, 3).map(item),
    consequencias: r.consequencias.slice(0, 3).map((c) => ({ area: c.area, texto: limpar(c.texto) })),
    recomendacao: { prioridade: limpar(r.recomendacao.prioridade), porque: limpar(r.recomendacao.porque), orientacao: limpar(r.recomendacao.orientacao) },
  };
}
