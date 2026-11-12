import {useEffect,useRef,useState} from 'react';
import {Image} from '@/components/ui/image';
import {Loader2} from 'lucide-react';
import createStage from '@/components/spatial/createStage';
import ViewerControls from '@/components/spatial/ViewerControls';
export default function ModelCanvas({product,className=''}) {
  const mount=useRef(null),api=useRef(null);
  const referenceModel=product?.name?.toLowerCase().includes('headphone');
  const [settings,setSettings]=useState(()=>({spin:!window.matchMedia('(prefers-reduced-motion: reduce)').matches,wire:false,explode:false}));
  const current=useRef(settings);current.current=settings;
  const [ready,setReady]=useState(false),[failed,setFailed]=useState(false);
  useEffect(()=>{
    setReady(false);setFailed(false);
    try {api.current=createStage(mount.current,product,current);setReady(true);} catch {setFailed(true);}
    return()=>{api.current?.dispose();api.current=null;};
  },[product?.id,product?.name,product?.category]);
  return <div className={`spatial-stage relative isolate h-full w-full overflow-hidden ${className}`}>
    <div className="pointer-events-none absolute inset-0 spatial-grid opacity-25"/>
    <div ref={mount} className="absolute inset-0" aria-label={`${product?.name || 'Design object'} interaktív 3D koncepció`} role="img"/>
    {!ready&&!failed&&<div className="absolute inset-0 flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-accent"/></div>}
    {failed?<div className="absolute inset-0 flex flex-col items-center justify-center">{product?.image_url&&<Image src={product.image_url} alt={product.name} className="h-3/4 w-full" fittingType="fit"/>}<p role="status" className="p-5 text-center text-xs text-muted-foreground">A 3D megjelenítéshez WebGL-t támogató böngésző szükséges.</p></div>:<>
      <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-muted-foreground"><span className="h-1.5 w-1.5 rounded-full bg-accent"/>{referenceModel?'Reference-built / 3D':'Live geometry / concept'}</div>
      <div className="pointer-events-none absolute right-5 top-5 font-mono text-[9px] text-muted-foreground">360°</div>
      <div className="pointer-events-none absolute bottom-20 inset-x-0 text-center font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{referenceModel?'Húzd a forgatáshoz · Saját képek alapján':'Húzd a forgatáshoz · Stilizált 3D koncepció'}</div>
      <ViewerControls settings={settings} onChange={setSettings} api={api}/>
    </>}
  </div>;
}