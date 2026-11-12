import {useState} from 'react';
import {Check,Loader2,Send} from 'lucide-react';
import {base44} from '@/api/base44Client';
const empty={name:'',email:'',subject:'General enquiry',message:''};
export default function ContactForm() {
  const [form,setForm]=useState(empty),[sent,setSent]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState('');
  const submit=async event=>{event.preventDefault();if(busy)return;setBusy(true);setError('');
    const payload={...form,name:form.name.trim(),email:form.email.trim(),message:form.message.trim()};
    if(!payload.name||!payload.message){setError('Please enter your name and message.');setBusy(false);return;}
    try {await base44.entities.ContactMessage.create(payload);setSent(true);} catch {setError('Your message could not be saved. Please try again.');} finally {setBusy(false);}
  };
  if(sent)return <div role="status" className="flex min-h-[400px] flex-col items-center justify-center text-center"><div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground"><Check className="h-8 w-8"/></div><h2 className="text-3xl font-black tracking-tight">Signal received.</h2><p className="mt-4 max-w-sm text-sm text-muted-foreground">Your message has been saved for the site administrator. This demo does not send a confirmation email or guarantee a reply.</p><button onClick={()=>{setSent(false);setForm(empty);}} className="mt-8 min-h-11 text-sm underline underline-offset-8">Send another</button></div>;
  return <form onSubmit={submit} className="space-y-6">
    <p className="text-sm leading-relaxed text-muted-foreground">This form saves your name, email and message for the site administrator. Messages are not public. Do not send sensitive information.</p>
    {['name','email'].map(key=><label key={key} className="block"><span className="font-mono text-xs capitalize text-muted-foreground">{key}</span><input type={key==='email'?'email':'text'} required maxLength={key==='email'?254:100} autoComplete={key} value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} className="mt-2 w-full rounded-lg border border-border bg-transparent px-4 py-3.5 text-sm"/></label>)}
    <fieldset><legend className="font-mono text-xs text-muted-foreground">Subject</legend><div className="mt-3 flex flex-wrap gap-2">{['General enquiry','Membership','Press','Commission'].map(subject=><button type="button" key={subject} aria-pressed={form.subject===subject} onClick={()=>setForm({...form,subject})} className={`min-h-11 rounded-full px-4 font-mono text-xs ${form.subject===subject?'bg-primary text-primary-foreground':'border border-border text-muted-foreground'}`}>{subject}</button>)}</div></fieldset>
    <label className="block"><span className="font-mono text-xs text-muted-foreground">Message</span><textarea required maxLength={3000} rows={6} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} className="mt-2 w-full resize-y rounded-lg border border-border bg-transparent px-4 py-3.5 text-sm"/></label>
    {error&&<p role="alert" className="text-sm text-destructive">{error}</p>}
    <button disabled={busy} type="submit" className="flex min-h-12 items-center gap-3 rounded-full bg-primary px-8 py-4 font-mono text-xs uppercase tracking-widest text-primary-foreground disabled:opacity-50">{busy?<><Loader2 className="h-4 w-4 animate-spin"/>Saving…</>:<>Send signal<Send className="h-4 w-4"/></>}</button>
  </form>;
}