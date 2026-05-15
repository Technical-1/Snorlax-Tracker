import { describe, it, expect } from "vitest";
import { pickPriceTier, enrichCard } from "./pokemonApi";
import type { Card, ApiData } from "../types";
import { CARD_IMAGES } from "../data/card-images.generated";

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
  });

  it("does not populate allPrices (preserved original behavior)", () => {
    const e = enrichCard(base, apiData);
    expect(e.allPrices).toBeUndefined();
  });

  it("image comes from the generated map (low/high), price from apiData", () => {
    const anyId = Object.keys(CARD_IMAGES).find((k) => CARD_IMAGES[k].base) as string;
    const base = CARD_IMAGES[anyId].base as string;
    const c = { id: anyId, name: "Snorlax", set: "S", num: "1", rarity: "Rare", era: "E", lang: "EN" };
    const apiData = { [anyId]: { img: "ignored.png", imgLarge: "ignored2.png", market: 10, low: 8, high: 12, priceTypes: ["holofoil"], allPrices: { holofoil: { market: 10 } }, artist: "A" } };
    const e = enrichCard(c as any, apiData as any);
    expect(e.img).toBe(`${base}/low.webp`);
    expect(e.imgLarge).toBe(`${base}/high.webp`);
    expect(e.market).toBe(10);
    expect(e.imgProxy).toBe(CARD_IMAGES[anyId].proxy);
  });

  it("unknown/none image → img null", () => {
    const c = { id: "___not_in_map___", name: "Snorlax", set: "S", num: "1", rarity: "Rare", era: "E", lang: "EN" };
    const e = enrichCard(c as any, {} as any);
    expect(e.img).toBeNull();
    expect(e.imgLarge).toBeNull();
  });
});
