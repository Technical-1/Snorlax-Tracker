import { useEffect, useState } from "react";
import type { EnrichedCard, PriceTier, UserOverride } from "../types";
import { fmtPrice } from "../lib/format";
import { LANG_FLAG } from "../data/cards";

type Props = {
  card: EnrichedCard;
  fetchedMarket: number | null;
  fetchedAllPrices?: Record<string, PriceTier>;
  override?: UserOverride;
  isOwned: boolean;
  loadingApi: boolean;
  onToggleOwned: () => void;
  onSetImageUrl: (url: string) => { ok: boolean; error?: string };
  onUploadImage: (file: File) => Promise<{ ok: boolean; error?: string }>;
  onClearImage: () => void;
  onSetPrice: (n: number) => void;
  onClearPrice: () => void;
  onClose: () => void;
};

const sectionStyle = { marginTop:14, background:"rgba(0,0,0,0.3)", borderRadius:10, padding:"12px 14px" } as const;
const labelStyle = { fontSize:10, color:"#94a3b8", textTransform:"uppercase" as const, letterSpacing:"0.1em", marginBottom:8 };
const inputStyle = { flex:1, minWidth:0, padding:"7px 10px", borderRadius:7, border:"1px solid rgba(255,255,255,0.12)", background:"rgba(255,255,255,0.06)", color:"#e2e8f0", fontSize:12, outline:"none" } as const;
const btnStyle = { padding:"7px 12px", borderRadius:7, border:"none", background:"#6366f1", color:"#fff", fontWeight:700, fontSize:11, cursor:"pointer" } as const;
const ghostBtn = { padding:"7px 12px", borderRadius:7, border:"1px solid rgba(255,255,255,0.15)", background:"transparent", color:"#94a3b8", fontSize:11, cursor:"pointer" } as const;

export function CardDetail(props: Props) {
  const {
    card, fetchedMarket, fetchedAllPrices, override, isOwned, loadingApi,
    onToggleOwned, onSetImageUrl, onUploadImage, onClearImage, onSetPrice, onClearPrice, onClose,
  } = props;

  const [urlDraft, setUrlDraft] = useState("");
  const [priceDraft, setPriceDraft] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [fileKey, setFileKey] = useState(0);

  useEffect(() => {
    setUrlDraft(override?.imgKind === "url" ? override.img ?? "" : "");
    setPriceDraft(override?.price != null ? String(override.price) : "");
    setErr(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card.id]);

  useEffect(() => {
    setUrlDraft(override?.imgKind === "url" ? override.img ?? "" : "");
  }, [override?.img, override?.imgKind]);

  useEffect(() => {
    setPriceDraft(override?.price != null ? String(override.price) : "");
  }, [override?.price]);

  const priceRows = Object.entries(fetchedAllPrices || {}).filter(([, v]) => v?.market);

  const applyUrl = () => {
    const u = urlDraft.trim();
    if (!/^https?:\/\/.+/i.test(u)) { setErr("Enter a valid http(s) image URL."); return; }
    const r = onSetImageUrl(u);
    setErr(r.ok ? null : r.error ?? "Could not save image.");
  };
  const applyFile = async (file: File | undefined) => {
    if (!file) return;
    try {
      const r = await onUploadImage(file);
      setErr(r.ok ? null : r.error ?? "Could not save image.");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed.");
    }
  };
  const applyPrice = () => {
    const n = Number(priceDraft);
    if (priceDraft.trim() === "" || !Number.isFinite(n) || n < 0) { setErr("Enter a price ≥ 0."); return; }
    onSetPrice(n);
    setErr(null);
  };

  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",zIndex:999,display:"flex",alignItems:"flex-start",justifyContent:"center",padding:16,overflowY:"auto"}}>
      <div onClick={(e)=>e.stopPropagation()} style={{background:"linear-gradient(140deg,#1e1b4b,#0f0c29)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:16,padding:20,maxWidth:380,width:"100%",margin:"auto"}}>
        <div style={{textAlign:"center"}}>
          {(card.imgLarge||card.img)
            ? <img src={card.imgLarge||card.img||undefined} alt={card.name} style={{maxWidth:"100%",maxHeight:300,borderRadius:10,boxShadow:"0 6px 40px rgba(0,0,0,0.6)"}} />
            : <div style={{fontSize:72,padding:16}}>😴</div>}
          {card.imgManual
            ? <div style={{marginTop:6,fontSize:9,color:"#a5b4fc"}}>Your manual image</div>
            : card.imgProxy && (card.imgLarge||card.img)
            ? <div style={{marginTop:6,fontSize:9,color:"#fbbf24"}}>English card image (no localized scan available)</div>
            : null}
          <div style={{marginTop:10,fontWeight:900,fontSize:16,color:"#e2e8f0"}}>{card.name}</div>
          <div style={{color:"#94a3b8",fontSize:12,marginTop:3}}>{LANG_FLAG[card.lang]} {card.set}</div>
          <div style={{color:"#64748b",fontSize:11,marginTop:2}}>#{card.num} · {card.rarity}</div>
          {card.artist && <div style={{color:"#475569",fontSize:10,marginTop:2}}>🎨 {card.artist}</div>}
          {card.note && <div style={{color:"#3b82f6",fontSize:10,marginTop:4,fontStyle:"italic"}}>{card.note}</div>}
        </div>

        <div style={{marginTop:14,display:"flex",justifyContent:"center"}}>
          <button onClick={onToggleOwned} style={{padding:"9px 18px",borderRadius:999,border:"none",background:isOwned?"#ef4444":"#4ade80",color:"#000",fontWeight:800,fontSize:12,cursor:"pointer"}}>
            {isOwned?"Remove from Collection ✗":"Add to Collection ✓"}
          </button>
        </div>

        <div style={sectionStyle}>
          <div style={labelStyle}>Image</div>
          <div style={{display:"flex",gap:6}}>
            <input value={urlDraft} onChange={(e)=>setUrlDraft(e.target.value)} placeholder="Paste image URL" style={inputStyle} />
            <button onClick={applyUrl} style={btnStyle}>Set URL</button>
          </div>
          <div style={{display:"flex",gap:6,alignItems:"center",marginTop:8}}>
            <input key={fileKey} type="file" accept="image/*" onChange={async (e)=>{ await applyFile(e.target.files?.[0]); setFileKey((k)=>k+1); }} style={{fontSize:11,color:"#94a3b8",flex:1}} />
            {card.imgManual && <button onClick={onClearImage} style={ghostBtn}>Clear image</button>}
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={labelStyle}>Price</div>
          <div style={{display:"flex",gap:6}}>
            <input value={priceDraft} onChange={(e)=>setPriceDraft(e.target.value)} inputMode="decimal" placeholder="Your price (USD)" style={inputStyle} />
            <button onClick={applyPrice} style={btnStyle}>Set price</button>
            {card.priceManual && <button onClick={onClearPrice} style={ghostBtn}>Clear</button>}
          </div>
          <div style={{marginTop:8,fontSize:11,color:"#64748b"}}>
            {card.priceManual ? <>Showing your price: <span style={{color:"#a5b4fc",fontWeight:700}}>{fmtPrice(card.market)}</span> · </> : null}
            {fetchedMarket != null
              ? <>Fetched (TCGplayer): {fmtPrice(fetchedMarket)}</>
              : (!loadingApi ? "No fetched price for this card" : "Fetching price…")}
          </div>
          {priceRows.length > 0 && (
            <div style={{marginTop:8}}>
              {priceRows.map(([type, p]) => (
                <div key={type} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                  <span style={{fontSize:10,color:"#64748b",textTransform:"capitalize"}}>{type.replace(/([A-Z])/g," $1").trim()}</span>
                  <span style={{fontSize:11,fontWeight:700,color:"#fbbf24"}}>{fmtPrice(p.market)} <span style={{fontSize:9,color:"#475569",fontWeight:400}}>({fmtPrice(p.low)}–{fmtPrice(p.high)})</span></span>
                </div>
              ))}
            </div>
          )}
        </div>

        {err && <div style={{marginTop:10,fontSize:10,color:"#f87171",textAlign:"center"}}>{err}</div>}

        <div style={{marginTop:16,display:"flex",justifyContent:"center"}}>
          <button onClick={onClose} style={{padding:"8px 16px",borderRadius:999,border:"1px solid rgba(255,255,255,0.15)",background:"transparent",color:"#94a3b8",fontSize:12,cursor:"pointer"}}>Close</button>
        </div>
      </div>
    </div>
  );
}
