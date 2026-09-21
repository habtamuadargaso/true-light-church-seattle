import type { Metadata } from "next";
import { AdminCard, AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AnnouncementForm } from "../AnnouncementForm";
import { createAnnouncementAction } from "@/lib/cms/actions/announcements";

export const metadata: Metadata = { title: "New Announcement" };

export default function NewAnnouncementPage() {
  return (
    <div>
      <AdminPageHeader title="New Announcement" />
      <AdminCard>
        <AnnouncementForm action={createAnnouncementAction} />
      </AdminCard>
    </div>
  );
}
