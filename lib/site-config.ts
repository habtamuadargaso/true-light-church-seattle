interface CalendarEventOptions {
  title: string;
  location: string;
  details: string;
  startDate: string; // YYYYMMDD, an anchor occurrence
  startTime: string; // HH:MM 24h
  endTime: string; // HH:MM 24h
  byDay: "SU" | "MO" | "TU" | "WE" | "TH" | "FR" | "SA";
}

/**
 * Builds a Google Calendar "add event" link with a weekly recurrence rule,
 * anchored to one real occurrence of the service.
 */
export function buildRecurringCalendarUrl({
  title,
  location,
  details,
  startDate,
  startTime,
  endTime,
  byDay,
}: CalendarEventOptions): string {
  const start = `${startDate}T${startTime.replace(":", "")}00`;
  const end = `${startDate}T${endTime.replace(":", "")}00`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${start}/${end}`,
    details,
    location,
    ctz: "America/Los_Angeles",
    recur: `RRULE:FREQ=WEEKLY;BYDAY=${byDay}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export const siteConfig = {
  name: "True Light International Evangelical Church",
  shortName: "True Light Church",
  // TODO: replace with the real production domain before deploying
  url: "https://www.truelightseattle.org",
  description:
    "True Light International Evangelical Church is a warm, welcoming church family in Shoreline/Seattle, WA, led by Pastor Derge Gadafa, devoted to worship, prayer, and the teaching of God's Word.",
  city: "Shoreline, Washington",
  pastor: "Pastor Derge Gadafa",
  address: {
    street: "15211 15th Ave NE",
    city: "Shoreline",
    state: "WA",
    zip: "98155",
    full: "15211 15th Ave NE, Shoreline, WA 98155",
  },
  directionsUrl:
    "https://www.google.com/maps/search/?api=1&query=15211+15th+Ave+NE%2C+Shoreline%2C+WA+98155",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=15211+15th+Ave+NE,+Shoreline,+WA+98155&output=embed",
  social: {
    // TODO: replace with the church's real social profile URLs
    facebook: "#",
    instagram: "#",
    youtube: "#",
  },
  // TODO: replace with the real donation platform link (Tithe.ly, Pushpay, Give.church, etc.)
  givingUrl: "#",
};

export const calendarLinks = {
  sundayWorship: buildRecurringCalendarUrl({
    title: "Sunday Worship Service — True Light International Evangelical Church",
    location: siteConfig.address.full,
    details: "Weekly Sunday Worship Service at True Light International Evangelical Church.",
    startDate: "20260712",
    startTime: "13:30",
    endTime: "15:00",
    byDay: "SU",
  }),
  bibleStudy: buildRecurringCalendarUrl({
    title: "Bible Study — True Light International Evangelical Church",
    location: siteConfig.address.full,
    details: "Weekly Thursday Bible Study at True Light International Evangelical Church.",
    startDate: "20260709",
    startTime: "18:00",
    endTime: "19:00",
    byDay: "TH",
  }),
};
