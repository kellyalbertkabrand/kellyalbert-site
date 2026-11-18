// Diagnóstico Completo (AMBIENTE DE TESTE) · relatório escrito pela Inteligência Artificial a partir das 35 respostas.
import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";
import { ESTADOS_COMPLETO, PILARES_COMPLETO, SITUACOES } from "../../diagnostico-completo-teste/regras.mjs";

export const MODELO = "claude-opus-5-5";
const Frases = (d) => z.array(z.string().describe(d));

const Schema = z.object({
  resumo: z.string().describe("A conclusão principal do cruzamento das 35 respostas: o que mais explica a situação da marca hoje. Até 45 palavras."),
  entrega_enxerga: z.object({
    entrega: z.string().describe("O que a marca relata entregar de valor, segundo as respostas sobre entrega e a visão do empresário sobre por que é escolhida. Até 30 palavras."),
    enxerga: z.string().describe("O que o cliente que ainda não conhece a empresa provavelmente encontra: comunicação, canais, provas, argumentos e momento do preço. Escreva como hipótese. Até 30 palavras."),
    distancia: z.string().describe("A distância entre as duas coisas e o efeito provável no negócio (preço, desconto, indicação, conversão). Até 35 palavras."),
  }),
  pilares: z.array(z.object({
    pilar: z.number().describe("1 (Entrega de valor) ou 2 (Comunicação de valor)."),
    leitura: z.string().describe("O que as respostas deste pilar, lidas juntas e à luz do negócio, revelam. Até 35 palavras."),
    funciona: Frases("Uma prática que parece funcionar bem e por que ajuda, no segmento. Até 22 palavras.").describe("De zero a três itens."),
    fragil: Frases("Uma possível fragilidade e o efeito provável no negócio. Até 22 palavras.").describe("De um a três itens."),
    verificar: Frases("Uma informação que precisa ser verificada e como verificar. Até 22 palavras.").describe("De zero a dois itens."),
  })).describe("Exatamente dois itens: pilar 1 e pilar 2, nessa ordem."),
  prioridades: z.array(z.object({
    titulo: z.string().describe("A melhoria, começando com verbo. Até 7 palavras."),
    porque: z.string().describe("Por que esta é prioridade: quais respostas, combinadas, mostram isso. Até 30 palavras."),
    o_que_melhorar: z.string().describe("O que precisa mudar na prática da empresa. Até 30 palavras."),
    como_implementar: Frases("Um passo concreto, específico para o segmento e os canais informados. Até 22 palavras.").describe("De três a quatro passos, em ordem."),
    rotina: z.string().describe("Como transformar em rotina: frequência e momento certo. Até 30 palavras."),
    responsavel: z.string().describe("Quem pode ser responsável, considerando o porte provável e a estrutura do negócio. Até 15 palavras."),
    acompanhar: z.string().describe("Como acompanhar a evolução: um indicador simples e a frequência de leitura. Até 25 palavras."),
  })).describe("Exatamente três prioridades, da mais urgente para a menos urgente."),
});

const SISTEMA = `Você é a Inteligência Artificial da KA | Inteligência para Marcas (Kelly Albert, estrategista de marcas) e escreve o Diagnóstico Completo de Marca, produto pago que o empresário comprou depois do teste gratuito. Ele respondeu 35 perguntas: as 11 do teste gratuito, mais 24 sobre a empresa, a entrega de valor e a comunicação de valor, incluindo duas abertas opcionais (o que faz o cliente desistir e por que os clientes escolhem a empresa, na visão dele).

As respostas chegam classificadas (prática estruturada, prática informal, ponto de atenção, informação insuficiente, não se aplica) e agrupadas em dois pilares: 1 Entrega de valor e 2 Comunicação de valor, com índice de 0 a 100 e estado de cada um.

O relatório entrega: o cruzamento "O que sua marca entrega × O que seu cliente enxerga"; a análise dos dois pilares; três prioridades de melhoria; e, para cada prioridade, a prática contínua (o que melhorar, como implementar, como virar rotina, quem pode ser responsável, como acompanhar).

ANTES DE ANALISAR, ENTENDA O NEGÓCIO
Pense em como esse tipo de negócio funciona: como o cliente compra, frequência natural de compra, valor médio, quem decide, o que pesa na escolha no setor, por quais canais o cliente chega e compara, que provas são comuns e permitidas (respeite os limites éticos de publicidade em saúde, odontologia, advocacia, contabilidade e outros setores regulados) e o porte provável da empresa. Use os produtos, serviços e canais informados. Fale com os termos do setor. Não invente fatos.

O QUE SUA MARCA ENTREGA × O QUE SEU CLIENTE ENXERGA
É a seção mais importante. Compare o valor que a empresa relata ter (qualidade, atendimento, promessas, indicações, e o motivo de escolha que o empresário escreveu) com o que um cliente novo provavelmente encontra (o que a comunicação mostra, os canais, as provas, o perfil no Google, os argumentos e o momento em que o preço aparece). Se o empresário escreveu o motivo de escolha, verifique se esse motivo aparece na comunicação e nas provas. A distância entre os dois é o achado central do diagnóstico.

CRUZE AS RESPOSTAS
Não comente as respostas uma a uma. Interprete combinações e contradições: valor que existe mas não aparece; discurso sem sustentação; dependência de desconto; dependência do dono ou de pessoas; sinais sem compreensão (indicação ou recompra sem saber o motivo); provas fora dos canais por onde o cliente chega; dificuldades marcadas que contradizem respostas favoráveis (trate como achado importante: provavelmente a dificuldade é real e a resposta foi otimista).

SEJA CRITERIOSO
Autoavaliações tendem a ser otimistas. Leia cada resposta ao pé da letra. Toda empresa tem o que melhorar: mesmo com respostas favoráveis, aponte fragilidades e o próximo nível. Nunca afirme o que os clientes pensam: o diagnóstico não ouviu os clientes. Escreva "você relata", "suas respostas sugerem", "pode indicar", "vale verificar". Nunca preveja perdas como certeza. Não diga que a marca está mal posicionada.

AS TRÊS PRIORIDADES
Escolha as três melhorias que mais destravam a empresa, considerando o impacto nas vendas e nas dificuldades marcadas. Cada prioridade é uma prática contínua, não uma tarefa isolada. Exemplo do nível esperado: em vez de "solicite três depoimentos", oriente "estabeleça uma rotina de coleta de avaliações após a entrega, defina o momento certo de pedir, quem é responsável e como as respostas serão usadas". Passos concretos e específicos para o segmento e os canais. O responsável deve caber na estrutura provável do negócio. O indicador deve ser simples de medir sem sistema caro.
Não entregue posicionamento, proposta de valor pronta, plano de comunicação, identidade verbal ou planejamento estratégico completo: isso é trabalho do Projeto de Posicionamento de Marca.

TAMANHO
Profundo no raciocínio, enxuto no texto. Respeite os limites de palavras de cada campo, eles são rígidos. Sem introduções nem frases de transição. Não repita a mesma ideia em seções diferentes.

TOM
Português do Brasil, fale com "você", frases curtas e diretas, linguagem de dono de pequeno e médio negócio. Escreva "sua marca entrega", nunca "você entrega". Escreva "Inteligência Artificial" por extenso. Nunca use travessão. Evite clichês como "agregar valor", "alavancar", "potencializar", "jornada". Não cite autores nem use markdown.`;

function pedido(d, cc) {
  const c = d.completo;
  const l = [
    `Empresa: ${c.empresa}`, `Tipo de negócio: ${d.segmento}`, `Produtos e serviços: ${c.oferta}`,
    `Principais clientes: ${d.clientes}`, `Frequência de compra: ${d.compra}`, `Canais de venda e atendimento: ${c.canais.join("; ")}`,
    `Dificuldades marcadas no teste: ${d.dificuldades.length ? d.dificuldades.join("; ") : "nenhuma informada"}`,
    `Na visão do empresário, por que os clientes escolhem a empresa: ${c.motivo || "não respondeu"}`,
    `Na visão do empresário, o que mais faz um cliente reclamar ou desistir: ${c.desistir || "não respondeu"}`, "",
  ];
  for (const n of [1, 2]) {
    const p = cc.pilares[n];
    l.push(`PILAR ${n}: ${PILARES_COMPLETO[n].nome} (índice ${p.indice ?? "sem dados"}/100; estado: ${ESTADOS_COMPLETO[p.estado]}; estruturadas ${p.A}, informais ${p.B}, atenção ${p.C}, a verificar ${p.D}, não se aplica ${p.NA})`);
    for (const x of cc.itens.filter((i) => i.pilar === n)) l.push(`- ${x.tema}: "${x.pergunta}" Resposta: "${x.resposta}" (${SITUACOES[x.situacao]})`);
    l.push("");
  }
  l.push("Cruze as respostas e escreva o diagnóstico completo.");
  return l.join("\n");
}

const limpar = (t) => String(t || "").replace(/\s*[—–]\s*/g, ", ").replace(/\s+,/g, ",").trim();

export async function escreverCompleto(dados, cc) {
  const client = new Anthropic({ apiKey: (Netlify.env.get("ANTHROPIC_API_KEY") ?? "").trim(), maxRetries: 1, timeout: 180_000 });
  const stream = client.beta.messages.stream({
    model: MODELO, max_tokens: 20000,
    betas: ["server-side-fallback-2026-07-01"], fallbacks: "default",
    output_config: { effort: "medium", format: betaZodOutputFormat(Schema) },
    system: SISTEMA, messages: [{ role: "user", content: pedido(dados, cc) }],
  });
  const resposta = await stream.finalMessage();
  if (resposta.stop_reason === "refusal") throw new Error("A Inteligência Artificial recusou escrever o diagnóstico.");
  if (resposta.stop_reason === "max_tokens") throw new Error("O diagnóstico foi cortado por limite de tamanho.");
  const r = Schema.parse(JSON.parse(resposta.content.filter((b) => b.type === "text").map((b) => b.text).join("")));
  console.log("Diagnóstico completo (teste) escrito", { entrada: resposta.usage?.input_tokens, saida: resposta.usage?.output_tokens });
  const lista = (a, n) => (a || []).slice(0, n).map(limpar).filter(Boolean);
  return {
    resumo: limpar(r.resumo),
    entrega_enxerga: { entrega: limpar(r.entrega_enxerga.entrega), enxerga: limpar(r.entrega_enxerga.enxerga), distancia: limpar(r.entrega_enxerga.distancia) },
    pilares: [1, 2].map((n) => {
      const p = r.pilares.find((x) => Number(x.pilar) === n) || r.pilares[n - 1] || {};
      return { pilar: n, leitura: limpar(p.leitura), funciona: lista(p.funciona, 3), fragil: lista(p.fragil, 3), verificar: lista(p.verificar, 2) };
    }),
    prioridades: r.prioridades.slice(0, 3).map((p) => ({
      titulo: limpar(p.titulo), porque: limpar(p.porque), o_que_melhorar: limpar(p.o_que_melhorar), como_implementar: lista(p.como_implementar, 4),
      rotina: limpar(p.rotina), responsavel: limpar(p.responsavel), acompanhar: limpar(p.acompanhar),
    })),
  };
}
