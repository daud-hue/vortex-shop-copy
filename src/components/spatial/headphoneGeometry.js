import * as T from 'three';
export const signedPower=(value,power)=>Math.sign(value)*Math.pow(Math.abs(value),power);
export function surface(point,rows=80,columns=32) {
  const positions=[],uvs=[],indices=[];
  for(let i=0;i<=rows;i++)for(let j=0;j<=columns;j++){positions.push(...point(i/rows,j/columns));uvs.push(i/rows,j/columns);}
  for(let i=0;i<rows;i++)for(let j=0;j<columns;j++){const a=i*(columns+1)+j,b=a+columns+1;indices.push(a,b,a+1,b,b+1,a+1);}
  const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(positions,3));geometry.setAttribute('uv',new T.Float32BufferAttribute(uvs,2));geometry.setIndex(indices);geometry.computeVertexNormals();return geometry;
}
export function shell(depth,height,width) {
  const geometry=surface((u,v)=>{const a=u*Math.PI*2,b=(v-.5)*Math.PI,r=Math.pow(Math.max(0,Math.cos(b)),.72);return [depth*signedPower(Math.sin(b),.72),height*r*signedPower(Math.cos(a),.90),width*r*signedPower(Math.sin(a),.90)];},96,48);
  const normals=geometry.attributes.normal,normal=new T.Vector3();
  for(let i=0;i<=96;i++)for(let j=0;j<=48;j++){
    const a=i/96*Math.PI*2,b=(j/48-.5)*Math.PI,r=Math.pow(Math.max(0,Math.cos(b)),1.28);
    normal.set(signedPower(Math.sin(b),1.28)/depth,r*signedPower(Math.cos(a),1.10)/height,r*signedPower(Math.sin(a),1.10)/width).normalize();normals.setXYZ(i*49+j,normal.x,normal.y,normal.z);
  }
  return geometry;
}
export function cushion() {
  const geometry=surface((u,v)=>{const a=u*Math.PI*2,b=v*Math.PI*2;return [-.218+.162*Math.sin(b),(.583+.163*Math.cos(b))*signedPower(Math.cos(a),.90),(.400+.150*Math.cos(b))*signedPower(Math.sin(a),.90)];},160,56);
  const colors=[];
  for(let i=0;i<=160;i++)for(let j=0;j<=56;j++){const inside=Math.max(0,-Math.cos(j/56*Math.PI*2)),shade=1-.54*Math.pow(inside,2);colors.push(shade,shade,shade);}
  geometry.setAttribute('color',new T.Float32BufferAttribute(colors,3));return geometry;
}
export function contour(x,height,width,radius=.008) {
  const points=Array.from({length:129},(_,i)=>{const a=i/128*Math.PI*2;return new T.Vector3(x,height*signedPower(Math.cos(a),.90),width*signedPower(Math.sin(a),.90));});
  return new T.TubeGeometry(new T.CatmullRomCurve3(points),128,radius,8,true);
}
export function ribbon(inner=false) {
  return surface((u,v)=>{const a=u*Math.PI,start=inner?Math.PI/2:-Math.PI/2,b=start+v*Math.PI,nx=Math.cos(a),ny=Math.sin(a),width=.13+.185*Math.pow(Math.sin(a),.42),radial=(inner?.092:.038)*Math.cos(b);return [1.135*nx+radial*nx,.39+1.12*ny+radial*ny,width*signedPower(Math.sin(b),.55)];},112,24);
}
export function bandEdge(side) {
  const points=Array.from({length:113},(_,i)=>{const a=i/112*Math.PI;return new T.Vector3(1.135*Math.cos(a),.39+1.12*Math.sin(a),side*(.13+.185*Math.pow(Math.sin(a),.42)));});
  return new T.TubeGeometry(new T.CatmullRomCurve3(points),112,.007,8,false);
}