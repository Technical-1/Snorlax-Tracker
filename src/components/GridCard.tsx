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
  const [hover, setHover] = useState(false);
  return (
    <div onClick={() => onOpen(card)}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      title={`${card.name} — ${card.set}\nClick for details`}
      style={{ borderRadius:10,overflow:"hidden",cursor:"pointer",display:"flex",flexDirection:"column",
        background:isOwned?"rgba(74,222,128,0.1)":"rgba(255,255,255,0.04)",
        border:`1px solid ${isOwned?"rgba(74,222,128,0.4)":glow?`${glow}44`:"rgba(255,255,255,0.07)"}`,
        boxShadow:hover?"0 4px 16px rgba(0,0,0,0.45)":isOwned&&glow?`0 0 12px ${glow}44`:"none",
        transform:hover?"translateY(-2px)":"none", transition:"all 0.15s" }}>
      <div style={{background:"rgba(0,0,0,0.35)",minHeight:88,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
        {card.img && !imgErr
          ? <img src={card.img} onError={()=>setImgErr(true)} alt={card.name} style={{width:"100%",maxWidth:112,display:"block",margin:"auto",opacity:isOwned?1:0.55,transition:"opacity 0.2s"}} />
          : <div style={{fontSize:28,padding:"12px 0",opacity:0.25}}>😴</div>
        }
        <button aria-label={isOwned ? "Owned" : "Mark owned"}
          onClick={(e) => { e.stopPropagation(); onToggle(card.id); }}
          style={{position:"absolute",top:4,right:4,width:19,height:19,borderRadius:6,cursor:"pointer",
            border:`2px solid ${isOwned?"#4ade80":"rgba(255,255,255,0.4)"}`,
            background:isOwned?"#4ade80":"rgba(0,0,0,0.4)",color:"#000",fontSize:11,fontWeight:900,
            display:"flex",alignItems:"center",justifyContent:"center",padding:0,lineHeight:1}}>
          {isOwned ? "✓" : ""}
        </button>
        <div style={{position:"absolute",top:3,left:4,fontSize:11}}>{LANG_FLAG[card.lang]||"🌐"}</div>
        {card.imgManual && card.img && (
          <div style={{position:"absolute",bottom:3,left:4,fontSize:7,fontWeight:700,color:"#000",background:"rgba(129,140,248,0.9)",borderRadius:3,padding:"1px 4px"}}>manual</div>
        )}
        {!card.imgManual && card.imgProxy && card.img && (
          <div style={{position:"absolute",bottom:3,left:4,fontSize:7,fontWeight:700,color:"#000",background:"rgba(251,191,36,0.85)",borderRadius:3,padding:"1px 4px"}}>EN proxy</div>
        )}
      </div>
      <div style={{padding:"6px 7px 7px",flex:1,display:"flex",flexDirection:"column",gap:1}}>
        <div style={{fontSize:10,fontWeight:700,color:isOwned?"#4ade80":"#e2e8f0",lineHeight:1.2}}>{card.name}</div>
        <div style={{fontSize:9,color:"#64748b",lineHeight:1.3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{card.set}</div>
        <div style={{fontSize:9,color:"#475569"}}>#{card.num}</div>
        <div style={{fontSize:8,color:glow||"#475569",marginTop:1,lineHeight:1.2}}>{card.rarity}</div>
        {card.market != null && (
          <div style={{marginTop:3,fontSize:10,fontWeight:700,color:card.priceManual?"#818cf8":"#fbbf24"}} title={card.priceManual?"your manual price":"market price"}>{fmtPrice(card.market)}{card.priceManual?" ✎":""}</div>
        )}
        {card.note && <div style={{fontSize:7.5,color:"#374151",fontStyle:"italic",marginTop:1,lineHeight:1.2}}>{card.note}</div>}
      </div>
    </div>
  );
}
