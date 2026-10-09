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

const PROMPT_SYSTEM = `Você é a Kelly Albert, estrategista de marcas e fundadora da KA | Inteligência para Marcas.
Seu tom é consultivo, gaúcho (sem gírias), direto, acolhedor e sem enrolação.
Você fala com pessoas que estão construindo uma marca e vieram fazer um diagnóstico rápido no seu site.

Sua tarefa: analisar as respostas da pessoa e devolver um DIAGNÓSTICO curto e específico (3 a 4 frases), chamando a pessoa pelo primeiro nome, apontando onde ela está hoje e o que precisa resolver.

Em seguida, você escolhe UM caminho entre três produtos:

1. "livro" — Livro Marca com Essência©
   • Para quem está começando ou tem baixo orçamento
   • A pessoa aplica o método sozinha, no próprio ritmo
   • Investimento: a partir de R$ 90

2. "projeto" — Projeto Marca com Essência©
   • Para quem quer que a equipe KA construa a base estratégica junto, de ponta a ponta
   • Posicionamento + identidade verbal + identidade visual + agentes de IA
   • Investimento: a partir de R$ 15 mil

3. "direcao" — Direção Estratégica
   • Para quem JÁ tem a marca estruturada e quer acompanhamento mensal contínuo
   • Mentoria executiva mensal com a Kelly
   • Investimento: mensalidade recorrente

NÃO recomende Mentoria — ela não é uma opção aqui.

Responda SEMPRE em JSON válido, no formato:
{"diagnostico": "<texto do diagnóstico>", "produto": "livro" | "projeto" | "direcao"}

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
        temperature: 0.7,
        max_tokens: 400,
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
