// Definizioni di M1 "La Corsa" v2 (docs/M1-CORSA.md §2–5). Solo dati.
// Modello copiato da Last War Frontline / Last Z: la squadra è vita e potenza di fuoco.

export const LANE_COUNT = 3;
export const LANE_W = 2.6;
export const laneX = (lane: number) => (lane - (LANE_COUNT - 1) / 2) * LANE_W;
/** distanza alla quale i nemici diventano bersagliabili (portata standard) */
export const ENGAGE_RANGE = 30;

export type WeaponId = 'pistol' | 'smg' | 'rifle' | 'heavy' | 'flame' | 'grenade';
export interface WeaponDef {
  id: WeaponId;
  name: string;
  /** danno al secondo di UN soldato (§4) */
  dps: number;
  /** raffiche al secondo (solo resa e ritmo) */
  rate: number;
  range: number;
  /** nemici attraversati oltre al primo */
  pierce: number;
  speed: number;
  /** raggio d'esplosione all'impatto */
  blast: number;
  /** ignora la corazza frontale degli Scudati */
  armorPiercing: boolean;
  /** nome della mesh dell'arma nel modello del soldato */
  mesh: string;
}

/** Livelli d'arma della squadra: i barili arma fanno salire di un livello (§2 punto 6). */
export const WEAPON_LADDER: WeaponId[] = ['pistol', 'smg', 'rifle', 'heavy'];
export const WEAPONS: Record<WeaponId, WeaponDef> = {
  pistol: { id: 'pistol', name: 'Pistole', dps: 12, rate: 3, range: 30, pierce: 0, speed: 46, blast: 0, armorPiercing: false, mesh: 'Pistol' },
  smg: { id: 'smg', name: 'Mitra', dps: 20, rate: 7, range: 30, pierce: 0, speed: 50, blast: 0, armorPiercing: false, mesh: 'SMG' },
  rifle: { id: 'rifle', name: 'Fucili d’assalto', dps: 32, rate: 6, range: 34, pierce: 1, speed: 60, blast: 0, armorPiercing: false, mesh: 'AK' },
  heavy: { id: 'heavy', name: 'Mitragliatrici pesanti', dps: 50, rate: 8, range: 36, pierce: 2, speed: 64, blast: 0, armorPiercing: true, mesh: 'Sniper_2' },
  flame: { id: 'flame', name: 'Lanciafiamme', dps: 45, rate: 10, range: 12, pierce: 99, speed: 26, blast: 0, armorPiercing: true, mesh: 'ShortCannon' },
  grenade: { id: 'grenade', name: 'Lanciagranate', dps: 40, rate: 1.4, range: 28, pierce: 0, speed: 28, blast: 2.8, armorPiercing: true, mesh: 'GrenadeLauncher' },
};

export type ZombieKind = 'walker' | 'runner' | 'dog' | 'armored' | 'giant' | 'bloater' | 'spitter' | 'shield' | 'boss';
export interface ZombieDef {
  name: string;
  /** resistenza al livello 1 (§3) */
  hp: number;
  /** velocità verso la squadra, m/s */
  speed: number;
  /** soldati persi se raggiunge la squadra */
  bite: number;
  radius: number;
  /** punta la corsia della squadra cambiando corsia con un segnale */
  seeks: boolean;
}
export const ZOMBIES: Record<ZombieKind, ZombieDef> = {
  walker: { name: 'Zombie', hp: 11, speed: 1.8, bite: 1, radius: 0.4, seeks: false },
  runner: { name: 'Veloce', hp: 9, speed: 4.0, bite: 1, radius: 0.4, seeks: true },
  dog: { name: 'Cane', hp: 16, speed: 5.5, bite: 2, radius: 0.45, seeks: true },
  armored: { name: 'Corazzato', hp: 120, speed: 1.4, bite: 3, radius: 0.55, seeks: false },
  giant: { name: 'Gigante', hp: 600, speed: 1.0, bite: 8, radius: 0.9, seeks: false },
  bloater: { name: 'Gonfio', hp: 40, speed: 1.2, bite: 3, radius: 0.6, seeks: false },
  spitter: { name: 'Sputatore', hp: 60, speed: 0, bite: 2, radius: 0.45, seeks: false },
  shield: { name: 'Scudato', hp: 70, speed: 1.3, bite: 2, radius: 0.5, seeks: false },
  boss: { name: 'Capo', hp: 12000, speed: 0, bite: 0, radius: 1.8, seeks: false },
};

export type ObjectKind = 'troops' | 'weapon' | 'freeze' | 'explosive' | 'gate' | 'safe' | 'car' | 'trap' | 'wall';
export interface ObjectDef {
  name: string;
  shootable: boolean;
  /** soldati persi se la squadra ci arriva sopra intatto (§2 punto 5c) */
  contactLoss: number;
}
export const OBJECTS: Record<ObjectKind, ObjectDef> = {
  troops: { name: 'Barile soldati', shootable: true, contactLoss: 3 },
  weapon: { name: 'Barile arma', shootable: true, contactLoss: 3 },
  freeze: { name: 'Barile gelo', shootable: true, contactLoss: 3 },
  explosive: { name: 'Barile esplosivo', shootable: true, contactLoss: 3 },
  gate: { name: 'Portone', shootable: true, contactLoss: 5 },
  safe: { name: 'Cassaforte', shootable: true, contactLoss: 0 },
  car: { name: 'Auto', shootable: false, contactLoss: 5 },
  trap: { name: 'Recinzione elettrica', shootable: false, contactLoss: 4 },
  wall: { name: 'Muro', shootable: true, contactLoss: 0 },
};

export const SQUAD = {
  /** soldati iniziali (+ potenziamenti della città, §7) */
  start: 3,
  max: 200,
  /** soldati disegnati al massimo; oltre cresce solo il numero */
  drawn: 60,
};

export const AIRSTRIKE = {
  /** uccisioni per caricare la barra */
  killsToCharge: 45,
  duration: 2,
  /** danno al secondo su tutta la corsia davanti per 30 m */
  dps: 900,
};

export const EXPLOSION = {
  explosiveRadius: 3.4,
  explosiveDamage: 300,
  bloaterRadius: 3,
  bloaterDamage: 120,
  /** soldati persi se la squadra è dentro l'esplosione */
  squadLoss: 3,
};

/** resistenza dei nemici per livello (§3): crescita bassa, la difficoltà viene da quantità e tipi */
export const hpScale = (levelId: number) => 1 + 0.08 * Math.max(0, levelId - 1);
