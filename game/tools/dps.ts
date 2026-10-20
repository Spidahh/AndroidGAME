// Verifica: danno reale della squadra contro un'orda ferma, confrontato con la formula soldati × DPS.
import { RunSim } from '../src/m1/sim';
import { WEAPONS, WeaponId } from '../src/m1/defs';
import type { LevelDef } from '../src/m1/level';
for (const weapon of ['pistol', 'smg', 'rifle', 'heavy', 'flame', 'grenade'] as WeaponId[]) {
  for (const squad of [5, 20, 60]) {
    const events = Array.from({ length: 1500 }, (_, i) => ({ z: 14 + (i % 60) * 0.2, do: 'zombie' as const, kind: 'walker' as const, lane: 1, dx: 0 }));
    const level: LevelDef = { id: 1, name: 't', zone: 'Periferia', phase: 'build', length: 1e6, speed: 0, intro: '', events, finale: { kind: 'boss', hp: 1e9 }, expected: [] };
    const sim = new RunSim(level, { seed: 1, invulnerable: true });
    sim.squad = squad;
    sim.weapon = weapon;
    // zombie fermi: velocità zero per misurare solo il fuoco
    const t0 = 0.5;
    for (let i = 0; i < 30; i++) sim.step(1 / 60);
    for (const z of sim.zombies) z.z = Math.max(z.z, 8);
    const hp0 = sim.zombies.reduce((a, z) => a + Math.max(0, z.hp), 0);
    let t = 0;
    for (let i = 0; i < 180; i++) {
      for (const z of sim.zombies) z.z = Math.max(8, z.z); // tenuti fermi
      sim.step(1 / 60);
      t += 1 / 60;
    }
    const hp1 = sim.zombies.filter((z) => z.alive).reduce((a, z) => a + z.hp, 0) + 0;
    const killed = sim.kills;
    const real = (killed * 11) / t;
    console.log(`${weapon.padEnd(7)} squadra ${String(squad).padStart(2)}: formula ${Math.round(squad * WEAPONS[weapon].dps)}/s  reale ${Math.round(real)}/s  (${Math.round((real / (squad * WEAPONS[weapon].dps)) * 100)}%)`);
    void hp0; void hp1; void t0;
  }
}
