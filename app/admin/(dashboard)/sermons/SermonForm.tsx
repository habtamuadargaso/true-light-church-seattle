import { CheckboxField, SubmitButton, TextAreaField, TextField } from "@/components/admin/fields";
import type { SermonRow } from "@/lib/cms/types";

export function SermonForm({
  action,
  sermon,
}: {
  action: (formData: FormData) => void;
  sermon?: SermonRow;
}) {
  return (
    <form action={action} className="flex flex-col gap-5">
      <TextField name="title" label="Title" defaultValue={sermon?.title} required />

      {sermon && (
        <TextField
          name="slug"
          label="URL slug"
          defaultValue={sermon.slug}
          hint="Used in the sermon's public URL: /sermons/<slug>"
        />
      )}

      <TextField
        name="youtube_url"
        label="YouTube URL"
        defaultValue={sermon?.youtube_url}
        placeholder="https://www.youtube.com/watch?v=..."
        hint="Paste the full YouTube watch or share link."
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <TextField name="speaker" label="Speaker" defaultValue={sermon?.speaker} placeholder="Pastor Derge Gadafa" />
        <TextField name="sermon_date" label="Date" type="date" defaultValue={sermon?.sermon_date} />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <TextField name="series" label="Series" defaultValue={sermon?.series} placeholder="Sunday Worship Service" />
        <TextField name="scripture" label="Scripture reference" defaultValue={sermon?.scripture} placeholder="John 12:46" />
      </div>

      <TextField
        name="language"
        label="Language"
        defaultValue={sermon?.language}
        placeholder="English or Amharic"
        hint="Informational only — not shown publicly yet."
      />

      <TextAreaField name="description" label="Description" defaultValue={sermon?.description} />

      <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:gap-8">
        <CheckboxField name="published" label="Published (visible on the public site)" defaultChecked={sermon?.published} />
        <CheckboxField
          name="featured"
          label="Featured (shown as the highlighted sermon)"
          defaultChecked={sermon?.featured}
        />
      </div>

      <div>
        <SubmitButton>{sermon ? "Save changes" : "Create sermon"}</SubmitButton>
      </div>
    </form>
  );
}
