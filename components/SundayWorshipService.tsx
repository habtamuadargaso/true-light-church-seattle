"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import PlayGlyph from "@/components/ui/PlayGlyph";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/language";
import { getYouTubeThumbnailUrl } from "@/lib/youtube";
import type { Sermon } from "@/lib/data";

export default function SundayWorshipService({ service }: { service: Sermon | null }) {
  const { t } = useLanguage();
  const thumbnailUrl = service ? getYouTubeThumbnailUrl(service.youtubeUrl) : null;
  const meta = service ? [service.speaker, service.date].filter(Boolean).join(" · ") : "";

  return (
    <section id="sunday-service" className="relative overflow-hidden bg-navy px-[5%] py-28">
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5"
      />

      <div className="relative mx-auto max-w-[1100px]">
        <Reveal className="flex flex-col items-center gap-3.5 text-center">
          <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-gold">
            {t("sundayService.eyebrow")}
          </span>
          <h2 className="font-serif text-[clamp(1.875rem,4vw,2.625rem)] font-bold text-balance text-cream">
            {t("sundayService.title")}
          </h2>
        </Reveal>

        {service ? (
          <Reveal delay={0.1} className="mt-14 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <Link
              href={`/sermons/${service.slug}`}
              className="group relative block aspect-video overflow-hidden rounded-2xl border border-gold/30 shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
            >
              {thumbnailUrl ? (
                <img
                  src={thumbnailUrl}
                  alt={service.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-navy-light to-navy" />
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-navy/30 transition-colors duration-300 group-hover:bg-navy/40">
                <PlayGlyph size={72} />
              </div>
            </Link>

            <div className="flex flex-col gap-4">
              <h3 className="font-serif text-2xl font-bold text-cream sm:text-3xl">{service.title}</h3>
              {meta && <p className="text-sm font-medium text-cream/60">{meta}</p>}
              {service.description && (
                <p className="line-clamp-3 text-[16px] leading-[1.7] text-cream/80">{service.description}</p>
              )}
              <div>
                <Button href={`/sermons/${service.slug}`}>{t("sundayService.watchButton")}</Button>
              </div>
            </div>
          </Reveal>
        ) : (
          <Reveal
            delay={0.1}
            className="mx-auto mt-14 flex max-w-[560px] flex-col items-center gap-5 rounded-[24px] border border-gold/20 bg-white/5 px-8 py-16 text-center backdrop-blur-sm"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/15">
              <svg className="h-7 w-7 text-gold" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl font-bold text-cream">{t("sundayService.emptyTitle")}</h3>
            <p className="max-w-[46ch] text-[16px] leading-[1.7] text-cream/70">
              {t("sundayService.emptyBody")}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
