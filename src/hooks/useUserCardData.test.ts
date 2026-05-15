import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useUserCardData } from "./useUserCardData";

beforeEach(() => localStorage.clear());

describe("useUserCardData", () => {
  it("sets and persists a manual price", () => {
    const { result, unmount } = renderHook(() => useUserCardData());
    act(() => result.current.setPrice("c1", 12.5));
    expect(result.current.overrides["c1"].price).toBe(12.5);
    unmount();
    const { result: r2 } = renderHook(() => useUserCardData());
    expect(r2.current.overrides["c1"].price).toBe(12.5);
  });
  it("sets a url image and reports ok", () => {
    const { result } = renderHook(() => useUserCardData());
    let res: { ok: boolean } | undefined;
    act(() => { res = result.current.setImage("c1", "http://x/i.png", "url"); });
    expect(res!.ok).toBe(true);
    expect(result.current.overrides["c1"]).toEqual({ img: "http://x/i.png", imgKind: "url" });
  });
  it("rejects an upload that would exceed the budget", () => {
    const { result } = renderHook(() => useUserCardData({ budgetBytes: 10 }));
    let res: { ok: boolean; error?: string } | undefined;
    act(() => { res = result.current.setImage("c1", "data:image/webp;base64," + "A".repeat(50), "upload"); });
    expect(res!.ok).toBe(false);
    expect(res!.error).toMatch(/storage/i);
    expect(result.current.overrides["c1"]).toBeUndefined();
  });
  it("clearImage / clearPrice remove fields and prune empty records", () => {
    const { result } = renderHook(() => useUserCardData());
    act(() => { result.current.setPrice("c1", 3); result.current.setImage("c1", "u", "url"); });
    act(() => result.current.clearPrice("c1"));
    expect(result.current.overrides["c1"]).toEqual({ img: "u", imgKind: "url" });
    act(() => result.current.clearImage("c1"));
    expect(result.current.overrides["c1"]).toBeUndefined();
  });
});
