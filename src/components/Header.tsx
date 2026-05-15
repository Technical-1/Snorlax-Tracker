type Props = {
  ownedCount: number;
  total: number;
  pct: number;
  ownedValue: number;
  loadingApi: boolean;
  loadMsg: string;
};

export function Header({ ownedCount, total, pct, ownedValue, loadingApi, loadMsg }: Props) {
  return (
    <div style={{background:"rgba(0,0,0,0.6)",borderBottom:"2px solid rgba(251,191,36,0.2)",padding:"18px 16px 12px",textAlign:"center",backdropFilter:"blur(14px)",position:"sticky",top:0,zIndex:200}}>
      <div style={{fontSize:30}}>😴</div>
      <h1 style={{margin:"2px 0 0",fontSize:"clamp(17px,4vw,24px)",fontWeight:900,letterSpacing:"0.07em",
        background:"linear-gradient(90deg,#fbbf24,#fde68a,#f59e0b)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",textTransform:"uppercase"}}>
        Snorlax Master Checklist
      </h1>
      <div style={{fontSize:10,color:"#374151",marginTop:1}}>Every card · Every language · Every variant · Live prices</div>

      {/* Stats row */}
      {!loadingApi && (
        <div style={{display:"flex",gap:16,justifyContent:"center",marginTop:8,flexWrap:"wrap"}}>
          {(
            [
              [`${ownedCount}/${total}`, "Cards Owned"],
              [`${pct}%`, "Complete"],
              [`$${ownedValue.toFixed(2)}`, "Collection Value"],
            ] as [string, string][]
          ).map(([val,lbl])=>(
            <div key={lbl} style={{textAlign:"center"}}>
              <div style={{fontSize:14,fontWeight:800,color:"#fbbf24"}}>{val}</div>
              <div style={{fontSize:9,color:"#475569"}}>{lbl}</div>
            </div>
          ))}
        </div>
      )}

      {/* Progress bar */}
      {!loadingApi && (
        <div style={{maxWidth:380,margin:"8px auto 0"}}>
          <div style={{background:"rgba(255,255,255,0.07)",borderRadius:999,height:5,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${pct}%`,background:"linear-gradient(90deg,#fbbf24,#f59e0b)",borderRadius:999,transition:"width 0.5s",boxShadow:"0 0 6px rgba(251,191,36,0.4)"}} />
          </div>
        </div>
      )}
      {loadingApi && <div style={{marginTop:8,fontSize:10,color:"#374151"}}>⏳ {loadMsg}</div>}
    </div>
  );
}
