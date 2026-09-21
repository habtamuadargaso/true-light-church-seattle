import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AdminCard, AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { EventForm } from "../../EventForm";
import { updateEventAction } from "@/lib/cms/actions/events";

export const metadata: Metadata = { title: "Edit Event" };

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditEventPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  if (!supabase) notFound();

  const { data: event } = await supabase.from("events").select("*").eq("id", id).maybeSingle();
  if (!event) notFound();

  return (
    <div>
      <AdminPageHeader title="Edit Event" />
      <AdminCard>
        <EventForm action={updateEventAction.bind(null, id)} event={event} />
      </AdminCard>
    </div>
  );
}
