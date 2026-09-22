"use client";

import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/language";
import { renderRichText } from "@/lib/richText";
import type { SiteSettings } from "@/lib/cms/types";

const VALUE_KEYS = ["pastor.value1", "pastor.value2", "pastor.value3", "pastor.value4"] as const;

const VALUE_ICONS = [
  // Open book — preaching the Word
  <path key="book" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 6.5c-1.6-1.3-3.7-2-6-2v13c2.3 0 4.4.7 6 2 1.6-1.3 3.7-2 6-2V4.5c-2.3 0-4.4.7-6 2Zm0 0v13" />,
  // Praying hands / care — simplified heart-in-hands glyph
  <path key="care" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 20s-7-4.4-7-9.5C5 7.5 7 6 9 6c1.3 0 2.4.7 3 1.7C12.6 6.7 13.7 6 15 6c2 0 4 1.5 4 4.5 0 5.1-7 9.5-7 9.5Z" />,
  // Community — three people
  <path key="community" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 0c-3 0-5.5 1.8-5.5 4v2h11v-2c0-2.2-2.5-4-5.5-4Zm7-3a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm0 0c1.9 0 3.5 1.2 3.5 3.2V13h-3" />,
  // Building faith — foundation/pillar glyph
  <path key="faith" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 20h16M5 20V9.5L12 5l7 4.5V20M9 20v-6h6v6" />,
];

function buildDisplayName(title: string | null, name: string | null, fallback: string): string {
  const trimmedName = name?.trim();
  if (!trimmedName) return fallback;

  const trimmedTitle = title?.trim();
  if (!trimmedTitle) return trimmedName;

  const alreadyPrefixed = trimmedName.toLowerCase().startsWith(`${trimmedTitle.toLowerCase()} `);
  return alreadyPrefixed ? trimmedName : `${trimmedTitle} ${trimmedName}`;
}

export default function Pastor({
  settings,
  imageUrl,
}: {
  settings: SiteSettings;
  imageUrl?: string | null;
}) {
  const { t } = useLanguage();

  const displayName = buildDisplayName(settings.pastor_title, settings.pastor_name, siteConfig.pastor);

  const initials = displayName
    .replace(/^Pastor\s+/i, "")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const bio = settings.pastor_bio || t("pastor.intro", { pastor: displayName });
  const bioParagraphs = renderRichText(bio, "text-[17px] leading-[1.9] text-[#c9d3e2]");

  return (
    <section id="pastor" className="relative overflow-hidden bg-navy px-[5%] py-28">
      <div aria-hidden className="absolute right-0 top-0 h-96 w-96 -mr-48 -mt-48 rounded-full bg-gold/5" />
      <div aria-hidden className="absolute bottom-0 left-0 h-96 w-96 -mb-48 -ml-48 rounded-full bg-gold/5" />

      <div className="relative mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[45%_1fr] lg:gap-16">
          <Reveal>
            {imageUrl ? (
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-[28px] border-2 border-gold/40 shadow-[0_25px_60px_rgba(0,0,0,0.35)] lg:mx-0 lg:aspect-auto lg:h-[600px] lg:max-w-none">
                <Image
                  src={imageUrl}
                  alt={displayName}
                  fill
                  className="object-cover object-top"
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  priority
                />
              </div>
            ) : (
              <div className="relative mx-auto flex aspect-[4/5] w-full max-w-[420px] items-center justify-center overflow-hidden rounded-[28px] border-2 border-gold/40 bg-gradient-to-br from-gold/15 to-transparent shadow-[0_25px_60px_rgba(0,0,0,0.35)] lg:mx-0 lg:aspect-auto lg:h-[600px] lg:max-w-none">
                <div className="flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-gold-light to-gold">
                  <span className="font-serif text-5xl font-bold text-navy">{initials}</span>
                </div>
              </div>
            )}
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-gold">
                {t("pastor.eyebrow")}
              </span>
              <h2 className="font-serif text-[clamp(2rem,4.2vw,3rem)] font-bold text-balance text-cream">
                {displayName}
              </h2>
              <p className="font-serif text-xl font-semibold text-gold">{t("pastor.title")}</p>
            </div>

            <div className="flex flex-col gap-5">{bioParagraphs}</div>

            <div className="rounded-2xl border-l-4 border-gold bg-white/5 p-8 backdrop-blur-sm">
              <p className="whitespace-pre-line font-serif text-xl italic leading-[1.8] text-cream">
                {t("pastor.scripture")}
              </p>
              <p className="mt-3 text-sm text-cream/60">{t("pastor.reference")}</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-20 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-gold/15 pt-14 sm:grid-cols-4">
          {VALUE_KEYS.map((key, i) => (
            <div key={key} className="flex flex-col items-center gap-3 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  {VALUE_ICONS[i]}
                </svg>
              </span>
              <p className="text-sm font-semibold text-cream/90">{t(key)}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
