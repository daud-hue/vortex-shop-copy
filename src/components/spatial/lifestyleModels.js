import * as T from 'three';
export default function lifestyleModels(p, kind) {
  const {box, cylinder, sphere, ring, add, metal, blue, dark, lime, light} = p;
  if (kind === 'lamp') {
    cylinder(.48,.09,metal,[0,-1.05,0]); cylinder(.028,1.7,metal,[0,-.17,0]);
    ring(.77,.04,metal,[0,.7,0],[Math.PI/2,0,0]);
    cylinder(.8,.46,blue,[0,.87,0],undefined,.27);
    cylinder(.72,.03,light,[0,.64,0]); sphere(.19,light,[0,.52,0]);
  } else if(kind === 'chair') {
    box([1.65,.28,1.5],blue,[0,-.25,0],.14);
    box([1.65,1.2,.28],blue,[0,.33,-.61],.14,[-.16,0,0]);
    [-1,1].forEach(s=>{
      box([.23,.26,1.43],blue,[s*.8,.15,.02],.1);
      [-1,1].forEach(t=>cylinder(.043,.93,metal,[s*.65,-.76,t*.56],[0,0,s*-.18]));
    });
  } else if(kind === 'shoe') {
    sphere(1,metal,[0,-.47,0],[1.37,.2,.5]); sphere(1,blue,[-.03,-.18,0],[1.3,.37,.46]);
    sphere(1,dark,[-.66,.05,0],[.5,.57,.42]); ring(.27,.09,blue,[-.65,.53,0],[Math.PI/2,0,0]);
    for(let i=0;i<5;i++) box([.06,.033,.62],lime,[-.52+i*.18,.25-i*.055,0],.01,[0,0,-.28]);
    for(let i=0;i<10;i++) box([.065,.045,.7],dark,[-1+i*.22,-.63,0],.015);
    box([.64,.055,.028],lime,[.46,-.19,.433],.02,[0,0,.27]);
  } else {
    add(new T.IcosahedronGeometry(.85,0),metal);
    ring(1.24,.055,blue,[0,0,0],[Math.PI/3,.2,0]); ring(1.5,.018,lime,[0,0,0],[-.4,.3,.2]);
  }
}