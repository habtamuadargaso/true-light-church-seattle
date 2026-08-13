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
      className="relative overflow-hidden bg-cream px-[5%] py-28 lg:py-36"
    >
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-24">
        <Reveal className="flex flex-col gap-7">
          <div className="flex items-center gap-3">
            <span aria-hidden className="h-px w-10 bg-gold" />
            <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-gold-deep">
              {t("about.eyebrow")}
            </span>
          </div>

          <h2 className="font-serif text-[clamp(2rem,4.2vw,3rem)] font-bold leading-[1.12] tracking-tight text-balance text-navy">
            {t("about.title")}
          </h2>

          <p className="max-w-[52ch] text-[17px] leading-[1.85] text-balance text-[#4b5566]">
            {t("about.description")}
          </p>

          <p className="max-w-[50ch] border-l-2 border-gold py-1 pl-6 font-serif text-[18.5px] italic leading-[1.8] text-balance text-navy/90">
            {t("about.leadership", { pastor: siteConfig.pastor })}
          </p>

          <div className="mt-4 flex divide-x divide-navy/10">
            {stats.map((stat) => (
              <div key={stat.label} className="px-8 first:pl-0 last:pr-0">
                <div className="font-serif text-4xl font-bold text-navy">
                  {stat.value}
                </div>
                <div className="mt-1 text-[12.5px] uppercase tracking-wide text-[#5b6472]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative mx-auto mb-12 w-full max-w-[480px] lg:mb-0 lg:max-w-none">
          <div
            aria-hidden
            className="absolute -right-4 -top-4 hidden h-full w-full rounded-[28px] border border-gold/40 lg:block"
          />

          <div className="relative h-[420px] w-full overflow-hidden rounded-[28px] shadow-2xl sm:h-[480px] lg:h-[600px]">
            <Image
              src="/congregation-1.jpg"
              alt={t("gallery.alt.congregation1")}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/45 via-transparent to-transparent" />
          </div>

          <div className="absolute -bottom-10 -left-6 aspect-[4/3] w-[150px] overflow-hidden rounded-2xl border-4 border-cream shadow-xl sm:w-[180px] lg:-bottom-12 lg:-left-12 lg:w-[220px]">
            <Image
              src="/building-day.png"
              alt={t("gallery.alt.buildingDay")}
              fill
              className="object-cover"
              sizes="220px"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
