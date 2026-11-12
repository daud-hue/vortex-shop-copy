import referenceHeadphones from '@/components/spatial/referenceHeadphones';
export default function audioModels(p, kind) {
  const {box, ring, cylinder, metal, blue, dark, lime} = p;
  if (kind === 'speaker') {
    cylinder(.68, 2.05, dark, [0,0,0]);
    cylinder(.7, .13, metal, [0,1.06,0]); cylinder(.7,.13,blue,[0,-1.06,0]);
    for (let i=0;i<34;i++) { const a=i*Math.PI*2/34; box([.025,1.83,.025], metal, [Math.cos(a)*.687,0,Math.sin(a)*.687],.008); }
    ring(.53,.025,lime,[0,1.137,0],[Math.PI/2,0,0]);
    cylinder(.12,.016,dark,[0,1.14,0]);
    return;
  }
  referenceHeadphones(p.group);
}