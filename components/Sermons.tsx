"use client";

import Link from "next/link";
import { sermons } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/lib/language";

export default function Sermons() {
  const featured = sermons[0];
  const { t } = useLanguage();

  return (
    <section id="sermons" className="mx-auto max-w-[1200px] px-[5%] py-32">
      <div className="mb-16 flex justify-center">
        <SectionHeading
          eyebrow={t("sermons.eyebrow")}
          title={t("sermons.title")}
          description={t("sermons.description")}
        />
      </div>

      <Reveal className="mb-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-navy/30 to-navy/60 shadow-lg">
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold">
                    <svg className="h-8 w-8 text-navy" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <p className="text-sm text-cream/60">{t("sermons.videoSoon")}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
                {t("sermons.featured")}
              </span>
              <h3 className="mt-2 font-serif text-3xl font-bold text-navy">
                {featured.title}
              </h3>
            </div>
            <div className="space-y-3 border-l-4 border-gold pl-4">
              <div>
                <div className="text-sm font-semibold text-[#5b6472]">{t("sermons.speaker")}</div>
                <div className="font-serif text-lg text-navy">{featured.speaker}</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-[#5b6472]">{t("sermons.date")}</div>
                <div className="font-serif text-lg text-navy">{featured.date}</div>
              </div>
            </div>
            <p className="text-[16px] leading-[1.6] text-[#4b5566]">
              {featured.description}
            </p>
            <Button href={`/sermons/${featured.slug}`}>{t("sermons.watchFull")}</Button>
          </div>
        </div>
      </Reveal>

      <div className="mb-12">
        <h3 className="mb-8 font-serif text-2xl font-bold text-navy">
          {t("sermons.recent")}
        </h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {sermons.slice(1).map((sermon, i) => (
            <Reveal key={sermon.slug} delay={Math.min(i * 0.08, 0.2)}>
              <Link href={`/sermons/${sermon.slug}`}>
                <div className="group cursor-pointer overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-lg">
                  <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-gradient-to-br from-navy/20 to-navy/40">
                    <div className="text-center">
                      <svg className="mx-auto mb-2 h-12 w-12 text-gold/40" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <p className="text-xs font-semibold text-navy/40">{t("sermons.videoPlaceholder")}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-serif text-lg font-bold text-navy transition-colors group-hover:text-gold">
                      {sermon.title}
                    </h4>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold text-gold">{sermon.series}</span>
                      <span className="text-xs text-[#8a8f9a]">•</span>
                      <span className="text-xs text-[#5b6472]">{sermon.date}</span>
                    </div>
                    <p className="mt-3 line-clamp-2 text-sm text-[#4b5566]">
                      {sermon.description}
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <Button href="/sermons">{t("sermons.watchAll")}</Button>
      </div>
    </section>
  );
}
