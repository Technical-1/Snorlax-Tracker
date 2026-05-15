import type { UserOverride, UserOverrides } from "../types";
import type { ParsedRow } from "./collectionCsv";

export type MergeReport = {
  ownedSet: number;
  pricesSet: number;
  imagesSet: number;
  imagesSkipped: number;
  unknownIds: number;
};

export type MergeResult = {
  owned: Set<string>;
  overrides: UserOverrides;
  report: MergeReport;
};

export function mergeImport(
  currentOwned: Set<string>,
  currentOverrides: UserOverrides,
  rows: ParsedRow[],
  opts: { validIds: Set<string>; withinBudget: (serialized: string) => boolean }
): MergeResult {
  const owned = new Set(currentOwned);
  const overrides: UserOverrides = JSON.parse(JSON.stringify(currentOverrides));
  const report: MergeReport = {
    ownedSet: 0,
    pricesSet: 0,
    imagesSet: 0,
    imagesSkipped: 0,
    unknownIds: 0,
  };

  for (const row of rows) {
    if (!opts.validIds.has(row.id)) {
      report.unknownIds++;
      continue;
    }
    if (row.owned) {
      owned.add(row.id);
      report.ownedSet++;
    } else {
      owned.delete(row.id);
    }

    const rec: UserOverride = { ...(overrides[row.id] ?? {}) };
    if (row.price != null) {
      rec.price = row.price;
      report.pricesSet++;
    }
    if (row.img != null && row.img !== "") {
      const kind = row.imgKind ?? "url";
      if (kind === "upload") {
        const projected = {
          ...overrides,
          [row.id]: { ...rec, img: row.img, imgKind: kind },
        };
        if (opts.withinBudget(JSON.stringify(projected))) {
          rec.img = row.img;
          rec.imgKind = "upload";
          report.imagesSet++;
        } else {
          report.imagesSkipped++;
        }
      } else {
        rec.img = row.img;
        rec.imgKind = "url";
        report.imagesSet++;
      }
    }
    if (rec.img != null || rec.price != null) overrides[row.id] = rec;
  }

  return { owned, overrides, report };
}
