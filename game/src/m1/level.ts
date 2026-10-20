// Livelli di M1 v2: un livello è un elenco di eventi già calcolati dal generatore (gen.ts).
import { ObjectKind, WeaponId, ZombieKind, LANE_COUNT } from './defs';

export type LevelEvent =
  | { z: number; do: 'zombie'; kind: ZombieKind; lane: number; dx?: number }
  | { z: number; do: 'drop'; kind: ZombieKind; lane: number }
  | { z: number; do: 'object'; kind: ObjectKind; lane: number; hp?: number; troops?: number; weapon?: WeaponId; period?: number; phase?: number }
  | { z: number; do: 'hint'; text: string };

export type Phase = 'build' | 'maintain' | 'precision' | 'pressure' | 'wall';

export interface LevelDef {
  id: number;
  name: string;
  zone: string;
  phase: Phase;
  length: number;
  speed: number;
  intro: string;
  events: LevelEvent[];
  finale: { kind: 'wall'; hp: number; waveEvery: number; waveSize: number } | { kind: 'boss'; hp: number };
  /** curva attesa del giocatore medio, calcolata dal generatore (per i test e il bilanciamento) */
  expected: { z: number; squad: number; weapon: WeaponId }[];
}

export function validateLevel(l: LevelDef): string[] {
  const errs: string[] = [];
  const objs = l.events.filter((e) => e.do === 'object') as Extract<LevelEvent, { do: 'object' }>[];
  for (const e of l.events) {
    if ('lane' in e && (e.lane < 0 || e.lane >= LANE_COUNT)) errs.push(`L${l.id}: corsia ${e.lane} fuori limite a z=${e.z.toFixed(1)}`);
    if (e.z < 6 || e.z > l.length + 1) errs.push(`L${l.id}: evento fuori percorso a z=${e.z.toFixed(1)}`);
  }
  for (let i = 0; i < objs.length; i++)
    for (let j = i + 1; j < objs.length; j++)
      if (objs[i].lane === objs[j].lane && Math.abs(objs[i].z - objs[j].z) < 3) errs.push(`L${l.id}: oggetti sovrapposti a z=${objs[i].z.toFixed(1)}`);
  const blockers = objs.filter((o) => o.kind === 'car' || o.kind === 'trap');
  for (const b of blockers) {
    const lanes = new Set(blockers.filter((o) => Math.abs(o.z - b.z) < 3 && (o.kind === 'car' || o.kind === 'trap')).map((o) => o.lane));
    const hard = blockers.filter((o) => Math.abs(o.z - b.z) < 3 && o.kind === 'car').length;
    if (lanes.size >= LANE_COUNT && hard >= LANE_COUNT) errs.push(`L${l.id}: nessuna corsia percorribile a z=${b.z.toFixed(1)}`);
  }
  if (!objs.some((o) => o.kind === 'safe')) errs.push(`L${l.id}: manca la cassaforte`);
  return errs;
}
