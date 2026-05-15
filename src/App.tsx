import { useMemo, useState } from "react";
import { CARDS, ERA_ORDER } from "./data/cards";
import { enrichCard } from "./lib/pokemonApi";
import { applyUserOverrides } from "./lib/userOverrides";
import { downscaleImage } from "./lib/imageDownscale";
import { useCardPrices } from "./hooks/useCardPrices";
import { useOwnedCards } from "./hooks/useOwnedCards";
import { useUserCardData } from "./hooks/useUserCardData";
import { Header } from "./components/Header";
import { Filters } from "./components/Filters";
import { CardCollection } from "./components/CardCollection";
import { CardDetail } from "./components/CardDetail";
import type { EnrichedCard } from "./types";

export default function App() {
  const { apiData, loadingApi, loadMsg } = useCardPrices();
  const { owned, toggle } = useOwnedCards();
  const { overrides, setImage, clearImage, setPrice, clearPrice } = useUserCardData();

  const [eraFilter, setEraFilter] = useState("All");
  const [langFilter, setLangFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [ownedOnly, setOwnedOnly] = useState(false);
  const [view, setView] = useState("grid");
  const [openId, setOpenId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("era");

  const enriched = useMemo(() => CARDS.map((c) => enrichCard(c, apiData)), [apiData]);

  const displayed = useMemo(
    () => enriched.map((c) => applyUserOverrides(c, overrides[c.id])),
    [enriched, overrides]
  );

  const filtered = useMemo(() => {
    let cards = displayed.filter((c) => {
      if (eraFilter !== "All" && c.era !== eraFilter) return false;
      if (langFilter !== "All" && c.lang !== langFilter) return false;
      if (ownedOnly && !owned.has(c.id)) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          c.name.toLowerCase().includes(q) ||
          c.set.toLowerCase().includes(q) ||
          c.num.toLowerCase().includes(q) ||
          c.rarity.toLowerCase().includes(q)
        );
      }
      return true;
    });
    if (sortBy === "price")
      cards = [...cards].sort((a, b) => (b.market || 0) - (a.market || 0));
    else if (sortBy === "name")
      cards = [...cards].sort((a, b) => a.name.localeCompare(b.name));
    return cards;
  }, [displayed, eraFilter, langFilter, ownedOnly, search, sortBy, owned]);

  const grouped = useMemo<Record<string, EnrichedCard[]>>(() => {
    if (sortBy !== "era") return { Results: filtered };
    const g: Record<string, EnrichedCard[]> = {};
    filtered.forEach((c) => {
      if (!g[c.era]) g[c.era] = [];
      g[c.era].push(c);
    });
    return g;
  }, [filtered, sortBy]);

  const groupKeys =
    sortBy === "era" ? ERA_ORDER.filter((e) => grouped[e]?.length) : ["Results"];

  const total = CARDS.length;
  const ownedCount = owned.size;
  const pct = total ? Math.round((ownedCount / total) * 100) : 0;
  const ownedValue = displayed
    .filter((c) => owned.has(c.id) && c.market)
    .reduce((s, c) => s + (c.market || 0), 0);

  const openEnriched = openId ? enriched.find((c) => c.id === openId) ?? null : null;
  const openDisplayed = openId ? displayed.find((c) => c.id === openId) ?? null : null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg,#0d0b1e,#150a2e 50%,#091520)",
        fontFamily: "'Trebuchet MS',sans-serif",
        color: "#e2e8f0",
        paddingBottom: 60,
      }}
    >
      {openEnriched && openDisplayed && (
        <CardDetail
          card={openDisplayed}
          fetchedMarket={openEnriched.market}
          fetchedAllPrices={openEnriched.allPrices}
          override={overrides[openEnriched.id]}
          isOwned={owned.has(openEnriched.id)}
          loadingApi={loadingApi}
          onToggleOwned={() => toggle(openEnriched.id)}
          onSetImageUrl={(url) => setImage(openEnriched.id, url, "url")}
          onUploadImage={async (file) => {
            const dataUrl = await downscaleImage(file, {});
            return setImage(openEnriched.id, dataUrl, "upload");
          }}
          onClearImage={() => clearImage(openEnriched.id)}
          onSetPrice={(n) => setPrice(openEnriched.id, n)}
          onClearPrice={() => clearPrice(openEnriched.id)}
          onClose={() => setOpenId(null)}
        />
      )}
      <Header
        ownedCount={ownedCount}
        total={total}
        pct={pct}
        ownedValue={ownedValue}
        loadingApi={loadingApi}
        loadMsg={loadMsg}
      />
      <Filters
        search={search}
        setSearch={setSearch}
        eraFilter={eraFilter}
        setEraFilter={setEraFilter}
        langFilter={langFilter}
        setLangFilter={setLangFilter}
        ownedOnly={ownedOnly}
        setOwnedOnly={setOwnedOnly}
        view={view}
        setView={setView}
        sortBy={sortBy}
        setSortBy={setSortBy}
        shownCount={filtered.length}
        total={total}
      />
      <CardCollection
        groupKeys={groupKeys}
        grouped={grouped}
        view={view}
        owned={owned}
        shownCount={filtered.length}
        onToggle={toggle}
        onOpen={(c) => setOpenId(c.id)}
      />
    </div>
  );
}
