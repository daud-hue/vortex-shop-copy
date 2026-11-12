import {useState} from 'react';
import {Link} from 'react-router-dom';
import {Check,ArrowRight} from 'lucide-react';
import {useCart} from '@/lib/cart';
import StudioFooter from '@/components/StudioFooter';
import DemoCheckout from '@/components/checkout/DemoCheckout';
import CartSummary from '@/components/checkout/CartSummary';
export default function Cart() {
  const {total,count,clear}=useCart();
  const [done,setDone]=useState(false);
  if(done||count===0)return <div><section className="px-6 py-24 text-center md:px-20">
    {done&&<div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-accent text-accent-foreground"><Check className="h-10 w-10"/></div>}
    <h1 className="font-heading text-5xl font-black tracking-tight md:text-7xl">{done?'Demo complete.':'Empty orbit.'}</h1>
    <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">{done?'You finished the checkout preview. Your demo cart was cleared. No payment was taken, no order was saved and no email was sent.':'No objects selected yet.'}</p>
    <Link to="/products" className="mt-10 inline-flex min-h-11 items-center gap-2 text-sm underline underline-offset-8">Browse the archive<ArrowRight className="h-4 w-4"/></Link>
  </section><StudioFooter/></div>;
  return <div><div className="px-6 py-16 md:px-20 md:py-24"><header className="mb-12"><span className="font-mono text-xs uppercase tracking-widest text-accent">/ The Terminal · Demo</span><h1 className="mt-3 font-heading text-5xl font-black tracking-tight md:text-7xl">Checkout preview.</h1></header><div className="grid gap-12 md:grid-cols-12"><div className="md:col-span-7"><DemoCheckout total={total} onComplete={()=>{clear();setDone(true);}}/></div><div className="md:col-span-5"><CartSummary/></div></div></div><StudioFooter/></div>;
}