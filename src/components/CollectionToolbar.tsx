import { useRef } from "react";

type Props = {
  onExport: () => void;
  onImportFile: (file: File) => void;
  onPrint: () => void;
  status: string | null;
};

const btn = {
  padding: "4px 12px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.05)",
  color: "#e2e8f0",
  fontSize: 10,
  fontWeight: 700,
  cursor: "pointer",
} as const;

export function CollectionToolbar({ onExport, onImportFile, onPrint, status }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 12px 8px", display: "flex", gap: 7, alignItems: "center", flexWrap: "wrap" }}>
      <button style={btn} onClick={onExport}>⬇ Export CSV</button>
      <button style={btn} onClick={() => fileRef.current?.click()}>⬆ Import CSV</button>
      <input
        ref={fileRef}
        type="file"
        accept=".csv,text/csv"
        style={{ display: "none" }}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onImportFile(f);
          e.target.value = "";
        }}
      />
      <button style={btn} onClick={onPrint}>🖨 Print</button>
      {status && <span style={{ fontSize: 9, color: "#94a3b8" }}>{status}</span>}
    </div>
  );
}
