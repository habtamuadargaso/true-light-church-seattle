export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * True once a Supabase project is actually wired up via env vars.
 * Every CMS read/write path checks this first so the site (and `next build`)
 * work correctly with zero Supabase configuration — the public site simply
 * falls back to its static/empty defaults, and admin routes show a setup
 * notice instead of crashing.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}
