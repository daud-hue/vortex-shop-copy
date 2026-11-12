import {Link} from 'react-router-dom';
import {ShoppingBag} from 'lucide-react';
import {useCart} from '@/lib/cart';
import {Sheet,SheetContent,SheetTitle,SheetDescription} from '@/components/ui/sheet';
import CartSummary from '@/components/checkout/CartSummary';
export default function CartDrawer() {
  const {isOpen,setIsOpen,count}=useCart();
  return <Sheet open={isOpen} onOpenChange={setIsOpen}><SheetContent className="flex h-[100dvh] w-full flex-col p-0 sm:max-w-md"><header className="border-b border-border p-6 pr-12"><SheetTitle className="text-xl font-black tracking-tight">The Terminal</SheetTitle><SheetDescription>{count} object{count!==1?'s':''} in orbit · Demo cart</SheetDescription></header><div className="min-h-0 flex-1 overflow-y-auto p-4">{count?<CartSummary onNavigate={()=>setIsOpen(false)}/>: <div className="flex h-full flex-col items-center justify-center gap-5 text-center"><ShoppingBag className="h-12 w-12 text-muted-foreground"/><p className="text-sm text-muted-foreground">No objects in orbit yet.</p><Link to="/products" onClick={()=>setIsOpen(false)} className="flex min-h-11 items-center text-sm underline underline-offset-4">Browse the archive</Link></div>}</div>{count>0&&<div className="border-t border-border p-6"><Link to="/cart" onClick={()=>setIsOpen(false)} className="flex min-h-12 items-center justify-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground">Preview demo checkout</Link><p className="mt-3 text-center text-xs text-muted-foreground">No payment or real order will be created.</p></div>}</SheetContent></Sheet>;
}