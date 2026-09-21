import Link from "next/link";
import type { Metadata } from "next";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AdminCard, AdminPageHeader, StatusBadge } from "@/components/admin/AdminPageHeader";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteAnnouncementAction } from "@/lib/cms/actions/announcements";
import type { AnnouncementRow } from "@/lib/cms/types";

export const metadata: Metadata = { title: "Announcements" };

async function getAnnouncements(): Promise<AnnouncementRow[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];
  const { data } = await supabase.from("announcements").select("*").order("created_at", { ascending: false });
  return data ?? [];
}

export default async function AdminAnnouncementsPage() {
  const announcements = await getAnnouncements();

  return (
    <div>
      <AdminPageHeader
        title="Announcements"
        description="A published announcement within its start/end window appears as a slim banner at the top of the public site."
        action={
          <Link
            href="/admin/announcements/new"
            className="rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-cream hover:opacity-90"
          >
            New announcement
          </Link>
        }
      />

      {announcements.length === 0 ? (
        <AdminCard>
          <p className="text-sm text-slate-500">No announcements yet.</p>
        </AdminCard>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Window</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {announcements.map((a) => (
                <tr key={a.id}>
                  <td className="px-4 py-3 font-medium text-slate-800">{a.title}</td>
                  <td className="px-4 py-3 text-slate-500">
                    {a.starts_at ? new Date(a.starts_at).toLocaleDateString() : "Any time"}
                    {a.ends_at ? ` – ${new Date(a.ends_at).toLocaleDateString()}` : ""}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge published={a.published} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link href={`/admin/announcements/${a.id}/edit`} className="text-sm font-medium text-navy hover:underline">
                        Edit
                      </Link>
                      <form action={deleteAnnouncementAction.bind(null, a.id)}>
                        <DeleteButton confirmMessage={`Delete "${a.title}"?`} />
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
