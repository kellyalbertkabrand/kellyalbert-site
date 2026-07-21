// Meta Conversions API (CAPI) — server-side event forwarding
// Recebe eventos do frontend e envia pro Meta via Graph API.
// Usa event_id para deduplicar com o pixel do navegador.
//
// ENV VARS necessárias no Netlify:
//   META_PIXEL_LIVRO_TOKEN     → token do pixel 750406826436550 (/livro/)
//   META_PIXEL_PROGRAMA_TOKEN  → token do pixel 1159280306206203 (/programa/)
//   META_PIXEL_MENTORIA_TOKEN  → token do pixel 831975195273318 (/mentoria/)
//   META_TEST_EVENT_CODE       → (opcional) código de teste do Events Manager
//
// Como gerar cada token:
//   Events Manager > pixel > Configurações > API de Conversões > Gerar token

const crypto = require('crypto');

// Mapeia pixel_id → variável de ambiente do token
const PIXEL_TOKENS = {
  '750406826436550':  process.env.META_PIXEL_LIVRO_TOKEN,     // /livro/
  '1159280306206203': process.env.META_PIXEL_PROGRAMA_TOKEN,  // /programa/
  '831975195273318':  process.env.META_PIXEL_MENTORIA_TOKEN,  // /mentoria/
};

const API_VERSION = 'v21.0';

// SHA-256 helper: Meta exige que email/telefone/nome sejam hashed
function hash(v) {
  if (!v) return undefined;
  return crypto
    .createHash('sha256')
    .update(String(v).trim().toLowerCase())
    .digest('hex');
}

// Limpa telefone: só dígitos, com código do país
function normalizePhone(p) {
  if (!p) return undefined;
  let d = String(p).replace(/\D/g, '');
  if (d.length >= 10 && !d.startsWith('55')) d = '55' + d; // BR default
  return d;
}

exports.handler = async function (event) {
  // CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: 'Method not allowed' };

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (e) {
    return { statusCode: 400, headers, body: 'Invalid JSON' };
  }

  const {
    pixel_id,
    event_name,      // 'PageView', 'Lead', 'Purchase' etc.
    event_id,        // MESMO id que o pixel do browser usou → dedupe
    event_source_url,
    user_data = {},  // { email, phone, first_name, last_name, external_id }
    custom_data = {} // { value, currency, content_name, ... }
  } = body;

  const token = PIXEL_TOKENS[pixel_id];
  if (!pixel_id || !event_name || !token) {
    // Sem token configurado ainda? Aceita silenciosamente pra não quebrar o site.
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: false, reason: token ? 'missing_fields' : 'pixel_not_configured' })
    };
  }

  // IP + User Agent do request original (Meta usa pra atribuição)
  const clientIp =
    (event.headers['x-nf-client-connection-ip']) ||
    (event.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    (event.headers['client-ip']) ||
    undefined;
  const userAgent = event.headers['user-agent'];

  // Monta user_data (com hash nos campos exigidos)
  const ud = {
    client_ip_address: clientIp,
    client_user_agent: userAgent,
  };
  if (user_data.email) ud.em = [hash(user_data.email)];
  if (user_data.phone) ud.ph = [hash(normalizePhone(user_data.phone))];
  if (user_data.first_name) ud.fn = [hash(user_data.first_name)];
  if (user_data.last_name) ud.ln = [hash(user_data.last_name)];
  if (user_data.external_id) ud.external_id = [hash(user_data.external_id)];
  if (user_data.fbp) ud.fbp = user_data.fbp; // cookie _fbp do browser
  if (user_data.fbc) ud.fbc = user_data.fbc; // cookie _fbc (fbclid) do browser

  const payload = {
    data: [{
      event_name,
      event_time: Math.floor(Date.now() / 1000),
      event_id,                                // dedupe com pixel browser
      action_source: 'website',
      event_source_url: event_source_url || event.headers.referer,
      user_data: ud,
      ...(Object.keys(custom_data).length ? { custom_data } : {}),
    }],
  };
  if (process.env.META_TEST_EVENT_CODE) {
    payload.test_event_code = process.env.META_TEST_EVENT_CODE;
  }

  const url = `https://graph.facebook.com/${API_VERSION}/${pixel_id}/events?access_token=${encodeURIComponent(token)}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const text = await res.text();
    return {
      statusCode: res.ok ? 200 : 502,
      headers,
      body: text,
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ ok: false, error: String(err) }),
    };
  }
};
