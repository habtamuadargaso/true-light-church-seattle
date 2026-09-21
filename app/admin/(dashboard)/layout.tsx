import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/cms/admin-auth";
import { signOutAction } from "@/lib/cms/actions/auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { template: "%s | Admin", default: "Admin" },
  robots: { index: false, follow: false },
};

const NAV_ITEMS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/sermons", label: "Sermons" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/pastor", label: "Pastor" },
  { href: "/admin/social", label: "Social Links" },
  { href: "/admin/giving", label: "Giving" },
  { href: "/admin/contact", label: "Contact Info" },
  { href: "/admin/announcements", label: "Announcements" },
];

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireAdmin();

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-slate-200 bg-white sm:flex">
        <div className="border-b border-slate-200 px-5 py-5">
          <p className="font-serif text-lg font-bold text-navy">True Light</p>
          <p className="text-xs text-slate-500">Admin Dashboard</p>
        </div>
        <nav className="flex-1 space-y-0.5 px-3 py-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-navy"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-slate-200 px-5 py-4">
          <p className="mb-2 truncate text-xs text-slate-500">{user.email}</p>
          <form action={signOutAction}>
            <button
              type="submit"
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-left text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <div className="flex-1">
        <header className="border-b border-slate-200 bg-white sm:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <p className="font-serif text-base font-bold text-navy">True Light Admin</p>
            <form action={signOutAction}>
              <button type="submit" className="text-sm font-medium text-slate-600">
                Sign out
              </button>
            </form>
          </div>
          <nav className="flex gap-1 overflow-x-auto px-4 pb-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-10">{children}</main>
      </div>
    </div>
  );
}
