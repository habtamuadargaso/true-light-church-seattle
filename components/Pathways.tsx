"use client";

import Image from "next/image";
import Link from "next/link";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/language";

// Each pathway pairs with a real True Light photo that matches its meaning:
// the church family (connect), worship in prayer (grow), and women of the
// church serving together (serve — see the caption note in Gallery.tsx about
// this file's misleading name).
const pathways = [
  {
    key: "connect",
    href: "#visit",
    image: "/congregation-1.jpg",
    altKey: "gallery.alt.congregation1",
    position: "object-[50%_30%]",
  },
  {
    key: "grow",
    href: "/sermons",
    image: "/worship-2.jpg",
    altKey: "gallery.alt.worship2",
    position: "object-[45%_35%]",
  },
  {
    key: "serve",
    href: "#ministries",
    image: "/pastor.jpg",
    altKey: "gallery.alt.womenFellowship",
    position: "object-[50%_35%]",
  },
] as const;

export default function Pathways() {
  const { t } = useLanguage();

  return (
    <section id="get-involved" className="bg-cream-warm px-[5%] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="mb-12 flex flex-col gap-5 lg:mb-16">
          <Eyebrow>{t("pathways.eyebrow")}</Eyebrow>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-balance text-navy">
            {t("pathways.title")}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-7">
          {pathways.map((pathway, i) => (
            <Reveal key={pathway.key} delay={Math.min(i * 0.08, 0.16)}>
              <Link
                href={pathway.href}
                className="group relative flex min-h-[340px] flex-col justify-end overflow-hidden rounded-[20px] bg-navy sm:aspect-[16/9] sm:min-h-0 lg:aspect-[3/4]"
              >
                <Image
                  src={pathway.image}
                  alt={t(pathway.altKey)}
                  fill
                  className={`object-cover ${pathway.position} transition-transform duration-700 group-hover:scale-[1.03]`}
                  sizes="(min-width: 1024px) 33vw, 90vw"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-transparent" />

                <div className="relative flex flex-col gap-3 p-6 sm:p-7 lg:p-9">
                  <h3 className="font-serif text-[clamp(1.875rem,3vw,2.5rem)] font-semibold leading-none text-cream">
                    {t(`pathways.${pathway.key}.title`)}
                  </h3>
                  <p className="max-w-[34ch] text-[16px] leading-[1.6] text-[#dce6f3]">
                    {t(`pathways.${pathway.key}.desc`)}
                  </p>
                  <span className="mt-1 inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-gold-light">
                    {t(`pathways.${pathway.key}.cta`)}
                    <ArrowIcon />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}
