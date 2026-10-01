try { importScripts("site-storage.js"); } catch (error) { console.warn("[PersianYar] site storage helper unavailable", error); }
try { importScripts("data/cursor-packs.js"); } catch (error) { console.warn("[PersianYar] cursor catalog unavailable", error); }

const FONT_CACHE_NAME = "fontyar-font-cache-v1";
const UI_FONT_CSS_CACHE_NAME = "fontyar-ui-font-css-v1";
const EMOJI_CACHE_NAME = "fontyar-emoji-cache-v1";
const CURSOR_CACHE_NAME = "persianyar-cursor-cdn-v6";
const CURSOR_STORAGE_KEY = "persianyarCursorCacheV6";
const EMOJI_STATUS_KEY = "fontyarEmojiPackStatusV1";

// Keep downloadable emoji faces character-scoped. This is especially important in native
// input/textarea controls where we prepend the selected emoji family to the site's existing font
// stack: ordinary Persian/Arabic/Latin text must continue to use the site's own font and metrics.
// ASCII #, * and 0-9 are intentionally excluded even though Unicode marks them as Emoji bases;
// hijacking normal digits would violate the layout-neutral input contract.
const EMOJI_UNICODE_RANGE = "U+00A9,U+00AE,U+200D,U+203C,U+2049,U+20E3,U+2122,U+2139,U+2194-2199,U+21A9-21AA,U+231A-231B,U+2328,U+23CF,U+23E9-23F3,U+23F8-23FA,U+24C2,U+25AA-25AB,U+25B6,U+25C0,U+25FB-25FE,U+2600-2604,U+260E,U+2611,U+2614-2615,U+2618,U+261D,U+2620,U+2622-2623,U+2626,U+262A,U+262E-262F,U+2638-263A,U+2640,U+2642,U+2648-2653,U+265F-2660,U+2663,U+2665-2666,U+2668,U+267B,U+267E-267F,U+2692-2697,U+2699,U+269B-269C,U+26A0-26A1,U+26A7,U+26AA-26AB,U+26B0-26B1,U+26BD-26BE,U+26C4-26C5,U+26C8,U+26CE-26CF,U+26D1,U+26D3-26D4,U+26E9-26EA,U+26F0-26F5,U+26F7-26FA,U+26FD,U+2702,U+2705,U+2708-270D,U+270F,U+2712,U+2714,U+2716,U+271D,U+2721,U+2728,U+2733-2734,U+2744,U+2747,U+274C,U+274E,U+2753-2755,U+2757,U+2763-2764,U+2795-2797,U+27A1,U+27B0,U+27BF,U+2934-2935,U+2B05-2B07,U+2B1B-2B1C,U+2B50,U+2B55,U+3030,U+303D,U+3297,U+3299,U+FE0F,U+1F004,U+1F02C-1F02F,U+1F094-1F09F,U+1F0AF-1F0B0,U+1F0C0,U+1F0CF-1F0D0,U+1F0F6-1F0FF,U+1F170-1F171,U+1F17E-1F17F,U+1F18E,U+1F191-1F19A,U+1F1AE-1F1FF,U+1F201-1F20F,U+1F21A,U+1F22F,U+1F232-1F23A,U+1F23C-1F23F,U+1F249-1F25F,U+1F266-1F321,U+1F324-1F393,U+1F396-1F397,U+1F399-1F39B,U+1F39E-1F3F0,U+1F3F3-1F3F5,U+1F3F7-1F4FD,U+1F4FF-1F53D,U+1F549-1F54E,U+1F550-1F567,U+1F56F-1F570,U+1F573-1F57A,U+1F587,U+1F58A-1F58D,U+1F590,U+1F595-1F596,U+1F5A4-1F5A5,U+1F5A8,U+1F5B1-1F5B2,U+1F5BC,U+1F5C2-1F5C4,U+1F5D1-1F5D3,U+1F5DC-1F5DE,U+1F5E1,U+1F5E3,U+1F5E8,U+1F5EF,U+1F5F3,U+1F5FA-1F64F,U+1F680-1F6C5,U+1F6CB-1F6D2,U+1F6D5-1F6E5,U+1F6E9,U+1F6EB-1F6F0,U+1F6F3-1F6FF,U+1F7DA-1F7FF,U+1F80C-1F80F,U+1F848-1F84F,U+1F85A-1F85F,U+1F888-1F88F,U+1F8AE-1F8AF,U+1F8BC-1F8BF,U+1F8C2-1F8CF,U+1F8D9-1F8FF,U+1F90C-1F93A,U+1F93C-1F945,U+1F947-1F9FF,U+1FA58-1FA5F,U+1FA6E-1FAFF,U+1FC00-1FFFD";

const SCRIPT_RANGES = Object.freeze({
  fa: "U+0600-06FF,U+0750-077F,U+08A0-08FF,U+FB50-FDFF,U+FE70-FEFF,U+200C-200F",
  ar: "U+0600-06FF,U+0750-077F,U+08A0-08FF,U+FB50-FDFF,U+FE70-FEFF,U+200C-200F",
  en: "U+0000-024F,U+1E00-1EFF",
  zh: "U+2E80-2EFF,U+3000-303F,U+31C0-31EF,U+3400-4DBF,U+4E00-9FFF,U+F900-FAFF,U+FF00-FFEF"
});

const FONTS = Object.freeze({
  // Persian / Arabic-script optimized
  Vazirmatn: { family: "Vazirmatn", lang: "fa", cssUrl: "https://v1.fontapi.ir/css/Vazirmatn" },
  Estedad: { family: "Estedad", lang: "fa", cssUrl: "https://v1.fontapi.ir/css/Estedad" },
  Mikhak: { family: "Mikhak", lang: "fa", cssUrl: "https://v1.fontapi.ir/css/Mikhak" },
  Shabnam: { family: "Shabnam", lang: "fa", cssUrl: "https://v1.fontapi.ir/css/Shabnam" },
  Sahel: { family: "Sahel", lang: "fa", cssUrl: "https://v1.fontapi.ir/css/Sahel" },
  Samim: { family: "Samim", lang: "fa", cssUrl: "https://v1.fontapi.ir/css/Samim" },
  Parastoo: { family: "Parastoo", lang: "fa", cssUrl: "https://v1.fontapi.ir/css/Parastoo" },
  Tanha: { family: "Tanha", lang: "fa", cssUrl: "https://v1.fontapi.ir/css/Tanha" },
  Gandom: { family: "Gandom", lang: "fa", cssUrl: "https://v1.fontapi.ir/css/Gandom" },
  Nahid: { family: "Nahid", lang: "fa", cssUrl: "https://v1.fontapi.ir/css/Nahid" },
  Lalezar: { family: "Lalezar", lang: "fa", cssUrl: "https://v1.fontapi.ir/css/Lalezar" },
  Vazir: { family: "Vazir", lang: "fa", cssUrl: "https://v1.fontapi.ir/css/Vazir" },
  IranNastaliq: { family: "Iran Nastaliq", lang: "fa", cssUrl: "https://v1.fontapi.ir/css/IranNastaliq" },

  // English / Latin
  Inter: { family: "Inter", lang: "en", cssUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" },
  Roboto: { family: "Roboto", lang: "en", cssUrl: "https://fonts.googleapis.com/css2?family=Roboto:wght@100..900&display=swap" },
  OpenSans: { family: "Open Sans", lang: "en", cssUrl: "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300..800&display=swap" },
  Montserrat: { family: "Montserrat", lang: "en", cssUrl: "https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap" },
  Poppins: { family: "Poppins", lang: "en", cssUrl: "https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" },
  Lato: { family: "Lato", lang: "en", cssUrl: "https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap" },
  SourceSans3: { family: "Source Sans 3", lang: "en", cssUrl: "https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@200..900&display=swap" },
  Merriweather: { family: "Merriweather", lang: "en", cssUrl: "https://fonts.googleapis.com/css2?family=Merriweather:opsz,wght@18..144,300..900&display=swap" },
  PlayfairDisplay: { family: "Playfair Display", lang: "en", cssUrl: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400..900&display=swap" },
  SegoeUI: { family: "Segoe UI", lang: "en", kind: "system", localFamily: "Segoe UI" },
  Arial: { family: "Arial", lang: "en", kind: "system", localFamily: "Arial" },
  Georgia: { family: "Georgia", lang: "en", kind: "system", localFamily: "Georgia" },

  // Arabic
  NotoSansArabic: { family: "Noto Sans Arabic", lang: "ar", cssUrl: "https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@100..900&display=swap" },
  NotoNaskhArabic: { family: "Noto Naskh Arabic", lang: "ar", cssUrl: "https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400..700&display=swap" },
  NotoKufiArabic: { family: "Noto Kufi Arabic", lang: "ar", cssUrl: "https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@100..900&display=swap" },
  Cairo: { family: "Cairo", lang: "ar", cssUrl: "https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&display=swap" },
  Tajawal: { family: "Tajawal", lang: "ar", cssUrl: "https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap" },
  Almarai: { family: "Almarai", lang: "ar", cssUrl: "https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap" },
  Changa: { family: "Changa", lang: "ar", cssUrl: "https://fonts.googleapis.com/css2?family=Changa:wght@200..800&display=swap" },
  IBMArabic: { family: "IBM Plex Sans Arabic", lang: "ar", cssUrl: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@100;200;300;400;500;600;700&display=swap" },
  TahomaArabic: { family: "Tahoma", lang: "ar", kind: "system", localFamily: "Tahoma" },

  // Simplified Chinese
  NotoSansSC: { family: "Noto Sans SC", lang: "zh", cssUrl: "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100..900&display=swap" },
  NotoSerifSC: { family: "Noto Serif SC", lang: "zh", cssUrl: "https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@200..900&display=swap" },
  LXGWWenKai: { family: "LXGW WenKai", lang: "zh", cssUrl: "https://fonts.googleapis.com/css2?family=LXGW+WenKai:wght@300;400;700&display=swap" },
  MaShanZheng: { family: "Ma Shan Zheng", lang: "zh", cssUrl: "https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap" },
  ZCOOLXiaoWei: { family: "ZCOOL XiaoWei", lang: "zh", cssUrl: "https://fonts.googleapis.com/css2?family=ZCOOL+XiaoWei&display=swap" },
  MicrosoftYaHei: { family: "Microsoft YaHei", lang: "zh", kind: "system", localFamily: "Microsoft YaHei" },
  DengXian: { family: "DengXian", lang: "zh", kind: "system", localFamily: "DengXian" },
  PingFangSC: { family: "PingFang SC", lang: "zh", kind: "system", localFamily: "PingFang SC" }
});

const EMOJI_STYLES = Object.freeze({
  system: { label: "System Default", family: "System Emoji", version: "system-v1", note: "سیستم", kind: "system-stack", platform: "System", stack: ["Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji"] },
  android: { label: "Android / Google", family: "Noto Color Emoji", version: "0.2.0", note: "گوگل / اندروید", kind: "download", platform: "Android", cssUrl: "https://unpkg.com/@infolektuell/noto-color-emoji@0.2.0/index.css" },
  windows: { label: "Windows 11", family: "Segoe UI Emoji", version: "hybrid-v1", note: "Segoe UI روی ویندوز، Fluent fallback", kind: "hybrid", platform: "Windows", fallbackKey: "fluentColor", stack: ["Segoe UI Emoji", "Fluent Emoji Color", "Noto Color Emoji"] },
  apple: { label: "iOS / Apple", family: "Apple Color Emoji", version: "hybrid-v1", note: "Apple native روی macOS/iOS، Fluent fallback روی بقیه", kind: "hybrid", platform: "Apple", fallbackKey: "fluentColor", stack: ["Apple Color Emoji", "Fluent Emoji Color", "Noto Color Emoji"] },
  twemoji: { label: "Twemoji", family: "Jdecked Twemoji", version: "17.0.3", note: "X / Twitter style", kind: "download", platform: "Open", cssUrl: "https://unpkg.com/@exis9/jdecked-twemoji@17.0.3/twemoji.min.css" },
  twemojiVector: { label: "Twemoji Vector", family: "FontYar Twemoji Vector", version: "latest", note: "COLRv0 سبک و شارپ", kind: "download", platform: "Open", directFontUrl: "https://github.com/iebb/emojifonts/releases/download/latest/twemoji-colrv0.ttf" },
  fluentColor: { label: "Fluent 3D", family: "Fluent Emoji Color", version: "0.8.5", note: "مایکروسافت Fluent سه بعدی", kind: "download", platform: "Microsoft", cssUrl: "https://tetunori.github.io/fluent-emoji-webfont/dist/FluentEmojiColor.css" },
  fluentFlat: { label: "Fluent Flat", family: "Fluent Emoji Flat", version: "0.8.5", note: "مایکروسافت Fluent فلت", kind: "download", platform: "Microsoft", cssUrl: "https://tetunori.github.io/fluent-emoji-webfont/dist/FluentEmojiFlat.css" },
  fluentHC: { label: "Fluent Mono", family: "FontYar Fluent Mono", version: "latest", note: "Fluent تک رنگ", kind: "download", platform: "Microsoft", directFontUrl: "https://github.com/iebb/emojifonts/releases/download/latest/fluent-mono.ttf" },
  openmojiColor: { label: "OpenMoji Color", family: "OpenMoji", version: "17.0.0", note: "خطی رنگی", kind: "download", platform: "Open", directFontUrl: "https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji/font/OpenMoji-color-glyf_colr_0/OpenMoji-color-glyf_colr_0.woff2" },
  openmojiBlack: { label: "OpenMoji Black", family: "OpenMoji Black", version: "17.0.0", note: "خطی تک رنگ", kind: "download", platform: "Open", directFontUrl: "https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji/font/OpenMoji-black-glyf/OpenMoji-black-glyf.woff2" },
  notoMono: { label: "Noto Emoji Mono", family: "Noto Emoji", version: "gf-v1", note: "Noto تک رنگ", kind: "download", platform: "Google", cssUrl: "https://fonts.googleapis.com/css2?family=Noto+Emoji:wght@300..700&display=swap" },
  blobmoji: { label: "Android Blob", family: "Blobmoji", version: "blobmoji-2025", note: "Blob کلاسیک اندروید", kind: "download", platform: "Android Classic", directFontUrl: "https://cdn.jsdelivr.net/gh/C1710/blobmoji@main/fonts/Blobmoji.ttf" },
  emojitwo: { label: "EmojiTwo", family: "FontYar EmojiTwo", version: "latest", note: "استایل کلاسیک متن باز", kind: "download", platform: "Open", directFontUrl: "https://github.com/iebb/emojifonts/releases/download/latest/emojitwo.ttf" },
  tossface: { label: "Toss Face", family: "FontYar Toss Face", version: "latest", note: "استایل کره ای Toss", kind: "download", platform: "Toss", directFontUrl: "https://github.com/iebb/emojifonts/releases/download/latest/tossface.ttf" },
  notoColor: { label: "Noto Color Bitmap", family: "PersianYar Noto Color", version: "latest", note: "Noto رنگی، سازگار با Chrome", kind: "download", platform: "Google", directFontUrl: "https://github.com/iebb/emojifonts/releases/download/latest/noto.ttf" },
  twemojiBitmap: { label: "Twemoji Bitmap", family: "PersianYar Twemoji Bitmap", version: "latest", note: "Twemoji رنگی bitmap", kind: "download", platform: "Open", directFontUrl: "https://github.com/iebb/emojifonts/releases/download/latest/twemoji.ttf" },
  openmojiVector: { label: "OpenMoji Vector", family: "PersianYar OpenMoji Vector", version: "latest", note: "COLRv0 شارپ", kind: "download", platform: "Open", directFontUrl: "https://github.com/iebb/emojifonts/releases/download/latest/openmoji-colrv0.ttf" },
  openmojiBitmap: { label: "OpenMoji Bitmap", family: "PersianYar OpenMoji Bitmap", version: "latest", note: "OpenMoji رنگی bitmap", kind: "download", platform: "Open", directFontUrl: "https://github.com/iebb/emojifonts/releases/download/latest/openmoji.ttf" },
  emojiTwoVector: { label: "EmojiTwo Vector", family: "PersianYar EmojiTwo Vector", version: "latest", note: "COLRv0 متن باز", kind: "download", platform: "Open", directFontUrl: "https://github.com/iebb/emojifonts/releases/download/latest/emojitwo-colrv0.ttf" }
});

const EMOJI_ALIASES = Object.freeze({ fluent3d: "fluentColor", openmoji: "openmojiColor", noto: "android" });
const ALLOWED_FONT_HOSTS = new Set(["v1.fontapi.ir", "fdn.fontcdn.ir", "fonts.googleapis.com", "fonts.gstatic.com"]);
const ALLOWED_EMOJI_HOSTS = new Set(["unpkg.com", "tetunori.github.io", "cdn.jsdelivr.net", "fonts.googleapis.com", "fonts.gstatic.com", "github.com", "objects.githubusercontent.com", "release-assets.githubusercontent.com"]);
const ALLOWED_CURSOR_HOSTS = new Set(["cdn.jsdelivr.net", "raw.githubusercontent.com"]);
const injectedFonts = new Set();
const injectedEmoji = new Set();
const inlineFontCssCache = new Map();
const uiFontCssCache = new Map();
const inlineEmojiCssCache = new Map();
const binaryFontFaceCache = new Map();
const binaryEmojiFaceCache = new Map();
const injectedUserCss = new Map();
const injectedUserCssRevision = new Map();
const userCssApplyChains = new Map();
let cursorCacheWriteQueue = Promise.resolve();

// Register the heavy page runtime only on sites that actually have an active PersianYar
// configuration. This avoids loading localization/cursor catalogs on every web page.
const DYNAMIC_SITE_SCRIPT_ID = "persianyar-active-sites-v1";
const DYNAMIC_SMART_DARK_PREPAINT_ID = "persianyar-smart-dark-prepaint-v1";
const PAGE_RUNTIME_FILES = Object.freeze(["site-storage.js", "vendor/darkreader-dynamic-core.js", "vendor/smart-dark-css-engine.js", "content.js"]);
const LOCALIZATION_RUNTIME_FILES = Object.freeze([
  "data/localization-fa.js",
  "data/localization-fa-extra.js",
  "data/localization-fa-ultra.js",
  "data/localization-fa-mega.js",
  "data/localization-fa-dynamic.js",
  "data/localization-fa-x-complete.js",
  "data/localization-fa-sites-2026.js",
  "data/localization-fa-sites-wave2.js",
  "data/localization-fa-patch-2026-09.js",
  "data/localization-fa-quality-2026-09.js",
  "data/localization-fa-x-2026-09-19.js",
  "data/localization-fa-search-console-2026-09.js",
  "data/localization-fa-platforms-2026-09-20.js",
  "data/localization-fa-google-suite-2026-09-20.js",
  "data/localization-fa-ai-suite-2026-09-20.js",
  "data/localization-fa-ai-extended-v30.js",
  "data/localization-fa-ai-extended-v31.js",
  "data/localization-fa-pro-suite-v32.js",
  "data/localization-fa-pro-suite-v33.js"
]);
const CURSOR_RUNTIME_FILES = Object.freeze(["data/cursor-packs.js"]);
let siteScriptSyncQueued = false;
let siteScriptSyncChain = Promise.resolve();
let emojiWarmQueued = false;
let emojiWarmChain = Promise.resolve();

function siteConfigNeedsRuntime(config) {
  if (!config || config.paused) return false;
  return !!(
    config.enabled || config.emojiEnabled || Number(config.fontDelta || 0) !== 0 || Number(config.digitFontDelta || 0) !== 0 ||
    config.digitMode && config.digitMode !== "preserve" || config.zwnjMode && config.zwnjMode !== "preserve" ||
    config.bidiRepair || config.rtlBeta || config.layoutEnhance || config.localizeEnabled || config.cursorEnabled ||
    config.softMotionEnabled || config.softCorners || config.uniformCornersEnabled || config.removeShadows ||
    config.smoothScrollEnabled || config.smartDarkMode || config.liquidGlassMode || config.linearStyleMode ||
    config.adaptiveMenusMode || config.focusEnhanceMode || config.polishedInputsMode
  );
}

function siteMatchPattern(host, includeSubdomains) {
  const value = String(host || "").trim().toLowerCase();
  const ipv6 = /^\[[0-9a-f:.]+\]$/i.test(value);
  if (!value || /[\s\/*?#]/.test(value)) return "";
  if (!ipv6 && !/^[a-z0-9._-]+$/i.test(value)) return "";
  // Wildcard subdomain patterns are useful for DNS hostnames, but avoid them for localhost/IP literals.
  const ipv4 = /^(?:\d{1,3}\.){3}\d{1,3}$/.test(value);
  const wildcardable = value.includes(".") && !ipv4 && !ipv6 && value !== "localhost";
  return includeSubdomains && wildcardable ? `*://*.${value}/*` : `*://${value}/*`;
}

function activeSiteMatchPatterns(sites) {
  const patterns = new Set();
  for (const [host, config] of Object.entries(sites || {})) {
    if (!siteConfigNeedsRuntime(config)) continue;
    const pattern = siteMatchPattern(host, !!config.includeSubdomains);
    if (pattern) patterns.add(pattern);
  }
  return [...patterns].sort();
}

function activeSmartDarkMatchPatterns(sites) {
  const patterns = new Set();
  for (const [host, config] of Object.entries(sites || {})) {
    if (!config?.smartDarkMode || config?.paused) continue;
    const pattern = siteMatchPattern(host, !!config.includeSubdomains);
    if (pattern) patterns.add(pattern);
  }
  return [...patterns].sort();
}

async function upsertDynamicContentScript(registration) {
  const existing = await chrome.scripting.getRegisteredContentScripts({ ids: [registration.id] }).catch(() => []);
  const apply = async payload => {
    if (existing.length) await chrome.scripting.updateContentScripts([payload]);
    else await chrome.scripting.registerContentScripts([payload]);
  };
  try { await apply(registration); }
  catch (error) {
    const fallback={...registration};delete fallback.matchOriginAsFallback;
    await apply(fallback);
    console.debug?.("[PersianYar] dynamic registration fallback", registration.id, String(error?.message||error));
  }
}

async function syncRegisteredSiteScripts() {
  const store = globalThis.__PERSIANYAR_SITE_STORE__;
  if (!store) return;
  await store.migrateLegacy().catch(() => null);
  const sites = await store.getAll();
  const matches = activeSiteMatchPatterns(sites);
  const smartDarkMatches = activeSmartDarkMatchPatterns(sites);

  if (!matches.length) {
    const existing = await chrome.scripting.getRegisteredContentScripts({ ids: [DYNAMIC_SITE_SCRIPT_ID] }).catch(() => []);
    if (existing.length) await chrome.scripting.unregisterContentScripts({ ids: [DYNAMIC_SITE_SCRIPT_ID] }).catch(() => {});
  } else {
    await upsertDynamicContentScript({id:DYNAMIC_SITE_SCRIPT_ID,matches,js:[...PAGE_RUNTIME_FILES],allFrames:false,runAt:"document_start",persistAcrossSessions:true,matchAboutBlank:true,matchOriginAsFallback:true});
  }

  if (!smartDarkMatches.length) {
    const existing = await chrome.scripting.getRegisteredContentScripts({ ids: [DYNAMIC_SMART_DARK_PREPAINT_ID] }).catch(() => []);
    if (existing.length) await chrome.scripting.unregisterContentScripts({ ids: [DYNAMIC_SMART_DARK_PREPAINT_ID] }).catch(() => {});
  } else {
    await upsertDynamicContentScript({id:DYNAMIC_SMART_DARK_PREPAINT_ID,matches:smartDarkMatches,css:["smart-dark-prepaint.css"],js:["smart-dark-prepaint.js"],allFrames:true,runAt:"document_start",persistAcrossSessions:true,matchAboutBlank:true,matchOriginAsFallback:true});
  }
}

function scheduleSiteScriptSync() {
  if (siteScriptSyncQueued) return;
  siteScriptSyncQueued = true;
  // MV3 service workers are ephemeral. Queue the API work in the current event turn instead of
  // relying on setTimeout(), which can disappear if Chrome suspends the worker.
  queueMicrotask(() => {
    siteScriptSyncQueued = false;
    siteScriptSyncChain = siteScriptSyncChain.then(syncRegisteredSiteScripts, syncRegisteredSiteScripts).catch((error) => {
      console.warn("[PersianYar] site runtime registration failed", error);
    });
  });
}

async function cacheEmojiPackAssets(styleKeyValue) {
  const styleKey = normalizeEmojiStyleKey(styleKeyValue);
  if (!styleKey) return;
  const style = EMOJI_STYLES[styleKey];
  const effectiveKey = style.kind === "hybrid" ? style.fallbackKey : styleKey;
  const effective = EMOJI_STYLES[effectiveKey];
  if (effective?.kind !== "download") return;
  if (effective.directFontUrl) {
    const remoteUrl = new URL(effective.directFontUrl);
    validateEmojiUrl(remoteUrl);
    await cachedFetch(remoteUrl.href, EMOJI_CACHE_NAME);
    await markEmojiPackCached(effectiveKey);
    return;
  }
  const cssUrl = new URL(effective.cssUrl);
  validateEmojiUrl(cssUrl);
  const cssResponse = await cachedFetch(cssUrl.href, EMOJI_CACHE_NAME);
  const sourceCss = await cssResponse.text();
  const blocks = sourceCss.match(/@font-face\s*\{[\s\S]*?\}/gi) || [];
  const urls = [];
  const seen = new Set();
  for (const block of blocks) {
    const src = readDeclaration(block, "src");
    const urlMatch = src.match(/url\(\s*(['\"]?)(.*?)\1\s*\)/i);
    if (!urlMatch?.[2]) continue;
    const remoteUrl = new URL(urlMatch[2], cssUrl.href);
    if (remoteUrl.protocol !== "https:") continue;
    validateEmojiUrl(remoteUrl);
    if (seen.has(remoteUrl.href)) continue;
    seen.add(remoteUrl.href); urls.push(remoteUrl.href);
  }
  await mapLimit(urls, 3, async (url) => { await cachedFetch(url, EMOJI_CACHE_NAME); });
  await markEmojiPackCached(effectiveKey);
}

async function warmSavedEmojiPacks() {
  const store = globalThis.__PERSIANYAR_SITE_STORE__;
  if (!store?.getAll) return;
  const sites = await store.getAll().catch(() => ({}));
  const unique = [];
  const seen = new Set();
  for (const config of Object.values(sites || {})) {
    if (!config?.emojiEnabled) continue;
    const key = normalizeEmojiStyleKey(config.emojiStyle || "system");
    if (!key || seen.has(key)) continue;
    seen.add(key); unique.push(key);
    if (unique.length >= 4) break;
  }
  await mapLimit(unique, 2, cacheEmojiPackAssets);
}

function scheduleSavedEmojiWarmup() {
  if (emojiWarmQueued) return;
  emojiWarmQueued = true;
  queueMicrotask(() => {
    emojiWarmQueued = false;
    emojiWarmChain = emojiWarmChain.then(warmSavedEmojiPacks, warmSavedEmojiPacks).catch((error) => {
      console.warn("[PersianYar] emoji cache warmup failed", error);
    });
  });
}

async function primeOpenTabsWithBootstrap() {
  // Static content scripts start automatically on new documents, but an extension update/reload
  // does not retroactively inject them into pages that were already open. Seed those top frames
  // once so saved settings take effect immediately without requiring the popup.
  const tabs = await chrome.tabs.query({});
  await Promise.allSettled(tabs.map((tab) => {
    if (!Number.isInteger(tab?.id)) return Promise.resolve();
    return chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["site-storage.js", "bootstrap.js"],
      injectImmediately: true
    });
  }));
}

chrome.runtime.onInstalled.addListener(() => {
  cleanupOldCaches().catch(() => {});
  scheduleSiteScriptSync();
  scheduleSavedEmojiWarmup();
  primeOpenTabsWithBootstrap().catch(() => {});
});
chrome.runtime.onStartup.addListener(() => {
  scheduleSiteScriptSync();
  scheduleSavedEmojiWarmup();
  primeOpenTabsWithBootstrap().catch(() => {});
});
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (globalThis.__PERSIANYAR_SITE_STORE__?.isRelevantChange(changes, areaName)) {
    scheduleSiteScriptSync();
    scheduleSavedEmojiWarmup();
  }
});
// Also run when this service worker is first loaded after an update, so existing saved site
// settings immediately receive their dynamic registration and selected emoji packs are hot before
// a custom reaction/context menu needs them.
scheduleSiteScriptSync();
scheduleSavedEmojiWarmup();

async function pageRuntimeAlreadyLoaded(tabId, frameId) {
  try {
    const response = await chrome.tabs.sendMessage(tabId, { type: "fontyar:runtime-ping" }, { frameId });
    return !!response?.ok;
  } catch {
    return false;
  }
}

async function isolatedRuntimeState(tabId, frameId) {
  try {
    const [result] = await chrome.scripting.executeScript({
      target: { tabId, frameIds: [frameId] },
      world: "ISOLATED",
      func: () => ({
        runtime: !!globalThis.__FONTYAR_V1_CONTENT_LOADED__,
        localization: !!globalThis.__PERSIANYAR_LOCALIZATION_RUNTIME_V1__,
        cursor: !!globalThis.__PERSIANYAR_CURSOR_PACKS__
      })
    });
    return result?.result || { runtime:false, localization:false, cursor:false };
  } catch { return { runtime:false, localization:false, cursor:false }; }
}

async function markLocalizationRuntimeReady(tabId, frameId) {
  await chrome.scripting.executeScript({
    target: { tabId, frameIds: [frameId] }, world: "ISOLATED",
    func: () => { globalThis.__PERSIANYAR_LOCALIZATION_RUNTIME_V1__ = true; }
  }).catch(() => {});
}

async function ensurePageRuntime(message, sender) {
  const tabId = sender.tab?.id;
  if (!Number.isInteger(tabId)) throw new Error("No target tab available.");
  const frameId = Number.isInteger(sender.frameId) ? sender.frameId : 0;
  const profile = message?.profile || {};
  let state = await isolatedRuntimeState(tabId, frameId);

  // Load optional data only on pages that need it. Localization is by far the largest payload,
  // so ordinary font/dark/style sites no longer parse hundreds of KB of translation tables.
  if (profile.localize && !state.localization) {
    await chrome.scripting.executeScript({
      target: { tabId, frameIds: [frameId] }, files: [...LOCALIZATION_RUNTIME_FILES], injectImmediately: true
    });
    await markLocalizationRuntimeReady(tabId, frameId);
    state = { ...state, localization:true };
  }
  if (profile.cursor && !state.cursor) {
    await chrome.scripting.executeScript({
      target: { tabId, frameIds: [frameId] }, files: [...CURSOR_RUNTIME_FILES], injectImmediately: true
    });
    state = { ...state, cursor:true };
  }

  if (!state.runtime && !(await pageRuntimeAlreadyLoaded(tabId, frameId))) {
    await chrome.scripting.executeScript({
      target: { tabId, frameIds: [frameId] }, files: [...PAGE_RUNTIME_FILES], injectImmediately: true
    });
    return { injected: true, alreadyLoaded: false };
  }

  // If an optional catalog was added to an already-running frame, re-apply once so content.js
  // picks up the new global without a refresh.
  if (profile.localize || profile.cursor) {
    chrome.tabs.sendMessage(tabId, { type:"fontyar:apply-now" }, { frameId }).catch(() => {});
  }
  return { injected: false, alreadyLoaded: true };
}

async function fetchStylesheetForSmartDark(urlValue, maxBytesValue) {
  const url = new URL(String(urlValue || ""));
  if (!/^https?:$/.test(url.protocol)) throw new Error("Unsupported stylesheet URL.");
  const maxBytes = Math.max(32768, Math.min(2500000, Number(maxBytesValue) || 2000000));
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 9000);
  let response;
  try {
    response = await fetch(url.href, {cache:"force-cache", credentials:"omit", redirect:"follow", signal:controller.signal});
  } finally { clearTimeout(timer); }
  if (!response?.ok) throw new Error(`Stylesheet request failed (${response?.status || "network"}).`);
  const length = Number(response.headers.get("content-length") || 0);
  if (length && length > maxBytes) throw new Error("Stylesheet is too large.");
  const text = await response.text();
  if (text.length > maxBytes) throw new Error("Stylesheet is too large.");
  return {url:response.url || url.href, text};
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message) return;

  if (message.type === "fontyar:ensure-page-runtime") {
    ensurePageRuntime(message, sender)
      .then((payload) => sendResponse({ ok: true, ...payload }))
      .catch((error) => sendResponse({ ok: false, error: String(error?.message || error) }));
    return true;
  }

  if (message.type === "fontyar:fetch-stylesheet") {
    fetchStylesheetForSmartDark(message.url, message.maxBytes)
      .then((payload) => sendResponse({ok:true, ...payload}))
      .catch((error) => sendResponse({ok:false, error:String(error?.message || error)}));
    return true;
  }

  if (message.type === "fontyar:get-font-catalog") {
    sendResponse({ ok: true, fonts: Object.entries(FONTS).map(([key, value]) => ({ key, family: value.family, lang: value.lang, kind: value.kind || "download" })) });
    return;
  }

  if (message.type === "fontyar:get-ui-font") {
    const fontKey = normalizeFontKey(message.fontKey);
    if (!fontKey) return sendResponse({ ok: false, error: "Unsupported font." });
    getUiFontCss(fontKey)
      .then((css) => sendResponse({ ok: true, css, family: FONTS[fontKey].family, cache: UI_FONT_CSS_CACHE_NAME }))
      .catch((error) => sendResponse({ ok: false, error: String(error?.message || error) }));
    return true;
  }

  if (message.type === "fontyar:cache-cursor-preview") {
    ensureCursorPackCached(message.key, "preview")
      .then((payload) => sendResponse({ ok: true, payload }))
      .catch((error) => sendResponse({ ok: false, error: String(error?.message || error) }));
    return true;
  }

  if (message.type === "fontyar:cache-cursor-pack") {
    ensureCursorPackCached(message.key, "full")
      .then((payload) => sendResponse({ ok: true, payload }))
      .catch((error) => sendResponse({ ok: false, error: String(error?.message || error) }));
    return true;
  }

  if (message.type === "fontyar:ensure-font") {
    injectCachedFont(message, sender)
      .then((payload) => sendResponse({ ok: true, ...payload }))
      .catch((error) => sendResponse({ ok: false, error: String(error?.message || error) }));
    return true;
  }

  if (message.type === "fontyar:set-user-css") {
    setUserOriginCss(message, sender)
      .then((payload) => sendResponse({ ok: true, ...payload }))
      .catch((error) => sendResponse({ ok: false, error: String(error?.message || error) }));
    return true;
  }

  if (message.type === "fontyar:get-emoji-catalog") {
    getEmojiPackStatus().then((cached) => sendResponse({
      ok: true,
      cached,
      styles: Object.entries(EMOJI_STYLES).map(([key, value]) => ({ key, label: value.label, family: value.family, version: value.version, note: value.note, kind: value.kind, platform: value.platform, stack: value.stack || [], fallbackKey: value.fallbackKey || "" }))
    })).catch((error) => sendResponse({ ok: false, error: String(error?.message || error) }));
    return true;
  }

  if (message.type === "fontyar:prepare-emoji") {
    prepareEmojiPack(message.styleKey).then((payload) => sendResponse({ ok: true, ...payload })).catch((error) => sendResponse({ ok: false, error: String(error?.message || error) }));
    return true;
  }

  if (message.type === "fontyar:ensure-emoji") {
    injectCachedEmoji(message, sender).then((payload) => sendResponse({ ok: true, ...payload })).catch((error) => sendResponse({ ok: false, error: String(error?.message || error) }));
    return true;
  }

  if (message.type === "fontyar:ensure-emoji-form-family") {
    // Deprecated: changing font-family on native editables can alter caret/bidi/line metrics.
    // New builds never request this. Keep stale content scripts harmless until their tab reloads.
    sendResponse({ ok: true, family: "", faces: 0, mode: "deprecated-noop" });
    return false;
  }

  if (message.type === "fontyar:purge-legacy-emoji-form-aliases") {
    purgeLegacyEmojiFormAliases(message, sender).then((payload) => sendResponse({ ok: true, ...payload })).catch((error) => sendResponse({ ok: false, error: String(error?.message || error) }));
    return true;
  }

  // Deprecated compatibility messages from the previous build. Never register emoji faces under
  // a site's existing text-family name again: doing so can change shaping and line metrics inside
  // live editors. Stale content scripts receive a harmless no-op until the tab is reloaded.
  if (message.type === "fontyar:ensure-emoji-form-aliases") {
    sendResponse({ ok: true, aliases: 0, faces: 0, mode: "deprecated-noop" });
    return false;
  }

  if (message.type === "fontyar:clear-emoji-form-aliases") {
    purgeLegacyEmojiFormAliases(message, sender).then((payload) => sendResponse({ ok: true, ...payload })).catch((error) => sendResponse({ ok: false, error: String(error?.message || error) }));
    return true;
  }

  if (message.type === "fontyar:get-emoji-preview-css") {
    getEmojiPreviewCss(message.styleKey).then((payload) => sendResponse({ ok: true, ...payload })).catch((error) => sendResponse({ ok: false, error: String(error?.message || error) }));
    return true;
  }
});

function normalizeFontKey(value) { const key = String(value || ""); return FONTS[key] ? key : ""; }
function normalizeEmojiStyleKey(value) { const raw = String(value || ""); const key = EMOJI_ALIASES[raw] || raw; return EMOJI_STYLES[key] ? key : ""; }
function fontAlias(script, fontKey) { const s=String(script||"all").replace(/[^a-z]/gi,"").toUpperCase()||"ALL"; const f=String(fontKey||"font").replace(/[^a-z0-9_-]/gi,"_"); return `__FontYar_${s}_${f}`; }

async function setUserOriginCss(message, sender) {
  const tabId = sender.tab?.id;
  if (!Number.isInteger(tabId)) throw new Error("No target tab available.");
  const frameId = Number.isInteger(sender.frameId) ? sender.frameId : 0;
  const documentToken = String(message.documentToken || "document").slice(0, 80);
  const css = String(message.css || "");
  const revision = Number.isFinite(Number(message.revision)) ? Math.max(0, Number(message.revision)) : 0;
  const key = `${tabId}:${frameId}:${documentToken}`;
  const target = { tabId, frameIds: [frameId] };

  const apply = async () => {
    const latest = injectedUserCssRevision.get(key) || 0;
    // Messages can complete out of order when the user toggles Smart Dark quickly. Never allow an
    // older USER-origin stylesheet to be inserted after a newer disable/update request.
    if ((revision === 0 && latest > 0) || (revision > 0 && revision < latest)) {
      return { applied: !!injectedUserCss.get(key), bytes: (injectedUserCss.get(key) || "").length, stale: true };
    }

    const previous = injectedUserCss.get(key) || "";
    if (previous && previous !== css) {
      try { await chrome.scripting.removeCSS({ target, css: previous, origin: "USER" }); } catch {}
    }
    if (!css) {
      injectedUserCss.delete(key);
      injectedUserCssRevision.set(key, revision || latest + 1);
      return { applied: false, bytes: 0 };
    }
    if (previous !== css) {
      await chrome.scripting.insertCSS({ target, css, origin: "USER" });
      injectedUserCss.set(key, css);
    }
    injectedUserCssRevision.set(key, revision || latest + 1);
    return { applied: true, bytes: css.length };
  };

  const previousChain = userCssApplyChains.get(key) || Promise.resolve();
  const chain = previousChain.then(apply, apply);
  const tracked = chain.finally(() => {
    if (userCssApplyChains.get(key) === tracked) userCssApplyChains.delete(key);
  });
  userCssApplyChains.set(key, tracked);
  return tracked;
}

async function injectCachedFont(message, sender) {
  const fontKey = normalizeFontKey(message.fontKey);
  if (!fontKey) throw new Error("Unsupported font.");
  const script = ["fa", "ar", "en", "zh"].includes(message.script) ? message.script : "all";
  const alias = fontAlias(script, fontKey);
  const tabId = sender.tab?.id;
  if (!Number.isInteger(tabId)) throw new Error("No target tab available.");
  const frameId = Number.isInteger(sender.frameId) ? sender.frameId : 0;
  const documentToken = String(message.documentToken || "document").slice(0, 80);
  const cacheKey = `${tabId}:${frameId}:${documentToken}:${fontKey}:${script}`;

  if (!injectedFonts.has(cacheKey)) {
    const font = FONTS[fontKey];
    if (font.kind === "system") {
      // local() does not issue a network font request, so it remains safe on strict-CSP pages.
      const css = await getInlineFontCss(fontKey, script, alias);
      await chrome.scripting.insertCSS({ target: { tabId, frameIds: [frameId] }, css, origin: "USER" });
    } else {
      // Strict sites such as X reject data: and third-party @font-face URLs via font-src.
      // Register already-downloaded bytes through the CSS Font Loading API instead. A binary
      // FontFace has no URL fetch in the page, so the site's font-src policy has nothing to block.
      const faces = await getBinaryFontFaces(fontKey, script, alias);
      const results = await chrome.scripting.executeScript({
        target: { tabId, frameIds: [frameId] },
        world: "MAIN",
        func: installBinaryFontFacesInPage,
        args: [faces, `font:${alias}`]
      });
      const result = results?.[0]?.result;
      if (!result?.ok) throw new Error(result?.error || "Font registration failed in the page.");
    }
    injectedFonts.add(cacheKey);
  }
  return { fontKey, script, family: alias, source: FONTS[fontKey].cssUrl || "system", mode: FONTS[fontKey].kind === "system" ? "system-local" : "binary-fontface-csp-safe" };
}

async function injectCachedEmoji(message, sender) {
  const styleKey = normalizeEmojiStyleKey(message.styleKey);
  if (!styleKey) throw new Error("Unsupported emoji style.");
  const style = EMOJI_STYLES[styleKey];
  const tabId = sender.tab?.id;
  if (!Number.isInteger(tabId)) throw new Error("No target tab available.");
  const frameId = Number.isInteger(sender.frameId) ? sender.frameId : 0;
  const documentToken = String(message.documentToken || "document").slice(0, 80);

  let effectiveKey = styleKey;
  if (style.kind === "hybrid") effectiveKey = style.fallbackKey;
  const effective = EMOJI_STYLES[effectiveKey];
  if (effective?.kind === "download") {
    const cacheKey = `${tabId}:${frameId}:${documentToken}:${effectiveKey}`;
    if (!injectedEmoji.has(cacheKey)) {
      const faces = await getBinaryEmojiFaces(effectiveKey);
      const results = await chrome.scripting.executeScript({
        target: { tabId, frameIds: [frameId] },
        world: "MAIN",
        func: installBinaryFontFacesInPage,
        args: [faces, `emoji:${effectiveKey}`]
      });
      const result = results?.[0]?.result;
      if (!result?.ok) throw new Error(result?.error || "Emoji font registration failed in the page.");
      injectedEmoji.add(cacheKey);
    }
    await markEmojiPackCached(effectiveKey);
  }
  return { styleKey, family: style.family, version: style.version, mode: style.kind };
}

function normalizeEmojiSafeFamily(value) {
  const name = String(value || "").trim().slice(0, 96);
  return /^__[A-Za-z0-9_-]+$/.test(name) ? name : "";
}

async function injectEmojiFormFamily(message, sender) {
  const styleKey = normalizeEmojiStyleKey(message.styleKey);
  if (!styleKey) throw new Error("Unsupported emoji style.");
  const alias = normalizeEmojiSafeFamily(message.alias);
  if (!alias) throw new Error("Invalid emoji form family alias.");

  const style = EMOJI_STYLES[styleKey];
  if (!style || style.kind === "system-stack") return { styleKey, family: "", mode: "native" };

  const effectiveKey = style.kind === "hybrid" ? style.fallbackKey : styleKey;
  const effective = EMOJI_STYLES[effectiveKey];
  if (!effective || effective.kind !== "download") return { styleKey, family: "", mode: "native" };

  const tabId = sender.tab?.id;
  if (!Number.isInteger(tabId)) throw new Error("No target tab available.");
  const frameId = Number.isInteger(sender.frameId) ? sender.frameId : 0;
  const token = String(message.documentToken || "document").replace(/[^a-z0-9_.:-]/gi, "_").slice(0, 80) || "document";
  const registryKey = `persianyar:emoji-safe:${token}:${styleKey}`;
  const faces = (await getBinaryEmojiFaces(effectiveKey)).map(face => ({
    ...face,
    family: alias,
    unicodeRange: EMOJI_UNICODE_RANGE
  }));
  const results = await chrome.scripting.executeScript({
    target: { tabId, frameIds: [frameId] },
    world: "MAIN",
    func: installBinaryFontFacesInPage,
    args: [faces, registryKey]
  });
  const result = results?.[0]?.result;
  if (!result?.ok) throw new Error(result?.error || "Emoji form family registration failed in the page.");
  return { styleKey, family: alias, faces: result.count || 0, reused: !!result.reused, mode: "dedicated-unicode-range-family" };
}

async function purgeLegacyEmojiFormAliases(message, sender) {
  const tabId = sender.tab?.id;
  if (!Number.isInteger(tabId)) return { removed: 0 };
  const frameId = Number.isInteger(sender.frameId) ? sender.frameId : 0;
  const results = await chrome.scripting.executeScript({
    target: { tabId, frameIds: [frameId] },
    world: "MAIN",
    func: purgeLegacyEmojiAliasesInPage
  });
  return results?.[0]?.result || { removed: 0 };
}

function purgeLegacyEmojiAliasesInPage() {
  try {
    const registry = globalThis.__FONTYAR_BINARY_FONT_REGISTRY__;
    if (!(registry instanceof Map) || !document?.fonts) return { ok: true, removed: 0 };
    let removed = 0;
    for (const [key, faces] of [...registry.entries()]) {
      if (!String(key).startsWith("persianyar:emoji-form:")) continue;
      for (const face of Array.isArray(faces) ? faces : []) {
        try { document.fonts.delete(face); } catch {}
      }
      registry.delete(key);
      removed++;
    }
    return { ok: true, removed };
  } catch (error) {
    return { ok: false, error: String(error?.message || error), removed: 0 };
  }
}

function normalizeEmojiFormAlias(value) {
  const name = String(value || "").trim().slice(0, 128);
  if (!name || /[\u0000-\u001F\u007F]/.test(name)) return "";
  const generic = new Set(["serif","sans-serif","monospace","cursive","fantasy","system-ui","ui-serif","ui-sans-serif","ui-monospace","ui-rounded","math","fangsong","emoji","-apple-system","blinkmacsystemfont"]);
  return generic.has(name.toLowerCase()) ? "" : name;
}

function emojiFormRegistryPrefix(documentToken) {
  const token = String(documentToken || "document").replace(/[^a-z0-9_.:-]/gi, "_").slice(0, 80) || "document";
  return `persianyar:emoji-form:${token}`;
}

async function injectEmojiFormAliases(message, sender) {
  const styleKey = normalizeEmojiStyleKey(message.styleKey);
  if (!styleKey) throw new Error("Unsupported emoji style.");
  const aliases = [...new Set((Array.isArray(message.aliases) ? message.aliases : []).map(normalizeEmojiFormAlias).filter(Boolean))].slice(0, 12);
  if (!aliases.length) return { styleKey, aliases: 0, mode: "noop" };

  const style = EMOJI_STYLES[styleKey];
  // Native/system styles already participate in normal browser fallback inside form controls. Do
  // not create CSS or mutate the control just to reproduce what the platform already does.
  if (style.kind === "system-stack" || style.kind === "hybrid") return { styleKey, aliases: 0, mode: "native-fallback" };

  const effectiveKey = style.kind === "hybrid" ? style.fallbackKey : styleKey;
  const effective = EMOJI_STYLES[effectiveKey];
  if (!effective || effective.kind !== "download") return { styleKey, aliases: 0, mode: "native-fallback" };

  const tabId = sender.tab?.id;
  if (!Number.isInteger(tabId)) throw new Error("No target tab available.");
  const frameId = Number.isInteger(sender.frameId) ? sender.frameId : 0;
  const faces = (await getBinaryEmojiFaces(effectiveKey)).map(face => ({ ...face, unicodeRange: EMOJI_UNICODE_RANGE }));
  const prefix = emojiFormRegistryPrefix(message.documentToken);
  const results = await chrome.scripting.executeScript({
    target: { tabId, frameIds: [frameId] },
    world: "MAIN",
    func: replaceBinaryEmojiAliasesInPage,
    args: [faces, aliases, prefix]
  });
  const result = results?.[0]?.result;
  if (!result?.ok) throw new Error(result?.error || "Emoji form alias registration failed in the page.");
  return { styleKey, aliases: result.aliases || 0, faces: result.faces || 0, mode: "unicode-range-alias" };
}

async function clearEmojiFormAliases(message, sender) {
  const aliases = [...new Set((Array.isArray(message.aliases) ? message.aliases : []).map(normalizeEmojiFormAlias).filter(Boolean))].slice(0, 24);
  if (!aliases.length) return { aliases: 0 };
  const tabId = sender.tab?.id;
  if (!Number.isInteger(tabId)) return { aliases: 0 };
  const frameId = Number.isInteger(sender.frameId) ? sender.frameId : 0;
  const prefix = emojiFormRegistryPrefix(message.documentToken);
  const results = await chrome.scripting.executeScript({
    target: { tabId, frameIds: [frameId] },
    world: "MAIN",
    func: removeBinaryEmojiAliasesInPage,
    args: [aliases, prefix]
  });
  return results?.[0]?.result || { aliases: 0 };
}

async function prepareEmojiPack(styleKeyValue) {
  const styleKey = normalizeEmojiStyleKey(styleKeyValue);
  if (!styleKey) throw new Error("Unsupported emoji style.");
  const style = EMOJI_STYLES[styleKey];
  const effectiveKey = style.kind === "hybrid" ? style.fallbackKey : styleKey;
  const effective = EMOJI_STYLES[effectiveKey];
  if (effective?.kind === "download") {
    await getInlineEmojiCss(effectiveKey);
    await markEmojiPackCached(effectiveKey);
  }
  return { styleKey, family: style.family, version: style.version, cache: effective?.kind === "download" ? EMOJI_CACHE_NAME : "system", mode: style.kind };
}

async function getEmojiPreviewCss(styleKeyValue) {
  const styleKey = normalizeEmojiStyleKey(styleKeyValue);
  if (!styleKey) throw new Error("Unsupported emoji style.");
  const style = EMOJI_STYLES[styleKey];
  const effectiveKey = style.kind === "hybrid" ? style.fallbackKey : styleKey;
  const effective = EMOJI_STYLES[effectiveKey];
  let css = "";
  if (effective?.kind === "download") css = await getInlineEmojiCss(effectiveKey);
  const stack = style.stack?.length ? style.stack : [style.family];
  if (style.kind === "hybrid" && effective?.family && !stack.includes(effective.family)) stack.push(effective.family);
  return { styleKey, family: style.family, stack, css, cached: true, fallbackFamily: effective?.family || "" };
}

async function getEmojiPackStatus() {
  const data = await chrome.storage.local.get({ [EMOJI_STATUS_KEY]: {} });
  const raw = data[EMOJI_STATUS_KEY] || {};
  const result = {};
  for (const [key, style] of Object.entries(EMOJI_STYLES)) {
    const effectiveKey = style.kind === "hybrid" ? style.fallbackKey : key;
    const effective = EMOJI_STYLES[effectiveKey];
    result[key] = effective?.kind !== "download" || raw[effectiveKey]?.version === effective.version;
  }
  return result;
}

async function markEmojiPackCached(styleKey) {
  const style = EMOJI_STYLES[styleKey];
  if (!style || style.kind !== "download") return;
  const data = await chrome.storage.local.get({ [EMOJI_STATUS_KEY]: {} });
  const current = data[EMOJI_STATUS_KEY] || {};
  current[styleKey] = { version: style.version, cachedAt: Date.now() };
  await chrome.storage.local.set({ [EMOJI_STATUS_KEY]: current });
}

function getBinaryFontFaces(fontKey, script = "all", alias = "") {
  const cacheKey = `${fontKey}|${script}|${alias}`;
  if (!binaryFontFaceCache.has(cacheKey)) {
    binaryFontFaceCache.set(cacheKey, buildBinaryFontFaces(fontKey, script, alias).catch((error) => {
      binaryFontFaceCache.delete(cacheKey);
      throw error;
    }));
  }
  return binaryFontFaceCache.get(cacheKey);
}

function getBinaryEmojiFaces(styleKey) {
  if (!binaryEmojiFaceCache.has(styleKey)) {
    binaryEmojiFaceCache.set(styleKey, buildBinaryEmojiFaces(styleKey).catch((error) => {
      binaryEmojiFaceCache.delete(styleKey);
      throw error;
    }));
  }
  return binaryEmojiFaceCache.get(styleKey);
}

async function buildBinaryFontFaces(fontKey, script = "all", aliasFamily = "") {
  const font = FONTS[fontKey];
  if (!font || font.kind === "system") return [];
  const family = aliasFamily || font.family;
  const scriptRange = script !== "all" ? SCRIPT_RANGES[script] : "";
  const cssResponse = await cachedFetch(font.cssUrl, FONT_CACHE_NAME);
  const sourceCss = await cssResponse.text();
  const blocks = sourceCss.match(/@font-face\s*\{[\s\S]*?\}/gi) || [];
  if (!blocks.length) throw new Error("Font source returned no @font-face declarations.");

  const faces = [];
  const seen = new Set();
  for (const block of blocks) {
    const src = readDeclaration(block, "src");
    const urlMatch = src.match(/url\(\s*(['\"]?)(.*?)\1\s*\)/i);
    if (!urlMatch?.[2]) continue;
    const remoteUrl = new URL(urlMatch[2], font.cssUrl);
    if (remoteUrl.protocol !== "https:" || !isAllowedFontHost(remoteUrl.hostname)) continue;
    const weight = safeDescriptor(readDeclaration(block, "font-weight") || "400");
    const style = safeDescriptor(readDeclaration(block, "font-style") || "normal");
    const stretch = safeDescriptor(readDeclaration(block, "font-stretch") || "normal");
    // Preserve provider unicode ranges (Google Fonts uses them for subsets). If none exists,
    // constrain the alias to the requested writing system.
    const sourceRange = safeDescriptor(readDeclaration(block, "unicode-range") || "");
    const unicodeRange = sourceRange || scriptRange;
    const key = [remoteUrl.href, weight, style, stretch, unicodeRange].join("|");
    if (seen.has(key)) continue;
    seen.add(key);
    const fontResponse = await cachedFetch(remoteUrl.href, FONT_CACHE_NAME);
    const data = await fontResponse.arrayBuffer();
    assertValidFontBinary(data, remoteUrl.href);
    faces.push({ family, data: arrayBufferToBase64(data), style, weight, stretch, unicodeRange });
  }
  if (!faces.length) throw new Error("No usable font files were returned by the source.");
  return faces;
}

async function buildBinaryEmojiFaces(styleKey) {
  const style = EMOJI_STYLES[styleKey];
  if (!style || style.kind !== "download") return [];
  if (style.directFontUrl) {
    const remoteUrl = new URL(style.directFontUrl);
    validateEmojiUrl(remoteUrl);
    const response = await cachedFetch(remoteUrl.href, EMOJI_CACHE_NAME);
    const data = await response.arrayBuffer();
    assertValidFontBinary(data, remoteUrl.href);
    return [{ family: style.family, data: arrayBufferToBase64(data), style: "normal", weight: "100 900", stretch: "normal", unicodeRange: "" }];
  }

  const cssUrl = new URL(style.cssUrl);
  validateEmojiUrl(cssUrl);
  const cssResponse = await cachedFetch(cssUrl.href, EMOJI_CACHE_NAME);
  const sourceCss = await cssResponse.text();
  const blocks = sourceCss.match(/@font-face\s*\{[\s\S]*?\}/gi) || [];
  if (!blocks.length) throw new Error("Emoji source returned no @font-face declarations.");
  const faces = [];
  const seen = new Set();
  for (const block of blocks) {
    const src = readDeclaration(block, "src");
    const urlMatch = src.match(/url\(\s*(['\"]?)(.*?)\1\s*\)/i);
    if (!urlMatch?.[2]) continue;
    const remoteUrl = new URL(urlMatch[2], cssUrl.href);
    if (remoteUrl.protocol !== "https:") continue;
    validateEmojiUrl(remoteUrl);
    const rawWeight = safeDescriptor(readDeclaration(block, "font-weight") || "400");
    const weight = /^\d{3}$/.test(rawWeight) || /^(?:normal|bold)$/i.test(rawWeight) ? "100 900" : rawWeight;
    const faceStyle = safeDescriptor(readDeclaration(block, "font-style") || "normal");
    const stretch = safeDescriptor(readDeclaration(block, "font-stretch") || "normal");
    const unicodeRange = safeDescriptor(readDeclaration(block, "unicode-range") || "");
    const key = [remoteUrl.href, weight, faceStyle, stretch, unicodeRange].join("|");
    if (seen.has(key)) continue;
    seen.add(key);
    const response = await cachedFetch(remoteUrl.href, EMOJI_CACHE_NAME);
    const data = await response.arrayBuffer();
    assertValidFontBinary(data, remoteUrl.href);
    faces.push({ family: style.family, data: arrayBufferToBase64(data), style: faceStyle, weight, stretch, unicodeRange });
  }
  if (!faces.length) throw new Error("No usable emoji font files were returned by the source.");
  return faces;
}

async function replaceBinaryEmojiAliasesInPage(faces, aliases, registryPrefix) {
  try {
    const registryName = "__FONTYAR_BINARY_FONT_REGISTRY__";
    const registry = globalThis[registryName] || (globalThis[registryName] = new Map());
    if (!globalThis.FontFace || !document?.fonts) return { ok: false, error: "CSS Font Loading API is unavailable." };
    const safeFaces = Array.isArray(faces) ? faces : [];
    const safeAliases = [...new Set((Array.isArray(aliases) ? aliases : []).map(x => String(x || "").trim()).filter(Boolean))].slice(0, 12);
    const decoded = safeFaces.map(face => {
      const raw = atob(String(face.data || ""));
      const bytes = new Uint8Array(raw.length);
      for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
      return { face, bytes };
    });
    let installedAliasCount = 0, installedFaceCount = 0;
    for (const alias of safeAliases) {
      const key = `${registryPrefix}:${alias}`;
      const previous = registry.get(key) || [];
      for (const oldFace of previous) { try { document.fonts.delete(oldFace); } catch {} }
      registry.delete(key);
      const installed = [];
      for (const item of decoded) {
        const face = item.face || {};
        const descriptors = {};
        if (face.style) descriptors.style = face.style;
        if (face.weight) descriptors.weight = face.weight;
        if (face.stretch && face.stretch !== "normal") descriptors.stretch = face.stretch;
        if (face.unicodeRange) descriptors.unicodeRange = face.unicodeRange;
        try {
          // Each FontFace gets its own buffer view. The glyph data are identical, but the family
          // name is the site's existing text family, which lets Chromium swap only covered emoji
          // code points without changing the element's font-family CSS or text metrics.
          const fontFace = new FontFace(alias, item.bytes.buffer, descriptors);
          await fontFace.load();
          document.fonts.add(fontFace);
          installed.push(fontFace);
          installedFaceCount++;
        } catch {}
      }
      if (installed.length) {
        registry.set(key, installed);
        installedAliasCount++;
      }
    }
    return { ok: true, aliases: installedAliasCount, faces: installedFaceCount };
  } catch (error) {
    return { ok: false, error: String(error?.message || error) };
  }
}

function removeBinaryEmojiAliasesInPage(aliases, registryPrefix) {
  try {
    const registry = globalThis.__FONTYAR_BINARY_FONT_REGISTRY__;
    if (!(registry instanceof Map) || !document?.fonts) return { ok: true, aliases: 0 };
    let removed = 0;
    for (const alias of Array.isArray(aliases) ? aliases : []) {
      const key = `${registryPrefix}:${String(alias || "").trim()}`;
      const faces = registry.get(key) || [];
      if (!faces.length) continue;
      for (const face of faces) { try { document.fonts.delete(face); } catch {} }
      registry.delete(key);
      removed++;
    }
    return { ok: true, aliases: removed };
  } catch (error) {
    return { ok: false, error: String(error?.message || error) };
  }
}

async function installBinaryFontFacesInPage(faces, registryKey) {
  try {
    const registryName = "__FONTYAR_BINARY_FONT_REGISTRY__";
    const registry = globalThis[registryName] || (globalThis[registryName] = new Map());
    if (registry.has(registryKey)) return { ok: true, reused: true, count: registry.get(registryKey).length };
    if (!globalThis.FontFace || !document?.fonts) return { ok: false, error: "CSS Font Loading API is unavailable." };

    const installed = [];
    for (const face of Array.isArray(faces) ? faces : []) {
      const raw = atob(String(face.data || ""));
      const bytes = new Uint8Array(raw.length);
      for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
      const descriptors = {};
      if (face.style) descriptors.style = face.style;
      if (face.weight) descriptors.weight = face.weight;
      if (face.stretch && face.stretch !== "normal") descriptors.stretch = face.stretch;
      if (face.unicodeRange) descriptors.unicodeRange = face.unicodeRange;
      const fontFace = new FontFace(String(face.family || "FontYar"), bytes.buffer, descriptors);
      await fontFace.load();
      document.fonts.add(fontFace);
      installed.push(fontFace);
    }
    registry.set(registryKey, installed);
    return { ok: true, reused: false, count: installed.length };
  } catch (error) {
    return { ok: false, error: String(error?.message || error) };
  }
}

function getInlineFontCss(fontKey, script = "all", alias = "") {
  const cacheKey = `${fontKey}|${script}|${alias}`;
  if (!inlineFontCssCache.has(cacheKey)) {
    inlineFontCssCache.set(cacheKey, buildInlineFontCss(fontKey, false, script, alias).catch((error) => { inlineFontCssCache.delete(cacheKey); throw error; }));
  }
  return inlineFontCssCache.get(cacheKey);
}

function getUiFontCss(fontKey) {
  if (!uiFontCssCache.has(fontKey)) {
    uiFontCssCache.set(fontKey, getPersistentUiFontCss(fontKey).catch((error) => { uiFontCssCache.delete(fontKey); throw error; }));
  }
  return uiFontCssCache.get(fontKey);
}

async function getPersistentUiFontCss(fontKey) {
  const cache = await caches.open(UI_FONT_CSS_CACHE_NAME);
  const key = new Request(chrome.runtime.getURL(`__cache/ui-font/${encodeURIComponent(fontKey)}.css`));
  const hit = await cache.match(key);
  if (hit?.ok) return hit.text();
  const css = await buildInlineFontCss(fontKey, true, "all", FONTS[fontKey]?.family || "");
  try { await cache.put(key, new Response(css, { headers: { "content-type": "text/css; charset=utf-8", "cache-control": "public, max-age=31536000, immutable" } })); } catch {}
  return css;
}

function getInlineEmojiCss(styleKey) {
  const style = EMOJI_STYLES[styleKey];
  if (!style || style.kind !== "download") return Promise.resolve("");
  if (!inlineEmojiCssCache.has(styleKey)) {
    inlineEmojiCssCache.set(styleKey, buildInlineEmojiCss(styleKey).catch((error) => { inlineEmojiCssCache.delete(styleKey); throw error; }));
  }
  return inlineEmojiCssCache.get(styleKey);
}

async function buildInlineFontCss(fontKey, regularOnly, script = "all", aliasFamily = "") {
  const font = FONTS[fontKey];
  if (!font) throw new Error("Unsupported font.");
  const family = aliasFamily || font.family;
  const unicodeOverride = script !== "all" ? SCRIPT_RANGES[script] : "";
  if (font.kind === "system") {
    return `@font-face{font-family:"${escapeCss(family)}";src:local("${escapeCss(font.localFamily || font.family)}");font-style:normal;font-weight:100 900;${unicodeOverride ? `unicode-range:${unicodeOverride};` : ""}font-display:swap;}`;
  }

  const cssResponse = await cachedFetch(font.cssUrl, FONT_CACHE_NAME);
  const sourceCss = await cssResponse.text();
  const blocks = sourceCss.match(/@font-face\s*\{[\s\S]*?\}/gi) || [];
  if (!blocks.length) throw new Error("Font source returned no @font-face declarations.");

  const generated = [];
  const seen = new Set();
  for (const block of blocks) {
    const src = readDeclaration(block, "src");
    const urlMatch = src.match(/url\(\s*(['\"]?)(.*?)\1\s*\)/i);
    if (!urlMatch?.[2]) continue;
    const remoteUrl = new URL(urlMatch[2], font.cssUrl);
    if (remoteUrl.protocol !== "https:" || !isAllowedFontHost(remoteUrl.hostname)) continue;
    const weight = safeDescriptor(readDeclaration(block, "font-weight") || "400");
    if (regularOnly && !isRegularWeight(weight)) continue;
    const style = safeDescriptor(readDeclaration(block, "font-style") || "normal");
    const stretch = safeDescriptor(readDeclaration(block, "font-stretch") || "normal");
    const sourceRange = safeDescriptor(readDeclaration(block, "unicode-range") || "");
    const unicodeRange = unicodeOverride || sourceRange;
    const key = [remoteUrl.href, weight, style, stretch, unicodeRange].join("|");
    if (seen.has(key)) continue;
    seen.add(key);
    const fontResponse = await cachedFetch(remoteUrl.href, FONT_CACHE_NAME);
    const data = await fontResponse.arrayBuffer();
    assertValidFontBinary(data, remoteUrl.href);
    const mime = normalizeAssetMime(fontResponse.headers.get("content-type"), remoteUrl.pathname);
    const dataUrl = `data:${mime};base64,${arrayBufferToBase64(data)}`;
    generated.push(`@font-face{font-family:"${escapeCss(family)}";src:url("${dataUrl}") format("${formatForMime(mime)}");font-style:${style};font-weight:${weight};font-stretch:${stretch};${unicodeRange ? `unicode-range:${unicodeRange};` : ""}font-display:swap;}`);
  }
  if (!generated.length) throw new Error("No usable font files were returned by the source.");
  return generated.join("\n");
}

async function buildInlineEmojiCss(styleKey) {
  const style = EMOJI_STYLES[styleKey];
  if (!style || style.kind !== "download") throw new Error("Unsupported downloadable emoji style.");
  if (style.directFontUrl) {
    const remoteUrl = new URL(style.directFontUrl);
    validateEmojiUrl(remoteUrl);
    const response = await cachedFetch(remoteUrl.href, EMOJI_CACHE_NAME);
    const data = await response.arrayBuffer();
    assertValidFontBinary(data, remoteUrl.href);
    const mime = normalizeAssetMime(response.headers.get("content-type"), remoteUrl.pathname);
    const dataUrl = `data:${mime};base64,${arrayBufferToBase64(data)}`;
    return `@font-face{font-family:"${escapeCss(style.family)}";src:url("${dataUrl}") format("${formatForMime(mime)}");font-style:normal;font-weight:100 900;font-display:swap;}`;
  }
  const cssUrl = new URL(style.cssUrl);
  validateEmojiUrl(cssUrl);
  const cssResponse = await cachedFetch(cssUrl.href, EMOJI_CACHE_NAME);
  const sourceCss = await cssResponse.text();
  if (!/@font-face/i.test(sourceCss)) throw new Error("Emoji source returned no @font-face declarations.");
  return inlineRemoteUrls(sourceCss, cssUrl.href);
}

async function inlineRemoteUrls(sourceCss, baseUrl) {
  const urlRe = /url\(\s*(['\"]?)([^'\")]+)\1\s*\)/gi;
  const matches = [...sourceCss.matchAll(urlRe)];
  const unique = new Map();
  for (const match of matches) {
    const raw = String(match[2] || "").trim();
    if (!raw || raw.startsWith("data:") || raw.startsWith("local(")) continue;
    const remote = new URL(raw, baseUrl);
    if (remote.protocol !== "https:") continue;
    validateEmojiUrl(remote);
    if (!unique.has(raw)) unique.set(raw, remote.href);
  }
  const replacements = new Map();
  await mapLimit([...unique.entries()], 5, async ([raw, url]) => {
    const response = await cachedFetch(url, EMOJI_CACHE_NAME);
    const data = await response.arrayBuffer();
    assertValidFontBinary(data, url);
    const remote = new URL(url);
    const mime = normalizeAssetMime(response.headers.get("content-type"), remote.pathname);
    replacements.set(raw, `data:${mime};base64,${arrayBufferToBase64(data)}`);
  });
  return sourceCss.replace(urlRe, (full, quote, raw) => replacements.has(String(raw || "").trim()) ? `url("${replacements.get(String(raw || "").trim())}")` : full);
}


function safeCursorHex(value, fallback) {
  const v=String(value||"").trim();
  return /^#[0-9a-f]{6}$/i.test(v)?v:fallback;
}

function builtInCursorSvg(pack, state) {
  const body=safeCursorHex(pack?.baseColor,"#111111"), outline=safeCursorHex(pack?.outlineColor,"#ffffff"), accent=safeCursorHex(pack?.accentColor,outline);
  const common=`stroke-linejoin="round" stroke-linecap="round"`;
  let shape="";
  if(state==="pointer"||state==="copy"||state==="alias"||state==="contextMenu"){
    shape=`<path d="M10 3v14.2l-3.1-3.1a2.25 2.25 0 0 0-3.2 3.2l7.2 7.2c1.6 1.6 3.4 2.5 5.8 2.5h2.1c4.7 0 8.2-3.2 8.2-7.7V11a2 2 0 0 0-4 0v4-6a2 2 0 0 0-4 0v6-8a2 2 0 0 0-4 0v8-12a2 2 0 0 0-4 0Z" fill="${body}" stroke="${outline}" stroke-width="1.8" ${common}/>`;
  }else if(state==="text"||state==="verticalText"){
    shape=`<path d="M11 4h10M16 4v24M11 28h10M12.5 10h7M12.5 22h7" fill="none" stroke="${body}" stroke-width="2.4" ${common}/><path d="M10 4h12M16 3v26M10 28h12" fill="none" stroke="${outline}" stroke-width="4.4" opacity=".9" ${common}/><path d="M11 4h10M16 4v24M11 28h10" fill="none" stroke="${body}" stroke-width="2.1" ${common}/>`;
  }else if(state==="crosshair"||state==="cell"||state==="zoomIn"||state==="zoomOut"){
    shape=`<circle cx="16" cy="16" r="5" fill="none" stroke="${outline}" stroke-width="4"/><path d="M16 4v24M4 16h24" stroke="${outline}" stroke-width="4" ${common}/><circle cx="16" cy="16" r="5" fill="none" stroke="${body}" stroke-width="2"/><path d="M16 4v24M4 16h24" stroke="${body}" stroke-width="2" ${common}/>`;
  }else if(state==="wait"||state==="progress"){
    shape=`<circle cx="16" cy="16" r="10" fill="none" stroke="${outline}" stroke-width="4" opacity=".9"/><path d="M16 6a10 10 0 0 1 9 5.7" fill="none" stroke="${accent}" stroke-width="3" ${common}/><circle cx="16" cy="16" r="6" fill="${body}" opacity=".9"/>`;
  }else if(["colResize","rowResize","ewResize","nsResize","neswResize","nwseResize","move","allScroll"].includes(state)){
    const vertical=["rowResize","nsResize"].includes(state),diag1=state==="neswResize",diag2=state==="nwseResize";
    let d="M4 16h24m-5-5 5 5-5 5M9 11l-5 5 5 5";
    if(vertical)d="M16 4v24m-5-5 5 5 5-5M11 9l5-5 5 5";
    if(diag1)d="M7 25 25 7m-7 0h7v7M7 18v7h7";
    if(diag2)d="M7 7l18 18m-7 0h7v-7M7 14V7h7";
    shape=`<path d="${d}" fill="none" stroke="${outline}" stroke-width="4.2" ${common}/><path d="${d}" fill="none" stroke="${body}" stroke-width="2.1" ${common}/>`;
  }else if(state==="notAllowed"){
    shape=`<circle cx="16" cy="16" r="11" fill="${body}" stroke="${outline}" stroke-width="2"/><path d="M8 8l16 16" stroke="${accent}" stroke-width="3.2" ${common}/>`;
  }else{
    shape=`<path d="M3 2.5 4 27l6.4-6.2 5.4 9.2 5-2.9-5.3-8.8 9-.4Z" fill="${body}" stroke="${outline}" stroke-width="1.8" ${common}/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">${shape}</svg>`;
}

function builtInCursorState(pack, state) {
  return cursorSvgDataUrl(builtInCursorSvg(pack,state));
}

async function ensureCursorPackCached(keyValue, mode = "full") {
  const api = globalThis.__PERSIANYAR_CURSOR_PACKS__;
  const pack = api?.get?.(keyValue);
  if (!api || !pack) throw new Error("Cursor pack is unavailable.");

  const wantedMode = mode === "preview" ? "preview" : "full";
  const stored = await chrome.storage.local.get({ [CURSOR_STORAGE_KEY]: {} });
  const existing = stored?.[CURSOR_STORAGE_KEY]?.[pack.key];
  const existingOk = existing?.version === api.version && /^data:image\/svg\+xml/i.test(existing.defaultUrl || "") && /^data:image\/svg\+xml/i.test(existing.pointerUrl || "");
  if (existingOk && (wantedMode === "preview" || existing.mode === "full")) return existing;

  const stateKeys = wantedMode === "preview" ? ["default", "pointer"] : [...(api.stateKeys || ["default", "pointer"])];
  // Reuse a valid preview when expanding it to a full pack. This avoids redownloading
  // the two most important states and makes pack selection feel immediate.
  const states = {};
  const hotspots = {};
  if (existingOk) {
    for (const state of ["default", "pointer"]) {
      const value = existing?.states?.[state] || (state === "default" ? existing.defaultUrl : existing.pointerUrl);
      if (/^data:image\/svg\+xml/i.test(value || "")) {
        states[state] = value;
        hotspots[state] = existing?.hotspots?.[state] || (state === "default" ? existing.defaultHotspot : existing.pointerHotspot) || pack.hotspots?.[state] || [0,0];
      }
    }
  }

  await mapLimit(stateKeys.filter(state => !states[state]), 3, async (state) => {
    const candidates = Array.isArray(pack.stateUrls?.[state]) ? pack.stateUrls[state] : [];
    if (!candidates.length) return;
    try {
      const svg = await fetchFirstCursorSvg(candidates);
      states[state] = cursorSvgDataUrl(recolorCursorSvg(svg, pack));
      hotspots[state] = pack.hotspots?.[state] || [0, 0];
    } catch (error) {
      console.debug?.("[PersianYar] cursor state fallback", pack.key, state, String(error?.message || error));
    }
  });

  const remotelyLoadedStates = new Set(Object.keys(states));
  if (!states.default) { states.default=builtInCursorState(pack,"default"); hotspots.default=pack.hotspots?.default||[4,3]; }
  if (!states.pointer) { states.pointer=builtInCursorState(pack,"pointer"); hotspots.pointer=pack.hotspots?.pointer||[9,4]; }

  const directlyLoadedStates = new Set(remotelyLoadedStates);
  if (wantedMode === "full") {
    const fallbackState = {
      verticalText:"text", wait:"default", progress:"default", allScroll:"move", grabbing:"grab", help:"default",
      notAllowed:"default", zoomIn:"crosshair", zoomOut:"crosshair", copy:"pointer", alias:"pointer", contextMenu:"pointer",
      cell:"crosshair", colResize:"ewResize", rowResize:"nsResize", ewResize:"move", nsResize:"move", neswResize:"move", nwseResize:"move"
    };
    for (const state of (api.stateKeys || [])) {
      if (states[state]) continue;
      const preferred = fallbackState[state];
      const preferredAsset = preferred && states[preferred];
      // Generate a matching offline glyph for common semantic cursor states. This keeps text,
      // resize and blocked states understandable even when every external mirror is unavailable.
      const builtinStates=new Set(["pointer","text","verticalText","wait","progress","crosshair","move","allScroll","notAllowed","cell","colResize","rowResize","ewResize","nsResize","neswResize","nwseResize","copy","alias","contextMenu"]);
      states[state] = preferredAsset || (builtinStates.has(state)?builtInCursorState(pack,state):states.default);
      hotspots[state] = (preferred && hotspots[preferred]) || pack.hotspots?.[state] || hotspots.default || [0,0];
    }
  }

  const totalStates = Object.keys(states).length;
  const payload = {
    version: api.version, key: pack.key, source: `${pack.source || "CDN"}${remotelyLoadedStates.size < Math.min(stateKeys.length,2) ? " · offline fallback" : ""}`, cachedAt: Date.now(), mode: wantedMode,
    baseColor:pack.baseColor||"", outlineColor:pack.outlineColor||"", accentColor:pack.accentColor||pack.outlineColor||"",
    defaultUrl: states.default, pointerUrl: states.pointer,
    defaultHotspot: hotspots.default || pack.defaultHotspot || [4,3], pointerHotspot: hotspots.pointer || pack.pointerHotspot || [9,4],
    states, hotspots,
    realStateCount: directlyLoadedStates.size,
    fallbackStateCount: Math.max(0, totalStates - directlyLoadedStates.size)
  };

  cursorCacheWriteQueue = cursorCacheWriteQueue.then(async () => {
    const latest = await chrome.storage.local.get({ [CURSOR_STORAGE_KEY]: {} });
    const all = { ...(latest?.[CURSOR_STORAGE_KEY] || {}), [pack.key]: payload };
    const fullKeys = Object.entries(all)
      .filter(([,value]) => value?.version === api.version && value?.mode === "full")
      .sort((a,b) => Number(b[1]?.cachedAt || 0) - Number(a[1]?.cachedAt || 0))
      .map(([key]) => key);
    for (const oldKey of fullKeys.slice(5)) {
      const value = all[oldKey];
      all[oldKey] = {
        ...value,
        mode:"preview",
        states:{ default:value?.states?.default || value?.defaultUrl, pointer:value?.states?.pointer || value?.pointerUrl },
        hotspots:{ default:value?.hotspots?.default || value?.defaultHotspot || [4,3], pointer:value?.hotspots?.pointer || value?.pointerHotspot || [9,4] },
        realStateCount:2,
        fallbackStateCount:0
      };
    }
    await chrome.storage.local.set({ [CURSOR_STORAGE_KEY]: all });
  }).catch(() => {});
  await cursorCacheWriteQueue;
  return payload;
}

async function fetchFirstCursorSvg(candidates) {
  const list=[...new Set((candidates||[]).filter(Boolean))];
  if(!list.length)throw new Error("No cursor SVG candidate could be loaded.");
  const tasks=list.map((candidate,index)=>(async()=>{
    if(index)await new Promise(resolve=>setTimeout(resolve,180*index));
    return fetchCursorSvg(candidate);
  })());
  try{return await Promise.any(tasks);}
  catch(error){
    const messages=error?.errors?.map?.(item=>String(item?.message||item)).filter(Boolean)||[];
    throw new Error(messages.at(-1)||"No cursor SVG candidate could be loaded.");
  }
}

function isAllowedCursorUrl(url) {
  if (!(url instanceof URL) || url.protocol !== "https:" || !ALLOWED_CURSOR_HOSTS.has(url.hostname.toLowerCase())) return false;
  const host=url.hostname.toLowerCase();
  if (host === "cdn.jsdelivr.net") return url.pathname.startsWith("/gh/ful1e5/");
  if (host === "raw.githubusercontent.com") return url.pathname.startsWith("/ful1e5/");
  return false;
}

function cursorSymlinkTarget(text) {
  const value=String(text||"").trim();
  if (!value || value.length > 280 || /[<>\n\r]/.test(value)) return "";
  return /(?:^|\/)\.?\.?\/?[A-Za-z0-9_.@/+\-]+\.svg$/i.test(value) ? value : "";
}

async function fetchCursorSvg(urlValue, depth = 0, seen = new Set()) {
  if (depth > 4) throw new Error("Cursor SVG symlink chain is too deep.");
  const url = new URL(String(urlValue || ""));
  if (!isAllowedCursorUrl(url)) throw new Error("Cursor CDN URL is not allowed.");
  if (seen.has(url.href)) throw new Error("Cursor SVG symlink loop detected.");
  seen.add(url.href);

  const cache = await caches.open(CURSOR_CACHE_NAME);
  const hit = await cache.match(url.href);
  if (hit?.ok) {
    const cachedText = await hit.text();
    if (/<svg\b/i.test(cachedText)) return cachedText;
    // Older versions could cache an HTML error page or a symlink stub. Never keep
    // non-SVG data under the verified cache name.
    await cache.delete(url.href).catch(() => {});
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 9000);
  let response;
  try {
    response = await fetch(url.href, { cache:"no-cache", signal:controller.signal });
  } finally {
    clearTimeout(timer);
  }
  if (!response?.ok) throw new Error(`Request failed (${response?.status || "network"}) for ${url.href}`);
  const text = await response.text();
  if (/<svg\b/i.test(text)) {
    await cache.put(url.href, new Response(text, {status:200, headers:{"content-type":"image/svg+xml;charset=utf-8"}})).catch(() => {});
    return text;
  }

  // Several cursor repos use real Git symlinks for common cursor names. Raw/CDN
  // endpoints may return the symlink target as plain text instead of following it.
  // Resolve that target safely inside the same allow-listed repository.
  const target = cursorSymlinkTarget(text);
  if (target) {
    const next = new URL(target, url.href);
    if (!isAllowedCursorUrl(next)) throw new Error("Cursor SVG symlink target is outside the allowed source.");
    return fetchCursorSvg(next.href, depth + 1, seen);
  }
  throw new Error("Cursor source did not return SVG data.");
}

function recolorCursorSvg(source, pack) {
  let svg = String(source || "")
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/\son[a-z]+\s*=\s*(["']).*?\1/gi, "");
  if (!pack.preserveSourceColors) {
    svg = svg
      .replace(/#00ff00/gi, String(pack.baseColor || "#000000"))
      .replace(/#0000ff/gi, String(pack.outlineColor || "#ffffff"))
      .replace(/#ff0000/gi, String(pack.watchColor || pack.baseColor || "#000000"));
  }
  svg = svg.replace(/<svg\b([^>]*)>/i, (_, attrs) => {
    const clean = String(attrs || "").replace(/\swidth\s*=\s*(["']).*?\1/gi, "").replace(/\sheight\s*=\s*(["']).*?\1/gi, "");
    return `<svg${clean} width="32" height="32">`;
  });
  return svg;
}

function cursorSvgDataUrl(svg) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

async function mapLimit(items, limit, worker) {
  let cursor = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) await worker(items[cursor++]);
  });
  await Promise.all(runners);
}

function isFontAssetUrl(url) {
  try { return /\.(?:woff2?|ttf|otf)(?:$|[?#])/i.test(new URL(url).href); } catch { return false; }
}

async function cachedFetch(url, cacheName) {
  const request = new Request(url, { method: "GET", credentials: "omit", cache: "no-cache", redirect: "follow" });
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request);
  if (hit?.ok) {
    if (!isFontAssetUrl(url)) return hit.clone();
    try {
      assertValidFontBinary(await hit.clone().arrayBuffer(), url);
      return hit.clone();
    } catch {
      // A CDN can occasionally return an HTML/JS error document with a .woff/.ttf URL.
      // Never keep that payload: otherwise every future tab reproduces the same OTS error.
      try { await cache.delete(request); } catch {}
    }
  }
  const response = await fetch(request);
  if (!response.ok) throw new Error(`Request failed (${response.status}) for ${url}`);
  if (isFontAssetUrl(url)) assertValidFontBinary(await response.clone().arrayBuffer(), url);
  try { await cache.put(request, response.clone()); } catch (error) { console.warn("[FontYar] cache write skipped", error); }
  return response;
}

async function cleanupOldCaches() {
  const keys = await caches.keys();
  await Promise.all(keys.filter((key) =>
    (key.startsWith("fontyar-font-cache-") && key !== FONT_CACHE_NAME) ||
    (key.startsWith("fontyar-ui-font-css-") && key !== UI_FONT_CSS_CACHE_NAME) ||
    (key.startsWith("fontyar-emoji-cache-") && key !== EMOJI_CACHE_NAME) ||
    (key.startsWith("persianyar-cursor-cdn-") && key !== CURSOR_CACHE_NAME)
  ).map((key) => caches.delete(key)));
}

function assertValidFontBinary(buffer, source = "font") {
  const bytes = new Uint8Array(buffer || new ArrayBuffer(0));
  if (bytes.byteLength < 12) throw new Error(`Invalid font payload from ${source}: file is too small.`);
  const sig = String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3]);
  const sfnt = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength).getUint32(0, false);
  const valid = sig === "wOFF" || sig === "wOF2" || sig === "OTTO" || sig === "ttcf" || sig === "true" || sig === "typ1" || sfnt === 0x00010000;
  if (valid) return true;
  const head = new TextDecoder("utf-8", { fatal:false }).decode(bytes.subarray(0, Math.min(bytes.length, 48))).replace(/\s+/g, " ").trim();
  throw new Error(`Invalid font payload from ${source}: unexpected signature ${JSON.stringify(sig)}${head ? ` (${head.slice(0,24)})` : ""}.`);
}

function validateEmojiUrl(url) { const hostname = url.hostname.toLowerCase(); if (!ALLOWED_EMOJI_HOSTS.has(hostname)) throw new Error(`Emoji host is not allowed: ${hostname}`); }
function isAllowedFontHost(hostname) { const h = hostname.toLowerCase(); return ALLOWED_FONT_HOSTS.has(h) || h.endsWith(".fontcdn.ir") || h.endsWith(".gstatic.com"); }
function isRegularWeight(weight) { const value = String(weight).trim().toLowerCase(); return value === "normal" || value === "400" || value.includes("100 900") || value.includes("100 1000"); }
function readDeclaration(block, property) { const escaped = property.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); const m = block.match(new RegExp(`${escaped}\\s*:\\s*([^;}]*)`, "i")); return m?.[1]?.trim() || ""; }
function safeDescriptor(value) { return String(value || "").replace(/[{};]/g, "").replace(/\s+/g, " ").trim(); }
function escapeCss(value) { return String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"'); }
function normalizeAssetMime(contentType, path) { const v = String(contentType || "").split(";")[0].trim().toLowerCase(); if (v.startsWith("font/") || v === "image/svg+xml") return v; if (/\.woff2(?:$|\?)/i.test(path)) return "font/woff2"; if (/\.woff(?:$|\?)/i.test(path)) return "font/woff"; if (/\.ttf(?:$|\?)/i.test(path)) return "font/ttf"; if (/\.otf(?:$|\?)/i.test(path)) return "font/otf"; if (/\.svg(?:$|\?)/i.test(path)) return "image/svg+xml"; return "application/octet-stream"; }
function formatForMime(mime) { if (mime.includes("woff2")) return "woff2"; if (mime.includes("woff")) return "woff"; if (mime.includes("ttf")) return "truetype"; if (mime.includes("otf")) return "opentype"; return "woff2"; }
function arrayBufferToBase64(buffer) { const bytes = new Uint8Array(buffer); const size = 0x8000; let binary = ""; for (let i = 0; i < bytes.length; i += size) binary += String.fromCharCode(...bytes.subarray(i, i + size)); return btoa(binary); }
