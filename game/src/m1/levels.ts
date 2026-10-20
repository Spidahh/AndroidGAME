// Piani dei 10 livelli di M1 v2: sequenze di scene progettate (docs/M1-CORSA.md §10.5–10.6).
// Le quantità le calcola il generatore; la taratura per livello è in tuning.json (strumento tools/tune).
import { generate, LevelPlan } from './gen';
import type { LevelDef } from './level';
import tuning from './tuning.json';

export const PLANS: LevelPlan[] = [
  {
    id: 1, name: 'Prima uscita', zone: 'Periferia', phase: 'build', speed: 6, finale: 'wall',
    intro: 'Distruggi i barili per prenderli: i soldati si uniscono alla squadra.',
    hints: { 14: 'Scorri per cambiare corsia. La squadra spara da sola.', 40: 'Un barile intatto sulla tua strada ti costa soldati: distruggilo o evitalo.' },
    scenes: [{ type: 'opening' }, { type: 'offer', problems: ['mass'] }, { type: 'wave', problems: ['mass'] }, { type: 'safe', problems: ['mass'] }, { type: 'offer', problems: ['mass'] }, { type: 'wave', problems: ['mass'] }],
  },
  {
    id: 2, name: 'Il viale', zone: 'Periferia', phase: 'maintain', speed: 6.2, finale: 'wall',
    intro: 'I Veloci cambiano corsia per raggiungerti: la freccia arancione li annuncia.',
    scenes: [{ type: 'opening' }, { type: 'offer', problems: ['speed'] }, { type: 'wave', problems: ['mass', 'speed'] }, { type: 'safe', problems: ['speed'] }, { type: 'offer', problems: ['mass', 'zone'] }, { type: 'wave', problems: ['speed', 'zone'], freeze: true }],
  },
  {
    id: 3, name: 'Lamiere', zone: 'Periferia', phase: 'precision', speed: 6.2, finale: 'wall',
    intro: 'Auto e seghe chiudono le corsie: spostati prima, non dopo.',
    scenes: [{ type: 'opening' }, { type: 'offer', problems: ['mass'] }, { type: 'gauntlet', traps: true }, { type: 'pack' }, { type: 'safe', problems: ['dogs'] }, { type: 'offer', problems: ['speed', 'zone'] }, { type: 'gauntlet', traps: true }],
  },
  {
    id: 4, name: 'Il portone', zone: 'Centro', phase: 'pressure', speed: 6.4, finale: 'wall',
    intro: 'Abbatti il portone a numero: dietro ci sono molti soldati.',
    scenes: [{ type: 'opening' }, { type: 'offer', problems: ['armor'] }, { type: 'gate', problems: ['speed'] }, { type: 'wave', problems: ['armor', 'zone'] }, { type: 'safe', problems: ['armor'] }, { type: 'gate', problems: ['dogs'] }, { type: 'wave', problems: ['mass', 'speed'], freeze: true }],
  },
  {
    id: 5, name: 'Il Bruto', zone: 'Centro', phase: 'wall', speed: 6.4, finale: 'boss',
    intro: 'In fondo alla strada c’è il capo dell’orda. Arriva con la squadra più grande che puoi.',
    scenes: [{ type: 'opening' }, { type: 'offer', problems: ['speed'] }, { type: 'gate', problems: ['armor'] }, { type: 'wave', problems: ['mass', 'dogs'] }, { type: 'safe', problems: ['zone'] }, { type: 'offer', problems: ['armor', 'speed'] }, { type: 'wave', problems: ['mass', 'zone'], freeze: true }],
  },
  {
    id: 6, name: 'Corazze', zone: 'Centro', phase: 'build', speed: 6.4, finale: 'wall',
    intro: 'Gli Scudati fermano i proiettili: servono fuoco o granate.',
    scenes: [{ type: 'opening' }, { type: 'special', weapon: 'flame' }, { type: 'offer', problems: ['shield'] }, { type: 'wave', problems: ['mass', 'shield'] }, { type: 'safe', problems: ['shield'] }, { type: 'gate', problems: ['speed'] }, { type: 'wave', problems: ['shield', 'zone'] }],
  },
  {
    id: 7, name: 'Tetti', zone: 'Porto', phase: 'maintain', speed: 6.6, finale: 'wall',
    intro: 'Zombie dai tetti: guarda le ombre a terra.',
    scenes: [{ type: 'opening' }, { type: 'offer', problems: ['speed'] }, { type: 'wave', problems: ['mass', 'surprise'] }, { type: 'pack' }, { type: 'safe', problems: ['surprise'] }, { type: 'special', weapon: 'grenade' }, { type: 'wave', problems: ['shield', 'surprise'], freeze: true }],
  },
  {
    id: 8, name: 'Giganti', zone: 'Porto', phase: 'precision', speed: 6.6, finale: 'wall',
    intro: 'I Giganti si portano via otto soldati: abbattili da lontano o cambia corsia.',
    scenes: [{ type: 'opening' }, { type: 'offer', problems: ['giant'] }, { type: 'gauntlet', traps: true }, { type: 'wave', problems: ['giant', 'speed'] }, { type: 'safe', problems: ['giant'] }, { type: 'gate', problems: ['armor'] }, { type: 'gauntlet', traps: false }],
  },
  {
    id: 9, name: 'Il molo', zone: 'Porto', phase: 'pressure', speed: 6.8, finale: 'wall',
    intro: 'L’orda più grande finora. Ogni barile conta.',
    scenes: [{ type: 'opening' }, { type: 'offer', problems: ['dogs'] }, { type: 'gate', problems: ['giant'] }, { type: 'wave', problems: ['shield', 'speed'] }, { type: 'pack' }, { type: 'safe', problems: ['armor', 'zone'] }, { type: 'offer', problems: ['giant', 'speed'] }, { type: 'wave', problems: ['mass', 'surprise'], freeze: true }],
  },
  {
    id: 10, name: 'Il Colosso', zone: 'Porto', phase: 'wall', speed: 6.8, finale: 'boss',
    intro: 'Il Colosso blocca il porto.',
    scenes: [{ type: 'opening' }, { type: 'offer', problems: ['speed'] }, { type: 'gate', problems: ['giant'] }, { type: 'wave', problems: ['shield', 'dogs'] }, { type: 'special', weapon: 'grenade' }, { type: 'safe', problems: ['giant'] }, { type: 'offer', problems: ['armor', 'zone'] }, { type: 'wave', problems: ['mass', 'surprise', 'speed'], freeze: true }],
  },
];

const T = tuning as Record<string, number>;
export const LEVELS: LevelDef[] = PLANS.map((p) => generate(p, T[String(p.id)] ?? 1));
