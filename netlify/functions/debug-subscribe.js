// ENDPOINT TEMPORÁRIO de debug — testa a chamada para o MailerLite com dados mock
// e retorna a resposta completa. REMOVER assim que o problema for resolvido.

exports.handler = async function(event, context){
  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;
  const fromEmail = process.env.MAILERLITE_FROM_EMAIL;
  const fromName = process.env.MAILERLITE_FROM_NAME;

  const diagnostics = {
    env_vars: {
      MAILERLITE_API_KEY: apiKey ? `${apiKey.slice(0, 20)}...${apiKey.slice(-20)}` : 'MISSING',
      MAILERLITE_GROUP_ID: groupId || 'MISSING',
      MAILERLITE_FROM_EMAIL: fromEmail || 'MISSING',
      MAILERLITE_FROM_NAME: fromName || 'MISSING',
    },
    test_subscriber: null,
    error: null,
  };

  if (!apiKey || !groupId) {
    diagnostics.error = 'env vars missing';
    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(diagnostics, null, 2) };
  }

  // Tentar criar um subscriber de teste
  const testEmail = `debug-${Date.now()}@kellyalbert.com.br`;
  const body = {
    email: testEmail,
    fields: { name: 'Debug Test', phone: '+5551999999999', origem: 'debug-endpoint' },
    groups: [groupId],
    status: 'active',
  };

  try {
    const resp = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await resp.json().catch(() => ({}));
    diagnostics.test_subscriber = {
      email: testEmail,
      status: resp.status,
      ok: resp.ok,
      response: data,
    };
  } catch (err) {
    diagnostics.error = 'fetch failed: ' + String(err);
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(diagnostics, null, 2),
  };
};
