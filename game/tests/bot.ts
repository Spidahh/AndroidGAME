// Giocatore automatico semplice: sceglie la corsia guardando pericoli e oggetti vicini.
// Serve a verificare che i livelli siano completabili partendo dalla pistola, senza acquisti.
import { RunSim } from '../src/m1/sim';
import { LANE_COUNT, ZOMBIES, OBJECT_CONTACT } from '../src/m1/defs';
import type { LevelDef } from '../src/m1/level';

const VALUE: Record<string, number> = { chest: 30, cage: 45, safe: 55, loot: 12, power: 22, medicine: 120, gate: 0, barrel: 6 };

export function botPlay(level: LevelDef, seed: number, maxSeconds = 400) {
  const sim = new RunSim(level, { seed });
  const STEP = 1 / 60;
  let think = 0;
  for (let i = 0; i < maxSeconds * 60 && !sim.over; i++) {
    think -= STEP;
    if (think <= 0) {
      think = 0.12;
      decide(sim);
    }
    sim.step(STEP);
    sim.drainEvents();
  }
  return sim;
}

function decide(sim: RunSim) {
  const pz = sim.playerZ;
  const scores: number[] = [];
  for (let l = 0; l < LANE_COUNT; l++) {
    let s = -Math.abs(l - sim.playerLane) * 2;
    for (const z of sim.zombies) {
      if (!z.alive || z.lane !== l || z.kind === 'boss' || z.kind === 'spitter') continue;
      const d = z.z - pz;
      if (d > 0 && d < 7) s -= ZOMBIES[z.kind].contact * (z.hp > 60 ? 2 : 1) * (7 - d) * 0.4;
      if (z.kind === 'thief' && d > 0) s += 25;
    }
    for (const o of sim.objects) {
      if (!o.alive || o.lane !== l) continue;
      const d = o.z - pz;
      if (d < 0) continue;
      const contact = o.kind === 'fence' ? OBJECT_CONTACT.fence : OBJECT_CONTACT[o.kind];
      if (contact > 0 && d < 5) s -= 70;
      if (d > 3 && d < 28) s += (VALUE[o.kind] ?? 0) * (o.kind === 'chest' && sim.weapon !== 'pistol' ? 0.4 : 1);
    }
    for (const h of sim.hazards) {
      if (h.lane !== l) continue;
      if (h.kind === 'slam' && sim.time < h.activeAt + 0.2) s -= 200;
      if (h.kind === 'acid' && Math.abs(h.z - pz) < 6) s -= 60;
      if (h.kind === 'shadow' && h.activeAt !== Infinity && Math.abs(h.z - pz) < 6) s -= 50;
    }
    if (sim.escort && l === sim.escort.lane) s += 25; // proteggere il blindato
    if (sim.medicine?.alive && sim.medicine.lane === l) s += 90;
    scores.push(s);
  }
  const best = scores.indexOf(Math.max(...scores));
  if (best !== sim.playerLane) sim.moveLane(best > sim.playerLane ? 1 : -1);
  if (scores[sim.playerLane] < -60) sim.dash();
}
