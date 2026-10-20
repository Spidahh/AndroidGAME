// Profilo locale del giocatore (versione 1). Il salvataggio online arriverà nella fase dei servizi.
const KEY = 'holdout.profile.v1';

export interface LevelRecord {
  stars: number;
  starFlags: [boolean, boolean, boolean]; // quali stelle sono state prese almeno una volta
  completions: number;
}

export interface Profile {
  version: 1;
  materials: number;
  food: number;
  levels: Record<number, LevelRecord>;
  settings: { sound: boolean; vibration: boolean };
  tutorialSeen: boolean;
}

function fresh(): Profile {
  return { version: 1, materials: 0, food: 0, levels: {}, settings: { sound: true, vibration: true }, tutorialSeen: false };
}

export function loadProfile(): Profile {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return fresh();
    const p = JSON.parse(raw) as Profile;
    if (p.version !== 1) return fresh();
    return { ...fresh(), ...p, settings: { ...fresh().settings, ...p.settings } };
  } catch {
    return fresh();
  }
}

export function saveProfile(p: Profile) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* archiviazione non disponibile (navigazione privata): il gioco continua */
  }
}

/** Ricompensa del livello secondo CITTA §6: B × [1 + 0,03 (n−1)], B = 100 Materiali + 50 Viveri. */
export function levelReward(levelId: number, firstTime: boolean, lootBonus: number, newStars: number) {
  const base = 1 + 0.03 * (levelId - 1);
  const mult = (firstTime ? 1 : 0.6) * (1 + lootBonus + 0.1 * newStars);
  return { materials: Math.floor(100 * base * mult), food: Math.floor(50 * base * mult) };
}

export function recordResult(p: Profile, levelId: number, won: boolean, flags: [boolean, boolean, boolean], lootBonus: number) {
  const prev = p.levels[levelId] ?? { stars: 0, starFlags: [false, false, false] as [boolean, boolean, boolean], completions: 0 };
  if (!won) return { reward: { materials: 0, food: 0 }, newStars: 0, record: prev };
  const merged = prev.starFlags.map((f, i) => f || flags[i]) as [boolean, boolean, boolean];
  const newStars = merged.filter(Boolean).length - prev.starFlags.filter(Boolean).length;
  const reward = levelReward(levelId, prev.completions === 0, lootBonus, newStars);
  const record: LevelRecord = { stars: merged.filter(Boolean).length, starFlags: merged, completions: prev.completions + 1 };
  p.levels[levelId] = record;
  p.materials += reward.materials;
  p.food += reward.food;
  saveProfile(p);
  return { reward, newStars, record };
}
