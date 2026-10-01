(() => {
  const MIRRORS = Object.freeze([
    (repo, path) => `https://cdn.jsdelivr.net/gh/${repo}@main/${path}`,
    (repo, path) => `https://raw.githubusercontent.com/${repo}/main/${path}`
  ]);

  const STATE_KEYS = Object.freeze([
    "default","pointer","text","verticalText","wait","progress","crosshair","move","allScroll","grab","grabbing","help","notAllowed","zoomIn","zoomOut","copy","alias","contextMenu","cell","colResize","rowResize","ewResize","nsResize","neswResize","nwseResize"
  ]);

  const HOTSPOTS = Object.freeze({
    default:[4,3], pointer:[9,4], text:[16,16], verticalText:[16,16], wait:[16,16], progress:[4,3],
    crosshair:[16,16], move:[16,16], allScroll:[16,16], grab:[16,16], grabbing:[16,16], help:[4,3],
    notAllowed:[16,16], zoomIn:[15,15], zoomOut:[15,15], copy:[9,4], alias:[9,4], contextMenu:[9,4], cell:[16,16],
    colResize:[16,16], rowResize:[16,16], ewResize:[16,16], nsResize:[16,16], neswResize:[16,16], nwseResize:[16,16]
  });

  // Only file names confirmed in the current upstream GitHub trees are used here.
  // Animated wait/progress files are only direct files in Google_Cursor; the other
  // projects expose those as frame directories, so those states intentionally fall
  // back to a verified state instead of probing guessed URLs.
  const COMMON = Object.freeze({
    default:"left_ptr.svg", pointer:"hand2.svg", text:"xterm.svg", verticalText:"vertical-text.svg",
    crosshair:"cross.svg", move:"move.svg", allScroll:"all-scroll.svg", grab:"hand1.svg",
    help:"question_arrow.svg", notAllowed:"crossed_circle.svg", zoomIn:"zoom-in.svg", zoomOut:"zoom-out.svg",
    copy:"copy.svg", alias:"link.svg", contextMenu:"context-menu.svg", cell:"plus.svg",
    colResize:"sb_h_double_arrow.svg", rowResize:"sb_v_double_arrow.svg", ewResize:"sb_h_double_arrow.svg", nsResize:"sb_v_double_arrow.svg",
    neswResize:"bottom_left_corner.svg", nwseResize:"bottom_right_corner.svg"
  });

  const FAMILY_FILES = Object.freeze({
    apple: Object.freeze({...COMMON, crosshair:"crosshair.svg"}),
    xcursor: Object.freeze({...COMMON, crosshair:"crosshair.svg"}),
    breezex: Object.freeze({...COMMON, colResize:"col-resize.svg", rowResize:"row-resize.svg", neswResize:"bd_double_arrow.svg", nwseResize:"fd_double_arrow.svg"}),
    bibata: Object.freeze({...COMMON, crosshair:"crosshair.svg", grabbing:"grabbing.svg", copy:"dnd-copy.svg", alias:"dnd-link.svg", neswResize:"bd_double_arrow.svg", nwseResize:"fd_double_arrow.svg"}),
    google: Object.freeze({...COMMON, notAllowed:"dnd_no_drop.svg", crosshair:"cross.svg", wait:"../animated/wait.svg", progress:"../animated/left_ptr_watch.svg"})
  });

  function cleanPath(path) {
    const parts=[];
    for (const part of String(path||"").split("/")) {
      if (!part || part === ".") continue;
      if (part === "..") parts.pop(); else parts.push(part);
    }
    return parts.join("/");
  }
  function urls(repo, path) {
    const safe=cleanPath(path);
    return Object.freeze(MIRRORS.map(make => make(repo, safe)));
  }
  function stateUrls(def) {
    const files=FAMILY_FILES[def.family] || COMMON;
    const entries=STATE_KEYS.map(state => {
      const file=files[state];
      if (!file) return [state, Object.freeze([])];
      return [state, urls(def.repo, `${def.subdir}/${file}`)];
    });
    return Object.freeze(Object.fromEntries(entries));
  }
  function pack(def) {
    const stateMap=stateUrls(def);
    return Object.freeze({
      ...def,
      stateUrls:stateMap,
      defaultUrl:stateMap.default?.[0] || "",
      pointerUrl:stateMap.pointer?.[0] || "",
      hotspots:HOTSPOTS,
      defaultHotspot:HOTSPOTS.default,
      pointerHotspot:HOTSPOTS.pointer,
      verifiedSource:true
    });
  }

  const core = [
    { key:"macos-black", name:"macOS Black", fa:"macOS مشکی", group:"apple", family:"apple", source:"Apple Cursor · official", repo:"ful1e5/apple_cursor", subdir:"svg", baseColor:"#000000", outlineColor:"#FFFFFF", watchColor:"#000000" },
    { key:"macos-white", name:"macOS White", fa:"macOS سفید", group:"apple", family:"apple", source:"Apple Cursor · official", repo:"ful1e5/apple_cursor", subdir:"svg", baseColor:"#FFFFFF", outlineColor:"#000000", watchColor:"#FFFFFF" },

    { key:"breezex-dark", name:"BreezeX Dark", fa:"BreezeX تیره", group:"breezex", family:"breezex", source:"BreezeX Cursor · official", repo:"ful1e5/BreezeX_Cursor", subdir:"svg", baseColor:"#4D4D4D", outlineColor:"#FFFFFF", watchColor:"#4D4D4D" },
    { key:"breezex-light", name:"BreezeX Light", fa:"BreezeX روشن", group:"breezex", family:"breezex", source:"BreezeX Cursor · official", repo:"ful1e5/BreezeX_Cursor", subdir:"svg", baseColor:"#FFFFFF", outlineColor:"#4D4D4D", watchColor:"#FFFFFF" },
    { key:"breezex-black", name:"BreezeX Black", fa:"BreezeX مشکی", group:"breezex", family:"breezex", source:"BreezeX Cursor · official", repo:"ful1e5/BreezeX_Cursor", subdir:"svg", baseColor:"#000000", outlineColor:"#FFFFFF", watchColor:"#000000" },

    { key:"bibata-classic", name:"Bibata Modern Classic", fa:"Bibata کلاسیک", group:"bibata", family:"bibata", source:"Bibata Cursor · official", repo:"ful1e5/Bibata_Cursor", subdir:"svg/modern", baseColor:"#000000", outlineColor:"#FFFFFF", watchColor:"#000000" },
    { key:"bibata-ice", name:"Bibata Modern Ice", fa:"Bibata آیس", group:"bibata", family:"bibata", source:"Bibata Cursor · official", repo:"ful1e5/Bibata_Cursor", subdir:"svg/modern", baseColor:"#FFFFFF", outlineColor:"#000000", watchColor:"#FFFFFF" },
    { key:"bibata-amber", name:"Bibata Modern Amber", fa:"Bibata امبر", group:"bibata", family:"bibata", source:"Bibata Cursor · official", repo:"ful1e5/Bibata_Cursor", subdir:"svg/modern", baseColor:"#FF8300", outlineColor:"#FFFFFF", watchColor:"#001524" },

    { key:"xcursor-dark", name:"XCursor Pro Dark", fa:"XCursor Pro تیره", group:"xcursor", family:"xcursor", source:"XCursor Pro · official", repo:"ful1e5/XCursor-pro", subdir:"svg", baseColor:"#000000", outlineColor:"#FFFFFF", watchColor:"#000000" },
    { key:"xcursor-light", name:"XCursor Pro Light", fa:"XCursor Pro روشن", group:"xcursor", family:"xcursor", source:"XCursor Pro · official", repo:"ful1e5/XCursor-pro", subdir:"svg", baseColor:"#FFFFFF", outlineColor:"#000000", watchColor:"#FFFFFF" },
    { key:"xcursor-red", name:"XCursor Pro Red", fa:"XCursor Pro قرمز", group:"xcursor", family:"xcursor", source:"XCursor Pro · official", repo:"ful1e5/XCursor-pro", subdir:"svg", baseColor:"#FF0000", outlineColor:"#FFFFFF", watchColor:"#220000" },

    // Google_Cursor itself publishes one design. Do not invent black/white variants.
    { key:"google", name:"Google Cursor", fa:"Google Cursor", group:"google", family:"google", source:"Google Cursor · official", repo:"ful1e5/Google_Cursor", subdir:"svg/static", baseColor:"", outlineColor:"", watchColor:"", preserveSourceColors:true }
  ];

  // These 28 palettes are the published Material Bibata dark themes. They are
  // generated from the verified Bibata Modern SVG source exactly as the upstream
  // Material Bibata build does, rather than pretending to be unrelated cursor packs.
  const material = [
    ["Ice Blue", "#1a333d", "#a8cbe2", "#0a1f26"], ["Sky Blue", "#0e3251", "#8dcdff", "#051d32"],
    ["Deep Blue", "#003340", "#00b4d8", "#001f27"], ["Soft Blue", "#353f61", "#b2c5ff", "#1c233a"],
    ["Mint", "#00382f", "#65dac4", "#00211c"], ["Seafoam", "#003730", "#85dfcf", "#00211d"],
    ["Teal", "#002020", "#008080", "#001010"], ["Peach", "#4e2a1f", "#ffb59a", "#31170e"],
    ["Apricot", "#4e2e1d", "#ffc9a8", "#31190a"], ["Sunset", "#4e2b14", "#ffb785", "#311905"],
    ["Blush", "#4e2a27", "#ffb4a8", "#311714"], ["Salmon", "#532226", "#fa8072", "#351315"],
    ["Pink Pastel", "#502334", "#ffb0cb", "#331520"], ["Pink Rose", "#502a3d", "#ffbade", "#331925"],
    ["Lilac", "#373151", "#ccbeff", "#201c31"], ["Violet", "#402848", "#edb8ff", "#231528"],
    ["Sage", "#354a23", "#c7f69a", "#1e2d12"], ["Lime", "#3c4a30", "#d5f6b8", "#242d1c"],
    ["Moss", "#232208", "#98971a", "#141304"], ["Sand", "#3d352f", "#d7c4b6", "#25201c"],
    ["Beige", "#4a4232", "#f5e6ca", "#2d271e"], ["Brown", "#392312", "#cb824d", "#22140a"],
    ["Cloud", "#2e3138", "#abb2bf", "#1a1d22"], ["Grey", "#35373c", "#c7ccd6", "#202124"],
    ["Slate", "#1f262b", "#708090", "#121619"], ["Noir", "#1a1a1a", "#8c8c8c", "#0a0a0a"],
    ["Midnight", "#080a07", "#6d8c5a", "#030403"], ["Charcoal", "#0f1519", "#7591a3", "#080b0e"]
  ].map(([name, body, primary, watch]) => ({
    key:`material-${name.toLowerCase().replace(/\s+/g,"-")}`,
    name:`Material Bibata ${name}`,
    fa:`Material Bibata · ${name}`,
    group:"material", family:"bibata", source:"Material Bibata · official palette", upstream:"SakibShahariar/material-bibata-cursor",
    repo:"ful1e5/Bibata_Cursor", subdir:"svg/modern", baseColor:body, outlineColor:primary, watchColor:watch, accentColor:primary
  }));

  const packs = Object.freeze([...core, ...material].map(pack));
  const byKeyBase = Object.fromEntries(packs.map(item => [item.key,item]));
  for (const legacy of ["google-blue","google-black","google-white"]) byKeyBase[legacy]=byKeyBase.google;
  const byKey = Object.freeze(byKeyBase);
  const fallback = byKey["macos-black"];
  const groups = Object.freeze([
    Object.freeze({key:"all",fa:"همه",name:"All"}), Object.freeze({key:"apple",fa:"macOS",name:"Apple"}),
    Object.freeze({key:"breezex",fa:"BreezeX",name:"BreezeX"}), Object.freeze({key:"bibata",fa:"Bibata",name:"Bibata"}),
    Object.freeze({key:"xcursor",fa:"XCursor Pro",name:"XCursor Pro"}), Object.freeze({key:"google",fa:"Google",name:"Google Cursor"}),
    Object.freeze({key:"material",fa:"Material Bibata",name:"Material Bibata"})
  ]);

  globalThis.__PERSIANYAR_CURSOR_PACKS__ = Object.freeze({
    version:"cdn-v6-verified-mirrors-stable-40",
    packs, byKey, groups, stateKeys:STATE_KEYS,
    get:key => byKey[key] || fallback
  });
})();
