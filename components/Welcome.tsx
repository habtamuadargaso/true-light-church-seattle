"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/language";

/**
 * First-time visitor introduction. Carries the `about` anchor so the
 * navbar/footer "About" links land here.
 */
export default function Welcome() {
  const { t } = useLanguage();

  return (
    <section id="about" className="bg-cream px-[5%] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <div className="relative aspect-[3/2] overflow-hidden rounded-[22px] shadow-[0_30px_60px_-30px_rgba(11,31,58,0.5)] lg:aspect-[5/4]">
            <Image
              src="/congregation-2.jpg"
              alt={t("gallery.alt.congregation2")}
              fill
              className="object-cover object-[50%_45%]"
              sizes="(min-width: 1024px) 640px, 90vw"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="order-1 flex flex-col gap-6 lg:order-2">
          <Eyebrow>{t("welcome.eyebrow")}</Eyebrow>
          <h2 className="font-serif text-[clamp(2.25rem,4.6vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.015em] text-balance text-navy">
            <span className="block">{t("welcome.titleLine1")}</span>
            <span className="block text-gold-deep">{t("welcome.titleLine2")}</span>
          </h2>
          <p className="max-w-[52ch] text-[17px] leading-[1.8] text-pretty text-[#3f4a5a] lg:text-[18px]">
            {t("welcome.body")}
          </p>
          <div className="pt-2">
            <Button href="#visit">{t("nav.planVisit")}</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
