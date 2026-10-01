(() => {
  const base = globalThis.__FONTYAR_LOCALIZATION_FA__;
  if (!base) return;
  const general = { ...(base.general || {}) };
  const packs = {};
  for (const [domain, entries] of Object.entries(base.packs || {})) packs[domain] = { ...entries };
  const normalize = base.normalize || (value => String(value || "").toLowerCase().replace(/\s+/g, " ").trim());
  const add = (target, key, value) => {
    const k = normalize(key); const v = String(value || "").trim();
    if (!k || !v || k.length > 120 || /[#@][\p{L}\p{N}_]/u.test(k)) return;
    if (!Object.prototype.hasOwnProperty.call(target, k)) target[k] = v;
  };
  const g = key => general[normalize(key)] || "";
  const join = (...parts) => parts.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();

  // UI nouns intentionally stay inside navigation/settings/action vocabulary.
  const nouns = [
    "account","profile","privacy","security","notifications","messages","settings","language","appearance","theme","display","accessibility","data usage","content preferences","privacy and safety","your account","analytics","dashboard","creator tools","creator studio","ad preferences","ads","billing","payment","payments","subscription","subscriptions","purchases","orders","cart","downloads","uploads","history","watch history","search history","saved","collections","lists","communities","groups","channels","members","admins","invites","requests","friend requests","inbox","archive","drafts","attachments","photos","videos","audio","files","folders","location","calendar","events","keyboard shortcuts","activity","search","filter","sort by","recent","latest","recommended","people","followers","following","favorites","bookmarks","replies","comments","likes","reposts","media","projects","repositories","issues","pull requests","actions","stars","forks","code","wiki","releases","commits","branches","tags","contributors","developer","documentation","desktop","mobile","web","status","website","email","phone","username","name","bio","address","public","private","friends","message","call","voice call","video call","blocked","muted accounts","saved posts","liked videos","your videos","your posts","memberships","security keys","sessions","connected accounts","connected apps","devices","permissions","recommendations","interests","contacts","feed","timeline","playback","captions","subtitles","quality","camera","microphone","live","help","feedback","support","workspace","organization","integrations","tokens"
  ];

  const prefixTemplates = [
    ["manage", "manage"], ["edit", "edit"], ["delete", "delete"], ["remove", "remove"],
    ["clear", "clear"], ["reset", "reset"], ["open", "open"], ["share", "share"],
    ["copy", "copy"], ["download", "download"], ["upload", "upload"], ["search", "search"],
    ["create", "create"], ["report", "report"], ["block", "block"], ["mute", "mute"],
    ["unmute", "unmute"], ["follow", "follow"], ["unfollow", "unfollow"], ["subscribe", "subscribe"],
    ["unsubscribe", "unsubscribe"], ["install", "install"], ["update", "update"], ["view", "display"]
  ];
  const suffixTemplates = [
    ["settings", "settings"], ["details", "details"], ["history", "history"],
    ["preferences", "content preferences"], ["privacy", "privacy"], ["security", "security"]
  ];
  const adjectiveTemplates = [
    ["new", "new"], ["recent", "recent"], ["latest", "latest"], ["recommended", "recommended"],
    ["saved", "saved"], ["popular", "popular"], ["public", "public"], ["private", "private"]
  ];

  for (const noun of nouns) {
    const fa = g(noun); if (!fa) continue;
    for (const [enAction, faKey] of prefixTemplates) {
      const actionFa = g(faKey); if (actionFa) add(general, `${enAction} ${noun}`, join(actionFa, fa));
    }
    for (const [enSuffix, faKey] of suffixTemplates) {
      const suffixFa = g(faKey); if (suffixFa) add(general, `${noun} ${enSuffix}`, join(suffixFa, fa));
    }
    for (const [enAdj, faKey] of adjectiveTemplates) {
      const adjFa = g(faKey); if (adjFa) add(general, `${enAdj} ${noun}`, join(fa, adjFa));
    }
  }

  // Common UI sentence variants derived from translations that already exist in the curated base.
  const directAliases = [
    ["save settings","save changes"],["save preferences","save changes"],["discard changes","cancel"],
    ["go back","back"],["go to settings","settings"],["open settings","settings"],["account settings","manage account"],
    ["search settings","search settings"],["notification preferences","notifications settings"],["manage notifications","notifications settings"],
    ["show all","view all"],["show details","details"],["view details","details"],["try once more","try again"],
    ["reload page","reload"],["refresh page","refresh"],["download file","download"],["upload file","upload"],
    ["copy to clipboard","copy"],["copy profile link","copy link"],["share profile","share"],
    ["privacy settings","privacy and safety"],["security settings","security"],["language settings","language"],
    ["display settings","display"],["appearance settings","appearance"],["accessibility settings","accessibility"],
    ["payment settings","payments"],["billing settings","billing"],["subscription settings","subscriptions"]
  ];
  for (const [alias, source] of directAliases) { const v = g(source); if (v) add(general, alias, v); }

  // Expand supported-site packs with conservative UI-only wrappers. Exact-match lookup plus
  // content-region guards in content.js prevent these from touching posts/messages/captions.
  const siteActionKeys = ["manage","edit","open","search","clear","reset","download","copy","share","display"];
  for (const [domain, pack] of Object.entries(packs)) {
    const originals = Object.entries(pack);
    for (const [key, fa] of originals) {
      if (!key || key.length > 46 || key.split(/\s+/).length > 5 || /(?:^|\s)[#@]/.test(key)) continue;
      for (const actionKey of siteActionKeys) {
        const actionFa = g(actionKey); if (!actionFa) continue;
        add(pack, `${actionKey === "display" ? "view" : actionKey} ${key}`, join(actionFa, fa));
      }
      const settingsFa = g("settings"); if (settingsFa) add(pack, `${key} settings`, join(settingsFa, fa));
      const detailsFa = g("details"); if (detailsFa) add(pack, `${key} details`, join(detailsFa, fa));
    }
  }

  // Preserve the X/Twitter alias after cloning and expansion.
  if (packs["x.com"]) packs["twitter.com"] = packs["x.com"];

  const lookup = (host, text) => {
    const key = normalize(text); if (!key || key.length > 120 || /[#@][\p{L}\p{N}_]/u.test(key)) return "";
    const h = String(host || "").toLowerCase();
    let best = ""; let selected = null;
    for (const [domain, pack] of Object.entries(packs)) {
      if ((h === domain || h.endsWith(`.${domain}`)) && domain.length > best.length) { best = domain; selected = pack; }
    }
    if (selected && Object.prototype.hasOwnProperty.call(selected, key)) return selected[key];
    return general[key] || "";
  };

  const seen = new Set(); let count = Object.keys(general).length;
  for (const pack of Object.values(packs)) { if (seen.has(pack)) continue; seen.add(pack); count += Object.keys(pack).length; }
  globalThis.__FONTYAR_LOCALIZATION_FA__ = Object.freeze({ general, packs, normalize, lookup, count });
})();
