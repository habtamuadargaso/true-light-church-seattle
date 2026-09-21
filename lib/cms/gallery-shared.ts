// Gallery upload constants and helpers shared between the browser-side bulk
// uploader (app/admin/(dashboard)/gallery/new/BulkPhotoUploader.tsx) and the
// server action that records each upload (lib/cms/actions/gallery.ts). Kept
// free of "use server"/"use client" so both sides can import it directly.

export const MAX_GALLERY_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB per photo

export const ALLOWED_GALLERY_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"] as const;

export const ALLOWED_GALLERY_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "gif"]);

export const GALLERY_CATEGORIES = [
  "Worship",
  "Sunday Service",
  "Fellowship",
  "Youth",
  "Bible Study",
  "Events",
  "Other",
] as const;

export function isAllowedGalleryImageType(type: string): boolean {
  return (ALLOWED_GALLERY_IMAGE_TYPES as readonly string[]).includes(type);
}

/** Unique storage object path for a newly selected file, under the existing gallery/ folder. */
export function galleryStoragePath(filename: string): string {
  const extension = filename.split(".").pop()?.toLowerCase() || "jpg";
  return `gallery/${crypto.randomUUID()}.${extension}`;
}

/** Safe, human-readable alt text derived from a filename, editable later from the Gallery admin page. */
export function defaultAltTextFromFilename(filename: string): string {
  const base = filename.replace(/\.[^./]+$/, "");
  const words = base
    .replace(/[_-]+/g, " ")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, 200);
  const cleaned = words || "Gallery photo";
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
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
