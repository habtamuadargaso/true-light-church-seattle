import "server-only";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Server-side authorization gate for /admin pages. Redirects to the login
 * screen unless the current session belongs to an allowlisted admin
 * (checked via admin_users, not just "is logged in") — this is the real
 * enforcement; the middleware redirect is only a first-pass convenience.
 */
export async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    redirect("/admin/login?reason=not-configured");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: adminRow } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!adminRow) {
    redirect("/admin/login?reason=not-authorized");
  }

  return { supabase, user };
}
