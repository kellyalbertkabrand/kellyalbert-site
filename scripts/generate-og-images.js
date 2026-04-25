// Gerador de OG Images (1200x630) baseado no layout REAL de cada página
// - Sobe servidor local
// - Abre cada página em viewport 1200x630
// - Captura o topo da página (hero) e salva em /images/og/
// Uso: node scripts/generate-og-images.js

const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(ROOT, 'images', 'og');
const PORT = 8765;

const PAGES = [
  { url: '/',          file: 'og-home.jpg' },
  { url: '/sobre/',    file: 'og-sobre.jpg' },
  { url: '/livro/',    file: 'og-livro.jpg' },
  { url: '/mentoria/', file: 'og-mentoria.jpg' },
  { url: '/programa/', file: 'og-programa.jpg' },
  { url: '/direcao/',  file: 'og-direcao.jpg' },
  { url: '/cases/',    file: 'og-cases.jpg' },
  { url: '/quiz/',     file: 'og-quiz.jpg' },
  { url: '/bio/',      file: 'og-bio.jpg' },
  { url: '/produtos/', file: 'og-produtos.jpg' },
];

const MIME = {
  '.html':'text/html;charset=utf-8','.css':'text/css','.js':'application/javascript',
  '.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml',
  '.gif':'image/gif','.ico':'image/x-icon','.webp':'image/webp','.mp4':'video/mp4',
  '.woff':'font/woff','.woff2':'font/woff2','.ttf':'font/ttf','.otf':'font/otf',
  '.json':'application/json','.txt':'text/plain','.webmanifest':'application/manifest+json',
};

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let urlPath = decodeURIComponent(req.url.split('?')[0]);
      if (urlPath.endsWith('/')) urlPath += 'index.html';
      const filePath = path.join(ROOT, urlPath);
      // Anti path-traversal
      if (!filePath.startsWith(ROOT)) { res.writeHead(403); res.end('forbidden'); return; }
      fs.stat(filePath, (err, st) => {
        if (err || !st.isFile()) { res.writeHead(404); res.end('not found'); return; }
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
        fs.createReadStream(filePath).pipe(res);
      });
    });
    server.listen(PORT, '127.0.0.1', () => resolve(server));
  });
}

(async () => {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const server = await startServer();
  console.log(`Serving ${ROOT} on http://127.0.0.1:${PORT}`);

  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  });
  const page = await ctx.newPage();

  for (const p of PAGES) {
    const url = `http://127.0.0.1:${PORT}${p.url}`;
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    } catch (e) {
      console.log(`✗ ${p.file} — falhou ao carregar (${e.message.split('\n')[0]})`);
      continue;
    }

    // Garante topo da página
    await page.evaluate(() => window.scrollTo(0, 0));

    // Espera fontes carregarem
    await page.evaluate(() => document.fonts && document.fonts.ready);

    // Esconde botões de cookie / fixos que possam aparecer
    await page.addStyleTag({ content: `
      .cookie-banner, #cookie-banner, [class*="cookie"], [id*="cookie"] { display:none !important; }
      .nav, .navbar, header.nav, nav.nav { /* mantém o menu se for parte do hero */ }
    `});

    // Aguarda animações iniciais
    await page.waitForTimeout(800);

    const out = path.join(OUTPUT_DIR, p.file);
    await page.screenshot({
      path: out,
      type: 'jpeg',
      quality: 88,
      clip: { x: 0, y: 0, width: 1200, height: 630 },
    });
    const size = (fs.statSync(out).size / 1024).toFixed(0);
    console.log(`✓ ${p.file} — ${size} KB`);
  }

  await browser.close();
  server.close();
  console.log(`\nGerado em ${OUTPUT_DIR}`);
})();
