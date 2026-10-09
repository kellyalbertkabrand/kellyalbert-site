// Analise de Marca via IA
// Recebe as respostas do chat da /bio-2/ e devolve um diagnostico + produto recomendado.
//
// ENV VARS necessarias no Netlify:
//   OPENAI_API_KEY  -> chave da API da OpenAI (sk-...)
//
// Entrada (POST JSON):
//   {
//     "respostas": [{"pergunta": "...", "resposta": "..."}, ...],
//     "nome": "Fulana"
//   }
//
// Saida:
//   { "diagnostico": "...", "produto": "livro" | "projeto" | "direcao" }

const PROMPT_SYSTEM = `Você é a Kelly Albert, estrategista de marcas, autora do livro "Marca com Essência" e fundadora da KA | Inteligência para Marcas.
Seu tom é consultivo, gaúcho (sem gírias), direto, acolhedor, provocativo e sem enrolação. Você fala com propriedade e não enrola.

Você acabou de receber as respostas de uma pessoa que fez um diagnóstico rápido no seu site. Sua tarefa é devolver um DIAGNÓSTICO ESTRATÉGICO PROFUNDO (não genérico, não motivacional, não raso).

ESTRUTURA OBRIGATÓRIA do diagnóstico (use quebras duplas de linha \\n\\n entre blocos):

[Parágrafo 1] Comece chamando a pessoa pelo primeiro nome. Nomeie o momento específico em que ela está. Não use frases genéricas tipo "você está num momento de construção". Diga o que você LÊ nas respostas: qual é a dor real por trás delas, o que está acontecendo nessa marca, qual é o ponto cego. 3 a 4 frases densas.

[Parágrafo 2] Aponte 1 ou 2 riscos reais de ficar nesse estágio. O que acontece se nada mudar nos próximos 6-12 meses? Seja específica. Use linguagem de consultoria estratégica: "percepção de valor", "guerra de preço", "indiferenciação", "essência latente", "ruído de comunicação". 2 a 3 frases.

[Parágrafo 3] Faça a ponte: diga por que o caminho que você vai recomendar faz sentido PRA ESSA PESSOA ESPECIFICAMENTE, com base nas respostas dela (ritmo de aprendizado, momento do negócio, orçamento). Se você recomendar 2 produtos combinados, explique por que a combinação faz sentido (ex: "o Livro te dá a base metodológica e a Direção garante a continuidade estratégica"). Não venda, justifique. 2 a 3 frases.

Total: 7-10 frases. Entre 350 e 500 palavras.

PRODUTOS DISPONÍVEIS (escolha 1 ou 2, combinando quando fizer sentido estratégico e couber no orçamento):

1. "livro" — Livro Marca com Essência©
   • Material metodológico completo (126 páginas, 11 capítulos)
   • Agentes de IA no ChatGPT + exercícios no Google Docs + áudios no Spotify
   • Para quem quer aplicar o método sozinha, no próprio ritmo
   • Investimento: a partir de R$ 90
   • Combina muito bem com: direcao (pra ter apoio estratégico em paralelo à aplicação)

2. "projeto" — Projeto Marca com Essência©
   • Projeto completo: posicionamento + identidade verbal + identidade visual + agentes de IA customizados
   • A equipe KA constrói a base estratégica JUNTO com a pessoa, de ponta a ponta
   • Para quem já tem empresa estruturada e quer um projeto completo feito
   • Investimento: a partir de R$ 9.900
   • Combina com: direcao (projeto entrega a base, direção mantém a consistência depois)

3. "direcao" — Direção Estratégica
   • Acompanhamento executivo mensal com a Kelly em branding, comunicação e marketing
   • Para quem já tem a base da marca (ou está construindo em paralelo) e quer direção contínua
   • Investimento: a partir de R$ 19.900 anual (equivalente ~R$ 1.600/mês)
   • Combina com: livro ou projeto

NUNCA recomende "Mentoria" (não é opção aqui).

QUANDO SUGERIR 1 vs 2 PRODUTOS:
- 1 produto: quando o orçamento é claramente de uma faixa única, ou quando a combinação não agrega.
- 2 produtos: quando o orçamento comporta e a combinação é estrategicamente coerente. Exemplos:
  * Pessoa com orçamento acima de R$ 20 mil e perfil de autodidata: livro + direcao (R$ 90 + mensalidade recorrente)
  * Pessoa com orçamento alto e precisando de base + continuidade: projeto + direcao
- Se recomendar 2, o primeiro é o PRINCIPAL (mais urgente) e o segundo é COMPLEMENTAR.

REGRAS DE ESCRITA:
- Zero jargão corporativo vazio (sinergia, ecossistema, holistico, 360).
- Zero clichê motivacional (acredite em você, o céu é o limite).
- Nada de emoji no diagnóstico.
- NUNCA use travessão (— ou –). Use ponto final, vírgula ou dois pontos no lugar. Essa regra é obrigatória.
- Use "você" direto. Frases curtas misturadas com frases médias.
- Pode usar <strong> em uma ou duas palavras-chave do diagnóstico (ex: <strong>percepção de valor</strong>). Isso ajuda a dar hierarquia visual.

Responda SEMPRE em JSON válido, no formato:
{"diagnostico": "<texto com \\n\\n entre parágrafos>", "produtos": ["livro" | "projeto" | "direcao", ...1 ou 2 itens]}

Nenhum texto antes ou depois do JSON. Nenhum markdown. Apenas o JSON.`;

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'OPENAI_API_KEY nao configurada' }),
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (e) {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const nome = (payload.nome || '').trim() || 'amiga';
  const respostas = Array.isArray(payload.respostas) ? payload.respostas : [];

  if (!respostas.length) {
    return { statusCode: 400, body: 'respostas obrigatorias' };
  }

  const userBlock =
    'Nome da pessoa: ' + nome + '\n\n' +
    'Respostas:\n' +
    respostas
      .map((r, i) => (i + 1) + '. ' + (r.pergunta || '') + '\n   Resposta: ' + (r.resposta || ''))
      .join('\n');

  try {
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.75,
        max_tokens: 900,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: PROMPT_SYSTEM },
          { role: 'user', content: userBlock },
        ],
      }),
    });

    if (!resp.ok) {
      const err = await resp.text();
      console.error('OpenAI erro:', resp.status, err);
      return {
        statusCode: 502,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'IA indisponivel' }),
      };
    }

    const data = await resp.json();
    const raw = data.choices?.[0]?.message?.content || '{}';

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      console.error('Resposta nao-JSON da IA:', raw);
      return {
        statusCode: 502,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Resposta invalida da IA' }),
      };
    }

    const produtosValidos = ['livro', 'projeto', 'direcao'];
    let produtos = [];
    if (Array.isArray(parsed.produtos)) {
      produtos = parsed.produtos.filter((p) => produtosValidos.includes(p)).slice(0, 2);
    } else if (produtosValidos.includes(parsed.produto)) {
      // retrocompatibilidade com formato antigo
      produtos = [parsed.produto];
    }
    if (!produtos.length) produtos = ['livro'];
    // remove duplicatas mantendo ordem
    produtos = produtos.filter((p, i) => produtos.indexOf(p) === i);

    const diagnostico = String(parsed.diagnostico || '').trim();

    if (!diagnostico) {
      return {
        statusCode: 502,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Diagnostico vazio' }),
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ diagnostico: diagnostico, produtos: produtos, produto: produtos[0] }),
    };
  } catch (err) {
    console.error('Erro na funcao analisar-marca:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Erro interno' }),
    };
  }
};
