import {Link} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import {Volume2} from 'lucide-react';
import OrbitToolStatus from '@/components/orbit/OrbitToolStatus';
export default function OrbitMessage({message,onSpeak}) {
  const user=message.role==='user';
  if(!['user','assistant'].includes(message.role))return null;
  return <div className={`rounded-2xl p-4 text-sm leading-relaxed ${user?'ml-9 bg-secondary':'mr-3 border border-border bg-card'}`}>
    <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{user?'Te':'ORBIT / AI'}</span>
    {user?<p className="whitespace-pre-wrap">{message.content}</p>:<ReactMarkdown className="space-y-3 break-words [&_a]:text-accent [&_a]:underline [&_li]:ml-4 [&_ul]:list-disc" components={{a:({href,children})=>href?.startsWith('/')&&!href.startsWith('//')?<Link to={href}>{children}</Link>:<span>{children}</span>}}>{message.content || ''}</ReactMarkdown>}
    {message.tool_calls?.map((tool,i)=><OrbitToolStatus key={i} tool={tool}/>)}
    {!user&&message.content&&<button onClick={()=>onSpeak(message.content)} aria-label="Válasz felolvasása" className="mt-2 flex min-h-11 items-center gap-2 text-xs text-muted-foreground hover:text-accent"><Volume2 className="h-4 w-4"/>Felolvasás</button>}
  </div>;
}