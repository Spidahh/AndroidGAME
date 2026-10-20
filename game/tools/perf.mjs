// Misura prestazioni di M1 in Chromium con viewport da telefono e CPU rallentata.
// Uso: node tools/perf.mjs [url] [cpuThrottle] [zombie]
import { chromium } from '@playwright/test';

const url = process.argv[2] ?? 'http://localhost:5173/';
const throttle = Number(process.argv[3] ?? 4);
const zombies = Number(process.argv[4] ?? 40);
const quality = process.argv[5] ?? 'alta';

const browser = await chromium.launch({ args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist', '--enable-unsafe-swiftshader'] });
const ctx = await browser.newContext({ viewport: { width: 393, height: 852 }, deviceScaleFactor: 2.6, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
const cdp = await ctx.newCDPSession(page);
await cdp.send('Emulation.setCPUThrottlingRate', { rate: throttle });
const t0 = Date.now();
await page.goto(`${url}?stress=${zombies}&q=${quality}&god=1`);
await page.waitForFunction(() => !!document.getElementById('weapon'), null, { timeout: 120000 });
const loadMs = Date.now() - t0;
await page.waitForTimeout(3000);
const r = await page.evaluate(
  () =>
    new Promise((res) => {
      const sc = window.__scene;
      const eng = sc.getEngine();
      let frames = 0;
      let worst = 0;
      let last = performance.now();
      let draws = 0;
      const o = sc.onAfterRenderObservable.add(() => {
        const now = performance.now();
        worst = Math.max(worst, now - last);
        last = now;
        frames++;
        draws += eng._drawCalls?.current ?? 0;
      });
      const start = performance.now();
      setTimeout(() => {
        sc.onAfterRenderObservable.remove(o);
        const s = (performance.now() - start) / 1000;
        res({ fps: +(frames / s).toFixed(1), worstMs: Math.round(worst), drawCallsPerFrame: Math.round(draws / Math.max(1, frames)), zombies: window.__sim().zombies.filter((z) => z.alive).length, gpu: eng.getGlInfo().renderer });
      }, 8000);
    }),
);
console.log(JSON.stringify({ throttle, quality, loadMs, ...r, errors: errors.slice(0, 5) }));
await browser.close();
