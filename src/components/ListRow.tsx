import { useState } from "react";
import type { EnrichedCard } from "../types";
import { rarityGlow, fmtPrice } from "../lib/format";
import { LANG_FLAG } from "../data/cards";

type Props = {
  card: EnrichedCard;
  isOwned: boolean;
  onToggle: (id: string) => void;
  onOpen: (card: EnrichedCard) => void;
};

export function ListRow({ card, isOwned, onToggle, onOpen }: Props) {
  const glow = rarityGlow(card.rarity);
  const [imgErr, setImgErr] = useState(false);
  return (
    <div onClick={()=>onToggle(card.id)} onDoubleClick={()=>onOpen(card)}
      style={{ display:"flex",alignItems:"center",gap:9,padding:"7px 10px",borderRadius:8,cursor:"pointer",transition:"all 0.12s",
        background:isOwned?"rgba(74,222,128,0.07)":"rgba(255,255,255,0.03)",
        border:`1px solid ${isOwned?"rgba(74,222,128,0.2)":"rgba(255,255,255,0.06)"}` }}>
      {card.img && !imgErr
        ? <img src={card.img} onError={()=>setImgErr(true)} alt="" style={{width:34,height:48,objectFit:"contain",borderRadius:3,flexShrink:0,opacity:isOwned?1:0.5}} />
        : <div style={{width:34,height:48,background:"rgba(255,255,255,0.04)",borderRadius:3,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0,opacity:0.3}}>😴</div>}
      <div style={{width:17,height:17,borderRadius:4,border:`2px solid ${isOwned?"#4ade80":"rgba(255,255,255,0.18)"}`,background:isOwned?"#4ade80":"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:900,color:"#000",flexShrink:0,transition:"all 0.12s"}}>{isOwned?"✓":""}</div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontWeight:700,fontSize:11,color:isOwned?"#4ade80":"#e2e8f0",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{LANG_FLAG[card.lang]} {card.name}</div>
        <div style={{fontSize:9,color:"#64748b",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{card.set} · #{card.num}</div>
        {card.note && <div style={{fontSize:8,color:"#374151",fontStyle:"italic"}}>{card.note}</div>}
      </div>
      <div style={{textAlign:"right",flexShrink:0}}>
        {card.market != null && <div style={{fontSize:11,fontWeight:700,color:"#fbbf24"}}>{fmtPrice(card.market)}</div>}
        <div style={{fontSize:8,color:glow||"#475569",marginTop:1,maxWidth:90,textAlign:"right"}}>{card.rarity}</div>
      </div>
    </div>
  );
}
