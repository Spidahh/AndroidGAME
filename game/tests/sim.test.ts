import { describe, it, expect } from 'vitest';
import { RunSim } from '../src/m1/sim';
import { laneX, LANE_COUNT } from '../src/m1/defs';
import { LEVELS } from '../src/m1/levels';
import { LevelDef, validateLevel } from '../src/m1/level';
import { botPlay } from './bot';

const STEP = 1 / 60;
const run = (sim: RunSim, seconds: number) => {
  for (let i = 0; i < seconds * 60; i++) sim.step(STEP);
};
const empty = (extra: Partial<LevelDef> = {}): LevelDef => ({ id: 99, name: 'prova', type: 'fuga', zone: 'Periferia', length: 1e6, speed: [6, 6], intro: '', events: [], finale: { kind: 'none' }, ...extra });

describe('M1 — regole della Corsa', () => {
  it('è deterministica con lo stesso seme', () => {
    const a = new RunSim(LEVELS[2], { seed: 42 });
    const b = new RunSim(LEVELS[2], { seed: 42 });
    run(a, 30);
    run(b, 30);
    expect(a.kills).toBe(b.kills);
    expect(a.hp).toBe(b.hp);
    expect(a.playerZ).toBeCloseTo(b.playerZ, 6);
  });

  it('il cambio corsia resta entro i limiti e si completa in meno di 0,2 s', () => {
    const s = new RunSim(empty(), { seed: 1 });
    for (let i = 0; i < 3; i++) s.moveLane(-1);
    expect(s.playerLane).toBe(0);
    run(s, 0.2);
    expect(s.playerX).toBeCloseTo(laneX(0), 1);
    for (let i = 0; i < 5; i++) s.moveLane(1);
    expect(s.playerLane).toBe(LANE_COUNT - 1);
  });

  it('aprire una cassa sparando dà la sua arma', () => {
    const s = new RunSim(empty({ events: [{ z: 14, do: 'object', kind: 'chest', lane: 1, weapon: 'shotgun', hp: 30 }] }), { seed: 3 });
    run(s, 2);
    expect(s.weapon).toBe('shotgun');
  });

  it('aprire una gabbia aggiunge un compagno nella corsia accanto', () => {
    const s = new RunSim(empty({ events: [{ z: 14, do: 'object', kind: 'cage', lane: 1, hp: 20 }] }), { seed: 3 });
    run(s, 2.5);
    expect(s.companions.filter((c) => c.alive).length).toBe(1);
    expect(s.companions[0].lane).not.toBe(s.playerLane);
  });

  it('il barile esplode e colpisce le corsie vicine', () => {
    const s = new RunSim(
      empty({
        events: [
          { z: 14, do: 'object', kind: 'barrel', lane: 1 },
          { z: 14.5, do: 'zombie', kind: 'walker', lane: 0 },
          { z: 13.6, do: 'zombie', kind: 'walker', lane: 2 },
        ],
      }),
      { seed: 4, invulnerable: true },
    );
    run(s, 1.5);
    expect(s.kills).toBeGreaterThanOrEqual(2);
  });

  it('lo Scudato incassa i colpi frontali della pistola ma non il fuoco', () => {
    const mk = (weapon: 'pistol' | 'flame') => {
      const s = new RunSim(empty({ events: [{ z: 9, do: 'zombie', kind: 'shield', lane: 1 }] }), { seed: 5, invulnerable: true });
      s.weapon = weapon;
      run(s, 0.8);
      return s.zombies.find((z) => z.kind === 'shield')!;
    };
    expect(mk('pistol').hp).toBeGreaterThan(mk('flame').hp);
  });

  it('il colpo di precisione attraversa la fila', () => {
    const s = new RunSim(empty({ events: [0, 1, 2].map((i) => ({ z: 20 + i, do: 'zombie' as const, kind: 'crawler' as const, lane: 1 })) }), { seed: 6, invulnerable: true });
    s.weapon = 'rifle';
    run(s, 0.6);
    expect(s.kills).toBe(3);
  });

  it('il Gonfio esplode quando muore e ferisce gli zombie vicini', () => {
    const s = new RunSim(
      empty({
        events: [
          { z: 16, do: 'zombie', kind: 'bloater', lane: 1 },
          { z: 16.5, do: 'zombie', kind: 'walker', lane: 0 },
        ],
      }),
      { seed: 7, invulnerable: true },
    );
    s.weapon = 'rifle';
    run(s, 1.5);
    expect(s.kills).toBe(2);
  });

  it('lo scatto rende invulnerabili per la sua durata', () => {
    const s = new RunSim(empty({ events: [{ z: 8, do: 'object', kind: 'car', lane: 1 }] }), { seed: 8 });
    s.weapon = 'pistol';
    run(s, 0.8);
    s.dash();
    run(s, 0.8);
    expect(s.hp).toBe(100);
  });

  it('a 40 zombie la simulazione di 60 s resta veloce (< 400 ms)', () => {
    const s = new RunSim(empty(), { seed: 9, invulnerable: true, stressZombies: 40 });
    const t0 = performance.now();
    run(s, 60);
    expect(performance.now() - t0).toBeLessThan(400);
  });
});

describe('M1 — livelli', () => {
  for (const l of LEVELS) {
    it(`livello ${l.id} "${l.name}": dati coerenti`, () => {
      expect(validateLevel(l)).toEqual([]);
    });
  }
  for (const l of LEVELS) {
    it(`livello ${l.id} "${l.name}": completabile dal giocatore automatico partendo dalla pistola`, () => {
      const results = [11, 22, 33, 44, 55].map((seed) => botPlay(l, seed));
      const wins = results.filter((r) => r.status === 'won');
      const durations = wins.map((r) => Math.round(r.time));
      // informazione utile per bilanciare: durata, stelle, cause di sconfitta
      console.log(`L${l.id} ${l.name}: vittorie ${wins.length}/5, durate ${durations.join('/')} s, stelle ${wins.map((r) => r.stars).join('/')}, sconfitte: ${results.filter((r) => r.status !== 'won').map((r) => r.endReason).join('; ')}`);
      expect(wins.length).toBeGreaterThanOrEqual(1);
    });
  }
});
