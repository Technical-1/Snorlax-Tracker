import { describe, it, expect } from "vitest";
import { serializeCsv, parseCsv } from "./collectionCsv";
import type { Card, UserOverrides } from "../types";

const cards: Card[] = [
  { id: "a-1", name: "Snorlax", set: "Jungle", num: "11/64", rarity: "Rare", era: "Wizards", lang: "EN" },
  { id: "b,2", name: 'Quote " Card', set: "Set, Two", num: "1", rarity: "Common", era: "XY", lang: "EN" },
];

describe("serializeCsv", () => {
  it("emits a header + one row per card with owned yes/no and quoting", () => {
    const owned = new Set(["a-1"]);
    const ov: UserOverrides = { "a-1": { price: 12.5, img: "data:image/webp;base64,AA,BB", imgKind: "upload" } };
    const out = serializeCsv(cards, owned, ov);
    const lines = out.split("\n");
    expect(lines[0]).toBe("id,name,set,number,owned,manual_price,manual_image_kind,manual_image");
    expect(lines[1]).toBe('a-1,Snorlax,Jungle,11/64,yes,12.5,upload,"data:image/webp;base64,AA,BB"');
    expect(lines[2]).toBe('"b,2","Quote "" Card","Set, Two",1,no,,,');
  });
});

describe("parseCsv", () => {
  it("round-trips serializeCsv and keys rows for import (ignores name/set/number)", () => {
    const owned = new Set(["a-1"]);
    const ov: UserOverrides = { "a-1": { price: 12.5, img: "data:image/webp;base64,AA,BB", imgKind: "upload" } };
    const rows = parseCsv(serializeCsv(cards, owned, ov));
    expect(rows).toEqual([
      { id: "a-1", owned: true, price: 12.5, imgKind: "upload", img: "data:image/webp;base64,AA,BB" },
      { id: "b,2", owned: false },
    ]);
  });
  it("tolerates reordered/missing optional columns (keys by header name)", () => {
    const rows = parseCsv("owned,id\nyes,x-1\nno,x-2");
    expect(rows).toEqual([
      { id: "x-1", owned: true },
      { id: "x-2", owned: false },
    ]);
  });
  it("treats a non-numeric price as absent but keeps the rest of the row", () => {
    const rows = parseCsv("id,owned,manual_price\nz-1,yes,abc");
    expect(rows).toEqual([{ id: "z-1", owned: true }]);
  });
  it("throws on empty input or a missing id column", () => {
    expect(() => parseCsv("")).toThrow(/csv/i);
    expect(() => parseCsv("name,owned\nfoo,yes")).toThrow(/id/i);
  });
});
