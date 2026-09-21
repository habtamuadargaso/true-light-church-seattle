"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function readEventFields(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim() || null,
    event_date: String(formData.get("event_date") ?? "").trim(),
    start_time: String(formData.get("start_time") ?? "").trim() || null,
    end_time: String(formData.get("end_time") ?? "").trim() || null,
    location: String(formData.get("location") ?? "").trim() || null,
    registration_url: String(formData.get("registration_url") ?? "").trim() || null,
    published: formData.get("published") === "on",
  };
}

function revalidatePublicEventPages() {
  revalidatePath("/");
  revalidatePath("/admin/events");
}

export async function createEventAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return;

  const fields = readEventFields(formData);
  if (!fields.title || !fields.event_date) return;

  const { error } = await supabase.from("events").insert(fields);
  if (error) throw error;

  revalidatePublicEventPages();
  redirect("/admin/events");
}

export async function updateEventAction(id: string, formData: FormData) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return;

  const fields = readEventFields(formData);
  const { error } = await supabase.from("events").update(fields).eq("id", id);
  if (error) throw error;

  revalidatePublicEventPages();
  redirect("/admin/events");
}

export async function deleteEventAction(id: string) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return;

  await supabase.from("events").delete().eq("id", id);
  revalidatePublicEventPages();
  redirect("/admin/events");
}
