// Generatore dei livelli di M1 con difficoltà calcolata (docs/M1-CORSA.md §10).
// Ogni scena è dimensionata sulla potenza di fuoco attesa del giocatore medio:
//   R = vita totale del gruppo / (potenza × tempo di contatto)
// R < 1 lo abbatti tutto; R > 1 una parte ti raggiunge e ti costa soldati.
import { ENGAGE_RANGE, WEAPON_LADDER, WEAPONS, WeaponId, ZOMBIES, ZombieKind, LANE_COUNT, hpScale, SQUAD } from './defs';
import { LevelDef, LevelEvent, Phase } from './level';

export type Problem = 'mass' | 'speed' | 'dogs' | 'armor' | 'giant' | 'zone' | 'shield' | 'surprise';

export type SceneSpec =
  | { type: 'opening' }
  | { type: 'offer'; problems: Problem[] }
  | { type: 'wave'; problems: Problem[]; freeze?: boolean }
  | { type: 'gauntlet'; traps: boolean }
  | { type: 'gate'; problems: Problem[] }
  | { type: 'safe'; problems: Problem[] }
  | { type: 'pack' }
  | { type: 'special'; weapon: WeaponId };

export interface LevelPlan {
  id: number;
  name: string;
  zone: string;
  phase: Phase;
  speed: number;
  intro: string;
  scenes: SceneSpec[];
  finale: 'wall' | 'boss';
  hints?: Record<number, string>;
}

/** R obiettivo dell'orda principale per fase (§10.3) */
export const PHASE_R: Record<Phase, number> = { build: 0.7, maintain: 0.9, precision: 1.0, pressure: 1.12, wall: 1.28 };

/** parametri del giocatore medio (§10.2) */
const MEDIUM = { openRate: 0.7, weaponTake: 0.6 };

/** resistenza effettiva di un tipo per il livello */
const hpOf = (k: ZombieKind, level: number) => ZOMBIES[k].hp * hpScale(level);

/** resa contro un'orda fitta rispetto al DPS nominale (armi che attraversano), misurata con tools/dps.ts */
const CROWD_FACTOR: Record<string, number> = { pistol: 1.1, smg: 1.1, rifle: 1.3, heavy: 1.5 };

/** danno al secondo per soldato con livello d'arma frazionario (atteso), contro un'orda */
function dpsAt(tier: number) {
  const lo = Math.floor(Math.max(0, Math.min(WEAPON_LADDER.length - 1, tier)));
  const hi = Math.min(WEAPON_LADDER.length - 1, lo + 1);
  const f = tier - lo;
  const d = (w: string) => WEAPONS[w as keyof typeof WEAPONS].dps * CROWD_FACTOR[w];
  return d(WEAPON_LADDER[lo]) * (1 - f) + d(WEAPON_LADDER[hi]) * f;
}

/** composizione dei gruppi per problema: quota della vita totale per tipo */
const MIX: Record<Problem, [ZombieKind, number][]> = {
  mass: [['walker', 1]],
  speed: [['walker', 0.55], ['runner', 0.45]],
  dogs: [['walker', 0.6], ['dog', 0.4]],
  armor: [['walker', 0.45], ['armored', 0.55]],
  giant: [['walker', 0.5], ['giant', 0.5]],
  zone: [['walker', 0.7], ['bloater', 0.3]],
  shield: [['walker', 0.5], ['shield', 0.5]],
  surprise: [['walker', 1]],
};

class Builder {
  events: LevelEvent[] = [];
  z = 42; // la prima scena nasce oltre la portata: i nemici entrano nel tiro come prevede la formula
  squad: number;
  tier = 0;
  expected: LevelDef['expected'] = [];
  private seed: number;
  constructor(public plan: LevelPlan, public scale: number) {
    this.squad = SQUAD.start;
    this.seed = plan.id * 7919 + 13;
  }
  r() {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
  get firepower() {
    return this.squad * dpsAt(this.tier);
  }
  /** Tempo utile per abbattere un gruppo profondo 'depth' metri. Un'orda è un flusso: conta quanta vita arriva al
   *  metro rispetto alla potenza della squadra, non tutto il tempo di avvicinamento (verificato con tools/trace.ts).
   *  Il primo tratto di portata dà un piccolo vantaggio iniziale. */
  contactTime(depth: number, zSpeed: number) {
    return (depth + ENGAGE_RANGE * 0.25) / (this.plan.speed + zSpeed);
  }
  R(base: number) {
    return base * this.scale;
  }
  mark() {
    this.expected.push({ z: this.z, squad: Math.round(this.squad), weapon: WEAPON_LADDER[Math.round(Math.min(3, this.tier))] });
  }

  /** gruppo di zombie in una corsia, dimensionato con il rapporto R; restituisce i soldati che costerebbe se non abbattuto */
  group(dz: number, lane: number, problems: Problem[], R: number, depth = 12, maxCount = 45, seekShare = 1) {
    const mix = new Map<ZombieKind, number>();
    for (const p of problems.length ? problems : ['mass' as Problem]) for (const [k, w] of MIX[p]) mix.set(k, (mix.get(k) ?? 0) + w / Math.max(1, problems.length));
    let avgSpeed = 0;
    for (const [k, w] of mix) avgSpeed += ZOMBIES[k].speed * w;
    const budget = R * this.firepower * this.contactTime(depth, avgSpeed);
    let bite = 0;
    let placed = 0;
    // un nemico pesante compare solo se la squadra attesa può abbatterlo in tempo; altrimenti diventa orda equivalente
    for (const [k, w] of [...mix]) {
      if (k === 'walker' || k === 'runner' || k === 'dog' || k === 'bloater') continue;
      if (hpOf(k, this.plan.id) > budget * w * 0.95) {
        mix.delete(k);
        mix.set('walker', (mix.get('walker') ?? 0) + w);
      }
    }
    for (const [k, w] of mix) {
      let n = Math.round((budget * w * (ZOMBIES[k].seeks ? seekShare : 1)) / hpOf(k, this.plan.id));
      if (k === 'giant') n = Math.max(1, Math.min(n, 2));
      n = Math.min(n, Math.round(maxCount * w) + (k === 'walker' ? 0 : 1));
      for (let i = 0; i < n; i++) {
        const zz = this.z + dz + (i / Math.max(1, n)) * depth + this.r() * 1.2;
        this.events.push({ z: zz, do: 'zombie', kind: k, lane, dx: (this.r() - 0.5) * 1.7 });
        bite += ZOMBIES[k].bite;
        placed++;
      }
    }
    return { bite, placed, lost: R > 1 ? bite * (1 - 1 / R) : 0 };
  }
  object(dz: number, lane: number, e: Omit<Extract<LevelEvent, { do: 'object' }>, 'z' | 'do' | 'lane'>) {
    this.events.push({ z: this.z + dz, do: 'object', lane, ...e });
  }
  /** resistenza di un oggetto: secondi di fuoco concentrato della squadra attesa */
  hpFor(seconds: number) {
    return Math.max(30, Math.round(this.firepower * seconds));
  }
}

const otherLanes = (l: number) => [0, 1, 2].filter((x) => x !== l);

function scene(b: Builder, s: SceneSpec, index: number) {
  const base = PHASE_R[b.plan.phase];
  const rot = (index + b.plan.id) % LANE_COUNT;
  b.mark();
  switch (s.type) {
    case 'opening': {
      // costruire: tre barili soldati facili, orda leggera
      for (let l = 0; l < 3; l++) b.object(4 + l * 9, l, { kind: 'troops', troops: 3, hp: b.hpFor(0.9) });
      for (let l = 0; l < 3; l++) b.group(24, l, ['mass'], b.R(0.45), 10);
      b.squad += 3 * 3 * MEDIUM.openRate * 0.6;
      b.z += 40;
      break;
    }
    case 'offer': {
      // tre corsie, tre rischi: tanti soldati dietro un'orda dura, arma dietro corazze, pochi soldati al sicuro
      const risky = rot;
      const mid = (rot + 1) % 3;
      const safe = (rot + 2) % 3;
      const big = Math.max(4, Math.round(b.squad * 0.8));
      const small = Math.max(2, Math.round(b.squad * 0.3));
      const g1 = b.group(4, risky, s.problems, b.R(base + 0.25), 12);
      b.object(19, risky, { kind: 'troops', troops: big, hp: b.hpFor(1.4) });
      const midProblems: Problem[] = s.problems.includes('armor') ? s.problems : [...s.problems, 'armor' as Problem].slice(-2);
      const g2 = b.group(4, mid, midProblems, b.R(base), 12);
      b.object(19, mid, { kind: 'weapon', hp: b.hpFor(1.3) });
      b.group(6, safe, ['mass'], b.R(base - 0.35), 10);
      b.object(19, safe, { kind: 'troops', troops: small, hp: b.hpFor(0.9) });
      // giocatore medio: valore atteso simile fra le opzioni, qui la media
      b.squad += ((big - g1.lost) + small) / 2 * MEDIUM.openRate;
      b.tier = Math.min(3, b.tier + MEDIUM.weaponTake * 0.5);
      void g2;
      b.z += 32;
      break;
    }
    case 'wave': {
      if (s.freeze) b.object(2, rot, { kind: 'freeze', hp: b.hpFor(0.6) });
      let lost = 0;
      for (let l = 0; l < 3; l++) lost = Math.max(lost, b.group(8, l, s.problems, b.R(base), 18, 45, 1 / 3).lost);
      b.object(12, (rot + 1) % 3, { kind: 'explosive', hp: 10 });
      b.object(20, (rot + 2) % 3, { kind: 'explosive', hp: 10 });
      if (s.problems.includes('surprise')) for (let i = 0; i < 4; i++) b.events.push({ z: b.z + 14 + i * 5, do: 'drop', lane: (rot + i) % 3, kind: i === 3 ? 'armored' : 'walker' });
      b.squad = Math.max(3, b.squad - lost * 0.6);
      b.z += 34;
      break;
    }
    case 'gauntlet': {
      // ostacoli che chiudono due corsie alla volta: si passa dove c'è l'orda (precisione)
      const pattern = [[0, 1], [1, 2], [0, 2]];
      for (let i = 0; i < 3; i++) {
        const blocked = pattern[(i + rot) % 3];
        const open = [0, 1, 2].find((l) => !blocked.includes(l))!;
        for (const l of blocked) b.object(10 + i * 16, l, s.traps && i === 1 ? { kind: 'trap', period: 2.4, phase: l * 0.6 } : { kind: 'car' });
        b.group(4 + i * 16, open, ['mass', 'speed'], b.R(base), 8);
      }
      b.object(54, rot, { kind: 'troops', troops: Math.max(2, Math.round(b.squad * 0.25)), hp: b.hpFor(1) });
      b.squad += b.squad * 0.25 * MEDIUM.openRate;
      b.z += 60;
      break;
    }
    case 'gate': {
      // portone a numero: abbatterlo dà molti soldati, ma intanto l'orda arriva nelle altre corsie
      const troops = Math.max(4, Math.round(b.squad * 0.5));
      b.object(18, rot, { kind: 'gate', troops, hp: b.hpFor(2.6) });
      b.group(6, rot, ['mass'], b.R(base - 0.3), 8);
      for (const l of otherLanes(rot)) b.group(6, l, s.problems, b.R(base + 0.15), 16, 45, 1 / 2);
      b.squad += troops * MEDIUM.openRate * 0.8;
      b.z += 30;
      break;
    }
    case 'safe': {
      b.group(4, rot, s.problems, b.R(base + 0.1), 14);
      b.object(22, rot, { kind: 'safe', hp: b.hpFor(2.2) });
      b.object(18, (rot + 1) % 3, { kind: 'explosive', hp: 10 });
      for (const l of otherLanes(rot)) b.group(6, l, ['mass'], b.R(base - 0.2), 12);
      b.z += 30;
      break;
    }
    case 'pack': {
      // branco di cani: veloci, puntano la tua corsia, vanno abbattuti per primi
      for (let l = 0; l < 3; l++) b.group(10, l, ['dogs'], b.R(base), 6, 45, 1 / 3);
      b.z += 26;
      break;
    }
    case 'special': {
      // arma speciale (lanciafiamme / lanciagranate) dietro gli Scudati: chi la prende sfonda le corazze
      b.group(4, rot, ['shield'], b.R(base + 0.1), 10);
      b.object(18, rot, { kind: 'weapon', weapon: s.weapon, hp: b.hpFor(1.5) });
      for (const l of otherLanes(rot)) b.group(6, l, ['mass', 'shield'], b.R(base), 12);
      b.z += 28;
      break;
    }
  }
  // tratto di respiro con orda leggera e un barile soldati: l'azione non si ferma mai (Frontline: barili frequenti)
  for (let l = 0; l < 3; l++) b.group(2, l, ['mass'], b.R(0.45), 10, 18, 1 / 3);
  const bonus = Math.max(2, Math.round(b.squad * 0.15));
  b.object(13, (index + 2) % 3, { kind: 'troops', troops: bonus, hp: b.hpFor(0.7) });
  b.squad += bonus * MEDIUM.openRate;
  b.z += 18;
  b.squad = Math.min(SQUAD.max, b.squad);
}

/** Espande un piano in un livello completo. 'scale' è il fattore di taratura (tuning.json). */
export function generate(plan: LevelPlan, scale = 1): LevelDef {
  const b = new Builder(plan, scale);
  if (plan.hints) for (const [z, text] of Object.entries(plan.hints)) b.events.push({ z: Number(z), do: 'hint', text });
  plan.scenes.forEach((s, i) => scene(b, s, i));
  b.mark();
  const endFire = b.firepower;
  const length = b.z + 20;
  const finale: LevelDef['finale'] =
    plan.finale === 'wall'
      ? { kind: 'wall', hp: Math.round(PHASE_R.wall * scale * endFire * 9), waveEvery: 1.8, waveSize: Math.round(Math.min(24, 4 + b.squad * 0.35)) }
      : { kind: 'boss', hp: Math.round(PHASE_R.wall * scale * endFire * 16) };
  return { id: plan.id, name: plan.name, zone: plan.zone, phase: plan.phase, length, speed: plan.speed, intro: plan.intro, events: b.events.sort((a, c) => a.z - c.z), finale, expected: b.expected };
}
