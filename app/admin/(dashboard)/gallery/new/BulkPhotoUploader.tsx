"use client";

import { useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminCard } from "@/components/admin/AdminPageHeader";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { createGalleryItemAction, finalizeGalleryUploadAction } from "@/lib/cms/actions/gallery";
import {
  GALLERY_CATEGORIES,
  MAX_GALLERY_FILE_SIZE_BYTES,
  defaultAltTextFromFilename,
  formatFileSize,
  galleryStoragePath,
  isAllowedGalleryImageType,
} from "@/lib/cms/gallery-shared";

type QueueStatus = "waiting" | "uploading" | "uploaded" | "failed";

interface QueuedPhoto {
  id: string;
  file: File;
  previewUrl: string;
  status: QueueStatus;
  message?: string;
}

const fieldClasses =
  "w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-[15px] focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/15";

// Uploads run with limited concurrency rather than one at a time (slow for
// large batches) or all at once (can overwhelm the browser/network).
async function processWithConcurrency<T>(items: T[], limit: number, worker: (item: T) => Promise<void>) {
  let cursor = 0;
  async function runNext(): Promise<void> {
    const index = cursor++;
    if (index >= items.length) return;
    await worker(items[index]);
    return runNext();
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => runNext()));
}

function statusLabel(status: QueueStatus): string {
  switch (status) {
    case "waiting":
      return "Waiting";
    case "uploading":
      return "Uploading";
    case "uploaded":
      return "Uploaded";
    case "failed":
      return "Failed";
  }
}

function statusPillClasses(status: QueueStatus): string {
  switch (status) {
    case "waiting":
      return "bg-white/90 text-slate-600";
    case "uploading":
      return "bg-amber-100 text-amber-800";
    case "uploaded":
      return "bg-green-100 text-green-800";
    case "failed":
      return "bg-red-100 text-red-700";
  }
}

export function BulkPhotoUploader() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [queue, setQueue] = useState<QueuedPhoto[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [category, setCategory] = useState<string>(GALLERY_CATEGORIES[0]);
  const [customCategory, setCustomCategory] = useState("");
  const [publishAll, setPublishAll] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [hasUploaded, setHasUploaded] = useState(false);
  const [batchError, setBatchError] = useState<string | null>(null);

  function updatePhoto(id: string, patch: Partial<QueuedPhoto>) {
    setQueue((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }

  function addFiles(fileList: FileList) {
    const additions: QueuedPhoto[] = Array.from(fileList).map((file) => {
      let status: QueueStatus = "waiting";
      let message: string | undefined;

      if (!isAllowedGalleryImageType(file.type)) {
        status = "failed";
        message = "Unsupported file type — use JPG, PNG, WEBP, or GIF.";
      } else if (file.size > MAX_GALLERY_FILE_SIZE_BYTES) {
        status = "failed";
        message = `File is larger than ${formatFileSize(MAX_GALLERY_FILE_SIZE_BYTES)}.`;
      }

      return { id: crypto.randomUUID(), file, previewUrl: URL.createObjectURL(file), status, message };
    });

    setQueue((prev) => [...prev, ...additions]);
    setHasUploaded(false);
  }

  function removeFile(id: string) {
    setQueue((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((p) => p.id !== id);
    });
  }

  function resetQueue() {
    queue.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    setQueue([]);
    setHasUploaded(false);
    setBatchError(null);
  }

  function handleFileInputChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.length) addFiles(e.target.files);
    e.target.value = "";
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
  }

  async function handleUpload() {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setBatchError("Supabase is not configured — set the environment variables first.");
      return;
    }

    const toUpload = queue.filter((p) => p.status === "waiting");
    if (toUpload.length === 0) return;

    setBatchError(null);
    setIsUploading(true);

    const resolvedCategory = category === "Other" ? customCategory.trim() || null : category;

    await processWithConcurrency(toUpload, 3, async (item) => {
      updatePhoto(item.id, { status: "uploading", message: undefined });

      try {
        // Direct browser -> Supabase Storage upload, authenticated with the
        // admin's own session cookie (same RLS as every other admin write —
        // no service role key). File bytes never pass through our server.
        const path = galleryStoragePath(item.file.name);
        const { error: uploadError } = await supabase.storage.from("media").upload(path, item.file, {
          contentType: item.file.type || undefined,
          upsert: false,
        });

        if (uploadError) {
          updatePhoto(item.id, { status: "failed", message: uploadError.message });
          return;
        }

        // Only small JSON metadata crosses into the Server Action from here.
        const result = await createGalleryItemAction({
          imagePath: path,
          altText: defaultAltTextFromFilename(item.file.name, resolvedCategory),
          category: resolvedCategory,
          published: publishAll,
        });

        if ("error" in result) {
          updatePhoto(item.id, { status: "failed", message: result.error });
          return;
        }

        updatePhoto(item.id, { status: "uploaded" });
      } catch (err) {
        updatePhoto(item.id, {
          status: "failed",
          message: err instanceof Error ? err.message : "Upload failed unexpectedly.",
        });
      }
    });

    await finalizeGalleryUploadAction();
    setIsUploading(false);
    setHasUploaded(true);
    router.refresh();
  }

  const waitingCount = queue.filter((p) => p.status === "waiting").length;
  const uploadedCount = queue.filter((p) => p.status === "uploaded").length;
  const failedCount = queue.filter((p) => p.status === "failed").length;
  const settledCount = uploadedCount + failedCount;
  const progressPct = queue.length ? Math.round((settledCount / queue.length) * 100) : 0;

  return (
    <div className="flex flex-col gap-6">
      <AdminCard>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
            isDragging ? "border-navy bg-navy/5" : "border-slate-300"
          }`}
        >
          <p className="mb-1 text-sm font-medium text-slate-700">Drag and drop photos here</p>
          <p className="mb-4 text-xs text-slate-400">JPG, PNG, WEBP, or GIF · up to 10 MB each</p>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-cream hover:opacity-90"
          >
            Choose Photos
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileInputChange}
            className="hidden"
          />
        </div>
      </AdminCard>

      {queue.length > 0 && (
        <AdminCard>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-medium text-slate-700">
              {queue.length} photo{queue.length === 1 ? "" : "s"} selected
              {failedCount > 0 && <span className="text-red-600"> · {failedCount} skipped</span>}
            </p>
            {!isUploading && (
              <button
                type="button"
                onClick={resetQueue}
                className="text-xs font-medium text-slate-500 hover:text-slate-700"
              >
                Clear all
              </button>
            )}
          </div>

          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {queue.map((item) => (
              <li key={item.id} className="overflow-hidden rounded-lg border border-slate-200 bg-white">
                <div className="relative aspect-square bg-slate-100">
                  {/* Local blob preview, not a remote/optimizable image — next/image doesn't apply here. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.previewUrl} alt="" className="h-full w-full object-cover" />
                  <span
                    className={`absolute left-1 top-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusPillClasses(item.status)}`}
                  >
                    {statusLabel(item.status)}
                  </span>
                  {(item.status === "waiting" || item.status === "failed") && (
                    <button
                      type="button"
                      onClick={() => removeFile(item.id)}
                      aria-label={`Remove ${item.file.name}`}
                      className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white/90 text-xs font-bold text-slate-600 shadow hover:bg-white"
                    >
                      ×
                    </button>
                  )}
                </div>
                <div className="p-2">
                  <p className="truncate text-xs font-medium text-slate-700" title={item.file.name}>
                    {item.file.name}
                  </p>
                  <p className="text-[11px] text-slate-400">{formatFileSize(item.file.size)}</p>
                  {item.message && <p className="mt-0.5 text-[11px] text-red-600">{item.message}</p>}
                </div>
              </li>
            ))}
          </ul>
        </AdminCard>
      )}

      <AdminCard>
        <div className="flex flex-col gap-5">
          <div>
            <label htmlFor="bulk-category" className="mb-1.5 block text-sm font-medium text-slate-700">
              Category for this batch
            </label>
            <select
              id="bulk-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={fieldClasses}
            >
              {GALLERY_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-slate-400">
              Applied to every photo in this batch — you can change it per photo later from the Gallery page.
            </p>
          </div>

          {category === "Other" && (
            <div>
              <label htmlFor="custom-category" className="mb-1.5 block text-sm font-medium text-slate-700">
                Custom category
              </label>
              <input
                id="custom-category"
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="e.g. Baptism, Choir"
                className={fieldClasses}
              />
            </div>
          )}

          <div className="border-t border-slate-100 pt-5">
            <label htmlFor="publish-all" className="flex items-center gap-2.5 text-sm font-medium text-slate-700">
              <input
                id="publish-all"
                type="checkbox"
                checked={publishAll}
                onChange={(e) => setPublishAll(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-navy focus:ring-navy/30"
              />
              Publish all immediately
            </label>
            <p className="mt-1 text-xs text-slate-400">
              Leave unchecked to save these photos as unpublished drafts you can review first.
            </p>
          </div>

          {batchError && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{batchError}</p>}

          {(isUploading || hasUploaded) && (
            <div>
              <div className="mb-1.5 flex items-center justify-between text-xs text-slate-500">
                <span>
                  {settledCount} of {queue.length} processed
                </span>
                <span>{progressPct}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full bg-navy transition-all" style={{ width: `${progressPct}%` }} />
              </div>
            </div>
          )}

          {hasUploaded && !isUploading && (
            <div className="rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-700">
              <p>
                {uploadedCount} photo{uploadedCount === 1 ? "" : "s"} uploaded
                {failedCount > 0 ? `, ${failedCount} failed` : ""}.
              </p>
              <Link href="/admin/gallery" className="mt-1 inline-block text-sm font-medium text-navy hover:underline">
                Go to Gallery →
              </Link>
            </div>
          )}

          <div>
            <button
              type="button"
              onClick={handleUpload}
              disabled={isUploading || waitingCount === 0}
              className="rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-cream transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUploading ? "Uploading…" : `Upload Photos${waitingCount ? ` (${waitingCount})` : ""}`}
            </button>
          </div>
        </div>
      </AdminCard>
    </div>
  );
}
