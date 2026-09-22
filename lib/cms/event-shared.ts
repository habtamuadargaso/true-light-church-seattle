// Event flyer upload constants and helpers shared between the browser-side
// EventForm (app/admin/(dashboard)/events/EventForm.tsx) and the server
// actions that record/clean up each upload (lib/cms/actions/events.ts).
// Kept free of "use server"/"use client" so both sides can import it
// directly. Deliberately separate from lib/cms/gallery-shared.ts so gallery
// upload behavior is never affected by event flyer changes, or vice versa.

export const MAX_EVENT_FLYER_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export const ALLOWED_EVENT_FLYER_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

export const ALLOWED_EVENT_FLYER_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp"]);

export function isAllowedEventFlyerType(type: string): boolean {
  return (ALLOWED_EVENT_FLYER_IMAGE_TYPES as readonly string[]).includes(type);
}

/** Unique storage object path for a newly selected flyer, under events/. */
export function eventFlyerStoragePath(filename: string): string {
  const extension = filename.split(".").pop()?.toLowerCase() || "jpg";
  return `events/${crypto.randomUUID()}.${extension}`;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  const rounded = value >= 10 ? Math.round(value) : Math.round(value * 10) / 10;
  return `${rounded} ${units[unitIndex]}`;
}
