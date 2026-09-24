export interface Sermon {
  slug: string;
  title: string;
  speaker: string;
  date: string;
  series: string;
  description: string;
  // Full YouTube watch/share URL (youtube.com/watch?v=... or youtu.be/...).
  youtubeUrl: string | null;
  // Optional scripture reference, e.g. "John 12:46".
  scripture?: string;
  // Optional free-text language label set by admins (e.g. "English",
  // "Amharic") — used to power the /sermons language filter when present.
  language?: string;
}

// The `series` value that marks a sermon as a Sunday Worship Service for
// the homepage's dedicated section (lib/cms/queries.ts#getSundayWorshipService).
// Reuses the existing free-text `series` field already on the sermons
// table/form instead of adding a new category column.
export const SUNDAY_WORSHIP_SERVICE_SERIES = "Sunday Worship Service";

export interface ChurchEvent {
  month: string;
  day: string;
  title: string;
  time: string;
  location: string;
  description?: string;
  registrationUrl?: string;
  // Public Storage URL for an uploaded flyer/photo, or null if none was set.
  imageUrl?: string | null;
}

// No real recorded messages have been published yet. The homepage Sermons
// section and /sermons pages render an honest "coming soon" state whenever
// this array is empty — add real entries here (with a real `youtubeUrl`)
// as recordings become available. Example entry:
//   {
//     slug: "the-true-light",
//     title: "The True Light",
//     speaker: "Pastor Dereje Gadafa",
//     date: "July 5, 2026",
//     series: "Sunday Worship Service",
//     description: "...",
//     youtubeUrl: "https://www.youtube.com/watch?v=XXXXXXXXXXX",
//     scripture: "John 12:46",
//   },
export const sermons: Sermon[] = [];

// No verified upcoming special events at this time (Sunday Worship and
// Thursday Bible Study are recurring weekly services — see `serviceTimes`
// above, not one-off events). The homepage Events section renders an honest
// empty state whenever this array is empty. Add real, dated events here as
// they're scheduled.
export const events: ChurchEvent[] = [];
