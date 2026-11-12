import * as T from 'three';
export default function headphoneTextile(repeatX,repeatY) {
  const size=256,height=new Float32Array(size*size),color=new Uint8Array(size*size*4),normal=new Uint8Array(size*size*4);
  for(let y=0;y<size;y++)for(let x=0;x<size;x++){
    const over=(Math.floor(x/16)+Math.floor(y/16))%2===0;
    const across=((over?y:x)%16+.5)/16,along=((over?x:y)%16+.5)/16;
    const yarn=Math.pow(Math.sin(across*Math.PI),.85)*Math.pow(Math.sin(along*Math.PI),.28);
    const filament=.88+.12*Math.cos(across*Math.PI*10+along*1.4),index=y*size+x;
    height[index]=yarn*filament;
    const tone=Math.round(29+137*yarn*filament),offset=index*4;
    color[offset]=tone;color[offset+1]=tone+2;color[offset+2]=tone+4;color[offset+3]=255;
  }
  for(let y=0;y<size;y++)for(let x=0;x<size;x++){
    const dx=height[y*size+(x+1)%size]-height[y*size+(x+size-1)%size];
    const dy=height[((y+1)%size)*size+x]-height[((y+size-1)%size)*size+x];
    const n=new T.Vector3(-dx*2.5,dy*2.5,1).normalize(),offset=(y*size+x)*4;
    normal[offset]=(n.x*.5+.5)*255;normal[offset+1]=(n.y*.5+.5)*255;normal[offset+2]=(n.z*.5+.5)*255;normal[offset+3]=255;
  }
  const texture=(data,isColor)=>{const map=new T.DataTexture(data,size,size);map.wrapS=map.wrapT=T.RepeatWrapping;map.repeat.set(repeatX,repeatY);map.magFilter=T.LinearFilter;map.minFilter=T.LinearMipmapLinearFilter;map.generateMipmaps=true;map.anisotropy=8;if(isColor)map.colorSpace=T.SRGBColorSpace;map.needsUpdate=true;return map;};
  return {map:texture(color,true),normalMap:texture(normal,false)};
}