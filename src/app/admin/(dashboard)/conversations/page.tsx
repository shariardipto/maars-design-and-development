import { adminRead } from "@/lib/server/admin";
type Conversation = {id:string;channel:string;sender:string;created_at:string;messages:{role:string;content:string}[]};
export default async function ConversationsPage(){
 let rows:Conversation[];
 try{rows=await adminRead("conversations") as Conversation[];}catch{return <p role="alert">You do not have access to conversations.</p>;}
 return <div><h1 className="mb-2 text-2xl font-semibold">Conversations</h1><p className="mb-8 text-gray-500">Recent website assistant conversations and incoming WhatsApp messages.</p>{rows.length===0?<div className="admin-empty">No conversations yet. Connect a provider in Integrations to get started.</div>:<div className="space-y-5">{rows.map((row)=><details className="admin-panel" key={row.id}><summary><strong>{row.sender}</strong> · {row.channel} · {row.created_at} UTC</summary><div className="mt-5 space-y-3">{row.messages.map((m,i)=><div key={i} className="border-l-2 border-orange-200 pl-4"><small className="uppercase text-gray-500">{m.role}</small><p className="whitespace-pre-wrap break-words">{m.content}</p></div>)}</div></details>)}</div>}</div>;
}
