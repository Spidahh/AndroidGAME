// Confronta la curva attesa del generatore con la squadra reale di un giocatore simulato. Uso: npx tsx tools/trace.ts <livello> <bot> [seme]
import { LEVELS } from '../src/m1/levels';
import { RunSim } from '../src/m1/sim';
import { Bot, BotKind } from '../src/m1/bots';
const level = LEVELS[Number(process.argv[2] ?? 1) - 1];
const kind = (process.argv[3] ?? 'bravo') as BotKind;
const seed = Number(process.argv[4] ?? 1);
const sim = new RunSim(level, { seed });
const bot = new Bot(kind, seed);
let k = 0;
const exp = level.expected;
for (let i = 0; i < 300 * 60 && !sim.over; i++) {
  bot.act(sim, 1 / 60);
  sim.step(1 / 60);
  for (const e of sim.drainEvents()) if (e.type === 'soldiersLost' && e.count >= 2) console.log(`   t=${sim.time.toFixed(1)} z=${sim.playerZ.toFixed(0)} perde ${e.count} (${e.cause})`);
  while (k < exp.length && sim.playerZ >= exp[k].z) {
    console.log(`z=${exp[k].z.toFixed(0)} atteso ${exp[k].squad} ${exp[k].weapon} | reale ${sim.squad} ${sim.weapon} potenza ${Math.round(sim.firepower)} zombie vivi davanti ${sim.zombies.filter((z) => z.alive && z.z > sim.playerZ).length}`);
    k++;
  }
}
console.log('fine', sim.status, sim.endReason, 'squadra', sim.squad, 'tempo', sim.time.toFixed(0), 'perdite', JSON.stringify(sim.stats.lost));
