"use client";

import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/language";

export default function About() {
  const { t } = useLanguage();
  const stats = [
    { value: "1+", label: t("about.stat1") },
    { value: "6", label: t("about.stat2") },
    { value: "2", label: t("about.stat3") },
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-cream px-[5%] py-24 sm:py-28 lg:py-36"
    >
      {/* Barely-there warm lift in the upper right so the cream doesn't read flat. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_10%,rgba(255,255,255,0.6),transparent_55%)]"
      />

      {/* Mobile: story → photos → stats. Desktop: story + stats on the left,
          photography spanning both rows on the right. */}
      <div className="relative mx-auto grid max-w-[1320px] grid-cols-1 gap-y-16 lg:grid-cols-[46fr_54fr] lg:grid-rows-[auto_auto] lg:gap-x-20 lg:gap-y-12 xl:gap-x-24">
        <Reveal className="flex flex-col gap-7 lg:col-start-1 lg:row-start-1 lg:self-end">
          <div className="flex items-center gap-4">
            <span aria-hidden className="h-px w-12 bg-gold" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.28em] text-gold-deep">
              {t("about.eyebrow")}
            </span>
          </div>

          <h2 className="font-serif text-[clamp(2.25rem,3.9vw,3.1rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-balance text-navy">
            {t("about.title")}
          </h2>

          <p className="max-w-[58ch] text-[17px] leading-[1.8] text-pretty text-[#3f4a5a] lg:text-[18px]">
            {t("about.description")}
          </p>

          <div className="relative mt-2 max-w-[54ch] border-l-2 border-gold/80 py-1 pl-7">
            <span
              aria-hidden
              className="block h-7 font-serif text-[52px] leading-none text-gold/70"
            >
              &ldquo;
            </span>
            <p className="font-serif text-[19px] italic leading-[1.65] text-pretty text-navy lg:text-[21px]">
              {t("about.leadership", { pastor: siteConfig.pastor })}
            </p>
          </div>
        </Reveal>

        <Reveal
          delay={0.15}
          className="relative mx-auto w-full max-w-[640px] pb-10 sm:pb-12 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:max-w-none lg:self-center lg:pb-14"
        >
          <div className="relative">
            {/* Thin gold frame offset behind the main photo. */}
            <div
              aria-hidden
              className="absolute inset-0 hidden translate-x-5 -translate-y-5 rounded-[30px] border border-gold/45 sm:block"
            />

            <div className="relative aspect-[3/2] w-full lg:aspect-[4/3] overflow-hidden rounded-[26px] shadow-[0_32px_64px_-28px_rgba(11,31,58,0.45)] ring-1 ring-navy/10">
              <Image
                src="/congregation-1.jpg"
                alt={t("gallery.alt.congregation1")}
                fill
                className="object-cover object-[50%_40%] lg:object-[65%_50%]"
                sizes="(max-width: 1024px) 90vw, 700px"
              />
            </div>

            <div className="absolute -bottom-10 left-3 aspect-[4/3] w-[36%] overflow-hidden rounded-[18px] border-[5px] border-[#fbf8f1] shadow-[0_18px_40px_-14px_rgba(11,31,58,0.4)] sm:-bottom-12 sm:-left-5 lg:-bottom-14 lg:-left-10">
              <Image
                src="/building-day.png"
                alt={t("gallery.alt.buildingDay")}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 34vw, 260px"
              />
            </div>
          </div>
        </Reveal>

        <Reveal
          delay={0.25}
          className="lg:col-start-1 lg:row-start-2 lg:self-start"
        >
          <dl className="grid grid-cols-3 divide-x divide-navy/10 border-t border-navy/10 pt-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col px-3 first:pl-0 last:pr-0 sm:px-7"
              >
                <dt className="order-2 mt-3 text-[11.5px] font-semibold uppercase leading-snug tracking-[0.16em] text-[#5b6472] sm:text-[12px]">
                  {stat.label}
                </dt>
                <dd className="order-1 flex flex-col gap-4">
                  <span className="font-serif text-[40px] font-semibold leading-none text-navy sm:text-5xl lg:text-[52px]">
                    {stat.value}
                  </span>
                  <span aria-hidden className="h-px w-6 bg-gold" />
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
