import {NavLink, Link} from 'react-router-dom';
import {ArrowUpRight, AudioLines, ShoppingBag, Asterisk} from 'lucide-react';
import {useCart} from '@/lib/cart';
const links=[['/','Index'],['/products','Archive'],['/about','Atelier'],['/contact','Contact']];
export default function ShopHeader({onAssistant}) {
  const {count,setIsOpen}=useCart();
  return <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-xl">
    <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between gap-4 px-5 md:px-10 lg:px-16">
      <Link to="/" aria-label="KINETIC kezdőlap" className="flex items-center gap-2 font-heading text-xl font-black tracking-[-.05em]"><Asterisk className="h-9 w-9 text-accent" strokeWidth={1.4}/>KINETIC</Link>
      <nav aria-label="Fő navigáció" className="hidden items-center gap-7 md:flex">{links.map(([to,label])=><NavLink key={to} to={to} end className={({isActive})=>`font-mono text-[11px] uppercase tracking-widest transition-colors ${isActive?'text-accent':'text-muted-foreground hover:text-foreground'}`}>{label}</NavLink>)}</nav>
      <div className="flex items-center gap-2 md:gap-5"><button onClick={onAssistant} className="flex min-h-11 items-center gap-2 text-accent" aria-label="ORBIT hangos asszisztens"><AudioLines className="h-5 w-5"/><span className="hidden font-mono text-[10px] uppercase tracking-wider lg:inline">Talk to Orbit</span></button><button onClick={()=>setIsOpen(true)} className="flex min-h-11 items-center gap-2 rounded-full border border-border px-4 hover:bg-muted" aria-label={`Kosár, ${count} termék`}><ShoppingBag className="h-4 w-4"/><span className="font-mono text-xs">{String(count).padStart(2,'0')}</span><ArrowUpRight className="hidden h-3 w-3 sm:block"/></button></div>
    </div>
    <nav aria-label="Mobil navigáció" className="flex justify-between border-t border-border px-5 md:hidden">{links.map(([to,label])=><NavLink key={to} to={to} end className={({isActive})=>`flex min-h-11 items-center font-mono text-[10px] uppercase tracking-widest ${isActive?'text-accent':'text-muted-foreground'}`}>{label}</NavLink>)}</nav>
  </header>;
}