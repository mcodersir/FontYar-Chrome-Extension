const TEXT = {
  fa: {
    manageExtension:"مدیریت افزونه",system:"سیستم",light:"روشن",dark:"تیره",
    heroTitle:"فونت، ایموجی و بومی سازی هر سایت، دقیقا همان طور که می خواهی.",
    heroBody:"تنظیمات هر دامنه مستقل ذخیره می شود؛ فونت هر زبان، اندازه متن، اعداد، ایموجی و ابزارهای فارسی سازی جداگانه قابل کنترل هستند.",
    sourceBody:"فونت و ایموجی پس از اولین دریافت از کش محلی خوانده می شوند",savedSites:"سایت های ذخیره شده",searchSites:"جستجو در دامنه ها",
    emptyTitle:"هنوز سایتی ذخیره نشده",emptyBody:"از پنجره افزونه روی سایت دلخواه، PersianYar را فعال کن.",iconProtection:"محافظت از آیکون ها",
    iconProtectionBody:"آیکون فونت ها، SVGها، ادیتورهای کد و کنترل های حساس از تغییر فونت مستثنی می شوند.",multiFonts:"فونت چندزبانه",
    multiFontsBody:"برای فارسی، انگلیسی، عربی و چینی می توانی فونت متفاوت انتخاب کنی.",emojiPacks:"پک های ایموجی",
    emojiPacksBody:"Android، Windows، Apple-compatible، Twemoji، Fluent، OpenMoji، Blobmoji و مدل های بیشتر با کش محلی.",localization:"بومی سازی آزمایشی",
    localizationBody:"دیتابیس آفلاین عبارت های رابط سایت های معروف فقط روی تطبیق دقیق اجرا می شود.",sites:"سایت",font:"فونت",emoji:"ایموجی",
    enabled:"فعال",disabled:"خاموش",paused:"مکث",delete:"حذف شد",backupTitle:"پشتیبان گیری از تنظیمات",
    backupBody:"همه تنظیمات سایت ها را در یک فایل JSON ذخیره کن یا نسخه قبلی را با تنظیمات فعلی ادغام کن.",exportBackup:"خروجی پشتیبان",
    importBackup:"وارد کردن و ادغام",exportDone:"فایل پشتیبان ساخته شد",importDone:"پشتیبان با تنظیمات فعلی ادغام شد",importError:"فایل پشتیبان معتبر نیست یا حجم تنظیمات بیش از حد مجاز است"
  },
  en: {
    manageExtension:"Extension manager",system:"System",light:"Light",dark:"Dark",heroTitle:"Fonts, emoji and localization for every site — your way.",
    heroBody:"Each domain keeps independent settings for per-language fonts, text size, digits, emoji and Persian tooling.",sourceBody:"Fonts and emoji are read from local cache after the first download",
    savedSites:"Saved sites",searchSites:"Search domains",emptyTitle:"No saved sites yet",emptyBody:"Open PersianYar on a website and enable it to save settings.",
    iconProtection:"Icon protection",iconProtectionBody:"Icon fonts, SVG, code editors and sensitive controls are excluded from font overrides.",multiFonts:"Multilingual fonts",
    multiFontsBody:"Choose different fonts for Persian, English, Arabic and Chinese.",emojiPacks:"Emoji packs",emojiPacksBody:"Android, Windows, Apple-compatible, Twemoji, Fluent, OpenMoji, Blobmoji and more with local caching.",
    localization:"Experimental localization",localizationBody:"The offline UI phrase database only changes exact known matches on supported sites.",sites:"sites",font:"Font",emoji:"Emoji",enabled:"Enabled",disabled:"Off",paused:"Paused",delete:"Deleted",
    backupTitle:"Settings backup",backupBody:"Export all site settings to JSON or merge a previous backup into the current configuration.",exportBackup:"Export backup",importBackup:"Import & merge",exportDone:"Backup file created",importDone:"Backup merged with current settings",importError:"The backup is invalid or the synced settings are too large"
  },
  ar: {
    manageExtension:"إدارة الإضافة",system:"النظام",light:"فاتح",dark:"داكن",heroTitle:"الخطوط والإيموجي والتوطين لكل موقع كما تريد.",
    heroBody:"يحتفظ كل نطاق بإعداداته المستقلة للخطوط حسب اللغة وحجم النص والأرقام والإيموجي وأدوات الفارسية.",sourceBody:"بعد التنزيل الأول يتم استخدام التخزين المحلي للخطوط والإيموجي",savedSites:"المواقع المحفوظة",searchSites:"بحث في النطاقات",
    emptyTitle:"لا توجد مواقع محفوظة",emptyBody:"افتح PersianYar على أي موقع وفعله لحفظ الإعدادات.",iconProtection:"حماية الأيقونات",iconProtectionBody:"خطوط الأيقونات وSVG ومحررات الكود والعناصر الحساسة مستثناة.",
    multiFonts:"خطوط متعددة اللغات",multiFontsBody:"اختر خطا مختلفا للفارسية والإنجليزية والعربية والصينية.",emojiPacks:"حزم الإيموجي",emojiPacksBody:"Android وWindows وApple-compatible وTwemoji وFluent وOpenMoji وBlobmoji والمزيد مع التخزين المحلي.",
    localization:"توطين تجريبي",localizationBody:"قاعدة العبارات المحلية تغيّر فقط المطابقات المعروفة بدقة.",sites:"مواقع",font:"الخط",emoji:"إيموجي",enabled:"مفعل",disabled:"متوقف",paused:"موقوف مؤقتا",delete:"تم الحذف",
    backupTitle:"نسخة احتياطية للإعدادات",backupBody:"صدّر إعدادات المواقع إلى JSON أو ادمج نسخة احتياطية سابقة مع الإعدادات الحالية.",exportBackup:"تصدير النسخة",importBackup:"استيراد ودمج",exportDone:"تم إنشاء النسخة الاحتياطية",importDone:"تم دمج النسخة الاحتياطية",importError:"ملف النسخة غير صالح أو حجم الإعدادات كبير جدا"
  },
  zh: {
    manageExtension:"扩展管理",system:"系统",light:"浅色",dark:"深色",heroTitle:"为每个网站自定义字体、表情和本地化。",heroBody:"每个域名单独保存按语言字体、字号、数字、表情和波斯语工具设置。",
    sourceBody:"字体和表情首次下载后从本地缓存读取",savedSites:"已保存的网站",searchSites:"搜索域名",emptyTitle:"还没有保存的网站",emptyBody:"在网站上打开 PersianYar 并启用即可保存设置。",iconProtection:"图标保护",iconProtectionBody:"图标字体、SVG、代码编辑器和敏感控件不会被覆盖。",
    multiFonts:"多语言字体",multiFontsBody:"可分别为波斯语、英语、阿拉伯语和中文选择字体。",emojiPacks:"表情包",emojiPacksBody:"Android、Windows、Apple-compatible、Twemoji、Fluent、OpenMoji、Blobmoji 等，支持本地缓存。",localization:"实验性本地化",localizationBody:"离线界面短语数据库只替换支持网站上的精确已知匹配。",
    sites:"个网站",font:"字体",emoji:"表情",enabled:"已启用",disabled:"关闭",paused:"已暂停",delete:"已删除",backupTitle:"设置备份",backupBody:"将所有网站设置导出为 JSON，或把旧备份合并到当前设置中。",exportBackup:"导出备份",importBackup:"导入并合并",exportDone:"备份文件已创建",importDone:"备份已合并",importError:"备份文件无效或同步设置过大"
  }
};

let sites = {};
let locale = "fa";
let uiTheme = "system";
let uiFontSize = 13;

const $ = (id) => document.getElementById(id);
const els = {
  themeSwitcher: $("themeSwitcher"), localeMini: $("localeMini"), search: $("search"), siteList: $("siteList"), empty: $("empty"),
  countText: $("countText"), toast: $("toast"), exportSettings: $("exportSettings"), importSettings: $("importSettings"), importFile: $("importFile"), runtimeVersion: $("runtimeVersion"), heroVersion: $("heroVersion")
};

init().catch((error) => console.error("[PersianYar] options init failed", error));
void loadUiFont();

async function loadUiFont() {
  try {
    const response = await chrome.runtime.sendMessage({type:"fontyar:get-ui-font",fontKey:"Vazirmatn"});
    if (!response?.ok || !response.css) return;
    let style = document.getElementById("__persianyar_ui_font");
    if (!style) {
      style = document.createElement("style");
      style.id = "__persianyar_ui_font";
    }
    style.textContent = response.css;
    document.head.append(style);
    document.documentElement.style.setProperty("--py-ui-font", `"${response.family || "Vazirmatn"}"`);
  } catch (error) {
    console.debug("[PersianYar] options font unavailable", String(error?.message || error));
  }
}

async function init() {
  const store = globalThis.__PERSIANYAR_SITE_STORE__;
  await store?.migrateLegacy?.().catch(()=>null);
  const [data, storedSites] = await Promise.all([
    chrome.storage.sync.get({uiTheme:"system",uiLanguage:"fa",uiFontSize:13}),
    store?.getAll?.() || Promise.resolve({})
  ]);
  sites = isPlainObject(storedSites) ? storedSites : {};
  locale = validLocale(data.uiLanguage);
  uiTheme = validTheme(data.uiTheme);
  uiFontSize = clamp(data.uiFontSize, 11, 18, 13);
  const manifest = chrome.runtime.getManifest();
  const displayVersion = String(manifest.version_name || manifest.version || "1").split(/\s+/)[0];
  if (els.runtimeVersion) els.runtimeVersion.textContent = `v${displayVersion}`;
  if (els.heroVersion) els.heroVersion.textContent = displayVersion;
  applyLocale();
  applyTheme(uiTheme);
  render();

  els.themeSwitcher.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-theme-value]");
    if (!button) return;
    uiTheme = validTheme(button.dataset.themeValue);
    applyTheme(uiTheme);
    await chrome.storage.sync.set({uiTheme});
  });

  els.localeMini.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-locale]");
    if (!button) return;
    locale = validLocale(button.dataset.locale);
    applyLocale();
    render();
    await chrome.storage.sync.set({uiLanguage: locale});
  });

  els.search.addEventListener("input", render);
  els.siteList.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-delete-host]");
    if (!button) return;
    const deleteHost = button.dataset.deleteHost;
    delete sites[deleteHost];
    await globalThis.__PERSIANYAR_SITE_STORE__?.removeHost?.(deleteHost);
    render();
    toast(t("delete"));
  });

  els.exportSettings.addEventListener("click", exportBackup);
  els.importSettings.addEventListener("click", () => els.importFile.click());
  els.importFile.addEventListener("change", importBackup);

  globalThis.__PERSIANYAR_SITE_STORE__?.onChanged(async () => {
    sites = await globalThis.__PERSIANYAR_SITE_STORE__.getAll();
    render();
  });
}

function t(key) { return TEXT[locale]?.[key] || TEXT.fa[key] || key; }
function validTheme(value) { return ["system","light","dark"].includes(value) ? value : "system"; }
function validLocale(value) { return ["fa","en","ar","zh"].includes(value) ? value : "fa"; }
function clamp(value,min,max,fallback){const n=Number(value);return Number.isFinite(n)?Math.min(max,Math.max(min,n)):fallback;}
function isPlainObject(value) { return !!value && typeof value === "object" && !Array.isArray(value); }

function applyTheme(value) {
  const theme = validTheme(value);
  document.documentElement.dataset.theme = theme;
  els.themeSwitcher.querySelectorAll("[data-theme-value]").forEach((button) => button.classList.toggle("active", button.dataset.themeValue === theme));
}

function applyLocale() {
  document.documentElement.lang = locale;
  document.documentElement.dir = ["fa","ar"].includes(locale) ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = t(element.dataset.i18n);
    if (value) element.textContent = value;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => { element.placeholder = t(element.dataset.i18nPlaceholder); });
  els.localeMini.querySelectorAll("[data-locale]").forEach((button) => button.classList.toggle("active", button.dataset.locale === locale));
}

function siteHasRuntimeFeatures(config) {
  if (!config || config.paused) return false;
  return !!(
    config.enabled || config.emojiEnabled || Number(config.fontDelta || 0) !== 0 || Number(config.digitFontDelta || 0) !== 0 ||
    (config.digitMode && config.digitMode !== "preserve") || (config.zwnjMode && config.zwnjMode !== "preserve") ||
    config.bidiRepair || config.rtlBeta || config.layoutEnhance || config.localizeEnabled || config.cursorEnabled ||
    config.softMotionEnabled || config.softCorners || config.uniformCornersEnabled || config.removeShadows || config.smoothScrollEnabled ||
    config.smartDarkMode || config.liquidGlassMode || config.linearStyleMode || config.adaptiveMenusMode || config.focusEnhanceMode || config.polishedInputsMode
  );
}

function render() {
  const query = els.search.value.trim().toLowerCase();
  const rows = Object.entries(sites).filter(([host]) => host.toLowerCase().includes(query)).sort(([a],[b]) => a.localeCompare(b));
  els.countText.textContent = `${Object.keys(sites).length} ${t("sites")}`;
  els.empty.classList.toggle("hidden", rows.length !== 0);
  els.siteList.innerHTML = rows.map(([host,config]) => row(host,config)).join("");
}

function row(host, config = {}) {
  const fonts = config.fonts || {fa: config.fontKey || "Vazirmatn"};
  const font = config.unifiedFontEnabled ? (config.allFontKey || config.fontKey || "Vazirmatn") : (fonts.fa || "Vazirmatn");
  const emoji = config.emojiEnabled ? (config.emojiStyle || "twemoji") : t("disabled");
  const paused = !!config.paused;
  const active = siteHasRuntimeFeatures(config);
  const statusClass = paused ? "paused" : (active ? "on" : "");
  const statusText = paused ? t("paused") : (active ? t("enabled") : t("disabled"));
  return `<article class="site-row"><div class="site-main"><div class="site-icon"><svg class="icon"><use href="icons/sprite.svg#globe"/></svg></div><div class="site-copy"><b>${esc(host)}</b><span>${config.includeSubdomains?"+ subdomains":esc(host)}</span></div></div><div class="meta"><span>${t("font")}</span><b>${esc(font)}</b></div><div class="meta"><span>${t("emoji")}</span><b>${esc(emoji)}</b></div><div class="status-pill ${statusClass}">${esc(statusText)}</div><button class="icon-button delete-site" data-delete-host="${esc(host)}" aria-label="delete"><svg class="icon sm"><use href="icons/sprite.svg#trash"/></svg></button></article>`;
}

async function exportBackup() {
  const [data, storedSites] = await Promise.all([
    chrome.storage.sync.get({uiTheme:"system",uiLanguage:"fa",uiFontSize:13}),
    globalThis.__PERSIANYAR_SITE_STORE__?.getAll?.() || Promise.resolve({})
  ]);
  const payload = {
    format: "PersianYar Backup",
    schemaVersion: 1,
    extensionVersion: chrome.runtime.getManifest().version,
    exportedAt: new Date().toISOString(),
    data: {
      sites: isPlainObject(storedSites) ? storedSites : {},
      uiTheme: validTheme(data.uiTheme),
      uiLanguage: validLocale(data.uiLanguage),
      uiFontSize: clamp(data.uiFontSize,11,18,13)
    }
  };
  const blob = new Blob([JSON.stringify(payload,null,2)], {type:"application/json"});
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `PersianYar-backup-${new Date().toISOString().slice(0,10)}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1200);
  toast(t("exportDone"));
}

async function importBackup() {
  const file = els.importFile.files?.[0];
  els.importFile.value = "";
  if (!file) return;
  try {
    if (file.size > 1024 * 1024) throw new Error("Backup too large");
    const parsed = JSON.parse(await file.text());
    const payload = isPlainObject(parsed?.data) ? parsed.data : parsed;
    if (!isPlainObject(payload) || !isPlainObject(payload.sites)) throw new Error("Invalid backup");
    const importedSites = sanitizeImportedSites(payload.sites);
    const mergedSites = {...sites, ...importedSites};
    const write = {};
    if (["system","light","dark"].includes(payload.uiTheme)) write.uiTheme = payload.uiTheme;
    if (["fa","en","ar","zh"].includes(payload.uiLanguage)) write.uiLanguage = payload.uiLanguage;
    if (Number.isFinite(Number(payload.uiFontSize))) write.uiFontSize = clamp(payload.uiFontSize,11,18,13);
    await globalThis.__PERSIANYAR_SITE_STORE__?.saveMany?.(mergedSites);
    if (Object.keys(write).length) await chrome.storage.sync.set(write);
    sites = mergedSites;
    if (write.uiTheme) { uiTheme = write.uiTheme; applyTheme(uiTheme); }
    if (write.uiLanguage) { locale = write.uiLanguage; applyLocale(); }
    if (write.uiFontSize) uiFontSize = write.uiFontSize;
    render();
    toast(t("importDone"));
  } catch (error) {
    console.warn("[PersianYar] backup import failed", error);
    toast(t("importError"), 2600);
  }
}

function sanitizeImportedSites(rawSites) {
  const result = {};
  let count = 0;
  for (const [host, config] of Object.entries(rawSites)) {
    if (++count > 2000) throw new Error("Too many site entries");
    const key = String(host || "").trim().toLowerCase();
    if (!key || key.length > 253 || /[\\s\\/]/.test(key) || ["__proto__","prototype","constructor"].includes(key)) continue;
    if (!isPlainObject(config)) continue;
    result[key] = JSON.parse(JSON.stringify(config));
  }
  return result;
}

function esc(value) {
  return String(value).replace(/[&<>"']/g,(char)=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}

function toast(message, duration = 1400) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => els.toast.classList.remove("show"), duration);
}
