import * as T from 'three';
export default function headphoneStudio(renderer) {
  const room=new T.Scene();room.background=new T.Color('#202226');
  const size=64,data=new Uint8Array(size*size*4);
  for(let y=0;y<size;y++)for(let x=0;x<size;x++){const edge=Math.min(x,y,size-1-x,size-1-y)/8,light=Math.round(255*T.MathUtils.smoothstep(edge,0,1)),i=(y*size+x)*4;data[i]=data[i+1]=data[i+2]=light;data[i+3]=255;}
  const map=new T.DataTexture(data,size,size);map.needsUpdate=true;map.magFilter=T.LinearFilter;
  const cards=[{p:[-4,3,4],w:3,h:6,power:6},{p:[4,1,2],w:1.6,h:5,power:4},{p:[0,5,-1],w:4,h:3,power:5},{p:[-2,1,-5],w:2,h:4,power:3}];
  cards.forEach(({p,w,h,power})=>{const card=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({color:new T.Color(power,power,power),map,side:T.DoubleSide}));card.position.set(...p);card.lookAt(0,0,0);room.add(card);});
  const pmrem=new T.PMREMGenerator(renderer),environment=pmrem.fromScene(room,.075);
  room.traverse(object=>{object.geometry?.dispose();object.material?.dispose();});map.dispose();pmrem.dispose();return environment;
}