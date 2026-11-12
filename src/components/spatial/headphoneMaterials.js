import * as T from 'three';
import headphoneTextile from '@/components/spatial/headphoneTextile';
export default function headphoneMaterials() {
  const fabric=(maps,vertexColors=false)=>new T.MeshPhysicalMaterial({color:'#959ba3',roughness:.98,metalness:0,...maps,normalScale:new T.Vector2(.65,.65),sheen:.75,sheenRoughness:.82,sheenColor:new T.Color('#a2a9b2'),side:T.DoubleSide,vertexColors});
  return {
    shell:new T.MeshPhysicalMaterial({color:'#92969d',metalness:.96,roughness:.31,clearcoat:.16,clearcoatRoughness:.4,anisotropy:.3,side:T.DoubleSide}),
    band:new T.MeshPhysicalMaterial({color:'#a3a8af',metalness:.9,roughness:.27,clearcoat:.2,side:T.DoubleSide}),
    chrome:new T.MeshStandardMaterial({color:'#d9dcdf',metalness:1,roughness:.16}),
    polymer:new T.MeshStandardMaterial({color:'#272a2f',metalness:.06,roughness:.57}),
    seam:new T.MeshStandardMaterial({color:'#111316',metalness:.05,roughness:.85}),
    stitch:new T.MeshStandardMaterial({color:'#68707a',roughness:.94}),
    pads:fabric(headphoneTextile(10,2.5),true),lining:fabric(headphoneTextile(10,2)),
    grille:new T.MeshStandardMaterial({color:'#383c43',roughness:1,...headphoneTextile(7,6),normalScale:new T.Vector2(.3,.3),side:T.DoubleSide}),
  };
}