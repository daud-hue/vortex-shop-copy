import {Link} from 'react-router-dom';
import {ArrowUpRight,Plus} from 'lucide-react';
import ProductMedia from '@/components/spatial/ProductMedia';
import {useCart} from '@/lib/cart';
export default function ProductCard({product,index=0}) {
  const {addItem}=useCart();
  return <article className="min-w-0" style={{animation:`fadeUp .5s ease-out ${Math.min(index,5)*.05}s both`}}>
    <ProductMedia product={product} compact/>
    <div className="mt-5 flex items-start justify-between gap-3"><div className="min-w-0"><Link to={`/product/${product.id}`} className="group flex items-start gap-2"><h3 className="font-heading text-lg font-semibold leading-tight tracking-tight group-hover:text-accent">{product.name}</h3><ArrowUpRight className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground"/></Link><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{product.tagline}</p></div><p className="shrink-0 font-mono text-sm">€{product.price.toLocaleString()}</p></div>
    <div className="mt-5 flex items-center justify-between border-t border-border pt-3"><Link to={`/product/${product.id}`} className="flex min-h-11 items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-accent">Explore object<ArrowUpRight className="h-3 w-3"/></Link><button onClick={()=>addItem(product)} aria-label={`${product.name} kosárba`} className="flex min-h-11 items-center gap-2 rounded-full border border-border px-4 font-mono text-[9px] uppercase tracking-widest transition-colors hover:bg-accent hover:text-accent-foreground"><Plus className="h-3.5 w-3.5"/>Add to orbit</button></div>
  </article>;
}