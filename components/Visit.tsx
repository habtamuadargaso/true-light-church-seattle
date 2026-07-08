"use client";

import { siteConfig } from "@/lib/site-config";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/language";

export default function Visit() {
  const { t } = useLanguage();
  const expectItems = [
    t("visit.warm"),
    t("visit.worship"),
    t("visit.teaching"),
    t("visit.fellowship"),
    t("visit.parking"),
  ];

  return (
    <section id="visit" className="mx-auto max-w-[1200px] px-[5%] py-32">
      <div className="mb-16 flex justify-center">
        <SectionHeading
          eyebrow={t("visit.eyebrow")}
          title={t("visit.title")}
          description={t("visit.description")}
        />
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <Reveal className="relative h-[400px] overflow-hidden rounded-2xl shadow-lg">
          <iframe
            src={siteConfig.mapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="True Light International Evangelical Church location map"
          />
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-8">
          <div>
            <h3 className="mb-2 font-serif text-2xl font-bold text-navy">
              {t("visit.location")}
            </h3>
            <p className="text-lg text-[#4b5566]">
              {siteConfig.address.street}
              <br />
              {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
            </p>
            <Button href={siteConfig.directionsUrl} className="mt-4" external>
              {t("visit.directions")}
            </Button>
          </div>

          <div className="border-t border-navy/10 pt-8">
            <h3 className="mb-4 font-serif text-2xl font-bold text-navy">
              {t("visit.times")}
            </h3>
            <div className="space-y-3">
              <div>
                <div className="font-semibold text-gold">{t("visit.sunday")}</div>
                <div className="text-[16px] text-[#4b5566]">{t("visit.sundayTime")}</div>
              </div>
              <div>
                <div className="font-semibold text-gold">{t("visit.bible")}</div>
                <div className="text-[16px] text-[#4b5566]">{t("visit.bibleTime")}</div>
              </div>
            </div>
          </div>

          <div className="border-t border-navy/10 pt-8">
            <h3 className="mb-4 font-serif text-2xl font-bold text-navy">
              {t("visit.expect")}
            </h3>
            <ul className="space-y-2 text-[16px] text-[#4b5566]">
              {expectItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="font-bold text-gold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
