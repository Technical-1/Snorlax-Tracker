import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useOwnedCards } from "./useOwnedCards";

beforeEach(() => localStorage.clear());

describe("useOwnedCards.replaceOwned", () => {
  it("replaces the owned set and persists it", () => {
    const { result, unmount } = renderHook(() => useOwnedCards());
    act(() => result.current.replaceOwned(new Set(["x", "y"])));
    expect([...result.current.owned].sort()).toEqual(["x", "y"]);
    unmount();
    const { result: r2 } = renderHook(() => useOwnedCards());
    expect([...r2.current.owned].sort()).toEqual(["x", "y"]);
  });
});
