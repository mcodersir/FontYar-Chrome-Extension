(() => {
  const prev = globalThis.__FONTYAR_LOCALIZATION_FA__;
  if (!prev) return;
  const normalize = prev.normalize || (v => String(v || "").replace(/[\u00A0\u202F]/g, " ").replace(/\s+/g, " ").trim().replace(/[：:]$/, "").toLocaleLowerCase("en-US"));
  const packs = Object.assign({}, prev.packs || {});
  let added = 0;
  const merge = (domain, entries) => {
    const pack = Object.assign({}, packs[domain] || {});
    for (const [source, target] of Object.entries(entries)) {
      const key = normalize(source);
      if (!Object.prototype.hasOwnProperty.call(pack, key)) added++;
      pack[key] = target;
    }
    packs[domain] = pack;
  };

  merge("studio.youtube.com", {
    "Analytics":"آمار",
    "Ask Studio":"از استودیو بپرس",
    "Ask Studio anything":"هر چیزی از استودیو بپرس",
    "Catch me up on this video":"خلاصه وضعیت این ویدیو را بگو",
    "Catch me up":"خلاصه وضعیت را بگو",
    "Channel analytics":"آمار کانال",
    "Video analytics":"آمار ویدیو",
    "See video analytics":"مشاهده آمار ویدیو",
    "Advanced mode":"حالت پیشرفته",
    "Overview":"نمای کلی",
    "Reach":"دسترسی",
    "Engagement":"تعامل",
    "Audience":"مخاطبان",
    "Revenue":"درآمد",
    "Research":"پژوهش",
    "Trends":"روندها",
    "Content":"محتوا",
    "Inspiration":"ایده ها",
    "Community":"انجمن",
    "Subtitles":"زیرنویس ها",
    "Copyright":"حق نشر",
    "Earn":"درآمدزایی",
    "Customization":"شخصی سازی",
    "Audio library":"کتابخانه صوتی",
    "Settings":"تنظیمات",
    "Send feedback":"ارسال بازخورد",
    "Feedback":"بازخورد",
    "Dashboard":"داشبورد",
    "Channel content":"محتوای کانال",
    "Videos":"ویدیوها",
    "Shorts":"شورت ها",
    "Live":"پخش زنده",
    "Posts":"پست ها",
    "Playlists":"فهرست های پخش",
    "Podcasts":"پادکست ها",
    "Visibility":"نمایانی",
    "Restrictions":"محدودیت ها",
    "Date":"تاریخ",
    "Views":"بازدیدها",
    "Comments":"نظرها",
    "Likes (vs. dislikes)":"پسندها (در برابر نپسندها)",
    "Published":"منتشرشده",
    "Scheduled":"زمان بندی شده",
    "Draft":"پیش نویس",
    "Public":"عمومی",
    "Private":"خصوصی",
    "Unlisted":"فهرست نشده",
    "Checks":"بررسی ها",
    "Processing":"در حال پردازش",
    "Monetization":"درآمدزایی",
    "Video details":"جزئیات ویدیو",
    "Details":"جزئیات",
    "Editor":"ویرایشگر",
    "Comments & ratings":"نظرها و امتیازها",
    "Show more":"نمایش بیشتر",
    "Show less":"نمایش کمتر",
    "Save":"ذخیره",
    "Discard changes":"لغو تغییرات",
    "Undo changes":"برگرداندن تغییرات",
    "Thumbnail":"تصویر بندانگشتی",
    "Title":"عنوان",
    "Description":"توضیحات",
    "Playlist":"فهرست پخش",
    "Audience":"مخاطب",
    "Made for kids":"ساخته شده برای کودکان",
    "Not made for kids":"برای کودکان ساخته نشده",
    "Paid promotion":"تبلیغ پولی",
    "Altered content":"محتوای تغییر یافته",
    "Automatic chapters":"فصل بندی خودکار",
    "Featured places":"مکان های برجسته",
    "Tags":"برچسب ها",
    "Language and captions certification":"زبان و تاییدیه زیرنویس",
    "Recording date and location":"تاریخ و مکان ضبط",
    "License":"مجوز",
    "Allow embedding":"اجازه جاسازی",
    "Publish to subscriptions feed and notify subscribers":"انتشار در فید اشتراک ها و اطلاع رسانی به مشترکان",
    "Shorts remixing":"ریمیکس شورت ها",
    "Category":"دسته بندی",
    "How-to & Style":"آموزشی و سبک",
    "Education":"آموزش",
    "People & Blogs":"افراد و وبلاگ ها",
    "Entertainment":"سرگرمی",
    "Science & Technology":"علم و فناوری",
    "Your channel":"کانال شما",
    "Go to channel":"رفتن به کانال",
    "View on YouTube":"مشاهده در YouTube",
    "Upload videos":"آپلود ویدیو",
    "Create":"ایجاد کردن",
    "Create post":"ساخت پست",
    "Go live":"شروع پخش زنده",
    "New video":"ویدیوی جدید",
    "Latest content":"محتوای اخیر",
    "Latest comments":"نظرهای اخیر",
    "Channel violations":"تخلف های کانال",
    "Important notifications":"اعلان های مهم",
    "Creator Insider":"اخبار سازندگان",
    "What's new in Studio":"تازه های استودیو",
    "Returning viewers":"بینندگان بازگشتی",
    "Unique viewers":"بینندگان یکتا",
    "Subscribers":"مشترکان",
    "Watch time (hours)":"زمان تماشا (ساعت)",
    "Average view duration":"میانگین مدت مشاهده",
    "Impressions":"نمایش ها",
    "Impressions click-through rate":"نرخ کلیک نمایش ها",
    "Top content":"محتوای برتر",
    "Realtime":"هم زمان",
    "Last 48 hours":"۴۸ ساعت گذشته",
    "Last 60 minutes":"۶۰ دقیقه گذشته",
    "Top videos":"ویدیوهای برتر",
    "See more":"مشاهده بیشتر",
    "See all":"مشاهده همه",
    "How viewers find your videos":"بینندگان چگونه ویدیوهای شما را پیدا می کنند",
    "External sites or apps":"سایت ها یا برنامه های خارجی",
    "YouTube search":"جستجوی YouTube",
    "Browse features":"ویژگی های مرور",
    "Suggested videos":"ویدیوهای پیشنهادی",
    "Notifications":"اعلان ها",
    "Direct or unknown":"مستقیم یا نامشخص",
    "New viewers":"بینندگان جدید",
    "Casual viewers":"بینندگان گاه به گاه",
    "Regular viewers":"بینندگان ثابت",
    "When your viewers are on YouTube":"زمان حضور مخاطبان شما در YouTube",
    "Channels your audience watches":"کانال هایی که مخاطبان شما تماشا می کنند",
    "What your audience watches":"چیزهایی که مخاطبان شما تماشا می کنند",
    "Formats that your viewers watch on YouTube":"فرمت هایی که مخاطبان شما در YouTube تماشا می کنند",
    "Top geographies":"موقعیت های جغرافیایی برتر",
    "Top subtitle/CC languages":"زبان های برتر زیرنویس",
    "Age and gender":"سن و جنسیت",
    "Watch time from subscribers":"زمان تماشای مشترکان",
    "Content suggesting this video":"محتوای پیشنهاددهنده این ویدیو",
    "Key moments for audience retention":"لحظه های کلیدی حفظ مخاطب",
    "Audience retention":"حفظ مخاطب",
    "Traffic source":"منبع بازدید",
    "Search terms":"عبارت های جستجو",
    "Top remixed":"ریمیکس های برتر",
    "Content performance":"عملکرد محتوا",
    "Typical performance":"عملکرد معمول",
    "Compared to your typical performance":"در مقایسه با عملکرد معمول شما",
    "Learn more":"بیشتر بدانید",
    "Got it":"متوجه شدم"
  });

  const prevLookup = typeof prev.lookup === "function" ? prev.lookup.bind(prev) : (() => "");
  const prevDynamic = typeof prev.lookupDynamic === "function" ? prev.lookupDynamic.bind(prev) : (() => "");
  function lookup(host, text) {
    const key = normalize(text);
    if (!key) return "";
    const h = String(host || "").toLowerCase();
    const domains = Object.keys(packs).filter(d => h === d || h.endsWith(`.${d}`)).sort((a,b)=>b.length-a.length);
    for (const d of domains) if (Object.prototype.hasOwnProperty.call(packs[d] || {}, key)) return packs[d][key];
    return prevLookup(host, text) || "";
  }
  const catalog = Object.assign({}, prev.siteCatalog || {});
  for (const [domain, pack] of Object.entries(packs)) {
    const old = catalog[domain] || {domain,name:domain,category:"other",aliases:[]};
    catalog[domain] = Object.freeze({...old, phrases:Object.keys(pack || {}).length});
  }
  globalThis.__FONTYAR_LOCALIZATION_FA__ = Object.freeze({
    ...prev,
    packs,
    lookup,
    lookupDynamic: prevDynamic,
    count: Number(prev.count || 0) + added,
    supportedSiteCount: Object.keys(packs).length,
    siteCatalog: Object.freeze(catalog),
    patchRevision: "2026-09-16-studio-and-ui"
  });
})();
