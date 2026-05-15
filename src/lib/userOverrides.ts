import type { EnrichedCard, UserOverride } from "../types";

export function applyUserOverrides(
  card: EnrichedCard,
  ov: UserOverride | undefined
): EnrichedCard {
  const out: EnrichedCard = { ...card, priceManual: false, imgManual: false };
  if (ov?.price != null) {
    out.market = ov.price;
    out.priceManual = true;
  }
  if (ov?.img) {
    out.img = ov.img;
    out.imgLarge = ov.img;
    out.imgManual = true;
    out.imgProxy = false;
  }
  return out;
}
