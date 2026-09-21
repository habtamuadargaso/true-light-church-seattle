"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function readAnnouncementFields(formData: FormData) {
  const startsAt = String(formData.get("starts_at") ?? "").trim();
  const endsAt = String(formData.get("ends_at") ?? "").trim();
  return {
    title: String(formData.get("title") ?? "").trim(),
    body: String(formData.get("body") ?? "").trim(),
    starts_at: startsAt ? new Date(startsAt).toISOString() : null,
    ends_at: endsAt ? new Date(endsAt).toISOString() : null,
    published: formData.get("published") === "on",
  };
}

function revalidatePublicPages() {
  revalidatePath("/");
  revalidatePath("/admin/announcements");
}

export async function createAnnouncementAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return;

  const fields = readAnnouncementFields(formData);
  if (!fields.title || !fields.body) return;

  const { error } = await supabase.from("announcements").insert(fields);
  if (error) throw error;

  revalidatePublicPages();
  redirect("/admin/announcements");
}

export async function updateAnnouncementAction(id: string, formData: FormData) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return;

  const fields = readAnnouncementFields(formData);
  const { error } = await supabase.from("announcements").update(fields).eq("id", id);
  if (error) throw error;

  revalidatePublicPages();
  redirect("/admin/announcements");
}

export async function deleteAnnouncementAction(id: string) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return;

  await supabase.from("announcements").delete().eq("id", id);
  revalidatePublicPages();
  redirect("/admin/announcements");
}
