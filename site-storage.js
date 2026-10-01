(() => {
  if (globalThis.__PERSIANYAR_SITE_STORE__) return;

  const SYNC_PREFIX = "persianyar.site.v2:";
  const LEGACY_KEY = "sites";
  const LOCAL_FALLBACK_KEY = "persianyarSiteFallbackV2";
  const MAX_SYNC_ITEM_BYTES = 8192;

  const isPlainObject = (value) => !!value && typeof value === "object" && !Array.isArray(value);
  const clone = (value) => {
    try { return structuredClone(value); } catch {}
    try { return JSON.parse(JSON.stringify(value)); } catch { return {}; }
  };
  const normalizeHost = (host) => String(host || "").trim().toLowerCase();
  const siteKey = (host) => `${SYNC_PREFIX}${normalizeHost(host)}`;
  const hostFromKey = (key) => String(key || "").startsWith(SYNC_PREFIX) ? String(key).slice(SYNC_PREFIX.length) : "";
  const byteLength = (value, key = "") => {
    try { return new TextEncoder().encode(String(key) + JSON.stringify(value)).length; }
    catch { return String(key).length + JSON.stringify(value).length; }
  };
  const isQuotaError = (error) => /quota|QUOTA_BYTES|MAX_WRITE/i.test(String(error?.message || error || ""));

  function candidateHosts(host) {
    const normalized = normalizeHost(host);
    if (!normalized) return [];
    if (normalized === "localhost" || /^\d{1,3}(?:\.\d{1,3}){3}$/.test(normalized) || normalized.includes(":")) return [normalized];
    const labels = normalized.split(".").filter(Boolean);
    const out = [];
    for (let i = 0; i < labels.length - 1; i++) out.push(labels.slice(i).join("."));
    if (!out.includes(normalized)) out.unshift(normalized);
    return [...new Set(out)];
  }

  function findSiteConfig(host, sites) {
    const normalized = normalizeHost(host);
    if (!normalized || !isPlainObject(sites)) return { host: "", config: null };
    if (isPlainObject(sites[normalized])) return { host: normalized, config: sites[normalized] };
    let bestHost = "";
    let bestConfig = null;
    for (const [candidateRaw, config] of Object.entries(sites)) {
      const candidate = normalizeHost(candidateRaw);
      if (!candidate || !isPlainObject(config) || !config.includeSubdomains) continue;
      if (normalized === candidate || normalized.endsWith(`.${candidate}`)) {
        if (candidate.length > bestHost.length) { bestHost = candidate; bestConfig = config; }
      }
    }
    return { host: bestHost, config: bestConfig };
  }

  async function getFallbackSites() {
    try {
      const data = await chrome.storage.local.get({ [LOCAL_FALLBACK_KEY]: {} });
      return isPlainObject(data?.[LOCAL_FALLBACK_KEY]) ? data[LOCAL_FALLBACK_KEY] : {};
    } catch { return {}; }
  }

  async function setFallbackHost(host, config) {
    const normalized = normalizeHost(host);
    if (!normalized) return;
    const fallback = await getFallbackSites();
    fallback[normalized] = clone(config);
    await chrome.storage.local.set({ [LOCAL_FALLBACK_KEY]: fallback });
  }

  async function clearFallbackHost(host) {
    const normalized = normalizeHost(host);
    if (!normalized) return;
    const fallback = await getFallbackSites();
    if (!Object.prototype.hasOwnProperty.call(fallback, normalized)) return;
    delete fallback[normalized];
    if (Object.keys(fallback).length) await chrome.storage.local.set({ [LOCAL_FALLBACK_KEY]: fallback });
    else await chrome.storage.local.remove(LOCAL_FALLBACK_KEY);
  }

  function shardsFromSyncObject(data) {
    const result = {};
    for (const [key, value] of Object.entries(data || {})) {
      const host = hostFromKey(key);
      if (host && isPlainObject(value)) result[host] = value;
    }
    return result;
  }

  async function getAll() {
    const [syncData, fallback] = await Promise.all([
      chrome.storage.sync.get(null).catch(() => ({})),
      getFallbackSites()
    ]);
    const legacy = isPlainObject(syncData?.[LEGACY_KEY]) ? syncData[LEGACY_KEY] : {};
    const shards = shardsFromSyncObject(syncData);
    // New sharded entries override legacy. Local fallback only exists for writes that could not
    // fit in sync, so it must override both to preserve the user's newest setting.
    return { ...legacy, ...shards, ...fallback };
  }

  async function getForHost(host) {
    const normalized = normalizeHost(host);
    if (!normalized) return { host: "", config: null };
    const candidates = candidateHosts(normalized);
    const keys = [LEGACY_KEY, ...candidates.map(siteKey)];
    const [syncData, fallback] = await Promise.all([
      chrome.storage.sync.get(keys).catch(() => ({})),
      getFallbackSites()
    ]);
    const sites = {};
    const legacy = isPlainObject(syncData?.[LEGACY_KEY]) ? syncData[LEGACY_KEY] : {};
    for (const candidate of candidates) {
      if (isPlainObject(legacy[candidate])) sites[candidate] = legacy[candidate];
      const shard = syncData?.[siteKey(candidate)];
      if (isPlainObject(shard)) sites[candidate] = shard;
      if (isPlainObject(fallback[candidate])) sites[candidate] = fallback[candidate];
    }
    return findSiteConfig(normalized, sites);
  }

  async function saveHost(host, config) {
    const normalized = normalizeHost(host);
    if (!normalized || !isPlainObject(config)) return { ok: false, reason: "invalid" };
    const snapshot = clone(config);
    const key = siteKey(normalized);
    if (byteLength(snapshot, key) >= MAX_SYNC_ITEM_BYTES) {
      await setFallbackHost(normalized, snapshot);
      return { ok: true, synced: false, storage: "local", reason: "per-item-quota" };
    }
    try {
      await chrome.storage.sync.set({ [key]: snapshot });
      await clearFallbackHost(normalized);
      return { ok: true, synced: true, storage: "sync" };
    } catch (error) {
      // Site settings must never stop working because Chrome Sync is full. Persist the exact same
      // config locally and keep the extension operational; backup/export still includes it.
      await setFallbackHost(normalized, snapshot);
      return { ok: true, synced: false, storage: "local", reason: isQuotaError(error) ? "sync-quota" : "sync-error", error: String(error?.message || error || "") };
    }
  }

  async function saveMany(sites) {
    if (!isPlainObject(sites)) return { ok: false, reason: "invalid" };
    const syncWrite = {};
    const fallbackWrite = {};
    for (const [hostRaw, config] of Object.entries(sites)) {
      const host = normalizeHost(hostRaw);
      if (!host || !isPlainObject(config)) continue;
      const snapshot = clone(config);
      const key = siteKey(host);
      if (byteLength(snapshot, key) < MAX_SYNC_ITEM_BYTES) syncWrite[key] = snapshot;
      else fallbackWrite[host] = snapshot;
    }

    let syncSucceeded = true;
    if (Object.keys(syncWrite).length) {
      try { await chrome.storage.sync.set(syncWrite); }
      catch {
        syncSucceeded = false;
        for (const [key, value] of Object.entries(syncWrite)) fallbackWrite[hostFromKey(key)] = value;
      }
    }

    if (Object.keys(fallbackWrite).length) {
      const current = await getFallbackSites();
      Object.assign(current, fallbackWrite);
      await chrome.storage.local.set({ [LOCAL_FALLBACK_KEY]: current });
    }

    if (syncSucceeded && Object.keys(syncWrite).length) {
      const current = await getFallbackSites();
      let changed = false;
      for (const key of Object.keys(syncWrite)) {
        const host = hostFromKey(key);
        if (Object.prototype.hasOwnProperty.call(current, host)) { delete current[host]; changed = true; }
      }
      if (changed) {
        if (Object.keys(current).length) await chrome.storage.local.set({ [LOCAL_FALLBACK_KEY]: current });
        else await chrome.storage.local.remove(LOCAL_FALLBACK_KEY);
      }
    }
    return { ok: true, synced: syncSucceeded, fallbackCount: Object.keys(fallbackWrite).length };
  }

  async function removeHost(host) {
    const normalized = normalizeHost(host);
    if (!normalized) return;
    await Promise.allSettled([
      chrome.storage.sync.remove(siteKey(normalized)),
      clearFallbackHost(normalized)
    ]);

    // Old builds may still have one monolithic `sites` object. Remove the deleted host there too
    // until migration has completed, so it cannot reappear after an extension reload.
    try {
      const legacyData = await chrome.storage.sync.get({ [LEGACY_KEY]: {} });
      const legacy = isPlainObject(legacyData?.[LEGACY_KEY]) ? legacyData[LEGACY_KEY] : {};
      if (Object.prototype.hasOwnProperty.call(legacy, normalized)) {
        delete legacy[normalized];
        if (Object.keys(legacy).length) await chrome.storage.sync.set({ [LEGACY_KEY]: legacy });
        else await chrome.storage.sync.remove(LEGACY_KEY);
      }
    } catch {}
  }

  async function migrateLegacy() {
    let legacy = {};
    try {
      const data = await chrome.storage.sync.get({ [LEGACY_KEY]: {} });
      legacy = isPlainObject(data?.[LEGACY_KEY]) ? data[LEGACY_KEY] : {};
    } catch { return { migrated: 0 }; }
    const entries = Object.entries(legacy);
    if (!entries.length) return { migrated: 0 };

    // saveMany automatically falls back to local storage if the total sync quota is already full.
    const result = await saveMany(legacy);
    try { await chrome.storage.sync.remove(LEGACY_KEY); } catch {}
    return { migrated: entries.length, ...result };
  }

  function isRelevantChange(changes, areaName) {
    if (areaName === "local") return !!changes?.[LOCAL_FALLBACK_KEY];
    if (areaName !== "sync") return false;
    if (changes?.[LEGACY_KEY]) return true;
    return Object.keys(changes || {}).some((key) => key.startsWith(SYNC_PREFIX));
  }

  function onChanged(callback) {
    const listener = (changes, areaName) => {
      if (!isRelevantChange(changes, areaName)) return;
      try { callback(changes, areaName); } catch {}
    };
    chrome.storage.onChanged.addListener(listener);
    return () => { try { chrome.storage.onChanged.removeListener(listener); } catch {} };
  }

  globalThis.__PERSIANYAR_SITE_STORE__ = Object.freeze({
    SYNC_PREFIX,
    LEGACY_KEY,
    LOCAL_FALLBACK_KEY,
    siteKey,
    hostFromKey,
    findSiteConfig,
    getAll,
    getForHost,
    saveHost,
    saveMany,
    removeHost,
    migrateLegacy,
    isRelevantChange,
    onChanged
  });
})();
