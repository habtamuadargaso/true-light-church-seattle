"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/lib/language";
import { siteConfig } from "@/lib/site-config";

// Homepage hero background photo — swap this single path to replace the
// image later (drop the new file in /public and point this at it); nothing
// else in this component needs to change. Must not be modified/re-generated,
// only swapped for a different existing photo.
const HERO_BACKGROUND_IMAGE = "/true-light-new-hero.png";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative overflow-hidden bg-navy">
      {/* Photo + headline */}
      <div className="relative flex min-h-[78vh] items-center overflow-hidden px-[5%] pb-16 pt-32 lg:pt-40">
        <div className="absolute inset-0">
          <Image
            src={HERO_BACKGROUND_IMAGE}
            alt="True Light International Evangelical Church"
            fill
            priority
            className="object-cover object-[65%_60%]"
            sizes="100vw"
          />
        </div>

        {/* Directional scrim: heavy behind the text on the left, easing off
            toward the right so the building/sunset stays visible rather than
            drowning the whole photo in navy. */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/75 to-navy/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/35 via-transparent to-navy/35" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_35%,rgba(201,164,92,0.2),transparent_50%)]" />

        <div className="relative z-10 mx-auto w-full max-w-[1440px]">
          <div className="flex flex-col items-center gap-7 text-center lg:items-start lg:-translate-y-12 lg:text-left">
            <span className="animate-fade-up text-xs font-semibold uppercase tracking-[0.28em] text-gold">
              {t("hero.location")}
            </span>

            <h1 className="animate-fade-up font-serif text-[clamp(2.75rem,6.5vw,6.5rem)] font-bold leading-[0.98] text-balance">
              <span className="block text-cream">{t("hero.titleLine1")}</span>
              <span className="block text-gold-light">{t("hero.titleLine2")}</span>
            </h1>

            <p className="animate-fade-up max-w-xl text-lg leading-[1.7] text-balance text-[#dce6f3] lg:text-xl">
              {t("hero.subtitle")}
            </p>

            <div className="animate-fade-up mt-2 flex flex-wrap justify-center gap-4 lg:justify-start">
              <Button href="#visit" size="lg">
                {t("hero.visit")}
              </Button>
              <Button href="/sermons" variant="outline-light" size="lg">
                <span className="flex items-center gap-2.5">
                  <PlayIcon />
                  {t("hero.sermons")}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Service information bar */}
      <div className="relative z-10 border-t border-gold/15 bg-navy-deep px-[5%] py-10 lg:py-12">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 divide-y divide-cream/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <InfoColumn
            icon={<ClockIcon />}
            label={t("hero.factSunday")}
            value={t("hero.factSundayTime")}
            first
          />
          <InfoColumn icon={<ClockIcon />} label={t("hero.factBible")} value={t("hero.factBibleTime")} />
          <InfoColumn
            icon={<PinIcon />}
            label={t("hero.location")}
            value={`${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.zip}`}
          />
        </div>
      </div>
    </section>
  );
}

function InfoColumn({
  icon,
  label,
  value,
  first = false,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  first?: boolean;
}) {
  return (
    <div className={`flex items-center gap-4 py-6 sm:py-0 ${first ? "sm:pr-8" : "sm:px-8"}`}>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
        {icon}
      </span>
      <span className="flex flex-col gap-0.5 text-left leading-tight">
        <span className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-gold">{label}</span>
        <span className="text-[17px] font-semibold text-cream">{value}</span>
      </span>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" strokeWidth={1.75} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 7v5l3.5 2" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M12 21s-7-6.1-7-11a7 7 0 1 1 14 0c0 4.9-7 11-7 11Z"
      />
      <circle cx="12" cy="10" r="2.5" strokeWidth={1.75} />
    </svg>
  );
}
