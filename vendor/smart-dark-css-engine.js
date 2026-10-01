/*
 * PersianYar Smart Dark CSS engine v39.
 * CSS-rule-first architecture:
 *   - Accessible author CSSStyleRule declarations are recolored in-place through CSSOM.
 *   - The original selector/cascade/media/container/hover/focus structure is preserved.
 *   - No normal DOM element paint walk is used by this engine.
 *   - Cross-origin stylesheets that CSSOM cannot read are fetched by the extension and mirrored
 *     into one compact color-only override sheet (browser CSSOM security rules require this).
 */
(() => {
  "use strict";
  if (globalThis.__PERSIANYAR_SMART_DARK_CSS_ENGINE__) return;

  const ENGINE_ID = "__persianyar_smart_dark_cssom";
  const WARM_CACHE_STYLE_ID = "__persianyar_smart_dark_warm_cache";
  const WARM_CACHE_ATTR = "data-persianyar-smart-dark-warm";
  const WARM_CACHE_PREFIX = "persianyarSmartDarkWarmV1:";
  const WARM_CACHE_INDEX = "persianyarSmartDarkWarmIndexV1";
  const MAX_WARM_CACHE_CSS = 900000;
  const MAX_WARM_CACHE_ENTRIES = 8;
  const MAX_WARM_CACHE_BYTES = 3200000;
  const EXTENSION_STYLE_PREFIXES = ["__fontyar_", "__persianyar_"];
  const MAX_RULES_PER_ROOT = 36000;
  const MAX_FETCHED_SHEETS = 28;
  const MAX_FETCHED_BYTES = 2_000_000;
  function safeThemeColor(value, fallback) {
    const raw=String(value||"").trim();
    try { return globalThis.CSS?.supports?.("color",raw) ? raw : fallback; } catch { return fallback; }
  }
  function rootBaseline(theme={}) {
    const bg=safeThemeColor(theme.darkSchemeBackgroundColor,"#181a1b"),fg=safeThemeColor(theme.darkSchemeTextColor,"#e8e6e3"),accent=safeThemeColor(theme.accentColor,"#8ab4f8");
    return `:root{color-scheme:dark!important;--persianyar-smart-dark-bg:${bg};--persianyar-smart-dark-fg:${fg};--persianyar-smart-dark-accent:${accent}}
html,body{background-color:${bg}!important;color:${fg}!important;scrollbar-color:color-mix(in srgb,${fg} 30%,${bg}) ${bg}!important}
::selection{background:color-mix(in srgb,${accent} 48%,${bg})!important;color:${fg}!important}
:where(input,textarea,select,button,option,optgroup,[role="textbox"],[role="searchbox"],[role="combobox"],[role="checkbox"],[role="radio"],[role="switch"]){color-scheme:dark!important}
:where(input[type="checkbox"],input[type="radio"],input[type="range"],progress){accent-color:${accent}!important}
:where(input,textarea)::placeholder{color:color-mix(in srgb,currentColor 62%,transparent)!important;opacity:1}`;
  }
  function shadowBaseline(theme={}) { const accent=safeThemeColor(theme.accentColor,"#8ab4f8"); return `:host{color-scheme:dark!important}:where(input,textarea,select,button,option,optgroup,[role="textbox"],[role="searchbox"],[role="combobox"],[role="checkbox"],[role="radio"],[role="switch"]){color-scheme:dark!important}:where(input[type="checkbox"],input[type="radio"],input[type="range"],progress){accent-color:${accent}!important}`; }

  const state = {
    enabled: false,
    theme: null,
    themeSig: "",
    roots: new Map(),
    refreshTimer: 0,
    refreshSeq: 0,
    pollTimer: 0,
    fetched: new Map(),
    fetchInflight: new Map(),
    parsedFetched: new Map(),
    lastReason: "",
    ownedSheets: new WeakSet(),
    // Direct CSSOM edits are reversible. The map is intentionally strong only while enabled.
    declarations: new Map(),
    rewrites: 0,
    initialCompiled: false,
    initialCompileHandle: 0,
    initialCompileKind: "",
    cacheWriteTimer: 0,
    lastCachedHash: "",
  };

  function core() {
    const c = globalThis.__PERSIANYAR_DARKREADER_CORE__;
    return c && typeof c.modifyBackground === "function" ? c : null;
  }

  function defaultTheme() {
    const c = core();
    return c?.normalizeTheme?.({
      mode: 1,
      brightness: 100,
      contrast: 100,
      grayscale: 0,
      sepia: 0,
      darkSchemeBackgroundColor: "#181a1b",
      darkSchemeTextColor: "#e8e6e3",
      lightSchemeBackgroundColor: "#dcdad7",
      lightSchemeTextColor: "#181a1b",
    }) || null;
  }

  function ensureTheme(theme) {
    const c = core();
    if (!c) return null;
    try { return c.normalizeTheme?.(theme || defaultTheme()) || theme || defaultTheme(); }
    catch { return defaultTheme(); }
  }

  const parseCanvas = (() => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1; canvas.height = 1;
      return canvas.getContext("2d", {willReadFrequently:true});
    } catch { return null; }
  })();
  const colorCache = new Map();
  const transformedColorCache = new Map();

  function parseColor(value) {
    const raw = String(value || "").trim();
    if (!raw || /^(?:transparent|currentcolor|inherit|initial|unset|revert|revert-layer|none)$/i.test(raw)) return null;
    if (colorCache.has(raw)) return colorCache.get(raw);
    const c = core();
    let rgb = c?.parseRgb?.(raw) || null;

    // Browser color parsing is used only once per distinct CSS token. Sampling a 1x1 canvas lets
    // modern values such as oklch(), lab(), hwb(), color(display-p3 ...), and color-mix() be
    // converted without touching any page element or forcing page layout/computed-style work.
    if (!rgb && parseCanvas) {
      try {
        const sentinel = "rgba(1, 2, 3, 0.502)";
        parseCanvas.clearRect(0, 0, 1, 1);
        parseCanvas.fillStyle = sentinel;
        parseCanvas.fillStyle = raw;
        const accepted = globalThis.CSS?.supports?.("color", raw) || String(parseCanvas.fillStyle || "") !== sentinel;
        if (accepted) {
          parseCanvas.clearRect(0, 0, 1, 1);
          parseCanvas.fillRect(0, 0, 1, 1);
          const d = parseCanvas.getImageData(0, 0, 1, 1).data;
          rgb = [d[0], d[1], d[2], d[3] / 255];
        }
      } catch {}
    }
    colorCache.set(raw, rgb);
    return rgb;
  }

  function transformColor(value, type) {
    const raw = String(value || "").trim();
    if (!raw) return "";
    const key = `${type}|${raw}|${state.theme?.darkSchemeBackgroundColor || ""}|${state.theme?.darkSchemeTextColor || ""}|${state.theme?.brightness || 100}|${state.theme?.contrast || 100}|${state.theme?.sepia || 0}|${state.theme?.grayscale || 0}`;
    if (transformedColorCache.has(key)) return transformedColorCache.get(key);
    const c = core(), rgb = parseColor(raw);
    if (!c || !rgb) { transformedColorCache.set(key, ""); return ""; }
    let mapped = null;
    try {
      mapped = type === "text" ? c.modifyForeground(rgb, state.theme) : type === "border" ? c.modifyBorder(rgb, state.theme) : c.modifyBackground(rgb, state.theme);
    } catch {}
    const out = mapped && c.toCSS ? c.toCSS(mapped) : "";
    transformedColorCache.set(key, out);
    return out;
  }

  const COLOR_WORDS = "(?:aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen)";
  const COLOR_TOKEN_RE = new RegExp(`color-mix\\([^()]*\\)|(?:oklch|oklab|lab|lch|hwb|color|rgba?|hsla?)\\([^()]*\\)|#[0-9a-f]{3,8}\\b|\\b${COLOR_WORDS}\\b`, "gi");

  function transformTokens(value, type) {
    const raw = String(value || "");
    if (!raw) return raw;
    // Do not regex through var()/url()/env()/attr() or strings. A token such as var(--black) used
    // to be corrupted because "black" matched the named-color regexp, yielding an invalid custom
    // property reference. Protecting opaque function/string ranges preserves authored CSS syntax.
    const lower=raw.toLowerCase(); let out="", plainStart=0, i=0;
    const flush=end=>{if(end>plainStart)out+=raw.slice(plainStart,end).replace(COLOR_TOKEN_RE,t=>transformColor(t,type)||t)};
    const copyQuoted=start=>{const q=raw[start];let j=start+1;for(;j<raw.length;j++){if(raw[j]==="\\"){j++;continue}if(raw[j]===q){j++;break}}return j};
    const copyBalanced=start=>{let depth=0,q="";for(let j=start;j<raw.length;j++){const ch=raw[j];if(q){if(ch==="\\"){j++;continue}if(ch===q)q="";continue}if(ch==='"'||ch==="'"){q=ch;continue}if(ch==="(")depth++;else if(ch===")"&&--depth===0)return j+1}return raw.length};
    while(i<raw.length){
      const ch=raw[i];
      if(ch==='"'||ch==="'"){flush(i);const j=copyQuoted(i);out+=raw.slice(i,j);i=j;plainStart=i;continue}
      let fn=""; for(const name of ["url(","var(","env(","attr("]){if(lower.startsWith(name,i)){fn=name;break}}
      if(fn){flush(i);const j=copyBalanced(i+fn.length-1);out+=raw.slice(i,j);i=j;plainStart=i;continue}
      i++;
    }
    flush(raw.length); return out;
  }

  function transformGradient(value) {
    const raw = String(value || "");
    if (!/gradient\(/i.test(raw)) return "";
    const c = core();
    let out = raw;
    try { out = c?.modifyGradient ? c.modifyGradient(raw, state.theme) : raw; } catch {}
    return transformTokens(out, "background");
  }

  function transformShadow(value, type = "background") {
    const raw = String(value || "");
    if (!raw || raw === "none") return "";
    return transformTokens(raw, type);
  }

  function varNames(value) {
    const out = [];
    String(value || "").replace(/var\(\s*(--[\w-]+)/g, (_m, name) => { out.push(name); return _m; });
    return out;
  }

  function noteVariableUsage(usages, name, type, weight = 1) {
    if (!name || !type) return;
    let bag = usages.get(name);
    if (!bag) { bag = {background:0,text:0,border:0,unsafe:0}; usages.set(name, bag); }
    bag[type] = (bag[type] || 0) + weight;
  }

  function noteVariableUnsafe(usages, name, weight = 1) {
    if (!name) return;
    let bag = usages.get(name);
    if (!bag) { bag = {background:0,text:0,border:0,unsafe:0}; usages.set(name, bag); }
    bag.unsafe = (bag.unsafe || 0) + weight;
  }

  function classifyVariable(name, usages) {
    const bag = usages?.get(name);
    if (bag) {
      const ranked = [["background",bag.background||0],["text",bag.text||0],["border",bag.border||0]].sort((a,b)=>b[1]-a[1]);
      if (ranked[0]?.[1] > 0 && (ranked[1]?.[1] || 0) === 0) return ranked[0][0];
      if (ranked[0]?.[1] >= Math.max(1.35, (ranked[1]?.[1] || 0) * 1.35)) return ranked[0][0];
    }
    const n = String(name || "").toLowerCase();
    if (/(?:text|foreground|(?:^|[-_])fg(?:$|[-_])|label|font|icon|link|content|on[-_]|ink|caption|heading|title)/i.test(n)) return "text";
    if (/(?:border|outline|divider|separator|stroke|ring|hairline)/i.test(n)) return "border";
    if (/(?:background|(?:^|[-_])bg(?:$|[-_])|surface|canvas|panel|card|sheet|menu|popover|dialog|modal|layer|fill|elevation|paper|page)/i.test(n)) return "background";
    return "";
  }

  // Rewriting a CSS custom property can affect *any* CSS property that consumes it. A token named
  // like a color is not enough: many frameworks reuse variables in filters, masks, geometry, or
  // component metrics. Only override a custom property when the full stylesheet usage graph proves
  // it is color-only and has one unambiguous paint role. Concrete declarations can still resolve
  // root variables and be recolored without touching the variable itself.
  function safeCustomVariableType(name, context) {
    const bag = context?.usage?.get(name);
    if (!bag || (bag.unsafe || 0) > 0) return "";
    const ranked = [["background",bag.background||0],["text",bag.text||0],["border",bag.border||0]].sort((a,b)=>b[1]-a[1]);
    if (!(ranked[0][1] > 0) || (ranked[1][1] || 0) > 0) return "";
    return ranked[0][0];
  }

  function declarationRecord(style, prop) {
    return state.declarations.get(style)?.get(prop) || null;
  }

  function rawDeclarationValue(style, prop) {
    try { return String(style.getPropertyValue(prop) || "").trim(); } catch { return ""; }
  }

  function rawDeclarationPriority(style, prop) {
    try { return String(style.getPropertyPriority(prop) || ""); } catch { return ""; }
  }

  function sourceDeclarationValue(style, prop) {
    const rec = declarationRecord(style, prop);
    if (!rec) return rawDeclarationValue(style, prop);
    const current = rawDeclarationValue(style, prop);
    const priority = rawDeclarationPriority(style, prop);
    if (!(current === rec.appliedValue && priority === rec.appliedPriority)) {
      // A framework updated this rule after our previous pass. Adopt that value immediately as
      // the new author source so this refresh maps the new CSS, not the stale pre-update color.
      rec.originalValue = current;
      rec.originalPriority = priority;
      rec.originalPresent = true;
      rec.appliedValue = "";
      rec.appliedPriority = "";
      rec.syntheticFrom = "";
    }
    return rec.originalValue;
  }

  function sourceDeclarationPriority(style, prop) {
    sourceDeclarationValue(style, prop);
    const rec = declarationRecord(style, prop);
    return rec ? rec.originalPriority : rawDeclarationPriority(style, prop);
  }

  function ensurePropertyRecord(style, prop) {
    let map = state.declarations.get(style);
    if (!map) { map = new Map(); state.declarations.set(style, map); }
    let rec = map.get(prop);
    const currentValue = rawDeclarationValue(style, prop);
    const currentPriority = rawDeclarationPriority(style, prop);
    if (!rec) {
      const rawNames = []; try { for (let i = 0; i < style.length; i++) rawNames.push(String(style[i] || "")); } catch {}
      rec = {originalValue:currentValue, originalPriority:currentPriority, originalPresent:rawNames.includes(prop), appliedValue:"", appliedPriority:"", syntheticFrom:""};
      map.set(prop, rec);
    } else if (!(currentValue === rec.appliedValue && currentPriority === rec.appliedPriority)) {
      // Site/framework changed this CSS declaration while Smart Dark was active. Treat the new
      // author value as the source of truth rather than repeatedly darkening our previous output.
      rec.originalValue = currentValue;
      rec.originalPriority = currentPriority;
      rec.originalPresent = true;
      rec.appliedValue = "";
      rec.appliedPriority = "";
      rec.syntheticFrom = "";
    }
    return rec;
  }

  function applyCssomValue(style, prop, mapped) {
    const rec = ensurePropertyRecord(style, prop);
    const source = rec.originalValue;
    if (!source) return false;
    if (!mapped || mapped === source) {
      if (rec.appliedValue && rawDeclarationValue(style, prop) === rec.appliedValue) {
        try { style.setProperty(prop, source, rec.originalPriority); } catch {}
      }
      rec.appliedValue = ""; rec.appliedPriority = "";
      return false;
    }
    try {
      style.setProperty(prop, mapped, rec.originalPriority);
      rec.appliedValue = rawDeclarationValue(style, prop);
      rec.appliedPriority = rawDeclarationPriority(style, prop);
      state.rewrites++;
      return true;
    } catch { return false; }
  }

  // Only mutate atomic paint properties in author CSS. Writing a CSS shorthand through CSSOM
  // (for example `background`) re-expands it and can reset sibling longhands such as
  // background-size/background-position/background-image. That is a visual/layout corruption,
  // even when the only intended change was a color. Composite declarations are therefore
  // decomposed into color-only longhands before any write occurs.
  const PROP_SPECS = Object.freeze([
    ["background-color","background"],
    ["color","text"],
    ["border-top-color","border"], ["border-right-color","border"], ["border-bottom-color","border"], ["border-left-color","border"],
    ["border-block-start-color","border"], ["border-block-end-color","border"], ["border-inline-start-color","border"], ["border-inline-end-color","border"],
    ["outline-color","border"], ["column-rule-color","border"],
    ["text-decoration-color","text"], ["text-emphasis-color","text"],
    ["caret-color","text"], ["accent-color","text"],
    ["fill","text"], ["stroke","border"], ["stop-color","text"], ["flood-color","text"], ["lighting-color","text"],
    ["-webkit-text-fill-color","text"], ["-webkit-text-stroke-color","border"], ["-webkit-tap-highlight-color","border"],
  ]);
  const COMPOSITE_PROP_SPECS = Object.freeze([
    ["background","background"],
    ["border","border"], ["border-top","border"], ["border-right","border"], ["border-bottom","border"], ["border-left","border"],
    ["border-block","border"], ["border-inline","border"], ["border-block-start","border"], ["border-block-end","border"], ["border-inline-start","border"], ["border-inline-end","border"],
    ["border-color","border"], ["border-block-color","border"], ["border-inline-color","border"],
    ["outline","border"], ["column-rule","border"], ["text-decoration","text"], ["-webkit-text-stroke","border"],
  ]);
  const DIRECT_PROP_TYPES = new Map(PROP_SPECS);
  const COMPOSITE_PROP_TYPES = new Map(COMPOSITE_PROP_SPECS);
  const COMPOSITE_ATOMS = new Map([
    ["background", [["background-color","background"],["background-image","background-image"]]],
    ["border", [["border-top-color","border"],["border-right-color","border"],["border-bottom-color","border"],["border-left-color","border"]]],
    ["border-top", [["border-top-color","border"]]],
    ["border-right", [["border-right-color","border"]]],
    ["border-bottom", [["border-bottom-color","border"]]],
    ["border-left", [["border-left-color","border"]]],
    ["border-block", [["border-block-start-color","border"],["border-block-end-color","border"]]],
    ["border-inline", [["border-inline-start-color","border"],["border-inline-end-color","border"]]],
    ["border-block-start", [["border-block-start-color","border"]]],
    ["border-block-end", [["border-block-end-color","border"]]],
    ["border-inline-start", [["border-inline-start-color","border"]]],
    ["border-inline-end", [["border-inline-end-color","border"]]],
    ["border-color", [["border-top-color","border"],["border-right-color","border"],["border-bottom-color","border"],["border-left-color","border"]]],
    ["border-block-color", [["border-block-start-color","border"],["border-block-end-color","border"]]],
    ["border-inline-color", [["border-inline-start-color","border"],["border-inline-end-color","border"]]],
    ["outline", [["outline-color","border"]]],
    ["column-rule", [["column-rule-color","border"]]],
    ["text-decoration", [["text-decoration-color","text"]]],
    ["-webkit-text-stroke", [["-webkit-text-stroke-color","border"]]],
  ]);
  const compositeScratchStyle = (() => { try { return document.createElement("span").style; } catch { return null; } })();

  function isSyntheticApplied(style, prop) {
    const rec = declarationRecord(style, prop);
    return !!(rec?.syntheticFrom && rec.appliedValue && rawDeclarationValue(style, prop) === rec.appliedValue && rawDeclarationPriority(style, prop) === rec.appliedPriority);
  }

  function authoredPropertyNames(style) {
    const names=[];
    try {
      for(let i=0;i<style.length;i++) {
        const prop=String(style[i]||"");
        if(prop && !isSyntheticApplied(style, prop)) names.push(prop);
      }
    } catch {}
    return names;
  }

  function expandedCompositeAtoms(prop, source, context) {
    const targets = COMPOSITE_ATOMS.get(prop);
    if (!targets?.length || !compositeScratchStyle) return [];
    const resolved = resolveSimpleVars(source, context.rootVars);
    if (!resolved) return [];
    try {
      compositeScratchStyle.cssText = "";
      compositeScratchStyle.setProperty(prop, resolved);
      if (!compositeScratchStyle.length) return [];
      const out = [];
      for (const [target, type] of targets) {
        const value = String(compositeScratchStyle.getPropertyValue(target) || "").trim();
        if (value) out.push({prop:target, type, value});
      }
      return out;
    } catch { return []; }
    finally { try { compositeScratchStyle.cssText = ""; } catch {} }
  }

  function mapAtomicPaintValue(prop, value, type, context) {
    if (type === "background-image") {
      const raw = String(value || "").trim();
      if (!raw || !/gradient\(/i.test(raw)) return "";
      let mapped = raw;
      try { mapped = core()?.modifyGradient ? core().modifyGradient(raw, state.theme) : raw; } catch {}
      mapped = transformTokensOutsideUrls(mapped, "background");
      return mapped !== raw ? mapped : "";
    }
    return transformDeclarationValue(value, type, context.rootVars);
  }

  function applySyntheticCssomValue(style, prop, sourceValue, mapped, priority, syntheticFrom) {
    let map = state.declarations.get(style);
    if (!map) { map = new Map(); state.declarations.set(style, map); }
    let rec = map.get(prop);
    const currentValue = rawDeclarationValue(style, prop);
    const currentPriority = rawDeclarationPriority(style, prop);
    if (!rec) {
      const rawNames=[]; try { for(let i=0;i<style.length;i++) rawNames.push(String(style[i]||"")); } catch {}
      rec = {originalValue:currentValue, originalPriority:currentPriority, originalPresent:rawNames.includes(prop), appliedValue:"", appliedPriority:"", syntheticFrom};
      map.set(prop, rec);
    } else if (rec.syntheticFrom && rec.appliedValue && !(currentValue === rec.appliedValue && currentPriority === rec.appliedPriority)) {
      // The page explicitly changed this longhand after our synthetic write. Promote the page's
      // value to author-owned state and stop treating it as a shorthand-derived property.
      rec.originalValue = currentValue;
      rec.originalPriority = currentPriority;
      rec.originalPresent = true;
      rec.appliedValue = "";
      rec.appliedPriority = "";
      rec.syntheticFrom = "";
      return false;
    }
    rec.syntheticFrom = syntheticFrom;
    if (!mapped || mapped === sourceValue) {
      if (rec.appliedValue && currentValue === rec.appliedValue && currentPriority === rec.appliedPriority) {
        try {
          if (rec.originalPresent) style.setProperty(prop, rec.originalValue, rec.originalPriority);
          else style.removeProperty(prop);
        } catch {}
      }
      rec.appliedValue = ""; rec.appliedPriority = "";
      return false;
    }
    try {
      style.setProperty(prop, mapped, priority || "");
      rec.appliedValue = rawDeclarationValue(style, prop);
      rec.appliedPriority = rawDeclarationPriority(style, prop);
      state.rewrites++;
      return true;
    } catch { return false; }
  }

  function cleanupSyntheticProperties(style, activeCompositeProps) {
    const map = state.declarations.get(style); if (!map) return;
    for (const [prop, rec] of map) {
      if (!rec.syntheticFrom || activeCompositeProps.has(rec.syntheticFrom)) continue;
      const currentValue=rawDeclarationValue(style,prop), currentPriority=rawDeclarationPriority(style,prop);
      if (rec.appliedValue && currentValue===rec.appliedValue && currentPriority===rec.appliedPriority) {
        try {
          if (rec.originalPresent) style.setProperty(prop, rec.originalValue, rec.originalPriority);
          else style.removeProperty(prop);
        } catch {}
      }
      rec.appliedValue=""; rec.appliedPriority=""; rec.syntheticFrom="";
    }
  }

  function semanticTypeForProperty(prop) {
    const p=String(prop||"").toLowerCase();
    if(DIRECT_PROP_TYPES.has(p)) return DIRECT_PROP_TYPES.get(p);
    if(COMPOSITE_PROP_TYPES.has(p)) return COMPOSITE_PROP_TYPES.get(p);
    if(p==="background-image"||p==="box-shadow") return "background";
    if(p==="text-shadow") return "text";
    if(p==="scrollbar-color") return "border";
    return "";
  }

  function collectVariableUsageFromStyle(style, usage, deps) {
    for (const prop of authoredPropertyNames(style)) {
      const value=sourceDeclarationValue(style,prop); if(!value)continue;
      const refs=varNames(value);
      if(prop.startsWith("--")){
        if(refs.length){let set=deps.get(prop);if(!set){set=new Set();deps.set(prop,set)}for(const ref of refs)set.add(ref)}
        continue;
      }
      if(!refs.length)continue;
      const type=semanticTypeForProperty(prop);
      if(type){
        const weight=DIRECT_PROP_TYPES.has(prop)?2:COMPOSITE_PROP_TYPES.has(prop)?1.6:1;
        for(const name of refs) noteVariableUsage(usage,name,type,weight);
      }else{
        // Any observed non-paint consumer makes the variable unsafe to override globally. This is
        // the key invariant that prevents dark mode from changing dimensions/positioning/masks.
        for(const name of refs) noteVariableUnsafe(usage,name,1);
      }
    }
  }

  function isRootishSelector(selector) {
    const s = String(selector || "");
    return /(^|,)\s*:root\b|(^|,)\s*html\b|(^|,)\s*body\b/i.test(s);
  }

  function collectRootVarsFromStyle(style, vars) {
    try {
      const names = [];
      for (let i = 0; i < style.length; i++) if (String(style[i]).startsWith("--")) names.push(style[i]);
      for (const name of names) vars.set(name, sourceDeclarationValue(style, name));
    } catch {}
  }

  function walkRules(rules, fn, budget) {
    if (!rules) return;
    for (let i = 0; i < rules.length && budget.count < MAX_RULES_PER_ROOT; i++) {
      const rule = rules[i];
      budget.count++;
      fn(rule);
      if (rule?.cssRules && rule.type !== CSSRule.KEYFRAMES_RULE) {
        try { walkRules(rule.cssRules, fn, budget); } catch {}
      }
      if (rule?.type === CSSRule.IMPORT_RULE && rule.styleSheet) {
        try { walkRules(rule.styleSheet.cssRules, fn, budget); } catch {}
      }
    }
  }

  function collectContext(sheets) {
    const usage = new Map();
    const deps = new Map();
    const rootVars = new Map();
    const budget = {count:0};
    for (const sheet of sheets) {
      let rules = null; try { rules = sheet.cssRules; } catch { continue; }
      walkRules(rules, rule => {
        if (rule?.type !== CSSRule.STYLE_RULE || !rule.style) return;
        collectVariableUsageFromStyle(rule.style, usage, deps);
        if (isRootishSelector(rule.selectorText)) collectRootVarsFromStyle(rule.style, rootVars);
      }, budget);
    }
    // Propagate semantic usage through variable aliases, e.g. background:var(--surface) and
    // --surface:var(--neutral-0). This catches design systems that keep palette and semantic tokens separate.
    for(let pass=0;pass<7;pass++){
      let changed=false;
      for(const [from,refs] of deps){
        const bag=usage.get(from); if(!bag)continue;
        for(const ref of refs){
          const before=usage.get(ref); const snapshot=before?`${before.background}|${before.text}|${before.border}|${before.unsafe||0}`:"";
          noteVariableUsage(usage,ref,"background",(bag.background||0)*.82);
          noteVariableUsage(usage,ref,"text",(bag.text||0)*.82);
          noteVariableUsage(usage,ref,"border",(bag.border||0)*.82);
          if((bag.unsafe||0)>0) noteVariableUnsafe(usage,ref,(bag.unsafe||0)*.82);
          const after=usage.get(ref), now=`${after.background}|${after.text}|${after.border}|${after.unsafe||0}`; if(now!==snapshot)changed=true;
        }
      }
      if(!changed)break;
    }
    return {usage, rootVars, deps};
  }

  function resolveSimpleVars(value, rootVars, depth = 0) {
    if (depth > 5) return String(value || "");
    return String(value || "").replace(/var\(\s*(--[\w-]+)\s*(?:,\s*([^()]+))?\)/g, (whole, name, fallback) => {
      const found = rootVars.get(name);
      if (found) return resolveSimpleVars(found, rootVars, depth + 1);
      return fallback ? resolveSimpleVars(fallback, rootVars, depth + 1) : whole;
    });
  }

  function transformDeclarationValue(value, type, rootVars) {
    const raw = resolveSimpleVars(value, rootVars);
    if (!raw || /^(?:inherit|initial|unset|revert|revert-layer|currentcolor|transparent)$/i.test(raw)) return "";
    const direct = transformColor(raw, type);
    if (direct) return direct;
    const tokenized = transformTokens(raw, type);
    return tokenized !== raw ? tokenized : "";
  }

  function transformTokensOutsideUrls(value, type) {
    return transformTokens(value, type);
  }

  function transformCompositeValue(value, type, rootVars) {
    const raw=resolveSimpleVars(value,rootVars);
    if(!raw||/^(?:inherit|initial|unset|revert|revert-layer|none)$/i.test(raw))return "";
    let mapped=raw;
    if(type==="background"&&/gradient\(/i.test(mapped)) mapped=transformGradient(mapped);
    mapped=transformTokensOutsideUrls(mapped,type);
    return mapped!==raw?mapped:"";
  }

  function srgbLuminance(rgb){
    if(!rgb)return .5; const lin=n=>{n/=255;return n<=.04045?n/12.92:Math.pow((n+.055)/1.055,2.4)};
    return .2126*lin(rgb[0])+.7152*lin(rgb[1])+.0722*lin(rgb[2]);
  }
  function inferredVariableType(name, resolved) {
    const direct=parseColor(resolved); if(!direct)return "";
    const lum=srgbLuminance(direct), chroma=Math.max(direct[0],direct[1],direct[2])-Math.min(direct[0],direct[1],direct[2]);
    const n=String(name||"").toLowerCase();
    const neutralName=/(?:white|black|gray|grey|neutral|slate|zinc|stone|ash|paper|canvas|surface|base|background|foreground|text|ink|muted|subtle|primary|secondary|tertiary)/i.test(n);
    // Only infer unbound variables when they are neutral or explicitly named like palette tokens.
    // This avoids turning brand/navy/accent colors into foreground just because they happen to be dark.
    if(chroma<=34||neutralName){
      if(lum>=.58)return "background";
      if(lum<=.22)return "text";
      if(chroma<=22)return "border";
    }
    return "";
  }

  function mappedCustomProperty(name, source, context) {
    const resolved = resolveSimpleVars(source, context.rootVars);
    const type = safeCustomVariableType(name, context);
    if (!type) return "";
    let mapped = transformColor(resolved, type);
    if (!mapped && /gradient\(/i.test(resolved)) mapped = transformGradient(resolved);
    if (!mapped) {
      const tokenized = transformTokensOutsideUrls(resolved, type);
      if (tokenized !== resolved) mapped = tokenized;
    }
    return mapped || "";
  }

  function rewriteStyleInPlace(style, context) {
    const authored=authoredPropertyNames(style);
    const explicit=new Set(authored);
    const activeCompositeProps=new Set();
    for(const prop of authored){
      const source=sourceDeclarationValue(style,prop); if(!source)continue;
      if(prop.startsWith("--")){
        const mapped=mappedCustomProperty(prop,source,context);
        if(mapped&&mapped!==source)applyCssomValue(style,prop,mapped);
        continue;
      }
      const directType=DIRECT_PROP_TYPES.get(prop);
      if(directType){
        const mapped=transformDeclarationValue(source,directType,context.rootVars);
        if(mapped&&mapped!==source)applyCssomValue(style,prop,mapped);
        continue;
      }
      const compositeType=COMPOSITE_PROP_TYPES.get(prop);
      if(compositeType){
        activeCompositeProps.add(prop);
        const priority=sourceDeclarationPriority(style,prop);
        for(const atom of expandedCompositeAtoms(prop,source,context)){
          if(explicit.has(atom.prop))continue;
          const mapped=mapAtomicPaintValue(atom.prop,atom.value,atom.type,context);
          if(mapped&&mapped!==atom.value)applySyntheticCssomValue(style,atom.prop,atom.value,mapped,priority,prop);
        }
        continue;
      }
      if(prop==="background-image"&&/gradient\(/i.test(source)){
        const mapped=mapAtomicPaintValue(prop,resolveSimpleVars(source,context.rootVars),"background-image",context);
        if(mapped&&mapped!==source)applyCssomValue(style,prop,mapped);
        continue;
      }
      if(prop==="box-shadow"||prop==="text-shadow"){
        if(source!=="none"){
          const mapped=transformShadow(resolveSimpleVars(source,context.rootVars),prop==="text-shadow"?"text":"background");
          if(mapped&&mapped!==source)applyCssomValue(style,prop,mapped);
        }
        continue;
      }
      if(prop==="scrollbar-color"&&source!=="auto"){
        const mapped=transformCompositeValue(source,"border",context.rootVars);
        if(mapped&&mapped!==source)applyCssomValue(style,prop,mapped);
      }
    }
    cleanupSyntheticProperties(style,activeCompositeProps);
  }

  function rewriteRuleListInPlace(rules, context, stats) {
    if (!rules || stats.rules >= MAX_RULES_PER_ROOT) return;
    for (let i = 0; i < rules.length && stats.rules < MAX_RULES_PER_ROOT; i++) {
      const rule = rules[i]; stats.rules++;
      if (!rule) continue;
      try {
        if (rule.type === CSSRule.FONT_FACE_RULE) continue;
        if (rule.type === CSSRule.STYLE_RULE && rule.style) rewriteStyleInPlace(rule.style, context);
        else if (rule.type === CSSRule.KEYFRAMES_RULE) {
          for (const frame of rule.cssRules || []) if (frame?.style) rewriteStyleInPlace(frame.style, context);
          continue;
        } else if (rule.style) rewriteStyleInPlace(rule.style, context);

        if (rule.cssRules?.length && rule.type !== CSSRule.KEYFRAMES_RULE) rewriteRuleListInPlace(rule.cssRules, context, stats);
        if (rule.type === CSSRule.IMPORT_RULE && rule.styleSheet) {
          try { rewriteRuleListInPlace(rule.styleSheet.cssRules, context, stats); } catch {}
        }
      } catch {}
    }
  }

  // Cross-origin fallback only. These rules are color-only overrides; local/readable sheets are
  // changed directly above and are never duplicated into this stylesheet.
  function transformStyleForOverride(style, context) {
    const out=[];
    for(const prop of authoredPropertyNames(style)){
      const value=rawDeclarationValue(style,prop); if(!value)continue;
      const priority=rawDeclarationPriority(style,prop)==="important"?"!important":"";
      if(prop.startsWith("--")){
        const mapped=mappedCustomProperty(prop,value,context); if(mapped&&mapped!==value)out.push(`${prop}:${mapped}${priority}`); continue;
      }
      const directType=DIRECT_PROP_TYPES.get(prop);
      if(directType){const mapped=transformDeclarationValue(value,directType,context.rootVars);if(mapped&&mapped!==value)out.push(`${prop}:${mapped}${priority}`);continue}
      const compositeType=COMPOSITE_PROP_TYPES.get(prop);
      if(compositeType){
        for(const atom of expandedCompositeAtoms(prop,value,context)){
          const mapped=mapAtomicPaintValue(atom.prop,atom.value,atom.type,context);
          if(mapped&&mapped!==atom.value)out.push(`${atom.prop}:${mapped}${priority}`);
        }
        continue;
      }
      if(prop==="background-image"&&/gradient\(/i.test(value)){const mapped=mapAtomicPaintValue(prop,resolveSimpleVars(value,context.rootVars),"background-image",context);if(mapped&&mapped!==value)out.push(`${prop}:${mapped}${priority}`);continue}
      if(prop==="box-shadow"||prop==="text-shadow"){if(value!=="none"){const mapped=transformShadow(resolveSimpleVars(value,context.rootVars),prop==="text-shadow"?"text":"background");if(mapped&&mapped!==value)out.push(`${prop}:${mapped}${priority}`)}continue}
      if(prop==="scrollbar-color"&&value!=="auto"){const mapped=transformCompositeValue(value,"border",context.rootVars);if(mapped&&mapped!==value)out.push(`${prop}:${mapped}${priority}`)}
    }
    return out.join(";");
  }

  function wrapperHeader(rule) {
    const css = String(rule?.cssText || "");
    const index = css.indexOf("{");
    return index > 0 ? css.slice(0, index).trim() : "";
  }

  function compileRemoteRuleList(rules, context, stats) {
    if (!rules || stats.rules >= MAX_RULES_PER_ROOT) return "";
    const out = [];
    for (let i = 0; i < rules.length && stats.rules < MAX_RULES_PER_ROOT; i++) {
      const rule = rules[i]; stats.rules++;
      if (!rule) continue;
      try {
        if (rule.type === CSSRule.STYLE_RULE) {
          const selector = String(rule.selectorText || "").trim();
          if (!selector || /__fontyar_|__persianyar_|data-persianyar-smart-dark/i.test(selector)) continue;
          const decl = transformStyleForOverride(rule.style, context);
          if (decl) out.push(`${selector}{${decl}}`);
          if (rule.cssRules?.length) {
            const nested = compileRemoteRuleList(rule.cssRules, context, stats);
            if (nested) out.push(`${selector}{${nested}}`);
          }
          continue;
        }
        if (rule.type === CSSRule.KEYFRAMES_RULE) {
          const frames = [];
          for (const frame of rule.cssRules || []) {
            const decl = transformStyleForOverride(frame.style, context);
            if (decl) frames.push(`${frame.keyText}{${decl}}`);
          }
          if (frames.length) out.push(`@keyframes ${rule.name}{${frames.join("")}}`);
          continue;
        }
        if (rule.type === CSSRule.FONT_FACE_RULE) continue;
        if (rule.cssRules?.length) {
          const inner = compileRemoteRuleList(rule.cssRules, context, stats);
          const header = wrapperHeader(rule);
          if (inner && header) out.push(`${header}{${inner}}`);
          continue;
        }
        if (rule.style) {
          const decl = transformStyleForOverride(rule.style, context);
          const header = wrapperHeader(rule);
          if (decl && header) out.push(`${header}{${decl}}`);
        }
      } catch {}
    }
    return out.join("");
  }

  function ownerIsPersianYar(sheet) {
    if (sheet && state.ownedSheets.has(sheet)) return true;
    const owner = sheet?.ownerNode;
    if (owner instanceof Element) {
      const id = String(owner.id || "");
      if (EXTENSION_STYLE_PREFIXES.some(prefix => id.startsWith(prefix))) return true;
      if (owner.hasAttribute("data-persianyar-smart-dark-cssom")) return true;
    }
    const href = String(sheet?.href || "");
    return href.startsWith("chrome-extension://") || href.startsWith("moz-extension://");
  }

  function sheetsForRoot(root) {
    const out = [];
    if (root === document) {
      for (const sheet of Array.from(document.styleSheets || [])) if (!ownerIsPersianYar(sheet)) out.push(sheet);
      for (const sheet of Array.from(document.adoptedStyleSheets || [])) if (!ownerIsPersianYar(sheet)) out.push(sheet);
      return [...new Set(out)];
    }
    try {
      for (const node of root.querySelectorAll?.("style,link[rel~='stylesheet']") || []) if (node.sheet && !ownerIsPersianYar(node.sheet)) out.push(node.sheet);
      for (const sheet of Array.from(root.adoptedStyleSheets || [])) if (!ownerIsPersianYar(sheet)) out.push(sheet);
    } catch {}
    return [...new Set(out)];
  }

  function accessibleSheets(sheets) {
    const out = [];
    for (const sheet of sheets) {
      try { void sheet.cssRules; out.push(sheet); } catch {}
    }
    return out;
  }

  function inaccessibleSheetHrefs(root, sheets) {
    if (root !== document) return [];
    const accessible = new Set(accessibleSheets(sheets).map(s => String(s.href || "")).filter(Boolean));
    const urls = [];
    for (const link of document.querySelectorAll?.("link[rel~='stylesheet'][href]") || []) {
      const href = String(link.href || "");
      if (!/^https?:/i.test(href) || accessible.has(href)) continue;
      let ok = false; try { void link.sheet?.cssRules; ok = true; } catch {}
      if (!ok) urls.push(href);
    }
    return [...new Set(urls)].slice(0, MAX_FETCHED_SHEETS);
  }

  function ensureRootRecord(root) {
    let rec = state.roots.get(root);
    if (rec) return rec;
    rec = {sheet:null, style:null, css:"", signature:"", pollSignature:""};
    state.roots.set(root, rec);
    return rec;
  }

  function installFallbackCss(root, css) {
    const rec = ensureRootRecord(root);
    if (rec.css === css) return;
    rec.css = css;
    if ("adoptedStyleSheets" in root && typeof CSSStyleSheet === "function") {
      try {
        if (!rec.sheet) { rec.sheet = new CSSStyleSheet(); state.ownedSheets.add(rec.sheet); }
        rec.sheet.replaceSync(css);
        const current = Array.from(root.adoptedStyleSheets || []).filter(s => s !== rec.sheet);
        root.adoptedStyleSheets = [...current, rec.sheet];
        rec.style?.remove?.(); rec.style = null;
        if(root===document){state.initialCompiled=true;cancelInitialCompile();retireWarmCacheStyle();scheduleWarmCacheWrite(css)}
        return;
      } catch {}
    }
    try {
      let style = rec.style;
      if (!style) {
        style = document.createElement("style");
        style.id = root === document ? ENGINE_ID : "";
        style.setAttribute("data-persianyar-smart-dark-cssom", "1");
        rec.style = style;
      }
      style.textContent = css;
      if (root === document) (document.head || document.documentElement).append(style);
      else root.append(style);
      if(root===document){state.initialCompiled=true;cancelInitialCompile();retireWarmCacheStyle();scheduleWarmCacheWrite(css)}
    } catch {}
  }

  function uninstallRoot(root, rec) {
    try {
      if (rec.sheet && "adoptedStyleSheets" in root) root.adoptedStyleSheets = Array.from(root.adoptedStyleSheets || []).filter(s => s !== rec.sheet);
    } catch {}
    try { rec.style?.remove?.(); } catch {}
    rec.sheet = null; rec.style = null; rec.css = "";
  }

  function shortHash(text) {
    const s = String(text || ""); let h = 2166136261;
    const step = Math.max(1, Math.floor(s.length / 96));
    for (let i = 0; i < s.length; i += step) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return `${s.length}:${h >>> 0}`;
  }

  function directHost() {
    try { return String(location.hostname || "").trim().toLowerCase(); } catch { return ""; }
  }

  function warmCacheStyle() {
    try { return document.getElementById(WARM_CACHE_STYLE_ID); } catch { return null; }
  }

  function themeHash() { return shortHash(state.themeSig || ""); }

  function warmCacheUsable() {
    const style=warmCacheStyle();
    if(!style || !style.textContent)return false;
    const hash=String(style.dataset?.themeHash || "");
    return !!hash && hash===themeHash();
  }

  function retireWarmCacheStyle() {
    try { warmCacheStyle()?.remove(); } catch {}
    try { document.documentElement?.removeAttribute(WARM_CACHE_ATTR); } catch {}
  }

  function cancelInitialCompile() {
    if(!state.initialCompileHandle)return;
    try {
      if(state.initialCompileKind==="idle" && typeof cancelIdleCallback==="function")cancelIdleCallback(state.initialCompileHandle);
      else clearTimeout(state.initialCompileHandle);
    } catch {}
    state.initialCompileHandle=0;state.initialCompileKind="";
  }

  function scheduleInitialCompile() {
    if(!state.enabled || state.initialCompiled || state.initialCompileHandle)return;
    const run=()=>{
      state.initialCompileHandle=0;state.initialCompileKind="";
      if(!state.enabled || state.initialCompiled)return;
      try { compileRoot(document); } catch {}
    };
    if(typeof requestIdleCallback==="function"){
      state.initialCompileKind="idle";
      state.initialCompileHandle=requestIdleCallback(run,{timeout:700});
    }else{
      state.initialCompileKind="timeout";
      state.initialCompileHandle=setTimeout(run,90);
    }
  }

  function scheduleWarmCacheWrite(css) {
    const host=directHost();
    if(!host || !chrome?.storage?.local || typeof css!=="string" || !css || css.length>MAX_WARM_CACHE_CSS)return;
    const hash=`${shortHash(css)}|${themeHash()}`;
    if(hash===state.lastCachedHash)return;
    state.lastCachedHash=hash;
    clearTimeout(state.cacheWriteTimer);
    state.cacheWriteTimer=setTimeout(async()=>{
      state.cacheWriteTimer=0;
      const key=`${WARM_CACHE_PREFIX}${host}`;
      const record={
        css,
        savedAt:Date.now(),
        size:css.length,
        themeHash:themeHash(),
        palette:{
          bg:safeThemeColor(state.theme?.darkSchemeBackgroundColor,"#181a1b"),
          fg:safeThemeColor(state.theme?.darkSchemeTextColor,"#e8e6e3"),
          accent:safeThemeColor(state.theme?.accentColor,"#8ab4f8")
        }
      };
      try{
        const data=await chrome.storage.local.get({[WARM_CACHE_INDEX]:[]});
        let index=Array.isArray(data?.[WARM_CACHE_INDEX])?data[WARM_CACHE_INDEX].filter(x=>x&&typeof x.key==="string"&&x.key!==key):[];
        index.unshift({key,savedAt:record.savedAt,size:record.size});
        let total=0,keep=[],remove=[];
        for(const item of index){
          const size=Math.max(0,Number(item.size)||0);
          if(keep.length<MAX_WARM_CACHE_ENTRIES && total+size<=MAX_WARM_CACHE_BYTES){keep.push(item);total+=size}else remove.push(item.key);
        }
        await chrome.storage.local.set({[key]:record,[WARM_CACHE_INDEX]:keep});
        if(remove.length)await chrome.storage.local.remove([...new Set(remove)]);
      }catch{}
    },850);
  }

  function sheetSignature(sheet) {
    try {
      const rules = sheet.cssRules, len = rules.length;
      if (!len) return `${sheet.disabled?1:0}|${String(sheet.media?.mediaText||"")}|0`;
      const idx = [...new Set([0,1,Math.floor(len/3),Math.floor(len/2),Math.floor(len*2/3),len-2,len-1].filter(i=>i>=0&&i<len))];
      const sampled = idx.map(i => shortHash(rules[i]?.cssText || "")).join(",");
      return `${sheet.disabled?1:0}|${String(sheet.media?.mediaText||"")}|${len}|${sampled}`;
    } catch { return `x|${String(sheet.href || "")}`; }
  }

  function rootSignature(root, sheets) {
    const bits = sheets.map(sheetSignature);
    if (root === document) {
      for (const link of document.querySelectorAll?.("link[rel~='stylesheet'][href]") || []) bits.push(`l:${link.href}:${link.disabled?1:0}:${link.media||""}`);
      for (const style of document.querySelectorAll?.("style") || []) {
        if (String(style.id||"").startsWith("__persianyar_") || String(style.id||"").startsWith("__fontyar_")) continue;
        const t = String(style.textContent || ""); bits.push(`s:${shortHash(t)}`);
      }
    }
    return bits.join("||");
  }

  function parseFetchedCss(url, text) {
    const key = `${url}|${text.length}|${text.slice(-120)}`;
    if (state.parsedFetched.has(key)) return state.parsedFetched.get(key);
    try {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(String(text || "").replace(/@charset\s+[^;]+;/gi, "").replace(/@import\s+[^;]+;/gi, ""));
      state.parsedFetched.set(key, sheet);
      return sheet;
    } catch { return null; }
  }

  function importUrls(text, baseUrl) {
    const out = [];
    String(text || "").replace(/@import\s+(?:url\(\s*)?["']?([^"')\s;]+)["']?\s*\)?[^;]*;/gi, (_m, href) => {
      try { const u = new URL(href, baseUrl); if (/^https?:$/i.test(u.protocol)) out.push(u.href); } catch {}
      return _m;
    });
    return [...new Set(out)];
  }

  async function fetchSheet(url, depth = 0) {
    if (!/^https?:/i.test(url) || depth > 2 || state.fetched.size >= MAX_FETCHED_SHEETS) return;
    if (state.fetched.has(url) || state.fetchInflight.has(url)) return state.fetchInflight.get(url);
    const task = (async () => {
      try {
        const res = await chrome.runtime.sendMessage({type:"fontyar:fetch-stylesheet", url, maxBytes:MAX_FETCHED_BYTES});
        if (!res?.ok || !res.text) return;
        const text = String(res.text).slice(0, MAX_FETCHED_BYTES);
        state.fetched.set(url, {url:res.url || url, text});
        const imports = importUrls(text, res.url || url).slice(0, 8);
        await Promise.all(imports.map(u => fetchSheet(u, depth + 1)));
      } catch {}
      finally { state.fetchInflight.delete(url); }
    })();
    state.fetchInflight.set(url, task);
    return task;
  }

  function fetchedSheets() {
    const out = [];
    for (const item of state.fetched.values()) {
      const sheet = parseFetchedCss(item.url, item.text);
      if (sheet) out.push(sheet);
    }
    return out;
  }

  function compileRoot(root) {
    if (!state.enabled || !core()) return;
    const allAuthorSheets = sheetsForRoot(root);
    const localSheets = accessibleSheets(allAuthorSheets);
    const fetched = root === document ? fetchedSheets() : [];
    const rec = ensureRootRecord(root);
    const beforeSig = rootSignature(root, allAuthorSheets);
    const fetchedSignature = root === document ? [...state.fetched.entries()].map(([u,v])=>`${u}:${shortHash(v.text)}`).join("|") : "";
    const compositeBefore = `${beforeSig}##${fetchedSignature}##${state.themeSig}`;
    if (rec.signature === compositeBefore && rec.css) return;

    // Layout-safe selector mirror: NEVER mutate an author's CSSStyleDeclaration. Even a seemingly
    // harmless CSSOM write can reserialize shorthands, disturb framework-owned declarations, or
    // alter shared custom properties. Instead mirror only paint longhands into one stylesheet,
    // preserving selectors, pseudo states, media/container/layer wrappers and original priority.
    // Because no geometry/font/position declaration is emitted, Smart Dark cannot change layout.
    const context = collectContext([...localSheets, ...fetched]);
    const parts = [root === document ? rootBaseline(state.theme) : shadowBaseline(state.theme)];
    const mirrorStats = {rules:0};
    for (const sheet of localSheets) {
      let rules = null; try { rules = sheet.cssRules; } catch { continue; }
      const css = compileRemoteRuleList(rules, context, mirrorStats);
      if (css) parts.push(css);
      if (mirrorStats.rules >= MAX_RULES_PER_ROOT) break;
    }
    for (const sheet of fetched) {
      if (mirrorStats.rules >= MAX_RULES_PER_ROOT) break;
      let rules = null; try { rules = sheet.cssRules; } catch { continue; }
      const css = compileRemoteRuleList(rules, context, mirrorStats);
      if (css) parts.push(css);
    }
    installFallbackCss(root, parts.join("\n"));

    const afterSig = rootSignature(root, allAuthorSheets);
    rec.signature = `${afterSig}##${fetchedSignature}##${state.themeSig}`;
    rec.pollSignature = afterSig;

    if (root === document) {
      const missing = inaccessibleSheetHrefs(root, allAuthorSheets).filter(u => !state.fetched.has(u));
      if (missing.length) {
        Promise.all(missing.map(u => fetchSheet(u))).then(() => { if (state.enabled) scheduleRefresh("remote-css", 0); });
      }
    }
  }

  function restoreAuthorCss() {
    // Restore only values that are still equal to our last applied value. If the site changed a
    // declaration while enabled, do not overwrite the site's newer value on disable.
    for (const [style, props] of state.declarations) {
      for (const [prop, rec] of props) {
        try {
          const currentValue = rawDeclarationValue(style, prop);
          const currentPriority = rawDeclarationPriority(style, prop);
          if (rec.appliedValue && currentValue === rec.appliedValue && currentPriority === rec.appliedPriority) {
            if (rec.originalPresent === false) style.removeProperty(prop);
            else if (rec.originalValue) style.setProperty(prop, rec.originalValue, rec.originalPriority);
            else style.removeProperty(prop);
          }
        } catch {}
      }
    }
    state.declarations.clear();
  }

  function refreshAll() {
    if (!state.enabled) return;
    if(!state.initialCompiled && warmCacheUsable()){scheduleInitialCompile();return}
    transformedColorCache.clear();
    compileRoot(document);
    for (const root of [...state.roots.keys()]) {
      if (root === document) continue;
      if (root?.host?.isConnected) compileRoot(root);
      else { const rec=state.roots.get(root); if(rec)uninstallRoot(root,rec); state.roots.delete(root); }
    }
  }

  function scheduleRefresh(reason = "stylesheet", delay = 45) {
    if (!state.enabled) return;
    state.lastReason = reason;
    if(!state.initialCompiled && warmCacheUsable()){scheduleInitialCompile();return}
    const seq = ++state.refreshSeq;
    clearTimeout(state.refreshTimer);
    state.refreshTimer = setTimeout(() => {
      state.refreshTimer = 0;
      if (!state.enabled || seq !== state.refreshSeq) return;
      refreshAll();
    }, Math.max(0, delay));
  }

  function startPoll() {
    clearInterval(state.pollTimer);
    state.pollTimer = setInterval(() => {
      if (!state.enabled || document.visibilityState === "hidden") return;
      let changed = false;
      for (const root of [document, ...state.roots.keys()]) {
        if (root !== document && !root?.host?.isConnected) continue;
        const sheets = sheetsForRoot(root);
        const sig = rootSignature(root, sheets);
        const rec = ensureRootRecord(root);
        if (sig !== rec.pollSignature) { rec.pollSignature = sig; changed = true; }
      }
      if (changed) scheduleRefresh("cssom-change", 15);
    }, 2200);
  }

  function enable(options = {}) {
    const nextTheme = ensureTheme(options.theme);
    if (!nextTheme || !core()) return false;
    const nextSig = JSON.stringify(nextTheme);
    const wasEnabled = state.enabled;
    const themeChanged = state.themeSig !== nextSig;
    state.theme = nextTheme;
    state.themeSig = nextSig;
    state.enabled = true;
    if (themeChanged) {
      transformedColorCache.clear(); colorCache.clear();
      for (const rec of state.roots.values()) rec.signature = "";
      state.initialCompiled=false;
    }
    const warm=warmCacheUsable();
    if(!warm && warmCacheStyle())retireWarmCacheStyle();
    if(warm && !state.initialCompiled)scheduleInitialCompile();
    else compileRoot(document);
    if (!wasEnabled) startPoll();
    return true;
  }

  function disable() {
    state.enabled = false;
    clearTimeout(state.refreshTimer); state.refreshTimer = 0;
    clearInterval(state.pollTimer); state.pollTimer = 0;
    cancelInitialCompile();clearTimeout(state.cacheWriteTimer);state.cacheWriteTimer=0;
    retireWarmCacheStyle();
    ++state.refreshSeq;
    restoreAuthorCss();
    for (const [root, rec] of state.roots) uninstallRoot(root, rec);
    state.roots.clear();
    state.fetched.clear(); state.fetchInflight.clear(); state.parsedFetched.clear();
    transformedColorCache.clear(); colorCache.clear();
    state.theme = null; state.themeSig = ""; state.ownedSheets = new WeakSet(); state.rewrites = 0;state.initialCompiled=false;state.lastCachedHash="";
  }

  function registerRoot(root) {
    if (!root || root === document) return;
    ensureRootRecord(root);
    if (state.enabled) { try { compileRoot(root); } catch {} }
  }

  function unregisterRoot(root) {
    const rec = state.roots.get(root);
    if (rec) uninstallRoot(root, rec);
    state.roots.delete(root);
  }

  function noteMutation(node) {
    if (!state.enabled || !(node instanceof Element)) return;
    const stylesheetNode = node.matches?.("style,link[rel~='stylesheet']") || node.querySelector?.("style,link[rel~='stylesheet']");
    if (stylesheetNode) scheduleRefresh("stylesheet-mutation", 20);
  }

  globalThis.__PERSIANYAR_SMART_DARK_CSS_ENGINE__ = Object.freeze({
    version: "39-cssom-contrast-layout-safe-warmcache",
    cssFirst: true,
    directCssom: false,
    enable,
    disable,
    refresh: () => scheduleRefresh("manual", 0),
    scheduleRefresh,
    registerRoot,
    unregisterRoot,
    noteMutation,
    isEnabled: () => state.enabled,
    stats: () => ({roots:state.roots.size, fetched:state.fetched.size, declarations:state.declarations.size, rewrites:state.rewrites, reason:state.lastReason}),
  });
})();
