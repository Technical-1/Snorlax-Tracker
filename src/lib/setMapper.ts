import type { TcgdexSetSummary } from "./tcgdexClient";

// Hand-maintained overrides for sets whose app name does not exactly match a
// TCGdex set name. Keyed by the app's `set` string (English-equivalent form
// after stripSetLangSuffix). `null` = deliberately unmappable (→ proxy/none).
// Extended during the Task 6 review gate as unmatched names are discovered.
export const SET_ID_OVERRIDES: Record<string, string | null> = {
  // EN sets whose TCGdex name drops the "EX " prefix.
  "EX FireRed & LeafGreen": "ex6",
  "EX Team Rocket Returns": "ex7",
  "EX Dragon Frontiers": "ex15",
  // EN subset with a different TCGdex name.
  "Hidden Fates: Shiny Vault": "sma",
  // Deliberately unmappable (no TCGdex equivalent) → proxy/none.
  "Expansion Sheet 1 – Vending": null,
  "Quick Starter Gift Set – Red Deck": null,
  "Unnumbered Promos": null,
};

export type SetMap = {
  resolve(appSetName: string): string | null;
  unmatched(): string[];
};

export function buildSetMap(
  sets: Pick<TcgdexSetSummary, "id" | "name">[],
  overrides: Record<string, string | null> = SET_ID_OVERRIDES
): SetMap {
  const byName = new Map<string, string>();
  for (const s of sets) byName.set(s.name.toLowerCase(), s.id);
  const misses = new Set<string>();
  return {
    resolve(appSetName) {
      if (Object.prototype.hasOwnProperty.call(overrides, appSetName)) {
        return overrides[appSetName];
      }
      const hit = byName.get((appSetName ?? "").toLowerCase());
      if (hit) return hit;
      misses.add(appSetName);
      return null;
    },
    unmatched() {
      return [...misses];
    },
  };
}
