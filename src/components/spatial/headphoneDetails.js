import * as T from 'three';
import {RoundedBoxGeometry} from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import {signedPower} from '@/components/spatial/headphoneGeometry';
export default function headphoneDetails(group,materials,side) {
  const add=(geometry,material,position,rotation=0)=>{const mesh=new T.Mesh(geometry,material);mesh.position.set(...position);mesh.rotation.x=rotation;group.add(mesh);return mesh;};
  const edge=(angle,x=.085)=>[x,.785*signedPower(Math.cos(angle),.9),.584*signedPower(Math.sin(angle),.9)];
  [.62,1.12,2.12,2.65,3.9,5.23].forEach(angle=>{
    const point=edge(angle);add(new RoundedBoxGeometry(.032,.009,.060,3,.004),materials.seam,point,-angle);
    for(let i=-1;i<=1;i++){const hole=new T.Mesh(new T.SphereGeometry(.0035,8,6),materials.grille);hole.position.set(point[0]+.018,point[1]+i*.012*Math.sin(angle),point[2]+i*.012*Math.cos(angle));group.add(hole);}
  });
  if(side>0){
    add(new RoundedBoxGeometry(.088,.022,.155,4,.008),materials.chrome,[.07,-.777,.018]);
    add(new RoundedBoxGeometry(.070,.025,.126,4,.006),materials.seam,[.07,-.784,.018]);
    add(new RoundedBoxGeometry(.020,.006,.089,3,.002),materials.chrome,[.07,-.799,.018]);
    const a=2.55,p=edge(a,.105);
    add(new RoundedBoxGeometry(.090,.022,.100,4,.009),materials.seam,p,-a);
    add(new RoundedBoxGeometry(.073,.027,.081,4,.009),materials.shell,[p[0]+.002,p[1]-.007,p[2]+.004],-a);
  }
}