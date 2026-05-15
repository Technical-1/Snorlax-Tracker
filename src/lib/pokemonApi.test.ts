import { describe, it, expect } from "vitest";
import { pickPriceTier, enrichCard } from "./pokemonApi";
import type { Card, ApiData } from "../types";

describe("pickPriceTier", () => {
  it("prefers holofoil over normal over reverseHolofoil over 1stEditionHolofoil", () => {
    expect(
      pickPriceTier({
        normal: { market: 1 },
        holofoil: { market: 2 },
        reverseHolofoil: { market: 3 },
      })
    ).toEqual({ market: 2 });
    expect(
      pickPriceTier({
        reverseHolofoil: { market: 3 },
        "1stEditionHolofoil": { market: 4 },
      })
    ).toEqual({ market: 3 });
    expect(pickPriceTier({ "1stEditionHolofoil": { market: 4 } })).toEqual({
      market: 4,
    });
  });
  it("returns null when no known tier present", () => {
    expect(pickPriceTier({})).toBeNull();
  });
});

describe("enrichCard", () => {
  const base: Card = {
    id: "jungle-11",
    name: "Snorlax",
    set: "Jungle",
    num: "11/64",
    rarity: "Rare Holo",
    era: "Wizards",
    lang: "EN",
  };
  const apiData: ApiData = {
    "jungle-11": {
      img: "small.png",
      imgLarge: "large.png",
      market: 10,
      low: 8,
      high: 12,
      priceTypes: ["holofoil"],
      allPrices: { holofoil: { market: 10, low: 8, high: 12 } },
      artist: "Ken Sugimori",
    },
  };

  it("joins api data onto a normal card", () => {
    const e = enrichCard(base, apiData);
    expect(e.img).toBe("small.png");
    expect(e.market).toBe(10);
    expect(e.artist).toBe("Ken Sugimori");
  });

  it("uses reverseHolofoil prices for -rh ids via apiId", () => {
    const rh: Card = { ...base, id: "jungle-11-rh", apiId: "jungle-11" };
    const data: ApiData = {
      "jungle-11": {
        ...apiData["jungle-11"],
        market: 10,
        low: 8,
        high: 12,
        allPrices: {
          holofoil: { market: 10, low: 8, high: 12 },
          reverseHolofoil: { market: 99, low: 90, high: 110 },
        },
      },
    };
    const e = enrichCard(rh, data);
    expect(e.market).toBe(99);
    expect(e.low).toBe(90);
    expect(e.high).toBe(110);
    expect(e.img).toBe("small.png");
  });

  it("returns nulls when no api data exists", () => {
    const e = enrichCard({ ...base, id: "jp-vending", lang: "JP" }, {});
    expect(e.img).toBeNull();
    expect(e.market).toBeNull();
    expect(e.artist).toBe("");
  });

  it("does not populate allPrices (preserved original behavior)", () => {
    const e = enrichCard(base, apiData);
    expect(e.allPrices).toBeUndefined();
  });
});
