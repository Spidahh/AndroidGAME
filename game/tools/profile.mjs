// Profilo CPU (campionamento) di una partita M1 nel tratto più affollato. Uso: node tools/profile.mjs [livello]
import { chromium } from '@playwright/test';
const level = process.argv[2] ?? 9;
const browser = await chromium.launch({ args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist'] });
const ctx = await browser.newContext({ viewport: { width: 393, height: 852 }, deviceScaleFactor: 2.6, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
const cdp = await ctx.newCDPSession(page);
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
await page.goto(`http://localhost:5173/?level=${level}&at=0.45&god=1`);
await page.waitForFunction(() => !!document.getElementById('weapon'), null, { timeout: 120000 });
await page.waitForTimeout(2000);
await cdp.send('Profiler.enable');
await cdp.send('Profiler.setSamplingInterval', { interval: 200 });
await cdp.send('Profiler.start');
await page.waitForTimeout(6000);
const { profile } = await cdp.send('Profiler.stop');
const self = new Map();
const byId = new Map(profile.nodes.map((n) => [n.id, n]));
const dt = {};
for (let i = 0; i < profile.samples.length; i++) { const id = profile.samples[i]; dt[id] = (dt[id] ?? 0) + (profile.timeDeltas[i] ?? 0); }
for (const n of profile.nodes) { const k = `${n.callFrame.functionName || '(anon)'} ${n.callFrame.url.split('/').pop()}:${n.callFrame.lineNumber}`; self.set(k, (self.get(k) ?? 0) + (dt[n.id] ?? 0)); }
const tot = [...self.values()].reduce((a, b) => a + b, 0);
console.log([...self.entries()].sort((a, b) => b[1] - a[1]).slice(0, 30).map(([k, v]) => `${(100 * v / tot).toFixed(1)}%  ${k}`).join('\n'));
await browser.close();
