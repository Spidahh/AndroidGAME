// Riscarica i modelli originali elencati in assets-src/polypizza/manifest.csv (licenze nella colonna licence).
import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const DIR = 'assets-src/polypizza';
const rows = readFileSync(join(DIR, 'manifest.csv'), 'utf8').trim().split('\n').slice(1);
for (const row of rows) {
  const [bundle, m, title, , url] = row.split(',');
  const file = join(DIR, bundle, `${title.replaceAll(' ', '_').replaceAll('/', '_')}__${m.split('/').pop()}.glb`);
  if (existsSync(file)) continue;
  mkdirSync(join(DIR, bundle), { recursive: true });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url}: ${res.status}`);
  writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  console.log('scaricato', file);
}
