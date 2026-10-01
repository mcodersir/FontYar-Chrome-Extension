/*
 * PersianYar embedded Dark Reader Dynamic color core adapter.
 * Derived from Dark Reader v4.9.130 color transformation logic.
 * Dark Reader: https://github.com/darkreader/darkreader
 * Copyright (c) 2014-present Alexander Shutau and Dark Reader contributors.
 * Licensed under the MIT License. See ../licenses/DARK_READER_LICENSE.txt.
 *
 * This file intentionally vendors only the MIT-licensed color/gradient transformation core,
 * under a PersianYar-specific namespace. Dark Reader logos/design assets are not included.
 */
(() => {
  "use strict";
  if (globalThis.__PERSIANYAR_DARKREADER_CORE__) return;

  const clamp = (x, min = 0, max = 1) => Math.min(max, Math.max(min, x));
  const scale = (x, inLow, inHigh, outLow, outHigh) => {
    if (inHigh === inLow) return outLow;
    return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
  };
  const round = x => Math.round(clamp(x, 0, 255));

  function parseHex(value) {
    const raw = String(value || "").trim().replace(/^#/, "");
    if (![3, 4, 6, 8].includes(raw.length) || !/^[0-9a-f]+$/i.test(raw)) return null;
    const exp = raw.length <= 4 ? raw.split("").map(c => c + c).join("") : raw;
    const r = parseInt(exp.slice(0, 2), 16), g = parseInt(exp.slice(2, 4), 16), b = parseInt(exp.slice(4, 6), 16);
    const a = exp.length === 8 ? parseInt(exp.slice(6, 8), 16) / 255 : 1;
    return [r, g, b, a];
  }

  function parseRgb(value) {
    if (Array.isArray(value) && value.length >= 3) return [Number(value[0]), Number(value[1]), Number(value[2]), value[3] == null ? 1 : Number(value[3])];
    const raw = String(value || "").trim();
    if (raw.startsWith("#")) return parseHex(raw);
    const m = raw.match(/^rgba?\(([^)]+)\)$/i);
    if (!m) return null;
    const parts = m[1].replace(/\//g, " ").split(/[\s,]+/).filter(Boolean);
    if (parts.length < 3) return null;
    const ch = v => String(v).endsWith("%") ? parseFloat(v) * 2.55 : Number(v);
    const r = ch(parts[0]), g = ch(parts[1]), b = ch(parts[2]);
    if (![r, g, b].every(Number.isFinite)) return null;
    let a = 1;
    if (parts[3] != null) a = String(parts[3]).endsWith("%") ? parseFloat(parts[3]) / 100 : Number(parts[3]);
    if (!Number.isFinite(a)) a = 1;
    return [clamp(r, 0, 255), clamp(g, 0, 255), clamp(b, 0, 255), clamp(a, 0, 1)];
  }

  function rgbToHSL(rgb) {
    const r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
    let h = 0;
    if (d !== 0) {
      if (max === r) h = ((g - b) / d) % 6;
      else if (max === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h = (h * 60 + 360) % 360;
    }
    const l = (max + min) / 2;
    const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
    return {h, s: clamp(s), l: clamp(l), a: rgb[3] == null ? 1 : clamp(rgb[3])};
  }

  function hslToRGB({h, s, l, a = 1}) {
    h = ((h % 360) + 360) % 360; s = clamp(s); l = clamp(l);
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;
    if (h < 60) [r,g,b] = [c,x,0];
    else if (h < 120) [r,g,b] = [x,c,0];
    else if (h < 180) [r,g,b] = [0,c,x];
    else if (h < 240) [r,g,b] = [0,x,c];
    else if (h < 300) [r,g,b] = [x,0,c];
    else [r,g,b] = [c,0,x];
    return [round((r + m) * 255), round((g + m) * 255), round((b + m) * 255), clamp(a)];
  }

  function toCSS(rgb) {
    if (!rgb) return "";
    const r = round(rgb[0]), g = round(rgb[1]), b = round(rgb[2]), a = rgb[3] == null ? 1 : clamp(rgb[3]);
    return a >= 0.999 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${Math.round(a * 1000) / 1000})`;
  }

  const DEFAULT_THEME = Object.freeze({
    mode: 1,
    brightness: 100,
    contrast: 100,
    grayscale: 0,
    sepia: 0,
    darkSchemeBackgroundColor: "#181a1b",
    darkSchemeTextColor: "#e8e6e3",
    lightSchemeBackgroundColor: "#dcdad7",
    lightSchemeTextColor: "#181a1b"
  });

  function normalizeTheme(theme = {}) {
    return {...DEFAULT_THEME, ...theme, mode: theme.mode === 0 ? 0 : 1};
  }

  const poleCache = new Map();
  function getPole(value) {
    const key = String(value || "");
    if (poleCache.has(key)) return poleCache.get(key);
    const rgb = parseRgb(key) || [24, 26, 27, 1];
    const hsl = rgbToHSL(rgb);
    poleCache.set(key, hsl);
    return hsl;
  }

  // Dark Reader v4.9.130 Dynamic Theme core mapping.
  const MAX_BG_LIGHTNESS = 0.4;
  function modifyBgHSL({h, s, l, a}, pole) {
    const isDark = l < 0.5;
    const isBlue = h > 200 && h < 280;
    const isNeutral = s < 0.12 || (l > 0.8 && isBlue);
    if (isDark) {
      const lx = scale(l, 0, 0.5, 0, MAX_BG_LIGHTNESS);
      if (isNeutral) return {h: pole.h, s: pole.s, l: lx, a};
      return {h, s, l: lx, a};
    }
    let lx = scale(l, 0.5, 1, MAX_BG_LIGHTNESS, pole.l);
    if (isNeutral) return {h: pole.h, s: pole.s, l: lx, a};
    let hx = h;
    const isYellow = h > 60 && h < 180;
    if (isYellow) hx = h > 120 ? scale(h, 120, 180, 135, 180) : scale(h, 60, 120, 60, 105);
    if (hx > 40 && hx < 80) lx *= 0.75;
    return {h: hx, s, l: lx, a};
  }

  const MIN_FG_LIGHTNESS = 0.55;
  const modifyBlueFgHue = hue => scale(hue, 205, 245, 205, 220);
  function modifyFgHSL({h, s, l, a}, pole) {
    const isLight = l > 0.5;
    const isNeutral = l < 0.2 || s < 0.24;
    const isBlue = !isNeutral && h > 205 && h < 245;
    if (isLight) {
      const lx = scale(l, 0.5, 1, MIN_FG_LIGHTNESS, pole.l);
      if (isNeutral) return {h: pole.h, s: pole.s, l: lx, a};
      return {h: isBlue ? modifyBlueFgHue(h) : h, s, l: lx, a};
    }
    if (isNeutral) return {h: pole.h, s: pole.s, l: scale(l, 0, 0.5, pole.l, MIN_FG_LIGHTNESS), a};
    const hx = isBlue ? modifyBlueFgHue(h) : h;
    const lx = isBlue
      ? scale(l, 0, 0.5, pole.l, Math.min(1, MIN_FG_LIGHTNESS + 0.05))
      : scale(l, 0, 0.5, pole.l, MIN_FG_LIGHTNESS);
    return {h: hx, s, l: lx, a};
  }

  function modifyBorderHSL({h, s, l, a}, poleFg, poleBg) {
    const isDark = l < 0.5;
    const isNeutral = l < 0.2 || s < 0.24;
    let hx = h, sx = s;
    if (isNeutral) {
      if (isDark) { hx = poleFg.h; sx = poleFg.s; }
      else { hx = poleBg.h; sx = poleBg.s; }
    }
    return {h: hx, s: sx, l: scale(l, 0, 1, 0.5, 0.2), a};
  }

  // PersianYar uses Dark Reader's default 100/100/0/0 filter. Keep the hook so future controls can
  // tune brightness/contrast without changing the API. For non-default values, apply a lightweight
  // post transform rather than pulling the whole upstream matrix implementation into the page.
  function postFilter(rgb, theme) {
    let [r,g,b,a] = rgb;
    const brightness = Math.max(0, Number(theme.brightness ?? 100)) / 100;
    const contrast = Math.max(0, Number(theme.contrast ?? 100)) / 100;
    const gray = clamp(Number(theme.grayscale ?? 0) / 100);
    const sepia = clamp(Number(theme.sepia ?? 0) / 100);
    r *= brightness; g *= brightness; b *= brightness;
    r = (r - 127.5) * contrast + 127.5; g = (g - 127.5) * contrast + 127.5; b = (b - 127.5) * contrast + 127.5;
    if (gray > 0) {
      const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
      r += (y-r)*gray; g += (y-g)*gray; b += (y-b)*gray;
    }
    if (sepia > 0) {
      const nr = r*.393 + g*.769 + b*.189;
      const ng = r*.349 + g*.686 + b*.168;
      const nb = r*.272 + g*.534 + b*.131;
      r += (nr-r)*sepia; g += (ng-g)*sepia; b += (nb-b)*sepia;
    }
    return [round(r),round(g),round(b),a];
  }

  const bgCache = new Map(), fgCache = new Map(), borderCache = new Map();
  function keyFor(rgb, theme, type) {
    return `${type}|${rgb.map((x,i)=>i===3?Math.round(x*1000):Math.round(x)).join(",")}|${theme.mode}|${theme.brightness}|${theme.contrast}|${theme.grayscale}|${theme.sepia}|${theme.darkSchemeBackgroundColor}|${theme.darkSchemeTextColor}`;
  }
  function modify(rgb, theme, type) {
    if (!rgb || rgb[3] < 0.008) return rgb;
    theme = normalizeTheme(theme);
    const cache = type === "background" ? bgCache : type === "text" ? fgCache : borderCache;
    const key = keyFor(rgb, theme, type);
    if (cache.has(key)) return cache.get(key).slice();
    const hsl = rgbToHSL(rgb);
    const bgPole = getPole(theme.mode === 1 ? theme.darkSchemeBackgroundColor : theme.lightSchemeBackgroundColor);
    const fgPole = getPole(theme.mode === 1 ? theme.darkSchemeTextColor : theme.lightSchemeTextColor);
    let mapped;
    if (theme.mode !== 1) mapped = hsl;
    else if (type === "background") mapped = modifyBgHSL(hsl, bgPole);
    else if (type === "text") mapped = modifyFgHSL(hsl, fgPole);
    else mapped = modifyBorderHSL(hsl, fgPole, bgPole);
    const out = postFilter(hslToRGB(mapped), theme);
    cache.set(key, out);
    return out.slice();
  }

  function modifyBackground(rgb, theme) { return modify(rgb, theme, "background"); }
  function modifyForeground(rgb, theme) { return modify(rgb, theme, "text"); }
  function modifyBorder(rgb, theme) { return modify(rgb, theme, "border"); }

  const colorToken = /rgba?\([^)]*\)|#[0-9a-f]{3,8}\b/gi;
  function modifyGradient(value, theme) {
    const raw = String(value || "");
    if (!/gradient\(/i.test(raw)) return raw;
    return raw.replace(colorToken, token => {
      const rgb = parseRgb(token);
      return rgb ? toCSS(modifyBackground(rgb, theme)) : token;
    });
  }
  function modifyShadow(value, theme) {
    const raw = String(value || "");
    if (!raw || raw === "none") return raw;
    return raw.replace(colorToken, token => {
      const rgb = parseRgb(token);
      return rgb ? toCSS(modifyBackground(rgb, theme)) : token;
    });
  }

  function clearCaches() { bgCache.clear(); fgCache.clear(); borderCache.clear(); poleCache.clear(); }

  globalThis.__PERSIANYAR_DARKREADER_CORE__ = Object.freeze({
    version: "4.9.130-adapter",
    upstream: "https://github.com/darkreader/darkreader",
    defaultTheme: DEFAULT_THEME,
    normalizeTheme,
    parseRgb,
    rgbToHSL,
    hslToRGB,
    toCSS,
    modifyBackground,
    modifyForeground,
    modifyBorder,
    modifyGradient,
    modifyShadow,
    clearCaches
  });
})();
