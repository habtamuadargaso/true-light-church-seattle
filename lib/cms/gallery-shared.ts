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

// Filenames produced by phones, screenshot tools, and AI image generators
// carry no real description ("ChatGPT Image Sep 12, 2025, 09_15_23 AM.png",
// "IMG_4213.jpg", "Screenshot 2025-09-12.png") — cleaning up the punctuation
// in one of these still leaves a caption visitors shouldn't see. Detected
// here so both the upload-time default and already-published rows (see
// getGalleryItems in lib/cms/queries.ts) can fall back to something
// presentable instead.
const NON_DESCRIPTIVE_FILENAME_PATTERNS = [
  /^chatgpt image/i,
  /^(img|dsc|dcim|pxl|mvimg)[_-]?\d/i,
  /^screenshot/i,
  /^screen shot/i,
  /^(photo|image|picture)[_-]?\d/i,
  /^signal[_-]/i,
  /^untitled/i,
  /^\d{4}[-_]\d{2}[-_]\d{2}/, // date-stamped, e.g. "2025-09-12 14.03.11"
  /^\d{8,}$/, // pure numeric/timestamp filenames
];

/** True if `text` reads like a cleaned-up filename rather than a real description. */
export function isNonDescriptiveCaption(text: string): boolean {
  const trimmed = text.trim();
  if (!trimmed) return true;
  return NON_DESCRIPTIVE_FILENAME_PATTERNS.some((pattern) => pattern.test(trimmed));
}

/** A presentable caption to fall back to when the real alt text isn't descriptive. */
export function fallbackGalleryCaption(category?: string | null): string {
  return category ? `${category} photo` : "Gallery photo";
}

/** Safe, human-readable alt text derived from a filename, editable later from the Gallery admin page. */
export function defaultAltTextFromFilename(filename: string, category?: string | null): string {
  const base = filename.replace(/\.[^./]+$/, "");
  const words = base
    .replace(/[_-]+/g, " ")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, 200);

  if (!words || isNonDescriptiveCaption(base)) return fallbackGalleryCaption(category);
  return words.charAt(0).toUpperCase() + words.slice(1);
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
