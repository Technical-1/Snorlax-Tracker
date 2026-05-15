import type { Card } from "../types";
import type { TcgdexCard } from "./tcgdexClient";
import { collectorNumber, isSnorlaxName, langCode, stripSetLangSuffix } from "./resolveUtils";

export type CardLookup = (
  tcgdexLang: string,
  appSetName: string,
  collectorNum: string
) => Promise<TcgdexCard | null>;

export type ResolvedImage = { base: string | null; proxy: boolean };
export type ResolvedMap = Record<string, ResolvedImage>;

const NONE: ResolvedImage = { base: null, proxy: false };

async function confidentHit(
  lookup: CardLookup,
  tcgdexLang: string,
  appSetName: string,
  num: string
): Promise<string | null> {
  const n = collectorNumber(num);
  if (!n) return null;
  const hit = await lookup(tcgdexLang, appSetName, n);
  if (!hit || !hit.image) return null;
  if (hit.localId !== n) return null;
  if (!isSnorlaxName(hit.name)) return null;
  return hit.image;
}

export async function resolveImages(
  cards: Card[],
  lookup: CardLookup,
  englishCompanions: Card[] = cards
): Promise<ResolvedMap> {
  const out: ResolvedMap = {};

  // Pass 1: resolve every non-reverse-holo card.
  for (const c of cards) {
    if (c.id.includes("-rh")) continue;

    // 1a. Try a confident match in the card's own language.
    const own = await confidentHit(lookup, langCode(c.lang), c.set, c.num);
    if (own) {
      out[c.id] = { base: own, proxy: false };
      continue;
    }

    // 1b. English proxy: strip the language suffix, look up English.
    const enSet = stripSetLangSuffix(c.set);
    const enHit = await confidentHit(lookup, "en", enSet, c.num);
    if (enHit) {
      out[c.id] = { base: enHit, proxy: c.lang !== "EN" };
      continue;
    }

    // 1c. Last resort: an English companion card with same stripped set+number.
    //     The companion list is pre-curated (trusted Snorlax cards), so we skip
    //     the isSnorlaxName guard and allow a looser set match when the companion
    //     list is explicitly provided (englishCompanions !== cards).
    const n = collectorNumber(c.num);
    let companionImage: string | null = null;
    if (n) {
      const explicitCompanions = englishCompanions !== cards;
      for (const e of englishCompanions) {
        if (e.lang !== "EN" || e.id.includes("-rh")) continue;
        if (collectorNumber(e.num) !== n) continue;
        // Set match: exact stripped match, or skip if companions were explicitly provided.
        if (!explicitCompanions && stripSetLangSuffix(e.set) !== enSet) continue;
        // Try a resolved image from out first.
        if (out[e.id]?.base) {
          companionImage = out[e.id].base;
          break;
        }
        // Otherwise do a direct lookup without isSnorlaxName (card is trusted from our list).
        const cn = collectorNumber(e.num);
        if (!cn) continue;
        const hit = await lookup("en", e.set, cn);
        if (hit?.image && hit.localId === cn) {
          companionImage = hit.image;
          break;
        }
      }
    }
    out[c.id] = companionImage ? { base: companionImage, proxy: true } : NONE;
  }

  // Pass 2: reverse-holo cards reuse their base (apiId) card's result.
  for (const c of cards) {
    if (!c.id.includes("-rh")) continue;
    const baseId = c.apiId ?? c.id.replace(/-rh$/, "");
    out[c.id] = out[baseId] ? { ...out[baseId] } : NONE;
  }

  return out;
}

export function summarize(map: ResolvedMap) {
  let real = 0, proxy = 0, none = 0;
  for (const v of Object.values(map)) {
    if (v.base && !v.proxy) real++;
    else if (v.base && v.proxy) proxy++;
    else none++;
  }
  return { real, proxy, none, total: real + proxy + none };
}
