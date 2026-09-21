-- True Light Church — Admin-managed content schema
--
-- Creates the tables backing the admin dashboard (sermons, events, gallery,
-- announcements, site_settings) plus a minimal admin_users allowlist and the
-- Row Level Security policies that make the public site read-only for
-- published content and fully editable only for allowlisted admins.
--
-- This migration does not touch any pre-existing tables.

-- ---------------------------------------------------------------------------
-- admin_users: allowlist of Supabase Auth users permitted to manage content.
-- No public policy exists on this table at all — it is only ever read via
-- the SECURITY DEFINER is_admin() helper below, and rows are added manually
-- by the site owner via the Supabase SQL editor after creating the admin's
-- login in Authentication > Users. See project README / setup notes.
-- ---------------------------------------------------------------------------
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

-- ---------------------------------------------------------------------------
-- is_admin(): true if the current session belongs to an allowlisted admin.
-- SECURITY DEFINER so it can check admin_users regardless of that table's
-- own (deliberately access-less) RLS policy, without causing recursion.
-- ---------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.admin_users where user_id = auth.uid()
  );
$$;

-- Admins may view the allowlist (e.g. a future "manage admins" screen).
create policy "admins can view admin_users"
  on public.admin_users for select
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- updated_at trigger helper, reused by every table that has the column.
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- site_settings: single-row-per-key config store for everything that used
-- to be hardcoded — giving URL, social links, pastor bio/photo, public
-- contact info. Values are non-sensitive (all are things the public site
-- may display), so reads are open; writes are admin-only.
-- ---------------------------------------------------------------------------
create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value text,
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

create policy "anyone can read site settings"
  on public.site_settings for select
  using (true);

create policy "admins can write site settings"
  on public.site_settings for all
  using (public.is_admin())
  with check (public.is_admin());

create trigger site_settings_set_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();

-- Recognized keys (informational — value column is free text so the app can
-- add new keys without a migration):
--   giving_url, facebook_url, tiktok_url, youtube_channel_url,
--   church_email, church_phone,
--   pastor_name, pastor_title, pastor_bio, pastor_image_path

-- ---------------------------------------------------------------------------
-- sermons
-- ---------------------------------------------------------------------------
create table if not exists public.sermons (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  series text,
  youtube_url text,
  speaker text,
  scripture text,
  sermon_date date,
  language text,
  published boolean not null default false,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.sermons enable row level security;

create policy "anyone can read published sermons"
  on public.sermons for select
  using (published = true);

create policy "admins can read all sermons"
  on public.sermons for select
  using (public.is_admin());

create policy "admins can write sermons"
  on public.sermons for insert
  with check (public.is_admin());

create policy "admins can update sermons"
  on public.sermons for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "admins can delete sermons"
  on public.sermons for delete
  using (public.is_admin());

create trigger sermons_set_updated_at
  before update on public.sermons
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- events
-- ---------------------------------------------------------------------------
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  event_date date not null,
  start_time time,
  end_time time,
  location text,
  registration_url text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.events enable row level security;

create policy "anyone can read published events"
  on public.events for select
  using (published = true);

create policy "admins can read all events"
  on public.events for select
  using (public.is_admin());

create policy "admins can write events"
  on public.events for insert
  with check (public.is_admin());

create policy "admins can update events"
  on public.events for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "admins can delete events"
  on public.events for delete
  using (public.is_admin());

create trigger events_set_updated_at
  before update on public.events
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- gallery_items
-- ---------------------------------------------------------------------------
create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  image_path text not null,
  alt_text text not null,
  category text,
  sort_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.gallery_items enable row level security;

create policy "anyone can read published gallery items"
  on public.gallery_items for select
  using (published = true);

create policy "admins can read all gallery items"
  on public.gallery_items for select
  using (public.is_admin());

create policy "admins can write gallery items"
  on public.gallery_items for insert
  with check (public.is_admin());

create policy "admins can update gallery items"
  on public.gallery_items for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "admins can delete gallery items"
  on public.gallery_items for delete
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- announcements
-- ---------------------------------------------------------------------------
create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  starts_at timestamptz,
  ends_at timestamptz,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.announcements enable row level security;

create policy "anyone can read published announcements"
  on public.announcements for select
  using (published = true);

create policy "admins can read all announcements"
  on public.announcements for select
  using (public.is_admin());

create policy "admins can write announcements"
  on public.announcements for insert
  with check (public.is_admin());

create policy "admins can update announcements"
  on public.announcements for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "admins can delete announcements"
  on public.announcements for delete
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Storage: a single public "media" bucket, organized by folder
-- (pastor/..., gallery/...). Public read (these are all meant to be visible
-- on the public site once the admin publishes the row referencing them);
-- writes restricted to admins.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "anyone can read media"
  on storage.objects for select
  using (bucket_id = 'media');

create policy "admins can upload media"
  on storage.objects for insert
  with check (bucket_id = 'media' and public.is_admin());

create policy "admins can update media"
  on storage.objects for update
  using (bucket_id = 'media' and public.is_admin())
  with check (bucket_id = 'media' and public.is_admin());

create policy "admins can delete media"
  on storage.objects for delete
  using (bucket_id = 'media' and public.is_admin());
