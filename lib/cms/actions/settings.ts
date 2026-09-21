"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { SiteSettingKey } from "@/lib/cms/types";

async function upsertSettings(entries: Partial<Record<SiteSettingKey, string | null>>) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return;

  const rows = Object.entries(entries).map(([key, value]) => ({ key, value: value || null }));
  const { error } = await supabase.from("site_settings").upsert(rows, { onConflict: "key" });
  if (error) throw error;

  revalidatePath("/");
}

function field(formData: FormData, name: string): string | null {
  return String(formData.get(name) ?? "").trim() || null;
}

export async function updatePastorInfoAction(formData: FormData) {
  await upsertSettings({
    pastor_name: field(formData, "pastor_name"),
    pastor_title: field(formData, "pastor_title"),
    pastor_bio: field(formData, "pastor_bio"),
  });
  revalidatePath("/admin/pastor");
}

export async function uploadPastorPhotoAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return;

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return;

  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `pastor/photo-${Date.now()}.${extension}`;

  const { error: uploadError } = await supabase.storage.from("media").upload(path, file, {
    contentType: file.type || undefined,
    upsert: true,
  });
  if (uploadError) throw uploadError;

  await upsertSettings({ pastor_image_path: path });
  revalidatePath("/admin/pastor");
}

export async function removePastorPhotoAction() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return;

  const { data } = await supabase.from("site_settings").select("value").eq("key", "pastor_image_path").maybeSingle();
  if (data?.value) {
    await supabase.storage.from("media").remove([data.value]);
  }
  await upsertSettings({ pastor_image_path: null });
  revalidatePath("/admin/pastor");
}

export async function updateSocialLinksAction(formData: FormData) {
  await upsertSettings({
    facebook_url: field(formData, "facebook_url"),
    tiktok_url: field(formData, "tiktok_url"),
    youtube_channel_url: field(formData, "youtube_channel_url"),
  });
  revalidatePath("/admin/social");
}

export async function updateGivingSettingsAction(formData: FormData) {
  await upsertSettings({ giving_url: field(formData, "giving_url") });
  revalidatePath("/admin/giving");
}

export async function updateContactSettingsAction(formData: FormData) {
  await upsertSettings({
    church_email: field(formData, "church_email"),
    church_phone: field(formData, "church_phone"),
  });
  revalidatePath("/admin/contact");
}
