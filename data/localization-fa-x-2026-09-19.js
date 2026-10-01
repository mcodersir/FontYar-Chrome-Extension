(() => {
  const prev = globalThis.__FONTYAR_LOCALIZATION_FA__;
  if (!prev) return;

  const normalize = value => String(value || "")
    .replace(/[\u2018\u2019\u02BC]/g, "'")
    .replace(/[\u00A0\u202F]/g, " ")
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[：:]$/, "")
    .toLocaleLowerCase("en-US");

  const source = {
    // Home / Explore / sidebars
    "What's happening": "چه خبر؟",
    "Whats happening": "چه خبر؟",
    "Today's News": "اخبار امروز",
    "See new posts": "مشاهده پست های جدید",
    "Who to follow": "پیشنهاد دنبال کردن",
    "Creators for you": "سازندگان پیشنهادی برای شما",
    "Posts For You": "پست های پیشنهادی برای شما",
    "You might like": "شاید بپسندید",
    "Discover new Communities": "کامیونیتی های جدید را پیدا کنید",
    "Posts": "پست ها",
    "Replies": "پاسخ ها",
    "Reposts": "بازنشرها",
    "Media": "رسانه",
    "Mentions": "منشن ها",
    "Explore": "کاوش",
    "Trending": "ترندها",
    "News": "اخبار",
    "Sports": "ورزش",
    "Entertainment": "سرگرمی",
    "History": "تاریخچه",
    "Bookmarks": "نشانک ها",
    "Likes": "پسندها",
    "All": "همه",

    // Account settings
    "See information about your account, download an archive of your data, or learn about your account deactivation options": "اطلاعات حساب خود را ببینید، آرشیو داده هایتان را دانلود کنید یا با گزینه های غیرفعال کردن حساب آشنا شوید",
    "See your account information like your phone number and email address.": "اطلاعات حساب مانند شماره تلفن و ایمیل خود را ببینید.",
    "Change your password at any time.": "هر زمان خواستید رمز عبور خود را تغییر دهید.",
    "Get insights into the type of information stored for your account.": "با نوع اطلاعات ذخیره شده برای حساب خود آشنا شوید.",
    "Find out how you can deactivate your account.": "با روش غیرفعال کردن حساب خود آشنا شوید.",
    "About your account": "درباره حساب شما",
    "Manage the location associated with your account": "موقعیت مکانی مرتبط با حساب خود را مدیریت کنید",

    // Privacy / safety
    "Manage what information you see and share on X.": "اطلاعاتی را که در X می بینید و به اشتراک می گذارید مدیریت کنید.",
    "Your X activity": "فعالیت شما در X",
    "Manage what information you allow other people on X to see.": "اطلاعاتی را که دیگران در X می توانند از شما ببینند مدیریت کنید.",
    "Manage the information associated with your posts.": "اطلاعات مرتبط با پست های خود را مدیریت کنید.",
    "Decide what you see on X based on your preferences like interests": "بر اساس ترجیحات و علایق خود تعیین کنید چه چیزهایی در X ببینید",
    "Manage the accounts, words, and notifications that you've muted or blocked.": "حساب ها، واژه ها و اعلان هایی را که بی صدا یا مسدود کرده اید مدیریت کنید.",
    "Manage who can message you directly.": "مشخص کنید چه کسانی می توانند مستقیما به شما پیام بدهند.",
    "Manage who can see your Spaces listening activity": "مشخص کنید چه کسانی می توانند فعالیت شنیدن اسپیس های شما را ببینند",
    "Control your discoverability settings and manage contacts you've imported.": "تنظیمات پیدا شدن حساب و مخاطبان واردشده خود را مدیریت کنید.",
    "Manage your ads experience on X.": "تجربه تبلیغاتی خود در X را مدیریت کنید.",
    "Manage your cookie experience on X.": "تنظیمات کوکی های خود در X را مدیریت کنید.",
    "Inferred identity": "هویت استنباط شده",
    "Allow X to personalize your experience with your inferred activity, e.g. activity on devices you haven't used to log in to X.": "به X اجازه دهید تجربه شما را بر اساس فعالیت استنباط شده، مانند فعالیت در دستگاه هایی که با آنها وارد X نشده اید، شخصی سازی کند.",
    "Allow sharing of additional information with X's business partners.": "اجازه اشتراک گذاری اطلاعات بیشتر با شرکای تجاری X را بدهید.",
    "Manage the location information X uses to personalize your experience.": "اطلاعات موقعیت مکانی مورد استفاده X برای شخصی سازی تجربه شما را مدیریت کنید.",
    "Grok & Third-party Collaborators": "Grok و همکاران شخص ثالث",
    "Allow your public data as well as your interactions, inputs, and results with Grok and xAI to be used for training and fine-tuning": "اجازه دهید داده های عمومی شما و همچنین تعامل ها، ورودی ها و نتایج شما با Grok و xAI برای آموزش و تنظیم دقیق استفاده شوند",
    "Learn more about privacy on X": "درباره حریم خصوصی در X بیشتر بدانید",
    "Privacy center": "مرکز حریم خصوصی",

    // Notifications / accessibility / resources
    "Select the kinds of notifications you get about your activities, interests, and recommendations.": "نوع اعلان هایی را که درباره فعالیت ها، علایق و پیشنهادها دریافت می کنید انتخاب کنید.",
    "Choose the notifications you'd like to see - and those you don't.": "اعلان هایی را که می خواهید ببینید و مواردی را که نمی خواهید انتخاب کنید.",
    "Select your preferences by notification type.": "ترجیحات خود را بر اساس نوع اعلان انتخاب کنید.",
    "Accessibility, display and languages": "دسترسی پذیری، نمایش و زبان ها",
    "Manage how X content is displayed to you.": "نحوه نمایش محتوای X را مدیریت کنید.",
    "Manage aspects of your X experience such as limiting color contrast and motion.": "مواردی مانند کنتراست رنگ و حرکت را در تجربه X خود مدیریت کنید.",
    "Manage your font size, color, and background. These settings affect all the X accounts on this browser.": "اندازه فونت، رنگ و پس زمینه را مدیریت کنید. این تنظیمات روی همه حساب های X در این مرورگر اعمال می شوند.",
    "Manage which languages are used to personalize your X experience.": "زبان های مورد استفاده برای شخصی سازی تجربه X را مدیریت کنید.",
    "Limit how X uses some of your network data on this device.": "نحوه استفاده X از بخشی از داده های شبکه در این دستگاه را محدود کنید.",
    "Check out other places for helpful information to learn more about X products and services.": "برای آشنایی بیشتر با محصولات و خدمات X، منابع مفید دیگر را ببینید.",
    "Release notes": "یادداشت های انتشار",
    "Ads & Business": "تبلیغات و کسب و کار",
    "MStV Transparenzangaben": "اطلاعات شفافیت MStV",
    "Miscellaneous": "سایر موارد",
    "Get App": "دریافت برنامه",

    // Security
    "Manage your account's security and keep track of your account's usage including apps that you have connected to your account.": "امنیت حساب و نحوه استفاده از آن، از جمله برنامه های متصل به حساب، را مدیریت کنید.",
    "Manage your account's security.": "امنیت حساب خود را مدیریت کنید.",
    "See information about when you logged into your account and the apps you connected to your account.": "اطلاعات زمان های ورود به حساب و برنامه های متصل به حساب را ببینید.",
    "Manage Google or Apple accounts connected to X to log in.": "حساب های Google یا Apple متصل به X برای ورود را مدیریت کنید.",
    "Manage your shared accounts.": "حساب های اشتراکی خود را مدیریت کنید.",

    // Lists / Spaces
    "You haven't created or followed any Lists. When you do, they'll show up here.": "هنوز هیچ فهرستی نساخته یا دنبال نکرده اید. وقتی این کار را انجام دهید، اینجا نمایش داده می شوند.",
    "Who can speak?": "چه کسانی می توانند صحبت کنند؟",
    "Only people you invite to speak": "فقط افرادی که برای صحبت دعوت می کنید",
    "What do you want to talk about?": "می خواهید درباره چه چیزی صحبت کنید؟",
    "People you follow": "افرادی که دنبال می کنید",
    "Everyone": "همه",
    "Get to know Spaces": "با اسپیس ها آشنا شوید",

    // Creator Studio / Premium
    "Programs": "برنامه ها",
    "Original Content Rewards": "پاداش محتوای اصیل",
    "Earn from your posts": "از پست های خود درآمد کسب کنید",
    "Ineligible": "واجد شرایط نیست",
    "Subscriptions": "اشتراک ها",
    "Live Studio": "استودیو زنده",
    "Go live professionally": "حرفه ای پخش زنده کنید",
    "New": "جدید",
    "Analytics": "آمار",
    "Inspiration": "ایده ها",
    "Top posts by engagement": "پست های برتر بر اساس تعامل",
    "Support": "پشتیبانی",
    "Contact Support": "تماس با پشتیبانی",
    "Learn more": "بیشتر بدانید",
    "Don't lose 50% off your first 2 months": "تخفیف ۵۰٪ دو ماه اول را از دست ندهید",
    "Monthly": "ماهانه",
    "Yearly": "سالانه",
    "50% off for 2 months": "۵۰٪ تخفیف برای ۲ ماه",
    "Premium checkmark": "تیک پریمیوم",
    "Enhanced Grok access": "دسترسی بیشتر به Grok",
    "Advanced analytics": "آمار پیشرفته",
    "Less ads in your feeds": "تبلیغات کمتر در فیدها",
    "Boosted replies": "تقویت پاسخ ها",
    "Write Articles": "نوشتن مقاله",
    "Get paid to post": "درآمد از انتشار پست",
    "Everything in Basic": "همه امکانات پایه",
    "Fully ad-free": "کاملا بدون تبلیغ",
    "SuperGrok": "سوپر گروک",
    "Handle Marketplace": "بازار نام کاربری",
    "Highest reply boost": "بیشترین تقویت پاسخ ها",
    "Radar Advanced Search": "جستجوی پیشرفته رادار",
    "X Pro": "X Pro",
    "Everything in Premium": "همه امکانات پریمیوم",
    "Are you a business?": "کسب و کار دارید؟",
    "Gain credibility and grow faster with Premium Business": "با پریمیوم کسب و کار اعتبار بیشتری بگیرید و سریع تر رشد کنید",
    "Compare tiers & features": "مقایسه سطح ها و قابلیت ها",
    "Enhanced Experience": "تجربه پیشرفته",
    "Half in For You & Following": "نصف تبلیغات در «برای شما» و «دنبال شوندگان»",
    "Reply boost": "تقویت پاسخ ها",
    "Larger": "بیشتر",
    "Largest": "بیشترین",
    "Usage limits": "محدودیت استفاده",
    "Higher": "بالاتر",
    "Highest": "بالاترین",
    "Early access to new features": "دسترسی زودهنگام به قابلیت های جدید",
    "Tag @Grok in replies": "تگ کردن @Grok در پاسخ ها",
    "Creator Hub": "مرکز سازندگان",
    "Checkmark": "تیک تایید",
    "Optional ID verification": "احراز هویت اختیاری",
    "X Handle Marketplace": "بازار نام کاربری X",
    "Highlights tab": "تب برگزیده ها",
    "App icons": "آیکون های برنامه",
    "Customize navigation": "شخصی سازی پیمایش",

    // Grok
    "Ask Grok (AI agent)": "از Grok بپرسید (عامل هوش مصنوعی)",
    "Meet Grok Bot": "با Grok Bot آشنا شوید",
    "AI teammates you can give real work to. Bots sign in to your tools, use them just like you do, and come back with finished work.": "هم تیمی های هوش مصنوعی که می توانید کار واقعی به آنها بسپارید. بات ها وارد ابزارهای شما می شوند، مثل خودتان از آنها استفاده می کنند و نتیجه کار را تحویل می دهند.",
    "Fast": "سریع",
    "Quick responses . Grok 4.6": "پاسخ های سریع · Grok 4.6",
    "Quick responses · Grok 4.6": "پاسخ های سریع · Grok 4.6",
    "Go to grok.com": "رفتن به grok.com",
    "Enter Passcode": "رمز عبور را وارد کنید",
    "Your passcode is required to recover your encryption keys so we can decrypt your previous messages.": "برای بازیابی کلیدهای رمزنگاری و رمزگشایی پیام های قبلی، رمز عبور شما لازم است.",

    // Premium Business landing page
    "The fastest way to grow on X": "سریع ترین راه رشد در X",
    "Unlock a suite of tools to help you drive more sales, build credibility, and get real-time market insights.": "مجموعه ای از ابزارها را فعال کنید تا فروش بیشتری داشته باشید، اعتبار بسازید و بینش لحظه ای از بازار بگیرید.",
    "sales": "فروش",
    "credibility": "اعتبار",
    "insights": "بینش ها",
    "Build credibility and drive growth": "اعتبار بسازید و رشد کنید",
    "Annually": "سالانه",
    "SAVE 16%": "۱۶٪ صرفه جویی",
    "Basic": "پایه",
    "All Premium+ benefits plus:": "همه مزایای پریمیوم پلاس، به علاوه:",
    "Gold checkmark": "تیک طلایی",
    "$2,500 free ad credit yearly*": "سالانه ۲۵۰۰ دلار اعتبار رایگان تبلیغاتی*",
    "Standard analytics": "آمار استاندارد",
    "Priority support": "پشتیبانی ویژه",
    "Full Access": "دسترسی کامل",
    "Most popular": "محبوب ترین",
    "Everything in Basic plus:": "همه امکانات پایه، به علاوه:",
    "Affiliate your employees": "کارمندان خود را به حساب وابسته کنید",
    "$12,000 free ad credit yearly*": "سالانه ۱۲۰۰۰ دلار اعتبار رایگان تبلیغاتی*",
    "Access priority handles": "دسترسی به نام های کاربری اولویت دار",
    "Advanced analytics": "آمار پیشرفته",
    "VIP support": "پشتیبانی VIP",
    "Enterprise": "سازمانی",
    "Custom": "سفارشی",
    "Inquire to learn more": "برای اطلاعات بیشتر استعلام بگیرید",
    "Everything in Full Access plus:": "همه امکانات دسترسی کامل، به علاوه:",
    "Affiliate packages": "بسته های حساب وابسته",
    "Advanced account protection": "محافظت پیشرفته حساب",
    "Highest tool rate limits": "بالاترین محدودیت استفاده از ابزارها",
    "Dedicated support team": "تیم پشتیبانی اختصاصی",
    "Limited time ad credit offer, subject to terms.": "پیشنهاد اعتبار تبلیغاتی برای مدت محدود و مشروط به قوانین است.",
    "All plans are subject to applicable taxes and fees.": "همه پلن ها مشمول مالیات ها و هزینه های مربوط هستند.",
    "Apply now": "همین حالا درخواست دهید",
    "Trusted by 1000s of businesses": "مورد اعتماد هزاران کسب و کار",
    "Tools designed to help you get ahead": "ابزارهایی برای جلو افتادن از رقبا",
    "Boost credibility & discovery": "افزایش اعتبار و دیده شدن",
    "Stand out with a gold checkmark & add affiliates to grow your presence.": "با تیک طلایی متمایز شوید و با افزودن حساب های وابسته حضور خود را گسترش دهید.",
    "Get real-time insights": "دریافت بینش لحظه ای",
    "Monitor conversations and sentiment around your brand and industry with Radar.": "با رادار گفتگوها و دیدگاه ها درباره برند و صنعت خود را رصد کنید.",
    "Acquire priority handles at no additional cost and purchase valuable inactive handles.": "نام های کاربری اولویت دار را بدون هزینه اضافه دریافت کنید و نام های غیرفعال ارزشمند را بخرید.",
    "Premium Business has allowed us to increase credibility while leveraging the distribution of our employees as affiliates to scale.": "پریمیوم کسب و کار به ما کمک کرده اعتبارمان را افزایش دهیم و با استفاده از شبکه کارمندان وابسته، مقیاس فعالیت خود را گسترش دهیم.",
    "Grow your presence": "حضور خود را گسترش دهید",
    "Stand out with Gold": "با تیک طلایی متمایز شوید",
    "Your gold checkmark instantly signals to users that you're a legitimate, verified business - enhancing trust and credibility.": "تیک طلایی بلافاصله نشان می دهد کسب و کار شما معتبر و تاییدشده است و اعتماد و اعتبار را افزایش می دهد.",
    "Add your Affiliates": "حساب های وابسته خود را اضافه کنید",
    "Affiliate your leadership, employees, sub-brands, support handles and more to build a cohesive presence across X.": "مدیران، کارمندان، زیربرندها، حساب های پشتیبانی و موارد دیگر را وابسته کنید تا حضور یکپارچه ای در X بسازید.",
    "Spot trends before anyone else": "ترندها را زودتر از دیگران پیدا کنید",
    "Access powerful real-time insights": "به بینش قدرتمند لحظه ای دسترسی داشته باشید",
    "Use Radar to understand and track the conversations and sentiment around your brand and industry.": "از رادار برای درک و پیگیری گفتگوها و دیدگاه ها درباره برند و صنعت خود استفاده کنید.",
    "View all important metrics in one place": "همه شاخص های مهم را یکجا ببینید",
    "Instantly see which affiliates are the best advocates for your business with a central analytics dashboard.": "با داشبورد مرکزی آمار، فورا ببینید کدام حساب های وابسته بهترین حامیان کسب و کار شما هستند.",
    "Premium Business has been extremely reliable and instrumental to our widespread growth and account security.": "پریمیوم کسب و کار برای رشد گسترده و امنیت حساب ما بسیار قابل اعتماد و موثر بوده است.",
    "Secure your brand": "از برند خود محافظت کنید",
    "Acquire your ideal handle": "نام کاربری ایده آل خود را به دست آورید",
    "Your handle defines your online identity. Unlock an exclusive marketplace to purchase inactive and desirable X handles.": "نام کاربری هویت آنلاین شما را شکل می دهد. بازار اختصاصی نام های غیرفعال و ارزشمند X را فعال کنید.",
    "Protect your brand from impersonation": "از برند خود در برابر جعل هویت محافظت کنید",
    "Accounts are actively monitored for changes and flagged for manual review if impersonation is detected for your brand or affiliated accounts.": "حساب ها به طور فعال برای تغییرات پایش می شوند و در صورت تشخیص جعل هویت برند یا حساب های وابسته، برای بررسی دستی علامت گذاری می شوند.",
    "And so much more": "و امکانات بسیار بیشتر",
    "Fast, VIP support": "پشتیبانی سریع و VIP",
    "Get exclusive access to fast, priority support, ensuring timely help and escalations.": "به پشتیبانی سریع و اولویت دار دسترسی اختصاصی داشته باشید تا رسیدگی و پیگیری به موقع انجام شود.",
    "Premium+ and SuperGrok": "پریمیوم پلاس و سوپر گروک",
    "Premium Businesses and their affiliates receive all Premium+ benefits including SuperGrok features.": "کسب و کارهای پریمیوم و حساب های وابسته آنها همه مزایای پریمیوم پلاس، از جمله قابلیت های سوپر گروک، را دریافت می کنند.",
    "Custom profile": "پروفایل سفارشی",
    "Elevate and distinguish your business with a square avatar and a new tab that lists your affiliated accounts.": "با آواتار مربعی و تب جدید نمایش حساب های وابسته، کسب و کار خود را متمایز کنید.",
    "Join the fastest growing brands on X": "به سریع ترین برندهای در حال رشد X بپیوندید"
  };

  const exact = Object.create(null);
  for (const [key, value] of Object.entries(source)) exact[normalize(key)] = value;

  const prevLookup = typeof prev.lookup === "function" ? prev.lookup.bind(prev) : (() => "");
  const prevDynamic = typeof prev.lookupDynamic === "function" ? prev.lookupDynamic.bind(prev) : (() => "");
  const isX = host => {
    const h = String(host || "").toLowerCase();
    return h === "x.com" || h.endsWith(".x.com") || h === "twitter.com" || h.endsWith(".twitter.com");
  };

  function xDynamic(text) {
    const raw = String(text || "").replace(/[\u2018\u2019]/g, "'").trim();
    let m;
    if ((m = raw.match(/^([€$£]\s?[\d.,]+)\s+billed annually$/i))) return `سالانه ${m[1]} صورتحساب می شود`;
    if ((m = raw.match(/^\$([\d.,]+)\s+free ad credit yearly\*?$/i))) return `سالانه ${m[1]} دلار اعتبار رایگان تبلیغاتی`;
    if ((m = raw.match(/^each additional affiliated account is \$([\d.,]+) per handle per year and ad credits are subject to limitations\.?$/i))) return `هزینه هر حساب وابسته اضافه، سالانه ${m[1]} دلار برای هر نام کاربری است و اعتبار تبلیغاتی محدودیت هایی دارد.`;
    if (/^\/\s*month$/i.test(raw)) return "در ماه";
    if (/^annually\s*save\s*16%\s*monthly$/i.test(raw)) return "سالانه · ۱۶٪ صرفه جویی · ماهانه";
    if (/^50%\s*off\s*for\s*2\s*months$/i.test(raw)) return "۵۰٪ تخفیف برای ۲ ماه";
    if (/^don't lose\s*50%\s*off\s*your first\s*2\s*months$/i.test(raw)) return "تخفیف ۵۰٪ دو ماه اول را از دست ندهید";
    return "";
  }

  function lookup(host, text) {
    const key = normalize(text);
    if (isX(host) && Object.prototype.hasOwnProperty.call(exact, key)) return exact[key];
    if (isX(host)) {
      const dynamic = xDynamic(text);
      if (dynamic) return dynamic;
    }
    return prevLookup(host, text) || "";
  }

  function lookupDynamic(host, text) {
    if (isX(host)) {
      const key = normalize(text);
      if (Object.prototype.hasOwnProperty.call(exact, key)) return exact[key];
      const dynamic = xDynamic(text);
      if (dynamic) return dynamic;
    }
    return prevDynamic(host, text) || "";
  }

  const packs = Object.assign({}, prev.packs || {});
  const xPack = Object.assign({}, packs["x.com"] || packs["twitter.com"] || {});
  for (const [key, value] of Object.entries(exact)) xPack[key] = value;
  packs["x.com"] = xPack;
  packs["twitter.com"] = xPack;

  globalThis.__FONTYAR_LOCALIZATION_FA__ = Object.freeze({
    ...prev,
    normalize,
    packs,
    lookup,
    lookupDynamic,
    count: Number(prev.count || 0) + Object.keys(exact).length,
    xUiRevision: "2026-09-19-x-ui-v2"
  });
})();
