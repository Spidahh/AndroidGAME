// Elenco delle mesh attive per nome (cosa costa il disegno). Uso: node tools/meshes.mjs [livello]
import { chromium } from '@playwright/test';
const level = process.argv[2] ?? 9;
const browser = await chromium.launch({ args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist'] });
const page = await (await browser.newContext({ viewport: { width: 393, height: 852 }, deviceScaleFactor: 2.6 })).newPage();
await page.goto(`http://localhost:5173/?level=${level}&at=0.45&god=1`);
await page.waitForFunction(() => !!document.getElementById('weapon'), null, { timeout: 120000 });
await page.waitForTimeout(2500);
const r = await page.evaluate(() => {
  const sc = window.__scene;
  const c = {};
  for (const m of sc.getActiveMeshes().data.slice(0, sc.getActiveMeshes().length)) {
    let n = m;
    while (n.parent) n = n.parent;
    const k = (n.name || m.name).replace(/[0-9]+/g, '#') + ' / ' + (m.material?.getClassName?.() ?? '-');
    c[k] = (c[k] ?? 0) + 1;
  }
  return Object.entries(c).sort((a, b) => b[1] - a[1]);
});
console.log(r.map(([k, v]) => `${v}\t${k}`).join('\n'));
await browser.close();
