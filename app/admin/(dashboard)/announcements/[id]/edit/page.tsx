import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AdminCard, AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AnnouncementForm } from "../../AnnouncementForm";
import { updateAnnouncementAction } from "@/lib/cms/actions/announcements";

export const metadata: Metadata = { title: "Edit Announcement" };

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditAnnouncementPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  if (!supabase) notFound();

  const { data: announcement } = await supabase.from("announcements").select("*").eq("id", id).maybeSingle();
  if (!announcement) notFound();

  return (
    <div>
      <AdminPageHeader title="Edit Announcement" />
      <AdminCard>
        <AnnouncementForm action={updateAnnouncementAction.bind(null, id)} announcement={announcement} />
      </AdminCard>
    </div>
  );
}
