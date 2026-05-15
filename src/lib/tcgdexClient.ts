export type TcgdexSetSummary = { id: string; name: string; cardCount?: { total: number; official: number } };
export type TcgdexCard = { id: string; image?: string; localId: string; name: string };
export type TcgdexSet = { id: string; name: string; cards: TcgdexCard[] };

export type TcgdexClient = {
  listSets(lang: string): Promise<TcgdexSetSummary[]>;
  getSet(lang: string, setId: string): Promise<TcgdexSet | null>;
};

export function createTcgdexClient(fetchFn: typeof fetch = fetch): TcgdexClient {
  const base = "https://api.tcgdex.net/v2";
  return {
    async listSets(lang) {
      const res = await fetchFn(`${base}/${lang}/sets`);
      if (!res.ok) return [];
      return (await res.json()) as TcgdexSetSummary[];
    },
    async getSet(lang, setId) {
      const res = await fetchFn(`${base}/${lang}/sets/${setId}`);
      if (!res.ok) return null;
      return (await res.json()) as TcgdexSet;
    },
  };
}
