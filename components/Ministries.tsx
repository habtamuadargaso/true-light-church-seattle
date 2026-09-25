"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/language";

const ministryKeys = ["worship", "youth", "prayer", "bible", "children", "outreach"];

export default function Ministries() {
  const { t } = useLanguage();

  return (
    <section id="ministries" className="bg-cream px-[5%] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal className="flex flex-col gap-8 lg:sticky lg:top-32 lg:self-start">
          <div className="flex flex-col gap-5">
            <Eyebrow>{t("ministries.eyebrow")}</Eyebrow>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-balance text-navy">
              {t("ministries.title")}
            </h2>
            <p className="max-w-[44ch] text-[17px] leading-[1.75] text-[#3f4a5a]">{t("ministries.description")}</p>
          </div>

          <div className="relative aspect-[3/2] overflow-hidden rounded-[20px] shadow-[0_30px_60px_-30px_rgba(11,31,58,0.45)]">
            <Image
              src="/worship-1.jpg"
              alt={t("gallery.alt.worship1")}
              fill
              className="object-cover object-[50%_30%]"
              sizes="(min-width: 1024px) 560px, 90vw"
            />
          </div>

          <div className="hidden lg:block">
            <Button href="#contact">{t("ministries.cta")}</Button>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ol className="flex flex-col border-t border-navy/10">
            {ministryKeys.map((key, i) => (
              <li key={key} className="grid grid-cols-[2.75rem_1fr] gap-x-4 border-b border-navy/10 py-7 sm:grid-cols-[3.5rem_1fr]">
                <span aria-hidden className="pt-1 font-serif text-[15px] font-semibold text-gold-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="font-serif text-[22px] font-semibold leading-snug text-navy sm:text-2xl">
                    {t(`ministries.${key}.title`)}
                  </h3>
                  <p className="text-[16px] leading-[1.65] text-[#4b5566]">{t(`ministries.${key}.desc`)}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 lg:hidden">
            <Button href="#contact">{t("ministries.cta")}</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
