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

export function GridCard({ card, isOwned, onToggle, onOpen }: Props) {
  const glow = rarityGlow(card.rarity);
  const [imgErr, setImgErr] = useState(false);
  return (
    <div onClick={()=>onToggle(card.id)} onDoubleClick={()=>onOpen(card)}
      title={`${card.name} — ${card.set}\nDouble-click for details`}
      style={{ borderRadius:10,overflow:"hidden",cursor:"pointer",display:"flex",flexDirection:"column",
        background:isOwned?"rgba(74,222,128,0.1)":"rgba(255,255,255,0.04)",
        border:`1px solid ${isOwned?"rgba(74,222,128,0.4)":glow?`${glow}44`:"rgba(255,255,255,0.07)"}`,
        boxShadow:isOwned&&glow?`0 0 12px ${glow}44`:"none", transition:"all 0.15s" }}>
      <div style={{background:"rgba(0,0,0,0.35)",minHeight:88,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
        {card.img && !imgErr
          ? <img src={card.img} onError={()=>setImgErr(true)} alt={card.name} style={{width:"100%",maxWidth:112,display:"block",margin:"auto",opacity:isOwned?1:0.55,transition:"opacity 0.2s"}} />
          : <div style={{fontSize:28,padding:"12px 0",opacity:0.25}}>😴</div>
        }
        {isOwned && <div style={{position:"absolute",top:4,right:4,width:17,height:17,borderRadius:999,background:"#4ade80",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:900,color:"#000"}}>✓</div>}
        <div style={{position:"absolute",top:3,left:4,fontSize:11}}>{LANG_FLAG[card.lang]||"🌐"}</div>
      </div>
      <div style={{padding:"6px 7px 7px",flex:1,display:"flex",flexDirection:"column",gap:1}}>
        <div style={{fontSize:10,fontWeight:700,color:isOwned?"#4ade80":"#e2e8f0",lineHeight:1.2}}>{card.name}</div>
        <div style={{fontSize:9,color:"#64748b",lineHeight:1.3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{card.set}</div>
        <div style={{fontSize:9,color:"#475569"}}>#{card.num}</div>
        <div style={{fontSize:8,color:glow||"#475569",marginTop:1,lineHeight:1.2}}>{card.rarity}</div>
        {card.market != null && (
          <div style={{marginTop:3,fontSize:10,fontWeight:700,color:"#fbbf24"}}>{fmtPrice(card.market)}</div>
        )}
        {card.note && <div style={{fontSize:7.5,color:"#374151",fontStyle:"italic",marginTop:1,lineHeight:1.2}}>{card.note}</div>}
      </div>
    </div>
  );
}
