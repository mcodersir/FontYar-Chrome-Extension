const DEFAULT_CONFIG = Object.freeze({
  paused:false,
  enabled:false,
  fontKey:"Vazirmatn",
  fonts:{fa:"Vazirmatn",en:"Inter",ar:"NotoSansArabic",zh:"NotoSansSC"},
  unifiedFontEnabled:false,
  allFontKey:"Vazirmatn",
  align:"preserve",
  weightMode:"preserve",
  normalWeight:"400",
  boldWeight:"700",
  includeSubdomains:false,
  emojiEnabled:false,
  emojiStyle:"twemoji",
  fontDelta:0,
  digitMode:"preserve",
  digitFontDelta:0,
  zwnjMode:"preserve",
  bidiRepair:false,
  layoutEnhance:false,
  rtlBeta:false,
  cursorEnabled:false,
  cursorPackKey:"macos-black",
  cursorSize:32,
  cursorMotionEnabled:false,
  cursorMotionPreset:"smooth",
  cursorSmoothness:35,
  cursorTrailEnabled:false,
  cursorTrailLength:3,
  cursorClickEffectEnabled:true,
  cursorHoverScaleEnabled:true,
  cursorGlowEnabled:false,
  localizeEnabled:false,
  softMotionEnabled:false,
  motionHoverEnabled:true,
  motionPopEnabled:true,
  motionStaggerEnabled:true,
  motionCrossfadeEnabled:true,
  motionMorphEnabled:true,
  motionSharedLayoutEnabled:true,
  motionRubberEnabled:true,
  motionSafePolygonEnabled:true,
  motionListEnabled:true,
  motionShimmerEnabled:true,
  motionTooltipDelayEnabled:true,
  motionTabularNumsEnabled:true,
  motionScrollFadeEnabled:true,
  motionSliderMorphEnabled:true,
  motionSharedElementEnabled:true,
  motionIconCrossfadeEnabled:true,
  softCorners:false,
  uniformCornersEnabled:false,
  uniformCornerRadius:14,
  removeShadows:false,
  smoothScrollEnabled:false,
  smartDarkMode:false,
  smartDarkPreset:"balanced",
  smartDarkBackgroundColor:"#181a1b",
  smartDarkTextColor:"#e8e6e3",
  smartDarkAccentColor:"#8ab4f8",
  smartDarkBrightness:100,
  smartDarkContrast:100,
  smartDarkSepia:0,
  smartDarkGrayscale:0,
  liquidGlassMode:false,
  linearStyleMode:false,
  adaptiveMenusMode:false,
  focusEnhanceMode:false,
  polishedInputsMode:false,
  liquidGlassBlur:18,
  liquidGlassOpacity:58,
  liquidGlassSaturation:138,
  liquidGlassTintColor:"#8ab4f8",
  liquidGlassTintStrength:8,
  linearStyleColor:"#94a3b8",
  linearStyleOpacity:24,
  linearStyleWidth:1,
  menuHighlightStrength:12,
  focusRingColor:"#5b9cff",
  focusRingWidth:2,
  inputHighlightStrength:16
});

const SMART_DARK_PRESETS = Object.freeze([
  {key:"balanced",nameKey:"darkPresetBalanced",bg:"#181a1b",text:"#e8e6e3",accent:"#8ab4f8",line:"#94a3b8",brightness:100,contrast:100,sepia:0,grayscale:0},
  {key:"oled",nameKey:"darkPresetOled",bg:"#000000",text:"#f4f4f5",accent:"#7dd3fc",line:"#71717a",brightness:98,contrast:106,sepia:0,grayscale:0},
  {key:"graphite",nameKey:"darkPresetGraphite",bg:"#202124",text:"#e8eaed",accent:"#a8c7fa",line:"#6b7280",brightness:100,contrast:102,sepia:0,grayscale:0},
  {key:"midnight",nameKey:"darkPresetMidnight",bg:"#0d1117",text:"#c9d1d9",accent:"#58a6ff",line:"#485364",brightness:98,contrast:104,sepia:0,grayscale:0},
  {key:"navy",nameKey:"darkPresetNavy",bg:"#0f172a",text:"#e2e8f0",accent:"#60a5fa",line:"#475569",brightness:100,contrast:103,sepia:0,grayscale:0},
  {key:"warm",nameKey:"darkPresetWarm",bg:"#1c1917",text:"#f5e7d0",accent:"#d6a664",line:"#78716c",brightness:100,contrast:100,sepia:12,grayscale:0},
  {key:"violet",nameKey:"darkPresetViolet",bg:"#17131f",text:"#eee9f7",accent:"#c4a7e7",line:"#6d5f7b",brightness:100,contrast:102,sepia:0,grayscale:0},
  {key:"highContrast",nameKey:"darkPresetHighContrast",bg:"#101010",text:"#ffffff",accent:"#67e8f9",line:"#a1a1aa",brightness:102,contrast:118,sepia:0,grayscale:0}
]);
const SMART_DARK_PRESET_BY_KEY = Object.freeze(Object.fromEntries(SMART_DARK_PRESETS.map(p=>[p.key,p])));

const I18N = {
  fa:{unsupportedTitle:"این صفحه قابل تغییر نیست",unsupportedBody:"صفحات داخلی Chrome اجازه تزریق استایل نمی دهند.",siteTypography:"تایپوگرافی این سایت",on:"روشن",off:"خاموش",fontsByLanguage:"فونت هر زبان",fontSizeOffset:"افزایش اندازه فونت",fontSizeHint:"به اندازه فعلی هر متن اضافه می شود",alignment:"تراز",weight:"وزن",normalText:"متن معمولی",boldText:"متن بولد",digits:"نمایش اعداد",digitsHint:"بدون تغییر، فارسی، لاتین یا عربی",emojiStyle:"استایل ایموجی",emojiDownloadHint:"پک انتخابی دانلود و در کش افزونه نگه داشته می شود.",localizeTitle:"بومی سازی فارسی سایت",localizeBody:"عبارت های رابط انگلیسی شناخته شده را فقط وقتی تطبیق دقیق داشته باشند به فارسی تبدیل می کند؛ متن پست ها دست نمی خورد.",advanced:"موارد بیشتر",advancedHint:"رفتار فارسی و تنظیمات آزمایشی",zwnj:"نیم فاصله",zwnjHint:"حفظ، حذف یا افزودن هوشمند",bidiRepair:"اصلاح چیدمان متن فارسی",bidiRepairHint:"برای متن های ترکیبی RTL/LTR از جهت دهی امن استفاده می کند",rtlBeta:"راست چین خودکار سایت",rtlBetaHint:"ممکن است چیدمان بعضی سایت ها را تغییر دهد",subdomains:"اعمال روی زیردامنه ها",safeIcons:"Font Awesome، Material Icons، Lucide، کد و SVG محافظت می شوند.",extensionSettings:"تنظیمات افزونه",appearance:"ظاهر",system:"سیستم",light:"روشن",dark:"تیره",uiLanguage:"زبان افزونه",uiFontSize:"اندازه فونت خود افزونه",manageSites:"مدیریت سایت ها",resetSite:"بازنشانی این سایت",preserve:"حفظ سایت",custom:"سفارشی",right:"راست",left:"چپ",center:"وسط",justify:"دو طرفه",digitsPreserve:"بدون تغییر",digitsPersian:"فارسی ۱۲۳",digitsLatin:"لاتین 123",digitsArabic:"عربی ١٢٣",zwnjPreserve:"حفظ",zwnjRemove:"حذف نیم فاصله",zwnjSmart:"افزودن هوشمند (بتا)",cached:"کش شده",download:"دانلود",loading:"در حال دریافت",native:"سیستمی / سازگار",emojiReady:"پک آماده است",emojiSelect:"برای دانلود انتخاب کن",saved:"ذخیره شد",resetDone:"تنظیمات سایت پاک شد",siteUnavailable:"این صفحه پشتیبانی نمی شود",fontCount:"فونت",entries:"عبارت آفلاین",softMotionTitle:"انیمیشن نرم",softMotionBody:"حرکت های رابط سایت را ملایم تر می کند و به Reduce Motion سیستم احترام می گذارد.",softCorners:"گرد کردن هوشمند گوشه ها",softCornersHint:"فقط کنترل های تقریبا تیز را نرم می کند؛ آواتار و دکمه های گرد دست نخورده می مانند."},
  en:{unsupportedTitle:"This page can't be changed",unsupportedBody:"Chrome internal pages do not allow style injection.",siteTypography:"Site typography",on:"On",off:"Off",fontsByLanguage:"Fonts by language",fontSizeOffset:"Font size offset",fontSizeHint:"Adds to each element's current size",alignment:"Alignment",weight:"Weight",normalText:"Normal text",boldText:"Bold text",digits:"Digits",digitsHint:"Preserve, Persian, Latin or Arabic",emojiStyle:"Emoji style",emojiDownloadHint:"Selected emoji packs are downloaded once and cached locally.",localizeTitle:"Persian site localization",localizeBody:"Translates only known exact English UI phrases to Persian; user posts stay untouched.",advanced:"More / Advanced",advancedHint:"Persian text behavior and experimental controls",zwnj:"ZWNJ",zwnjHint:"Preserve, remove, or smart-add",bidiRepair:"Repair Persian mixed-direction text",bidiRepairHint:"Uses safer direction rules for mixed RTL/LTR text",rtlBeta:"Auto RTL layout",rtlBetaHint:"Experimental; may change some site layouts",subdomains:"Include subdomains",safeIcons:"Font Awesome, Material Icons, Lucide, code and SVG are protected.",extensionSettings:"Extension settings",appearance:"Appearance",system:"System",light:"Light",dark:"Dark",uiLanguage:"Extension language",uiFontSize:"Extension font size",manageSites:"Manage sites",resetSite:"Reset this site",preserve:"Preserve",custom:"Custom",right:"Right",left:"Left",center:"Center",justify:"Justify",digitsPreserve:"Preserve",digitsPersian:"Persian ۱۲۳",digitsLatin:"Latin 123",digitsArabic:"Arabic ١٢٣",zwnjPreserve:"Preserve",zwnjRemove:"Remove ZWNJ",zwnjSmart:"Smart add (beta)",cached:"Cached",download:"Download",loading:"Loading",native:"Native / compatible",emojiReady:"Pack ready",emojiSelect:"Select to download",saved:"Saved",resetDone:"Site settings reset",siteUnavailable:"Unsupported page",fontCount:"fonts",entries:"offline phrases",softMotionTitle:"Smooth motion",softMotionBody:"Adds restrained UI transitions while respecting the system Reduce Motion preference.",softCorners:"Smart rounded corners",softCornersHint:"Rounds only nearly-sharp controls; avatars and already-round buttons are left alone."},
  ar:{unsupportedTitle:"لا يمكن تعديل هذه الصفحة",unsupportedBody:"صفحات Chrome الداخلية لا تسمح بحقن الأنماط.",siteTypography:"تنسيق خط هذا الموقع",on:"مفعل",off:"متوقف",fontsByLanguage:"الخط لكل لغة",fontSizeOffset:"زيادة حجم الخط",fontSizeHint:"تضاف إلى الحجم الحالي لكل نص",alignment:"المحاذاة",weight:"الوزن",normalText:"نص عادي",boldText:"نص عريض",digits:"الأرقام",digitsHint:"بدون تغيير أو فارسية أو لاتينية أو عربية",emojiStyle:"نمط الإيموجي",emojiDownloadHint:"يتم تنزيل الحزمة المحددة مرة واحدة وحفظها محليا.",localizeTitle:"تعريب فارسي للموقع",localizeBody:"يحوّل عبارات الواجهة الإنجليزية المعروفة فقط إلى الفارسية دون لمس محتوى المستخدم.",advanced:"المزيد",advancedHint:"سلوك النص الفارسي وإعدادات تجريبية",zwnj:"نصف المسافة",zwnjHint:"حفظ أو حذف أو إضافة ذكية",bidiRepair:"إصلاح اتجاه النص الفارسي",bidiRepairHint:"قواعد اتجاه أكثر أمانا للنص المختلط",rtlBeta:"محاذاة RTL تلقائية",rtlBetaHint:"تجريبي وقد يغير تخطيط بعض المواقع",subdomains:"تطبيق على النطاقات الفرعية",safeIcons:"Font Awesome وMaterial Icons وLucide والكود وSVG محمية.",extensionSettings:"إعدادات الإضافة",appearance:"المظهر",system:"النظام",light:"فاتح",dark:"داكن",uiLanguage:"لغة الإضافة",uiFontSize:"حجم خط الإضافة",manageSites:"إدارة المواقع",resetSite:"إعادة ضبط هذا الموقع",preserve:"حفظ الموقع",custom:"مخصص",right:"يمين",left:"يسار",center:"وسط",justify:"ضبط",digitsPreserve:"بدون تغيير",digitsPersian:"فارسي ۱۲۳",digitsLatin:"لاتيني 123",digitsArabic:"عربي ١٢٣",zwnjPreserve:"حفظ",zwnjRemove:"حذف",zwnjSmart:"إضافة ذكية (تجريبي)",cached:"محفوظ",download:"تنزيل",loading:"جار التنزيل",native:"نظامي / متوافق",emojiReady:"الحزمة جاهزة",emojiSelect:"اختر للتنزيل",saved:"تم الحفظ",resetDone:"تمت إعادة الضبط",siteUnavailable:"صفحة غير مدعومة",fontCount:"خط",entries:"عبارة محلية",softMotionTitle:"حركة سلسة",softMotionBody:"يضيف انتقالات واجهة هادئة مع احترام إعداد تقليل الحركة في النظام.",softCorners:"زوايا مستديرة ذكية",softCornersHint:"يليّن عناصر التحكم ذات الزوايا الحادة فقط ويترك الصور الرمزية والأزرار الدائرية كما هي."},
  zh:{unsupportedTitle:"无法修改此页面",unsupportedBody:"Chrome 内部页面不允许注入样式。",siteTypography:"网站排版",on:"开启",off:"关闭",fontsByLanguage:"按语言选择字体",fontSizeOffset:"字体大小增量",fontSizeHint:"在每个文本当前大小上增加",alignment:"对齐",weight:"字重",normalText:"普通文本",boldText:"粗体文本",digits:"数字样式",digitsHint:"保持、波斯、拉丁或阿拉伯数字",emojiStyle:"表情样式",emojiDownloadHint:"选中的表情包只下载一次并保存在本地缓存。",localizeTitle:"网站波斯语本地化",localizeBody:"只把已知的英文界面短语精确替换为波斯语，不修改用户内容。",advanced:"更多设置",advancedHint:"波斯语文本和实验性选项",zwnj:"半空格",zwnjHint:"保持、删除或智能添加",bidiRepair:"修复波斯语混合方向",bidiRepairHint:"为 RTL/LTR 混排使用更安全的方向规则",rtlBeta:"自动 RTL 布局",rtlBetaHint:"实验功能，可能影响部分网站布局",subdomains:"包含子域名",safeIcons:"Font Awesome、Material Icons、Lucide、代码和 SVG 会被保护。",extensionSettings:"扩展设置",appearance:"外观",system:"系统",light:"浅色",dark:"深色",uiLanguage:"扩展语言",uiFontSize:"扩展字体大小",manageSites:"管理网站",resetSite:"重置此网站",preserve:"保持网站",custom:"自定义",right:"右对齐",left:"左对齐",center:"居中",justify:"两端对齐",digitsPreserve:"不更改",digitsPersian:"波斯 ۱۲۳",digitsLatin:"拉丁 123",digitsArabic:"阿拉伯 ١٢٣",zwnjPreserve:"保持",zwnjRemove:"删除半空格",zwnjSmart:"智能添加（测试）",cached:"已缓存",download:"下载",loading:"下载中",native:"系统 / 兼容",emojiReady:"表情包已就绪",emojiSelect:"选择后下载",saved:"已保存",resetDone:"已重置网站设置",siteUnavailable:"不支持的页面",fontCount:"款字体",entries:"条离线短语",softMotionTitle:"柔和动画",softMotionBody:"为网站控件添加克制的过渡效果，并遵循系统的“减少动态效果”设置。",softCorners:"智能圆角",softCornersHint:"只柔化接近直角的控件；头像和本来就是圆形的按钮保持不变。"}
};

Object.assign(I18N.fa,{singleFontTitle:"یک فونت برای همه زبان ها",singleFontHint:"همان فونت را روی همه اسکریپت ها اعمال می کند؛ اگر گلیف موجود نباشد مرورگر fallback می کند.",singleFontPick:"فونت مشترک",perLanguageDisabled:"انتخاب های جداگانه تا وقتی این حالت روشن است غیرفعال می شوند."});
Object.assign(I18N.en,{singleFontTitle:"One font for all languages",singleFontHint:"Uses one font across scripts; missing glyphs fall back safely.",singleFontPick:"Shared font",perLanguageDisabled:"Per-language choices are paused while this mode is on."});
Object.assign(I18N.ar,{singleFontTitle:"خط واحد لكل اللغات",singleFontHint:"يستخدم خطا واحدا لكل اللغات مع بديل آمن عند غياب بعض المحارف.",singleFontPick:"الخط المشترك",perLanguageDisabled:"تتوقف اختيارات كل لغة مؤقتا أثناء تفعيل هذا الوضع."});
Object.assign(I18N.zh,{singleFontTitle:"所有语言使用同一字体",singleFontHint:"对所有文字使用同一字体；缺少字形时会安全回退。",singleFontPick:"统一字体",perLanguageDisabled:"启用此模式时，按语言选择会暂时停用。"});

Object.assign(I18N.fa,{digitFontOffset:"افزایش اندازه اعداد",digitFontOffsetHint:"فقط به اندازه فعلی عددها اضافه می شود",zwnjSpace:"تبدیل نیم فاصله به فاصله",layoutEnhance:"بهبود چیدمان فارسی",layoutEnhanceHint:"برچسب ها و کنترل های فارسی را بدون دستکاری عرض اصلی خواناتر می کند",motionCustomize:"شخصی سازی انیمیشن ها",motionHover:"Hover و Focus",motionHoverHint:"تغییر نرم رنگ و شفافیت کنترل ها",motionPop:"باز شدن منوها",motionPopHint:"Origin-aware pop سبک",motionStaggerHint:"ورود مرحله ای آیتم ها",motionCrossfadeHint:"تغییر نرم متن و وضعیت",motionMorphHint:"بازخورد تغییر وضعیت کنترل",motionSharedHint:"جابجایی کوتاه آیتم های منو",motionRubberHint:"بازخورد فشردن دکمه",motionSafeHint:"منوی hover هنگام حرکت موس بسته نمی شود",motionGuideTitle:"راهنمای انیمیشن نرم",motionGuideSubtitle:"هر افکت مستقل است و می توانی فقط موارد دلخواه را روشن نگه داری.",motionHelpSafeOn:"روشن: حرکت موس از دکمه به منوی hover فرصت امن دارد و منو ناگهانی بسته نمی شود.",motionHelpSafeOff:"خاموش: رفتار اصلی سایت بدون محافظ مسیر موس باقی می ماند.",motionHelpStaggerOn:"روشن: چند آیتم اول منو با تاخیر خیلی کوتاه و فقط با opacity وارد می شوند.",motionHelpStaggerOff:"خاموش: همه آیتم ها همزمان ظاهر می شوند.",motionHelpCrossOn:"روشن: شمارنده و متن های وضعیت بدون پرش محو و ظاهر می شوند.",motionHelpCrossOff:"خاموش: تغییر متن همان رفتار پیش فرض سایت را دارد.",motionHelpMorphOn:"روشن: تغییر وضعیت دکمه یک بازخورد خیلی کوتاه می گیرد.",motionHelpMorphOff:"خاموش: هیچ scale اضافه ای برای تغییر state اجرا نمی شود.",motionHelpSharedOn:"روشن: جابه جایی کوتاه آیتم های شناور نرم تر دیده می شود.",motionHelpSharedOff:"خاموش: موقعیت جدید مستقیم اعمال می شود.",motionHelpPopOn:"روشن: منو از نزدیکی نقطه کلیک با opacity/scale سبک باز می شود.",motionHelpPopOff:"خاموش: منو با انیمیشن اصلی سایت باز می شود.",motionHelpRubberOn:"روشن: لمس یا کلیک بازخورد فشردن کوتاه دارد.",motionHelpRubberOff:"خاموش: هیچ scale فشردن اضافه نمی شود."});
Object.assign(I18N.en,{digitFontOffset:"Digit size offset",digitFontOffsetHint:"Adds only to the current size of digits",zwnjSpace:"Replace ZWNJ with a space",layoutEnhance:"Improve Persian layout",layoutEnhanceHint:"Makes Persian UI labels and controls more readable without changing the page width",motionCustomize:"Customize animations",motionHover:"Hover & Focus",motionHoverHint:"Soft color and opacity transitions",motionPop:"Menu opening",motionPopHint:"Light origin-aware pop",motionStaggerHint:"Staggered menu items",motionCrossfadeHint:"Smooth text/state changes",motionMorphHint:"Short control state feedback",motionSharedHint:"Short floating-item moves",motionRubberHint:"Press feedback",motionSafeHint:"Keeps hover menus open while crossing to them",motionGuideTitle:"Smooth motion guide",motionGuideSubtitle:"Each effect is independent; keep only the ones you want enabled.",motionHelpSafeOn:"On: gives the pointer a safe path from a trigger to its hover menu so it does not close abruptly.",motionHelpSafeOff:"Off: the website keeps its original hover-close behavior.",motionHelpStaggerOn:"On: the first menu items fade in with tiny staggered delays.",motionHelpStaggerOff:"Off: all items appear at once.",motionHelpCrossOn:"On: counters and state text cross-fade instead of snapping.",motionHelpCrossOff:"Off: text changes use the site default.",motionHelpMorphOn:"On: control state changes get a short visual response.",motionHelpMorphOff:"Off: no extra scale response is added.",motionHelpSharedOn:"On: short reorders inside floating menus are visually smoothed.",motionHelpSharedOff:"Off: items jump directly to their new position.",motionHelpPopOn:"On: menus pop in from near the activation point with light opacity/scale.",motionHelpPopOff:"Off: the site handles menu opening by itself.",motionHelpRubberOn:"On: click/tap gets a brief press response.",motionHelpRubberOff:"Off: no extra press scale is added."});
Object.assign(I18N.ar,{digitFontOffset:"زيادة حجم الأرقام",digitFontOffsetHint:"تضاف فقط إلى الحجم الحالي للأرقام",zwnjSpace:"استبدال نصف المسافة بمسافة",layoutEnhance:"تحسين تخطيط الفارسية",layoutEnhanceHint:"يحسن قراءة عناصر الواجهة الفارسية دون تغيير عرض الصفحة",motionCustomize:"تخصيص الحركة",motionHover:"Hover و Focus",motionHoverHint:"انتقالات ناعمة للألوان والشفافية",motionPop:"فتح القوائم",motionPopHint:"فتح خفيف من نقطة التفاعل",motionStaggerHint:"دخول متدرج لعناصر القائمة",motionCrossfadeHint:"تغيير ناعم للنص والحالة",motionMorphHint:"استجابة قصيرة لتغير الحالة",motionSharedHint:"تنعيم حركة العناصر العائمة",motionRubberHint:"استجابة عند الضغط",motionSafeHint:"يحافظ على قائمة التحويم أثناء انتقال المؤشر إليها",motionGuideTitle:"دليل الحركة السلسة",motionGuideSubtitle:"كل تأثير مستقل ويمكنك إبقاء ما تحتاجه فقط.",motionHelpSafeOn:"مفعل: يمنح المؤشر ممرا آمنا من الزر إلى قائمة التحويم حتى لا تغلق فجأة.",motionHelpSafeOff:"متوقف: يبقى سلوك الموقع الأصلي لإغلاق قائمة التحويم.",motionHelpStaggerOn:"مفعل: تظهر العناصر الأولى بتأخيرات صغيرة ومتدرجة.",motionHelpStaggerOff:"متوقف: تظهر العناصر كلها في الوقت نفسه.",motionHelpCrossOn:"مفعل: تتبدل العدادات ونصوص الحالة بتلاشي متقاطع.",motionHelpCrossOff:"متوقف: يستخدم الموقع سلوكه الافتراضي لتغيير النص.",motionHelpMorphOn:"مفعل: تغير حالة الزر يحصل على استجابة مرئية قصيرة.",motionHelpMorphOff:"متوقف: لا تضاف استجابة تكبير أو تصغير.",motionHelpSharedOn:"مفعل: يعرض تغير مواضع عناصر القوائم العائمة بشكل أنعم.",motionHelpSharedOff:"متوقف: تنتقل العناصر مباشرة إلى موضعها الجديد.",motionHelpPopOn:"مفعل: تفتح القوائم قرب نقطة التفاعل مع شفافية وتكبير خفيفين.",motionHelpPopOff:"متوقف: يترك فتح القائمة بالكامل للموقع.",motionHelpRubberOn:"مفعل: الضغط أو النقر يحصل على استجابة قصيرة.",motionHelpRubberOff:"متوقف: لا تضاف حركة ضغط إضافية."});
Object.assign(I18N.zh,{digitFontOffset:"数字大小增量",digitFontOffsetHint:"只增加数字当前字号",zwnjSpace:"将半空格替换为空格",layoutEnhance:"改进波斯语布局",layoutEnhanceHint:"在不改变页面宽度的情况下提高波斯语界面可读性",motionCustomize:"自定义动画",motionHover:"悬停与焦点",motionHoverHint:"平滑颜色与透明度变化",motionPop:"菜单打开",motionPopHint:"从交互位置轻量弹入",motionStaggerHint:"菜单项目错峰进入",motionCrossfadeHint:"文本与状态交叉淡化",motionMorphHint:"控件状态变化反馈",motionSharedHint:"浮动项目短距离平滑移动",motionRubberHint:"按压反馈",motionSafeHint:"指针移向悬停菜单时保持菜单打开",motionGuideTitle:"柔和动画指南",motionGuideSubtitle:"每种效果都可独立开关，只保留你需要的即可。",motionHelpSafeOn:"开启：从触发按钮移向悬停菜单时提供安全路径，避免菜单突然关闭。",motionHelpSafeOff:"关闭：保留网站原本的悬停关闭行为。",motionHelpStaggerOn:"开启：前几个菜单项以极短延迟依次淡入。",motionHelpStaggerOff:"关闭：所有项目同时出现。",motionHelpCrossOn:"开启：计数器和状态文本使用交叉淡化。",motionHelpCrossOff:"关闭：文本按网站默认方式直接变化。",motionHelpMorphOn:"开启：控件状态变化会有短暂视觉反馈。",motionHelpMorphOff:"关闭：不添加额外缩放反馈。",motionHelpSharedOn:"开启：浮动菜单内的短距离重排更平滑。",motionHelpSharedOff:"关闭：项目直接移动到新位置。",motionHelpPopOn:"开启：菜单从交互点附近以轻微透明度和缩放弹入。",motionHelpPopOff:"关闭：完全使用网站自身的菜单打开效果。",motionHelpRubberOn:"开启：点击或触摸时提供短暂按压反馈。",motionHelpRubberOff:"关闭：不添加额外按压缩放。"});

Object.assign(I18N.fa,{motionList:"ورود نرم لیست ها",motionListHint:"آیتم های تازه لیست فقط با شفافیت ظاهر می شوند؛ بدون جابه جایی",motionShimmer:"Shimmer بارگذاری",motionShimmerHint:"فقط اسکلت ها و Placeholderهای واقعی سایت Shimmer نرم می گیرند",styleTitle:"استایل سایت",styleBody:"بهبودهای ظاهری اختیاری؛ بدون دستکاری ابعاد و ساختار اصلی",smartDark:"دارک هوشمند",smartDarkHint:"سطوح روشن خنثی را تیره می کند و رنگ متن و آیکون ها را محافظت می کند",liquidGlass:"شیشه مایع",liquidGlassHint:"منوها و پنل های شناور را شیشه ای و خوانا می کند",linearStyle:"استایل خطی",linearStyleHint:"سایه های تزئینی را به مرزهای ظریف تبدیل می کند",adaptiveMenus:"منوهای کشویی بهتر",adaptiveMenusHint:"منوها و لیست باکس ها را متناسب با تم سایت تمیزتر می کند",focusEnhance:"Focus واضح",focusEnhanceHint:"حلقه فوکوس قابل دسترس برای کنترل ها",polishedInputs:"فیلدهای ورودی تمیز",polishedInputsHint:"ورودی ها را بدون تغییر اندازه، هماهنگ تر می کند"});
Object.assign(I18N.en,{motionList:"Soft list entry",motionListHint:"New list items fade in without moving",motionShimmer:"Loading shimmer",motionShimmerHint:"Adds a light shimmer only to real loading placeholders",styleTitle:"Site style",styleBody:"Optional visual polish without changing page geometry",smartDark:"Smart dark",smartDarkHint:"Darkens neutral light surfaces while protecting text and icons",liquidGlass:"Liquid glass",liquidGlassHint:"Gives floating menus and panels a readable glass treatment",linearStyle:"Linear style",linearStyleHint:"Turns decorative depth into subtle outlines",adaptiveMenus:"Better dropdowns",adaptiveMenusHint:"Polishes menus/listboxes to match the site theme",focusEnhance:"Clear focus",focusEnhanceHint:"Accessible focus ring for controls",polishedInputs:"Polished inputs",polishedInputsHint:"Cleans up inputs without resizing them"});
Object.assign(I18N.ar,{motionList:"دخول سلس للقوائم",motionListHint:"تظهر عناصر القوائم الجديدة بالشفافية فقط دون حركة",motionShimmer:"وميض التحميل",motionShimmerHint:"يضيف وميضا خفيفا لعناصر التحميل الحقيقية فقط",styleTitle:"نمط الموقع",styleBody:"تحسينات بصرية اختيارية دون تغيير هندسة الصفحة",smartDark:"داكن ذكي",smartDarkHint:"يغمق الأسطح المحايدة ويحمي النص والأيقونات",liquidGlass:"زجاج سائل",liquidGlassHint:"مظهر زجاجي للقوائم واللوحات العائمة",linearStyle:"نمط خطي",linearStyleHint:"يستبدل العمق الزخرفي بحدود خفيفة",adaptiveMenus:"قوائم منسدلة أفضل",adaptiveMenusHint:"يحسن القوائم بما يناسب سمة الموقع",focusEnhance:"تركيز واضح",focusEnhanceHint:"حلقة تركيز واضحة لعناصر التحكم",polishedInputs:"حقول إدخال محسنة",polishedInputsHint:"تحسين الحقول دون تغيير حجمها"});
Object.assign(I18N.zh,{motionList:"列表柔和进入",motionListHint:"新列表项只淡入，不发生位移",motionShimmer:"加载 Shimmer",motionShimmerHint:"仅对真实加载占位元素添加轻量 Shimmer",styleTitle:"网站样式",styleBody:"不改变页面几何结构的可选视觉优化",smartDark:"智能深色",smartDarkHint:"将中性浅色表面变暗并保护文字和图标",liquidGlass:"液态玻璃",liquidGlassHint:"为浮动菜单和面板增加清晰玻璃效果",linearStyle:"线性样式",linearStyleHint:"用细边框替代装饰性阴影",adaptiveMenus:"优化下拉菜单",adaptiveMenusHint:"让菜单和列表框匹配网站主题",focusEnhance:"清晰焦点",focusEnhanceHint:"为控件增加可访问焦点环",polishedInputs:"优化输入框",polishedInputsHint:"不改变尺寸地清理输入控件"});
Object.assign(I18N.fa,{smartDarkCustomize:"پالت و شدت تم دارک",smartDarkPresets:"سبک های آماده",smartDarkPresetsHint:"یک سبک را انتخاب کن؛ بعد هم می توانی ریز تنظیمش کنی.",smartDarkCustomColors:"رنگ های سفارشی",smartDarkCustomColorsHint:"پس زمینه، متن، تاکید و حاشیه خطی",smartDarkLinearBorder:"حاشیه خطی",smartDarkBackground:"پس زمینه",smartDarkText:"متن",smartDarkAccent:"تاکید",smartDarkBrightness:"روشنایی",smartDarkContrast:"کنتراست",smartDarkSepia:"گرمی",smartDarkGrayscale:"خنثی سازی رنگ",smartDarkReset:"بازگشت به پالت متعادل",darkPresetBalanced:"متعادل",darkPresetOled:"OLED",darkPresetGraphite:"گرافیت",darkPresetMidnight:"نیمه شب",darkPresetNavy:"سرمه ای",darkPresetWarm:"گرم",darkPresetViolet:"بنفش",darkPresetHighContrast:"کنتراست بالا",darkPresetCustom:"سفارشی"});
Object.assign(I18N.en,{smartDarkCustomize:"Dark palette & intensity",smartDarkPresets:"Ready-made styles",smartDarkPresetsHint:"Pick a style, then fine-tune it if you want.",smartDarkCustomColors:"Custom colors",smartDarkCustomColorsHint:"Background, text, accent and linear border",smartDarkLinearBorder:"Linear border",smartDarkBackground:"Background",smartDarkText:"Text",smartDarkAccent:"Accent",smartDarkBrightness:"Brightness",smartDarkContrast:"Contrast",smartDarkSepia:"Warmth",smartDarkGrayscale:"Desaturate",smartDarkReset:"Reset to balanced palette",darkPresetBalanced:"Balanced",darkPresetOled:"OLED",darkPresetGraphite:"Graphite",darkPresetMidnight:"Midnight",darkPresetNavy:"Navy",darkPresetWarm:"Warm",darkPresetViolet:"Violet",darkPresetHighContrast:"High contrast",darkPresetCustom:"Custom"});
Object.assign(I18N.ar,{smartDarkCustomize:"لوحة ألوان وشدة السمة الداكنة",smartDarkPresets:"أنماط جاهزة",smartDarkPresetsHint:"اختر نمطا ثم عدله بدقة كما تريد.",smartDarkCustomColors:"ألوان مخصصة",smartDarkCustomColorsHint:"الخلفية والنص والتمييز والحد الخطي",smartDarkLinearBorder:"الحد الخطي",smartDarkBackground:"الخلفية",smartDarkText:"النص",smartDarkAccent:"التمييز",smartDarkBrightness:"السطوع",smartDarkContrast:"التباين",smartDarkSepia:"الدفء",smartDarkGrayscale:"تقليل الألوان",smartDarkReset:"العودة إلى اللوحة المتوازنة",darkPresetBalanced:"متوازن",darkPresetOled:"OLED",darkPresetGraphite:"جرافيت",darkPresetMidnight:"منتصف الليل",darkPresetNavy:"كحلي",darkPresetWarm:"دافئ",darkPresetViolet:"بنفسجي",darkPresetHighContrast:"تباين عال",darkPresetCustom:"مخصص"});
Object.assign(I18N.zh,{smartDarkCustomize:"深色调色板与强度",smartDarkPresets:"预设样式",smartDarkPresetsHint:"选择一个样式，也可以继续微调。",smartDarkCustomColors:"自定义颜色",smartDarkCustomColorsHint:"背景、文字、强调色和线性边框",smartDarkLinearBorder:"线性边框",smartDarkBackground:"背景",smartDarkText:"文字",smartDarkAccent:"强调色",smartDarkBrightness:"亮度",smartDarkContrast:"对比度",smartDarkSepia:"暖色",smartDarkGrayscale:"降低饱和度",smartDarkReset:"恢复平衡调色板",darkPresetBalanced:"平衡",darkPresetOled:"OLED",darkPresetGraphite:"石墨",darkPresetMidnight:"午夜",darkPresetNavy:"海军蓝",darkPresetWarm:"暖色",darkPresetViolet:"紫色",darkPresetHighContrast:"高对比度",darkPresetCustom:"自定义"});
Object.assign(I18N.fa,{styleAdvanced:"تنظیمات جزئی استایل",styleAdvancedHint:"شیشه، خط، منو، فوکوس و فیلدها",glassTune:"شیشه مایع واقعی",glassTuneHint:"فقط روی هدر، سایدبار، منو و پنل های رابط اعمال می شود",glassTint:"ته رنگ شیشه",glassBlur:"محو شدگی",glassOpacity:"غلظت شیشه",glassSaturation:"اشباع پشت شیشه",glassTintStrength:"قدرت ته رنگ",linearTune:"استایل خطی",linearTuneHint:"رنگ، ضخامت و شدت خطوط بدون تغییر ابعاد",linearColor:"رنگ خط",linearOpacity:"شدت خط",linearWidth:"ضخامت خط",interactionTune:"تعامل ها",interactionTuneHint:"هایلایت منو و حلقه فوکوس",menuHighlight:"هایلایت منو",focusColor:"رنگ Focus",focusWidth:"ضخامت Focus",inputTune:"فیلدهای ورودی",inputTuneHint:"شدت مرز و Focus فیلد بدون تغییر اندازه",inputHighlight:"شدت فیلد",styleTuneReset:"بازنشانی تنظیمات ظاهری"});
Object.assign(I18N.en,{styleAdvanced:"Style fine-tuning",styleAdvancedHint:"Glass, lines, menus, focus and inputs",glassTune:"Real liquid glass",glassTuneHint:"Applied only to UI headers, sidebars, menus and panels",glassTint:"Glass tint",glassBlur:"Backdrop blur",glassOpacity:"Glass opacity",glassSaturation:"Backdrop saturation",glassTintStrength:"Tint strength",linearTune:"Linear style",linearTuneHint:"Color, width and intensity without changing geometry",linearColor:"Line color",linearOpacity:"Line intensity",linearWidth:"Line width",interactionTune:"Interactions",interactionTuneHint:"Menu highlight and keyboard focus ring",menuHighlight:"Menu highlight",focusColor:"Focus color",focusWidth:"Focus width",inputTune:"Input fields",inputTuneHint:"Border/focus strength without resizing controls",inputHighlight:"Input strength",styleTuneReset:"Reset style tuning"});
Object.assign(I18N.ar,{styleAdvanced:"ضبط النمط",styleAdvancedHint:"الزجاج والخطوط والقوائم والتركيز والحقول",glassTune:"زجاج سائل فعلي",glassTuneHint:"يطبق على الرؤوس والأشرطة الجانبية والقوائم ولوحات الواجهة",glassTint:"صبغة الزجاج",glassBlur:"تمويه الخلفية",glassOpacity:"عتامة الزجاج",glassSaturation:"تشبع الخلفية",glassTintStrength:"قوة الصبغة",linearTune:"النمط الخطي",linearTuneHint:"لون الخط وسمكه وشدته دون تغيير الأبعاد",linearColor:"لون الخط",linearOpacity:"شدة الخط",linearWidth:"سمك الخط",interactionTune:"التفاعل",interactionTuneHint:"تمييز القوائم وحلقة التركيز",menuHighlight:"تمييز القائمة",focusColor:"لون التركيز",focusWidth:"سمك التركيز",inputTune:"حقول الإدخال",inputTuneHint:"قوة الحدود والتركيز دون تغيير الحجم",inputHighlight:"قوة الحقل",styleTuneReset:"إعادة ضبط النمط"});
Object.assign(I18N.zh,{styleAdvanced:"样式微调",styleAdvancedHint:"玻璃、线条、菜单、焦点和输入框",glassTune:"真实液态玻璃",glassTuneHint:"仅应用于页眉、侧栏、菜单和界面面板",glassTint:"玻璃色调",glassBlur:"背景模糊",glassOpacity:"玻璃不透明度",glassSaturation:"背景饱和度",glassTintStrength:"色调强度",linearTune:"线性样式",linearTuneHint:"不改变布局的线条颜色、宽度和强度",linearColor:"线条颜色",linearOpacity:"线条强度",linearWidth:"线条宽度",interactionTune:"交互",interactionTuneHint:"菜单高亮和键盘焦点环",menuHighlight:"菜单高亮",focusColor:"焦点颜色",focusWidth:"焦点宽度",inputTune:"输入框",inputTuneHint:"不改变尺寸的边框和焦点强度",inputHighlight:"输入强度",styleTuneReset:"重置样式微调"});

Object.assign(I18N.fa,{supportedSitesButton:"سایت های پشتیبانی شده",supportedSitesTitle:"سایت های پشتیبانی شده",supportedSitesSubtitle:"پک های اختصاصی بومی سازی رابط کاربری",supportedSitesCountLabel:"سایت / سرویس",supportedPhrasesCountLabel:"عبارت آفلاین",supportedSitesSearch:"جستجوی سایت، سرویس یا دسته...",supportedSitesEmpty:"سایتی با این عبارت پیدا نشد.",sitePhraseLabel:"عبارت",siteCategoryAI:"هوش مصنوعی",siteCategoryMusic:"موسیقی",siteCategoryVideo:"ویدیو",siteCategorySocial:"شبکه اجتماعی",siteCategoryDeveloper:"توسعه و کلاد",siteCategoryProductivity:"بهره وری",siteCategoryCommerce:"کسب و کار",siteCategoryEducation:"آموزش",siteCategoryDesign:"طراحی",siteCategoryCreator:"سازندگان محتوا",siteCategoryCommunication:"ارتباطات",siteCategoryOther:"سایر"});
Object.assign(I18N.en,{supportedSitesButton:"Supported sites",supportedSitesTitle:"Supported sites",supportedSitesSubtitle:"Dedicated UI-localization packs",supportedSitesCountLabel:"sites / services",supportedPhrasesCountLabel:"offline phrases",supportedSitesSearch:"Search sites, services or categories...",supportedSitesEmpty:"No supported site matches this search.",sitePhraseLabel:"phrases",siteCategoryAI:"AI",siteCategoryMusic:"Music",siteCategoryVideo:"Video",siteCategorySocial:"Social",siteCategoryDeveloper:"Developer & Cloud",siteCategoryProductivity:"Productivity",siteCategoryCommerce:"Business",siteCategoryEducation:"Education",siteCategoryDesign:"Design",siteCategoryCreator:"Creators",siteCategoryCommunication:"Communication",siteCategoryOther:"Other"});
Object.assign(I18N.ar,{supportedSitesButton:"المواقع المدعومة",supportedSitesTitle:"المواقع المدعومة",supportedSitesSubtitle:"حزم مخصصة لتعريب واجهة المستخدم",supportedSitesCountLabel:"موقع / خدمة",supportedPhrasesCountLabel:"عبارة دون اتصال",supportedSitesSearch:"ابحث عن موقع أو خدمة أو فئة...",supportedSitesEmpty:"لا توجد نتيجة مطابقة.",sitePhraseLabel:"عبارة",siteCategoryAI:"ذكاء اصطناعي",siteCategoryMusic:"موسيقى",siteCategoryVideo:"فيديو",siteCategorySocial:"اجتماعي",siteCategoryDeveloper:"تطوير وسحابة",siteCategoryProductivity:"إنتاجية",siteCategoryCommerce:"أعمال",siteCategoryEducation:"تعليم",siteCategoryDesign:"تصميم",siteCategoryCreator:"صناع المحتوى",siteCategoryCommunication:"اتصالات",siteCategoryOther:"أخرى"});
Object.assign(I18N.zh,{supportedSitesButton:"支持的网站",supportedSitesTitle:"支持的网站",supportedSitesSubtitle:"专用界面本地化包",supportedSitesCountLabel:"网站 / 服务",supportedPhrasesCountLabel:"离线短语",supportedSitesSearch:"搜索网站、服务或类别...",supportedSitesEmpty:"没有匹配的网站。",sitePhraseLabel:"短语",siteCategoryAI:"人工智能",siteCategoryMusic:"音乐",siteCategoryVideo:"视频",siteCategorySocial:"社交",siteCategoryDeveloper:"开发与云",siteCategoryProductivity:"效率",siteCategoryCommerce:"商业",siteCategoryEducation:"教育",siteCategoryDesign:"设计",siteCategoryCreator:"创作者",siteCategoryCommunication:"通讯",siteCategoryOther:"其他"});
Object.assign(I18N.fa,{uniformCorners:"یکسان سازی گوشه های گرد",uniformCornersHint:"همه گوشه هایی که سایت از قبل گرد کرده را به یک اندازه تبدیل می کند.",cornerRadius:"شعاع گوشه",cornerRadiusHint:"از ۰ تا ۴۸ پیکسل",removeShadows:"حذف سایه های سایت",removeShadowsHint:"سایه کادر و متن را حذف می کند.",smoothScroll:"اسکرول نرم",smoothScrollHint:"اسکرول چرخ ماوس و جابه جایی های برنامه ای را نرم تر می کند."});
Object.assign(I18N.en,{uniformCorners:"Normalize rounded corners",uniformCornersHint:"Makes already-rounded site surfaces use one radius.",cornerRadius:"Corner radius",cornerRadiusHint:"0 to 48 pixels",removeShadows:"Remove site shadows",removeShadowsHint:"Removes box and text shadows.",smoothScroll:"Smooth scrolling",smoothScrollHint:"Smooths wheel notches and programmatic scrolling."});
Object.assign(I18N.ar,{uniformCorners:"توحيد الزوايا المستديرة",uniformCornersHint:"يجعل الزوايا المستديرة أصلا تستخدم نصف قطر واحدا.",cornerRadius:"نصف قطر الزاوية",cornerRadiusHint:"من 0 إلى 48 بكسل",removeShadows:"إزالة ظلال الموقع",removeShadowsHint:"يزيل ظلال العناصر والنص.",smoothScroll:"تمرير سلس",smoothScrollHint:"يجعل تمرير عجلة الفأرة والتنقل البرمجي أكثر سلاسة."});
Object.assign(I18N.zh,{uniformCorners:"统一圆角",uniformCornersHint:"把网站中原本有圆角的界面统一为同一半径。",cornerRadius:"圆角半径",cornerRadiusHint:"0 到 48 像素",removeShadows:"移除网站阴影",removeShadowsHint:"移除盒阴影和文字阴影。",smoothScroll:"平滑滚动",smoothScrollHint:"让鼠标滚轮和程序滚动更顺滑。"});

Object.assign(I18N.fa,{sitePause:"مکث پرشین یار روی این سایت",sitePauseHint:"همه تغییرات موقتا خاموش می شوند اما تنظیماتت حفظ می شود.",pausedBadge:"مکث",pauseDone:"پرشین یار روی این سایت متوقف شد",resumeDone:"پرشین یار دوباره روی این سایت فعال شد"});
Object.assign(I18N.en,{sitePause:"Pause PersianYar on this site",sitePauseHint:"Temporarily disables every change while keeping your saved settings.",pausedBadge:"Paused",pauseDone:"PersianYar is paused on this site",resumeDone:"PersianYar resumed on this site"});
Object.assign(I18N.ar,{sitePause:"إيقاف PersianYar مؤقتا في هذا الموقع",sitePauseHint:"يعطل كل التغييرات مؤقتا مع الاحتفاظ بإعداداتك المحفوظة.",pausedBadge:"متوقف",pauseDone:"تم إيقاف PersianYar مؤقتا في هذا الموقع",resumeDone:"تم استئناف PersianYar في هذا الموقع"});
Object.assign(I18N.zh,{sitePause:"在此网站暂停 PersianYar",sitePauseHint:"临时关闭全部修改，但保留已保存的设置。",pausedBadge:"已暂停",pauseDone:"PersianYar 已在此网站暂停",resumeDone:"PersianYar 已在此网站恢复"});

const FONT_LABELS_FA = {Vazirmatn:"وزیرمتن",Estedad:"استعداد",Mikhak:"میخک",Shabnam:"شبنم",Sahel:"ساحل",Samim:"صمیم",Parastoo:"پرستو",Tanha:"تنها",Gandom:"گندم",Nahid:"ناهید",Lalezar:"لاله زار",Vazir:"وزیر کلاسیک",IranNastaliq:"ایران نستعلیق"};
const DEFAULT_FONT_FAMILY = {fa:"Vazirmatn",en:"Inter",ar:"Noto Sans Arabic",zh:"Noto Sans SC"};
const EMOJI_SAMPLE = "😂 🥳 ❤️ 🚀";
const HEAVY_EMOJI = new Set(["emojitwo","tossface","blobmoji","notoColor","twemojiBitmap","openmojiBitmap"]);

let activeTab = null;
let host = "";
let supported = false;
let sites = {};
let config = structuredCloneSafe(DEFAULT_CONFIG);
let fontCatalog = [
  {key:"Vazirmatn",family:"Vazirmatn",lang:"fa"},{key:"Inter",family:"Inter",lang:"en"},{key:"NotoSansArabic",family:"Noto Sans Arabic",lang:"ar"},{key:"NotoSansSC",family:"Noto Sans SC",lang:"zh"}
];
let fontByKey = Object.fromEntries(fontCatalog.map(x=>[x.key,x]));
let emojiStyles = [{key:"system",label:"System Default",family:"System Emoji",kind:"system-stack",note:"System"},{key:"twemoji",label:"Twemoji",family:"Jdecked Twemoji",kind:"download",note:"X / Twitter"}];
let emojiCached = {};
let catalogsReady = false;
let fontSelectsBuilt = false;
let emojiSelectBuilt = false;
let activeFeatureTab = "text";
let cursorCache = {};
const CURSOR_CACHE_KEY = "persianyarCursorCacheV6";
let cursorSheetGroup = "all";
let cursorPreviewObserver = null;
let cursorSelectionEpoch = 0;
const cursorPreviewInFlight = new Map();
const fontPreviewPromises = new Map();
let uiTheme = "system";
let uiLanguage = "fa";
let uiFontSize = 13;
let saveTimer = 0;
let pendingSaveSnapshot = null;
let previewStylePromises = new Map();
const cursorSizedUrlCache = new Map();
let cursorPreviewAnim = {raf:0,targetX:0,targetY:0,x:0,y:0,visible:false,state:"default",pressed:false,last:0};
let cursorPreviewTrails = [];
let activeSelectRoot = null;
const selectMenus = new Map();

const $ = id => document.getElementById(id);
const els = {
  shell:$("shell"), siteLabel:$("siteLabel"), pauseBadge:$("pauseBadge"), unsupported:$("unsupported"), controls:$("controls"), enabled:$("enabled"), enabledText:$("enabledText"), fontPreview:$("fontPreview"),
  weightBox:$("weightBox"), unifiedFontEnabled:$("unifiedFontEnabled"), unifiedFontPicker:$("unifiedFontPicker"), languageFontRows:$("languageFontRows"), fontDeltaValue:$("fontDeltaValue"), fontDeltaMinus:$("fontDeltaMinus"), fontDeltaPlus:$("fontDeltaPlus"), digitFontDeltaValue:$("digitFontDeltaValue"), digitFontDeltaMinus:$("digitFontDeltaMinus"), digitFontDeltaPlus:$("digitFontDeltaPlus"), emojiEnabled:$("emojiEnabled"), emojiStyle:$("emojiStyle"), emojiOptions:$("emojiOptions"), emojiSearch:$("emojiSearch"), emojiResultCount:$("emojiResultCount"), emojiTriggerPreview:$("emojiTriggerPreview"), emojiTriggerState:$("emojiTriggerState"), emojiCacheSummary:$("emojiCacheSummary"), localizeEnabled:$("localizeEnabled"), localizationCount:$("localizationCount"), bidiRepair:$("bidiRepair"), layoutEnhance:$("layoutEnhance"), rtlBeta:$("rtlBeta"), cursorEnabled:$("cursorEnabled"), cursorPackGrid:$("cursorPackGrid"), cursorPreviewStage:$("cursorPreviewStage"), cursorPreviewButton:$("cursorPreviewButton"), cursorPreviewIcon:$("cursorPreviewIcon"), cursorCacheSummary:$("cursorCacheSummary"), openCursorSheet:$("openCursorSheet"), cursorSelectedIcon:$("cursorSelectedIcon"), cursorSelectedName:$("cursorSelectedName"), cursorSelectedMeta:$("cursorSelectedMeta"), cursorSheetBackdrop:$("cursorSheetBackdrop"), cursorSheet:$("cursorSheet"), closeCursorSheet:$("closeCursorSheet"), cursorPackSearch:$("cursorPackSearch"), cursorGroupFilters:$("cursorGroupFilters"), cursorPackScroll:$("cursorPackScroll"), cursorPackEmpty:$("cursorPackEmpty"), cursorSheetSubtitle:$("cursorSheetSubtitle"), cursorSizeMinus:$("cursorSizeMinus"), cursorSizePlus:$("cursorSizePlus"), cursorSizeValue:$("cursorSizeValue"), cursorMotionEnabled:$("cursorMotionEnabled"), cursorMotionPanel:$("cursorMotionPanel"), cursorSmoothness:$("cursorSmoothness"), cursorSmoothnessValue:$("cursorSmoothnessValue"), cursorTrailEnabled:$("cursorTrailEnabled"), cursorTrailLength:$("cursorTrailLength"), cursorTrailLengthValue:$("cursorTrailLengthValue"), cursorClickEffectEnabled:$("cursorClickEffectEnabled"), cursorHoverScaleEnabled:$("cursorHoverScaleEnabled"), cursorGlowEnabled:$("cursorGlowEnabled"), cursorLivePreview:$("cursorLivePreview"), includeSubdomains:$("includeSubdomains"),
  menuButton:$("menuButton"), drawer:$("drawer"), sitePaused:$("sitePaused"), drawerBackdrop:$("drawerBackdrop"), selectBackdrop:$("selectBackdrop"), closeDrawer:$("closeDrawer"), themeSwitcher:$("themeSwitcher"), uiLanguage:$("uiLanguage"), uiSizeMinus:$("uiSizeMinus"), uiSizePlus:$("uiSizePlus"), uiSizeValue:$("uiSizeValue"), openOptions:$("openOptions"), resetSite:$("resetSite"), toast:$("toast"), fontCountLabel:$("fontCountLabel"), softMotionEnabled:$("softMotionEnabled"), motionCustomizeToggle:$("motionCustomizeToggle"), motionCustomizePanel:$("motionCustomizePanel"), motionGuideButton:$("motionGuideButton"), motionGuideBackdrop:$("motionGuideBackdrop"), motionGuideModal:$("motionGuideModal"), closeMotionGuide:$("closeMotionGuide"), motionHoverEnabled:$("motionHoverEnabled"), motionPopEnabled:$("motionPopEnabled"), motionStaggerEnabled:$("motionStaggerEnabled"), motionCrossfadeEnabled:$("motionCrossfadeEnabled"), motionMorphEnabled:$("motionMorphEnabled"), motionSharedLayoutEnabled:$("motionSharedLayoutEnabled"), motionRubberEnabled:$("motionRubberEnabled"), motionSafePolygonEnabled:$("motionSafePolygonEnabled"), motionListEnabled:$("motionListEnabled"), motionShimmerEnabled:$("motionShimmerEnabled"), motionTooltipDelayEnabled:$("motionTooltipDelayEnabled"), motionTabularNumsEnabled:$("motionTabularNumsEnabled"), motionScrollFadeEnabled:$("motionScrollFadeEnabled"), motionSliderMorphEnabled:$("motionSliderMorphEnabled"), motionSharedElementEnabled:$("motionSharedElementEnabled"), motionIconCrossfadeEnabled:$("motionIconCrossfadeEnabled"), featureTabs:$("featureTabs"), tabIndicator:$("tabIndicator"), uiTooltip:$("uiTooltip"), softCorners:$("softCorners"), uniformCornersEnabled:$("uniformCornersEnabled"), uniformCornerRadiusRow:$("uniformCornerRadiusRow"), cornerRadiusMinus:$("cornerRadiusMinus"), cornerRadiusPlus:$("cornerRadiusPlus"), cornerRadiusValue:$("cornerRadiusValue"), removeShadows:$("removeShadows"), smoothScrollEnabled:$("smoothScrollEnabled"), smartDarkMode:$("smartDarkMode"), smartDarkCustomizeToggle:$("smartDarkCustomizeToggle"), smartDarkCustomizePanel:$("smartDarkCustomizePanel"), smartDarkPresetGrid:$("smartDarkPresetGrid"), smartDarkPresetLabel:$("smartDarkPresetLabel"), smartDarkBackgroundColor:$("smartDarkBackgroundColor"), smartDarkBackgroundValue:$("smartDarkBackgroundValue"), smartDarkTextColor:$("smartDarkTextColor"), smartDarkTextValue:$("smartDarkTextValue"), smartDarkAccentColor:$("smartDarkAccentColor"), smartDarkAccentValue:$("smartDarkAccentValue"), smartDarkLinearColor:$("smartDarkLinearColor"), smartDarkLinearValue:$("smartDarkLinearValue"), smartDarkBrightness:$("smartDarkBrightness"), smartDarkBrightnessValue:$("smartDarkBrightnessValue"), smartDarkContrast:$("smartDarkContrast"), smartDarkContrastValue:$("smartDarkContrastValue"), smartDarkSepia:$("smartDarkSepia"), smartDarkSepiaValue:$("smartDarkSepiaValue"), smartDarkGrayscale:$("smartDarkGrayscale"), smartDarkGrayscaleValue:$("smartDarkGrayscaleValue"), smartDarkResetTheme:$("smartDarkResetTheme"), liquidGlassMode:$("liquidGlassMode"), linearStyleMode:$("linearStyleMode"), adaptiveMenusMode:$("adaptiveMenusMode"), focusEnhanceMode:$("focusEnhanceMode"), polishedInputsMode:$("polishedInputsMode"), siteStyleCustomizeToggle:$("siteStyleCustomizeToggle"), siteStyleCustomizePanel:$("siteStyleCustomizePanel"), liquidGlassTintColor:$("liquidGlassTintColor"), liquidGlassTintValue:$("liquidGlassTintValue"), liquidGlassBlur:$("liquidGlassBlur"), liquidGlassBlurValue:$("liquidGlassBlurValue"), liquidGlassOpacity:$("liquidGlassOpacity"), liquidGlassOpacityValue:$("liquidGlassOpacityValue"), liquidGlassSaturation:$("liquidGlassSaturation"), liquidGlassSaturationValue:$("liquidGlassSaturationValue"), liquidGlassTintStrength:$("liquidGlassTintStrength"), liquidGlassTintStrengthValue:$("liquidGlassTintStrengthValue"), linearStyleColor:$("linearStyleColor"), linearStyleColorValue:$("linearStyleColorValue"), linearStyleOpacity:$("linearStyleOpacity"), linearStyleOpacityValue:$("linearStyleOpacityValue"), linearStyleWidth:$("linearStyleWidth"), linearStyleWidthValue:$("linearStyleWidthValue"), menuHighlightStrength:$("menuHighlightStrength"), menuHighlightStrengthValue:$("menuHighlightStrengthValue"), focusRingColor:$("focusRingColor"), focusRingColorValue:$("focusRingColorValue"), focusRingWidth:$("focusRingWidth"), focusRingWidthValue:$("focusRingWidthValue"), inputHighlightStrength:$("inputHighlightStrength"), inputHighlightStrengthValue:$("inputHighlightStrengthValue"), siteStyleReset:$("siteStyleReset"), appSkeleton:$("appSkeleton"), localizationGuideButton:$("localizationGuideButton"), localizationGuideTextButton:$("localizationGuideTextButton"), localizationGuideBackdrop:$("localizationGuideBackdrop"), localizationGuideModal:$("localizationGuideModal"), closeLocalizationGuide:$("closeLocalizationGuide"), supportedSiteSearch:$("supportedSiteSearch"), supportedSiteList:$("supportedSiteList"), supportedSiteEmpty:$("supportedSiteEmpty"), supportedSiteCount:$("supportedSiteCount"), supportedSiteCountInline:$("supportedSiteCountInline"), supportedPhraseCount:$("supportedPhraseCount"), supportedSiteResultCount:$("supportedSiteResultCount")
};

const __skeletonTimer=setTimeout(()=>document.body.classList.add("show-skeleton"),90);
init().catch(error=>console.error("[PersianYar] popup init failed",error)).finally(()=>{
  clearTimeout(__skeletonTimer);
  requestAnimationFrame(()=>{document.body.classList.add("is-ready");document.body.classList.remove("is-loading","show-skeleton");});
});
addEventListener("pagehide",()=>{if(pendingSaveSnapshot)void flushPendingSave();});

async function init(){
  // Fast path: render from tab + sync storage only. Heavy font/emoji catalogs are loaded after first paint.
  const tabPromise=chrome.tabs.query({active:true,currentWindow:true});
  const uiFontPromise=chrome.runtime.sendMessage({type:"fontyar:get-ui-font",fontKey:"Vazirmatn"}).catch(()=>null);
  const siteStore=globalThis.__PERSIANYAR_SITE_STORE__;
  await siteStore?.migrateLegacy?.().catch(()=>null);
  const storagePromise=chrome.storage.sync.get({uiTheme:"system",uiLanguage:"fa",uiFontSize:13});
  const sitesPromise=siteStore?.getAll?.() || Promise.resolve({});
  const localPromise=chrome.storage.local.get({persianyarUiTab:"text"}).catch(()=>({persianyarUiTab:"text"}));
  const [[tab],data,localData,storedSites]=await Promise.all([tabPromise,storagePromise,localPromise,sitesPromise]);
  activeTab = tab || null;
  const parsed = parseSupportedUrl(activeTab?.url || "");
  supported = parsed.supported; host = parsed.host;
  document.body.classList.toggle("is-unsupported", !supported);
  els.siteLabel.textContent = host || t("siteUnavailable");
  sites = storedSites || {}; uiTheme = validTheme(data.uiTheme); uiLanguage = validLocale(data.uiLanguage); uiFontSize = clamp(data.uiFontSize,11,18,13);
  if(supported){
    await loadPopupSupportData();
    const cacheData=await chrome.storage.local.get({[CURSOR_CACHE_KEY]:{}}).catch(()=>({[CURSOR_CACHE_KEY]:{}}));
    cursorCache = cacheData?.[CURSOR_CACHE_KEY] || {};
    chrome.storage.local.remove(["persianyarCursorCacheV1","persianyarCursorCacheV2","persianyarCursorCacheV3","persianyarCursorCacheV4","persianyarCursorCacheV5"]).catch(()=>{});
  } else cursorCache = {};
  const matched = findSiteConfig(host, sites);
  config = normalizeConfig(matched.config || {});
  const quickUiFont=await Promise.race([uiFontPromise,new Promise(resolve=>setTimeout(()=>resolve(null),55))]);
  if(quickUiFont?.ok&&quickUiFont.css){const style=document.createElement("style");style.id="__persianyar_ui_font";style.textContent=quickUiFont.css;document.head.append(style);document.documentElement.style.setProperty("--py-ui-font",`"${quickUiFont.family||"Vazirmatn"}"`);}
  if(supported) setupSelectPortal();
  bindUI();
  applyTheme(uiTheme,false);
  // On restricted Chrome pages only render the small core UI. Avoid building tabs,
  // pickers, previews and catalogs that cannot be used on the active page anyway.
  applyLocale(uiLanguage,false);
  applyUiFontSize(uiFontSize,false);
  if (!supported){
    els.unsupported.classList.remove("hidden");
    els.controls.classList.add("hidden");
    els.featureTabs?.classList.add("hidden");
    return;
  }

  els.unsupported.classList.add("hidden");
  els.featureTabs?.classList.remove("hidden");
  setupFeatureTabs(localData?.persianyarUiTab || "text");
  updateCursorPickerSummary();
  updateCursorPreview();
  setupPopupMotion();
  setupPopupTooltips();
  setupPopupScrollFades();
  els.localizationCount.textContent = String(globalThis.__PERSIANYAR_LOCALIZATION_CATALOG__?.count || 0);
  updateLocalizationGuideStats();
  if (!config.paused && (config.enabled || config.emojiEnabled || config.localizeEnabled || config.cursorEnabled || config.softMotionEnabled || config.softCorners || config.uniformCornersEnabled || config.removeShadows || config.smoothScrollEnabled || config.fontDelta || config.digitFontDelta || config.digitMode !== "preserve" || config.zwnjMode !== "preserve" || config.bidiRepair || config.rtlBeta || config.layoutEnhance || config.smartDarkMode || config.liquidGlassMode || config.linearStyleMode || config.adaptiveMenusMode || config.focusEnhanceMode || config.polishedInputsMode)) {
    sendConfigInstant(structuredCloneSafe(config));
  }
  const defer=()=>loadCatalogsDeferred().catch(()=>{});
  if("requestIdleCallback" in globalThis) requestIdleCallback(defer,{timeout:650}); else setTimeout(defer,30);
}

async function loadPopupSupportData(){
  const load=(src,marker)=>{
    if(globalThis[marker])return Promise.resolve();
    return new Promise((resolve,reject)=>{
      const script=document.createElement("script");
      script.src=src;
      script.async=false;
      script.onload=()=>resolve();
      script.onerror=()=>reject(new Error(`Failed to load ${src}`));
      document.head.append(script);
    });
  };
  await Promise.all([
    load("data/localization-catalog.js","__PERSIANYAR_LOCALIZATION_CATALOG__"),
    load("data/cursor-packs.js","__PERSIANYAR_CURSOR_PACKS__")
  ]);
}

async function loadCatalogsDeferred(){
  await Promise.all([loadFontCatalog(),loadEmojiCatalog()]);
  catalogsReady=true;
  // If a picker was opened during the fast-start window, refresh its rows in place
  // instead of rebuilding the whole popup or attaching duplicate listeners.
  if(fontSelectsBuilt){
    document.querySelectorAll("[data-font-search]").forEach(input=>input.dispatchEvent(new Event("input")));
  }
  if(emojiSelectBuilt) renderEmojiOptions(els.emojiSearch?.value||"");
  if(activeFeatureTab==="text") warmTextPreviews();
}

function warmTextPreviews(){
  if(!catalogsReady)return;
  for(const script of ["all","fa","en","ar","zh"]){
    const key=script==="all"?config.allFontKey:config.fonts[script];
    updateFontSample(script,key);
  }
  updateEmojiUI(false);
}

async function loadFontCatalog(){
  try{
    const r = await chrome.runtime.sendMessage({type:"fontyar:get-font-catalog"});
    if(r?.ok) fontCatalog = r.fonts || [];
  }catch{}
  if(!fontCatalog.length){
    fontCatalog = [
      {key:"Vazirmatn",family:"Vazirmatn",lang:"fa"},{key:"Inter",family:"Inter",lang:"en"},{key:"NotoSansArabic",family:"Noto Sans Arabic",lang:"ar"},{key:"NotoSansSC",family:"Noto Sans SC",lang:"zh"}
    ];
  }
  fontByKey = Object.fromEntries(fontCatalog.map(x=>[x.key,x]));
  els.fontCountLabel.textContent = `${fontCatalog.length} ${t("fontCount")}`;
}

async function loadEmojiCatalog(){
  try{
    const r = await chrome.runtime.sendMessage({type:"fontyar:get-emoji-catalog"});
    if(r?.ok){ emojiStyles = r.styles || []; emojiCached = r.cached || {}; }
  }catch{}
  if(!emojiStyles.length) emojiStyles = [{key:"system",label:"System Default",family:"System Emoji",kind:"system-stack",note:"System"},{key:"twemoji",label:"Twemoji",family:"Jdecked Twemoji",kind:"download",note:"X / Twitter"}];
}

function normalizeConfig(raw){
  const fonts={
    fa:String(raw.fonts?.fa||raw.fontKey||DEFAULT_CONFIG.fonts.fa),
    en:String(raw.fonts?.en||DEFAULT_CONFIG.fonts.en),
    ar:String(raw.fonts?.ar||DEFAULT_CONFIG.fonts.ar),
    zh:String(raw.fonts?.zh||DEFAULT_CONFIG.fonts.zh)
  };
  const next={
    ...DEFAULT_CONFIG,...raw,paused:!!raw.paused,fontKey:fonts.fa,fonts,
    unifiedFontEnabled:!!raw.unifiedFontEnabled,
    allFontKey:String(raw.allFontKey||raw.fontKey||DEFAULT_CONFIG.allFontKey),
    align:["preserve","right","left","center","justify"].includes(raw.align)?raw.align:"preserve",
    weightMode:raw.weightMode==="custom"?"custom":"preserve",
    normalWeight:sanitizeWeight(raw.normalWeight,"400"),boldWeight:sanitizeWeight(raw.boldWeight,"700"),
    fontDelta:clamp(raw.fontDelta,-4,12,0),digitMode:["preserve","persian","latin","arabic"].includes(raw.digitMode)?raw.digitMode:"preserve",digitFontDelta:clamp(raw.digitFontDelta,-4,12,0),
    zwnjMode:["preserve","remove","space","smart"].includes(raw.zwnjMode)?raw.zwnjMode:"preserve",
    emojiStyle:String(raw.emojiStyle||"twemoji"),
    layoutEnhance:!!raw.layoutEnhance,cursorEnabled:!!raw.cursorEnabled,cursorPackKey:globalThis.__PERSIANYAR_CURSOR_PACKS__?.byKey?.[raw.cursorPackKey]?.key||"macos-black",cursorSize:clamp(raw.cursorSize,16,96,32),cursorMotionEnabled:!!raw.cursorMotionEnabled,cursorMotionPreset:["precise","smooth","float"].includes(raw.cursorMotionPreset)?raw.cursorMotionPreset:"smooth",cursorSmoothness:clamp(raw.cursorSmoothness,0,100,35),cursorTrailEnabled:!!raw.cursorTrailEnabled,cursorTrailLength:clamp(raw.cursorTrailLength,1,6,3),cursorClickEffectEnabled:raw.cursorClickEffectEnabled!==false,cursorHoverScaleEnabled:raw.cursorHoverScaleEnabled!==false,cursorGlowEnabled:!!raw.cursorGlowEnabled,softMotionEnabled:!!raw.softMotionEnabled,
    motionHoverEnabled:raw.motionHoverEnabled!==false,motionPopEnabled:raw.motionPopEnabled!==false,motionStaggerEnabled:raw.motionStaggerEnabled!==false,motionCrossfadeEnabled:raw.motionCrossfadeEnabled!==false,motionMorphEnabled:raw.motionMorphEnabled!==false,motionSharedLayoutEnabled:raw.motionSharedLayoutEnabled!==false,motionRubberEnabled:raw.motionRubberEnabled!==false,motionSafePolygonEnabled:raw.motionSafePolygonEnabled!==false,motionListEnabled:raw.motionListEnabled!==false,motionShimmerEnabled:raw.motionShimmerEnabled!==false,
    motionTooltipDelayEnabled:raw.motionTooltipDelayEnabled!==false,motionTabularNumsEnabled:raw.motionTabularNumsEnabled!==false,motionScrollFadeEnabled:raw.motionScrollFadeEnabled!==false,motionSliderMorphEnabled:raw.motionSliderMorphEnabled!==false,motionSharedElementEnabled:raw.motionSharedElementEnabled!==false,motionIconCrossfadeEnabled:raw.motionIconCrossfadeEnabled!==false,
    softCorners:!!raw.softCorners,uniformCornersEnabled:!!raw.uniformCornersEnabled,uniformCornerRadius:clamp(raw.uniformCornerRadius,0,48,14),removeShadows:!!raw.removeShadows,smoothScrollEnabled:!!raw.smoothScrollEnabled,smartDarkMode:!!raw.smartDarkMode,
    smartDarkPreset:SMART_DARK_PRESET_BY_KEY[raw.smartDarkPreset]?raw.smartDarkPreset:"balanced",
    smartDarkBackgroundColor:normalizeHexColor(raw.smartDarkBackgroundColor,DEFAULT_CONFIG.smartDarkBackgroundColor),smartDarkTextColor:normalizeHexColor(raw.smartDarkTextColor,DEFAULT_CONFIG.smartDarkTextColor),smartDarkAccentColor:normalizeHexColor(raw.smartDarkAccentColor,DEFAULT_CONFIG.smartDarkAccentColor),
    smartDarkBrightness:clamp(raw.smartDarkBrightness,70,130,100),smartDarkContrast:clamp(raw.smartDarkContrast,70,140,100),smartDarkSepia:clamp(raw.smartDarkSepia,0,40,0),smartDarkGrayscale:clamp(raw.smartDarkGrayscale,0,100,0),
    liquidGlassMode:!!raw.liquidGlassMode,linearStyleMode:!!raw.linearStyleMode,adaptiveMenusMode:!!raw.adaptiveMenusMode,focusEnhanceMode:!!raw.focusEnhanceMode,polishedInputsMode:!!raw.polishedInputsMode,
    liquidGlassBlur:clamp(raw.liquidGlassBlur,0,32,18),liquidGlassOpacity:clamp(raw.liquidGlassOpacity,20,92,58),liquidGlassSaturation:clamp(raw.liquidGlassSaturation,100,180,138),liquidGlassTintColor:normalizeHexColor(raw.liquidGlassTintColor,DEFAULT_CONFIG.liquidGlassTintColor),liquidGlassTintStrength:clamp(raw.liquidGlassTintStrength,0,35,8),
    linearStyleColor:normalizeHexColor(raw.linearStyleColor,DEFAULT_CONFIG.linearStyleColor),linearStyleOpacity:clamp(raw.linearStyleOpacity,8,100,24),linearStyleWidth:clamp(raw.linearStyleWidth,1,3,1),
    menuHighlightStrength:clamp(raw.menuHighlightStrength,6,32,12),focusRingColor:normalizeHexColor(raw.focusRingColor,DEFAULT_CONFIG.focusRingColor),focusRingWidth:clamp(raw.focusRingWidth,1,4,2),inputHighlightStrength:clamp(raw.inputHighlightStrength,6,36,16)
  };
  delete next.jalaliDatesEnabled; delete next.jalaliCalendarEnabled;
  return next;
}

function setupSelectPortal(){
  document.querySelectorAll(".custom-select").forEach(root=>{
    const menu=root.querySelector(".select-menu");
    if(!menu)return;
    selectMenus.set(root.id,menu);
    menu.dataset.owner=root.id;
    menu.classList.add("select-sheet");
    document.body.appendChild(menu);
  });
  els.selectBackdrop?.addEventListener("click",()=>closeAllSelects());
}
function getSelectMenu(root){ return root ? (selectMenus.get(root.id) || null) : null; }
function sheetTitleFor(root){
  const id=root?.id||"";
  const fixed={
    "font-all":t("singleFontPick"),"font-fa":"فارسی / Persian","font-en":"English","font-ar":"العربية / Arabic","font-zh":"简体中文 / Chinese",
    align:t("alignment"),weightMode:t("weight"),normalWeight:t("normalText"),boldWeight:t("boldText"),digitMode:t("digits"),emojiStyle:t("emojiStyle"),zwnjMode:t("zwnj")
  };
  return fixed[id] || root?.previousElementSibling?.textContent?.trim() || "پرشین یار";
}
function ensureSheetHeader(root,menu){
  menu.querySelector(":scope > .sheet-header")?.remove();
  let scroll=menu.querySelector(":scope > .sheet-scroll");
  if(!scroll){
    scroll=document.createElement("div");
    scroll.className="sheet-scroll";
    [...menu.childNodes].forEach(node=>scroll.appendChild(node));
    menu.appendChild(scroll);
  }
  const head=document.createElement("div");
  head.className="sheet-header";
  head.innerHTML=`<span class="sheet-grabber" aria-hidden="true"></span><div class="sheet-title">${escapeHtml(sheetTitleFor(root))}</div><button class="sheet-close" type="button" aria-label="Close"><svg class="icon sm"><use href="icons/sprite.svg#x"/></svg></button>`;
  head.querySelector(".sheet-close").addEventListener("click",e=>{e.stopPropagation();closeSelect(root);});
  menu.prepend(head);
  scroll.scrollTop=0;
}


function buildStaticSelects(){
  fillSimpleSelect("align",[
    ["preserve","preserve"],["right","right"],["center","center"],["left","left"],["justify","justify"]
  ]);
  fillSimpleSelect("weightMode",[["preserve","preserve"],["custom","custom"]]);
  fillSimpleSelect("digitMode",[["preserve","digitsPreserve"],["persian","digitsPersian"],["latin","digitsLatin"],["arabic","digitsArabic"]]);
  fillSimpleSelect("zwnjMode",[["preserve","zwnjPreserve"],["remove","zwnjRemove"],["space","zwnjSpace"],["smart","zwnjSmart"]]);
  const weights = [100,200,300,400,500,600,700,800,900].map(v=>[String(v),String(v),true]);
  fillSimpleSelect("normalWeight",weights); fillSimpleSelect("boldWeight",weights);
}

function fillSimpleSelect(id,items){
  const root=$(id); if(!root)return;
  const menu=getSelectMenu(root);
  if(!menu)return;
  menu.innerHTML = items.map(([value,labelKey,raw],i)=>`<button class="select-option" style="--i:${i}" type="button" data-value="${escapeAttr(value)}" data-label-key="${escapeAttr(raw?"":labelKey)}" data-label="${escapeAttr(raw?labelKey:t(labelKey))}"><span>${escapeHtml(raw?labelKey:t(labelKey))}</span><svg class="icon sm check"><use href="icons/sprite.svg#check"/></svg></button>`).join("");
}

function buildFontSelects(){
  if(fontSelectsBuilt)return; fontSelectsBuilt=true;
  const buildOne=(root,rowsProvider,sampleText,currentValue)=>{
    if(!root)return;
    const menu=getSelectMenu(root),input=menu?.querySelector("[data-font-search]");
    if(!menu||!input)return;
    const render=()=>{
      const q=normalizeSearch(input.value);
      const rows=rowsProvider().filter(f=>!q || normalizeSearch(`${fontLabel(f)} ${f.family} ${f.key}`).includes(q));
      menu.querySelector(".select-options").innerHTML=rows.map((font,i)=>`<button class="select-option font-option" style="--i:${i}" type="button" data-value="${escapeAttr(font.key)}" data-label="${escapeAttr(fontLabel(font))}"><span class="font-option-copy"><b>${escapeHtml(fontLabel(font))}</b><small>${escapeHtml(font.family)}</small><em class="font-option-preview preview-loading" data-font-preview="${escapeAttr(font.key)}">${escapeHtml(sampleText)}</em></span><svg class="icon sm check"><use href="icons/sprite.svg#check"/></svg></button>`).join("");
      const selected=currentValue();
      markSelected(root,selected);
      menu.querySelectorAll(".font-option").forEach(btn=>{
        const preview=btn.querySelector(".font-option-preview"),key=btn.dataset.value;
        if(key===selected) ensureFontOptionPreview(key,preview,true);
        btn.addEventListener("mouseenter",()=>ensureFontOptionPreview(key,preview,false),{once:true});
        btn.addEventListener("focus",()=>ensureFontOptionPreview(key,preview,true),{once:true});
      });
    };
    input.addEventListener("input",render); stopStatic(input); render();
  };

  buildOne($("font-all"),()=>fontCatalog,"Aa · فارسی · العربية · 中文 · 123",()=>config.allFontKey);
  for(const script of ["fa","en","ar","zh"]){
    const sampleText={fa:"نمونه متن فارسی ۱۲۳",en:"The quick brown fox 123",ar:"نموذج نص عربي ١٢٣",zh:"中文字体预览 123"}[script];
    buildOne($(`font-${script}`),()=>fontCatalog.filter(f=>f.lang===script),sampleText,()=>config.fonts[script]);
  }
}

function buildEmojiSelect(){ if(emojiSelectBuilt)return;emojiSelectBuilt=true; renderEmojiOptions(""); stopStatic(els.emojiSearch); els.emojiSearch.addEventListener("input",()=>renderEmojiOptions(els.emojiSearch.value)); }
function renderEmojiOptions(query){
  const q=normalizeSearch(query);
  const rows=emojiStyles.filter(s=>!q || normalizeSearch(`${s.label} ${s.note} ${s.platform} ${s.family}`).includes(q));
  els.emojiResultCount.textContent=String(rows.length);
  els.emojiOptions.innerHTML=rows.map((style,i)=>{
    const state=emojiState(style);
    return `<button class="select-option emoji-option" style="--i:${i}" type="button" data-value="${escapeAttr(style.key)}" data-label="${escapeAttr(style.label)}"><span class="emoji-option-main"><span class="emoji-option-preview preview-loading" data-emoji-preview="${escapeAttr(style.key)}" dir="ltr">${EMOJI_SAMPLE}</span><span class="emoji-option-copy"><b>${escapeHtml(style.label)}</b><small>${escapeHtml(style.note||style.platform||"")}</small></span></span><span class="cache-badge ${state.className}">${escapeHtml(state.label)}</span></button>`;
  }).join("");
  markSelected(els.emojiStyle,config.emojiStyle);
  els.emojiOptions.querySelectorAll(".emoji-option").forEach(btn=>{
    const key=btn.dataset.value;
    btn.addEventListener("mouseenter",()=>ensureEmojiPreview(key,btn.querySelector(".emoji-option-preview"),true),{once:true});
    btn.addEventListener("focus",()=>ensureEmojiPreview(key,btn.querySelector(".emoji-option-preview"),true),{once:true});
  });
}

function emojiState(style){
  if(style.kind==="system-stack" || style.kind==="system-local") return {label:t("native"),className:"cached"};
  if(style.kind==="hybrid") return {label:emojiCached[style.key]?t("cached"):t("native"),className:"cached"};
  return emojiCached[style.key]?{label:t("cached"),className:"cached"}:{label:t("download"),className:""};
}

function bindUI(){
  // Core controls remain available even on restricted pages (menu, theme, locale, UI size).
  document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeAllSelects();closeDrawer();closeLocalizationGuide();closeMotionGuide();closeCursorSheet();}});
  bindDrawer(); bindTheme(); bindLocale(); bindUiSize();
  els.openOptions.addEventListener("click",()=>chrome.runtime.openOptionsPage());
  if(!supported) return;

  bindSwitch(els.sitePaused,v=>setSitePaused(v));
  document.addEventListener("click",onDocumentClick);
  document.querySelectorAll(".custom-select .select-trigger").forEach(trigger=>trigger.addEventListener("click",e=>{e.stopPropagation();toggleSelect(trigger.closest(".custom-select"),e);}));
  document.addEventListener("click",async e=>{
    const option=e.target.closest(".select-option");
    if(!option || !activeSelectRoot || !option.closest(".select-sheet"))return;
    e.stopPropagation();
    const root=activeSelectRoot;
    const value=option.dataset.value,label=option.dataset.label || option.querySelector("span")?.textContent || value;
    if(root.id==="emojiStyle") await selectEmojiStyle(value,option.querySelector(".emoji-option-preview"));
    else chooseSelect(root,value,label,true);
    closeSelect(root);
  });

  bindSwitch(els.enabled,v=>{config.enabled=v;applyInstant(true);});
  bindSwitch(els.unifiedFontEnabled,v=>{config.unifiedFontEnabled=v;updateUnifiedFontUI(true);applyInstant(true);});
  bindSwitch(els.emojiEnabled,v=>{config.emojiEnabled=v;if(v) prepareEmojiStyle(config.emojiStyle);applyInstant(true);updateEmojiUI(true);});
  bindSwitch(els.localizeEnabled,v=>{config.localizeEnabled=v;applyInstant(true);});
  bindSwitch(els.bidiRepair,v=>{config.bidiRepair=v;applyInstant(true);});
  bindSwitch(els.layoutEnhance,v=>{config.layoutEnhance=v;applyInstant(true);});
  bindSwitch(els.rtlBeta,v=>{config.rtlBeta=v;applyInstant(true);});
  bindSwitch(els.cursorEnabled,v=>{config.cursorEnabled=v;updateCursorPickerSummary();applyInstant(true);if(v){cacheCursorPack(config.cursorPackKey).then(()=>{updateCursorPreview();updateCursorPickerSummary();}).catch(()=>{});}});
  bindSwitch(els.cursorMotionEnabled,v=>{config.cursorMotionEnabled=v;updateCursorControls();updateCursorPreview();applyInstant(true);});
  bindSwitch(els.cursorTrailEnabled,v=>{config.cursorTrailEnabled=v;updateCursorControls();updateCursorPreview();applyInstant(true);});
  bindSwitch(els.cursorClickEffectEnabled,v=>{config.cursorClickEffectEnabled=v;applyInstant(true);});
  bindSwitch(els.cursorHoverScaleEnabled,v=>{config.cursorHoverScaleEnabled=v;updateCursorPreview();applyInstant(true);});
  bindSwitch(els.cursorGlowEnabled,v=>{config.cursorGlowEnabled=v;updateCursorPreview();applyInstant(true);});
  bindSwitch(els.softMotionEnabled,v=>{config.softMotionEnabled=v;applyInstant(true);});
  for(const [el,key] of [[els.motionHoverEnabled,"motionHoverEnabled"],[els.motionPopEnabled,"motionPopEnabled"],[els.motionStaggerEnabled,"motionStaggerEnabled"],[els.motionCrossfadeEnabled,"motionCrossfadeEnabled"],[els.motionMorphEnabled,"motionMorphEnabled"],[els.motionSharedLayoutEnabled,"motionSharedLayoutEnabled"],[els.motionRubberEnabled,"motionRubberEnabled"],[els.motionSafePolygonEnabled,"motionSafePolygonEnabled"],[els.motionListEnabled,"motionListEnabled"],[els.motionShimmerEnabled,"motionShimmerEnabled"],[els.motionTooltipDelayEnabled,"motionTooltipDelayEnabled"],[els.motionTabularNumsEnabled,"motionTabularNumsEnabled"],[els.motionScrollFadeEnabled,"motionScrollFadeEnabled"],[els.motionSliderMorphEnabled,"motionSliderMorphEnabled"],[els.motionSharedElementEnabled,"motionSharedElementEnabled"],[els.motionIconCrossfadeEnabled,"motionIconCrossfadeEnabled"]]) bindSwitch(el,v=>{config[key]=v;if(v&&!config.softMotionEnabled){config.softMotionEnabled=true;setSwitch(els.softMotionEnabled,true,true);}applyInstant(true);});
  bindSwitch(els.softCorners,v=>{config.softCorners=v;applyInstant(true);});
  bindSwitch(els.uniformCornersEnabled,v=>{config.uniformCornersEnabled=v;updateSoftUiControls();applyInstant(true);});
  bindSwitch(els.removeShadows,v=>{config.removeShadows=v;applyInstant(true);});
  bindSwitch(els.smoothScrollEnabled,v=>{config.smoothScrollEnabled=v;applyInstant(true);});
  for(const [el,key] of [[els.smartDarkMode,"smartDarkMode"],[els.liquidGlassMode,"liquidGlassMode"],[els.linearStyleMode,"linearStyleMode"],[els.adaptiveMenusMode,"adaptiveMenusMode"],[els.focusEnhanceMode,"focusEnhanceMode"],[els.polishedInputsMode,"polishedInputsMode"]]) bindSwitch(el,v=>{config[key]=v;applyInstant(true);});
  bindSmartDarkThemeUI();
  bindSiteStyleTuningUI();
  bindSwitch(els.includeSubdomains,v=>{config.includeSubdomains=v;applyInstant(true);});

  els.fontDeltaMinus.addEventListener("click",()=>changeFontDelta(-1)); els.fontDeltaPlus.addEventListener("click",()=>changeFontDelta(1));
  els.digitFontDeltaMinus?.addEventListener("click",()=>changeDigitFontDelta(-1)); els.digitFontDeltaPlus?.addEventListener("click",()=>changeDigitFontDelta(1));
  els.cornerRadiusMinus?.addEventListener("click",()=>changeCornerRadius(-1)); els.cornerRadiusPlus?.addEventListener("click",()=>changeCornerRadius(1));
  els.cursorSizeMinus?.addEventListener("click",()=>changeCursorSize(-8)); els.cursorSizePlus?.addEventListener("click",()=>changeCursorSize(8));
  els.cursorSmoothness?.addEventListener("input",()=>{config.cursorSmoothness=clamp(els.cursorSmoothness.value,0,100,35);syncCursorMotionPresetFromSmoothness();updateCursorControls();updateCursorPreview();applyInstant(true);});
  els.cursorTrailLength?.addEventListener("input",()=>{config.cursorTrailLength=clamp(els.cursorTrailLength.value,1,6,3);updateCursorControls();updateCursorPreview();applyInstant(true);});
  document.querySelectorAll("[data-cursor-motion-preset]").forEach(btn=>btn.addEventListener("click",()=>setCursorMotionPreset(btn.dataset.cursorMotionPreset)));
  document.querySelectorAll("[data-accordion]").forEach(btn=>btn.addEventListener("click",()=>toggleAccordion(btn)));
  bindLocalizationGuide(); bindMotionGuide(); bindMotionCustomize(); bindCursorSheet();
  els.resetSite.addEventListener("click",resetSite);
}

function onDocumentClick(e){
  if(e.target.closest(".select-sheet") || e.target.closest(".select-trigger"))return;
  closeAllSelects();
}
function stopStatic(input){ ["click","pointerdown","mousedown"].forEach(type=>input.addEventListener(type,e=>e.stopPropagation())); }

function toggleSelect(root,event){
  if(!root)return;
  if(root.id?.startsWith("font-"))buildFontSelects();
  if(root.id==="emojiStyle")buildEmojiSelect();
  const opening=activeSelectRoot!==root || !root.classList.contains("open");
  closeAllSelects(root);
  if(!opening){closeSelect(root);return;}
  const menu=getSelectMenu(root); if(!menu)return;
  activeSelectRoot=root;
  root.classList.add("open");
  root.querySelector(".select-trigger")?.setAttribute("aria-expanded","true");
  document.body.classList.add("menu-open");
  ensureSheetHeader(root,menu);
  const trigger=root.querySelector(".select-trigger");
  if(trigger){const r=trigger.getBoundingClientRect();const sheetLeft=10;const x=Math.max(12,Math.min(innerWidth-32,r.left+r.width/2-sheetLeft));menu.style.setProperty("--popup-origin-x",`${x}px`);menu.style.setProperty("--popup-origin-y","100%");}
  menu.classList.add("sheet-active");
  menu.setAttribute("aria-hidden","false");
  els.selectBackdrop?.classList.add("show");
  if(root.id==="emojiStyle") {
    requestAnimationFrame(()=>{
      const visible=[...els.emojiOptions.querySelectorAll(".emoji-option")].slice(0,6);
      visible.forEach((btn,i)=>setTimeout(()=>{const key=btn.dataset.value;if(!HEAVY_EMOJI.has(key)||emojiCached[key])ensureEmojiPreview(key,btn.querySelector(".emoji-option-preview"),true);},i*45));
    });
  } else if(root.id?.startsWith("font-")) {
    requestAnimationFrame(()=>{
      const visible=[...(getSelectMenu(root)?.querySelectorAll?.(".font-option")||[])].slice(0,7);
      visible.forEach((btn,i)=>setTimeout(()=>ensureFontOptionPreview(btn.dataset.value,btn.querySelector(".font-option-preview"),true),i*35));
    });
  }
  requestAnimationFrame(()=>getSelectMenu(root)?.querySelector("input")?.focus({preventScroll:true}));
}
function closeSelect(root){
  if(!root)return;
  root.classList.remove("open");
  root.querySelector(".select-trigger")?.setAttribute("aria-expanded","false");
  const menu=getSelectMenu(root);menu?.classList.remove("sheet-active");menu?.setAttribute("aria-hidden","true");
  if(activeSelectRoot===root)activeSelectRoot=null;
  if(!activeSelectRoot){document.body.classList.remove("menu-open");els.selectBackdrop?.classList.remove("show");}
}
function closeAllSelects(except){
  document.querySelectorAll(".custom-select.open").forEach(root=>{if(root!==except)closeSelect(root);});
  if(except && except.classList.contains("open"))activeSelectRoot=except;
  if(!except && activeSelectRoot){const root=activeSelectRoot;activeSelectRoot=null;root.classList.remove("open");getSelectMenu(root)?.classList.remove("sheet-active");root.querySelector(".select-trigger")?.setAttribute("aria-expanded","false");document.body.classList.remove("menu-open");els.selectBackdrop?.classList.remove("show");}
}

function chooseSelect(root,value,label,animate){
  root.dataset.value=value; const labelEl=root.querySelector("[data-select-label]"); if(labelEl){labelEl.textContent=label;if(animate)crossfade(labelEl);} markSelected(root,value); onSelectChange(root.id,value);
}
function markSelected(root,value){getSelectMenu(root)?.querySelectorAll(".select-option").forEach(btn=>btn.setAttribute("aria-selected",String(btn.dataset.value===value)));}
function setSelect(id,value,label){const root=$(id);if(!root)return;root.dataset.value=value;const lab=label ?? labelForSelect(id,value);const el=root.querySelector("[data-select-label]");if(el)el.textContent=lab;markSelected(root,value);}
function labelForSelect(id,value){
  const map={align:{preserve:t("preserve"),right:t("right"),left:t("left"),center:t("center"),justify:t("justify")},weightMode:{preserve:t("preserve"),custom:t("custom")},digitMode:{preserve:t("digitsPreserve"),persian:t("digitsPersian"),latin:t("digitsLatin"),arabic:t("digitsArabic")},zwnjMode:{preserve:t("zwnjPreserve"),remove:t("zwnjRemove"),space:t("zwnjSpace"),smart:t("zwnjSmart")}};
  return map[id]?.[value] || value;
}

function onSelectChange(id,value){
  if(id==="font-all"){config.allFontKey=value;updateFontSample("all",value);applyInstant();return;}
  if(id.startsWith("font-")){
    const script=id.slice(5); config.fonts[script]=value; if(script==="fa")config.fontKey=value; updateFontSample(script,value); applyInstant(); return;
  }
  if(id==="align")config.align=value;
  else if(id==="weightMode")config.weightMode=value;
  else if(id==="normalWeight")config.normalWeight=value;
  else if(id==="boldWeight")config.boldWeight=value;
  else if(id==="digitMode")config.digitMode=value;
  else if(id==="zwnjMode")config.zwnjMode=value;
  updateWeightUI(); applyInstant();
}

function bindSwitch(button,callback){button?.addEventListener("click",()=>{const value=button.getAttribute("aria-checked")!=="true";setSwitch(button,value,true);callback(value);});}
function setSwitch(button,value,animate){if(!button)return;button.setAttribute("aria-checked",String(!!value));if(animate){button.classList.remove("rubber");void button.offsetWidth;button.classList.add("rubber");setTimeout(()=>button.classList.remove("rubber"),380);}}

function changeFontDelta(delta){config.fontDelta=clamp(config.fontDelta+delta,-4,12,0);updateFontDelta();applyInstant();}
function updateFontDelta(){els.fontDeltaValue.textContent=`${config.fontDelta>=0?"+":""}${config.fontDelta}px`;els.fontDeltaMinus.disabled=config.fontDelta<=-4;els.fontDeltaPlus.disabled=config.fontDelta>=12;}
function changeDigitFontDelta(delta){config.digitFontDelta=clamp(config.digitFontDelta+delta,-4,12,0);updateDigitFontDelta();applyInstant();}
function updateDigitFontDelta(){if(!els.digitFontDeltaValue)return;els.digitFontDeltaValue.textContent=`${config.digitFontDelta>=0?"+":""}${config.digitFontDelta}px`;els.digitFontDeltaMinus.disabled=config.digitFontDelta<=-4;els.digitFontDeltaPlus.disabled=config.digitFontDelta>=12;}
function changeCornerRadius(delta){config.uniformCornerRadius=clamp(config.uniformCornerRadius+delta,0,48,14);updateSoftUiControls();applyInstant();}
function updateSoftUiControls(){if(els.cornerRadiusValue)els.cornerRadiusValue.textContent=`${config.uniformCornerRadius}px`;if(els.cornerRadiusMinus)els.cornerRadiusMinus.disabled=config.uniformCornerRadius<=0;if(els.cornerRadiusPlus)els.cornerRadiusPlus.disabled=config.uniformCornerRadius>=48;els.uniformCornerRadiusRow?.classList.toggle("hidden",!config.uniformCornersEnabled);}


let smartDarkThemeApplyTimer=0;
function smartDarkPresetMatches(preset){
  if(!preset)return false;
  return normalizeHexColor(config.smartDarkBackgroundColor,"")===preset.bg && normalizeHexColor(config.smartDarkTextColor,"")===preset.text && normalizeHexColor(config.smartDarkAccentColor,"")===preset.accent && normalizeHexColor(config.linearStyleColor,"")===preset.line && Number(config.smartDarkBrightness)===preset.brightness && Number(config.smartDarkContrast)===preset.contrast && Number(config.smartDarkSepia)===preset.sepia && Number(config.smartDarkGrayscale)===preset.grayscale;
}
function currentSmartDarkPresetKey(){
  const exact=SMART_DARK_PRESETS.find(smartDarkPresetMatches);
  return exact?.key||"custom";
}
function renderSmartDarkPresets(){
  if(!els.smartDarkPresetGrid)return;
  const current=currentSmartDarkPresetKey();
  config.smartDarkPreset=current;
  els.smartDarkPresetGrid.innerHTML=SMART_DARK_PRESETS.map(p=>`<button class="smart-dark-preset" type="button" role="option" data-dark-preset="${escapeAttr(p.key)}" aria-selected="${String(p.key===current)}"><span class="smart-dark-preset-swatches" aria-hidden="true"><i style="background:${p.bg}"></i><i style="background:${p.text}"></i><i style="background:${p.accent}"></i><i style="background:${p.line}"></i></span><strong>${escapeHtml(t(p.nameKey))}</strong></button>`).join("");
  if(els.smartDarkPresetLabel)els.smartDarkPresetLabel.textContent=current==="custom"?t("darkPresetCustom"):t(SMART_DARK_PRESET_BY_KEY[current]?.nameKey||"darkPresetBalanced");
}
function updateSmartDarkThemeUI(){
  if(!els.smartDarkBackgroundColor)return;
  const bg=normalizeHexColor(config.smartDarkBackgroundColor,DEFAULT_CONFIG.smartDarkBackgroundColor),fg=normalizeHexColor(config.smartDarkTextColor,DEFAULT_CONFIG.smartDarkTextColor),accent=normalizeHexColor(config.smartDarkAccentColor,DEFAULT_CONFIG.smartDarkAccentColor);
  config.smartDarkBackgroundColor=bg;config.smartDarkTextColor=fg;config.smartDarkAccentColor=accent;
  els.smartDarkBackgroundColor.value=bg;els.smartDarkTextColor.value=fg;els.smartDarkAccentColor.value=accent;
  const line=normalizeHexColor(config.linearStyleColor,DEFAULT_CONFIG.linearStyleColor);config.linearStyleColor=line;if(els.smartDarkLinearColor)els.smartDarkLinearColor.value=line;if(els.linearStyleColor)els.linearStyleColor.value=line;
  els.smartDarkBackgroundValue.textContent=bg.toUpperCase();els.smartDarkTextValue.textContent=fg.toUpperCase();els.smartDarkAccentValue.textContent=accent.toUpperCase();if(els.smartDarkLinearValue)els.smartDarkLinearValue.textContent=line.toUpperCase();if(els.linearStyleColorValue)els.linearStyleColorValue.textContent=line.toUpperCase();
  for(const [input,out,key] of [[els.smartDarkBrightness,els.smartDarkBrightnessValue,"smartDarkBrightness"],[els.smartDarkContrast,els.smartDarkContrastValue,"smartDarkContrast"],[els.smartDarkSepia,els.smartDarkSepiaValue,"smartDarkSepia"],[els.smartDarkGrayscale,els.smartDarkGrayscaleValue,"smartDarkGrayscale"]]){if(!input||!out)continue;input.value=String(config[key]);out.textContent=`${config[key]}%`;}
  renderSmartDarkPresets();
}
function scheduleSmartDarkThemeApply(immediate=false){
  clearTimeout(smartDarkThemeApplyTimer);
  if(immediate){smartDarkThemeApplyTimer=0;applyInstant(true);return;}
  smartDarkThemeApplyTimer=setTimeout(()=>{smartDarkThemeApplyTimer=0;applyInstant();},120);
}
function setSmartDarkPreset(key){
  const p=SMART_DARK_PRESET_BY_KEY[key];if(!p)return;
  config.smartDarkPreset=p.key;config.smartDarkBackgroundColor=p.bg;config.smartDarkTextColor=p.text;config.smartDarkAccentColor=p.accent;config.linearStyleColor=p.line;config.smartDarkBrightness=p.brightness;config.smartDarkContrast=p.contrast;config.smartDarkSepia=p.sepia;config.smartDarkGrayscale=p.grayscale;
  updateSmartDarkThemeUI();scheduleSmartDarkThemeApply(true);
}
function markSmartDarkThemeCustom(){config.smartDarkPreset=currentSmartDarkPresetKey();renderSmartDarkPresets();}
function bindSmartDarkThemeUI(){
  els.smartDarkCustomizeToggle?.addEventListener("click",()=>{const open=els.smartDarkCustomizeToggle.getAttribute("aria-expanded")!=="true";els.smartDarkCustomizeToggle.setAttribute("aria-expanded",String(open));els.smartDarkCustomizePanel?.classList.toggle("open",open);});
  els.smartDarkPresetGrid?.addEventListener("click",e=>{const btn=e.target.closest("[data-dark-preset]");if(btn)setSmartDarkPreset(btn.dataset.darkPreset);});
  for(const [input,key,out] of [[els.smartDarkBackgroundColor,"smartDarkBackgroundColor",els.smartDarkBackgroundValue],[els.smartDarkTextColor,"smartDarkTextColor",els.smartDarkTextValue],[els.smartDarkAccentColor,"smartDarkAccentColor",els.smartDarkAccentValue]]){
    input?.addEventListener("input",()=>{config[key]=normalizeHexColor(input.value,config[key]);out.textContent=config[key].toUpperCase();markSmartDarkThemeCustom();scheduleSmartDarkThemeApply(false);});
    input?.addEventListener("change",()=>scheduleSmartDarkThemeApply(true));
  }
  els.smartDarkLinearColor?.addEventListener("input",()=>{config.linearStyleColor=normalizeHexColor(els.smartDarkLinearColor.value,config.linearStyleColor);if(els.smartDarkLinearValue)els.smartDarkLinearValue.textContent=config.linearStyleColor.toUpperCase();if(els.linearStyleColor)els.linearStyleColor.value=config.linearStyleColor;if(els.linearStyleColorValue)els.linearStyleColorValue.textContent=config.linearStyleColor.toUpperCase();markSmartDarkThemeCustom();scheduleSmartDarkThemeApply(false);});
  els.smartDarkLinearColor?.addEventListener("change",()=>scheduleSmartDarkThemeApply(true));
  for(const [input,key,out,min,max,fallback] of [[els.smartDarkBrightness,"smartDarkBrightness",els.smartDarkBrightnessValue,70,130,100],[els.smartDarkContrast,"smartDarkContrast",els.smartDarkContrastValue,70,140,100],[els.smartDarkSepia,"smartDarkSepia",els.smartDarkSepiaValue,0,40,0],[els.smartDarkGrayscale,"smartDarkGrayscale",els.smartDarkGrayscaleValue,0,100,0]]){
    input?.addEventListener("input",()=>{config[key]=clamp(input.value,min,max,fallback);out.textContent=`${config[key]}%`;markSmartDarkThemeCustom();scheduleSmartDarkThemeApply(false);});
    input?.addEventListener("change",()=>scheduleSmartDarkThemeApply(true));
  }
  els.smartDarkResetTheme?.addEventListener("click",()=>setSmartDarkPreset("balanced"));
}

let siteStyleApplyTimer=0;
function scheduleSiteStyleApply(immediate=false){
  clearTimeout(siteStyleApplyTimer);
  if(immediate){siteStyleApplyTimer=0;applyInstant(true);return;}
  siteStyleApplyTimer=setTimeout(()=>{siteStyleApplyTimer=0;applyInstant();},90);
}
function updateSiteStyleTuningUI(){
  const colors=[[els.liquidGlassTintColor,els.liquidGlassTintValue,"liquidGlassTintColor",DEFAULT_CONFIG.liquidGlassTintColor],[els.linearStyleColor,els.linearStyleColorValue,"linearStyleColor",DEFAULT_CONFIG.linearStyleColor],[els.focusRingColor,els.focusRingColorValue,"focusRingColor",DEFAULT_CONFIG.focusRingColor]];
  for(const [input,out,key,fallback] of colors){if(!input||!out)continue;const v=normalizeHexColor(config[key],fallback);config[key]=v;input.value=v;out.textContent=v.toUpperCase();}
  const ranges=[
    [els.liquidGlassBlur,els.liquidGlassBlurValue,"liquidGlassBlur",0,32,18,"px"],
    [els.liquidGlassOpacity,els.liquidGlassOpacityValue,"liquidGlassOpacity",20,92,58,"%"],
    [els.liquidGlassSaturation,els.liquidGlassSaturationValue,"liquidGlassSaturation",100,180,138,"%"],
    [els.liquidGlassTintStrength,els.liquidGlassTintStrengthValue,"liquidGlassTintStrength",0,35,8,"%"],
    [els.linearStyleOpacity,els.linearStyleOpacityValue,"linearStyleOpacity",8,100,24,"%"],
    [els.linearStyleWidth,els.linearStyleWidthValue,"linearStyleWidth",1,3,1,"px"],
    [els.menuHighlightStrength,els.menuHighlightStrengthValue,"menuHighlightStrength",6,32,12,"%"],
    [els.focusRingWidth,els.focusRingWidthValue,"focusRingWidth",1,4,2,"px"],
    [els.inputHighlightStrength,els.inputHighlightStrengthValue,"inputHighlightStrength",6,36,16,"%"]
  ];
  for(const [input,out,key,min,max,fallback,suffix] of ranges){if(!input||!out)continue;const v=clamp(config[key],min,max,fallback);config[key]=v;input.value=String(v);out.textContent=`${v}${suffix}`;}
}
function bindSiteStyleTuningUI(){
  els.siteStyleCustomizeToggle?.addEventListener("click",()=>{const open=els.siteStyleCustomizeToggle.getAttribute("aria-expanded")!=="true";els.siteStyleCustomizeToggle.setAttribute("aria-expanded",String(open));els.siteStyleCustomizePanel?.classList.toggle("open",open);});
  for(const [input,out,key,fallback] of [[els.liquidGlassTintColor,els.liquidGlassTintValue,"liquidGlassTintColor",DEFAULT_CONFIG.liquidGlassTintColor],[els.linearStyleColor,els.linearStyleColorValue,"linearStyleColor",DEFAULT_CONFIG.linearStyleColor],[els.focusRingColor,els.focusRingColorValue,"focusRingColor",DEFAULT_CONFIG.focusRingColor]]){
    input?.addEventListener("input",()=>{config[key]=normalizeHexColor(input.value,fallback);out.textContent=config[key].toUpperCase();if(key==="linearStyleColor"){if(els.smartDarkLinearColor)els.smartDarkLinearColor.value=config[key];if(els.smartDarkLinearValue)els.smartDarkLinearValue.textContent=config[key].toUpperCase();markSmartDarkThemeCustom();}scheduleSiteStyleApply(false);});
    input?.addEventListener("change",()=>scheduleSiteStyleApply(true));
  }
  for(const [input,out,key,min,max,fallback,suffix] of [[els.liquidGlassBlur,els.liquidGlassBlurValue,"liquidGlassBlur",0,32,18,"px"],[els.liquidGlassOpacity,els.liquidGlassOpacityValue,"liquidGlassOpacity",20,92,58,"%"],[els.liquidGlassSaturation,els.liquidGlassSaturationValue,"liquidGlassSaturation",100,180,138,"%"],[els.liquidGlassTintStrength,els.liquidGlassTintStrengthValue,"liquidGlassTintStrength",0,35,8,"%"],[els.linearStyleOpacity,els.linearStyleOpacityValue,"linearStyleOpacity",8,100,24,"%"],[els.linearStyleWidth,els.linearStyleWidthValue,"linearStyleWidth",1,3,1,"px"],[els.menuHighlightStrength,els.menuHighlightStrengthValue,"menuHighlightStrength",6,32,12,"%"],[els.focusRingWidth,els.focusRingWidthValue,"focusRingWidth",1,4,2,"px"],[els.inputHighlightStrength,els.inputHighlightStrengthValue,"inputHighlightStrength",6,36,16,"%"]]){
    input?.addEventListener("input",()=>{config[key]=clamp(input.value,min,max,fallback);out.textContent=`${config[key]}${suffix}`;scheduleSiteStyleApply(false);});
    input?.addEventListener("change",()=>scheduleSiteStyleApply(true));
  }
  els.siteStyleReset?.addEventListener("click",()=>{for(const key of ["liquidGlassBlur","liquidGlassOpacity","liquidGlassSaturation","liquidGlassTintColor","liquidGlassTintStrength","linearStyleColor","linearStyleOpacity","linearStyleWidth","menuHighlightStrength","focusRingColor","focusRingWidth","inputHighlightStrength"])config[key]=DEFAULT_CONFIG[key];updateSiteStyleTuningUI();updateSmartDarkThemeUI();scheduleSiteStyleApply(true);});
}

function hydrateControls(){
  setSwitch(els.sitePaused,!!config.paused,false);
  els.pauseBadge?.classList.toggle("hidden",!config.paused);
  document.body.classList.toggle("site-paused",!!config.paused);
  setSwitch(els.enabled,config.enabled,false);setSwitch(els.unifiedFontEnabled,config.unifiedFontEnabled,false);setSwitch(els.emojiEnabled,config.emojiEnabled,false);setSwitch(els.localizeEnabled,config.localizeEnabled,false);setSwitch(els.bidiRepair,config.bidiRepair,false);setSwitch(els.layoutEnhance,config.layoutEnhance,false);setSwitch(els.rtlBeta,config.rtlBeta,false);setSwitch(els.cursorEnabled,config.cursorEnabled,false);setSwitch(els.cursorMotionEnabled,config.cursorMotionEnabled,false);setSwitch(els.cursorTrailEnabled,config.cursorTrailEnabled,false);setSwitch(els.cursorClickEffectEnabled,config.cursorClickEffectEnabled,false);setSwitch(els.cursorHoverScaleEnabled,config.cursorHoverScaleEnabled,false);setSwitch(els.cursorGlowEnabled,config.cursorGlowEnabled,false);setSwitch(els.softMotionEnabled,config.softMotionEnabled,false);setSwitch(els.motionHoverEnabled,config.motionHoverEnabled,false);setSwitch(els.motionPopEnabled,config.motionPopEnabled,false);setSwitch(els.motionStaggerEnabled,config.motionStaggerEnabled,false);setSwitch(els.motionCrossfadeEnabled,config.motionCrossfadeEnabled,false);setSwitch(els.motionMorphEnabled,config.motionMorphEnabled,false);setSwitch(els.motionSharedLayoutEnabled,config.motionSharedLayoutEnabled,false);setSwitch(els.motionRubberEnabled,config.motionRubberEnabled,false);setSwitch(els.motionSafePolygonEnabled,config.motionSafePolygonEnabled,false);setSwitch(els.motionListEnabled,config.motionListEnabled,false);setSwitch(els.motionShimmerEnabled,config.motionShimmerEnabled,false);setSwitch(els.motionTooltipDelayEnabled,config.motionTooltipDelayEnabled,false);setSwitch(els.motionTabularNumsEnabled,config.motionTabularNumsEnabled,false);setSwitch(els.motionScrollFadeEnabled,config.motionScrollFadeEnabled,false);setSwitch(els.motionSliderMorphEnabled,config.motionSliderMorphEnabled,false);setSwitch(els.motionSharedElementEnabled,config.motionSharedElementEnabled,false);setSwitch(els.motionIconCrossfadeEnabled,config.motionIconCrossfadeEnabled,false);setSwitch(els.softCorners,config.softCorners,false);setSwitch(els.uniformCornersEnabled,config.uniformCornersEnabled,false);setSwitch(els.removeShadows,config.removeShadows,false);setSwitch(els.smoothScrollEnabled,config.smoothScrollEnabled,false);setSwitch(els.smartDarkMode,config.smartDarkMode,false);setSwitch(els.liquidGlassMode,config.liquidGlassMode,false);setSwitch(els.linearStyleMode,config.linearStyleMode,false);setSwitch(els.adaptiveMenusMode,config.adaptiveMenusMode,false);setSwitch(els.focusEnhanceMode,config.focusEnhanceMode,false);setSwitch(els.polishedInputsMode,config.polishedInputsMode,false);setSwitch(els.includeSubdomains,config.includeSubdomains,false);
  els.enabledText.textContent=config.enabled?t("on"):t("off");
  const allFont=fontByKey[config.allFontKey];setSelect("font-all",config.allFontKey,fontLabel(allFont)||config.allFontKey);if(catalogsReady)updateFontSample("all",config.allFontKey);
  for(const script of ["fa","en","ar","zh"]){const font=fontByKey[config.fonts[script]];setSelect(`font-${script}`,config.fonts[script],fontLabel(font)||config.fonts[script]);if(catalogsReady)updateFontSample(script,config.fonts[script]);}
  updateUnifiedFontUI(false);
  setSelect("align",config.align);setSelect("weightMode",config.weightMode);setSelect("normalWeight",config.normalWeight,config.normalWeight);setSelect("boldWeight",config.boldWeight,config.boldWeight);setSelect("digitMode",config.digitMode);setSelect("zwnjMode",config.zwnjMode);
  updateWeightUI();updateFontDelta();updateDigitFontDelta();updateSoftUiControls();updateSmartDarkThemeUI();updateSiteStyleTuningUI();updateCursorControls();updateEmojiUI(false);updatePreview();
}

function updateUnifiedFontUI(animate){
  if(!els.unifiedFontPicker||!els.languageFontRows)return;
  els.unifiedFontPicker.classList.toggle("hidden",!config.unifiedFontEnabled);
  els.languageFontRows.classList.toggle("is-paused",config.unifiedFontEnabled);
  els.languageFontRows.setAttribute("aria-disabled",String(config.unifiedFontEnabled));
  if(animate)crossfade(config.unifiedFontEnabled?els.unifiedFontPicker:els.languageFontRows);
}

function updatePreview(){els.enabledText.textContent=config.enabled?t("on"):t("off");els.fontPreview.classList.remove("crossfade");void els.fontPreview.offsetWidth;els.fontPreview.classList.add("crossfade");}
function updateWeightUI(){els.weightBox.classList.toggle("hidden",config.weightMode!=="custom");}

async function ensureFontOptionPreview(fontKey, element, force=false){
  if(!element||!fontKey)return false;
  const font=fontByKey[fontKey];if(!font)return false;
  element.dataset.fontPreviewKey=fontKey;
  element.classList.add("preview-loading");
  element.setAttribute("aria-busy","true");
  let promise=fontPreviewPromises.get(fontKey);
  if(!promise){
    promise=chrome.runtime.sendMessage({type:"fontyar:get-ui-font",fontKey}).catch(()=>null);
    fontPreviewPromises.set(fontKey,promise);
  }
  if(!force && !promise)return false;
  const r=await promise;
  if(!r?.ok){fontPreviewPromises.delete(fontKey);return false;}
  if(element.dataset.fontPreviewKey!==fontKey)return false;
  const styleId=`__fontyar_popup_font_${fontKey.replace(/[^a-z0-9_-]/gi,"_")}`;
  if(r.css&&!document.getElementById(styleId)){const style=document.createElement("style");style.id=styleId;style.textContent=r.css;document.head.append(style);}
  const family=r.family||font.family;
  try{await document.fonts?.load?.(`400 16px "${family}"`,element.textContent||"Aa");await document.fonts?.ready;}catch{}
  if(element.dataset.fontPreviewKey!==fontKey)return false;
  element.style.fontFamily=`"${family}",sans-serif`;
  element.classList.remove("preview-loading");
  element.removeAttribute("aria-busy");
  element.classList.remove("preview-swap");void element.offsetWidth;element.classList.add("preview-swap");
  return true;
}

async function updateFontSample(script,fontKey){
  const font=fontByKey[fontKey];if(!font)return;const sample=$(script==="all"?"sample-all":`sample-${script}`);if(!sample)return;
  sample.classList.add("preview-loading");sample.style.removeProperty("font-family");
  await ensureFontOptionPreview(fontKey,sample,true);
}

async function selectEmojiStyle(styleKey,sourcePreview){
  config.emojiStyle=styleKey;const style=emojiStyles.find(x=>x.key===styleKey);setSelect("emojiStyle",styleKey,style?.label||styleKey);updateEmojiUI(true);
  await prepareEmojiStyle(styleKey,sourcePreview);applyInstant();
}
async function prepareEmojiStyle(styleKey,sourcePreview){
  const option=els.emojiOptions.querySelector(`[data-value="${cssEscape(styleKey)}"]`);option?.classList.add("is-loading");const badge=option?.querySelector(".cache-badge");if(badge){badge.textContent=t("loading");badge.className="cache-badge busy";}
  try{const r=await chrome.runtime.sendMessage({type:"fontyar:prepare-emoji",styleKey});if(r?.ok){emojiCached[styleKey]=true;await ensureEmojiPreview(styleKey,sourcePreview||option?.querySelector(".emoji-option-preview"),true,true);}}
  catch{}
  option?.classList.remove("is-loading");renderEmojiOptions(els.emojiSearch.value);updateEmojiUI(true);
}

async function ensureEmojiPreview(styleKey,element,force=false,refresh=false){
  if(!element)return false;
  if(HEAVY_EMOJI.has(styleKey)&&!force&&!emojiCached[styleKey])return false;
  element.dataset.emojiPreviewKey=styleKey;
  element.classList.add("preview-loading");
  element.setAttribute("aria-busy","true");
  let promise=previewStylePromises.get(styleKey);
  if(!promise||refresh){
    promise=(async()=>{
      const r=await chrome.runtime.sendMessage({type:"fontyar:get-emoji-preview-css",styleKey});
      if(!r?.ok)return null;
      const id=`__fontyar_emoji_preview_${styleKey.replace(/[^a-z0-9_-]/gi,"_")}`;
      if(r.css&&!document.getElementById(id)){const style=document.createElement("style");style.id=id;style.textContent=r.css;document.head.append(style);}
      return r;
    })().catch(()=>null);
    previewStylePromises.set(styleKey,promise);
  }
  const r=await promise;if(!r){previewStylePromises.delete(styleKey);return false;}
  if(element.dataset.emojiPreviewKey!==styleKey)return false;
  if(r.css) emojiCached[styleKey]=true;
  const families=(r.stack?.length?r.stack:[r.family]).filter(Boolean);
  const stack=families.map(x=>`"${x}"`).join(",");
  for(const family of families.slice(0,3)){try{await document.fonts?.load?.(`20px "${family}"`,EMOJI_SAMPLE)}catch{}}
  try{await document.fonts?.ready}catch{}
  if(element.dataset.emojiPreviewKey!==styleKey)return false;
  if(r.css){
    const wanted=new Set(families.map(x=>String(x).replace(/["']/g,"").trim().toLowerCase()));
    const loaded=[...(document.fonts||[])].some(face=>wanted.has(String(face.family||"").replace(/["']/g,"").trim().toLowerCase())&&face.status==="loaded");
    if(!loaded){previewStylePromises.delete(styleKey);return false;}
  }
  element.style.fontFamily=`${stack},sans-serif`;
  element.textContent=EMOJI_SAMPLE;
  element.classList.remove("preview-loading");
  element.removeAttribute("aria-busy");
  crossfade(element);
  if(styleKey===config.emojiStyle){
    els.emojiTriggerPreview.dataset.emojiPreviewKey=styleKey;
    els.emojiTriggerPreview.style.fontFamily=`${stack},sans-serif`;
    els.emojiTriggerPreview.textContent=EMOJI_SAMPLE;
    els.emojiTriggerPreview.classList.remove("preview-loading");
    els.emojiTriggerPreview.removeAttribute("aria-busy");
    crossfade(els.emojiTriggerPreview);
  }
  return true;
}

function updateEmojiUI(animate){
  const style=emojiStyles.find(x=>x.key===config.emojiStyle)||emojiStyles[0];
  if(!style)return;
  setSelect("emojiStyle",style.key,style.label);
  els.emojiTriggerPreview.dataset.emojiPreviewKey=style.key;
  els.emojiTriggerPreview.classList.add("preview-loading");
  els.emojiTriggerPreview.setAttribute("aria-busy","true");
  els.emojiTriggerPreview.textContent=EMOJI_SAMPLE;
  const state=emojiState(style);els.emojiTriggerState.textContent=config.emojiEnabled?(emojiCached[style.key]?t("emojiReady"):state.label):t("emojiSelect");
  const total=emojiStyles.length,cached=emojiStyles.filter(s=>emojiCached[s.key]||["system-stack","system-local","hybrid"].includes(s.kind)).length;els.emojiCacheSummary.textContent=`${cached}/${total} ${t("cached")}`;
  if(catalogsReady)ensureEmojiPreview(style.key,els.emojiTriggerPreview,true);
  if(animate)crossfade(els.emojiTriggerState);
}

function applyInstant(persistNow=false){
  updatePreview();
  const snapshot=structuredCloneSafe(config);
  if(persistNow){
    pendingSaveSnapshot=null;clearTimeout(saveTimer);saveTimer=0;
    void persist(snapshot);
  }else queueSave();
  // While paused, editing settings should not wake the page runtime. Resuming explicitly applies
  // the accumulated settings in one shot.
  if(supported&&activeTab?.id&&!config.paused) void sendConfigInstant(snapshot);
}
let bridgePromise=null;
async function seedSmartDarkPrepaint(snapshot){
  if(!activeTab?.id||!snapshot?.smartDarkMode)return;
  const palette={bg:normalizeHexColor(snapshot.smartDarkBackgroundColor,DEFAULT_CONFIG.smartDarkBackgroundColor),fg:normalizeHexColor(snapshot.smartDarkTextColor,DEFAULT_CONFIG.smartDarkTextColor),accent:normalizeHexColor(snapshot.smartDarkAccentColor,DEFAULT_CONFIG.smartDarkAccentColor)};
  await chrome.scripting.executeScript({target:{tabId:activeTab.id},func:p=>{const r=document.documentElement;if(!r)return;r.style.setProperty("--persianyar-prepaint-bg",p.bg);r.style.setProperty("--persianyar-prepaint-fg",p.fg);r.style.setProperty("--persianyar-prepaint-accent",p.accent);},args:[palette],injectImmediately:true}).catch(()=>{});
}
async function sendConfigInstant(snapshot){
  const message={type:"fontyar:apply-config",host,config:snapshot};
  // Opening the popup must be side-effect free. First ask the existing page runtime to apply the
  // config. If it is already alive, content.js knows whether Smart Dark is actually transitioning
  // from off -> on and will show its loader only for that real transition. The old order injected
  // smart-dark-prepaint.js before this ping, so simply opening PersianYar could create a loader that
  // no code owned/removed when the config was unchanged.
  try{
    const pong=await chrome.tabs.sendMessage(activeTab.id,{type:"fontyar:runtime-ping"});
    if(pong?.ok){await chrome.tabs.sendMessage(activeTab.id,message);return true;}
  }catch{}
  // No runtime is listening (for example a tab that predates extension reload). Only this cold-start
  // path needs the prepaint shield while the heavier runtime is bridged into the page.
  if(snapshot.smartDarkMode){
    await seedSmartDarkPrepaint(snapshot);
    await chrome.scripting.insertCSS({target:{tabId:activeTab.id},files:["smart-dark-prepaint.css"]}).catch(()=>{});
    await chrome.scripting.executeScript({target:{tabId:activeTab.id},files:["smart-dark-prepaint.js"],injectImmediately:true}).catch(()=>{});
  }
  // Bootstrap may have completed while the prepaint files were being injected. Prefer it before
  // building a second bridge.
  try{await chrome.tabs.sendMessage(activeTab.id,message);return true;}catch{}
  try{
    if(!bridgePromise){
      bridgePromise=(async()=>{
        // Install the gated Smart Dark guard CSS before the JS bridge. The stylesheet is inert
        // until data-persianyar-smart-dark-prepaint=1 is present, so it is safe to leave injected.
        if(snapshot.smartDarkMode){
          await chrome.scripting.insertCSS({target:{tabId:activeTab.id},files:["smart-dark-prepaint.css"]}).catch(()=>{});
        }
        const files=["site-storage.js","vendor/darkreader-dynamic-core.js","vendor/smart-dark-css-engine.js"];
        // If Smart Dark is being enabled on a tab that did not have the runtime yet, establish the
        // pre-paint shield before loading the heavier runtime/catalogs. This removes the visible
        // light gap on the very first activation as well as on future registered navigations.
        if(snapshot.localizeEnabled)files.push("data/localization-fa.js","data/localization-fa-extra.js","data/localization-fa-ultra.js","data/localization-fa-mega.js","data/localization-fa-dynamic.js","data/localization-fa-x-complete.js","data/localization-fa-sites-2026.js","data/localization-fa-sites-wave2.js","data/localization-fa-patch-2026-09.js","data/localization-fa-quality-2026-09.js","data/localization-fa-x-2026-09-19.js","data/localization-fa-search-console-2026-09.js","data/localization-fa-platforms-2026-09-20.js","data/localization-fa-google-suite-2026-09-20.js","data/localization-fa-ai-suite-2026-09-20.js","data/localization-fa-ai-extended-v30.js","data/localization-fa-ai-extended-v31.js","data/localization-fa-pro-suite-v32.js","data/localization-fa-pro-suite-v33.js");
        if(snapshot.cursorEnabled)files.push("data/cursor-packs.js");
        files.push("content.js");
        // Instant bridge only needs the top frame. Child frames receive saved config through the
        // lightweight bootstrap/storage path, avoiding duplicate heavy payloads in iframe-heavy apps.
        await chrome.scripting.executeScript({target:{tabId:activeTab.id},files,injectImmediately:true});
        if(snapshot.localizeEnabled){
          await chrome.scripting.executeScript({target:{tabId:activeTab.id},world:"ISOLATED",func:()=>{globalThis.__PERSIANYAR_LOCALIZATION_RUNTIME_V1__=true;}}).catch(()=>{});
        }
      })().finally(()=>{setTimeout(()=>{bridgePromise=null;},500);});
    }
    await bridgePromise;
    await chrome.tabs.sendMessage(activeTab.id,message);
    return true;
  }catch{return false;}
}
function queueSave(){
  clearTimeout(saveTimer);
  pendingSaveSnapshot=structuredCloneSafe(config);
  // Coalesce rapid slider/stepper changes to stay comfortably below chrome.storage.sync write quotas.
  saveTimer=setTimeout(()=>{void flushPendingSave();},550);
}
async function flushPendingSave(){
  clearTimeout(saveTimer);saveTimer=0;
  const snapshot=pendingSaveSnapshot;pendingSaveSnapshot=null;
  if(!snapshot)return;
  await persist(snapshot);
}
async function persist(snapshot){if(!supported||!host)return;sites[host]=snapshot;await globalThis.__PERSIANYAR_SITE_STORE__?.saveHost?.(host,snapshot);}

async function setSitePaused(value){
  if(!supported||!host)return;
  config.paused=!!value;
  setSwitch(els.sitePaused,config.paused,false);
  els.pauseBadge?.classList.toggle("hidden",!config.paused);
  document.body.classList.toggle("site-paused",config.paused);
  pendingSaveSnapshot=null;clearTimeout(saveTimer);saveTimer=0;
  const snapshot=structuredCloneSafe(config);
  sites[host]=snapshot;
  await globalThis.__PERSIANYAR_SITE_STORE__?.saveHost?.(host,snapshot);
  if(activeTab?.id) await sendConfigInstant(snapshot);
  toast(config.paused?t("pauseDone"):t("resumeDone"));
}

function toggleAccordion(button){const id=button.dataset.accordion,panel=$(id);if(!panel)return;const open=!panel.classList.contains("open");button.setAttribute("aria-expanded",String(open));panel.classList.toggle("open",open);if(open)crossfade(panel.querySelector(".accordion-inner"));}



const tooltipWarmGroups=new WeakMap();
let tooltipTimer=0,tooltipTarget=null;
function setupFeatureTabs(initial){
  const valid=["text","localize","visual","motion"].includes(initial)?initial:"text";
  document.querySelectorAll(".feature-tab").forEach(btn=>btn.addEventListener("click",()=>setFeatureTab(btn.dataset.tab,true)));
  setFeatureTab(valid,false);requestAnimationFrame(updateTabIndicator);
  addEventListener("resize",()=>requestAnimationFrame(updateTabIndicator),{passive:true});
}
function setFeatureTab(tab,animate=true){
  activeFeatureTab=["text","localize","visual","motion"].includes(tab)?tab:"text";
  document.querySelectorAll(".feature-tab").forEach(btn=>{const on=btn.dataset.tab===activeFeatureTab;btn.classList.toggle("active",on);btn.setAttribute("aria-selected",String(on));});
  document.querySelectorAll("[data-tab-panel]").forEach(panel=>{const on=panel.dataset.tabPanel===activeFeatureTab;panel.classList.toggle("tab-panel-hidden",!on);if(on&&animate){panel.classList.remove("tab-panel-enter");void panel.offsetWidth;panel.classList.add("tab-panel-enter");}});
  requestAnimationFrame(()=>{updateTabIndicator();setupPopupScrollFades();});
  chrome.storage.local.set({persianyarUiTab:activeFeatureTab}).catch(()=>{});
  if(activeFeatureTab==="text"&&catalogsReady)warmTextPreviews();
  if(activeFeatureTab==="visual")warmCursorPackPreviews();
}
function updateTabIndicator(){
  const active=document.querySelector(".feature-tab.active"),bar=els.featureTabs,indicator=els.tabIndicator;if(!active||!bar||!indicator)return;
  const a=active.getBoundingClientRect(),b=bar.getBoundingClientRect();indicator.style.width=`${a.width}px`;indicator.style.transform=`translateX(${a.left-b.left}px)`;
}
function cursorApi(){return globalThis.__PERSIANYAR_CURSOR_PACKS__||null;}
function cursorCachedAsset(pack){
  const cached=pack?cursorCache?.[pack.key]:null;
  return cached?.version===cursorApi()?.version?cached:null;
}
function resizeCursorDataUrl(url,size){
  const px=clamp(size,16,96,32);if(!/^data:image\/svg\+xml/i.test(String(url||""))||px===32)return url;
  const key=`${px}|${url}`;if(cursorSizedUrlCache.has(key))return cursorSizedUrlCache.get(key);
  try{const comma=url.indexOf(",");if(comma<0)return url;let svg=decodeURIComponent(url.slice(comma+1));svg=svg.replace(/<svg\b([^>]*)>/i,(_,attrs)=>{const clean=String(attrs||"").replace(/\swidth\s*=\s*(["']).*?\1/gi,"").replace(/\sheight\s*=\s*(["']).*?\1/gi,"");return `<svg${clean} width="${px}" height="${px}">`;});const next=`data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;if(cursorSizedUrlCache.size>120)cursorSizedUrlCache.clear();cursorSizedUrlCache.set(key,next);return next;}catch{return url;}
}
function cursorCssValue(asset,state,fallback="auto",size=config.cursorSize){
  const raw=asset?.states?.[state] || (state==="default"?asset?.defaultUrl:state==="pointer"?asset?.pointerUrl:null);if(!raw)return fallback;const px=clamp(size,16,96,32),url=resizeCursorDataUrl(raw,px);const spot=asset?.hotspots?.[state] || (state==="default"?asset?.defaultHotspot:state==="pointer"?asset?.pointerHotspot:null) || [0,0],ratio=px/32;return `url("${url}") ${Math.round((Number(spot[0])||0)*ratio)} ${Math.round((Number(spot[1])||0)*ratio)}, ${fallback}`;
}
function cursorSearchText(pack){return `${pack.key} ${pack.name||""} ${pack.fa||""} ${pack.group||""} ${pack.source||""}`.toLocaleLowerCase("en");}
function bindCursorSheet(){
  if(!els.openCursorSheet||els.openCursorSheet.dataset.bound)return;
  els.openCursorSheet.dataset.bound="1";
  els.openCursorSheet.addEventListener("click",openCursorSheet);
  els.closeCursorSheet?.addEventListener("click",closeCursorSheet);
  els.cursorSheetBackdrop?.addEventListener("click",closeCursorSheet);
  els.cursorPackSearch?.addEventListener("input",()=>renderCursorPacks());
  renderCursorGroupFilters();
}
function openCursorSheet(){
  if(!els.cursorSheet)return;
  closeAllSelects();closeDrawer();hideUiTooltip();
  document.body.classList.add("cursor-sheet-open");
  els.cursorSheetBackdrop?.classList.add("show");els.cursorSheetBackdrop?.setAttribute("aria-hidden","false");
  els.cursorSheet.classList.add("open");els.cursorSheet.setAttribute("aria-hidden","false");
  renderCursorGroupFilters();renderCursorPacks();
  requestAnimationFrame(()=>{setupScrollFade(els.cursorPackScroll);if(els.cursorPackScroll)els.cursorPackScroll.scrollTop=0;});
}
function closeCursorSheet(){
  cursorPreviewObserver?.disconnect();cursorPreviewObserver=null;
  document.body.classList.remove("cursor-sheet-open");
  els.cursorSheetBackdrop?.classList.remove("show");els.cursorSheetBackdrop?.setAttribute("aria-hidden","true");
  els.cursorSheet?.classList.remove("open");els.cursorSheet?.setAttribute("aria-hidden","true");
}
function renderCursorGroupFilters(){
  const api=cursorApi();if(!api||!els.cursorGroupFilters)return;
  if(!api.groups?.some(g=>g.key===cursorSheetGroup))cursorSheetGroup="all";
  els.cursorGroupFilters.innerHTML=api.groups.map(group=>`<button class="cursor-group-filter" type="button" role="tab" aria-selected="${group.key===cursorSheetGroup}" data-cursor-group="${escapeAttr(group.key)}">${escapeHtml(group.fa||group.name)}</button>`).join("");
  els.cursorGroupFilters.querySelectorAll("[data-cursor-group]").forEach(btn=>btn.addEventListener("click",()=>{cursorSheetGroup=btn.dataset.cursorGroup||"all";renderCursorGroupFilters();renderCursorPacks();}));
}
function renderCursorPacks(){
  const api=cursorApi();if(!api||!els.cursorPackGrid)return;
  const q=(els.cursorPackSearch?.value||"").trim().toLocaleLowerCase("en");
  const visible=api.packs.filter(pack=>(cursorSheetGroup==="all"||pack.group===cursorSheetGroup)&&(!q||cursorSearchText(pack).includes(q)));
  els.cursorPackGrid.innerHTML=visible.map((pack,i)=>{
    const cached=cursorCachedAsset(pack),preview=cached?.defaultUrl||"",mode=cached?.mode||"";
    const real=Number(cached?.realStateCount||0),fallback=Number(cached?.fallbackStateCount||0);const status=mode==="full"?(fallback?`${real} اصلی · ${fallback} جایگزین`:"کش کامل"):mode==="preview"?"پیش نمایش کش":"نمایش هنگام اسکرول";
    const accent=pack.accentColor||pack.outlineColor||"#7aa2ff",body=pack.baseColor||"#222";
    const pointer=cached?.pointerUrl||"";
    return `<button class="cursor-pack" type="button" role="option" aria-selected="${pack.key===config.cursorPackKey}" data-cursor-key="${escapeAttr(pack.key)}" style="--i:${i};--cursor-accent:${escapeAttr(accent)};--cursor-body:${escapeAttr(body)}"><span class="cursor-pack-preview cursor-pack-preview-duo ${preview?"is-ready":"is-pending"}">${preview?`<img class="cursor-duo-default" alt="" src="${preview}"><img class="cursor-duo-pointer" alt="" src="${pointer||preview}">`:""}</span><span class="cursor-pack-copy"><b>${escapeHtml(pack.fa||pack.name)}</b><small>${escapeHtml(pack.source||"CDN")}</small><span class="cursor-pack-badge">${escapeHtml(status)}</span></span></button>`;
  }).join("");
  if(els.cursorPackEmpty)els.cursorPackEmpty.classList.toggle("hidden",visible.length>0);
  if(els.cursorSheetSubtitle)els.cursorSheetSubtitle.textContent=`${visible.length} از ${api.packs.length} قالب · پیش نمایش Lazy · کش محلی`;
  els.cursorPackGrid.querySelectorAll(".cursor-pack").forEach((btn,i)=>{
    btn.addEventListener("click",()=>selectCursorPack(btn.dataset.cursorKey,btn.querySelector("img")));
    if(!matchMedia("(prefers-reduced-motion: reduce)").matches&&i<12)btn.animate?.([{opacity:.55},{opacity:1}],{duration:100,delay:Math.min(i,8)*10,easing:"ease-out",fill:"backwards"});
  });
  observeVisibleCursorPacks();updateCursorPickerSummary();updateCursorCacheSummary();setupScrollFade(els.cursorPackScroll);
}
function observeVisibleCursorPacks(){
  cursorPreviewObserver?.disconnect();cursorPreviewObserver=null;
  const cards=[...(els.cursorPackGrid?.querySelectorAll?.(".cursor-pack")||[])].filter(card=>!cursorCachedAsset(cursorApi()?.get(card.dataset.cursorKey)));
  if(!cards.length)return;
  if(!("IntersectionObserver" in globalThis)){cards.slice(0,6).forEach(card=>ensureCursorPackPreview(card.dataset.cursorKey).then(()=>paintCursorCard(card)).catch(()=>{}));return;}
  cursorPreviewObserver=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;const card=entry.target;cursorPreviewObserver?.unobserve(card);ensureCursorPackPreview(card.dataset.cursorKey).then(()=>paintCursorCard(card)).catch(()=>paintCursorCard(card,true));}}, {root:els.cursorPackScroll||null,rootMargin:"90px 0px",threshold:.01});
  cards.forEach(card=>cursorPreviewObserver.observe(card));
}
function paintCursorCard(card,failed=false){
  if(!(card instanceof HTMLElement))return;
  const pack=cursorApi()?.get(card.dataset.cursorKey),asset=cursorCachedAsset(pack),preview=card.querySelector(".cursor-pack-preview"),badge=card.querySelector(".cursor-pack-badge");
  if(preview&&asset?.defaultUrl){preview.classList.remove("is-pending");preview.classList.add("is-ready","cursor-pack-preview-duo");preview.innerHTML=`<img class="cursor-duo-default" alt="" src="${asset.defaultUrl}"><img class="cursor-duo-pointer" alt="" src="${asset.pointerUrl||asset.defaultUrl}">`;}
  if(badge){const real=Number(asset?.realStateCount||0),fallbackCount=Number(asset?.fallbackStateCount||0);badge.textContent=asset?.mode==="full"?(fallbackCount?`${real} اصلی · ${fallbackCount} جایگزین`:"کش کامل"):asset?.mode==="preview"?"پیش نمایش کش":failed?"دریافت نشد":"نمایش هنگام اسکرول";}
  card.classList.toggle("is-fetching",false);
}
async function ensureCursorPackPreview(key){
  const api=cursorApi(),pack=api?.get(key);if(!api||!pack)return null;
  const hit=cursorCachedAsset(pack);if(hit)return hit;
  if(cursorPreviewInFlight.has(pack.key))return cursorPreviewInFlight.get(pack.key);
  const task=chrome.runtime.sendMessage({type:"fontyar:cache-cursor-preview",key:pack.key}).then(response=>{
    if(!response?.ok||!response.payload)throw new Error(response?.error||"Cursor preview cache failed");
    cursorCache={...cursorCache,[pack.key]:response.payload};
    updateCursorCacheSummary();if(pack.key===config.cursorPackKey){updateCursorPickerSummary();updateCursorPreview();}
    return response.payload;
  }).finally(()=>cursorPreviewInFlight.delete(pack.key));
  cursorPreviewInFlight.set(pack.key,task);return task;
}
async function selectCursorPack(key,sourcePreview=null){
  const api=cursorApi(),pack=api?.get(key);if(!pack)return;
  const btn=els.cursorPackGrid?.querySelector(`[data-cursor-key="${CSS.escape(pack.key)}"]`);
  if(btn?.classList.contains("is-fetching"))return;
  const epoch=++cursorSelectionEpoch;
  // Selection is immediate. CDN/cache work only upgrades fidelity and preview quality.
  config.cursorPackKey=pack.key;config.cursorEnabled=true;setSwitch(els.cursorEnabled,true,true);
  els.cursorPackGrid?.querySelectorAll(".cursor-pack").forEach(card=>card.setAttribute("aria-selected",String(card.dataset.cursorKey===pack.key)));
  updateCursorPickerSummary();updateCursorPreview(sourcePreview);applyInstant();
  btn?.classList.add("is-fetching");btn?.classList.remove("has-error");
  const badge=btn?.querySelector(".cursor-pack-badge");if(badge)badge.textContent="در حال آماده سازی…";
  try{
    const asset=await cacheCursorPack(pack.key);paintCursorCard(btn);
    if(epoch!==cursorSelectionEpoch)return;
    updateCursorPickerSummary();updateCursorPreview(sourcePreview);
    const real=Number(asset?.realStateCount||0),fallback=Number(asset?.fallbackStateCount||0);
    toast(fallback?`موس فعال شد · ${real} حالت اصلی + ${fallback} حالت سازگار`:`موس فعال شد و کش شد`);
  }catch(error){
    if(epoch===cursorSelectionEpoch){btn?.classList.add("has-error");if(badge)badge.textContent="حالت آفلاین فعال";toast("موس فعال است؛ دریافت پک اصلی ناموفق بود");}
    console.warn("[PersianYar] cursor pack",error);
  }finally{btn?.classList.remove("is-fetching");}
}

async function cacheCursorPack(key){
  const api=cursorApi(),pack=api?.get(key);if(!api||!pack)return null;
  const hit=cursorCachedAsset(pack);if(hit?.mode==="full"&&api.stateKeys.every(state=>hit.states?.[state]))return hit;
  const response=await chrome.runtime.sendMessage({type:"fontyar:cache-cursor-pack",key:pack.key}).catch(()=>null);
  if(!response?.ok||!response.payload)throw new Error(response?.error||"Cursor pack cache failed");
  cursorCache={...cursorCache,[pack.key]:response.payload};updateCursorCacheSummary();
  return response.payload;
}
function changeCursorSize(delta){config.cursorSize=clamp(Number(config.cursorSize||32)+delta,16,96,32);updateCursorControls();updateCursorPreview();applyInstant();}
function setCursorMotionPreset(preset){const map={precise:10,smooth:35,float:70};if(!(preset in map))return;config.cursorMotionPreset=preset;config.cursorSmoothness=map[preset];updateCursorControls();updateCursorPreview();applyInstant();}
function syncCursorMotionPresetFromSmoothness(){const v=Number(config.cursorSmoothness||0);config.cursorMotionPreset=v<=18?"precise":v>=58?"float":"smooth";}
function updateCursorControls(){
  if(els.cursorSizeValue)els.cursorSizeValue.textContent=`${Math.round(config.cursorSize)}px`;if(els.cursorSizeMinus)els.cursorSizeMinus.disabled=config.cursorSize<=16;if(els.cursorSizePlus)els.cursorSizePlus.disabled=config.cursorSize>=96;
  if(els.cursorSmoothness){els.cursorSmoothness.value=String(Math.round(config.cursorSmoothness));els.cursorSmoothness.disabled=!config.cursorMotionEnabled;}if(els.cursorSmoothnessValue)els.cursorSmoothnessValue.textContent=`${Math.round(config.cursorSmoothness)}%`;
  if(els.cursorTrailLength){els.cursorTrailLength.value=String(Math.round(config.cursorTrailLength));els.cursorTrailLength.disabled=!config.cursorMotionEnabled||!config.cursorTrailEnabled;}if(els.cursorTrailLengthValue)els.cursorTrailLengthValue.textContent=String(Math.round(config.cursorTrailLength));
  els.cursorMotionPanel?.classList.toggle("is-open",!!config.cursorMotionEnabled);document.querySelectorAll("[data-cursor-motion-preset]").forEach(btn=>btn.setAttribute("aria-checked",String(btn.dataset.cursorMotionPreset===config.cursorMotionPreset)));
}
function previewStateForTarget(target){const demo=target?.closest?.("[data-cursor-demo]");if(demo)return demo.dataset.cursorDemo||"default";if(target?.closest?.("button,a,[role=button]"))return "pointer";return "default";}
function setupCursorLivePreview(){
  const stage=els.cursorPreviewStage;if(!stage||stage.dataset.liveBound)return;stage.dataset.liveBound="1";
  const move=e=>{if(!config.cursorMotionEnabled||!els.cursorLivePreview)return;const r=stage.getBoundingClientRect();cursorPreviewAnim.targetX=e.clientX-r.left;cursorPreviewAnim.targetY=e.clientY-r.top;if(!cursorPreviewAnim.visible){cursorPreviewAnim.x=cursorPreviewAnim.targetX;cursorPreviewAnim.y=cursorPreviewAnim.targetY;}cursorPreviewAnim.visible=true;const state=previewStateForTarget(e.target);if(state!==cursorPreviewAnim.state){cursorPreviewAnim.state=state;paintLiveCursorState(state);}if(!cursorPreviewAnim.raf){cursorPreviewAnim.last=performance.now();cursorPreviewAnim.raf=requestAnimationFrame(stepCursorPreview);}};
  stage.addEventListener("pointermove",move,{passive:true});stage.addEventListener("pointerenter",move,{passive:true});stage.addEventListener("pointerleave",()=>{cursorPreviewAnim.visible=false;if(els.cursorLivePreview)els.cursorLivePreview.style.opacity="0";cursorPreviewTrails.forEach(el=>el.style.opacity="0");},{passive:true});stage.addEventListener("pointerdown",e=>{cursorPreviewAnim.pressed=true;move(e);if(config.cursorClickEffectEnabled&&!matchMedia("(prefers-reduced-motion: reduce)").matches)spawnCursorPreviewPulse(e);},{passive:true});stage.addEventListener("pointerup",e=>{cursorPreviewAnim.pressed=false;move(e);},{passive:true});stage.addEventListener("pointercancel",e=>{cursorPreviewAnim.pressed=false;move(e);},{passive:true});
}
function rebuildCursorPreviewTrails(){const stage=els.cursorPreviewStage,img=els.cursorLivePreview;if(!stage||!img)return;cursorPreviewTrails.forEach(el=>el.remove());cursorPreviewTrails=[];if(!config.cursorMotionEnabled||!config.cursorTrailEnabled||matchMedia("(prefers-reduced-motion: reduce)").matches)return;const count=clamp(config.cursorTrailLength,1,6,3);for(let i=0;i<count;i++){const trail=document.createElement("img");trail.alt="";trail.className="cursor-live-preview cursor-live-trail";trail.setAttribute("aria-hidden","true");trail.style.opacity="0";trail.dataset.x=String(cursorPreviewAnim.x);trail.dataset.y=String(cursorPreviewAnim.y);stage.insertBefore(trail,img);cursorPreviewTrails.push(trail);}paintLiveCursorState(cursorPreviewAnim.state||"default");}
function spawnCursorPreviewPulse(event){const stage=els.cursorPreviewStage;if(!stage)return;const r=stage.getBoundingClientRect(),ring=document.createElement("span");ring.className="cursor-preview-click-pulse";ring.style.left=`${event.clientX-r.left}px`;ring.style.top=`${event.clientY-r.top}px`;stage.append(ring);try{const a=ring.animate([{transform:"translate(-50%,-50%) scale(.35)",opacity:.75},{transform:"translate(-50%,-50%) scale(1.7)",opacity:0}],{duration:320,easing:"cubic-bezier(.2,.8,.2,1)"});a.onfinish=()=>ring.remove();}catch{setTimeout(()=>ring.remove(),340);}}
function paintLiveCursorState(stateName="default"){const pack=cursorApi()?.get(config.cursorPackKey),asset=cursorCachedAsset(pack),img=els.cursorLivePreview;if(!asset||!img)return;const url=asset?.states?.[stateName]||asset.defaultUrl;img.src=url||"";cursorPreviewTrails.forEach(trail=>{trail.src=url||"";trail.style.width=`${config.cursorSize}px`;trail.style.height=`${config.cursorSize}px`;});const spot=asset?.hotspots?.[stateName]||asset.defaultHotspot||[0,0],ratio=config.cursorSize/32;img.dataset.hotX=String((Number(spot[0])||0)*ratio);img.dataset.hotY=String((Number(spot[1])||0)*ratio);img.style.width=`${config.cursorSize}px`;img.style.height=`${config.cursorSize}px`;}
function stepCursorPreview(now){
  cursorPreviewAnim.raf=0;const img=els.cursorLivePreview;if(!img||!config.cursorMotionEnabled||!cursorPreviewAnim.visible)return;
  const dt=Math.min(34,Math.max(1,now-(cursorPreviewAnim.last||now)));cursorPreviewAnim.last=now;
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches,softness=clamp(config.cursorSmoothness,0,100,35)/100,base=reduced?1:(.78-softness*.64);let alpha=reduced?1:1-Math.pow(1-base,dt/16.667);
  const dx=cursorPreviewAnim.targetX-cursorPreviewAnim.x,dy=cursorPreviewAnim.targetY-cursorPreviewAnim.y,dist=Math.hypot(dx,dy);if(!reduced){if(dist>120)alpha=Math.max(alpha,.88);else if(dist>70)alpha=Math.max(alpha,.7);else if(dist>40)alpha=Math.max(alpha,.55);}
  cursorPreviewAnim.x+=dx*alpha;cursorPreviewAnim.y+=dy*alpha;const hx=Number(img.dataset.hotX||0),hy=Number(img.dataset.hotY||0),interactive=["pointer","grab","grabbing"].includes(cursorPreviewAnim.state),scale=cursorPreviewAnim.pressed?.92:(config.cursorHoverScaleEnabled&&interactive?1.12:1);img.style.opacity="1";img.style.transformOrigin=`${hx}px ${hy}px`;img.style.transform=`translate3d(${cursorPreviewAnim.x-hx}px,${cursorPreviewAnim.y-hy}px,0) scale(${scale})`;
  let leadX=cursorPreviewAnim.x,leadY=cursorPreviewAnim.y,unsettled=Math.abs(dx)>.08||Math.abs(dy)>.08;cursorPreviewTrails.forEach((trail,i)=>{const px=Number(trail.dataset.x||leadX),py=Number(trail.dataset.y||leadY),lag=Math.max(.08,alpha*(.62/(i+1))),tdx=leadX-px,tdy=leadY-py,x=px+tdx*lag,y=py+tdy*lag;trail.dataset.x=String(x);trail.dataset.y=String(y);trail.style.opacity=String(Math.max(.04,.17-i*.025));trail.style.transformOrigin=`${hx}px ${hy}px`;trail.style.transform=`translate3d(${x-hx}px,${y-hy}px,0) scale(${Math.max(.74,scale-i*.04)})`;if(Math.abs(tdx)>.08||Math.abs(tdy)>.08)unsettled=true;leadX=x;leadY=y;});if(unsettled)cursorPreviewAnim.raf=requestAnimationFrame(stepCursorPreview);
}
function warmCursorPackPreviews(){
  const pack=cursorApi()?.get(config.cursorPackKey);if(!pack)return;
  ensureCursorPackPreview(pack.key).then(()=>{updateCursorPickerSummary();updateCursorPreview();}).catch(()=>{});
}
function updateCursorCacheSummary(){
  const api=cursorApi(),items=Object.values(cursorCache).filter(x=>x?.version===api?.version),full=items.filter(x=>x?.mode==="full").length,preview=items.length-full;
  if(els.cursorCacheSummary)els.cursorCacheSummary.textContent=`${api?.packs?.length||0} قالب · ${full} کش کامل${preview?` · ${preview} پیش نمایش`:""}`;
}
function updateCursorPickerSummary(){
  const pack=cursorApi()?.get(config.cursorPackKey);if(!pack)return;const asset=cursorCachedAsset(pack),icon=els.cursorSelectedIcon;if(els.cursorSelectedName)els.cursorSelectedName.textContent=pack.fa||pack.name;if(els.cursorSelectedMeta)els.cursorSelectedMeta.textContent=`${pack.source||"CDN"} · ${config.cursorSize}px${config.cursorMotionEnabled?" · حرکت زنده":""}${asset?.mode==="full"?" · آفلاین":""}`;if(icon){if(asset?.defaultUrl){icon.src=asset.defaultUrl;icon.classList.remove("pending");icon.style.width=`${Math.min(36,Math.max(22,config.cursorSize*.7))}px`;icon.style.height=`${Math.min(36,Math.max(22,config.cursorSize*.7))}px`;}else{icon.removeAttribute("src");icon.classList.add("pending");icon.parentElement?.style.setProperty("--cursor-body",pack.baseColor||"#222");icon.parentElement?.style.setProperty("--cursor-accent",pack.accentColor||pack.outlineColor||"#fff");}}updateCursorCacheSummary();
}
function updateCursorPreview(sourcePreview=null){
  const pack=cursorApi()?.get(config.cursorPackKey);if(!pack||!els.cursorPreviewStage)return;const asset=cursorCachedAsset(pack);updateCursorPickerSummary();updateCursorControls();setupCursorLivePreview();rebuildCursorPreviewTrails();
  if(!asset){els.cursorPreviewStage.classList.remove("motion-preview","cursor-preview-glow");els.cursorPreviewStage.style.cursor="auto";if(els.cursorPreviewButton)els.cursorPreviewButton.style.cursor="pointer";if(els.cursorPreviewIcon){els.cursorPreviewIcon.removeAttribute("src");els.cursorPreviewIcon.classList.add("pending");}document.querySelectorAll("[data-cursor-demo]").forEach(el=>el.style.cursor="");return;}
  const motion=!!config.cursorMotionEnabled;els.cursorPreviewStage.classList.toggle("motion-preview",motion);els.cursorPreviewStage.classList.toggle("cursor-preview-glow",motion&&!!config.cursorGlowEnabled);els.cursorPreviewStage.style.cursor=motion?"none":cursorCssValue(asset,"default","auto",config.cursorSize);if(els.cursorPreviewButton)els.cursorPreviewButton.style.cursor=motion?"none":cursorCssValue(asset,"pointer","pointer",config.cursorSize);document.querySelectorAll("[data-cursor-demo]").forEach(el=>{const stateName=el.dataset.cursorDemo;const fallbacks={text:"text",move:"move",ewResize:"ew-resize",wait:"wait"};el.style.cursor=motion?"none":cursorCssValue(asset,stateName,fallbacks[stateName]||"auto",config.cursorSize);});
  const dest=els.cursorPreviewIcon;if(dest){dest.classList.remove("pending");dest.src=asset.defaultUrl;dest.style.width=`${Math.min(44,Math.max(24,config.cursorSize*.72))}px`;dest.style.height=`${Math.min(44,Math.max(24,config.cursorSize*.72))}px`;paintLiveCursorState(cursorPreviewAnim.state||"default");if(sourcePreview instanceof HTMLElement&&!matchMedia("(prefers-reduced-motion: reduce)").matches&&typeof dest.animate==="function")requestAnimationFrame(()=>{const a=sourcePreview.getBoundingClientRect(),b=dest.getBoundingClientRect();if(!a.width||!a.height||!b.width||!b.height)return;const x=a.left-b.left,y=a.top-b.top,sx=Math.max(.55,Math.min(1.7,a.width/b.width)),sy=Math.max(.55,Math.min(1.7,a.height/b.height));try{dest.animate([{transform:`translate(${x}px,${y}px) scale(${sx},${sy})`,opacity:.28},{transform:"none",opacity:1}],{duration:190,easing:"cubic-bezier(.2,.8,.2,1)"});}catch{}});}
}
function setupPopupTooltips(){
  document.querySelectorAll("[title]").forEach(el=>{if(!el.dataset.tooltip)el.dataset.tooltip=el.getAttribute("title")||"";el.removeAttribute("title");});
  document.addEventListener("pointerover",e=>{const target=e.target.closest?.("[data-tooltip]");if(!target||target.closest?.(".feature-tab")||!target.dataset.tooltip)return;const group=target.closest(".section-title,.motion-custom-grid,.drawer-section,.cursor-pack-grid")||target.parentElement;const fast=(tooltipWarmGroups.get(group)||0)>performance.now();scheduleTooltip(target,group,fast?35:360);});
  document.addEventListener("pointerout",e=>{if(!tooltipTarget)return;const rel=e.relatedTarget;if(rel instanceof Node&&tooltipTarget.contains(rel))return;hideUiTooltip();});
}
function scheduleTooltip(target,group,delay){clearTimeout(tooltipTimer);tooltipTarget=target;tooltipTimer=setTimeout(()=>{if(!target.isConnected||tooltipTarget!==target)return;showUiTooltip(target,target.dataset.tooltip);tooltipWarmGroups.set(group,performance.now()+2400);},delay);}
function showUiTooltip(target,text){const tip=els.uiTooltip;if(!tip)return;tip.textContent=text;tip.classList.add("show");tip.setAttribute("aria-hidden","false");requestAnimationFrame(()=>{const r=target.getBoundingClientRect(),tr=tip.getBoundingClientRect();let left=Math.max(8,Math.min(innerWidth-tr.width-8,r.left+r.width/2-tr.width/2)),top=r.top-tr.height-7;if(top<8)top=Math.min(innerHeight-tr.height-8,r.bottom+7);tip.style.left=`${left}px`;tip.style.top=`${top}px`;tip.style.transformOrigin=`${Math.max(8,Math.min(tr.width-8,r.left+r.width/2-left))}px ${top<r.top?tr.height:0}px`;});}
function hideUiTooltip(){clearTimeout(tooltipTimer);tooltipTimer=0;tooltipTarget=null;els.uiTooltip?.classList.remove("show");els.uiTooltip?.setAttribute("aria-hidden","true");}
function setupPopupScrollFades(){document.querySelectorAll(".shell,.sheet-scroll,.guide-list,.drawer,.cursor-pack-scroll").forEach(setupScrollFade);}
function setupScrollFade(el){if(!(el instanceof HTMLElement))return;if(!el.dataset.fadeBound){el.dataset.fadeBound="1";el.addEventListener("scroll",()=>updateScrollFade(el),{passive:true});}requestAnimationFrame(()=>updateScrollFade(el));}
function updateScrollFade(el){const max=el.scrollHeight-el.clientHeight;if(max<8){el.removeAttribute("data-scroll-fade");return}const start=el.scrollTop>4,end=el.scrollTop<max-4;el.dataset.scrollFade=start&&end?"both":start?"start":end?"end":"";}
function setupPopupMotion(){
  document.addEventListener("pointerdown",e=>{const btn=e.target.closest?.("button");if(!btn||matchMedia("(prefers-reduced-motion: reduce)").matches)return;btn.classList.remove("popup-rubber");void btn.offsetWidth;btn.classList.add("popup-rubber");setTimeout(()=>btn.classList.remove("popup-rubber"),240);});
  document.addEventListener("click",e=>{const btn=e.target.closest?.("button");const icon=btn?.querySelector?.("svg");if(!icon)return;icon.classList.remove("icon-crossfade");void icon.offsetWidth;icon.classList.add("icon-crossfade");setTimeout(()=>icon.classList.remove("icon-crossfade"),180);});
}

const SITE_CATEGORY_I18N={ai:"siteCategoryAI",music:"siteCategoryMusic",video:"siteCategoryVideo",social:"siteCategorySocial",developer:"siteCategoryDeveloper",productivity:"siteCategoryProductivity",commerce:"siteCategoryCommerce",education:"siteCategoryEducation",design:"siteCategoryDesign",creator:"siteCategoryCreator",communication:"siteCategoryCommunication",other:"siteCategoryOther"};
function localizationCatalog(){
  const api=globalThis.__PERSIANYAR_LOCALIZATION_CATALOG__||{};
  return (Array.isArray(api.sites)?api.sites:[]).map(m=>({domain:m.domain,name:m.name||m.domain,category:m.category||"other",aliases:Array.isArray(m.aliases)?m.aliases:[],phrases:Number(m.phrases||0)})).sort((a,b)=>String(a.name).localeCompare(String(b.name),uiLanguage,{sensitivity:"base"}));
}
function updateLocalizationGuideStats(){
  const api=globalThis.__PERSIANYAR_LOCALIZATION_CATALOG__||{}; const sites=Number(api.supportedSiteCount||api.sites?.length||0); const phrases=Number(api.count||0);
  if(els.supportedSiteCount)els.supportedSiteCount.textContent=String(sites); if(els.supportedSiteCountInline)els.supportedSiteCountInline.textContent=String(sites); if(els.supportedPhraseCount)els.supportedPhraseCount.textContent=String(phrases);
}
function categoryLabel(category){return t(SITE_CATEGORY_I18N[category]||"siteCategoryOther");}
function renderLocalizationGuide(query=""){
  const q=normalizeSearch(query); const all=localizationCatalog();
  const filtered=q?all.filter(site=>normalizeSearch([site.name,site.domain,site.category,categoryLabel(site.category),...(site.aliases||[])].join(" ")).includes(q)):all;
  els.supportedSiteResultCount.textContent=String(filtered.length); els.supportedSiteEmpty.classList.toggle("hidden",filtered.length>0);
  els.supportedSiteList.innerHTML=filtered.map((site,i)=>`<div class="guide-site" role="listitem" style="--i:${Math.min(i,8)}"><div class="guide-site-main"><div class="guide-site-title"><b>${escapeHtml(site.name)}</b><em>${escapeHtml(categoryLabel(site.category))}</em></div><div class="guide-site-domain">${escapeHtml(site.domain)}</div></div><div class="guide-site-count"><b>${site.phrases}</b><small>${escapeHtml(t("sitePhraseLabel"))}</small></div></div>`).join("");
}
function bindLocalizationGuide(){
  const open=()=>openLocalizationGuide(); els.localizationGuideButton?.addEventListener("click",open); els.localizationGuideTextButton?.addEventListener("click",open); els.closeLocalizationGuide?.addEventListener("click",closeLocalizationGuide); els.localizationGuideBackdrop?.addEventListener("click",closeLocalizationGuide);
  els.supportedSiteSearch?.addEventListener("input",()=>renderLocalizationGuide(els.supportedSiteSearch.value));
}
function openLocalizationGuide(){
  closeAllSelects();closeDrawer();updateLocalizationGuideStats();renderLocalizationGuide(els.supportedSiteSearch?.value||"");document.body.classList.add("guide-open");els.localizationGuideBackdrop?.classList.add("show");els.localizationGuideBackdrop?.setAttribute("aria-hidden","false");els.localizationGuideModal?.classList.add("open");els.localizationGuideModal?.setAttribute("aria-hidden","false");requestAnimationFrame(()=>els.supportedSiteSearch?.focus({preventScroll:true}));
}
function closeLocalizationGuide(){
  if(!els.motionGuideModal?.classList.contains("open"))document.body.classList.remove("guide-open");els.localizationGuideBackdrop?.classList.remove("show");els.localizationGuideBackdrop?.setAttribute("aria-hidden","true");els.localizationGuideModal?.classList.remove("open");els.localizationGuideModal?.setAttribute("aria-hidden","true");
}

function bindMotionCustomize(){
  els.motionCustomizeToggle?.addEventListener("click",()=>{const open=els.motionCustomizeToggle.getAttribute("aria-expanded")!=="true";els.motionCustomizeToggle.setAttribute("aria-expanded",String(open));els.motionCustomizePanel?.classList.toggle("open",open);});
}
function bindMotionGuide(){
  els.motionGuideButton?.addEventListener("click",openMotionGuide);els.closeMotionGuide?.addEventListener("click",closeMotionGuide);els.motionGuideBackdrop?.addEventListener("click",closeMotionGuide);
}
function openMotionGuide(){closeAllSelects();closeDrawer();closeLocalizationGuide();document.body.classList.add("guide-open");els.motionGuideBackdrop?.classList.add("show");els.motionGuideBackdrop?.setAttribute("aria-hidden","false");els.motionGuideModal?.classList.add("open");els.motionGuideModal?.setAttribute("aria-hidden","false");}
function closeMotionGuide(){els.motionGuideBackdrop?.classList.remove("show");els.motionGuideBackdrop?.setAttribute("aria-hidden","true");els.motionGuideModal?.classList.remove("open");els.motionGuideModal?.setAttribute("aria-hidden","true");if(!els.localizationGuideModal?.classList.contains("open"))document.body.classList.remove("guide-open");}

function bindDrawer(){
  els.menuButton.addEventListener("click",openDrawer);els.closeDrawer.addEventListener("click",closeDrawer);els.drawerBackdrop.addEventListener("click",closeDrawer);
}
function openDrawer(){closeAllSelects();els.drawer.classList.add("open");els.drawerBackdrop.classList.add("show");els.drawer.setAttribute("aria-hidden","false");els.menuButton.setAttribute("aria-expanded","true");document.body.classList.add("drawer-open");}
function closeDrawer(){els.drawer.classList.remove("open");els.drawerBackdrop.classList.remove("show");els.drawer.setAttribute("aria-hidden","true");els.menuButton.setAttribute("aria-expanded","false");document.body.classList.remove("drawer-open");}

function bindTheme(){els.themeSwitcher.addEventListener("click",async e=>{const b=e.target.closest("[data-theme-value]");if(!b)return;uiTheme=validTheme(b.dataset.themeValue);applyTheme(uiTheme,true);await chrome.storage.sync.set({uiTheme});});}
function applyTheme(value,animate){
  const next=validTheme(value);
  const root=document.documentElement;
  const commit=()=>{root.dataset.theme=next;els.themeSwitcher.querySelectorAll("[data-theme-value]").forEach(b=>b.classList.toggle("active",b.dataset.themeValue===next));};
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(!animate||reduce){commit();return;}
  // Only paint properties transition. Avoid whole-document View Transition snapshots because a
  // Chrome action popup can briefly re-measure while the snapshot is being swapped.
  root.classList.add("theme-transitioning");
  requestAnimationFrame(()=>{commit();requestAnimationFrame(()=>setTimeout(()=>root.classList.remove("theme-transitioning"),300));});
}
function validTheme(v){return ["system","light","dark"].includes(v)?v:"system";}

function bindLocale(){els.uiLanguage.addEventListener("click",async e=>{const b=e.target.closest("[data-locale]");if(!b)return;uiLanguage=validLocale(b.dataset.locale);applyLocale(uiLanguage,true);await chrome.storage.sync.set({uiLanguage});});}
function applyLocale(locale,animate){
  uiLanguage=validLocale(locale);document.documentElement.lang=uiLanguage;document.documentElement.dir=["fa","ar"].includes(uiLanguage)?"rtl":"ltr";
  document.querySelectorAll("[data-i18n]").forEach(el=>{const key=el.dataset.i18n;if(I18N[uiLanguage]?.[key])el.textContent=I18N[uiLanguage][key];});
  els.uiLanguage.querySelectorAll("[data-locale]").forEach(b=>b.classList.toggle("active",b.dataset.locale===uiLanguage));
  if(!supported) els.siteLabel.textContent=t("siteUnavailable");
  if(supported){
    if(els.supportedSiteSearch)els.supportedSiteSearch.placeholder=t("supportedSitesSearch");
    updateLocalizationGuideStats();
    if(els.localizationGuideModal?.classList.contains("open"))renderLocalizationGuide(els.supportedSiteSearch?.value||"");
    buildStaticSelects();
    hydrateControls();
  }
  if(animate)crossfade(els.shell);
}
function validLocale(v){return ["fa","en","ar","zh"].includes(v)?v:"fa";}
function t(key){return I18N[uiLanguage]?.[key] || I18N.fa[key] || key;}

function bindUiSize(){els.uiSizeMinus.addEventListener("click",()=>setUiFontSize(uiFontSize-1));els.uiSizePlus.addEventListener("click",()=>setUiFontSize(uiFontSize+1));}
async function setUiFontSize(value){uiFontSize=clamp(value,11,18,13);applyUiFontSize(uiFontSize,true);await chrome.storage.sync.set({uiFontSize});}
function applyUiFontSize(value,animate){uiFontSize=clamp(value,11,18,13);document.documentElement.style.setProperty("--ui-font-size",`${uiFontSize}px`);els.uiSizeValue.textContent=`${uiFontSize}px`;els.uiSizeMinus.disabled=uiFontSize<=11;els.uiSizePlus.disabled=uiFontSize>=18;if(animate)crossfade(els.shell);}

async function resetSite(){
  if(!host)return;
  clearTimeout(saveTimer);
  saveTimer=0;
  pendingSaveSnapshot=null;
  delete sites[host];
  config=structuredCloneSafe(DEFAULT_CONFIG);
  await globalThis.__PERSIANYAR_SITE_STORE__?.removeHost?.(host);
  hydrateControls();
  // Apply defaults to the live tab without writing the just-deleted entry back.
  if(supported && activeTab?.id){
    await sendConfigInstant(structuredCloneSafe(config));
  }
  toast(t("resetDone"));
}

function findSiteConfig(currentHost,allSites){if(!currentHost)return{config:null};if(allSites[currentHost])return{config:allSites[currentHost]};let best="",value=null;for(const [candidate,c] of Object.entries(allSites)){if(c?.includeSubdomains&&(currentHost===candidate||currentHost.endsWith(`.${candidate}`))&&candidate.length>best.length){best=candidate;value=c;}}return{config:value};}
function parseSupportedUrl(url){try{const u=new URL(url);return{supported:["http:","https:"].includes(u.protocol),host:u.hostname.toLowerCase()};}catch{return{supported:false,host:""};}}
function fontLabel(font){if(!font)return"";return uiLanguage==="fa"?(FONT_LABELS_FA[font.key]||font.family):font.family;}
function sanitizeWeight(v,f){const n=parseInt(v,10);return Number.isFinite(n)?String(Math.min(900,Math.max(100,Math.round(n/100)*100))):f;}
function normalizeHexColor(value,fallback="#181a1b"){const v=String(value||"").trim().toLowerCase();if(/^#[0-9a-f]{6}$/.test(v))return v;if(/^#[0-9a-f]{3}$/.test(v))return `#${v.slice(1).split("").map(c=>c+c).join("")}`;return String(fallback||"#181a1b").toLowerCase();}
function clamp(v,min,max,fallback){const n=Number(v);return Number.isFinite(n)?Math.min(max,Math.max(min,n)):fallback;}
function normalizeSearch(v){return String(v||"").toLocaleLowerCase().replace(/\s+/g," ").trim();}
function crossfade(el){if(!el)return;el.classList.remove("crossfade");void el.offsetWidth;el.classList.add("crossfade");setTimeout(()=>el.classList.remove("crossfade"),260);}
function toast(text){els.toast.textContent=text;els.toast.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(()=>els.toast.classList.remove("show"),1300);}
function cssEscape(v){return globalThis.CSS?.escape?CSS.escape(v):String(v).replace(/[^a-z0-9_-]/gi,"\\$&");}
function escapeHtml(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function escapeAttr(v){return escapeHtml(v);}
function structuredCloneSafe(v){try{return structuredClone(v);}catch{return JSON.parse(JSON.stringify(v));}}
