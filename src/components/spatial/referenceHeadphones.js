import * as T from 'three';
import {RoundedBoxGeometry} from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import headphoneMaterials from '@/components/spatial/headphoneMaterials';
import headphoneCup from '@/components/spatial/headphoneCup';
import {ribbon,bandEdge} from '@/components/spatial/headphoneGeometry';
export default function referenceHeadphones(group) {
  const materials=headphoneMaterials(),band=new T.Group();band.name='Metal headband and woven lining';
  band.add(new T.Mesh(ribbon(),materials.band),new T.Mesh(ribbon(true),materials.lining));
  [-1,1].forEach(side=>{
    band.add(new T.Mesh(bandEdge(side),materials.chrome));
    const collar=new T.Mesh(new RoundedBoxGeometry(.16,.20,.26,6,.07),materials.polymer);collar.position.set(side*1.135,.39,0);band.add(collar);
    const screw=new T.Mesh(new T.CylinderGeometry(.024,.024,.010,32),materials.chrome);screw.rotation.z=Math.PI/2;screw.position.set(side*1.05,.355,.016);band.add(screw);
    const inset=new T.Mesh(new T.CylinderGeometry(.010,.010,.012,24),materials.seam);inset.rotation.z=Math.PI/2;inset.position.copy(screw.position);band.add(inset);
  });
  group.add(band,headphoneCup(materials,-1),headphoneCup(materials,1));
  group.userData.referenceHeadphones=true;
}