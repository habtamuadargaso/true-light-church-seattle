"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/slugify";

function readSermonFields(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim() || null,
    series: String(formData.get("series") ?? "").trim() || null,
    youtube_url: String(formData.get("youtube_url") ?? "").trim() || null,
    speaker: String(formData.get("speaker") ?? "").trim() || null,
    scripture: String(formData.get("scripture") ?? "").trim() || null,
    sermon_date: String(formData.get("sermon_date") ?? "").trim() || null,
    language: String(formData.get("language") ?? "").trim() || null,
    published: formData.get("published") === "on",
    featured: formData.get("featured") === "on",
  };
}

function revalidatePublicSermonPages(slug?: string) {
  revalidatePath("/");
  revalidatePath("/sermons");
  if (slug) revalidatePath(`/sermons/${slug}`);
  revalidatePath("/admin/sermons");
}

export async function createSermonAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return;

  const fields = readSermonFields(formData);
  if (!fields.title) return;

  const baseSlug = slugify(fields.title) || "sermon";
  let slug = baseSlug;
  for (let attempt = 0; attempt < 5; attempt++) {
    const { error } = await supabase.from("sermons").insert({ ...fields, slug });
    if (!error) break;
    if (error.code === "23505") {
      slug = `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`;
      continue;
    }
    throw error;
  }

  revalidatePublicSermonPages(slug);
  redirect("/admin/sermons");
}

export async function updateSermonAction(id: string, formData: FormData) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return;

  const fields = readSermonFields(formData);
  const slug = slugify(String(formData.get("slug") ?? "")) || slugify(fields.title);

  const { error } = await supabase.from("sermons").update({ ...fields, slug }).eq("id", id);
  if (error && error.code !== "23505") throw error;

  revalidatePublicSermonPages(slug);
  redirect("/admin/sermons");
}

export async function deleteSermonAction(id: string, slug: string) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return;

  await supabase.from("sermons").delete().eq("id", id);
  revalidatePublicSermonPages(slug);
  redirect("/admin/sermons");
}
