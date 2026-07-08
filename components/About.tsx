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
      className="mx-auto grid max-w-[1160px] grid-cols-1 items-center gap-14 px-[5%] pb-28 pt-24 lg:grid-cols-2 lg:gap-16"
    >
      <Reveal className="flex flex-col gap-5">
        <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-gold-deep">
          {t("about.eyebrow")}
        </span>
        <h2 className="font-serif text-[clamp(1.875rem,4vw,2.625rem)] font-bold text-balance text-navy">
          {t("about.title")}
        </h2>
        <p className="text-[16.5px] leading-[1.85] text-balance text-[#4b5566]">
          {t("about.description")}
        </p>
        <p className="text-[16.5px] leading-[1.85] text-balance text-[#4b5566]">
          {t("about.leadership", { pastor: siteConfig.pastor })}
        </p>
        <div className="mt-3 flex flex-wrap gap-9">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-serif text-3xl font-bold text-navy">
                {stat.value}
              </div>
              <div className="text-[13px] text-[#5b6472]">{stat.label}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.15} className="relative h-[520px] overflow-hidden rounded-[28px] shadow-2xl">
        <Image
          src="/congregation-2.jpg"
          alt="True Light International Evangelical Church congregation"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
      </Reveal>
    </section>
  );
}
