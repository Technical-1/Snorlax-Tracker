import type { Card } from "../types";

export const CARDS: Card[] = [
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

// apiId overrides id for fetching (reverse holos share image with base card)
export const API_IDS: string[] = [
  ...new Set(
    CARDS.filter(
      (c) =>
        c.lang === "EN" &&
        !c.id.includes("-rh") &&
        !c.id.includes("pocket-") &&
        !c.id.includes("classic")
    ).map((c) => c.apiId || c.id)
  ),
];

export const ERA_ORDER: string[] = [
  "Wizards", "EX Era", "D&P", "HGSS", "B&W", "XY",
  "Sun & Moon", "Sw&Sh", "Sc&Vi", "Pocket",
];

export const ERA_LABEL: Record<string, string> = {
  Wizards: "Wizards Era", "EX Era": "EX Era", "D&P": "Diamond & Pearl",
  HGSS: "HeartGold SoulSilver", "B&W": "Black & White", XY: "XY",
  "Sun & Moon": "Sun & Moon", "Sw&Sh": "Sword & Shield",
  "Sc&Vi": "Scarlet & Violet", Pocket: "TCG Pocket",
};

export const ERA_COLOR: Record<string, string> = {
  Wizards: "#9ca3af", "EX Era": "#ef4444", "D&P": "#3b82f6",
  HGSS: "#f59e0b", "B&W": "#6b7280", XY: "#8b5cf6",
  "Sun & Moon": "#f97316", "Sw&Sh": "#0ea5e9", "Sc&Vi": "#ec4899",
  Pocket: "#10b981",
};

export const LANG_FLAG: Record<string, string> = {
  EN: "🇺🇸", JP: "🇯🇵", KR: "🇰🇷", "ZH-TW": "🇹🇼", "ZH-CN": "🇨🇳",
  PT: "🇧🇷", DE: "🇩🇪", FR: "🇫🇷", IT: "🇮🇹", ES: "🇪🇸",
};

export const LANG_LABEL: Record<string, string> = {
  EN: "English", JP: "Japanese", KR: "Korean",
  "ZH-TW": "Chinese (Trad.)", "ZH-CN": "Chinese (Simp.)",
  PT: "Portuguese", DE: "German", FR: "French", IT: "Italian", ES: "Spanish",
};

export const ALL_LANGS: string[] = [
  "All", "EN", "JP", "KR", "ZH-TW", "ZH-CN", "PT", "DE", "FR", "IT", "ES",
];
