// ENDPOINT TEMPORÁRIO de admin — usar pra descobrir IDs dos grupos do MailerLite
// REMOVER assim que o group ID estiver no env var.

exports.handler = async function(){
  const apiKey = process.env.MAILERLITE_API_KEY;
  if(!apiKey) return { statusCode: 500, body: JSON.stringify({ error: 'no api key' }) };
  try{
    const resp = await fetch('https://connect.mailerlite.com/api/groups?limit=100', {
      headers: { 'Authorization': 'Bearer ' + apiKey, 'Accept': 'application/json' }
    });
    const data = await resp.json();
    const summary = (data.data || []).map(g => ({ id: g.id, name: g.name, active_count: g.active_count }));
    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(summary, null, 2) };
  }catch(err){
    return { statusCode: 502, body: JSON.stringify({ error: String(err) }) };
  }
};
