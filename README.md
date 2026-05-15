# Snorlax Master Checklist

A single-page React app that tracks every Snorlax Pokémon TCG card across
every era, language, and variant — with live images and TCGPlayer prices
fetched from the public pokemontcg.io API. Owned cards are saved to the
browser's `localStorage`.

## Run

```bash
npm install
npm run dev
```

Then open the printed local URL.

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — type-check and build to `dist/`
- `npm run preview` — preview the production build
- `npm run typecheck` — TypeScript check only
- `npm test` — run unit tests (Vitest)

## Structure

- `src/data/cards.ts` — the full card database + era/language constants
- `src/lib/pokemonApi.ts` — API fetch, price-tier selection, card enrichment
- `src/lib/format.ts` — rarity glow color + price formatting
- `src/hooks/` — `useCardPrices` (fetch), `useOwnedCards` (persistence)
- `src/components/` — Header, Filters, CardCollection, GridCard, ListRow, CardModal
- `src/App.tsx` — composition + filtering/sorting/grouping
