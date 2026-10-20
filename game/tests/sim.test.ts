import { describe, it, expect } from 'vitest';
import { RunSim } from '../src/m1/sim';
import { laneX, ZOMBIES } from '../src/m1/defs';
import { LEVELS } from '../src/m1/levels';
import { LevelDef, validateLevel } from '../src/m1/level';
import { playLevel } from '../src/m1/bots';

const STEP = 1 / 60;
const run = (sim: RunSim, seconds: number) => {
  for (let i = 0; i < seconds * 60 && !sim.over; i++) sim.step(STEP);
};
const empty = (extra: Partial<LevelDef> = {}): LevelDef => ({
  id: 1, name: 'prova', zone: 'Periferia', phase: 'build', length: 5000, speed: 6, intro: '', events: [],
  finale: { kind: 'wall', hp: 100, waveEvery: 2, waveSize: 2 }, expected: [{ z: 0, squad: 3, weapon: 'pistol' }], ...extra,
});

describe('M1 v2 — regole della Corsa', () => {
  it('è deterministica con lo stesso seme', () => {
    const a = new RunSim(LEVELS[2], { seed: 42 });
    const b = new RunSim(LEVELS[2], { seed: 42 });
    run(a, 30);
    run(b, 30);
    expect(a.kills).toBe(b.kills);
    expect(a.squad).toBe(b.squad);
    expect(a.playerZ).toBeCloseTo(b.playerZ, 6);
  });

  it('il cambio corsia resta entro i limiti e si completa in meno di 0,25 s', () => {
    const s = new RunSim(empty(), { seed: 1 });
    for (let i = 0; i < 3; i++) s.moveLane(-1);
    expect(s.playerLane).toBe(0);
    run(s, 0.25);
    expect(s.playerX).toBeCloseTo(laneX(0), 1);
  });

  it('un barile soldati abbattuto aggiunge esattamente i soldati scritti sopra', () => {
    const s = new RunSim(empty({ events: [{ z: 20, do: 'object', kind: 'troops', lane: 1, hp: 30, troops: 4 }] }), { seed: 1 });
    run(s, 6);
    expect(s.squad).toBe(3 + 4);
    expect(s.stats.gained).toBe(4);
  });

  it('un barile intatto toccato costa soldati (non si passa sopra gratis)', () => {
    const s = new RunSim(empty({ events: [{ z: 12, do: 'object', kind: 'troops', lane: 1, hp: 100000, troops: 4 }] }), { seed: 1 });
    run(s, 4);
    expect(s.squad).toBeLessThan(3);
  });

  it('la potenza di fuoco è soldati × danno dell’arma', () => {
    const s = new RunSim(empty(), { seed: 1 });
    expect(s.firepower).toBe(3 * 12);
    s.squad = 10;
    s.weapon = 'rifle';
    expect(s.firepower).toBe(320);
  });

  it('uno zombie che arriva alla squadra costa soldati pari al suo morso', () => {
    const s = new RunSim(empty({ events: [{ z: 9, do: 'zombie', kind: 'armored', lane: 1 }] }), { seed: 1, bonusSoldiers: 0 });
    s.squad = 1; // non riesce ad abbatterlo
    run(s, 4);
    expect(s.over).toBe(true);
    expect(s.status).toBe('lost');
    expect(ZOMBIES.armored.bite).toBeGreaterThan(1);
  });

  it('l’attacco aereo si carica con le uccisioni e si usa una volta', () => {
    const s = new RunSim(empty(), { seed: 1 });
    expect(s.strikeReady).toBe(false);
    s.strikeCharge = 1000;
    expect(s.strikeReady).toBe(true);
    s.airstrike();
    expect(s.strikeReady).toBe(false);
    expect(s.strikeLeft).toBeGreaterThan(0);
  });

  it('le stelle: arrivati, cassaforte, metà squadra', () => {
    const s = new RunSim(empty(), { seed: 1 });
    s.status = 'won';
    s.peakSquad = 40;
    s.squad = 20;
    s.safeOpened = true;
    expect(s.starFlags).toEqual([true, true, true]);
    s.squad = 19;
    expect(s.stars).toBe(2);
  });
});

describe('M1 v2 — livelli generati', () => {
  it('tutti i livelli superano la validazione', () => {
    for (const l of LEVELS) expect(validateLevel(l), `L${l.id}`).toEqual([]);
  });

  it('ci sono 10 livelli, il 5 e il 10 finiscono col capo', () => {
    expect(LEVELS.length).toBe(10);
    expect(LEVELS[4].finale.kind).toBe('boss');
    expect(LEVELS[9].finale.kind).toBe('boss');
  });
});

// misura con i giocatori simulati (docs/M1-CORSA.md §6): il bravo vince, chi gioca a caso perde quasi sempre
describe('M1 v2 — difficoltà misurata', () => {
  const SEEDS = [1, 2, 3, 4];
  for (const l of LEVELS) {
    it(`L${l.id} ${l.name}: bravo vince, caso perde, partita 45–150 s, folla visibile`, () => {
      const bravo = SEEDS.map((s) => playLevel(l, 'bravo', s));
      const caso = SEEDS.map((s) => playLevel(l, 'caso', s));
      expect(bravo.filter((r) => r.won).length).toBeGreaterThanOrEqual(3);
      expect(caso.filter((r) => r.won).length).toBeLessThanOrEqual(1);
      for (const r of bravo.filter((r) => r.won)) {
        expect(r.time).toBeGreaterThanOrEqual(45);
        expect(r.time).toBeLessThanOrEqual(150);
        expect(r.avgVisible).toBeGreaterThanOrEqual(15);
      }
    }, 60000);
  }
});
