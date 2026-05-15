import { describe, it, expect } from "vitest";
import { buildIdQueries } from "./priceQuery";

describe("buildIdQueries", () => {
  it("builds `id:a OR id:b` clauses (pokemontcg.io syntax)", () => {
    expect(buildIdQueries(["base2-11", "sv8-144"], 10)).toEqual([
      "id:base2-11 OR id:sv8-144",
    ]);
  });
  it("splits into multiple chunks by size", () => {
    expect(buildIdQueries(["a", "b", "c"], 2)).toEqual([
      "id:a OR id:b",
      "id:c",
    ]);
  });
  it("returns [] for no ids", () => {
    expect(buildIdQueries([], 50)).toEqual([]);
  });
});
