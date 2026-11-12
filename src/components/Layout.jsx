import {useState} from 'react';
import {Outlet} from 'react-router-dom';
import {AudioLines,ArrowUpRight} from 'lucide-react';
import CartDrawer from '@/components/CartDrawer';
import ShopHeader from '@/components/ShopHeader';
import OrbitAssistant from '@/components/orbit/OrbitAssistant';
export default function Layout() {
  const [assistantOpen,setAssistantOpen]=useState(false);
  return <div className="min-h-screen bg-background text-foreground">
    <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-accent focus:p-3 focus:text-accent-foreground">Ugrás a tartalomhoz</a>
    <ShopHeader onAssistant={()=>setAssistantOpen(true)}/>
    <main id="main-content" className="min-h-screen"><Outlet/></main>
    <button onClick={()=>setAssistantOpen(true)} className="fixed bottom-5 right-5 z-30 flex min-h-14 items-center gap-3 rounded-full border border-accent/30 bg-background/95 px-5 text-accent shadow-xl backdrop-blur-xl transition-colors hover:bg-secondary md:bottom-7 md:right-8" aria-label="Beszélgetés az ORBIT asszisztenssel"><AudioLines className="h-5 w-5"/><span className="font-mono text-[10px] uppercase tracking-widest">Ask Orbit</span><ArrowUpRight className="h-3 w-3"/></button>
    <CartDrawer/>
    <OrbitAssistant open={assistantOpen} onOpenChange={setAssistantOpen}/>
  </div>;
}