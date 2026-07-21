// KA Meta Pixel + CAPI helper
// Dispara eventos no PIXEL do browser E na CAPI server-side com o MESMO event_id
// para o Meta deduplicar. Assim, se o browser bloquear cookies/scripts,
// o servidor ainda envia o evento.
//
// Cada página define window.KA_PIXEL_ID antes de carregar este script.
// Uso:
//   kaMetaTrack('Lead');
//   kaMetaTrack('Purchase', {value: 990, currency: 'BRL'}, {email: 'x@y.com', phone: '5551...'});

(function () {
  var CAPI_ENDPOINT = '/.netlify/functions/meta-capi';

  // UUIDv4 leve (sem dep de crypto.randomUUID pra máxima compatibilidade)
  function uuid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0;
      var v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  // Lê cookie por nome (pra pegar _fbp e _fbc do próprio pixel)
  function cookie(name) {
    var m = document.cookie.match('(?:^|;)\\s*' + name + '=([^;]+)');
    return m ? decodeURIComponent(m[1]) : undefined;
  }

  window.kaMetaTrack = function (eventName, customData, userData) {
    var pixelId = window.KA_PIXEL_ID;
    if (!pixelId || !eventName) return;
    var eventId = uuid();
    customData = customData || {};
    userData = userData || {};

    // 1) Pixel do browser (com eventID pra dedupe)
    try {
      if (typeof fbq === 'function') {
        fbq('track', eventName, customData, { eventID: eventId });
      }
    } catch (e) {}

    // 2) CAPI (server-side) — mesmo event_id
    try {
      var body = {
        pixel_id: pixelId,
        event_name: eventName,
        event_id: eventId,
        event_source_url: location.href,
        user_data: Object.assign({
          fbp: cookie('_fbp'),
          fbc: cookie('_fbc'),
        }, userData),
        custom_data: customData,
      };
      // sendBeacon é ideal — não bloqueia navegação (útil quando o clique
      // leva pra WhatsApp / Hotmart e a página está fechando)
      if (navigator.sendBeacon) {
        var blob = new Blob([JSON.stringify(body)], { type: 'application/json' });
        navigator.sendBeacon(CAPI_ENDPOINT, blob);
      } else {
        fetch(CAPI_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
          keepalive: true,
        }).catch(function () {});
      }
    } catch (e) {}
  };
})();
