import { useMemo, useState } from "react";
import { CARDS, ERA_ORDER } from "./data/cards";
import { enrichCard } from "./lib/pokemonApi";
import { useCardPrices } from "./hooks/useCardPrices";
import { useOwnedCards } from "./hooks/useOwnedCards";
import { Header } from "./components/Header";
import { Filters } from "./components/Filters";
import { CardCollection } from "./components/CardCollection";
import { CardModal } from "./components/CardModal";
import type { EnrichedCard } from "./types";

export default function App() {
  const { apiData, loadingApi, loadMsg } = useCardPrices();
  const { owned, toggle } = useOwnedCards();

  const [eraFilter, setEraFilter] = useState("All");
  const [langFilter, setLangFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [ownedOnly, setOwnedOnly] = useState(false);
  const [view, setView] = useState("grid");
  const [modal, setModal] = useState<EnrichedCard | null>(null);
  const [sortBy, setSortBy] = useState("era");

  const enriched = useMemo(
    () => CARDS.map((c) => enrichCard(c, apiData)),
    [apiData]
  );

  const filtered = useMemo(() => {
    let cards = enriched.filter((c) => {
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
  }, [enriched, eraFilter, langFilter, ownedOnly, search, sortBy, owned]);

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
    sortBy === "era"
      ? ERA_ORDER.filter((e) => grouped[e]?.length)
      : ["Results"];

  const total = CARDS.length;
  const ownedCount = owned.size;
  const pct = total ? Math.round((ownedCount / total) * 100) : 0;
  const ownedValue = enriched
    .filter((c) => owned.has(c.id) && c.market)
    .reduce((s, c) => s + (c.market || 0), 0);

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
      <CardModal
        modal={modal}
        isOwned={modal ? owned.has(modal.id) : false}
        loadingApi={loadingApi}
        onToggle={toggle}
        onClose={() => setModal(null)}
      />
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
        onOpen={setModal}
      />
    </div>
  );
}
