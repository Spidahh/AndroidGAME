// Definizioni di M1 "La Corsa": armi, zombie, oggetti, potenziamenti. Solo dati.

export const LANE_COUNT = 3;
export const LANE_W = 2.4;
export const laneX = (lane: number) => (lane - (LANE_COUNT - 1) / 2) * LANE_W;

export type WeaponId = 'pistol' | 'smg' | 'shotgun' | 'rifle' | 'flame' | 'grenade';
export interface WeaponDef {
  id: WeaponId;
  name: string;
  rate: number; // colpi al secondo
  damage: number;
  lanes: number[]; // corsie colpite relative a chi spara
  range: number;
  pierce: number; // bersagli attraversati oltre al primo (99 = tutta la corsia)
  speed: number;
  /** ignora la corazza frontale degli Scudati */
  armorPiercing: boolean;
  /** raggio d'esplosione all'impatto (0 = nessuna) */
  blast: number;
  /** danno da fuoco al secondo per 3 s */
  burn: number;
}

export const WEAPONS: Record<WeaponId, WeaponDef> = {
  pistol: { id: 'pistol', name: 'Pistola', rate: 4, damage: 10, lanes: [0], range: 32, pierce: 0, speed: 44, armorPiercing: false, blast: 0, burn: 0 },
  smg: { id: 'smg', name: 'Mitragliatrice', rate: 11, damage: 5.5, lanes: [0], range: 30, pierce: 0, speed: 50, armorPiercing: false, blast: 0, burn: 0 },
  shotgun: { id: 'shotgun', name: 'Fucile a pompa', rate: 1.6, damage: 18, lanes: [-1, 0, 1], range: 14, pierce: 0, speed: 40, armorPiercing: false, blast: 0, burn: 0 },
  rifle: { id: 'rifle', name: 'Precisione', rate: 1.1, damage: 50, lanes: [0], range: 60, pierce: 99, speed: 90, armorPiercing: true, blast: 0, burn: 0 },
  flame: { id: 'flame', name: 'Lanciafiamme', rate: 12, damage: 3.2, lanes: [0], range: 7.5, pierce: 99, speed: 22, armorPiercing: true, blast: 0, burn: 6 },
  grenade: { id: 'grenade', name: 'Lanciagranate', rate: 0.8, damage: 45, lanes: [0], range: 24, pierce: 0, speed: 24, armorPiercing: true, blast: 2.6, burn: 0 },
};

export type ZombieKind = 'walker' | 'runner' | 'brute' | 'shield' | 'bloater' | 'spitter' | 'crawler' | 'boss' | 'thief';
export interface ZombieDef {
  hp: number;
  speed: number; // m/s verso il giocatore
  contact: number; // danno al contatto
  radius: number;
}
export const ZOMBIES: Record<ZombieKind, ZombieDef> = {
  walker: { hp: 30, speed: 1.3, contact: 18, radius: 0.45 },
  runner: { hp: 22, speed: 3.4, contact: 14, radius: 0.4 },
  brute: { hp: 260, speed: 0.9, contact: 45, radius: 0.8 },
  shield: { hp: 60, speed: 1.2, contact: 20, radius: 0.5 },
  bloater: { hp: 45, speed: 1.0, contact: 25, radius: 0.6 },
  spitter: { hp: 35, speed: 0, contact: 10, radius: 0.45 },
  crawler: { hp: 15, speed: 0.8, contact: 10, radius: 0.35 },
  boss: { hp: 1600, speed: 0, contact: 60, radius: 1.4 },
  thief: { hp: 380, speed: 0, contact: 20, radius: 0.5 },
};

export type PowerId = 'rapid' | 'damage' | 'shield' | 'pierce';
export const POWERS: Record<PowerId, string> = {
  rapid: 'Fuoco rapido',
  damage: 'Colpi pesanti',
  shield: 'Scudo',
  pierce: 'Colpi perforanti',
};

export type LootSize = 'S' | 'M' | 'L';
export const LOOT_BONUS: Record<LootSize, number> = { S: 0.05, M: 0.1, L: 0.2 };
export const SAFE_BONUS = 0.3;

export type ObjectKind = 'chest' | 'cage' | 'power' | 'loot' | 'safe' | 'barrel' | 'barrier' | 'car' | 'fence' | 'medicine' | 'gate';
export const OBJECT_HP: Record<ObjectKind, number> = {
  chest: 170,
  cage: 120,
  power: 90,
  loot: 110, // sostituito dalla taglia
  safe: 300,
  barrel: 15,
  barrier: 90,
  car: Infinity,
  fence: Infinity,
  medicine: 900,
  gate: 700,
};
export const LOOT_HP: Record<LootSize, number> = { S: 40, M: 110, L: 230 };

/** Oggetti che si possono colpire (gli altri sono solo ostacoli da evitare). */
export const SHOOTABLE: Record<ObjectKind, boolean> = {
  chest: true, cage: true, power: true, loot: true, safe: true, barrel: true, barrier: true, car: false, fence: false, medicine: true, gate: true,
};

/** Danno al contatto con l'eroe (0 = l'oggetto si perde e basta). */
export const OBJECT_CONTACT: Record<ObjectKind, number> = {
  chest: 0, cage: 0, power: 0, loot: 0, safe: 0, barrel: 25, barrier: 20, car: 30, fence: 25, medicine: 0, gate: 0,
};

export const HERO = {
  hp: 100,
  dashCooldown: 9,
  dashTime: 0.9,
  companionHp: 30,
  companionDamage: 0.6, // frazione del danno dell'arma
};
