// Gioca un livello nel browser con input simulati e salva screenshot a intervalli.
// Uso: node tools/play.mjs <url> <outPrefix> <secondi> [ogni_s]
import { chromium } from '@playwright/test';
const [url, prefix, secs = '20', every = '4'] = process.argv.slice(2);
const browser = await chromium.launch({ args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist'] });
const ctx = await browser.newContext({ viewport: { width: 393, height: 852 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
const logs = [];
page.on('console', (m) => (m.type() === 'error' || m.type() === 'warning') && logs.push(`${m.type()}: ${m.text()}`));
page.on('pageerror', (e) => logs.push(`pageerror: ${e}`));
await page.goto(url);
await page.waitForSelector('.hudwrap', { timeout: 120000 });
const t0 = Date.now();
let n = 0;
let next = 0;
while ((Date.now() - t0) / 1000 < Number(secs)) {
  const el = (Date.now() - t0) / 1000;
  if (el >= next) {
    await page.screenshot({ path: `${prefix}-${String(n++).padStart(2, '0')}.png` });
    next += Number(every);
  }
  // cambia corsia ogni tanto, come farebbe un giocatore
  const key = Math.random() < 0.5 ? 'ArrowLeft' : 'ArrowRight';
  await page.keyboard.press(key);
  await page.waitForTimeout(700 + Math.random() * 900);
}
console.log(logs.slice(0, 15).join('\n'));
await browser.close();
