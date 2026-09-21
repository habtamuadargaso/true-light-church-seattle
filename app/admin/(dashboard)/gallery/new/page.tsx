import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { BulkPhotoUploader } from "./BulkPhotoUploader";

export const metadata: Metadata = { title: "Upload Photos" };

export default function NewGalleryItemPage() {
  return (
    <div>
      <AdminPageHeader
        title="Upload Photos"
        description="Select as many JPG, PNG, WEBP, or GIF photos as you like. Each uploads straight to storage, so large batches never hit a request size limit."
      />
      <BulkPhotoUploader />
    </div>
  );
}
