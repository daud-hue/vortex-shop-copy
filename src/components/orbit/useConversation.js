import {useEffect,useRef,useState} from 'react';
import {base44} from '@/api/base44Client';
export default function useConversation(userId) {
  const [messages,setMessages]=useState([]);const [busy,setBusy]=useState(false);const [error,setError]=useState('');
  const conversation=useRef(null),unsubscribe=useRef(null),timer=useRef(null),locked=useRef(false);
  const receive=data=>{conversation.current=data;setMessages((data.messages||[]).filter(m=>!m.hidden));const last=data.messages?.at(-1);if(last?.role==='assistant'&&last.content&&!last.tool_calls?.some(t=>['pending','running','in_progress'].includes(t.status))){clearTimeout(timer.current);setBusy(false);}};
  const attach=conv=>{unsubscribe.current?.();receive(conv);unsubscribe.current=base44.agents.subscribeToConversation(conv.id,receive);};
  useEffect(()=>{
    let active=true;const key=`orbit-conversation-${userId}`;
    if(userId){const id=sessionStorage.getItem(key);if(id){setBusy(true);base44.agents.getConversation(id).then(conv=>{if(active)attach(conv);}).catch(()=>{if(active){sessionStorage.removeItem(key);setError('A korábbi beszélgetés nem tölthető be. Küldj üzenetet egy új indításához.');}}).finally(()=>{if(active)setBusy(false);});}}
    return()=>{active=false;unsubscribe.current?.();clearTimeout(timer.current);conversation.current=null;};
  },[userId]);
  const send=async text=>{
    if(!text.trim()||busy||locked.current||!userId)return false;
    locked.current=true;setBusy(true);setError('');
    try {
      let conv=conversation.current;
      if(!conv){conv=await base44.agents.createConversation({agent_name:'atelier_concierge',metadata:{name:'ORBIT · Personal selection'}});attach(conv);sessionStorage.setItem(`orbit-conversation-${userId}`,conv.id);}
      setMessages(prev=>[...prev,{id:`local-${Date.now()}`,role:'user',content:text}]);
      timer.current=setTimeout(()=>{setBusy(false);setError('A válasz késik. Frissítsd a beszélgetést, mielőtt újra küldesz.');},60000);
      await base44.agents.addMessage(conv,{role:'user',content:text.slice(0,2000)});
      receive(await base44.agents.getConversation(conv.id));return true;
    } catch {clearTimeout(timer.current);setBusy(false);setError('Nem sikerült elküldeni az üzenetet. Próbáld újra.');return false;}
    finally {locked.current=false;}
  };
  const refresh=async()=>{if(!conversation.current)return;setError('');try{receive(await base44.agents.getConversation(conversation.current.id));}catch{setError('A frissítés nem sikerült. Próbáld újra.');}};
  return {messages,busy,error,send,refresh};
}