import "server-only";

import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "@/lib/supabase/config";

/**
 * Stateless Supabase client for anonymous public reads (sermons, events,
 * gallery, site settings, announcements). Unlike lib/supabase/server.ts,
 * this does NOT touch cookies — it's safe to call from anywhere, including
 * generateStaticParams (which runs at build time, outside request scope)
 * and static/ISR-rendered pages. Public reads never need a user session:
 * RLS's `published = true` policy applies to the anon role either way.
 */
export function createSupabasePublicClient() {
  if (!isSupabaseConfigured()) return null;
  return createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    auth: { persistSession: false },
  });
}
