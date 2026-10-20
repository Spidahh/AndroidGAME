// Formato dei livelli di M1 e funzioni per comporli a scene.
import { LANE_COUNT, ObjectKind, PowerId, WeaponId, ZombieKind, LootSize } from './defs';

export type LevelType = 'fuga' | 'recupero' | 'scorta' | 'inseguimento';

export type LevelEvent =
  | { z: number; do: 'zombie'; kind: ZombieKind; lane: number }
  | { z: number; do: 'object'; kind: ObjectKind; lane: number; weapon?: WeaponId; power?: PowerId; size?: LootSize; moving?: boolean; hp?: number }
  | { z: number; do: 'fence'; lane: number; period: number; phase: number }
  | { z: number; do: 'drop'; lane: number; kind: ZombieKind }
  | { z: number; do: 'hint'; text: string };

export interface LevelDef {
  id: number;
  name: string;
  type: LevelType;
  zone: string;
  length: number;
  speed: [number, number];
  intro: string;
  events: LevelEvent[];
  finale: { kind: 'gate'; hp: number; hordeSeconds: number } | { kind: 'boss'; hp: number } | { kind: 'none' };
  escort?: { hp: number };
  thief?: { hp: number; lead: number };
  medicine?: { z: number; hp: number; seconds: number };
}

/** Raccoglitore di eventi per costruire un livello scena dopo scena. */
export class Script {
  events: LevelEvent[] = [];
  z = 0;
  constructor(public d: number) {}

  /** avanza il cursore */
  gap(m: number) {
    this.z += m;
    return this;
  }
  zombie(dz: number, lane: number, kind: ZombieKind = 'walker') {
    this.events.push({ z: this.z + dz, do: 'zombie', kind, lane });
    return this;
  }
  /** blocco di zombie: righe × corsie indicate, distanziate */
  horde(dz: number, lanes: number[], rows: number, kind: ZombieKind = 'walker', spacing = 1.7) {
    for (let r = 0; r < rows; r++) for (const l of lanes) this.zombie(dz + r * spacing, l, kind);
    return this;
  }
  object(dz: number, lane: number, kind: ObjectKind, extra: Partial<Extract<LevelEvent, { do: 'object' }>> = {}) {
    this.events.push({ z: this.z + dz, do: 'object', kind, lane, ...extra });
    return this;
  }
  chest(dz: number, lane: number, weapon: WeaponId) {
    return this.object(dz, lane, 'chest', { weapon });
  }
  power(dz: number, lane: number, power: PowerId) {
    return this.object(dz, lane, 'power', { power });
  }
  loot(dz: number, lane: number, size: LootSize) {
    return this.object(dz, lane, 'loot', { size });
  }
  fence(dz: number, lane: number, period = 3, phase = 0) {
    this.events.push({ z: this.z + dz, do: 'fence', lane, period, phase });
    return this;
  }
  drop(dz: number, lane: number, kind: ZombieKind = 'walker') {
    this.events.push({ z: this.z + dz, do: 'drop', lane, kind });
    return this;
  }
  hint(dz: number, text: string) {
    this.events.push({ z: this.z + dz, do: 'hint', text });
    return this;
  }
}

/** Controlli di coerenza: usati dai test e all'avvio in sviluppo. */
export function validateLevel(l: LevelDef): string[] {
  const errs: string[] = [];
  const objs = l.events.filter((e) => e.do === 'object') as Extract<LevelEvent, { do: 'object' }>[];
  for (const e of l.events) {
    if ('lane' in e && (e.lane < 0 || e.lane >= LANE_COUNT)) errs.push(`L${l.id}: corsia ${e.lane} fuori limite a z=${e.z}`);
    if (e.z < 8 || e.z > l.length) errs.push(`L${l.id}: evento fuori dal percorso a z=${e.z}`);
  }
  for (let i = 0; i < objs.length; i++)
    for (let j = i + 1; j < objs.length; j++)
      if (objs[i].lane === objs[j].lane && Math.abs(objs[i].z - objs[j].z) < 2.5) errs.push(`L${l.id}: oggetti sovrapposti a z=${objs[i].z}`);
  // ogni riga dev'essere attraversabile: almeno una corsia senza ostacoli fissi (auto, recinzioni)
  const blockers = l.events.filter((e) => (e.do === 'object' && e.kind === 'car') || e.do === 'fence');
  for (const b of blockers) {
    const same = blockers.filter((o) => Math.abs(o.z - b.z) < 3);
    const lanes = new Set(same.map((o) => ('lane' in o ? o.lane : -1)));
    const fencesOnly = same.every((o) => o.do === 'fence');
    if (lanes.size >= LANE_COUNT && !fencesOnly) errs.push(`L${l.id}: nessuna corsia libera a z=${b.z}`);
  }
  if (!objs.some((o) => o.kind === 'safe')) errs.push(`L${l.id}: manca la cassaforte`);
  if (l.type === 'scorta' && !l.escort) errs.push(`L${l.id}: scorta senza blindato`);
  if (l.type === 'inseguimento' && !l.thief) errs.push(`L${l.id}: inseguimento senza ladro`);
  if (l.type === 'recupero' && !l.medicine) errs.push(`L${l.id}: recupero senza obiettivo`);
  return errs;
}
