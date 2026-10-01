(() => {
  if (globalThis.__PERSIANYAR_SMART_DARK_PREPAINT_V40__) return;
  globalThis.__PERSIANYAR_SMART_DARK_PREPAINT_V40__ = true;

  const ATTR="data-persianyar-smart-dark-prepaint";
  const ACTIVE_ATTR="data-persianyar-smart-dark-active";
  const WARM_ATTR="data-persianyar-smart-dark-warm";
  const ID="__persianyar_smart_dark_prepaint";
  const WARM_ID="__persianyar_smart_dark_warm_cache";
  const ENGINE_ID="__persianyar_smart_dark_cssom";
  const LOADER_ID="__persianyar_smart_dark_loading";
  const CACHE_PREFIX="persianyarSmartDarkWarmV1:";
  const MAX_CACHE_AGE=14*24*60*60*1000;
  const MAX_WARM_CSS=900000;

  const FALLBACK=`html[${ATTR}="1"],html[${ATTR}="1"] body{background:var(--persianyar-prepaint-bg,#181a1b)!important;color:var(--persianyar-prepaint-fg,#e8e6e3)!important;color-scheme:dark!important}html[${ATTR}="1"]{scrollbar-color:color-mix(in srgb,var(--persianyar-prepaint-fg,#e8e6e3) 30%,var(--persianyar-prepaint-bg,#181a1b)) var(--persianyar-prepaint-bg,#181a1b)}html[${ATTR}="1"] :where(input,textarea,select,button,option,optgroup,[role="textbox"],[role="searchbox"],[role="combobox"],[role="checkbox"],[role="radio"],[role="switch"]){color-scheme:dark!important}html[${ATTR}="1"] :where(input[type="checkbox"],input[type="radio"],input[type="range"],progress){accent-color:var(--persianyar-prepaint-accent,#8ab4f8)!important}`;

  const directHost=()=>{try{return String(location.hostname||"").toLowerCase()}catch{return ""}};
  const validHex=(value,fallback)=>{const v=String(value||"").trim().toLowerCase();return /^#[0-9a-f]{6}$/.test(v)?v:fallback};

  function apply(){
    const root=document.documentElement;if(!root)return false;
    document.getElementById(LOADER_ID)?.remove();
    if(root.hasAttribute(ACTIVE_ATTR)){
      root.removeAttribute(ATTR);
      document.getElementById(ID)?.remove();
      return true;
    }
    root.setAttribute(ATTR,"1");
    if(!document.getElementById(ID)){
      const style=document.createElement("style");style.id=ID;style.textContent=FALLBACK;(document.head||root).append(style);
    }
    return true;
  }

  async function installWarmCache(){
    const host=directHost();if(!host||!chrome?.storage?.local)return;
    const key=`${CACHE_PREFIX}${host}`;
    try{
      const data=await chrome.storage.local.get(key),record=data?.[key];
      if(!record||typeof record.css!=="string"||!record.css||record.css.length>MAX_WARM_CSS)return;
      if(!Number.isFinite(record.savedAt)||Date.now()-record.savedAt>MAX_CACHE_AGE)return;
      const root=document.documentElement;if(!root||!root.hasAttribute(ATTR))return;
      if(document.getElementById(ENGINE_ID)||document.getElementById(WARM_ID))return;
      const palette=record.palette||{};
      root.style.setProperty("--persianyar-prepaint-bg",validHex(palette.bg,"#181a1b"));
      root.style.setProperty("--persianyar-prepaint-fg",validHex(palette.fg,"#e8e6e3"));
      root.style.setProperty("--persianyar-prepaint-accent",validHex(palette.accent,"#8ab4f8"));
      const style=document.createElement("style");
      style.id=WARM_ID;
      style.setAttribute("data-persianyar-smart-dark-cssom","warm");
      if(record.themeHash)style.dataset.themeHash=String(record.themeHash);
      style.textContent=record.css;
      (document.head||root).append(style);
      root.setAttribute(WARM_ATTR,"1");
    }catch{}
  }

  if(!apply()){
    const obs=new MutationObserver(()=>{if(apply()){obs.disconnect();void installWarmCache();}});
    obs.observe(document,{childList:true,subtree:true});
  }else{
    void installWarmCache();
  }
})();
