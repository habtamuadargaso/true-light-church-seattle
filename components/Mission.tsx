"use client";

import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/language";

export default function Mission() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-navy via-navy to-navy/95 py-32">
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-gold/5 -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-gold/5 -mb-48 -ml-48" />

      <div className="relative mx-auto max-w-[900px] px-[5%]">
        <Reveal className="text-center">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
            {t("mission.eyebrow")}
          </span>
          <h2 className="mt-4 font-serif text-[clamp(2rem,5vw,3rem)] font-bold text-cream">
            {t("mission.title")}
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 space-y-8">
          <div className="rounded-2xl border border-gold/20 bg-white/5 p-8 backdrop-blur-sm">
            <h3 className="mb-4 font-serif text-2xl font-bold text-gold">
              {t("mission.missionTitle")}
            </h3>
            <p className="text-lg leading-[1.8] text-cream/90">
              {t("mission.missionText")}
            </p>
          </div>

          <div className="rounded-2xl border border-gold/20 bg-white/5 p-8 backdrop-blur-sm">
            <h3 className="mb-4 font-serif text-2xl font-bold text-gold">
              {t("mission.visionTitle")}
            </h3>
            <p className="text-lg leading-[1.8] text-cream/90">
              {t("mission.visionText")}
            </p>
          </div>

          <div className="rounded-2xl border-l-4 border-gold bg-white/5 p-8 backdrop-blur-sm">
            <p className="font-serif text-xl italic leading-[1.8] text-cream">
              {t("mission.scripture")}
            </p>
            <p className="mt-3 text-sm text-cream/60">{t("mission.reference")}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
