(() => {
  if (globalThis.__PERSIANYAR_BOOTSTRAP_V1__) return;
  globalThis.__PERSIANYAR_BOOTSTRAP_V1__ = true;

  let ensurePromise = null;
  let refreshAfterEnsure = false;
  const PREPAINT_ATTR = "data-persianyar-smart-dark-prepaint";
  const PREPAINT_STYLE_ID = "__persianyar_smart_dark_prepaint";
  const PREPAINT_LOADER_ID = "__persianyar_smart_dark_loading";

  function setSmartDarkPrepaint(active, config=null) {
    const root = document.documentElement;
    if (!root) return;
    document.getElementById(PREPAINT_LOADER_ID)?.remove();
    if (active) {
      const color=(value,fallback)=>{const v=String(value||"").trim().toLowerCase();return /^#[0-9a-f]{6}$/.test(v)?v:fallback;};
      root.style.setProperty("--persianyar-prepaint-bg",color(config?.smartDarkBackgroundColor,"#181a1b"));
      root.style.setProperty("--persianyar-prepaint-fg",color(config?.smartDarkTextColor,"#e8e6e3"));
      root.style.setProperty("--persianyar-prepaint-accent",color(config?.smartDarkAccentColor,"#8ab4f8"));
      if (!document.getElementById(PREPAINT_STYLE_ID)) {
        const style = document.createElement("style");
        style.id = PREPAINT_STYLE_ID;
        style.textContent = `html[${PREPAINT_ATTR}="1"],html[${PREPAINT_ATTR}="1"] body{background:var(--persianyar-prepaint-bg,#181a1b)!important;color:var(--persianyar-prepaint-fg,#e8e6e3)!important;color-scheme:dark!important}html[${PREPAINT_ATTR}="1"]{scrollbar-color:color-mix(in srgb,var(--persianyar-prepaint-fg,#e8e6e3) 30%,var(--persianyar-prepaint-bg,#181a1b)) var(--persianyar-prepaint-bg,#181a1b)}html[${PREPAINT_ATTR}="1"] :where(input,textarea,select,button,option,optgroup,[role="textbox"],[role="searchbox"],[role="combobox"],[role="checkbox"],[role="radio"],[role="switch"]){color-scheme:dark!important}html[${PREPAINT_ATTR}="1"] :where(input[type="checkbox"],input[type="radio"],input[type="range"],progress){accent-color:var(--persianyar-prepaint-accent,#8ab4f8)!important}`;
        (document.head || root).append(style);
      }
      root.setAttribute(PREPAINT_ATTR,"1");
    } else {
      root.removeAttribute(PREPAINT_ATTR);
      for(const name of ["--persianyar-prepaint-bg","--persianyar-prepaint-fg","--persianyar-prepaint-accent"])root.style.removeProperty(name);
      document.getElementById(PREPAINT_STYLE_ID)?.remove();
    }
  }

  function getHost() {
    try {
      if (globalThis.top !== globalThis && globalThis.location?.ancestorOrigins?.length) {
        const origins = globalThis.location.ancestorOrigins;
        for (let i=origins.length-1;i>=0;i--) {
          try { const host=String(new URL(origins[i]).hostname||"").toLowerCase(); if(host)return host; } catch {}
        }
      }
      const direct = String(location.hostname || "").toLowerCase();
      if (direct) return direct;
      const base = new URL(document.baseURI || location.href);
      if (base.hostname) return String(base.hostname).toLowerCase();
    } catch {}
    return "";
  }

  function configNeedsRuntime(config) {
    if (!config || config.paused) return false;
    return !!(
      config.enabled || config.emojiEnabled || Number(config.fontDelta || 0) !== 0 || Number(config.digitFontDelta || 0) !== 0 ||
      (config.digitMode && config.digitMode !== "preserve") || (config.zwnjMode && config.zwnjMode !== "preserve") ||
      config.bidiRepair || config.rtlBeta || config.layoutEnhance || config.localizeEnabled || config.cursorEnabled ||
      config.softMotionEnabled || config.softCorners || config.uniformCornersEnabled || config.removeShadows ||
      config.smoothScrollEnabled || config.smartDarkMode || config.liquidGlassMode || config.linearStyleMode ||
      config.adaptiveMenusMode || config.focusEnhanceMode || config.polishedInputsMode
    );
  }

  async function ensureForConfig(config) {
    const host = getHost();
    if (!host || !configNeedsRuntime(config)) return;
    // Do not start the full runtime inside unrelated third-party iframes for ordinary typography
    // features. Smart Dark / custom cursor are the two visual features that genuinely need to
    // cross iframe boundaries. This keeps media/ads/widgets from multiplying extension cost.
    try {
      const directHost=String(location.hostname||"").toLowerCase();
      const child=globalThis.top!==globalThis;
      const crossOriginChild=child&&directHost&&directHost!==host;
      // v37: do not start the heavy runtime in unrelated cross-origin frames. Doing so multiplied
      // observers and deep scans on ads/video/widgets, causing jank in the top page.
      if(crossOriginChild) return;
    } catch {}
    if (ensurePromise) {
      refreshAfterEnsure = true;
      return ensurePromise;
    }
    // The heavy optional catalogs are feature-gated. This message is intentionally sent even
    // when content.js is already alive so enabling localization/cursors later can hydrate only
    // the missing runtime data without reloading the page.
    ensurePromise = (async () => {
      const retryDelays = [0, 150, 450, 1200];
      for (const delay of retryDelays) {
        if (delay) await new Promise((resolve) => setTimeout(resolve, delay));
        try {
          const response = await chrome.runtime.sendMessage({
            type: "fontyar:ensure-page-runtime",
            host,
            profile: { localize: !!config.localizeEnabled, cursor: !!config.cursorEnabled }
          });
          if (response?.ok) return response;
        } catch {}
      }
      return null;
    })().finally(() => {
      ensurePromise = null;
      if (refreshAfterEnsure) {
        refreshAfterEnsure = false;
        queueMicrotask(() => { void refresh(); });
      }
    });
    return ensurePromise;
  }

  async function refresh() {
    try {
      const store = globalThis.__PERSIANYAR_SITE_STORE__;
      if (!store) return;
      const match = await store.getForHost(getHost());
      const config = match?.config || null;
      const wantsPrepaint = !!(config?.smartDarkMode && !config?.paused);
      // When the registered heavy runtime already started at document_start it owns the first
      // paint; adding the shield afterwards would create a dark flash instead of preventing one.
      const alreadyPainted = document.documentElement?.hasAttribute("data-persianyar-smart-dark-active");
      setSmartDarkPrepaint(wantsPrepaint && !alreadyPainted, config);
      await ensureForConfig(config);
    } catch {}
  }

  // Static manifest injection guarantees this runs on every normal page at document_start,
  // independent of whether the popup has ever been opened in this browser session.
  void refresh();

  globalThis.__PERSIANYAR_SITE_STORE__?.onChanged(() => {
    void refresh();
  });

  // BFCache restores do not create a fresh document. Re-check only when the full runtime is absent.
  addEventListener("pageshow", (event) => {
    if (event.persisted && !globalThis.__FONTYAR_V1_CONTENT_LOADED__) void refresh();
  }, { passive: true });
})();
