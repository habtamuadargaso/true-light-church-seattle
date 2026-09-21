import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AdminCard, AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { CheckboxField, SubmitButton, TextField } from "@/components/admin/fields";
import { updateGalleryItemAction } from "@/lib/cms/actions/gallery";

export const metadata: Metadata = { title: "Edit Photo" };

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditGalleryItemPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  if (!supabase) notFound();

  const { data: item } = await supabase.from("gallery_items").select("*").eq("id", id).maybeSingle();
  if (!item) notFound();

  const url = supabase.storage.from("media").getPublicUrl(item.image_path).data.publicUrl;

  return (
    <div>
      <AdminPageHeader title="Edit Photo" />
      <AdminCard>
        <div className="relative mb-6 aspect-video w-full max-w-md overflow-hidden rounded-lg bg-slate-100">
          <Image src={url} alt={item.alt_text} fill className="object-cover" sizes="400px" />
        </div>

        <form action={updateGalleryItemAction.bind(null, id)} className="flex flex-col gap-5">
          <TextField name="alt_text" label="Alt text / caption" defaultValue={item.alt_text} required />
          <TextField name="category" label="Category" defaultValue={item.category} />
          <TextField name="sort_order" label="Sort order" type="number" defaultValue={String(item.sort_order)} />

          <div className="border-t border-slate-100 pt-5">
            <CheckboxField name="published" label="Published (visible on the public site)" defaultChecked={item.published} />
          </div>

          <div>
            <SubmitButton>Save changes</SubmitButton>
          </div>
        </form>
      </AdminCard>
    </div>
  );
}
