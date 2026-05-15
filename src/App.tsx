import { useMemo, useState } from "react";
import { CARDS, ERA_ORDER } from "./data/cards";
import { enrichCard } from "./lib/pokemonApi";
import { applyUserOverrides } from "./lib/userOverrides";
import { downscaleImage } from "./lib/imageDownscale";
import { serializeCsv, parseCsv } from "./lib/collectionCsv";
import { mergeImport } from "./lib/mergeImport";
import { withinBudget } from "./lib/storageBudget";
import { useCardPrices } from "./hooks/useCardPrices";
import { useOwnedCards } from "./hooks/useOwnedCards";
import { useUserCardData } from "./hooks/useUserCardData";
import { Header } from "./components/Header";
import { Filters } from "./components/Filters";
import { CollectionToolbar } from "./components/CollectionToolbar";
import { CardCollection } from "./components/CardCollection";
import { CardDetail } from "./components/CardDetail";
import { PrintView } from "./components/PrintView";
import type { EnrichedCard } from "./types";

const VALID_IDS = new Set(CARDS.map((c) => c.id));

export default function App() {
  const { apiData, loadingApi, loadMsg } = useCardPrices();
  const { owned, toggle, replaceOwned } = useOwnedCards();
  const { overrides, setImage, clearImage, setPrice, clearPrice, replaceOverrides } =
    useUserCardData();

  const [eraFilter, setEraFilter] = useState("All");
  const [langFilter, setLangFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [ownedOnly, setOwnedOnly] = useState(false);
  const [view, setView] = useState("grid");
  const [openId, setOpenId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("era");
  const [importStatus, setImportStatus] = useState<string | null>(null);

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

  const handleExport = () => {
    const csv = serializeCsv(CARDS, owned, overrides);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "snorlax-collection.csv";
    a.click();
    setImportStatus(null);
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  };

  const handleImportFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const rows = parseCsv(String(reader.result ?? ""));
        const res = mergeImport(owned, overrides, rows, {
          validIds: VALID_IDS,
          withinBudget: (s) => withinBudget(s),
        });
        replaceOwned(res.owned);
        replaceOverrides(res.overrides);
        const r = res.report;
        setImportStatus(
          `Imported: ${r.ownedSet} owned, ${r.pricesSet} prices, ${r.imagesSet} images` +
            (r.imagesSkipped ? `, ${r.imagesSkipped} images skipped (storage full)` : "") +
            (r.unknownIds ? `, ${r.unknownIds} unknown rows ignored` : "")
        );
      } catch (e) {
        setImportStatus(
          e instanceof Error ? `Import failed: ${e.message}` : "Import failed: unreadable CSV"
        );
      }
    };
    reader.onerror = () => setImportStatus("Import failed: could not read file");
    reader.readAsText(file);
  };

  return (
    <>
      <style>{`@media print{.no-print{display:none!important}}@media screen{.print-only{display:none}}`}</style>
      <div
        className="no-print"
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
        <CollectionToolbar
          onExport={handleExport}
          onImportFile={handleImportFile}
          onPrint={() => window.print()}
          status={importStatus}
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
      <PrintView owned={owned} />
    </>
  );
}
