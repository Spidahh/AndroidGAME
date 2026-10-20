// Giocatori simulati per misurare la difficoltà (docs/M1-CORSA.md §6 e §10.6).
// "bravo" prevede cosa riesce ad abbattere in ogni corsia; "medio" reagisce in ritardo e sbaglia a volte; "caso" gioca a caso.
import { RunSim } from './sim';
import { LANE_COUNT, OBJECTS, WEAPONS, ZOMBIES } from './defs';
import { rng } from './sim';
import type { LevelDef } from './level';

export type BotKind = 'bravo' | 'medio' | 'caso';

const HORIZON = 28;

/** valore previsto di ogni corsia nei prossimi metri: guadagni meno perdite */
export function laneValues(sim: RunSim): number[] {
  const pz = sim.playerZ;
  const fire = Math.max(1, sim.firepower);
  const ap = WEAPONS[sim.weapon].armorPiercing;
  const v = Math.max(1, sim.speed);
  const out: number[] = [];
  for (let l = 0; l < LANE_COUNT; l++) {
    // nemici in ordine di arrivo
    const threats = sim.zombies
      .filter((z) => z.alive && z.lane === l && z.kind !== 'boss' && z.kind !== 'spitter' && z.z > pz - 0.5 && z.z < pz + HORIZON && z.dropAt <= sim.time)
      .sort((a, b) => a.z - b.z);
    let busy = 0; // secondi di fuoco già impegnati
    let loss = 0;
    for (const z of threats) {
      const hp = z.hp * (z.kind === 'shield' && !ap ? 5 : 1);
      const tContact = (z.z - pz) / (v + ZOMBIES[z.kind].speed);
      busy += hp / fire;
      if (busy > tContact) loss += ZOMBIES[z.kind].bite;
    }
    let gain = 0;
    for (const o of sim.objects) {
      if (!o.alive || o.lane !== l || o.z < pz - 0.5 || o.z > pz + HORIZON) continue;
      const t = (o.z - pz) / v;
      const def = OBJECTS[o.kind];
      if (!def.shootable) {
        if (o.kind === 'car' || (o.kind === 'trap' && sim.trapOn(o, sim.time + t))) loss += def.contactLoss;
        continue;
      }
      const need = o.hp / fire;
      if (busy + need <= t) {
        busy += need;
        if (o.kind === 'troops' || o.kind === 'gate') gain += o.troops;
        else if (o.kind === 'weapon') gain += Math.max(2, sim.squad * 0.35);
        else if (o.kind === 'safe') gain += 4;
        else if (o.kind === 'freeze') gain += 2;
        else if (o.kind === 'explosive') gain += 1;
      } else if (o.kind !== 'safe' && o.kind !== 'wall') loss += def.contactLoss;
    }
    for (const h of sim.hazards) {
      if (h.lane !== l) continue;
      if (h.kind === 'slam' && !h.done) loss += 6;
      if (h.kind === 'acid' && !h.done && Math.abs(h.z - pz) < 8) loss += 2;
      if (h.kind === 'shadow' && h.activeAt !== Infinity && h.z - pz < 10 && h.z > pz) loss += 1;
    }
    out.push(gain - loss * 1.15 - Math.abs(l - sim.playerLane) * 0.3);
  }
  return out;
}

export class Bot {
  private think = 0;
  private pendingLane = -1;
  private pendingAt = 0;
  private rand: () => number;
  /** istanti in cui la scelta di corsia contava davvero (differenza netta fra le opzioni) */
  decisions: number[] = [];
  constructor(public kind: BotKind, seed: number) {
    this.rand = rng(seed * 31 + 7);
  }

  act(sim: RunSim, dt: number) {
    this.think -= dt;
    if (this.kind === 'caso') {
      if (this.think <= 0) {
        this.think = 0.8 + this.rand() * 1.4;
        sim.goLane(Math.floor(this.rand() * LANE_COUNT));
      }
      if (sim.strikeReady && this.rand() < dt * 0.3) sim.airstrike();
      return;
    }
    if (this.pendingLane >= 0 && sim.time >= this.pendingAt) {
      sim.goLane(this.pendingLane);
      this.pendingLane = -1;
    }
    if (this.think > 0) return;
    this.think = this.kind === 'bravo' ? 0.1 : 0.4;
    const vals = laneValues(sim);
    // il medio valuta con errore (come una persona che legge in fretta la strada)
    if (this.kind === 'medio') for (let i = 0; i < vals.length; i++) vals[i] += (this.rand() + this.rand() + this.rand() - 1.5) * 4;
    const order = [0, 1, 2].sort((a, b) => vals[b] - vals[a]);
    const spread = vals[order[0]] - vals[order[2]];
    if (spread >= 2 && (this.decisions.length === 0 || sim.time - this.decisions[this.decisions.length - 1] > 1.5)) this.decisions.push(sim.time);
    let pick = order[0];
    // non cambia corsia per vantaggi minimi: evita di oscillare
    if (pick !== sim.playerLane && vals[pick] - vals[sim.playerLane] < 1) pick = sim.playerLane;
    if (this.kind === 'medio') {
      this.pendingLane = pick;
      this.pendingAt = sim.time + 0.35; // reagisce in ritardo
    } else if (pick !== sim.playerLane) {
      // attraversare due corsie passa per quella di mezzo: se lì c'è un ostacolo vicino, aspetta
      const mid = (pick + sim.playerLane) / 2;
      const blocked = Math.abs(pick - sim.playerLane) === 2 && sim.objects.some((o) => o.alive && o.lane === mid && (o.kind === 'car' || o.kind === 'trap') && o.z > sim.playerZ - 1 && o.z < sim.playerZ + 2.5);
      if (!blocked) sim.goLane(pick);
    }
    if (sim.strikeReady && vals[pick] < -3) sim.airstrike();
  }
}

export interface RunReport {
  won: boolean;
  reason: string;
  time: number;
  stars: number;
  squadEnd: number;
  squadPeak: number;
  avgVisible: number;
  peakVisible: number;
  decisionGap: number;
  lost: RunSim['stats']['lost'];
}

/** Gioca un livello intero con un giocatore simulato e misura. */
export function playLevel(level: LevelDef, kind: BotKind, seed: number, maxSeconds = 300): RunReport {
  const sim = new RunSim(level, { seed });
  const bot = new Bot(kind, seed);
  const dt = 1 / 60;
  let visSum = 0;
  let visN = 0;
  let peak = 0;
  for (let i = 0; i < maxSeconds * 60 && !sim.over; i++) {
    bot.act(sim, dt);
    sim.step(dt);
    sim.drainEvents();
    if (i % 6 === 0) {
      let n = 0;
      for (const z of sim.zombies) if (z.alive && z.z > sim.playerZ - 2 && z.z < sim.playerZ + 45) n++;
      visSum += n;
      visN++;
      peak = Math.max(peak, n);
    }
  }
  const gaps = bot.decisions.slice(1).map((t, i) => t - bot.decisions[i]);
  return {
    won: sim.status === 'won',
    reason: sim.endReason,
    time: Math.round(sim.time),
    stars: sim.stars,
    squadEnd: sim.squad,
    squadPeak: sim.peakSquad,
    avgVisible: Math.round(visSum / Math.max(1, visN)),
    peakVisible: peak,
    decisionGap: gaps.length ? +(gaps.reduce((a, b) => a + b, 0) / gaps.length).toFixed(1) : 0,
    lost: sim.stats.lost,
  };
}
