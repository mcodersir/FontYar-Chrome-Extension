# PersianYar / پرشین‌یار v1.0.0

افزونه Manifest V3 برای شخصی سازی فونت، ایموجی، چیدمان، بومی سازی، ظاهر، حرکت و موس هر سایت.

**راهنمای نصب:** [mcodersir.github.io/FontYar-Chrome-Extension](https://mcodersir.github.io/FontYar-Chrome-Extension/) · **کد منبع:** [GitHub](https://github.com/mcodersir/FontYar-Chrome-Extension) · **دریافت آخرین نسخه:** [GitHub Releases](https://github.com/mcodersir/FontYar-Chrome-Extension/releases/latest)

تنظیمات ذخیره‌شدهٔ هر سایت به‌صورت خودکار هنگام بازشدن آن سایت اعمال می‌شوند؛ لازم نیست پنجرهٔ افزونه باز بماند. تنظیمات روی هر دامنه جداگانه نگه‌داری می‌شوند.

## قابلیت های اصلی

- فونت مستقل فارسی، انگلیسی، عربی و چینی + حالت یک فونت برای همه.
- پک های ایموجی با پیش نمایش Lazy و کش محلی.
- بومی سازی آفلاین رابط سایت های پشتیبانی شده بدون دستکاری محتوای کاربر.
- کتابخانه موس per-site با 40 قالب مینیمال (12 قالب/واریانت رسمی پروژه های اصلی + 28 تم رنگی رسمی Material Bibata) از Apple Cursor، BreezeX، Bibata، XCursor Pro، GoogleDot و Material Bibata.
- انتخاب موس داخل Bottom Sheet با جستجو، فیلتر خانواده، Lazy Preview و کش محلی؛ باز کردن لیست باعث دانلود یکجای 40 قالب نمی شود.
- پوشش حالت های استاندارد موس: عادی، لینک، متن افقی/عمودی، انتظار/پردازش، crosshair، move/all-scroll، grab/grabbing، help، forbidden/no-drop، zoom، copy/alias/context، cell و همه حالت های اصلی resize.
- تشخیص Cursor خود سایت هنگام Hover و نگاشت آن به state همان پک، همراه با پشتیبانی open Shadow DOM و frameهای قابل دسترس افزونه.
- فایل های SVG منبع بعد از اولین دریافت در Cache Storage می مانند. فقط چند پک کامل اخیر به صورت expand شده در storage.local نگه داشته می شوند تا حجم ذخیره سازی کنترل شود؛ پک های قدیمی از Cache Storage بدون دانلود مجدد بازسازی می شوند.
- پنل داخلی تب بندی شده: متن، بومی سازی، ظاهر و موس، حرکت.
- Popup با اندازه 560×600 و چیدمان responsive داخلی.
- بارگذاری سریع Popup: رابط داخلی ابتدا بدون انتظار شبکه نمایش داده می شود و کاتالوگ های سنگین بعد از First Paint لود می شوند.
- Motion قابل شخصی سازی: Tooltip intent delay، Tabular nums، Scroll fade، Safe polygon، Stagger، Origin-aware pop، Morph، Shared layout، Shared element، Rubber band و Icon cross-fade.
- همه Motionها به `prefers-reduced-motion` احترام می گذارند و تا حد ممکن compositor-first هستند.
- ابزارهای فارسی: اعداد، نیم فاصله، RTL امن، بهبود چیدمان و کنترل اندازه متن/اعداد.
- استایل های اختیاری Smart Dark، Liquid Glass، Linear، Adaptive Menus، Focus و Polished Inputs.

## Smart Dark v6 Adaptive Paint (historical)

- مسیر Hover/Focus یک hot-path بسیار کوچک و synchronous دارد تا `:hover` روشن سایت قبل از Paint بعدی دوباره تیره شود؛ بدون اسکن subtree در هر حرکت موس.
- پنل های Dialog/Notification/Flyout/Toast/Side panel و targetهای `aria-controls` بعد از تعامل به صورت bounded دوباره تحلیل می شوند.
- ورودی های متنی، autofill، placeholder، scrollbar و dialog backdrop fallback دارک امن دارند تا بخش های سفید باقی نمانند.
- کنتراست متن نسبت به سطح دارک مقصد سنجیده می شود و فقط متن های کم کنتراست روشن تر می شوند؛ رنگ های برند تا حد امکان حفظ می شوند.
- آیکون های CSS-mask کوچک و خنثی روی زمینه دارک روشن می شوند؛ لوگو/عکس/نمودار از این مسیر محافظت می شوند.
- Shadow DOM به یک host-gate زنده متصل است؛ با خاموش کردن Smart Dark همان لحظه قوانین دارک داخل web componentها هم غیرفعال می شوند و منتظر resync نمی مانند.
- مشاهده سراسری `style` از MutationObserver دارک حذف شده تا انیمیشن ها و SPAهای شلوغ Main Thread را درگیر نکنند؛ stateهای معنایی مثل `aria-selected`, `aria-expanded`, `open` و `data-state` همچنان دنبال می شوند.
- Prepaint علاوه بر shield، پس زمینه `html/body` را هم قبل از اولین Paint تیره می کند تا splash سفید کمتر شود.

- پالت های آماده و پالت سفارشی برای پس زمینه، متن و Accent، همراه با Brightness/Contrast/Warmth/Grayscale به صورت تنظیم جداگانه برای هر سایت.

## اصلاح Smart Dark و Search Console - 2026-09-20

- باز کردن Popup دیگر Smart Dark را دوباره وارد حالت Loading نمی کند؛ Loader فقط برای فعال سازی واقعی یا Cold Start اجرا می شود.
- Select/Option و کنترل های متنی، فایل، رنگ، تاریخ و زمان و Overlayهای Material/CDK پوشش دارک کامل تری دارند.
- بومی سازی Search Console با عبارت های کوتاه تر و پوشش بیشتر گزارش های Performance، Indexing، Sitemaps، Experience، Rich Results، Links، Settings و Messages گسترش یافته است.
- تغییرات دارک فقط Paint هستند و عمدا Width/Height/Padding/Margin/Flex/Grid را دستکاری نمی کنند.
- نسخه Manifest همچنان دقیقا `1` است.

## تغییر این بیلد

تقویم و تاریخ شمسی حذف شده اند. کتابخانه موس شامل 40 قالب معتبر است و از داخل Bottom Sheet انتخاب می شود. Previewها فقط برای کارت های قابل مشاهده لود می شوند و پک کامل فقط موقع انتخاب/فعال سازی آماده می شود. موتور Cursor تمام stateهای اصلی CSS را به asset متناظر پک نگاشت می کند و برای stateهایی که فایل جداگانه در upstream نداشته باشند نزدیک ترین asset همان پک را fallback می کند. نسخه Manifest عمدا روی `1` باقی مانده است.

## نصب

1. ZIP را Extract کنید.
2. `chrome://extensions` را باز کنید.
3. Developer mode را روشن کنید.
4. `Load unpacked` را بزنید و پوشه `PersianYar-Chrome-Extension-v1` را انتخاب کنید.


## Cursor Motion & Preview Update (v1.0.0)
- Cursor size: 16-96px with proportional hotspot scaling.
- Optional requestAnimationFrame-based cursor motion with precise/smooth/float presets.
- Optional motion trail, click pulse, hover scale and subtle glow.
- Native cursor mode stays available and scales cached SVGs without new downloads.
- Bottom-sheet cards show real Default + Pointer SVGs on split light/dark preview surfaces.
- The cursor catalog cache version is internal; the manifest version remains `1`.
- Decorative motion respects prefers-reduced-motion.
- پیش نمایش داخل افزونه حالا خود SVG کش شده همان پک را برای Default/Pointer و حالت زنده نشان می دهد؛ Placeholder قبل از لود دیگر شبیه موس واقعی نیست.
- پیش نمایش زنده افکت های Trail، Click Pulse، Hover Scale و Glow را هم نشان می دهد.
- حلقه requestAnimationFrame بعد از رسیدن موس و Trail به موقعیت نهایی متوقف می شود و با حرکت بعدی دوباره شروع می شود تا مصرف بی دلیل CPU/GPU نداشته باشد.
- اگر Overlay حرکتی به هر دلیل نتواند ساخته شود، افزونه به Cursor بومی همان پک برمی گردد تا اشاره گر نامرئی نشود.

## Cursor reliability update

- Cursor catalog uses only file names verified in the upstream Apple Cursor, BreezeX, XCursor Pro, Bibata and Google Cursor trees.
- Each remote SVG has jsDelivr plus raw.githubusercontent mirror candidates, and Git symlink stubs are resolved safely.
- Non-SVG/error responses are never stored in the verified cursor cache.
- Material Bibata entries are explicitly labeled color themes derived from the official Bibata source and published Material Bibata palettes.
- Cursor pack selection is transactional and the picker stays open after selection for comparison.
- Motion mode preloads cursor states, hides the native cursor consistently, swaps packs atomically, and uses velocity-adaptive catch-up to avoid fast-motion cursor flashes/jumps.

## Cursor stability patch

- Keeps the custom overlay visible through secondary-click/context-menu focus transitions instead of hiding it on window blur.
- Uses `pointerrawupdate` plus coalesced pointer samples when available and snaps long-distance motion to the newest hardware position.
- Re-syncs the cursor stylesheet at USER origin after asynchronous cursor assets finish loading, preventing page `!important` cursor rules from exposing the OS cursor.
- Covers `data:`, `blob:` and `filesystem:` child frames created by matching origins via `match_origin_as_fallback`.

## Cursor performance patch

- Removed the `pointerrawupdate` listener from the live cursor path. Movement now uses the browser-coalesced `pointermove` event and performs only coordinate capture in the hot handler.
- Cursor-state detection (`getComputedStyle`, selector checks and composed-path work) runs on boundary/state changes instead of every movement sample.
- The animation loop updates at most once per paint via `requestAnimationFrame`, uses an adaptive latency cap for fast motion, and snaps tiny residual distances instead of burning extra frames.
- Trail coordinates are kept in JavaScript memory instead of DOM `data-*` attributes, reducing per-frame DOM reads/writes.
- Glow/filter setup is moved out of the per-frame loop.
- Visible-window blur and null `relatedTarget` transitions no longer start hide timers, preventing extra work and cursor flashes during fast iframe/context-menu transitions.
- `prefers-reduced-motion` reuses a cached `MediaQueryList` instead of calling `matchMedia()` every animation frame.
- Manifest `version` and `version_name` remain `1`.

## Selective runtime + site controls update (v1.0.0)

- Runtime scripts are registered only for sites that actually have active PersianYar features. Untouched and paused sites no longer receive the heavy page runtime on each navigation.
- Added a per-site **Pause PersianYar** master switch. Pausing is non-destructive: the site's settings stay saved and can be resumed later.
- Added JSON settings backup plus safe import/merge on the Options page.
- Popup sync writes are coalesced and flushed on page exit to reduce unnecessary `storage.sync` writes while preserving the latest state.
- Existing live-page listeners are detached when their feature is disabled; paused/inactive pages return to the default page state.
- Static manifest content-script injection was replaced by dynamic registration while keeping the same `storage`, `activeTab`, `scripting`, and HTTP/HTTPS host permissions.
- Manifest `version` and `version_name` remain `1`.


### Emoji / RTL input stability
- Emoji glyphs now use normalized baseline/weight metrics to reduce mixed-style fallback.
- Static downloadable emoji faces are registered across inherited font weights, including bold UI.
- RTL input/textarea controls keep a stable bidi base while typing, so a leading emoji no longer jumps to the visual end when text is entered.
- Live form updates preserve the current selection/caret and avoid re-capturing the input font on every keystroke.

## Emoji paint-only safety patch (v1.0.0)

- Emoji styling no longer touches `input`, `textarea` or `contenteditable`: no font-family injection, direction change, bidi rule, line-height, spacing, dimensions or DOM wrappers are applied while the user is typing.
- Downloadable emoji packs are still applied to normal non-editable page text. Unicode emoji are wrapped only outside editable roots, without forced square boxes or baseline offsets.
- Image-based emoji keep the original `<img>` node and all layout-affecting attributes/styles. PersianYar swaps only the image bytes using a fixed transparent emoji render, so no layout/computed-style measurement is needed.
- Semantic SVG/background emoji are changed with a paint-only background replacement; their box, position, margins, flex behavior and baseline are not changed.
- Emoji rendering no longer calls `document.fonts.load()`, `document.fonts.ready`, `getBoundingClientRect()` or `getComputedStyle()` in the emoji-image conversion path. This avoids waking unrelated lazy webfonts from the host page.
- Stale builds that try to register an emoji-only family on editable controls now receive a no-op from the background service worker until the tab is refreshed.
- Emoji sequences continue to be treated as grapheme clusters, including ZWJ sequences, flags, modifiers and keycaps in normal page text.
- Extension manifest `version` and `version_name` remain exactly `1`.

## Auto-apply on page load
PersianYar now uses a tiny `bootstrap.js` content script at `document_start`. Saved site settings are applied automatically when a matching page opens; opening the popup is not required. The heavy runtime is still loaded only for sites that actually have active PersianYar features.


## Persian localization + RTL/layout reliability patch
- Added a final localization quality layer for common error/retry UI, including X's “Something went wrong. Try reloading.” variants and sentence-level composition when every fragment has a known safe translation.
- Localization now recognizes alert/status/toast/dialog UI surfaces in addition to navigation and buttons, while user posts/messages remain excluded.
- Translated Persian UI text receives an isolated RTL base automatically so punctuation and embedded Latin text stay ordered without forcing an entire page layout to flip.
- Auto RTL uses `direction: rtl` + `text-align: start` + bidi isolation on marked Persian text blocks instead of `unicode-bidi: plaintext`.
- Persian layout enhancement no longer uses `overflow-wrap:anywhere`; it keeps normal word breaking and only improves small RTL controls.
- Live `input`, `textarea` and `contenteditable` direction/alignment are left to the host page to avoid caret/emoji jumps while typing.
- Font-size offset now scales line-height only for safe block text. Inline labels, controls and editable fields keep the site's own line box, while Persian multi-line text gets a conservative minimum line-height ratio when enlarged.
- Extension manifest `version` and `version_name` remain exactly `1`.

## اصلاحات سازگاری فارسی - بازبینی 2026-09-19
- سه قابلیت «اصلاح چیدمان متن فارسی»، «بهبود چیدمان فارسی» و «راست چین خودکار سایت» از هم مستقل شده اند و هرکدام نشانگرهای RTL خود را اعمال و پاک می کنند.
- بومی سازی X برای بخش های تنظیمات، اعلان ها، حریم خصوصی، امنیت، Spaces، Creator Studio، Premium و Premium Business گسترش یافته است.
- Placeholderهای رابط مثل Ask Grok بدون دستکاری متن تایپ شده کاربر بومی می شوند.
- هنگام افزایش اندازه فونت، line-height متن های چندخطی و spanهای متنی نیز متناسب افزایش می یابد تا خطوط روی هم نیفتند.


## Storage quota reliability fix
- Site configurations are no longer stored in one monolithic `chrome.storage.sync` item.
- Existing `sites` data is migrated automatically to per-domain sync keys.
- If Chrome Sync quota is full or one config exceeds the per-item limit, that site falls back to `chrome.storage.local` so settings continue to save and apply.
- Backup/export merges synced and local-fallback site settings.


### Smart Dark engine refresh
- Smart Dark now classifies visible page surfaces and text colors instead of only matching a short list of semantic containers.
- Mixed light/dark dashboards are detected from viewport samples, so a dark sidebar no longer prevents the larger light workspace from being themed.
- The engine changes paint properties only (background/text/border/color-scheme); it does not change layout geometry.
- A short document-start pre-paint shield prevents the light-page flash while the first bounded dark pass is applied.
- Media, SVG, canvas, iframes, and strong brand-color fills are protected from recoloring.

### Smart Dark dynamic/AJAX reliability refresh
- Newly inserted SPA/AJAX dialogs, sheets, menus and route fragments receive a bounded Smart Dark pass inside the MutationObserver microtask, before the browser's next paint, to prevent white popup flashes.
- Smart Dark no longer disables the theme across the whole document while rescanning. Original paint values are cached per element and refreshed locally when a class/style changes.
- Late stylesheet insertion triggers a debounced reconciliation pass plus a follow-up pass, covering components whose colors appear after async CSS loads.
- Text recoloring is now background-aware: dark text is brightened only when the effective surface is or will be dark, preventing white text on missed light cards.
- Small neutral SVG interface icons are detected separately from logos/charts and brightened without recoloring brand graphics.
- Shadow DOM observers now track relevant attribute changes as well as inserted content, so async web components stay themed.
- Linear Style uses stable neutral theme border tokens instead of `currentColor`, keeping outlines subtle when Smart Dark is active.
- No geometry properties are changed by Smart Dark; extension manifest `version` and `version_name` remain exactly `1`.


## Smart Dark v4 (manifest version remains 1)
- Live hover/focus/transition reconciliation.
- Viewport-priority rescans for lazy and AJAX surfaces.
- Cross-origin embedded panels inherit top-site settings.
- Conservative pseudo-element and neutral-gradient darkening.
- Selective neutral recoloring for logo SVG typography/paths.
- Dedicated document_start prepaint and complete live cleanup on disable.


## Performance architecture update

- Heavy localization dictionaries are loaded only when Persian localization is enabled.
- Cursor catalog is loaded only when custom cursor is enabled.
- Font-only mode no longer walks every text node or observes every character mutation.
- Shadow DOM discovery is incremental and bounded instead of full-document polling.
- Smart Dark uses visible-first paint plus time-budgeted idle batches, with no per-frame scroll rescans.
- Smart Dark mutations are handled once in the dedicated path instead of being processed twice by the generic decoration queue.

## Performance architecture refresh (2026-09)

This build keeps the manifest version at `1` while reducing main-thread overhead on large SPAs.

- Optional localization (~806 KB) and cursor catalogs are loaded only when their feature is enabled.
- Font-only mode does not walk every text node or keep a mutation observer alive.
- Smart Dark mutation work is coalesced; hover/focus refreshes only inspect the small interacted subtree.
- Expensive deep scans are chunked into bounded idle slices; visual updates are grouped around animation frames.
- Custom cursor no longer uses a page-wide universal `*` cursor rule in normal mode, and pointermove is bound only for animated cursor motion.
- Shadow DOM discovery is enabled only for features that truly need DOM inspection, observer configurations are reused, and shadow stylesheet syncs are coalesced/cached.
- Font selectors use compact `:is()` groups instead of repeating large protection chains for every tag.

## Smart Dark live-state refresh (v5, manifest remains 1.0.0)

- Neutral interactive controls receive a CSS-level dark hover/focus guard, preventing author `:hover` rules from flashing white before JavaScript reconciliation.
- Existing drawers/popovers that are only shown by class/state changes are rescanned after click/keyboard actions without observing every class mutation on the page.
- Dialogs, notification panels, menus, splash/loading surfaces and scrims use separate dark treatments so modal backdrops remain translucent instead of becoming opaque cards.
- Standard selected/active ARIA states get a dark fallback when an SPA exposes a light selected surface before the dynamic classifier reaches it.
- Smart Dark USER-origin stylesheet updates now carry monotonic revisions and are serialized in the service worker. A stale enable request can no longer win a race after the user disables Smart Dark.
- The cleanup path removes interaction/overlay markers, cancels delayed dark work and releases prepaint state live; no refresh is required to return to the site's original colors.
- The interaction path remains bounded and coalesced to preserve the performance architecture introduced in the previous build.


## Smart Dark v7 — paint-only / low-jank
- Theme detection no longer disables Smart Dark temporarily, avoiding full-page recalc flashes.
- Site radius/geometry are preserved; adaptive menus no longer inject border-radius.
- Generic selected-container background painting was removed.
- Inputs keep original rounded shells; only classified surfaces receive background colors.
- Hover uses cached original paint and no longer re-samples on pointer-out/focus-out.
- Prepaint no longer covers the page with a blank full-screen overlay.
- Smaller idle batches reduce main-thread contention on large dashboards.

## Smart Dark v8 — no-flash interaction pass
- Hover/focus on semantic controls is reconciled synchronously before the next paint, eliminating the visible light frame that could appear before the rAF pass.
- Pointer transitions inside the same control are deduplicated, keeping the synchronous path small on large SPAs.
- Neutral Smart Dark controls suppress only color/background/border interpolation while hovered, preserving transform/opacity/filter motion without animating through a light site color.
- Newly opened dialogs, menus, drawers, notifications, splash/loading surfaces and scrims receive a semantic dark marker immediately in the MutationObserver microtask before the regular bounded scan.
- Generic DOM hover work remains frame-coalesced; only real interactive controls take the tiny pre-paint path.

## Smart Dark v9 - Predictive No-Flash interaction guard
- Hover/focus dark state is primed before the first painted interaction frame.
- First-hover classification uses at most one lightweight background-color probe for an unclassified control; full paint analysis is deferred to the coalesced frame queue.
- Brand/CTA controls are explicitly preserved instead of being forced into neutral dark hover colors.
- Newly mounted AJAX controls and Shadow DOM controls receive cheap predictive guards immediately.
- Plain text links are not bulk-scanned at startup; startup priming targets controls/navigation only to keep large pages responsive.
- Disabling Smart Dark still clears every dark marker live.


## Smart Dark v10 performance pass
- Lazy pseudo-element probing cuts computed-style work on ordinary nodes.
- Hover/focus hot path avoids forced style/layout reads.
- Mutation roots are ancestor-coalesced and frame-budgeted.
- Scroll/resize reconciliation is truly debounced and samples a smaller viewport grid.
- Deep scans use smaller idle slices to protect interaction responsiveness.
- Click/keyboard reconciliation uses one async follow-up instead of three repeated sweeps.

## Performance v11 adaptive scheduler
- Smart Dark now backs off automatically when the page is producing long main-thread tasks.
- Uses native `scrollend` where available instead of running debounce work on every scroll event.
- Deep Smart Dark scanning is scheduled as low-priority/idle work with smaller adaptive budgets under load.
- Turning Smart Dark off removes the visual gate immediately and cleans internal DOM markers in tiny background chunks.
- Theme detection no longer observes high-churn inline `style` mutations on app shells.

## Persian structure / bidi repair patch
- «اصلاح چیدمان متن فارسی» now fixes the containing text structure, not only the innermost text span.
- Persian-dominant lines that begin with Latin names such as `OpenAI:` keep an RTL base instead of being flipped back to LTR by first-strong-character detection.
- Markdown `UL/OL > LI > P` structures are repaired as a unit, so bullets/numbers move to the right together with Persian list text.
- Mixed English/Persian runs remain isolated and readable; editable controls are still excluded to protect caret/selection behavior.
- The structural marker changes only bidi direction and text alignment. It does not change width, gap, padding, margins, flex order, or site geometry.
- RTL structure markers are removed live when the feature is disabled, including open Shadow DOM roots.
- Manifest/version remain exactly `1.0.0`.

### RTL structure repair v13
- Assistant/prose markdown containers are detected semantically and Persian-dominant blocks are aligned right without changing code blocks or action toolbars.
- List repair now supports both native `ul/ol/li` and ARIA `role=list/listitem` structures.
- RTL lists temporarily receive `dir="rtl"` so browser marker placement moves bullets/numbers to the correct start edge; the original `dir` value is restored when the feature is disabled.

## RTL structure repair v15
- Persian-dominant prose blocks now receive a reversible inline `direction: rtl`, `text-align: right`, and bidi isolation override. This intentionally beats late-loading framework utility CSS that previously kept some ChatGPT/SPA blocks visually left-aligned even after markers were added.
- RTL prose roots explicitly repair descendant `ul`/`ol` list rails so bullets/numbers move to the RTL start edge rather than remaining on the physical left.
- Auto RTL and Persian layout enhancement now share the same structural RTL repair path instead of relying on CSS that was previously gated only by the bidi-repair/localization switch.
- All inline overrides are recorded and restored when the relevant RTL features are disabled.


## v1 / Smart Dark v11 + Search Console
- Version labels now come from `chrome.runtime.getManifest()` so UI, backups and manifest cannot drift.
- Smart Dark hover guard now covers custom clickable rows, accordions, tabindex controls, native checkboxes/radios and switch controls before paint.
- Neutral surfaces no longer gain arbitrary blue/green/warm/purple tinting.
- Dark SVG wordmarks keep colorful brand paths while dark neutral paths are lifted; raster wordmarks get an adaptive dark-background filter.
- Google Search Console (`search.google.com`) has a dedicated Persian localization pack plus notification patterns.


## Release: pinned version 1 / Smart Dark prepaint v2 / Search Console compact FA / Smart RTL Beta
- Manifest `version` and `version_name` are intentionally pinned to `1` and should not be incremented.
- Smart Dark now uses registered pre-paint CSS at `document_start`, keeps its shield until runtime takeover, and has a first-frame hover/control safety net.
- Search Console translations favor short familiar SEO wording to avoid responsive wrapping.
- Smart RTL Beta performs a fast geometry-safe Persian UI pass and updates text inputs live.


## Search Console dark/UI localization fix
- Google Search Console URL inspection/search fields and their Material shells are painted dark at pre-paint and USER-origin runtime layers.
- Notification/message row hover and checkbox states stay dark without changing layout geometry.
- Search Console current overview, messages, performance and rich-result labels have concise Persian mappings; schema property names such as `offers`, `review` and `aggregateRating` remain technical identifiers.
- Localization is text-only and does not change flex/grid/width/height/padding/margins, protecting responsive layouts.
- Manifest `version` and `version_name` are intentionally pinned to `1`.

## Context-menu emoji cache performance fix
- Selected downloadable emoji packs are proactively warmed from persistent Cache Storage for saved sites.
- Common reaction emoji are rasterized during idle time and cached per document (bounded LRU) so custom context menus do not pay first-use canvas/font work.
- Duplicate glyph renders share one in-flight promise.
- Emoji cache misses are deferred outside the right-click hot path; the host menu gets a paint before any expensive rasterization.
- The context-menu hot guard now activates when emoji styling is enabled, even if Smart Dark and other features are off.
- Extension version remains exactly `1`.


## Search Console hover + icon-ligature protection fix
- Search Console notification rows are detected from the hovered message/checkbox relationship and marked before paint, including anonymous nested DIV rows.
- Dark hover overrides are paint-only and never modify spacing, sizing, flex/grid order, or responsive geometry.
- Material Icons / Material Symbols / Google Symbols ligature nodes are excluded from localization, preventing translated icon names such as `home`, `search`, `close`, `more_vert`, or `expand_more` from making site icons disappear.
- Icon-font detection also checks the computed icon font on short ligature candidates, covering generated Google class names.
- Manifest `version` and `version_name` remain exactly `1`.

## 2026-09-20 platform localization + select paint patch
- Expanded curated Persian UI coverage for YouTube, YouTube Studio, Instagram, and Google Search Console.
- Added dynamic count/status translations while keeping creator/user content excluded.
- Fixed Smart Dark closed custom-select value wrappers so only the opened picker/listbox gets a dark surface.
- Extension manifest version remains exactly `1`.

## Smart Dark v27 - seamless surfaces
- Added universal surface-coherence for nested light wrappers so one card/dialog/table region does not turn into mismatched dark tiles.
- Segmented search/input prefixes and suffixes now inherit the field surface instead of keeping white/light rectangles.
- Existing dialogs/drawers that open by class/style changes are reclassified without requiring a reload.
- Smart Dark now watches framework `class`/`style` state changes in the document and Shadow DOM while keeping version code `1`.

## Google localization suite v28
- Added a shared Persian UI layer for the Google product family plus dedicated packs for Workspace, Search, Maps/Travel, Google Account, AI, Ads/Analytics, Cloud/Firebase, Search Console and other Google-owned web surfaces.
- Covered current browser surfaces for Gmail, Drive, Docs/Sheets/Slides/Forms, Calendar, Meet, Chat, Contacts, Keep, Tasks, Groups, Classroom, Photos, One, Maps, News, Translate, Trends, Scholar, Play, Books, Finance, Flights, Travel, Shopping, Voice, Messages, Pay/Wallet, Gemini, NotebookLM, AI Studio, Colab, Search Console, Ads, Analytics, Tag Manager, AdSense, AdMob, Ad Manager, Merchant Center, Business Profile, Looker Studio, Cloud, Firebase, Developers, Fonts, Help, My Activity, Takeout, Password Manager, Earth, Arts & Culture, Workspace, Admin, Vault, Vids, Workspace Studio, Chrome Web Store, Assistant, Home, Families, Lens, Alerts, Patents, Dataset Search, Research, Labs and Maps Platform.
- `google.com` acts as a safe generic fallback for future/new Google subdomains; dedicated service packs take priority.
- Added conservative dynamic UI patterns for counts, selected/unread states, pagination, storage usage, relative time and action+noun labels.
- Docs now also carries Sheets/Slides/Forms UI terminology because those editors commonly run under `docs.google.com` paths.
- Site catalog is regenerated from the runtime pack and now reports the expanded localization coverage while the extension manifest version remains exactly `1`.

## Localization expansion v29 (2026-09-20)
- Expanded AI-service localization with shared high-frequency UI dictionaries across 121 AI domains/surfaces.
- Added sentence-level UI localization and dynamic templates for usage limits, credits, upload errors, generation failures, research/source messages, permissions and plan restrictions.
- Long UI strings on recognized AI services are supported up to 1000 characters while chat/model/user-generated content remains excluded from localization.
- Added/expanded ChatGPT, Claude, Gemini, Perplexity, Copilot, Mistral Vibe, DeepSeek, Kimi, Qwen, Z.ai, Grok, Poe, Midjourney, Runway, Suno, ElevenLabs, PixVerse, Kling, Higgsfield and many additional AI/research/coding/creative services.
- Manifest version remains exactly 1 / 1.

## AI Localization v30
- Long AI UI text support raised to 2400 characters, with exact long-form phrases, safe dynamic templates, and multi-sentence composition.
- Adds 190 more named AI product surfaces across chat/search, research, meetings, coding agents, app builders, image/video/audio, 3D, presentations, data and writing.
- Adds a conservative generic fallback for unknown `.ai` domains while preserving user prompts/messages/generated responses from localization.
- Manifest version remains exactly `1`.

## AI localization v31
- Long-form AI UI localization now accepts text blocks up to 12,000 characters.
- Adds sentence/paragraph composition, dynamic quota/upload/share/permission rules, and generated long UI messages.
- Expands named AI web coverage and keeps a conservative fallback for new .ai and AI-named web apps.
- Extension manifest version remains exactly 1.


## Localization expansion v32
- Broader localization for ordinary websites plus admin/CMS, developer/cloud, database/backend, observability, API/business, productivity, and design tools.
- Adds a cross-site UI phrase bridge so existing high-quality Persian translations can be reused safely on recognized application chrome without copying huge dictionaries per domain.
- Adds long-form panel UI support up to 1800 characters on recognized deep-localization surfaces.
- Adds generic management-panel detection for common self-hosted paths such as wp-admin, cPanel, WHM, Plesk, DirectAdmin, Webmin, phpMyAdmin, and Adminer.
- Keeps version and version_name fixed at 1.

## Pro Localization Suite v33

- گسترش بومی سازی برای پنل های مدیریت، توسعه، طراحی، CI/CD، دیتابیس، امنیت، CRM، مستندات و سایت های عمومی.
- پشتیبانی از 535 دامنه نام دار جدید و استفاده از واژگان جدید روی سایت های شناخته شده نسخه های قبلی.
- حدود 10 هزار عبارت رابط مستقیم، بیش از 400 پیام و جمله بلند و الگوهای پویا برای شمارنده ها، زمان، مصرف و وضعیت ها.
- سقف متن رابط در سایت های Deep Localization از 1800 به 6000 کاراکتر افزایش یافته است.
- کد نسخه افزونه همچنان 1 باقی مانده است.



## Visual / Motion runtime reliability update

- Style and motion toggles now re-apply immediately on live pages and repair themselves if an SPA replaces the extension style node.
- Smart rounded corners now has an actual 10px paint rule after semantic/layout-safe detection.
- Motion crossfade observes text changes even when no typography/localization feature is enabled.
- State morphing is primed on activation so the first expanded/selected/pressed state change animates.
- Liquid Glass, Linear, adaptive menus, focus and polished inputs now participate in Shadow DOM discovery and newly mounted component trees.
- Common Radix/custom dropdown/popover surfaces are recognized.
- Visual features can initialize inside embedded frames without enabling unrelated localization work.
- Animation work stays compositor-first (opacity/filter/scale) and respects prefers-reduced-motion.

## Smart Dark rebuild v36 - Dark Reader Dynamic core

- Rebuilt Smart Dark around an embedded, locally adapted subset of Dark Reader's MIT-licensed Dynamic Theme color transformation core instead of the previous tone-bucket classifier.
- Bright and colored author backgrounds are transformed per computed color while preserving the site's hue relationships; text, borders, gradients and color-bearing shadows are transformed through the matching Dark Reader-style foreground/background/border mappings.
- Real media (`img`, `video`, poster/content imagery) remains protected instead of being globally inverted.
- The first visible viewport is processed behind the existing pre-paint shield before the page is revealed, reducing light islands and light-to-dark flashes on initial load.
- SPA mutations receive a larger immediate dark pass before deeper idle scanning, including portals, dialogs, menus and newly mounted component trees.
- The Dark Reader core is vendored locally; PersianYar does not load executable code from a CDN. Attribution and the MIT text are included in `THIRD_PARTY_NOTICES.txt` and `licenses/DARK_READER_LICENSE.txt`.
- Extension manifest `version` and `version_name` remain exactly `1`.


## Smart Dark v37 - Fast Dynamic rebuild
- Removed the blocking full-screen loader and global `:has()`/hover repaint rules.
- Smart Dark is now strictly paint-only and never changes layout geometry.
- Heavy runtime is skipped in unrelated cross-origin frames.
- Removed SVG/logo/pseudo/shadow analysis from the hot path to prevent forced-layout jank.
- First paint transforms only the visible shell; remaining DOM work is processed in small idle batches.
- Mutation tracking no longer watches every class/style update across the page.
- Dynamic color mapping remains based on the embedded MIT-licensed Dark Reader color core.

## Smart Dark v38 - CSSOM palette rewrite
- Replaces the element-by-element dark paint path with a CSS-rule-first engine.
- Readable author CSS is recolored directly in CSSOM (`CSSStyleRule.style`), preserving the site's original selectors, cascade, hover/focus states, media/container queries, keyframes, and responsive behavior.
- Color-bearing CSS custom properties are rewritten at their original selector scope, so new SPA elements automatically inherit the dark palette without a DOM scan.
- Cross-origin stylesheets that browser CSSOM security prevents reading use one color-only fallback stylesheet fetched through the extension; local/readable sheets are not duplicated.
- Modern CSS colors (including oklch/lab/hwb/display-p3/color-mix where supported by Chromium canvas parsing), gradients, borders, shadows, SVG fill/stroke declarations and native control color-scheme are handled at stylesheet level.
- Disabling Smart Dark restores recorded author declaration values when the site has not replaced them meanwhile.
- The CSS-first engine performs no `getComputedStyle`, `elementsFromPoint`, or full element-tree paint scan.
- Extension manifest `version` and `version_name` remain exactly `1`.


### Smart Dark CSSOM v39
- Converts light authored backgrounds and dark authored foregrounds at CSS rule level.
- Handles background/border/outline/text-decoration shorthands, WebKit text colors, gradients and scrollbar colors.
- Propagates semantic usage through chained CSS variables (design-token aliases).
- Adds conservative luminance inference for otherwise unclassified neutral palette variables.
- Keeps brand/high-chroma colors intact unless their CSS usage identifies a foreground/background role.

## 2026-09-20 style engine tuning + real glass

- Liquid Glass now targets actual UI shells as well as floating menus: semantic headers/navigation/sidebars plus common Bootstrap, MUI, Ant Design, Chakra and Radix surfaces.
- Glass uses transparent background paint plus static `backdrop-filter` blur/saturation, edge highlights and a no-filter fallback; no blur animation or continuous layout scan is used.
- Added per-site controls for glass tint, blur, opacity, saturation and tint strength.
- Linear Style now has a configurable color, opacity and 1-3px outline width while preserving geometry.
- Better Dropdowns recognizes common framework menu/listbox surfaces, selected/highlighted states, dividers and disabled items.
- Clear Focus uses `:focus-visible`, configurable color/width and a forced-colors fallback.
- Polished Inputs now applies theme-aware surface, border, caret, placeholder, selection and focus paint without changing control size or `appearance`.
- All visual tuning is selector/CSS-variable driven and changes are debounced in the popup; no perpetual DOM polling was added.
