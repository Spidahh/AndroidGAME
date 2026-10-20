// Simulazione di M1 "La Corsa". TypeScript puro: nessuna dipendenza da Babylon.
// Spazio: corsie lungo Z (avanti), X laterale. 1 unità = 1 metro.
import {
  LANE_COUNT, LANE_W, laneX, WEAPONS, WeaponId, ZOMBIES, ZombieKind, ObjectKind, OBJECT_HP, LOOT_HP, SHOOTABLE, OBJECT_CONTACT,
  PowerId, LootSize, LOOT_BONUS, SAFE_BONUS, HERO,
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
  switchAt: number; // cambio corsia annunciato (corridori, ladro)
  switchTo: number;
  hitAt: number;
  burnUntil: number;
  nextAttack: number; // sputatore, capo
  dropFrom?: number; // caduto dal tetto: istante di atterraggio
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
  weapon?: WeaponId;
  power?: PowerId;
  size?: LootSize;
  moving?: boolean;
  switchAt: number;
  switchTo: number;
  period: number;
  phase: number;
  touched: boolean;
}

export interface Bullet {
  id: number;
  lane: number;
  originLane: number;
  x: number;
  z: number;
  zStart: number;
  weapon: WeaponId;
  dmgMul: number;
  pierceLeft: number;
  hitIds: Set<number>;
  alive: boolean;
  companion: boolean;
}

export interface Companion {
  id: number;
  lane: number;
  x: number;
  hp: number;
  alive: boolean;
  model: number; // quale sopravvissuto
  cooldown: number;
}

export interface LaneHazard {
  id: number;
  kind: 'acid' | 'slam' | 'shadow';
  lane: number;
  z: number;
  len: number;
  activeAt: number; // prima di questo istante è solo un segnale
  until: number;
  hitPlayer: boolean;
  dropKind?: ZombieKind;
}

export type SimEvent =
  | { type: 'shot'; weapon: WeaponId; lane: number; companion: boolean }
  | { type: 'hit'; target: 'zombie' | 'object'; id: number; armored: boolean; x: number; z: number }
  | { type: 'zombieDied'; id: number; kind: ZombieKind; x: number; z: number }
  | { type: 'objectBroken'; id: number; kind: ObjectKind; x: number; z: number; opened: boolean }
  | { type: 'explosion'; x: number; z: number; size: number }
  | { type: 'playerHurt'; amount: number }
  | { type: 'shieldBlock' }
  | { type: 'weapon'; weapon: WeaponId }
  | { type: 'power'; power: PowerId }
  | { type: 'loot'; size: LootSize | 'safe' }
  | { type: 'companionJoined'; id: number }
  | { type: 'companionLost'; id: number }
  | { type: 'warn'; kind: 'acid' | 'slam' | 'shadow'; lane: number }
  | { type: 'slam'; lane: number; z: number }
  | { type: 'dash' }
  | { type: 'hint'; text: string }
  | { type: 'boss' }
  | { type: 'medicine'; state: 'appear' | 'opened' | 'lost' }
  | { type: 'escortHit' }
  | { type: 'end'; won: boolean; reason: string };

export interface SimOptions {
  seed: number;
  /** solo per prove di prestazioni: l'eroe non subisce danni */
  invulnerable?: boolean;
  /** prova di carico senza livello: flusso continuo di zombie */
  stressZombies?: number;
  /** solo sviluppo: parte da questo punto del percorso (frazione 0–1) */
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

const SPAWN_AHEAD = 72;
const ENGAGE = 45; // gli zombie si muovono solo entro questa distanza

export class RunSim {
  time = 0;
  playerZ = 0;
  playerLane = 1;
  playerX = laneX(1);
  speed: number;
  hp = HERO.hp;
  maxHp = HERO.hp;
  weapon: WeaponId = 'pistol';
  powers: Record<PowerId, number> = { rapid: 0, damage: 0, shield: 0, pierce: 0 };
  companions: Companion[] = [];
  dashLeft = 0;
  dashCooldown = 0;
  zombies: Zombie[] = [];
  objects: WorldObject[] = [];
  bullets: Bullet[] = [];
  hazards: LaneHazard[] = [];
  events: SimEvent[] = [];
  kills = 0;
  // stato del livello
  status: 'running' | 'won' | 'lost' = 'running';
  endReason = '';
  lootBonus = 0;
  safeOpened = false;
  cagesTotal = 0;
  cagesOpened = 0;
  companionsLost = 0;
  stopped = false; // fermi davanti al portone finale
  hordeLeft = 0; // secondi prima che l'orda alle spalle arrivi (portone)
  hordeTotal = 0;
  escort?: { lane: number; z: number; hp: number; maxHp: number };
  boss?: Zombie;
  thief?: Zombie;
  medicine?: WorldObject;
  medicineState: 'waiting' | 'active' | 'opened' | 'lost' = 'waiting';
  gate?: WorldObject;

  private nextId = 1;
  private fireCooldown = 0;
  private rand: () => number;
  private pending: LevelEvent[];
  private medicineUntil = 0;
  private hordeTick = 0;
  private stressSpawnedTo = 10;

  get over() {
    return this.status !== 'running';
  }
  get progress() {
    return Math.min(1, this.playerZ / this.level.length);
  }
  /** stelle: [arrivato, cassaforte aperta, tutte le gabbie aperte e nessun compagno perso] */
  get starFlags(): [boolean, boolean, boolean] {
    const won = this.status === 'won';
    return [won, won && this.safeOpened, won && this.cagesOpened >= this.cagesTotal && this.companionsLost === 0];
  }
  get stars() {
    return this.starFlags.filter(Boolean).length;
  }

  constructor(public level: LevelDef, public opts: SimOptions) {
    this.rand = rng(opts.seed);
    this.speed = level.speed[0];
    this.pending = [...level.events].sort((a, b) => a.z - b.z);
    if (opts.startAt) {
      this.playerZ = level.length * opts.startAt;
      this.pending = this.pending.filter((e) => e.z > this.playerZ + 10);
    }
    this.cagesTotal = level.events.filter((e) => e.do === 'object' && e.kind === 'cage').length;
    if (level.escort) this.escort = { lane: 1, z: 7, hp: level.escort.hp, maxHp: level.escort.hp };
    if (level.thief) {
      this.thief = this.makeZombie('thief', 1, level.thief.lead);
      this.thief.hp = this.thief.maxHp = level.thief.hp;
      this.zombies.push(this.thief);
    }
  }

  // ---------- comandi ----------
  moveLane(dir: -1 | 1) {
    if (this.over) return;
    this.playerLane = Math.max(0, Math.min(LANE_COUNT - 1, this.playerLane + dir));
  }
  dash() {
    if (this.over || this.dashCooldown > 0) return false;
    this.dashLeft = HERO.dashTime;
    this.dashCooldown = HERO.dashCooldown;
    this.events.push({ type: 'dash' });
    return true;
  }

  // ---------- passo di simulazione ----------
  step(dt: number) {
    if (this.over) return;
    this.time += dt;
    this.dashLeft = Math.max(0, this.dashLeft - dt);
    this.dashCooldown = Math.max(0, this.dashCooldown - dt);

    const [v0, v1] = this.level.speed;
    const target = this.stopped ? 0 : v0 + (v1 - v0) * this.progress;
    this.speed += (target - this.speed) * Math.min(1, dt * (this.stopped ? 4 : 1));
    this.playerZ += this.speed * dt;
    const tx = laneX(this.playerLane);
    this.playerX += (tx - this.playerX) * Math.min(1, dt / 0.05);
    if (Math.abs(tx - this.playerX) < 0.01) this.playerX = tx;

    if (this.opts.stressZombies) this.stressSpawn();
    else this.spawnFromLevel();
    this.updateObjectives(dt);
    this.placeCompanions(dt);
    this.fire(dt);
    this.updateBullets(dt);
    this.updateZombies(dt);
    this.updateHazards();
    this.collide();
    this.checkEnd();
    this.cleanup();
  }

  private currentLane() {
    return Math.round(this.playerX / LANE_W + (LANE_COUNT - 1) / 2);
  }

  // ---------- generazione dal livello ----------
  private spawnFromLevel() {
    while (this.pending.length && this.pending[0].z < this.playerZ + SPAWN_AHEAD) {
      const e = this.pending.shift()!;
      if (e.do === 'zombie') this.zombies.push(this.makeZombie(e.kind, e.lane, e.z));
      else if (e.do === 'object') this.objects.push(this.makeObject(e.kind, e.lane, e.z, e));
      else if (e.do === 'fence') {
        const o = this.makeObject('fence', e.lane, e.z, {});
        o.period = e.period;
        o.phase = e.phase;
        this.objects.push(o);
      } else if (e.do === 'drop') {
        // ombra a terra: lo zombie atterra quando l'eroe si avvicina
        this.hazards.push({ id: this.nextId++, kind: 'shadow', lane: e.lane, z: e.z, len: 1.2, activeAt: Infinity, until: Infinity, hitPlayer: false, dropKind: e.kind });
      } else if (e.do === 'hint') this.events.push({ type: 'hint', text: e.text });
    }
  }

  private stressSpawn() {
    const horizon = this.playerZ + 75;
    while (this.stressSpawnedTo < horizon) {
      const alive = this.zombies.filter((q) => q.alive && q.z > this.playerZ).length;
      const deficit = (this.opts.stressZombies ?? 0) - alive;
      const n = deficit > 0 ? Math.min(6, Math.ceil(deficit / 6)) : 0;
      for (let i = 0; i < n; i++) {
        const r = this.rand();
        const kind: ZombieKind = r < 0.5 ? 'walker' : r < 0.75 ? 'runner' : r < 0.85 ? 'shield' : r < 0.93 ? 'bloater' : 'brute';
        this.zombies.push(this.makeZombie(kind, Math.floor(this.rand() * LANE_COUNT), this.stressSpawnedTo + this.rand() * 4));
      }
      if (Math.floor(this.stressSpawnedTo) % 24 < 4) this.objects.push(this.makeObject('chest', Math.floor(this.rand() * 3), this.stressSpawnedTo + 2, { weapon: (['smg', 'shotgun', 'rifle', 'flame', 'grenade'] as WeaponId[])[Math.floor(this.rand() * 5)] }));
      this.stressSpawnedTo += 4;
    }
  }

  private makeZombie(kind: ZombieKind, lane: number, z: number): Zombie {
    const d = ZOMBIES[kind];
    return { id: this.nextId++, kind, lane, x: laneX(lane), z, hp: d.hp, maxHp: d.hp, alive: true, deadAt: 0, switchAt: -1, switchTo: lane, hitAt: -1, burnUntil: 0, nextAttack: 0 };
  }

  private makeObject(kind: ObjectKind, lane: number, z: number, e: Partial<Extract<LevelEvent, { do: 'object' }>>): WorldObject {
    const hp = e.hp ?? (kind === 'loot' ? LOOT_HP[e.size ?? 'M'] : OBJECT_HP[kind]);
    return { id: this.nextId++, kind, lane, x: laneX(lane), z, hp, maxHp: hp, alive: true, hitAt: -1, weapon: e.weapon, power: e.power, size: e.size, moving: e.moving, switchAt: -1, switchTo: lane, period: 0, phase: 0, touched: false };
  }

  // ---------- obiettivi dei tipi di livello ----------
  private updateObjectives(dt: number) {
    const L = this.level;
    // recupero: il carrello delle medicine
    if (L.medicine && this.medicineState === 'waiting' && this.playerZ + 18 >= L.medicine.z) {
      const m = this.makeObject('medicine', 1, this.playerZ + 18, { hp: L.medicine.hp, moving: true });
      this.objects.push(m);
      this.medicine = m;
      this.medicineState = 'active';
      this.medicineUntil = this.time + L.medicine.seconds;
      this.events.push({ type: 'medicine', state: 'appear' });
    }
    if (this.medicine && this.medicineState === 'active') {
      const m = this.medicine;
      if (!m.alive) {
        this.medicineState = 'opened';
        this.events.push({ type: 'medicine', state: 'opened' });
      } else if (this.time > this.medicineUntil) {
        m.z += 25 * dt; // il carrello scappa
        if (m.z > this.playerZ + 40) {
          m.alive = false;
          this.medicineState = 'lost';
          this.events.push({ type: 'medicine', state: 'lost' });
        }
      } else {
        m.z = this.playerZ + 14;
        this.laneWander(m, 3.6);
      }
    }
    // scorta: il blindato corre davanti nella corsia centrale
    if (this.escort) this.escort.z = this.playerZ + 7;
    // inseguimento: il ladro resta davanti e cambia corsia
    if (this.thief?.alive) {
      // il ladro a tratti scatta e si allontana fuori tiro: va inseguito per tutta la strada
      const sprint = Math.max(0, Math.sin(this.time * 0.45)) * 14;
      const lead = (L.thief?.lead ?? 22) * (1 - 0.4 * this.progress) + sprint;
      this.thief.z += (this.playerZ + Math.max(9, lead) - this.thief.z) * Math.min(1, dt * 1.5);
      this.laneWander(this.thief, 2.2);
    }
    // finale con il capo
    if (L.finale.kind === 'boss' && !this.boss && this.playerZ >= L.length - 40) {
      this.boss = this.makeZombie('boss', 1, this.playerZ + 26);
      this.boss.hp = this.boss.maxHp = L.finale.hp;
      this.boss.nextAttack = this.time + 2.5;
      this.zombies.push(this.boss);
      this.events.push({ type: 'boss' });
    }
    if (this.boss?.alive) this.updateBoss();
    // finale con il portone
    if (L.finale.kind === 'gate' && !this.gate && this.playerZ >= L.length - 60) {
      const g = this.makeObject('gate', 1, L.length, { hp: L.finale.hp });
      this.gate = g;
      this.objects.push(g);
    }
    if (this.gate?.alive && L.finale.kind === 'gate' && this.playerZ >= this.gate.z - 7) {
      if (!this.stopped) {
        this.stopped = true;
        this.hordeTotal = this.hordeLeft = L.finale.hordeSeconds;
      }
      this.playerZ = Math.min(this.playerZ, this.gate.z - 6.5);
      this.hordeLeft = Math.max(0, this.hordeLeft - dt);
      if (this.hordeLeft <= 0 && this.time >= this.hordeTick) {
        this.hordeTick = this.time + 1.5;
        this.hurt(18, 'L’orda ti ha raggiunto');
      }
    }
    if (this.gate && !this.gate.alive) this.stopped = false;
  }

  /** cambio di corsia annunciato, per oggetti e zombie che si spostano */
  private laneWander(e: { lane: number; switchAt: number; switchTo: number }, every: number) {
    if (e.switchAt < 0) {
      if (this.rand() < 1 / (every * 60)) {
        let to = e.lane + (this.rand() < 0.5 ? -1 : 1);
        if (to < 0 || to >= LANE_COUNT) to = e.lane + (e.lane === 0 ? 1 : -1);
        e.switchTo = to;
        e.switchAt = this.time + 0.6;
      }
    } else if (this.time >= e.switchAt) {
      e.lane = e.switchTo;
      e.switchAt = -1;
    }
  }

  private updateBoss() {
    const b = this.boss!;
    b.z = Math.max(b.z - 0.5 * (1 / 60), this.playerZ + 15);
    if (this.time >= b.nextAttack) {
      b.nextAttack = this.time + Math.max(2.2, 3.4 - (1 - b.hp / b.maxHp) * 1.2);
      if (this.rand() < 0.65) {
        // colpo a terra su una corsia, annunciato
        const lane = this.rand() < 0.6 ? this.currentLane() : Math.floor(this.rand() * LANE_COUNT);
        this.hazards.push({ id: this.nextId++, kind: 'slam', lane, z: this.playerZ, len: 6, activeAt: this.time + 1.1, until: this.time + 1.35, hitPlayer: false });
        this.events.push({ type: 'warn', kind: 'slam', lane });
      } else {
        // richiama due zombie
        for (let i = 0; i < 2; i++) this.zombies.push(this.makeZombie(this.rand() < 0.5 ? 'walker' : 'runner', Math.floor(this.rand() * LANE_COUNT), b.z - 2 - i * 2));
      }
    }
  }

  // ---------- compagni ----------
  private placeCompanions(dt: number) {
    const alive = this.companions.filter((c) => c.alive);
    const lane = this.currentLane();
    const free = [0, 1, 2].filter((l) => l !== lane).sort((a, b) => Math.abs(a - lane) - Math.abs(b - lane));
    alive.forEach((c, i) => {
      c.lane = free[i] ?? c.lane;
      c.x += (laneX(c.lane) - c.x) * Math.min(1, dt / 0.08);
    });
  }

  private addCompanion() {
    if (this.companions.filter((c) => c.alive).length >= 2) return;
    const id = this.nextId++;
    this.companions.push({ id, lane: this.playerLane, x: this.playerX, hp: HERO.companionHp, alive: true, model: this.companions.length % 2, cooldown: 0.3 });
    this.events.push({ type: 'companionJoined', id });
  }

  // ---------- fuoco ----------
  private fire(dt: number) {
    const w = WEAPONS[this.weapon];
    const rate = w.rate * (1 + 0.35 * this.powers.rapid);
    const dmgMul = 1 + 0.3 * this.powers.damage;
    this.fireCooldown -= dt;
    let guard = 0;
    while (this.fireCooldown <= 0 && guard++ < 4) {
      this.fireCooldown += 1 / rate;
      this.spawnBullets(this.currentLane(), w.id, dmgMul, false);
    }
    for (const c of this.companions) {
      if (!c.alive) continue;
      c.cooldown -= dt;
      if (c.cooldown <= 0) {
        c.cooldown += 2 / rate;
        this.spawnBullets(c.lane, w.id, dmgMul * HERO.companionDamage, true);
      }
    }
  }

  private spawnBullets(lane: number, wid: WeaponId, dmgMul: number, companion: boolean) {
    const w = WEAPONS[wid];
    for (const off of w.lanes) {
      const l = lane + off;
      if (l < 0 || l >= LANE_COUNT) continue;
      this.bullets.push({ id: this.nextId++, lane: l, originLane: lane, x: laneX(l), z: this.playerZ + 0.8, zStart: this.playerZ + 0.8, weapon: wid, dmgMul, pierceLeft: w.pierce + this.powers.pierce, hitIds: new Set(), alive: true, companion });
    }
    this.events.push({ type: 'shot', weapon: wid, lane, companion });
  }

  private updateBullets(dt: number) {
    for (const b of this.bullets) {
      if (!b.alive) continue;
      const w = WEAPONS[b.weapon];
      const z0 = b.z;
      b.z += w.speed * dt;
      const expired = b.z - b.zStart > w.range;
      type Hit = { z: number; id: number; apply: () => void };
      const hits: Hit[] = [];
      for (const zb of this.zombies) {
        if (!zb.alive || (zb.lane !== b.lane && zb.kind !== 'boss') || b.hitIds.has(zb.id) || zb.dropFrom) continue;
        const r = ZOMBIES[zb.kind].radius;
        if (zb.z >= z0 - r && zb.z <= b.z + r) hits.push({ z: zb.z, id: zb.id, apply: () => this.bulletOnZombie(b, w.id, zb) });
      }
      for (const o of this.objects) {
        if (!o.alive || !SHOOTABLE[o.kind] || b.hitIds.has(o.id)) continue;
        const sameLane = o.kind === 'gate' || o.lane === b.lane;
        if (sameLane && o.z >= z0 - 0.7 && o.z <= b.z + 0.7) hits.push({ z: o.z, id: o.id, apply: () => this.damageObject(o, w.damage * b.dmgMul) });
      }
      hits.sort((a, c) => a.z - c.z);
      for (const h of hits) {
        h.apply();
        b.hitIds.add(h.id);
        if (w.blast > 0) {
          this.explode(b.lane, h.z, w.blast, w.damage * b.dmgMul, w.damage * b.dmgMul, 0, 0.8);
          b.alive = false;
          break;
        }
        if (b.pierceLeft-- <= 0) {
          b.alive = false;
          break;
        }
      }
      if (b.alive && expired) {
        b.alive = false;
        if (w.blast > 0) this.explode(b.lane, b.z, w.blast, w.damage * b.dmgMul, w.damage * b.dmgMul, 0, 0.8);
      }
    }
  }

  private bulletOnZombie(b: Bullet, wid: WeaponId, z: Zombie) {
    const w = WEAPONS[wid];
    let dmg = w.damage * b.dmgMul;
    let armored = false;
    // gli Scudati incassano i colpi frontali, non quelli di lato, del fuoco o delle esplosioni
    if (z.kind === 'shield' && !w.armorPiercing && b.lane === b.originLane) {
      dmg *= 0.2;
      armored = true;
    }
    if (w.burn > 0) z.burnUntil = this.time + 3;
    this.damageZombie(z, dmg, armored);
  }

  private damageZombie(z: Zombie, dmg: number, armored = false) {
    if (!z.alive) return;
    z.hp -= dmg;
    z.hitAt = this.time;
    this.events.push({ type: 'hit', target: 'zombie', id: z.id, armored, x: z.x, z: z.z });
    if (z.hp <= 0) this.killZombie(z);
  }

  private killZombie(z: Zombie) {
    if (!z.alive) return;
    z.alive = false;
    z.deadAt = this.time;
    this.kills++;
    this.events.push({ type: 'zombieDied', id: z.id, kind: z.kind, x: z.x, z: z.z });
    if (z.kind === 'bloater') this.explode(z.lane, z.z, 3, 60, 40, 25, 1);
  }

  private damageObject(o: WorldObject, dmg: number) {
    if (!o.alive || !SHOOTABLE[o.kind]) return;
    o.hp -= dmg;
    o.hitAt = this.time;
    this.events.push({ type: 'hit', target: 'object', id: o.id, armored: false, x: o.x, z: o.z });
    if (o.hp <= 0) this.openObject(o);
  }

  private openObject(o: WorldObject) {
    o.alive = false;
    this.events.push({ type: 'objectBroken', id: o.id, kind: o.kind, x: o.x, z: o.z, opened: true });
    switch (o.kind) {
      case 'barrel':
        this.explode(o.lane, o.z, 3.2, 90, 140, 25, 1);
        break;
      case 'chest':
        if (o.weapon) {
          this.weapon = o.weapon;
          this.events.push({ type: 'weapon', weapon: o.weapon });
        }
        break;
      case 'power':
        if (o.power) {
          this.powers[o.power] = Math.min(2, this.powers[o.power] + 1);
          this.events.push({ type: 'power', power: o.power });
        }
        break;
      case 'cage':
        this.cagesOpened++;
        this.addCompanion();
        break;
      case 'loot':
        this.lootBonus += LOOT_BONUS[o.size ?? 'M'];
        this.events.push({ type: 'loot', size: o.size ?? 'M' });
        break;
      case 'safe':
        this.safeOpened = true;
        this.lootBonus += SAFE_BONUS;
        this.events.push({ type: 'loot', size: 'safe' });
        break;
      default:
        break;
    }
  }

  /** esplosione: colpisce la propria corsia e quelle vicine entro 'radius' metri */
  private explode(lane: number, z: number, radius: number, dmgZ: number, dmgO: number, dmgPlayer: number, size: number) {
    this.events.push({ type: 'explosion', x: laneX(lane), z, size });
    const near = (l: number, zz: number) => Math.abs(l - lane) <= 1 && Math.abs(zz - z) < radius;
    for (const zb of this.zombies) if (zb.alive && !zb.dropFrom && near(zb.lane, zb.z)) this.damageZombie(zb, zb.kind === 'boss' ? dmgZ * 0.5 : dmgZ);
    for (const o of this.objects) if (o.alive && SHOOTABLE[o.kind] && o.kind !== 'barrel' && (near(o.lane, o.z) || (o.kind === 'gate' && Math.abs(o.z - z) < radius))) this.damageObject(o, dmgO);
    // catena: altri barili vicini
    for (const o of this.objects) if (o.alive && o.kind === 'barrel' && near(o.lane, o.z)) this.openObject(o);
    if (dmgPlayer > 0) {
      if (near(this.currentLane(), this.playerZ)) this.hurt(dmgPlayer, 'Esplosione');
      for (const c of this.companions) if (c.alive && near(c.lane, this.playerZ)) this.hurtCompanion(c, dmgPlayer);
    }
  }

  // ---------- zombie ----------
  private updateZombies(dt: number) {
    for (const z of this.zombies) {
      if (!z.alive) continue;
      if (z.dropFrom) {
        if (this.time >= z.dropFrom) z.dropFrom = undefined;
        continue;
      }
      if (z.burnUntil > this.time) {
        z.hp -= WEAPONS.flame.burn * dt;
        if (z.hp <= 0) this.killZombie(z);
      }
      const d = ZOMBIES[z.kind];
      if (z.kind === 'spitter') this.updateSpitter(z);
      else if (z.kind !== 'boss' && z.kind !== 'thief' && z.z - this.playerZ < ENGAGE) z.z -= d.speed * dt;
      if (z.kind === 'runner') {
        if (z.switchAt < 0 && z.z - this.playerZ < 22 && z.z - this.playerZ > 6 && this.rand() < dt * 0.7) {
          const to = z.lane + (this.rand() < 0.5 ? -1 : 1);
          if (to >= 0 && to < LANE_COUNT) {
            z.switchTo = to;
            z.switchAt = this.time + 0.5; // segnale 0,5 s prima
          }
        }
        if (z.switchAt > 0 && this.time >= z.switchAt) {
          z.lane = z.switchTo;
          z.switchAt = -1;
        }
      }
      z.x += (laneX(z.lane) - z.x) * Math.min(1, dt * 8);
    }
  }

  private updateSpitter(z: Zombie) {
    const dist = z.z - this.playerZ;
    if (dist < 18) z.z = this.playerZ + 18; // resta a distanza, sul fondo della strada
    if (dist < 34 && this.time >= z.nextAttack) {
      z.nextAttack = this.time + 3;
      const lane = this.rand() < 0.7 ? this.currentLane() : Math.floor(this.rand() * LANE_COUNT);
      this.hazards.push({ id: this.nextId++, kind: 'acid', lane, z: this.playerZ + 9, len: 3, activeAt: this.time + 1, until: this.time + 3.5, hitPlayer: false });
      this.events.push({ type: 'warn', kind: 'acid', lane });
    }
  }

  private updateHazards() {
    for (const h of this.hazards) {
      if (h.kind === 'shadow' && h.activeAt === Infinity && h.z - this.playerZ < 16) {
        // l'ombra si allarga: lo zombie atterra fra 1,2 s
        h.activeAt = this.time + 1.2;
        h.until = h.activeAt + 0.1;
        this.events.push({ type: 'warn', kind: 'shadow', lane: h.lane });
      }
      if (h.kind === 'shadow' && this.time >= h.activeAt && h.until !== -1) {
        const z = this.makeZombie(h.dropKind ?? 'walker', h.lane, h.z);
        this.zombies.push(z);
        h.until = -1;
      }
      if (h.kind === 'slam' && this.time >= h.activeAt && !h.hitPlayer) {
        h.hitPlayer = true;
        this.events.push({ type: 'slam', lane: h.lane, z: this.playerZ + 4 });
        if (this.currentLane() === h.lane) this.hurt(30, 'Colpo del capo');
        for (const c of this.companions) if (c.alive && c.lane === h.lane) this.hurtCompanion(c, 30);
      }
      if (h.kind === 'acid' && this.time >= h.activeAt && this.time < h.until && !h.hitPlayer) {
        if (this.currentLane() === h.lane && Math.abs(this.playerZ - h.z) < h.len / 2 + 0.4) {
          h.hitPlayer = true;
          this.hurt(15, 'Acido');
        }
      }
    }
  }

  // ---------- contatti ----------
  private collide() {
    const lane = this.currentLane();
    const dashing = this.dashLeft > 0;
    for (const z of this.zombies) {
      if (!z.alive || z.dropFrom || z.kind === 'boss' || z.kind === 'thief' || z.kind === 'spitter') continue;
      const r = ZOMBIES[z.kind].radius;
      if (Math.abs(z.z - this.playerZ) > 0.7 + r) continue;
      if (z.lane === lane) {
        if (!dashing) this.hurt(ZOMBIES[z.kind].contact, 'Zombie');
        this.killZombie(z);
        continue;
      }
      const c = this.companions.find((q) => q.alive && q.lane === z.lane);
      if (c) {
        this.hurtCompanion(c, z.kind === 'brute' ? 999 : ZOMBIES[z.kind].contact);
        this.killZombie(z);
      }
    }
    // zombie che raggiungono il blindato
    if (this.escort) {
      for (const z of this.zombies) {
        if (!z.alive || z.lane !== this.escort.lane || z.kind === 'boss' || z.kind === 'spitter') continue;
        if (Math.abs(z.z - this.escort.z) < 1.4) {
          this.escort.hp -= ZOMBIES[z.kind].contact;
          this.events.push({ type: 'escortHit' });
          this.killZombie(z);
        }
      }
    }
    for (const o of this.objects) {
      if (!o.alive || o.touched) continue;
      if (Math.abs(o.z - this.playerZ) > 0.9 || o.kind === 'gate' || o.kind === 'medicine') continue;
      const fenceOn = o.kind === 'fence' && (this.time + o.phase) % o.period < o.period / 2;
      if (o.lane === lane) {
        o.touched = true;
        if (o.kind === 'barrel') {
          if (!dashing) this.hurt(OBJECT_CONTACT.barrel, 'Barile');
          this.openObject(o);
        } else if (o.kind === 'fence') {
          if (fenceOn && !dashing) this.hurt(OBJECT_CONTACT.fence, 'Recinzione elettrica');
        } else if (OBJECT_CONTACT[o.kind] > 0) {
          if (!dashing) this.hurt(OBJECT_CONTACT[o.kind], o.kind === 'car' ? 'Auto' : 'Barricata');
          if (o.kind === 'barrier') {
            o.alive = false;
            this.events.push({ type: 'objectBroken', id: o.id, kind: o.kind, x: o.x, z: o.z, opened: false });
          }
        } else {
          // passata senza aprirla: persa
          o.alive = false;
          this.events.push({ type: 'objectBroken', id: o.id, kind: o.kind, x: o.x, z: o.z, opened: false });
        }
      } else {
        const c = this.companions.find((q) => q.alive && q.lane === o.lane);
        if (c && OBJECT_CONTACT[o.kind] > 0 && (o.kind !== 'fence' || fenceOn)) {
          o.touched = true;
          this.hurtCompanion(c, OBJECT_CONTACT[o.kind]);
        }
      }
    }
  }

  private hurt(amount: number, reason: string) {
    if (this.opts.invulnerable || this.dashLeft > 0 || this.over) return;
    if (this.powers.shield > 0) {
      this.powers.shield--;
      this.events.push({ type: 'shieldBlock' });
      return;
    }
    this.hp = Math.max(0, this.hp - amount);
    this.events.push({ type: 'playerHurt', amount });
    if (this.hp <= 0) this.finish(false, reason);
  }

  private hurtCompanion(c: Companion, amount: number) {
    if (!c.alive || this.opts.invulnerable) return;
    c.hp -= amount;
    if (c.hp <= 0) {
      c.alive = false;
      this.companionsLost++;
      this.events.push({ type: 'companionLost', id: c.id });
    }
  }

  // ---------- fine livello ----------
  private checkEnd() {
    if (this.over || this.opts.stressZombies) return;
    const L = this.level;
    if (this.escort && this.escort.hp <= 0) return this.finish(false, 'Il blindato è stato distrutto');
    if (this.medicineState === 'lost') return this.finish(false, 'Le medicine sono andate perse');
    if (L.type === 'inseguimento') {
      if (this.thief && !this.thief.alive) return this.finish(true, 'Scorte recuperate');
      if (this.playerZ >= L.length) return this.finish(false, 'Il ladro è scappato');
      return;
    }
    if (L.finale.kind === 'boss') {
      if (this.boss && !this.boss.alive) this.finish(true, 'Capo abbattuto');
      return;
    }
    if (L.finale.kind === 'gate') {
      if (this.gate && !this.gate.alive) this.finish(true, 'Strada aperta');
      return;
    }
    if (this.playerZ >= L.length && (L.type !== 'recupero' || this.medicineState === 'opened')) this.finish(true, 'Arrivato');
  }

  private finish(won: boolean, reason: string) {
    if (this.over) return;
    this.status = won ? 'won' : 'lost';
    this.endReason = reason;
    this.events.push({ type: 'end', won, reason });
  }

  private cleanup() {
    const behind = this.playerZ - 7;
    this.zombies = this.zombies.filter((z) => (z.alive ? z.z > behind : this.time - z.deadAt < 1.6));
    this.objects = this.objects.filter((o) => o.alive && o.z > behind);
    this.bullets = this.bullets.filter((b) => b.alive);
    this.hazards = this.hazards.filter((h) => h.until === Infinity || (h.until !== -1 && this.time < h.until + 0.3) || (h.kind === 'shadow' && h.until !== -1));
  }

  drainEvents(): SimEvent[] {
    const e = this.events;
    this.events = [];
    return e;
  }
}
