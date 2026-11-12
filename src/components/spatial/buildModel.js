import * as T from 'three';
import modelParts from '@/components/spatial/modelParts';
import audioModels from '@/components/spatial/audioModels';
import accessoryModels from '@/components/spatial/accessoryModels';
import lifestyleModels from '@/components/spatial/lifestyleModels';
export default function buildModel(product) {
  const name=(product?.name || '').toLowerCase();
  const kind=name.includes('headphone')?'headphones':name.includes('speaker')?'speaker':name.includes('chrono')?'watch':name.includes('camera')?'camera':name.includes('carrier')?'bag':name.includes('chair')?'chair':name.includes('runner')?'shoe':name.includes('pendant')?'lamp':({audio:'headphones',wearables:'watch',footwear:'shoe',lighting:'lamp'}[product?.category]||'sculpture');
  const model=new T.Group(); const parts=modelParts(model);
  if(['headphones','speaker'].includes(kind)) audioModels(parts,kind);
  else if(['watch','camera','bag'].includes(kind)) accessoryModels(parts,kind);
  else lifestyleModels(parts,kind);
  const unused=new Set([parts.metal,parts.blue,parts.dark,parts.lime,parts.light]);
  model.children.forEach((mesh,i)=>{unused.delete(mesh.material);mesh.userData.home=mesh.position.clone();const dir=mesh.position.clone();if(dir.length()<.1)dir.set(.1,.25,.1);mesh.userData.explode=dir.normalize().multiplyScalar(.22+(i%3)*.08);});
  unused.forEach(material=>material.dispose());
  return model;
}