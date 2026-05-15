import { useCallback, useEffect, useState } from "react";

export function useOwnedCards() {
  const [owned, setOwned] = useState<Set<string>>(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem("snorlax_v3") || "[]"));
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("snorlax_v3", JSON.stringify([...owned]));
    } catch {
      // ignore write failures (private mode / quota)
    }
  }, [owned]);

  const toggle = useCallback((id: string) => {
    setOwned((p) => {
      const n = new Set(p);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }, []);

  const replaceOwned = useCallback((next: Set<string>) => {
    setOwned(new Set(next));
  }, []);

  return { owned, toggle, replaceOwned };
}
