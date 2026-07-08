"use client";

import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

export type Language = "en" | "am";

type TranslationMap = Record<string, string>;

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, TranslationMap> = {
  en: {
    "nav.about": "About",
    "nav.services": "Services",
    "nav.ministries": "Ministries",
    "nav.sermons": "Sermons",
    "nav.events": "Events",
    "nav.gallery": "Gallery",
    "nav.visit": "Visit",
    "nav.contact": "Contact",
    "nav.planVisit": "Plan Your Visit",
    "nav.language": "አማርኛ",

    "hero.location": "Shoreline, Washington",
    "hero.title": "True Light International\nEvangelical Church",
    "hero.subtitle": "A house of prayer and family of faith, walking together in the light of Christ — right here in Seattle.",
    "hero.visit": "Plan Your Visit",
    "hero.sermons": "Watch a Sermon",

    "about.eyebrow": "Who We Are",
    "about.title": "A Church Family Rooted in Christ's Light",
    "about.description": "True Light International Evangelical Church is a welcoming, multicultural congregation in Seattle devoted to worship, prayer, and the teaching of God's Word. We believe every person who walks through our doors is family — whether you've followed Jesus for decades or are just beginning to explore faith.",
    "about.leadership": "Under the leadership of {pastor}, our church exists to help people know Christ, grow in faith, and shine His light into our city and beyond.",
    "about.stat1": "Years of Ministry",
    "about.stat2": "Active ministries",
    "about.stat3": "Weekly services",

    "services.eyebrow": "Join Us",
    "services.title": "Worship Service Times",
    "services.description": "Every service is a time to worship, learn, and connect as a family.",
    "services.sunday": "Sunday Worship",
    "services.sundayDay": "Every Sunday",
    "services.bibleStudy": "Bible Study",
    "services.bibleStudyDay": "Every Thursday",
    "services.addCalendar": "+ Add to Google Calendar",

    "ministries.eyebrow": "Get Involved",
    "ministries.title": "Our Ministries",
    "ministries.description": "There's a place for everyone to serve, grow, and belong.",
    "ministries.learnMore": "Learn More",
    "ministries.worship.title": "Worship Ministry",
    "ministries.worship.desc": "Leading the congregation in heartfelt worship through music and song.",
    "ministries.youth.title": "Youth Ministry",
    "ministries.youth.desc": "Guiding the next generation in faith, purpose, and community.",
    "ministries.prayer.title": "Prayer Ministry",
    "ministries.prayer.desc": "Standing together in prayer for our church, city, and world.",
    "ministries.bible.title": "Bible Study",
    "ministries.bible.desc": "Growing in God's Word through weekly study and discussion.",
    "ministries.children.title": "Children's Ministry",
    "ministries.children.desc": "Nurturing young hearts with age-appropriate biblical teaching.",
    "ministries.outreach.title": "Outreach Ministry",
    "ministries.outreach.desc": "Serving our neighbors and sharing Christ's love beyond our walls.",

    "sermons.eyebrow": "Sermons & Media",
    "sermons.title": "Latest Messages",
    "sermons.description": "Listen to sermons from Pastor Derge Gadafa and grow in faith.",
    "sermons.videoSoon": "Video coming soon",
    "sermons.videoPlaceholder": "Video Placeholder",
    "sermons.featured": "Featured Message",
    "sermons.speaker": "Speaker",
    "sermons.date": "Date",
    "sermons.watchFull": "Watch Full Sermon",
    "sermons.recent": "Recent Sermons",
    "sermons.watchAll": "Watch All Sermons",

    "gallery.eyebrow": "Photo Gallery",
    "gallery.title": "Our Church Family",
    "gallery.description": "Celebrating moments of worship, fellowship, and ministry.",
    "gallery.all": "All",
    "gallery.worship": "Worship",
    "gallery.community": "Community",
    "gallery.church": "Church",
    "gallery.leadership": "Leadership",
    "gallery.ministry": "Ministry",
    "gallery.alt.worship1": "Worship team in action",
    "gallery.alt.worship2": "Worship service",
    "gallery.alt.congregation1": "Congregation worshipping together",
    "gallery.alt.congregation2": "Church family gathering",
    "gallery.alt.buildingDay": "Church building during daytime",
    "gallery.alt.buildingSunset": "Church building at sunset",
    "gallery.alt.pastor": "Pastor Derge Gadafa",
    "gallery.alt.womens": "Women's ministry gathering",

    "events.eyebrow": "Coming Up",
    "events.title": "Church Events",
    "events.description": "Join us for special gatherings, celebrations, and community events.",
    "events.location": "Location",
    "events.viewAll": "View All Events",

    "mission.eyebrow": "Our Foundation",
    "mission.title": "Called to Shine as the True Light",
    "mission.missionTitle": "Our Mission",
    "mission.missionText": "To help people know Christ, grow in faith, and shine His light into our city and beyond.",
    "mission.visionTitle": "Our Vision",
    "mission.visionText": "A thriving, Christ-centered church family that transforms lives and transforms Seattle through the power of God's Word.",
    "mission.scripture": "\"I have come into the world as a light, so that no one who believes in me should stay in darkness.\"",
    "mission.reference": "— John 12:46",

    "giving.eyebrow": "Support Our Ministry",
    "giving.title": "Give Generously",
    "giving.description": "Your faithful giving strengthens our ministry and extends God's kingdom.",
    "giving.onlineTitle": "Online Giving",
    "giving.onlineDesc": "Give securely through our online giving platform. Fast, easy, and convenient.",
    "giving.personTitle": "In Person",
    "giving.personDesc": "Give at our offering during Sunday Worship Service or speak to a team member.",
    "giving.mailTitle": "By Mail",
    "giving.mailDesc": "Send your gift to: True Light Church, 15211 15th Ave NE, Shoreline, WA 98155",
    "giving.impact": "Every gift, no matter the size, makes a difference in our church and community.",
    "giving.button": "Give Online",
    "giving.comingSoon": "Giving Link Coming Soon",

    "visit.eyebrow": "Plan Your Visit",
    "visit.title": "Visit Us In Person",
    "visit.description": "We'd love to welcome you to our church family.",
    "visit.location": "Our Location",
    "visit.directions": "Get Directions",
    "visit.times": "Service Times",
    "visit.sunday": "Sunday Worship",
    "visit.sundayTime": "Every Sunday, 1:30 – 3:00 PM",
    "visit.bible": "Bible Study",
    "visit.bibleTime": "Every Thursday, 6:00 PM",
    "visit.expect": "What to Expect",
    "visit.warm": "Warm, welcoming atmosphere",
    "visit.worship": "Engaging worship and prayer",
    "visit.teaching": "Biblical teaching and study",
    "visit.fellowship": "Friendly community and fellowship",
    "visit.parking": "Ample parking available",

    "contact.eyebrow": "Get In Touch",
    "contact.title": "Contact Us",
    "contact.description": "Have a question? We'd love to hear from you.",
    "contact.reach": "Reach Out",
    "contact.message": "Whether you have questions about our services, want to get involved, or simply want to connect, we're here to help.",
    "contact.address": "Address",
    "contact.times": "Service Times",
    "contact.social": "Social Media",
    "contact.socialComingSoon": "Coming Soon",
    "contact.name": "Full Name",
    "contact.namePlaceholder": "Your name",
    "contact.email": "Email Address",
    "contact.phone": "Phone Number (optional)",
    "contact.phonePlaceholder": "(555) 123-4567",
    "contact.formMessage": "Message",
    "contact.messagePlaceholder": "Your message...",
    "contact.success": "✓ Thank you! We'll get back to you soon.",
    "contact.error": "✕ Something went wrong. Please try again.",
    "contact.sending": "Sending...",
    "contact.submit": "Send Message",

    "footer.tagline": "A church family in Shoreline devoted to worship, prayer, and the teaching of God's Word.",
    "footer.quickLinks": "Quick Links",
    "footer.ministry": "Ministry",
    "footer.times": "Service Times",
    "footer.sunday": "Sunday",
    "footer.thursday": "Thursday",
    "footer.copyright": "© {year} True Light International Evangelical Church. All rights reserved.",
  },
  am: {
    "nav.about": "ስለ እኛ",
    "nav.services": "የአገልግሎት ሰዓቶች",
    "nav.ministries": "አገልግሎቶች",
    "nav.sermons": "ስብከቶች",
    "nav.events": "ዝግጅቶች",
    "nav.gallery": "ፎቶ ማዕከል",
    "nav.visit": "ይጎብኙን",
    "nav.contact": "ያግኙን",
    "nav.planVisit": "ጉብኝትዎን ያቅዱ",
    "nav.language": "English",

    "hero.location": "Shoreline, Washington",
    "hero.title": "እውነተኛ ብርሃን ዓለም አቀፍ\nወንጌላዊ ቤተ ክርስቲያን",
    "hero.subtitle": "በሲያትል አካባቢ በክርስቶስ ብርሃን አብረን የምንጓዝ፣ የጸሎት ቤት እና የእምነት ቤተሰብ።",
    "hero.visit": "ጉብኝትዎን ያቅዱ",
    "hero.sermons": "ስብከት ይመልከቱ",

    "about.eyebrow": "ማን ነን",
    "about.title": "በክርስቶስ ብርሃን የተመሠረተ የቤተ ክርስቲያን ቤተሰብ",
    "about.description": "እውነተኛ ብርሃን ዓለም አቀፍ ወንጌላዊ ቤተ ክርስቲያን በShoreline/Seattle አካባቢ የሚገኝ፣ ለአምልኮ፣ ለጸሎት እና ለእግዚአብሔር ቃል ትምህርት የተወሰነ ሞቅ ያለ የእምነት ቤተሰብ ነው። በቤታችን የሚገባ ሁሉ እንደ ቤተሰብ ይቀበላል።",
    "about.leadership": "በ{pastor} መሪነት፣ ቤተ ክርስቲያናችን ሰዎች ክርስቶስን እንዲያውቁ፣ በእምነት እንዲያድጉ እና ብርሃኑን በከተማችን እና ከዚያ በላይ እንዲያበሩ ይረዳል።",
    "about.stat1": "የአገልግሎት ዓመታት",
    "about.stat2": "ንቁ አገልግሎቶች",
    "about.stat3": "ሳምንታዊ አገልግሎቶች",

    "services.eyebrow": "ከእኛ ጋር ይቀላቀሉ",
    "services.title": "የአምልኮ አገልግሎት ሰዓቶች",
    "services.description": "እያንዳንዱ አገልግሎት የአምልኮ፣ የትምህርት እና የህብረት ጊዜ ነው።",
    "services.sunday": "የእሁድ አምልኮ",
    "services.sundayDay": "በየእሁዱ",
    "services.bibleStudy": "የመጽሐፍ ቅዱስ ጥናት",
    "services.bibleStudyDay": "በየሐሙሱ",
    "services.addCalendar": "+ ወደ Google Calendar ያክሉ",

    "ministries.eyebrow": "ተሳትፎ",
    "ministries.title": "አገልግሎቶቻችን",
    "ministries.description": "ለሁሉም ለማገልገል፣ ለማደግ እና ለመቀላቀል ቦታ አለ።",
    "ministries.learnMore": "ተጨማሪ ይወቁ",
    "ministries.worship.title": "የአምልኮ አገልግሎት",
    "ministries.worship.desc": "በመዝሙርና በሙዚቃ ልባዊ አምልኮን መምራት።",
    "ministries.youth.title": "የወጣቶች አገልግሎት",
    "ministries.youth.desc": "ቀጣዩን ትውልድ በእምነት፣ በዓላማ እና በህብረት መመራት።",
    "ministries.prayer.title": "የጸሎት አገልግሎት",
    "ministries.prayer.desc": "ለቤተ ክርስቲያናችን፣ ለከተማችን እና ለዓለም በጸሎት መቆም።",
    "ministries.bible.title": "የመጽሐፍ ቅዱስ ጥናት",
    "ministries.bible.desc": "በሳምንታዊ ጥናትና ውይይት በእግዚአብሔር ቃል ማደግ።",
    "ministries.children.title": "የሕፃናት አገልግሎት",
    "ministries.children.desc": "ለሕፃናት በእድሜያቸው የሚስማማ የመጽሐፍ ቅዱስ ትምህርት መስጠት።",
    "ministries.outreach.title": "የወንጌል ስርጭት አገልግሎት",
    "ministries.outreach.desc": "ጎረቤቶቻችንን ማገልገል እና የክርስቶስን ፍቅር ማካፈል።",

    "sermons.eyebrow": "ስብከቶች እና ሚዲያ",
    "sermons.title": "የቅርብ ጊዜ መልእክቶች",
    "sermons.description": "ከPastor Derge Gadafa ስብከቶችን ያዳምጡ እና በእምነት ያድጉ።",
    "sermons.videoSoon": "ቪዲዮ በቅርቡ ይመጣል",
    "sermons.videoPlaceholder": "የቪዲዮ ቦታ",
    "sermons.featured": "የተመረጠ መልእክት",
    "sermons.speaker": "ተናጋሪ",
    "sermons.date": "ቀን",
    "sermons.watchFull": "ሙሉ ስብከት ይመልከቱ",
    "sermons.recent": "የቅርብ ጊዜ ስብከቶች",
    "sermons.watchAll": "ሁሉንም ስብከቶች ይመልከቱ",

    "gallery.eyebrow": "ፎቶ ማዕከል",
    "gallery.title": "የቤተ ክርስቲያናችን ቤተሰብ",
    "gallery.description": "የአምልኮ፣ የህብረት እና የአገልግሎት ቆንጆ ጊዜያት።",
    "gallery.all": "ሁሉም",
    "gallery.worship": "አምልኮ",
    "gallery.community": "ህብረት",
    "gallery.church": "ቤተ ክርስቲያን",
    "gallery.leadership": "መሪነት",
    "gallery.ministry": "አገልግሎት",
    "gallery.alt.worship1": "የአምልኮ ቡድን",
    "gallery.alt.worship2": "የአምልኮ አገልግሎት",
    "gallery.alt.congregation1": "ምዕመናን በአንድነት ሲያመልኩ",
    "gallery.alt.congregation2": "የቤተ ክርስቲያን ቤተሰብ ስብሰባ",
    "gallery.alt.buildingDay": "የቤተ ክርስቲያን ሕንፃ በቀን",
    "gallery.alt.buildingSunset": "የቤተ ክርስቲያን ሕንፃ በፀሐይ መጥለቅ",
    "gallery.alt.pastor": "Pastor Derge Gadafa",
    "gallery.alt.womens": "የሴቶች አገልግሎት ስብሰባ",

    "events.eyebrow": "በቅርቡ",
    "events.title": "የቤተ ክርስቲያን ዝግጅቶች",
    "events.description": "ለልዩ ስብሰባዎች፣ የህብረት ጊዜያት እና የማህበረሰብ ዝግጅቶች ይቀላቀሉን።",
    "events.location": "ቦታ",
    "events.viewAll": "ሁሉንም ዝግጅቶች ይመልከቱ",

    "mission.eyebrow": "መሠረታችን",
    "mission.title": "እንደ እውነተኛ ብርሃን እንድንበራ ተጠርተናል",
    "mission.missionTitle": "ተልእኮአችን",
    "mission.missionText": "ሰዎች ክርስቶስን እንዲያውቁ፣ በእምነት እንዲያድጉ እና ብርሃኑን በከተማችን እና ከዚያ በላይ እንዲያበሩ መርዳት።",
    "mission.visionTitle": "ራእያችን",
    "mission.visionText": "በክርስቶስ የተመሠረተ፣ ሕይወትን የሚለውጥ እና ሲያትልን በእግዚአብሔር ቃል ኃይል የሚያገለግል የቤተ ክርስቲያን ቤተሰብ።",
    "mission.scripture": "\"በእኔ የሚያምን ሁሉ በጨለማ እንዳይኖር እኔ ብርሃን ሆኜ ወደ ዓለም መጥቻለሁ።\"",
    "mission.reference": "— ዮሐንስ 12:46",

    "giving.eyebrow": "አገልግሎታችንን ይደግፉ",
    "giving.title": "በልግስና ይስጡ",
    "giving.description": "ታማኝ ስጦታዎ አገልግሎታችንን ያጠናክራል እና የእግዚአብሔርን መንግሥት ያስፋፋል።",
    "giving.onlineTitle": "የመስመር ላይ ስጦታ",
    "giving.onlineDesc": "በደህንነት በመስመር ላይ ይስጡ። ፈጣን፣ ቀላል እና ምቹ ነው።",
    "giving.personTitle": "በአካል",
    "giving.personDesc": "በእሁድ አምልኮ ጊዜ ወይም ከቡድን አባል ጋር በመነጋገር መስጠት ይችላሉ።",
    "giving.mailTitle": "በፖስታ",
    "giving.mailDesc": "ስጦታዎን ወደ True Light Church, 15211 15th Ave NE, Shoreline, WA 98155 ይላኩ።",
    "giving.impact": "ማንኛውም ስጦታ በቤተ ክርስቲያናችን እና በማህበረሰባችን ላይ ለውጥ ያመጣል።",
    "giving.button": "በመስመር ላይ ይስጡ",
    "giving.comingSoon": "የስጦታ አገናኝ በቅርቡ",

    "visit.eyebrow": "ጉብኝትዎን ያቅዱ",
    "visit.title": "በአካል ይጎብኙን",
    "visit.description": "ወደ ቤተ ክርስቲያናችን ቤተሰብ ልንቀበልዎ ደስ ይለናል።",
    "visit.location": "ቦታችን",
    "visit.directions": "አቅጣጫ ያግኙ",
    "visit.times": "የአገልግሎት ሰዓቶች",
    "visit.sunday": "የእሁድ አምልኮ",
    "visit.sundayTime": "በየእሁዱ፣ 1:30 – 3:00 PM",
    "visit.bible": "የመጽሐፍ ቅዱስ ጥናት",
    "visit.bibleTime": "በየሐሙሱ፣ 6:00 PM",
    "visit.expect": "ምን መጠበቅ ይችላሉ",
    "visit.warm": "ሞቅ ያለ የመቀበያ አካባቢ",
    "visit.worship": "አምልኮ እና ጸሎት",
    "visit.teaching": "የመጽሐፍ ቅዱስ ትምህርትና ጥናት",
    "visit.fellowship": "ወዳጅነት ያለው ህብረት",
    "visit.parking": "በቂ የመኪና ማቆሚያ አለ",

    "contact.eyebrow": "ያግኙን",
    "contact.title": "ከእኛ ጋር ይገናኙ",
    "contact.description": "ጥያቄ አለዎት? ከእርስዎ መስማት እንወዳለን።",
    "contact.reach": "ያነጋግሩን",
    "contact.message": "ስለ አገልግሎታችን ጥያቄ ካለዎት፣ መሳተፍ ከፈለጉ ወይም መገናኘት ከፈለጉ እኛ ልንረዳዎ ዝግጁ ነን።",
    "contact.address": "አድራሻ",
    "contact.times": "የአገልግሎት ሰዓቶች",
    "contact.social": "ማህበራዊ ሚዲያ",
    "contact.socialComingSoon": "በቅርቡ",
    "contact.name": "ሙሉ ስም",
    "contact.namePlaceholder": "ስምዎ",
    "contact.email": "ኢሜይል አድራሻ",
    "contact.phone": "ስልክ ቁጥር (አማራጭ)",
    "contact.phonePlaceholder": "(555) 123-4567",
    "contact.formMessage": "መልእክት",
    "contact.messagePlaceholder": "መልእክትዎ...",
    "contact.success": "✓ እናመሰግናለን! በቅርቡ እንመልስልዎታለን።",
    "contact.error": "✕ ችግኝ ተፈጥሯል። እባክዎ እንደገና ይሞክሩ።",
    "contact.sending": "በመላክ ላይ...",
    "contact.submit": "መልእክት ይላኩ",

    "footer.tagline": "በShoreline የሚገኝ፣ ለአምልኮ፣ ለጸሎት እና ለእግዚአብሔር ቃል ትምህርት የተወሰነ የቤተ ክርስቲያን ቤተሰብ።",
    "footer.quickLinks": "ፈጣን አገናኞች",
    "footer.ministry": "አገልግሎት",
    "footer.times": "የአገልግሎት ሰዓቶች",
    "footer.sunday": "እሁድ",
    "footer.thursday": "ሐሙስ",
    "footer.copyright": "© {year} እውነተኛ ብርሃን ዓለም አቀፍ ወንጌላዊ ቤተ ክርስቲያን። መብቶች ሁሉ የተጠበቁ ናቸው።",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("true-light-language") as Language | null;
    if (saved === "en" || saved === "am") setLangState(saved);
  }, []);

  const setLang = (nextLang: Language) => {
    setLangState(nextLang);
    window.localStorage.setItem("true-light-language", nextLang);
    document.documentElement.lang = nextLang === "am" ? "am" : "en";
  };

  const value = useMemo<LanguageContextType>(() => {
    const t = (key: string, replacements?: Record<string, string | number>) => {
      let text = translations[lang][key] || translations.en[key] || key;
      if (replacements) {
        Object.entries(replacements).forEach(([name, value]) => {
          text = text.replaceAll(`{${name}}`, String(value));
        });
      }
      return text;
    };
    return { lang, setLang, toggleLanguage: () => setLang(lang === "en" ? "am" : "en"), t };
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
