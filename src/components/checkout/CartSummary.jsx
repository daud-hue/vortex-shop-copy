import {Link} from 'react-router-dom';
import {Plus,Minus,Trash2} from 'lucide-react';
import {Image} from '@/components/ui/image';
import {useCart} from '@/lib/cart';
export default function CartSummary({onNavigate}) {
  const {items,count,total,updateQty,removeItem}=useCart();
  return <section aria-label="Cart summary" className="glass rounded-2xl p-5 md:p-6">
    <h2 className="mb-5 font-mono text-xs uppercase tracking-widest">In your orbit ({count})</h2>
    <div className="max-h-96 space-y-5 overflow-y-auto">{items.map(item=><div key={item.product_id} className="flex gap-3">
      <Link onClick={onNavigate} to={`/product/${item.product_id}`} className="h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-muted"><Image src={item.product_image} alt={item.product_name} className="h-full w-full"/></Link>
      <div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-2"><Link onClick={onNavigate} to={`/product/${item.product_id}`} className="text-sm font-semibold hover:text-accent">{item.product_name}</Link><button onClick={()=>removeItem(item.product_id)} aria-label={`Remove ${item.product_name}`} className="flex h-11 w-11 shrink-0 items-center justify-center text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4"/></button></div>
        <div className="flex flex-wrap items-center justify-between gap-2"><div className="flex items-center"><button aria-label={`Decrease ${item.product_name} quantity`} onClick={()=>updateQty(item.product_id,item.quantity-1)} className="flex h-11 w-11 items-center justify-center"><Minus className="h-4 w-4"/></button><span className="font-mono text-xs">{item.quantity}</span><button aria-label={`Increase ${item.product_name} quantity`} onClick={()=>updateQty(item.product_id,item.quantity+1)} className="flex h-11 w-11 items-center justify-center"><Plus className="h-4 w-4"/></button></div><span className="font-mono text-xs">€{(item.price*item.quantity).toLocaleString()}</span></div>
      </div></div>)}</div>
    <div className="mt-5 space-y-3 border-t border-border pt-5 text-sm"><div className="flex justify-between"><span>Subtotal</span><span>€{total.toLocaleString()}</span></div><div className="flex justify-between text-muted-foreground"><span>Demo shipping</span><span>€0.00</span></div><div className="flex justify-between text-xl font-semibold"><span>Demo total</span><span>€{total.toLocaleString()}</span></div></div>
  </section>;
}