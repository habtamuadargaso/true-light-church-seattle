import type { Metadata } from "next";
import Image from "next/image";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSiteSettings } from "@/lib/cms/queries";
import { AdminCard, AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { SubmitButton, TextAreaField, TextField } from "@/components/admin/fields";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { removePastorPhotoAction, updatePastorInfoAction, uploadPastorPhotoAction } from "@/lib/cms/actions/settings";

export const metadata: Metadata = { title: "Pastor" };

export default async function AdminPastorPage() {
  const settings = await getSiteSettings();
  const supabase = await createSupabaseServerClient();
  const photoUrl = settings.pastor_image_path && supabase
    ? supabase.storage.from("media").getPublicUrl(settings.pastor_image_path).data.publicUrl
    : null;

  return (
    <div>
      <AdminPageHeader
        title="Pastor"
        description="Until a photo is uploaded, the public site shows the existing monogram treatment — never a guessed photo."
      />

      <div className="flex flex-col gap-6">
        <AdminCard>
          <h2 className="mb-4 text-sm font-semibold text-slate-700">Photo</h2>
          {photoUrl ? (
            <div className="flex items-center gap-5">
              <div className="relative h-28 w-28 overflow-hidden rounded-full bg-slate-100">
                <Image src={photoUrl} alt="Pastor" fill className="object-cover" sizes="112px" />
              </div>
              <form action={removePastorPhotoAction}>
                <DeleteButton confirmMessage="Remove the pastor photo? The public site will fall back to the monogram." />
              </form>
            </div>
          ) : (
            <p className="mb-4 text-sm text-slate-500">No photo uploaded yet.</p>
          )}

          <form action={uploadPastorPhotoAction} className="mt-5 flex flex-wrap items-end gap-3 border-t border-slate-100 pt-5">
            <div className="flex-1">
              <label htmlFor="file" className="mb-1.5 block text-sm font-medium text-slate-700">
                {photoUrl ? "Replace photo" : "Upload photo"}
              </label>
              <input
                id="file"
                name="file"
                type="file"
                accept="image/*"
                required
                className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-navy file:px-4 file:py-2 file:text-sm file:font-semibold file:text-cream"
              />
            </div>
            <SubmitButton>Upload</SubmitButton>
          </form>
          <p className="mt-2 text-xs text-slate-400">
            Uploaded exactly as provided — never resized, retouched, or regenerated.
          </p>
        </AdminCard>

        <AdminCard>
          <h2 className="mb-4 text-sm font-semibold text-slate-700">Name, title &amp; biography</h2>
          <form action={updatePastorInfoAction} className="flex flex-col gap-5">
            <TextField
              name="pastor_name"
              label="Name"
              defaultValue={settings.pastor_name}
              placeholder="Pastor Derge Gadafa"
              hint="Leave blank to keep using the verified name already on the site."
            />
            <TextField name="pastor_title" label="Title" defaultValue={settings.pastor_title} placeholder="Pastor" />
            <TextAreaField
              name="pastor_bio"
              label="Biography"
              defaultValue={settings.pastor_bio}
              hint="Leave blank to show only the verified name/title with the existing short leadership copy — never invented biography details."
            />
            <div>
              <SubmitButton>Save changes</SubmitButton>
            </div>
          </form>
        </AdminCard>
      </div>
    </div>
  );
}
