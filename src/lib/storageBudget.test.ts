import { describe, it, expect } from "vitest";
import { withinBudget } from "./storageBudget";

describe("withinBudget", () => {
  it("accepts a small serialized payload", () => {
    expect(withinBudget(JSON.stringify({ a: 1 }), 4_000_000)).toBe(true);
  });
  it("rejects a payload over the byte budget", () => {
    const big = "x".repeat(10);
    expect(withinBudget(big, 5)).toBe(false);
  });
  it("uses a 4MB default budget", () => {
    expect(withinBudget("x".repeat(100))).toBe(true);
  });
});
