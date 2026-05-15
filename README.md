# Snorlax Master Checklist

A single-page React app that tracks every Snorlax Pokémon TCG card across
every era, language, and variant. Card images are resolved offline from the
TCGdex API; live TCGPlayer prices come from the pokemontcg.io API. Owned
cards are saved to the browser's `localStorage`.

**Live demo:** https://snorlax-tracker.vercel.app

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
- `npm run resolve-images` — regenerate the card image map (see below)

## Card images

Images are resolved offline from the TCGdex API into
`src/data/card-images.generated.ts` (committed). Regenerate after editing
`src/data/cards.ts`:

```bash
npm run resolve-images
```

A high-confidence match (set mapped + exact collector number + language, with
the card name verified) uses the real scan. Otherwise the English/base card
image is used as a labeled proxy (an "EN proxy" badge is shown). Otherwise the
😴 placeholder. Reverse-holo cards reuse their base card's image. Prices remain
live from pokemontcg.io (cards whose IDs predate pokemontcg.io's ID scheme have
images but no price).

## Manual overrides

Click any card to open its detail view. There you can mark it owned, set a
manual image (paste a URL or upload a file — uploads are downscaled and stored
in `localStorage`), and set a manual price. Manual values override fetched data
everywhere (including the collection-value total) and persist across reloads
under `localStorage["snorlax_user_v1"]`. Owned state remains under
`localStorage["snorlax_v3"]`.

## Export / import / print

The toolbar under the filters has three actions:

- **Export CSV** — downloads `snorlax-collection.csv` (one row per card:
  owned, plus your manual price and manual image). Use it to move your
  collection to another device.
- **Import CSV** — upload that file on another browser/device. Owned state is
  synced to the file; manual price/image from the file overwrite local values
  when present (blank file fields keep what's already there). Images that
  would exceed the storage budget are skipped and reported.
- **Print** — opens a print-friendly checklist of every card (name, set,
  number, rarity, owned ✓), grouped by era — no images or prices.

## Structure

- `src/data/cards.ts` — the full card database + era/language constants
- `src/data/card-images.generated.ts` — resolved image map (generated; do not edit by hand)
- `src/types.ts` — shared card / user-data type definitions
- `src/lib/pokemonApi.ts` — price fetch (id-batched), price-tier selection, card enrichment
- `src/lib/priceQuery.ts` — pokemontcg.io id-query builder
- `src/lib/format.ts` — rarity glow color + price formatting
- `src/lib/tcgdexClient.ts` — TCGdex HTTP client (dependency-injected fetch)
- `src/lib/resolveUtils.ts` — collector-number / language / name helpers
- `src/lib/setMapper.ts` — set-name → TCGdex set-id map + overrides
- `src/lib/imageResolver.ts` — confidence + English-proxy + reverse-holo resolution
- `src/lib/userOverrides.ts` — manual image/price override resolution
- `src/lib/collectionCsv.ts` — CSV export/import serialization
- `src/lib/mergeImport.ts` — merge imported CSV into local owned/manual state
- `src/lib/imageDownscale.ts` — client-side image downscaling for uploads
- `src/lib/storageBudget.ts` — localStorage budget accounting for stored images
- `scripts/resolve-images.ts` — offline resolver that writes the generated map
- `src/hooks/` — `useCardPrices` (fetch), `useOwnedCards` (owned persistence),
  `useUserCardData` (manual image/price persistence)
- `src/components/` — Header, Filters, CardCollection, GridCard, ListRow,
  CardDetail, CollectionToolbar, PrintView
- `src/App.tsx` — composition + filtering/sorting/grouping

## Deployment

Hosted on [Vercel](https://snorlax-tracker.vercel.app). The production build
(`npm run build` → `dist/`) is a fully static bundle; Vercel rebuilds and
redeploys on every push to `main`.

## License

[MIT](LICENSE) © Jacob Kanfer

## Author

Jacob Kanfer — [GitHub](https://github.com/Technical-1)
