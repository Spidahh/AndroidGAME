// Screenshot del gioco in Chromium con viewport da telefono. Uso: node tools/shot.mjs <url> <out.png> [attesa_s]
import { chromium } from '@playwright/test';
const [url, out, wait = '6'] = process.argv.slice(2);
const browser = await chromium.launch({ args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist'] });
const ctx = await browser.newContext({ viewport: { width: 393, height: 852 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
const logs = [];
page.on('console', (m) => logs.push(`${m.type()}: ${m.text()}`));
page.on('pageerror', (e) => logs.push(`pageerror: ${e}`));
await page.goto(url);
await page.waitForTimeout(Number(wait) * 1000);
await page.screenshot({ path: out });
console.log(logs.filter((l) => !l.includes('[vite]')).slice(-10).join('\n'));
await browser.close();
