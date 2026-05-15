export function collectorNumber(num: string): string | null {
  const head = (num ?? "").split("/")[0].trim();
  if (!head || head === "—" || head === "-") return null;
  return head;
}

const LANG_MAP: Record<string, string> = {
  EN: "en", JP: "ja", KR: "ko", "ZH-TW": "zh-tw", "ZH-CN": "zh-cn",
  PT: "pt", DE: "de", FR: "fr", IT: "it", ES: "es",
};
export function langCode(appLang: string): string {
  return LANG_MAP[appLang] ?? appLang.toLowerCase();
}

const SNORLAX_TOKENS = ["snorlax", "カビゴン", "잠만보", "卡比獸", "卡比兽", "relaxo", "ronflex"];
const NEGATIVE_TOKENS = ["ドール", "doll"];
export function isSnorlaxName(name: string): boolean {
  const s = (name ?? "").toLowerCase();
  if (NEGATIVE_TOKENS.some((t) => s.includes(t.toLowerCase()))) return false;
  return SNORLAX_TOKENS.some((t) => s.includes(t));
}

export function stripSetLangSuffix(setName: string): string {
  return (setName ?? "").replace(/\s*\([^)]*\)\s*$/, "").trim();
}
