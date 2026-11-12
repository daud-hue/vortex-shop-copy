import * as T from 'three';
import {shell,cushion,contour} from '@/components/spatial/headphoneGeometry';
import headphoneHousing from '@/components/spatial/headphoneHousing';
import headphoneDetails from '@/components/spatial/headphoneDetails';
import headphoneStitching from '@/components/spatial/headphoneStitching';
export default function headphoneCup(materials,side) {
  const cup=new T.Group();cup.name=side<0?'Left ear assembly':'Right ear assembly';
  const layer=(name,offset)=>{const group=new T.Group();group.name=name;group.userData.home=new T.Vector3();group.userData.explode=new T.Vector3(offset,0,0);cup.add(group);return group;};
  const casing=layer('Anodized aluminum housing',.18),driver=layer('Recessed acoustic fabric',-.10),pad=layer('Woven removable ear cushion',-.38);
  const add=(geometry,material,position=[0,0,0],parent=casing)=>{const mesh=new T.Mesh(geometry,material);mesh.position.set(...position);parent.add(mesh);return mesh;};
  add(headphoneHousing(),materials.shell);
  add(contour(-.042,.776,.577,.006),materials.seam);
  add(contour(-.028,.780,.580,.004),materials.chrome);
  add(shell(.014,.721,.518),materials.polymer,[-.084,0,0],driver);
  add(shell(.014,.508,.334),materials.grille,[-.105,0,0],driver);
  add(cushion(),materials.pads,[0,0,0],pad);
  add(contour(-.096,.727,.531,.005),materials.seam,[0,0,0],pad);
  pad.add(headphoneStitching(materials.stitch));
  headphoneDetails(casing,materials,side);
  add(new T.SphereGeometry(.042,32,20),materials.chrome,[.025,.813,0],cup);
  add(new T.CylinderGeometry(.026,.026,.073,32),materials.chrome,[.025,.865,0],cup);
  add(new T.CylinderGeometry(.043,.036,.032,32),materials.chrome,[.025,.911,0],cup);
  add(new T.CylinderGeometry(.068,.065,.060,48),materials.chrome,[.025,.946,0],cup);
  add(new T.CylinderGeometry(.066,.067,.301,48),materials.polymer,[.025,1.126,0],cup);
  add(new T.CylinderGeometry(.068,.068,.009,48),materials.seam,[.025,.980,0],cup);
  cup.rotation.set(0,(side<0?Math.PI:0)+.20,-side*.27,'ZYX');cup.position.set(side*.769,-.843,0);
  return cup;
}