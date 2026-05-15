import { describe, it, expect } from "vitest";
import { resolveImages, type CardLookup } from "./imageResolver";
import type { Card } from "../types";

const card = (p: Partial<Card>): Card => ({
  id: "x", name: "Snorlax", set: "Jungle", num: "11/64",
  rarity: "Rare", era: "Wizards", lang: "EN", ...p,
});

describe("resolveImages", () => {
  it("high-confidence EN match → real image, proxy false", async () => {
    const lookup: CardLookup = async (lang, set, n) =>
      lang === "en" && set === "Jungle" && n === "11"
        ? { id: "base2-11", image: "https://assets.tcgdex.net/en/base/base2/11", localId: "11", name: "Snorlax" }
        : null;
    const out = await resolveImages([card({ id: "jungle-11" })], lookup);
    expect(out["jungle-11"]).toEqual({ base: "https://assets.tcgdex.net/en/base/base2/11", proxy: false });
  });

  it("rejects non-Snorlax name even on set+number hit (Snorlax Doll guard)", async () => {
    const lookup: CardLookup = async () =>
      ({ id: "x", image: "u", localId: "11", name: "カビゴンドール" });
    const out = await resolveImages([card({ id: "jp-x", lang: "JP", set: "Pokémon Jungle (JP)", num: "11/64" })], lookup, [card({ id: "jungle-11", set: "Jungle", num: "11/64" })]);
    expect(out["jp-x"].proxy).toBe(true);
  });

  it("foreign miss falls back to English proxy by stripped set + number", async () => {
    const lookup: CardLookup = async (lang) =>
      lang === "en"
        ? { id: "base2-11", image: "https://assets.tcgdex.net/en/base/base2/11", localId: "11", name: "Snorlax" }
        : null;
    const de = card({ id: "de-jungle-h", lang: "DE", set: "Jungle (DE)", num: "11/64" });
    const out = await resolveImages([de], lookup);
    expect(out["de-jungle-h"]).toEqual({ base: "https://assets.tcgdex.net/en/base/base2/11", proxy: true });
  });

  it("reverse-holo reuses its base card's resolved image", async () => {
    const lookup: CardLookup = async (_lang, _set, n) =>
      n === "27" ? { id: "base2-27", image: "https://assets.tcgdex.net/en/base/base2/27", localId: "27", name: "Snorlax" } : null;
    const base = card({ id: "jungle-27", set: "Jungle", num: "27/64" });
    const rh = card({ id: "jungle-27-rh", set: "Jungle", num: "27/64", apiId: "jungle-27" });
    const out = await resolveImages([base, rh], lookup);
    expect(out["jungle-27-rh"]).toEqual(out["jungle-27"]);
    expect(out["jungle-27-rh"].proxy).toBe(false);
  });

  it("no hit anywhere → base null, proxy false", async () => {
    const lookup: CardLookup = async () => null;
    const out = await resolveImages([card({ id: "jp-vending", lang: "JP", set: "Expansion Sheet 1 – Vending", num: "—" })], lookup);
    expect(out["jp-vending"]).toEqual({ base: null, proxy: false });
  });

  it("summarize() reports counts", async () => {
    const lookup: CardLookup = async (_lang, _set, n) =>
      n === "11" ? { id: "base2-11", image: "u", localId: "11", name: "Snorlax" } : null;
    const out = await resolveImages([card({ id: "jungle-11" }), card({ id: "none", num: "—" })], lookup);
    const { summarize } = await import("./imageResolver");
    expect(summarize(out)).toEqual({ real: 1, proxy: 0, none: 1, total: 2 });
  });
});
