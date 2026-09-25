"use client";

import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/language";

export default function Mission() {
  const { t } = useLanguage();

  return (
    <section id="mission" className="bg-navy px-[5%] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="flex flex-col gap-7">
          <Eyebrow light>{t("mission.missionTitle")}</Eyebrow>
          <p className="max-w-[24ch] font-serif text-[clamp(2rem,4.6vw,3.75rem)] font-semibold leading-[1.12] tracking-[-0.01em] text-balance text-cream">
            {t("mission.missionText")}
          </p>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-14 grid grid-cols-1 gap-10 border-t border-cream/15 pt-10 md:grid-cols-2 md:gap-16 lg:mt-20 lg:pt-12"
        >
          <div className="flex flex-col gap-3">
            <h3 className="label-caps text-[12.5px] font-semibold uppercase tracking-[0.24em] text-gold">
              {t("mission.visionTitle")}
            </h3>
            <p className="max-w-[46ch] text-[17px] leading-[1.8] text-[#c9d3e2] lg:text-[18px]">
              {t("mission.visionText")}
            </p>
          </div>

          <figure className="flex flex-col gap-3">
            <blockquote className="max-w-[44ch] font-serif text-[20px] italic leading-[1.6] text-cream lg:text-[22px]">
              {t("mission.scripture")}
            </blockquote>
            <figcaption className="text-[14px] text-gold-light">{t("mission.reference")}</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
