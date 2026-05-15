import { describe, it, expect } from "vitest";
import { buildIdQueries } from "./priceQuery";

describe("buildIdQueries", () => {
  it("chunks ids into `id:(\"a\" OR \"b\")` query strings", () => {
    expect(buildIdQueries(["jungle-11", "base4-30"], 10)).toEqual([
      'id:("jungle-11" OR "base4-30")',
    ]);
  });
  it("splits into multiple chunks by size", () => {
    const q = buildIdQueries(["a", "b", "c"], 2);
    expect(q).toEqual(['id:("a" OR "b")', 'id:("c")']);
  });
  it("returns [] for no ids", () => {
    expect(buildIdQueries([], 50)).toEqual([]);
  });
});
