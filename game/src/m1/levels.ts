// I primi 10 livelli di M1, composti a scene. Ogni scena mette davanti una scelta.
import { LevelDef, Script } from './level';
import { WeaponId } from './defs';

// ---------- scene riutilizzabili ----------

/** Partenza tranquilla: pochi zombie, una cassa di bottino facile. */
function warmup(s: Script) {
  s.gap(14).hint(0, 'Scorri per cambiare corsia: spari sempre davanti a te');
  s.zombie(10, 1).zombie(16, 0).zombie(20, 2).loot(26, 1, 'S');
  s.gap(34);
}

/** Cassa arma in una corsia con l'orda che arriva proprio lì; gabbia dall'altra parte dietro una barricata. */
function weaponOrCage(s: Script, weapon: WeaponId, side: 0 | 2) {
  const other = side === 0 ? 2 : 0;
  s.chest(14, side, weapon).horde(26, [side], 3 + Math.floor(s.d / 3));
  s.object(12, other, 'barrier').object(18, other, 'cage');
  s.zombie(22, 1).zombie(30, 1, s.d > 3 ? 'runner' : 'walker');
  s.gap(42);
}

/** Il barile accanto alla cassa: chi lo nota la apre all'istante. */
function barrelShortcut(s: Script, weapon: WeaponId) {
  s.chest(16, 0, weapon).object(16, 1, 'barrel').horde(20, [0, 1], 2);
  s.loot(18, 2, 'M').zombie(24, 2, 'walker');
  s.gap(36);
}

/** Corridori che cambiano corsia, con un potenziamento in mezzo. */
function runners(s: Script) {
  const n = 3 + Math.floor(s.d / 2);
  for (let i = 0; i < n; i++) s.zombie(12 + i * 6, i % 3, 'runner');
  s.power(20, 1, s.d % 2 ? 'rapid' : 'damage');
  s.gap(14 + n * 6);
}

/** Muro di Scudati con un varco: fucile a pompa da lato, granate o precisione per sfondare. */
function shieldWall(s: Script) {
  s.horde(18, [0, 2], 2, 'shield', 1.8).zombie(18, 1, 'walker').zombie(22, 1, 'walker');
  s.object(10, 1, 'barrel');
  s.gap(34);
}

/** Bruto al centro, auto ai lati: lanciafiamme o barile, oppure schivarlo. */
function brute(s: Script) {
  s.object(10, 0, 'car').object(10, 2, 'car').zombie(20, 1, 'brute');
  s.object(14, 1, 'barrel').loot(30, 0, 'M');
  s.gap(36);
}

/** Gonfi in mezzo all'orda: abbatterli lontano, e usarli come bombe. */
function bloaters(s: Script) {
  s.horde(16, [0, 1, 2], 2, 'walker', 2).zombie(15, 1, 'bloater').zombie(21, 0, 'bloater');
  s.loot(28, 2, 'M');
  s.gap(36);
}

/** Sputatori in fondo alla strada che colpiscono le corsie: leggere il segnale a terra. */
function spitters(s: Script) {
  s.zombie(30, 0, 'spitter').zombie(30, 2, 'spitter').zombie(12, 1).zombie(18, 1);
  s.power(22, 1, 'shield');
  s.gap(40);
}

/** Recinzioni elettriche a tempo su due corsie, bottino nella terza. */
function fences(s: Script) {
  s.fence(12, 0, 2.6, 0).fence(12, 1, 2.6, 1.3).loot(12, 2, 'L').zombie(20, 2).zombie(24, 2);
  s.fence(30, 1, 2.2, 0.5).fence(30, 2, 2.2, 1.6).object(30, 0, 'barrel').zombie(34, 0);
  s.gap(42);
}

/** Zombie che cadono dai tetti: si vede l'ombra prima. */
function roofDrops(s: Script) {
  s.drop(12, 1).drop(16, 0).drop(20, 2, 'brute').drop(26, 1).loot(30, 1, 'S');
  s.gap(36);
}

/** La cassaforte: tanta resistenza, protetta dall'orda. Serve un'arma forte o un barile. */
function safe(s: Script, lane: number) {
  s.object(18, lane, 'safe').horde(26, [lane], 2 + Math.floor(s.d / 2));
  s.object(16, lane === 1 ? 0 : 1, 'barrel');
  s.zombie(20, lane === 2 ? 0 : 2, 'runner');
  s.gap(40);
}

/** Seconda gabbia, in mezzo a due pericoli. */
function cageBetween(s: Script) {
  s.object(16, 1, 'cage').object(16, 0, 'car').horde(22, [2], 2).zombie(26, 1, 'runner');
  s.gap(34);
}

function rest(s: Script, m = 24) {
  s.zombie(m / 2, 1).gap(m);
}

function build(d: number, f: (s: Script) => void) {
  const s = new Script(d);
  f(s);
  return { events: s.events, length: s.z + 20 };
}

// ---------- i livelli ----------

type Scene = (s: Script) => void;
/** Compone un livello: scene in ordine, con un tratto di respiro tra l'una e l'altra. */
function compose(d: number, scenes: Scene[]) {
  return build(d, (s) => {
    warmup(s);
    scenes.forEach((sc, i) => {
      sc(s);
      if (i < scenes.length - 1) rest(s, 18 + (i % 3) * 6);
    });
  });
}
const W = (w: WeaponId, side: 0 | 2): Scene => (s) => weaponOrCage(s, w, side);
const B = (w: WeaponId): Scene => (s) => barrelShortcut(s, w);
const SAFE = (lane: number): Scene => (s) => safe(s, lane);

const L1 = compose(1, [W('smg', 0), B('shotgun'), runners, roofDrops, B('smg'), SAFE(1), W('shotgun', 2), cageBetween, runners]);
const L2 = compose(2, [runners, W('shotgun', 2), B('smg'), roofDrops, runners, SAFE(0), W('smg', 0), brute, B('shotgun')]);
const L3 = compose(3, [W('shotgun', 0), shieldWall, B('rifle'), runners, shieldWall, SAFE(2), cageBetween, roofDrops, shieldWall]);
const L4 = compose(4, [B('grenade'), runners, W('smg', 2), roofDrops, SAFE(1), shieldWall, runners, cageBetween, B('shotgun')]);
const L5 = compose(5, [W('rifle', 0), brute, runners, SAFE(2), B('grenade'), shieldWall, roofDrops, cageBetween, runners]);
const L6 = compose(6, [W('shotgun', 2), spitters, shieldWall, SAFE(0), roofDrops, runners, B('grenade'), cageBetween, spitters]);
const L7 = compose(7, [B('flame'), bloaters, fences, W('grenade', 0), SAFE(1), bloaters, runners, cageBetween, fences, bloaters]);
const L8 = compose(8, [runners, W('rifle', 2), fences, SAFE(2), runners, B('smg'), spitters, cageBetween, roofDrops, runners]);
const L9 = compose(9, [W('flame', 0), bloaters, spitters, SAFE(1), fences, cageBetween, B('grenade'), bloaters, shieldWall, spitters]);
const L10 = compose(10, [W('grenade', 2), shieldWall, brute, fences, SAFE(0), spitters, B('rifle'), bloaters, cageBetween, brute, runners]);

export const LEVELS: LevelDef[] = [
  { id: 1, name: 'Prima uscita', type: 'fuga', zone: 'Periferia', speed: [6.2, 7.2], intro: 'Raggiungi il fondo della strada e sfonda il blocco.', ...L1, finale: { kind: 'gate', hp: 350, hordeSeconds: 15 } },
  { id: 2, name: 'Il viale', type: 'fuga', zone: 'Periferia', speed: [6.4, 7.4], intro: 'Attento ai corridori: il triangolo arancione dice dove vanno.', ...L2, finale: { kind: 'gate', hp: 400, hordeSeconds: 15 } },
  { id: 3, name: 'Corazze', type: 'fuga', zone: 'Periferia', speed: [6.4, 7.4], intro: 'Gli Scudati si colpiscono di lato, col fuoco o con le esplosioni.', ...L3, finale: { kind: 'gate', hp: 450, hordeSeconds: 15 } },
  { id: 4, name: 'Le medicine', type: 'recupero', zone: 'Periferia', speed: [6.4, 7.6], intro: 'Il carrello delle medicine scappa tra le corsie: aprilo prima che sparisca.', ...L4, medicine: { z: 0, hp: 420, seconds: 17 }, finale: { kind: 'none' } },
  { id: 5, name: 'Il Bruto', type: 'fuga', zone: 'Centro', speed: [6.6, 7.6], intro: 'In fondo alla strada ti aspetta il capo dell’orda.', ...L5, finale: { kind: 'boss', hp: 1500 } },
  { id: 6, name: 'Il blindato', type: 'scorta', zone: 'Centro', speed: [6.4, 7.4], intro: 'Proteggi il blindato: gli zombie nella sua corsia lo danneggiano.', ...L6, escort: { hp: 320 }, finale: { kind: 'gate', hp: 550, hordeSeconds: 15 } },
  { id: 7, name: 'Fiamme', type: 'fuga', zone: 'Centro', speed: [6.6, 7.8], intro: 'I Gonfi esplodono: abbattili lontano, o falli scoppiare sugli altri.', ...L7, finale: { kind: 'gate', hp: 600, hordeSeconds: 15 } },
  { id: 8, name: 'Il ladro', type: 'inseguimento', zone: 'Centro', speed: [6.8, 8], intro: 'Uno zombie è scappato con le scorte: abbattilo prima della fine della strada.', ...L8, thief: { hp: 1500, lead: 22 }, finale: { kind: 'none' } },
  { id: 9, name: 'Il ponte', type: 'recupero', zone: 'Porto', speed: [6.8, 8], intro: 'Le medicine sono sul ponte, in mezzo ai Gonfi.', ...L9, medicine: { z: 0, hp: 480, seconds: 18 }, finale: { kind: 'gate', hp: 650, hordeSeconds: 15 } },
  { id: 10, name: 'Il Colosso', type: 'fuga', zone: 'Porto', speed: [7, 8.2], intro: 'Il Colosso blocca il porto. Raccogli tutto quello che puoi.', ...L10, finale: { kind: 'boss', hp: 2600 } },
];

// il carrello delle medicine parte a metà livello
for (const l of LEVELS) if (l.medicine) l.medicine.z = Math.round(l.length * 0.55);
