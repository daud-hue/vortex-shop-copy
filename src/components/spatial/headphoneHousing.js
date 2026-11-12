import * as T from 'three';
import {surface,signedPower} from '@/components/spatial/headphoneGeometry';
export default function headphoneHousing() {
  const sections=[[.290,0],[.289,.12],[.285,.25],[.277,.40],[.263,.55],[.241,.68],[.212,.78],[.173,.87],[.121,.94],[.068,.985],[.025,1],[-.025,.997],[-.065,.976],[-.085,.943],[-.087,.85],[-.087,.35],[-.087,0]];
  const profile=new T.CatmullRomCurve3(sections.map(([x,r])=>new T.Vector3(x,r,0)),false,'centripetal');
  const geometry=surface((u,v)=>{const a=u*Math.PI*2,p=profile.getPoint(v),r=Math.max(0,p.y);return [p.x,.785*r*signedPower(Math.cos(a),.90),.584*r*signedPower(Math.sin(a),.90)];},128,112);
  const normal=new T.Vector3(),normals=geometry.attributes.normal;
  for(let i=0;i<=128;i++)for(let j=0;j<=112;j++){
    const a=i/128*Math.PI*2,t=profile.getTangent(j/112);
    normal.set(t.y,-t.x*signedPower(Math.cos(a),1.1)/.785,-t.x*signedPower(Math.sin(a),1.1)/.584).normalize();
    if(j===0)normal.set(1,0,0);if(j===112)normal.set(-1,0,0);
    normals.setXYZ(i*113+j,normal.x,normal.y,normal.z);
  }
  return geometry;
}