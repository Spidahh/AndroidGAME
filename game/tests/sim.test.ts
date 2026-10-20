import { describe, it, expect } from 'vitest';
import { RunSim, laneX, LANE_COUNT } from '../src/m1/sim';

const STEP = 1 / 60;
const run = (sim: RunSim, seconds: number) => {
  for (let i = 0; i < seconds * 60; i++) sim.step(STEP);
};

describe('M1 — simulazione della Corsa', () => {
  it('è deterministica con lo stesso seme', () => {
    const a = new RunSim({ targetZombies: 30, seed: 42 });
    const b = new RunSim({ targetZombies: 30, seed: 42 });
    run(a, 20);
    run(b, 20);
    expect(a.kills).toBe(b.kills);
    expect(a.hp).toBe(b.hp);
    expect(a.playerZ).toBeCloseTo(b.playerZ, 6);
  });

  it('il cambio corsia resta entro i limiti e raggiunge la corsia in meno di 0,2 s', () => {
    const s = new RunSim({ targetZombies: 0, seed: 1 });
    s.moveLane(-1);
    s.moveLane(-1);
    s.moveLane(-1);
    expect(s.playerLane).toBe(0);
    run(s, 0.2);
    expect(s.playerX).toBeCloseTo(laneX(0), 1);
    for (let i = 0; i < 5; i++) s.moveLane(1);
    expect(s.playerLane).toBe(LANE_COUNT - 1);
  });

  it('aprire una cassa sparando dà la sua arma', () => {
    const s = new RunSim({ targetZombies: 0, seed: 3, invulnerable: true });
    s.objects.length = 0;
    s.objects.push({ id: 999, kind: 'chest', lane: 1, z: 12, hp: 30, maxHp: 30, alive: true, hitAt: -1, reward: 'shotgun' });
    run(s, 2);
    expect(s.weapon).toBe('shotgun');
  });

  it('il barile esplode e colpisce le corsie vicine', () => {
    const s = new RunSim({ targetZombies: 0, seed: 4, invulnerable: true });
    s.objects.length = 0;
    s.zombies.length = 0;
    s.objects.push({ id: 500, kind: 'barrel', lane: 1, z: 14, hp: 10, maxHp: 10, alive: true, hitAt: -1 });
    s.zombies.push({ id: 501, kind: 'walker', lane: 0, x: laneX(0), z: 14.5, hp: 30, maxHp: 30, alive: true, deadAt: 0, switchAt: -1, switchTo: 0, hitAt: -1 });
    s.zombies.push({ id: 502, kind: 'walker', lane: 2, x: laneX(2), z: 13.5, hp: 30, maxHp: 30, alive: true, deadAt: 0, switchAt: -1, switchTo: 2, hitAt: -1 });
    run(s, 1);
    expect(s.zombies.filter((z) => z.id > 500).every((z) => !z.alive)).toBe(true);
  });

  it('il colpo di precisione attraversa la fila, la pistola no', () => {
    const make = (weapon: 'rifle' | 'pistol') => {
      const s = new RunSim({ targetZombies: 0, seed: 5, invulnerable: true });
      s.objects.length = 0;
      s.weapon = weapon;
      s.zombies.length = 0;
      for (let i = 0; i < 3; i++) s.zombies.push({ id: 700 + i, kind: 'walker', lane: 1, x: laneX(1), z: 20 + i, hp: 1, maxHp: 1, alive: true, deadAt: 0, switchAt: -1, switchTo: 1, hitAt: -1 });
      // un solo colpo: subito dopo il primo sparo si ferma il fuoco
      s.step(STEP);
      const shots = s.bullets.length;
      s.bullets.splice(1);
      for (let i = 0; i < 40; i++) {
        (s as unknown as { fireCooldown: number }).fireCooldown = 99;
        s.step(STEP);
      }
      return { shots, dead: s.zombies.filter((z) => !z.alive).length };
    };
    expect(make('rifle').dead).toBe(3);
    expect(make('pistol').dead).toBe(1);
  });

  it('a 40 zombie la simulazione di 60 s resta veloce (< 300 ms)', () => {
    const s = new RunSim({ targetZombies: 40, seed: 9, invulnerable: true });
    const t0 = performance.now();
    run(s, 60);
    expect(performance.now() - t0).toBeLessThan(300);
  });
});
