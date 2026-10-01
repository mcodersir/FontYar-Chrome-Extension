(() => {
  const prev = globalThis.__FONTYAR_LOCALIZATION_FA__;
  if (!prev) return;

  const normalize = prev.normalize || (v => String(v || "").trim().toLowerCase().replace(/\s+/g, " "));
  const general = prev.general || {};
  const packs = prev.packs || {};
  let added = 0;

  const put = (obj, key, value) => {
    const k = normalize(key);
    if (!k || Object.prototype.hasOwnProperty.call(obj, k)) return;
    obj[k] = value;
    added++;
  };
  const putMany = (obj, entries) => Object.entries(entries).forEach(([k,v]) => put(obj,k,v));
  const pack = domain => (packs[domain] ||= {});

  // Curated interface vocabulary. These are UI/navigation/settings phrases only; never post text.
  putMany(general, {
    "account menu":"منوی حساب","main menu":"منوی اصلی","navigation menu":"منوی پیمایش","more menu items":"گزینه های بیشتر منو",
    "primary navigation":"پیمایش اصلی","secondary navigation":"پیمایش فرعی","footer navigation":"پیمایش پایین صفحه","skip navigation":"رد شدن از پیمایش",
    "search query":"عبارت جستجو","search results":"نتایج جستجو","search suggestions":"پیشنهادهای جستجو","clear search":"پاک کردن جستجو",
    "open search":"باز کردن جستجو","close search":"بستن جستجو","recent searches":"جستجوهای اخیر","trending searches":"جستجوهای ترند",
    "open menu":"باز کردن منو","close menu":"بستن منو","open navigation":"باز کردن پیمایش","close navigation":"بستن پیمایش",
    "previous page":"صفحه قبلی","next page":"صفحه بعدی","first page":"صفحه اول","last page":"صفحه آخر","go back":"بازگشت",
    "go forward":"رفتن به جلو","go to top":"رفتن به بالا","back to top":"بازگشت به بالا","expand":"باز کردن","collapse":"جمع کردن",
    "expand all":"باز کردن همه","collapse all":"جمع کردن همه","show options":"نمایش گزینه ها","hide options":"پنهان کردن گزینه ها",
    "open settings":"باز کردن تنظیمات","close settings":"بستن تنظیمات","advanced options":"گزینه های پیشرفته","basic settings":"تنظیمات پایه",
    "general settings":"تنظیمات عمومی","account settings":"تنظیمات حساب","notification settings":"تنظیمات اعلان ها","privacy settings":"تنظیمات حریم خصوصی",
    "security settings":"تنظیمات امنیت","language settings":"تنظیمات زبان","appearance settings":"تنظیمات ظاهر","accessibility settings":"تنظیمات دسترسی پذیری",
    "content settings":"تنظیمات محتوا","display settings":"تنظیمات نمایش","media settings":"تنظیمات رسانه","download settings":"تنظیمات دانلود",
    "manage notifications":"مدیریت اعلان ها","manage privacy":"مدیریت حریم خصوصی","manage security":"مدیریت امنیت","manage subscriptions":"مدیریت اشتراک ها",
    "manage devices":"مدیریت دستگاه ها","manage sessions":"مدیریت نشست ها","manage permissions":"مدیریت مجوزها","manage connections":"مدیریت اتصال ها",
    "view profile":"مشاهده پروفایل","open profile":"باز کردن پروفایل","profile photo":"عکس پروفایل","open profile photo":"باز کردن عکس پروفایل",
    "opens profile photo":"باز کردن عکس پروفایل","view account":"مشاهده حساب","account information":"اطلاعات حساب","personal information":"اطلاعات شخصی",
    "view keyboard shortcuts":"مشاهده میانبرهای صفحه کلید","keyboard shortcut":"میانبر صفحه کلید","keyboard shortcuts":"میانبرهای صفحه کلید",
    "new items":"موارد جدید","unread items":"موارد خوانده نشده","new notifications":"اعلان های جدید","unread notifications":"اعلان های خوانده نشده",
    "mark all as read":"علامت گذاری همه به عنوان خوانده شده","clear notifications":"پاک کردن اعلان ها","notification center":"مرکز اعلان ها",
    "share options":"گزینه های اشتراک گذاری","copy to clipboard":"کپی در کلیپ بورد","copy text":"کپی متن","copy image":"کپی تصویر",
    "open link":"باز کردن لینک","open link in new tab":"باز کردن لینک در زبانه جدید","open link in new window":"باز کردن لینک در پنجره جدید",
    "view details":"مشاهده جزئیات","show details":"نمایش جزئیات","hide details":"پنهان کردن جزئیات","more details":"جزئیات بیشتر",
    "loading more":"در حال بارگذاری بیشتر","load more":"بارگذاری بیشتر","load previous":"بارگذاری قبلی","load newer":"بارگذاری جدیدتر",
    "refresh page":"تازه سازی صفحه","refresh content":"تازه سازی محتوا","new content available":"محتوای جدید موجود است","see new content":"دیدن محتوای جدید",
    "image":"تصویر","image preview":"پیش نمایش تصویر","video preview":"پیش نمایش ویدیو","media preview":"پیش نمایش رسانه",
    "play video":"پخش ویدیو","pause video":"توقف ویدیو","mute video":"بی صدا کردن ویدیو","unmute video":"با صدا کردن ویدیو",
    "enter fullscreen":"ورود به تمام صفحه","exit fullscreen":"خروج از تمام صفحه","picture in picture":"تصویر در تصویر","captions":"زیرنویس",
    "turn on captions":"روشن کردن زیرنویس","turn off captions":"خاموش کردن زیرنویس","playback speed":"سرعت پخش","video quality":"کیفیت ویدیو",
    "sort options":"گزینه های مرتب سازی","filter options":"گزینه های فیلتر","clear filters":"پاک کردن فیلترها","apply filters":"اعمال فیلترها",
    "selected":"انتخاب شده","not selected":"انتخاب نشده","enabled":"فعال","disabled":"غیرفعال","available":"موجود","unavailable":"ناموجود"
  });

  const x = pack("x.com");
  putMany(x, {
    "account menu":"منوی حساب","ads info":"اطلاعات تبلیغات","chat":"گفتگو","footer":"پایین صفحه","grok actions":"اقدامات Grok",
    "home (new unread posts)":"خانه (پست های خوانده نشده جدید)","home timeline":"تایم لاین خانه","more menu items":"گزینه های بیشتر منو",
    "new posts are available. push the period key to go to the them.":"پست های جدید موجود است. برای رفتن به آنها کلید نقطه را بزنید.",
    "new posts are available. push the period key to go to them.":"پست های جدید موجود است. برای رفتن به آنها کلید نقطه را بزنید.",
    "opens profile photo":"باز کردن عکس پروفایل","posts":"پست ها","posts replies reposts media":"پست ها  پاسخ ها  بازنشرها  رسانه","primary":"اصلی","profile timelines":"تایم لاین پروفایل",
    "search and explore":"جستجو و کاوش","search query":"عبارت جستجو","skip to home timeline":"رفتن به تایم لاین خانه",
    "skip to trending":"رفتن به ترندها","timeline: trending now":"تایم لاین: ترندهای فعلی","x logo":"لوگوی X",
    "see new posts":"دیدن پست های جدید","trending":"ترند","share post":"اشتراک پست","view post analytics":"مشاهده آمار پست",
    "reply":"پاسخ","repost":"بازنشر","like":"پسندیدن","bookmark":"نشانک","profile timelines":"تایم لاین پروفایل",
    "notifications alt+t":"اعلان ها Alt+T","undefined unread items":"موارد خوانده نشده","view keyboard shortcuts":"مشاهده میانبرهای صفحه کلید","search x":"جستجو در X"
  });
  packs["twitter.com"] = x;

  putMany(pack("instagram.com"), {
    "search input":"کادر جستجو","search instagram":"جستجو در اینستاگرام","more options":"گزینه های بیشتر","profile picture":"عکس پروفایل",
    "open profile picture":"باز کردن عکس پروفایل","view profile":"مشاهده پروفایل","accounts center":"مرکز حساب ها","settings and activity":"تنظیمات و فعالیت",
    "notifications panel":"پنل اعلان ها","messages panel":"پنل پیام ها","create menu":"منوی ساخت","new post":"پست جدید","new reel":"ریلز جدید",
    "new story":"استوری جدید","share to feed":"اشتراک در فید","share to story":"اشتراک در استوری","post options":"گزینه های پست"
  });

  putMany(pack("youtube.com"), {
    "guide":"راهنما","open guide":"باز کردن راهنما","close guide":"بستن راهنما","search with your voice":"جستجوی صوتی","create":"ساخت",
    "notifications":"اعلان ها","account menu":"منوی حساب","youtube apps":"برنامه های یوتیوب","more actions":"اقدامات بیشتر","player settings":"تنظیمات پخش کننده",
    "autoplay is on":"پخش خودکار روشن است","autoplay is off":"پخش خودکار خاموش است","miniplayer":"پخش کننده کوچک","theater mode":"حالت سینمایی",
    "default view":"نمای پیش فرض","full screen":"تمام صفحه","exit full screen":"خروج از تمام صفحه","show transcript":"نمایش رونوشت",
    "show less":"نمایش کمتر","show more":"نمایش بیشتر","sort comments":"مرتب سازی نظرها","top comments":"نظرهای برتر","newest first":"جدیدترین اول"
  });

  putMany(pack("github.com"), {
    "global navigation":"پیمایش اصلی","open global navigation menu":"باز کردن منوی پیمایش اصلی","open user navigation menu":"باز کردن منوی کاربر",
    "repository navigation":"پیمایش مخزن","repository actions":"اقدامات مخزن","file navigation":"پیمایش فایل","branch selector":"انتخاب شاخه",
    "go to file":"رفتن به فایل","add file":"افزودن فایل","code menu":"منوی کد","notifications":"اعلان ها","issues navigation":"پیمایش مسائل",
    "pull requests navigation":"پیمایش درخواست های ادغام","actions navigation":"پیمایش اکشن ها","projects navigation":"پیمایش پروژه ها","security navigation":"پیمایش امنیت",
    "insights navigation":"پیمایش آمار","repository settings":"تنظیمات مخزن","edit repository details":"ویرایش جزئیات مخزن"
  });

  putMany(pack("linkedin.com"), {
    "global navigation":"پیمایش اصلی","me":"من","work":"کار","my network":"شبکه من","jobs":"فرصت های شغلی","messaging":"پیام رسانی",
    "notifications":"اعلان ها","search by title, skill, or company":"جستجو بر اساس عنوان، مهارت یا شرکت","search by location":"جستجو بر اساس موقعیت",
    "profile viewing options":"گزینه های مشاهده پروفایل","settings & privacy":"تنظیمات و حریم خصوصی","account preferences":"ترجیحات حساب"
  });

  putMany(pack("reddit.com"), {
    "open navigation":"باز کردن پیمایش","open user menu":"باز کردن منوی کاربر","create post":"ساخت پست","chat":"گفتگو","advertise":"تبلیغ",
    "communities":"انجمن ها","recent":"اخیر","resources":"منابع","popular":"محبوب","all":"همه","saved":"ذخیره شده","history":"تاریخچه",
    "moderation":"مدیریت","user settings":"تنظیمات کاربر","more actions":"اقدامات بیشتر","share":"اشتراک گذاری","save":"ذخیره"
  });

  putMany(pack("discord.com"), {
    "direct messages":"پیام های مستقیم","friends":"دوستان","nitro":"Nitro","message requests":"درخواست های پیام","shop":"فروشگاه",
    "mute":"بی صدا","deafen":"قطع صدا","user settings":"تنظیمات کاربر","server settings":"تنظیمات سرور","create invite":"ساخت دعوت",
    "notification settings":"تنظیمات اعلان ها","privacy settings":"تنظیمات حریم خصوصی","browse channels":"مرور کانال ها","threads":"تردها"
  });

  putMany(pack("web.whatsapp.com"), {
    "new chat":"گفتگوی جدید","status":"وضعیت","channels":"کانال ها","communities":"انجمن ها","archived":"بایگانی شده","search or start new chat":"جستجو یا شروع گفتگوی جدید",
    "attach":"پیوست","emoji":"ایموجی","voice message":"پیام صوتی","more options":"گزینه های بیشتر","contact info":"اطلاعات مخاطب","group info":"اطلاعات گروه"
  });

  putMany(pack("web.telegram.org"), {
    "new message":"پیام جدید","search":"جستجو","saved messages":"پیام های ذخیره شده","contacts":"مخاطبان","calls":"تماس ها","settings":"تنظیمات",
    "archived chats":"گفتگوهای بایگانی شده","new group":"گروه جدید","new channel":"کانال جدید","more":"بیشتر","attach":"پیوست","emoji":"ایموجی"
  });

  const n = "([0-9۰-۹٠-٩][0-9۰-۹٠-٩.,٬٫KMBkmb]*)";
  const dynamicRules = {
    "*": [
      [new RegExp(`^${n} views?$`, "i"), m => `${m[1]} بازدید`],
      [new RegExp(`^${n} likes?$`, "i"), m => `${m[1]} پسند`],
      [new RegExp(`^${n} comments?$`, "i"), m => `${m[1]} نظر`],
      [new RegExp(`^${n} replies$`, "i"), m => `${m[1]} پاسخ`],
      [new RegExp(`^${n} followers?$`, "i"), m => `${m[1]} دنبال کننده`],
      [new RegExp(`^${n} following$`, "i"), m => `${m[1]} دنبال می کنید`],
      [new RegExp(`^${n} subscribers?$`, "i"), m => `${m[1]} مشترک`],
      [new RegExp(`^${n} members?$`, "i"), m => `${m[1]} عضو`],
      [new RegExp(`^${n} posts?$`, "i"), m => `${m[1]} پست`],
      [new RegExp(`^view all ${n} comments$`, "i"), m => `نمایش همه ${m[1]} نظر`],
      [new RegExp(`^show ${n} replies$`, "i"), m => `نمایش ${m[1]} پاسخ`],
      [new RegExp(`^hide ${n} replies$`, "i"), m => `پنهان کردن ${m[1]} پاسخ`],
      [new RegExp(`^${n} new notifications?$`, "i"), m => `${m[1]} اعلان جدید`],
      [new RegExp(`^${n} unread items?$`, "i"), m => `${m[1]} مورد خوانده نشده`],
      [new RegExp(`^${n} unread messages?$`, "i"), m => `${m[1]} پیام خوانده نشده`]
    ],
    "x.com": [
      [new RegExp(`^${n} replies?\\. reply$`, "i"), m => `${m[1]} پاسخ. پاسخ دادن`],
      [new RegExp(`^${n} reposts?\\. repost$`, "i"), m => `${m[1]} بازنشر. بازنشر`],
      [new RegExp(`^${n} likes?\\. like$`, "i"), m => `${m[1]} پسند. پسندیدن`],
      [new RegExp(`^${n} bookmarks?\\. bookmark$`, "i"), m => `${m[1]} نشانک. نشانک`],
      [new RegExp(`^${n} views?\\. view post analytics$`, "i"), m => `${m[1]} بازدید. مشاهده آمار پست`],
      [/^follow\s+(@[^\s]+)$/i, m => `دنبال کردن ${m[1]}`],
      [/^unfollow\s+(@[^\s]+)$/i, m => `لغو دنبال کردن ${m[1]}`],
      [/^timeline:\s*(.+?)[’']s posts$/i, m => `تایم لاین: پست های ${m[1]}`],
      [/^timeline:\s*(.+)$/i, m => `تایم لاین: ${m[1]}`],
      [/^trending in\s+(.+)$/i, m => `ترند در ${m[1]}`],
      [/^sports\s*[·•]\s*trending\s+(.+)$/i, m => `ورزش · ترند ${m[1]}`],
      [/^news\s*[·•]\s*trending\s+(.+)$/i, m => `خبر · ترند ${m[1]}`],
      [/^entertainment\s*[·•]\s*trending\s+(.+)$/i, m => `سرگرمی · ترند ${m[1]}`],
      [/^notifications\s+(.+)$/i, m => `اعلان ها ${m[1]}`]
    ],
    "instagram.com": [
      [new RegExp(`^${n} likes$`, "i"), m => `${m[1]} پسند`],
      [new RegExp(`^view all ${n} comments$`, "i"), m => `نمایش همه ${m[1]} نظر`],
      [/^follow\s+(.+)$/i, m => `دنبال کردن ${m[1]}`],
      [/^liked by\s+(.+)\s+and\s+([0-9.,]+)\s+others$/i, m => `پسندیده شده توسط ${m[1]} و ${m[2]} نفر دیگر`]
    ],
    "youtube.com": [
      [new RegExp(`^${n} views$`, "i"), m => `${m[1]} بازدید`],
      [new RegExp(`^${n} subscribers$`, "i"), m => `${m[1]} مشترک`],
      [new RegExp(`^${n} comments$`, "i"), m => `${m[1]} نظر`],
      [new RegExp(`^show ${n} replies$`, "i"), m => `نمایش ${m[1]} پاسخ`],
      [new RegExp(`^hide ${n} replies$`, "i"), m => `پنهان کردن ${m[1]} پاسخ`],
      [new RegExp(`^${n} watching$`, "i"), m => `${m[1]} در حال تماشا`]
    ],
    "github.com": [
      [new RegExp(`^${n} commits?$`, "i"), m => `${m[1]} کامیت`],
      [new RegExp(`^${n} branches?$`, "i"), m => `${m[1]} شاخه`],
      [new RegExp(`^${n} tags?$`, "i"), m => `${m[1]} تگ`],
      [new RegExp(`^${n} stars?$`, "i"), m => `${m[1]} ستاره`],
      [new RegExp(`^${n} forks?$`, "i"), m => `${m[1]} فورک`],
      [new RegExp(`^${n} issues?$`, "i"), m => `${m[1]} مسئله`],
      [new RegExp(`^${n} pull requests?$`, "i"), m => `${m[1]} درخواست ادغام`]
    ],
    "linkedin.com": [
      [new RegExp(`^${n} connections?$`, "i"), m => `${m[1]} ارتباط`],
      [new RegExp(`^${n} followers?$`, "i"), m => `${m[1]} دنبال کننده`]
    ],
    "reddit.com": [
      [new RegExp(`^${n} comments?$`, "i"), m => `${m[1]} نظر`],
      [new RegExp(`^${n} upvotes?$`, "i"), m => `${m[1]} رای مثبت`]
    ]
  };

  function rulesForHost(host) {
    const h = String(host || "").toLowerCase();
    let best = "";
    for (const domain of Object.keys(dynamicRules)) {
      if (domain === "*") continue;
      if ((h === domain || h.endsWith(`.${domain}`)) && domain.length > best.length) best = domain;
    }
    if (best === "twitter.com") best = "x.com";
    return [...(dynamicRules[best] || []), ...(dynamicRules["*"] || [])];
  }

  const baseLookup = typeof prev.lookup === "function" ? prev.lookup.bind(prev) : (() => "");
  const actionPrefix = {
    open:"باز کردن", close:"بستن", manage:"مدیریت", view:"مشاهده", edit:"ویرایش", change:"تغییر", show:"نمایش", hide:"پنهان کردن",
    search:"جستجوی", clear:"پاک کردن", reset:"بازنشانی", copy:"کپی", download:"دانلود", enable:"فعال کردن", disable:"غیرفعال کردن",
    add:"افزودن", remove:"حذف", create:"ساخت", select:"انتخاب", choose:"انتخاب", mute:"بی صدا کردن", unmute:"با صدا کردن"
  };

  function composeKnownUi(host, raw) {
    let m = raw.match(/^(open|close|manage|view|edit|change|show|hide|search|clear|reset|copy|download|enable|disable|add|remove|create|select|choose|mute|unmute)\s+(.+)$/i);
    if (m) {
      const tail = baseLookup(host, m[2]);
      const prefix = actionPrefix[m[1].toLowerCase()];
      if (tail && prefix) return `${prefix} ${tail}`;
    }
    m = raw.match(/^(.+?)\s+(settings|preferences|options|details|menu|history)$/i);
    if (m) {
      const head = baseLookup(host, m[1]);
      if (head) {
        const suffix = {settings:"تنظیمات",preferences:"ترجیحات",options:"گزینه های",details:"جزئیات",menu:"منوی",history:"تاریخچه"}[m[2].toLowerCase()];
        return `${suffix} ${head}`;
      }
    }
    m = raw.match(/^(.+?)\s+((?:alt|ctrl|cmd|shift|option)(?:\+[a-z0-9]+)+)$/i);
    if (m) {
      const label = baseLookup(host, m[1]);
      if (label) return `${label} ${m[2]}`;
    }
    m = raw.match(/^([^:]{1,48}):\s*(.+)$/);
    if (m && m[2].length <= 80) {
      const label = baseLookup(host, m[1]);
      if (label) return `${label}: ${m[2]}`;
    }
    return "";
  }

  function lookupDynamic(host, text) {
    const raw = String(text || "").trim();
    if (!raw || raw.length > 180 || /https?:\/\//i.test(raw)) return "";
    for (const [re, fn] of rulesForHost(host)) {
      const m = raw.match(re);
      if (!m) continue;
      try { return fn(m) || ""; } catch { return ""; }
    }
    return composeKnownUi(host, raw);
  }
  const lookup = (host, text) => lookupDynamic(host, text) || baseLookup(host, text);
  const dynamicRuleCount = Object.values(dynamicRules).reduce((sum, rules) => sum + rules.length, 0);

  globalThis.__FONTYAR_LOCALIZATION_FA__ = Object.freeze({
    ...prev,
    general,
    packs,
    lookup,
    lookupDynamic,
    count: Number(prev.count || 0) + added,
    dynamicRuleCount
  });
})();
