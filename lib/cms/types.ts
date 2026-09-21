// Row shapes as they exist in the database (snake_case, matches the SQL
// migration in supabase/migrations/). Kept separate from the app-facing
// view models in lib/data.ts / this file, which use the site's existing
// camelCase display shapes.

export interface SermonRow {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  series: string | null;
  youtube_url: string | null;
  speaker: string | null;
  scripture: string | null;
  sermon_date: string | null;
  language: string | null;
  published: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface EventRow {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  start_time: string | null;
  end_time: string | null;
  location: string | null;
  registration_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface GalleryItemRow {
  id: string;
  image_path: string;
  alt_text: string;
  category: string | null;
  sort_order: number;
  published: boolean;
  created_at: string;
}

export interface AnnouncementRow {
  id: string;
  title: string;
  body: string;
  starts_at: string | null;
  ends_at: string | null;
  published: boolean;
  created_at: string;
}

export interface SiteSettingRow {
  id: string;
  key: string;
  value: string | null;
  updated_at: string;
}

// Recognized site_settings keys, typed so callers can't typo a key name.
export const SITE_SETTING_KEYS = [
  "giving_url",
  "facebook_url",
  "tiktok_url",
  "youtube_channel_url",
  "church_email",
  "church_phone",
  "pastor_name",
  "pastor_title",
  "pastor_bio",
  "pastor_image_path",
] as const;

export type SiteSettingKey = (typeof SITE_SETTING_KEYS)[number];

export type SiteSettings = Record<SiteSettingKey, string | null>;

export interface AnnouncementView {
  id: string;
  title: string;
  body: string;
}

// View model the public Gallery component renders — mirrors the shape of
// the existing static galleryImages entries (src/alt/category) so the
// component can treat CMS-sourced and static-fallback items identically.
export interface GalleryViewItem {
  id: string;
  src: string;
  alt: string;
  category: string | null;
}
