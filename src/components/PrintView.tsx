import { CARDS, ERA_ORDER, ERA_LABEL } from "../data/cards";

type Props = { owned: Set<string> };

export function PrintView({ owned }: Props) {
  const byEra: Record<string, typeof CARDS> = {};
  for (const c of CARDS) {
    (byEra[c.era] ??= []).push(c);
  }
  const eras = ERA_ORDER.filter((e) => byEra[e]?.length);
  return (
    <div id="print-root" className="print-only">
      <h1 style={{ fontSize: 18, margin: "0 0 4px" }}>Snorlax Master Checklist</h1>
      <div style={{ fontSize: 11, marginBottom: 12 }}>
        {owned.size}/{CARDS.length} owned
      </div>
      {eras.map((era) => {
        const list = byEra[era];
        const oc = list.filter((c) => owned.has(c.id)).length;
        return (
          <div key={era} style={{ breakInside: "avoid", marginBottom: 10 }}>
            <h2 style={{ fontSize: 13, margin: "8px 0 3px", borderBottom: "1px solid #000" }}>
              {ERA_LABEL[era] || era} — {oc}/{list.length}
            </h2>
            {list.map((c) => (
              <div key={c.id} style={{ fontSize: 10, lineHeight: 1.5 }}>
                {owned.has(c.id) ? "☑" : "☐"} {c.name} · {c.set} · #{c.num} · {c.rarity}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
