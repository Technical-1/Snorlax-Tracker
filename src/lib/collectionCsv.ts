import type { Card, UserOverrides } from "../types";

export type ParsedRow = {
  id: string;
  owned: boolean;
  price?: number;
  imgKind?: "url" | "upload";
  img?: string;
};

const HEADER = "id,name,set,number,owned,manual_price,manual_image_kind,manual_image";

function csvField(v: string): string {
  if (/[",\n\r]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
  return v;
}

export function serializeCsv(
  cards: Card[],
  owned: Set<string>,
  overrides: UserOverrides
): string {
  const lines = [HEADER];
  for (const c of cards) {
    const ov = overrides[c.id] ?? {};
    lines.push(
      [
        c.id,
        c.name,
        c.set,
        c.num,
        owned.has(c.id) ? "yes" : "no",
        ov.price != null ? String(ov.price) : "",
        ov.imgKind ?? "",
        ov.img ?? "",
      ]
        .map((f) => csvField(String(f)))
        .join(",")
    );
  }
  return lines.join("\n");
}

function parseRows(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  let i = 0;
  const pushField = () => {
    row.push(field);
    field = "";
  };
  const pushRow = () => {
    pushField();
    rows.push(row);
    row = [];
  };
  while (i < text.length) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      field += ch;
      i++;
      continue;
    }
    if (ch === '"') {
      inQuotes = true;
      i++;
      continue;
    }
    if (ch === ",") {
      pushField();
      i++;
      continue;
    }
    if (ch === "\r") {
      i++;
      continue;
    }
    if (ch === "\n") {
      pushRow();
      i++;
      continue;
    }
    field += ch;
    i++;
  }
  if (field.length > 0 || row.length > 0) pushRow();
  return rows;
}

export function parseCsv(text: string): ParsedRow[] {
  const rows = parseRows(text);
  if (rows.length === 0) throw new Error("Empty CSV");
  const header = rows[0].map((h) => h.trim());
  const idx = (name: string) => header.indexOf(name);
  const iId = idx("id");
  if (iId === -1) throw new Error("CSV missing required 'id' column");
  const iOwned = idx("owned");
  const iPrice = idx("manual_price");
  const iKind = idx("manual_image_kind");
  const iImg = idx("manual_image");
  const out: ParsedRow[] = [];
  for (let r = 1; r < rows.length; r++) {
    const cells = rows[r];
    const id = (cells[iId] ?? "").trim();
    if (!id) continue;
    const row: ParsedRow = {
      id,
      owned: iOwned !== -1 && (cells[iOwned] ?? "").trim().toLowerCase() === "yes",
    };
    if (iPrice !== -1) {
      const raw = (cells[iPrice] ?? "").trim();
      const n = Number(raw);
      if (raw !== "" && Number.isFinite(n)) row.price = n;
    }
    if (iImg !== -1) {
      const img = (cells[iImg] ?? "").trim();
      if (img !== "") {
        row.img = img;
        const k = (cells[iKind] ?? "").trim();
        if (k === "url" || k === "upload") row.imgKind = k;
      }
    }
    out.push(row);
  }
  return out;
}
