"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/language";
import type { GalleryViewItem } from "@/lib/cms/types";

// Curated real church photos, used only when no admin-managed gallery
// photos have been published yet (see lib/cms/queries.ts getGalleryItems).
const staticGalleryImages = [
  { id: 1, src: "/worship-1.jpg", altKey: "gallery.alt.worship1", categoryKey: "gallery.worship" },
  { id: 2, src: "/worship-2.jpg", altKey: "gallery.alt.worship2", categoryKey: "gallery.worship" },
  { id: 3, src: "/congregation-1.jpg", altKey: "gallery.alt.congregation1", categoryKey: "gallery.community" },
  { id: 4, src: "/congregation-2.jpg", altKey: "gallery.alt.congregation2", categoryKey: "gallery.community" },
  { id: 5, src: "/building-day.png", altKey: "gallery.alt.buildingDay", categoryKey: "gallery.church" },
  { id: 6, src: "/building-sunset.png", altKey: "gallery.alt.buildingSunset", categoryKey: "gallery.church" },
  // Note: these two files' captions were previously swapped relative to what
  // they actually depict — "pastor.jpg" shows a group of women, and
  // "womens-ministry.jpg" shows a couple, not a women's gathering. Captions
  // below describe the real photo content rather than the filename.
  { id: 7, src: "/pastor.jpg", altKey: "gallery.alt.womenFellowship", categoryKey: "gallery.ministry" },
  { id: 8, src: "/womens-ministry.jpg", altKey: "gallery.alt.churchFamily", categoryKey: "gallery.community" },
];

const staticCategories = [
  "gallery.all",
  "gallery.worship",
  "gallery.community",
  "gallery.church",
  "gallery.ministry",
];

export default function Gallery({ items }: { items: GalleryViewItem[] | null }) {
  const { t } = useLanguage();
  const usingCms = Boolean(items && items.length > 0);

  // Normalize both sources into the same shape. CMS-managed categories are
  // plain admin-entered text (not translated, same as sermon/event copy);
  // the static fallback keeps using translation keys as the filter value so
  // the selected filter survives a language switch.
  const allImages = usingCms
    ? items!.map((item) => ({
        id: item.id,
        src: item.src,
        alt: item.alt,
        category: item.category || "Uncategorized",
        categoryLabel: item.category || "Uncategorized",
      }))
    : staticGalleryImages.map((img) => ({
        id: String(img.id),
        src: img.src,
        alt: t(img.altKey),
        category: img.categoryKey,
        categoryLabel: t(img.categoryKey),
      }));

  const categoryOptions: { value: string; label: string }[] = usingCms
    ? [
        { value: "all", label: "All" },
        ...Array.from(new Set(items!.map((i) => i.category || "Uncategorized"))).map((c) => ({ value: c, label: c })),
      ]
    : staticCategories.map((key) => ({ value: key, label: t(key) }));

  const allValue = categoryOptions[0].value;
  const [selectedCategory, setSelectedCategory] = useState<string>(allValue);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const filtered = selectedCategory === allValue
    ? allImages
    : allImages.filter((img) => img.category === selectedCategory);

  const openLightbox = (index: number, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    triggerRef.current?.focus();
  }, []);

  const showPrev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length));
  }, [filtered.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? i : (i + 1) % filtered.length));
  }, [filtered.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") showPrev();
      else if (e.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  const active = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  if (allImages.length === 0) return null;

  return (
    <section id="gallery" className="mx-auto max-w-[1200px] px-[5%] py-32">
      <div className="mb-16 flex justify-center">
        <SectionHeading
          eyebrow={t("gallery.eyebrow")}
          title={t("gallery.title")}
          description={t("gallery.description")}
        />
      </div>

      <Reveal className="mb-12 flex flex-wrap justify-center gap-3">
        {categoryOptions.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => {
              setSelectedCategory(opt.value);
              setLightboxIndex(null);
            }}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
              selectedCategory === opt.value
                ? "bg-navy text-cream"
                : "border border-navy/20 text-navy hover:border-navy/50"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </Reveal>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((img, i) => (
          <Reveal key={img.id} delay={Math.min(i * 0.05, 0.2)}>
            <button
              type="button"
              onClick={(e) => openLightbox(i, e.currentTarget)}
              aria-label={img.alt}
              className="group relative h-[280px] w-full overflow-hidden rounded-2xl bg-navy/5 shadow-md transition-shadow duration-300 hover:shadow-lg"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={i < 2}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-navy/60 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="text-left">
                  <p className="text-sm font-semibold text-gold">{img.categoryLabel}</p>
                  <p className="font-serif text-lg text-cream">{img.alt}</p>
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/95 p-4 backdrop-blur-sm sm:p-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeLightbox}
            aria-label={t("gallery.close")}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 bg-white/5 text-cream backdrop-blur-md transition-colors hover:border-gold/50 hover:text-gold sm:right-6 sm:top-6"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {filtered.length > 1 && (
            <>
              <button
                type="button"
                onClick={showPrev}
                aria-label={t("gallery.previous")}
                className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/20 bg-white/5 text-cream backdrop-blur-md transition-colors hover:border-gold/50 hover:text-gold sm:left-6"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={showNext}
                aria-label={t("gallery.next")}
                className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/20 bg-white/5 text-cream backdrop-blur-md transition-colors hover:border-gold/50 hover:text-gold sm:right-6"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          <div className="relative flex max-h-[85vh] w-full max-w-4xl flex-col items-center gap-4">
            <div className="relative h-[70vh] w-full">
              <Image
                src={active.src}
                alt={active.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-gold">{active.categoryLabel}</p>
              <p className="font-serif text-lg text-cream">{active.alt}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
