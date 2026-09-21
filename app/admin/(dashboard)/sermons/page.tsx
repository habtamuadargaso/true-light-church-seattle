import Link from "next/link";
import type { Metadata } from "next";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AdminCard, AdminPageHeader, StatusBadge } from "@/components/admin/AdminPageHeader";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteSermonAction } from "@/lib/cms/actions/sermons";
import type { SermonRow } from "@/lib/cms/types";

export const metadata: Metadata = { title: "Sermons" };

async function getSermons(): Promise<SermonRow[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("sermons")
    .select("*")
    .order("featured", { ascending: false })
    .order("sermon_date", { ascending: false, nullsFirst: false });
  return data ?? [];
}

export default async function AdminSermonsPage() {
  const sermons = await getSermons();

  return (
    <div>
      <AdminPageHeader
        title="Sermons"
        description="Publish a YouTube URL and it appears on the public Sermons section automatically."
        action={
          <Link
            href="/admin/sermons/new"
            className="rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-cream hover:opacity-90"
          >
            New sermon
          </Link>
        }
      />

      {sermons.length === 0 ? (
        <AdminCard>
          <p className="text-sm text-slate-500">
            No sermons yet. The public site shows &ldquo;New Messages Coming Soon&rdquo; until you add one.
          </p>
        </AdminCard>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">YouTube</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sermons.map((sermon) => (
                <tr key={sermon.id}>
                  <td className="px-4 py-3 font-medium text-slate-800">
                    {sermon.title}
                    {sermon.featured && (
                      <span className="ml-2 rounded-full bg-gold/20 px-2 py-0.5 text-xs font-semibold text-gold-deep">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-500">{sermon.sermon_date ?? "—"}</td>
                  <td className="px-4 py-3">
                    <StatusBadge published={sermon.published} />
                  </td>
                  <td className="px-4 py-3 text-slate-500">{sermon.youtube_url ? "✓" : "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link href={`/admin/sermons/${sermon.id}/edit`} className="text-sm font-medium text-navy hover:underline">
                        Edit
                      </Link>
                      <form action={deleteSermonAction.bind(null, sermon.id, sermon.slug)}>
                        <DeleteButton confirmMessage={`Delete "${sermon.title}"?`} />
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
