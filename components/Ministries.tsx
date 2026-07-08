"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/language";

const ministryStyles = [
  { key: "worship", letter: "W", bg: "#0b1f3a" },
  { key: "youth", letter: "Y", bg: "#c9a45c" },
  { key: "prayer", letter: "P", bg: "#0b1f3a" },
  { key: "bible", letter: "B", bg: "#c9a45c" },
  { key: "children", letter: "C", bg: "#0b1f3a" },
  { key: "outreach", letter: "O", bg: "#c9a45c" },
];

export default function Ministries() {
  const { t } = useLanguage();

  return (
    <section id="ministries" className="mx-auto max-w-[1200px] px-[5%] py-32">
      <div className="mb-16 flex justify-center">
        <SectionHeading
          eyebrow={t("ministries.eyebrow")}
          title={t("ministries.title")}
          description={t("ministries.description")}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ministryStyles.map((ministry, i) => (
          <Reveal key={ministry.key} delay={Math.min(i * 0.06, 0.3)}>
            <div className="group relative overflow-hidden rounded-2xl border border-navy/10 bg-gradient-to-br from-white to-cream/20 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-lg">
              <div className="absolute right-0 top-0 h-24 w-24 rounded-full opacity-5" style={{ background: ministry.bg }} />
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl text-2xl font-bold text-cream" style={{ background: ministry.bg }}>
                {ministry.letter}
              </div>
              <h3 className="mb-3 font-serif text-2xl font-bold text-navy">
                {t(`ministries.${ministry.key}.title`)}
              </h3>
              <p className="text-[16px] leading-[1.6] text-[#4b5566]">
                {t(`ministries.${ministry.key}.desc`)}
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {t("ministries.learnMore")}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
