import assert from 'node:assert/strict';

const base = new URL(process.argv[2] ?? 'http://127.0.0.1:8080');
assert(['http:', 'https:'].includes(base.protocol), 'Expected an HTTP(S) URL');
async function get(path) {
  return fetch(new URL(path, base), { signal: AbortSignal.timeout(15000) });
}
const health = await get('/health');
assert.equal(health.status, 200, 'Health status');
assert.equal((await health.text()).trim(), 'ok', 'Health body');
const page = await get('/');
assert.equal(page.status, 200, 'Homepage status');
assert.match(page.headers.get('content-type') ?? '', /text\/html/);
assert.match(page.headers.get('cache-control') ?? '', /no-cache/);
const html = await page.text();
assert.match(html, /id="root"/, 'React mount point');
const assets = [...new Set([...html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+\.(?:js|css))"/g)].map(m => m[1]))];
assert(assets.some(p => p.endsWith('.js')), 'Compiled JavaScript entry');
assert(assets.some(p => p.endsWith('.css')), 'Compiled CSS entry');
for (const asset of assets) {
  const response = await get(asset);
  assert.equal(response.status, 200, asset);
  assert.match(response.headers.get('content-type') ?? '', asset.endsWith('.js') ? /javascript/ : /text\/css/);
  assert.match(response.headers.get('cache-control') ?? '', /immutable/);
  assert((await response.text()).length > 0, `Empty asset: ${asset}`);
}
assert.equal((await get('/assets/cmc-smoke-missing-file.js')).status, 404);
const fallback = await get('/cmc-smoke-fallback');
assert.equal(fallback.status, 200);
assert.equal(await fallback.text(), html, 'SPA fallback must serve the entry page');
console.log(`PASS: health, HTML, ${assets.length} assets, caching, missing asset and SPA fallback at ${base.origin}`);
