// Netlify Function: assina lead no MailerLite
// Env vars necessárias no painel Netlify:
//   MAILERLITE_API_KEY  - token gerado em MailerLite > Integrations > Developer API
//   MAILERLITE_GROUP_ID - id do grupo onde o lead vai entrar (ex: "Mentoria - Leads")

exports.handler = async function(event){
  if(event.httpMethod !== 'POST'){
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  let payload;
  try { payload = JSON.parse(event.body || '{}'); }
  catch(e){ return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) }; }

  const { nome, email, whatsapp, origem } = payload;
  if(!email || !nome){
    return { statusCode: 400, body: JSON.stringify({ error: 'nome e email são obrigatórios' }) };
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;
  if(!apiKey){
    return { statusCode: 500, body: JSON.stringify({ error: 'MAILERLITE_API_KEY não configurada' }) };
  }

  const body = {
    email: email.trim().toLowerCase(),
    fields: {
      name: nome.trim(),
      phone: (whatsapp || '').trim()
    },
    status: 'active'
  };
  if(groupId){ body.groups = [groupId]; }
  if(origem){ body.fields.origem = origem; }

  try{
    const resp = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const data = await resp.json().catch(()=>({}));
    if(!resp.ok){
      return { statusCode: resp.status, body: JSON.stringify({ error: 'MailerLite error', detail: data }) };
    }
    return { statusCode: 200, body: JSON.stringify({ ok: true, subscriber: data.data && data.data.id }) };
  }catch(err){
    return { statusCode: 502, body: JSON.stringify({ error: 'Network error', detail: String(err) }) };
  }
};
