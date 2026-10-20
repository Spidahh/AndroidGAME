// Taratura automatica (docs/M1-CORSA.md §10.6): per ogni livello cerca il fattore di pressione
// che porta il giocatore "medio" alla percentuale di vittorie della sua fase. Scrive src/m1/tuning.json.
import { writeFileSync } from 'node:fs';
import { PLANS } from '../src/m1/levels';
import { generate } from '../src/m1/gen';
import { playLevel } from '../src/m1/bots';
import type { Phase } from '../src/m1/level';

const TARGET: Record<Phase, number> = { build: 0.9, maintain: 0.8, precision: 0.7, pressure: 0.6, wall: 0.5 };
const SEEDS = Array.from({ length: 12 }, (_, i) => i + 1);
const out: Record<string, number> = {};
for (const plan of PLANS) {
  let lo = 0.6;
  let hi = 2.2;
  let best = 1;
  for (let it = 0; it < 9; it++) {
    const mid = (lo + hi) / 2;
    const level = generate(plan, mid);
    const rate = SEEDS.filter((s) => playLevel(level, 'medio', s).won).length / SEEDS.length;
    best = mid;
    if (rate > TARGET[plan.phase]) lo = mid; // troppo facile: più pressione
    else hi = mid;
  }
  out[String(plan.id)] = +best.toFixed(3);
  console.log(`L${plan.id} ${plan.phase}: fattore ${best.toFixed(3)}`);
}
writeFileSync(new URL('../src/m1/tuning.json', import.meta.url), JSON.stringify(out, null, 2) + '\n');
