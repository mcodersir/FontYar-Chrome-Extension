(() => {
  const prev = globalThis.__FONTYAR_LOCALIZATION_FA__;
  if (!prev) return;

  const normalize = prev.normalize || (value => String(value || "")
    .replace(/[\u00A0\u202F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[：:]$/, "")
    .toLocaleLowerCase("en-US"));

  const commonSource = {
    "Something went wrong.": "مشکلی پیش آمد.",
    "Something went wrong": "مشکلی پیش آمد",
    "Something went wrong. Try reloading.": "مشکلی پیش آمد. دوباره بارگذاری کنید.",
    "Something went wrong. Try reloading": "مشکلی پیش آمد. دوباره بارگذاری کنید.",
    "Something went wrong, try reloading.": "مشکلی پیش آمد. دوباره بارگذاری کنید.",
    "Something went wrong, try reloading": "مشکلی پیش آمد. دوباره بارگذاری کنید.",
    "Something went wrong. Try again.": "مشکلی پیش آمد. دوباره تلاش کنید.",
    "Something went wrong. Try again": "مشکلی پیش آمد. دوباره تلاش کنید.",
    "Try reloading.": "دوباره بارگذاری کنید.",
    "Try reloading": "دوباره بارگذاری کنید",
    "Reload page": "بارگذاری دوباره صفحه",
    "Reload the page": "صفحه را دوباره بارگذاری کنید",
    "Refresh the page": "صفحه را تازه سازی کنید",
    "An error occurred": "خطایی رخ داد",
    "An error occurred. Try again.": "خطایی رخ داد. دوباره تلاش کنید.",
    "We couldn't load this": "نتوانستیم این بخش را بارگذاری کنیم",
    "We couldn't load this. Try again.": "نتوانستیم این بخش را بارگذاری کنیم. دوباره تلاش کنید.",
    "Unable to load": "بارگذاری انجام نشد",
    "Failed to load": "بارگذاری ناموفق بود",
    "Please try again later": "لطفا بعدا دوباره تلاش کنید",
    "No internet connection": "اتصال اینترنت برقرار نیست",
    "Connection lost": "اتصال قطع شد",
    "Retry": "تلاش دوباره",
    "Reload": "بارگذاری دوباره"
  };

  const xSource = {
    "Subscribe to Premium": "اشتراک پریمیوم را فعال کنید",
    "Subscribe to Premium to unlock new features and if eligible, receive a share of revenue.": "برای باز کردن قابلیت های جدید، پریمیوم را فعال کنید و در صورت واجد شرایط بودن سهمی از درآمد دریافت کنید.",
    "Get rid of ads, see your analytics, boost your replies and unlock 20+ features.": "تبلیغات را حذف کنید، آمار خود را ببینید، پاسخ هایتان را تقویت کنید و بیش از ۲۰ قابلیت را فعال کنید.",
    "Something went wrong.": "مشکلی پیش آمد.",
    "Something went wrong": "مشکلی پیش آمد",
    "Something went wrong. Try reloading.": "مشکلی پیش آمد. دوباره بارگذاری کنید.",
    "Something went wrong. Try again.": "مشکلی پیش آمد. دوباره تلاش کنید.",
    "Posts aren't loading right now": "پست ها در حال حاضر بارگذاری نمی شوند",
    "Cannot retrieve posts at this time": "در حال حاضر دریافت پست ها ممکن نیست"
  };

  const toNormalizedMap = source => {
    const out = Object.create(null);
    for (const [key, value] of Object.entries(source)) out[normalize(key)] = value;
    return out;
  };
  const common = toNormalizedMap(commonSource);
  const xExact = toNormalizedMap(xSource);
  const isX = host => {
    const h = String(host || "").toLowerCase();
    return h === "x.com" || h.endsWith(".x.com") || h === "twitter.com" || h.endsWith(".twitter.com");
  };

  const prevLookup = typeof prev.lookup === "function" ? prev.lookup.bind(prev) : (() => "");
  const prevDynamic = typeof prev.lookupDynamic === "function" ? prev.lookupDynamic.bind(prev) : (() => "");

  function directLookup(host, text) {
    const key = normalize(text);
    if (!key) return "";
    if (isX(host) && Object.prototype.hasOwnProperty.call(xExact, key)) return xExact[key];
    if (Object.prototype.hasOwnProperty.call(common, key)) return common[key];
    return prevLookup(host, text) || "";
  }

  function splitSentences(text) {
    const raw = String(text || "").replace(/\r/g, "").trim();
    if (!raw || raw.length > 260) return [];
    const parts = [];
    let buffer = "";
    for (let i = 0; i < raw.length; i++) {
      const ch = raw[i];
      buffer += ch;
      if ((ch === "." || ch === "!" || ch === "?") && (i === raw.length - 1 || /\s/.test(raw[i + 1]))) {
        if (buffer.trim()) parts.push(buffer.trim());
        buffer = "";
      } else if (ch === "\n") {
        if (buffer.trim()) parts.push(buffer.trim());
        buffer = "";
      }
    }
    if (buffer.trim()) parts.push(buffer.trim());
    return parts.filter(Boolean);
  }

  function compositeLookup(host, text) {
    const parts = splitSentences(text);
    if (parts.length < 2 || parts.length > 4) return "";
    const translated = [];
    for (const part of parts) {
      const bare = part.replace(/[.!?]+$/g, "").trim();
      const hit = directLookup(host, part) || directLookup(host, bare) || prevDynamic(host, bare) || "";
      if (!hit) return "";
      translated.push(hit.replace(/\s+/g, " ").trim());
    }
    return translated.join(" ");
  }

  function lookupDynamic(host, text) {
    const prior = prevDynamic(host, text);
    if (prior) return prior;
    const raw = String(text || "").trim();
    if (!raw || raw.length > 260) return "";
    if (/^something went wrong[,.]?\s*try (?:reloading|again)\.?$/i.test(raw)) {
      return /reload/i.test(raw) ? "مشکلی پیش آمد. دوباره بارگذاری کنید." : "مشکلی پیش آمد. دوباره تلاش کنید.";
    }
    if (/^try reloading\.?$/i.test(raw)) return "دوباره بارگذاری کنید.";
    return "";
  }

  function lookup(host, text) {
    return directLookup(host, text) || lookupDynamic(host, text) || compositeLookup(host, text) || "";
  }

  function isKnownUiPhrase(host, text) {
    const raw = String(text || "").trim();
    if (!raw || raw.length > 260) return false;
    return !!lookup(host, raw);
  }

  const packs = Object.assign({}, prev.packs || {});
  if (packs["x.com"] || packs["twitter.com"]) {
    const xPack = Object.assign({}, packs["x.com"] || packs["twitter.com"] || {}, xExact);
    packs["x.com"] = xPack;
    packs["twitter.com"] = xPack;
  }
  const general = Object.assign({}, prev.general || {}, common);

  globalThis.__FONTYAR_LOCALIZATION_FA__ = Object.freeze({
    ...prev,
    general,
    packs,
    lookup,
    lookupDynamic,
    isKnownUiPhrase,
    count: Number(prev.count || 0) + Object.keys(common).length + Object.keys(xExact).length,
    qualityRevision: "2026-09-19-rtl-localization-v1"
  });
})();
