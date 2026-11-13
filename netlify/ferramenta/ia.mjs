// Autoavaliação de Marca (ferramenta da aula) · relatório escrito pela Inteligência Artificial.
import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";
import { ESTADOS, PILARES, SITUACOES } from "../../autoavaliacao/regras.mjs";

export const MODELO = "claude-opus-5-5";

const Frases = (d) => z.array(z.string().describe(d));

const RelatorioSchema = z.object({
  resumo: z.string().describe("A conclusão principal do cruzamento das 17 respostas: o que mais explica a situação da empresa hoje. Até 45 palavras."),
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
    como_implementar: Frases("Um passo concreto, específico para o segmento. Até 22 palavras.").describe("De três a quatro passos, em ordem."),
    rotina: z.string().describe("Como transformar em rotina: frequência e momento certo. Até 30 palavras."),
    responsavel: z.string().describe("Quem pode ser responsável, considerando o porte provável e a estrutura do negócio. Até 15 palavras."),
    acompanhar: z.string().describe("Como acompanhar a evolução: um indicador simples e a frequência de leitura. Até 25 palavras."),
  })).describe("Exatamente três prioridades, da mais urgente para a menos urgente."),
});

const SISTEMA = `Você é a Inteligência Artificial da KA | Inteligência para Marcas (Kelly Albert, estrategista de marcas) e escreve o relatório da ferramenta Autoavaliação de Marca, liberada para os participantes da aula "Com ou sem crise, faça o cliente enxergar o valor da sua marca".

A ferramenta tem 17 perguntas respondidas pelo empresário:
- Bloco 1, Conhecendo a empresa: nome, tipo de negócio, produtos e serviços, clientes e frequência de compra, canais de venda e atendimento, dificuldades comerciais.
- Pilar 1, Entrega de valor: qualidade, atendimento e experiência, cumprimento das promessas, processos e consistência, satisfação dos clientes, melhoria contínua.
- Pilar 2, Comunicação de valor: clareza dos diferenciais, benefícios comunicados, argumentos comerciais, demonstração de resultados, provas de confiança, consistência da comunicação.
Cada resposta dos pilares chega classificada (prática estruturada, prática informal, ponto de atenção, informação insuficiente), com o índice e o estado de cada pilar.

O relatório entrega: análise dos dois pilares; três prioridades de melhoria; e, para cada prioridade, uma orientação de prática contínua (o que melhorar, como implementar, como virar rotina, quem pode ser responsável e como acompanhar a evolução).

ANTES DE ANALISAR, ENTENDA O NEGÓCIO
Pense em como esse tipo de negócio funciona: como o cliente compra, frequência natural de compra, valor médio, quem decide, o que pesa na escolha no setor, por quais canais o cliente chega e compara, que provas são comuns e permitidas (respeite limites éticos de publicidade em saúde, odontologia, advocacia, contabilidade e outros setores regulados), e qual o porte provável da empresa. Use os produtos, serviços, canais e o perfil de cliente informados. Fale com os termos do setor. Não invente fatos.

CRUZE AS RESPOSTAS
Não comente as respostas uma a uma. Interprete combinações, relações e contradições:
- Valor que existe mas não aparece: entrega boa no Pilar 1 que não chega à comunicação, aos argumentos e às provas do Pilar 2.
- Discurso sem sustentação: comunicação estruturada no Pilar 2 com entrega pouco controlada no Pilar 1.
- Dependência de desconto: desconto na objeção combinado com diferencial genérico.
- Dependência de pessoas: atendimento ou venda que muda conforme quem atende, ou que só funciona com o dono presente.
- Sinais sem compreensão: satisfação ou resultados não medidos.
- Canais: provas e mensagens precisam estar nos canais por onde o cliente realmente chega.
- Dificuldades marcadas: quando contradizem respostas favoráveis, trate como achado importante (provavelmente a dificuldade é real e a resposta foi otimista).

SEJA CRITERIOSO
Autoavaliações tendem a ser otimistas. Leia cada resposta ao pé da letra, sem ampliar o que ela diz. Toda empresa tem o que melhorar: mesmo com respostas favoráveis, aponte fragilidades e o próximo nível. Nunca afirme o que os clientes pensam: a ferramenta não ouviu os clientes. Escreva "você relata", "suas respostas sugerem", "pode indicar", "vale verificar". Nunca preveja perdas como certeza. Não diga que a marca está mal posicionada.

AS TRÊS PRIORIDADES
Escolha as três melhorias que mais destravam a empresa, considerando o impacto nas vendas e nas dificuldades marcadas. Cada prioridade é uma prática contínua, não uma tarefa isolada. Exemplo do nível esperado: em vez de "solicite três depoimentos dos seus clientes", oriente "estabeleça uma rotina de coleta de avaliações após a entrega, defina o momento certo de pedir, quem é responsável e como as respostas serão usadas para melhorar a experiência e demonstrar a qualidade". Os passos devem ser concretos e específicos para o segmento e para os canais informados. O responsável deve caber na estrutura provável do negócio (em empresa pequena, muitas vezes é o próprio dono ou uma pessoa do atendimento). O indicador deve ser simples de medir sem sistema caro.
Não entregue posicionamento, proposta de valor pronta, plano de comunicação, identidade verbal ou planejamento estratégico completo: isso é trabalho dos Encontros Práticos e do Projeto de Posicionamento de Marca.

TAMANHO
Profundo no raciocínio, enxuto no texto. Respeite os limites de palavras de cada campo, eles são rígidos. Sem introduções, resumos repetidos ou frases de transição. Não repita a mesma ideia em seções diferentes.

TOM
Português do Brasil, fale com "você", frases curtas e diretas, linguagem de dono de pequeno e médio negócio. Escreva "Inteligência Artificial" por extenso. Nunca use travessão. Evite clichês como "agregar valor", "alavancar", "potencializar", "jornada". Não cite autores nem use markdown.`;

function montarPedido(d, classe) {
  const l = [
    `Empresa: ${d.empresa}`,
    `Tipo de negócio: ${d.segmento}`,
    `Produtos e serviços: ${d.oferta}`,
    `Principais clientes: ${d.clientes}`,
    `Frequência de compra: ${d.frequencia}`,
    `Cliente principal: ${d.perfil || "não informado"}`,
    `Canais de venda e atendimento: ${d.canais.join("; ")}`,
    `Dificuldades comerciais marcadas: ${d.dificuldades.join("; ")}`,
    "",
  ];
  for (const n of [1, 2]) {
    const p = classe.pilares[n];
    l.push(`PILAR ${n}: ${PILARES[n].nome} (índice ${p.indice ?? "sem dados"}/100; estado: ${ESTADOS[p.estado]}; estruturadas ${p.A}, informais ${p.B}, atenção ${p.C}, a verificar ${p.D})`);
    for (const x of classe.itens.filter((i) => i.pilar === n)) {
      l.push(`- ${x.id} ${x.tema}: "${x.pergunta}" Resposta: "${x.resposta}" (${SITUACOES[x.situacao]})`);
    }
    l.push("");
  }
  l.push("Cruze as respostas e escreva o relatório.");
  return l.join("\n");
}

const limpar = (t) => String(t || "").replace(/\s*[—–]\s*/g, ", ").replace(/\s+,/g, ",").trim();

export async function escreverRelatorio(dados, classe) {
  const client = new Anthropic({ apiKey: (Netlify.env.get("ANTHROPIC_API_KEY") ?? "").trim(), maxRetries: 1, timeout: 180_000 });
  const stream = client.beta.messages.stream({
    model: MODELO,
    max_tokens: 20000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: { effort: "medium", format: betaZodOutputFormat(RelatorioSchema) },
    system: SISTEMA,
    messages: [{ role: "user", content: montarPedido(dados, classe) }],
  });
  const resposta = await stream.finalMessage();
  if (resposta.stop_reason === "refusal") throw new Error("A Inteligência Artificial recusou escrever o relatório.");
  if (resposta.stop_reason === "max_tokens") throw new Error("O relatório foi cortado por limite de tamanho.");
  const texto = resposta.content.filter((b) => b.type === "text").map((b) => b.text).join("");
  const r = RelatorioSchema.parse(JSON.parse(texto));
  console.log("Ferramenta: relatório escrito", { entrada: resposta.usage?.input_tokens, saida: resposta.usage?.output_tokens });
  const lista = (a, n) => (a || []).slice(0, n).map(limpar).filter(Boolean);
  const pilares = [1, 2].map((n) => {
    const p = r.pilares.find((x) => Number(x.pilar) === n) || r.pilares[n - 1] || {};
    return { pilar: n, leitura: limpar(p.leitura), funciona: lista(p.funciona, 3), fragil: lista(p.fragil, 3), verificar: lista(p.verificar, 2) };
  });
  return {
    resumo: limpar(r.resumo),
    pilares,
    prioridades: r.prioridades.slice(0, 3).map((p) => ({
      titulo: limpar(p.titulo), porque: limpar(p.porque), o_que_melhorar: limpar(p.o_que_melhorar),
      como_implementar: lista(p.como_implementar, 4), rotina: limpar(p.rotina), responsavel: limpar(p.responsavel), acompanhar: limpar(p.acompanhar),
    })),
  };
}
