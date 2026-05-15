import { useCallback, useEffect, useState } from "react";
import type { UserOverride, UserOverrides } from "../types";
import { withinBudget, DEFAULT_BUDGET_BYTES } from "../lib/storageBudget";

const KEY = "snorlax_user_v1";

type SetImageResult = { ok: boolean; error?: string };

export function useUserCardData(opts: { budgetBytes?: number } = {}) {
  const budget = opts.budgetBytes ?? DEFAULT_BUDGET_BYTES;
  const [overrides, setOverrides] = useState<UserOverrides>(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "{}");
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(overrides));
    } catch {
      // ignore write failures (private mode / quota)
    }
  }, [overrides]);

  const mutate = useCallback(
    (id: string, fn: (rec: UserOverride) => UserOverride): void => {
      setOverrides((prev) => {
        const rec = fn({ ...(prev[id] ?? {}) });
        const copy = { ...prev };
        if (!rec.img && rec.price == null) delete copy[id];
        else copy[id] = rec;
        return copy;
      });
    },
    []
  );

  const setImage = useCallback(
    (id: string, value: string, kind: "url" | "upload"): SetImageResult => {
      if (kind === "upload") {
        const projected = { ...overrides, [id]: { ...(overrides[id] ?? {}), img: value, imgKind: kind } };
        if (!withinBudget(JSON.stringify(projected), budget)) {
          return { ok: false, error: "Storage full — remove some manual images." };
        }
      }
      mutate(id, (r) => ({ ...r, img: value, imgKind: kind }));
      return { ok: true };
    },
    [overrides, budget, mutate]
  );

  const clearImage = useCallback(
    (id: string) => mutate(id, (r) => { const { img, imgKind, ...rest } = r; void img; void imgKind; return rest; }),
    [mutate]
  );
  const setPrice = useCallback(
    (id: string, price: number) => { mutate(id, (r) => ({ ...r, price })); },
    [mutate]
  );
  const clearPrice = useCallback(
    (id: string) => mutate(id, (r) => { const { price, ...rest } = r; void price; return rest; }),
    [mutate]
  );

  const replaceOverrides = useCallback((next: UserOverrides) => {
    setOverrides({ ...next });
  }, []);

  return { overrides, setImage, clearImage, setPrice, clearPrice, replaceOverrides };
}
