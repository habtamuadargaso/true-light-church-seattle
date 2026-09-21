import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "@/lib/supabase/config";

/**
 * Server-side Supabase client for use in Server Components, Server Actions,
 * and Route Handlers. Reads the caller's session from cookies, so RLS
 * policies (`auth.uid()`, admin_users membership, etc.) apply automatically —
 * no service-role key is used or required by this app. Returns null when
 * Supabase isn't configured so callers can fall back gracefully.
 */
export async function createSupabaseServerClient() {
  if (!isSupabaseConfigured()) return null;

  const cookieStore = await cookies();

  return createServerClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Called from a Server Component render, where cookies can't be
          // mutated. Safe to ignore — middleware refreshes the session cookie
          // on the next request instead.
        }
      },
    },
  });
}
