// Ripartizione del tempo per frame (simulazione, resa JS, disegno) in una partita M1. Uso: node tools/frame.mjs [livello] [cpu]
import { chromium } from '@playwright/test';
const level = process.argv[2] ?? 9;
const browser = await chromium.launch({ args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist'] });
const ctx = await browser.newContext({ viewport: { width: 393, height: 852 }, deviceScaleFactor: 2.6, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
const cdp = await ctx.newCDPSession(page);
await cdp.send('Emulation.setCPUThrottlingRate', { rate: Number(process.argv[3] ?? 4) });
await page.goto(`http://localhost:5173/?level=${level}&at=0.45&god=1`);
await page.waitForFunction(() => !!document.getElementById('weapon'), null, { timeout: 120000 });
await page.waitForTimeout(1500);
const r = await page.evaluate(() => new Promise((res) => {
  const sim = window.__sim();
  const sc = window.__scene;
  const t = { step: 0, steps: 0, before: 0, render: 0, frames: 0, labels: 0, long: [] };
  let lastF = performance.now();
  const step = sim.step.bind(sim);
  sim.step = (dt) => { const a = performance.now(); step(dt); t.step += performance.now() - a; t.steps++; };
  let a0 = 0;
  sc.onBeforeAnimationsObservable.add(() => (a0 = performance.now()));
  let b0 = 0;
  sc.onBeforeRenderObservable.add(() => (b0 = performance.now()), undefined, false);
  sc.onBeforeCameraRenderObservable.add(() => { t.before += performance.now() - b0; b0 = performance.now(); });
  sc.onAfterRenderObservable.add(() => { const n = performance.now(); t.render += n - b0; t.frames++; if (n - lastF > 25) t.long.push(Math.round(n - lastF) + '@' + sim.time.toFixed(1) + ':' + sim.objects.length + 'o'); lastF = n; });
  setTimeout(() => res({ long: t.long.join(' '), frames: t.frames, stepMsPerFrame: +(t.step / t.frames).toFixed(2), beforeRenderMs: +(t.before / t.frames).toFixed(2), drawMs: +(t.render / t.frames).toFixed(2), zombies: sim.zombies.length, alive: sim.zombies.filter((z) => z.alive).length, objects: sim.objects.length, bullets: sim.bullets.length, labels: document.querySelectorAll('.lbl:not([style*="none"])').length, meshes: sc.meshes.length, activeMeshes: sc.getActiveMeshes().length, materials: sc.materials.length, textures: sc.textures.length }), 6000);
}));
console.log(JSON.stringify(r));
await browser.close();
