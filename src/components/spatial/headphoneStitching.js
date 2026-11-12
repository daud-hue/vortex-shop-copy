import * as T from 'three';
import {signedPower} from '@/components/spatial/headphoneGeometry';
export default function headphoneStitching(material) {
  const count=208,mesh=new T.InstancedMesh(new T.SphereGeometry(1,6,4),material,count),dummy=new T.Object3D();
  for(let i=0;i<count;i++){
    const a=i/count*Math.PI*2,step=.001;
    const y=.745*signedPower(Math.cos(a),.90),z=.55*signedPower(Math.sin(a),.90);
    const dy=.745*signedPower(Math.cos(a+step),.90)-y,dz=.55*signedPower(Math.sin(a+step),.90)-z;
    dummy.position.set(-.22,y,z);dummy.rotation.x=Math.atan2(dz,dy);dummy.scale.set(.0025,.007,.002);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix);
  }
  mesh.instanceMatrix.needsUpdate=true;return mesh;
}