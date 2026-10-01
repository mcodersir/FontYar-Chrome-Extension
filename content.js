(() => {
  if (globalThis.__FONTYAR_V1_CONTENT_LOADED__) return;
  globalThis.__PERSIANYAR_SMART_DARK_ENGINE__ = "v39-cssom-contrast-aware-cache";
  globalThis.__FONTYAR_V1_CONTENT_LOADED__ = true;

  const FONT_STYLE_ID = "__fontyar_style";
  const AUX_STYLE_ID = "__fontyar_aux_style";
  const EMOJI_STYLE_ID = "__fontyar_emoji_style";
  const SOFT_STYLE_ID = "__fontyar_soft_style";
  const SITE_STYLE_ID = "__persianyar_site_style";
  const SMART_DARK_LOADING_ID = "__persianyar_smart_dark_loading";
  const SMART_DARK_LOADING_STYLE_ID = "__persianyar_smart_dark_loading_style";
  const SMART_DARK_LOADING_ATTR = "data-persianyar-smart-dark-loading";
  const CURSOR_STYLE_ID = "__persianyar_cursor_style";
  const CURSOR_OVERLAY_ID = "__persianyar_cursor_overlay";
  const CURSOR_CACHE_KEY = "persianyarCursorCacheV6";
  let cursorApplyVersion = 0;
  let cursorRuntimeAsset = null;
  let cursorHoverTarget = null;
  let cursorHoverBound = false;
  let cursorMoveBound = false;
  let cursorOverlayPack = null;
  let cursorOverlayEl = null;
  let cursorOverlayImg = null;
  let cursorOverlayTrails = [];
  let cursorOverlayTrailPos = [];
  let cursorOverlayState = "default";
  let cursorOverlayHotspot = [0,0];
  let cursorOverlayTarget = {x:-100,y:-100};
  let cursorOverlayPos = {x:-100,y:-100};
  let cursorOverlayVisible = false;
  let cursorOverlayPressed = false;
  let cursorOverlayRaf = 0;
  let cursorOverlayLastFrame = 0;
  let cursorConfigSignature = "";
  let cursorPreloadImages = [];
  let cursorHideTimer = 0;
  let cursorLastContextMenuAt = 0;
  let contextMenuHotUntil = 0;
  const CONTEXT_MENU_HOT_WINDOW_MS = 260;
  // Common reaction glyphs are rasterized during idle time after the selected emoji font is ready.
  // Custom context menus (reactions, quick actions, message menus) can then mount without paying a
  // first-use canvas/font cost on the same frame as the right-click.
  const COMMON_REACTION_EMOJIS = Object.freeze([
    "👍","❤️","😂","🤣","😍","🥰","😊","😁","😄","😅","😢","😭","😮","😲","😡","🤔",
    "🙏","👏","🔥","🎉","✨","💯","✅","❌","👎","👌","🤝","💪","👀","💡","🚀","⭐",
    "🙂","🙃","😉","😎","🤩","🥳","😱","🤯","😴","🤗","🫡","❤️‍🔥","💔","👋","🙌","🫶"
  ]);
  const cursorSizedUrlCache = new Map();
  const SHADOW_STYLE_ATTR = "data-fontyar-shadow-style";
  const EMOJI_CLASS = "__fontyar_emoji";
  const EMOJI_ATTR = "data-fontyar-emoji";
  const EMOJI_IMAGE_ATTR = "data-fontyar-emoji-image";
  const EMOJI_SEMANTIC_ATTR = "data-fontyar-semantic-emoji";
  const EMOJI_CHAR_ATTR = "data-fontyar-emoji-char";
  const EMOJI_POSITION_ATTR = "data-fontyar-emoji-positioned";
  const ICON_LIGATURE_ATTR = "data-persianyar-icon-ligature";
  const RTL_TEXT_ATTR = "data-fontyar-rtl-text";
  const RTL_STRUCTURE_ATTR = "data-fontyar-rtl-structure";
  const RTL_PROSE_ATTR = "data-fontyar-rtl-prose";
  const CHATGPT_RTL_PROSE_ATTR = "data-persianyar-chatgpt-rtl-prose";
  const CHATGPT_RTL_BLOCK_ATTR = "data-persianyar-chatgpt-rtl-block";
  const CHATGPT_RTL_LIST_ATTR = "data-persianyar-chatgpt-rtl-list";
  const SIZE_ATTR = "data-fontyar-size";
  const LINE_HEIGHT_ATTR = "data-fontyar-line-height";
  const SOFT_CORNER_ATTR = "data-fontyar-soft-corner";
  const SOFT_MOTION_ATTR = "data-fontyar-soft-motion-control";
  const SOFT_SURFACE_ATTR = "data-fontyar-soft-surface";
  const SOFT_STAGGER_ATTR = "data-fontyar-stagger-item";
  const SOFT_STATE_ATTR = "data-fontyar-state-motion";
  const SOFT_VISUAL_ATTR = "data-fontyar-soft-visual";
  const UNIFORM_CORNER_ATTR = "data-fontyar-uniform-corner";
  const RTL_LAYOUT_ATTR = "data-fontyar-rtl-layout";
  const RTL_ALIGN_ATTR = "data-fontyar-rtl-align";
  const RTL_FLOW_ATTR = "data-fontyar-rtl-flow";
  const SOFT_TRANSFORM_ATTR = "data-fontyar-soft-transform-target";
  const FONT_SCRIPT_ATTR = "data-fontyar-script";
  const DIGIT_SIZE_ATTR = "data-persianyar-digit-size";
  const SHADOW_OUTLINE_ATTR = "data-persianyar-shadow-outline";
  const LIST_MOTION_ATTR = "data-persianyar-list-motion";
  const SHIMMER_ATTR = "data-persianyar-shimmer";
  const TOOLTIP_DELAY_ATTR = "data-persianyar-tooltip-delay";
  const SCROLL_FADE_ATTR = "data-persianyar-scroll-fade";
  const DARK_SURFACE_ATTR = "data-persianyar-dark-surface";
  const DARK_TEXT_ATTR = "data-persianyar-dark-text";
  const DARK_BORDER_ATTR = "data-persianyar-dark-border";
  const DARK_ICON_ATTR = "data-persianyar-dark-icon";
  const DARK_BEFORE_ATTR = "data-persianyar-dark-before";
  const DARK_AFTER_ATTR = "data-persianyar-dark-after";
  const DARK_BGIMAGE_ATTR = "data-persianyar-dark-bgimage";
  const DARK_SHADOW_ATTR = "data-persianyar-dark-shadow";
  const DARK_LOGO_PART_ATTR = "data-persianyar-dark-logo-part";
  const DARK_LOGO_IMAGE_ATTR = "data-persianyar-dark-logo-image";
  const DARK_INTERACTIVE_ATTR = "data-persianyar-dark-interactive";
  const DARK_GSC_ROW_ATTR = "data-persianyar-gsc-hover-row";
  const DARK_OVERLAY_ATTR = "data-persianyar-dark-overlay";
  const DARK_SHADOW_HOST_ATTR = "data-persianyar-smart-dark-host";
  const SMART_DARK_PREPAINT_ATTR = "data-persianyar-smart-dark-prepaint";
  const GLASS_SURFACE_ATTR = "data-persianyar-glass-surface";
  const LINEAR_SURFACE_ATTR = "data-persianyar-linear-surface";
  const DOCUMENT_TOKEN = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  // Motion engine: compositor-first and mutation-coalesced. Avoid geometry/paint-heavy animation work.

  const DEFAULT_CONFIG = Object.freeze({
    paused: false,
    enabled: false,
    fontKey: "Vazirmatn",
    fonts: { fa: "Vazirmatn", en: "Inter", ar: "NotoSansArabic", zh: "NotoSansSC" },
    unifiedFontEnabled: false,
    allFontKey: "Vazirmatn",
    align: "preserve",
    weightMode: "preserve",
    normalWeight: "400",
    boldWeight: "700",
    includeSubdomains: false,
    emojiEnabled: false,
    emojiStyle: "twemoji",
    fontDelta: 0,
    digitMode: "preserve",
    digitFontDelta: 0,
    zwnjMode: "preserve",
    bidiRepair: false,
    rtlBeta: false,
    layoutEnhance: false,
    cursorEnabled: false,
    cursorPackKey: "macos-black",
    cursorSize: 32,
    cursorMotionEnabled: false,
    cursorMotionPreset: "smooth",
    cursorSmoothness: 35,
    cursorTrailEnabled: false,
    cursorTrailLength: 3,
    cursorClickEffectEnabled: true,
    cursorHoverScaleEnabled: true,
    cursorGlowEnabled: false,
    localizeEnabled: false,
    softMotionEnabled: false,
    motionHoverEnabled: true,
    motionPopEnabled: true,
    motionStaggerEnabled: true,
    motionCrossfadeEnabled: true,
    motionMorphEnabled: true,
    motionSharedLayoutEnabled: true,
    motionRubberEnabled: true,
    motionSafePolygonEnabled: true,
    motionListEnabled: true,
    motionShimmerEnabled: true,
    motionTooltipDelayEnabled: true,
    motionTabularNumsEnabled: true,
    motionScrollFadeEnabled: true,
    motionSliderMorphEnabled: true,
    motionSharedElementEnabled: true,
    motionIconCrossfadeEnabled: true,
    softCorners: false,
    uniformCornersEnabled: false,
    uniformCornerRadius: 14,
    removeShadows: false,
    smoothScrollEnabled: false,
    smartDarkMode: false,
    smartDarkPreset: "balanced",
    smartDarkBackgroundColor: "#181a1b",
    smartDarkTextColor: "#e8e6e3",
    smartDarkAccentColor: "#8ab4f8",
    smartDarkBrightness: 100,
    smartDarkContrast: 100,
    smartDarkSepia: 0,
    smartDarkGrayscale: 0,
    liquidGlassMode: false,
    linearStyleMode: false,
    adaptiveMenusMode: false,
    focusEnhanceMode: false,
    polishedInputsMode: false,
    liquidGlassBlur: 18,
    liquidGlassOpacity: 58,
    liquidGlassSaturation: 138,
    liquidGlassTintColor: "#8ab4f8",
    liquidGlassTintStrength: 8,
    linearStyleColor: "#94a3b8",
    linearStyleOpacity: 24,
    linearStyleWidth: 1,
    menuHighlightStrength: 12,
    focusRingColor: "#5b9cff",
    focusRingWidth: 2,
    inputHighlightStrength: 16
  });

  const FONT_KEYS = Object.freeze({
    fa: new Set(["Vazirmatn","Estedad","Mikhak","Shabnam","Sahel","Samim","Parastoo","Tanha","Gandom","Nahid","Lalezar","Vazir","IranNastaliq"]),
    en: new Set(["Inter","Roboto","OpenSans","Montserrat","Poppins","Lato","SourceSans3","Merriweather","PlayfairDisplay","SegoeUI","Arial","Georgia"]),
    ar: new Set(["NotoSansArabic","NotoNaskhArabic","NotoKufiArabic","Cairo","Tajawal","Almarai","Changa","IBMArabic","TahomaArabic"]),
    zh: new Set(["NotoSansSC","NotoSerifSC","LXGWWenKai","MaShanZheng","ZCOOLXiaoWei","MicrosoftYaHei","DengXian","PingFangSC"])
  });
  const ALL_FONT_KEYS = new Set([...FONT_KEYS.fa, ...FONT_KEYS.en, ...FONT_KEYS.ar, ...FONT_KEYS.zh]);

  const EMOJI_STYLES = Object.freeze({
    system: { stack: ["Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji"] },
    android: { stack: ["Noto Color Emoji","Segoe UI Emoji","Apple Color Emoji"] },
    windows: { stack: ["Segoe UI Emoji","Fluent Emoji Color","Noto Color Emoji","Apple Color Emoji"] },
    apple: { stack: ["Apple Color Emoji","Fluent Emoji Color","Noto Color Emoji","Segoe UI Emoji"] },
    twemoji: { stack: ["Jdecked Twemoji","Noto Color Emoji","Segoe UI Emoji"] },
    twemojiVector: { stack: ["FontYar Twemoji Vector","Jdecked Twemoji","Noto Color Emoji"] },
    fluentColor: { stack: ["Fluent Emoji Color","Noto Color Emoji","Segoe UI Emoji"] },
    fluentFlat: { stack: ["Fluent Emoji Flat","Noto Color Emoji","Segoe UI Emoji"] },
    fluentHC: { stack: ["FontYar Fluent Mono","Noto Emoji","Segoe UI Symbol"] },
    openmojiColor: { stack: ["OpenMoji","Noto Color Emoji","Segoe UI Emoji"] },
    openmojiBlack: { stack: ["OpenMoji Black","Noto Emoji","Segoe UI Symbol"] },
    notoMono: { stack: ["Noto Emoji","Segoe UI Symbol"] },
    blobmoji: { stack: ["Blobmoji","Noto Color Emoji","Segoe UI Emoji"] },
    emojitwo: { stack: ["FontYar EmojiTwo","Noto Color Emoji","Segoe UI Emoji"] },
    tossface: { stack: ["FontYar Toss Face","Noto Color Emoji","Segoe UI Emoji"] },
    notoColor: { stack: ["PersianYar Noto Color","Noto Color Emoji","Segoe UI Emoji"] },
    twemojiBitmap: { stack: ["PersianYar Twemoji Bitmap","Jdecked Twemoji","Noto Color Emoji"] },
    openmojiVector: { stack: ["PersianYar OpenMoji Vector","OpenMoji","Noto Color Emoji"] },
    openmojiBitmap: { stack: ["PersianYar OpenMoji Bitmap","OpenMoji","Noto Color Emoji"] },
    emojiTwoVector: { stack: ["PersianYar EmojiTwo Vector","FontYar EmojiTwo","Noto Color Emoji"] }
  });

  const TEXT_TAGS = "body,p,span,a,div,li,dt,dd,h1,h2,h3,h4,h5,h6,article,section,main,header,footer,nav,aside,blockquote,figcaption,caption,td,th,label,button,input,textarea,select,option,summary,details,small,strong,b,em,mark,time,yt-formatted-string,yt-attributed-string";
  const BLOCK_TAGS = "p,div,li,dt,dd,h1,h2,h3,h4,h5,h6,article,section,main,header,footer,nav,aside,blockquote,figcaption,caption,td,th,label,button,input,textarea,select,summary,details,yt-formatted-string,yt-attributed-string";
  const BOLD_TAGS = "h1,h2,h3,h4,h5,h6,strong,b";
  const SIZE_TAGS = "p,span,a,li,dt,dd,h1,h2,h3,h4,h5,h6,blockquote,figcaption,caption,td,th,label,button,input,textarea,select,option,summary,small,strong,b,em,mark,time,yt-formatted-string,yt-attributed-string";

  const PROTECTED_ROOTS = [
    "svg","math","code","pre","kbd","samp","canvas","script","style","noscript","template",
    `[${EMOJI_ATTR}]`,`[${ICON_LIGATURE_ATTR}]`,"[aria-hidden='true']","[role='img']","[role='presentation']","[data-icon]","[data-lucide]",
    "yt-icon","ytcp-icon","iron-icon","tp-yt-iron-icon","mat-icon","md-icon","[part='icon']",
    "[class~='fa']","[class^='fa-']","[class*=' fa-']","[class*='fontawesome']",
    "[class*='material-icons']","[class*='material-symbols']","[class*='google-symbol']","[class*='google-material-icon']","[class*='mdi']",
    "[class*='bootstrap-icons']","[class~='bi']","[class^='bi-']","[class*=' bi-']",
    "[class*='icomoon']","[class*='remixicon']","[class^='ri-']","[class*=' ri-']",
    "[class*='tabler-icon']","[class*='lucide']","[class*='heroicon']","[class*='phosphor']",
    "[class*='monaco-editor']","[class*='CodeMirror']","[class*='codemirror']"
  ].join(",");
  // Font application is slightly less restrictive than localization/emoji processing. Some web
  // components expose visible text through aria-hidden/presentation wrappers; keeping those wrappers
  // font-eligible fixes missed labels without touching real SVG/icon-font roots.
  const FONT_PROTECTED_ROOTS = PROTECTED_ROOTS.split(",").filter(selector => selector !== "[aria-hidden='true']" && selector !== "[role='presentation']").join(",");
  const EDITABLE_ROOTS = "textarea,input,select,option,[contenteditable='true'],[contenteditable='plaintext-only']";
  // role=img / aria-hidden / presentation are commonly used by emoji pickers and reaction bars.
  // They must stay protected for general typography/localization, but emoji detection is safe to
  // enter them because we only touch complete Unicode emoji graphemes (or tiny emoji images).
  const EMOJI_PROTECTED_ROOTS = PROTECTED_ROOTS.split(",").filter(selector => !["[aria-hidden='true']","[role='img']","[role='presentation']"].includes(selector)).join(",");
  const EMOJI_HARD_SKIP_ROOTS = "svg,math,code,pre,kbd,samp,canvas,script,style,noscript,template,[class*='monaco-editor'],[class*='CodeMirror'],[class*='codemirror']";
  const EMOJI_SKIP_ROOTS = `${EDITABLE_ROOTS},${EMOJI_PROTECTED_ROOTS}`;
  const FORM_TEXT_CONTROLS = "input:not([type='checkbox']):not([type='radio']):not([type='range']):not([type='color']),textarea,select,option,[contenteditable='true'],[contenteditable='plaintext-only']";
  const SELECTION_INPUT_TYPES = new Set(["text","search","url","tel","password"]);
  const TEXT_SKIP_ROOTS = `${EDITABLE_ROOTS},${PROTECTED_ROOTS}`;
  const LOCALIZE_GENERIC_EXCLUDE = [
    "article","[role='article']","blockquote","[data-fontyar-no-localize]","[contenteditable='true']","[contenteditable='plaintext-only']",
    "[class*='comment-body' i]","[class*='comment-content' i]","[class*='caption' i]","[class*='post-content' i]","[class*='message-content' i]","[class*='message-text' i]"
  ].join(",");
  const LOCALIZE_SITE_EXCLUDES = Object.freeze({
    "x.com":"article,[data-testid='tweetText'],[data-testid='messageEntry'],[data-testid='DMDrawer'] [dir='auto'],[data-testid*='videoPlayer'] [dir='auto']",
    "twitter.com":"article,[data-testid='tweetText'],[data-testid='messageEntry'],[data-testid='DMDrawer'] [dir='auto'],[data-testid*='videoPlayer'] [dir='auto']",
    "instagram.com":"article,[role='main'] article,[data-testid*='comment' i],[class*='caption' i],[class*='comment' i],[class*='x1lliihq'][dir='auto']",
    "youtube.com":"ytd-rich-item-renderer,ytd-video-renderer,ytd-grid-video-renderer,ytd-playlist-video-renderer,ytd-comment-thread-renderer,ytd-watch-metadata,yt-lockup-view-model,#description-inline-expander,.ytp-caption-window-container,.ytp-caption-segment,[class*='caption-window' i],[class*='subtitle' i]",
    "reddit.com":"shreddit-post,shreddit-comment,[data-testid='post-container'],[slot='comment'],[data-click-id='text']",
    "linkedin.com":".feed-shared-update-v2,.comments-comment-item,.msg-s-message-list,.msg-s-event-listitem",
    "facebook.com":"[role='article'],[data-pagelet*='FeedUnit'],[data-pagelet*='Messenger']",
    "discord.com":"[class*='messageContent' i],[class*='markup' i][class*='message' i]",
    "tiktok.com":"[data-e2e*='video-desc'],[data-e2e*='comment-level']",
    "web.whatsapp.com":"[data-testid='msg-container'],[data-testid='conversation-panel-messages'],[class*='message-in'],[class*='message-out']",
    "web.telegram.org":".message,.Message,.bubble,.Bubble,[class*='message-content' i]",
    "medium.com":"article,[data-testid='storyContent']",
    "github.com":".markdown-body,.js-comment-body,[data-testid='comment-body']",
    "studio.youtube.com":"ytcp-video-row ytcp-video-row-header,ytcp-comment-thread,ytcp-comment,ytcp-comments-section,ytcp-playlist-row,[data-testid*='comment' i],[class*='comment-text' i],[class*='video-title' i]",
    "mail.google.com":".a3s,.ii.gt,[role='main'] [data-legacy-thread-id],[role='main'] [data-thread-id],[role='main'] [data-message-id]",
    "drive.google.com":"[role='main'] [role='gridcell'],[role='main'] [role='row'] [data-id],[role='main'] [data-target='doc']",
    "docs.google.com":".kix-appview-editor,.waffle-grid-container,.sketchy-text,[role='textbox'],[contenteditable='true'],[contenteditable='plaintext-only']",
    "calendar.google.com":"[data-eventid],[data-eventchip],[data-calendar-event-id],[role='main'] [data-dragsource-type]",
    "meet.google.com":"[data-message-text],[data-chat-message],[aria-live='polite'] [data-self-name]",
    "photos.google.com":"[role='main'] [data-latest-bg],[role='main'] [data-item-index]",
    "outlook.live.com":"[role='main'] [data-convid],[role='main'] [data-message-id],[aria-label*='Reading pane' i]",
    "outlook.office.com":"[role='main'] [data-convid],[role='main'] [data-message-id],[aria-label*='Reading pane' i]",
    "outlook.office365.com":"[role='main'] [data-convid],[role='main'] [data-message-id],[aria-label*='Reading pane' i]",
    "teams.microsoft.com":"[data-tid*='message' i],[data-tid='chat-pane-message'],[data-tid='channel-pane-message']",
    "app.slack.com":"[data-qa='message_container'],[data-qa='message_content'],[data-qa='virtual-list-item'] [data-qa*='message' i]",
    "chatgpt.com":"article,[data-message-author-role],[data-testid*='conversation-turn' i]",
    "claude.ai":"[data-testid*='message' i],[class*='font-claude-message' i]",
    "gemini.google.com":"[class*='conversation' i],[class*='message' i],[class*='response' i],[class*='query' i],model-response,user-query",
    "perplexity.ai":"article,[class*='prose' i],[class*='answer' i],[class*='query' i],[class*='thread' i],[data-testid*='answer' i]",
    "copilot.microsoft.com":"article,[class*='message' i],[class*='response' i],[data-content*='message' i]",
    "poe.com":"article,[class*='Message' i],[class*='ChatMessage' i],[class*='messageText' i]",
    "grok.com":"article,[class*='message' i],[class*='response' i],[data-testid*='message' i]",
    "notebooklm.google.com":"[class*='source-content' i],[class*='note-content' i],[class*='chat-message' i],[class*='response' i]",
    "soundcloud.com":"[class*='soundList' i],[class*='soundTitle' i],[class*='trackItem' i],[class*='comment' i],[class*='userBadge' i]",
    "music.apple.com":"[class*='track' i],[class*='song' i],[class*='album' i]",
    "bandcamp.com":"[class*='track' i],[class*='lyrics' i],[class*='tralbum' i]",
    "tidal.com":"[class*='track' i],[class*='media' i]",
    "deezer.com":"[class*='track' i],[class*='song' i]",
    "threads.net":"article,[role='article']",
    "bsky.app":"article,[data-testid*='post' i],[data-testid*='feedItem' i]",
    "substack.com":"article,[class*='post' i],[class*='comment' i]",
    "patreon.com":"article,[data-tag*='post' i],[class*='comment' i]"
  });
  const SOFT_CORNER_SELECTOR = "button,input:not([type='checkbox']):not([type='radio']):not([type='range']):not([type='color']),select,textarea,[role='button'],[role='menuitem'],[role='tab'],[role='listbox'],[role='dialog']";
  const UNIFORM_CORNER_SELECTOR = "button,input,select,textarea,article,section,aside,nav,header,footer,dialog,[role='button'],[role='menu'],[role='menuitem'],[role='tab'],[role='listbox'],[role='dialog'],[role='card'],[class*='card' i],[class*='panel' i],[class*='modal' i],[class*='popover' i],[class*='menu' i]";
  const SOFT_MOTION_SELECTOR = "button,input,select,textarea,summary,a,[role='button'],[role='menuitem'],[role='tab'],[role='option'],[role='switch'],[role='checkbox'],[role='combobox'],[role='dialog'],[role='menu'],[role='listbox'],[role='tooltip'],[aria-haspopup],[aria-pressed],[aria-expanded],dialog,[popover]";
  const SOFT_INTERACTIVE_SELECTOR = "button,a,input,select,textarea,summary,[role='button'],[role='menuitem'],[role='tab'],[role='option'],[role='switch'],[role='checkbox'],[role='combobox'],[role='link'],[aria-pressed],[aria-expanded],[aria-haspopup]";
  const SOFT_PRESSABLE_SELECTOR = "button,[role='button'],[role='menuitem'],[role='tab'],[role='option'],[role='switch'],[role='checkbox'],summary,[aria-pressed],[aria-expanded],[aria-haspopup]";
  const SOFT_FLOATING_SELECTOR = "[popover]:popover-open,dialog[open],[role='dialog'],[role='menu'],[role='listbox'],[role='tooltip'],[data-state='open'],[aria-modal='true'],[data-testid*='dropdown' i],[data-testid*='hovercard' i],[data-testid*='sheetdialog' i],[data-testid*='popover' i],[data-testid*='tooltip' i],[data-radix-menu-content],[data-radix-popover-content],[data-radix-dropdown-menu-content],[data-slot*='dropdown-menu-content' i],[data-slot*='popover-content' i],[class*='dropdown-menu' i],[class*='context-menu' i],[class*='contextmenu' i],[class*='popover-content' i],[class*='menu-surface' i]";
  const SOFT_STAGGER_ITEM_SELECTOR = "button,a,[role='menuitem'],[role='option'],[role='tab'],[role='button'],[role='link'],[role='switch'],[role='checkbox']";
  const SOFT_LIST_SELECTOR = "ul,ol,tbody,[role='list'],[role='menu'],[role='listbox'],[role='feed'],[role='grid'],[role='table'],[role='tree'],[data-testid*='list' i],[data-testid*='menu' i]";
  const SOFT_LIST_ITEM_SELECTOR = ":scope > li,:scope > tr,:scope > article,:scope > [role='listitem'],:scope > [role='menuitem'],:scope > [role='option'],:scope > [role='row'],:scope > [role='treeitem']";
  const SHIMMER_SELECTOR = "[aria-busy='true'],[class*='skeleton' i],[class*='shimmer' i],[class*='placeholder' i],[data-testid*='skeleton' i],[data-testid*='loading' i]";
  // Visual-suite candidates stay intentionally narrow.  Liquid glass and linear borders are
  // classified in JS before paint so generic page content, navigation rows and feed items never
  // receive the effect merely because a framework class happens to contain "menu" or "panel".
  const SMART_GLASS_CANDIDATE_SELECTOR = "dialog[open],[role='dialog'],[aria-modal='true'],[role='menu']:not([hidden]),[role='listbox']:not([hidden]),[popover]:popover-open,header,aside,body>nav,[role='banner'],[role='navigation'],.navbar,.MuiAppBar-root,.MuiDrawer-paper,.MuiMenu-paper,.MuiPopover-paper,.ant-layout-header,.ant-layout-sider,.ant-dropdown,.ant-popover-inner,.ant-select-dropdown,.ant-drawer-content,.chakra-menu__menu-list,ytcp-navigation-drawer,ytd-masthead,[data-radix-menu-content],[data-radix-popover-content],[data-radix-dropdown-menu-content],[data-slot*='dropdown-menu-content' i],[data-slot*='popover-content' i],[data-testid*='dropdown' i],[data-testid*='popover' i],[data-testid*='sheet' i],[class*='dropdown-menu' i],[class*='context-menu' i],[class*='contextmenu' i],[class*='popover-content' i],[class*='navigation-drawer' i],[class*='nav-drawer' i],[class*='app-sidebar' i],[class*='app-header' i],[class*='topbar' i],[class*='top-bar' i],[class*='sidebar' i],[class*='side-bar' i]";
  const SMART_LINEAR_CANDIDATE_SELECTOR = `${SMART_GLASS_CANDIDATE_SELECTOR},input:not([type='hidden']):not([type='checkbox']):not([type='radio']):not([type='range']):not([type='color']):not([type='file']),textarea,select,button,[role='button'],[role='textbox'],[role='searchbox'],[role='combobox'],[role='card'],[class*='card' i],[class*='panel' i],[class*='modal-content' i],[class*='popover' i]`;

  const PERSIAN_ARABIC_RE = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
  const LATIN_RE = /[A-Za-z]/;
  const HAN_RE = /[\u3400-\u4DBF\u4E00-\u9FFF]/;
  // Extended_Pictographic covers normal emoji and ZWJ/tag sequences. Add the Unicode emoji
  // components that are not Extended_Pictographic so keycaps, flags and standalone skin-tone
  // modifiers are not silently missed. Intl.Segmenter keeps multi-code-point emoji atomic.
  const EMOJI_GRAPHEME_RE = /^(?:[#*0-9]\uFE0F?\u20E3|\p{Regional_Indicator}{2}|\p{Emoji_Modifier}|.*\p{Extended_Pictographic}.*)$/u;
  const EMOJI_FAST_RE = /[#*0-9]\uFE0F?\u20E3|\p{Regional_Indicator}{2}|\p{Emoji_Modifier}|\p{Extended_Pictographic}/u;
  const segmenter = globalThis.Intl?.Segmenter ? new Intl.Segmenter(undefined, { granularity: "grapheme" }) : null;
  let localizer = globalThis.__FONTYAR_LOCALIZATION_FA__ || null;

  const state = {
    config: structuredCloneSafe(DEFAULT_CONFIG),
    signature: "",
    observer: null,
    queue: new Set(),
    flushQueued: false,
    decorQueue: new Set(),
    decorQueued: false,
    requestedFonts: new Set(),
    requestedEmoji: new Set(),
    textRecords: new Map(),
    attrRecords: new Map(),
    sizeRecords: new Map(),
    sizeScanRoots: new WeakSet(),
    textScanRoots: new WeakSet(),
    bidiDirRecords: new Map(),
    bidiStyleRecords: new Map(),
    uniformCornerScanRoots: new WeakSet(),
    emojiImageOriginals: new WeakMap(),
    softCornerElements: new Set(),
    uniformCornerElements: new Set(),
    softMotionElements: new Set(),
    softSurfaceElements: new Set(),
    softStaggerElements: new Set(),
    softVisualElements: new Set(),
    softTransformElements: new Set(),
    softLayoutRects: new WeakMap(),
    softStateValues: new WeakMap(),
    softCrossfadeTimes: new WeakMap(),
    listMotionSeen: new WeakSet(),
    shimmerElements: new Set(),
    scrollFadeElements: new Set(),
    scrollFadeListeners: new WeakMap(),
    tooltipWarmGroups: new WeakMap(),
    tooltipTimers: new WeakMap(),
    tooltipDelayedElements: new Set(),
    shadowOutlineElements: new Set(),
    darkSurfaceElements: new Set(),
    darkTextElements: new Set(),
    darkBorderElements: new Set(),
    darkIconElements: new Set(),
    darkLogoImageElements: new Set(),
    smartDarkOriginalPaint: new WeakMap(),
    smartDarkDeepScanSeq: 0,
    smartDarkScanTokens: new WeakMap(),
    smartDarkInitialPassDone: false,
    smartDarkLoadingSeq: 0,
    smartDarkLoadingFailsafe: 0,
    smartDarkRescanTimer: 0,
    smartDarkRescanFollowupTimer: 0,
    smartDarkLastFullRescan: 0,
    smartDarkInteractionQueue: new Set(),
    smartDarkInteractionFrame: 0,
    smartDarkInteractionTimer: 0,
    smartDarkActionTimers: new Set(),
    smartDarkViewportFrame: 0,
    smartDarkViewportTimer: 0,
    smartDarkListenersBound: false,
    smartDarkCleanupToken: 0,
    smartDarkThemeInfo: null,
    smartDarkThemeHint: "",
    smartDarkDarkReaderTheme: null,
    smartDarkDarkReaderThemeSig: "",
    smartDarkInitialPassSeq: 0,
    themeRefreshTimer: 0,
    shadowSweepTimer: 0,
    shadowSweepWalker: null,
    themeMediaQuery: null,
    themeMediaListener: null,
    themeObserver: null,
    motionLastActivation: null,
    motionActivationFrame: 0,
    motionActivationTimer: 0,
    safeHover: null,
    observerSignature: "",
    loadedEmojiStyles: new Set(),
    emojiRenderCache: new Map(),
    emojiRenderInflight: new Map(),
    emojiPrewarmStyle: "",
    emojiPrewarmHandle: 0,
    emojiPrewarmTimer: 0,
    legacyEmojiAliasesPurged: false,
    fontScriptElements: new Set(),
    shadowRoots: new Set(),
    shadowObservers: new Map(),
    shadowObserverSignatures: new WeakMap(),
    shadowCssCache: new Map(),
    shadowStyleSyncFrame: 0,
    shadowStyleSyncTimer: 0,
    smartDarkMutationRoots: new Set(),
    smartDarkMutationFrame: 0,
    smartDarkPerfObserver: null,
    smartDarkPressure: 0,
    smartDarkLongTaskAt: 0,
    smartDarkPressureTimer: 0,
    smartDarkUsesScrollEnd: false,
    smartDarkCleanupSeq: 0,
    wheelAnimation: null,
    pageScript: "en",
    userCssSignature: "",
    userCssRevision: 0,
    editableListenersBound: false,
    motionListenersBound: false,
    contextMenuGuardBound: false,
    contextMenuDeferredNodes: new Set(),
    contextMenuDeferredTimer: 0
  };

  boot();

  async function boot() {
    chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
      if (!message) return;
      if (message.type === "fontyar:runtime-ping") { sendResponse?.({ ok:true, documentToken:DOCUMENT_TOKEN }); return; }
      if (message.type === "fontyar:apply-config") {
        if (message.host && message.host !== getHost()) return;
        applyConfig({ ...DEFAULT_CONFIG, ...(message.config || {}) });
      } else if (message.type === "fontyar:apply-now") refreshConfig();
    });

    globalThis.__PERSIANYAR_SITE_STORE__?.onChanged(() => {
      void refreshConfig();
    });

    // High-frequency page listeners are attached lazily by applyConfig() only while a feature
    // actually needs them. This keeps PersianYar close to zero-cost on untouched sites.
    await refreshConfig();
  }

  function handleLiveEditableChange(event) {
    if (!state.config.rtlBeta) return;
    const el=event?.target;
    if (!(el instanceof HTMLElement) || !el.matches?.(FORM_TEXT_CONTROLS) || !isEditableSafe(el)) return;
    const value=String(el.value ?? el.textContent ?? "");
    let dir=detectStrongDirection(value);
    if(dir==="neutral"&&!value.trim()){
      const hint=`${el.getAttribute("placeholder")||""} ${el.getAttribute("aria-placeholder")||""} ${el.getAttribute("aria-label")||""}`.trim();
      dir=detectStrongDirection(hint);
    }
    if(dir!=="neutral")el.toggleAttribute(RTL_LAYOUT_ATTR,dir==="rtl");
  }

  function snapshotFormSelection(el) {
    try {
      if (document.activeElement !== el) return null;
      if (el instanceof HTMLTextAreaElement || (el instanceof HTMLInputElement && SELECTION_INPUT_TYPES.has(String(el.type || "text").toLowerCase()))) {
        if (typeof el.selectionStart !== "number" || typeof el.selectionEnd !== "number") return null;
        return { value: el.value, start: el.selectionStart, end: el.selectionEnd, direction: el.selectionDirection || "none" };
      }
    } catch {}
    return null;
  }

  function restoreFormSelection(el, snapshot) {
    if (!snapshot || document.activeElement !== el || el.value !== snapshot.value || typeof el.setSelectionRange !== "function") return;
    try { el.setSelectionRange(snapshot.start, snapshot.end, snapshot.direction); } catch {}
  }

  async function refreshConfig() {
    try {
      const store = globalThis.__PERSIANYAR_SITE_STORE__;
      if (!store) return;
      const match = await store.getForHost(getHost());
      applyConfig({ ...DEFAULT_CONFIG, ...(match?.config || {}) });
    } catch (error) { console.warn("[FontYar] settings read failed", error); }
  }

  function isConfigInactive(config) {
    return !(
      config.enabled || config.emojiEnabled || config.fontDelta !== 0 || hasTextFeatures(config) ||
      config.cursorEnabled || config.softMotionEnabled || config.softCorners || config.uniformCornersEnabled ||
      config.removeShadows || config.smoothScrollEnabled || config.smartDarkMode || config.liquidGlassMode ||
      config.linearStyleMode || config.adaptiveMenusMode || config.focusEnhanceMode || config.polishedInputsMode
    );
  }

  function needsShadowSupport(config) {
    // Most typography inherits through a host, but modern component UIs (notably YouTube) often
    // reset font-family inside their component tree. When font replacement is enabled, discover
    // Shadow DOM incrementally so the same typography stylesheet is cloned into those roots too.
    return !!(config.enabled || shadowObserverNeeded(config));
  }

  function markContextMenuHotWindow() {
    const now=performance.now();
    cursorLastContextMenuAt=now;
    contextMenuHotUntil=Math.max(contextMenuHotUntil,now+CONTEXT_MENU_HOT_WINDOW_MS);
  }

  function isContextMenuHotWindow() {
    return performance.now() < contextMenuHotUntil;
  }

  function handleContextMenuPointerSignal(event) {
    // This listener is deliberately constant-time. Custom site context menus run on the same
    // event dispatch, so doing closest()/computed-style/layout work here makes right-click feel
    // sticky before the site's own handler even gets a chance to mount its menu.
    if(Number(event?.button)===2)markContextMenuHotWindow();
  }

  function handleContextMenuSignal() {
    markContextMenuHotWindow();
  }

  function queueContextMenuDeferredNode(node) {
    if(!node)return;
    state.contextMenuDeferredNodes.add(node);
    if(state.contextMenuDeferredTimer)return;
    const wait=Math.max(48,Math.min(360,contextMenuHotUntil-performance.now()+24));
    state.contextMenuDeferredTimer=setTimeout(()=>{
      state.contextMenuDeferredTimer=0;
      const batch=compactNodeBatch([...state.contextMenuDeferredNodes]);
      state.contextMenuDeferredNodes.clear();
      for(const item of batch){
        if(!item?.isConnected&&item?.nodeType!==Node.DOCUMENT_FRAGMENT_NODE)continue;
        if(state.config.smartDarkMode&&document.documentElement?.hasAttribute("data-persianyar-smart-dark-active"))queueSmartDarkMutationRoot(item);
        if(needsQueuedNodeProcessing())queueNode(item);
        // Shadow-root discovery is useful, but never belongs on the right-click dispatch/microtask
        // hot path. A small delayed sweep preserves component support without delaying the menu.
        discoverShadowRoots(item,96);
      }
    },wait);
  }

  function updateRuntimeListeners(config) {
    const smartDarkCssFirst=!!globalThis.__PERSIANYAR_SMART_DARK_CSS_ENGINE__?.cssFirst;
    const needContextMenuGuard = !!(config.emojiEnabled || (config.smartDarkMode&&!smartDarkCssFirst) || config.softMotionEnabled || config.cursorEnabled || config.rtlBeta || config.localizeEnabled);
    if (needContextMenuGuard !== state.contextMenuGuardBound) {
      state.contextMenuGuardBound = needContextMenuGuard;
      const method = needContextMenuGuard ? "addEventListener" : "removeEventListener";
      globalThis[method]("pointerdown", handleContextMenuPointerSignal, {capture:true,passive:true});
      globalThis[method]("contextmenu", handleContextMenuSignal, {capture:true,passive:true});
      if(!needContextMenuGuard){
        clearTimeout(state.contextMenuDeferredTimer);state.contextMenuDeferredTimer=0;state.contextMenuDeferredNodes.clear();contextMenuHotUntil=0;
      }
    }

    // Input/textarea values do not create DOM mutations while typing. Only watch them while a
    // feature can actually change editable controls.
    const needEditable = !!config.rtlBeta;
    if (needEditable !== state.editableListenersBound) {
      state.editableListenersBound = needEditable;
      const method = needEditable ? "addEventListener" : "removeEventListener";
      globalThis[method]("input", handleLiveEditableChange, true);
      globalThis[method]("change", handleLiveEditableChange, true);
    }

    const needMotion = !!config.softMotionEnabled;
    if (needMotion !== state.motionListenersBound) {
      state.motionListenersBound = needMotion;
      const method = needMotion ? "addEventListener" : "removeEventListener";
      globalThis[method]("input", handleSoftSliderInput, true);
      globalThis[method]("pointerdown", handleSoftPointerDown, true);
      globalThis[method]("keydown", handleSoftKeyDown, true);
      globalThis[method]("pointerout", handleSafeHoverLeave, true);
    }

    const needSmartDark = !!config.smartDarkMode && !globalThis.__PERSIANYAR_SMART_DARK_CSS_ENGINE__?.cssFirst;
    if (needSmartDark !== state.smartDarkListenersBound) {
      state.smartDarkListenersBound = needSmartDark;
      if (needSmartDark) {
        addEventListener("pointerover", handleSmartDarkInteractionEvent, true);
        addEventListener("focusin", handleSmartDarkInteractionEvent, true);
        addEventListener("click", handleSmartDarkActionEvent, true);
        addEventListener("keydown", handleSmartDarkActionEvent, true);
        // v37: DOM additions and exact interaction targets are enough. Continuous viewport rescans
        // during scrolling/resizing caused the biggest frame drops on feeds and dashboards.
        state.smartDarkUsesScrollEnd = false;
        document.addEventListener("visibilitychange", handleSmartDarkVisibility, {passive:true});
        bindSmartDarkPerfMonitor(true);
      } else {
        removeEventListener("pointerover", handleSmartDarkInteractionEvent, true);
        removeEventListener("focusin", handleSmartDarkInteractionEvent, true);
        removeEventListener("click", handleSmartDarkActionEvent, true);
        removeEventListener("keydown", handleSmartDarkActionEvent, true);
        document.removeEventListener("visibilitychange", handleSmartDarkVisibility);
        state.smartDarkUsesScrollEnd=false;
        bindSmartDarkPerfMonitor(false);
        if (state.smartDarkInteractionFrame) cancelAnimationFrame(state.smartDarkInteractionFrame);
        if (state.smartDarkViewportFrame) cancelAnimationFrame(state.smartDarkViewportFrame);
        clearTimeout(state.smartDarkInteractionTimer);
        clearTimeout(state.smartDarkViewportTimer);
        for(const timer of state.smartDarkActionTimers)clearTimeout(timer);
        state.smartDarkActionTimers.clear();
        state.smartDarkInteractionFrame=0;state.smartDarkViewportFrame=0;state.smartDarkInteractionTimer=0;state.smartDarkViewportTimer=0;
        state.smartDarkInteractionQueue.clear();
      }
    }
  }

  function releaseShadowRuntime() {
    syncSmartDarkShadowHostState(false);
    for (const observer of state.shadowObservers.values()) { try { observer.disconnect(); } catch {} }
    state.shadowObservers.clear();
    state.shadowRoots.clear();
    state.shadowObserverSignatures = new WeakMap();
    state.shadowCssCache.clear();
    if(!state.config.smartDarkMode)getSmartDarkCssEngine()?.disable?.();
    if(state.shadowStyleSyncFrame)cancelAnimationFrame(state.shadowStyleSyncFrame);state.shadowStyleSyncFrame=0;
    clearTimeout(state.shadowStyleSyncTimer);state.shadowStyleSyncTimer=0;
  }

  function getHost() {
    try {
      if (globalThis.top !== globalThis && globalThis.location?.ancestorOrigins?.length) {
        const origins = globalThis.location.ancestorOrigins;
        for (let i = origins.length - 1; i >= 0; i--) {
          try { const host = new URL(origins[i]).hostname.toLowerCase(); if (host) return host; } catch {}
        }
      }
      return String(location.hostname || "").toLowerCase();
    } catch { return ""; }
  }

  function findSiteConfig(host, sites) {
    if (!host) return { host: "", config: null };
    if (sites[host]) return { host, config: sites[host] };
    let bestHost = "", bestConfig = null;
    for (const [candidate, config] of Object.entries(sites)) {
      if (!config?.includeSubdomains) continue;
      if (host === candidate || host.endsWith(`.${candidate}`)) {
        if (candidate.length > bestHost.length) { bestHost = candidate; bestConfig = config; }
      }
    }
    return { host: bestHost, config: bestConfig };
  }

  function normalizeConfig(raw) {
    const oldFa = FONT_KEYS.fa.has(raw.fontKey) ? raw.fontKey : DEFAULT_CONFIG.fonts.fa;
    const fonts = {
      fa: FONT_KEYS.fa.has(raw.fonts?.fa) ? raw.fonts.fa : oldFa,
      en: FONT_KEYS.en.has(raw.fonts?.en) ? raw.fonts.en : DEFAULT_CONFIG.fonts.en,
      ar: FONT_KEYS.ar.has(raw.fonts?.ar) ? raw.fonts.ar : DEFAULT_CONFIG.fonts.ar,
      zh: FONT_KEYS.zh.has(raw.fonts?.zh) ? raw.fonts.zh : DEFAULT_CONFIG.fonts.zh
    };
    return {
      paused: !!raw.paused,
      enabled: !!raw.enabled,
      fontKey: fonts.fa,
      fonts,
      unifiedFontEnabled: !!raw.unifiedFontEnabled,
      allFontKey: ALL_FONT_KEYS.has(raw.allFontKey) ? raw.allFontKey : (ALL_FONT_KEYS.has(raw.fontKey) ? raw.fontKey : DEFAULT_CONFIG.allFontKey),
      align: ["preserve","right","left","center","justify"].includes(raw.align) ? raw.align : "preserve",
      weightMode: raw.weightMode === "custom" ? "custom" : "preserve",
      normalWeight: sanitizeWeight(raw.normalWeight, "400"),
      boldWeight: sanitizeWeight(raw.boldWeight, "700"),
      includeSubdomains: !!raw.includeSubdomains,
      emojiEnabled: !!raw.emojiEnabled,
      emojiStyle: EMOJI_STYLES[raw.emojiStyle] ? raw.emojiStyle : "twemoji",
      fontDelta: clampInt(raw.fontDelta, -4, 12, 0),
      digitMode: ["preserve","persian","latin","arabic"].includes(raw.digitMode) ? raw.digitMode : "preserve",
      digitFontDelta: clampInt(raw.digitFontDelta, -4, 12, 0),
      zwnjMode: ["preserve","remove","space","smart"].includes(raw.zwnjMode) ? raw.zwnjMode : "preserve",
      bidiRepair: !!raw.bidiRepair,
      rtlBeta: !!raw.rtlBeta,
      layoutEnhance: !!raw.layoutEnhance,
      cursorEnabled: !!raw.cursorEnabled,
      cursorPackKey: String(raw.cursorPackKey || "macos-black"),
      cursorSize: clampInt(raw.cursorSize, 16, 96, 32),
      cursorMotionEnabled: !!raw.cursorMotionEnabled,
      cursorMotionPreset: ["precise","smooth","float"].includes(raw.cursorMotionPreset) ? raw.cursorMotionPreset : "smooth",
      cursorSmoothness: clampInt(raw.cursorSmoothness, 0, 100, 35),
      cursorTrailEnabled: !!raw.cursorTrailEnabled,
      cursorTrailLength: clampInt(raw.cursorTrailLength, 1, 6, 3),
      cursorClickEffectEnabled: raw.cursorClickEffectEnabled !== false,
      cursorHoverScaleEnabled: raw.cursorHoverScaleEnabled !== false,
      cursorGlowEnabled: !!raw.cursorGlowEnabled,
      localizeEnabled: !!raw.localizeEnabled,
      softMotionEnabled: !!raw.softMotionEnabled,
      motionHoverEnabled: raw.motionHoverEnabled !== false,
      motionPopEnabled: raw.motionPopEnabled !== false,
      motionStaggerEnabled: raw.motionStaggerEnabled !== false,
      motionCrossfadeEnabled: raw.motionCrossfadeEnabled !== false,
      motionMorphEnabled: raw.motionMorphEnabled !== false,
      motionSharedLayoutEnabled: raw.motionSharedLayoutEnabled !== false,
      motionRubberEnabled: raw.motionRubberEnabled !== false,
      motionSafePolygonEnabled: raw.motionSafePolygonEnabled !== false,
      motionListEnabled: raw.motionListEnabled !== false,
      motionShimmerEnabled: raw.motionShimmerEnabled !== false,
      motionTooltipDelayEnabled: raw.motionTooltipDelayEnabled !== false,
      motionTabularNumsEnabled: raw.motionTabularNumsEnabled !== false,
      motionScrollFadeEnabled: raw.motionScrollFadeEnabled !== false,
      motionSliderMorphEnabled: raw.motionSliderMorphEnabled !== false,
      motionSharedElementEnabled: raw.motionSharedElementEnabled !== false,
      motionIconCrossfadeEnabled: raw.motionIconCrossfadeEnabled !== false,
      softCorners: !!raw.softCorners,
      uniformCornersEnabled: !!raw.uniformCornersEnabled,
      uniformCornerRadius: clampInt(raw.uniformCornerRadius, 0, 48, 14),
      removeShadows: !!raw.removeShadows,
      smoothScrollEnabled: !!raw.smoothScrollEnabled,
      smartDarkMode: !!raw.smartDarkMode,
      smartDarkPreset: String(raw.smartDarkPreset || "balanced"),
      smartDarkBackgroundColor: sanitizeSmartDarkColor(raw.smartDarkBackgroundColor, DEFAULT_CONFIG.smartDarkBackgroundColor),
      smartDarkTextColor: sanitizeSmartDarkColor(raw.smartDarkTextColor, DEFAULT_CONFIG.smartDarkTextColor),
      smartDarkAccentColor: sanitizeSmartDarkColor(raw.smartDarkAccentColor, DEFAULT_CONFIG.smartDarkAccentColor),
      smartDarkBrightness: clampInt(raw.smartDarkBrightness, 70, 130, 100),
      smartDarkContrast: clampInt(raw.smartDarkContrast, 70, 140, 100),
      smartDarkSepia: clampInt(raw.smartDarkSepia, 0, 40, 0),
      smartDarkGrayscale: clampInt(raw.smartDarkGrayscale, 0, 100, 0),
      liquidGlassMode: !!raw.liquidGlassMode,
      linearStyleMode: !!raw.linearStyleMode,
      adaptiveMenusMode: !!raw.adaptiveMenusMode,
      focusEnhanceMode: !!raw.focusEnhanceMode,
      polishedInputsMode: !!raw.polishedInputsMode,
      liquidGlassBlur: clampInt(raw.liquidGlassBlur, 0, 32, 18),
      liquidGlassOpacity: clampInt(raw.liquidGlassOpacity, 20, 92, 58),
      liquidGlassSaturation: clampInt(raw.liquidGlassSaturation, 100, 180, 138),
      liquidGlassTintColor: sanitizeSmartDarkColor(raw.liquidGlassTintColor, DEFAULT_CONFIG.liquidGlassTintColor),
      liquidGlassTintStrength: clampInt(raw.liquidGlassTintStrength, 0, 35, 8),
      linearStyleColor: sanitizeSmartDarkColor(raw.linearStyleColor, DEFAULT_CONFIG.linearStyleColor),
      linearStyleOpacity: clampInt(raw.linearStyleOpacity, 8, 100, 24),
      linearStyleWidth: clampInt(raw.linearStyleWidth, 1, 3, 1),
      menuHighlightStrength: clampInt(raw.menuHighlightStrength, 6, 32, 12),
      focusRingColor: sanitizeSmartDarkColor(raw.focusRingColor, DEFAULT_CONFIG.focusRingColor),
      focusRingWidth: clampInt(raw.focusRingWidth, 1, 4, 2),
      inputHighlightStrength: clampInt(raw.inputHighlightStrength, 6, 36, 16)
    };
  }

  function applyConfig(raw) {
    // Optional localization catalogs can be lazy-injected after content.js. Refresh the pointer
    // here so enabling localization never requires a page reload.
    localizer = globalThis.__FONTYAR_LOCALIZATION_FA__ || localizer;
    const normalized = normalizeConfig(raw);
    // Site pause is a non-destructive master switch: keep the saved settings in storage, but
    // apply a clean default configuration to the page until the site is resumed.
    const config = normalized.paused ? { ...DEFAULT_CONFIG, paused: true } : normalized;
    const signature = JSON.stringify(config);
    if (signature === state.signature) {
      // SPAs occasionally rebuild <head> or replace app shells. Re-sent settings should repair
      // visual features instead of being discarded only because the config object is unchanged.
      const needsAux = config.bidiRepair || config.localizeEnabled || config.rtlBeta || config.layoutEnhance || config.fontDelta || config.digitFontDelta;
      if (needsAux && !document.getElementById(AUX_STYLE_ID)) applyAuxStyle(config);
      if (hasTextFeatures(config)) {
        scanTextFeatures(document.documentElement || document);
        if (isChatGptHost()) repairChatGptPersianProse(document.documentElement || document);
      }
      const needsSoftUi = config.softMotionEnabled || config.softCorners || config.uniformCornersEnabled || config.removeShadows || config.smoothScrollEnabled;
      if (needsSoftUi && !document.getElementById(SOFT_STYLE_ID)) applySoftUiConfig(config);
      else if (config.softMotionEnabled) scheduleSoftMotionActivation(document.documentElement || document);
      if (hasThemeAwareSiteStyles(config) && !document.getElementById(SITE_STYLE_ID)) applySiteStyleConfig(config);
      if (needsShadowSupport(config)) { discoverShadowRoots(document.documentElement || document,360); refreshShadowObservers(); syncAllShadowStyles(); }
      if (config.cursorEnabled && !document.getElementById(CURSOR_STYLE_ID)) {
        cursorConfigSignature = "";
        void applyCursorConfig(config).finally(() => { syncAllShadowStyles(); syncUserOriginCss(); });
      }
      if (config.smartDarkMode) {
        scheduleSmartDarkViewportSweep();
        // Re-sending an unchanged config (most notably when the popup opens) must never leave a
        // cold-start/prepaint shield on top of an already-dark page. This is only the unchanged
        // config branch, so a genuine off -> on transition still keeps the loader until first pass.
        if(document.documentElement?.hasAttribute("data-persianyar-smart-dark-active") &&
           (document.documentElement?.hasAttribute(SMART_DARK_LOADING_ATTR) || document.getElementById(SMART_DARK_LOADING_ID))){
          hideSmartDarkLoading(true);
          releaseSmartDarkPrepaint();
        }
      }
      syncUserOriginCss();
      return;
    }
    const firstApply = !state.signature;
    const previous = state.config;
    const smartDarkPaletteChanged=["smartDarkBackgroundColor","smartDarkTextColor","smartDarkAccentColor","smartDarkBrightness","smartDarkContrast","smartDarkSepia","smartDarkGrayscale"].some(key=>previous?.[key]!==config[key]);
    const enablingSmartDark = !!config.smartDarkMode && !previous.smartDarkMode;
    const disablingSmartDark = !config.smartDarkMode && !!previous.smartDarkMode;
    if (enablingSmartDark) showSmartDarkLoading();
    if (disablingSmartDark) hideSmartDarkLoading(true);
    state.config = config;
    state.signature = signature;
    updateRuntimeListeners(config);

    // Most sites have no PersianYar site override. On the first pass, do not run cleanup scans
    // or walk the whole DOM just to confirm that nothing needs changing.
    if (firstApply && isConfigInactive(config)) {
      updateSmoothScrollListener(config);
      updateShadowSweep(config);
      updateThemePreferenceListener(config);
      updateObserver();
      return;
    }

    if (config.enabled) state.pageScript = detectPageScript();
    applyFontConfig(config);
    applyEmojiConfig(previous, config);
    applyAuxStyle(config);
    applySoftUiConfig(config);
    applySiteStyleConfig(config);
    if(config.smartDarkMode&&smartDarkPaletteChanged){
      // Selector-level CSS is refreshed synchronously above. Repaint the already-known residual
      // repair elements as well so a palette change never leaves old per-element fallback colors.
      requestAnimationFrame(()=>{
        const known=new Set([...state.darkSurfaceElements,...state.darkTextElements,...state.darkBorderElements]);
        let count=0;for(const el of known){if(count++>=1800)break;if(el?.isConnected)applySmartDarkElement(el,false)}
        scheduleSmartDarkViewportSweep();
      });
    }
    void applyCursorConfig(config).finally(() => {
      // Cursor assets are asynchronous. Re-sync USER-origin CSS after the final cursor
      // stylesheet exists so page !important rules cannot briefly expose the OS cursor.
      syncAllShadowStyles();
      syncUserOriginCss();
    });
    applySizeConfig(previous, config);
    applyTextFeatureConfig(previous, config);
    if(config.rtlBeta){ primeVisibleSmartRtl(); requestAnimationFrame(primeVisibleSmartRtl); }
    applyFontScriptMarks(config);
    const shadowNeeded = needsShadowSupport(config);
    if (shadowNeeded) discoverShadowRoots(document.documentElement || document,720);
    syncAllShadowStyles();
    if (shadowNeeded) refreshShadowObservers();
    if (!shadowNeeded) releaseShadowRuntime();
    syncUserOriginCss();
    updateSmoothScrollListener(config);
    updateShadowSweep(config);
    updateThemePreferenceListener(config);
    updateObserver();
  }

  function applyFontConfig(config) {
    document.getElementById(FONT_STYLE_ID)?.remove();
    document.documentElement?.removeAttribute("data-fontyar-enabled");
    if (!config.enabled) { clearFontScriptMarks(); syncAllShadowStyles(); return; }

    document.documentElement?.setAttribute("data-fontyar-enabled", "1");
    // Mark textual icon ligatures before our font override is inserted. Otherwise a generic font
    // rule can replace Material/Google Symbols on an opaque generated class before localization
    // has a chance to recognize it.
    primeIconLigatureGuards(document.documentElement || document, 900);
    const style = document.createElement("style");
    style.id = FONT_STYLE_ID;
    const scope = 'html[data-fontyar-enabled="1"]';
    const rules = [];
    const safeText = buildSafeSelector(TEXT_TAGS);
    const scopedText = `${scope} ${safeText}`;
    const block = buildSafeSelector(BLOCK_TAGS);
    const scopedBlock = `${scope} ${block}`;
    const bold = buildSafeSelector(BOLD_TAGS);
    const scopedBold = `${scope} ${bold}`;
    const formControls = FORM_TEXT_CONTROLS;
    let activeTextStack = "";

    if (config.unifiedFontEnabled) {
      requestFont(config.allFontKey, "all");
      const allAlias = fontAlias(config.allFontKey, "all");
      const stack = `"${allAlias}",Tahoma,Arial,sans-serif`;
      activeTextStack = stack;
      // Direct element rules are intentional: X and other React apps set their font on nearly
      // every text node. USER-origin + !important reliably beats those author declarations.
      rules.push(`${scope} body,${scopedText},${scope} :is(${formControls}){font-family:${stack}!important;}`);
    } else {
      for (const script of ["fa","en","ar","zh"]) requestFont(config.fonts[script], script);
      const aliases = Object.fromEntries(["fa","en","ar","zh"].map(script => [script, fontAlias(config.fonts[script], script)]));
      const primary = state.pageScript;
      const order = primary === "ar" ? ["ar","fa","en","zh"] : primary === "zh" ? ["zh","en","fa","ar"] : primary === "en" ? ["en","fa","ar","zh"] : ["fa","ar","en","zh"];
      const fallbackStack = order.map(k => `"${aliases[k]}"`).join(",");
      activeTextStack = `${fallbackStack},Tahoma,Arial,sans-serif`;
      // Each injected face carries a unicode-range, so the combined stack applies immediately to
      // SPA content while script markers refine Arabic/Persian ambiguity afterwards.
      rules.push(`${scope} body,${scopedText},${scope} :is(${formControls}){font-family:${fallbackStack},Tahoma,Arial,sans-serif!important;}`);
      rules.push(`${scope} :is([lang^="fa"],[lang="fa-IR"]){font-family:"${aliases.fa}",Tahoma,Arial,sans-serif!important;}`);
      rules.push(`${scope} [lang^="ar"]{font-family:"${aliases.ar}",Tahoma,Arial,sans-serif!important;}`);
      rules.push(`${scope} [lang^="en"]{font-family:"${aliases.en}",Arial,sans-serif!important;}`);
      rules.push(`${scope} [lang^="zh"]{font-family:"${aliases.zh}",sans-serif!important;}`);
    }

    // YouTube increasingly renders visible labels in custom elements/view-model classes that set
    // their own Roboto/Arial stack. Those elements are not ordinary span/div tags, so relying on
    // inheritance from <body> leaves the guide/sidebar, account menus and some new button/search
    // surfaces untouched. Target only known text-bearing surfaces; icon/SVG hosts stay excluded.
    if (activeTextStack && /(^|\.)youtube\.com$/.test(getHost())) {
      const ytText = [
        "yt-formatted-string",
        "yt-attributed-string",
        ".yt-core-attributed-string",
        "[class*='yt-core-attributed-string']",
        ".yt-spec-button-shape-next__button-text-content",
        ".yt-spec-button-shape-next--button-text-content",
        "[class*='button-text-content']",
        ".ytSearchboxComponentInput",
        ".ytSearchboxComponentInputBox input",
        "tp-yt-paper-item",
        "ytd-guide-entry-renderer .title",
        "ytd-mini-guide-entry-renderer .title",
        "ytd-guide-section-renderer h3",
        "#guide-content #text",
        "#guide-content #label",
        "#guide-content #title",
        "#guide-content .title",
        "#guide-content .label",
        "ytd-multi-page-menu-renderer yt-formatted-string",
        "ytd-menu-popup-renderer yt-formatted-string",
        "ytd-compact-link-renderer #label",
        "ytd-active-account-header-renderer",
        "ytd-account-item-renderer",
        "ytd-simple-menu-header-renderer",
        "button:not(:has(> yt-icon)):not(:has(> .yt-spec-button-shape-next__icon))"
      ].join(",");
      rules.push(`${scopeSelector(scope, ytText)}{font-family:${activeTextStack}!important;}`);
      rules.push(`${scope} .ytSearchboxComponentInput::placeholder{font-family:${activeTextStack}!important;font-style:inherit!important;}`);
    }

    rules.push(`${scope} input::placeholder,${scope} textarea::placeholder{font-family:inherit!important;font-style:inherit!important;}`);
    if (config.align !== "preserve") rules.push(`${scopedBlock}{text-align:${config.align}!important;}`);
    if (config.weightMode === "custom") {
      rules.push(`${scopedText}{font-weight:${config.normalWeight}!important;}`);
      rules.push(`${scopedBold}{font-weight:${config.boldWeight}!important;}`);
      rules.push(`${scope} ${formControls}{font-weight:${config.normalWeight}!important;}`);
    }
    style.textContent = rules.join("\n");
    (document.head || document.documentElement).append(style);
    syncAllShadowStyles();
  }

  function applyAuxStyle(config) {
    document.getElementById(AUX_STYLE_ID)?.remove();
    document.documentElement?.removeAttribute("data-fontyar-rtl-beta");
    const needsAux = config.bidiRepair || config.localizeEnabled || config.rtlBeta || config.layoutEnhance || config.fontDelta || config.digitFontDelta;
    if (!needsAux) {
      clearRtlLayoutMarks();
      clearDigitSizeMarks();
      syncAllShadowStyles();
      return;
    }
    const style = document.createElement("style");
    style.id = AUX_STYLE_ID;
    const rules = [];
    if (config.bidiRepair || config.localizeEnabled || config.rtlBeta || config.layoutEnhance) {
      // The repair decision is already made from the whole visible string, so keep the chosen RTL
      // base direction stable even when a Persian sentence begins with an English brand/name.
      // `plaintext` would re-derive the base direction from the first strong character (for example
      // "OpenAI:"), which can flip an otherwise-Persian line back to LTR. Isolate keeps mixed Latin
      // runs readable while preventing the surrounding app shell from changing this block direction.
      rules.push(`[${RTL_TEXT_ATTR}="1"]{direction:rtl!important;unicode-bidi:isolate!important;text-align:right!important;}`);
      // Structural repair is deliberately geometry-safe: it changes only bidi direction/alignment.
      // Lists get the direction on the list container as well, because an outside marker follows the
      // list container's direction rather than an individual LI's direction in modern browsers.
      rules.push(`[${RTL_STRUCTURE_ATTR}="1"]{direction:rtl!important;text-align:right!important;}`);
      rules.push(`:is(ul,ol,[role="list"])[${RTL_STRUCTURE_ATTR}="1"]{direction:rtl!important;text-align:right!important;}`);
      rules.push(`:is(ul,ol,[role="list"])[${RTL_STRUCTURE_ATTR}="1"]>:is(li,[role="listitem"]){direction:rtl!important;text-align:right!important;}`);
      rules.push(`:is(ul,ol)[${RTL_STRUCTURE_ATTR}="1"]>:is(li)[${RTL_STRUCTURE_ATTR}="1"]::marker{direction:rtl;unicode-bidi:isolate;color:currentColor;}`);
      // Prose containers (notably ChatGPT markdown responses) can impose LTR/text-start on their
      // own descendants. Mark the prose root once and repair only semantic text blocks, keeping
      // code/pre and action toolbars outside the rule.
      rules.push(`[${RTL_PROSE_ATTR}="1"]{direction:rtl!important;text-align:right!important;unicode-bidi:isolate!important;}`);
      rules.push(`[${RTL_PROSE_ATTR}="1"] :is(ul,ol,[role="list"]){direction:rtl!important;text-align:right!important;}`);
      rules.push(`[${RTL_PROSE_ATTR}="1"] :is(p,h1,h2,h3,h4,h5,h6,blockquote,figcaption,dt,dd,ul,ol,[role="list"],[role="listitem"],li)[${RTL_STRUCTURE_ATTR}="1"]{direction:rtl!important;text-align:right!important;}`);
      rules.push(`[${RTL_PROSE_ATTR}="1"] :is(pre,code,kbd,samp){direction:ltr!important;text-align:left!important;unicode-bidi:isolate!important;}`);
      // ChatGPT-specific structural repair. ChatGPT's prose stylesheet can keep physical left
      // list padding even after direction/text-align are corrected, which leaves bullets on the
      // left while the Persian words themselves look RTL. These markers are only added to
      // Persian-oriented assistant markdown and explicitly mirror the list rail to the right.
      rules.push(`html body [${CHATGPT_RTL_PROSE_ATTR}="1"]{direction:rtl!important;text-align:right!important;unicode-bidi:isolate!important;}`);
      rules.push(`html body [${CHATGPT_RTL_PROSE_ATTR}="1"] :is(p,h1,h2,h3,h4,h5,h6,blockquote,figcaption,dt,dd,[role="paragraph"],[role="heading"],[role="text"],[role="listitem"])[${CHATGPT_RTL_BLOCK_ATTR}="1"]{direction:rtl!important;text-align:right!important;unicode-bidi:isolate!important;}`);
      rules.push(`html body [${CHATGPT_RTL_LIST_ATTR}="1"]{direction:rtl!important;text-align:right!important;unicode-bidi:isolate!important;list-style-position:outside!important;padding-left:0!important;padding-right:1.6em!important;padding-inline-start:1.6em!important;padding-inline-end:0!important;}`);
      rules.push(`html body [${CHATGPT_RTL_LIST_ATTR}="1"]>:is(li,[role="listitem"]){direction:rtl!important;text-align:right!important;padding-left:0!important;padding-right:.35em!important;padding-inline-start:.35em!important;padding-inline-end:0!important;}`);
      rules.push(`html body [${CHATGPT_RTL_LIST_ATTR}="1"]>:is(li,[role="listitem"])::marker{direction:rtl!important;unicode-bidi:isolate!important;text-align:right!important;}`);
      rules.push(`html body [${CHATGPT_RTL_LIST_ATTR}="1"] :is(ul,ol,[role="list"]){direction:rtl!important;text-align:right!important;}`);
      rules.push(`html body [${CHATGPT_RTL_PROSE_ATTR}="1"] :is(pre,code,kbd,samp){direction:ltr!important;text-align:left!important;unicode-bidi:isolate!important;}`);
    }
    if (config.rtlBeta || config.layoutEnhance) {
      if (config.rtlBeta) document.documentElement?.setAttribute("data-fontyar-rtl-beta", "1");
      // Both Auto RTL and Layout Enhance need a visible, geometry-safe RTL text rule. Previously
      // RTL_LAYOUT_ATTR had CSS only when rtlBeta was enabled, which made Layout Enhance appear to
      // do absolutely nothing when used on its own.
      rules.push(`[${RTL_LAYOUT_ATTR}="1"]{direction:rtl!important;unicode-bidi:isolate!important;text-align:right!important;}`);
      if (config.rtlBeta) {
        rules.push(`:is(input,textarea,select,[contenteditable="true"],[contenteditable="plaintext-only"])[${RTL_LAYOUT_ATTR}="1"]{direction:rtl!important;unicode-bidi:normal!important;text-align:start!important;}`);
        rules.push(`[${RTL_ALIGN_ATTR}="1"]{direction:rtl!important;text-align:right!important;}`);
      }
      if (config.layoutEnhance) {
        // The flow marker is only placed on compact interface rows that were already flex/grid/block
        // containers. `direction:rtl` mirrors row-start without forcing width, gap or dimensions.
        rules.push(`[${RTL_FLOW_ATTR}="1"]{direction:rtl!important;text-align:start!important;}`);
        rules.push(`[${RTL_FLOW_ATTR}="1"]>:is(svg,[aria-hidden="true"],[data-icon]){flex:0 0 auto!important;}`);
        rules.push(`[${RTL_FLOW_ATTR}="1"]>:is(span,label,[role="text"],div){min-width:0;overflow-wrap:break-word;word-break:normal;text-align:start;}`);
      }
    } else clearRtlLayoutMarks();
    if (config.fontDelta) {
      rules.push(`[${SIZE_ATTR}="1"]{font-size:calc(var(--fontyar-base-size) + ${config.fontDelta}px)!important;}`);
      rules.push(`[${SIZE_ATTR}="1"][${LINE_HEIGHT_ATTR}="1"]{line-height:var(--fontyar-target-line-height)!important;}`);
    }
    if (config.digitFontDelta) {
      rules.push(`[${DIGIT_SIZE_ATTR}="1"]{font-size:calc(var(--persianyar-digit-base-size) + ${config.digitFontDelta}px)!important;}`);
    }
    style.textContent = rules.join("\n");
    (document.head || document.documentElement).append(style);
    syncAllShadowStyles();
  }

  const CURSOR_KEYWORD_STATE = Object.freeze({
    pointer:"pointer", text:"text", "vertical-text":"verticalText", wait:"wait", progress:"progress", crosshair:"crosshair",
    move:"move", "all-scroll":"allScroll", grab:"grab", grabbing:"grabbing", help:"help", "not-allowed":"notAllowed", "no-drop":"notAllowed",
    "zoom-in":"zoomIn", "zoom-out":"zoomOut", copy:"copy", alias:"alias", "context-menu":"contextMenu", cell:"cell",
    "col-resize":"colResize", "row-resize":"rowResize", "ew-resize":"ewResize", "e-resize":"ewResize", "w-resize":"ewResize",
    "ns-resize":"nsResize", "n-resize":"nsResize", "s-resize":"nsResize", "nesw-resize":"neswResize", "ne-resize":"neswResize", "sw-resize":"neswResize",
    "nwse-resize":"nwseResize", "nw-resize":"nwseResize", "se-resize":"nwseResize"
  });
  const CURSOR_STATE_FALLBACK = Object.freeze({
    default:"auto", pointer:"pointer", text:"text", verticalText:"vertical-text", wait:"wait", progress:"progress", crosshair:"crosshair", move:"move",
    allScroll:"all-scroll", grab:"grab", grabbing:"grabbing", help:"help", notAllowed:"not-allowed", zoomIn:"zoom-in", zoomOut:"zoom-out", copy:"copy",
    alias:"alias", contextMenu:"context-menu", cell:"cell", colResize:"col-resize", rowResize:"row-resize", ewResize:"ew-resize", nsResize:"ns-resize",
    neswResize:"nesw-resize", nwseResize:"nwse-resize"
  });

  function resizeCursorDataUrl(url,size) {
    const px=clampInt(size,16,96,32);if(!/^data:image\/svg\+xml/i.test(String(url||""))||px===32)return url;const key=`${px}|${url}`;if(cursorSizedUrlCache.has(key))return cursorSizedUrlCache.get(key);try{const comma=url.indexOf(",");if(comma<0)return url;let svg=decodeURIComponent(url.slice(comma+1));svg=svg.replace(/<svg\b([^>]*)>/i,(_,attrs)=>{const clean=String(attrs||"").replace(/\swidth\s*=\s*(["']).*?\1/gi,"").replace(/\sheight\s*=\s*(["']).*?\1/gi,"");return `<svg${clean} width="${px}" height="${px}">`;});const next=`data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;if(cursorSizedUrlCache.size>180)cursorSizedUrlCache.clear();cursorSizedUrlCache.set(key,next);return next;}catch{return url;}
  }
  function customCursorValue(asset,stateName,size=clampInt(state.config.cursorSize,16,96,32)) {const fallback=CURSOR_STATE_FALLBACK[stateName]||"auto",raw=asset?.states?.[stateName] || (stateName==="default"?asset?.defaultUrl:stateName==="pointer"?asset?.pointerUrl:null);if(!raw)return fallback;const px=clampInt(size,16,96,32),url=resizeCursorDataUrl(raw,px),spot=asset?.hotspots?.[stateName] || (stateName==="default"?asset?.defaultHotspot:stateName==="pointer"?asset?.pointerHotspot:null) || [0,0],ratio=px/32;return `url("${url}") ${Math.round((Number(spot[0])||0)*ratio)} ${Math.round((Number(spot[1])||0)*ratio)}, ${fallback}`;}

  function emergencyCursorData(pack, hand=false) {
    const body=/^#[0-9a-f]{6}$/i.test(String(pack?.baseColor||""))?pack.baseColor:"#111111";
    const outline=/^#[0-9a-f]{6}$/i.test(String(pack?.outlineColor||""))?pack.outlineColor:"#ffffff";
    const shape=hand
      ? `<path d="M10 3v14.2l-3.1-3.1a2.25 2.25 0 0 0-3.2 3.2l7.2 7.2c1.6 1.6 3.4 2.5 5.8 2.5h2.1c4.7 0 8.2-3.2 8.2-7.7V11a2 2 0 0 0-4 0v4-6a2 2 0 0 0-4 0v6-8a2 2 0 0 0-4 0v8-12a2 2 0 0 0-4 0Z" fill="${body}" stroke="${outline}" stroke-width="1.8" stroke-linejoin="round"/>`
      : `<path d="M3 2.5 4 27l6.4-6.2 5.4 9.2 5-2.9-5.3-8.8 9-.4Z" fill="${body}" stroke="${outline}" stroke-width="1.8" stroke-linejoin="round"/>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">${shape}</svg>`)}`;
  }

  function emergencyCursorAsset(pack, api=null) {
    const defaultUrl=emergencyCursorData(pack,false),pointerUrl=emergencyCursorData(pack,true);
    const names=api?.stateKeys?.length?api.stateKeys:Object.keys(CURSOR_STATE_FALLBACK);
    const states={},hotspots={};
    for(const name of names){
      const pointerLike=["pointer","copy","alias","contextMenu","grab","grabbing"].includes(name);
      states[name]=pointerLike?pointerUrl:defaultUrl;
      hotspots[name]=pointerLike?[9,4]:[4,3];
    }
    states.default=defaultUrl;states.pointer=pointerUrl;hotspots.default=[4,3];hotspots.pointer=[9,4];
    return {version:"instant-fallback-v1",key:pack?.key||"fallback",mode:"full",source:"built-in instant fallback",defaultUrl,pointerUrl,defaultHotspot:[4,3],pointerHotspot:[9,4],states,hotspots};
  }

  function commitCursorAsset(asset,pack,config,signature) {
    const root=document.documentElement;if(!root||!asset?.defaultUrl||!asset?.pointerUrl)return false;
    document.getElementById(CURSOR_STYLE_ID)?.remove();root.removeAttribute("data-persianyar-custom-cursor");root.removeAttribute("data-persianyar-cursor-overlay");destroyCursorOverlay();clearCursorHoverTarget();
    cursorRuntimeAsset=asset;ensureCursorHoverTracking(config);const style=document.createElement("style");style.id=CURSOR_STYLE_ID;root.setAttribute("data-persianyar-custom-cursor","1");
    if(config.cursorMotionEnabled&&ensureCursorOverlay(config,pack)){
      root.setAttribute("data-persianyar-cursor-overlay","1");
      style.textContent=`html[data-persianyar-cursor-overlay="1"],html[data-persianyar-cursor-overlay="1"] body,html[data-persianyar-cursor-overlay="1"] [data-persianyar-cursor-state]{cursor:none!important}`;
    }else{
      root.removeAttribute("data-persianyar-cursor-overlay");const api=globalThis.__PERSIANYAR_CURSOR_PACKS__||null,cv=(name)=>customCursorValue(asset,name,config.cursorSize),cursorStates=(api?.stateKeys?.length?api.stateKeys:Object.keys(asset?.states||{})),stateRules=cursorStates.map(name=>`html[data-persianyar-custom-cursor="1"] [data-persianyar-cursor-state="${name}"]{cursor:${cv(name)}!important}`).join("\n");
      // cursor is inherited, so a root rule plus the currently hovered state marker is enough.
      // Avoiding a universal `*` selector prevents whole-page style invalidation on large SPAs.
      style.textContent=`html[data-persianyar-custom-cursor="1"],html[data-persianyar-custom-cursor="1"] body{cursor:${cv("default")}!important}\n${stateRules}`;
    }
    (document.head||root).append(style);cursorConfigSignature=signature;syncAllShadowStyles();syncUserOriginCss();return true;
  }

  function clearCursorHoverTarget() {
    if(cursorHoverTarget?.removeAttribute)cursorHoverTarget.removeAttribute("data-persianyar-cursor-state");
    cursorHoverTarget=null;
  }

  function setCursorMoveTracking(active) {
    const want=!!active;
    if(want===cursorMoveBound)return;
    cursorMoveBound=want;
    if(want)document.addEventListener("pointermove",onCursorPointerMove,{capture:true,passive:true});
    else document.removeEventListener("pointermove",onCursorPointerMove,true);
  }

  function ensureCursorHoverTracking(config=state.config) {
    if(!cursorHoverBound){
      cursorHoverBound=true;
      document.addEventListener("pointerover",onCursorPointerOver,true);
      document.addEventListener("pointerout",onCursorPointerOut,true);
      document.addEventListener("pointerdown",onCursorPointerDown,true);
      document.addEventListener("pointerup",onCursorPointerUp,true);
      document.addEventListener("pointercancel",onCursorPointerUp,true);
      document.addEventListener("contextmenu",onCursorContextMenu,true);
      document.addEventListener("visibilitychange",onCursorVisibilityChange,{passive:true});
      window.addEventListener("pagehide",hideCursorOverlay,{passive:true});
      window.addEventListener("blur",onCursorWindowBlur,{passive:true});
      window.addEventListener("focus",onCursorWindowFocus,{passive:true});
    }
    // The high-frequency pointermove path exists only for animated cursor motion. Native custom
    // cursor mode needs pointerover state changes, not every hardware sample.
    setCursorMoveTracking(!!config.cursorMotionEnabled);
  }

  function disableCursorHoverTracking() {
    setCursorMoveTracking(false);
    if(!cursorHoverBound)return;cursorHoverBound=false;
    document.removeEventListener("pointerover",onCursorPointerOver,true);
    document.removeEventListener("pointerout",onCursorPointerOut,true);
    document.removeEventListener("pointerdown",onCursorPointerDown,true);
    document.removeEventListener("pointerup",onCursorPointerUp,true);
    document.removeEventListener("pointercancel",onCursorPointerUp,true);
    document.removeEventListener("contextmenu",onCursorContextMenu,true);
    document.removeEventListener("visibilitychange",onCursorVisibilityChange);
    window.removeEventListener("pagehide",hideCursorOverlay);
    window.removeEventListener("blur",onCursorWindowBlur);
    window.removeEventListener("focus",onCursorWindowFocus);
  }

  function cursorEventTarget(event) {
    const first=event?.composedPath?.()?.find(node=>node instanceof Element);
    return first instanceof Element?first:(event?.target instanceof Element?event.target:null);
  }

  function cursorEventPoint(event) {
    // The dispatched pointermove already represents the browser's latest coalesced sample.
    // Avoid expanding getCoalescedEvents() on every move; that extra work is useful for
    // drawing apps, not for a cursor that only needs the newest position.
    const x=Number(event?.clientX),y=Number(event?.clientY);
    return {x:Number.isFinite(x)?x:cursorOverlayTarget.x,y:Number.isFinite(y)?y:cursorOverlayTarget.y};
  }

  function cancelCursorHide(){
    if(cursorHideTimer){clearTimeout(cursorHideTimer);cursorHideTimer=0;}
  }
  function scheduleCursorHide(delay=90){
    cancelCursorHide();
    cursorHideTimer=setTimeout(()=>{cursorHideTimer=0;hideCursorOverlay();},Math.max(0,Number(delay)||0));
  }

  function inferCursorState(target) {
    if(!(target instanceof Element))return null;
    // Fast semantic path first. Most interactive states can be resolved without forcing style
    // calculation; getComputedStyle() is reserved for custom resize/move cursors only.
    if(target.closest?.(':is([aria-busy="true"],progress)'))return "progress";
    if(target.closest?.(':is(:disabled,[aria-disabled="true"])'))return "notAllowed";
    if(target.closest?.(':is([aria-grabbed="true"],[data-dragging="true"])'))return "grabbing";
    if(target.closest?.(':is([draggable="true"],[aria-grabbed="false"])'))return "grab";
    if(target.closest?.(':is(input:not([type]),input[type="text"],input[type="search"],input[type="email"],input[type="url"],input[type="tel"],input[type="password"],input[type="number"],textarea,[contenteditable="true"],[contenteditable="plaintext-only"])'))return "text";
    if(target.closest?.(':is(a[href],button,summary,select,label[for],[role="button"],[role="link"],[role="menuitem"],[role="option"],[role="tab"],[role="switch"],[role="checkbox"],[role="radio"],[aria-haspopup]:not([aria-haspopup="false"]),[onclick],input[type="button"],input[type="submit"],input[type="reset"],input[type="checkbox"],input[type="radio"],input[type="range"],input[type="file"],input[type="color"])'))return "pointer";
    const tag=target.tagName;
    if(["P","SPAN","LI","TD","TH","PRE","CODE","BLOCKQUOTE","H1","H2","H3","H4","H5","H6","EM","STRONG","SMALL","MARK","TIME","FIGCAPTION","DT","DD"].includes(tag))return "text";
    let current=target;
    for(let depth=0;current&&depth<3;depth++,current=current.parentElement){
      let cursor="";try{cursor=getComputedStyle(current).cursor||""}catch{}
      const normalized=cursor.trim().toLowerCase();
      if(normalized&&!normalized.startsWith("url(")&&CURSOR_KEYWORD_STATE[normalized])return CURSOR_KEYWORD_STATE[normalized];
      if(normalized==="none"){
        const own=String(current.style?.cursor||"").trim().toLowerCase();
        if(own==="none"||!state.config.cursorMotionEnabled)return null;
      }
    }
    return "default";
  }
  function refreshCursorTarget(target) {
    if(!cursorRuntimeAsset||!(target instanceof Element)||document.documentElement?.getAttribute("data-persianyar-custom-cursor")!=="1")return;
    if(cursorHoverTarget&&cursorHoverTarget!==target)cursorHoverTarget.removeAttribute?.("data-persianyar-cursor-state");
    // Remove our own override before reading computed cursor so explicit site states such as
    // move/copy/resize/grabbing remain detectable instead of reading back our data URL.
    target.removeAttribute("data-persianyar-cursor-state");
    const stateName=inferCursorState(target);cursorHoverTarget=target;
    if(stateName)target.setAttribute("data-persianyar-cursor-state",stateName);if(state.config.cursorMotionEnabled)setCursorOverlayState(stateName||"default");
  }

  function onCursorPointerOver(event) {
    cancelCursorHide();
    refreshCursorTarget(cursorEventTarget(event));
    if(state.config.cursorMotionEnabled)updateCursorOverlayPointer(event,true);
  }

  function onCursorPointerMove(event) {
    if(!cursorRuntimeAsset)return;
    cancelCursorHide();
    // State classification is handled by pointerover/down/up. Keep the hot movement path
    // free of composedPath(), closest() and getComputedStyle() calls.
    if(state.config.cursorMotionEnabled)updateCursorOverlayPointer(event,true);
  }

  function onCursorPointerDown(event) {
    if(!cursorRuntimeAsset)return;cancelCursorHide();
    const button=Number(event?.button);
    // A secondary click can synchronously open a framework-owned context menu. Never do target
    // classification or computed-style reads before the site's handler runs.
    if(button===2){markContextMenuHotWindow();cursorOverlayPressed=false;if(state.config.cursorMotionEnabled)updateCursorOverlayPointer(event,true);return}
    cursorOverlayPressed=button===0;
    const target=cursorEventTarget(event);if(target)requestAnimationFrame(()=>refreshCursorTarget(target));
    if(state.config.cursorMotionEnabled){const point=cursorEventPoint(event);updateCursorOverlayPointer(event,true);if(button===0&&state.config.cursorClickEffectEnabled&&!prefersReducedMotion())spawnCursorClickPulse(point.x,point.y);}
  }
  function onCursorPointerUp(event) {
    cancelCursorHide();cursorOverlayPressed=false;if(!cursorRuntimeAsset)return;const target=cursorEventTarget(event);if(target)requestAnimationFrame(()=>refreshCursorTarget(target));if(state.config.cursorMotionEnabled)updateCursorOverlayPointer(event,true);
  }

  function onCursorContextMenu(event){
    if(!cursorRuntimeAsset)return;markContextMenuHotWindow();cancelCursorHide();cursorOverlayPressed=false;
    // Keep the contextmenu dispatch free of composedPath()/closest()/getComputedStyle(). The
    // cursor state can safely reconcile on the next frame, after the site's own menu handler.
    const target=event?.target instanceof Element?event.target:null;
    if(state.config.cursorMotionEnabled)updateCursorOverlayPointer(event,true);
    if(target)requestAnimationFrame(()=>{if(target.isConnected&&cursorRuntimeAsset)refreshCursorTarget(target)});
  }

  function onCursorPointerOut(event) {
    const related=event.relatedTarget;
    // relatedTarget is often null during fast iframe/shadow transitions and native
    // context-menu handoff. Hiding here caused cursor flashes and extra timers.
    if(!cursorHoverTarget)return;
    if(related instanceof Node&&cursorHoverTarget.contains?.(related))return;
    // pointerover on the destination will classify it; avoid a duplicate style probe here.
    clearCursorHoverTarget();
  }

  function onCursorWindowBlur(){
    if(document.visibilityState==="hidden")return hideCursorOverlay();
    // Keep the last themed frame while browser chrome/context menus own focus.
    cancelCursorHide();
  }
  function onCursorWindowFocus(){cancelCursorHide();}
  function onCursorVisibilityChange(){if(document.visibilityState==="hidden")hideCursorOverlay();}

  async function primeCursorAssetImages(asset, waitForCore=true){
    const urls=[...new Set(Object.values(asset?.states||{}).filter(value=>/^data:image\//i.test(String(value||""))))];
    const images=urls.map(src=>{const img=new Image();img.decoding="async";img.src=src;return img;});
    cursorPreloadImages=images;
    if(waitForCore&&images.length){
      const core=images.slice(0,Math.min(4,images.length)).map(img=>typeof img.decode==="function"?img.decode().catch(()=>{}):Promise.resolve());
      await Promise.allSettled(core);
    }
    // Decode the remaining states opportunistically so switching between pointer/text/
    // resize states cannot flash the browser cursor during fast movement.
    for(const img of images.slice(4)){try{img.decode?.().catch(()=>{});}catch{}}
  }

  function ensureCursorOverlay(config,pack){
    const mount=document.documentElement||document.body;if(!mount)return false;const px=clampInt(config.cursorSize,16,96,32);let host=document.getElementById(CURSOR_OVERLAY_ID);if(!host){host=document.createElement("div");host.id=CURSOR_OVERLAY_ID;host.setAttribute("data-persianyar-ignore","1");host.style.cssText="position:fixed;inset:0;z-index:2147483647;pointer-events:none;overflow:visible;contain:strict;visibility:hidden;";const img=document.createElement("img");img.alt="";img.draggable=false;img.dataset.main="1";img.style.cssText="position:fixed;left:0;top:0;pointer-events:none;user-select:none;will-change:transform;transform:translate3d(-200px,-200px,0);transform-origin:0 0;";host.append(img);mount.append(host);cursorOverlayEl=host;cursorOverlayImg=img;}else{cursorOverlayEl=host;cursorOverlayImg=host.querySelector('img[data-main="1"]')||host.querySelector("img");}cursorOverlayPack=pack;if(cursorOverlayImg){cursorOverlayImg.style.width=`${px}px`;cursorOverlayImg.style.height=`${px}px`;}rebuildCursorTrails(config);setCursorOverlayState(cursorOverlayState||"default");updateCursorOverlayVisualStyle();return !!cursorOverlayImg;
  }
  function rebuildCursorTrails(config){
    if(!cursorOverlayEl||!cursorOverlayImg)return;
    for(const el of cursorOverlayTrails)el.remove();
    cursorOverlayTrails=[];cursorOverlayTrailPos=[];
    if(!config.cursorTrailEnabled||prefersReducedMotion())return;
    const count=clampInt(config.cursorTrailLength,1,6,3);
    for(let i=0;i<count;i++){
      const img=document.createElement("img");img.alt="";img.draggable=false;img.dataset.trail=String(i);
      img.style.cssText=`position:fixed;left:0;top:0;pointer-events:none;user-select:none;will-change:transform,opacity;opacity:${Math.max(.035,.16-i*.02)};transform:translate3d(-200px,-200px,0);`;
      img.style.width=cursorOverlayImg.style.width;img.style.height=cursorOverlayImg.style.height;cursorOverlayEl.insertBefore(img,cursorOverlayImg);cursorOverlayTrails.push(img);cursorOverlayTrailPos.push({x:cursorOverlayPos.x,y:cursorOverlayPos.y});
    }
  }
  function updateCursorOverlayVisualStyle(){
    if(!cursorOverlayImg)return;const reduced=prefersReducedMotion();
    cursorOverlayImg.style.filter=state.config.cursorGlowEnabled&&!reduced?`drop-shadow(0 2px 3px rgba(0,0,0,.28)) drop-shadow(0 0 6px ${cursorOverlayPack?.accentColor||cursorOverlayPack?.outlineColor||"rgba(80,140,255,.38)"})`:"none";
  }
  function setCursorOverlayState(stateName){if(!cursorRuntimeAsset||!cursorOverlayImg)return;const name=stateName||"default",url=cursorRuntimeAsset?.states?.[name]||cursorRuntimeAsset.defaultUrl;if(!url)return;cursorOverlayState=name;if(cursorOverlayImg.src!==url)cursorOverlayImg.src=url;for(const trail of cursorOverlayTrails)if(trail.src!==url)trail.src=url;const spot=cursorRuntimeAsset?.hotspots?.[name]||cursorRuntimeAsset.defaultHotspot||[0,0],ratio=clampInt(state.config.cursorSize,16,96,32)/32;cursorOverlayHotspot=[(Number(spot[0])||0)*ratio,(Number(spot[1])||0)*ratio];}
  function updateCursorOverlayPointer(event,show=true){
    if(!cursorOverlayEl||!state.config.cursorMotionEnabled)return;
    cancelCursorHide();const point=cursorEventPoint(event);cursorOverlayTarget.x=point.x;cursorOverlayTarget.y=point.y;
    if(show&&!cursorOverlayVisible){cursorOverlayPos.x=cursorOverlayTarget.x;cursorOverlayPos.y=cursorOverlayTarget.y;for(const pos of cursorOverlayTrailPos){pos.x=cursorOverlayTarget.x;pos.y=cursorOverlayTarget.y;}cursorOverlayVisible=true;cursorOverlayEl.style.visibility="visible";}
    else if(!show&&cursorOverlayVisible){cursorOverlayVisible=false;cursorOverlayEl.style.visibility="hidden";}
    if(show&&!cursorOverlayRaf){cursorOverlayLastFrame=performance.now();cursorOverlayRaf=requestAnimationFrame(stepCursorOverlay);}
  }
  function hideCursorOverlay(){cancelCursorHide();cursorOverlayVisible=false;if(cursorOverlayEl)cursorOverlayEl.style.visibility="hidden";}
  function cursorOverlayScale(reduced=prefersReducedMotion()){if(reduced)return 1;if(cursorOverlayPressed)return .92;if(state.config.cursorHoverScaleEnabled&&["pointer","grab","grabbing","copy","alias"].includes(cursorOverlayState))return 1.12;return 1;}
  function stepCursorOverlay(now){
    cursorOverlayRaf=0;if(!cursorOverlayVisible||!cursorOverlayImg||!state.config.cursorMotionEnabled)return;
    const dt=Math.min(34,Math.max(1,now-(cursorOverlayLastFrame||now)));cursorOverlayLastFrame=now;
    const reduced=prefersReducedMotion(),softness=clampInt(state.config.cursorSmoothness,0,100,35)/100,base=reduced?1:(.84-softness*.56);
    let alpha=reduced?1:1-Math.pow(1-base,dt/16.667);
    const dx=cursorOverlayTarget.x-cursorOverlayPos.x,dy=cursorOverlayTarget.y-cursorOverlayPos.y,dist=Math.hypot(dx,dy);
    // Latency cap: smooth tiny motion, catch normal/fast movement aggressively.
    if(!reduced){if(dist>72)alpha=1;else if(dist>36)alpha=Math.max(alpha,.90);else if(dist>18)alpha=Math.max(alpha,.76);else if(dist>7)alpha=Math.max(alpha,.60);}
    if(dist<.28){cursorOverlayPos.x=cursorOverlayTarget.x;cursorOverlayPos.y=cursorOverlayTarget.y;}
    else{cursorOverlayPos.x+=dx*alpha;cursorOverlayPos.y+=dy*alpha;}
    // Hard latency budget: smoothing may soften motion, but the themed pointer never stays
    // more than a small number of CSS pixels behind the hardware position.
    if(!reduced){const rx=cursorOverlayTarget.x-cursorOverlayPos.x,ry=cursorOverlayTarget.y-cursorOverlayPos.y,rd=Math.hypot(rx,ry),maxLag=4+softness*8;if(rd>maxLag&&rd>0){const keep=maxLag/rd;cursorOverlayPos.x=cursorOverlayTarget.x-rx*keep;cursorOverlayPos.y=cursorOverlayTarget.y-ry*keep;}}
    const [hx,hy]=cursorOverlayHotspot,scale=cursorOverlayScale(reduced);cursorOverlayImg.style.transformOrigin=`${hx}px ${hy}px`;cursorOverlayImg.style.transform=`translate3d(${cursorOverlayPos.x-hx}px,${cursorOverlayPos.y-hy}px,0) scale(${scale})`;
    let leadX=cursorOverlayPos.x,leadY=cursorOverlayPos.y,unsettled=dist>.28;
    for(let i=0;i<cursorOverlayTrails.length;i++){const trail=cursorOverlayTrails[i],pos=cursorOverlayTrailPos[i]||(cursorOverlayTrailPos[i]={x:leadX,y:leadY}),lag=Math.max(.10,alpha*(.66/(i+1))),tdx=leadX-pos.x,tdy=leadY-pos.y;pos.x+=tdx*lag;pos.y+=tdy*lag;trail.style.transformOrigin=`${hx}px ${hy}px`;trail.style.transform=`translate3d(${pos.x-hx}px,${pos.y-hy}px,0) scale(${Math.max(.72,scale-i*.04)})`;if(Math.abs(tdx)>.22||Math.abs(tdy)>.22)unsettled=true;leadX=pos.x;leadY=pos.y;}
    if(unsettled)cursorOverlayRaf=requestAnimationFrame(stepCursorOverlay);
  }
  function spawnCursorClickPulse(x,y){if(!cursorOverlayEl)return;const ring=document.createElement("span"),color=cursorOverlayPack?.accentColor||cursorOverlayPack?.outlineColor||"#6ea8ff";ring.setAttribute("data-click-pulse","1");ring.style.cssText=`position:fixed;left:${x}px;top:${y}px;width:18px;height:18px;margin:-9px 0 0 -9px;border:2px solid ${color};border-radius:50%;pointer-events:none;opacity:.72;transform:scale(.4);will-change:transform,opacity;`;cursorOverlayEl.append(ring);try{const a=ring.animate([{transform:"scale(.4)",opacity:.72},{transform:"scale(1.65)",opacity:0}],{duration:320,easing:"cubic-bezier(.2,.8,.2,1)"});a.onfinish=()=>ring.remove();}catch{setTimeout(()=>ring.remove(),340);}}
  function destroyCursorOverlay(){cancelCursorHide();if(cursorOverlayRaf)cancelAnimationFrame(cursorOverlayRaf);cursorOverlayRaf=0;document.getElementById(CURSOR_OVERLAY_ID)?.remove();cursorOverlayEl=null;cursorOverlayImg=null;cursorOverlayTrails=[];cursorOverlayTrailPos=[];cursorOverlayPack=null;cursorOverlayVisible=false;cursorOverlayPressed=false;cursorOverlayState="default";cursorOverlayHotspot=[0,0];}

  async function applyCursorConfig(config) {
    const root=document.documentElement;
    const signature=JSON.stringify({
      enabled:!!config.cursorEnabled,key:String(config.cursorPackKey||""),size:clampInt(config.cursorSize,16,96,32),motion:!!config.cursorMotionEnabled,
      smooth:clampInt(config.cursorSmoothness,0,100,35),trail:!!config.cursorTrailEnabled,trailLength:clampInt(config.cursorTrailLength,1,6,3),
      click:config.cursorClickEffectEnabled!==false,hover:config.cursorHoverScaleEnabled!==false,glow:!!config.cursorGlowEnabled
    });
    if(signature===cursorConfigSignature&&((!config.cursorEnabled)||(cursorRuntimeAsset&&document.getElementById(CURSOR_STYLE_ID))))return;
    const version=++cursorApplyVersion;

    if(!config.cursorEnabled){
      document.getElementById(CURSOR_STYLE_ID)?.remove();root?.removeAttribute("data-persianyar-custom-cursor");root?.removeAttribute("data-persianyar-cursor-overlay");destroyCursorOverlay();disableCursorHoverTracking();cursorRuntimeAsset=null;cursorPreloadImages=[];clearCursorHoverTarget();cursorConfigSignature=signature;syncAllShadowStyles();syncUserOriginCss();return;
    }

    const api=globalThis.__PERSIANYAR_CURSOR_PACKS__ || null;
    const requestedKey=String(config.cursorPackKey||"macos-black");
    const pack=api?.get?.(requestedKey) || { key:requestedKey, accentColor:"#6ea8ff", outlineColor:"#ffffff", baseColor:"#111111" };
    let cached=null;
    try{const stored=await chrome.storage.local.get({[CURSOR_CACHE_KEY]:{}});cached=stored?.[CURSOR_CACHE_KEY]?.[pack.key]||null;}catch{}
    if(version!==cursorApplyVersion)return;

    // Apply something themed immediately. Network/caching is an upgrade path, never a gate.
    const immediate=(cached?.defaultUrl&&cached?.pointerUrl)?cached:emergencyCursorAsset(pack,api);
    try{await primeCursorAssetImages(immediate,false)}catch{}
    if(version!==cursorApplyVersion)return;
    commitCursorAsset(immediate,pack,config,signature);

    // Upgrade preview/fallback data to the full verified pack in the background. If mirrors are
    // blocked or slow, the already-active built-in cursor remains in place.
    try{
      const knownVersion=api?.version || cached?.version || "";
      const requiredStates=api?.stateKeys || [];
      const complete=!!cached?.defaultUrl&&!!cached?.pointerUrl&&cached?.mode==="full"&&(!knownVersion||cached?.version===knownVersion)&&(!requiredStates.length||requiredStates.every(stateName=>cached?.states?.[stateName]));
      if(complete)return;
      const response=await chrome.runtime.sendMessage({type:"fontyar:cache-cursor-pack",key:pack.key});
      const asset=response?.ok?response.payload:null;
      if(!asset?.defaultUrl||!asset?.pointerUrl||version!==cursorApplyVersion||!state.config.cursorEnabled)return;
      await primeCursorAssetImages(asset,true);
      if(version!==cursorApplyVersion||!state.config.cursorEnabled)return;
      commitCursorAsset(asset,pack,state.config,signature);
    }catch(error){console.debug?.("[PersianYar] cursor kept instant fallback",String(error?.message||error));}
  }

  function hasThemeAwareSiteStyles(config = state.config) {
    return !!(config.smartDarkMode || config.liquidGlassMode || config.linearStyleMode || config.adaptiveMenusMode || config.focusEnhanceMode || config.polishedInputsMode);
  }

  function setRootStyleVar(name, value) {
    const root=document.documentElement;if(!root)return;
    if(root.style.getPropertyValue(name)!==value)root.style.setProperty(name,value);
  }

  function hexToRgbTuple(value, fallback="#94a3b8") {
    const hex=sanitizeSmartDarkColor(value,fallback).slice(1);
    return [Number.parseInt(hex.slice(0,2),16),Number.parseInt(hex.slice(2,4),16),Number.parseInt(hex.slice(4,6),16)];
  }
  function mixRgbTuple(base, tint, amount) {
    const t=Math.max(0,Math.min(1,Number(amount)||0));
    return [0,1,2].map(i=>Math.round(base[i]*(1-t)+tint[i]*t));
  }

  function themeHintFromDocument() {
    const root=document.documentElement,body=document.body;
    const bits=[];
    for(const el of [root,body]){
      if(!(el instanceof HTMLElement))continue;
      for(const attr of ["data-theme","data-color-mode","data-mode","theme","color-scheme"]) {
        const v=el.getAttribute(attr);if(v)bits.push(v);
      }
      if(el.hasAttribute("dark"))bits.push("dark");
      if(el.hasAttribute("light"))bits.push("light");
      bits.push(el.className || "");
    }
    const hint=bits.join(" ").toLowerCase();
    if(/(?:^|[\s_-])(dark|night)(?:$|[\s_-])/.test(hint))return "dark";
    if(/(?:^|[\s_-])(light|day)(?:$|[\s_-])/.test(hint))return "light";
    const meta=document.querySelector?.('meta[name="color-scheme"]')?.getAttribute("content")?.toLowerCase()||"";
    if(/^\s*dark(?:\s|$)/.test(meta))return "dark";
    if(/^\s*light(?:\s|$)/.test(meta))return "light";
    return "";
  }

  function colorLuminance(rgb) {
    if(!rgb)return .5;
    const linear=n=>{n/=255;return n<=.04045?n/12.92:Math.pow((n+.055)/1.055,2.4)};
    return .2126*linear(rgb[0])+.7152*linear(rgb[1])+.0722*linear(rgb[2]);
  }


  function detectSiteTheme() {
    const root=document.documentElement, body=document.body;
    const hint=themeHintFromDocument();
    let fallbackFg="";

    const sampleElement = el => {
      if (!(el instanceof HTMLElement)) return null;
      try {
        const cs=getComputedStyle(el), rgb=parseRgb(cs.backgroundColor);
        if (!fallbackFg && cs.color) fallbackFg=cs.color;
        if (!rgb || rgb[3] < .22) return null;
        const max=Math.max(rgb[0],rgb[1],rgb[2]),min=Math.min(rgb[0],rgb[1],rgb[2]);
        return {rgb, fg:cs.color||"", lum:colorLuminance(rgb), chroma:max-min};
      } catch { return null; }
    };

    // A few viewport probes are more reliable than looking only at html/body on modern SPAs.
    // Search Console, Office, dashboards, etc. often keep body transparent while separate shells
    // paint a dark sidebar and a much larger light work area. Area probes correctly classify the
    // visible canvas instead of whichever DOM node happened to be queried first.
    const viewportSamples=[];
    try {
      const w=Math.max(1,innerWidth||root?.clientWidth||1), h=Math.max(1,innerHeight||root?.clientHeight||1);
      const points=[[.08,.04],[.5,.04],[.92,.04],[.08,.48],[.5,.48],[.92,.48],[.08,.86],[.5,.86],[.92,.86]];
      for (const [px,py] of points) {
        let el=document.elementFromPoint(Math.max(0,Math.min(w-1,w*px)),Math.max(0,Math.min(h-1,h*py)));
        let depth=0, sample=null;
        while (el instanceof HTMLElement && depth++ < 9) {
          sample=sampleElement(el);
          if (sample) break;
          el=el.parentElement;
        }
        if (sample) viewportSamples.push(sample);
      }
    } catch {}

    const structural=[];
    const add=el=>{const s=sampleElement(el);if(s)structural.push(s)};
    for(const selector of ["main","[role='main']","ytcp-app","ytd-app","#app","#root","[data-reactroot]"]) { try{add(document.querySelector(selector))}catch{} }
    add(body); add(root);

    const samples=viewportSamples.length ? viewportSamples : structural;
    let theme="";
    if (hint) theme=hint;
    else if (samples.length) {
      let light=0,dark=0;
      for (const s of samples) {
        // Strong brand/accent fills (red CTA, blue hero, charts) are not the page canvas and must
        // not vote the whole site dark just because they cover one sample point.
        if (s.chroma > 78 && s.lum > .08 && s.lum < .90) continue;
        if (s.lum < .32) dark++; else if (s.lum > .46) light++; else { dark+=.45; light+=.55; }
      }
      theme=dark > light*1.18 ? "dark" : "light";
    }
    if (!theme) {
      try {
        const scheme=String(getComputedStyle(root).colorScheme||"");
        if (/(^|\s)dark(\s|$)/.test(scheme) && !/\blight\b/.test(scheme)) theme="dark";
        else if (/(^|\s)light(\s|$)/.test(scheme) && !/\bdark\b/.test(scheme)) theme="light";
      } catch {}
    }
    if(!theme) theme="light";

    let picked=null, fg=fallbackFg;
    if (samples.length) {
      const wanted=theme==="dark" ? samples.filter(s=>s.lum<.42) : samples.filter(s=>s.lum>.42);
      const pool=wanted.length?wanted:samples;
      pool.sort((a,b)=> theme==="dark" ? a.lum-b.lum : b.lum-a.lum);
      picked=pool[Math.floor(pool.length/2)]?.rgb || pool[0]?.rgb || null;
      fg=pool.find(s=>s.fg)?.fg || fg;
    }
    if(!picked)picked=theme==="dark"?[18,20,23,1]:[250,250,252,1];
    if(!fg)fg=theme==="dark"?"rgb(232,235,240)":"rgb(30,32,36)";
    let accent=fg;
    try{const ae=document.querySelector("a[href],[role='link'],button:not(:disabled)");const ac=ae&&getComputedStyle(ae).color;if(ac)accent=ac}catch{}
    return {theme,bg:picked,fg,accent};
  }

  function refreshSiteThemeTokens(config = state.config, forceDetect = false) {
    const root=document.documentElement;if(!root||!hasThemeAwareSiteStyles(config))return;
    // Never drop the dark gate merely to inspect the original theme. Doing so forces a page-wide
    // style recalculation and can visibly flash on large SPAs. Detect once before activation, then
    // react only to explicit light/dark hints while Smart Dark is active.
    const hint=themeHintFromDocument();
    let info=state.smartDarkThemeInfo;
    const prepaintOwned=!!config.smartDarkMode&&root.hasAttribute(SMART_DARK_PREPAINT_ATTR);
    if(!info&&prepaintOwned){
      // Registered prepaint is only injected for a host whose saved config has Smart Dark enabled.
      // Take ownership immediately; the expensive viewport classifier can refine surfaces later.
      info={theme:"light",bg:[250,250,252,1],fg:"rgb(30,32,36)",accent:"rgb(86,133,205)"};
      state.smartDarkThemeInfo=info;
      state.smartDarkThemeHint=hint;
    } else if(forceDetect || !info || !root.hasAttribute("data-persianyar-smart-dark-active")) {
      info=detectSiteTheme();
      state.smartDarkThemeInfo=info;
      state.smartDarkThemeHint=hint;
    } else if(hint && hint!==state.smartDarkThemeHint) {
      info={...info,theme:hint};
      state.smartDarkThemeInfo=info;
      state.smartDarkThemeHint=hint;
    }
    // Smart Dark is an overlay/repair mode, not merely a light-theme detector. A large number of
    // dashboards (Search Console included) are globally dark while still rendering light cards,
    // tables or hover states. Keep the Smart Dark gate active whenever the user enables it; the
    // per-element classifier still leaves genuinely dark/brand surfaces alone. This also makes an
    // on-the-fly toggle behave exactly like a reload with the saved setting.
    const smartDarkActive=!!config.smartDarkMode;
    const core=getSmartDarkReaderCore(),drTheme=getSmartDarkReaderTheme();
    const sourceBg=info.bg||[255,255,255,1];
    const mappedBg=smartDarkActive&&core&&drTheme?core.modifyBackground(sourceBg,drTheme):sourceBg;
    const effectiveBg=mappedBg||sourceBg,[r,g,b]=effectiveBg;
    const sourceFg=parseRgb(info.fg)||[30,32,36,1];
    const sourceAccent=parseRgb(info.accent)||[0,102,204,1];
    const effectiveFg=smartDarkActive&&core&&drTheme?core.toCSS(core.modifyForeground(sourceFg,drTheme)):info.fg;
    const effectiveAccent=smartDarkActive?sanitizeSmartDarkColor(config.smartDarkAccentColor,DEFAULT_CONFIG.smartDarkAccentColor):(core&&drTheme?core.toCSS(core.modifyForeground(sourceAccent,drTheme)):info.accent);
    root.setAttribute("data-persianyar-site-theme",info.theme);
    root.toggleAttribute("data-persianyar-smart-dark-active",smartDarkActive);
    root.toggleAttribute("data-persianyar-darkreader-dynamic",smartDarkActive&&!!core);
    if(smartDarkActive&&core)root.setAttribute("data-persianyar-darkreader-version",core.version||"embedded");else root.removeAttribute("data-persianyar-darkreader-version");
    syncSmartDarkShadowHostState(smartDarkActive);
    setRootStyleVar("--persianyar-site-bg",core?.toCSS?core.toCSS(effectiveBg):`rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`);
    setRootStyleVar("--persianyar-site-fg",effectiveFg);
    setRootStyleVar("--persianyar-site-accent",effectiveAccent);
    const dark=smartDarkActive||info.theme==="dark";
    const glassAlpha=clampInt(config.liquidGlassOpacity,20,92,58)/100, menuAlpha=dark ? .92 : .94;
    const baseRgb=[Math.round(r),Math.round(g),Math.round(b)];
    const tintRgb=hexToRgbTuple(config.liquidGlassTintColor,DEFAULT_CONFIG.liquidGlassTintColor);
    const glassRgb=mixRgbTuple(baseRgb,tintRgb,clampInt(config.liquidGlassTintStrength,0,35,8)/100);
    const linearRgb=hexToRgbTuple(config.linearStyleColor,DEFAULT_CONFIG.linearStyleColor);
    const linearAlpha=clampInt(config.linearStyleOpacity,8,100,24)/100;
    const focusColor=sanitizeSmartDarkColor(config.focusRingColor,DEFAULT_CONFIG.focusRingColor);
    setRootStyleVar("--persianyar-glass-bg",`rgba(${glassRgb[0]}, ${glassRgb[1]}, ${glassRgb[2]}, ${glassAlpha})`);
    setRootStyleVar("--persianyar-menu-bg",`rgba(${baseRgb[0]}, ${baseRgb[1]}, ${baseRgb[2]}, ${menuAlpha})`);
    setRootStyleVar("--persianyar-glass-border",dark?"rgba(255,255,255,.19)":"rgba(20,24,32,.16)");
    setRootStyleVar("--persianyar-glass-highlight",dark?"rgba(255,255,255,.16)":"rgba(255,255,255,.78)");
    setRootStyleVar("--persianyar-glass-lowlight",dark?"rgba(0,0,0,.20)":"rgba(70,86,112,.10)");
    setRootStyleVar("--persianyar-glass-blur",`${clampInt(config.liquidGlassBlur,0,32,18)}px`);
    setRootStyleVar("--persianyar-glass-saturation",`${clampInt(config.liquidGlassSaturation,100,180,138)}%`);
    setRootStyleVar("--persianyar-linear-border",`rgba(${linearRgb[0]},${linearRgb[1]},${linearRgb[2]},${linearAlpha})`);
    setRootStyleVar("--persianyar-linear-strong",`rgba(${linearRgb[0]},${linearRgb[1]},${linearRgb[2]},${Math.min(1,linearAlpha+.18)})`);
    setRootStyleVar("--persianyar-linear-width",`${clampInt(config.linearStyleWidth,1,3,1)}px`);
    setRootStyleVar("--persianyar-menu-highlight",`${clampInt(config.menuHighlightStrength,6,32,12)}%`);
    setRootStyleVar("--persianyar-focus-color",focusColor);
    setRootStyleVar("--persianyar-focus-width",`${clampInt(config.focusRingWidth,1,4,2)}px`);
    setRootStyleVar("--persianyar-input-highlight",`${clampInt(config.inputHighlightStrength,6,36,16)}%`);
    setRootStyleVar("--persianyar-input-bg",`rgba(${baseRgb[0]}, ${baseRgb[1]}, ${baseRgb[2]}, ${dark?.72:.82})`);
    if(!smartDarkActive)clearSmartDarkSurfaces();
    if(config.liquidGlassMode||config.linearStyleMode)queueDecorNode(document.documentElement||document);
  }

  function scheduleSiteThemeRefresh() {
    if(!hasThemeAwareSiteStyles())return;
    clearTimeout(state.themeRefreshTimer);
    state.themeRefreshTimer=setTimeout(()=>{state.themeRefreshTimer=0;refreshSiteThemeTokens(state.config,false);syncAllShadowStyles();},110);
  }

  function armThemeObserver() {
    state.themeObserver?.disconnect();state.themeObserver=null;
    if(!hasThemeAwareSiteStyles()||!document.documentElement)return;
    // Theme switches are signalled by attributes/classes. Do not re-detect the whole site merely
    // because an SPA inserted an AJAX dialog or route fragment: that used to make Smart Dark
    // oscillate while portals mounted/unmounted and was the main reason it looked like the theme
    // "turned off" after opening async UI.
    const fn=()=>scheduleSiteThemeRefresh();
    const obs=new MutationObserver(records=>{if(records.length)fn();});
    // Inline style on app shells is often animated or updated during scroll. Watching it turned a
    // cheap theme listener into a high-frequency callback on dashboards. Theme changes are normally
    // exposed through class/data attributes, color-scheme metadata, or prefers-color-scheme.
    const rootAttrs=["class","data-theme","data-color-mode","data-mode","theme","dark","light","color-scheme"];
    const appAttrs=["data-theme","data-color-mode","data-mode","theme","dark","light","color-scheme"];
    try{
      obs.observe(document.documentElement,{attributes:true,attributeFilter:rootAttrs,subtree:false});
      if(document.body)obs.observe(document.body,{attributes:true,attributeFilter:rootAttrs,subtree:false});
      const app=document.querySelector("ytcp-app,ytd-app,#app,#root,[data-reactroot]");
      if(app instanceof HTMLElement&&app!==document.body)obs.observe(app,{attributes:true,attributeFilter:appAttrs,subtree:false});
    }catch{}
    state.themeObserver=obs;
  }

  function updateThemePreferenceListener(config) {
    const needed=hasThemeAwareSiteStyles(config);
    if(!needed){
      if(state.themeMediaQuery&&state.themeMediaListener){try{state.themeMediaQuery.removeEventListener("change",state.themeMediaListener)}catch{}}
      state.themeMediaQuery=null;state.themeMediaListener=null;state.themeObserver?.disconnect();state.themeObserver=null;return;
    }
    armThemeObserver();
    if(state.themeMediaQuery)return;
    try{const mq=matchMedia("(prefers-color-scheme: dark)"),fn=()=>scheduleSiteThemeRefresh();mq.addEventListener("change",fn);state.themeMediaQuery=mq;state.themeMediaListener=fn}catch{}
  }

  function ensureSmartDarkLoadingStyle() {
    // v37 intentionally avoids a full-screen loader. The prepaint canvas prevents white flash
    // without blocking input or delaying first meaningful paint.
  }

  function showSmartDarkLoading() {
    const root=document.documentElement;if(!root)return;
    root.setAttribute(SMART_DARK_PREPAINT_ATTR,"1");
    root.removeAttribute(SMART_DARK_LOADING_ATTR);
    document.getElementById(SMART_DARK_LOADING_ID)?.remove();
    document.getElementById(SMART_DARK_LOADING_STYLE_ID)?.remove();
  }

  function hideSmartDarkLoading(immediate=false) {
    clearTimeout(state.smartDarkLoadingFailsafe);state.smartDarkLoadingFailsafe=0;
    document.documentElement?.removeAttribute(SMART_DARK_LOADING_ATTR);
    document.getElementById(SMART_DARK_LOADING_ID)?.remove();
    document.getElementById(SMART_DARK_LOADING_STYLE_ID)?.remove();
  }

  function releaseSmartDarkPrepaint() {
    const root=document.documentElement;
    root?.removeAttribute(SMART_DARK_PREPAINT_ATTR);
    for(const name of ["--persianyar-prepaint-bg","--persianyar-prepaint-fg","--persianyar-prepaint-accent"])root?.style.removeProperty(name);
    document.getElementById("__persianyar_smart_dark_prepaint")?.remove();
  }

  function syncSmartDarkShadowHostState(forceActive=null) {
    const active=forceActive==null ? !!document.documentElement?.hasAttribute("data-persianyar-smart-dark-active") : !!forceActive;
    for(const shadowRoot of state.shadowRoots||[]){
      const host=shadowRoot?.host;
      if(!(host instanceof Element))continue;
      host.toggleAttribute(DARK_SHADOW_HOST_ATTR,active);
    }
  }

  function applySiteStyleConfig(config){
    const root=document.documentElement;
    let style=document.getElementById(SITE_STYLE_ID);
    if(!style){style=document.createElement("style");style.id=SITE_STYLE_ID;(document.head||root).append(style)}
    // Rebuild feature gates without dropping an already-active Smart Dark frame. Removing the dark
    // gate and then calling getComputedStyle() forced a whole-page light->dark recalculation on
    // every unrelated style toggle. Keep it live unless Smart Dark is actually being disabled.
    for(const a of ["data-persianyar-smart-dark","data-persianyar-liquid-glass","data-persianyar-linear","data-persianyar-adaptive-menus","data-persianyar-focus","data-persianyar-inputs"])root?.removeAttribute(a);
    if(!config.liquidGlassMode)clearAdaptiveVisualMarkers(GLASS_SURFACE_ATTR);
    if(!config.linearStyleMode)clearAdaptiveVisualMarkers(LINEAR_SURFACE_ATTR);
    for(const v of ["--persianyar-site-bg","--persianyar-site-fg","--persianyar-site-accent","--persianyar-glass-bg","--persianyar-menu-bg","--persianyar-glass-border","--persianyar-glass-highlight","--persianyar-glass-lowlight","--persianyar-glass-blur","--persianyar-glass-saturation","--persianyar-linear-border","--persianyar-linear-strong","--persianyar-linear-width","--persianyar-menu-highlight","--persianyar-focus-color","--persianyar-focus-width","--persianyar-input-highlight","--persianyar-input-bg"])root?.style.removeProperty(v);
    if(!config.smartDarkMode){
      getSmartDarkCssEngine()?.disable?.();
      root?.removeAttribute("data-persianyar-smart-dark-active");
      root?.removeAttribute("data-persianyar-site-theme");
      root?.removeAttribute("data-persianyar-darkreader-dynamic");
      root?.removeAttribute("data-persianyar-darkreader-version");
      syncSmartDarkShadowHostState(false);
      clearSmartDarkSurfaces();
      state.smartDarkThemeInfo=null;state.smartDarkThemeHint="";
    }
    const any=hasThemeAwareSiteStyles(config);if(!any){style.textContent="";state.smartDarkThemeInfo=null;state.smartDarkThemeHint="";hideSmartDarkLoading(true);releaseSmartDarkPrepaint();syncAllShadowStyles();syncUserOriginCss();return}
    refreshSiteThemeTokens(config,!state.smartDarkThemeInfo);
    const cssDarkEngine=getSmartDarkCssEngine();
    if(config.smartDarkMode&&cssDarkEngine)cssDarkEngine.enable({theme:getSmartDarkReaderTheme()});
    const rules=[];
    const floating=":is(dialog[open],[role='dialog'],[aria-modal='true'],[role='menu']:not([hidden]),[role='listbox']:not([hidden]),[role='tooltip'],[popover]:popover-open,[data-state='open'],[data-testid*='dropdown' i],[data-testid*='popover' i],[data-testid*='sheet' i],ytcp-popup-container,tp-yt-paper-dialog,tp-yt-paper-listbox,.dropdown-menu,.popover,.offcanvas,.modal-content,.MuiMenu-paper,.MuiPopover-paper,.MuiDrawer-paper,.ant-dropdown,.ant-popover-inner,.ant-select-dropdown,.ant-drawer-content,.chakra-menu__menu-list,[class*='dropdown-menu' i],[class*='context-menu' i],[class*='contextmenu' i],[data-testid*='context-menu' i],[data-slot*='context-menu' i],[data-radix-menu-content],[data-radix-popover-content],[data-radix-dropdown-menu-content],[data-slot*='dropdown-menu-content' i],[data-slot*='popover-content' i],[class*='popover-content' i],[class*='menu-surface' i])";
    const surfaces=":is(dialog,[role='dialog'],[role='menu'],[role='listbox'],[role='tooltip'],[data-testid*='dropdown' i],[data-testid*='popover' i],[data-testid*='sheet' i],.dropdown-menu,.popover,.offcanvas,.modal-content,.MuiPaper-root,.ant-dropdown,.ant-popover-inner,.ant-select-dropdown,.ant-drawer-content,.chakra-menu__menu-list,[class*='card' i],[class*='panel' i],[class*='modal' i],[class*='popover' i],[class*='context-menu' i],[class*='contextmenu' i],[data-testid*='context-menu' i],[data-slot*='context-menu' i],[data-radix-menu-content],[data-radix-popover-content],[data-radix-dropdown-menu-content],[data-slot*='dropdown-menu-content' i],[data-slot*='popover-content' i])";
    const shellSurfaces=":is(header,body>nav,aside,[role='banner'],[role='navigation'],.navbar,.MuiAppBar-root,.MuiDrawer-paper,.ant-layout-header,.ant-layout-sider,ytcp-navigation-drawer,ytd-masthead,[class*='sidebar' i],[class*='side-bar' i],[class*='navigation-drawer' i],[class*='nav-drawer' i],[class*='app-sidebar' i],[class*='app-header' i],[class*='topbar' i],[class*='top-bar' i],[class*='navbar' i],[class*='nav-bar' i],[class*='side-menu' i],[class*='sidemenu' i])";
    const menuSurfaces=":is([role='menu']:not([hidden]),[role='listbox']:not([hidden]),.dropdown-menu,.MuiMenu-paper,.ant-dropdown-menu,.ant-select-dropdown,.chakra-menu__menu-list,[data-radix-menu-content],[data-radix-dropdown-menu-content],[data-slot*='dropdown-menu-content' i],[class*='context-menu' i],[class*='contextmenu' i])";
    const menuItems=":is([role='menuitem'],[role='option'],[role='tab'],.dropdown-item,.MuiMenuItem-root,.ant-dropdown-menu-item,.ant-select-item-option,[data-radix-collection-item],[data-highlighted])";
    const inputs=":is(input:not([type='checkbox']):not([type='radio']):not([type='range']):not([type='color']):not([type='file']):not([type='button']):not([type='submit']):not([type='reset']):not([type='image']):not([type='hidden']),textarea,select,[contenteditable='true'],[contenteditable='plaintext-only'],[role='textbox'],[role='searchbox'],[role='combobox'])";
    const focusables=":is(a[href],button,input,textarea,select,summary,[contenteditable='true'],[contenteditable='plaintext-only'],[role='button'],[role='link'],[role='menuitem'],[role='option'],[role='tab'],[role='switch'],[role='checkbox'],[role='radio'],[role='combobox'],[role='textbox'],[tabindex]:not([tabindex='-1']))";

    if(config.smartDarkMode){
      root?.setAttribute("data-persianyar-smart-dark","1");
      // v38: CSS-first theming. The mirrored CSSOM sheet handles authored colors at selector level,
      // including hover/focus/media states. Element markers are retained only as a legacy fallback.
      rules.push(`html[data-persianyar-smart-dark-active],html[data-persianyar-smart-dark-active] body{background-color:var(--persianyar-site-bg,#181a1b)!important;color:var(--persianyar-site-fg,#e8e6e3)!important;color-scheme:dark!important}`);
      rules.push(`html[data-persianyar-smart-dark-active] :where(input,textarea,select,button,option,optgroup,[role='textbox'],[role='searchbox'],[role='combobox'],[role='checkbox'],[role='radio'],[role='switch']){color-scheme:dark!important}`);
      rules.push(`html[data-persianyar-smart-dark-active] :where(input[type='checkbox'],input[type='radio'],input[type='range'],progress){accent-color:var(--persianyar-site-accent,#8ab4f8)!important}`);
      rules.push(`html[data-persianyar-smart-dark-active] :where(input,textarea)::placeholder{color:color-mix(in srgb,currentColor 62%,transparent)!important;opacity:1}`);
      // Keep the element-level repair markers available even when the CSS-first engine is active.
      // The CSS engine handles author styles and states; this residual layer only repairs light
      // surfaces/text that remain after CSSOM processing (typically locally-scoped CSS variables,
      // CSS-in-JS runtime values, or inaccessible stylesheet declarations). It changes paint only.
      rules.push(`html[data-persianyar-smart-dark-active] [${DARK_SURFACE_ATTR}="dr"]{background-color:var(--persianyar-dr-bg,var(--persianyar-site-bg,#181a1b))!important}`);
      rules.push(`html[data-persianyar-smart-dark-active] [${DARK_TEXT_ATTR}="dr"]{color:var(--persianyar-dr-fg,var(--persianyar-site-fg,#e8e6e3))!important}`);
      rules.push(`html[data-persianyar-smart-dark-active] [${DARK_BORDER_ATTR}="dr"]{border-top-color:var(--persianyar-dr-border-top,currentColor)!important;border-right-color:var(--persianyar-dr-border-right,currentColor)!important;border-bottom-color:var(--persianyar-dr-border-bottom,currentColor)!important;border-left-color:var(--persianyar-dr-border-left,currentColor)!important}`);
    }

    if(config.liquidGlassMode){
      root?.setAttribute("data-persianyar-liquid-glass","1");
      const glassTargets=`[${GLASS_SURFACE_ATTR}]`;
      // Real backdrop glass is limited to surfaces classified as app chrome or floating UI.  No
      // descendant menu rows/buttons are targeted, and no outline is painted around every child.
      rules.push(`@supports ((backdrop-filter:blur(1px)) or (-webkit-backdrop-filter:blur(1px))){html[data-persianyar-liquid-glass="1"] ${glassTargets}{background-color:var(--persianyar-glass-bg)!important;-webkit-backdrop-filter:blur(var(--persianyar-glass-blur,18px)) saturate(var(--persianyar-glass-saturation,138%)) contrast(104%)!important;backdrop-filter:blur(var(--persianyar-glass-blur,18px)) saturate(var(--persianyar-glass-saturation,138%)) contrast(104%)!important;border-color:var(--persianyar-glass-border)!important;background-clip:padding-box!important}html[data-persianyar-liquid-glass="1"] [${GLASS_SURFACE_ATTR}="shell"]{box-shadow:inset 0 1px 0 var(--persianyar-glass-highlight),inset 0 -1px 0 var(--persianyar-glass-lowlight)!important}html[data-persianyar-liquid-glass="1"] [${GLASS_SURFACE_ATTR}="float"]{box-shadow:inset 0 1px 0 var(--persianyar-glass-highlight),inset 0 -1px 0 var(--persianyar-glass-lowlight),0 18px 48px rgba(0,0,0,.18)!important}}`);
      rules.push(`@supports not ((backdrop-filter:blur(1px)) or (-webkit-backdrop-filter:blur(1px))){html[data-persianyar-liquid-glass="1"] ${glassTargets}{background-color:var(--persianyar-menu-bg)!important;border-color:var(--persianyar-glass-border)!important}}`);
    }
    if(config.linearStyleMode){
      root?.setAttribute("data-persianyar-linear","1");
      const linearTargets=`[${LINEAR_SURFACE_ATTR}]`;
      // The line treatment is marker-driven too: cards/fields/standalone controls can receive one
      // quiet hairline, while sidebar navigation rows and ordinary links remain untouched.
      rules.push(`html[data-persianyar-linear="1"] ${linearTargets}:not([${GLASS_SURFACE_ATTR}]){box-shadow:inset 0 0 0 var(--persianyar-linear-width,1px) var(--persianyar-linear-border)!important;border-color:var(--persianyar-linear-border)!important}`);
      rules.push(`html[data-persianyar-linear="1"] ${linearTargets}:not([${GLASS_SURFACE_ATTR}]):is(:hover,:focus-within,[aria-selected='true'],[data-state='open']){box-shadow:inset 0 0 0 var(--persianyar-linear-width,1px) var(--persianyar-linear-strong)!important;border-color:var(--persianyar-linear-strong)!important}`);
      rules.push(`html[data-persianyar-linear="1"][data-persianyar-liquid-glass="1"] [${GLASS_SURFACE_ATTR}="shell"][${LINEAR_SURFACE_ATTR}]{border-color:var(--persianyar-linear-border)!important;box-shadow:inset 0 0 0 var(--persianyar-linear-width,1px) var(--persianyar-linear-border),inset 0 1px 0 var(--persianyar-glass-highlight),inset 0 -1px 0 var(--persianyar-glass-lowlight)!important}html[data-persianyar-linear="1"][data-persianyar-liquid-glass="1"] [${GLASS_SURFACE_ATTR}="float"][${LINEAR_SURFACE_ATTR}]{border-color:var(--persianyar-linear-border)!important;box-shadow:inset 0 0 0 var(--persianyar-linear-width,1px) var(--persianyar-linear-border),inset 0 1px 0 var(--persianyar-glass-highlight),inset 0 -1px 0 var(--persianyar-glass-lowlight),0 18px 48px rgba(0,0,0,.18)!important}`);
    }
    if(config.adaptiveMenusMode){
      root?.setAttribute("data-persianyar-adaptive-menus","1");
      const adaptiveBg=config.liquidGlassMode?"var(--persianyar-glass-bg)":"var(--persianyar-menu-bg)";
      const adaptiveShadowRule=config.liquidGlassMode?"":`box-shadow:${config.linearStyleMode?"none":"0 12px 32px rgba(0,0,0,.14)"}!important;`;
      rules.push(`html[data-persianyar-adaptive-menus="1"] ${menuSurfaces}{background-color:${adaptiveBg}!important;border-color:var(--persianyar-glass-border)!important;outline:1px solid var(--persianyar-glass-border)!important;outline-offset:-1px!important;${adaptiveShadowRule}overscroll-behavior:contain;scrollbar-color:color-mix(in srgb,var(--persianyar-site-fg,currentColor) 28%,transparent) transparent}`);
      rules.push(`html[data-persianyar-adaptive-menus="1"] ${menuItems}{transition:background-color .12s ease,color .12s ease,border-color .12s ease}`);
      rules.push(`html[data-persianyar-adaptive-menus="1"] ${menuItems}:is(:hover,:focus-visible,[aria-selected='true'],[aria-current='true'],[data-highlighted],[data-state='checked']){background-color:color-mix(in srgb,var(--persianyar-site-accent,Highlight) var(--persianyar-menu-highlight,12%),transparent)!important}`);
      rules.push(`html[data-persianyar-adaptive-menus="1"] :is([role='separator'],.dropdown-divider,.MuiDivider-root,.ant-dropdown-menu-item-divider){border-color:color-mix(in srgb,var(--persianyar-site-fg,currentColor) 14%,transparent)!important;background-color:color-mix(in srgb,var(--persianyar-site-fg,currentColor) 14%,transparent)!important}`);
      rules.push(`html[data-persianyar-adaptive-menus="1"] ${menuItems}:is([aria-disabled='true'],[data-disabled]){opacity:.56}`);
    }
    if(config.focusEnhanceMode){
      root?.setAttribute("data-persianyar-focus","1");
      rules.push(`html[data-persianyar-focus="1"] ${focusables}:focus-visible{outline:var(--persianyar-focus-width,2px) solid var(--persianyar-focus-color,var(--persianyar-site-accent,Highlight))!important;outline-offset:2px!important;box-shadow:0 0 0 calc(var(--persianyar-focus-width,2px) + 2px) color-mix(in srgb,var(--persianyar-focus-color,var(--persianyar-site-accent,Highlight)) 16%,transparent)!important}`);
      rules.push(`@media (forced-colors:active){html[data-persianyar-focus="1"] ${focusables}:focus-visible{outline:2px solid Highlight!important;outline-offset:2px!important;box-shadow:none!important}}`);
    }
    if(config.polishedInputsMode){
      root?.setAttribute("data-persianyar-inputs","1");
      const cleanInputBorder=config.linearStyleMode?"var(--persianyar-linear-border)":"color-mix(in srgb,var(--persianyar-site-fg,currentColor) var(--persianyar-input-highlight,16%),transparent)";
      rules.push(`html[data-persianyar-inputs="1"] ${inputs}{color:var(--persianyar-site-fg,currentColor)!important;background-color:var(--persianyar-input-bg)!important;border-color:${cleanInputBorder}!important;caret-color:var(--persianyar-focus-color,var(--persianyar-site-accent,Highlight))!important;box-shadow:inset 0 0 0 1px ${cleanInputBorder}!important;background-clip:padding-box!important;transition:box-shadow .12s ease,background-color .12s ease,border-color .12s ease}`);
      rules.push(`html[data-persianyar-inputs="1"] ${inputs}:is(:hover,:focus,:focus-within){border-color:color-mix(in srgb,var(--persianyar-focus-color,var(--persianyar-site-accent,Highlight)) 58%,transparent)!important;box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--persianyar-focus-color,var(--persianyar-site-accent,Highlight)) 48%,transparent),0 0 0 3px color-mix(in srgb,var(--persianyar-focus-color,var(--persianyar-site-accent,Highlight)) 11%,transparent)!important}`);
      rules.push(`html[data-persianyar-inputs="1"] :where(input,textarea)::placeholder{color:color-mix(in srgb,var(--persianyar-site-fg,currentColor) 55%,transparent)!important;opacity:1}html[data-persianyar-inputs="1"] :where(input[type='checkbox'],input[type='radio'],input[type='range'],progress){accent-color:var(--persianyar-focus-color,var(--persianyar-site-accent,Highlight))!important}`);
      rules.push(`html[data-persianyar-inputs="1"] ${inputs}::selection{background:color-mix(in srgb,var(--persianyar-focus-color,var(--persianyar-site-accent,Highlight)) 30%,transparent)!important}`);
    }
    // Atomic stylesheet update: keep the existing sheet mounted and swap only its text.
    style.textContent=rules.join("\n");
    if(config.liquidGlassMode||config.linearStyleMode)queueDecorNode(document.documentElement||document);
    if(config.smartDarkMode && root?.hasAttribute("data-persianyar-smart-dark-active")) {
      if(cssDarkEngine){
        cssDarkEngine.refresh?.();
        state.smartDarkInitialPassDone=true;
        // The CSSOM override sheet is already active; there is no element-by-element reveal phase.
        requestAnimationFrame(()=>{hideSmartDarkLoading(true);releaseSmartDarkPrepaint();});
      }else{
        const coldStart=!state.smartDarkInitialPassDone || root.hasAttribute(SMART_DARK_PREPAINT_ATTR);
        if(coldStart)runSmartDarkInitialViewportPass(()=>{hideSmartDarkLoading(true);releaseSmartDarkPrepaint();});
        else{markSmartDarkVisibleShell();hideSmartDarkLoading(true);releaseSmartDarkPrepaint();}
      }
    } else { hideSmartDarkLoading(true); releaseSmartDarkPrepaint(); }
    syncAllShadowStyles();syncUserOriginCss();
  }

  function applySoftUiConfig(config) {
    const root = document.documentElement;
    let style = document.getElementById(SOFT_STYLE_ID);
    if (!style) { style = document.createElement("style"); style.id = SOFT_STYLE_ID; (document.head || root)?.append(style); }
    root?.removeAttribute("data-fontyar-soft-motion");
    root?.removeAttribute("data-fontyar-remove-shadows");
    root?.removeAttribute("data-fontyar-smooth-scroll");
    if (!config.softMotionEnabled) clearSoftMotion();
    if (!config.motionShimmerEnabled) clearShimmer();
    if (!config.softCorners) clearSoftCorners();
    if (!config.uniformCornersEnabled) clearUniformCorners();
    if (!config.removeShadows) clearShadowOutlines();
    if (!config.softMotionEnabled && !config.softCorners && !config.uniformCornersEnabled && !config.removeShadows && !config.smoothScrollEnabled) { style.textContent=""; syncAllShadowStyles(); syncUserOriginCss(); return; }
    const rules = [];
    if (config.softMotionEnabled) {
      root?.setAttribute("data-fontyar-soft-motion", "1");
      // Performance-first motion: never animate geometry, blur, shadow or font metrics.
      if (config.motionHoverEnabled) rules.push(`@media (prefers-reduced-motion:no-preference){
html[data-fontyar-soft-motion="1"] :is(button,[role="button"],[role="menuitem"],[role="tab"],[role="option"],[role="switch"],[role="checkbox"],summary){transition-property:background-color,color,border-color,opacity;transition-duration:.16s;transition-timing-function:cubic-bezier(.2,.8,.2,1);}
html[data-fontyar-soft-motion="1"] :is(button,[role="button"],[role="menuitem"],[role="tab"],[role="option"],[role="switch"],[role="checkbox"],summary)>:is(div,span){transition-property:background-color,color,border-color,opacity;transition-duration:.16s;transition-timing-function:cubic-bezier(.2,.8,.2,1);}
html[data-fontyar-soft-motion="1"] :is(button,[role="button"],[role="menuitem"],[role="tab"],[role="option"],[role="switch"],[role="checkbox"],summary) svg{transition:opacity .14s ease;}
html[data-fontyar-soft-motion="1"] :is(button,[role="button"],[role="menuitem"],[role="tab"],[role="option"],summary):not(:disabled):not([aria-disabled="true"]){transition-property:background-color,color,border-color,opacity,scale;transition-duration:.16s;transition-timing-function:cubic-bezier(.2,.8,.2,1);}
html[data-fontyar-soft-motion="1"] :is(button,[role="button"],[role="menuitem"],[role="tab"],[role="option"],summary):not(:disabled):not([aria-disabled="true"]):is(:hover,:focus-visible){scale:1.012;}
html[data-fontyar-soft-motion="1"] :is(button,[role="button"],[role="menuitem"],[role="tab"],[role="option"],summary):not(:disabled):not([aria-disabled="true"]):active{scale:.985;}
[${SOFT_SURFACE_ATTR}="1"]{transform-origin:var(--fontyar-origin-x,50%) var(--fontyar-origin-y,50%);will-change:opacity;}
[${SOFT_STATE_ATTR}="1"]{transition:opacity .14s ease;}
[${SHIMMER_ATTR}="1"]{position:relative;overflow:hidden!important;}
[${SHIMMER_ATTR}="1"]::after{content:"";position:absolute;inset-block:0;inset-inline-start:-58%;width:54%;pointer-events:none;background:linear-gradient(100deg,transparent 0%,color-mix(in srgb,currentColor 9%,transparent) 50%,transparent 100%);transform:translate3d(0,0,0);animation:persianyarShimmer 1.18s cubic-bezier(.4,0,.2,1) infinite;}@keyframes persianyarShimmer{to{transform:translate3d(300%,0,0)}}
}@media (prefers-reduced-motion:reduce){html[data-fontyar-soft-motion="1"] :is(button,[role="button"],[role="menuitem"],[role="tab"],[role="option"],[role="switch"],[role="checkbox"],summary),html[data-fontyar-soft-motion="1"] :is(button,[role="button"],[role="menuitem"],[role="tab"],[role="option"],[role="switch"],[role="checkbox"],summary)>:is(div,span),html[data-fontyar-soft-motion="1"] svg,[${SOFT_SURFACE_ATTR}="1"],[${SOFT_STAGGER_ATTR}="1"],[${SOFT_STATE_ATTR}="1"]{transition:none!important;animation:none!important;}}`);
    }
    if (config.motionShimmerEnabled) rules.push(`@media (prefers-reduced-motion:no-preference){[${SHIMMER_ATTR}="1"]{position:relative;overflow:hidden!important;}[${SHIMMER_ATTR}="1"]::after{content:"";position:absolute;inset-block:0;inset-inline-start:-58%;width:54%;pointer-events:none;background:linear-gradient(100deg,transparent 0%,color-mix(in srgb,currentColor 9%,transparent) 50%,transparent 100%);transform:translate3d(0,0,0);animation:persianyarShimmer 1.18s cubic-bezier(.4,0,.2,1) infinite;}@keyframes persianyarShimmer{to{transform:translate3d(300%,0,0)}}}`);
    if (config.motionTooltipDelayEnabled) rules.push(`[${TOOLTIP_DELAY_ATTR}="waiting"]{opacity:0!important;visibility:hidden!important;pointer-events:none!important}`);
    if (config.motionTabularNumsEnabled) rules.push(`html[data-fontyar-soft-motion="1"] :is(time,[role="timer"],[data-testid*="price" i],[data-testid*="timer" i],[data-testid*="count" i],[class*="price" i],[class*="timer" i],[class*="countdown" i],[class*="counter" i]){font-variant-numeric:tabular-nums lining-nums!important;font-feature-settings:"tnum" 1!important}`);
    if (config.motionScrollFadeEnabled) rules.push(`[${SCROLL_FADE_ATTR}="both"]{-webkit-mask-image:linear-gradient(to bottom,transparent 0,#000 14px,#000 calc(100% - 14px),transparent 100%);mask-image:linear-gradient(to bottom,transparent 0,#000 14px,#000 calc(100% - 14px),transparent 100%)}[${SCROLL_FADE_ATTR}="end"]{-webkit-mask-image:linear-gradient(to bottom,#000 0,#000 calc(100% - 14px),transparent 100%);mask-image:linear-gradient(to bottom,#000 0,#000 calc(100% - 14px),transparent 100%)}[${SCROLL_FADE_ATTR}="start"]{-webkit-mask-image:linear-gradient(to bottom,transparent 0,#000 14px,#000 100%);mask-image:linear-gradient(to bottom,transparent 0,#000 14px,#000 100%)}`);
    if (config.softCorners) rules.push(`[${SOFT_CORNER_ATTR}="1"]{border-radius:10px!important;}`);
    if (config.uniformCornersEnabled) rules.push(`[${UNIFORM_CORNER_ATTR}="1"]{border-radius:${config.uniformCornerRadius}px!important;}`);
    if (config.removeShadows) {
      root?.setAttribute("data-fontyar-remove-shadows", "1");
      rules.push(`html[data-fontyar-remove-shadows="1"] body,html[data-fontyar-remove-shadows="1"] body *{box-shadow:none!important;text-shadow:none!important;}`);
      rules.push(`[${SHADOW_OUTLINE_ATTR}="1"]{outline:1px solid color-mix(in srgb,currentColor 17%,transparent)!important;outline-offset:-1px!important;}`);
    } else clearShadowOutlines();
    if (config.smoothScrollEnabled) {
      root?.setAttribute("data-fontyar-smooth-scroll", "1");
    }
    style.textContent = rules.join("\n");
    if (!style.isConnected) (document.head || document.documentElement).append(style);
    if (config.softMotionEnabled) scheduleSoftMotionActivation(document.documentElement || document);
    if (config.softCorners || config.uniformCornersEnabled || config.removeShadows || config.liquidGlassMode || config.linearStyleMode) queueDecorNode(document.documentElement || document);
    syncAllShadowStyles();
  }

  function primeSoftMotionStates(root, limit=420) {
    if (!state.config.softMotionEnabled || !root) return;
    const selector = "[aria-expanded],[aria-pressed],[aria-selected],[aria-checked],[aria-current],[aria-hidden],[data-state],[open]";
    let scanned=0;
    const visit = el => { if (el instanceof HTMLElement && el.matches?.(selector)) rememberSoftState(el); };
    if (root.nodeType === Node.ELEMENT_NODE) visit(root);
    let walker; try { walker=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT); } catch { return; }
    let node; while(scanned++<limit && (node=walker.nextNode())) visit(node);
  }

  function runSoftMotionActivation(root) {
    if (!state.config.softMotionEnabled || !root) return;
    markSoftMotion(root);
    processListMotion(root);
    processShimmer(root);
    processScrollFade(root);
    primeSoftMotionStates(root);
  }

  function scheduleSoftMotionActivation(root=document.documentElement || document) {
    if (!state.config.softMotionEnabled || !root) return;
    runSoftMotionActivation(root);
    if (state.motionActivationFrame) cancelAnimationFrame(state.motionActivationFrame);
    clearTimeout(state.motionActivationTimer);
    state.motionActivationFrame=requestAnimationFrame(()=>{
      state.motionActivationFrame=0;
      if(!state.config.softMotionEnabled)return;
      runSoftMotionActivation(document.documentElement || document);
      discoverShadowRoots(document.documentElement || document,420);
      syncAllShadowStyles();
    });
    const idle=()=>{state.motionActivationTimer=0;if(state.config.softMotionEnabled)runSoftMotionActivation(document.documentElement || document);};
    if(typeof requestIdleCallback==="function") requestIdleCallback(idle,{timeout:260});
    else state.motionActivationTimer=setTimeout(idle,90);
  }

  function markSoftMotion(root) {
    if (!state.config.softMotionEnabled || !root) return;
    // Do not walk every button/link in large SPAs. Base transitions are delegated by one root CSS
    // rule; JavaScript only discovers actual floating surfaces that need pop/stagger/safe-polygon.
    discoverSoftFloatingSurfaces(root, false);
    const surface = root.nodeType === Node.ELEMENT_NODE ? root.closest?.(`${SOFT_FLOATING_SELECTOR},[${SOFT_SURFACE_ATTR}="1"]`) : null;
    if (surface instanceof HTMLElement) enhanceSoftSurface(surface, false);
  }

  function markSoftVisualDescendants(control) {
    // Kept as a compatibility no-op. The previous implementation marked up to 14 descendants per
    // control and caused substantial style/DOM churn on infinite feeds such as X.
    return control instanceof HTMLElement ? control : null;
  }

  function isLayoutCriticalMotionElement(el) {
    if (!(el instanceof HTMLElement)) return true;
    if (el.matches("html,body,main,article,section,header,footer,nav,aside,[data-testid='cellInnerDiv'],[data-testid='ScrollSnap-List'],[data-testid='ScrollSnap-SwipeableList']")) return true;
    const cs = getComputedStyle(el);
    if (["contents","table","table-row","table-cell"].includes(cs.display)) return true;
    if (["fixed","sticky"].includes(cs.position) && !isSoftFloatingSurface(el)) return true;
    if (cs.transform && cs.transform !== "none") return true;
    const translate = String(cs.translate || "none");
    const scale = String(cs.scale || "none");
    if ((translate && translate !== "none") || (scale && scale !== "none")) return true;
    const rect = el.getBoundingClientRect();
    if (!isSoftFloatingSurface(el) && (rect.width > innerWidth * .82 || rect.height > Math.max(180, innerHeight * .34))) return true;
    return false;
  }

  function markSoftTransformTarget(control) {
    // Individual `scale`/`translate` properties are animated on the interactive node itself, so we
    // no longer need to scan wrappers or query layout just to find an animation target.
    if (!(control instanceof HTMLElement) || isProtected(control) || isLayoutCriticalMotionElement(control)) return null;
    return control;
  }

  function motionAnimationTarget(el) {
    if (!(el instanceof HTMLElement) || isProtected(el)) return null;
    if (el.matches("html,body,main,article,section,[data-testid='cellInnerDiv']")) return null;
    return el;
  }

  function discoverSoftFloatingSurfaces(root, allowHeuristic=false) {
    if (!root || !state.config.softMotionEnabled) return;
    const candidates = [];
    if (root.nodeType === Node.ELEMENT_NODE && root.matches?.(SOFT_FLOATING_SELECTOR)) candidates.push(root);
    // Only semantic floating surfaces are scanned. The old heuristic inspected up to 120 generic
    // divs with computed-style/layout reads for every mutation burst, which was costly on X.
    root.querySelectorAll?.(SOFT_FLOATING_SELECTOR).forEach(el=>{ if (candidates.length < 18) candidates.push(el); });
    for (const el of candidates) if (el instanceof HTMLElement && isSoftFloatingSurface(el)) enhanceSoftSurface(el, false);
  }

  function isLikelyFloatingSurface(el) {
    if (!(el instanceof HTMLElement) || isProtected(el) || isUserContentRegion(el)) return false;
    const rect = el.getBoundingClientRect();
    if (rect.width < 90 || rect.height < 32 || rect.width > innerWidth * .96 || rect.height > innerHeight * .96) return false;
    const cs = getComputedStyle(el);
    if (!["fixed","absolute"].includes(cs.position) || cs.display === "none" || cs.visibility === "hidden" || Number(cs.opacity || 1) < .02) return false;
    const z = Number.parseInt(cs.zIndex,10);
    if (Number.isFinite(z) && z < 1) return false;
    const bg = String(cs.backgroundColor || "").replace(/\s+/g, "").toLowerCase();
    const hasBackground = !!bg && bg !== "transparent" && bg !== "rgba(0,0,0,0)";
    const painted = cs.boxShadow !== "none" || cs.backdropFilter !== "none" || cs.webkitBackdropFilter !== "none" || hasBackground;
    if (!painted) return false;
    return !!el.querySelector?.(SOFT_INTERACTIVE_SELECTOR);
  }

  function clearSoftMotion() {
    cancelSafeHover(false);
    if(state.motionActivationFrame)cancelAnimationFrame(state.motionActivationFrame);state.motionActivationFrame=0;
    clearTimeout(state.motionActivationTimer);state.motionActivationTimer=0;
    for (const el of state.softMotionElements) if (el?.isConnected) { el.removeAttribute(SOFT_MOTION_ATTR); el.removeAttribute(SOFT_STATE_ATTR); }
    for (const el of state.softSurfaceElements) if (el?.isConnected) { el.removeAttribute(SOFT_SURFACE_ATTR); el.style.removeProperty("--fontyar-origin-x"); el.style.removeProperty("--fontyar-origin-y"); }
    for (const el of state.softStaggerElements) if (el?.isConnected) { el.removeAttribute(SOFT_STAGGER_ATTR); el.style.removeProperty("--fontyar-stagger-i"); }
    for (const el of state.softVisualElements) if (el?.isConnected) el.removeAttribute(SOFT_VISUAL_ATTR);
    clearShimmer();
    clearScrollFades();
    for(const el of state.tooltipDelayedElements)if(el?.isConnected)el.removeAttribute(TOOLTIP_DELAY_ATTR);state.tooltipDelayedElements.clear();
    for (const el of state.softTransformElements) if (el?.isConnected) el.removeAttribute(SOFT_TRANSFORM_ATTR);
    state.softMotionElements.clear();
    state.softSurfaceElements.clear();
    state.softStaggerElements.clear();
    state.softVisualElements.clear();
    state.softTransformElements.clear();
    document.querySelectorAll?.(`[${SOFT_MOTION_ATTR}],[${SOFT_VISUAL_ATTR}],[${SOFT_TRANSFORM_ATTR}],[${SOFT_SURFACE_ATTR}],[${SOFT_STAGGER_ATTR}],[${SOFT_STATE_ATTR}],[${TOOLTIP_DELAY_ATTR}],[${SCROLL_FADE_ATTR}]`).forEach(el=>{
      el.removeAttribute(SOFT_MOTION_ATTR); el.removeAttribute(SOFT_VISUAL_ATTR); el.removeAttribute(SOFT_TRANSFORM_ATTR); el.removeAttribute(SOFT_SURFACE_ATTR); el.removeAttribute(SOFT_STAGGER_ATTR); el.removeAttribute(SOFT_STATE_ATTR); el.removeAttribute(TOOLTIP_DELAY_ATTR); el.removeAttribute(SCROLL_FADE_ATTR);
      el.style?.removeProperty?.("--fontyar-origin-x"); el.style?.removeProperty?.("--fontyar-origin-y"); el.style?.removeProperty?.("--fontyar-stagger-i");
    });
  }

  let reducedMotionQuery = null;
  function prefersReducedMotion() {
    try { if(!reducedMotionQuery) reducedMotionQuery=matchMedia("(prefers-reduced-motion: reduce)"); return !!reducedMotionQuery.matches; } catch { return false; }
  }

  function isSoftFloatingSurface(el) {
    if (!(el instanceof HTMLElement) || isProtected(el)) return false;
    // Semantic-only detection avoids computed-style/layout probes on ordinary controls whose ARIA
    // state changes frequently (Like/Repost/Reply counters on X).
    const semantic = el.matches?.(SOFT_FLOATING_SELECTOR) || el.hasAttribute(SOFT_SURFACE_ATTR);
    if (!semantic) return false;
    const rect = el.getBoundingClientRect();
    if (rect.width < 8 || rect.height < 8) return false;
    const cs = getComputedStyle(el);
    return cs.display !== "none" && cs.visibility !== "hidden" && Number(cs.opacity || 1) > 0.01;
  }

  function rememberSoftState(el) {
    if (!(el instanceof HTMLElement)) return;
    state.softStateValues.set(el, softStateSignature(el));
  }

  function softStateSignature(el) {
    return [el.getAttribute("aria-expanded"), el.getAttribute("aria-pressed"), el.getAttribute("aria-selected"), el.getAttribute("aria-checked"), el.getAttribute("aria-current"), el.getAttribute("aria-label"), el.getAttribute("data-state"), el.hasAttribute("open"), el.getAttribute("aria-hidden")].join("|");
  }

  function animateStateMorph(el) {
    if (!state.config.motionMorphEnabled) return;
    if (!(el instanceof HTMLElement) || prefersReducedMotion()) return;
    const target = motionAnimationTarget(el);
    if (!(target instanceof HTMLElement) || typeof target.animate !== "function") { animateUiCrossfade(el); return; }
    try {
      target.getAnimations?.().filter(a => a.id === "fontyar-state-morph").forEach(a => a.cancel());
      const a = target.animate([
        { opacity:1, offset:0 },
        { opacity:.82, offset:.45 },
        { opacity:1, offset:1 }
      ], { duration:135, easing:"cubic-bezier(.2,.8,.2,1)" });
      a.id = "fontyar-state-morph";
    } catch { animateUiCrossfade(el); }
  }

  function handleSoftAttributeMutation(el, name) {
    if (!state.config.softMotionEnabled || !(el instanceof HTMLElement)) return;
    if (["aria-expanded","aria-pressed","aria-selected","aria-checked","aria-current","aria-label","data-state","open","aria-hidden"].includes(name)) {
      const before = state.softStateValues.get(el);
      const after = softStateSignature(el);
      state.softStateValues.set(el, after);
      if (before !== after) animateStateMorph(el);
      if (isSoftFloatingSurface(el)) enhanceSoftSurface(el, true);
      const controlled = el.getAttribute("aria-controls");
      if (controlled) {
        const target = document.getElementById(controlled);
        if (isSoftFloatingSurface(target)) enhanceSoftSurface(target, true);
      }
    }
    if (["aria-label","title","placeholder"].includes(name)) animateUiCrossfade(el);
  }

  function handleSoftSliderInput(event) {
    if(!state.config.softMotionEnabled||!state.config.motionSliderMorphEnabled||prefersReducedMotion())return;
    const el=event.target instanceof HTMLElement?event.target:null;
    if(!(el instanceof HTMLElement)||!el.matches?.('input[type="range"],[role="slider"]')||typeof el.animate!=="function")return;
    let origin="50% 50%";
    if(el instanceof HTMLInputElement){const min=Number(el.min||0),max=Number(el.max||100),value=Number(el.value||0),pct=max>min?Math.max(0,Math.min(100,(value-min)/(max-min)*100)):50;origin=`${pct}% 50%`;}
    try{const a=el.animate([{scale:".985 1",opacity:.86},{scale:"1 1",opacity:1}],{duration:115,easing:"cubic-bezier(.2,.8,.2,1)"});a.id="persianyar-slider-morph";el.style.transformOrigin=origin;}catch{}
  }

  function handleSoftPointerDown(event) {
    if (!state.config.softMotionEnabled || event.button > 0) return;
    const target = event.target instanceof Element ? event.target.closest?.(SOFT_INTERACTIVE_SELECTOR) : null;
    if (!(target instanceof HTMLElement) || isProtected(target) || target.matches(":disabled,[aria-disabled='true']")) return;
    state.motionLastActivation = { x:event.clientX, y:event.clientY, time:performance.now(), target };
    animateRubberBand(target);
  }

  function handleSoftKeyDown(event) {
    if (!state.config.softMotionEnabled || !["Enter"," "].includes(event.key)) return;
    const target = event.target instanceof Element ? event.target.closest?.(SOFT_INTERACTIVE_SELECTOR) : null;
    if (!(target instanceof HTMLElement) || isProtected(target) || target.matches(":disabled,[aria-disabled='true']")) return;
    const rect = target.getBoundingClientRect();
    state.motionLastActivation = { x:rect.left + rect.width/2, y:rect.top + rect.height/2, time:performance.now(), target };
    animateRubberBand(target);
  }

  function animateRubberBand(el) {
    if (!state.config.motionRubberEnabled || !(el instanceof HTMLElement) || prefersReducedMotion()) return;
    const target = motionAnimationTarget(el);
    if (!(target instanceof HTMLElement) || typeof target.animate !== "function") return;
    try {
      target.getAnimations?.().filter(a => a.id === "fontyar-rubber").forEach(a => a.cancel());
      const canScale=getComputedStyle(target).transform==="none"&&!isLayoutCriticalMotionElement(target);
      const frames=canScale?[{scale:"1",opacity:1},{scale:".965",opacity:.9},{scale:"1.018",opacity:.98},{scale:"1",opacity:1}]:[{opacity:1},{opacity:.76},{opacity:.94},{opacity:1}];
      const a = target.animate(frames, { duration:175, easing:"cubic-bezier(.2,.82,.2,1)" });
      a.id = "fontyar-rubber";
    } catch {}
  }

  function animateUiCrossfade(el) {
    if (!state.config.motionCrossfadeEnabled || !(el instanceof HTMLElement) || prefersReducedMotion() || typeof el.animate !== "function") return;
    const interactive = el.closest?.("button,[role='button'],[role='menuitem'],[role='tab'],[role='option'],[role='switch'],[role='checkbox'],label,summary");
    if (!interactive && isUserContentRegion(el)) return;
    const target = interactive || el;
    const now = performance.now();
    const last = state.softCrossfadeTimes.get(target) || 0;
    // Counter/aria/text mutations can arrive several times in one React commit. Animate once.
    if (now - last < 110) return;
    state.softCrossfadeTimes.set(target, now);
    try {
      target.getAnimations?.().filter(a => a.id === "fontyar-crossfade").forEach(a => a.cancel());
      const a = target.animate([{opacity:.78},{opacity:1}], {duration:120,easing:"cubic-bezier(.2,.8,.2,1)"});
      a.id = "fontyar-crossfade";
      if(state.config.motionIconCrossfadeEnabled){[...target.querySelectorAll?.(":scope > svg,:scope > img,:scope > [role='img']")||[]].slice(0,3).forEach(icon=>{try{const ia=icon.animate([{opacity:.28,scale:".9"},{opacity:1,scale:"1"}],{duration:135,easing:"ease-out"});ia.id="persianyar-icon-crossfade"}catch{}})}
    } catch {}
  }

  function enhanceSoftSurface(surface, forcePop) {
    if (!(surface instanceof HTMLElement) || !isSoftFloatingSurface(surface)) return;
    const first = !state.softSurfaceElements.has(surface);
    if (first) {
      surface.setAttribute(SOFT_SURFACE_ATTR,"1");
      state.softSurfaceElements.add(surface);
      setSurfaceOrigin(surface);
      markStaggerItems(surface, true);
      applyTooltipIntentDelay(surface);
      processScrollFade(surface);
      animateSharedElement(surface);
      animateOriginAwarePop(surface);
      // Record the settled geometry after the first paint, rather than forcing extra layout reads
      // in the mutation callback that inserted the surface.
      requestAnimationFrame(() => { if (surface.isConnected) rememberSurfaceLayout(surface); });
      return;
    }
    if (forcePop) {
      setSurfaceOrigin(surface);
      animateSharedLayout(surface);
      applyTooltipIntentDelay(surface);
      processScrollFade(surface);
      animateSharedElement(surface);
      animateOriginAwarePop(surface);
    }
  }

  function setSurfaceOrigin(surface) {
    const rect = surface.getBoundingClientRect();
    const activation = state.motionLastActivation;
    let x = rect.width/2, y = Math.min(18, rect.height/2);
    if (activation && performance.now() - activation.time < 900) {
      x = Math.max(0, Math.min(rect.width, activation.x - rect.left));
      y = Math.max(0, Math.min(rect.height, activation.y - rect.top));
    } else {
      const trigger = findTriggerForSurface(surface);
      if (trigger) {
        const tr = trigger.getBoundingClientRect();
        x = Math.max(0, Math.min(rect.width, tr.left + tr.width/2 - rect.left));
        y = Math.max(0, Math.min(rect.height, tr.top + tr.height/2 - rect.top));
      }
    }
    surface.style.setProperty("--fontyar-origin-x", `${x}px`);
    surface.style.setProperty("--fontyar-origin-y", `${y}px`);
  }

  function animateOriginAwarePop(surface) {
    if (!state.config.motionPopEnabled || !(surface instanceof HTMLElement) || prefersReducedMotion() || typeof surface.animate !== "function") return;
    try {
      surface.getAnimations?.().filter(a => a.id === "fontyar-origin-pop").forEach(a => a.cancel());
      const canScale=getComputedStyle(surface).transform==="none";
      const frames=canScale?[{opacity:.34,scale:".965"},{opacity:1,scale:"1"}]:[{opacity:.45},{opacity:1}];
      const a=surface.animate(frames,{duration:155,easing:"cubic-bezier(.16,1,.3,1)"});a.id="fontyar-origin-pop";
    } catch { try { const a=surface.animate([{opacity:.72},{opacity:1}],{duration:130,easing:"ease-out"});a.id="fontyar-origin-pop"; } catch {} }
  }

  function getSurfaceItems(surface) {
    const all = [...surface.querySelectorAll?.(SOFT_STAGGER_ITEM_SELECTOR) || []]
      .filter(el => el instanceof HTMLElement && !isProtected(el) && !isUserContentRegion(el));
    // Eight items are enough to communicate hierarchy without creating a layer/animation storm.
    return all.slice(0, 8);
  }

  function markStaggerItems(surface, animate) {
    const items = getSurfaceItems(surface);
    items.forEach((el, i) => {
      el.setAttribute(SOFT_STAGGER_ATTR,"1");
      state.softStaggerElements.add(el);
      if (animate && state.config.motionStaggerEnabled && !prefersReducedMotion() && typeof el.animate === "function") {
        try {
          const a = el.animate([{ opacity:.35 }, { opacity:1 }], {
            duration:130,
            delay:i*9,
            easing:"cubic-bezier(.2,.8,.2,1)",
            fill:"backwards"
          });
          a.id = "fontyar-stagger";
        } catch {}
      }
    });
  }

  function animateSharedLayout(surface) {
    const items=getSurfaceItems(surface).slice(0,8),previous=items.map(el=>[el,state.softLayoutRects.get(el)]),current=items.map(el=>[el,el.getBoundingClientRect()]);
    if(state.config.motionSharedLayoutEnabled&&!prefersReducedMotion()){
      for(let i=0;i<current.length;i++){const [el,now]=current[i],before=previous[i]?.[1];if(!before||typeof el.animate!=="function"||getComputedStyle(el).transform!=="none")continue;const dx=before.left-now.left,dy=before.top-now.top;if(Math.hypot(dx,dy)<2||Math.abs(dx)>160||Math.abs(dy)>160)continue;try{const a=el.animate([{transform:`translate(${dx}px,${dy}px)`,opacity:.88},{transform:"translate(0,0)",opacity:1}],{duration:165,easing:"cubic-bezier(.2,.8,.2,1)"});a.id="fontyar-shared-layout"}catch{}}
    }
    for(const [el,rect] of current)state.softLayoutRects.set(el,rect);
  }

  function rememberSurfaceLayout(surface) {
    for (const el of getSurfaceItems(surface)) state.softLayoutRects.set(el, el.getBoundingClientRect());
  }

  function tooltipTrigger(surface){
    if(!(surface instanceof HTMLElement))return null;
    if(surface.id){try{const id=globalThis.CSS?.escape?CSS.escape(surface.id):surface.id.replace(/[^a-z0-9_-]/gi,"\\$&");const t=document.querySelector(`[aria-describedby~="${id}"]`);if(t instanceof HTMLElement)return t;}catch{}}
    return findTriggerForSurface(surface);
  }
  function applyTooltipIntentDelay(surface){
    if(!state.config.motionTooltipDelayEnabled||!(surface instanceof HTMLElement)||surface.getAttribute("role")!=="tooltip"||prefersReducedMotion())return;
    const trigger=tooltipTrigger(surface);if(!(trigger instanceof HTMLElement))return;
    const group=trigger.closest('[role="toolbar"],[role="group"],[role="menubar"],nav,[class*="toolbar" i],[class*="actions" i]')||trigger.parentElement||trigger;
    const fast=(state.tooltipWarmGroups.get(group)||0)>performance.now();if(fast)return;
    const old=state.tooltipTimers.get(surface);if(old)clearTimeout(old);
    surface.setAttribute(TOOLTIP_DELAY_ATTR,"waiting");state.tooltipDelayedElements.add(surface);
    const timer=setTimeout(()=>{if(!surface.isConnected)return;surface.removeAttribute(TOOLTIP_DELAY_ATTR);state.tooltipWarmGroups.set(group,performance.now()+2200);state.tooltipTimers.delete(surface);try{surface.animate([{opacity:.2},{opacity:1}],{duration:100,easing:"ease-out"})}catch{}},340);
    state.tooltipTimers.set(surface,timer);
  }
  function animateSharedElement(surface){
    if(!state.config.motionSharedElementEnabled||prefersReducedMotion()||!(surface instanceof HTMLElement))return;
    const activation=state.motionLastActivation;if(!activation||performance.now()-activation.time>950)return;
    const source=activation.target?.matches?.('img,picture,svg')?activation.target:activation.target?.querySelector?.('img,picture img,svg');
    const dest=surface.querySelector?.('img,picture img,svg');if(!(source instanceof Element)||!(dest instanceof HTMLElement)&&!(dest instanceof SVGElement))return;if(typeof dest.animate!=="function")return;
    const a=source.getBoundingClientRect(),b=dest.getBoundingClientRect();if(a.width<12||a.height<12||b.width<12||b.height<12||Math.hypot(a.left-b.left,a.top-b.top)>1500)return;
    const sx=Math.max(.25,Math.min(4,a.width/b.width)),sy=Math.max(.25,Math.min(4,a.height/b.height)),dx=a.left-b.left,dy=a.top-b.top;
    try{const anim=dest.animate([{transform:`translate(${dx}px,${dy}px) scale(${sx},${sy})`,opacity:.58},{transform:"none",opacity:1}],{duration:210,easing:"cubic-bezier(.2,.8,.2,1)"});anim.id="persianyar-shared-element"}catch{}
  }

  function findTriggerForSurface(surface) {
    if (!(surface instanceof HTMLElement)) return null;
    if (surface.id) {
      try {
        const trigger = document.querySelector(`[aria-controls="${globalThis.CSS?.escape ? CSS.escape(surface.id) : surface.id.replace(/[^a-z0-9_-]/gi,"\\$&")}"]`);
        if (trigger instanceof HTMLElement) return trigger;
      } catch {}
    }
    const activation = state.motionLastActivation?.target;
    if (activation instanceof HTMLElement && performance.now() - state.motionLastActivation.time < 1200) return activation;
    return null;
  }

  function findFloatingSurface(trigger) {
    if (!(trigger instanceof HTMLElement)) return null;
    const id = trigger.getAttribute("aria-controls");
    if (id) {
      const direct = document.getElementById(id);
      if (isSoftFloatingSurface(direct)) return direct;
    }
    const tr = trigger.getBoundingClientRect();
    let best = null, bestScore = Infinity;
    document.querySelectorAll?.(`${SOFT_FLOATING_SELECTOR},[${SOFT_SURFACE_ATTR}="1"]`).forEach(el => {
      if (!isSoftFloatingSurface(el) || el === trigger || trigger.contains(el)) return;
      const cs = getComputedStyle(el);
      const explicitFloating = el.matches?.("[popover]:popover-open,dialog[open],[data-state='open'],[aria-modal='true'],[role='tooltip']");
      if (!explicitFloating && !["absolute","fixed"].includes(cs.position)) return;
      const r = el.getBoundingClientRect();
      const dx = Math.max(0, Math.max(tr.left-r.right, r.left-tr.right));
      const dy = Math.max(0, Math.max(tr.top-r.bottom, r.top-tr.bottom));
      const score = Math.hypot(dx,dy);
      if (score < bestScore && score < 180) { best = el; bestScore = score; }
    });
    return best;
  }

  function handleSafeHoverLeave(event) {
    if (!state.config.softMotionEnabled || !state.config.motionSafePolygonEnabled || !event.isTrusted) return;
    const target = event.target instanceof Element ? event.target.closest?.("[aria-haspopup]:not([aria-haspopup='false']),[aria-controls][aria-expanded='true']") : null;
    if (!(target instanceof HTMLElement) || isProtected(target)) return;
    const surface = findFloatingSurface(target);
    if (!surface) return;
    const related = event.relatedTarget;
    if (related instanceof Node && (target.contains(related) || surface.contains(related))) return;
    // Suppress the eager leave long enough to evaluate pointer intent toward the open surface.
    try { event.stopImmediatePropagation(); event.stopPropagation(); } catch {}
    startSafeHover(target, surface, event.clientX, event.clientY, event.type);
  }

  function startSafeHover(trigger, surface, x, y, eventType) {
    cancelSafeHover(false);
    addEventListener("pointermove", handleSafeHoverMove, {capture:true,passive:true});
    const data = { trigger, surface, x, y, eventType, started:performance.now(), timer:null };
    data.timer = setTimeout(() => cancelSafeHover(true), 650);
    state.safeHover = data;
  }

  function handleSafeHoverMove(event) {
    if (!state.config.motionSafePolygonEnabled) return cancelSafeHover(false);
    const sh = state.safeHover;
    if (!sh || !state.config.softMotionEnabled) return;
    if (!sh.trigger?.isConnected || !sh.surface?.isConnected || !isSoftFloatingSurface(sh.surface)) return cancelSafeHover(false);
    const point = {x:event.clientX,y:event.clientY};
    if (pointInRect(point, sh.surface.getBoundingClientRect(), 5)) { cancelSafeHover(false); return; }
    if (pointInRect(point, sh.trigger.getBoundingClientRect(), 3) || pointInSafeCorridor(point, sh)) return;
    cancelSafeHover(true, event.target);
  }

  function pointInRect(p, r, pad=0) { return p.x >= r.left-pad && p.x <= r.right+pad && p.y >= r.top-pad && p.y <= r.bottom+pad; }

  function pointInSafeCorridor(p, sh) {
    const tr = sh.trigger.getBoundingClientRect(), sr = sh.surface.getBoundingClientRect();
    const start = {x:sh.x,y:sh.y}, b = 8;
    let a, c;
    if (sr.left >= tr.right - 2) { a={x:sr.left-b,y:sr.top-b}; c={x:sr.left-b,y:sr.bottom+b}; }
    else if (sr.right <= tr.left + 2) { a={x:sr.right+b,y:sr.top-b}; c={x:sr.right+b,y:sr.bottom+b}; }
    else if (sr.top >= tr.bottom - 2) { a={x:sr.left-b,y:sr.top-b}; c={x:sr.right+b,y:sr.top-b}; }
    else if (sr.bottom <= tr.top + 2) { a={x:sr.left-b,y:sr.bottom+b}; c={x:sr.right+b,y:sr.bottom+b}; }
    else return pointInRect(p, {left:Math.min(tr.left,sr.left),right:Math.max(tr.right,sr.right),top:Math.min(tr.top,sr.top),bottom:Math.max(tr.bottom,sr.bottom)}, b);
    return pointInTriangle(p,start,a,c);
  }

  function pointInTriangle(p,a,b,c) {
    const area = (p1,p2,p3) => (p1.x*(p2.y-p3.y)+p2.x*(p3.y-p1.y)+p3.x*(p1.y-p2.y))/2;
    const A=Math.abs(area(a,b,c));
    const A1=Math.abs(area(p,b,c)), A2=Math.abs(area(a,p,c)), A3=Math.abs(area(a,b,p));
    return Math.abs(A-(A1+A2+A3)) < 1.25;
  }

  function cancelSafeHover(replay, relatedTarget=null) {
    removeEventListener("pointermove", handleSafeHoverMove, true);
    const sh = state.safeHover;
    if (!sh) return;
    clearTimeout(sh.timer); state.safeHover = null;
    if (!replay || !(sh.trigger instanceof HTMLElement) || !sh.trigger.isConnected) return;
    const related = relatedTarget instanceof EventTarget ? relatedTarget : document.elementFromPoint(sh.x, sh.y);
    try {
      sh.trigger.dispatchEvent(new PointerEvent("pointerout", {bubbles:true,composed:true,relatedTarget:related,pointerType:"mouse"}));
      sh.trigger.dispatchEvent(new MouseEvent("mouseout", {bubbles:true,composed:true,relatedTarget:related}));
    } catch {}
  }


  function processScrollFade(root){
    if(!state.config.softMotionEnabled||!state.config.motionScrollFadeEnabled||!root)return;
    const nodes=[];if(root.nodeType===Node.ELEMENT_NODE&&root.matches?.(`${SOFT_LIST_SELECTOR},[${SOFT_SURFACE_ATTR}="1"]`))nodes.push(root);root.querySelectorAll?.(`${SOFT_LIST_SELECTOR},[${SOFT_SURFACE_ATTR}="1"]`).forEach(el=>{if(nodes.length<20)nodes.push(el)});
    for(const el of nodes)setupScrollFade(el);
  }
  function setupScrollFade(el){
    if(!(el instanceof HTMLElement)||isUserContentRegion(el)||isProtected(el))return;const cs=getComputedStyle(el);if(!/(auto|scroll)/.test(cs.overflowY))return;if(el.scrollHeight<=el.clientHeight+10){el.removeAttribute(SCROLL_FADE_ATTR);return}
    state.scrollFadeElements.add(el);updateScrollFade(el);if(!state.scrollFadeListeners.has(el)){const fn=()=>updateScrollFade(el);el.addEventListener("scroll",fn,{passive:true});state.scrollFadeListeners.set(el,fn)}
  }
  function updateScrollFade(el){if(!(el instanceof HTMLElement)||!el.isConnected)return;const max=el.scrollHeight-el.clientHeight;if(max<8){el.removeAttribute(SCROLL_FADE_ATTR);return}const start=el.scrollTop>4,end=el.scrollTop<max-4;el.setAttribute(SCROLL_FADE_ATTR,start&&end?"both":start?"start":end?"end":"");}
  function clearScrollFades(){for(const el of state.scrollFadeElements){if(!(el instanceof HTMLElement))continue;el.removeAttribute(SCROLL_FADE_ATTR);const fn=state.scrollFadeListeners.get(el);if(fn)el.removeEventListener("scroll",fn)}state.scrollFadeElements.clear();state.scrollFadeListeners=new WeakMap();}

  function processListMotion(root){
    if(!state.config.softMotionEnabled||!root)return;
    if(state.config.motionScrollFadeEnabled)processScrollFade(root);
    if(!state.config.motionListEnabled||prefersReducedMotion())return;
    const lists=[];if(root.nodeType===Node.ELEMENT_NODE&&root.matches?.(SOFT_LIST_SELECTOR))lists.push(root);root.querySelectorAll?.(SOFT_LIST_SELECTOR).forEach(el=>{if(lists.length<16)lists.push(el)});
    for(const list of lists){if(isUserContentRegion(list)||isProtected(list))continue;let items=[];try{items=[...list.querySelectorAll(SOFT_LIST_ITEM_SELECTOR)].slice(0,8)}catch{}for(const item of items){if(!(item instanceof HTMLElement)||state.listMotionSeen.has(item)||isUserContentRegion(item))continue;state.listMotionSeen.add(item);item.setAttribute(LIST_MOTION_ATTR,"1");try{const a=item.animate([{opacity:.32},{opacity:1}],{duration:125,easing:"cubic-bezier(.2,.8,.2,1)"});a.id="persianyar-list-in"}catch{}}}
  }
  function processShimmer(root){
    if(!state.config.softMotionEnabled||!root)return;const nodes=[];if(root.nodeType===Node.ELEMENT_NODE&&root.matches?.(SHIMMER_SELECTOR))nodes.push(root);root.querySelectorAll?.(SHIMMER_SELECTOR).forEach(el=>{if(nodes.length<20)nodes.push(el)});for(const el of nodes){if(!(el instanceof HTMLElement)||isUserContentRegion(el)||isProtected(el))continue;if(state.config.motionShimmerEnabled){el.setAttribute(SHIMMER_ATTR,"1");state.shimmerElements.add(el)}else el.removeAttribute(SHIMMER_ATTR)}
  }
  function clearShimmer(){for(const el of state.shimmerElements)if(el?.isConnected)el.removeAttribute(SHIMMER_ATTR);state.shimmerElements.clear()}
  function markShadowOutlines(root){
    if(!state.config.removeShadows||!root)return;const nodes=[];if(root.nodeType===Node.ELEMENT_NODE)nodes.push(root);root.querySelectorAll?.("button,input,select,textarea,[role='button'],[role='menu'],[role='dialog'],[role='listbox'],[class*='card' i],[class*='panel' i]").forEach(el=>{if(nodes.length<180)nodes.push(el)});
    for(const el of nodes){if(!(el instanceof HTMLElement)||isProtected(el)||el.hasAttribute(SHADOW_OUTLINE_ATTR))continue;const cs=getComputedStyle(el);const semantic=el.matches("button,input,select,textarea,[role=\'button\'],[role=\'menu\'],[role=\'dialog\'],[role=\'listbox\'],[class*=\'card\' i],[class*=\'panel\' i]");if((!cs.boxShadow||cs.boxShadow==="none")&&!semantic)continue;const border=[cs.borderTopWidth,cs.borderRightWidth,cs.borderBottomWidth,cs.borderLeftWidth].some(v=>(parseFloat(v)||0)>.2);if(border)continue;el.setAttribute(SHADOW_OUTLINE_ATTR,"1");state.shadowOutlineElements.add(el)}
  }
  function clearShadowOutlines(){for(const el of state.shadowOutlineElements)if(el?.isConnected)el.removeAttribute(SHADOW_OUTLINE_ATTR);state.shadowOutlineElements.clear();document.querySelectorAll?.(`[${SHADOW_OUTLINE_ATTR}]`).forEach(el=>el.removeAttribute(SHADOW_OUTLINE_ATTR))}
  function getSmartDarkCssEngine() {
    const engine=globalThis.__PERSIANYAR_SMART_DARK_CSS_ENGINE__;
    return engine&&engine.cssFirst&&typeof engine.enable==="function"?engine:null;
  }

  function getSmartDarkReaderCore() {
    const core=globalThis.__PERSIANYAR_DARKREADER_CORE__;
    return core && typeof core.modifyBackground==="function" && typeof core.modifyForeground==="function" ? core : null;
  }

  function getSmartDarkReaderTheme() {
    const core=getSmartDarkReaderCore();
    if(!core)return null;
    const cfg=state.config||DEFAULT_CONFIG;
    const spec={mode:1,brightness:clampInt(cfg.smartDarkBrightness,70,130,100),contrast:clampInt(cfg.smartDarkContrast,70,140,100),grayscale:clampInt(cfg.smartDarkGrayscale,0,100,0),sepia:clampInt(cfg.smartDarkSepia,0,40,0),darkSchemeBackgroundColor:sanitizeSmartDarkColor(cfg.smartDarkBackgroundColor,DEFAULT_CONFIG.smartDarkBackgroundColor),darkSchemeTextColor:sanitizeSmartDarkColor(cfg.smartDarkTextColor,DEFAULT_CONFIG.smartDarkTextColor),lightSchemeBackgroundColor:"#dcdad7",lightSchemeTextColor:"#181a1b",accentColor:sanitizeSmartDarkColor(cfg.smartDarkAccentColor,DEFAULT_CONFIG.smartDarkAccentColor)};
    const sig=JSON.stringify(spec);
    if(state.smartDarkDarkReaderTheme&&state.smartDarkDarkReaderThemeSig===sig)return state.smartDarkDarkReaderTheme;
    const theme=core.normalizeTheme(spec);
    state.smartDarkDarkReaderTheme=theme;state.smartDarkDarkReaderThemeSig=sig;
    core.clearCaches?.();
    return theme;
  }

  function smartDarkReaderMap(rgb,type="background") {
    const core=getSmartDarkReaderCore(),theme=getSmartDarkReaderTheme();
    if(!core||!theme||!rgb)return null;
    try{
      if(type==="text")return core.modifyForeground(rgb,theme);
      if(type==="border")return core.modifyBorder(rgb,theme);
      return core.modifyBackground(rgb,theme);
    }catch{return null}
  }
  function smartDarkReaderCss(rgb,type="background"){
    const core=getSmartDarkReaderCore(),mapped=smartDarkReaderMap(rgb,type);
    return mapped&&core?.toCSS?core.toCSS(mapped):"";
  }
  function smartDarkReaderGradient(value){
    const core=getSmartDarkReaderCore(),theme=getSmartDarkReaderTheme();
    if(!core||!theme)return String(value||"");
    try{return core.modifyGradient(String(value||""),theme)}catch{return String(value||"")}
  }
  function smartDarkReaderShadow(value){
    const core=getSmartDarkReaderCore(),theme=getSmartDarkReaderTheme();
    if(!core||!theme)return String(value||"");
    try{return core.modifyShadow(String(value||""),theme)}catch{return String(value||"")}
  }
  function setSmartDarkVar(el,name,value){
    if(!(el instanceof HTMLElement)||!value)return;
    try{el.style.setProperty(name,value)}catch{}
  }
  function clearSmartDarkVars(el){
    if(!(el instanceof HTMLElement))return;
    for(const name of ["--persianyar-dr-bg","--persianyar-dr-fg","--persianyar-dr-border-top","--persianyar-dr-border-right","--persianyar-dr-border-bottom","--persianyar-dr-border-left","--persianyar-dr-bgimage","--persianyar-dr-shadow","--persianyar-dr-before-bg","--persianyar-dr-after-bg"]){try{el.style.removeProperty(name)}catch{}}
  }

  function smartDarkHue(rgb) {
    const r=rgb[0]/255,g=rgb[1]/255,b=rgb[2]/255,max=Math.max(r,g,b),min=Math.min(r,g,b),d=max-min;
    if (d < .045) return "neutral";
    let h=0;
    if(max===r)h=((g-b)/d)%6;else if(max===g)h=(b-r)/d+2;else h=(r-g)/d+4;
    h=(h*60+360)%360;
    if(h<20||h>=345)return "red";
    if(h<65)return "orange";
    if(h<165)return "green";
    if(h<205)return "cyan";
    if(h<265)return "blue";
    return "purple";
  }

  const SMART_DARK_TONE_RGB=Object.freeze({
    base:[17,21,26,1],raised:[23,28,34,1],soft:[29,36,44,1],high:[36,45,55,1],
    blue:[20,35,56,1],green:[21,39,31,1],warm:[43,33,26,1],purple:[35,28,46,1]
  });

  function smartDarkSurfaceTone(rgb) {
    const lum=colorLuminance(rgb), max=Math.max(rgb[0],rgb[1],rgb[2]), min=Math.min(rgb[0],rgb[1],rgb[2]), chroma=max-min;
    if (rgb[3] < .10 || lum <= .30) return "";
    // Preserve genuinely saturated product/brand surfaces. Light and pastel application chrome is
    // mapped to a neutral dark ramp instead of guessing a blue/green/purple tint from the source.
    // This prevents Smart Dark from introducing new color casts that were not part of the site UI.
    if (chroma > 105 && lum < .76) return "";
    if(lum>.975)return "raised";
    if(lum>.90)return "base";
    if(lum>.72)return "soft";
    if(lum>.50)return "soft";
    return "high";
  }

  function smartDarkTextTone(rgb) {
    if (!rgb || rgb[3] < .16) return "";
    const lum=colorLuminance(rgb), max=Math.max(rgb[0],rgb[1],rgb[2]), min=Math.min(rgb[0],rgb[1],rgb[2]), chroma=max-min;
    if (lum > .62) return "";
    if (chroma < 34) {
      if(lum<.11)return "primary";
      if(lum<.31)return "secondary";
      return "muted";
    }
    const hue=smartDarkHue(rgb);
    if(hue==="red")return "red";
    if(hue==="orange")return "orange";
    if(hue==="green")return "green";
    if(hue==="cyan")return "cyan";
    if(hue==="blue")return "blue";
    if(hue==="purple")return "purple";
    return "secondary";
  }

  function smartDarkContrastRatio(fg,bg) {
    if(!fg||!bg)return 21;
    const a=colorLuminance(fg),b=colorLuminance(bg),hi=Math.max(a,b),lo=Math.min(a,b);
    return (hi+.05)/(lo+.05);
  }

  function smartDarkForcedTextTone(rgb) {
    if(!rgb||rgb[3]<.16)return "";
    const chroma=smartDarkChroma(rgb);
    if(chroma<34)return colorLuminance(rgb)<.18?"primary":"secondary";
    const hue=smartDarkHue(rgb);
    return ["red","orange","green","cyan","blue","purple"].includes(hue)?hue:"secondary";
  }

  function isSmartDarkProtected(el) {
    try {
      return !el || !!el.closest("img,picture,video,canvas,iframe,object,embed,math,script,style,noscript,template,[class*='monaco-editor'],[class*='CodeMirror'],[class*='codemirror'],[data-persianyar-smart-dark-ignore]");
    } catch { return true; }
  }

  function hasVisibleDirectText(el) {
    if (!(el instanceof HTMLElement)) return false;
    if (el.matches("input,textarea,select,option,button,summary,[role='button'],[role='menuitem'],[role='option'],[role='tab'],[role='textbox']")) return true;
    for (const node of el.childNodes || []) if (node.nodeType===Node.TEXT_NODE && node.nodeValue?.trim()) return true;
    return false;
  }

  function saveDarkAttrs(el){
    return [DARK_SURFACE_ATTR,DARK_TEXT_ATTR,DARK_BORDER_ATTR,DARK_ICON_ATTR,DARK_BEFORE_ATTR,DARK_AFTER_ATTR,DARK_BGIMAGE_ATTR,DARK_SHADOW_ATTR,DARK_LOGO_IMAGE_ATTR,DARK_INTERACTIVE_ATTR,DARK_OVERLAY_ATTR].map(name=>[name,el.getAttribute?.(name)]);
  }
  function restoreDarkAttrs(el,saved){
    for(const [name,value] of saved){if(value==null)el.removeAttribute?.(name);else el.setAttribute?.(name,value)}
  }

  function shouldProbeSmartDarkPseudo(el, cs) {
    if (!(el instanceof HTMLElement)) return false;
    // Pseudo-element style resolution is surprisingly expensive on large dashboards because each
    // ::before/::after probe creates an additional computed-style lookup. Most nodes never use a
    // painted pseudo. Restrict probes to controls, positioned/decorated nodes and common UI/icon
    // surfaces; ordinary text wrappers stay on the single-style-read fast path.
    try {
      if (el.matches(SMART_DARK_INTERACTION_SELECTOR)) return true;
      if (cs && (cs.position !== "static" || (cs.backgroundImage && cs.backgroundImage !== "none") || (cs.maskImage && cs.maskImage !== "none") || (cs.webkitMaskImage && cs.webkitMaskImage !== "none"))) return true;
      const hint=`${el.id||""} ${typeof el.className==="string"?el.className:""} ${el.getAttribute("data-testid")||""}`.toLowerCase();
      return /(?:^|[\s_-])(icon|badge|chip|pill|button|btn|menu|nav|tab|toggle|switch|checkbox|radio|field|input|search|card|panel|dialog|modal|popover|tooltip|toast|alert|logo)(?:$|[\s_-])/.test(hint);
    } catch { return false; }
  }

  function captureSmartDarkOriginalPaint(el, refresh=false) {
    if (!(el instanceof Element)) return null;
    const cached=state.smartDarkOriginalPaint.get(el);
    if(cached&&!refresh)return cached;
    const saved=saveDarkAttrs(el);
    for(const [name,value] of saved)if(value!=null)el.removeAttribute(name);
    let record=null;
    try{
      const cs=getComputedStyle(el);
      record={
        bg:parseRgb(cs.backgroundColor),
        fg:parseRgb(cs.color),
        borders:[cs.borderTopColor,cs.borderRightColor,cs.borderBottomColor,cs.borderLeftColor].map(parseRgb),
        opacity:Number(cs.opacity||1),display:cs.display,visibility:cs.visibility
      };
    }catch{}
    restoreDarkAttrs(el,saved);
    if(record)state.smartDarkOriginalPaint.set(el,record);
    return record;
  }

  function invalidateSmartDarkPaint(root, deep=false) {
    if(!root)return;
    if(root instanceof Element)state.smartDarkOriginalPaint.delete(root);
    if(deep){
      let walker;try{walker=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT)}catch{return}
      let el,count=0;while(count++<240&&(el=walker.nextNode()))state.smartDarkOriginalPaint.delete(el);
    }
  }

  function nearestSmartDarkContext(el) {
    let node=el instanceof Element?el:null;
    for(let depth=0;node&&depth<10;depth++,node=node.parentElement){
      const marked=node.getAttribute?.(DARK_SURFACE_ATTR);
      if(marked)return {dark:true,tone:marked};
      const paint=state.smartDarkOriginalPaint.get(node)||captureSmartDarkOriginalPaint(node,false);
      const bg=paint?.bg;
      if(bg&&bg[3]>.12){
        const tone=smartDarkSurfaceTone(bg);
        if(tone)return {dark:true,tone};
        return {dark:colorLuminance(bg)<.34,tone:""};
      }
    }
    return {dark:true,tone:"base"};
  }

  function smartDarkFlatImageTone(value) {
    const raw=String(value||"none");
    if(!raw||raw==="none"||!/gradient\(/i.test(raw))return "";
    const colors=[...raw.matchAll(/rgba?\([^)]*\)/gi)].map(m=>parseRgb(m[0])).filter(Boolean);
    if(!colors.length||colors.length>8)return "";
    let light=0;
    for(const rgb of colors){
      if(rgb[3]<.08)continue;
      const max=Math.max(rgb[0],rgb[1],rgb[2]),min=Math.min(rgb[0],rgb[1],rgb[2]);
      if(max-min>48)return "";
      if(colorLuminance(rgb)>.48)light++;
    }
    if(!light)return "";
    return smartDarkSurfaceTone(colors.find(rgb=>rgb[3]>.08&&colorLuminance(rgb)>.48)||colors[0])||"soft";
  }

  function applySmartDarkPseudoPaint(el, paint) {
    if(!(el instanceof HTMLElement)||!paint)return;
    const core=getSmartDarkReaderCore();
    if(core){
      for(const [key,attr,varName] of [["before",DARK_BEFORE_ATTR,"--persianyar-dr-before-bg"],["after",DARK_AFTER_ATTR,"--persianyar-dr-after-bg"]]){
        const ps=paint[key];let applied=false;
        if(ps&&ps.display!=="none"&&ps.opacity>.015&&ps.bg&&ps.bg[3]>.015){
          const css=smartDarkReaderCss(ps.bg,"background");
          if(css){setSmartDarkVar(el,varName,css);el.setAttribute(attr,"dr");applied=true}
        }
        if(!applied)el.removeAttribute(attr);
      }
      const raw=String(paint.backgroundImage||"none");
      if(/gradient\(/i.test(raw)){
        const mapped=smartDarkReaderGradient(raw);
        if(mapped&&mapped!==raw){setSmartDarkVar(el,"--persianyar-dr-bgimage",mapped);el.setAttribute(DARK_BGIMAGE_ATTR,"dr")}
        else el.removeAttribute(DARK_BGIMAGE_ATTR);
      }else el.removeAttribute(DARK_BGIMAGE_ATTR);
      return;
    }
    for(const [key,attr] of [["before",DARK_BEFORE_ATTR],["after",DARK_AFTER_ATTR]]){
      const ps=paint[key];let tone="";
      if(ps&&ps.display!=="none"&&ps.opacity>.015){tone=ps.bg?smartDarkSurfaceTone(ps.bg):"";if(!tone)tone=smartDarkFlatImageTone(ps.backgroundImage)}
      if(tone)el.setAttribute(attr,tone);else el.removeAttribute(attr);
    }
    const imageTone=smartDarkFlatImageTone(paint.backgroundImage);
    if(imageTone)el.setAttribute(DARK_BGIMAGE_ATTR,imageTone);else el.removeAttribute(DARK_BGIMAGE_ATTR);
  }

  function isSmartDarkSearchConsolePage(){
    try{return getHost()==="search.google.com"&&/^\/search-console(?:\/|$)/i.test(String(location.pathname||""))}catch{return false}
  }

  function isSmartDarkLogoSvg(svg) {
    if(!(svg instanceof SVGSVGElement))return false;
    try{
      const owner=svg.closest?.("[class*='logo' i],[class*='brand' i],[data-testid*='logo' i],header,[role='banner']");
      const ownerText=`${owner?.getAttribute?.("aria-label")||""} ${owner?.getAttribute?.("title")||""} ${owner?.textContent||""}`.slice(0,160);
      const hint=`${svg.id||""} ${svg.getAttribute("class")||""} ${svg.getAttribute("aria-label")||""} ${svg.getAttribute("data-testid")||""} ${owner?.getAttribute?.("class")||""} ${ownerText}`.toLowerCase();
      if(/chart|graph|plot|spark|map|captcha|qr|flag/.test(hint))return false;
      const rect=svg.getBoundingClientRect();
      if(rect.width<8||rect.height<8||rect.width>520||rect.height>140)return false;
      if(/logo|brand|wordmark/.test(hint))return true;
      // Search Console's wordmark can be an unlabeled SVG inside the application header.
      return isSmartDarkSearchConsolePage() && !!svg.closest?.("header,[role='banner']") && (/(search\s*console|google)/i.test(hint)||rect.width>=90);
    }catch{return false}
  }
  function clearSmartDarkLogoParts(svg){svg?.querySelectorAll?.(`[${DARK_LOGO_PART_ATTR}]`).forEach(el=>el.removeAttribute(DARK_LOGO_PART_ATTR))}

  function isSmartDarkRasterLogo(img){
    if(!(img instanceof HTMLImageElement))return false;
    try{
      const owner=img.closest?.("[class*='logo' i],[class*='brand' i],[data-testid*='logo' i],header,[role='banner']");
      const hint=`${img.id||""} ${img.className||""} ${img.alt||""} ${img.title||""} ${img.getAttribute("data-testid")||""} ${owner?.getAttribute?.("class")||""} ${owner?.getAttribute?.("aria-label")||""}`.toLowerCase();
      if(/avatar|profile|photo|hero|banner|chart|graph|plot|spark|map|captcha|qr|flag|thumbnail/.test(hint))return false;
      const rect=img.getBoundingClientRect();
      if(rect.width<32||rect.height<8||rect.width>520||rect.height>150)return false;
      if(/logo|brand|wordmark|search\s*console/.test(hint))return true;
      return isSmartDarkSearchConsolePage() && !!img.closest?.("header,[role='banner']") && rect.width>=90;
    }catch{return false}
  }

  function applySmartDarkRasterLogo(img){
    if(!(img instanceof HTMLImageElement))return false;
    if(!isSmartDarkRasterLogo(img)||!nearestSmartDarkContext(img).dark){
      img.removeAttribute(DARK_LOGO_IMAGE_ATTR);state.darkLogoImageElements.delete(img);return false;
    }
    img.setAttribute(DARK_LOGO_IMAGE_ATTR,"adaptive");state.darkLogoImageElements.add(img);return true;
  }

  function applySmartDarkLogoParts(svg){
    if(!isSmartDarkLogoSvg(svg)||!nearestSmartDarkContext(svg).dark){clearSmartDarkLogoParts(svg);return false}
    const shapes=[...svg.querySelectorAll("path,circle,rect,line,polyline,polygon,text,tspan")].slice(0,120);let changed=0;
    for(const shape of shapes){
      const prior=shape.getAttribute(DARK_LOGO_PART_ATTR);if(prior!=null)shape.removeAttribute(DARK_LOGO_PART_ATTR);
      let cs;try{cs=getComputedStyle(shape)}catch{if(prior!=null)shape.setAttribute(DARK_LOGO_PART_ATTR,prior);continue}
      const classify=raw=>{const rgb=parseRgb(raw);if(!rgb||rgb[3]<.12)return false;const max=Math.max(rgb[0],rgb[1],rgb[2]),min=Math.min(rgb[0],rgb[1],rgb[2]);return max-min<30&&colorLuminance(rgb)<.42};
      const fill=classify(cs.fill),stroke=classify(cs.stroke);
      if(fill||stroke){shape.setAttribute(DARK_LOGO_PART_ATTR,fill&&stroke?"both":fill?"fill":"stroke");changed++}
      else shape.removeAttribute(DARK_LOGO_PART_ATTR);
    }
    return changed>0;
  }

  function isSmartDarkIconCandidate(svg) {
    if (!(svg instanceof SVGSVGElement)) return false;
    try{
      const hint=`${svg.id||""} ${svg.getAttribute("class")||""} ${svg.getAttribute("aria-label")||""} ${svg.getAttribute("data-testid")||""}`.toLowerCase();
      if(/logo|brand|avatar|photo|image|chart|graph|plot|spark|map|captcha|qr|flag/.test(hint))return false;
      if(svg.closest("[class*='logo' i],[class*='brand' i],[data-testid*='logo' i],[data-testid*='chart' i],[class*='chart' i],[class*='graph' i]"))return false;
      const rect=svg.getBoundingClientRect();
      if(rect.width<4||rect.height<4||rect.width>88||rect.height>88)return false;
      const shapes=[...svg.querySelectorAll("path,circle,rect,line,polyline,polygon")].slice(0,28);
      if(!shapes.length||shapes.length>24)return false;
      let darkNeutral=0,colorful=0,seen=0;
      for(const shape of shapes){
        let cs;try{cs=getComputedStyle(shape)}catch{continue}
        for(const raw of [cs.fill,cs.stroke]){
          if(!raw||raw==="none"||raw==="transparent")continue;
          const rgb=parseRgb(raw);if(!rgb||rgb[3]<.12)continue;seen++;
          const max=Math.max(rgb[0],rgb[1],rgb[2]),min=Math.min(rgb[0],rgb[1],rgb[2]),chroma=max-min,lum=colorLuminance(rgb);
          if(chroma>58&&lum>.07&&lum<.90)colorful++;
          else if(lum<.44)darkNeutral++;
        }
      }
      return seen>0&&darkNeutral>0&&colorful===0;
    }catch{return false}
  }

  function applySmartDarkIcon(svg) {
    if(!(svg instanceof SVGSVGElement))return;
    if(isSmartDarkLogoSvg(svg)){
      svg.removeAttribute(DARK_ICON_ATTR);state.darkIconElements.delete(svg);applySmartDarkLogoParts(svg);return;
    }
    clearSmartDarkLogoParts(svg);
    if(!nearestSmartDarkContext(svg).dark||!isSmartDarkIconCandidate(svg)){
      svg.removeAttribute(DARK_ICON_ATTR);state.darkIconElements.delete(svg);return;
    }
    svg.setAttribute(DARK_ICON_ATTR,"neutral");state.darkIconElements.add(svg);
  }

  function smartDarkChroma(rgb){
    if(!rgb)return 0;return Math.max(rgb[0],rgb[1],rgb[2])-Math.min(rgb[0],rgb[1],rgb[2]);
  }

  function isSmartDarkInteractiveElement(el){
    return el instanceof HTMLElement && el.matches?.(SMART_DARK_INTERACTION_SELECTOR);
  }

  function applySmartDarkInteractionGuard(el, paint, context){
    if(!isSmartDarkInteractiveElement(el)){el.removeAttribute?.(DARK_INTERACTIVE_ATTR);return}
    if(!context?.dark){el.removeAttribute(DARK_INTERACTIVE_ATTR);return}
    // Text/search fields need a stable base marker, not only a hover marker. Google Search Console
    // and several Material dashboards paint a light wrapper/field even while the surrounding app is
    // already dark. Keeping the semantic field marker lets the USER-origin stylesheet darken the
    // control before the site's own hover/focus styles can repaint it light.
    if(el.matches?.("input:not([type='checkbox']):not([type='radio']):not([type='range']):not([type='color']):not([type='file']):not([type='button']):not([type='submit']):not([type='reset']):not([type='image']),textarea,select,[role='textbox'],[role='searchbox'],[role='combobox'],[role='spinbutton']")){
      el.setAttribute(DARK_INTERACTIVE_ATTR,"field");return;
    }
    const bg=paint?.bg;
    // Transparent, dark-neutral and light-neutral controls are safe to normalize on hover. Keep
    // saturated brand buttons authored so Smart Dark never turns product CTAs into grey buttons.
    if(!bg || bg[3]<.10){el.setAttribute(DARK_INTERACTIVE_ATTR,"neutral");return}
    const lum=colorLuminance(bg),chroma=smartDarkChroma(bg);
    if(chroma>92 && lum>.08 && lum<.62){el.setAttribute(DARK_INTERACTIVE_ATTR,"brand");return}
    el.setAttribute(DARK_INTERACTIVE_ATTR, lum>.48 ? "soft" : "neutral");
  }

  function applySmartDarkMaskedIcon(el, paint, context){
    if(!(el instanceof HTMLElement))return;
    const clear=()=>{if(el.getAttribute(DARK_ICON_ATTR)==="mask")el.removeAttribute(DARK_ICON_ATTR);state.darkIconElements.delete(el)};
    const mask=String(paint?.maskImage||paint?.webkitMaskImage||"none");
    if(!context?.dark||!mask||mask==="none"){clear();return}
    const hint=`${el.id||""} ${el.className||""} ${el.getAttribute("aria-label")||""} ${el.getAttribute("data-testid")||""}`.toLowerCase();
    if(/logo|brand|avatar|photo|image|chart|graph|plot|map|flag/.test(hint)){clear();return}
    let rect;try{rect=el.getBoundingClientRect()}catch{clear();return}
    if(rect.width<4||rect.height<4||rect.width>88||rect.height>88||hasVisibleDirectText(el)){clear();return}
    el.setAttribute(DARK_ICON_ATTR,"mask");state.darkIconElements.add(el);
  }

  function smartDarkOverlayKind(el){
    if(!(el instanceof HTMLElement))return "";
    try{
      if(el.matches("dialog[open],[role='dialog']:not([hidden]),[role='alertdialog']:not([hidden]),[aria-modal='true'],[role='menu']:not([hidden]),[role='listbox']:not([hidden]),[role='tooltip']:not([hidden]),[popover]:popover-open"))return "panel";
      const hint=`${el.id||""} ${el.className||""} ${el.getAttribute("data-testid")||""} ${el.getAttribute("aria-label")||""}`.toLowerCase();
      if(/(?:^|[\s_-])(backdrop|scrim)(?:$|[\s_-])/.test(hint))return "scrim";
      if(/(?:^|[\s_-])(splash|loading|loader)(?:$|[\s_-])/.test(hint))return "splash";
      if(/(?:^|[\s_-])(drawer|sheet|modal|dialog|popover|popup|flyout|tray|toast|snackbar|notification|notifications|message-panel|messages-panel|side-panel|sidepanel|overlay|context-menu|contextmenu)(?:$|[\s_-])/.test(hint))return "panel";
      if(el.getAttribute("data-state")==="open")return "panel";
    }catch{}
    return "";
  }

  function primeSmartDarkOverlayMarker(el){
    if(!(el instanceof HTMLElement)||!state.config.smartDarkMode)return false;
    let kind="";
    try{
      if(el.matches("dialog[open],[role='dialog']:not([hidden]),[role='alertdialog']:not([hidden]),[aria-modal='true'],[role='menu']:not([hidden]),[role='listbox']:not([hidden]),[role='tooltip']:not([hidden]),[popover]:popover-open"))kind="panel";
      else {
        const hint=`${el.id||""} ${el.className||""} ${el.getAttribute("data-testid")||""} ${el.getAttribute("aria-label")||""}`.toLowerCase();
        if(/(?:^|[\s_-])(backdrop|scrim)(?:$|[\s_-])/.test(hint))kind="scrim";
        else if(/(?:^|[\s_-])(splash|loading|loader)(?:$|[\s_-])/.test(hint))kind="splash";
        else if(/(?:^|[\s_-])(drawer|sheet|modal|dialog|popover|popup|flyout|tray|toast|snackbar|notification|notifications|message-panel|messages-panel|side-panel|sidepanel|context-menu|contextmenu)(?:$|[\s_-])/.test(hint))kind="panel";
      }
    }catch{}
    if(kind){el.setAttribute(DARK_OVERLAY_ATTR,kind);return true}
    return false;
  }

  function isSmartDarkOverlayLike(el){return !!smartDarkOverlayKind(el)}

  function applySmartDarkOverlayGuard(el, paint){
    if(!(el instanceof HTMLElement))return;
    const kind=smartDarkOverlayKind(el);
    if(!kind){el.removeAttribute(DARK_OVERLAY_ATTR);return}
    const bg=paint?.bg;
    if(!bg || bg[3]<.08 || colorLuminance(bg)>.38)el.setAttribute(DARK_OVERLAY_ATTR,kind);
    else el.removeAttribute(DARK_OVERLAY_ATTR);
  }

  // v27: surface coherence. Modern SPAs often build a single visual panel from many nested
  // light wrappers (header/body/icon-prefix/table-cell). Recoloring each wrapper independently can
  // turn one panel into several dark tiles. Keep neutral structural descendants on the same tone as
  // their nearest painted parent, while retaining distinct cards, fields and floating controls.
  function isSmartDarkSemanticSurface(el, paint){
    if(!(el instanceof HTMLElement))return false;
    try{
      if(el.matches("input,textarea,select,option,button,summary,[role='button'],[role='textbox'],[role='searchbox'],[role='combobox'],[role='spinbutton'],dialog,[role='dialog'],[role='alertdialog'],[aria-modal='true'],[role='menu'],[role='listbox'],[role='tooltip'],[popover],[class*='card' i],[class*='panel' i],[class*='modal' i],[class*='popover' i],[class*='dropdown' i],[class*='menu' i],[class*='toast' i],[class*='snackbar' i]"))return true;
      if(paint?.boxShadow && paint.boxShadow!=="none")return true;
    }catch{}
    return false;
  }

  function isSmartDarkFieldPart(el){
    if(!(el instanceof HTMLElement))return false;
    try{
      if(el.matches("input,textarea,select,[role='textbox'],[role='searchbox'],[role='combobox'],[role='spinbutton']"))return true;
      let p=el.parentElement;
      for(let depth=0;p&&depth<4;depth++,p=p.parentElement){
        if(p.matches?.("[role='listbox'],[role='menu'],dialog,[role='dialog'],[aria-modal='true']"))break;
        if(p.matches?.("[role='search'],[class*='search-box' i],[class*='searchbox' i],[class*='search-field' i],[class*='searchfield' i],[class*='text-field' i],[class*='textfield' i],[class*='input-group' i],[class*='inputgroup' i],[class*='form-field' i],[class*='formfield' i],.mdc-text-field,.mat-form-field-flex,.mat-mdc-text-field-wrapper,.mat-mdc-form-field-flex"))return true;
        if(p.matches?.("label,div,span") && p.querySelector?.(":scope > input:not([type='checkbox']):not([type='radio']):not([type='range']):not([type='color']):not([type='file']),:scope > textarea,:scope > select,:scope > [role='textbox'],:scope > [role='searchbox'],:scope > [role='combobox'],:scope > [role='spinbutton']"))return true;
      }
    }catch{}
    return false;
  }

  function smartDarkCoherentSurfaceTone(el, paint, proposed){
    if(!proposed || !(el instanceof HTMLElement))return proposed;
    const bg=paint?.bg;
    if(!bg || bg[3]<.10)return proposed;
    const chroma=smartDarkChroma(bg);
    if(chroma>62)return proposed;
    if(isSmartDarkFieldPart(el))return "soft";
    try{
      if(el.matches("dialog,[role='dialog'],[role='alertdialog'],[aria-modal='true'],[role='menu'],[role='listbox'],[role='tooltip'],[popover]"))return "soft";
      if(el.matches("[class*='card' i],[class*='surface' i],[class*='sheet' i],[class*='drawer' i],[class*='panel' i]") && !el.matches("[class*='input' i],[class*='search' i],[class*='field' i]"))return "raised";
    }catch{}
    if(isSmartDarkSemanticSurface(el,paint))return proposed;
    const parent=el.parentElement;
    if(parent){
      const ctx=nearestSmartDarkContext(parent);
      if(ctx.dark && ctx.tone)return ctx.tone;
    }
    return proposed;
  }

  function applySmartDarkElement(el, refreshOriginal=false) {
    // Hybrid mode: the CSS-first engine remains the primary renderer, while this function is a
    // bounded residual repair pass. It only overrides paint properties on elements that are still
    // visibly light/incompatible after selector-level recoloring, so layout/geometry is untouched.
    if (!(el instanceof HTMLElement) || isSmartDarkProtected(el)) return;
    const residualMode=!!getSmartDarkCssEngine();
    const paint=captureSmartDarkOriginalPaint(el,refreshOriginal);if(!paint)return;
    if (paint.display==="none" || paint.visibility==="hidden" || paint.opacity<.015) return;
    const core=getSmartDarkReaderCore();if(!core)return;

    const rootLike=el===document.documentElement||el===document.body;
    const bg=(paint.bg&&paint.bg[3]>.01)?paint.bg:(rootLike?[255,255,255,1]:null);
    let surfaceRepaired=false;
    if(bg){
      const lum=colorLuminance(bg),chroma=smartDarkChroma(bg);
      // In hybrid mode, do not re-darken surfaces the CSS engine already handled. Repair only
      // remaining light/pastel neutral surfaces. Saturated brand/product colors are preserved.
      const shouldRepair=!residualMode || (lum>.40 && !(chroma>105 && lum<.76));
      if(shouldRepair){
        const css=smartDarkReaderCss(bg,"background");
        if(css){setSmartDarkVar(el,"--persianyar-dr-bg",css);el.setAttribute(DARK_SURFACE_ATTR,"dr");state.darkSurfaceElements.add(el);surfaceRepaired=true}
      }else if(el.getAttribute(DARK_SURFACE_ATTR)==="dr"){
        el.removeAttribute(DARK_SURFACE_ATTR);state.darkSurfaceElements.delete(el);el.style?.removeProperty?.("--persianyar-dr-bg");
      }
    }else if(el.getAttribute(DARK_SURFACE_ATTR)==="dr"){
      el.removeAttribute(DARK_SURFACE_ATTR);state.darkSurfaceElements.delete(el);el.style?.removeProperty?.("--persianyar-dr-bg");
    }

    if(hasVisibleDirectText(el)&&paint.fg&&paint.fg[3]>.01){
      const fgLum=colorLuminance(paint.fg),fgChroma=smartDarkChroma(paint.fg);
      const contextDark=surfaceRepaired || nearestSmartDarkContext(el.parentElement||el).dark;
      // CSS-first normally handles text. The residual pass only fixes text that is still dark on a
      // dark/repaired surface. Colorful links/brand text are left authored unless truly very dark.
      const shouldRepairText=!residualMode || (contextDark && fgLum<.46 && (fgChroma<82 || fgLum<.20));
      if(shouldRepairText){
        const fg=smartDarkReaderCss(paint.fg,"text");
        if(fg){setSmartDarkVar(el,"--persianyar-dr-fg",fg);el.setAttribute(DARK_TEXT_ATTR,"dr");state.darkTextElements.add(el)}
      }else if(el.getAttribute(DARK_TEXT_ATTR)==="dr"){
        el.removeAttribute(DARK_TEXT_ATTR);state.darkTextElements.delete(el);el.style?.removeProperty?.("--persianyar-dr-fg");
      }
    }else if(el.getAttribute(DARK_TEXT_ATTR)==="dr"){
      el.removeAttribute(DARK_TEXT_ATTR);state.darkTextElements.delete(el);el.style?.removeProperty?.("--persianyar-dr-fg");
    }

    const borders=paint.borders||[];let hasBorder=false;
    const names=["--persianyar-dr-border-top","--persianyar-dr-border-right","--persianyar-dr-border-bottom","--persianyar-dr-border-left"];
    for(let i=0;i<4;i++){
      const bc=borders[i];
      if(!bc||bc[3]<=.02)continue;
      const bl=colorLuminance(bc),bcChroma=smartDarkChroma(bc);
      const shouldRepairBorder=!residualMode || surfaceRepaired || (nearestSmartDarkContext(el).dark && ((bl<.24&&bcChroma<70)||bl>.70));
      if(shouldRepairBorder){const css=smartDarkReaderCss(bc,"border");if(css){setSmartDarkVar(el,names[i],css);hasBorder=true}}
    }
    if(hasBorder){el.setAttribute(DARK_BORDER_ATTR,"dr");state.darkBorderElements.add(el)}
    else if(el.getAttribute(DARK_BORDER_ATTR)==="dr"){
      el.removeAttribute(DARK_BORDER_ATTR);state.darkBorderElements.delete(el);
      for(const name of names)el.style?.removeProperty?.(name);
    }
  }

  const SMART_DARK_INTERACTION_SELECTOR = "a[href],button,summary,input,textarea,select,tr,mat-list-item,mat-option,.mdc-list-item,.mat-list-item,.mat-mdc-list-item,.mat-mdc-option,[role='button'],[role='link'],[role='menuitem'],[role='option'],[role='tab'],[role='switch'],[role='checkbox'],[role='radio'],[role='row'],[role='listitem'],[role='treeitem'],[role='textbox'],[role='searchbox'],[role='combobox'],[role='spinbutton'],[aria-selected],[aria-current],[aria-expanded],[data-state],[aria-haspopup]:not([aria-haspopup='false']),[tabindex]:not([tabindex='-1']),[onclick],[class*='accordion-trigger' i],[class*='accordion-header' i],[class*='dropdown-trigger' i],[class*='select-trigger' i],[class*='menu-item' i],[class*='menuitem' i]";
  const SMART_DARK_PRIME_SELECTOR = "a[href],button,summary,input,textarea,select,tr,mat-list-item,mat-option,.mdc-list-item,.mat-list-item,.mat-mdc-list-item,.mat-mdc-option,[role='button'],[role='link'],[role='menuitem'],[role='option'],[role='tab'],[role='switch'],[role='checkbox'],[role='radio'],[role='row'],[role='listitem'],[role='treeitem'],[role='textbox'],[role='searchbox'],[role='combobox'],[role='spinbutton'],[aria-selected],[aria-current],[aria-expanded],[aria-haspopup]:not([aria-haspopup='false']),[tabindex]:not([tabindex='-1']),[onclick],[class*='accordion-trigger' i],[class*='accordion-header' i],[class*='dropdown-trigger' i],[class*='select-trigger' i],[class*='menu-item' i],[class*='menuitem' i]";
  const GSC_CHECKBOX_ROW_SELECTOR = "li:has(input[type='checkbox']),tr:has(input[type='checkbox']),[role='row']:has(input[type='checkbox']),[role='listitem']:has(input[type='checkbox']),[role='option']:has(input[type='checkbox']),.mdc-list-item:has(input[type='checkbox']),.mat-mdc-list-item:has(input[type='checkbox']),div:has(input[type='checkbox']),li:has([role='checkbox']),tr:has([role='checkbox']),[role='row']:has([role='checkbox']),[role='listitem']:has([role='checkbox']),[role='option']:has([role='checkbox']),.mdc-list-item:has([role='checkbox']),.mat-mdc-list-item:has([role='checkbox']),div:has([role='checkbox'])";
  const GSC_CHECKBOX_ANCHOR_SELECTOR = "input[type='checkbox'],[role='checkbox'],.mat-mdc-checkbox,.mat-checkbox,.mdc-checkbox";
  function findSearchConsoleMessageRow(target){
    if(!isSearchConsoleHost()||!(target instanceof Element))return null;
    let node=target instanceof HTMLElement?target:target.parentElement;
    for(let depth=0;node&&depth<9;depth++,node=node.parentElement){
      if(!(node instanceof HTMLElement))continue;
      // Stop at the drawer/dialog shell. It can contain every message checkbox and must never be
      // marked as one giant hover row. We still inspect it after descendants, so actual rows win.
      const shell=node.matches?.("[role='dialog'],[aria-modal='true'],[class*='drawer' i],[class*='panel' i]");
      let hasCheck=false;
      try{hasCheck=!!node.querySelector(GSC_CHECKBOX_ANCHOR_SELECTOR)}catch{}
      if(hasCheck){
        const text=String(node.textContent||"").replace(/\s+/g," ").trim();
        const semantic=node.matches?.("li,tr,[role='row'],[role='listitem'],[role='option'],[jsaction*='click'],[tabindex]:not([tabindex='-1'])");
        // Notification rows are compact UI records: checkbox + readable label/date, not the entire
        // drawer. Text/child caps make this safe without forcing layout reads on pointerover.
        if((semantic||text.length>=8) && text.length<=900 && node.children.length<=14){
          node.setAttribute(DARK_GSC_ROW_ATTR,"1");
          if(!node.hasAttribute(DARK_INTERACTIVE_ATTR))node.setAttribute(DARK_INTERACTIVE_ATTR,"pending");
          return node;
        }
      }
      if(shell&&depth>0)break;
    }
    return null;
  }
  const SMART_DARK_BUDGET = Object.freeze({
    mutationRootsPerFrame: 3,
    mutationImmediateNodes: 28,
    mutationDeepSkip: 28,
    deepBatch: 22,
    deepSliceMs: 1.25,
    viewportDebounceMs: 280,
    viewportMaxTargets: 36,
    interactionBatch: 4
  });
  function smartDarkBudget(name){
    const base=SMART_DARK_BUDGET[name];
    const pressure=Math.max(0,Math.min(3,state.smartDarkPressure||0));
    if(!pressure)return base;
    const table={
      mutationRootsPerFrame:[3,2,2,1],
      mutationImmediateNodes:[28,22,16,10],
      mutationDeepSkip:[28,22,16,10],
      deepBatch:[22,16,12,8],
      deepSliceMs:[1.25,1.0,.8,.6],
      viewportDebounceMs:[280,340,440,560],
      viewportMaxTargets:[36,28,20,14],
      interactionBatch:[4,3,2,1]
    };
    return table[name]?.[pressure] ?? base;
  }

  function relaxSmartDarkPressure(){
    clearTimeout(state.smartDarkPressureTimer);
    state.smartDarkPressureTimer=setTimeout(()=>{
      state.smartDarkPressureTimer=0;
      if(!state.smartDarkListenersBound)return;
      const quietFor=performance.now()-(state.smartDarkLongTaskAt||0);
      if(quietFor<1400){relaxSmartDarkPressure();return}
      if(state.smartDarkPressure>0){state.smartDarkPressure--;if(state.smartDarkPressure>0)relaxSmartDarkPressure()}
    },1500);
  }

  function bindSmartDarkPerfMonitor(enable){
    if(!enable){
      try{state.smartDarkPerfObserver?.disconnect()}catch{}
      state.smartDarkPerfObserver=null;
      state.smartDarkPressure=0;state.smartDarkLongTaskAt=0;
      clearTimeout(state.smartDarkPressureTimer);state.smartDarkPressureTimer=0;
      return;
    }
    if(state.smartDarkPerfObserver||typeof PerformanceObserver!=="function")return;
    try{
      if(!PerformanceObserver.supportedEntryTypes?.includes?.("longtask"))return;
      const observer=new PerformanceObserver(list=>{
        let worst=0;for(const entry of list.getEntries())worst=Math.max(worst,Number(entry.duration)||0);
        if(worst<50)return;
        state.smartDarkLongTaskAt=performance.now();
        const level=worst>=140?3:worst>=85?2:1;
        state.smartDarkPressure=Math.max(state.smartDarkPressure,level);
        relaxSmartDarkPressure();
      });
      observer.observe({type:"longtask",buffered:false});
      state.smartDarkPerfObserver=observer;
    }catch{}
  }

  function scheduleSmartDarkBackground(run, initial=false){
    const pressure=state.smartDarkPressure||0;
    if(typeof requestIdleCallback==="function"){
      // Under main-thread pressure do not force a timeout: visible/interactive elements are already
      // covered synchronously, so deep-page work can wait for a genuine idle window.
      if(pressure>=2)requestIdleCallback(run);
      else requestIdleCallback(run,{timeout:initial?420:820});
      return;
    }
    try{
      if(globalThis.scheduler?.postTask){
        globalThis.scheduler.postTask(()=>run(null),{priority:"background"}).catch(()=>setTimeout(()=>run(null),48));
        return;
      }
    }catch{}
    setTimeout(()=>run(null),pressure>=2?96:48);
  }

  function handleSmartDarkScrollEnd(){scheduleSmartDarkViewportSweep(true)}
  function handleSmartDarkScrollFallback(){scheduleSmartDarkViewportSweep(false)}
  function handleSmartDarkResize(){scheduleSmartDarkViewportSweep(false)}
  function handleSmartDarkVisibility(){if(document.visibilityState==="visible")scheduleSmartDarkViewportSweep(true)}

  const SMART_DARK_BRAND_HINT_RE = /(?:^|[\s_-])(brand|danger|destructive|success|warning|warn|cta|purchase|buy|subscribe|upgrade|premium|confirm|submit)(?:$|[\s_-])/i;
  const SMART_DARK_NAV_CONTEXT = "nav,aside,[role='navigation'],[role='menu'],[role='menubar'],[role='listbox'],[role='tablist'],[class*='menu' i],[class*='nav' i],[class*='sidebar' i],[class*='toolbar' i]";

  function smartDarkFastInteractionKind(el, accurate=false){
    if(!(el instanceof HTMLElement)||!el.matches?.(SMART_DARK_INTERACTION_SELECTOR))return "";
    const hint=`${el.id||""} ${typeof el.className==="string"?el.className:""} ${el.getAttribute("data-testid")||""} ${el.getAttribute("aria-label")||""} ${el.getAttribute("name")||""}`;
    if(SMART_DARK_BRAND_HINT_RE.test(hint))return "brand";
    if(el.matches("input:not([type='checkbox']):not([type='radio']):not([type='range']):not([type='color']):not([type='button']):not([type='submit']):not([type='reset']):not([type='image']),textarea,select,[role='textbox'],[role='searchbox'],[role='combobox'],[role='spinbutton']"))return "field";
    const textLink=el.matches("a[href],[role='link']")&&!el.matches("[role='button']")&&!el.closest?.(SMART_DARK_NAV_CONTEXT);
    if(textLink)return accurate?"text":"";

    // Pointer/focus handlers run on the main-thread hot path. Never force style resolution here.
    // Inline colors are safe to inspect without layout; obvious colorful inline backgrounds stay
    // branded, while generic controls receive a predictive neutral marker before the first paint.
    if(accurate){
      try{
        const inlineBg=parseRgb(el.style?.backgroundColor||"");
        if(inlineBg&&inlineBg[3]>.10){
          const lum=colorLuminance(inlineBg),chroma=smartDarkChroma(inlineBg);
          if(chroma>92&&lum>.08&&lum<.62)return "brand";
          return lum>.48?"soft":"neutral";
        }
      }catch{}
    }
    if(el.matches("button,summary,tr,mat-list-item,mat-option,.mdc-list-item,.mat-list-item,.mat-mdc-list-item,.mat-mdc-option,[role='button'],[role='menuitem'],[role='option'],[role='tab'],[role='switch'],[role='checkbox'],[role='radio'],[role='row'],[role='listitem'],[role='treeitem'],[aria-selected],[aria-current],[aria-expanded]"))return "pending";
    return "";
  }

  function primeSmartDarkInteractionGuard(el, accurate=false){
    if(!(el instanceof HTMLElement)||!state.config.smartDarkMode)return false;
    const current=el.getAttribute(DARK_INTERACTIVE_ATTR)||"";
    if(current&&current!=="pending")return true;
    const kind=smartDarkFastInteractionKind(el,accurate);
    if(kind){el.setAttribute(DARK_INTERACTIVE_ATTR,kind);return true}
    if(current==="pending")el.removeAttribute(DARK_INTERACTIVE_ATTR);
    return false;
  }

  function primeSmartDarkInteractionTree(root,limit=160){
    if(!root||!state.config.smartDarkMode||limit<=0)return;
    let count=0;
    const prime=el=>{
      if(count>=limit||!(el instanceof HTMLElement))return;
      if(el.matches?.(SMART_DARK_PRIME_SELECTOR)&&primeSmartDarkInteractionGuard(el,false))count++;
    };
    if(root instanceof HTMLElement)prime(root);
    if(count>=limit)return;
    let walker;try{walker=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT)}catch{return}
    let el;
    while(count<limit&&(el=walker.nextNode()))prime(el);
  }

  function queueSmartDarkInteractionTarget(el){
    if(!(el instanceof Element)||!state.config.smartDarkMode)return;
    const target=el.closest?.(SMART_DARK_INTERACTION_SELECTOR)||el;
    if(!(target instanceof Element))return;
    state.smartDarkInteractionQueue.add(target);
    if(state.smartDarkInteractionFrame)return;
    state.smartDarkInteractionFrame=requestAnimationFrame(()=>{
      state.smartDarkInteractionFrame=0;
      if(!state.config.smartDarkMode||!document.documentElement?.hasAttribute("data-persianyar-smart-dark-active")){state.smartDarkInteractionQueue.clear();return}
      const batch=[...state.smartDarkInteractionQueue].slice(0,smartDarkBudget("interactionBatch"));state.smartDarkInteractionQueue.clear();
      for(const node of batch){
        if(!state.smartDarkOriginalPaint.has(node))captureSmartDarkOriginalPaint(node,false);
        applySmartDarkElement(node,false);
      }
    });
  }

  function handleSmartDarkInteractionEvent(event){
    if(!state.config.smartDarkMode||!document.documentElement?.hasAttribute("data-persianyar-smart-dark-active"))return;
    const target=event?.target instanceof Element?event.target:null;if(!target)return;
    const interactive=target.closest?.(SMART_DARK_INTERACTION_SELECTOR)||target;
    if(event?.type==="pointerover"&&event.relatedTarget instanceof Element){
      const previous=event.relatedTarget.closest?.(SMART_DARK_INTERACTION_SELECTOR);
      if(previous===interactive)return;
    }
    if(interactive instanceof Element){
      invalidateSmartDarkPaint(interactive,false);
      queueSmartDarkInteractionTarget(interactive);
    }
  }

  const SMART_DARK_FLOATING_SELECTOR = "dialog[open],[role='dialog']:not([hidden]),[role='alertdialog']:not([hidden]),[aria-modal='true'],[role='menu']:not([hidden]),[role='listbox']:not([hidden]),[role='tooltip']:not([hidden]),[popover]:popover-open,[data-state='open'],[class*='drawer' i],[class*='sheet' i],[class*='modal' i],[class*='popover' i],[class*='popup' i],[class*='flyout' i],[class*='tray' i],[class*='toast' i],[class*='snackbar' i],[class*='notification' i],[class*='message-panel' i],[class*='side-panel' i],[class*='sidepanel' i],[class*='context-menu' i],[class*='contextmenu' i],[data-testid*='context-menu' i],[data-slot*='context-menu' i],[data-radix-menu-content],[class*='splash' i],[class*='loading' i],[class*='loader' i]";

  function refreshSmartDarkFloatingSurfaces(limit=14){
    if(!state.config.smartDarkMode||!document.documentElement?.hasAttribute("data-persianyar-smart-dark-active"))return;
    let count=0;
    try{
      for(const el of document.querySelectorAll(SMART_DARK_FLOATING_SELECTOR)){
        if(count++>=limit)break;
        // Avoid a visibility getComputedStyle() followed by another style read in the classifier.
        // The classifier already drops display:none/hidden/transparent elements in the same pass.
        invalidateSmartDarkPaint(el,false);
        markSmartDarkImmediate(el,20,true);
      }
    }catch{}
  }

  function smartDarkControlledTargets(trigger){
    const out=[];if(!(trigger instanceof Element))return out;
    const ids=`${trigger.getAttribute("aria-controls")||""} ${trigger.getAttribute("aria-owns")||""}`.trim().split(/\s+/).filter(Boolean);
    for(const id of ids.slice(0,4)){try{const el=document.getElementById(id);if(el instanceof Element)out.push(el)}catch{}}
    return out;
  }

  function scheduleSmartDarkActionSweep(target){
    if(!state.config.smartDarkMode)return;
    const cssEngine=getSmartDarkCssEngine();
    if(cssEngine)cssEngine.scheduleRefresh?.("ui-action",20);
    for(const timer of state.smartDarkActionTimers)clearTimeout(timer);
    state.smartDarkActionTimers.clear();
    const run=()=>{
      if(!state.config.smartDarkMode||!document.documentElement?.hasAttribute("data-persianyar-smart-dark-active"))return;
      if(target?.isConnected){
        invalidateSmartDarkPaint(target,false);
        queueSmartDarkInteractionTarget(target);
        for(const controlled of smartDarkControlledTargets(target)){
          invalidateSmartDarkPaint(controlled,true);
          markSmartDarkImmediate(controlled,24,true);
        }
      }
    };
    requestAnimationFrame(run);
    const timer=setTimeout(()=>{state.smartDarkActionTimers.delete(timer);run()},140);
    state.smartDarkActionTimers.add(timer);
  }

  function handleSmartDarkActionEvent(event){
    if(!state.config.smartDarkMode||!document.documentElement?.hasAttribute("data-persianyar-smart-dark-active"))return;
    if(event.type==="keydown"&&!(["Enter"," ","Escape","ArrowDown","ArrowUp"].includes(event.key)))return;
    const target=event?.target instanceof Element?event.target:null;
    scheduleSmartDarkActionSweep(target);
  }

  function scheduleSmartDarkViewportSweep(immediate=false){
    if(!state.config.smartDarkMode||document.visibilityState==="hidden")return;
    const cssEngine=getSmartDarkCssEngine();
    if(cssEngine)cssEngine.scheduleRefresh?.("viewport-request",immediate?0:25);
    clearTimeout(state.smartDarkViewportTimer);state.smartDarkViewportTimer=0;
    const queueFrame=()=>{
      if(state.smartDarkViewportFrame)return;
      state.smartDarkViewportFrame=requestAnimationFrame(()=>{state.smartDarkViewportFrame=0;smartDarkViewportSweep()});
    };
    // Native scrollend is already a reliable end-of-gesture signal, so it needs no second debounce.
    if(immediate){queueFrame();return}
    state.smartDarkViewportTimer=setTimeout(queueFrame,smartDarkBudget("viewportDebounceMs"));
  }

  function runSmartDarkInitialViewportPass(done){
    const cssEngine=getSmartDarkCssEngine();
    if(cssEngine)cssEngine.refresh?.();
    if(!state.config.smartDarkMode||!document.documentElement?.hasAttribute("data-persianyar-smart-dark-active")){done?.({visited:0,styled:0});return}
    const seq=++state.smartDarkInitialPassSeq;
    const root=document.documentElement;let styled=0;
    for(const el of [root,document.body])if(el){captureSmartDarkOriginalPaint(el,false);applySmartDarkElement(el,false);styled++}
    markSmartDarkVisibleShell();
    state.smartDarkInitialPassDone=true;
    requestAnimationFrame(()=>{
      if(seq!==state.smartDarkInitialPassSeq)return;
      done?.({visited:styled,styled});
      setTimeout(()=>{
        if(seq!==state.smartDarkInitialPassSeq||!state.config.smartDarkMode)return;
        scheduleSmartDarkDeepScan(document.documentElement||document,0,false);
      },240);
    });
  }

  function markSmartDarkVisibleShell(){
    const cssEngine=getSmartDarkCssEngine();
    if(cssEngine)cssEngine.scheduleRefresh?.("visible-shell",0);
    if(!state.config.smartDarkMode||!document.documentElement?.hasAttribute("data-persianyar-smart-dark-active"))return;
    const seen=new Set(), add=el=>{if(el instanceof Element)seen.add(el)};
    add(document.documentElement);add(document.body);
    try{
      document.querySelectorAll(":scope > body > *,main,[role='main'],header,nav,aside,dialog[open],[aria-modal='true'],[role='dialog']").forEach(el=>{if(seen.size<120)add(el)});
      const w=Math.max(1,innerWidth||1),h=Math.max(1,innerHeight||1);
      for(const px of [.08,.3,.5,.7,.92])for(const py of [.08,.28,.52,.76,.92]){
        for(const el of document.elementsFromPoint(Math.min(w-1,w*px),Math.min(h-1,h*py)).slice(0,5)){
          add(el);if(el.parentElement)add(el.parentElement);
        }
      }
    }catch{}
    for(const el of [...seen].slice(0,140)){captureSmartDarkOriginalPaint(el,false);applySmartDarkElement(el,false)}
  }

  function smartDarkViewportSweep(){
    if(!state.config.smartDarkMode||!document.documentElement?.hasAttribute("data-persianyar-smart-dark-active"))return;
    const seen=new Set(),add=el=>{if(el instanceof Element&&seen.size<smartDarkBudget("viewportMaxTargets"))seen.add(el)};
    try{
      const w=Math.max(1,innerWidth||1),h=Math.max(1,innerHeight||1);
      for(const px of [.12,.5,.88])for(const py of [.12,.5,.88]){
        const stack=document.elementsFromPoint(Math.min(w-1,w*px),Math.min(h-1,h*py)).slice(0,4);
        for(const el of stack){add(el);let p=el.parentElement;for(let i=0;p&&i<2;i++,p=p.parentElement)add(p)}
      }
      let floating=0;
      for(const el of document.querySelectorAll(SMART_DARK_FLOATING_SELECTOR)){add(el);if(++floating>=8)break}
    }catch{}
    for(const el of seen){invalidateSmartDarkPaint(el,false);applySmartDarkElement(el,true)}
  }

  function smartDarkTargets(root, limit=1100) {
    const out=[];if(!root||limit<=0)return out;
    const push=el=>{if((el instanceof HTMLElement||el instanceof SVGSVGElement)&&out.length<limit)out.push(el)};
    if(root.nodeType===Node.ELEMENT_NODE)push(root);
    let walker;try{walker=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT)}catch{return out}
    let el;while(out.length<limit&&(el=walker.nextNode()))push(el);
    return out;
  }

  function markSmartDarkSurfaces(root, limit=1100, refreshOriginal=false){
    if(!state.config.smartDarkMode||!document.documentElement?.hasAttribute("data-persianyar-smart-dark-active")||!root)return;
    const targets=smartDarkTargets(root,limit);
    // Snapshot a batch before applying any marker. Children therefore see their author's original
    // inherited colors rather than a parent that PersianYar has already recolored in this pass.
    for(const el of targets)captureSmartDarkOriginalPaint(el,refreshOriginal);
    for(const el of targets)applySmartDarkElement(el,false);
  }

  function markSmartDarkImmediate(root, limit=220, refreshOriginal=false){
    if(!state.config.smartDarkMode||!document.documentElement?.hasAttribute("data-persianyar-smart-dark-active")||!root)return;
    // MutationObservers run before the next paint. A bounded synchronous pass means newly opened
    // dialogs/menus/routes are dark on their first visible frame instead of flashing white for an
    // idle callback and then switching.
    markSmartDarkSurfaces(root,limit,refreshOriginal);
  }

  function scheduleSmartDarkDeepScan(root, skip=0, refreshOriginal=false){
    if(!state.config.smartDarkMode||!document.documentElement?.hasAttribute("data-persianyar-smart-dark-active")||!root)return;
    const token=++state.smartDarkDeepScanSeq;
    state.smartDarkScanTokens.set(root,token);
    let walker;try{walker=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT)}catch{return}
    let skipped=0,node;while(skipped<skip&&(node=walker.nextNode()))skipped++;
    const run=deadline=>{
      if(state.smartDarkScanTokens.get(root)!==token||!state.config.smartDarkMode||!document.documentElement?.hasAttribute("data-persianyar-smart-dark-active"))return;
      if(root instanceof Element && !root.isConnected)return;
      if(document.visibilityState==="hidden"){setTimeout(()=>run(null),850);return}
      const started=performance.now();const batch=[];
      const batchLimit=smartDarkBudget("deepBatch"),sliceMs=smartDarkBudget("deepSliceMs");
      while(batch.length<batchLimit&&(node=walker.nextNode())){
        if(batch.length>4 && ((deadline?.timeRemaining&&deadline.timeRemaining()<1.5)||performance.now()-started>sliceMs))break;
        if(node instanceof HTMLElement||node instanceof SVGSVGElement)batch.push(node);
      }
      for(const el of batch)captureSmartDarkOriginalPaint(el,refreshOriginal);
      for(const el of batch)applySmartDarkElement(el,false);
      if(node)scheduleSmartDarkBackground(run,false);
      else state.smartDarkInitialPassDone=true;
    };
    scheduleSmartDarkBackground(run,true);
  }

  function smartDarkStylesheetNode(node){
    if(!(node instanceof Element))return false;
    if(node.matches?.("style,link[rel~='stylesheet'],meta[name='theme-color'],meta[name='color-scheme']"))return true;
    return !!node.querySelector?.("style,link[rel~='stylesheet']");
  }

  function scheduleSmartDarkReconcile(reason="mutation", fullRefresh=false){
    if(!state.config.smartDarkMode||!document.documentElement?.hasAttribute("data-persianyar-smart-dark-active"))return;
    const cssEngine=getSmartDarkCssEngine();
    if(cssEngine)cssEngine.scheduleRefresh?.(reason,reason==="stylesheet"?35:70);
    clearTimeout(state.smartDarkRescanTimer);
    clearTimeout(state.smartDarkRescanFollowupTimer);state.smartDarkRescanFollowupTimer=0;
    // CSS-in-JS frameworks may insert many stylesheet nodes in bursts. Repaint the visible shell
    // after the burst and defer any full-document reconciliation to idle time.
    state.smartDarkRescanTimer=setTimeout(()=>{
      state.smartDarkRescanTimer=0;
      if(fullRefresh)state.smartDarkOriginalPaint=new WeakMap();
      markSmartDarkVisibleShell();
      const root=document.documentElement||document;
      setTimeout(()=>{
        if(!state.config.smartDarkMode||!document.documentElement?.hasAttribute("data-persianyar-smart-dark-active"))return;
        scheduleSmartDarkDeepScan(root,0,fullRefresh);
      },reason==="stylesheet"?520:320);
      state.smartDarkLastFullRescan=performance.now();
    },reason==="stylesheet"?180:120);
  }

  function scheduleSmartDarkMarkerCleanup(attrs){
    const seq=++state.smartDarkCleanupSeq;
    const roots=[document,...(state.shadowRoots||[])];
    let rootIndex=0,walker=null,node=null;
    const nextWalker=()=>{
      while(rootIndex<roots.length){
        const root=roots[rootIndex++];
        try{walker=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT);node=null;return true}catch{}
      }
      walker=null;return false;
    };
    nextWalker();
    const run=deadline=>{
      if(seq!==state.smartDarkCleanupSeq||document.documentElement?.hasAttribute("data-persianyar-smart-dark-active"))return;
      const started=performance.now();let visited=0;
      while(walker){
        node=walker.nextNode();
        if(!node){if(!nextWalker())break;continue}
        if(node instanceof Element){for(const attr of attrs)if(node.hasAttribute(attr))node.removeAttribute(attr);clearSmartDarkVars(node)}
        visited++;
        if(visited>=220||performance.now()-started>1.8||(visited>24&&deadline?.timeRemaining&&deadline.timeRemaining()<1.2))break;
      }
      if(walker)scheduleSmartDarkBackground(run,false);
    };
    scheduleSmartDarkBackground(run,true);
  }

  function clearSmartDarkSurfaces(){
    getSmartDarkCssEngine()?.disable?.();
    state.smartDarkDeepScanSeq++;state.smartDarkScanTokens=new WeakMap();
    document.documentElement?.removeAttribute("data-persianyar-darkreader-dynamic");
    document.documentElement?.removeAttribute("data-persianyar-darkreader-version");
    ++state.smartDarkCleanupSeq;
    clearTimeout(state.smartDarkRescanTimer);state.smartDarkRescanTimer=0;
    clearTimeout(state.smartDarkRescanFollowupTimer);state.smartDarkRescanFollowupTimer=0;
    clearTimeout(state.smartDarkInteractionTimer);state.smartDarkInteractionTimer=0;
    for(const timer of state.smartDarkActionTimers)clearTimeout(timer);state.smartDarkActionTimers.clear();
    if(state.smartDarkInteractionFrame)cancelAnimationFrame(state.smartDarkInteractionFrame);state.smartDarkInteractionFrame=0;
    if(state.smartDarkViewportFrame)cancelAnimationFrame(state.smartDarkViewportFrame);state.smartDarkViewportFrame=0;
    clearTimeout(state.smartDarkViewportTimer);state.smartDarkViewportTimer=0;
    state.smartDarkInteractionQueue.clear();
    state.smartDarkMutationRoots.clear();
    if(state.smartDarkMutationFrame)cancelAnimationFrame(state.smartDarkMutationFrame);state.smartDarkMutationFrame=0;
    const attrs=[DARK_SURFACE_ATTR,DARK_TEXT_ATTR,DARK_BORDER_ATTR,DARK_ICON_ATTR,DARK_BEFORE_ATTR,DARK_AFTER_ATTR,DARK_BGIMAGE_ATTR,DARK_SHADOW_ATTR,DARK_LOGO_PART_ATTR,DARK_LOGO_IMAGE_ATTR,DARK_INTERACTIVE_ATTR,DARK_GSC_ROW_ATTR,DARK_OVERLAY_ATTR];
    // The CSS gate is already off, so marker removal does not need to block the toggle interaction.
    // Walk the DOM in tiny background chunks instead of allocating one giant querySelectorAll list.
    scheduleSmartDarkMarkerCleanup(attrs);
    state.darkSurfaceElements.clear();state.darkTextElements.clear();state.darkBorderElements.clear();state.darkIconElements.clear();state.darkLogoImageElements.clear();
    state.smartDarkOriginalPaint=new WeakMap();state.smartDarkInitialPassDone=false;state.smartDarkDarkReaderTheme=null;state.smartDarkDarkReaderThemeSig="";++state.smartDarkInitialPassSeq;globalThis.__PERSIANYAR_DARKREADER_CORE__?.clearCaches?.();syncSmartDarkShadowHostState(false);hideSmartDarkLoading(true);releaseSmartDarkPrepaint();
    if(!state.config.smartDarkMode){state.smartDarkThemeInfo=null;state.smartDarkThemeHint="";}
  }

  function parseRgb(value){
    const raw=String(value||"").trim();
    const m=raw.match(/rgba?\(([^)]+)\)/i);if(!m)return null;
    const body=m[1].replace(/\//g," ");
    const parts=body.split(/[\s,]+/).filter(Boolean);
    if(parts.length<3)return null;
    const channel=v=>String(v).endsWith("%")?Math.max(0,Math.min(255,parseFloat(v)*2.55)):Number(v);
    const r=channel(parts[0]),g=channel(parts[1]),b=channel(parts[2]);
    if(![r,g,b].every(Number.isFinite))return null;
    let a=1;if(parts[3]!=null){a=String(parts[3]).endsWith("%")?parseFloat(parts[3])/100:Number(parts[3]);if(!Number.isFinite(a))a=1}
    return[Math.max(0,Math.min(255,r)),Math.max(0,Math.min(255,g)),Math.max(0,Math.min(255,b)),Math.max(0,Math.min(1,a))];
  }

  function markSoftCorners(root) {
    if (!state.config.softCorners || !root) return;
    const items = [];
    if (root.nodeType === Node.ELEMENT_NODE && root.matches?.(SOFT_CORNER_SELECTOR)) items.push(root);
    root.querySelectorAll?.(SOFT_CORNER_SELECTOR).forEach(el => items.push(el));
    for (const el of items) {
      if (!(el instanceof HTMLElement) || isProtected(el) || el.hasAttribute(SOFT_CORNER_ATTR)) continue;
      const classText = `${el.className || ""} ${el.getAttribute("data-testid") || ""}`;
      if (/(avatar|profile|icon|circle|circular|pill|chip|badge|round(ed)?-full)/i.test(classText)) continue;
      const rect = el.getBoundingClientRect();
      if (rect.width < 48 || rect.height < 24 || rect.height > 160) continue;
      if (Math.abs(rect.width - rect.height) < 7 && rect.width < 72) continue;
      const cs = getComputedStyle(el);
      const radii = [cs.borderTopLeftRadius,cs.borderTopRightRadius,cs.borderBottomLeftRadius,cs.borderBottomRightRadius].map(v=>Number.parseFloat(v)||0);
      if (Math.max(...radii) >= 9) continue;
      el.setAttribute(SOFT_CORNER_ATTR,"1");
      state.softCornerElements.add(el);
    }
  }

  function clearSoftCorners() {
    for (const el of state.softCornerElements) if (el?.isConnected) el.removeAttribute(SOFT_CORNER_ATTR);
    state.softCornerElements.clear();
    document.querySelectorAll?.(`[${SOFT_CORNER_ATTR}]`).forEach(el=>el.removeAttribute(SOFT_CORNER_ATTR));
  }

  function markUniformCornerElement(el) {
    if (!(el instanceof HTMLElement) || isProtected(el) || el.hasAttribute(UNIFORM_CORNER_ATTR)) return;
    if (["HTML","BODY","SCRIPT","STYLE","LINK","META","HEAD"].includes(el.tagName)) return;
    const rect = el.getBoundingClientRect();
    if (rect.width < 10 || rect.height < 10 || rect.width * rect.height < 180) return;
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") return;
    const radii = [cs.borderTopLeftRadius,cs.borderTopRightRadius,cs.borderBottomLeftRadius,cs.borderBottomRightRadius].map(v=>Number.parseFloat(v)||0);
    if (Math.max(...radii) < .5) return;
    const classText = `${el.className || ""} ${el.getAttribute("data-testid") || ""}`;
    const circleLike = Math.abs(rect.width - rect.height) < 5 && Math.max(...radii) >= Math.min(rect.width,rect.height) * .38;
    if (circleLike && /(avatar|profile|icon|circle|badge)/i.test(classText)) return;
    el.setAttribute(UNIFORM_CORNER_ATTR,"1");
    state.uniformCornerElements.add(el);
  }

  function markUniformCorners(root) {
    if (!state.config.uniformCornersEnabled || !root) return;
    if(root.nodeType===Node.TEXT_NODE){markUniformCornerElement(root.parentElement);return}
    if(state.uniformCornerScanRoots.has(root))return;
    state.uniformCornerScanRoots.add(root);
    if(root.nodeType===Node.ELEMENT_NODE)markUniformCornerElement(root);
    let walker;try{walker=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT)}catch{state.uniformCornerScanRoots.delete(root);return}
    let node;
    const run=deadline=>{
      if(!state.config.uniformCornersEnabled){state.uniformCornerScanRoots.delete(root);return}
      const started=performance.now();let count=0;
      while(count<64&&(node=walker.nextNode())){
        markUniformCornerElement(node);count++;
        if(count>8&&((deadline?.timeRemaining&&deadline.timeRemaining()<2)||performance.now()-started>3.2))break;
      }
      if(node){
        if(typeof requestIdleCallback==="function")requestIdleCallback(run,{timeout:450});else setTimeout(()=>run(null),48);
      } else state.uniformCornerScanRoots.delete(root);
    };
    if(typeof requestIdleCallback==="function")requestIdleCallback(run,{timeout:260});else setTimeout(()=>run(null),32);
  }

  function clearUniformCorners() {
    for (const el of state.uniformCornerElements) if (el?.isConnected) el.removeAttribute(UNIFORM_CORNER_ATTR);
    state.uniformCornerElements.clear();
    document.querySelectorAll?.(`[${UNIFORM_CORNER_ATTR}]`).forEach(el=>el.removeAttribute(UNIFORM_CORNER_ATTR));
  }

  function applyEmojiConfig(previous, config) {
    purgeLegacyEmojiAliases();
    if (previous?.emojiEnabled === config.emojiEnabled && previous?.emojiStyle === config.emojiStyle) return;
    document.getElementById(EMOJI_STYLE_ID)?.remove();
    document.documentElement?.removeAttribute("data-fontyar-emoji-enabled");

    // Previous builds could register emoji faces for editable controls. The background now treats
    // those compatibility messages as no-ops; this build never mutates editable typography.
    // One-time migration cleanup for attributes/custom properties used by older builds.
    document.querySelectorAll?.('[data-fontyar-form-emoji]').forEach(el => {
      el.removeAttribute('data-fontyar-form-emoji');
      el.style?.removeProperty?.('--fontyar-input-base-font');
    });

    if (!config.emojiEnabled) {
      state.emojiPrewarmStyle = "";
      restoreSemanticEmojiElements();
      restoreEmojiImages();
      unwrapEmojiSpans();
      syncAllShadowStyles();
      return;
    }

    document.documentElement?.setAttribute("data-fontyar-emoji-enabled", "1");
    if (previous?.emojiStyle !== config.emojiStyle) state.emojiPrewarmStyle = "";
    requestEmoji(config.emojiStyle);

    // Native editables are intentionally left completely untouched. HTML input/textarea values
    // cannot be wrapped character-by-character, and changing their font-family (even with an
    // emoji-only unicode-range face) can alter caret metrics, bidi layout and baseline.
    // PersianYar therefore styles emoji only in non-editable page text and explicit emoji assets.
    const stack = (EMOJI_STYLES[config.emojiStyle]?.stack || EMOJI_STYLES.system.stack).map(x => `"${escapeCss(x)}"`).join(",");
    const style = document.createElement("style");
    style.id = EMOJI_STYLE_ID;
    const escope = 'html[data-fontyar-emoji-enabled="1"][data-fontyar-emoji-enabled="1"]';
    style.textContent = [
      // Static page text: only switch the emoji glyph source. Do not set display, size, line-height,
      // vertical-align, tracking, margins or transforms; those belong to the host page.
      `${escope} .${EMOJI_CLASS},${escope} [${EMOJI_ATTR}="1"]{font-family:${stack},sans-serif!important;font-style:normal!important;}`,
      // Semantic SVG/background emoji keep the site's exact box/position. Only the painted image
      // is replaced; no position, size, line-height, margin, flex or baseline rule is touched.
      `${escope} [${EMOJI_SEMANTIC_ATTR}="1"]{background-image:var(--fontyar-semantic-emoji-image)!important;background-size:contain!important;background-repeat:no-repeat!important;background-position:center!important;mask-image:none!important;-webkit-mask-image:none!important;}`,
      `${escope} [${EMOJI_SEMANTIC_ATTR}="1"]>:is(svg,img,picture){opacity:0!important;}`
    ].join("\n");
    (document.head || document.documentElement).append(style);
    scanEmojiNode(document.documentElement || document);
    syncAllShadowStyles();
  }

  function purgeLegacyEmojiAliases() {
    if (state.legacyEmojiAliasesPurged) return;
    state.legacyEmojiAliasesPurged = true;
    chrome.runtime.sendMessage({
      type:"fontyar:purge-legacy-emoji-form-aliases",
      documentToken:DOCUMENT_TOKEN
    }).catch(() => {});
  }

  function isEditableSafe(el) {
    try {
      if (!el || el.closest("svg,math,code,pre,kbd,samp,canvas,[class*='monaco-editor'],[class*='CodeMirror'],[class*='codemirror']")) return false;
      if (el.matches("[class*='material-icons'],[class*='material-symbols'],[class*='fontawesome'],[class~='fa'],[class^='fa-'],[data-icon],[data-lucide]")) return false;
      return true;
    } catch { return false; }
  }

  function requestFont(fontKey, script) {
    const signature = `${fontKey}:${script}`;
    if (state.requestedFonts.has(signature)) return;
    state.requestedFonts.add(signature);
    chrome.runtime.sendMessage({ type:"fontyar:ensure-font", fontKey, script, documentToken:DOCUMENT_TOKEN }).then((response) => {
      if (!response?.ok) { state.requestedFonts.delete(signature); return; }
      // The background path already waits for downloadable FontFace bytes to load. Avoid waiting on
      // document.fonts.ready or forcing offsetWidth: either can pull unrelated lazy host webfonts
      // into the same task and surface the site's own decode/OTS failures in our call stack.
      syncAllShadowStyles();
    }).catch(() => state.requestedFonts.delete(signature));
  }

  function requestEmoji(styleKey, attempt = 0) {
    if (state.requestedEmoji.has(styleKey)) return;
    state.requestedEmoji.add(styleKey);
    chrome.runtime.sendMessage({ type:"fontyar:ensure-emoji", styleKey, documentToken:DOCUMENT_TOKEN }).then((response) => {
      if (!response?.ok) throw new Error(response?.error || "Emoji style registration failed");
      // Background registration already awaits FontFace.load() for downloadable packs. Avoid
      // document.fonts.load(), document.fonts.ready and forced layout reads here: those can wake
      // unrelated lazy @font-face rules owned by the host page (Bale included).
      state.loadedEmojiStyles.add(styleKey);
      scheduleEmojiReactionPrewarm(styleKey);
      scanEmojiNode(document.documentElement || document);
      syncAllShadowStyles();
    }).catch(() => {
      state.requestedEmoji.delete(styleKey);
      // A service-worker wakeup or transient network/cache miss can make the first registration
      // lose a race on newly opened tabs. Retry once, but only if this style is still selected.
      if (attempt < 1 && state.config.emojiEnabled && state.config.emojiStyle === styleKey) {
        setTimeout(() => requestEmoji(styleKey, attempt + 1), 900);
      }
    });
  }

  function detectPageScript() {
    const lang = String(document.documentElement?.lang || "").toLowerCase();
    if (lang.startsWith("fa")) return "fa";
    if (lang.startsWith("ar")) return "ar";
    if (lang.startsWith("zh")) return "zh";
    if (lang.startsWith("en")) return "en";
    const sample = String(document.title || "") + " " + String(document.body?.innerText || "").slice(0, 1800);
    const counts = { fa:0, en:0, zh:0 };
    for (const ch of sample) {
      if (PERSIAN_ARABIC_RE.test(ch)) counts.fa++;
      else if (HAN_RE.test(ch)) counts.zh++;
      else if (LATIN_RE.test(ch)) counts.en++;
    }
    if (counts.zh > counts.en && counts.zh > counts.fa) return "zh";
    if (counts.fa > counts.en) return "fa";
    return "en";
  }

  function applySizeConfig(previous, config) {
    if (!config.fontDelta) {
      restoreSizes();
      return;
    }
    if (!previous.fontDelta) snapshotAndApplySizes(document.documentElement || document);
    if (!previous.fontDelta || previous.fontDelta !== config.fontDelta) updateSizeMetrics(config.fontDelta);
  }

  function updateSizeMetrics(delta) {
    for (const [el, record] of state.sizeRecords) {
      if (!el?.isConnected) continue;
      if (!record.scaleLineHeight || !Number.isFinite(record.baseLineHeight) || !Number.isFinite(record.baseFontSize) || record.baseFontSize <= 0) {
        el.removeAttribute(LINE_HEIGHT_ATTR);
        el.style.removeProperty("--fontyar-target-line-height");
        continue;
      }
      const targetSize = Math.max(5, record.baseFontSize + delta);
      const baseRatio = Math.max(1.08, Math.min(2.4, record.baseLineHeight / record.baseFontSize));
      const ratio = delta > 0 ? Math.max(baseRatio, record.minLineRatio || 1.2) : baseRatio;
      const targetLineHeight = targetSize * Math.min(2.2, ratio);
      el.style.setProperty("--fontyar-target-line-height", `${targetLineHeight.toFixed(3)}px`);
      el.setAttribute(LINE_HEIGHT_ATTR, "1");
    }
  }

  function snapshotAndApplySizes(root) {
    if (!root || !state.config.fontDelta) return;
    if(root.nodeType===Node.TEXT_NODE){registerSizeElement(root.parentElement);return}
    if(state.sizeScanRoots.has(root))return;
    state.sizeScanRoots.add(root);
    if(root.nodeType===Node.ELEMENT_NODE&&root.matches?.(FORM_TEXT_CONTROLS))registerSizeElement(root);
    // Inputs without text nodes are uncommon and cheap to discover; cap this fast path.
    let formCount=0;root.querySelectorAll?.(FORM_TEXT_CONTROLS).forEach(el=>{if(formCount++<48)registerSizeElement(el)});
    let walker;try{walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(node){const el=node.parentElement;if(!el||!node.nodeValue?.trim()||isFontProtected(el))return NodeFilter.FILTER_REJECT;return NodeFilter.FILTER_ACCEPT;}})}catch{state.sizeScanRoots.delete(root);return}
    let node;
    const run=(deadline,initial=false)=>{
      if(!state.config.fontDelta){state.sizeScanRoots.delete(root);return}
      const started=performance.now();let count=0;
      while(count<(initial?90:120)&&(node=walker.nextNode())){
        registerSizeElement(node.parentElement);count++;
        if(count>10&&((deadline?.timeRemaining&&deadline.timeRemaining()<2)||performance.now()-started>(initial?3:4)))break;
      }
      if(node){
        if(typeof requestIdleCallback==="function")requestIdleCallback(d=>run(d,false),{timeout:420});else setTimeout(()=>run(null,false),42);
      } else state.sizeScanRoots.delete(root);
    };
    run(null,true);
  }

  function registerSizeElement(el) {
    if (!(el instanceof HTMLElement) || isProtected(el) || state.sizeRecords.has(el)) return;
    if (!hasDirectReadableText(el) && !["INPUT","TEXTAREA","SELECT","BUTTON"].includes(el.tagName)) return;
    const cs = getComputedStyle(el);
    const computed = Number.parseFloat(cs.fontSize);
    if (!Number.isFinite(computed) || computed < 5 || computed > 160) return;
    const ancestor = el.parentElement?.closest?.(`[${SIZE_ATTR}="1"]`);
    let base = computed;
    if (ancestor && state.config.fontDelta) {
      const inherited = Number.parseFloat(getComputedStyle(ancestor).fontSize);
      if (Math.abs(inherited - computed) < .2) base = Math.max(5, computed - state.config.fontDelta);
    }
    let baseLineHeight = Number.parseFloat(cs.lineHeight);
    // If this node was discovered after a size offset was already active, computed line-height can
    // already include the offset through inheritance. Convert it back to the original ratio.
    if (Number.isFinite(baseLineHeight) && state.config.fontDelta && computed > 0) {
      const currentBase = Math.max(5, computed - state.config.fontDelta);
      baseLineHeight = baseLineHeight * (currentBase / computed);
    }
    const safeLineHeight = Number.isFinite(baseLineHeight) && baseLineHeight >= 5 && baseLineHeight <= 320 ? baseLineHeight : NaN;
    const scaleLineHeight = shouldScaleLineHeight(el, cs, base, safeLineHeight);
    const record = {
      inline: el.style.getPropertyValue("font-size"),
      priority: el.style.getPropertyPriority("font-size"),
      baseFontSize: base,
      baseLineHeight: safeLineHeight,
      scaleLineHeight,
      minLineRatio: scaleLineHeight ? preferredLineRatio(el, base) : 0
    };
    state.sizeRecords.set(el, record);
    el.style.setProperty("--fontyar-base-size", `${base}px`);
    if (record.scaleLineHeight && Number.isFinite(record.baseLineHeight)) {
      const baseRatio = Math.max(1.08, Math.min(2.4, record.baseLineHeight / Math.max(base, .1)));
      const ratio = state.config.fontDelta > 0 ? Math.max(baseRatio, record.minLineRatio || 1.2) : baseRatio;
      const target = Math.max(5, base + state.config.fontDelta) * Math.min(2.2, ratio);
      el.style.setProperty("--fontyar-target-line-height", `${target.toFixed(3)}px`);
      el.setAttribute(LINE_HEIGHT_ATTR, "1");
    } else {
      el.removeAttribute(LINE_HEIGHT_ATTR);
      el.style.removeProperty("--fontyar-target-line-height");
    }
    el.setAttribute(SIZE_ATTR, "1");
  }

  function shouldScaleLineHeight(el, cs, baseFontSize, baseLineHeight) {
    if (!(el instanceof HTMLElement) || !Number.isFinite(baseLineHeight)) return false;
    if (el.matches(FORM_TEXT_CONTROLS) || el.closest?.("button,[role='button'],[role='menuitem'],[role='tab'],[role='option'],[role='switch'],[role='checkbox']")) return false;
    if (el.matches("a,button,summary,select,option,input,textarea")) return false;
    if (baseFontSize > 48) return false;
    const display = String(cs.display || "");
    const text = String(el.textContent || "").trim();
    if (!text) return false;
    // Fixed one-line chips/counters should keep the site's geometry. For ordinary inline spans,
    // scaling line-height is important because SPA text is often nested inside spans while the block
    // parent keeps a fixed px line-height; increasing only font-size otherwise makes lines collide.
    if (String(cs.whiteSpace || "").includes("nowrap") && text.length < 72) return false;
    if (Number(cs.height?.replace?.("px", "")) > 0 && cs.overflowY === "hidden" && el.scrollHeight <= el.clientHeight + 2 && text.length < 96) return false;
    if (["inline-flex","inline-grid","contents"].includes(display)) return false;
    if (display === "inline") return text.length >= 3;
    return el.matches("p,li,dt,dd,blockquote,figcaption,caption,td,th,h1,h2,h3,h4,h5,h6,span,div,[role='text'],[role='heading']") || hasDirectReadableText(el);
  }

  function preferredLineRatio(el, baseFontSize) {
    const text = String(el?.textContent || "").slice(0, 520);
    const rtl = detectStrongDirection(text) === "rtl";
    if (baseFontSize >= 30) return rtl ? 1.22 : 1.18;
    if (baseFontSize >= 22) return rtl ? 1.30 : 1.24;
    if (baseFontSize >= 17) return rtl ? 1.40 : 1.32;
    return rtl ? 1.46 : 1.36;
  }

  function restoreSizes() {
    for (const [el, record] of state.sizeRecords) {
      if (!el?.isConnected) continue;
      el.removeAttribute(SIZE_ATTR);
      el.removeAttribute(LINE_HEIGHT_ATTR);
      el.style.removeProperty("--fontyar-base-size");
      el.style.removeProperty("--fontyar-target-line-height");
      if (record.inline) el.style.setProperty("font-size", record.inline, record.priority || "");
      else el.style.removeProperty("font-size");
    }
    state.sizeRecords.clear();
  }

  function applyTextFeatureConfig(previous, config) {
    const active = hasTextFeatures(config);
    if (previous.digitFontDelta && (!config.digitFontDelta || previous.digitFontDelta !== config.digitFontDelta)) clearDigitSizeMarks();
    if (!active) {
      restoreTextRecords();
      restoreAttributes();
      clearRtlMarks();
      clearRtlLayoutMarks();
      clearDigitSizeMarks();
      return;
    }
    if (!config.bidiRepair && !config.localizeEnabled && !config.rtlBeta && !config.layoutEnhance) clearRtlMarks();
    if (!config.rtlBeta) clearAutoRtlMarks();
    if (!config.layoutEnhance) clearRtlFlowMarks();
    scanTextFeatures(document.documentElement || document);
  }

  function hasTextFeatures(config) {
    return config.digitMode !== "preserve" || config.digitFontDelta !== 0 || config.zwnjMode !== "preserve" || config.bidiRepair || config.rtlBeta || config.layoutEnhance || config.localizeEnabled;
  }

  function scanTextFeatures(root) {
    if (!root || !hasTextFeatures(state.config)) return;
    if(state.config.rtlBeta)primeSmartRtl(root, root===document.documentElement?1400:360);
    if (root.nodeType === Node.TEXT_NODE) {
      processTextNode(root);
      if (state.config.bidiRepair || state.config.rtlBeta || state.config.layoutEnhance) repairProseStructure(root.parentElement || document);
      return;
    }
    if (root.nodeType === Node.ELEMENT_NODE) processElementAttributes(root);
    if (![Node.ELEMENT_NODE, Node.DOCUMENT_NODE, Node.DOCUMENT_FRAGMENT_NODE].includes(root.nodeType)) return;
    if(state.textScanRoots.has(root))return;
    state.textScanRoots.add(root);
    let walker;try{walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(node){if(!node.nodeValue?.trim()||!node.parentElement||shouldSkipTextElement(node.parentElement))return NodeFilter.FILTER_REJECT;return NodeFilter.FILTER_ACCEPT;}})}catch{state.textScanRoots.delete(root);return}
    let node;
    const finish=()=>{
      if(state.config.localizeEnabled){
        const selector=getHost()==="studio.youtube.com"?"[aria-label],[title],[placeholder],[aria-placeholder],[data-placeholder],[label],[text],[tooltip-text],[aria-description]":"[aria-label],[title],[placeholder],[aria-placeholder],[data-placeholder],[aria-description]";
        let count=0;root.querySelectorAll?.(selector).forEach(el=>{if(count++<800)processElementAttributes(el)});
      }
      if(state.config.bidiRepair||state.config.rtlBeta||state.config.layoutEnhance)repairProseStructure(root);
      if(state.config.rtlBeta){primeSmartRtl(root,720);markRtlControls(root)}
      else if(state.config.layoutEnhance)markRtlControls(root);
      state.textScanRoots.delete(root);
    };
    const run=(deadline,initial=false)=>{
      if(!hasTextFeatures(state.config)){state.textScanRoots.delete(root);return}
      const started=performance.now();let count=0;
      while(count<(initial?100:150)&&(node=walker.nextNode())){
        processTextNode(node);count++;
        if(count>12&&((deadline?.timeRemaining&&deadline.timeRemaining()<2)||performance.now()-started>(initial?3:4.5)))break;
      }
      if(node){
        if(typeof requestIdleCallback==="function")requestIdleCallback(d=>run(d,false),{timeout:400});else setTimeout(()=>run(null,false),38);
      } else finish();
    };
    run(null,true);
  }

  function processTextNode(node) {
    const parent = node.parentElement;
    if (!parent || shouldSkipTextElement(parent)) return;
    let record = state.textRecords.get(node);
    if (record && node.data !== record.last) record.original = node.data;
    if (!record) { record = { original: node.data, last: node.data }; state.textRecords.set(node, record); }
    let next = record.original;
    if (state.config.localizeEnabled && shouldLocalizePage() && isLikelyUiText(parent, next)) next = localizeExact(next);
    next = transformDigits(next, state.config.digitMode);
    next = transformZwnj(next, state.config.zwnjMode);
    if (node.data !== next) node.data = next;
    record.last = next;
    let bidiRepairActive = false;
    // Localization is text-only and must never change responsive geometry on its own. Directional
    // repair is owned by the explicit bidi/Auto RTL/Layout switches. This prevents a translated
    // nav label from changing flex/grid direction merely because its replacement text is Persian.
    const structuralRtlEnabled = state.config.bidiRepair || state.config.rtlBeta || state.config.layoutEnhance;
    if (state.config.bidiRepair) {
      bidiRepairActive = !parent.closest?.(EDITABLE_ROOTS) && detectStructuralDirection(next) === "rtl";
      parent.toggleAttribute(RTL_TEXT_ATTR, bidiRepairActive);
    } else parent.removeAttribute(RTL_TEXT_ATTR);
    if (structuralRtlEnabled) {
      const structuralRtl = !parent.closest?.(EDITABLE_ROOTS) && detectStructuralDirection(next) === "rtl";
      applyBidiStructureRepair(parent, next, structuralRtl);
    } else clearBidiStructureNear(parent);
    if (state.config.rtlBeta || state.config.layoutEnhance) applySmartRtl(parent, next);
    else {
      parent.removeAttribute(RTL_LAYOUT_ATTR);
      parent.removeAttribute(RTL_ALIGN_ATTR);
      parent.removeAttribute(RTL_FLOW_ATTR);
    }
    if (state.config.digitFontDelta) markDigitSizedElement(parent, next);
    else parent.removeAttribute(DIGIT_SIZE_ATTR);
  }

  const BIDI_STRUCTURE_BLOCKS = "p,li,dt,dd,blockquote,figcaption,h1,h2,h3,h4,h5,h6,summary,[role='paragraph'],[role='text'],[role='heading'],[role='status'],[role='alert'],[role='listitem']";
  const BIDI_LIST_SELECTOR = "ul,ol,[role='list']";
  const BIDI_LIST_ITEM_SELECTOR = "li,[role='listitem']";
  const CHATGPT_BIDI_HARD_SKIP = `pre,code,kbd,samp,svg,math,canvas,script,style,noscript,template,${EDITABLE_ROOTS}`;

  function findBidiStructureHost(el) {
    let node = el instanceof HTMLElement ? el : null;
    for (let depth = 0; node && depth < 10; depth++, node = node.parentElement) {
      if (isProtected(node) || node.closest?.(EDITABLE_ROOTS)) return null;
      if (node.matches?.(BIDI_STRUCTURE_BLOCKS)) return node;
      // Leaf DIVs are safe fallback paragraph containers. Do not mark DIVs with element children:
      // author CSS may make them flex/grid shells, where changing direction could alter UI geometry.
      if (node.tagName === "DIV" && node.children.length === 0 && hasDirectReadableText(node)) return node;
      if (node.matches?.("main,article,section,nav,header,footer,aside,[role='main'],[role='navigation'],[role='toolbar']")) return null;
    }
    return null;
  }

  function detectStructuralDirection(text) {
    const raw = String(text || "");
    if (!raw.trim()) return "neutral";
    // URLs, e-mail addresses and long technical identifiers are strongly LTR but should not make a
    // Persian paragraph look LTR. Remove those noisy tokens before deciding the paragraph's base
    // writing direction; inline Latin runs still keep their own bidi order inside an RTL block.
    const value = raw
      .replace(/https?:\/\/\S+|www\.\S+|\b[^\s@]+@[^\s@]+\.[^\s@]+\b/giu, " ")
      .replace(/`[^`]*`/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 3200);
    if (!value) return "neutral";

    const rtlRuns = value.match(/[\p{Script_Extensions=Arabic}][\p{Script_Extensions=Arabic}\p{Mark}\u200c\u200d]*/gu) || [];
    const latinRuns = value.match(/[A-Za-z][A-Za-z0-9_+.#\/-]*/g) || [];
    let rtlLetters = 0, latinLetters = 0;
    for (const run of rtlRuns) rtlLetters += (run.match(/\p{Letter}/gu) || []).length;
    for (const run of latinRuns) latinLetters += (run.match(/[A-Za-z]/g) || []).length;

    let firstStrong = "neutral";
    for (const ch of value) {
      if (!/\p{Letter}/u.test(ch)) continue;
      if (/\p{Script_Extensions=Arabic}/u.test(ch)) firstStrong = "rtl";
      else if (/\p{Script_Extensions=Latin}/u.test(ch) || HAN_RE.test(ch)) firstStrong = "ltr";
      if (firstStrong !== "neutral") break;
    }

    const totalRuns = rtlRuns.length + latinRuns.length;
    const totalLetters = rtlLetters + latinLetters;
    const runRatio = totalRuns ? rtlRuns.length / totalRuns : 0;
    const letterRatio = totalLetters ? rtlLetters / totalLetters : 0;

    // Mixed Persian technical prose often starts with an English product/company name and contains
    // many Latin model names. Word/run weighting is deliberately more tolerant than raw letter
    // majority so "OpenAI: ... فارسی ... GPT-6 ..." still gets the correct RTL paragraph base.
    if (rtlRuns.length >= 2 && rtlLetters >= 6) {
      if (firstStrong === "rtl" && (runRatio >= 0.24 || letterRatio >= 0.22)) return "rtl";
      if (rtlRuns.length >= 3 && (runRatio >= 0.30 || letterRatio >= 0.28)) return "rtl";
      if (rtlRuns.length >= latinRuns.length * 0.55 && rtlLetters >= 12) return "rtl";
    }
    if (latinRuns.length >= 2 && latinLetters >= 6) {
      const latinRunRatio = totalRuns ? latinRuns.length / totalRuns : 0;
      const latinLetterRatio = totalLetters ? latinLetters / totalLetters : 0;
      if (firstStrong === "ltr" && (latinRunRatio >= 0.58 || latinLetterRatio >= 0.62)) return "ltr";
      if (latinRunRatio >= 0.72 && latinLetterRatio >= 0.72) return "ltr";
    }
    return detectStrongDirection(value);
  }

  function elementTextDirection(el, fallback = "") {
    if (!(el instanceof Element)) return detectStructuralDirection(fallback);
    // textContent is intentionally used instead of innerText/getComputedStyle: this path can run on
    // many text nodes in large SPA responses and must not force layout/reflow.
    const sample = String(el.textContent || fallback || "").replace(/\s+/g, " ").trim().slice(0, 3200);
    return detectStructuralDirection(sample);
  }

  function rememberAndSetBidiDir(el, value = "rtl") {
    if (!(el instanceof HTMLElement)) return;
    let record = state.bidiDirRecords.get(el);
    if (!record) {
      record = { had: el.hasAttribute("dir"), value: el.getAttribute("dir"), applied: "" };
      state.bidiDirRecords.set(el, record);
    } else if (record.applied && el.getAttribute("dir") !== record.applied) {
      // If the application changed dir while PersianYar was active, keep that newer value as the
      // value to restore later, then apply the repair again.
      record.had = el.hasAttribute("dir");
      record.value = el.getAttribute("dir");
    }
    record.applied = value;
    if (el.getAttribute("dir") !== value) el.setAttribute("dir", value);
  }

  function restoreBidiDir(el) {
    if (!(el instanceof HTMLElement)) return;
    const record = state.bidiDirRecords.get(el);
    if (!record) return;
    if (el.getAttribute("dir") === record.applied) {
      if (record.had) el.setAttribute("dir", record.value ?? "");
      else el.removeAttribute("dir");
    }
    state.bidiDirRecords.delete(el);
  }

  function rememberAndSetBidiVisual(el, options = {}) {
    if (!(el instanceof HTMLElement)) return;
    const wanted = {
      direction: options.direction ?? "rtl",
      "text-align": options.textAlign ?? "right",
      "unicode-bidi": options.unicodeBidi ?? null
    };
    let record = state.bidiStyleRecords.get(el);
    if (!record) {
      record = {};
      for (const prop of Object.keys(wanted)) {
        record[prop] = {
          value: el.style.getPropertyValue(prop),
          priority: el.style.getPropertyPriority(prop),
          applied: null
        };
      }
      state.bidiStyleRecords.set(el, record);
    }
    for (const [prop, value] of Object.entries(wanted)) {
      if (value == null) continue;
      const slot = record[prop] || (record[prop] = {value:"",priority:"",applied:null});
      // If the application changed an inline property while PersianYar was active, preserve the
      // newer application value for restoration instead of overwriting it permanently.
      if (slot.applied != null) {
        const current = el.style.getPropertyValue(prop);
        const priority = el.style.getPropertyPriority(prop);
        if (current !== slot.applied || priority !== "important") {
          slot.value = current;
          slot.priority = priority;
        }
      }
      slot.applied = String(value);
      el.style.setProperty(prop, String(value), "important");
    }
  }

  function restoreBidiVisual(el) {
    if (!(el instanceof HTMLElement)) return;
    const record = state.bidiStyleRecords.get(el);
    if (!record) return;
    for (const [prop, slot] of Object.entries(record)) {
      if (slot.applied == null) continue;
      const current = el.style.getPropertyValue(prop);
      const priority = el.style.getPropertyPriority(prop);
      if (current === slot.applied && priority === "important") {
        if (slot.value) el.style.setProperty(prop, slot.value, slot.priority || "");
        else el.style.removeProperty(prop);
      }
    }
    state.bidiStyleRecords.delete(el);
  }

  function refreshBidiListStructure(list, allowTextProbe = true) {
    if (!(list instanceof HTMLElement) || !list.matches(BIDI_LIST_SELECTOR) || isProtected(list) || list.closest?.(EDITABLE_ROOTS)) return;
    let rtl = 0, ltr = 0, seen = 0;
    for (const child of list.children) {
      if (!(child instanceof HTMLElement) || !child.matches(BIDI_LIST_ITEM_SELECTOR)) continue;
      let dir;
      if (allowTextProbe) dir = elementTextDirection(child);
      else dir = child.hasAttribute(RTL_STRUCTURE_ATTR) ? "rtl" : "ltr";
      if (dir === "rtl") rtl++;
      else if (dir === "ltr") ltr++;
      if (++seen >= 36) break;
    }
    // The list container owns the outside marker rail. Applying a real HTML dir attribute here is
    // intentional: it lets the browser position bullets/numbers on the RTL start edge even on sites
    // whose author CSS keeps a physical left padding or uses dir=auto on descendants.
    const listRtl = rtl > 0 && rtl >= ltr;
    list.toggleAttribute(RTL_STRUCTURE_ATTR, listRtl);
    if (listRtl) {
      rememberAndSetBidiDir(list, "rtl");
      rememberAndSetBidiVisual(list, { direction:"rtl", textAlign:"right", unicodeBidi:"isolate" });
    } else {
      restoreBidiDir(list);
      restoreBidiVisual(list);
    }
  }

  function isChatGptHost(host = getHost()) {
    const h = String(host || "").toLowerCase();
    return h === "chatgpt.com" || h.endsWith(".chatgpt.com") || h === "chat.openai.com" || h.endsWith(".chat.openai.com");
  }

  function chatGptPersianDirection(el, fallback = "") {
    const value = String(el instanceof Element ? (el.textContent || fallback || "") : (fallback || ""))
      .replace(/https?:\/\/\S+|www\.\S+|\b[^\s@]+@[^\s@]+\.[^\s@]+\b/giu, " ")
      .replace(/`[^`]*`/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 4200);
    if (!value) return "neutral";

    const normal = detectStructuralDirection(value);
    if (normal === "rtl") return "rtl";

    // Technical Persian answers frequently start with OpenAI/Google/product names and can contain
    // enough Latin model identifiers to make a strict letter-majority detector return LTR. For
    // ChatGPT prose only, accept a lower RTL ratio when there are multiple real Arabic-script words.
    const rtlWords = value.match(/[\p{Script_Extensions=Arabic}][\p{Script_Extensions=Arabic}\p{Mark}\u200c\u200d]{1,}/gu) || [];
    const rtlLetters = (value.match(/[\p{Script_Extensions=Arabic}]/gu) || []).length;
    const latinLetters = (value.match(/[A-Za-z]/g) || []).length;
    if (rtlWords.length >= 2 && rtlLetters >= 8) {
      const ratio = rtlLetters / Math.max(1, rtlLetters + latinLetters);
      if (ratio >= 0.14 || rtlLetters >= latinLetters * 0.22) return "rtl";
    }
    return normal;
  }

  function collectChatGptAssistantProseRoots(root) {
    if (!isChatGptHost() || !root) return [];
    const roots = [];
    const add = el => {
      if (!(el instanceof HTMLElement) || roots.includes(el)) return;
      const assistant = el.closest?.('[data-message-author-role="assistant"],article[data-turn="assistant"],section[data-turn="assistant"],[data-role="assistant"],[data-message-author="assistant"],.agent-turn');
      if (!(assistant instanceof HTMLElement)) return;
      roots.push(el);
    };
    const selector = '[data-message-author-role="assistant"] .markdown,article[data-turn="assistant"] .markdown,section[data-turn="assistant"] .markdown,[data-role="assistant"] .markdown,[data-message-author="assistant"] .markdown,.agent-turn .markdown';
    if (root.nodeType === Node.ELEMENT_NODE) {
      const el = root;
      if (el.matches?.('.markdown,[data-markdown]')) add(el);
      add(el.closest?.('.markdown,[data-markdown]'));
    }
    try {
      root.querySelectorAll?.(selector).forEach(el => { if (roots.length < 24) add(el); });
    } catch {}
    return roots;
  }

  function repairChatGptPersianProse(root) {
    if (!isChatGptHost() || !(state.config.bidiRepair || state.config.rtlBeta || state.config.layoutEnhance)) return;
    const proseRoots = collectChatGptAssistantProseRoots(root);
    for (const prose of proseRoots) {
      if (!prose.isConnected || prose.closest?.(CHATGPT_BIDI_HARD_SKIP)) continue;
      const blocks = prose.querySelectorAll?.('p,li,dt,dd,blockquote,figcaption,h1,h2,h3,h4,h5,h6,summary,[role="paragraph"],[role="text"],[role="heading"],[role="status"],[role="alert"],[role="listitem"]');
      let rtlBlocks = 0, ltrBlocks = 0, seenBlocks = 0;
      if (blocks) {
        for (const block of blocks) {
          if (!(block instanceof HTMLElement) || block.closest?.(CHATGPT_BIDI_HARD_SKIP)) continue;
          const dir = chatGptPersianDirection(block);
          const rtl = dir === "rtl";
          block.toggleAttribute(CHATGPT_RTL_BLOCK_ATTR, rtl);
          if (rtl) {
            block.setAttribute(RTL_STRUCTURE_ATTR, "1");
            rememberAndSetBidiDir(block, "rtl");
            rememberAndSetBidiVisual(block, {direction:"rtl", textAlign:"right", unicodeBidi:"isolate"});
            rtlBlocks++;
          } else {
            if (!block.hasAttribute(RTL_STRUCTURE_ATTR)) {
              restoreBidiDir(block);
              restoreBidiVisual(block);
            }
            if (dir === "ltr") ltrBlocks++;
          }
          if (++seenBlocks >= 520) break;
        }
      }

      const rootDir = chatGptPersianDirection(prose);
      const proseRtl = rootDir === "rtl" || (rtlBlocks > 0 && rtlBlocks >= Math.max(1, ltrBlocks));
      prose.toggleAttribute(CHATGPT_RTL_PROSE_ATTR, proseRtl);
      if (proseRtl) {
        prose.setAttribute(RTL_PROSE_ATTR, "1");
        rememberAndSetBidiDir(prose, "rtl");
        rememberAndSetBidiVisual(prose, {direction:"rtl", textAlign:"right", unicodeBidi:"isolate"});
      } else {
        prose.removeAttribute(CHATGPT_RTL_PROSE_ATTR);
        if (!prose.hasAttribute(RTL_PROSE_ATTR)) {
          restoreBidiDir(prose);
          restoreBidiVisual(prose);
        }
      }

      let listCount = 0;
      prose.querySelectorAll?.(BIDI_LIST_SELECTOR).forEach(list => {
        if (listCount++ >= 96 || !(list instanceof HTMLElement) || list.closest?.(CHATGPT_BIDI_HARD_SKIP)) return;
        let rtlItems = 0, ltrItems = 0, itemCount = 0;
        for (const child of list.children) {
          if (!(child instanceof HTMLElement) || !child.matches?.(BIDI_LIST_ITEM_SELECTOR)) continue;
          const dir = chatGptPersianDirection(child);
          if (dir === "rtl") rtlItems++;
          else if (dir === "ltr") ltrItems++;
          if (++itemCount >= 48) break;
        }
        const listDir = chatGptPersianDirection(list);
        const listRtl = listDir === "rtl" || (rtlItems > 0 && rtlItems >= Math.max(1, ltrItems)) || (proseRtl && rtlItems > 0 && ltrItems === 0);
        list.toggleAttribute(CHATGPT_RTL_LIST_ATTR, listRtl);
        if (listRtl) {
          list.setAttribute(RTL_STRUCTURE_ATTR, "1");
          rememberAndSetBidiDir(list, "rtl");
          rememberAndSetBidiVisual(list, {direction:"rtl", textAlign:"right", unicodeBidi:"isolate"});
          for (const child of list.children) {
            if (!(child instanceof HTMLElement) || !child.matches?.(BIDI_LIST_ITEM_SELECTOR)) continue;
            rememberAndSetBidiDir(child, "rtl");
            rememberAndSetBidiVisual(child, {direction:"rtl", textAlign:"right", unicodeBidi:"isolate"});
          }
        } else {
          list.removeAttribute(CHATGPT_RTL_LIST_ATTR);
          if (!list.hasAttribute(RTL_STRUCTURE_ATTR)) {
            restoreBidiDir(list);
            restoreBidiVisual(list);
          }
          for (const child of list.children) {
            if (!(child instanceof HTMLElement) || !child.matches?.(BIDI_LIST_ITEM_SELECTOR) || child.hasAttribute(RTL_STRUCTURE_ATTR) || child.hasAttribute(CHATGPT_RTL_BLOCK_ATTR)) continue;
            restoreBidiDir(child);
            restoreBidiVisual(child);
          }
        }
      });
    }
  }

  function findBidiProseRoot(parent) {
    if (!(parent instanceof HTMLElement)) return null;
    // ChatGPT currently exposes a stable assistant-role wrapper and a markdown/prose response root.
    // Prefer those semantic anchors over brittle utility-class chains.
    if (isChatGptHost()) {
      const turn = parent.closest?.('section[data-turn="assistant"],article[data-turn="assistant"],[data-message-author-role="assistant"],[data-role="assistant"],[data-message-author="assistant"],.agent-turn');
      if (turn instanceof HTMLElement) {
        const local = parent.closest?.('.markdown') || turn.querySelector?.('.markdown.prose,.markdown');
        if (local instanceof HTMLElement && local.contains(parent)) return local;
      }
    }
    // Generic prose/markdown roots are safe only when they actually contain block text/list markup.
    const prose = parent.closest?.('.markdown,[class~="prose"],[data-markdown]');
    if (prose instanceof HTMLElement && prose.querySelector?.('p,ul,ol,blockquote,[role="list"]')) return prose;
    return null;
  }

  function refreshBidiProseRoot(parent, text = "") {
    const root = findBidiProseRoot(parent);
    if (!(root instanceof HTMLElement) || root.closest?.(EDITABLE_ROOTS) || isProtected(root)) return;
    const dir = elementTextDirection(root, text);
    const rtl = dir === "rtl";
    root.toggleAttribute(RTL_PROSE_ATTR, rtl);
    if (rtl) {
      rememberAndSetBidiDir(root, "rtl");
      rememberAndSetBidiVisual(root, { direction:"rtl", textAlign:"right", unicodeBidi:"isolate" });
    } else {
      restoreBidiDir(root);
      restoreBidiVisual(root);
    }
  }

  function repairProseStructure(root) {
    if (!root || !(state.config.bidiRepair || state.config.rtlBeta || state.config.layoutEnhance)) return;
    const proseRoots = [];
    const add = el => { if (el instanceof HTMLElement && !proseRoots.includes(el)) proseRoots.push(el); };
    if (root.nodeType === Node.ELEMENT_NODE) {
      const el = root;
      if (el.matches?.('.markdown,[class~="prose"],[data-markdown]')) add(el);
      const own = findBidiProseRoot(el);
      if (own) add(own);
    }
    // Current ChatGPT uses section[data-turn="assistant"] / data-message-author-role plus a .markdown
    // content root. Generic markdown/prose roots cover other sites without coupling to utility CSS.
    try {
      root.querySelectorAll?.('section[data-turn="assistant"] .markdown,article[data-turn="assistant"] .markdown,[data-message-author-role="assistant"] .markdown,.markdown,[class~="prose"],[data-markdown]').forEach(el => {
        if (proseRoots.length < 16) add(el);
      });
    } catch {}

    let processed = 0;
    for (const prose of proseRoots) {
      if (!prose.isConnected || prose.closest?.(EDITABLE_ROOTS) || isProtected(prose)) continue;
      const blocks = prose.querySelectorAll?.('p,li,dt,dd,blockquote,figcaption,h1,h2,h3,h4,h5,h6,summary,[role="paragraph"],[role="text"],[role="heading"],[role="status"],[role="alert"],[role="listitem"]');
      if (!blocks) continue;
      let rtlBlocks = 0, ltrBlocks = 0;
      for (const block of blocks) {
        if (!(block instanceof HTMLElement) || block.closest?.('pre,code,kbd,samp,' + EDITABLE_ROOTS) || isProtected(block)) continue;
        const dir = elementTextDirection(block);
        const blockRtl = dir === 'rtl';
        block.toggleAttribute(RTL_STRUCTURE_ATTR, blockRtl);
        if (blockRtl) {
          rememberAndSetBidiDir(block, 'rtl');
          rememberAndSetBidiVisual(block, { direction:'rtl', textAlign:'right', unicodeBidi:'isolate' });
          rtlBlocks++;
        } else {
          restoreBidiDir(block);
          restoreBidiVisual(block);
          if (dir === 'ltr') ltrBlocks++;
        }
        if (block.matches?.(BIDI_LIST_ITEM_SELECTOR)) {
          const list = block.parentElement?.matches?.(BIDI_LIST_SELECTOR) ? block.parentElement : block.closest?.(BIDI_LIST_SELECTOR);
          if (list instanceof HTMLElement) refreshBidiListStructure(list, true);
        }
        if (++processed >= 480) break;
      }
      // Do not require the entire response to have more RTL letters than English model names. A
      // prose root is considered RTL-oriented when RTL semantic blocks clearly outnumber LTR ones.
      const proseRtl = rtlBlocks > 0 && rtlBlocks >= Math.max(1, ltrBlocks);
      prose.toggleAttribute(RTL_PROSE_ATTR, proseRtl);
      if (proseRtl) {
        rememberAndSetBidiDir(prose, 'rtl');
        rememberAndSetBidiVisual(prose, { direction:'rtl', textAlign:'right', unicodeBidi:'isolate' });
      } else {
        restoreBidiDir(prose);
        restoreBidiVisual(prose);
      }
      // Explicitly repair every list rail inside RTL prose. Modern markdown renderers can wrap the
      // list-item text in citation/inline containers, so relying only on per-text-node ascent can
      // leave the UL/OL itself LTR and keep bullets on the physical left. The prose classification
      // is already aggregate and safe; use it as a fallback for neutral/mixed list containers.
      let listCount = 0;
      prose.querySelectorAll?.(BIDI_LIST_SELECTOR).forEach(list => {
        if (listCount++ >= 64 || !(list instanceof HTMLElement) || list.closest?.(EDITABLE_ROOTS)) return;
        refreshBidiListStructure(list, true);
        if (proseRtl && !list.hasAttribute(RTL_STRUCTURE_ATTR)) {
          const listDir = elementTextDirection(list);
          if (listDir !== 'ltr') {
            list.setAttribute(RTL_STRUCTURE_ATTR, '1');
            rememberAndSetBidiDir(list, 'rtl');
            rememberAndSetBidiVisual(list, { direction:'rtl', textAlign:'right', unicodeBidi:'isolate' });
          }
        }
      });
      if (processed >= 480) break;
    }
    // Run the ChatGPT-specific pass last so its stronger list-rail correction cannot be undone by
    // a generic mixed-direction decision made earlier in this same scan.
    repairChatGptPersianProse(root);
  }

  function applyBidiStructureRepair(parent, text, directRepair) {
    if (!(parent instanceof HTMLElement) || parent.closest?.(EDITABLE_ROOTS)) return;
    refreshBidiProseRoot(parent, text);

    // Repair semantic list structure independently of the nearest paragraph. Some modern renderers
    // insert several wrapper spans/divs between text and LI, so the old depth-limited block lookup
    // could right-align the words while leaving the bullet rail LTR on the left.
    const li = parent.closest?.(BIDI_LIST_ITEM_SELECTOR);
    if (li instanceof HTMLElement && !isProtected(li) && !li.closest?.(EDITABLE_ROOTS)) {
      const liRtl = directRepair || elementTextDirection(li, text) === "rtl";
      li.toggleAttribute(RTL_STRUCTURE_ATTR, liRtl);
      if (liRtl) {
        rememberAndSetBidiDir(li, "rtl");
        rememberAndSetBidiVisual(li, { direction:"rtl", textAlign:"right", unicodeBidi:"isolate" });
      } else {
        restoreBidiDir(li);
        restoreBidiVisual(li);
      }
      const list = li.parentElement?.matches?.(BIDI_LIST_SELECTOR) ? li.parentElement : li.closest?.(BIDI_LIST_SELECTOR);
      if (list instanceof HTMLElement) refreshBidiListStructure(list, true);
    }

    const block = findBidiStructureHost(parent);
    if (!(block instanceof HTMLElement)) return;
    const blockRtl = directRepair || elementTextDirection(block, text) === "rtl";
    block.toggleAttribute(RTL_STRUCTURE_ATTR, blockRtl);
    // Use the semantic HTML direction on paragraph/list-item containers as well as CSS. This gives
    // the browser a stable bidi base for inline English model names and for list markers, and it is
    // fully reversible when the feature is disabled.
    if (blockRtl) {
      rememberAndSetBidiDir(block, "rtl");
      rememberAndSetBidiVisual(block, { direction:"rtl", textAlign:"right", unicodeBidi:"isolate" });
    } else {
      restoreBidiDir(block);
      restoreBidiVisual(block);
    }
  }

  function clearBidiStructureNear(parent) {
    if (!(parent instanceof HTMLElement)) return;
    const prose = findBidiProseRoot(parent);
    if (prose instanceof HTMLElement && !prose.querySelector?.(`[${RTL_TEXT_ATTR}="1"]`)) prose.removeAttribute(RTL_PROSE_ATTR);
    const block = findBidiStructureHost(parent);
    if (block instanceof HTMLElement && !block.matches?.(`[${RTL_TEXT_ATTR}="1"]`) && !block.querySelector?.(`[${RTL_TEXT_ATTR}="1"]`)) {
      block.removeAttribute(RTL_STRUCTURE_ATTR);
      restoreBidiDir(block);
      restoreBidiVisual(block);
    }
    const li = parent.closest?.(BIDI_LIST_ITEM_SELECTOR);
    if (li instanceof HTMLElement) {
      if (!li.matches?.(`[${RTL_TEXT_ATTR}="1"]`) && !li.querySelector?.(`[${RTL_TEXT_ATTR}="1"]`)) {
        li.removeAttribute(RTL_STRUCTURE_ATTR);
        restoreBidiDir(li);
        restoreBidiVisual(li);
      }
      const list = li.parentElement?.matches?.(BIDI_LIST_SELECTOR) ? li.parentElement : li.closest?.(BIDI_LIST_SELECTOR);
      if (list instanceof HTMLElement) refreshBidiListStructure(list, false);
    }
  }

  function isSafeRtlLayoutTarget(el) {
    if (!(el instanceof HTMLElement) || isProtected(el) || el.closest?.(EDITABLE_ROOTS)) return false;
    if (el.matches("p,span,label,li,dt,dd,h1,h2,h3,h4,h5,h6,blockquote,figcaption,caption,td,th,summary,small,strong,b,em,mark,time,[role='text'],[role='heading'],[role='status'],[role='alert']")) return true;
    return el.children.length === 0 && hasDirectReadableText(el);
  }

  function pageWantsRtlUi() {
    const lang = String(document.documentElement?.lang || "").toLowerCase();
    return state.config.rtlBeta || lang === "fa" || lang.startsWith("fa-") || lang === "ar" || lang.startsWith("ar-");
  }

  function findRtlAlignHost(el) {
    let node = el instanceof HTMLElement ? el : null;
    let fallback = null;
    const hardStop = "html,body,main,[role='main'],article,section,nav,header,footer,aside,[data-testid='primaryColumn'],[data-testid='sidebarColumn']";
    for (let depth=0; node && depth<6; depth++, node=node.parentElement) {
      if (isProtected(node) || node.closest?.(EDITABLE_ROOTS)) break;
      if (node.matches?.(hardStop) && depth > 0) break;
      const control = node.matches("button,a,label,summary,[role='button'],[role='menuitem'],[role='tab'],[role='option'],[role='switch'],[role='link'],[role='alert'],[role='status'],[role='heading']");
      if (control) return node;
      const cs = getComputedStyle(node);
      const display = String(cs.display || "");
      const rect = node.getBoundingClientRect();
      const compact = rect.width > 0 && rect.width <= Math.min(900, innerWidth * .98) && rect.height > 0 && rect.height <= 240;
      if (!fallback && compact && ["block","inline-block","list-item","table-cell","flow-root","flex","inline-flex","grid","inline-grid"].includes(display) && node.children.length <= 12) fallback = node;
    }
    return fallback || (isSafeRtlLayoutTarget(el) ? el : null);
  }

  function findRtlFlowHost(el) {
    let node = el instanceof HTMLElement ? el : null;
    for (let depth=0; node && depth<5; depth++, node=node.parentElement) {
      if (isProtected(node) || node.closest?.(EDITABLE_ROOTS) || isUserContentRegion(node)) break;
      const cs = getComputedStyle(node);
      const display = String(cs.display || "");
      const rect = node.getBoundingClientRect();
      if (!(rect.width > 0 && rect.height > 0) || rect.width > Math.min(760, innerWidth * .96) || rect.height > 180) continue;
      if (["flex","inline-flex","grid","inline-grid"].includes(display)) {
        // Do not mirror columns, media cards or dense grids; only compact horizontal UI rows.
        if (display.includes("flex") && !String(cs.flexDirection || "row").startsWith("row")) continue;
        if (node.children.length >= 1 && node.children.length <= 8) return node;
      }
      if (node.matches("button,a,label,summary,[role='button'],[role='menuitem'],[role='tab'],[role='option'],[role='switch'],[role='link']")) return node;
    }
    return null;
  }

  function isSafeRtlFlowControl(el) {
    if (!(el instanceof HTMLElement) || isProtected(el) || el.closest?.(EDITABLE_ROOTS) || isUserContentRegion(el)) return false;
    const cs = getComputedStyle(el);
    const display = String(cs.display || "");
    if (!["flex","inline-flex","grid","inline-grid","block","inline-block"].includes(display)) return false;
    if (display.includes("flex") && !String(cs.flexDirection || "row").startsWith("row")) return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && r.width <= Math.min(760, innerWidth * .96) && r.height <= 180 && el.children.length <= 8;
  }

  function applySmartRtl(parent, text) {
    if (!(parent instanceof HTMLElement) || parent.closest?.(EDITABLE_ROOTS)) return;
    // Use the nearest semantic text block for direction intent. A leaf text node can be just
    // "OpenAI:" or "GPT-6" while the surrounding sentence is Persian, so leaf-only detection makes
    // Auto RTL and Layout Enhance appear to do nothing on modern markdown/rendered UIs.
    const semanticBlock = findBidiStructureHost(parent);
    const strong = semanticBlock instanceof HTMLElement ? elementTextDirection(semanticBlock, text) : detectStructuralDirection(text);
    const rtl = strong === "rtl";

    // Auto RTL is intentionally independent from layout enhancement. It right-aligns Persian text
    // and the nearest compact UI row, but does not reorder controls unless layoutEnhance is enabled.
    const leaf = (state.config.rtlBeta || state.config.layoutEnhance) && rtl && isSafeRtlLayoutTarget(parent);
    parent.toggleAttribute(RTL_LAYOUT_ATTR, leaf);

    if (state.config.rtlBeta) {
      const host = findRtlAlignHost(parent);
      if (host instanceof HTMLElement) {
        const sample = String(host.innerText || host.textContent || text || "").trim().slice(0, 900);
        const sampleDir = detectStrongDirection(sample);
        const localizedLeaf = parent.hasAttribute(RTL_TEXT_ATTR);
        const uiRtl = pageWantsRtlUi() && isUiControlElement(host) && sampleDir !== "ltr";
        const hostRtl = rtl || localizedLeaf || sampleDir === "rtl" || uiRtl;
        host.toggleAttribute(RTL_ALIGN_ATTR, hostRtl);
      }
    } else parent.removeAttribute(RTL_ALIGN_ATTR);

    if (state.config.layoutEnhance && rtl) {
      const flow = findRtlFlowHost(parent);
      if (flow instanceof HTMLElement && isSafeRtlFlowControl(flow)) flow.setAttribute(RTL_FLOW_ATTR, "1");
    } else {
      const existingFlow = parent.closest?.(`[${RTL_FLOW_ATTR}]`);
      if (existingFlow instanceof HTMLElement && detectStrongDirection(existingFlow.innerText || existingFlow.textContent || "") !== "rtl") existingFlow.removeAttribute(RTL_FLOW_ATTR);
    }
  }

  const ICON_LIGATURE_FONT_RE = /(?:material\s*(?:icons?|symbols?)|google\s*(?:icons?|symbols?)|font\s*awesome|bootstrap\s*icons?|remixicon|icomoon|mdi)/i;
  const ICON_LIGATURE_HINT_RE = /(?:^|[\s_-])(?:icon|icons|symbol|symbols|glyph|material-icon|material-symbol|google-symbol)(?:$|[\s_-])/i;
  function isIconLigatureElement(el,text=""){
    if(!(el instanceof HTMLElement))return false;
    const value=String(text||el.textContent||"").trim();
    if(!value||value.length>64||/[\u0600-\u06ff]/.test(value))return false;
    const tag=el.tagName.toLowerCase();
    if(tag==="mat-icon"||tag==="md-icon"){el.setAttribute(ICON_LIGATURE_ATTR,"1");return true}
    const hint=`${el.id||""} ${typeof el.className==="string"?el.className:""} ${el.getAttribute("data-icon")||""} ${el.getAttribute("data-symbol")||""}`;
    if(ICON_LIGATURE_HINT_RE.test(hint)){el.setAttribute(ICON_LIGATURE_ATTR,"1");return true}
    // Material/Google icon fonts render textual ligatures such as home, search, close, more_vert
    // and expand_more. Translating that text destroys the glyph, so detect the actual icon font
    // before localization. Restrict style reads to short ASCII span/i-like candidates.
    if(!/^(?:span|i|b|em|div)$/i.test(tag)||!/^[A-Za-z0-9_\- ]+$/.test(value))return false;
    try{
      const cs=getComputedStyle(el);
      const font=`${cs.fontFamily||""} ${cs.fontFeatureSettings||""} ${cs.fontVariationSettings||""}`;
      if(ICON_LIGATURE_FONT_RE.test(font)){el.setAttribute(ICON_LIGATURE_ATTR,"1");return true}
    }catch{}
    return false;
  }

  function primeIconLigatureGuards(root,limit=700){
    if(!root||limit<=0)return;
    const selector="mat-icon,md-icon,[class*='material-icons'],[class*='material-symbols'],[class*='google-symbol'],[class*='google-material-icon'],span,i";
    let count=0;
    const visit=el=>{
      if(count>=limit||!(el instanceof HTMLElement))return;
      const value=String(el.textContent||"").trim();
      if(!value||value.length>64||el.children.length>1)return;
      if(isIconLigatureElement(el,value)){el.setAttribute(ICON_LIGATURE_ATTR,"1");count++}
    };
    if(root instanceof HTMLElement&&root.matches?.(selector))visit(root);
    try{for(const el of root.querySelectorAll?.(selector)||[]){if(count>=limit)break;visit(el)}}catch{}
  }

  function localizationAttributesFor(el) {
    const common = ["aria-label","title","placeholder","aria-placeholder","data-placeholder","aria-description"];
    if (getHost() === "studio.youtube.com") return [...common,"label","text","tooltip-text"];
    return common;
  }

  function processElementAttributes(el) {
    if (!(el instanceof HTMLElement) || isProtected(el) || isIconLigatureElement(el) || !state.config.localizeEnabled || !shouldLocalizePage()) return;
    const attrs = localizationAttributesFor(el);
    const exactKnown = attrs.some(a => { const v=el.getAttribute(a); return v && localizeExact(v) !== v; });
    const editablePlaceholderAttr = !!el.closest?.(EDITABLE_ROOTS) && attrs.some(a => ["placeholder","aria-placeholder","data-placeholder"].includes(a) && el.hasAttribute(a));
    if (isUserContentRegion(el) && !isEditablePlaceholderUi(el) && !editablePlaceholderAttr) return;
    if (!isUiControlElement(el) && !isLocalizationUiSurface(el) && !(getHost()==="studio.youtube.com" && exactKnown)) return;
    let record = state.attrRecords.get(el);
    if (!record) { record = {}; state.attrRecords.set(el, record); }
    for (const attr of attrs) {
      const current = el.getAttribute(attr);
      if (!current) continue;
      const old = record[attr];
      if (!old || current !== old.last) record[attr] = { original: current, last: current };
      const translated = localizeExact(record[attr].original);
      if (translated !== current) el.setAttribute(attr, translated);
      record[attr].last = translated;
    }
  }

  function isXHost(host = getHost()) {
    const h = String(host || "").toLowerCase();
    return h === "x.com" || h.endsWith(".x.com") || h === "twitter.com" || h.endsWith(".twitter.com");
  }

  function isSearchConsoleHost(host = getHost()) {
    const h = String(host || "").toLowerCase();
    if (h !== "search.google.com") return false;
    try { return /^\/search-console(?:\/|$)/i.test(String(location.pathname || "")); } catch { return true; }
  }

  function isYouTubeUiHost(host = getHost()) {
    const h = String(host || "").toLowerCase();
    return h === "youtube.com" || h.endsWith(".youtube.com");
  }

  function isInstagramUiHost(host = getHost()) {
    const h = String(host || "").toLowerCase();
    return h === "instagram.com" || h.endsWith(".instagram.com");
  }

  function isAiLocalizationHost(host = getHost()) {
    try { if (typeof localizer?.isAiHost === "function") return !!localizer.isAiHost(host); } catch {}
    const h = String(host || "").toLowerCase();
    return [
      "chatgpt.com","claude.ai","gemini.google.com","perplexity.ai","copilot.microsoft.com","poe.com","grok.com",
      "chat.mistral.ai","deepseek.com","chat.deepseek.com","character.ai","meta.ai","you.com","phind.com","blackbox.ai",
      "manus.im","genspark.ai","felo.ai","consensus.app","elicit.com","scite.ai","notebooklm.google.com","aistudio.google.com",
      "platform.openai.com","console.anthropic.com","huggingface.co","openrouter.ai","replicate.com","fal.ai","console.groq.com",
      "dashboard.cohere.com","api.together.ai","playground.together.ai","fireworks.ai","build.nvidia.com","midjourney.com",
      "runwayml.com","elevenlabs.io","suno.com","udio.com","leonardo.ai","ideogram.ai","luma.ai","lumalabs.ai","heygen.com",
      "krea.ai","pika.art","hailuoai.video","openart.ai","recraft.ai","playground.com","clipdrop.co","dreamstudio.ai",
      "firefly.adobe.com","sora.com","labs.google","invideo.io","veed.io","descript.com","murf.ai","speechify.com","play.ht",
      "synthesia.io","d-id.com","fliki.ai","gamma.app","beautiful.ai","lovable.dev","bolt.new","v0.dev","replit.com",
      "cursor.com","windsurf.com","sourcegraph.com","jasper.ai","copy.ai","writesonic.com","rytr.me","quillbot.com","grammarly.com"
    ].some(domain => h === domain || h.endsWith(`.${domain}`));
  }

  const AI_USER_CONTENT_SELECTOR = [
    "article","[data-message-author-role]","[data-testid*='conversation-turn' i]","[data-testid*='chat-message' i]",
    "[data-testid*='message-content' i]","[data-testid*='answer' i]","[class*='assistant-message' i]","[class*='user-message' i]",
    "[class*='chat-message' i]","[class*='message-content' i]","[class*='response-content' i]","[class*='answer-content' i]",
    "[class*='generated-content' i]","[class*='prompt-content' i]","[class*='output-content' i]","[class*='prose' i]",
    "[class*='markdown' i]","[data-role='assistant']","[data-role='user']","[data-author='assistant']","[data-author='user']","[data-message-role]","[class*='conversation-message' i]","model-response","user-query"
  ].join(",");

  function isDeepLocalizationHost(host = getHost()) {
    try { if (typeof localizer?.isDeepHost === "function" && localizer.isDeepHost(host)) return true; } catch {}
    return isXHost(host) || isSearchConsoleHost(host) || isYouTubeUiHost(host) || isInstagramUiHost(host) || isAiLocalizationHost(host);
  }

  function isYouTubeLocalizationSurface(el) {
    if (!(el instanceof HTMLElement) || !isYouTubeUiHost()) return false;
    try {
      return !!el.closest("ytd-guide-entry-renderer,ytd-mini-guide-entry-renderer,ytd-multi-page-menu-renderer,ytd-menu-popup-renderer,ytd-popup-container,yt-confirm-dialog-renderer,tp-yt-paper-dialog,ytd-engagement-panel-section-list-renderer,ytd-settings-sidebar-renderer,ytd-settings-options-renderer,[role='menu'],[role='dialog'],[role='navigation'],[class*='settings' i],[class*='menu' i],[class*='popup' i]");
    } catch { return false; }
  }

  function isInstagramLocalizationSurface(el) {
    if (!(el instanceof HTMLElement) || !isInstagramUiHost()) return false;
    try {
      return !!el.closest("nav,aside,[role='navigation'],[role='menu'],[role='dialog'],[role='toolbar'],[role='menuitem'],[role='tab'],[aria-modal='true'],[class*='settings' i],[class*='menu' i],[class*='dialog' i],[class*='modal' i]");
    } catch { return false; }
  }

  function isXUiHeavyRoute() {
    if (!isXHost()) return false;
    const path = String(location.pathname || "").toLowerCase();
    if (/^\/settings(?:\/|$)/.test(path)) return true;
    if (/^\/i\/(?:premium_sign_up|verified-orgs-signup|verified-choose|spaces\/start|lists|communities|monetization)(?:\/|$)/.test(path)) return true;
    if (/\/(?:lists|communities)(?:\/|$)/.test(path)) return true;
    const host = getHost();
    return host === "ads.x.com" || host === "business.x.com";
  }

  function isXKnownUiText(value) {
    if (!isXHost()) return false;
    if (localizer?.hasXExact?.(value)) return true;
    try { return !!localizer?.lookupDynamic?.(getHost(), value); } catch { return false; }
  }

  function isXStructuredUiSurface(el, value) {
    if (!(el instanceof HTMLElement) || !isXHost()) return false;
    try {
      if (el.closest('[data-testid="super-upsell-UpsellCardRenderProperties"],[data-testid="subscriptionInfo"],[data-testid="premiumTier"]')) return true;
      if (el.closest('a[href*="/i/premium_sign_up"],a[href*="/i/verified-orgs-signup"],a[href*="/i/verified-choose"],a[href*="/i/spaces/start"],a[href*="/settings"],a[href*="/lists"],a[href*="/communities"],a[href*="/i/monetization"],a[href^="https://ads.x.com"]')) return true;
    } catch {}
    return isXUiHeavyRoute() && isXKnownUiText(value);
  }

  function isLikelyUiText(el, text) {
    if (!(el instanceof HTMLElement) || isIconLigatureElement(el,text)) return false;
    if (isUserContentRegion(el) && !isEditablePlaceholderUi(el)) return false;
    const value = String(text || "").trim();
    if (!value || value.length > (isAiLocalizationHost() ? 12000 : isDeepLocalizationHost() ? 6000 : 280)) return false;
    const host = getHost();
    // Search Console notification rows legitimately contain a property URL. Only allow those URL
    // strings through when our narrow dynamic UI matcher recognizes the complete message.
    const dynamicKnown = (isSearchConsoleHost(host) || isAiLocalizationHost(host)) ? (localizer?.lookupDynamic?.(host, value) || "") : "";
    if ((/[#@][\p{L}\p{N}_]/u.test(value) || /https?:\/\//i.test(value)) && !dynamicKnown) return false;
    // X renders many subscription/settings cards as anonymous generated divs.
    if (isXStructuredUiSurface(el, value)) return true;
    const translated = localizer?.lookup?.(host, value) || dynamicKnown || localizer?.lookupDynamic?.(host, value) || "";
    // Exact known phrases are safe inside alerts, dialogs, toasts and other application chrome.
    // This catches generic failures such as "Something went wrong. Try reloading." even when the
    // site renders the text in an anonymous div rather than a button/nav node.
    if (translated && isLocalizationUiSurface(el)) return true;
    if ((isXHost(host) || isSearchConsoleHost(host)) && translated && value.length <= 1800) return true;
    if (isAiLocalizationHost(host) && translated && value.length <= 12000) return true;
    if (isDeepLocalizationHost(host) && translated && value.length <= 6000) return true;
    if (translated && value.length <= 460 && (isYouTubeLocalizationSurface(el) || isInstagramLocalizationSurface(el))) return true;
    const normalized = localizer?.normalize?.(value) || value.toLocaleLowerCase("en-US");
    for (const [domain, pack] of Object.entries(localizer?.packs || {})) {
      if ((host === domain || host.endsWith(`.${domain}`)) && pack && Object.prototype.hasOwnProperty.call(pack, normalized)) return true;
    }
    if (value.length > 120) return false;
    if (isLocalizationUiSurface(el)) return true;
    // Links are accepted only when they live in clearly structural UI; a link inside
    // a post/caption is content and is deliberately ignored.
    if (el.closest('a') && el.closest('nav,header,aside,[role="navigation"],[role="menu"],[role="toolbar"],[class*="sidebar" i],[class*="settings" i]')) return true;
    const knownSite = Object.keys(localizer?.packs || {}).some(domain => host === domain || host.endsWith(`.${domain}`));
    return knownSite && value.length <= 64 && el.children.length === 0 && !!el.closest('[class*="menu" i],[class*="nav" i],[class*="sidebar" i],[class*="toolbar" i],[class*="header" i],[class*="settings" i],[class*="preferences" i],[class*="toast" i],[class*="alert" i],[class*="error" i]');
  }

  function isLocalizationUiSurface(el) {
    if (!(el instanceof HTMLElement)) return false;
    try {
      return !!el.closest('button,label,summary,nav,header,aside,[role="button"],[role="menuitem"],[role="tab"],[role="option"],[role="navigation"],[role="menu"],[role="dialog"],[role="toolbar"],[role="alert"],[role="status"],[role="tooltip"],[aria-live],[aria-label],[data-testid*="error" i],[data-testid*="toast" i],[class*="toast" i],[class*="alert" i],[class*="error" i],[class*="dialog" i],[class*="modal" i],[class*="banner" i]');
    } catch { return false; }
  }

  function isUiControlElement(el) {
    if (!(el instanceof HTMLElement) || isUserContentRegion(el)) return false;
    if (el.matches('button,a,label,summary,input,select,textarea,[role="button"],[role="menuitem"],[role="tab"],[role="option"],[role="navigation"],[role="menu"],[role="dialog"],[role="toolbar"]')) return true;
    if (getHost() === "studio.youtube.com") {
      const tag=el.tagName.toLowerCase();
      if (tag.startsWith("ytcp-") || tag.startsWith("yt-") || tag.startsWith("tp-yt-")) {
        if (el.hasAttribute("aria-label") || el.hasAttribute("tabindex") || el.hasAttribute("role") || el.closest?.("ytcp-navigation-drawer,ytcp-header,ytcp-button,ytcp-icon-button,ytcp-dropdown-trigger,ytcp-popup-container")) return true;
      }
    }
    if (isXHost()) {
      try { if (el.closest('[data-testid="super-upsell-UpsellCardRenderProperties"],[data-testid="subscriptionInfo"],[data-testid="premiumTier"]')) return true; } catch {}
    }
    return !!el.closest('nav,header,aside,[role="navigation"],[role="menu"],[role="toolbar"],[class*="sidebar" i],[class*="settings" i],[class*="preferences" i]');
  }

  function isSafeLocalizedControlInContent(el) {
    if (!(el instanceof Element)) return false;
    if (el.closest("[contenteditable='true'],[contenteditable='plaintext-only']")) return false;
    // Buttons and menu controls are interface chrome even when they live inside a post/article.
    // This lets labels such as Reply/Like/Share localize without touching the post body.
    const control = el.closest("button,[role='button'],[role='menuitem'],[role='tab'],[role='option'],summary");
    if (control && !control.closest("[data-fontyar-no-localize]")) return true;
    const host = getHost();
    if (host === "x.com" || host.endsWith(".x.com") || host === "twitter.com" || host.endsWith(".twitter.com")) {
      const analytics = el.closest("a[role='link'][aria-label][href*='/analytics']");
      if (analytics) return true;
    }
    return false;
  }

  function isUserContentRegion(el) {
    if (!(el instanceof Element)) return false;
    if (isSafeLocalizedControlInContent(el)) return false;
    try { if (el.closest(LOCALIZE_GENERIC_EXCLUDE)) return true; } catch {}
    const host = getHost();
    if (isAiLocalizationHost(host)) {
      try { if (el.closest(AI_USER_CONTENT_SELECTOR)) return true; } catch {}
    }
    for (const [domain, selector] of Object.entries(LOCALIZE_SITE_EXCLUDES)) {
      if (host === domain || host.endsWith(`.${domain}`)) {
        try { if (el.closest(selector)) return true; } catch {}
      }
    }
    return false;
  }

  function shouldLocalizePage() {
    if (!localizer) return false;
    const lang = String(document.documentElement?.lang || "").toLowerCase();
    if (!lang || lang.startsWith("en")) return true;
    const host = getHost();
    try { if (typeof localizer?.isKnownHost === "function" && localizer.isKnownHost(host)) return true; } catch {}
    return Object.keys(localizer.packs || {}).some(domain => host === domain || host.endsWith(`.${domain}`));
  }

  function localizeExact(text) {
    if (!localizer?.lookup) return text;
    const original = String(text || "");
    const trimmed = original.trim();
    const maxLength = isAiLocalizationHost() ? 12000 : isDeepLocalizationHost() ? 6000 : 220;
    if (!trimmed || trimmed.length > maxLength) return original;
    // Dynamic UI patterns are deliberately narrow (counts, Follow @handle, Search Console property
    // notifications, etc.) and run before the generic URL/@/# guards. This keeps user content safe
    // while allowing application chrome that embeds a property URL to be translated.
    const dynamic = localizer.lookupDynamic?.(getHost(), trimmed) || "";
    if (!dynamic && /https?:\/\//i.test(trimmed)) return original;
    if (!dynamic && /[#@][\p{L}\p{N}_]/u.test(trimmed)) return original;
    const translated = dynamic || localizer.lookup(getHost(), trimmed);
    if (!translated) return original;
    const leading = original.match(/^\s*/)?.[0] || "";
    const trailing = original.match(/\s*$/)?.[0] || "";
    return `${leading}${translated}${trailing}`;
  }

  function restoreTextRecords() {
    for (const [node, record] of state.textRecords) {
      if (node?.isConnected && node.data === record.last) node.data = record.original;
    }
    state.textRecords.clear();
  }

  function restoreAttributes() {
    for (const [el, record] of state.attrRecords) {
      if (!el?.isConnected) continue;
      for (const [attr, data] of Object.entries(record)) if (el.getAttribute(attr) === data.last) el.setAttribute(attr, data.original);
    }
    state.attrRecords.clear();
  }

  function clearRtlMarks() {
    const clearRoot = root => root?.querySelectorAll?.(`[${RTL_TEXT_ATTR}],[${RTL_STRUCTURE_ATTR}],[${RTL_PROSE_ATTR}],[${CHATGPT_RTL_PROSE_ATTR}],[${CHATGPT_RTL_BLOCK_ATTR}],[${CHATGPT_RTL_LIST_ATTR}]`).forEach(el => {
      el.removeAttribute(RTL_TEXT_ATTR);
      el.removeAttribute(RTL_STRUCTURE_ATTR);
      el.removeAttribute(RTL_PROSE_ATTR);
      el.removeAttribute(CHATGPT_RTL_PROSE_ATTR);
      el.removeAttribute(CHATGPT_RTL_BLOCK_ATTR);
      el.removeAttribute(CHATGPT_RTL_LIST_ATTR);
    });
    clearRoot(document);
    for (const shadow of state.shadowRoots || []) clearRoot(shadow);
    for (const el of [...state.bidiDirRecords.keys()]) restoreBidiDir(el);
    for (const el of [...state.bidiStyleRecords.keys()]) restoreBidiVisual(el);
  }
  function clearRtlLayoutMarks() {
    document.querySelectorAll?.(`[${RTL_LAYOUT_ATTR}],[${RTL_ALIGN_ATTR}],[${RTL_FLOW_ATTR}]`).forEach(el => {
      el.removeAttribute(RTL_LAYOUT_ATTR); el.removeAttribute(RTL_ALIGN_ATTR); el.removeAttribute(RTL_FLOW_ATTR);
    });
  }
  function clearAutoRtlMarks() {
    document.querySelectorAll?.(`[${RTL_LAYOUT_ATTR}],[${RTL_ALIGN_ATTR}]`).forEach(el => {
      el.removeAttribute(RTL_LAYOUT_ATTR); el.removeAttribute(RTL_ALIGN_ATTR);
    });
  }
  function clearRtlFlowMarks() { document.querySelectorAll?.(`[${RTL_FLOW_ATTR}]`).forEach(el => el.removeAttribute(RTL_FLOW_ATTR)); }
  function isRtlText(text) {
    const value = String(text || "");
    const rtl = (value.match(/[؀-ۿݐ-ݿࢠ-ࣿ]/g) || []).length;
    const latin = (value.match(/[A-Za-z]/g) || []).length;
    return rtl > 0 && rtl >= latin;
  }
  function detectStrongDirection(text) {
    const value = String(text || "");
    let rtl = 0, ltr = 0;
    for (const ch of value) {
      // Count letters only. Emoji, punctuation, spaces and digits are bidi-neutral/weak for the
      // purpose of choosing a stable editing direction and must not flip a live control.
      if (!/\p{Letter}/u.test(ch)) continue;
      if (/\p{Script_Extensions=Arabic}/u.test(ch)) rtl++;
      else if (/\p{Script_Extensions=Latin}/u.test(ch) || HAN_RE.test(ch)) ltr++;
    }
    if (rtl > ltr && rtl > 0) return "rtl";
    if (ltr > rtl && ltr > 0) return "ltr";
    return "neutral";
  }

  const SMART_RTL_FAST_SELECTOR = "p,li,dt,dd,blockquote,figcaption,h1,h2,h3,h4,h5,h6,summary,label,a,button,[role='button'],[role='link'],[role='menuitem'],[role='option'],[role='tab'],[role='switch'],[role='text'],[role='heading'],[role='status'],[role='alert'],[role='listitem'],div";
  function primeSmartRtl(root, limit=520) {
    if(!state.config.rtlBeta||!root||limit<=0)return;
    const items=[];
    const add=el=>{if(el instanceof HTMLElement&&items.length<limit&&!items.includes(el))items.push(el)};
    if(root.nodeType===Node.ELEMENT_NODE&&root.matches?.(SMART_RTL_FAST_SELECTOR))add(root);
    try{root.querySelectorAll?.(SMART_RTL_FAST_SELECTOR).forEach(el=>{if(items.length<limit)add(el)})}catch{}
    for(const el of items){
      // Auto RTL is intentionally allowed on Persian user/content text as well as application
      // chrome. Localization still has its own strict user-content exclusions; direction repair does
      // not rewrite text and is therefore safe to apply to readable Persian blocks.
      if(isProtected(el)||el.closest?.(EDITABLE_ROOTS))continue;
      // DIV fallback is intentionally leaf-only so flex/grid shells and responsive geometry never flip.
      if(el.tagName==="DIV"&&(el.children.length>0||!hasDirectReadableText(el)))continue;
      const sample=String(el.textContent||"").replace(/\s+/g," ").trim().slice(0,1100);
      if(!sample)continue;
      const dir=detectStructuralDirection(sample);
      if(dir!=="rtl")continue;
      if(isSafeRtlLayoutTarget(el)||el.matches?.(BIDI_STRUCTURE_BLOCKS))el.setAttribute(RTL_LAYOUT_ATTR,"1");
      if(el.matches?.("button,label,summary,[role='button'],[role='menuitem'],[role='option'],[role='tab'],[role='switch'],[role='heading'],[role='status'],[role='alert']"))el.setAttribute(RTL_ALIGN_ATTR,"1");
      if(el.matches?.(BIDI_STRUCTURE_BLOCKS)){
        el.setAttribute(RTL_STRUCTURE_ATTR,"1");
        rememberAndSetBidiDir(el,"rtl");
        rememberAndSetBidiVisual(el,{direction:"rtl",textAlign:"right",unicodeBidi:"isolate"});
      }
    }
    markRtlControls(root);
  }

  function primeVisibleSmartRtl() {
    if(!state.config.rtlBeta)return;
    const seen=new Set(),w=Math.max(1,innerWidth||1),h=Math.max(1,innerHeight||1);
    const add=el=>{if(el instanceof Element)seen.add(el)};
    add(document.body);
    try{
      document.querySelectorAll("main,[role='main'],nav,aside,header,section,article").forEach(el=>{if(seen.size<90)add(el)});
      for(const px of [.08,.28,.5,.72,.92])for(const py of [.08,.25,.5,.75,.92]){
        for(const el of document.elementsFromPoint(Math.min(w-1,w*px),Math.min(h-1,h*py)).slice(0,5)){add(el);if(el.parentElement)add(el.parentElement)}
      }
    }catch{}
    for(const el of [...seen].slice(0,140))primeSmartRtl(el,80);
  }

  function markRtlControls(root) {
    if (!state.config.rtlBeta || !root) return;
    const items = [];
    if (root.nodeType === Node.ELEMENT_NODE && root.matches?.(FORM_TEXT_CONTROLS)) items.push(root);
    root.querySelectorAll?.(FORM_TEXT_CONTROLS).forEach(el => { if (items.length < 240) items.push(el); });
    for (const el of items) {
      if (!(el instanceof HTMLElement) || !isEditableSafe(el)) continue;
      const focused = document.activeElement === el;
      const value = String(el.value ?? el.textContent ?? "");
      let dir = detectStrongDirection(value);
      // Placeholder direction is only used while the control is empty. Neutral-only values (emoji,
      // numbers or punctuation) never flip a focused editor, which keeps caret behavior stable.
      if (dir === "neutral" && !value.trim()) {
        const hint = `${el.getAttribute("placeholder") || ""} ${el.getAttribute("aria-placeholder") || ""} ${el.getAttribute("aria-label") || ""}`.trim();
        dir = detectStrongDirection(hint);
      }
      if (focused && dir === "neutral") continue;
      el.toggleAttribute(RTL_LAYOUT_ATTR, dir === "rtl");
    }
  }

  function transformDigits(text, mode) {
    if (mode === "preserve") return text;
    const latin = "0123456789", persian = "۰۱۲۳۴۵۶۷۸۹", arabic = "٠١٢٣٤٥٦٧٨٩";
    let target = latin;
    if (mode === "persian") target = persian;
    else if (mode === "arabic") target = arabic;
    return String(text).replace(/[0-9۰-۹٠-٩]/g, ch => {
      let index = latin.indexOf(ch); if (index < 0) index = persian.indexOf(ch); if (index < 0) index = arabic.indexOf(ch);
      return index >= 0 ? target[index] : ch;
    });
  }

  function transformZwnj(text, mode) {
    if (mode === "preserve") return text;
    if (mode === "remove") return String(text).replace(/\u200c/g, "");
    if (mode === "space") return String(text).replace(/\u200c/g, " ");
    let value = String(text);
    value = value.replace(/\b(می|نمی)\s+([آ-ی]+)/g, "$1‌$2");
    value = value.replace(/([آ-ی]+)\s+(ها|های|هایی|تر|ترین)\b/g, "$1‌$2");
    return value;
  }


  function clearDigitSizeMarks() {
    document.querySelectorAll?.(`[${DIGIT_SIZE_ATTR}]`).forEach(el => {
      el.removeAttribute(DIGIT_SIZE_ATTR);
      el.style?.removeProperty?.("--persianyar-digit-base-size");
    });
  }

  function markDigitSizedElement(parent, text) {
    if (!(parent instanceof HTMLElement) || isProtected(parent)) return;
    const value = String(text || "").trim();
    // Keep this feature layout-safe: apply to standalone counters/date numbers rather than
    // splitting arbitrary sentences into extra spans (which can break framework hydration).
    const numericOnly = /^[+−-]?[0-9۰-۹٠-٩][0-9۰-۹٠-٩\s.,٫٬:/٪%+−-]*$/.test(value) && /[0-9۰-۹٠-٩]/.test(value);
    if (!numericOnly || parent.children.length > 0) { parent.removeAttribute(DIGIT_SIZE_ATTR); parent.style.removeProperty("--persianyar-digit-base-size"); return; }
    if (!parent.hasAttribute(DIGIT_SIZE_ATTR)) {
      const px = Number.parseFloat(getComputedStyle(parent).fontSize);
      if (Number.isFinite(px) && px > 0) parent.style.setProperty("--persianyar-digit-base-size", `${px}px`);
    }
    parent.setAttribute(DIGIT_SIZE_ATTR, "1");
  }

  const GREGORIAN_MONTHS = Object.freeze({
    january:1,jan:1,"ژانویه":1,"يناير":1,januar:1,janvier:1,enero:1,
    february:2,feb:2,"فوریه":2,"فوريه":2,"فبراير":2,februar:2,fevrier:2,"février":2,febrero:2,
    march:3,mar:3,"مارس":3,"آذار":3,marz:3,"märz":3,mars:3,marzo:3,
    april:4,apr:4,"آوریل":4,"اوريل":4,"أبريل":4,avril:4,abril:4,
    may:5,"مه":5,"می":5,"مايو":5,mai:5,mayo:5,
    june:6,jun:6,"ژوئن":6,"يونيو":6,juni:6,juin:6,junio:6,
    july:7,jul:7,"ژوئیه":7,"ژوييه":7,"يوليو":7,juli:7,juillet:7,julio:7,
    august:8,aug:8,"اوت":8,"آگوست":8,"أغسطس":8,agust:8,"ağustos":8,aout:8,"août":8,agosto:8,
    september:9,sep:9,sept:9,"سپتامبر":9,"سبتمبر":9,september_de:9,septembre:9,septiembre:9,
    october:10,oct:10,"اکتبر":10,"اكتوبر":10,"أكتوبر":10,oktober:10,octobre:10,octubre:10,
    november:11,nov:11,"نوامبر":11,"نوفمبر":11,novembre:11,noviembre:11,
    december:12,dec:12,"دسامبر":12,"ديسمبر":12,dezember:12,decembre:12,"décembre":12,diciembre:12
  });

  function needsQueuedNodeProcessing() {
    const c = state.config;
    return c.emojiEnabled || c.fontDelta !== 0 || hasTextFeatures(c) || c.softCorners || c.uniformCornersEnabled || c.removeShadows || c.liquidGlassMode || c.linearStyleMode || c.softMotionEnabled;
  }

  function queueSmartDarkMutationRoot(node) {
    if(!(node instanceof Element)||!state.config.smartDarkMode)return;
    const cssEngine=getSmartDarkCssEngine();
    if(cssEngine)cssEngine.noteMutation?.(node);
    // Coalesce nested framework mutations before scheduling work. If an ancestor is already queued,
    // the new node is covered; if the new node is the ancestor, discard its queued descendants.
    for(const existing of state.smartDarkMutationRoots){
      if(existing===node||existing.contains?.(node))return;
      if(node.contains?.(existing))state.smartDarkMutationRoots.delete(existing);
    }
    state.smartDarkMutationRoots.add(node);
    // Bound pathological mutation storms. The viewport/action paths will catch anything discarded.
    if(state.smartDarkMutationRoots.size>48){
      const keep=[...state.smartDarkMutationRoots].slice(-32);
      state.smartDarkMutationRoots.clear();for(const el of keep)state.smartDarkMutationRoots.add(el);
    }
    if(state.smartDarkMutationFrame)return;
    const flush=()=>{
      state.smartDarkMutationFrame=0;
      if(!state.config.smartDarkMode||!document.documentElement?.hasAttribute("data-persianyar-smart-dark-active")){state.smartDarkMutationRoots.clear();return}
      const roots=[...state.smartDarkMutationRoots].slice(0,smartDarkBudget("mutationRootsPerFrame"));
      for(const root of roots)state.smartDarkMutationRoots.delete(root);
      for(const root of roots){
        if(!root.isConnected)continue;
        if(root.shadowRoot&&!state.shadowRoots.has(root.shadowRoot))registerShadowRoot(root.shadowRoot);
        markSmartDarkImmediate(root,smartDarkBudget("mutationImmediateNodes"),false);
        scheduleSmartDarkDeepScan(root,smartDarkBudget("mutationDeepSkip"),false);
      }
      if(state.smartDarkMutationRoots.size)state.smartDarkMutationFrame=requestAnimationFrame(flush);
      else scheduleSmartDarkViewportSweep();
    };
    state.smartDarkMutationFrame=requestAnimationFrame(flush);
  }

  function updateObserver() {
    const need = state.config.emojiEnabled || state.config.fontDelta !== 0 || hasTextFeatures(state.config) || state.config.softCorners || state.config.uniformCornersEnabled || state.config.removeShadows || state.config.smartDarkMode || state.config.softMotionEnabled || hasThemeAwareSiteStyles(state.config);
    if (!need) { state.observer?.disconnect(); state.observer = null; state.observerSignature = ""; state.queue.clear(); state.decorQueue.clear(); return; }
    if (!document.documentElement) return;
    const attrs = new Set();
    if (state.config.localizeEnabled) localizationAttributesFor(document.documentElement).forEach(x=>attrs.add(x));
    if (state.config.emojiEnabled) ["aria-label","data-emoji","title","alt"].forEach(x=>attrs.add(x));
    if (state.config.softMotionEnabled) ["aria-expanded","aria-pressed","aria-selected","aria-checked","aria-current","aria-hidden","aria-label","title","placeholder","data-state","open"].forEach(x=>attrs.add(x));
    if (state.config.smartDarkMode || state.config.liquidGlassMode || state.config.linearStyleMode || state.config.adaptiveMenusMode) ["class","role","bgcolor","color","hidden","open","aria-hidden","aria-modal","aria-expanded","aria-selected","aria-current","aria-haspopup","aria-controls","data-state","data-theme","data-color-mode"].forEach(x=>attrs.add(x));
    const attributeFilter = [...attrs];
    const observeChars = !!(state.config.emojiEnabled || state.config.fontDelta !== 0 || hasTextFeatures(state.config) || (state.config.softMotionEnabled && (state.config.motionCrossfadeEnabled || state.config.motionIconCrossfadeEnabled)));
    const signature = JSON.stringify({attrs:attributeFilter.sort(),chars:observeChars,soft:state.config.softMotionEnabled,loc:state.config.localizeEnabled,dark:state.config.smartDarkMode?(getSmartDarkCssEngine()?"css":"element"):false});
    if (state.observer && state.observerSignature === signature) return;
    state.observer?.disconnect();
    state.observerSignature = signature;
    state.observer = new MutationObserver(records => {
      const processNodes = needsQueuedNodeProcessing();
      const cssEngine=state.config.smartDarkMode?getSmartDarkCssEngine():null;
      if(cssEngine){
        for(const record of records){
          const t=record.target;
          if((t instanceof HTMLStyleElement)||(t instanceof HTMLLinkElement&&t.rel?.includes("stylesheet"))||(t?.parentElement instanceof HTMLStyleElement)){cssEngine.scheduleRefresh?.("style-text",35);break;}
        }
      }
      for (const record of records) {
        if (record.type === "characterData") {
          if (state.config.softMotionEnabled && record.target?.parentElement) animateUiCrossfade(record.target.parentElement);
          if (processNodes) queueNode(record.target);
        } else if (record.type === "attributes") {
          if (record.target?.nodeType === Node.ELEMENT_NODE) {
            if (state.config.softMotionEnabled) handleSoftAttributeMutation(record.target, record.attributeName);
            if(state.config.smartDarkMode&&document.documentElement?.hasAttribute("data-persianyar-smart-dark-active")){
              invalidateSmartDarkPaint(record.target,false);queueSmartDarkMutationRoot(record.target);
            }
            if (processNodes) queueNode(record.target);
          }
        } else {
          for (const node of record.addedNodes) {
            const contextHot=isContextMenuHotWindow();
            if(state.config.smartDarkMode&&document.documentElement?.hasAttribute("data-persianyar-smart-dark-active")&&node?.nodeType===Node.ELEMENT_NODE){
              // Right-click menus share the main-thread dispatch with the page. During that short
              // window, only attach cheap semantic markers; CSS handles the first dark frame and
              // all computed-style/tree scans are coalesced until after the menu has opened.
              if(contextHot){
                queueContextMenuDeferredNode(node);
              }else{
                queueSmartDarkMutationRoot(node);
                if(smartDarkStylesheetNode(node))scheduleSmartDarkReconcile("stylesheet",true);
              }
            }
            if (processNodes) { if(contextHot)queueContextMenuDeferredNode(node); else queueNode(node); }
            if (!contextHot && state.config.softMotionEnabled && node?.nodeType === Node.ELEMENT_NODE) {
              discoverSoftFloatingSurfaces(node, false);
              processListMotion(node);
              processShimmer(node);
            }
          }
        }
      }
    });
    state.observer.observe(document.documentElement, {
      childList:true,
      subtree:true,
      characterData:observeChars,
      attributes:attributeFilter.length>0,
      attributeFilter:attributeFilter.length ? attributeFilter : undefined
    });
  }

  function clearAdaptiveVisualMarkers(attr, root=document) {
    try {
      if(root instanceof Element && root.hasAttribute(attr))root.removeAttribute(attr);
      root.querySelectorAll?.(`[${attr}]`).forEach(el=>el.removeAttribute(attr));
    } catch {}
  }

  function collectAdaptiveCandidates(root, selector, limit=220) {
    const out=[];
    try { if(root instanceof Element && root.matches?.(selector))out.push(root); } catch {}
    try {
      const list=root?.querySelectorAll?.(selector)||[];
      for(const el of list){ if(out.length>=limit)break; if(!out.includes(el))out.push(el); }
    } catch {}
    return out;
  }

  function visualElementInfo(el) {
    if(!(el instanceof HTMLElement) || !el.isConnected)return null;
    let cs,rect;
    try { cs=getComputedStyle(el); rect=el.getBoundingClientRect(); } catch { return null; }
    if(!rect || rect.width<1 || rect.height<1 || cs.display==="none" || cs.display==="contents" || cs.visibility==="hidden" || Number(cs.opacity||1)<.03)return null;
    return {el,cs,rect};
  }

  function classifySmartGlass(info) {
    const {el,cs,rect}=info;
    const vw=Math.max(1,document.documentElement?.clientWidth||innerWidth||1),vh=Math.max(1,document.documentElement?.clientHeight||innerHeight||1);
    const area=rect.width*rect.height,viewportArea=vw*vh;
    if(rect.width<140||rect.height<38||area<7000||area>viewportArea*.82)return "";
    if(el.matches?.("a,button,input,textarea,select,summary,[role='button'],[role='link'],[role='menuitem'],[role='option'],[role='tab'],li"))return "";
    if(el.closest?.("article,[role='article']") && !/^(?:fixed|sticky)$/.test(cs.position))return "";
    const floating=el.matches?.("dialog[open],[role='dialog'],[aria-modal='true'],[role='menu']:not([hidden]),[role='listbox']:not([hidden]),[popover]:popover-open,.MuiMenu-paper,.MuiPopover-paper,.ant-dropdown,.ant-popover-inner,.ant-select-dropdown,.chakra-menu__menu-list,[data-radix-menu-content],[data-radix-popover-content],[data-radix-dropdown-menu-content],[data-slot*='dropdown-menu-content' i],[data-slot*='popover-content' i],[data-testid*='dropdown' i],[data-testid*='popover' i],[class*='dropdown-menu' i],[class*='context-menu' i],[class*='contextmenu' i],[class*='popover-content' i]");
    if(floating)return "float";
    // Do not turn image-backed banners/sidebars into glass. Their image is part of the site's
    // authored visual identity and would also hide most of the backdrop effect.
    if(/url\(/i.test(String(cs.backgroundImage||"")))return "";
    const shell=el.matches?.("header,aside,body>nav,[role='banner'],[role='navigation'],.navbar,.MuiAppBar-root,.MuiDrawer-paper,.ant-layout-header,.ant-layout-sider,ytcp-navigation-drawer,ytd-masthead,[class*='navigation-drawer' i],[class*='nav-drawer' i],[class*='app-sidebar' i],[class*='app-header' i],[class*='topbar' i],[class*='top-bar' i],[class*='sidebar' i],[class*='side-bar' i]");
    if(!shell)return "";
    const nearTop=rect.top<=10,nearBottom=rect.bottom>=vh-10,nearLeft=rect.left<=10,nearRight=rect.right>=vw-10;
    const fixed=/^(?:fixed|sticky)$/.test(cs.position);
    const horizontal=rect.width>=vw*.42 && rect.height<=Math.min(190,vh*.26) && (nearTop||nearBottom||fixed);
    const vertical=rect.height>=vh*.34 && rect.width<=Math.min(460,vw*.46) && (nearLeft||nearRight||fixed);
    return horizontal||vertical?"shell":"";
  }

  function isSmartLinearSurface(info, glassType="", insidePendingGlass=false) {
    const {el,cs,rect}=info;
    if(rect.width<22||rect.height<18)return "";
    if(glassType)return "surface";
    if(insidePendingGlass || el.parentElement?.closest?.(`[${GLASS_SURFACE_ATTR}]`))return "";
    if(el.matches?.("input:not([type='hidden']),textarea,select,[role='textbox'],[role='searchbox'],[role='combobox']"))return "control";
    const semanticSurface=el.matches?.("dialog,[role='dialog'],[role='card'],[class*='card' i],[class*='panel' i],[class*='modal-content' i],[class*='popover' i]");
    if(semanticSurface && rect.width*rect.height>=5000)return "surface";
    if(el.matches?.("button,[role='button']")){
      if(el.closest?.("nav,aside,[role='navigation'],[role='menu']"))return "";
      const widths=[cs.borderTopWidth,cs.borderRightWidth,cs.borderBottomWidth,cs.borderLeftWidth].map(parseFloat);
      const hasBorder=widths.some(v=>Number.isFinite(v)&&v>.25) && [cs.borderTopStyle,cs.borderRightStyle,cs.borderBottomStyle,cs.borderLeftStyle].some(v=>v&&v!=="none"&&v!=="hidden");
      const bg=parseRgb(cs.backgroundColor); const hasFill=!!bg && (bg[3]??1)>.08;
      if(hasBorder||hasFill)return "control";
    }
    return "";
  }

  function markAdaptiveVisualSurfaces(root) {
    const wantsGlass=!!state.config.liquidGlassMode,wantsLinear=!!state.config.linearStyleMode;
    if(!wantsGlass&&!wantsLinear)return;
    const baseSelector=wantsLinear?SMART_LINEAR_CANDIDATE_SELECTOR:SMART_GLASS_CANDIDATE_SELECTOR;
    const selector=`${baseSelector},[${GLASS_SURFACE_ATTR}],[${LINEAR_SURFACE_ATTR}]`;
    const candidates=collectAdaptiveCandidates(root,selector,220);
    if(!candidates.length)return;
    const infos=[];for(const el of candidates){const info=visualElementInfo(el);if(info)infos.push(info)}
    const glassAssignments=new Map(),linearAssignments=new Map(),acceptedGlass=[];
    // Glass and line classification are deliberately two passes. This means a sidebar can be
    // accepted as one glass surface before its nested buttons/cards are considered for hairlines,
    // so children never get the "every item is boxed" look on the first frame.
    for(const info of infos){
      let glassType="";
      if(wantsGlass){
        glassType=classifySmartGlass(info);
        if(glassType){
          const markedAncestor=info.el.parentElement?.closest?.(`[${GLASS_SURFACE_ATTR}]`);
          const acceptedAncestor=acceptedGlass.find(item=>item.el.contains(info.el));
          // A real popup/dropdown may live inside the sidebar DOM and still deserves its own glass
          // pane. Only suppress nested wrappers of the same floating surface; shell-in-shell is
          // always redundant.
          const sameTypeCount=acceptedGlass.reduce((n,item)=>n+(item.type===glassType?1:0),0);
          const overBudget=glassType==="shell"?sameTypeCount>=4:sameTypeCount>=8;
          if(overBudget ||
             (glassType==="float" && ((markedAncestor?.getAttribute?.(GLASS_SURFACE_ATTR)==="float") || acceptedAncestor?.type==="float")) ||
             (glassType==="shell" && (markedAncestor || acceptedAncestor)))glassType="";
          else acceptedGlass.push({el:info.el,type:glassType});
        }
        glassAssignments.set(info.el,glassType);
      }
    }
    if(wantsLinear){
      for(const info of infos){
        const glassType=glassAssignments.get(info.el)||"";
        const insidePendingGlass=acceptedGlass.some(item=>item.el!==info.el&&item.el.contains(info.el));
        linearAssignments.set(info.el,isSmartLinearSurface(info,glassType,insidePendingGlass));
      }
    }
    for(const info of infos){
      const el=info.el;
      if(wantsGlass){const type=glassAssignments.get(el)||"";if(type)el.setAttribute(GLASS_SURFACE_ATTR,type);else el.removeAttribute(GLASS_SURFACE_ATTR)}
      if(wantsLinear){const type=linearAssignments.get(el)||"";if(type)el.setAttribute(LINEAR_SURFACE_ATTR,type);else el.removeAttribute(LINEAR_SURFACE_ATTR)}
    }
  }

  function queueDecorNode(node) {
    if (!node || (!state.config.softCorners && !state.config.uniformCornersEnabled && !state.config.removeShadows && !state.config.liquidGlassMode && !state.config.linearStyleMode)) return;
    state.decorQueue.add(node);
    if (state.decorQueued) return;
    state.decorQueued = true;
    const run = deadline => {
      state.decorQueued = false;
      const batch = compactNodeBatch([...state.decorQueue]);
      state.decorQueue.clear();
      let processed = 0;
      for (const item of batch) {
        if (deadline?.timeRemaining && deadline.timeRemaining() < 2 && processed > 0) {
          state.decorQueue.add(item);
          continue;
        }
        if (state.config.softCorners) markSoftCorners(item);
        if (state.config.uniformCornersEnabled) markUniformCorners(item);
        if (state.config.removeShadows) markShadowOutlines(item);
        if (state.config.liquidGlassMode || state.config.linearStyleMode) markAdaptiveVisualSurfaces(item);
        processed++;
        // Keep a single idle slice bounded even on very large SPA mutation bursts.
        if (processed >= 8) {
          for (const rest of batch.slice(processed)) state.decorQueue.add(rest);
          break;
        }
      }
      if (state.decorQueue.size) {
        state.decorQueued = true;
        if (typeof requestIdleCallback === "function") requestIdleCallback(run, {timeout:180});
        else setTimeout(() => run(null), 48);
      }
    };
    if (typeof requestIdleCallback === "function") requestIdleCallback(run, {timeout:160});
    else setTimeout(() => run(null), 40);
  }

  function queueNode(node) {
    if (!node) return;
    state.queue.add(node);
    if (state.flushQueued) return;
    state.flushQueued = true;
    // React/SPA mutation bursts are coalesced to one pass per visual frame instead of repeatedly
    // rescanning the same subtree in microtasks between paints.
    const flush = () => {
      state.flushQueued = false;
      const batch = compactNodeBatch([...state.queue]);
      state.queue.clear();
      for (const item of batch) {
        if (state.config.emojiEnabled) scanEmojiNode(item);
        if (state.config.fontDelta) snapshotAndApplySizes(item);
        if (hasTextFeatures(state.config)) scanTextFeatures(item);
        if (state.config.softCorners || state.config.uniformCornersEnabled || state.config.removeShadows || state.config.liquidGlassMode || state.config.linearStyleMode) queueDecorNode(item);
        if (state.config.softMotionEnabled) { processListMotion(item); processShimmer(item); }
        discoverShadowRoots(item);
      }
    };
    if (document.visibilityState === "visible" && typeof requestAnimationFrame === "function") requestAnimationFrame(flush);
    else setTimeout(flush, 16);
  }

  function compactNodeBatch(nodes) {
    const out = [];
    for (const node of nodes) {
      if (!node?.isConnected && node?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) continue;
      if (out.some(existing => existing === node || (existing.nodeType === Node.ELEMENT_NODE && existing.contains?.(node)))) continue;
      out.push(node);
    }
    return out;
  }

  function scanEmojiNode(root) {
    if (!root || !state.config.emojiEnabled) return;
    if (root.nodeType === Node.TEXT_NODE) return wrapEmojiTextNode(root);
    if (![Node.ELEMENT_NODE, Node.DOCUMENT_NODE, Node.DOCUMENT_FRAGMENT_NODE].includes(root.nodeType)) return;
    if (root.nodeType === Node.ELEMENT_NODE) {
      if (convertEmojiImage(root)) return;
      if (markSemanticEmojiElement(root)) return;
      if (shouldSkipEmojiElement(root)) return;
    }
    root.querySelectorAll?.("img[alt]").forEach(convertEmojiImage);
    root.querySelectorAll?.("[role='img'][aria-label],[role='img'][data-emoji],[data-emoji]").forEach(markSemanticEmojiElement);
    const nodes = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !hasEmoji(node.nodeValue) || !node.parentElement || shouldSkipEmojiElement(node.parentElement)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    let node; while ((node = walker.nextNode())) nodes.push(node);
    for (const textNode of nodes) wrapEmojiTextNode(textNode);
  }

  function emojiAssetStyleReady() {
    return !!state.loadedEmojiStyles.has(state.config.emojiStyle);
  }

  function convertEmojiImage(element) {
    if (!(element instanceof HTMLImageElement) || !emojiAssetStyleReady()) return false;
    const alt = String(element.getAttribute("alt") || "").trim();
    if (!alt || !isSingleEmojiString(alt)) return false;

    // Never ask layout/computed-style for an emoji image. getBoundingClientRect()/getComputedStyle()
    // can force a style/layout flush and make a host SPA load unrelated lazy webfonts. Use only
    // metadata already present on the image node or its decoded intrinsic dimensions.
    const signature = [element.currentSrc, element.src, element.className, element.getAttribute("data-testid"), element.getAttribute("data-emoji"), element.getAttribute("itemprop")].filter(Boolean).join(" ");
    const attrWidth = Number.parseFloat(element.getAttribute("width") || "") || 0;
    const attrHeight = Number.parseFloat(element.getAttribute("height") || "") || 0;
    const naturalWidth = Number(element.naturalWidth) || 0;
    const naturalHeight = Number(element.naturalHeight) || 0;
    const knownWidth = attrWidth || naturalWidth;
    const knownHeight = attrHeight || naturalHeight;
    const namedEmojiAsset = /(?:emoji|twemoji|emojione|openmoji|noto|reaction|sticker-emoji|twimg\.com\/emoji)/i.test(signature);
    const semanticContext = !!element.closest?.("[role='img'],[data-emoji],[class*='emoji' i],[class*='reaction' i],button,[role='button']");
    const smallIntrinsicAsset = knownWidth > 0 && knownHeight > 0 && knownWidth <= 192 && knownHeight <= 192;
    if (!namedEmojiAsset && !semanticContext && !smallIntrinsicAsset) return false;

    const semanticWrapper = element.parentElement?.closest?.("[role='img'][aria-label],[role='img'][data-emoji],[data-emoji]");
    if (semanticWrapper instanceof HTMLElement && semanticWrapper !== element && markSemanticEmojiElement(semanticWrapper)) return true;

    const existing = state.emojiImageOriginals.get(element);
    if (existing?.styleKey === state.config.emojiStyle && element.hasAttribute(EMOJI_IMAGE_ATTR)) return true;
    if (!existing) {
      state.emojiImageOriginals.set(element, {
        src: element.getAttribute("src"),
        srcset: element.getAttribute("srcset"),
        sizes: element.getAttribute("sizes"),
        styleKey: ""
      });
    }
    element.setAttribute(EMOJI_IMAGE_ATTR, "pending");
    renderEmojiImageInPlace(element, alt).catch(() => {
      if (element?.isConnected && element.getAttribute(EMOJI_IMAGE_ATTR) === "pending") element.removeAttribute(EMOJI_IMAGE_ATTR);
    });
    return true;
  }

  function emojiRenderCacheKey(emoji, styleKey, logicalSize = 128) {
    const size = Math.max(48, Math.min(192, Math.round(logicalSize || 128)));
    const dpr = Math.max(1, Math.min(2, Number(globalThis.devicePixelRatio) || 1));
    return `${styleKey}|${size}|${dpr}|${emoji}`;
  }

  function rememberEmojiRender(key, dataUrl) {
    if (!dataUrl) return;
    // Keep the hot reaction set in memory but bound it so emoji-heavy feeds never grow forever.
    if (state.emojiRenderCache.has(key)) state.emojiRenderCache.delete(key);
    state.emojiRenderCache.set(key, dataUrl);
    while (state.emojiRenderCache.size > 128) {
      const oldest = state.emojiRenderCache.keys().next().value;
      state.emojiRenderCache.delete(oldest);
    }
  }

  function rasterizeEmojiDataUrl(emoji, styleKey, logicalSize = 128) {
    const stack = EMOJI_STYLES[styleKey]?.stack || EMOJI_STYLES.system.stack;
    const size = Math.max(48, Math.min(192, Math.round(logicalSize || 128)));
    const dpr = Math.max(1, Math.min(2, Number(globalThis.devicePixelRatio) || 1));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D unavailable");
    ctx.scale(dpr, dpr);
    const fontStack = stack.map(f => `"${String(f).replace(/["\\]/g, "\\$&")}"`).join(",");
    let fontPx = size * .82;
    ctx.font = `${fontPx}px ${fontStack}`;
    let metrics = ctx.measureText(emoji);
    const bounds = (m, px) => ({
      width: Math.max(1, (m.actualBoundingBoxLeft || 0) + (m.actualBoundingBoxRight || m.width || 0)),
      height: Math.max(1, (m.actualBoundingBoxAscent || px * .8) + (m.actualBoundingBoxDescent || px * .2))
    });
    let b = bounds(metrics, fontPx);
    const scale = Math.min(1.08, (size * .88) / b.width, (size * .88) / b.height);
    if (Number.isFinite(scale) && scale > 0 && Math.abs(scale - 1) > .02) {
      fontPx = Math.max(16, fontPx * scale);
      ctx.font = `${fontPx}px ${fontStack}`;
      metrics = ctx.measureText(emoji);
      b = bounds(metrics, fontPx);
    }
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    const left = Number(metrics.actualBoundingBoxLeft || 0);
    const ascent = Number(metrics.actualBoundingBoxAscent || fontPx * .8);
    const x = (size - b.width) / 2 + left;
    const y = (size - b.height) / 2 + ascent;
    ctx.fillText(emoji, x, y);
    return canvas.toDataURL("image/png");
  }

  function scheduleEmojiRasterWork(work, timeout = 240, afterPaint = false) {
    // Never rasterize in a MutationObserver/right-click microtask. Canvas measureText/fillText/
    // toDataURL are synchronous and can delay the host menu's first paint. During a right-click,
    // force at least one visual frame before any cache miss is rasterized. Outside that hot path,
    // idle time is the cheapest place to fill the cache.
    if (afterPaint && document.visibilityState === "visible" && typeof requestAnimationFrame === "function") {
      requestAnimationFrame(() => setTimeout(work, 0));
      return;
    }
    if (typeof requestIdleCallback === "function") {
      requestIdleCallback(() => work(), { timeout });
      return;
    }
    if (document.visibilityState === "visible" && typeof requestAnimationFrame === "function") {
      requestAnimationFrame(() => setTimeout(work, 0));
      return;
    }
    setTimeout(work, 0);
  }

  function renderEmojiDataUrl(emoji, styleKey, logicalSize = 128) {
    if (!state.config.emojiEnabled || state.config.emojiStyle !== styleKey || !emojiAssetStyleReady()) return Promise.resolve("");
    const key = emojiRenderCacheKey(emoji, styleKey, logicalSize);
    const cached = state.emojiRenderCache.get(key);
    if (cached) {
      // LRU touch. A cache hit is synchronous and does no canvas/font work.
      state.emojiRenderCache.delete(key);
      state.emojiRenderCache.set(key, cached);
      return Promise.resolve(cached);
    }
    const inflight = state.emojiRenderInflight.get(key);
    if (inflight) return inflight;
    const promise = new Promise((resolve, reject) => {
      const afterPaint = isContextMenuHotWindow();
      scheduleEmojiRasterWork(() => {
        try {
          if (!state.config.emojiEnabled || state.config.emojiStyle !== styleKey || !emojiAssetStyleReady()) { resolve(""); return; }
          const dataUrl = rasterizeEmojiDataUrl(emoji, styleKey, logicalSize);
          rememberEmojiRender(key, dataUrl);
          resolve(dataUrl);
        } catch (error) { reject(error); }
      }, afterPaint ? 420 : 220, afterPaint);
    }).finally(() => state.emojiRenderInflight.delete(key));
    state.emojiRenderInflight.set(key, promise);
    return promise;
  }

  function scheduleEmojiReactionPrewarm(styleKey) {
    if (!state.config.emojiEnabled || state.config.emojiStyle !== styleKey || !emojiAssetStyleReady()) return;
    if (state.emojiPrewarmStyle === styleKey) return;
    state.emojiPrewarmStyle = styleKey;
    if (state.emojiPrewarmHandle && typeof cancelIdleCallback === "function") { try { cancelIdleCallback(state.emojiPrewarmHandle); } catch {} }
    clearTimeout(state.emojiPrewarmTimer);
    state.emojiPrewarmHandle = 0; state.emojiPrewarmTimer = 0;
    let index = 0;
    const run = deadline => {
      state.emojiPrewarmHandle = 0; state.emojiPrewarmTimer = 0;
      if (!state.config.emojiEnabled || state.config.emojiStyle !== styleKey || !emojiAssetStyleReady()) return;
      let count = 0;
      // Two or three glyphs per idle slice keeps startup smooth while making reaction menus hot.
      while (index < COMMON_REACTION_EMOJIS.length && count < 3) {
        if (count > 0 && deadline?.timeRemaining && deadline.timeRemaining() < 4) break;
        const emoji = COMMON_REACTION_EMOJIS[index++];
        const key = emojiRenderCacheKey(emoji, styleKey, 128);
        if (!state.emojiRenderCache.has(key) && !state.emojiRenderInflight.has(key)) {
          try {
            const dataUrl = rasterizeEmojiDataUrl(emoji, styleKey, 128);
            rememberEmojiRender(key, dataUrl);
          } catch {}
        }
        count++;
      }
      if (index >= COMMON_REACTION_EMOJIS.length) return;
      queue();
    };
    const queue = () => {
      if (typeof requestIdleCallback === "function") state.emojiPrewarmHandle = requestIdleCallback(run, { timeout: 900 });
      else state.emojiPrewarmTimer = setTimeout(() => run(null), 80);
    };
    queue();
  }

  async function renderEmojiImageInPlace(element, emoji) {
    if (!(element instanceof HTMLImageElement) || !element.isConnected || !state.config.emojiEnabled) return;
    const styleKey = state.config.emojiStyle;
    const dataUrl = await renderEmojiDataUrl(emoji, styleKey, 128);
    if (!dataUrl || !element.isConnected || state.config.emojiStyle !== styleKey) return;

    const record = state.emojiImageOriginals.get(element);
    if (record) record.styleKey = styleKey;
    // Keep the original <img> node and every layout-affecting attribute/style intact. Only swap
    // the image bytes; srcset/sizes are disabled so the browser cannot override the generated src.
    element.removeAttribute("srcset");
    element.removeAttribute("sizes");
    element.setAttribute("src", dataUrl);
    element.setAttribute(EMOJI_IMAGE_ATTR, "1");
  }

  function markSemanticEmojiElement(element) {
    if (!(element instanceof HTMLElement) || element instanceof HTMLImageElement || !emojiAssetStyleReady()) return false;
    const clear = () => {
      element.removeAttribute(EMOJI_SEMANTIC_ATTR);
      element.removeAttribute(EMOJI_CHAR_ATTR);
      element.removeAttribute(EMOJI_POSITION_ATTR);
      element.style.removeProperty("--fontyar-semantic-emoji-size");
      element.style.removeProperty("--fontyar-semantic-emoji-image");
    };
    if (element.closest?.(EDITABLE_ROOTS) || element.matches?.("button,a,input,textarea,select,[role='button'],[role='link']")) { clear(); return false; }
    const semantic = element.getAttribute("role") === "img" || element.hasAttribute("data-emoji");
    if (!semantic) { clear(); return false; }
    const candidates = [element.getAttribute("data-emoji"), element.getAttribute("aria-label"), element.getAttribute("title")]
      .map(value => String(value || "").trim()).filter(Boolean);
    const emoji = candidates.find(isSingleEmojiString) || "";
    if (!emoji) { clear(); return false; }
    const visibleText = String(element.textContent || "").trim();
    if (visibleText && hasEmoji(visibleText)) { clear(); return false; }

    // Avoid computed-style/layout reads. Restrict paint replacement to explicit visual emoji nodes.
    const classText = `${element.className || ""} ${element.getAttribute("data-testid") || ""}`;
    const visualChild = element.querySelector?.("svg,img,picture");
    const looksLikeEmojiAsset = !!visualChild || /emoji|reaction|sticker/i.test(classText) || element.hasAttribute("data-emoji");
    if (!looksLikeEmojiAsset) { clear(); return false; }

    element.setAttribute(EMOJI_SEMANTIC_ATTR, "pending");
    element.setAttribute(EMOJI_CHAR_ATTR, emoji);
    const styleKey = state.config.emojiStyle;
    renderEmojiDataUrl(emoji, styleKey, 128).then(dataUrl => {
      if (!dataUrl || !element.isConnected || !state.config.emojiEnabled || state.config.emojiStyle !== styleKey) return;
      element.style.setProperty("--fontyar-semantic-emoji-image", `url("${dataUrl}")`);
      element.setAttribute(EMOJI_SEMANTIC_ATTR, "1");
    }).catch(() => {
      if (element?.isConnected && element.getAttribute(EMOJI_SEMANTIC_ATTR) === "pending") clear();
    });
    return true;
  }

  function restoreSemanticEmojiElements() {
    const clearRoot = root => root?.querySelectorAll?.(`[${EMOJI_SEMANTIC_ATTR}]`).forEach(el => {
      el.removeAttribute(EMOJI_SEMANTIC_ATTR);
      el.removeAttribute(EMOJI_CHAR_ATTR);
      el.removeAttribute(EMOJI_POSITION_ATTR);
      el.style?.removeProperty?.("--fontyar-semantic-emoji-size");
      el.style?.removeProperty?.("--fontyar-semantic-emoji-image");
    });
    clearRoot(document);
    for (const shadow of state.shadowRoots || []) clearRoot(shadow);
  }

  function restoreEmojiImages() {
    const restoreRoot = root => root?.querySelectorAll?.(`img[${EMOJI_IMAGE_ATTR}]`).forEach(img => {
      const original = state.emojiImageOriginals.get(img);
      if (original) {
        if (original.src == null) img.removeAttribute("src"); else img.setAttribute("src", original.src);
        if (original.srcset == null) img.removeAttribute("srcset"); else img.setAttribute("srcset", original.srcset);
        if (original.sizes == null) img.removeAttribute("sizes"); else img.setAttribute("sizes", original.sizes);
        state.emojiImageOriginals.delete(img);
      }
      img.removeAttribute(EMOJI_IMAGE_ATTR);
    });
    restoreRoot(document);
    for (const shadow of state.shadowRoots || []) restoreRoot(shadow);
  }

  function unwrapEmojiSpans() {
    const unwrapRoot = root => root?.querySelectorAll?.(`span.${EMOJI_CLASS}:not([${EMOJI_IMAGE_ATTR}])`).forEach(span => {
      const text = document.createTextNode(span.textContent || "");
      const parent = span.parentNode;
      span.replaceWith(text);
      parent?.normalize?.();
    });
    unwrapRoot(document);
    for (const shadow of state.shadowRoots || []) unwrapRoot(shadow);
  }

  function hasEmoji(text) { return EMOJI_FAST_RE.test(String(text || "")); }
  function splitGraphemes(text) {
    if (segmenter) return Array.from(segmenter.segment(String(text || "")), part => part.segment);
    return String(text || "").match(/[#*0-9]\uFE0F?\u20E3|\p{Regional_Indicator}{2}|\p{Emoji_Modifier}|\p{Extended_Pictographic}(?:\uFE0F|\uFE0E)?(?:[\u{1F3FB}-\u{1F3FF}])?(?:[\u{E0020}-\u{E007E}]+\u{E007F})?(?:\u200D\p{Extended_Pictographic}(?:\uFE0F|\uFE0E)?(?:[\u{1F3FB}-\u{1F3FF}])?)*(?:[\u{E0020}-\u{E007E}]+\u{E007F})?|[^]/gu) || [String(text || "")];
  }
  function isEmojiGrapheme(value) { return EMOJI_GRAPHEME_RE.test(String(value || "")); }
  function isSingleEmojiString(value) {
    const input = String(value || "").trim();
    if (!input) return false;
    const parts = splitGraphemes(input);
    return parts.length === 1 && parts[0] === input && isEmojiGrapheme(input);
  }

  function wrapEmojiTextNode(node) {
    const parent = node.parentElement, text = node.nodeValue || "";
    if (!parent || shouldSkipEmojiElement(parent) || !hasEmoji(text)) return;
    const graphemes = splitGraphemes(text);
    if (!graphemes.some(isEmojiGrapheme)) return;
    const fragment = document.createDocumentFragment(); let buffer = "";
    const flush = () => { if (buffer) { fragment.append(document.createTextNode(buffer)); buffer = ""; } };
    for (const grapheme of graphemes) {
      if (!isEmojiGrapheme(grapheme)) { buffer += grapheme; continue; }
      flush();
      const span = document.createElement("span");
      span.className = EMOJI_CLASS;
      span.setAttribute(EMOJI_ATTR, "1");
      span.textContent = grapheme;
      fragment.append(span);
    }
    flush();
    node.replaceWith(fragment);
  }

  function fontAlias(fontKey, script) {
    const safeKey = String(fontKey || "font").replace(/[^a-z0-9_-]/gi, "_");
    const safeScript = String(script || "all").replace(/[^a-z]/gi, "").toUpperCase() || "ALL";
    return `__FontYar_${safeScript}_${safeKey}`;
  }

  function applyFontScriptMarks(config) {
    // Font faces already use unicode-range and the stylesheet targets text/form controls directly.
    // A full DOM text walk on every SPA update is therefore redundant and was the largest source
    // of jank on large dashboards. Keep legacy markers only until the feature is disabled.
    if (!config.enabled && state.fontScriptElements.size) clearFontScriptMarks();
  }


  function clearFontScriptMarks() {
    for (const el of state.fontScriptElements) if (el?.isConnected) el.removeAttribute(FONT_SCRIPT_ATTR);
    state.fontScriptElements.clear();
    document.querySelectorAll?.(`[${FONT_SCRIPT_ATTR}]`).forEach(el=>el.removeAttribute(FONT_SCRIPT_ATTR));
  }

  function syncUserOriginCss() {
    const css = [FONT_STYLE_ID,AUX_STYLE_ID,EMOJI_STYLE_ID,SOFT_STYLE_ID,SITE_STYLE_ID,CURSOR_STYLE_ID]
      .map(id => document.getElementById(id)?.textContent || "")
      .filter(Boolean)
      .join("\n");
    if (css === state.userCssSignature) return;
    state.userCssSignature = css;
    const revision=++state.userCssRevision;
    chrome.runtime.sendMessage({ type:"fontyar:set-user-css", css, documentToken:DOCUMENT_TOKEN, revision })
      .catch(() => { if(state.userCssRevision===revision)state.userCssSignature = ""; });
  }

  function updateShadowSweep(config) {
    if(state.shadowSweepTimer){clearInterval(state.shadowSweepTimer);state.shadowSweepTimer=0;}
    state.shadowSweepWalker=null;
    if(!needsShadowSupport(config))return;
    // A full querySelectorAll("*") every few seconds was catastrophic on large SPAs. Use a tiny
    // incremental TreeWalker instead: at most ~220 nodes per pass, only while the tab is visible.
    state.shadowSweepTimer=setInterval(()=>{
      if(document.visibilityState!=="visible"||!document.documentElement)return;
      if(!state.shadowSweepWalker){
        try{state.shadowSweepWalker=document.createTreeWalker(document.documentElement,NodeFilter.SHOW_ELEMENT)}catch{return}
      }
      let scanned=0,node;
      while(scanned++<220 && (node=state.shadowSweepWalker.nextNode())){
        if(node.shadowRoot&&!state.shadowRoots.has(node.shadowRoot))registerShadowRoot(node.shadowRoot);
      }
      if(!node)state.shadowSweepWalker=null;
    },6000);
  }

  function discoverShadowRoots(root, limit=480) {
    if (!root) return;
    const inspect=el=>{if(el?.shadowRoot&&!state.shadowRoots.has(el.shadowRoot))registerShadowRoot(el.shadowRoot)};
    if(root.nodeType===Node.ELEMENT_NODE)inspect(root);
    let walker;
    try{walker=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT)}catch{return}
    let node,count=0;
    while((node=walker.nextNode())&&count++<limit)inspect(node);
  }

  function shadowObserverNeeded(config=state.config) {
    return !!(config.enabled || config.emojiEnabled || config.fontDelta !== 0 || hasTextFeatures(config) || config.softCorners || config.uniformCornersEnabled || config.removeShadows || config.smartDarkMode || config.softMotionEnabled || hasThemeAwareSiteStyles(config));
  }

  function ensureShadowObserver(shadowRoot) {
    const needed=shadowObserverNeeded();
    const attrs=new Set();
    if(state.config.localizeEnabled) localizationAttributesFor(document.documentElement).forEach(x=>attrs.add(x));
    if(state.config.emojiEnabled) ["aria-label","data-emoji","title","alt"].forEach(x=>attrs.add(x));
    if(state.config.softMotionEnabled) ["aria-expanded","aria-pressed","aria-selected","aria-checked","aria-current","aria-hidden","aria-label","title","placeholder","data-state","open"].forEach(x=>attrs.add(x));
    if(state.config.smartDarkMode) ["class","bgcolor","color","hidden","open","aria-hidden","aria-modal","aria-expanded","aria-selected","aria-current","aria-haspopup","aria-controls","data-state","data-theme","data-color-mode"].forEach(x=>attrs.add(x));
    const attributeFilter=[...attrs].sort();
    const observeChars=!!(state.config.emojiEnabled||state.config.fontDelta!==0||hasTextFeatures(state.config)||(state.config.softMotionEnabled&&(state.config.motionCrossfadeEnabled||state.config.motionIconCrossfadeEnabled)));
    const signature=needed?JSON.stringify({a:attributeFilter,c:observeChars,d:state.config.smartDarkMode?(getSmartDarkCssEngine()?"css":"element"):false,s:!!state.config.softMotionEnabled,l:!!state.config.localizeEnabled}):"off";
    if(state.shadowObserverSignatures.get(shadowRoot)===signature)return;
    const existing=state.shadowObservers.get(shadowRoot);
    if(existing){try{existing.disconnect()}catch{} state.shadowObservers.delete(shadowRoot)}
    state.shadowObserverSignatures.set(shadowRoot,signature);
    if(!needed)return;
    try {
      const observer = new MutationObserver(records=>{
        const processNodes=needsQueuedNodeProcessing();
        const cssEngine=state.config.smartDarkMode?getSmartDarkCssEngine():null;
        if(cssEngine){
          for(const record of records){
            const t=record.target;
            if((t instanceof HTMLStyleElement)||(t instanceof HTMLLinkElement&&t.rel?.includes("stylesheet"))||(t?.parentElement instanceof HTMLStyleElement)){cssEngine.scheduleRefresh?.("shadow-style-text",35);break;}
          }
        }
        for (const record of records) {
          if (record.type === "characterData") {
            if(state.config.softMotionEnabled&&record.target?.parentElement)animateUiCrossfade(record.target.parentElement);
            if(processNodes)queueNode(record.target);
          } else if(record.type==="attributes"){
            if(state.config.softMotionEnabled&&record.target instanceof HTMLElement)handleSoftAttributeMutation(record.target,record.attributeName);
            if(state.config.smartDarkMode&&document.documentElement?.hasAttribute("data-persianyar-smart-dark-active")){
              invalidateSmartDarkPaint(record.target,false);queueSmartDarkMutationRoot(record.target);
            }
            if(processNodes)queueNode(record.target);
          } else for (const node of record.addedNodes) {
            const contextHot=isContextMenuHotWindow();
            if(state.config.smartDarkMode&&document.documentElement?.hasAttribute("data-persianyar-smart-dark-active")&&node?.nodeType===Node.ELEMENT_NODE){
              const cssEngine=getSmartDarkCssEngine();
              if(cssEngine)cssEngine.noteMutation?.(node);
              else if(contextHot)queueContextMenuDeferredNode(node);else queueSmartDarkMutationRoot(node);
            }
            if(processNodes){if(contextHot)queueContextMenuDeferredNode(node);else queueNode(node)}
            if(!contextHot&&state.config.softMotionEnabled&&node?.nodeType===Node.ELEMENT_NODE){discoverSoftFloatingSurfaces(node,false);processListMotion(node);processShimmer(node);processScrollFade(node);}
            if(!contextHot)discoverShadowRoots(node,160);
          }
        }
      });
      observer.observe(shadowRoot,{childList:true,subtree:true,characterData:observeChars,attributes:attributeFilter.length>0,attributeFilter:attributeFilter.length?attributeFilter:undefined});
      state.shadowObservers.set(shadowRoot,observer);
    } catch {}
  }
  function registerShadowRoot(shadowRoot) {
    if (!shadowRoot) return;
    const first=!state.shadowRoots.has(shadowRoot);
    if(first){state.shadowRoots.add(shadowRoot);syncShadowStyles(shadowRoot)}
    ensureShadowObserver(shadowRoot);
    if(!first)return;
    if (hasTextFeatures(state.config)) scanTextFeatures(shadowRoot);
    if (state.config.emojiEnabled) scanEmojiNode(shadowRoot);
    if (state.config.fontDelta) snapshotAndApplySizes(shadowRoot);
    if (state.config.softMotionEnabled) runSoftMotionActivation(shadowRoot);
    if (state.config.softCorners || state.config.uniformCornersEnabled || state.config.removeShadows || state.config.liquidGlassMode || state.config.linearStyleMode) queueDecorNode(shadowRoot);
    if (state.config.smartDarkMode && document.documentElement?.hasAttribute("data-persianyar-smart-dark-active")) {
      const cssEngine=getSmartDarkCssEngine();
      if(cssEngine)cssEngine.registerRoot?.(shadowRoot);
      markSmartDarkImmediate(shadowRoot,24,false); scheduleSmartDarkDeepScan(shadowRoot,24,false);
    }
  }

  function refreshShadowObservers(){for(const shadowRoot of state.shadowRoots)if(shadowRoot?.host?.isConnected)ensureShadowObserver(shadowRoot)}

  function syncAllShadowStyles() {
    if(!state.shadowRoots.size)return;
    if(state.shadowStyleSyncFrame||state.shadowStyleSyncTimer)return;
    const flush=()=>{
      state.shadowStyleSyncFrame=0;state.shadowStyleSyncTimer=0;
      for (const shadowRoot of [...state.shadowRoots]) {
        if (shadowRoot?.host?.isConnected) syncShadowStyles(shadowRoot);
        else { state.shadowObservers.get(shadowRoot)?.disconnect?.(); state.shadowObservers.delete(shadowRoot); state.shadowRoots.delete(shadowRoot); }
      }
    };
    if(document.visibilityState==="visible"&&typeof requestAnimationFrame==="function")state.shadowStyleSyncFrame=requestAnimationFrame(flush);
    else state.shadowStyleSyncTimer=setTimeout(flush,32);
  }
  function syncShadowStyles(shadowRoot) {
    if (!shadowRoot) return;
    const shadowHost=shadowRoot.host;
    if(shadowHost instanceof Element)shadowHost.toggleAttribute(DARK_SHADOW_HOST_ATTR,!!document.documentElement?.hasAttribute("data-persianyar-smart-dark-active"));
    for (const id of [FONT_STYLE_ID,AUX_STYLE_ID,EMOJI_STYLE_ID,SOFT_STYLE_ID,SITE_STYLE_ID,CURSOR_STYLE_ID]) {
      const source = document.getElementById(id);
      let clone = shadowRoot.querySelector?.(`style[${SHADOW_STYLE_ATTR}="${id}"]`);
      if (!source) { clone?.remove(); continue; }
      if (!clone) {
        clone = document.createElement("style");
        clone.setAttribute(SHADOW_STYLE_ATTR,id);
        // Append, rather than prepend, so our !important rules come after component author styles.
        shadowRoot.append(clone);
      }
      const sourceCss = source.textContent || "";
      let cached=state.shadowCssCache.get(id);
      if(!cached||cached.source!==sourceCss){
        // Transform each generated stylesheet once, not once per shadow root. Large component apps
        // can expose hundreds of roots; regex work should scale with stylesheets, not components.
        let css=sourceCss;
        // Smart-dark rules inside Shadow DOM stay gated by a host attribute instead of becoming
        // unconditional. This makes enable/disable truly live even before the cloned stylesheet is
        // refreshed, and prevents stale USER/shadow CSS from leaving components dark after toggle-off.
        if(id===SITE_STYLE_ID)css=css.replace(/html\[data-persianyar-smart-dark-active\]/g, `:host([${DARK_SHADOW_HOST_ATTR}="1"])`);
        css=css
          .replace(/html\[data-fontyar-enabled="1"\]\s*/g, "")
          .replace(/html\[data-fontyar-emoji-enabled="1"\]\[data-fontyar-emoji-enabled="1"\]\s*/g, "")
          .replace(/html\[data-fontyar-soft-motion="1"\]\s*/g, "")
          .replace(/html\[data-fontyar-remove-shadows="1"\]\s*/g, "")
          .replace(/html\[data-fontyar-smooth-scroll="1"\]\s*/g, "")
          .replace(/html\[data-persianyar-smart-dark="1"\]\s*/g, "")
          .replace(/html\[data-persianyar-smart-dark-active\]\s*/g, "")
          .replace(/html\[data-persianyar-smart-dark-active\]\s+/g, "")
          .replace(/html\[data-persianyar-liquid-glass="1"\]\s*/g, "")
          .replace(/html\[data-persianyar-linear="1"\]\s*/g, "")
          .replace(/html\[data-persianyar-adaptive-menus="1"\]\s*/g, "")
          .replace(/html\[data-persianyar-focus="1"\]\s*/g, "")
          .replace(/html\[data-persianyar-inputs="1"\]\s*/g, "")
          .replace(/html\[data-persianyar-custom-cursor="1"\]\s*/g, "")
          .replace(/html\[data-persianyar-cursor-overlay="1"\]\s*/g, "");
        cached={source:sourceCss,css};state.shadowCssCache.set(id,cached);
      }
      if (clone.textContent !== cached.css) clone.textContent = cached.css;
    }
  }

  function updateSmoothScrollListener(config) {
    if (config.smoothScrollEnabled) {
      if (!globalThis.__fontyarSmoothWheelBound) {
        globalThis.__fontyarSmoothWheelBound = true;
        addEventListener("wheel", onSmoothWheel, { passive:false, capture:true });
      }
    } else if (globalThis.__fontyarSmoothWheelBound) {
      globalThis.__fontyarSmoothWheelBound = false;
      removeEventListener("wheel", onSmoothWheel, { capture:true });
      if (state.wheelAnimation) cancelAnimationFrame(state.wheelAnimation.raf);
      state.wheelAnimation = null;
    }
  }

  function onSmoothWheel(event) {
    if (!state.config.smoothScrollEnabled || prefersReducedMotion() || event.defaultPrevented || event.ctrlKey || event.metaKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
    // Keep trackpads/native precision scrolling untouched; smooth classic wheel notches only.
    if (event.deltaMode === 0 && Math.abs(event.deltaY) < 28) return;
    const target = nearestScrollable(event.target);
    if (!target || isFragileScrollSurface(target)) return;
    const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight * .85 : 1);
    event.preventDefault();
    animateScrollBy(target, delta);
  }

  function isFragileScrollSurface(target){
    if(!(target instanceof Element))return false;try{if(target.matches("[data-testid='cellInnerDiv'],[data-testid='ScrollSnap-List'],[data-testid='ScrollSnap-SwipeableList'],#items.ytd-grid-renderer"))return true;const cs=getComputedStyle(target);if(cs.scrollSnapType&&cs.scrollSnapType!=="none")return true;}catch{}return false;
  }

  function nearestScrollable(start) {
    let el = start instanceof Element ? start : start?.parentElement;
    while (el && el !== document.documentElement) {
      const cs = getComputedStyle(el);
      if (/(auto|scroll)/.test(cs.overflowY) && el.scrollHeight > el.clientHeight + 2) return el;
      el = el.parentElement;
    }
    return document.scrollingElement || document.documentElement;
  }

  function animateScrollBy(target, delta) {
    const max = Math.max(0,target.scrollHeight-target.clientHeight);
    let anim = state.wheelAnimation;
    if (!anim || anim.target !== target) {
      if (anim?.raf) cancelAnimationFrame(anim.raf);
      anim = { target, targetY: target.scrollTop, raf:0, last:performance.now() };
      state.wheelAnimation = anim;
    }
    // Accumulate wheel notches instead of cancel/restarting an easing curve for every event.
    // That removes the sticky/jittery feeling while keeping each frame to one scrollTop write.
    anim.targetY = Math.max(0,Math.min(max, anim.targetY + delta * .82));
    anim.last = performance.now();
    if (anim.raf) return;
    let lastFrame=performance.now();
    const step = (now) => {
      if (state.wheelAnimation !== anim) return;
      const dt=Math.min(34,Math.max(1,now-lastFrame));lastFrame=now;
      const current = target.scrollTop;
      const distance = anim.targetY - current;
      if (Math.abs(distance) < .55) { target.scrollTop=anim.targetY;anim.raf=0;state.wheelAnimation=null;return; }
      const alpha=1-Math.exp(-dt/42); target.scrollTop=current+distance*Math.min(.42,alpha);
      anim.raf=requestAnimationFrame(step);
    };
    anim.raf=requestAnimationFrame(step);
  }

  function shouldSkipEmojiElement(el) {
    try {
      if (!el) return true;
      if (el.closest?.(EDITABLE_ROOTS)) return true;
      // Emoji pickers frequently combine role=img/data-emoji with generic icon classes or
      // aria-hidden. If that semantic wrapper contains exactly one real emoji, let it through
      // unless it lives in a genuinely unsafe root such as SVG/code/editor content.
      const semantic = el.closest?.("[role='img'],[data-emoji]");
      if (semantic instanceof HTMLElement && !semantic.closest?.(EMOJI_HARD_SKIP_ROOTS)) {
        const text = String(semantic.textContent || "").trim();
        const labels = [semantic.getAttribute("data-emoji"), semantic.getAttribute("aria-label"), semantic.getAttribute("title")];
        if (isSingleEmojiString(text) || labels.some(isSingleEmojiString)) return false;
      }
      return !!el.closest?.(EMOJI_SKIP_ROOTS);
    } catch { return true; }
  }
  function isEditablePlaceholderUi(el) {
    if (!(el instanceof Element) || !state.config.localizeEnabled || !el.closest?.(EDITABLE_ROOTS)) return false;
    try {
      return el.id === "placeholder" || el.getAttribute("pseudo") === "-webkit-input-placeholder" || el.hasAttribute("data-placeholder") || el.hasAttribute("aria-placeholder") || el.matches?.("[data-testid*='placeholder' i],[class*='placeholder' i]");
    } catch { return false; }
  }
  function shouldSkipTextElement(el) {
    try {
      if (isEditablePlaceholderUi(el)) return false;
      if (isIconLigatureElement(el, el?.textContent || "")) return true;
      // Search Console sometimes renders visible table/header/message labels under aria-hidden or
      // presentation wrappers while keeping a parallel accessibility tree. Those wrappers were
      // previously skipped wholesale, leaving exact catalog strings such as Items/Trend/All types
      // in English. For this UI-only product, allow those two wrapper types but keep every real
      // icon, SVG, code/editor and editable root protected. Translation is still exact/dynamic-only.
      if(state.config.localizeEnabled && isSearchConsoleHost()) return !!el?.closest?.(`${EDITABLE_ROOTS},${FONT_PROTECTED_ROOTS}`);
      return !!el?.closest?.(TEXT_SKIP_ROOTS);
    } catch { return true; }
  }
  function isProtected(el) { try { return !!el?.closest?.(PROTECTED_ROOTS); } catch { return true; } }
  function isFontProtected(el) { try { return !!el?.closest?.(FONT_PROTECTED_ROOTS); } catch { return true; } }
  function hasDirectReadableText(el) { for (const child of el.childNodes || []) if (child.nodeType === Node.TEXT_NODE && child.nodeValue?.trim()) return true; return false; }

  function buildSafeSelector(tags) {
    // One :is() selector is materially cheaper to parse/match than repeating the same long
    // protection chain for every tag in the typography list.
    return `:is(${tags}):not(:is(${PROTECTED_ROOTS}))`;
  }

  function scopeSelector(prefix, selectors) {
    return String(selectors).split(",").map(selector => `${prefix} ${selector.trim()}`).join(",");
  }

  function sanitizeWeight(value, fallback) { const number = Number.parseInt(String(value),10); if (!Number.isFinite(number)) return fallback; return String(Math.min(900, Math.max(100, Math.round(number / 100) * 100))); }
  function sanitizeSmartDarkColor(value, fallback="#181a1b") { const v=String(value||"").trim().toLowerCase(); if(/^#[0-9a-f]{6}$/.test(v))return v; if(/^#[0-9a-f]{3}$/.test(v))return `#${v.slice(1).split("").map(c=>c+c).join("")}`; return String(fallback||"#181a1b").toLowerCase(); }
  function clampInt(value, min, max, fallback) { const n = Number.parseInt(String(value),10); return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback; }
  function escapeCss(value) { return String(value).replace(/\\/g,"\\\\").replace(/"/g,'\\"'); }
  function structuredCloneSafe(value) { try { return structuredClone(value); } catch { return JSON.parse(JSON.stringify(value)); } }
})();
