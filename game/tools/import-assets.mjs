// Copia e ottimizza i modelli scelti da assets-src/ a public/models/.
// Uso: node tools/import-assets.mjs
import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync, existsSync, writeFileSync } from 'node:fs';
import { join, sep } from 'node:path';

const SRC = 'assets-src/polypizza';
const OUT = 'public/models';
const PA = 'Post-Apocolypse-Pack-jg0We8Clu0';
const TS = 'Toon-Shooter-Game-Kit-qraiSXoAru';

// nome nel gioco -> [cartella, id poly.pizza]
const MAP = {
  hero_matt: [PA, '66kQ4dBBC7'], hero_lis: [PA, 'gjuwleUT1U'], hero_sam: [PA, 'UcLErL2W37'], hero_shaun: [PA, 'eJFT9MxzOM'],
  hero_soldier: [TS, 'PpLF4rt4ah'], hero_hazmat: [TS, 'z3TSQYx1Kn'], hero_enemy: [TS, 'mdGe4IN31v'],
  zombie_basic: [PA, '22K0aSZkHV'], zombie_chubby: [PA, 'VlXjG0N8Eg'], zombie_arm: [PA, 'KaVJET0WHx'], zombie_half: [PA, 'Htcsn9OrXJ'],
  dog: [PA, 'Hssa6NPc6W'],
  gun_pistol: [PA, 'Yp4GwKdHHO'], gun_smg: [PA, 'sRkpgScNzi'], gun_shotgun: [PA, '8Z4HaN1NyS'], gun_rifle: [PA, 'KjHL5JJrxU'],
  street: [PA, 'UA4axT3nIQ'], street_crack1: [PA, 'P4BaLlrAIM'], street_crack2: [PA, 'l7c8pppfFj'],
  barrel: [PA, 'MraIiFnpAY'], chest: [PA, 'RfSBvgcZUD'], chest_special: [PA, 'vXaxy7ortM'],
  barrier_plastic: [PA, 'QAiXMsbWRc'], barrier_traffic: [PA, 'cM3aJPU9NS'], cone: [PA, 'VGvQupNGtK'],
  container_red: [PA, 'vzzCNUB6Zn'], container_green: [PA, 'h5RUr3vlcS'], streetlight: [PA, '0lxF8Dl1jU'],
  trash_bags: [PA, 'eitNk4I4R1'], pallet: [PA, 'MwOFAOgOhg'], cinder: [PA, 'lLkVKoJsKm'], wheels: [PA, 'o1MJrkMUPN'],
  hydrant: [PA, 'DKkMQbEklp'], couch: [PA, 'ik7UZdELJE'], watertower: [PA, 'tMK8bhapAK'],
};

function find(dir, id) {
  const f = readdirSync(join(SRC, dir)).find((n) => n.endsWith(`__${id}.glb`));
  if (!f) throw new Error(`Modello ${id} non trovato in ${dir}`);
  return join(SRC, dir, f);
}

mkdirSync(OUT, { recursive: true });
const report = {};
for (const [name, [dir, id]] of Object.entries(MAP)) {
  const src = find(dir, id);
  const dst = join(OUT, `${name}.glb`);
  execFileSync('npx', ['gltf-transform', 'optimize', src, dst, '--compress', 'quantize', '--texture-compress', 'webp', '--texture-size', '512', '--simplify', 'false', '--join', 'false', '--instance', 'false', '--flatten', 'false'], { stdio: 'pipe', shell: true });
  report[name] = { source: src.split(sep).join('/'), polypizza: `https://poly.pizza/m/${id}` };
  console.log('ok', name);
}
writeFileSync(join(OUT, 'sources.json'), JSON.stringify(report, null, 2));
