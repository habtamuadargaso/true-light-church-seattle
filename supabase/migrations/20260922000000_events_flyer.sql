-- Adds optional event flyer/photo support to the existing events table.
--
-- Single additive, nullable column — same shape as gallery_items.image_path
-- and site_settings.pastor_image_path (a Storage object path under the
-- existing public "media" bucket, not a URL). No RLS policy changes: the
-- existing "admins can write/update events" policies already cover every
-- column on this table, and the existing media bucket storage policies
-- already allow admin uploads to any path (events/... included) and public
-- reads of the whole bucket.

alter table public.events
  add column if not exists image_path text;
