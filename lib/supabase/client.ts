"use client";

import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "@/lib/supabase/config";

/**
 * Browser Supabase client, for use inside "use client" components only
 * (e.g. the admin login form). Uses the public anon key — safe to expose,
 * access is enforced by Row Level Security, not by keeping this key secret.
 */
export function createSupabaseBrowserClient() {
  if (!isSupabaseConfigured()) return null;
  return createBrowserClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);
}
