import {useState} from 'react';
import {Check, CreditCard} from 'lucide-react';
const steps=['Identity','Delivery','Preview'];
const samples=[[['Full name','Demo Customer'],['Email','demo@example.com']],[['Street address','Sample Street 1'],['City','Budapest'],['Postal code','1000'],['Country','Hungary']]];
export default function DemoCheckout({total,onComplete}) {
  const [step,setStep]=useState(0);
  return <section aria-label="Demo checkout">
    <ol className="mb-8 flex flex-wrap gap-4">{steps.map((label,i)=><li key={label} aria-current={step===i?'step':undefined} className="flex items-center gap-2 text-xs"><span className={`flex h-8 w-8 items-center justify-center rounded-full ${i<=step?'bg-primary text-primary-foreground':'bg-muted text-muted-foreground'}`}>{i<step?<Check className="h-4 w-4"/>:i+1}</span>{label}</li>)}</ol>
    <p className="mb-6 rounded-xl border border-accent/30 bg-accent/10 p-4 text-sm leading-relaxed">Interactive demo only. Sample details are prefilled; no personal or card details are requested. No payment, order, delivery or confirmation email will be created.</p>
    <div className="space-y-5">{step<2?samples[step].map(([label,value])=><label key={label} className="block"><span className="font-mono text-xs text-muted-foreground">{label}</span><input readOnly value={value} className="mt-2 w-full rounded-lg border border-border bg-muted/30 px-4 py-3.5 text-sm"/></label>):<div className="rounded-xl border border-border p-6"><CreditCard className="mb-4 h-6 w-6 text-accent"/><h2 className="text-xl font-semibold">Payment preview</h2><p className="mt-3 text-sm text-muted-foreground">No payment provider is connected. This preview demonstrates the checkout layout without collecting card data.</p><p className="mt-5 font-mono text-sm">Sample total: €{total.toLocaleString()}</p><p className="mt-2 text-xs text-muted-foreground">Demo shipping: €0.00. These prices are illustrative, not an offer for sale.</p></div>}</div>
    <div className="mt-10 flex gap-4">{step>0&&<button onClick={()=>setStep(step-1)} className="min-h-12 rounded-full border border-border px-6 text-sm">Back</button>}<button onClick={()=>step<2?setStep(step+1):onComplete()} className="min-h-12 flex-1 rounded-full bg-accent px-5 text-sm font-semibold text-accent-foreground">{step<2?'Continue demo':'Finish demo — no charge'}</button></div>
  </section>;
}