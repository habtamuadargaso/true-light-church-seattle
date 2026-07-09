"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/lib/language";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy px-[5%] pb-20 pt-28"
    >
      <Image
        src="/building-sunset.png"
        alt="True Light International Evangelical Church Seattle building"
        fill
        priority
        className="animate-premium-hero object-cover"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/55 to-navy/95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,164,92,0.28),transparent_46%)]" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-gold">
          {t("hero.location")}
        </p>

        <h1 className="max-w-4xl font-serif text-[clamp(3rem,8vw,6.8rem)] font-bold leading-[0.98] tracking-[-0.04em] text-cream text-balance">
          {t("hero.title")}
        </h1>

        <p className="mt-7 max-w-2xl text-lg leading-8 text-cream/85 md:text-xl">
          {t("hero.subtitle")}
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="#visit">{t("hero.visit")}</Button>
          <Button href="#sermons" variant="outline-light">
            {t("hero.sermons")}
          </Button>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-[5] h-32 bg-gradient-to-b from-transparent to-cream" />
    </section>
  );
}