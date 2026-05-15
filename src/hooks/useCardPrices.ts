import { useEffect, useState } from "react";
import type { ApiData } from "../types";
import { fetchAllCardData } from "../lib/pokemonApi";

export function useCardPrices() {
  const [apiData, setApiData] = useState<ApiData>({});
  const [loadingApi, setLoadingApi] = useState(true);
  const [loadMsg, setLoadMsg] = useState("Loading card data…");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const result = await fetchAllCardData((msg) => {
        if (!cancelled) setLoadMsg(msg);
      });
      if (cancelled) return;
      setApiData(result);
      setLoadingApi(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { apiData, loadingApi, loadMsg };
}
