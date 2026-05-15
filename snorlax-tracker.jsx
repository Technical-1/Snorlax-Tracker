import { useState, useEffect, useMemo, useCallback } from "react";

// ─── COMPLETE CARD DATABASE ───────────────────────────────────────────────────
// English cards include pokemontcg.io API card IDs for image + price fetching.
// Non-English / variant cards are static entries with no API ID.
//
// API card ID format: "{setCode}-{number}" e.g. "jungle-11"
// Images: https://images.pokemontcg.io/{setCode}/{number}.png
// Prices come from the pokemontcg.io /v2/cards/{id} response → card.tcgplayer.prices
// ─────────────────────────────────────────────────────────────────────────────

const CARDS = [
  // ══ ENGLISH · WIZARDS ERA ════════════════════════════════════════════════════
  { id:"jungle-11",      name:"Snorlax",                    set:"Jungle",                       num:"11/64",    rarity:"Rare Holo",              era:"Wizards",       lang:"EN" },
  { id:"jungle-27",      name:"Snorlax",                    set:"Jungle",                       num:"27/64",    rarity:"Rare",                   era:"Wizards",       lang:"EN" },
  { id:"jungle-27-rh",   name:"Snorlax (Reverse Holo)",     set:"Jungle",                       num:"27/64",    rarity:"Rare – Reverse Holo",    era:"Wizards",       lang:"EN", apiId:"jungle-27",    note:"Reverse Holo" },
  { id:"base4-30",       name:"Snorlax",                    set:"Base Set 2",                   num:"30/130",   rarity:"Rare",                   era:"Wizards",       lang:"EN" },
  { id:"base3-64",       name:"Snorlax",                    set:"Legendary Collection",         num:"64/110",   rarity:"Rare",                   era:"Wizards",       lang:"EN" },
  { id:"base3-64-rh",    name:"Snorlax (Reverse Holo)",     set:"Legendary Collection",         num:"64/110",   rarity:"Rare – Reverse Holo",    era:"Wizards",       lang:"EN", apiId:"base3-64",     note:"First-ever reverse holo set" },
  { id:"ecard3-100",     name:"Snorlax",                    set:"Skyridge",                     num:"100/144",  rarity:"Common",                 era:"Wizards",       lang:"EN" },
  { id:"ecard3-100-rh",  name:"Snorlax (Reverse Holo)",     set:"Skyridge",                     num:"100/144",  rarity:"Common – Reverse Holo",  era:"Wizards",       lang:"EN", apiId:"ecard3-100",   note:"Reverse Holo" },
  { id:"basep-49",       name:"Snorlax",                    set:"Wizards Black Star Promos",    num:"49",       rarity:"Promo",                  era:"Wizards",       lang:"EN" },
  { id:"gym1-33",        name:"Rocket's Snorlax",           set:"Gym Heroes",                   num:"33/132",   rarity:"Rare",                   era:"Wizards",       lang:"EN" },
  { id:"gym1-33-rh",     name:"Rocket's Snorlax (Reverse)", set:"Gym Heroes",                   num:"33/132",   rarity:"Rare – Reverse Holo",    era:"Wizards",       lang:"EN", apiId:"gym1-33",      note:"Reverse Holo" },

  // ══ ENGLISH · EX ERA ═════════════════════════════════════════════════════════
  { id:"ex7-15",         name:"Snorlax",                    set:"EX FireRed & LeafGreen",       num:"15/112",   rarity:"Rare Holo",              era:"EX Era",        lang:"EN" },
  { id:"ex7-15-rh",      name:"Snorlax (Reverse Holo)",     set:"EX FireRed & LeafGreen",       num:"15/112",   rarity:"Rare Holo – Reverse",    era:"EX Era",        lang:"EN", apiId:"ex7-15",       note:"Reverse Holo" },
  { id:"ex13-104",       name:"Rocket's Snorlax ex",        set:"EX Team Rocket Returns",       num:"104/109",  rarity:"Rare Holo ex",           era:"EX Era",        lang:"EN" },
  { id:"ex15-10",        name:"Snorlax δ",                  set:"EX Dragon Frontiers",          num:"10/101",   rarity:"Rare Holo",              era:"EX Era",        lang:"EN", note:"Delta Species – Grass type" },
  { id:"ex15-10-rh",     name:"Snorlax δ (Reverse Holo)",   set:"EX Dragon Frontiers",          num:"10/101",   rarity:"Rare Holo – Reverse",    era:"EX Era",        lang:"EN", apiId:"ex15-10",      note:"Delta Species reverse" },

  // ══ ENGLISH · DIAMOND & PEARL ════════════════════════════════════════════════
  { id:"dp1-37",         name:"Snorlax",                    set:"Diamond & Pearl",              num:"37/130",   rarity:"Uncommon",               era:"D&P",           lang:"EN" },
  { id:"dp1-37-rh",      name:"Snorlax (Reverse Holo)",     set:"Diamond & Pearl",              num:"37/130",   rarity:"Uncommon – Reverse Holo",era:"D&P",           lang:"EN", apiId:"dp1-37",       note:"Reverse Holo" },
  { id:"dp6-33",         name:"Snorlax",                    set:"Rising Rivals",                num:"33/111",   rarity:"Rare",                   era:"D&P",           lang:"EN" },
  { id:"dp6-33-rh",      name:"Snorlax (Reverse Holo)",     set:"Rising Rivals",                num:"33/111",   rarity:"Rare – Reverse Holo",    era:"D&P",           lang:"EN", apiId:"dp6-33",       note:"Reverse Holo" },
  { id:"dp6-81",         name:"Snorlax",                    set:"Rising Rivals",                num:"81/111",   rarity:"Common",                 era:"D&P",           lang:"EN" },
  { id:"dp6-81-rh",      name:"Snorlax (Reverse Holo)",     set:"Rising Rivals",                num:"81/111",   rarity:"Common – Reverse Holo",  era:"D&P",           lang:"EN", apiId:"dp6-81",       note:"Reverse Holo" },
  { id:"dp6-111",        name:"Snorlax LV.X",               set:"Rising Rivals",                num:"111/111",  rarity:"Rare Holo LV.X",         era:"D&P",           lang:"EN", note:"LV.X Ultra Rare" },

  // ══ ENGLISH · HEARTGOLD & SOULSILVER ═════════════════════════════════════════
  { id:"col1-33",        name:"Snorlax",                    set:"Call of Legends",              num:"33/95",    rarity:"Rare Holo",              era:"HGSS",          lang:"EN" },
  { id:"col1-33-rh",     name:"Snorlax (Reverse Holo)",     set:"Call of Legends",              num:"33/95",    rarity:"Rare Holo – Reverse",    era:"HGSS",          lang:"EN", apiId:"col1-33",      note:"Reverse Holo" },

  // ══ ENGLISH · BLACK & WHITE ═══════════════════════════════════════════════════
  { id:"bw6-109",        name:"Snorlax",                    set:"Boundaries Crossed",           num:"109/149",  rarity:"Rare",                   era:"B&W",           lang:"EN" },
  { id:"bw6-109-rh",     name:"Snorlax (Reverse Holo)",     set:"Boundaries Crossed",           num:"109/149",  rarity:"Rare – Reverse Holo",    era:"B&W",           lang:"EN", apiId:"bw6-109",      note:"Reverse Holo" },
  { id:"bw8-101",        name:"Snorlax",                    set:"Plasma Storm",                 num:"101/135",  rarity:"Uncommon",               era:"B&W",           lang:"EN" },
  { id:"bw8-101-rh",     name:"Snorlax (Reverse Holo)",     set:"Plasma Storm",                 num:"101/135",  rarity:"Uncommon – Reverse Holo",era:"B&W",           lang:"EN", apiId:"bw8-101",      note:"Reverse Holo" },

  // ══ ENGLISH · XY ══════════════════════════════════════════════════════════════
  { id:"xy0-26",         name:"Snorlax",                    set:"Kalos Starter Set",            num:"26/39",    rarity:"Common",                 era:"XY",            lang:"EN" },
  { id:"xy0-26-rh",      name:"Snorlax (Reverse Holo)",     set:"Kalos Starter Set",            num:"26/39",    rarity:"Common – Reverse Holo",  era:"XY",            lang:"EN", apiId:"xy0-26",       note:"Reverse Holo" },
  { id:"xy3-80",         name:"Snorlax",                    set:"Flashfire",                    num:"80/106",   rarity:"Uncommon",               era:"XY",            lang:"EN" },
  { id:"xy3-80-rh",      name:"Snorlax (Reverse Holo)",     set:"Flashfire",                    num:"80/106",   rarity:"Uncommon – Reverse Holo",era:"XY",            lang:"EN", apiId:"xy3-80",       note:"Reverse Holo" },
  { id:"g1-58",          name:"Snorlax",                    set:"Generations",                  num:"58/83",    rarity:"Uncommon",               era:"XY",            lang:"EN" },
  { id:"g1-58-rh",       name:"Snorlax (Reverse Holo)",     set:"Generations",                  num:"58/83",    rarity:"Uncommon – Reverse Holo",era:"XY",            lang:"EN", apiId:"g1-58",        note:"Reverse Holo" },
  { id:"xy8-118",        name:"Snorlax",                    set:"BREAKthrough",                 num:"118/162",  rarity:"Common",                 era:"XY",            lang:"EN" },
  { id:"xy8-118-rh",     name:"Snorlax (Reverse Holo)",     set:"BREAKthrough",                 num:"118/162",  rarity:"Common – Reverse Holo",  era:"XY",            lang:"EN", apiId:"xy8-118",      note:"Reverse Holo" },
  { id:"xy10-77",        name:"Snorlax",                    set:"Fates Collide",                num:"77/124",   rarity:"Common",                 era:"XY",            lang:"EN" },
  { id:"xy10-77-rh",     name:"Snorlax (Reverse Holo)",     set:"Fates Collide",                num:"77/124",   rarity:"Common – Reverse Holo",  era:"XY",            lang:"EN", apiId:"xy10-77",      note:"Reverse Holo" },
  { id:"xyp-XY179",      name:"Snorlax",                    set:"XY Black Star Promos",         num:"XY179",    rarity:"Promo",                  era:"XY",            lang:"EN" },

  // ══ ENGLISH · SUN & MOON ══════════════════════════════════════════════════════
  { id:"smp-SM05",       name:"Snorlax GX",                 set:"SM Black Star Promos",         num:"SM05",     rarity:"Promo GX",               era:"Sun & Moon",    lang:"EN", note:"First Snorlax GX — SM promo" },
  { id:"sm9-131",        name:"Snorlax GX",                 set:"Celestial Storm",              num:"131/168",  rarity:"Rare Holo GX",           era:"Sun & Moon",    lang:"EN" },
  { id:"sm9-175",        name:"Snorlax GX (Full Art)",      set:"Celestial Storm",              num:"175/168",  rarity:"Ultra Rare – Full Art",  era:"Sun & Moon",    lang:"EN", note:"Full Art" },
  { id:"sm9-214",        name:"Snorlax GX (Gold)",          set:"Celestial Storm",              num:"214/168",  rarity:"Secret Rare – Gold",     era:"Sun & Moon",    lang:"EN", note:"Gold Hyper Rare" },
  { id:"sm9-215",        name:"Snorlax GX (Rainbow)",       set:"Celestial Storm",              num:"215/168",  rarity:"Secret Rare – Rainbow",  era:"Sun & Moon",    lang:"EN", note:"Rainbow Rare" },
  { id:"sm10-120",       name:"Eevee & Snorlax GX",         set:"Team Up",                      num:"120/181",  rarity:"Rare Holo Tag Team GX",  era:"Sun & Moon",    lang:"EN", note:"Tag Team GX" },
  { id:"sm10-171",       name:"Eevee & Snorlax GX (FA)",    set:"Team Up",                      num:"171/181",  rarity:"Ultra Rare – Full Art",  era:"Sun & Moon",    lang:"EN", note:"Full Art Tag Team GX" },
  { id:"sm10-196",       name:"Eevee & Snorlax GX (Rainbow)",set:"Team Up",                     num:"196/181",  rarity:"Secret Rare – Rainbow",  era:"Sun & Moon",    lang:"EN", note:"Rainbow Rare" },
  { id:"sm10-197",       name:"Eevee & Snorlax GX (Gold)",  set:"Team Up",                      num:"197/181",  rarity:"Secret Rare – Gold",     era:"Sun & Moon",    lang:"EN", note:"Gold Secret Rare" },
  { id:"sm11-158",       name:"Snorlax",                    set:"Unbroken Bonds",               num:"158/214",  rarity:"Rare",                   era:"Sun & Moon",    lang:"EN" },
  { id:"sm11-158-rh",    name:"Snorlax (Reverse Holo)",     set:"Unbroken Bonds",               num:"158/214",  rarity:"Rare – Reverse Holo",    era:"Sun & Moon",    lang:"EN", apiId:"sm11-158",     note:"Reverse Holo" },
  { id:"hif-50",         name:"Snorlax",                    set:"Hidden Fates",                 num:"50/68",    rarity:"Rare",                   era:"Sun & Moon",    lang:"EN" },
  { id:"hif-50-rh",      name:"Snorlax (Reverse Holo)",     set:"Hidden Fates",                 num:"50/68",    rarity:"Rare – Reverse Holo",    era:"Sun & Moon",    lang:"EN", apiId:"hif-50",       note:"Reverse Holo" },
  { id:"hif-SV95",       name:"Snorlax (Shiny)",            set:"Hidden Fates: Shiny Vault",    num:"SV95/SV94",rarity:"Shiny Rare",             era:"Sun & Moon",    lang:"EN", note:"Shiny Vault" },

  // ══ ENGLISH · SWORD & SHIELD ══════════════════════════════════════════════════
  { id:"swsh1-140",      name:"Snorlax V",                  set:"Sword & Shield",               num:"140/202",  rarity:"Ultra Rare V",           era:"Sw&Sh",         lang:"EN" },
  { id:"swsh1-141",      name:"Snorlax VMAX",               set:"Sword & Shield",               num:"141/202",  rarity:"Rare Holo VMAX",         era:"Sw&Sh",         lang:"EN" },
  { id:"swsh1-189",      name:"Snorlax V (Full Art)",       set:"Sword & Shield",               num:"189/202",  rarity:"Ultra Rare V – Full Art",era:"Sw&Sh",         lang:"EN", note:"Full Art V" },
  { id:"swsh1-206",      name:"Snorlax VMAX (Secret)",      set:"Sword & Shield",               num:"206/202",  rarity:"Secret Rare VMAX",       era:"Sw&Sh",         lang:"EN", note:"Secret Rare" },
  { id:"swshp-SWSH032",  name:"Snorlax",                    set:"SWSH Black Star Promos",       num:"SWSH032",  rarity:"Promo",                  era:"Sw&Sh",         lang:"EN" },
  { id:"swshp-SWSH068",  name:"Snorlax",                    set:"SWSH Black Star Promos",       num:"SWSH068",  rarity:"Promo",                  era:"Sw&Sh",         lang:"EN" },
  { id:"swshp-SWSH119",  name:"Snorlax",                    set:"SWSH Black Star Promos",       num:"SWSH119",  rarity:"Promo",                  era:"Sw&Sh",         lang:"EN" },
  { id:"swsh2-141",      name:"Snorlax",                    set:"Rebel Clash",                  num:"141/192",  rarity:"Uncommon",               era:"Sw&Sh",         lang:"EN" },
  { id:"swsh2-141-rh",   name:"Snorlax (Reverse Holo)",     set:"Rebel Clash",                  num:"141/192",  rarity:"Uncommon – Reverse Holo",era:"Sw&Sh",         lang:"EN", apiId:"swsh2-141",    note:"Reverse Holo" },
  { id:"swsh4-131",      name:"Snorlax",                    set:"Vivid Voltage",                num:"131/185",  rarity:"Rare",                   era:"Sw&Sh",         lang:"EN" },
  { id:"swsh4-131-rh",   name:"Snorlax (Reverse Holo)",     set:"Vivid Voltage",                num:"131/185",  rarity:"Rare – Reverse Holo",    era:"Sw&Sh",         lang:"EN", apiId:"swsh4-131",    note:"Reverse Holo" },
  { id:"swsh6-224",      name:"Snorlax (Gold)",             set:"Chilling Reign",               num:"224/198",  rarity:"Secret Rare – Gold",     era:"Sw&Sh",         lang:"EN", note:"Gold Secret Rare" },
  { id:"swsh8-206",      name:"Snorlax",                    set:"Fusion Strike",                num:"206/264",  rarity:"Rare",                   era:"Sw&Sh",         lang:"EN" },
  { id:"swsh8-206-rh",   name:"Snorlax (Reverse Holo)",     set:"Fusion Strike",                num:"206/264",  rarity:"Rare – Reverse Holo",    era:"Sw&Sh",         lang:"EN", apiId:"swsh8-206",    note:"Reverse Holo" },
  { id:"swsh12pt5-109",  name:"Snorlax",                    set:"Crown Zenith",                 num:"109/159",  rarity:"Common",                 era:"Sw&Sh",         lang:"EN" },
  { id:"swsh12pt5-109rh",name:"Snorlax (Reverse Holo)",     set:"Crown Zenith",                 num:"109/159",  rarity:"Common – Reverse Holo",  era:"Sw&Sh",         lang:"EN", apiId:"swsh12pt5-109",note:"Reverse Holo" },
  { id:"pgo-55",         name:"Snorlax",                    set:"Pokémon GO",                   num:"055/078",  rarity:"Rare",                   era:"Sw&Sh",         lang:"EN" },
  { id:"pgo-55-rh",      name:"Snorlax (Reverse Holo)",     set:"Pokémon GO",                   num:"055/078",  rarity:"Rare – Reverse Holo",    era:"Sw&Sh",         lang:"EN", apiId:"pgo-55",       note:"Reverse Holo" },
  { id:"swshclassic-016",name:"Snorlax",                    set:"TCG Classic – Venusaur/Lugia ex Deck", num:"016/034", rarity:"Classic",         era:"Sw&Sh",         lang:"EN", note:"TCG Classic deck-exclusive" },

  // ══ ENGLISH · SCARLET & VIOLET ════════════════════════════════════════════════
  { id:"sv3pt5-143",     name:"Snorlax",                    set:"151",                          num:"143/165",  rarity:"Common",                 era:"Sc&Vi",         lang:"EN" },
  { id:"sv3pt5-143-rh",  name:"Snorlax (Reverse Holo)",     set:"151",                          num:"143/165",  rarity:"Common – Reverse Holo",  era:"Sc&Vi",         lang:"EN", apiId:"sv3pt5-143",   note:"Reverse Holo" },
  { id:"svp-051",        name:"Snorlax",                    set:"SVP Black Star Promos",        num:"051",      rarity:"Promo",                  era:"Sc&Vi",         lang:"EN" },
  { id:"sv4-167",        name:"Snorlax",                    set:"Paldea Evolved",               num:"167/193",  rarity:"Rare",                   era:"Sc&Vi",         lang:"EN" },
  { id:"sv4-167-rh",     name:"Snorlax (Reverse Holo)",     set:"Paldea Evolved",               num:"167/193",  rarity:"Rare – Reverse Holo",    era:"Sc&Vi",         lang:"EN", apiId:"sv4-167",      note:"Reverse Holo" },
  { id:"sv3-163",        name:"Snorlax ex",                 set:"Obsidian Flames",              num:"163/197",  rarity:"Ultra Rare ex",          era:"Sc&Vi",         lang:"EN", note:"Snorlax ex" },
  { id:"sv3-207",        name:"Snorlax ex (SIR)",           set:"Obsidian Flames",              num:"207/197",  rarity:"Special Illustration Rare",era:"Sc&Vi",       lang:"EN", note:"Special Illustration Rare" },
  { id:"sv4pt5-202",     name:"Snorlax (Shiny)",            set:"Paldean Fates",                num:"202/091",  rarity:"Shiny Rare",             era:"Sc&Vi",         lang:"EN", note:"Shiny variant" },
  { id:"sv5-143",        name:"Snorlax",                    set:"Temporal Forces",              num:"143/162",  rarity:"Common",                 era:"Sc&Vi",         lang:"EN" },
  { id:"sv5-143-rh",     name:"Snorlax (Reverse Holo)",     set:"Temporal Forces",              num:"143/162",  rarity:"Common – Reverse Holo",  era:"Sc&Vi",         lang:"EN", apiId:"sv5-143",      note:"Reverse Holo" },
  { id:"svp-122",        name:"Snorlax",                    set:"SVP Black Star Promos",        num:"122",      rarity:"Promo",                  era:"Sc&Vi",         lang:"EN" },
  { id:"sv6-136",        name:"Snorlax",                    set:"Twilight Masquerade",          num:"136/167",  rarity:"Uncommon",               era:"Sc&Vi",         lang:"EN" },
  { id:"sv6-136-rh",     name:"Snorlax (Reverse Holo)",     set:"Twilight Masquerade",          num:"136/167",  rarity:"Uncommon – Reverse Holo",era:"Sc&Vi",         lang:"EN", apiId:"sv6-136",      note:"Reverse Holo" },
  { id:"sv8-144",        name:"Snorlax",                    set:"Surging Sparks",               num:"144/191",  rarity:"Rare",                   era:"Sc&Vi",         lang:"EN" },
  { id:"sv8-144-rh",     name:"Snorlax (Reverse Holo)",     set:"Surging Sparks",               num:"144/191",  rarity:"Rare – Reverse Holo",    era:"Sc&Vi",         lang:"EN", apiId:"sv8-144",      note:"Reverse Holo" },
  { id:"sv9-63",         name:"Snorlax",                    set:"Perfect Order",                num:"063/088",  rarity:"Common",                 era:"Sc&Vi",         lang:"EN", note:"2025 set" },
  { id:"sv9-63-rh",      name:"Snorlax (Reverse Holo)",     set:"Perfect Order",                num:"063/088",  rarity:"Common – Reverse Holo",  era:"Sc&Vi",         lang:"EN", apiId:"sv9-63",       note:"2025 — Reverse Holo" },
  { id:"sv5-TG10",       name:"Snorlax (TG)",               set:"Lost Origin",                  num:"TG10/TG30",rarity:"Trainer Gallery Rare",   era:"Sc&Vi",         lang:"EN", note:"Trainer Gallery subset" },

  // ══ ENGLISH · TCG POCKET ══════════════════════════════════════════════════════
  { id:"pocket-ga-211",  name:"Snorlax",                    set:"Genetic Apex",                 num:"211/226",  rarity:"♦♦♦ (3-Diamond)",       era:"Pocket",        lang:"EN", note:"TCG Pocket — Pikachu pack" },
  { id:"pocket-ga-250",  name:"Snorlax (Immersive)",        set:"Genetic Apex",                 num:"250/226",  rarity:"★ Immersive Rare",       era:"Pocket",        lang:"EN", note:"TCG Pocket Immersive" },
  { id:"pocket-tl-63",   name:"Snorlax",                    set:"Triumphant Light",             num:"063/075",  rarity:"♦♦ (2-Diamond)",         era:"Pocket",        lang:"EN", note:"TCG Pocket" },
  { id:"pocket-pa-049",  name:"Snorlax",                    set:"Promo-A",                      num:"049/P-A",  rarity:"Promo",                  era:"Pocket",        lang:"EN", note:"TCG Pocket Promo" },
  { id:"pocket-eg-57",   name:"Snorlax ex",                 set:"Eevee Grove",                  num:"057/069",  rarity:"♦♦♦♦ (4-Diamond)",      era:"Pocket",        lang:"EN", note:"TCG Pocket — Snorlax ex" },
  { id:"pocket-eg-84",   name:"Snorlax ex (★★ Full Art)",   set:"Eevee Grove",                  num:"084/069",  rarity:"★★ Full Art",            era:"Pocket",        lang:"EN", note:"TCG Pocket Full Art" },
  { id:"pocket-eg-91",   name:"Snorlax ex (★★ Alt Art)",    set:"Eevee Grove",                  num:"091/069",  rarity:"★★ Alt Art",             era:"Pocket",        lang:"EN", note:"TCG Pocket Alt Art" },
  { id:"pocket-dp-288",  name:"Snorlax ex",                 set:"Deluxe Pack: ex",              num:"288/353",  rarity:"♦♦♦♦ (4-Diamond)",      era:"Pocket",        lang:"EN", note:"TCG Pocket Deluxe Pack" },

  // ══ JAPANESE EXCLUSIVES ═══════════════════════════════════════════════════════
  { id:"jp-jungle-holo",       name:"カビゴン (Snorlax)",          set:"Pokémon Jungle (JP)",                    num:"—",        rarity:"Rare Holo",       era:"Wizards",  lang:"JP" },
  { id:"jp-vending",           name:"カビゴン (Snorlax)",          set:"Expansion Sheet 1 – Vending",            num:"—",        rarity:"Uncommon",        era:"Wizards",  lang:"JP", note:"Vending machine exclusive" },
  { id:"jp-red-deck",          name:"カビゴン (Snorlax)",          set:"Quick Starter Gift Set – Red Deck",      num:"—",        rarity:"Uncommon",        era:"Wizards",  lang:"JP" },
  { id:"jp-myst-mtn",          name:"カビゴン (Snorlax)",          set:"Mysterious Mountains",                   num:"062/088",  rarity:"Common",          era:"Wizards",  lang:"JP" },
  { id:"jp-gym-heroes",        name:"ロケット団のカビゴン",         set:"Challenge from the Darkness (JP)",       num:"—",        rarity:"Rare",            era:"Wizards",  lang:"JP", note:"Rocket's Snorlax JP version" },
  { id:"jp-hungry-snorlax",    name:"はらぺこカビゴン (Hungry Snorlax)", set:"Unnumbered Promos (JP)",          num:"—",        rarity:"Promo",           era:"Wizards",  lang:"JP", note:"Nintendo 64 promo — Japan only" },
  { id:"jp-flight-leg",        name:"カビゴン (Snorlax)",          set:"Flight of Legends",                      num:"074/082",  rarity:"Rare Holo",       era:"EX Era",   lang:"JP" },
  { id:"jp-rocket-back",       name:"ロケット団のカビゴン ex",      set:"Rocket Gang Strikes Back (JP)",          num:"062/084",  rarity:"Rare Holo ex",    era:"EX Era",   lang:"JP", note:"Rocket's Snorlax ex JP" },
  { id:"jp-frontiers-delta",   name:"カビゴン δ",                  set:"Offense & Defense – Furthest Ends",      num:"001/068",  rarity:"Rare Holo",       era:"EX Era",   lang:"JP", note:"Delta Species" },
  { id:"jp-spacetime",         name:"カビゴン (Snorlax)",          set:"Space-Time Creation",                    num:"—",        rarity:"Uncommon",        era:"D&P",      lang:"JP" },
  { id:"jp-dp-promo-126",      name:"カビゴン (Snorlax)",          set:"DP-P Promotional Cards",                 num:"126/DP-P", rarity:"Promo",           era:"D&P",      lang:"JP" },
  { id:"jp-dp-promo-127",      name:"カビゴン LV.X",               set:"DP-P Promotional Cards",                 num:"127/DP-P", rarity:"Promo LV.X",      era:"D&P",      lang:"JP", note:"LV.X promo" },
  { id:"jp-bonds",             name:"カビゴン (Snorlax)",          set:"Bonds to the End of Time",               num:"070/090",  rarity:"Common",          era:"D&P",      lang:"JP" },
  { id:"jp-lost-link",         name:"カビゴン (Snorlax)",          set:"Lost Link",                              num:"028/040",  rarity:"Rare Holo",       era:"HGSS",     lang:"JP" },
  { id:"jp-natl-begin",        name:"カビゴン (Snorlax)",          set:"National Beginning Set",                 num:"027/034",  rarity:"—",               era:"B&W",      lang:"JP" },
  { id:"jp-plasma-gale",       name:"カビゴン (Snorlax)",          set:"Plasma Gale",                            num:"055/070",  rarity:"Uncommon",        era:"B&W",      lang:"JP" },
  { id:"jp-bwp-207",           name:"カビゴン (Snorlax)",          set:"BW-P Promotional Cards",                 num:"207/BW-P", rarity:"Promo",           era:"B&W",      lang:"JP" },
  { id:"jp-smp-001",           name:"カビゴン GX",                 set:"SM-P Promotional Cards",                 num:"001/SM-P", rarity:"Promo GX",        era:"Sun & Moon",lang:"JP", note:"First Snorlax GX — JP promo" },
  { id:"jp-tag-bolt",          name:"イーブイ&カビゴン GX",        set:"Tag Bolt (JP)",                          num:"—",        rarity:"Rare Holo Tag GX",era:"Sun & Moon",lang:"JP", note:"Eevee & Snorlax GX JP" },
  { id:"jp-double-blaze",      name:"カビゴン (Snorlax)",          set:"Double Blaze",                           num:"076/095",  rarity:"Rare",            era:"Sun & Moon",lang:"JP" },
  { id:"jp-sm-family",         name:"カビゴン (Snorlax)",          set:"Sun & Moon Family Pokémon Card Game",    num:"038/051",  rarity:"—",               era:"Sun & Moon",lang:"JP" },
  { id:"jp-xy-begin",          name:"カビゴン (Snorlax)",          set:"XY Beginning Set",                       num:"026/039",  rarity:"—",               era:"XY",       lang:"JP" },
  { id:"jp-wild-blaze",        name:"カビゴン (Snorlax)",          set:"Wild Blaze",                             num:"066/080",  rarity:"Uncommon",        era:"XY",       lang:"JP" },
  { id:"jp-break-starter",     name:"カビゴン (Snorlax)",          set:"BREAK Starter Pack",                     num:"047/072",  rarity:"—",               era:"XY",       lang:"JP" },
  { id:"jp-xyp-149",           name:"カビゴン (Snorlax)",          set:"XY-P Promotional Cards",                 num:"149/XY-P", rarity:"Promo",           era:"XY",       lang:"JP" },
  { id:"jp-xyp-261",           name:"カビゴン (Snorlax)",          set:"XY-P Promotional Cards",                 num:"261/XY-P", rarity:"Promo",           era:"XY",       lang:"JP" },
  { id:"jp-awakening",         name:"カビゴン (Snorlax)",          set:"Awakening Psychic King",                 num:"057/078",  rarity:"Common",          era:"XY",       lang:"JP" },
  { id:"jp-v-grass",           name:"カビゴン (Snorlax)",          set:"V Starter Set Grass",                    num:"010/023",  rarity:"—",               era:"Sw&Sh",    lang:"JP" },
  { id:"jp-rebellion",         name:"カビゴン (Snorlax)",          set:"Rebellion Crash",                        num:"077/096",  rarity:"Uncommon",        era:"Sw&Sh",    lang:"JP" },
  { id:"jp-classic-lugia",     name:"カビゴン (Snorlax)",          set:"Venusaur & Lugia ex Deck (Classic JP)",  num:"016/032",  rarity:"Classic",         era:"Sw&Sh",    lang:"JP" },
  { id:"jp-volt-tackle",       name:"カビゴン (Snorlax)",          set:"Amazing Volt Tackle",                    num:"084/100",  rarity:"Rare",            era:"Sw&Sh",    lang:"JP" },
  { id:"jp-vmax-climax",       name:"カビゴン (Snorlax)",          set:"VMAX Climax",                            num:"126/184",  rarity:"—",               era:"Sw&Sh",    lang:"JP" },
  { id:"jp-peerless-ur",       name:"カビゴン (Snorlax)",          set:"Peerless Fighters",                      num:"093/070",  rarity:"UR Secret Rare",  era:"Sw&Sh",    lang:"JP", note:"Gold Secret Rare" },
  { id:"jp-sp-156",            name:"カビゴン (Snorlax)",          set:"S-P Promotional Cards",                  num:"156/S-P",  rarity:"Promo",           era:"Sw&Sh",    lang:"JP" },
  { id:"jp-sw-family",         name:"カビゴン (Snorlax)",          set:"Sword & Shield Family Pokémon Card Game",num:"038/053",  rarity:"—",               era:"Sw&Sh",    lang:"JP" },
  { id:"jp-startdeck-341",     name:"カビゴン (Snorlax)",          set:"Start Deck 100",                         num:"341/414",  rarity:"—",               era:"Sw&Sh",    lang:"JP" },
  { id:"jp-startdeck-342",     name:"カビゴン (Snorlax)",          set:"Start Deck 100",                         num:"342/414",  rarity:"—",               era:"Sw&Sh",    lang:"JP" },
  { id:"jp-corocoro-start",    name:"カビゴン (Snorlax)",          set:"Start Deck 100 CoroCoro Version",        num:"008/024",  rarity:"Promo",           era:"Sw&Sh",    lang:"JP", note:"CoroCoro Comic exclusive" },
  { id:"jp-pokemon-go",        name:"カビゴン (Snorlax)",          set:"Pokémon GO (JP)",                        num:"056/071",  rarity:"Rare",            era:"Sw&Sh",    lang:"JP" },
  { id:"jp-dark-phantasma-r",  name:"カビゴン (Snorlax)",          set:"Dark Phantasma",                         num:"058/071",  rarity:"Rare",            era:"Sc&Vi",    lang:"JP" },
  { id:"jp-dark-phantasma-chr",name:"カビゴン (Snorlax)",          set:"Dark Phantasma",                         num:"077/071",  rarity:"CHR (Character Rare)",era:"Sc&Vi",lang:"JP" },
  { id:"jp-vs-charizard",      name:"カビゴン (Snorlax)",          set:"Venusaur/Charizard/Blastoise Special Deck Set ex",num:"021/049",rarity:"—",      era:"Sc&Vi",    lang:"JP" },
  { id:"jp-card151-u",         name:"カビゴン (Snorlax)",          set:"Pokémon Card 151 (JP)",                  num:"143/165",  rarity:"Uncommon",        era:"Sc&Vi",    lang:"JP" },
  { id:"jp-card151-ar",        name:"カビゴン (Snorlax)",          set:"Pokémon Card 151 (JP)",                  num:"181/165",  rarity:"Art Rare (AR)",   era:"Sc&Vi",    lang:"JP" },
  { id:"jp-shiny-145",         name:"カビゴン (Snorlax)",          set:"Shiny Treasure ex (JP)",                 num:"145/190",  rarity:"—",               era:"Sc&Vi",    lang:"JP" },
  { id:"jp-shiny-s",           name:"カビゴン Shiny",              set:"Shiny Treasure ex (JP)",                 num:"310/190",  rarity:"Shiny Rare (S)",  era:"Sc&Vi",    lang:"JP", note:"Shiny variant" },
  { id:"jp-crimson-haze",      name:"カビゴン (Snorlax)",          set:"Crimson Haze (JP)",                      num:"051/066",  rarity:"Uncommon",        era:"Sc&Vi",    lang:"JP" },
  { id:"jp-battle-567",        name:"カビゴン (Snorlax)",          set:"Start Deck 100 Battle Collection",       num:"567/742",  rarity:"—",               era:"Sc&Vi",    lang:"JP" },
  { id:"jp-battle-568",        name:"カビゴン (Snorlax)",          set:"Start Deck 100 Battle Collection",       num:"568/742",  rarity:"—",               era:"Sc&Vi",    lang:"JP" },
  { id:"jp-stellar-syl",       name:"カビゴン (Snorlax)",          set:"Stellar Tera Starter Set Sylveon ex",    num:"010/022",  rarity:"—",               era:"Sc&Vi",    lang:"JP" },
  { id:"jp-corociao",          name:"カビゴン (Snorlax)",          set:"Start Deck 100 Battle Collection CoroCiao",num:"012/023",rarity:"Promo",           era:"Sc&Vi",    lang:"JP", note:"CoroCiao Italy magazine exclusive" },
  { id:"jp-battle-academy",    name:"カビゴン (Snorlax)",          set:"Pokémon Card Game Battle Academy",       num:"046/066",  rarity:"—",               era:"Sc&Vi",    lang:"JP" },
  { id:"jp-nihil-zero",        name:"カビゴン (Snorlax)",          set:"Nihil Zero (JP)",                        num:"062/080",  rarity:"Common",          era:"Sc&Vi",    lang:"JP", note:"JP equivalent of Perfect Order" },

  // ══ KOREAN ════════════════════════════════════════════════════════════════════
  { id:"ko-jungle-h",    name:"잠만보 (Snorlax)",   set:"Jungle (KR)",                    num:"11/64",   rarity:"Rare Holo",   era:"Wizards",  lang:"KR" },
  { id:"ko-jungle-nh",   name:"잠만보 (Snorlax)",   set:"Jungle (KR)",                    num:"27/64",   rarity:"Rare",        era:"Wizards",  lang:"KR" },
  { id:"ko-frlg",        name:"잠만보 (Snorlax)",   set:"EX FireRed & LeafGreen (KR)",    num:"15/112",  rarity:"Rare Holo",   era:"EX Era",   lang:"KR" },
  { id:"ko-dp",          name:"잠만보 (Snorlax)",   set:"Diamond & Pearl (KR)",           num:"37/130",  rarity:"Uncommon",    era:"D&P",      lang:"KR" },
  { id:"ko-flashfire",   name:"잠만보 (Snorlax)",   set:"Flashfire (KR)",                 num:"80/106",  rarity:"Uncommon",    era:"XY",       lang:"KR" },
  { id:"ko-151",         name:"잠만보 (Snorlax)",   set:"Pokémon Card 151 (KR)",          num:"143/165", rarity:"Common",      era:"Sc&Vi",    lang:"KR" },
  { id:"ko-sv-vmax",     name:"잠만보 VMAX",         set:"Sword & Shield Base Set (KR)",   num:"141/202", rarity:"Rare VMAX",   era:"Sw&Sh",    lang:"KR" },

  // ══ CHINESE TRADITIONAL (Taiwan/HK) ══════════════════════════════════════════
  { id:"tw-jungle-h",    name:"卡比獸 (Snorlax)",   set:"Jungle (Chinese Trad.)",         num:"11/64",   rarity:"Rare Holo",   era:"Wizards",  lang:"ZH-TW", note:"Taiwan/HK" },
  { id:"tw-jungle-nh",   name:"卡比獸 (Snorlax)",   set:"Jungle (Chinese Trad.)",         num:"27/64",   rarity:"Rare",        era:"Wizards",  lang:"ZH-TW" },
  { id:"tw-frlg",        name:"卡比獸 (Snorlax)",   set:"EX FireRed & LeafGreen (TW)",    num:"15/112",  rarity:"Rare Holo",   era:"EX Era",   lang:"ZH-TW" },
  { id:"tw-vivid",       name:"卡比獸 (Snorlax)",   set:"Vivid Voltage (TW)",             num:"131/185", rarity:"Rare",        era:"Sw&Sh",    lang:"ZH-TW" },
  { id:"tw-151",         name:"卡比獸 (Snorlax)",   set:"Pokémon Card 151 (TW)",          num:"143/165", rarity:"Uncommon",    era:"Sc&Vi",    lang:"ZH-TW" },

  // ══ CHINESE SIMPLIFIED (Mainland) ════════════════════════════════════════════
  { id:"cn-flashfire",   name:"卡比兽 (Snorlax)",   set:"Flashfire (CN)",                 num:"80/106",  rarity:"Uncommon",    era:"XY",       lang:"ZH-CN", note:"Mainland China" },
  { id:"cn-vivid",       name:"卡比兽 (Snorlax)",   set:"Vivid Voltage (CN)",             num:"131/185", rarity:"Rare",        era:"Sw&Sh",    lang:"ZH-CN" },
  { id:"cn-151",         name:"卡比兽 (Snorlax)",   set:"Pokémon Card 151 (CN)",          num:"143/165", rarity:"Common",      era:"Sc&Vi",    lang:"ZH-CN" },

  // ══ PORTUGUESE ════════════════════════════════════════════════════════════════
  { id:"pt-jungle-h",    name:"Snorlax",            set:"Jungle (PT)",                    num:"11/64",   rarity:"Rare Holo",   era:"Wizards",  lang:"PT" },
  { id:"pt-flashfire",   name:"Snorlax",            set:"Flashfire (PT)",                 num:"80/106",  rarity:"Uncommon",    era:"XY",       lang:"PT" },
  { id:"pt-151",         name:"Snorlax",            set:"Pokémon 151 (PT)",               num:"143/165", rarity:"Common",      era:"Sc&Vi",    lang:"PT" },

  // ══ GERMAN ════════════════════════════════════════════════════════════════════
  { id:"de-jungle-h",    name:"Relaxo",             set:"Jungle (DE)",                    num:"11/64",   rarity:"Rare Holo",   era:"Wizards",  lang:"DE", note:"German name: Relaxo" },
  { id:"de-jungle-nh",   name:"Relaxo",             set:"Jungle (DE)",                    num:"27/64",   rarity:"Rare",        era:"Wizards",  lang:"DE" },
  { id:"de-flashfire",   name:"Relaxo",             set:"Flashfire (DE)",                 num:"80/106",  rarity:"Uncommon",    era:"XY",       lang:"DE" },
  { id:"de-151",         name:"Relaxo",             set:"Pokémon 151 (DE)",               num:"143/165", rarity:"Common",      era:"Sc&Vi",    lang:"DE" },

  // ══ FRENCH ════════════════════════════════════════════════════════════════════
  { id:"fr-jungle-h",    name:"Ronflex",            set:"Jungle (FR)",                    num:"11/64",   rarity:"Rare Holo",   era:"Wizards",  lang:"FR", note:"French name: Ronflex" },
  { id:"fr-jungle-nh",   name:"Ronflex",            set:"Jungle (FR)",                    num:"27/64",   rarity:"Rare",        era:"Wizards",  lang:"FR" },
  { id:"fr-flashfire",   name:"Ronflex",            set:"Flashfire (FR)",                 num:"80/106",  rarity:"Uncommon",    era:"XY",       lang:"FR" },
  { id:"fr-151",         name:"Ronflex",            set:"Pokémon 151 (FR)",               num:"143/165", rarity:"Common",      era:"Sc&Vi",    lang:"FR" },

  // ══ ITALIAN ═══════════════════════════════════════════════════════════════════
  { id:"it-jungle-h",    name:"Snorlax",            set:"Jungle (IT)",                    num:"11/64",   rarity:"Rare Holo",   era:"Wizards",  lang:"IT" },
  { id:"it-151",         name:"Snorlax",            set:"Pokémon 151 (IT)",               num:"143/165", rarity:"Common",      era:"Sc&Vi",    lang:"IT" },

  // ══ SPANISH ═══════════════════════════════════════════════════════════════════
  { id:"es-jungle-h",    name:"Snorlax",            set:"Jungle (ES)",                    num:"11/64",   rarity:"Rare Holo",   era:"Wizards",  lang:"ES" },
  { id:"es-151",         name:"Snorlax",            set:"Pokémon 151 (ES)",               num:"143/165", rarity:"Common",      era:"Sc&Vi",    lang:"ES" },
];

// Cards with API IDs get images + prices fetched; apiId overrides id for fetching (reverse holos share image with base card)
const API_IDS = [...new Set(CARDS.filter(c => c.lang === "EN" && !c.id.includes("-rh") && !c.id.includes("pocket-") && !c.id.includes("classic")).map(c => c.apiId || c.id))];

const ERA_ORDER = ["Wizards","EX Era","D&P","HGSS","B&W","XY","Sun & Moon","Sw&Sh","Sc&Vi","Pocket"];
const ERA_LABEL = { Wizards:"Wizards Era", "EX Era":"EX Era", "D&P":"Diamond & Pearl", HGSS:"HeartGold SoulSilver", "B&W":"Black & White", XY:"XY", "Sun & Moon":"Sun & Moon", "Sw&Sh":"Sword & Shield", "Sc&Vi":"Scarlet & Violet", Pocket:"TCG Pocket" };
const ERA_COLOR = { Wizards:"#9ca3af","EX Era":"#ef4444","D&P":"#3b82f6",HGSS:"#f59e0b","B&W":"#6b7280",XY:"#8b5cf6","Sun & Moon":"#f97316","Sw&Sh":"#0ea5e9","Sc&Vi":"#ec4899",Pocket:"#10b981" };
const LANG_FLAG = { EN:"🇺🇸",JP:"🇯🇵",KR:"🇰🇷","ZH-TW":"🇹🇼","ZH-CN":"🇨🇳",PT:"🇧🇷",DE:"🇩🇪",FR:"🇫🇷",IT:"🇮🇹",ES:"🇪🇸" };
const LANG_LABEL = { EN:"English",JP:"Japanese",KR:"Korean","ZH-TW":"Chinese (Trad.)","ZH-CN":"Chinese (Simp.)",PT:"Portuguese",DE:"German",FR:"French",IT:"Italian",ES:"Spanish" };
const ALL_LANGS = ["All","EN","JP","KR","ZH-TW","ZH-CN","PT","DE","FR","IT","ES"];

function rarityGlow(r=""){
  const s=r.toLowerCase();
  if(s.includes("rainbow")||s.includes("immersive")) return "#d946ef";
  if(s.includes("gold")||s.includes("ur secret")) return "#f59e0b";
  if(s.includes("special illustration")||s.includes("sir")||s.includes("chr")||s.includes("art rare")||s.includes(" ar")) return "#f472b6";
  if(s.includes("shiny")) return "#34d399";
  if(s.includes("vmax")||s.includes("gx")||s.includes("lv.x")||s.includes("★★")) return "#c084fc";
  if(s.includes(" ex")||s.includes("ex ")) return "#fb923c";
  if(s.includes(" v ")||s.includes("ultra rare v")) return "#818cf8";
  if(s.includes("holo")&&!s.includes("reverse")) return "#60a5fa";
  if(s.includes("reverse")||s.includes("trainer gallery")) return "#7dd3fc";
  if(s.includes("promo")) return "#2dd4bf";
  return null;
}

function fmtPrice(p){ return p != null ? `$${Number(p).toFixed(2)}` : null; }

export default function App() {
  const [apiData, setApiData] = useState({}); // { cardId: { img, prices } }
  const [loadingApi, setLoadingApi] = useState(true);
  const [loadMsg, setLoadMsg] = useState("Loading card data…");
  const [owned, setOwned] = useState(() => { try{return new Set(JSON.parse(localStorage.getItem("snorlax_v3")||"[]"))}catch{return new Set()} });
  const [eraFilter, setEraFilter] = useState("All");
  const [langFilter, setLangFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [ownedOnly, setOwnedOnly] = useState(false);
  const [view, setView] = useState("grid"); // grid | list
  const [modal, setModal] = useState(null);
  const [sortBy, setSortBy] = useState("era"); // era | price | name

  // Fetch all English card data from pokemontcg.io
  useEffect(() => {
    (async () => {
      const result = {};
      try {
        // Batch into pages
        let page = 1;
        while (true) {
          setLoadMsg(`Fetching card data (page ${page})…`);
          const res = await fetch(`https://api.pokemontcg.io/v2/cards?q=nationalPokedexNumbers:143&pageSize=250&page=${page}`);
          const data = await res.json();
          for (const card of (data.data || [])) {
            const prices = card.tcgplayer?.prices || {};
            // Pick best price tier: holofoil > normal > reverseHolofoil > 1stEditionHolofoil
            const tier = prices.holofoil || prices.normal || prices.reverseHolofoil || prices["1stEditionHolofoil"] || null;
            result[card.id] = {
              img: card.images?.small || null,
              imgLarge: card.images?.large || null,
              market: tier?.market ?? null,
              low: tier?.low ?? null,
              high: tier?.high ?? null,
              priceTypes: Object.keys(prices),
              allPrices: prices,
              artist: card.artist || "",
            };
          }
          if (!data.data || data.data.length < 250) break;
          page++; if (page > 6) break;
        }
      } catch(e) { console.warn("API error", e); }
      setApiData(result);
      setLoadingApi(false);
    })();
  }, []);

  useEffect(() => { try{localStorage.setItem("snorlax_v3",JSON.stringify([...owned]))}catch{} }, [owned]);
  const toggle = useCallback(id => setOwned(p=>{const n=new Set(p);n.has(id)?n.delete(id):n.add(id);return n}),[]);

  // Enrich cards with API data
  const enriched = useMemo(() => CARDS.map(c => {
    const fetchId = c.apiId || c.id;
    const api = apiData[fetchId] || {};
    // For reverse holos, look up reverseHolofoil price specifically
    let market = api.market ?? null;
    let low = api.low ?? null;
    let high = api.high ?? null;
    if (c.id.includes("-rh") && api.allPrices?.reverseHolofoil) {
      const rh = api.allPrices.reverseHolofoil;
      market = rh.market ?? null; low = rh.low ?? null; high = rh.high ?? null;
    }
    return { ...c, img: api.img || null, imgLarge: api.imgLarge || null, market, low, high, artist: api.artist || "" };
  }), [apiData]);

  const filtered = useMemo(() => {
    let cards = enriched.filter(c => {
      if (eraFilter !== "All" && c.era !== eraFilter) return false;
      if (langFilter !== "All" && c.lang !== langFilter) return false;
      if (ownedOnly && !owned.has(c.id)) return false;
      if (search) { const q = search.toLowerCase(); return c.name.toLowerCase().includes(q) || c.set.toLowerCase().includes(q) || c.num.toLowerCase().includes(q) || c.rarity.toLowerCase().includes(q); }
      return true;
    });
    if (sortBy === "price") cards = [...cards].sort((a,b) => (b.market||0) - (a.market||0));
    else if (sortBy === "name") cards = [...cards].sort((a,b) => a.name.localeCompare(b.name));
    return cards;
  }, [enriched, eraFilter, langFilter, ownedOnly, search, sortBy, owned]);

  const grouped = useMemo(() => {
    if (sortBy !== "era") return { "Results": filtered };
    const g = {};
    filtered.forEach(c => { if(!g[c.era])g[c.era]=[]; g[c.era].push(c); });
    return g;
  }, [filtered, sortBy]);

  const groupKeys = sortBy === "era" ? ERA_ORDER.filter(e => grouped[e]?.length) : ["Results"];

  const total = CARDS.length;
  const ownedCount = owned.size;
  const pct = total ? Math.round((ownedCount/total)*100) : 0;
  const ownedValue = enriched.filter(c => owned.has(c.id) && c.market).reduce((s,c) => s + c.market, 0);

  // ── CARD COMPONENTS ──────────────────────────────────────────────────────────
  function GridCard({ card }) {
    const isOwned = owned.has(card.id);
    const glow = rarityGlow(card.rarity);
    const [imgErr, setImgErr] = useState(false);
    return (
      <div onClick={()=>toggle(card.id)} onDoubleClick={()=>setModal(card)}
        title={`${card.name} — ${card.set}\nDouble-click for details`}
        style={{ borderRadius:10,overflow:"hidden",cursor:"pointer",display:"flex",flexDirection:"column",
          background:isOwned?"rgba(74,222,128,0.1)":"rgba(255,255,255,0.04)",
          border:`1px solid ${isOwned?"rgba(74,222,128,0.4)":glow?`${glow}44`:"rgba(255,255,255,0.07)"}`,
          boxShadow:isOwned&&glow?`0 0 12px ${glow}44`:"none", transition:"all 0.15s" }}>
        <div style={{background:"rgba(0,0,0,0.35)",minHeight:88,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
          {card.img && !imgErr
            ? <img src={card.img} onError={()=>setImgErr(true)} alt={card.name} style={{width:"100%",maxWidth:112,display:"block",margin:"auto",opacity:isOwned?1:0.55,transition:"opacity 0.2s"}} />
            : <div style={{fontSize:28,padding:"12px 0",opacity:0.25}}>😴</div>
          }
          {isOwned && <div style={{position:"absolute",top:4,right:4,width:17,height:17,borderRadius:999,background:"#4ade80",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:900,color:"#000"}}>✓</div>}
          <div style={{position:"absolute",top:3,left:4,fontSize:11}}>{LANG_FLAG[card.lang]||"🌐"}</div>
        </div>
        <div style={{padding:"6px 7px 7px",flex:1,display:"flex",flexDirection:"column",gap:1}}>
          <div style={{fontSize:10,fontWeight:700,color:isOwned?"#4ade80":"#e2e8f0",lineHeight:1.2}}>{card.name}</div>
          <div style={{fontSize:9,color:"#64748b",lineHeight:1.3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{card.set}</div>
          <div style={{fontSize:9,color:"#475569"}}>#{card.num}</div>
          <div style={{fontSize:8,color:glow||"#475569",marginTop:1,lineHeight:1.2}}>{card.rarity}</div>
          {card.market != null && (
            <div style={{marginTop:3,fontSize:10,fontWeight:700,color:"#fbbf24"}}>{fmtPrice(card.market)}</div>
          )}
          {card.note && <div style={{fontSize:7.5,color:"#374151",fontStyle:"italic",marginTop:1,lineHeight:1.2}}>{card.note}</div>}
        </div>
      </div>
    );
  }

  function ListRow({ card }) {
    const isOwned = owned.has(card.id);
    const glow = rarityGlow(card.rarity);
    const [imgErr, setImgErr] = useState(false);
    return (
      <div onClick={()=>toggle(card.id)} onDoubleClick={()=>setModal(card)}
        style={{ display:"flex",alignItems:"center",gap:9,padding:"7px 10px",borderRadius:8,cursor:"pointer",transition:"all 0.12s",
          background:isOwned?"rgba(74,222,128,0.07)":"rgba(255,255,255,0.03)",
          border:`1px solid ${isOwned?"rgba(74,222,128,0.2)":"rgba(255,255,255,0.06)"}` }}>
        {card.img && !imgErr
          ? <img src={card.img} onError={()=>setImgErr(true)} alt="" style={{width:34,height:48,objectFit:"contain",borderRadius:3,flexShrink:0,opacity:isOwned?1:0.5}} />
          : <div style={{width:34,height:48,background:"rgba(255,255,255,0.04)",borderRadius:3,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0,opacity:0.3}}>😴</div>}
        <div style={{width:17,height:17,borderRadius:4,border:`2px solid ${isOwned?"#4ade80":"rgba(255,255,255,0.18)"}`,background:isOwned?"#4ade80":"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:900,color:"#000",flexShrink:0,transition:"all 0.12s"}}>{isOwned?"✓":""}</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontWeight:700,fontSize:11,color:isOwned?"#4ade80":"#e2e8f0",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{LANG_FLAG[card.lang]} {card.name}</div>
          <div style={{fontSize:9,color:"#64748b",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{card.set} · #{card.num}</div>
          {card.note && <div style={{fontSize:8,color:"#374151",fontStyle:"italic"}}>{card.note}</div>}
        </div>
        <div style={{textAlign:"right",flexShrink:0}}>
          {card.market != null && <div style={{fontSize:11,fontWeight:700,color:"#fbbf24"}}>{fmtPrice(card.market)}</div>}
          <div style={{fontSize:8,color:glow||"#475569",marginTop:1,maxWidth:90,textAlign:"right"}}>{card.rarity}</div>
        </div>
      </div>
    );
  }

  // ── MODAL ────────────────────────────────────────────────────────────────────
  const Modal = () => {
    if (!modal) return null;
    const isOwned = owned.has(modal.id);
    const prices = modal.allPrices || {};
    const priceRows = Object.entries(prices).filter(([,v])=>v?.market);
    return (
      <div onClick={()=>setModal(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center",padding:16,overflowY:"auto"}}>
        <div onClick={e=>e.stopPropagation()} style={{background:"linear-gradient(140deg,#1e1b4b,#0f0c29)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:16,padding:20,maxWidth:360,width:"100%"}}>
          <div style={{textAlign:"center"}}>
            {(modal.imgLarge||modal.img)
              ? <img src={modal.imgLarge||modal.img} alt={modal.name} style={{maxWidth:"100%",maxHeight:280,borderRadius:10,boxShadow:"0 6px 40px rgba(0,0,0,0.6)"}} />
              : <div style={{fontSize:72,padding:16}}>😴</div>}
            <div style={{marginTop:10,fontWeight:900,fontSize:16,color:"#e2e8f0"}}>{modal.name}</div>
            <div style={{color:"#94a3b8",fontSize:12,marginTop:3}}>{LANG_FLAG[modal.lang]} {modal.set}</div>
            <div style={{color:"#64748b",fontSize:11,marginTop:2}}>#{modal.num} · {modal.rarity}</div>
            {modal.artist && <div style={{color:"#475569",fontSize:10,marginTop:2}}>🎨 {modal.artist}</div>}
            {modal.note && <div style={{color:"#3b82f6",fontSize:10,marginTop:4,fontStyle:"italic"}}>{modal.note}</div>}
          </div>

          {/* Prices */}
          {priceRows.length > 0 && (
            <div style={{marginTop:14,background:"rgba(0,0,0,0.3)",borderRadius:10,padding:"10px 12px"}}>
              <div style={{fontSize:10,color:"#475569",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:6}}>TCGPlayer Prices</div>
              {priceRows.map(([type, p]) => (
                <div key={type} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                  <span style={{fontSize:10,color:"#64748b",textTransform:"capitalize"}}>{type.replace(/([A-Z])/g," $1").trim()}</span>
                  <span style={{fontSize:11,fontWeight:700,color:"#fbbf24"}}>{fmtPrice(p.market)} <span style={{fontSize:9,color:"#475569",fontWeight:400}}>({fmtPrice(p.low)}–{fmtPrice(p.high)})</span></span>
                </div>
              ))}
            </div>
          )}
          {modal.market == null && modal.lang === "EN" && !loadingApi && (
            <div style={{marginTop:10,textAlign:"center",fontSize:10,color:"#374151"}}>No price data available for this card</div>
          )}
          {modal.lang !== "EN" && (
            <div style={{marginTop:10,textAlign:"center",fontSize:10,color:"#374151"}}>Price data only available for English cards via TCGPlayer</div>
          )}

          <div style={{marginTop:14,display:"flex",gap:8,justifyContent:"center"}}>
            <button onClick={()=>{toggle(modal.id)}} style={{padding:"8px 16px",borderRadius:999,border:"none",background:isOwned?"#ef4444":"#4ade80",color:"#000",fontWeight:800,fontSize:12,cursor:"pointer"}}>
              {isOwned?"Remove ✗":"Add to Collection ✓"}
            </button>
            <button onClick={()=>setModal(null)} style={{padding:"8px 14px",borderRadius:999,border:"1px solid rgba(255,255,255,0.15)",background:"transparent",color:"#94a3b8",fontSize:12,cursor:"pointer"}}>Close</button>
          </div>
        </div>
      </div>
    );
  };

  // ── RENDER ───────────────────────────────────────────────────────────────────
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d0b1e,#150a2e 50%,#091520)",fontFamily:"'Trebuchet MS',sans-serif",color:"#e2e8f0",paddingBottom:60}}>
      <Modal />

      {/* ── HEADER ── */}
      <div style={{background:"rgba(0,0,0,0.6)",borderBottom:"2px solid rgba(251,191,36,0.2)",padding:"18px 16px 12px",textAlign:"center",backdropFilter:"blur(14px)",position:"sticky",top:0,zIndex:200}}>
        <div style={{fontSize:30}}>😴</div>
        <h1 style={{margin:"2px 0 0",fontSize:"clamp(17px,4vw,24px)",fontWeight:900,letterSpacing:"0.07em",
          background:"linear-gradient(90deg,#fbbf24,#fde68a,#f59e0b)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",textTransform:"uppercase"}}>
          Snorlax Master Checklist
        </h1>
        <div style={{fontSize:10,color:"#374151",marginTop:1}}>Every card · Every language · Every variant · Live prices</div>

        {/* Stats row */}
        {!loadingApi && (
          <div style={{display:"flex",gap:16,justifyContent:"center",marginTop:8,flexWrap:"wrap"}}>
            {[
              [`${ownedCount}/${total}`, "Cards Owned"],
              [`${pct}%`, "Complete"],
              [`$${ownedValue.toFixed(2)}`, "Collection Value"],
            ].map(([val,lbl])=>(
              <div key={lbl} style={{textAlign:"center"}}>
                <div style={{fontSize:14,fontWeight:800,color:"#fbbf24"}}>{val}</div>
                <div style={{fontSize:9,color:"#475569"}}>{lbl}</div>
              </div>
            ))}
          </div>
        )}

        {/* Progress bar */}
        {!loadingApi && (
          <div style={{maxWidth:380,margin:"8px auto 0"}}>
            <div style={{background:"rgba(255,255,255,0.07)",borderRadius:999,height:5,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${pct}%`,background:"linear-gradient(90deg,#fbbf24,#f59e0b)",borderRadius:999,transition:"width 0.5s",boxShadow:"0 0 6px rgba(251,191,36,0.4)"}} />
            </div>
          </div>
        )}
        {loadingApi && <div style={{marginTop:8,fontSize:10,color:"#374151"}}>⏳ {loadMsg}</div>}
      </div>

      {/* ── FILTERS ── */}
      <div style={{maxWidth:960,margin:"0 auto",padding:"11px 12px 4px"}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍  Search name, set, number, rarity…"
          style={{width:"100%",boxSizing:"border-box",padding:"8px 12px",borderRadius:8,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.05)",color:"#e2e8f0",fontSize:12,marginBottom:8,outline:"none"}} />

        {/* Era */}
        <div style={{marginBottom:7}}>
          <div style={{fontSize:9,color:"#374151",textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:4}}>Era</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
            {["All",...ERA_ORDER].map(e=>(
              <button key={e} onClick={()=>setEraFilter(e)} style={{padding:"3px 9px",borderRadius:999,border:`1px solid ${eraFilter===e?"#fbbf24":"rgba(255,255,255,0.08)"}`,background:eraFilter===e?"rgba(251,191,36,0.15)":"rgba(255,255,255,0.03)",color:eraFilter===e?"#fbbf24":"#94a3b8",fontSize:9,cursor:"pointer",fontWeight:eraFilter===e?700:400}}>
                {e==="All"?"All Eras":ERA_LABEL[e]||e}
              </button>
            ))}
          </div>
        </div>

        {/* Lang */}
        <div style={{marginBottom:7}}>
          <div style={{fontSize:9,color:"#374151",textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:4}}>Language</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
            {ALL_LANGS.map(l=>(
              <button key={l} onClick={()=>setLangFilter(l)} style={{padding:"3px 9px",borderRadius:999,border:`1px solid ${langFilter===l?"#fbbf24":"rgba(255,255,255,0.08)"}`,background:langFilter===l?"rgba(251,191,36,0.15)":"rgba(255,255,255,0.03)",color:langFilter===l?"#fbbf24":"#94a3b8",fontSize:9,cursor:"pointer",fontWeight:langFilter===l?700:400}}>
                {l==="All"?"All Languages":`${LANG_FLAG[l]} ${LANG_LABEL[l]||l}`}
              </button>
            ))}
          </div>
        </div>

        {/* Controls row */}
        <div style={{display:"flex",alignItems:"center",gap:7,flexWrap:"wrap",marginTop:4}}>
          {[
            ["✓ Owned", ownedOnly, ()=>setOwnedOnly(!ownedOnly), ownedOnly?"#4ade80":"#94a3b8"],
            [view==="grid"?"☰ List":"⊞ Grid", false, ()=>setView(v=>v==="grid"?"list":"grid"), "#94a3b8"],
          ].map(([lbl,active,fn,col])=>(
            <button key={lbl} onClick={fn} style={{padding:"3px 10px",borderRadius:999,border:`1px solid ${active?"rgba(74,222,128,0.4)":"rgba(255,255,255,0.08)"}`,background:active?"rgba(74,222,128,0.1)":"rgba(255,255,255,0.03)",color:col,fontSize:9,cursor:"pointer",fontWeight:active?700:400}}>{lbl}</button>
          ))}
          {/* Sort */}
          {["era","price","name"].map(s=>(
            <button key={s} onClick={()=>setSortBy(s)} style={{padding:"3px 10px",borderRadius:999,border:`1px solid ${sortBy===s?"rgba(251,191,36,0.4)":"rgba(255,255,255,0.08)"}`,background:sortBy===s?"rgba(251,191,36,0.1)":"rgba(255,255,255,0.03)",color:sortBy===s?"#fbbf24":"#64748b",fontSize:9,cursor:"pointer",fontWeight:sortBy===s?700:400}}>
              {s==="era"?"By Era":s==="price"?"By Price":"By Name"}
            </button>
          ))}
          <span style={{fontSize:9,color:"#1e293b"}}>{filtered.length} shown · {total} total · tap=own · dbl=details</span>
        </div>
      </div>

      {/* ── CARDS ── */}
      <div style={{maxWidth:960,margin:"0 auto",padding:"2px 12px"}}>
        {groupKeys.map(era => {
          const cards = grouped[era]; if(!cards?.length) return null;
          const oc = cards.filter(c=>owned.has(c.id)).length;
          const col = ERA_COLOR[era]||"#6b7280";
          const groupValue = cards.filter(c=>owned.has(c.id)&&c.market).reduce((s,c)=>s+c.market,0);
          return (
            <div key={era} style={{marginBottom:18}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,padding:"6px 11px",borderRadius:8,background:`linear-gradient(90deg,${col}18,transparent)`,borderLeft:`3px solid ${col}`}}>
                <span style={{fontWeight:800,fontSize:12,color:"#e2e8f0"}}>{ERA_LABEL[era]||era}</span>
                <div style={{flex:1,height:1,background:"rgba(255,255,255,0.04)"}} />
                {groupValue > 0 && <span style={{fontSize:9,color:"#f59e0b",fontWeight:700}}>${groupValue.toFixed(2)}</span>}
                <span style={{fontSize:9,color:"#475569"}}>{oc}/{cards.length}</span>
                <div style={{width:40,height:3,borderRadius:999,background:"rgba(255,255,255,0.06)",overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${cards.length?oc/cards.length*100:0}%`,background:col,borderRadius:999,transition:"width 0.4s"}} />
                </div>
              </div>
              {view==="grid"
                ? <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(120px,1fr))",gap:6}}>{cards.map(c=><GridCard key={c.id} card={c}/>)}</div>
                : <div style={{display:"flex",flexDirection:"column",gap:4}}>{cards.map(c=><ListRow key={c.id} card={c}/>)}</div>
              }
            </div>
          );
        })}
        {filtered.length===0&&<div style={{textAlign:"center",color:"#374151",padding:48,fontSize:13}}>No cards match. 😴</div>}
      </div>
    </div>
  );
}
