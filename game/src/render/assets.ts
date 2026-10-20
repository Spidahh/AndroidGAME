import { AssetContainer, LoadAssetContainerAsync, Scene, TransformNode, AnimationGroup, Vector3, AbstractMesh, Node } from '@babylonjs/core';
import '@babylonjs/loaders/glTF';

export const MODEL_BASE = `${import.meta.env.BASE_URL}models/`;

export interface Instance {
  root: TransformNode;
  anims: Map<string, AnimationGroup>;
  current?: AnimationGroup;
  meshes: AbstractMesh[];
}

/** Cache di AssetContainer: ogni modello si scarica una volta sola. */
export class Assets {
  private containers = new Map<string, Promise<AssetContainer>>();
  constructor(private scene: Scene) {}

  load(name: string): Promise<AssetContainer> {
    let p = this.containers.get(name);
    if (!p) {
      p = LoadAssetContainerAsync(`${MODEL_BASE}${name}.glb`, this.scene);
      this.containers.set(name, p);
    }
    return p;
  }

  async preload(names: string[], onProgress?: (done: number, total: number) => void) {
    let done = 0;
    await Promise.all(
      names.map((n) =>
        this.load(n).then(() => {
          done++;
          onProgress?.(done, names.length);
        }),
      ),
    );
  }

  /** Istanza indipendente (con scheletro e animazioni proprie). */
  async instance(name: string): Promise<Instance> {
    const c = await this.load(name);
    const inst = c.instantiateModelsToScene((n) => n, false, { doNotInstantiate: true });
    const root = new TransformNode(`${name}-inst`, this.scene);
    for (const r of inst.rootNodes) r.parent = root;
    const anims = new Map<string, AnimationGroup>();
    for (const g of inst.animationGroups) {
      g.stop();
      const short = g.name.split('|').pop()!.replace(/\.\d+$/, '').replace(/^Clone of /, '');
      if (!anims.has(short) || g.name.includes('|')) anims.set(short, g);
    }
    const meshes = root.getChildMeshes(false);
    for (const m of meshes) {
      m.isPickable = false;
      m.alwaysSelectAsActiveMesh = false;
    }
    return { root, anims, meshes };
  }
}

export function play(inst: Instance, name: string, loop = true, speed = 1) {
  const g = inst.anims.get(name);
  if (!g || inst.current === g) return;
  inst.current?.stop();
  g.start(loop, speed, g.from, g.to, false);
  inst.current = g;
}

export function findNode(root: Node, re: RegExp): TransformNode | undefined {
  return root.getDescendants(false).find((n) => re.test(n.name)) as TransformNode | undefined;
}

/** Normalizza un'istanza: altezza target e piedi a terra. */
export function fitHeight(inst: Instance, height: number) {
  inst.root.computeWorldMatrix(true);
  const { min, max } = inst.root.getHierarchyBoundingVectors(true);
  const h = max.y - min.y || 1;
  const s = height / h;
  inst.root.scaling = new Vector3(s, s, s);
}
