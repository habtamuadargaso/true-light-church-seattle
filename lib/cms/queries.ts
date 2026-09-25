import "server-only";

import { createSupabasePublicClient } from "@/lib/supabase/public";
import {
  sermons as fallbackSermons,
  events as fallbackEvents,
  SUNDAY_WORSHIP_SERVICE_SERIES,
  type Sermon,
  type ChurchEvent,
} from "@/lib/data";
import type {
  AnnouncementRow,
  AnnouncementView,
  EventRow,
  GalleryItemRow,
  GalleryViewItem,
  SermonRow,
  SiteSettingRow,
  SiteSettings,
} from "@/lib/cms/types";
import { SITE_SETTING_KEYS } from "@/lib/cms/types";
import { fallbackGalleryCaption, isNonDescriptiveCaption } from "@/lib/cms/gallery-shared";

const EMPTY_SETTINGS: SiteSettings = Object.fromEntries(
  SITE_SETTING_KEYS.map((key) => [key, null])
) as SiteSettings;

function formatSermonDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const date = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function mapSermonRow(row: SermonRow): Sermon {
  return {
    slug: row.slug,
    title: row.title,
    speaker: row.speaker ?? "",
    date: formatSermonDate(row.sermon_date),
    series: row.series ?? "",
    description: row.description ?? "",
    youtubeUrl: row.youtube_url,
    scripture: row.scripture ?? undefined,
    language: row.language ?? undefined,
  };
}

/**
 * Published sermons, most relevant first (featured, then most recent).
 * Falls back to the static (currently empty) list in lib/data.ts if
 * Supabase isn't configured or the query fails, so the public Sermons
 * section always renders — worst case, its honest "coming soon" state.
 */
export async function getSermons(): Promise<Sermon[]> {
  const supabase = createSupabasePublicClient();
  if (!supabase) return fallbackSermons;

  const { data, error } = await supabase
    .from("sermons")
    .select("*")
    .eq("published", true)
    .order("featured", { ascending: false })
    .order("sermon_date", { ascending: false, nullsFirst: false });

  if (error || !data) return fallbackSermons;
  return data.map(mapSermonRow);
}

/**
 * The newest published sermon tagged as a Sunday Worship Service, for the
 * homepage's dedicated section. Matches the existing free-text `series`
 * field case-insensitively against SUNDAY_WORSHIP_SERVICE_SERIES — no new
 * column/table was needed. Returns null (never a fake/sample entry) if
 * Supabase isn't configured, the query fails, or none has been published.
 */
export async function getSundayWorshipService(): Promise<Sermon | null> {
  const supabase = createSupabasePublicClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("sermons")
    .select("*")
    .eq("published", true)
    .ilike("series", SUNDAY_WORSHIP_SERVICE_SERIES)
    .order("sermon_date", { ascending: false, nullsFirst: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) return null;
  return mapSermonRow(data);
}

/** A single published sermon by slug, for the /sermons/[slug] detail page. */
export async function getSermonBySlug(slug: string): Promise<Sermon | null> {
  const supabase = createSupabasePublicClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("sermons")
    .select("*")
    .eq("published", true)
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return null;
  return mapSermonRow(data);
}

function formatEventTime(row: EventRow): string {
  const format = (value: string) => {
    const [hours, minutes] = value.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  };
  if (row.start_time && row.end_time) return `${format(row.start_time)} – ${format(row.end_time)}`;
  if (row.start_time) return format(row.start_time);
  return "";
}

function mapEventRow(row: EventRow, imageUrl: string | null): ChurchEvent {
  const date = new Date(`${row.event_date}T00:00:00`);
  return {
    month: Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    day: Number.isNaN(date.getTime()) ? "" : String(date.getDate()).padStart(2, "0"),
    title: row.title,
    time: formatEventTime(row),
    location: row.location ?? "",
    description: row.description ?? undefined,
    registrationUrl: row.registration_url ?? undefined,
    imageUrl,
  };
}

/**
 * Published, upcoming (today or later) events, soonest first. Falls back to
 * the static (currently empty) list in lib/data.ts if Supabase isn't
 * configured or the query fails.
 */
export async function getEvents(): Promise<ChurchEvent[]> {
  const supabase = createSupabasePublicClient();
  if (!supabase) return fallbackEvents;

  // The church's local date (not UTC, which rolls over at 5 PM Pacific and
  // would hide that evening's events early). en-CA formats as YYYY-MM-DD.
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Los_Angeles" }).format(new Date());
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("published", true)
    .gte("event_date", today)
    .order("event_date", { ascending: true })
    .order("start_time", { ascending: true, nullsFirst: false });

  if (error || !data) return fallbackEvents;
  return (data as EventRow[]).map((row) => {
    const imageUrl = row.image_path ? supabase.storage.from("media").getPublicUrl(row.image_path).data.publicUrl : null;
    return mapEventRow(row, imageUrl);
  });
}

/**
 * Published gallery photos in admin-defined order. Returns null (rather
 * than an empty array) when Supabase isn't configured, the query fails, or
 * there are simply no published rows yet — callers should treat null as
 * "use the static fallback gallery" per the migration-safety requirement,
 * distinct from an admin deliberately publishing zero photos being
 * indistinguishable from that fallback state.
 */
export async function getGalleryItems(): Promise<GalleryViewItem[] | null> {
  const supabase = createSupabasePublicClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("gallery_items")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) return null;

  return (data as GalleryItemRow[]).map((row) => {
    const { data: publicUrl } = supabase.storage.from("media").getPublicUrl(row.image_path);
    return {
      id: row.id,
      src: publicUrl.publicUrl,
      // Rows uploaded before the alt-text fallback improved (or edited to a
      // raw filename by hand) shouldn't expose that filename to visitors —
      // fall back to the category instead of leaving it unfixed until an
      // admin manually edits every photo.
      alt: isNonDescriptiveCaption(row.alt_text) ? fallbackGalleryCaption(row.category) : row.alt_text,
      category: row.category,
    };
  });
}

/**
 * All site_settings as a fully-keyed object (missing keys default to null).
 * Non-sensitive by design — safe to read publicly (giving URL, social
 * links, pastor bio, public contact info).
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = createSupabasePublicClient();
  if (!supabase) return EMPTY_SETTINGS;

  const { data, error } = await supabase.from("site_settings").select("*");
  if (error || !data) return EMPTY_SETTINGS;

  const settings = { ...EMPTY_SETTINGS };
  for (const row of data as SiteSettingRow[]) {
    if ((SITE_SETTING_KEYS as readonly string[]).includes(row.key)) {
      settings[row.key as keyof SiteSettings] = row.value;
    }
  }
  return settings;
}

/** Resolves a stored pastor_image_path to a public Storage URL, if set. */
export function getPastorImageUrl(settings: SiteSettings): string | null {
  if (!settings.pastor_image_path) return null;
  const supabase = createSupabasePublicClient();
  if (!supabase) return null;
  return supabase.storage.from("media").getPublicUrl(settings.pastor_image_path).data.publicUrl;
}

/** The single most relevant currently-active published announcement, if any. */
export async function getActiveAnnouncement(): Promise<AnnouncementView | null> {
  const supabase = createSupabasePublicClient();
  if (!supabase) return null;

  const nowIso = new Date().toISOString();
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .eq("published", true)
    .or(`starts_at.is.null,starts_at.lte.${nowIso}`)
    .or(`ends_at.is.null,ends_at.gte.${nowIso}`)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) return null;
  const row = data as AnnouncementRow;
  return { id: row.id, title: row.title, body: row.body };
}
