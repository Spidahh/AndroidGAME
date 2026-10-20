// Simulazione di M1 "La Corsa" v2 (docs/M1-CORSA.md). TypeScript puro, deterministico, senza Babylon.
// La squadra corre unita nella corsia scelta: i soldati sono vita e potenza di fuoco.
import {
  LANE_COUNT, LANE_W, laneX, WEAPONS, WEAPON_LADDER, WeaponId, ZOMBIES, ZombieKind, OBJECTS, ObjectKind, SQUAD, AIRSTRIKE, EXPLOSION, hpScale,
} from './defs';
import { LevelDef, LevelEvent } from './level';

export { LANE_COUNT, LANE_W, laneX, WEAPONS };
export type { WeaponId, ZombieKind, ObjectKind };

export interface Zombie {
  id: number;
  kind: ZombieKind;
  lane: number;
  x: number;
  z: number;
  hp: number;
  maxHp: number;
  alive: boolean;
  deadAt: number;
  switchAt: number;
  switchTo: number;
  hitAt: number;
  nextAttack: number;
  dropAt: number; // > tempo attuale: sta ancora cadendo dal tetto
  dx: number; // scostamento laterale dentro la corsia
}

export interface WorldObject {
  id: number;
  kind: ObjectKind;
  lane: number;
  x: number;
  z: number;
  hp: number;
  maxHp: number;
  alive: boolean;
  hitAt: number;
  troops: number;
  weapon?: WeaponId;
  period: number;
  phase: number;
  touched: boolean;
}

export interface Bullet {
  id: number;
  lane: number;
  x: number;
  z: number;
  zStart: number;
  weapon: WeaponId;
  damage: number;
  pierceLeft: number;
  hitIds: Set<number>;
  alive: boolean;
}

export interface Hazard {
  id: number;
  kind: 'acid' | 'slam' | 'shadow' | 'strike';
  lane: number;
  z: number;
  len: number;
  activeAt: number;
  until: number;
  done: boolean;
  dropKind?: ZombieKind;
}

export type LossCause = 'zombie' | 'runner' | 'dog' | 'armored' | 'giant' | 'bloater' | 'shield' | 'acid' | 'boss' | 'explosion' | 'object' | 'trap' | 'car' | 'gate';

export type SimEvent =
  | { type: 'shot'; weapon: WeaponId; lane: number; count: number }
  | { type: 'hit'; target: 'zombie' | 'object'; id: number; x: number; z: number; damage: number; armored: boolean }
  | { type: 'zombieDied'; id: number; kind: ZombieKind; x: number; z: number }
  | { type: 'objectOpened'; id: number; kind: ObjectKind; x: number; z: number }
  | { type: 'objectLost'; id: number; kind: ObjectKind; x: number; z: number }
  | { type: 'explosion'; x: number; z: number; size: number }
  | { type: 'soldiersLost'; count: number; cause: LossCause; x: number }
  | { type: 'soldiersGained'; count: number; x: number; z: number }
  | { type: 'weapon'; weapon: WeaponId }
  | { type: 'freeze' }
  | { type: 'loot'; kind: 'safe' }
  | { type: 'warn'; kind: 'acid' | 'slam' | 'shadow' | 'seeker'; lane: number }
  | { type: 'slam'; lane: number; z: number }
  | { type: 'airstrike'; lane: number }
  | { type: 'airstrikeReady' }
  | { type: 'hint'; text: string }
  | { type: 'boss' }
  | { type: 'end'; won: boolean; reason: string };

export interface SimOptions {
  seed: number;
  invulnerable?: boolean;
  /** soldati iniziali extra (potenziamenti della città) */
  bonusSoldiers?: number;
  /** solo sviluppo/test: parte da una frazione del percorso */
  startAt?: number;
}

export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SPAWN_AHEAD = 75;
const ACTIVE = 55; // gli zombie si muovono solo entro questa distanza

export class RunSim {
  time = 0;
  playerZ = 0;
  playerLane = 1;
  playerX = laneX(1);
  speed: number;
  squad: number;
  peakSquad: number;
  weapon: WeaponId = 'pistol';
  zombies: Zombie[] = [];
  objects: WorldObject[] = [];
  bullets: Bullet[] = [];
  hazards: Hazard[] = [];
  events: SimEvent[] = [];
  kills = 0;
  strikeCharge = 0;
  strikeLeft = 0;
  strikeLane = 1;
  freezeUntil = 0;
  status: 'running' | 'won' | 'lost' = 'running';
  endReason = '';
  safeOpened = false;
  stopped = false;
  boss?: Zombie;
  wall?: WorldObject;
  /** statistiche per i test e il bilanciamento */
  stats = { lost: {} as Partial<Record<LossCause, number>>, gained: 0, opened: 0, missed: 0, laneChanges: 0 };

  private nextId = 1;
  private fireCooldown = 0;
  private rand: () => number;
  private pending: LevelEvent[];
  private nextWave = 0;
  private readonly hpMul: number;

  get over() {
    return this.status !== 'running';
  }
  get progress() {
    return Math.min(1, this.playerZ / this.level.length);
  }
  get lane() {
    return Math.round(this.playerX / LANE_W + (LANE_COUNT - 1) / 2);
  }
  get weaponTier() {
    return Math.max(0, WEAPON_LADDER.indexOf(this.weapon));
  }
  /** potenza di fuoco attuale (danno al secondo della squadra) */
  get firepower() {
    return this.squad * WEAPONS[this.weapon].dps;
  }
  /** [arrivati, cassaforte aperta, arrivati con almeno metà dei soldati massimi] */
  get starFlags(): [boolean, boolean, boolean] {
    const won = this.status === 'won';
    return [won, won && this.safeOpened, won && this.squad * 2 >= this.peakSquad];
  }
  get stars() {
    return this.starFlags.filter(Boolean).length;
  }
  get strikeReady() {
    return this.strikeCharge >= AIRSTRIKE.killsToCharge;
  }

  constructor(public level: LevelDef, public opts: SimOptions) {
    this.rand = rng(opts.seed);
    this.speed = level.speed;
    this.hpMul = hpScale(level.id);
    this.squad = this.peakSquad = SQUAD.start + (opts.bonusSoldiers ?? 0);
    this.pending = [...level.events].sort((a, b) => a.z - b.z);
    if (opts.startAt) {
      this.playerZ = level.length * opts.startAt;
      this.pending = this.pending.filter((e) => e.z > this.playerZ + 12);
      const exp = [...level.expected].reverse().find((p) => p.z <= this.playerZ) ?? level.expected[0];
      this.squad = this.peakSquad = Math.max(3, Math.round(exp.squad));
      this.weapon = exp.weapon;
    }
  }

  // ---------- comandi ----------
  moveLane(dir: -1 | 1) {
    if (this.over) return;
    const to = Math.max(0, Math.min(LANE_COUNT - 1, this.playerLane + dir));
    if (to !== this.playerLane) this.stats.laneChanges++;
    this.playerLane = to;
  }
  goLane(lane: number) {
    while (this.playerLane !== lane && !this.over) this.moveLane(lane > this.playerLane ? 1 : -1);
  }
  airstrike() {
    if (this.over || !this.strikeReady) return false;
    this.strikeCharge = 0;
    this.strikeLeft = AIRSTRIKE.duration;
    this.strikeLane = this.lane;
    this.hazards.push({ id: this.nextId++, kind: 'strike', lane: this.lane, z: this.playerZ + 4, len: 30, activeAt: this.time, until: this.time + AIRSTRIKE.duration, done: false });
    this.events.push({ type: 'airstrike', lane: this.lane });
    return true;
  }

  // ---------- passo ----------
  step(dt: number) {
    if (this.over) return;
    this.time += dt;
    const target = this.stopped ? 0 : this.level.speed;
    this.speed += (target - this.speed) * Math.min(1, dt * (this.stopped ? 5 : 2));
    this.playerZ += this.speed * dt;
    const tx = laneX(this.playerLane);
    this.playerX += (tx - this.playerX) * Math.min(1, dt / 0.05);
    if (Math.abs(tx - this.playerX) < 0.01) this.playerX = tx;

    this.spawn();
    this.finale(dt);
    this.fire(dt);
    this.updateBullets(dt);
    this.updateStrike(dt);
    this.updateZombies(dt);
    this.updateHazards();
    this.collide();
    this.checkEnd();
    this.cleanup();
  }

  private spawn() {
    while (this.pending.length && this.pending[0].z < this.playerZ + SPAWN_AHEAD) {
      const e = this.pending.shift()!;
      if (e.do === 'zombie') this.zombies.push(this.makeZombie(e.kind, e.lane, e.z, e.dx));
      else if (e.do === 'object') this.objects.push(this.makeObject(e));
      else if (e.do === 'drop') this.hazards.push({ id: this.nextId++, kind: 'shadow', lane: e.lane, z: e.z, len: 1.2, activeAt: Infinity, until: Infinity, done: false, dropKind: e.kind });
      else if (e.do === 'hint') this.events.push({ type: 'hint', text: e.text });
    }
  }

  makeZombie(kind: ZombieKind, lane: number, z: number, dx?: number): Zombie {
    const d = ZOMBIES[kind];
    const hp = kind === 'boss' ? d.hp : Math.round(d.hp * this.hpMul);
    const off = dx ?? (this.rand() - 0.5) * 1.6;
    return { id: this.nextId++, kind, lane, x: kind === 'boss' ? 0 : laneX(lane) + off, z, hp, maxHp: hp, alive: true, deadAt: 0, switchAt: -1, switchTo: lane, hitAt: -1, nextAttack: 0, dropAt: 0, dx: off };
  }

  private makeObject(e: Extract<LevelEvent, { do: 'object' }>): WorldObject {
    const hp = e.hp ?? (OBJECTS[e.kind].shootable ? 100 : Infinity);
    return { id: this.nextId++, kind: e.kind, lane: e.lane, x: e.kind === 'wall' ? 0 : laneX(e.lane), z: e.z, hp, maxHp: hp, alive: true, hitAt: -1, troops: e.troops ?? 0, weapon: e.weapon, period: e.period ?? 0, phase: e.phase ?? 0, touched: false };
  }

  /** la sega/recinzione è attiva in questo momento? */
  trapOn(o: WorldObject, t = this.time) {
    return o.period > 0 ? (t + o.phase) % o.period < o.period * 0.5 : true;
  }

  // ---------- finale: muro con ondate oppure capo ----------
  private finale(dt: number) {
    const F = this.level.finale;
    if (F.kind === 'wall') {
      if (!this.wall && this.playerZ >= this.level.length - 60) {
        this.wall = this.makeObject({ z: this.level.length, do: 'object', kind: 'wall', lane: 1, hp: F.hp });
        this.objects.push(this.wall);
      }
      if (this.wall?.alive && this.playerZ >= this.wall.z - 11) {
        this.stopped = true;
        this.playerZ = Math.min(this.playerZ, this.wall.z - 10.5);
        if (this.time >= this.nextWave) {
          this.nextWave = this.time + F.waveEvery;
          for (let i = 0; i < F.waveSize; i++) {
            const kind: ZombieKind = i % 6 === 5 ? 'runner' : 'walker';
            this.zombies.push(this.makeZombie(kind, i % LANE_COUNT, this.wall.z - 1.5 - (i / F.waveSize) * 3));
          }
        }
      }
      if (this.wall && !this.wall.alive) this.stopped = false;
    } else {
      if (!this.boss && this.playerZ >= this.level.length - 40) {
        this.boss = this.makeZombie('boss', 1, this.playerZ + 30);
        this.boss.hp = this.boss.maxHp = F.hp;
        this.boss.nextAttack = this.time + 2.5;
        this.zombies.push(this.boss);
        this.events.push({ type: 'boss' });
      }
      const b = this.boss;
      if (b?.alive) {
        b.z = Math.max(b.z - 0.5 * dt, this.playerZ + 17);
        if (this.time >= b.nextAttack) {
          const rage = 1 - b.hp / b.maxHp;
          b.nextAttack = this.time + Math.max(1.6, 3 - rage * 1.3);
          if (this.rand() < 0.5) {
            // colpo a terra annunciato sulla corsia (come i colpi da schivare dei boss di Last War)
            const lane = this.rand() < 0.7 ? this.lane : Math.floor(this.rand() * LANE_COUNT);
            this.hazards.push({ id: this.nextId++, kind: 'slam', lane, z: this.playerZ, len: 14, activeAt: this.time + 1.2, until: this.time + 1.5, done: false });
            this.events.push({ type: 'warn', kind: 'slam', lane });
          } else {
            const n = 8 + Math.floor(rage * 12);
            for (let i = 0; i < n; i++) this.zombies.push(this.makeZombie(i % 5 === 4 ? 'dog' : 'walker', i % LANE_COUNT, b.z - 2 - i * 0.5));
          }
        }
      }
    }
  }

  // ---------- fuoco della squadra ----------
  private fire(dt: number) {
    const w = WEAPONS[this.weapon];
    this.fireCooldown -= dt;
    if (this.fireCooldown > 0) return;
    this.fireCooldown += 1 / w.rate;
    // tutti i soldati sparano; si generano al massimo 8 proiettili che portano il danno complessivo
    const drawn = Math.min(8, Math.max(1, this.squad));
    const dmg = (w.dps * this.squad) / w.rate / drawn;
    const lane = this.lane;
    for (let i = 0; i < drawn; i++) {
      const spread = drawn > 1 ? (i / (drawn - 1) - 0.5) * 1.5 : 0;
      this.bullets.push({ id: this.nextId++, lane, x: laneX(lane) + spread, z: this.playerZ + 1.2 - (i % 3) * 0.3, zStart: this.playerZ + 1.2, weapon: w.id, damage: dmg, pierceLeft: w.pierce, hitIds: new Set(), alive: true });
    }
    this.events.push({ type: 'shot', weapon: w.id, lane, count: drawn });
  }

  private updateBullets(dt: number) {
    for (const b of this.bullets) {
      if (!b.alive) continue;
      const w = WEAPONS[b.weapon];
      const z0 = b.z;
      b.z += w.speed * dt;
      // bersagli lungo il tragitto, in ordine: gli zombie davanti fanno da scudo agli oggetti (§1.3b).
      // Il danno che avanza dopo un'uccisione passa al bersaglio successivo: nessuna potenza sprecata.
      for (let guard = 0; guard < 24 && b.alive; guard++) {
        let bestZ = Infinity;
        let target: { kind: 'z'; z: Zombie } | { kind: 'o'; o: WorldObject } | null = null;
        for (const zb of this.zombies) {
          if (!zb.alive || zb.dropAt > this.time || b.hitIds.has(zb.id)) continue;
          if (zb.lane !== b.lane && zb.kind !== 'boss') continue;
          const r = ZOMBIES[zb.kind].radius;
          if (zb.z >= z0 - r && zb.z <= b.z + r && zb.z < bestZ) {
            bestZ = zb.z;
            target = { kind: 'z', z: zb };
          }
        }
        for (const o of this.objects) {
          if (!o.alive || !OBJECTS[o.kind].shootable || b.hitIds.has(o.id)) continue;
          if ((o.kind === 'wall' || o.lane === b.lane) && o.z >= z0 - 0.8 && o.z <= b.z + 0.8 && o.z < bestZ) {
            bestZ = o.z;
            target = { kind: 'o', o };
          }
        }
        if (!target) break;
        if (w.blast > 0) {
          if (target.kind === 'z') this.hitZombie(target.z, b, w.id);
          else this.damageObject(target.o, b.damage);
          this.explode(b.lane, bestZ, w.blast, b.damage * 0.5, false);
          b.alive = false;
          break;
        }
        if (target.kind === 'z') {
          const zb = target.z;
          b.hitIds.add(zb.id);
          const before = zb.hp;
          const shield = zb.kind === 'shield' && !w.armorPiercing ? 0.2 : 1;
          const used = Math.min(b.damage, before / shield);
          this.damageZombie(zb, used * shield, shield < 1);
          if (b.pierceLeft > 0) b.pierceLeft--; // attraversa a piena potenza
          else b.damage -= used; // il resto prosegue
        } else {
          const o = target.o;
          b.hitIds.add(o.id);
          const used = Math.min(b.damage, o.hp);
          this.damageObject(o, used);
          b.damage -= used;
        }
        if (b.damage <= 0.5) b.alive = false;
      }
      if (b.alive && b.z - b.zStart > w.range) {
        b.alive = false;
        if (w.blast > 0) this.explode(b.lane, b.z, w.blast, b.damage, false);
      }
    }
  }

  private hitZombie(z: Zombie, b: Bullet, wid: WeaponId) {
    let dmg = b.damage;
    let armored = false;
    if (z.kind === 'shield' && !WEAPONS[wid].armorPiercing) {
      dmg *= 0.2; // la corazza frontale ferma i colpi normali (serve fuoco, granate, esplosioni)
      armored = true;
    }
    this.damageZombie(z, dmg, armored);
  }

  damageZombie(z: Zombie, dmg: number, armored = false) {
    if (!z.alive) return;
    z.hp -= dmg;
    z.hitAt = this.time;
    this.events.push({ type: 'hit', target: 'zombie', id: z.id, x: z.x, z: z.z, damage: dmg, armored });
    if (z.hp <= 0) this.killZombie(z);
  }

  private killZombie(z: Zombie, byContact = false) {
    if (!z.alive) return;
    z.alive = false;
    z.deadAt = this.time;
    if (!byContact) {
      this.kills++;
      const was = this.strikeReady;
      this.strikeCharge = Math.min(AIRSTRIKE.killsToCharge, this.strikeCharge + 1);
      if (!was && this.strikeReady) this.events.push({ type: 'airstrikeReady' });
    }
    this.events.push({ type: 'zombieDied', id: z.id, kind: z.kind, x: z.x, z: z.z });
    if (z.kind === 'bloater') this.explode(z.lane, z.z, EXPLOSION.bloaterRadius, EXPLOSION.bloaterDamage, true);
  }

  private damageObject(o: WorldObject, dmg: number) {
    if (!o.alive) return;
    o.hp -= dmg;
    o.hitAt = this.time;
    this.events.push({ type: 'hit', target: 'object', id: o.id, x: o.x, z: o.z, damage: dmg, armored: false });
    if (o.hp <= 0) this.openObject(o);
  }

  private openObject(o: WorldObject) {
    if (!o.alive) return;
    o.alive = false;
    this.stats.opened++;
    this.events.push({ type: 'objectOpened', id: o.id, kind: o.kind, x: o.x, z: o.z });
    switch (o.kind) {
      case 'troops':
      case 'gate':
        this.gain(o.troops, o.x, o.z);
        break;
      case 'weapon': {
        const w = o.weapon ?? WEAPON_LADDER[Math.min(WEAPON_LADDER.length - 1, this.weaponTier + 1)];
        // un barile arma non peggiora mai: se è già superata, aggiunge soldati
        const better = w === 'flame' || w === 'grenade' ? true : WEAPON_LADDER.indexOf(w) > this.weaponTier;
        if (better) {
          this.weapon = w;
          this.events.push({ type: 'weapon', weapon: w });
        } else this.gain(3, o.x, o.z);
        break;
      }
      case 'freeze':
        this.freezeUntil = this.time + 5;
        this.events.push({ type: 'freeze' });
        break;
      case 'explosive':
        this.explode(o.lane, o.z, EXPLOSION.explosiveRadius, EXPLOSION.explosiveDamage, true);
        break;
      case 'safe':
        this.safeOpened = true;
        this.events.push({ type: 'loot', kind: 'safe' });
        break;
      default:
        break;
    }
  }

  private gain(n: number, x: number, z: number) {
    const add = Math.min(SQUAD.max - this.squad, n);
    if (add <= 0) return;
    this.squad += add;
    this.peakSquad = Math.max(this.peakSquad, this.squad);
    this.stats.gained += add;
    this.events.push({ type: 'soldiersGained', count: add, x, z });
  }

  private explode(lane: number, z: number, radius: number, dmg: number, hurtsSquad: boolean) {
    this.events.push({ type: 'explosion', x: laneX(lane), z, size: radius / 3 });
    const near = (l: number, zz: number) => Math.abs(l - lane) <= 1 && Math.abs(zz - z) < radius;
    for (const zb of this.zombies) if (zb.alive && zb.dropAt <= this.time && (near(zb.lane, zb.z) || (zb.kind === 'boss' && Math.abs(zb.z - z) < radius + 2))) this.damageZombie(zb, zb.kind === 'boss' ? dmg * 0.5 : dmg);
    for (const o of this.objects) if (o.alive && OBJECTS[o.kind].shootable && o.kind !== 'explosive' && (near(o.lane, o.z) || (o.kind === 'wall' && Math.abs(o.z - z) < radius + 1))) this.damageObject(o, dmg);
    for (const o of this.objects) if (o.alive && o.kind === 'explosive' && near(o.lane, o.z)) this.openObject(o);
    if (hurtsSquad && Math.abs(this.lane - lane) <= 1 && Math.abs(this.playerZ - z) < radius) this.lose(EXPLOSION.squadLoss, 'explosion', laneX(this.lane));
  }

  // ---------- attacco aereo ----------
  private updateStrike(dt: number) {
    if (this.strikeLeft <= 0) return;
    this.strikeLeft -= dt;
    for (const z of this.zombies)
      if (z.alive && z.kind !== 'boss' && z.lane === this.strikeLane && z.z > this.playerZ + 2 && z.z < this.playerZ + 32) this.damageZombie(z, AIRSTRIKE.dps * dt);
    if (this.boss?.alive && this.boss.z < this.playerZ + 34) this.damageZombie(this.boss, AIRSTRIKE.dps * 0.5 * dt);
  }

  // ---------- zombie ----------
  private updateZombies(dt: number) {
    const lane = this.lane;
    const slow = this.time < this.freezeUntil ? 0.5 : 1;
    for (const z of this.zombies) {
      if (!z.alive || z.kind === 'boss' || z.dropAt > this.time) continue;
      const d = ZOMBIES[z.kind];
      const dist = z.z - this.playerZ;
      if (z.kind === 'spitter') {
        // resta in fondo alla strada e colpisce una corsia, con il segnale a terra
        if (dist < 20) z.z = this.playerZ + 20;
        if (dist < 36 && this.time >= z.nextAttack) {
          z.nextAttack = this.time + 3.2;
          const target = this.rand() < 0.75 ? lane : Math.floor(this.rand() * LANE_COUNT);
          this.hazards.push({ id: this.nextId++, kind: 'acid', lane: target, z: this.playerZ + 9, len: 3.5, activeAt: this.time + 1.1, until: this.time + 4, done: false });
          this.events.push({ type: 'warn', kind: 'acid', lane: target });
        }
        continue;
      }
      if (dist < ACTIVE) z.z -= d.speed * slow * dt;
      if (d.seeks) {
        if (z.switchAt < 0 && z.lane !== lane && dist < 26 && dist > 6 && this.rand() < dt * 1.5) {
          z.switchTo = z.lane + Math.sign(lane - z.lane);
          z.switchAt = this.time + 0.5;
          this.events.push({ type: 'warn', kind: 'seeker', lane: z.switchTo });
        }
        if (z.switchAt > 0 && this.time >= z.switchAt) {
          z.lane = z.switchTo;
          z.switchAt = -1;
        }
      }
      const tx = laneX(z.lane) + z.dx;
      z.x += (tx - z.x) * Math.min(1, dt * 6);
    }
  }

  private updateHazards() {
    for (const h of this.hazards) {
      if (h.kind === 'shadow') {
        if (h.activeAt === Infinity && h.z - this.playerZ < 18) {
          h.activeAt = this.time + 1.2;
          h.until = h.activeAt + 0.1;
          this.events.push({ type: 'warn', kind: 'shadow', lane: h.lane });
        }
        if (!h.done && this.time >= h.activeAt) {
          h.done = true;
          const z = this.makeZombie(h.dropKind ?? 'walker', h.lane, h.z, 0);
          this.zombies.push(z);
        }
        continue;
      }
      if (h.done || this.time < h.activeAt) continue;
      if (h.kind === 'slam') {
        h.done = true;
        this.events.push({ type: 'slam', lane: h.lane, z: this.playerZ + 3 });
        if (this.lane === h.lane) this.lose(6, 'boss', laneX(h.lane));
      } else if (h.kind === 'acid') {
        if (this.time < h.until && this.lane === h.lane && Math.abs(this.playerZ - h.z) < h.len / 2 + 0.5) {
          h.done = true;
          this.lose(ZOMBIES.spitter.bite, 'acid', laneX(h.lane));
        }
      }
    }
  }

  // ---------- contatti ----------
  private collide() {
    const lane = this.lane;
    for (const z of this.zombies) {
      if (!z.alive || z.kind === 'boss' || z.kind === 'spitter' || z.dropAt > this.time || z.lane !== lane) continue;
      if (Math.abs(z.z - this.playerZ) > 0.9 + ZOMBIES[z.kind].radius) continue;
      const cause: LossCause = z.kind === 'walker' ? 'zombie' : (z.kind as LossCause);
      this.lose(ZOMBIES[z.kind].bite, cause, z.x);
      this.killZombie(z, true);
    }
    for (const o of this.objects) {
      if (!o.alive || o.touched || o.kind === 'wall' || o.lane !== lane) continue;
      if (Math.abs(o.z - this.playerZ) > 1.1) continue;
      o.touched = true;
      const def = OBJECTS[o.kind];
      if (o.kind === 'explosive') {
        this.openObject(o);
        continue;
      }
      if (o.kind === 'trap') {
        if (this.trapOn(o)) this.lose(def.contactLoss, 'trap', o.x);
        continue;
      }
      if (def.contactLoss > 0) this.lose(def.contactLoss, o.kind === 'car' ? 'car' : o.kind === 'gate' ? 'gate' : 'object', o.x);
      if (o.kind !== 'car') {
        // l'oggetto intatto va perso: per prenderlo bisognava distruggerlo prima (§2 punto 5c)
        o.alive = false;
        this.stats.missed++;
        this.events.push({ type: 'objectLost', id: o.id, kind: o.kind, x: o.x, z: o.z });
      }
    }
  }

  private lose(n: number, cause: LossCause, x: number) {
    if (this.opts.invulnerable || this.over || n <= 0) return;
    const lost = Math.min(this.squad, n);
    this.squad -= lost;
    this.stats.lost[cause] = (this.stats.lost[cause] ?? 0) + lost;
    this.events.push({ type: 'soldiersLost', count: lost, cause, x });
    if (this.squad <= 0) this.finish(false, cause);
  }

  private checkEnd() {
    if (this.over) return;
    const F = this.level.finale;
    if (F.kind === 'boss' && this.boss && !this.boss.alive) this.finish(true, 'Capo abbattuto');
    if (F.kind === 'wall' && this.wall && !this.wall.alive) this.finish(true, 'Muro sfondato');
  }

  private finish(won: boolean, reason: string) {
    if (this.over) return;
    this.status = won ? 'won' : 'lost';
    this.endReason = reason;
    this.events.push({ type: 'end', won, reason });
  }

  private cleanup() {
    const behind = this.playerZ - 7;
    this.zombies = this.zombies.filter((z) => (z.alive ? z.z > behind : this.time - z.deadAt < 1.4));
    this.objects = this.objects.filter((o) => o.alive && o.z > behind);
    this.bullets = this.bullets.filter((b) => b.alive);
    this.hazards = this.hazards.filter((h) => (h.kind === 'shadow' ? !h.done : !h.done || this.time < h.until + 0.3) && h.z > behind - 5);
  }

  drainEvents(): SimEvent[] {
    const e = this.events;
    this.events = [];
    return e;
  }
}

/** Testi delle cause di sconfitta, per il risultato. */
export const LOSS_TEXT: Record<LossCause, string> = {
  zombie: 'Travolti dall’orda',
  runner: 'Travolti dai Veloci',
  dog: 'Sbranati dai cani',
  armored: 'Travolti dai Corazzati',
  giant: 'Schiacciati dal Gigante',
  bloater: 'Esplosione di un Gonfio',
  shield: 'Travolti dagli Scudati',
  acid: 'Colpiti dall’acido',
  boss: 'Colpo del capo',
  explosion: 'Esplosione troppo vicina',
  object: 'Barile non distrutto',
  trap: 'Sega',
  car: 'Schianto contro un’auto',
  gate: 'Portone non abbattuto',
};
