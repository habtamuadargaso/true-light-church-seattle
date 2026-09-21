"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function revalidatePublicPages() {
  revalidatePath("/");
  revalidatePath("/admin/gallery");
}

export async function uploadGalleryItemAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return;

  const file = formData.get("file");
  const altText = String(formData.get("alt_text") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim() || null;
  const sortOrder = Number(formData.get("sort_order") ?? 0) || 0;
  const published = formData.get("published") === "on";

  if (!(file instanceof File) || file.size === 0 || !altText) return;

  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `gallery/${crypto.randomUUID()}.${extension}`;

  const { error: uploadError } = await supabase.storage.from("media").upload(path, file, {
    contentType: file.type || undefined,
    upsert: false,
  });
  if (uploadError) throw uploadError;

  const { error: insertError } = await supabase.from("gallery_items").insert({
    image_path: path,
    alt_text: altText,
    category,
    sort_order: sortOrder,
    published,
  });
  if (insertError) {
    await supabase.storage.from("media").remove([path]);
    throw insertError;
  }

  revalidatePublicPages();
  redirect("/admin/gallery");
}

export async function updateGalleryItemAction(id: string, formData: FormData) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return;

  const altText = String(formData.get("alt_text") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim() || null;
  const sortOrder = Number(formData.get("sort_order") ?? 0) || 0;
  const published = formData.get("published") === "on";

  const { error } = await supabase
    .from("gallery_items")
    .update({ alt_text: altText, category, sort_order: sortOrder, published })
    .eq("id", id);
  if (error) throw error;

  revalidatePublicPages();
  redirect("/admin/gallery");
}

export async function deleteGalleryItemAction(id: string, imagePath: string) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return;

  await supabase.from("gallery_items").delete().eq("id", id);
  await supabase.storage.from("media").remove([imagePath]);
  revalidatePublicPages();
  redirect("/admin/gallery");
}
