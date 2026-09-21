"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ALLOWED_GALLERY_EXTENSIONS } from "@/lib/cms/gallery-shared";

function revalidatePublicPages() {
  revalidatePath("/");
  revalidatePath("/admin/gallery");
}

export interface GalleryItemInput {
  imagePath: string;
  altText: string;
  category: string | null;
  published: boolean;
}

export type CreateGalleryItemResult = { id: string } | { error: string };

/**
 * Records one gallery item for a photo the browser has already uploaded
 * directly to Supabase Storage (see BulkPhotoUploader). This action only
 * ever receives small JSON metadata — never file bytes — so uploading many
 * photos at once never depends on the Server Action request body limit.
 * Runs with the caller's own cookie-authenticated session, so the existing
 * "admins can write gallery items" RLS policy applies; no service role key.
 */
export async function createGalleryItemAction(input: GalleryItemInput): Promise<CreateGalleryItemResult> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { error: "Supabase is not configured." };

  const imagePath = input.imagePath;
  const extension = imagePath.split(".").pop()?.toLowerCase() ?? "";
  if (!imagePath.startsWith("gallery/") || !ALLOWED_GALLERY_EXTENSIONS.has(extension)) {
    return { error: "Invalid photo reference." };
  }

  const altText = input.altText.trim().slice(0, 300) || "Gallery photo";
  const category = input.category?.trim() || null;

  const { data, error } = await supabase
    .from("gallery_items")
    .insert({ image_path: imagePath, alt_text: altText, category, sort_order: 0, published: input.published })
    .select("id")
    .single();

  if (error || !data) {
    // Storage upload already succeeded — clean up the orphaned object so a
    // DB failure never leaves an unreferenced file in the media bucket.
    await supabase.storage.from("media").remove([imagePath]);
    return { error: error?.message ?? "Could not save this photo." };
  }

  return { id: data.id };
}

/** Revalidates the public/admin gallery pages once after a bulk upload batch finishes. */
export async function finalizeGalleryUploadAction(): Promise<void> {
  revalidatePublicPages();
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
