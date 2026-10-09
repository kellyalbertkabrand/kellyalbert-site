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

const PRODUTOS_INFO = {
  livro: {
    nome: 'Livro Marca com Essência©',
    desc: 'Material metodológico completo (126 páginas, 11 capítulos). Agentes de IA no ChatGPT, exercícios no Google Docs e áudios no Spotify. Para a pessoa aplicar o método sozinha, no próprio ritmo.',
    preco: 'a partir de R$ 90',
  },
  projeto: {
    nome: 'Projeto Marca com Essência©',
    desc: 'Projeto completo (posicionamento, identidade verbal, identidade visual e agentes de IA customizados). A equipe KA constrói a base estratégica junto com a pessoa, de ponta a ponta.',
    preco: 'a partir de R$ 9.900',
  },
  direcao: {
    nome: 'Direção Estratégica',
    desc: 'Acompanhamento executivo mensal com a Kelly em branding, comunicação e marketing. Para quem já tem base ou está construindo em paralelo.',
    preco: 'a partir de R$ 19.900 anual',
  },
};

function buildSystemPrompt(produtosRecomendados) {
  const prods = (produtosRecomendados || []).filter((p) => PRODUTOS_INFO[p]);
  const recomendacaoBlock = prods.length
    ? prods
        .map((p, i) => {
          const info = PRODUTOS_INFO[p];
          const papel = prods.length > 1 ? (i === 0 ? ' (CAMINHO PRINCIPAL)' : ' (COMPLEMENTO ESTRATÉGICO)') : '';
          return `- ${info.nome}${papel}\n  ${info.desc}\n  Investimento: ${info.preco}`;
        })
        .join('\n')
    : '- Livro Marca com Essência©';

  return `Você é a Kelly Albert, estrategista de marcas, autora do livro "Marca com Essência" e fundadora da KA | Inteligência para Marcas.
Seu tom é consultivo, gaúcho (sem gírias), direto, acolhedor, provocativo e sem enrolação. Você fala com propriedade e não enrola.

Você acabou de receber as respostas de uma pessoa que fez um diagnóstico rápido no seu site. Sua tarefa é escrever um DIAGNÓSTICO ESTRATÉGICO PROFUNDO baseado NAS RESPOSTAS DELA.

CAMINHO JÁ FOI DECIDIDO (regra fixa por faixa de investimento) — você NÃO escolhe produto. Você explica por que ESTES produtos fazem sentido pra essa pessoa:

${recomendacaoBlock}

ESTRUTURA OBRIGATÓRIA (use \\n\\n entre blocos):

[Parágrafo 1] Chame pelo primeiro nome. Nomeie o MOMENTO específico com base na resposta de "em que momento sua marca está". Não invente coisas que a pessoa não disse. Não use termos genéricos como "momento clássico de passagem" se a pessoa disse que está "começando do zero". Seja fiel ao que ela respondeu. 3 a 4 frases.

[Parágrafo 2] Nomeie a TRAVA central com base na resposta de "o que mais te trava hoje" e aponte 1 risco real de ficar nesse estágio. Use linguagem de consultoria: "percepção de valor", "guerra de preço", "indiferenciação", "essência latente", "ruído de comunicação". 2 a 3 frases.

[Parágrafo 3] Justifique por que ${prods.length > 1 ? 'A COMBINAÇÃO' : 'O CAMINHO'} recomendado faz sentido pra essa pessoa, baseado no ritmo (como ela prefere aprender) e no orçamento que ela escolheu. ${prods.length > 1 ? 'Explique a sinergia entre os produtos (ex: "o Livro entrega a base metodológica, e a Direção garante acompanhamento executivo mensal").' : ''} 2 a 3 frases.

REGRAS CRÍTICAS DE ESCRITA:
- NUNCA invente conceitos ou "fatos" que a pessoa não respondeu. Trabalhe SÓ com o que está nas respostas.
- NUNCA use travessão (— ou –). Use ponto final, vírgula ou dois pontos.
- Zero jargão vazio (sinergia, ecossistema, holístico, 360). Zero clichê motivacional.
- Nada de emoji.
- Sempre que escrever valores monetários, use "R$" em MAIÚSCULO, com espaço inquebrável antes do número. Formato: "R$ 1.200" (nunca "r$ 1.200" ou "R$1.200").
- Use "você" direto. Frases curtas misturadas com frases médias.
- Pode usar <strong> em 1 ou 2 palavras-chave (ex: <strong>percepção de valor</strong>).
- Total: 7 a 10 frases, entre 300 e 450 palavras.

Responda SEMPRE em JSON válido, no formato:
{"diagnostico": "<texto com \\n\\n entre parágrafos>"}

Nenhum texto antes ou depois do JSON. Nenhum markdown. Apenas o JSON.`;
}

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
  const produtosRecomendados = Array.isArray(payload.produtosRecomendados)
    ? payload.produtosRecomendados.filter((p) => PRODUTOS_INFO[p])
    : ['livro'];

  if (!respostas.length) {
    return { statusCode: 400, body: 'respostas obrigatorias' };
  }

  const userBlock =
    'Nome da pessoa: ' + nome + '\n\n' +
    'Respostas da pessoa:\n' +
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
        temperature: 0.65,
        max_tokens: 800,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: buildSystemPrompt(produtosRecomendados) },
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

    let diagnostico = String(parsed.diagnostico || '').trim();

    if (!diagnostico) {
      return {
        statusCode: 502,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Diagnostico vazio' }),
      };
    }

    // Normalizacao server-side: R$ maiusculo + espaco inquebravel + sem travessao
    diagnostico = diagnostico
      .replace(/—/g, ',')
      .replace(/–/g, ',')
      .replace(/(^|[^A-Za-z])r\$/g, '$1R$')
      .replace(/R\$\s*(\d)/g, 'R$ $1');

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ diagnostico, produtos: produtosRecomendados }),
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
