import type { EnrichedCard } from "../types";
import { fmtPrice } from "../lib/format";
import { LANG_FLAG } from "../data/cards";

type Props = {
  modal: EnrichedCard | null;
  isOwned: boolean;
  loadingApi: boolean;
  onToggle: (id: string) => void;
  onClose: () => void;
};

export function CardModal({ modal, isOwned, loadingApi, onToggle, onClose }: Props) {
  if (!modal) return null;
  const prices = modal.allPrices || {};
  const priceRows = Object.entries(prices).filter(([, v]) => v?.market);
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center",padding:16,overflowY:"auto"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"linear-gradient(140deg,#1e1b4b,#0f0c29)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:16,padding:20,maxWidth:360,width:"100%"}}>
        <div style={{textAlign:"center"}}>
          {(modal.imgLarge||modal.img)
            ? <img src={modal.imgLarge||modal.img||undefined} alt={modal.name} style={{maxWidth:"100%",maxHeight:280,borderRadius:10,boxShadow:"0 6px 40px rgba(0,0,0,0.6)"}} />
            : <div style={{fontSize:72,padding:16}}>😴</div>}
          <div style={{marginTop:10,fontWeight:900,fontSize:16,color:"#e2e8f0"}}>{modal.name}</div>
          <div style={{color:"#94a3b8",fontSize:12,marginTop:3}}>{LANG_FLAG[modal.lang]} {modal.set}</div>
          <div style={{color:"#64748b",fontSize:11,marginTop:2}}>#{modal.num} · {modal.rarity}</div>
          {modal.artist && <div style={{color:"#475569",fontSize:10,marginTop:2}}>🎨 {modal.artist}</div>}
          {modal.note && <div style={{color:"#3b82f6",fontSize:10,marginTop:4,fontStyle:"italic"}}>{modal.note}</div>}
        </div>

        {/* Prices */}
        {priceRows.length > 0 && (
          <div style={{marginTop:14,background:"rgba(0,0,0,0.3)",borderRadius:10,padding:"10px 12px"}}>
            <div style={{fontSize:10,color:"#475569",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:6}}>TCGPlayer Prices</div>
            {priceRows.map(([type, p]) => (
              <div key={type} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                <span style={{fontSize:10,color:"#64748b",textTransform:"capitalize"}}>{type.replace(/([A-Z])/g," $1").trim()}</span>
                <span style={{fontSize:11,fontWeight:700,color:"#fbbf24"}}>{fmtPrice(p.market)} <span style={{fontSize:9,color:"#475569",fontWeight:400}}>({fmtPrice(p.low)}–{fmtPrice(p.high)})</span></span>
              </div>
            ))}
          </div>
        )}
        {modal.market == null && modal.lang === "EN" && !loadingApi && (
          <div style={{marginTop:10,textAlign:"center",fontSize:10,color:"#374151"}}>No price data available for this card</div>
        )}
        {modal.lang !== "EN" && (
          <div style={{marginTop:10,textAlign:"center",fontSize:10,color:"#374151"}}>Price data only available for English cards via TCGPlayer</div>
        )}

        <div style={{marginTop:14,display:"flex",gap:8,justifyContent:"center"}}>
          <button onClick={()=>onToggle(modal.id)} style={{padding:"8px 16px",borderRadius:999,border:"none",background:isOwned?"#ef4444":"#4ade80",color:"#000",fontWeight:800,fontSize:12,cursor:"pointer"}}>
            {isOwned?"Remove ✗":"Add to Collection ✓"}
          </button>
          <button onClick={onClose} style={{padding:"8px 14px",borderRadius:999,border:"1px solid rgba(255,255,255,0.15)",background:"transparent",color:"#94a3b8",fontSize:12,cursor:"pointer"}}>Close</button>
        </div>
      </div>
    </div>
  );
}
