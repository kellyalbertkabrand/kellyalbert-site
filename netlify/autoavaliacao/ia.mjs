// Teste de Autoavaliação de Marca · texto do resultado escrito pela Inteligência Artificial.
// A classificação (situação de cada pergunta, estado de cada pilar e perfil) vem pronta das regras;
// a Inteligência Artificial só escreve, dentro dos limites do teste gratuito.
import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";
import { AVISO, PERFIS, PILARES, SITUACOES } from "../../valorpercebido/regras.mjs";

export const MODELO = "claude-opus-5-5";

const TextoSchema = z.object({
  leitura: z.string().describe("Duas ou três frases que explicam o perfil inicial a partir das respostas. Até 45 palavras."),
  positivos: z.array(z.string()).describe("Zero a dois sinais positivos relatados. Cada um com até 25 palavras."),
  atencao: z.array(z.string()).describe("Zero a dois pontos de atenção. Cada um com até 30 palavras."),
  orientacao: z.string().describe("Uma orientação prática inicial ligada ao principal ponto de atenção. Até 45 palavras."),
});

const SISTEMA = `Você escreve o resultado do Teste de Autoavaliação de Marca, um teste gratuito da KA | Inteligência para Marcas (Kelly Albert, estrategista de marcas). O teste é uma primeira avaliação: desperta consciência e entrega uma reflexão útil. Ele não é uma análise de posicionamento.

O empresário respondeu 11 perguntas em dois pilares:
- Pilar 1, Sinais de força da marca: recompra, indicações, satisfação, diferenciais, cumprimento das promessas e provas de qualidade.
- Pilar 2, Capacidade de demonstrar valor: objeções de preço, clareza da proposta de valor, diferenciação na comunicação, canais e argumentos de venda.

Você recebe cada resposta já classificada (prática estruturada, prática informal, ponto de atenção, informação insuficiente, não se aplica), o estado de cada pilar e o perfil inicial. O perfil já está decidido: nunca troque o perfil e nunca crie outro.

Como escrever:
1. Conheça a empresa antes de interpretar: considere o principal produto ou serviço, o tipo de cliente e o segmento. Um negócio de compra única não tem recompra frequente, e isso não é falta de fidelização.
2. Use só as respostas recebidas. Não invente fatos, números, concorrentes ou situações.
3. Relato não é comprovação. Escreva "você relata", "suas respostas indicam". Nunca afirme que a empresa tem qualidade, que o diferencial é exclusivo ou que o benefício está comprovado.
4. Não presuma o que o cliente pensa ou percebe. Não preveja perda de clientes. Não diga que a marca está mal posicionada.
5. Objeção de preço não prova que o valor é baixo. Falta de acompanhamento da satisfação não prova clientes insatisfeitos: indica informação insuficiente.
6. Não penalize quem não usa Instagram ou site: fale dos canais que a empresa usa.
7. As dificuldades marcadas servem para contextualizar e priorizar, nunca como prova de problema.
8. Positivos: até dois, só de respostas classificadas como prática estruturada (ou, se não houver, prática informal relevante). Se não houver nenhum sinal positivo, devolva a lista vazia.
9. Pontos de atenção: no máximo dois, escolhidos pela relevância para a escolha e valorização da marca, pelas evidências nas respostas e pelas dificuldades declaradas. Quando faltar informação, diga que o aspecto precisa ser investigado. Se as respostas forem favoráveis, reconheça isso: não force problema para vender a aula. Lista vazia é permitido.
10. Orientação: uma só, prática, específica para o tipo de negócio, que dê para começar nesta semana. Nada de "melhore sua comunicação" ou "fortaleça sua marca". Não entregue posicionamento, proposta de valor pronta, plano de comunicação, identidade verbal ou planejamento estratégico.
11. A frase aberta sobre por que escolher a empresa deve ser avaliada pela clareza e especificidade, não como verdade.

Tom: português do Brasil, fale com "você", frases curtas e diretas, linguagem simples para um dono de pequeno negócio. Escreva "Inteligência Artificial" por extenso. Nunca use travessão. Evite clichês como "agregar valor", "alavancar", "potencializar", "jornada", "basicamente", "na verdade". Não cite autores. Não use markdown.`;

function montarPedido(dados, classe) {
  const linhas = [];
  linhas.push(`Principal produto ou serviço: ${dados.produto}`);
  linhas.push(`Principais clientes: ${dados.clientes}`);
  if (dados.segmento) linhas.push(`Segmento: ${dados.segmento}`);
  linhas.push("");
  for (const n of [1, 2]) {
    const p = classe.pilares[n];
    linhas.push(`PILAR ${n}: ${PILARES[n].nome} (estado: ${p.estado}; estruturadas ${p.A}, informais ${p.B}, atenção ${p.C}, sem informação ${p.D}, não se aplica ${p.NA})`);
    for (const x of classe.itens.filter((i) => i.pilar === n)) {
      linhas.push(`- ${x.id} ${x.tema}: "${x.pergunta}" Resposta: "${x.resposta || "(sem resposta)"}" Situação: ${SITUACOES[x.situacao]}`);
      if (x.id === "P4" && dados.respostas.P4b) linhas.push(`  Diferencial informado: "${dados.respostas.P4b}"`);
    }
    linhas.push("");
  }
  linhas.push(`Dificuldades marcadas pelo empresário: ${dados.dificuldades.length ? dados.dificuldades.join("; ") : "nenhuma informada"}`);
  linhas.push("");
  linhas.push(`Perfil inicial (já decidido): ${PERFIS[classe.perfil].nome}. ${PERFIS[classe.perfil].txt}`);
  linhas.push(`O resultado sempre vem acompanhado deste aviso: "${AVISO}"`);
  linhas.push("");
  linhas.push("Escreva a leitura, os sinais positivos, os pontos de atenção e a orientação.");
  return linhas.join("\n");
}

const semTravessao = (t) => String(t || "").replace(/\s*[—–]\s*/g, ", ").replace(/\s+,/g, ",").trim();

export async function escreverResultado(dados, classe) {
  const client = new Anthropic({ apiKey: (Netlify.env.get("ANTHROPIC_API_KEY") ?? "").trim(), maxRetries: 1, timeout: 60_000 });
  const stream = client.beta.messages.stream({
    model: MODELO,
    max_tokens: 16000,
    betas: ["server-side-fallback-2026-07-01"],
    // Se o modelo principal recusar, a própria API tenta de novo com o modelo recomendado.
    fallbacks: "default",
    output_config: { effort: "low", format: betaZodOutputFormat(TextoSchema) },
    system: SISTEMA,
    messages: [{ role: "user", content: montarPedido(dados, classe) }],
  });
  const resposta = await stream.finalMessage();
  if (resposta.stop_reason === "refusal") throw new Error("A Inteligência Artificial recusou escrever o resultado.");
  if (resposta.stop_reason === "max_tokens") throw new Error("O resultado foi cortado por limite de tamanho.");
  const texto = resposta.content.filter((b) => b.type === "text").map((b) => b.text).join("");
  const r = TextoSchema.parse(JSON.parse(texto));
  console.log("Autoavaliação escrita", { tokens_entrada: resposta.usage?.input_tokens, tokens_saida: resposta.usage?.output_tokens });
  return {
    leitura: semTravessao(r.leitura),
    positivos: r.positivos.slice(0, 2).map(semTravessao).filter(Boolean),
    atencao: r.atencao.slice(0, 2).map(semTravessao).filter(Boolean),
    orientacao: semTravessao(r.orientacao),
  };
}
