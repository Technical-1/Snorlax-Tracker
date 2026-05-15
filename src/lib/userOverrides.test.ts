import { describe, it, expect } from "vitest";
import { applyUserOverrides } from "./userOverrides";
import type { EnrichedCard } from "../types";

const base: EnrichedCard = {
  id: "c1", name: "Snorlax", set: "Jungle", num: "11/64", rarity: "Rare",
  era: "Wizards", lang: "EN", img: "auto.png", imgLarge: "auto-l.png",
  market: 5, low: 4, high: 6, artist: "A", imgProxy: true,
};

describe("applyUserOverrides", () => {
  it("returns a copy with manual flags false when no override", () => {
    const out = applyUserOverrides(base, undefined);
    expect(out).not.toBe(base);
    expect(out.market).toBe(5);
    expect(out.img).toBe("auto.png");
    expect(out.priceManual).toBe(false);
    expect(out.imgManual).toBe(false);
    expect(out.imgProxy).toBe(true);
  });
  it("manual price always wins and sets priceManual", () => {
    const out = applyUserOverrides(base, { price: 99 });
    expect(out.market).toBe(99);
    expect(out.priceManual).toBe(true);
  });
  it("manual price of 0 still wins", () => {
    const out = applyUserOverrides(base, { price: 0 });
    expect(out.market).toBe(0);
    expect(out.priceManual).toBe(true);
  });
  it("manual image wins, sets imgManual, suppresses proxy badge", () => {
    const out = applyUserOverrides(base, { img: "mine.png", imgKind: "url" });
    expect(out.img).toBe("mine.png");
    expect(out.imgLarge).toBe("mine.png");
    expect(out.imgManual).toBe(true);
    expect(out.imgProxy).toBe(false);
  });
  it("does not mutate the input card", () => {
    applyUserOverrides(base, { price: 1, img: "x" });
    expect(base.market).toBe(5);
    expect(base.img).toBe("auto.png");
  });
});
