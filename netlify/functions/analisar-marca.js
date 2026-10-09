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

[Parágrafo 1] Comece chamando a pessoa pelo primeiro nome. Nomeie o momento específico em que ela está — não use frases genéricas tipo "você está num momento de construção". Diga o que você LÊ nas respostas: qual é a dor real por trás delas, o que está acontecendo nessa marca, qual é o ponto cego. 3 a 4 frases densas.

[Parágrafo 2] Aponte 1 ou 2 riscos reais de ficar nesse estágio. O que acontece se nada mudar nos próximos 6-12 meses? Seja específica. Use linguagem de consultoria estratégica: "percepção de valor", "guerra de preço", "indiferenciação", "essência latente", "ruído de comunicação". 2 a 3 frases.

[Parágrafo 3] Faça a ponte: diga por que o caminho que você vai recomendar faz sentido PRA ESSA PESSOA ESPECIFICAMENTE, com base nas respostas dela (ritmo de aprendizado, momento do negócio, orçamento). Não venda — justifique. 2 a 3 frases.

Total: 7-10 frases. Entre 350 e 500 palavras.

PRODUTOS DISPONÍVEIS para recomendar (escolha UM):

1. "livro" — Livro Marca com Essência©
   • Para quem está começando, orçamento baixo, prefere aplicar sozinha no próprio ritmo
   • 11 capítulos, agentes de IA no ChatGPT, exercícios no Google Docs, áudios no Spotify
   • Investimento: a partir de R$ 90

2. "projeto" — Projeto Marca com Essência©
   • Para quem quer a equipe KA construindo a base estratégica junto, de ponta a ponta
   • Posicionamento + identidade verbal + identidade visual + agentes de IA customizados
   • Pessoas que já têm empresa estruturada e orçamento a partir de R$ 9.900
   • Investimento: a partir de R$ 15 mil

3. "direcao" — Direção Estratégica
   • Para quem JÁ tem marca estruturada e quer acompanhamento mensal contínuo
   • Direcionamento executivo mensal com a Kelly em branding, comunicação e marketing
   • Investimento: mensalidade recorrente (a partir de R$ 19.900 anual)

NUNCA recomende "Mentoria" — não é opção aqui.

REGRAS DE ESCRITA:
- Zero jargão corporativo vazio (sinergia, ecossistema, holistico, 360).
- Zero clichê motivacional (acredite em você, o céu é o limite).
- Nada de emoji no diagnóstico.
- NUNCA use travessão (— ou –). Use ponto final, vírgula ou dois pontos no lugar. Essa regra é obrigatória.
- Use "você" direto. Use frases curtas misturadas com frases médias.
- Pode usar <strong> em uma ou duas palavras-chave do diagnóstico (ex: <strong>percepção de valor</strong>). Isso ajuda a dar hierarquia visual.

Responda SEMPRE em JSON válido, no formato:
{"diagnostico": "<texto do diagnóstico com \\n\\n entre parágrafos>", "produto": "livro" | "projeto" | "direcao"}

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
    const produto = produtosValidos.includes(parsed.produto) ? parsed.produto : 'livro';
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
      body: JSON.stringify({ diagnostico: diagnostico, produto: produto }),
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
