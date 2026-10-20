// Misura tutti i livelli di M1 con i tre giocatori simulati. Uso: npx tsx tools/measure.ts [livello]
import { LEVELS } from '../src/m1/levels';
import { playLevel, BotKind } from '../src/m1/bots';

const only = process.argv[2] ? Number(process.argv[2]) : 0;
const SEEDS = [1, 2, 3, 4, 5, 6, 7, 8];
for (const level of LEVELS) {
  if (only && level.id !== only) continue;
  const row: string[] = [`L${level.id} ${level.name} (${level.phase}) lungh ${Math.round(level.length)}m`];
  for (const kind of ['bravo', 'medio', 'caso'] as BotKind[]) {
    const rs = SEEDS.map((s) => playLevel(level, kind, s));
    const wins = rs.filter((r) => r.won).length;
    const avg = (f: (r: (typeof rs)[number]) => number) => Math.round(rs.reduce((a, r) => a + f(r), 0) / rs.length);
    const causes: Record<string, number> = {};
    for (const r of rs) for (const [k, v] of Object.entries(r.lost)) causes[k] = (causes[k] ?? 0) + (v ?? 0);
    const totalLost = Object.values(causes).reduce((a, b) => a + b, 0) || 1;
    const top = Object.entries(causes).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([k, v]) => `${k} ${Math.round((v / totalLost) * 100)}%`).join(', ');
    row.push(`  ${kind.padEnd(5)} vittorie ${wins}/${SEEDS.length}  durata ${avg((r) => r.time)}s  squadra fine ${avg((r) => r.squadEnd)} picco ${avg((r) => r.squadPeak)}  zombie visibili ${avg((r) => r.avgVisible)} (picco ${Math.max(...rs.map((r) => r.peakVisible))})  scelte ogni ${(rs.reduce((a, r) => a + r.decisionGap, 0) / rs.length).toFixed(1)}s  stelle ${avg((r) => r.stars)}  perdite: ${top}`);
  }
  console.log(row.join('\n'));
}
