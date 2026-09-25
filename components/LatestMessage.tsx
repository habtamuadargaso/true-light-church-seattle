"use client";

import Image from "next/image";
import Link from "next/link";
import type { Sermon } from "@/lib/data";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import PlayGlyph from "@/components/ui/PlayGlyph";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/language";
import { getYouTubeThumbnailUrl } from "@/lib/youtube";

/**
 * Homepage feature for the first published sermon from the CMS (getSermons
 * orders featured first, then newest). Renders an honest empty state — never
 * a sample sermon — when nothing has been published.
 */
export default function LatestMessage({ sermon }: { sermon: Sermon | undefined }) {
  const { t } = useLanguage();
  const thumbnailUrl = sermon ? getYouTubeThumbnailUrl(sermon.youtubeUrl) : null;

  const details = sermon
    ? [
        { label: t("sermons.speaker"), value: sermon.speaker },
        { label: t("sermons.date"), value: sermon.date },
        { label: t("sermons.scripture"), value: sermon.scripture },
      ].filter((detail): detail is { label: string; value: string } => Boolean(detail.value))
    : [];

  return (
    <section id="sermons" className="bg-navy px-[5%] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px]">
        {sermon ? (
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
            <Reveal>
              <Link
                href={`/sermons/${sermon.slug}`}
                aria-label={`${t("sermons.watchMessage")}: ${sermon.title}`}
                className="group relative block aspect-video overflow-hidden rounded-[18px] bg-navy-light ring-1 ring-gold/20"
              >
                {thumbnailUrl ? (
                  <Image
                    src={thumbnailUrl}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 60vw, 90vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                ) : null}
                <div className="absolute inset-0 flex items-center justify-center bg-navy/25 transition-colors duration-300 group-hover:bg-navy/35">
                  <PlayGlyph size={76} />
                </div>
              </Link>
            </Reveal>

            <Reveal delay={0.1} className="flex flex-col gap-6">
              <Eyebrow light>{t("sermons.latestMessage")}</Eyebrow>
              <h2 className="font-serif text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-[1.1] text-balance text-cream">
                {sermon.title}
              </h2>

              {details.length > 0 && (
                <dl className="flex flex-col gap-3 border-l border-gold/40 pl-5">
                  {details.map((detail) => (
                    <div key={detail.label} className="flex flex-wrap items-baseline gap-x-3">
                      <dt className="label-caps text-[12px] font-semibold uppercase tracking-[0.16em] text-gold">
                        {detail.label}
                      </dt>
                      <dd className="text-[17px] text-cream/90">{detail.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <div className="flex flex-wrap gap-3 pt-2">
                <Button href={`/sermons/${sermon.slug}`}>{t("sermons.watchMessage")}</Button>
                <Button href="/sermons" variant="outline-light">
                  {t("sermons.viewAll")}
                </Button>
              </div>
            </Reveal>
          </div>
        ) : (
          <Reveal className="mx-auto flex max-w-[620px] flex-col items-center gap-5 text-center">
            <Eyebrow light>{t("sermons.latestMessage")}</Eyebrow>
            <h2 className="font-serif text-[clamp(1.875rem,3.4vw,2.5rem)] font-semibold text-balance text-cream">
              {t("sermons.emptyTitle")}
            </h2>
            <p className="max-w-[48ch] text-[17px] leading-[1.7] text-cream/75">{t("sermons.emptyBody")}</p>
            <Button href="/sermons" variant="outline-light" className="mt-2">
              {t("sermons.viewAll")}
            </Button>
          </Reveal>
        )}
      </div>
    </section>
  );
}
