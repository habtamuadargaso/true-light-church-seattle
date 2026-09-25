"use client";

import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/language";
import { renderRichText } from "@/lib/richText";
import type { SiteSettings } from "@/lib/cms/types";

const VALUE_KEYS = ["pastor.value1", "pastor.value2", "pastor.value3", "pastor.value4"] as const;

function buildDisplayName(title: string | null, name: string | null, fallback: string): string {
  const trimmedName = name?.trim();
  if (!trimmedName) return fallback;

  const trimmedTitle = title?.trim();
  if (!trimmedTitle) return trimmedName;

  const alreadyPrefixed = trimmedName.toLowerCase().startsWith(`${trimmedTitle.toLowerCase()} `);
  return alreadyPrefixed ? trimmedName : `${trimmedTitle} ${trimmedName}`;
}

/**
 * The name already appears in the large heading above the bio, so a leading
 * "### Pastor Dereje Gadafa"-style heading inside the CMS biography text
 * would otherwise render a second, smaller copy of it. Drops only that one
 * leading block when it matches the displayed name — everything else the
 * bio contains (other headings, bold text, paragraphs) is left untouched.
 */
function stripLeadingDuplicateHeading(bio: string, displayName: string): string {
  const blocks = bio.split(/\n\s*\n/);
  const headingMatch = blocks[0]?.trim().match(/^#{1,6}\s+(.*)$/);
  if (!headingMatch) return bio;

  const normalize = (value: string) => value.replace(/^pastor\s+/i, "").trim().toLowerCase();
  if (normalize(headingMatch[1]) !== normalize(displayName)) return bio;

  return blocks.slice(1).join("\n\n");
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

  const rawBio = settings.pastor_bio || t("pastor.intro", { pastor: displayName });
  const bio = stripLeadingDuplicateHeading(rawBio, displayName);
  const bioParagraphs = renderRichText(bio, "text-[17px] leading-[1.8] text-[#3f4a5a]", "light");

  // Remembered as part of the church's history — deliberately quieter than
  // the visitor-journey sections and never framed as current leadership.
  return (
    <section id="pastor" className="bg-cream-warm px-[5%] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-start gap-10 md:grid-cols-[minmax(0,340px)_1fr] md:gap-14 lg:grid-cols-[400px_1fr] lg:gap-20">
        <Reveal>
          {imageUrl ? (
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[360px] overflow-hidden rounded-[20px] ring-1 ring-navy/10 shadow-[0_24px_50px_-28px_rgba(11,31,58,0.5)] md:mx-0 md:max-w-none">
              <Image
                src={imageUrl}
                alt={displayName}
                fill
                className="object-cover object-top"
                sizes="(min-width: 1024px) 400px, (min-width: 768px) 340px, 90vw"
              />
            </div>
          ) : (
            <div className="relative mx-auto flex aspect-[4/5] w-full max-w-[360px] items-center justify-center overflow-hidden rounded-[20px] bg-navy ring-1 ring-navy/10 md:mx-0 md:max-w-none">
              <span className="font-serif text-6xl font-semibold text-gold-light">{initials}</span>
            </div>
          )}
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-7">
          <div className="flex flex-col gap-4">
            <Eyebrow>{t("pastor.eyebrow")}</Eyebrow>
            <h2 className="font-serif text-[clamp(2rem,3.6vw,2.75rem)] font-semibold leading-[1.1] text-balance text-navy">
              {displayName}
            </h2>
            <p className="font-serif text-[19px] italic text-gold-deep">{t("pastor.title")}</p>
          </div>

          <div className="flex flex-col gap-5">{bioParagraphs}</div>

          <figure className="border-l-2 border-gold pl-6">
            <blockquote className="whitespace-pre-line font-serif text-[19px] italic leading-[1.7] text-navy lg:text-[20px]">
              {t("pastor.scripture")}
            </blockquote>
            <figcaption className="mt-3 text-[14px] text-[#5b6472]">{t("pastor.reference")}</figcaption>
          </figure>

          <ul className="flex flex-wrap gap-x-6 gap-y-2 border-t border-navy/10 pt-6">
            {VALUE_KEYS.map((key) => (
              <li key={key} className="flex items-center gap-2.5 text-[14px] font-semibold text-navy/80">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />
                {t(key)}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
