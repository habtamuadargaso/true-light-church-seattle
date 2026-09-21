import type { Metadata } from "next";
import { AdminCard, AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { CheckboxField, SubmitButton, TextField } from "@/components/admin/fields";
import { uploadGalleryItemAction } from "@/lib/cms/actions/gallery";

export const metadata: Metadata = { title: "Upload Photo" };

const ERROR_MESSAGES: Record<string, string> = {
  "too-large": "That photo is too large — please upload an image up to 10 MB.",
  "invalid-type": "Unsupported file type — please upload a JPEG, PNG, WEBP, or GIF image.",
};

interface NewGalleryItemPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function NewGalleryItemPage({ searchParams }: NewGalleryItemPageProps) {
  const { error } = await searchParams;
  const message = error ? ERROR_MESSAGES[error] : null;

  return (
    <div>
      <AdminPageHeader title="Upload Photo" />
      <AdminCard>
        {message && (
          <p className="mb-5 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{message}</p>
        )}
        <form action={uploadGalleryItemAction} className="flex flex-col gap-5">
          <div>
            <label htmlFor="file" className="mb-1.5 block text-sm font-medium text-slate-700">
              Photo <span className="text-red-500">*</span>
            </label>
            <input
              id="file"
              name="file"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              required
              className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-navy file:px-4 file:py-2 file:text-sm file:font-semibold file:text-cream"
            />
            <p className="mt-1 text-xs text-slate-400">
              Upload the photo exactly as taken — it is not resized, retouched, or altered. JPEG, PNG, WEBP, or GIF,
              up to 10 MB.
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
