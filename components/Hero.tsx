"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/lib/language";

const heroImages = [
  "/building-sunset.png",
  "/building-day.png",
  "/worship-1.jpg",
  "/congregation-2.jpg",
];

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-navy px-[5%] pb-20 pt-24"
    >
      <div className="absolute inset-0">
        {heroImages.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt="True Light International Evangelical Church Seattle"
            fill
            priority={index === 0}
            className="animate-hero-photo object-cover"
            style={{ animationDelay: `${index * 6}s` }}
            sizes="100vw"
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/55 to-navy/95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,164,92,0.22),transparent_45%)]" />

      <div className="relative z-10 flex max-w-4xl flex-col items-center gap-6 text-center">
        <span className="animate-fade-up text-xs font-semibold uppercase tracking-[0.28em] text-gold">
          {t("hero.location")}
        </span>

        <h1 className="animate-fade-up font-serif text-[clamp(2.6rem,7vw,5.75rem)] font-bold leading-[1.02] text-cream text-balance">
          {t("hero.title")}
        </h1>

        <p className="animate-fade-up max-w-2xl text-lg leading-relaxed text-[#dce6f3] text-balance md:text-xl">
          {t("hero.subtitle")}
        </p>

        <div className="animate-fade-up mt-2 flex flex-wrap justify-center gap-4">
          <Button href="#visit">{t("hero.visit")}</Button>
          <Button href="#sermons" variant="outline-light">
            {t("hero.sermons")}
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-cream/70 md:flex">
        <span className="text-xs uppercase tracking-[0.25em]">Scroll</span>
        <div className="h-10 w-[1px] overflow-hidden bg-cream/20">
          <div className="h-5 w-full animate-scroll-line bg-gold" />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-[5] h-32 bg-gradient-to-b from-transparent to-cream" />
    </section>
  );
}