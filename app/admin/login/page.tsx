import type { Metadata } from "next";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

const REASON_MESSAGES: Record<string, string> = {
  "not-authorized": "That account is signed in but is not an admin on this site.",
  "not-configured": "Supabase is not configured yet — set the environment variables first.",
};

interface LoginPageProps {
  searchParams: Promise<{ next?: string; reason?: string }>;
}

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const { next, reason } = await searchParams;
  const configured = isSupabaseConfigured();
  const message = reason ? REASON_MESSAGES[reason] : null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-6">
      <div className="w-full max-w-sm rounded-2xl border border-navy/10 bg-white p-8 shadow-sm">
        <h1 className="mb-1 font-serif text-2xl font-bold text-navy">Admin Sign In</h1>
        <p className="mb-6 text-sm text-slate-500">True Light International Evangelical Church</p>

        {message && (
          <p className="mb-6 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-800">{message}</p>
        )}

        {configured ? (
          <LoginForm next={next && next.startsWith("/admin") ? next : "/admin"} />
        ) : (
          <p className="rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-600">
            Set <code className="font-mono text-xs">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code className="font-mono text-xs">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to enable admin login.
          </p>
        )}
      </div>
    </div>
  );
}
