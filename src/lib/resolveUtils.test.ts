import { describe, it, expect } from "vitest";
import { collectorNumber, langCode, isSnorlaxName, stripSetLangSuffix } from "./resolveUtils";

describe("collectorNumber", () => {
  it("takes the part before a slash", () => {
    expect(collectorNumber("131/168")).toBe("131");
    expect(collectorNumber("11/64")).toBe("11");
  });
  it("returns whole token when no slash", () => {
    expect(collectorNumber("SM05")).toBe("SM05");
    expect(collectorNumber("XY179")).toBe("XY179");
  });
  it("trims whitespace and returns null for em-dash placeholder", () => {
    expect(collectorNumber(" 49 ")).toBe("49");
    expect(collectorNumber("—")).toBeNull();
  });
});

describe("langCode", () => {
  it("maps app lang to TCGdex lang", () => {
    expect(langCode("EN")).toBe("en");
    expect(langCode("JP")).toBe("ja");
    expect(langCode("KR")).toBe("ko");
    expect(langCode("ZH-TW")).toBe("zh-tw");
    expect(langCode("ZH-CN")).toBe("zh-cn");
    expect(langCode("DE")).toBe("de");
  });
});

describe("isSnorlaxName", () => {
  it("accepts known Snorlax tokens", () => {
    expect(isSnorlaxName("Snorlax")).toBe(true);
    expect(isSnorlaxName("カビゴン")).toBe(true);
    expect(isSnorlaxName("잠만보 (Snorlax)")).toBe(true);
    expect(isSnorlaxName("Relaxo")).toBe(true);
    expect(isSnorlaxName("Ronflex")).toBe(true);
    expect(isSnorlaxName("卡比獸")).toBe(true);
    expect(isSnorlaxName("卡比兽")).toBe(true);
  });
  it("rejects the Snorlax Doll false positive", () => {
    expect(isSnorlaxName("カビゴンドール")).toBe(false);
    expect(isSnorlaxName("Snorlax Doll")).toBe(false);
  });
});

describe("stripSetLangSuffix", () => {
  it("removes language/parenthetical suffixes for English-equivalent lookup", () => {
    expect(stripSetLangSuffix("Jungle (DE)")).toBe("Jungle");
    expect(stripSetLangSuffix("Pokémon Jungle (JP)")).toBe("Pokémon Jungle");
    expect(stripSetLangSuffix("Flashfire (CN)")).toBe("Flashfire");
    expect(stripSetLangSuffix("151")).toBe("151");
  });
});
