import type { ApiCardData, ApiData, Card, EnrichedCard, PriceTier } from "../types";
import { CARD_IMAGES } from "../data/card-images.generated";
import { API_IDS } from "../data/cards";
import { buildIdQueries } from "./priceQuery";

type RawPrices = Record<string, PriceTier>;

export function pickPriceTier(prices: RawPrices): PriceTier | null {
  return (
    prices.holofoil ||
    prices.normal ||
    prices.reverseHolofoil ||
    prices["1stEditionHolofoil"] ||
    null
  );
}

export function mapApiCard(card: any): ApiCardData {
  const prices: RawPrices = card.tcgplayer?.prices || {};
  const tier = pickPriceTier(prices);
  return {
    img: card.images?.small || null,
    imgLarge: card.images?.large || null,
    market: tier?.market ?? null,
    low: tier?.low ?? null,
    high: tier?.high ?? null,
    priceTypes: Object.keys(prices),
    allPrices: prices,
    artist: card.artist || "",
  };
}

export function enrichCard(c: Card, apiData: ApiData): EnrichedCard {
  const fetchId = c.apiId || c.id;
  const api = apiData[fetchId] || ({} as Partial<ApiCardData>);
  let market = api.market ?? null;
  let low = api.low ?? null;
  let high = api.high ?? null;
  if (c.id.includes("-rh") && api.allPrices?.reverseHolofoil) {
    const rh = api.allPrices.reverseHolofoil;
    market = rh.market ?? null;
    low = rh.low ?? null;
    high = rh.high ?? null;
  }
  const gen = CARD_IMAGES[c.id];
  const base = gen?.base ?? null;
  return {
    ...c,
    img: base ? `${base}/low.webp` : null,
    imgLarge: base ? `${base}/high.webp` : null,
    imgProxy: gen?.proxy ?? false,
    market,
    low,
    high,
    artist: api.artist || "",
  };
}

export async function fetchAllCardData(
  onProgress: (msg: string) => void
): Promise<ApiData> {
  const result: ApiData = {};
  const queries = buildIdQueries(API_IDS, 40);
  try {
    for (let i = 0; i < queries.length; i++) {
      onProgress(`Fetching card data (batch ${i + 1}/${queries.length})…`);
      const url =
        `https://api.pokemontcg.io/v2/cards?q=${encodeURIComponent(queries[i])}` +
        `&pageSize=250`;
      const res = await fetch(url);
      const data = await res.json();
      for (const card of data.data || []) {
        result[card.id] = mapApiCard(card);
      }
    }
  } catch (e) {
    console.warn("API error", e);
  }
  return result;
}
