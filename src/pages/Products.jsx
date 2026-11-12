import {Loader2,ArrowDown} from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import SpatialHero from '@/components/spatial/SpatialHero';
import StudioFooter from '@/components/StudioFooter';
import CatalogueToolbar from '@/components/catalogue/CatalogueToolbar';
import useCatalogue from '@/components/catalogue/useCatalogue';
export default function Products() {
  const catalogue=useCatalogue();
  return <div>
    <SpatialHero archive/>
    <section id="collection" className="mx-auto max-w-[1600px] scroll-mt-36 px-6 pb-12 pt-8 md:px-10 lg:scroll-mt-24 lg:px-16">
      <div className="mb-8 flex items-end justify-between border-t border-border pt-8"><h2 className="font-heading text-2xl font-semibold tracking-tight">Objects of intention<span className="text-accent">.</span></h2><span className="hidden font-mono text-[9px] uppercase tracking-widest text-muted-foreground sm:block">Image ↔ Interactive concept</span></div>
      <CatalogueToolbar catalogue={catalogue}/>
      {catalogue.isLoading?<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3" aria-label="Termékek betöltése">{Array.from({length:6},(_,i)=><div key={i} className="aspect-[4/5] animate-pulse rounded-2xl bg-muted"/>)}</div>:catalogue.isError?<div role="alert" className="rounded-2xl border border-border p-12 text-center"><p>Nem sikerült betölteni a kollekciót.</p><button onClick={()=>catalogue.refetch()} className="mt-4 min-h-11 text-accent underline">Újrapróbálás</button></div>:catalogue.products.length===0?<div className="rounded-2xl border border-dashed border-border py-20 text-center"><h3 className="text-2xl font-semibold">No objects found.</h3><p className="mt-3 text-sm text-muted-foreground">Try a different name or choose another discipline.</p><button onClick={()=>{catalogue.setSearch('');catalogue.setCategory('all');}} className="mt-6 min-h-11 text-accent underline">Reset filters</button></div>:<div className="grid grid-cols-1 gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">{catalogue.products.map((product,i)=><ProductCard key={product.id} product={product} index={i}/>)}</div>}
      {catalogue.hasNextPage&&<div className="mt-12 text-center"><button disabled={catalogue.isFetchingNextPage} onClick={()=>catalogue.fetchNextPage()} className="inline-flex min-h-12 items-center gap-3 rounded-full border border-border px-8 font-mono text-xs uppercase tracking-wider disabled:opacity-50">{catalogue.isFetchingNextPage?<Loader2 className="h-4 w-4 animate-spin"/>:<ArrowDown className="h-4 w-4"/>}Load more</button></div>}
    </section><StudioFooter/>
  </div>;
}