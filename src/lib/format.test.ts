import { describe, it, expect } from "vitest";
import { rarityGlow, fmtPrice } from "./format";

describe("rarityGlow", () => {
  it("returns magenta for rainbow and immersive", () => {
    expect(rarityGlow("Secret Rare – Rainbow")).toBe("#d946ef");
    expect(rarityGlow("★ Immersive Rare")).toBe("#d946ef");
  });
  it("returns amber for gold", () => {
    expect(rarityGlow("Secret Rare – Gold")).toBe("#f59e0b");
  });
  it("returns blue for plain holo but not reverse holo", () => {
    expect(rarityGlow("Rare Holo")).toBe("#60a5fa");
    expect(rarityGlow("Rare – Reverse Holo")).toBe("#7dd3fc");
  });
  it("returns null for plain rarities", () => {
    expect(rarityGlow("Common")).toBeNull();
    expect(rarityGlow("")).toBeNull();
  });
});

describe("fmtPrice", () => {
  it("formats numbers to 2dp with $", () => {
    expect(fmtPrice(12.5)).toBe("$12.50");
    expect(fmtPrice(0)).toBe("$0.00");
  });
  it("returns null for null/undefined", () => {
    expect(fmtPrice(null)).toBeNull();
    expect(fmtPrice(undefined)).toBeNull();
  });
});
