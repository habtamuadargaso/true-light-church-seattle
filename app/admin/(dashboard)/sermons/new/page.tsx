import type { Metadata } from "next";
import { AdminCard, AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { SermonForm } from "../SermonForm";
import { createSermonAction } from "@/lib/cms/actions/sermons";

export const metadata: Metadata = { title: "New Sermon" };

export default function NewSermonPage() {
  return (
    <div>
      <AdminPageHeader title="New Sermon" />
      <AdminCard>
        <SermonForm action={createSermonAction} />
      </AdminCard>
    </div>
  );
}
