import { describe, it, expect } from "vitest";
import { mergeImport } from "./mergeImport";
import type { ParsedRow } from "./collectionCsv";
import type { UserOverrides } from "../types";

const validIds = new Set(["c1", "c2", "c3"]);
const always = () => true;

describe("mergeImport", () => {
  it("syncs owned to the file for known ids; unknown ids ignored", () => {
    const cur = new Set(["c1", "c2"]);
    const rows: ParsedRow[] = [
      { id: "c1", owned: true },
      { id: "c2", owned: false },
      { id: "zz", owned: true },
    ];
    const r = mergeImport(cur, {}, rows, { validIds, withinBudget: always });
    expect([...r.owned].sort()).toEqual(["c1"]);
    expect(r.report.unknownIds).toBe(1);
  });
  it("cards absent from the file keep their current owned state", () => {
    const cur = new Set(["c3"]);
    const r = mergeImport(cur, {}, [{ id: "c1", owned: true }], { validIds, withinBudget: always });
    expect([...r.owned].sort()).toEqual(["c1", "c3"]);
  });
  it("file price/url-image win when present; blank keeps existing", () => {
    const cur: UserOverrides = { c1: { price: 5, img: "old", imgKind: "url" } };
    const rows: ParsedRow[] = [{ id: "c1", owned: true, price: 9 }];
    const r = mergeImport(new Set(), cur, rows, { validIds, withinBudget: always });
    expect(r.overrides.c1).toEqual({ price: 9, img: "old", imgKind: "url" });
    expect(r.report.pricesSet).toBe(1);
  });
  it("over-budget upload images are skipped and counted", () => {
    const rows: ParsedRow[] = [
      { id: "c1", owned: false, img: "data:image/webp;base64,BIG", imgKind: "upload" },
    ];
    const r = mergeImport(new Set(), {}, rows, { validIds, withinBudget: () => false });
    expect(r.overrides.c1).toBeUndefined();
    expect(r.report.imagesSkipped).toBe(1);
    expect(r.report.imagesSet).toBe(0);
  });
});
