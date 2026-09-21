import type { Metadata } from "next";
import { AdminCard, AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { CheckboxField, SubmitButton, TextField } from "@/components/admin/fields";
import { uploadGalleryItemAction } from "@/lib/cms/actions/gallery";

export const metadata: Metadata = { title: "Upload Photo" };

export default function NewGalleryItemPage() {
  return (
    <div>
      <AdminPageHeader title="Upload Photo" />
      <AdminCard>
        <form action={uploadGalleryItemAction} className="flex flex-col gap-5">
          <div>
            <label htmlFor="file" className="mb-1.5 block text-sm font-medium text-slate-700">
              Photo <span className="text-red-500">*</span>
            </label>
            <input
              id="file"
              name="file"
              type="file"
              accept="image/*"
              required
              className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-navy file:px-4 file:py-2 file:text-sm file:font-semibold file:text-cream"
            />
            <p className="mt-1 text-xs text-slate-400">
              Upload the photo exactly as taken — it is not resized, retouched, or altered.
            </p>
          </div>

          <TextField
            name="alt_text"
            label="Alt text / caption"
            required
            placeholder="Describe what's actually in the photo"
            hint="Used for accessibility and shown as the caption on hover."
          />

          <TextField name="category" label="Category" placeholder="Worship, Community, Church, Ministry…" />

          <TextField
            name="sort_order"
            label="Sort order"
            type="number"
            defaultValue="0"
            hint="Lower numbers appear first."
          />

          <div className="border-t border-slate-100 pt-5">
            <CheckboxField name="published" label="Published (visible on the public site)" />
          </div>

          <div>
            <SubmitButton>Upload</SubmitButton>
          </div>
        </form>
      </AdminCard>
    </div>
  );
}
