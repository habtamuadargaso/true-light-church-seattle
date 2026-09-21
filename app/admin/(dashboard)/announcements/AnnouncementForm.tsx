import { CheckboxField, SubmitButton, TextAreaField, TextField } from "@/components/admin/fields";
import type { AnnouncementRow } from "@/lib/cms/types";

function toDatetimeLocal(iso: string | null): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function AnnouncementForm({
  action,
  announcement,
}: {
  action: (formData: FormData) => void;
  announcement?: AnnouncementRow;
}) {
  return (
    <form action={action} className="flex flex-col gap-5">
      <TextField name="title" label="Title" defaultValue={announcement?.title} required />
      <TextAreaField name="body" label="Message" defaultValue={announcement?.body} required />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <TextField
          name="starts_at"
          label="Starts"
          type="datetime-local"
          defaultValue={toDatetimeLocal(announcement?.starts_at ?? null)}
          hint="Optional — leave blank to show immediately."
        />
        <TextField
          name="ends_at"
          label="Ends"
          type="datetime-local"
          defaultValue={toDatetimeLocal(announcement?.ends_at ?? null)}
          hint="Optional — leave blank to show indefinitely."
        />
      </div>

      <div className="border-t border-slate-100 pt-5">
        <CheckboxField
          name="published"
          label="Published (visible on the public site during its window)"
          defaultChecked={announcement?.published}
        />
      </div>

      <div>
        <SubmitButton>{announcement ? "Save changes" : "Create announcement"}</SubmitButton>
      </div>
    </form>
  );
}
