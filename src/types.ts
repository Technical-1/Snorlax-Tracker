export type Card = {
  id: string;
  name: string;
  set: string;
  num: string;
  rarity: string;
  era: string;
  lang: string;
  apiId?: string;
  note?: string;
};

export type PriceTier = {
  market?: number | null;
  low?: number | null;
  high?: number | null;
};

export type ApiCardData = {
  img: string | null;
  imgLarge: string | null;
  market: number | null;
  low: number | null;
  high: number | null;
  priceTypes: string[];
  allPrices: Record<string, PriceTier>;
  artist: string;
};

// Map of fetch id -> ApiCardData
export type ApiData = Record<string, ApiCardData>;

// What components consume. allPrices is intentionally optional and left
// unpopulated by enrichCard to preserve original behavior.
export type EnrichedCard = Card & {
  img: string | null;
  imgLarge: string | null;
  market: number | null;
  low: number | null;
  high: number | null;
  artist: string;
  imgProxy?: boolean;
  priceManual?: boolean;
  imgManual?: boolean;
  allPrices?: Record<string, PriceTier>;
};

export type UserOverride = {
  img?: string;
  imgKind?: "url" | "upload";
  price?: number;
};

export type UserOverrides = Record<string, UserOverride>;
