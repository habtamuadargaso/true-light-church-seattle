import Link from "next/link";
import type { Metadata } from "next";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AdminCard, AdminPageHeader, StatusBadge } from "@/components/admin/AdminPageHeader";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteEventAction } from "@/lib/cms/actions/events";
import type { EventRow } from "@/lib/cms/types";

export const metadata: Metadata = { title: "Events" };

async function getEvents(): Promise<EventRow[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];
  const { data } = await supabase.from("events").select("*").order("event_date", { ascending: true });
  return data ?? [];
}

export default async function AdminEventsPage() {
  const events = await getEvents();

  return (
    <div>
      <AdminPageHeader
        title="Events"
        description="Only published events with a date today or later appear on the public site."
        action={
          <Link
            href="/admin/events/new"
            className="rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-cream hover:opacity-90"
          >
            New event
          </Link>
        }
      />

      {events.length === 0 ? (
        <AdminCard>
          <p className="text-sm text-slate-500">
            No events yet. The public site shows an honest &ldquo;announced soon&rdquo; state until you add one.
          </p>
        </AdminCard>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {events.map((event) => (
                <tr key={event.id}>
                  <td className="px-4 py-3 font-medium text-slate-800">{event.title}</td>
                  <td className="px-4 py-3 text-slate-500">{event.event_date}</td>
                  <td className="px-4 py-3 text-slate-500">{event.location ?? "—"}</td>
                  <td className="px-4 py-3">
                    <StatusBadge published={event.published} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link href={`/admin/events/${event.id}/edit`} className="text-sm font-medium text-navy hover:underline">
                        Edit
                      </Link>
                      <form action={deleteEventAction.bind(null, event.id)}>
                        <DeleteButton confirmMessage={`Delete "${event.title}"?`} />
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
