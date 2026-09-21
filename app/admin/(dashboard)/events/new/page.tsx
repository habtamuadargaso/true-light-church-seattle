import type { Metadata } from "next";
import { AdminCard, AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { EventForm } from "../EventForm";
import { createEventAction } from "@/lib/cms/actions/events";

export const metadata: Metadata = { title: "New Event" };

export default function NewEventPage() {
  return (
    <div>
      <AdminPageHeader title="New Event" />
      <AdminCard>
        <EventForm action={createEventAction} />
      </AdminCard>
    </div>
  );
}
