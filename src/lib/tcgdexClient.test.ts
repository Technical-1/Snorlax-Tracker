import { describe, it, expect, vi } from "vitest";
import { createTcgdexClient } from "./tcgdexClient";

describe("tcgdexClient", () => {
  it("fetches a set's cards for a language", async () => {
    const fetchFn = vi.fn(async () => ({
      ok: true,
      json: async () => ({ id: "base2", name: "Jungle", cards: [{ id: "base2-11", image: "u", localId: "11", name: "Snorlax" }] }),
    })) as unknown as typeof fetch;
    const c = createTcgdexClient(fetchFn);
    const set = await c.getSet("en", "base2");
    expect(fetchFn).toHaveBeenCalledWith("https://api.tcgdex.net/v2/en/sets/base2");
    expect(set?.cards[0].localId).toBe("11");
  });

  it("lists sets for a language", async () => {
    const fetchFn = vi.fn(async () => ({
      ok: true,
      json: async () => [{ id: "base2", name: "Jungle", cardCount: { total: 64, official: 64 } }],
    })) as unknown as typeof fetch;
    const c = createTcgdexClient(fetchFn);
    const sets = await c.listSets("ja");
    expect(fetchFn).toHaveBeenCalledWith("https://api.tcgdex.net/v2/ja/sets");
    expect(sets[0].id).toBe("base2");
  });

  it("returns null on non-ok set fetch", async () => {
    const fetchFn = vi.fn(async () => ({ ok: false, json: async () => ({}) })) as unknown as typeof fetch;
    const c = createTcgdexClient(fetchFn);
    expect(await c.getSet("en", "nope")).toBeNull();
  });
});
