import type { EnrichedCard } from "../types";
import { ERA_COLOR, ERA_LABEL } from "../data/cards";
import { GridCard } from "./GridCard";
import { ListRow } from "./ListRow";

type Props = {
  groupKeys: string[];
  grouped: Record<string, EnrichedCard[]>;
  view: string;
  owned: Set<string>;
  shownCount: number;
  onToggle: (id: string) => void;
  onOpen: (card: EnrichedCard) => void;
};

export function CardCollection({ groupKeys, grouped, view, owned, shownCount, onToggle, onOpen }: Props) {
  return (
    <div style={{maxWidth:960,margin:"0 auto",padding:"2px 12px"}}>
      {groupKeys.map(era => {
        const cards = grouped[era]; if(!cards?.length) return null;
        const oc = cards.filter(c=>owned.has(c.id)).length;
        const col = ERA_COLOR[era]||"#6b7280";
        const groupValue = cards.filter(c=>owned.has(c.id)&&c.market).reduce((s,c)=>s+(c.market||0),0);
        return (
          <div key={era} style={{marginBottom:18}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,padding:"6px 11px",borderRadius:8,background:`linear-gradient(90deg,${col}18,transparent)`,borderLeft:`3px solid ${col}`}}>
              <span style={{fontWeight:800,fontSize:12,color:"#e2e8f0"}}>{ERA_LABEL[era]||era}</span>
              <div style={{flex:1,height:1,background:"rgba(255,255,255,0.04)"}} />
              {groupValue > 0 && <span style={{fontSize:9,color:"#f59e0b",fontWeight:700}}>${groupValue.toFixed(2)}</span>}
              <span style={{fontSize:9,color:"#475569"}}>{oc}/{cards.length}</span>
              <div style={{width:40,height:3,borderRadius:999,background:"rgba(255,255,255,0.06)",overflow:"hidden"}}>
                <div style={{height:"100%",width:`${cards.length?oc/cards.length*100:0}%`,background:col,borderRadius:999,transition:"width 0.4s"}} />
              </div>
            </div>
            {view==="grid"
              ? <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(120px,1fr))",gap:6}}>{cards.map(c=><GridCard key={c.id} card={c} isOwned={owned.has(c.id)} onToggle={onToggle} onOpen={onOpen}/>)}</div>
              : <div style={{display:"flex",flexDirection:"column",gap:4}}>{cards.map(c=><ListRow key={c.id} card={c} isOwned={owned.has(c.id)} onToggle={onToggle} onOpen={onOpen}/>)}</div>
            }
          </div>
        );
      })}
      {shownCount===0&&<div style={{textAlign:"center",color:"#374151",padding:48,fontSize:13}}>No cards match. 😴</div>}
    </div>
  );
}
