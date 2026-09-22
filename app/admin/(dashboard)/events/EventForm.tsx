"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { CheckboxField, SubmitButton, TextAreaField, TextField } from "@/components/admin/fields";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import {
  MAX_EVENT_FLYER_SIZE_BYTES,
  eventFlyerStoragePath,
  formatFileSize,
  isAllowedEventFlyerType,
} from "@/lib/cms/event-shared";
import type { EventRow } from "@/lib/cms/types";

type FlyerState =
  | { kind: "existing"; path: string; url: string }
  | { kind: "new"; file: File; previewUrl: string }
  | { kind: "removed" }
  | { kind: "none" };

export function EventForm({
  action,
  event,
  imageUrl,
}: {
  action: (formData: FormData) => void | Promise<void>;
  event?: EventRow;
  imageUrl?: string | null;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [flyer, setFlyer] = useState<FlyerState>(
    event?.image_path && imageUrl ? { kind: "existing", path: event.image_path, url: imageUrl } : { kind: "none" }
  );
  const [fileError, setFileError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    return () => {
      if (flyer.kind === "new") URL.revokeObjectURL(flyer.previewUrl);
    };
  }, [flyer]);

  const previewUrl = flyer.kind === "existing" ? flyer.url : flyer.kind === "new" ? flyer.previewUrl : null;

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (!isAllowedEventFlyerType(file.type)) {
      setFileError("Please choose a JPEG, PNG, or WEBP image.");
      return;
    }
    if (file.size > MAX_EVENT_FLYER_SIZE_BYTES) {
      setFileError(`That image is larger than ${formatFileSize(MAX_EVENT_FLYER_SIZE_BYTES)}. Please choose a smaller file.`);
      return;
    }

    setFileError(null);
    if (flyer.kind === "new") URL.revokeObjectURL(flyer.previewUrl);
    setFlyer({ kind: "new", file, previewUrl: URL.createObjectURL(file) });
  }

  function handleRemoveFlyer() {
    if (flyer.kind === "new") URL.revokeObjectURL(flyer.previewUrl);
    setFlyer({ kind: "removed" });
    setFileError(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (fileError || !formRef.current) return;

    setSubmitError(null);
    setIsSubmitting(true);

    let imagePathValue = "";

    if (flyer.kind === "existing") {
      imagePathValue = flyer.path;
    } else if (flyer.kind === "new") {
      const supabase = createSupabaseBrowserClient();
      if (!supabase) {
        setSubmitError("Supabase is not configured — set the environment variables first.");
        setIsSubmitting(false);
        return;
      }

      // Direct browser -> Supabase Storage upload, authenticated with the
      // admin's own session cookie (same RLS as every other admin write —
      // no service role key). File bytes never pass through the Server
      // Action below; only the resulting path does.
      const path = eventFlyerStoragePath(flyer.file.name);
      const { error: uploadError } = await supabase.storage.from("media").upload(path, flyer.file, {
        contentType: flyer.file.type || undefined,
        upsert: false,
      });

      if (uploadError) {
        setSubmitError(uploadError.message);
        setIsSubmitting(false);
        return;
      }

      imagePathValue = path;
    }
    // "removed" or "none" leave imagePathValue as "" (cleared/no flyer).

    const formData = new FormData(formRef.current);
    formData.set("image_path", imagePathValue);
    await action(formData);
    setIsSubmitting(false);
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
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

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Event Flyer / Photo</label>

        {previewUrl ? (
          <div className="flex items-start gap-4">
            {/* Local blob or remote Storage preview — next/image doesn't apply to either. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="Event flyer preview"
              className="h-32 w-32 rounded-lg border border-slate-200 object-cover"
            />
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-lg border border-slate-300 px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Replace flyer
              </button>
              <button
                type="button"
                onClick={handleRemoveFlyer}
                className="text-left text-sm font-medium text-red-600 hover:underline"
              >
                Remove flyer
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-lg border border-dashed border-slate-300 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Choose flyer image
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          className="hidden"
        />

        <p className="mt-1.5 text-xs text-slate-400">JPEG, PNG, or WEBP · up to 10 MB. Optional.</p>
        {fileError && <p className="mt-1.5 text-xs text-red-600">{fileError}</p>}
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-100 pt-5">
        <CheckboxField name="published" label="Published (visible on the public site)" defaultChecked={event?.published} />
      </div>

      {submitError && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{submitError}</p>}

      <div>
        <SubmitButton disabled={isSubmitting || !!fileError}>
          {isSubmitting ? "Saving…" : event ? "Save changes" : "Create event"}
        </SubmitButton>
      </div>
    </form>
  );
}
