"use client";

import Image from "next/image";
import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/language";

const galleryImages = [
  { id: 1, src: "/worship-1.jpg", altKey: "gallery.alt.worship1", categoryKey: "gallery.worship" },
  { id: 2, src: "/worship-2.jpg", altKey: "gallery.alt.worship2", categoryKey: "gallery.worship" },
  { id: 3, src: "/congregation-1.jpg", altKey: "gallery.alt.congregation1", categoryKey: "gallery.community" },
  { id: 4, src: "/congregation-2.jpg", altKey: "gallery.alt.congregation2", categoryKey: "gallery.community" },
  { id: 5, src: "/building-day.png", altKey: "gallery.alt.buildingDay", categoryKey: "gallery.church" },
  { id: 6, src: "/building-sunset.png", altKey: "gallery.alt.buildingSunset", categoryKey: "gallery.church" },
  { id: 7, src: "/pastor.jpg", altKey: "gallery.alt.pastor", categoryKey: "gallery.leadership" },
  { id: 8, src: "/womens-ministry.jpg", altKey: "gallery.alt.womens", categoryKey: "gallery.ministry" },
];

const categories = [
  "gallery.all",
  "gallery.worship",
  "gallery.community",
  "gallery.church",
  "gallery.leadership",
  "gallery.ministry",
];

export default function Gallery() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("gallery.all");
  const filtered = selectedCategory === "gallery.all"
    ? galleryImages
    : galleryImages.filter((img) => img.categoryKey === selectedCategory);

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
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
              selectedCategory === cat
                ? "bg-navy text-cream"
                : "border border-navy/20 text-navy hover:border-navy/50"
            }`}
          >
            {t(cat)}
          </button>
        ))}
      </Reveal>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((img, i) => (
          <Reveal key={img.id} delay={Math.min(i * 0.05, 0.2)}>
            <div className="group relative h-[280px] w-full overflow-hidden rounded-2xl bg-navy/5 shadow-md transition-shadow duration-300 hover:shadow-lg">
              <Image
                src={img.src}
                alt={t(img.altKey)}
                fill
                priority={i < 2}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-navy/60 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div>
                  <p className="text-sm font-semibold text-gold">{t(img.categoryKey)}</p>
                  <p className="font-serif text-lg text-cream">{t(img.altKey)}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
