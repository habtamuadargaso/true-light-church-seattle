import { CheckboxField, SubmitButton, TextAreaField, TextField } from "@/components/admin/fields";
import type { EventRow } from "@/lib/cms/types";

export function EventForm({
  action,
  event,
}: {
  action: (formData: FormData) => void;
  event?: EventRow;
}) {
  return (
    <form action={action} className="flex flex-col gap-5">
      <TextField name="title" label="Title" defaultValue={event?.title} required />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <TextField name="event_date" label="Date" type="date" defaultValue={event?.event_date} required />
        <TextField name="start_time" label="Start time" type="time" defaultValue={event?.start_time} />
        <TextField name="end_time" label="End time" type="time" defaultValue={event?.end_time} hint="Optional" />
      </div>

      <TextField name="location" label="Location" defaultValue={event?.location} placeholder="Main Sanctuary" />

      <TextField
        name="registration_url"
        label="Registration link"
        defaultValue={event?.registration_url}
        placeholder="https://..."
        hint="Optional — shown as a Register button if set."
      />

      <TextAreaField name="description" label="Description" defaultValue={event?.description} />

      <div className="border-t border-slate-100 pt-5">
        <CheckboxField name="published" label="Published (visible on the public site)" defaultChecked={event?.published} />
      </div>

      <div>
        <SubmitButton>{event ? "Save changes" : "Create event"}</SubmitButton>
      </div>
    </form>
  );
}
