import Link from "next/link";
import type { Metadata } from "next";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AdminCard, AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata: Metadata = { title: "Overview" };

async function getCounts() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const [sermons, events, gallery, announcements] = await Promise.all([
    supabase.from("sermons").select("id, published"),
    supabase.from("events").select("id, published"),
    supabase.from("gallery_items").select("id, published"),
    supabase.from("announcements").select("id, published"),
  ]);

  const summarize = (rows: { published: boolean }[] | null) => ({
    total: rows?.length ?? 0,
    published: rows?.filter((r) => r.published).length ?? 0,
  });

  return {
    sermons: summarize(sermons.data),
    events: summarize(events.data),
    gallery: summarize(gallery.data),
    announcements: summarize(announcements.data),
  };
}

const SECTIONS = [
  { key: "sermons", label: "Sermons", href: "/admin/sermons" },
  { key: "events", label: "Events", href: "/admin/events" },
  { key: "gallery", label: "Gallery Photos", href: "/admin/gallery" },
  { key: "announcements", label: "Announcements", href: "/admin/announcements" },
] as const;

const QUICK_LINKS = [
  { href: "/admin/pastor", label: "Pastor info & photo" },
  { href: "/admin/social", label: "Social links" },
  { href: "/admin/giving", label: "Giving link" },
  { href: "/admin/contact", label: "Public contact info" },
];

export default async function AdminOverviewPage() {
  const counts = await getCounts();

  return (
    <div>
      <AdminPageHeader
        title="Overview"
        description="What's live on the public site right now."
      />

      {!counts ? (
        <AdminCard>
          <p className="text-sm text-slate-500">
            Supabase isn&apos;t configured, so there&apos;s no content to summarize yet.
          </p>
        </AdminCard>
      ) : (
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {SECTIONS.map((section) => {
            const c = counts[section.key];
            return (
              <Link key={section.key} href={section.href}>
                <AdminCard className="transition-shadow hover:shadow-md">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {section.label}
                  </p>
                  <p className="mt-2 font-serif text-3xl font-bold text-navy">{c.published}</p>
                  <p className="text-xs text-slate-400">published of {c.total} total</p>
                </AdminCard>
              </Link>
            );
          })}
        </div>
      )}

      <AdminCard>
        <h2 className="mb-3 text-sm font-semibold text-slate-700">Site settings</h2>
        <ul className="space-y-2 text-sm">
          {QUICK_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-navy underline underline-offset-2 hover:text-gold-deep">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </AdminCard>
    </div>
  );
}
