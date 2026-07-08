import { calendarLinks } from "@/lib/site-config";

export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceTime {
  name: string;
  time: string;
  day: string;
  calendarUrl: string | null;
}

export interface Ministry {
  letter: string;
  bg: string;
  fg: string;
  title: string;
  desc: string;
}

export interface Sermon {
  slug: string;
  title: string;
  speaker: string;
  date: string;
  series: string;
  description: string;
  // TODO: replace with a real YouTube/Vimeo embed URL once available
  videoUrl: string | null;
}

export interface ChurchEvent {
  month: string;
  day: string;
  title: string;
  time: string;
  location: string;
  description?: string;
}

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Ministries", href: "#ministries" },
  { label: "Sermons", href: "#sermons" },
  { label: "Events", href: "#events" },
  { label: "Visit", href: "#visit" },
  { label: "Contact", href: "#contact" },
];

export const serviceTimes: ServiceTime[] = [
  { name: "Sunday Worship", time: "1:30 – 3:00 PM", day: "Every Sunday", calendarUrl: calendarLinks.sundayWorship },
  { name: "Bible Study", time: "6:00 PM", day: "Every Thursday", calendarUrl: calendarLinks.bibleStudy },
];

export const ministries: Ministry[] = [
  {
    letter: "W",
    bg: "#0b1f3a",
    fg: "#c9a45c",
    title: "Worship Ministry",
    desc: "Leading the congregation in heartfelt worship through music and song.",
  },
  {
    letter: "Y",
    bg: "#c9a45c",
    fg: "#0b1f3a",
    title: "Youth Ministry",
    desc: "Guiding the next generation in faith, purpose, and community.",
  },
  {
    letter: "P",
    bg: "#0b1f3a",
    fg: "#c9a45c",
    title: "Prayer Ministry",
    desc: "Standing together in prayer for our church, city, and world.",
  },
  {
    letter: "B",
    bg: "#c9a45c",
    fg: "#0b1f3a",
    title: "Bible Study",
    desc: "Growing in God's Word through weekly study and discussion.",
  },
  {
    letter: "C",
    bg: "#0b1f3a",
    fg: "#c9a45c",
    title: "Children's Ministry",
    desc: "Nurturing young hearts with age-appropriate biblical teaching.",
  },
  {
    letter: "O",
    bg: "#c9a45c",
    fg: "#0b1f3a",
    title: "Outreach Ministry",
    desc: "Serving our neighbors and sharing Christ's love beyond our walls.",
  },
];

// NOTE: sample sermon library — swap in real recordings/descriptions and wire up real video links.
export const sermons: Sermon[] = [
  {
    slug: "the-true-light",
    title: "The True Light",
    speaker: "Pastor Derge Gadafa",
    date: "July 5, 2026",
    series: "Featured Message",
    description:
      "A message on walking as children of light in a world that needs hope. Full sermon video to be added.",
    videoUrl: null,
  },
  {
    slug: "walking-in-faith",
    title: "Walking in Faith",
    speaker: "Pastor Derge Gadafa",
    date: "June 28, 2026",
    series: "Sunday Worship Service",
    description: "Full sermon description to be added.",
    videoUrl: null,
  },
  {
    slug: "grace-upon-grace",
    title: "Grace Upon Grace",
    speaker: "Pastor Derge Gadafa",
    date: "June 21, 2026",
    series: "Sunday Worship Service",
    description: "Full sermon description to be added.",
    videoUrl: null,
  },
  {
    slug: "a-heart-of-gratitude",
    title: "A Heart of Gratitude",
    speaker: "Pastor Derge Gadafa",
    date: "June 14, 2026",
    series: "Sunday Worship Service",
    description: "Full sermon description to be added.",
    videoUrl: null,
  },
];

// NOTE: sample upcoming events — replace with the real calendar.
export const events: ChurchEvent[] = [
  { month: "JUL", day: "09", title: "Thursday Bible Study", time: "6:00 PM", location: "Fellowship Hall" },
  { month: "JUL", day: "12", title: "Sunday Worship Service", time: "1:30 – 3:00 PM", location: "Main Sanctuary" },
  { month: "JUL", day: "25", title: "Community Outreach Day", time: "9:00 AM", location: "Church Grounds" },
];
