import type { ApiCardData, ApiData, Card, EnrichedCard, PriceTier } from "../types";

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
  return {
    ...c,
    img: api.img || null,
    imgLarge: api.imgLarge || null,
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
  try {
    let page = 1;
    while (true) {
      onProgress(`Fetching card data (page ${page})…`);
      const res = await fetch(
        `https://api.pokemontcg.io/v2/cards?q=nationalPokedexNumbers:143&pageSize=250&page=${page}`
      );
      const data = await res.json();
      for (const card of data.data || []) {
        result[card.id] = mapApiCard(card);
      }
      if (!data.data || data.data.length < 250) break;
      page++;
      if (page > 6) break;
    }
  } catch (e) {
    console.warn("API error", e);
  }
  return result;
}
