"use client";

import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/language";
import type { SiteSettings } from "@/lib/cms/types";

export default function Pastor({
  settings,
  imageUrl,
}: {
  settings: SiteSettings;
  imageUrl?: string | null;
}) {
  const { t } = useLanguage();

  const displayName = settings.pastor_name
    ? [settings.pastor_title, settings.pastor_name].filter(Boolean).join(" ")
    : siteConfig.pastor;

  const initials = displayName
    .replace(/^Pastor\s+/i, "")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const bio = settings.pastor_bio || t("pastor.intro", { pastor: displayName });

  return (
    <section id="pastor" className="relative overflow-hidden bg-navy px-[5%] py-28">
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5"
      />

      <Reveal className="relative mx-auto flex max-w-[720px] flex-col items-center gap-6 text-center">
        <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-gold">
          {t("pastor.eyebrow")}
        </span>

        {imageUrl ? (
          <div className="relative h-28 w-28 overflow-hidden rounded-full border border-gold/40 shadow-lg">
            <Image src={imageUrl} alt={displayName} fill className="object-cover" sizes="112px" />
          </div>
        ) : (
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-gold/40 bg-gradient-to-br from-gold/15 to-transparent">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-gold-light to-gold">
              <span className="font-serif text-3xl font-bold text-navy">{initials}</span>
            </div>
          </div>
        )}

        <h2 className="font-serif text-[clamp(1.75rem,3.6vw,2.5rem)] font-bold text-balance text-cream">
          {t("pastor.title")}
        </h2>

        <p className="font-serif text-xl font-semibold text-gold">{displayName}</p>

        <p className="max-w-[58ch] text-[16.5px] leading-[1.85] text-balance text-[#c9d3e2]">{bio}</p>
      </Reveal>
    </section>
  );
}
