"use client";

import Image from "next/image";
import Link from "next/link";
import type { Sermon } from "@/lib/data";
import PlayGlyph from "@/components/ui/PlayGlyph";
import YouTubeEmbed from "@/components/ui/YouTubeEmbed";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/language";
import { renderInlineRichText } from "@/lib/richText";
import { getYouTubeEmbedUrl, getYouTubeThumbnailUrl } from "@/lib/youtube";

export default function SermonDetail({ sermon, related }: { sermon: Sermon; related: Sermon[] }) {
  const { t } = useLanguage();
  const embedUrl = getYouTubeEmbedUrl(sermon.youtubeUrl);

  return (
    <article className="mx-auto max-w-[820px] px-[5%] py-24">
      <Link
        href="/sermons"
        className="mb-8 inline-block text-sm font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4"
      >
        ← {t("sermons.backToAll")}
      </Link>

      {embedUrl && sermon.youtubeUrl ? (
        <YouTubeEmbed url={sermon.youtubeUrl} title={sermon.title} className="mb-8 shadow-[0_20px_50px_rgba(11,31,58,0.15)]" />
      ) : (
        <div className="relative mb-8 flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-[repeating-linear-gradient(135deg,#0b1f3a,#0b1f3a_12px,#122a4d_12px,#122a4d_24px)] shadow-[0_20px_50px_rgba(11,31,58,0.15)]">
          <PlayGlyph size={72} />
          <span className="absolute bottom-4 left-4 text-xs text-[#c9d3e2]">{t("sermons.videoSoon")}</span>
        </div>
      )}

      {sermon.series && (
        <span className="text-[12.5px] font-bold uppercase tracking-[0.1em] text-gold-deep">{sermon.series}</span>
      )}
      <h1 className="mt-3 font-serif text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-navy">{sermon.title}</h1>
      <p className="mt-3 text-sm text-[#5b6472]">
        {sermon.speaker} · {sermon.date}
        {sermon.scripture ? ` · ${sermon.scripture}` : ""}
      </p>
      {sermon.description && (
        <p className="mt-6 text-base leading-relaxed text-[#4b5566]">{renderInlineRichText(sermon.description)}</p>
      )}
      {sermon.youtubeUrl && (
        <a
          href={sermon.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block text-sm font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4"
        >
          {t("sermons.watchYouTube")} ↗
        </a>
      )}

      {related.length > 0 && (
        <Reveal className="mt-20 border-t border-navy/10 pt-12">
          <h2 className="mb-8 font-serif text-xl font-bold text-navy">{t("sermons.relatedTitle")}</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {related.map((item) => {
              const thumbnailUrl = getYouTubeThumbnailUrl(item.youtubeUrl);
              return (
                <Link
                  key={item.slug}
                  href={`/sermons/${item.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold/30"
                >
                  {thumbnailUrl ? (
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={thumbnailUrl}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-navy/25">
                        <PlayGlyph size={36} />
                      </div>
                    </div>
                  ) : (
                    <div className="flex aspect-video items-center justify-center bg-[repeating-linear-gradient(135deg,#e5dac2,#e5dac2_10px,#eee6d5_10px,#eee6d5_20px)]">
                      <PlayGlyph size={36} />
                    </div>
                  )}
                  <div className="flex flex-col gap-1 p-4">
                    <h3 className="line-clamp-2 font-serif text-base font-bold text-navy transition-colors group-hover:text-gold-deep">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#5b6472]">
                      {item.speaker} · {item.date}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </Reveal>
      )}
    </article>
  );
}
