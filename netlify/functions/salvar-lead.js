// Netlify Function: grava o lead das ferramentas do site no ESTÚDIO DE MARCA
// (app da KA em estudiodemarca.kellyalbert.com.br), coleção `leads` do
// Firestore. A aba "Leads" do app lê dessa coleção.
//
// Grava pela API REST do Firestore. Não precisa de chave: quem decide o que
// pode é a Regra do Firestore (`create` público em `leads`, leitura só da KA).
// Sem chave no código também evita que o verificador de segredos do Netlify
// barre a publicação. Variáveis opcionais: FIRESTORE_PROJECT, FIRESTORE_API_KEY.

const PROJETO = process.env.FIRESTORE_PROJECT || 'estudio-de-marcas-ka';
const CHAVE = process.env.FIRESTORE_API_KEY || '';

const txt = (v, max = 300) => String(v == null ? '' : v).trim().slice(0, max);
const num = (v) => (typeof v === 'number' && isFinite(v) ? Math.round(v) : null);

function valor(v) {
  if (v === null || v === undefined) return { nullValue: null };
  if (typeof v === 'boolean') return { booleanValue: v };
  if (typeof v === 'number') return { integerValue: String(Math.round(v)) };
  if (Array.isArray(v)) return { arrayValue: { values: v.map(valor) } };
  if (typeof v === 'object') return { mapValue: { fields: campos(v) } };
  return { stringValue: String(v) };
}
function campos(obj) {
  const out = {};
  Object.keys(obj).forEach((k) => { out[k] = valor(obj[k]); });
  return out;
}

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }
  let p;
  try { p = JSON.parse(event.body || '{}'); }
  catch (e) { return { statusCode: 400, body: JSON.stringify({ error: 'JSON inválido' }) }; }

  const nome = txt(p.nome, 120);
  const email = txt(p.email, 160).toLowerCase();
  const whatsapp = txt(p.whatsapp, 40);
  if (!nome || (!email && !whatsapp)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'nome e e-mail ou WhatsApp são obrigatórios' }) };
  }

  const respostas = Array.isArray(p.respostas)
    ? p.respostas.slice(0, 40).map((r) => ({
        id: txt(r && r.id, 10),
        pergunta: txt(r && r.pergunta, 300),
        resposta: txt(r && r.resposta, 300),
        pontos: num(r && r.pontos) ?? 0,
      }))
    : [];

  const doc = {
    criado_em: new Date().toISOString(),
    ferramenta: txt(p.ferramenta, 120) || 'Teste Valor real × Valor percebido',
    nome,
    email: email || null,
    whatsapp: whatsapp || null,
    segmento: txt(p.segmento, 120) || null,
    consentimento: p.consentimento === true,
    valor_real: num(p.valor_real),
    valor_percebido: num(p.valor_percebido),
    distancia: num(p.distancia),
    perfil: txt(p.perfil, 80) || null,
    respostas,
    origem: txt(p.origem, 80) || null,
    utm_source: txt(p.utm_source, 80) || null,
    utm_medium: txt(p.utm_medium, 80) || null,
    utm_campaign: txt(p.utm_campaign, 120) || null,
    status: 'novo',
  };

  const url = `https://firestore.googleapis.com/v1/projects/${PROJETO}/databases/(default)/documents/leads${CHAVE ? `?key=${CHAVE}` : ''}`;
  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields: campos(doc) }),
    });
    const data = await resp.json().catch(() => ({}));
    if (!resp.ok) {
      console.error('[salvar-lead] Firestore', resp.status, JSON.stringify(data).slice(0, 500));
      return { statusCode: resp.status, body: JSON.stringify({ error: 'Firestore error' }) };
    }
    return { statusCode: 200, body: JSON.stringify({ ok: true, id: String(data.name || '').split('/').pop() }) };
  } catch (err) {
    console.error('[salvar-lead] rede', String(err));
    return { statusCode: 502, body: JSON.stringify({ error: 'Network error' }) };
  }
};
