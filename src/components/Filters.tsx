import type { Dispatch, SetStateAction } from "react";
import { ERA_ORDER, ERA_LABEL, ALL_LANGS, LANG_FLAG, LANG_LABEL } from "../data/cards";

type Props = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  eraFilter: string;
  setEraFilter: Dispatch<SetStateAction<string>>;
  langFilter: string;
  setLangFilter: Dispatch<SetStateAction<string>>;
  ownedOnly: boolean;
  setOwnedOnly: Dispatch<SetStateAction<boolean>>;
  view: string;
  setView: Dispatch<SetStateAction<string>>;
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
  shownCount: number;
  total: number;
};

export function Filters({
  search, setSearch, eraFilter, setEraFilter, langFilter, setLangFilter,
  ownedOnly, setOwnedOnly, view, setView, sortBy, setSortBy, shownCount, total,
}: Props) {
  return (
    <div style={{maxWidth:960,margin:"0 auto",padding:"11px 12px 4px"}}>
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍  Search name, set, number, rarity…"
        style={{width:"100%",boxSizing:"border-box",padding:"8px 12px",borderRadius:8,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.05)",color:"#e2e8f0",fontSize:12,marginBottom:8,outline:"none"}} />

      {/* Era */}
      <div style={{marginBottom:7}}>
        <div style={{fontSize:9,color:"#374151",textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:4}}>Era</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
          {["All",...ERA_ORDER].map(e=>(
            <button key={e} onClick={()=>setEraFilter(e)} style={{padding:"3px 9px",borderRadius:999,border:`1px solid ${eraFilter===e?"#fbbf24":"rgba(255,255,255,0.08)"}`,background:eraFilter===e?"rgba(251,191,36,0.15)":"rgba(255,255,255,0.03)",color:eraFilter===e?"#fbbf24":"#94a3b8",fontSize:9,cursor:"pointer",fontWeight:eraFilter===e?700:400}}>
              {e==="All"?"All Eras":ERA_LABEL[e]||e}
            </button>
          ))}
        </div>
      </div>

      {/* Lang */}
      <div style={{marginBottom:7}}>
        <div style={{fontSize:9,color:"#374151",textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:4}}>Language</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
          {ALL_LANGS.map(l=>(
            <button key={l} onClick={()=>setLangFilter(l)} style={{padding:"3px 9px",borderRadius:999,border:`1px solid ${langFilter===l?"#fbbf24":"rgba(255,255,255,0.08)"}`,background:langFilter===l?"rgba(251,191,36,0.15)":"rgba(255,255,255,0.03)",color:langFilter===l?"#fbbf24":"#94a3b8",fontSize:9,cursor:"pointer",fontWeight:langFilter===l?700:400}}>
              {l==="All"?"All Languages":`${LANG_FLAG[l]} ${LANG_LABEL[l]||l}`}
            </button>
          ))}
        </div>
      </div>

      {/* Controls row */}
      <div style={{display:"flex",alignItems:"center",gap:7,flexWrap:"wrap",marginTop:4}}>
        {(
          [
            ["✓ Owned", ownedOnly, ()=>setOwnedOnly(!ownedOnly), ownedOnly?"#4ade80":"#94a3b8"],
            [view==="grid"?"☰ List":"⊞ Grid", false, ()=>setView(v=>v==="grid"?"list":"grid"), "#94a3b8"],
          ] as [string, boolean, () => void, string][]
        ).map(([lbl,active,fn,col])=>(
          <button key={lbl} onClick={fn} style={{padding:"3px 10px",borderRadius:999,border:`1px solid ${active?"rgba(74,222,128,0.4)":"rgba(255,255,255,0.08)"}`,background:active?"rgba(74,222,128,0.1)":"rgba(255,255,255,0.03)",color:col,fontSize:9,cursor:"pointer",fontWeight:active?700:400}}>{lbl}</button>
        ))}
        {/* Sort */}
        {["era","price","name"].map(s=>(
          <button key={s} onClick={()=>setSortBy(s)} style={{padding:"3px 10px",borderRadius:999,border:`1px solid ${sortBy===s?"rgba(251,191,36,0.4)":"rgba(255,255,255,0.08)"}`,background:sortBy===s?"rgba(251,191,36,0.1)":"rgba(255,255,255,0.03)",color:sortBy===s?"#fbbf24":"#64748b",fontSize:9,cursor:"pointer",fontWeight:sortBy===s?700:400}}>
            {s==="era"?"By Era":s==="price"?"By Price":"By Name"}
          </button>
        ))}
        <span style={{fontSize:9,color:"#1e293b"}}>{shownCount} shown · {total} total · tap=own · dbl=details</span>
      </div>
    </div>
  );
}
