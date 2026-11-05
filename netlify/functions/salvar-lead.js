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

const BASE = `https://firestore.googleapis.com/v1/projects/${PROJETO}/databases/(default)/documents`;
const digitos = (v) => String(v || '').replace(/\D/g, '');

// Converte os campos do Firestore (REST) de volta para JS simples.
function lerValor(v) {
  if (!v) return null;
  if ('stringValue' in v) return v.stringValue;
  if ('integerValue' in v) return Number(v.integerValue);
  if ('doubleValue' in v) return v.doubleValue;
  if ('booleanValue' in v) return v.booleanValue;
  if ('nullValue' in v) return null;
  if ('arrayValue' in v) return (v.arrayValue.values || []).map(lerValor);
  if ('mapValue' in v) return lerDoc(v.mapValue.fields || {});
  return null;
}
function lerDoc(fields) {
  const o = {};
  Object.keys(fields || {}).forEach((k) => { o[k] = lerValor(fields[k]); });
  return o;
}

// Procura um lead (fora da lixeira) pelo e-mail ou pelo WhatsApp. Se houver
// mais de um, fica com o mais recente.
async function buscar(campo, valor) {
  if (!valor) return [];
  const resp = await fetch(`${BASE}:runQuery${CHAVE ? `?key=${CHAVE}` : ''}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ structuredQuery: {
      from: [{ collectionId: 'leads' }],
      where: { fieldFilter: { field: { fieldPath: campo }, op: 'EQUAL', value: { stringValue: valor } } },
      limit: 20,
    } }),
  });
  if (!resp.ok) throw new Error('runQuery ' + resp.status);
  const linhas = await resp.json();
  return (Array.isArray(linhas) ? linhas : []).map((l) => l.document).filter(Boolean)
    .filter((d) => !(d.fields && d.fields.excluido_em && d.fields.excluido_em.stringValue));
}
async function acharLead(email, whatsapp) {
  let achados = await buscar('email', email);
  if (!achados.length) achados = await buscar('whatsapp', whatsapp);
  if (!achados.length) return null;
  const quando = (d) => { const f = lerDoc(d.fields); return f.ultimo_teste_em || f.criado_em || ''; };
  return achados.sort((a, b) => (quando(b) > quando(a) ? 1 : -1))[0];
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

  const agora = new Date().toISOString();
  const resultado = {
    ferramenta: txt(p.ferramenta, 120) || 'Teste Valor real × Valor percebido',
    nome,
    email: email || null,
    whatsapp: whatsapp || null,
    whatsapp_digitos: digitos(whatsapp) || null,
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
    ultimo_teste_em: agora,
  };

  try {
    // A mesma pessoa (mesmo e-mail ou mesmo WhatsApp) não vira lead novo:
    // o lead existente é atualizado com o resultado mais recente, conta mais um
    // teste e guarda o resultado anterior no histórico. Status e anotações ficam.
    const existente = await acharLead(email, whatsapp);
    if (existente) {
      const f = existente.fields || {};
      const antes = lerDoc(f);
      const historico = Array.isArray(antes.historico) ? antes.historico.slice(-19) : [];
      historico.push({
        data: antes.ultimo_teste_em || antes.criado_em || null,
        valor_real: antes.valor_real ?? null,
        valor_percebido: antes.valor_percebido ?? null,
        distancia: antes.distancia ?? null,
        perfil: antes.perfil || null,
        segmento: antes.segmento || null,
      });
      const testes = (typeof antes.testes === 'number' ? antes.testes : 1) + 1;
      const atual = Object.assign({}, resultado, { testes, historico, refez_em: agora });
      const mascara = Object.keys(atual).map((k) => 'updateMask.fieldPaths=' + encodeURIComponent(k)).join('&');
      const url = `${BASE}/${existente.name.split('/documents/')[1]}?${mascara}${CHAVE ? `&key=${CHAVE}` : ''}`;
      const resp = await fetch(url, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fields: campos(atual) }) });
      if (!resp.ok) {
        console.error('[salvar-lead] atualizar', resp.status, (await resp.text()).slice(0, 500));
        return { statusCode: resp.status, body: JSON.stringify({ error: 'Firestore error' }) };
      }
      return { statusCode: 200, body: JSON.stringify({ ok: true, id: existente.name.split('/').pop(), testes }) };
    }

    const doc = Object.assign({ criado_em: agora, status: 'novo', testes: 1, historico: [] }, resultado);
    const resp = await fetch(`${BASE}/leads${CHAVE ? `?key=${CHAVE}` : ''}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields: campos(doc) }),
    });
    const data = await resp.json().catch(() => ({}));
    if (!resp.ok) {
      console.error('[salvar-lead] Firestore', resp.status, JSON.stringify(data).slice(0, 500));
      return { statusCode: resp.status, body: JSON.stringify({ error: 'Firestore error' }) };
    }
    return { statusCode: 200, body: JSON.stringify({ ok: true, id: String(data.name || '').split('/').pop(), testes: 1 }) };
  } catch (err) {
    console.error('[salvar-lead] rede', String(err));
    return { statusCode: 502, body: JSON.stringify({ error: 'Network error' }) };
  }
};
