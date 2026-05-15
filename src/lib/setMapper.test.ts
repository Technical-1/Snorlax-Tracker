import { describe, it, expect } from "vitest";
import { buildSetMap, SET_ID_OVERRIDES } from "./setMapper";

const enSets = [
  { id: "base2", name: "Jungle" },
  { id: "base4", name: "Base Set 2" },
  { id: "tcgp-A1", name: "Genetic Apex" },
];

describe("buildSetMap", () => {
  it("maps by exact (case-insensitive) name", () => {
    const m = buildSetMap(enSets);
    expect(m.resolve("Jungle")).toBe("base2");
    expect(m.resolve("jungle")).toBe("base2");
    expect(m.resolve("Genetic Apex")).toBe("tcgp-A1");
  });
  it("applies overrides over name match", () => {
    const m = buildSetMap(enSets, { "Base Set 2": "base4" });
    expect(m.resolve("Base Set 2")).toBe("base4");
  });
  it("returns null and records unmatched names", () => {
    const m = buildSetMap(enSets);
    expect(m.resolve("Nonexistent Vending Set")).toBeNull();
    expect(m.unmatched()).toContain("Nonexistent Vending Set");
  });
  it("ships a default override table object", () => {
    expect(typeof SET_ID_OVERRIDES).toBe("object");
  });
});
