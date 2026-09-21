import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AdminCard, AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { SermonForm } from "../../SermonForm";
import { updateSermonAction } from "@/lib/cms/actions/sermons";

export const metadata: Metadata = { title: "Edit Sermon" };

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditSermonPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  if (!supabase) notFound();

  const { data: sermon } = await supabase.from("sermons").select("*").eq("id", id).maybeSingle();
  if (!sermon) notFound();

  return (
    <div>
      <AdminPageHeader title="Edit Sermon" />
      <AdminCard>
        <SermonForm action={updateSermonAction.bind(null, id)} sermon={sermon} />
      </AdminCard>
    </div>
  );
}
