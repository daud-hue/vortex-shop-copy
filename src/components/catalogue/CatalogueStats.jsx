import {useQuery} from '@tanstack/react-query';
import {base44} from '@/api/base44Client';
export default function CatalogueStats() {
  const {data,isLoading,isError}=useQuery({queryKey:['product-count'],queryFn:()=>base44.entities.Product.count({})});
  const stats=[{v:isLoading?'…':isError?'—':String(data),l:'Sample objects'},{v:'3D',l:'Interactive concepts'},{v:'AI',l:'ORBIT assistant'},{v:'€0',l:'Charged in demo'}];
  return <section className="border-t border-border px-6 py-24 md:px-20"><div className="grid grid-cols-2 gap-8 md:grid-cols-4">{stats.map(({v,l})=><div key={l}><p className="font-heading text-5xl font-black tracking-tight md:text-7xl">{v}</p><p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{l}</p></div>)}</div></section>;
}