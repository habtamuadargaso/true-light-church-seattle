import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AdminCard, AdminPageHeader, StatusBadge } from "@/components/admin/AdminPageHeader";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteGalleryItemAction } from "@/lib/cms/actions/gallery";
import type { GalleryItemRow } from "@/lib/cms/types";

export const metadata: Metadata = { title: "Gallery" };

async function getGalleryItems() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("gallery_items")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  return (data ?? []).map((row: GalleryItemRow) => ({
    ...row,
    url: supabase.storage.from("media").getPublicUrl(row.image_path).data.publicUrl,
  }));
}

export default async function AdminGalleryPage() {
  const items = await getGalleryItems();

  return (
    <div>
      <AdminPageHeader
        title="Gallery"
        description="Published photos appear on the public Gallery, ordered by Sort order (lowest first)."
        action={
          <Link
            href="/admin/gallery/new"
            className="rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-cream hover:opacity-90"
          >
            Upload photo
          </Link>
        }
      />

      {items.length === 0 ? (
        <AdminCard>
          <p className="text-sm text-slate-500">
            No uploaded photos yet — the public Gallery is showing its curated set of existing church photos.
          </p>
        </AdminCard>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div className="relative aspect-square bg-slate-100">
                <Image src={item.url} alt={item.alt_text} fill className="object-cover" sizes="200px" />
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-medium text-slate-800">{item.alt_text}</p>
                <p className="text-xs text-slate-400">{item.category ?? "Uncategorized"} · order {item.sort_order}</p>
                <div className="mt-2 flex items-center justify-between">
                  <StatusBadge published={item.published} />
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/gallery/${item.id}/edit`} className="text-xs font-medium text-navy hover:underline">
                      Edit
                    </Link>
                    <form action={deleteGalleryItemAction.bind(null, item.id, item.image_path)}>
                      <DeleteButton confirmMessage="Delete this photo?" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
