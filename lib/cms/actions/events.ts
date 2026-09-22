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
    // Set by EventForm after it uploads a new flyer directly to Storage (or
    // cleared when the admin removes the flyer, or left as the existing
    // path when nothing changed) — never a raw file, so this action never
    // receives file bytes.
    image_path: String(formData.get("image_path") ?? "").trim() || null,
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
  if (error) {
    // The flyer (if any) already finished uploading to Storage before this
    // action ran — clean up the now-orphaned object rather than leaving an
    // unreferenced file behind.
    if (fields.image_path) await supabase.storage.from("media").remove([fields.image_path]);
    throw error;
  }

  revalidatePublicEventPages();
  redirect("/admin/events");
}

export async function updateEventAction(id: string, formData: FormData) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return;

  const fields = readEventFields(formData);

  const { data: existing } = await supabase.from("events").select("image_path").eq("id", id).maybeSingle();
  const previousImagePath = existing?.image_path ?? null;

  const { error } = await supabase.from("events").update(fields).eq("id", id);
  if (error) {
    // A newly uploaded flyer that never made it into the row would
    // otherwise be an orphan — remove it. The previous flyer (if the
    // update failed) is left untouched since it's still the row's image.
    if (fields.image_path && fields.image_path !== previousImagePath) {
      await supabase.storage.from("media").remove([fields.image_path]);
    }
    throw error;
  }

  // Only delete the old flyer once the row referencing the new one (or
  // none, if removed) has been saved successfully, and only if it actually
  // changed — never touches other events' or other features' files.
  if (previousImagePath && previousImagePath !== fields.image_path) {
    await supabase.storage.from("media").remove([previousImagePath]);
  }

  revalidatePublicEventPages();
  redirect("/admin/events");
}

export async function deleteEventAction(id: string) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return;

  const { data: existing } = await supabase.from("events").select("image_path").eq("id", id).maybeSingle();

  await supabase.from("events").delete().eq("id", id);
  if (existing?.image_path) {
    await supabase.storage.from("media").remove([existing.image_path]);
  }
  revalidatePublicEventPages();
  redirect("/admin/events");
}
