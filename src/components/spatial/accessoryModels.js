export default function accessoryModels(p, kind) {
  const {box, cylinder, ring, metal, blue, dark, lime} = p;
  if (kind === 'watch') {
    box([.73,2.8,.16],dark,[0,0,-.2],.12);
    for(let i=-5;i<=5;i++) box([.78,.18,.09],metal,[0,i*.25,-.16],.03);
    cylinder(.64,.27,metal,[0,0,.03],[Math.PI/2,0,0]);
    cylinder(.54,.022,lime,[0,0,.179],[Math.PI/2,0,0]);
    ring(.58,.025,blue,[0,0,.21]);
    for(let i=0;i<12;i++){let a=i*Math.PI/6;box([.022,.07,.014],dark,[Math.sin(a)*.45,Math.cos(a)*.45,.2],.002,[0,0,-a]);}
    box([.035,.35,.018],dark,[-.06,.12,.23],.005,[0,0,.55]); box([.027,.45,.021],dark,[.13,.13,.25],.005,[0,0,-.85]);
    cylinder(.11,.15,metal,[.68,0,.03],[0,0,Math.PI/2]);
  } else if(kind === 'camera') {
    box([2.1,1.25,.68],dark,[0,0,0],.15); box([2.1,.22,.7],metal,[0,.53,0],.07);
    box([.38,1.03,.15],blue,[-.82,-.05,.36],.05);
    cylinder(.5,.62,metal,[.18,-.05,.49],[Math.PI/2,0,0]); cylinder(.42,.68,dark,[.18,-.05,.55],[Math.PI/2,0,0]);
    ring(.38,.028,blue,[.18,-.05,.91]); cylinder(.31,.025,blue,[.18,-.05,.91],[Math.PI/2,0,0]);
    cylinder(.16,.09,lime,[.68,.69,0]); box([.36,.22,.04],dark,[-.48,.51,.37],.02);
    box([1.35,.78,.03],blue,[0,-.04,-.36],.035);
  } else {
    box([1.55,2.03,.83],dark,[0,0,0],.24); box([1.29,.86,.23],blue,[0,-.36,.49],.14);
    box([1.15,.035,.04],lime,[0,.14,.62],.012);
    [-1,1].forEach(s=>{box([.19,1.66,.14],blue,[s*.45,.05,-.55],.07,[0,0,s*.1]);box([.16,.23,.06],metal,[s*.45,-.3,-.65],.02);});
    ring(.23,.055,metal,[0,1.08,0]);
  }
}