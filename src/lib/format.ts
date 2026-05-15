export function rarityGlow(r = ""): string | null {
  const s = r.toLowerCase();
  if (s.includes("rainbow") || s.includes("immersive")) return "#d946ef";
  if (s.includes("gold") || s.includes("ur secret")) return "#f59e0b";
  if (
    s.includes("special illustration") ||
    s.includes("sir") ||
    s.includes("chr") ||
    s.includes("art rare") ||
    s.includes(" ar")
  )
    return "#f472b6";
  if (s.includes("shiny")) return "#34d399";
  if (
    s.includes("vmax") ||
    s.includes("gx") ||
    s.includes("lv.x") ||
    s.includes("★★")
  )
    return "#c084fc";
  if (s.includes(" ex") || s.includes("ex ")) return "#fb923c";
  if (s.includes(" v ") || s.includes("ultra rare v")) return "#818cf8";
  if (s.includes("holo") && !s.includes("reverse")) return "#60a5fa";
  if (s.includes("reverse") || s.includes("trainer gallery")) return "#7dd3fc";
  if (s.includes("promo")) return "#2dd4bf";
  return null;
}

export function fmtPrice(p: number | null | undefined): string | null {
  return p != null ? `$${Number(p).toFixed(2)}` : null;
}
