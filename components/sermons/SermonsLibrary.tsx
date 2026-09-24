"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Sermon } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import PlayGlyph from "@/components/ui/PlayGlyph";
import { useLanguage } from "@/lib/language";
import { renderInlineRichText } from "@/lib/richText";
import { getYouTubeThumbnailUrl } from "@/lib/youtube";

const ALL = "all";

export default function SermonsLibrary({ sermons }: { sermons: Sermon[] }) {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [seriesFilter, setSeriesFilter] = useState(ALL);
  const [languageFilter, setLanguageFilter] = useState(ALL);

  const [latest, ...rest] = sermons;
  const latestThumbnail = latest ? getYouTubeThumbnailUrl(latest.youtubeUrl) : null;

  const seriesOptions = useMemo(
    () => Array.from(new Set(rest.map((s) => s.series).filter(Boolean))),
    [rest]
  );
  const languageOptions = useMemo(
    () => Array.from(new Set(rest.map((s) => s.language).filter((v): v is string => Boolean(v)))),
    [rest]
  );

  const normalizedQuery = query.trim().toLowerCase();
  const filtered = rest.filter((sermon) => {
    const matchesQuery =
      !normalizedQuery ||
      sermon.title.toLowerCase().includes(normalizedQuery) ||
      sermon.speaker.toLowerCase().includes(normalizedQuery) ||
      (sermon.scripture?.toLowerCase().includes(normalizedQuery) ?? false);
    const matchesSeries = seriesFilter === ALL || sermon.series === seriesFilter;
    const matchesLanguage = languageFilter === ALL || sermon.language === languageFilter;
    return matchesQuery && matchesSeries && matchesLanguage;
  });

  const hasActiveFilters = Boolean(normalizedQuery) || seriesFilter !== ALL || languageFilter !== ALL;
  const clearFilters = () => {
    setQuery("");
    setSeriesFilter(ALL);
    setLanguageFilter(ALL);
  };

  if (!latest) {
    return (
      <section className="mx-auto max-w-[1160px] px-[5%] py-24">
        <div className="mb-14 flex justify-center">
          <SectionHeading eyebrow={t("sermons.libraryEyebrow")} title={t("sermons.libraryTitle")} />
        </div>
        <div className="mx-auto flex max-w-[560px] flex-col items-center gap-5 rounded-[24px] border border-navy/10 bg-gradient-to-br from-white to-cream/20 px-8 py-16 text-center shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/15">
            <svg className="h-7 w-7 text-gold-deep" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <h2 className="font-serif text-2xl font-bold text-navy">{t("sermons.emptyTitle")}</h2>
          <p className="max-w-[46ch] text-[16px] leading-[1.7] text-[#4b5566]">{t("sermons.emptyBody")}</p>
          <Link
            href="/#services"
            className="mt-2 inline-flex items-center justify-center rounded-full bg-linear-to-br from-gold-light to-gold px-8 py-4 text-[15px] font-semibold text-navy shadow-[0_8px_28px_rgba(201,164,92,0.35)] transition-all duration-300 hover:-translate-y-0.5"
          >
            {t("services.title")}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1160px] px-[5%] py-24">
      <div className="mb-16 flex justify-center">
        <SectionHeading eyebrow={t("sermons.libraryEyebrow")} title={t("sermons.libraryTitle")} />
      </div>

      {/* Latest Message */}
      <Reveal className="mb-24">
        <h2 className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-gold-deep">
          {t("sermons.latestMessage")}
        </h2>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <Link
            href={`/sermons/${latest.slug}`}
            className="group relative block aspect-video overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(11,31,58,0.15)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold/40"
          >
            {latestThumbnail ? (
              <Image
                src={latestThumbnail}
                alt={latest.title}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy/30 to-navy/60">
                <p className="text-sm text-cream/60">{t("sermons.videoSoon")}</p>
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-navy/25 transition-colors duration-300 group-hover:bg-navy/35">
              <PlayGlyph size={72} />
            </div>
          </Link>

          <div className="flex flex-col gap-6">
            <div>
              {latest.series && (
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-gold-deep">
                  {latest.series}
                </span>
              )}
              <h3 className="mt-2 font-serif text-3xl font-bold text-navy">{latest.title}</h3>
            </div>
            <div className="space-y-3 border-l-4 border-gold pl-4">
              <div>
                <div className="text-sm font-semibold text-[#5b6472]">{t("sermons.speaker")}</div>
                <div className="font-serif text-lg text-navy">{latest.speaker}</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-[#5b6472]">{t("sermons.date")}</div>
                <div className="font-serif text-lg text-navy">{latest.date}</div>
              </div>
              {latest.scripture && (
                <div>
                  <div className="text-sm font-semibold text-[#5b6472]">{t("sermons.scripture")}</div>
                  <div className="font-serif text-lg text-navy">{latest.scripture}</div>
                </div>
              )}
            </div>
            {latest.description && (
              <p className="text-[16px] leading-[1.6] text-[#4b5566]">{renderInlineRichText(latest.description)}</p>
            )}
            <div className="flex flex-wrap gap-3">
              <Button href={`/sermons/${latest.slug}`}>{t("sermons.watchMessage")}</Button>
              {latest.youtubeUrl && (
                <Button href={latest.youtubeUrl} variant="outline-dark" external>
                  {t("sermons.watchYouTube")}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Reveal>

      {rest.length > 0 && (
        <>
          <div className="mb-10 flex items-center justify-between gap-4">
            <h2 className="font-serif text-2xl font-bold text-navy">{t("sermons.library")}</h2>
          </div>

          {/* Search & filters */}
          <Reveal className="mb-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <div className="relative flex-1 sm:min-w-[240px]">
              <label htmlFor="sermon-search" className="sr-only">
                {t("sermons.searchLabel")}
              </label>
              <svg
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a8f9a]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-4.35-4.35M18 10.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" />
              </svg>
              <input
                id="sermon-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("sermons.searchPlaceholder")}
                className="w-full rounded-full border border-navy/15 bg-white py-3 pl-11 pr-4 text-[15px] text-navy placeholder:text-[#8a8f9a] focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
              />
            </div>

            {seriesOptions.length > 1 && (
              <div className="sm:w-[200px]">
                <label htmlFor="sermon-series-filter" className="sr-only">
                  {t("sermons.filterSeriesLabel")}
                </label>
                <select
                  id="sermon-series-filter"
                  value={seriesFilter}
                  onChange={(e) => setSeriesFilter(e.target.value)}
                  className="w-full rounded-full border border-navy/15 bg-white px-4 py-3 text-[15px] text-navy focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                >
                  <option value={ALL}>{t("sermons.filterAllSeries")}</option>
                  {seriesOptions.map((series) => (
                    <option key={series} value={series}>
                      {series}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {languageOptions.length > 1 && (
              <div className="sm:w-[200px]">
                <label htmlFor="sermon-language-filter" className="sr-only">
                  {t("sermons.filterLanguageLabel")}
                </label>
                <select
                  id="sermon-language-filter"
                  value={languageFilter}
                  onChange={(e) => setLanguageFilter(e.target.value)}
                  className="w-full rounded-full border border-navy/15 bg-white px-4 py-3 text-[15px] text-navy focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                >
                  <option value={ALL}>{t("sermons.filterAllLanguages")}</option>
                  {languageOptions.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </Reveal>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-4 rounded-[24px] border border-navy/10 bg-white px-8 py-16 text-center shadow-sm">
              <h3 className="font-serif text-xl font-bold text-navy">{t("sermons.noResultsTitle")}</h3>
              <p className="max-w-[46ch] text-[16px] text-[#4b5566]">{t("sermons.noResultsBody")}</p>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-2 text-sm font-semibold text-gold-deep underline underline-offset-4"
                >
                  {t("sermons.clearFilters")}
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((sermon, i) => {
                const thumbnailUrl = getYouTubeThumbnailUrl(sermon.youtubeUrl);

                return (
                  <Reveal key={sermon.slug} delay={Math.min(i * 0.05, 0.2)} className="h-full">
                    <Link
                      href={`/sermons/${sermon.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold/30"
                    >
                      {thumbnailUrl ? (
                        <div className="relative aspect-video overflow-hidden">
                          <Image
                            src={thumbnailUrl}
                            alt={sermon.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-navy/25">
                            <PlayGlyph size={40} />
                          </div>
                        </div>
                      ) : (
                        <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-gradient-to-br from-navy/20 to-navy/40">
                          <div className="text-center">
                            <svg className="mx-auto mb-2 h-12 w-12 text-gold/40" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                            <p className="text-xs font-semibold text-navy/40">{t("sermons.videoSoon")}</p>
                          </div>
                        </div>
                      )}
                      <div className="flex flex-1 flex-col gap-1.5 p-6">
                        <div className="flex flex-wrap items-center gap-2">
                          {sermon.series && (
                            <span className="text-xs font-semibold uppercase tracking-wide text-gold-deep">
                              {sermon.series}
                            </span>
                          )}
                        </div>
                        <h3 className="line-clamp-2 font-serif text-lg font-bold text-navy transition-colors group-hover:text-gold-deep">
                          {sermon.title}
                        </h3>
                        <p className="text-[13px] text-[#5b6472]">
                          {sermon.speaker} · {sermon.date}
                        </p>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          )}
        </>
      )}
    </section>
  );
}
