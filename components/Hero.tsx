"use client";

import dynamic from "next/dynamic";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/lib/language";

const HeroScene = dynamic(() => import("@/components/HeroScene"), {
  ssr: false,
});

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section
      id="hero"
      className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_50%_0%,#16305a_0%,#0b1f3a_55%,#081729_100%)] px-[5%] pb-20 pt-24"
    >
      <HeroScene />

      <div className="animate-fade-up relative z-[2] flex max-w-3xl flex-col items-center gap-6 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
          {t('hero.location')}
        </span>
        <h1 className="font-serif text-[clamp(2.375rem,6vw,4.25rem)] font-bold leading-[1.08] text-balance text-cream">
          {t('hero.title')}
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-balance text-[#cdd6e4]">
          {t('hero.subtitle')}
        </p>
        <div className="mt-1.5 flex flex-wrap justify-center gap-4">
          <Button href="#visit">{t('hero.visit')}</Button>
          <Button href="#sermons" variant="outline-light">
            {t('hero.sermons')}
          </Button>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-[1] h-32 bg-linear-to-b from-transparent to-cream" />
    </section>
  );
}
