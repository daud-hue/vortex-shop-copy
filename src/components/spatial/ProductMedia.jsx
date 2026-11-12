import {lazy,Suspense,useState} from 'react';
import {Box,ImageIcon,Loader2,ZoomIn,ZoomOut} from 'lucide-react';
import {Image} from '@/components/ui/image';
const ModelCanvas=lazy(()=>import('@/components/spatial/ModelCanvas'));
export default function ProductMedia({product,initial3D=false,compact=false}) {
  const [mode,setMode]=useState(initial3D?'3d':'image');const [zoom,setZoom]=useState(false);
  const referenceModel=product?.name?.toLowerCase().includes('headphone');
  return <div className="space-y-3">
    <div className={`relative overflow-hidden border border-border bg-card ${compact?'aspect-square rounded-2xl':'aspect-[4/5] rounded-2xl md:aspect-square'}`}>
      {mode==='3d'?<Suspense fallback={<div className="flex h-full items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-accent"/></div>}><ModelCanvas product={product}/></Suspense>:<>
        <Image src={product.image_url} alt={product.name} fittingType="fill" loading="lazy" className={`h-full w-full transition-transform duration-300 ${zoom?'scale-150':''}`}/>
        <div className="absolute left-4 top-4 rounded-full border border-border bg-background/90 px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest text-foreground">{product.category}</div>
        <button onClick={()=>setZoom(!zoom)} aria-label={zoom?'Kép kicsinyítése':'Kép nagyítása'} className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/90 text-foreground">{zoom?<ZoomOut className="h-4 w-4"/>:<ZoomIn className="h-4 w-4"/>}</button>
      </>}
    </div>
    <div className="flex items-center justify-between gap-2"><div className="flex gap-1 rounded-full border border-border p-1">{[['image',ImageIcon,'Image'],['3d',Box,'3D studio']].map(([value,Icon,label])=><button key={value} aria-pressed={mode===value} onClick={()=>setMode(value)} className={`flex min-h-10 items-center gap-2 rounded-full px-3 font-mono text-[9px] uppercase tracking-wider transition-colors ${mode===value?'bg-accent text-accent-foreground':'text-muted-foreground hover:text-foreground'}`}><Icon className="h-3.5 w-3.5"/>{label}</button>)}</div><span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{mode==='3d'?(referenceModel?'Reference model':'Concept model'):'Product visual'}</span></div>
    {!compact&&<p className="text-xs leading-relaxed text-muted-foreground">{referenceModel?'A saját referenciaképek alapján modellezett fejhallgató, fémházzal és szövött párnákkal. Fotóalapú közelítés, nem méretpontos CAD-modell.':'A 3D nézet egyedi, stilizált formakoncepció; nem méretpontos termékszkennelés. A termék adatait a leírás tartalmazza.'}</p>}
  </div>;
}