import {useEffect,useRef,useState} from 'react';
import {Link,useLocation} from 'react-router-dom';
import {AudioLines,ArrowUpRight,Loader2} from 'lucide-react';
import {Sheet,SheetContent,SheetTitle,SheetDescription} from '@/components/ui/sheet';
import {useAuth} from '@/lib/AuthContext';
import useConversation from '@/components/orbit/useConversation';
import useVoice from '@/components/orbit/useVoice';
import OrbitMessage from '@/components/orbit/OrbitMessage';
import OrbitComposer from '@/components/orbit/OrbitComposer';
const starters=['Ajánlj egy különleges fejhallgatót.','Milyen tárgyak illenek egy minimalista otthonba?','Hasonlítsd össze az audiotermékeket.'];
export default function OrbitAssistant({open,onOpenChange}) {
  const {user,isAuthenticated}=useAuth();const location=useLocation();const chat=useConversation(user?.id);
  const [input,setInput]=useState('');const voice=useVoice(setInput);const bottom=useRef(null);
  useEffect(()=>{if(!open)voice.stop();},[open]);
  useEffect(()=>{onOpenChange(false);},[location.pathname]);
  useEffect(()=>{bottom.current?.scrollIntoView({block:'nearest'});},[chat.messages,chat.busy]);
  const send=async text=>{if(chat.busy||!text.trim())return;voice.stop();if(await chat.send(text))setInput('');};
  return <Sheet open={open} onOpenChange={onOpenChange}><SheetContent className="flex h-[100dvh] w-full flex-col gap-0 p-0 sm:max-w-[480px]">
    <div className="border-b border-border p-6 pr-12"><div className="mb-4 flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent"><AudioLines className="h-5 w-5"/></div><div><SheetTitle className="font-heading text-xl font-black tracking-tight">ORBIT</SheetTitle><span className="font-mono text-[9px] uppercase tracking-widest text-accent">Your personal curator</span></div></div><SheetDescription>Beszélj róla. Találjuk meg együtt.</SheetDescription></div>
    {!isAuthenticated?<div className="flex flex-1 flex-col justify-center p-7"><h3 className="text-3xl font-bold tracking-tight">Egy személyesebb választás.</h3><p className="mt-4 text-sm leading-relaxed text-muted-foreground">Jelentkezz be a katalógust ismerő AI-asszisztenshez. Diktálhatsz magyarul, összehasonlíthatsz termékeket, és felolvastathatod a válaszokat.</p><Link to={`/login?returnTo=${encodeURIComponent(location.pathname+location.search)}`} className="mt-8 flex min-h-12 items-center justify-between rounded-full bg-accent px-6 text-sm font-semibold text-accent-foreground">Belépés az ORBIT-hoz<ArrowUpRight className="h-4 w-4"/></Link></div>:<>
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5" role="log" aria-label="ORBIT beszélgetés">
        {!chat.messages.length&&<div className="py-5"><p className="text-2xl font-semibold tracking-tight">Szia. Mi kerül ma<br/>a pályádra?</p><p className="mb-6 mt-3 text-sm leading-relaxed text-muted-foreground">A valódi kínálatból ajánlok. Kérdezz formáról, anyagról vagy árról.</p>{starters.map(text=><button key={text} disabled={chat.busy} onClick={()=>send(text)} className="mb-2 flex min-h-12 w-full items-center justify-between gap-4 rounded-xl border border-border p-3 text-left text-xs hover:border-accent disabled:opacity-50">{text}<ArrowUpRight className="h-4 w-4 shrink-0"/></button>)}</div>}
        {chat.messages.map((message,i)=><OrbitMessage key={message.id||i} message={message} onSpeak={voice.speak}/>)}
        {chat.busy&&<p role="status" className="flex items-center gap-2 text-xs text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin"/>ORBIT a válaszon dolgozik…</p>}
        {chat.error&&<div role="alert" className="rounded-xl border border-destructive/40 p-3 text-sm"><p>{chat.error}</p><button onClick={chat.refresh} className="mt-2 min-h-11 text-accent underline">Beszélgetés frissítése</button></div>}<div ref={bottom}/>
      </div><OrbitComposer value={input} onChange={setInput} onSend={send} busy={chat.busy} voice={voice}/>
    </>}
  </SheetContent></Sheet>;
}