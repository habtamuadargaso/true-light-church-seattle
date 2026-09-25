"use client";

import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/language";
import { calendarLinks, siteConfig } from "@/lib/site-config";

/**
 * Service times, location and first-visit details in one place. This is the
 * "Plan Your Visit" destination (#visit); the #services anchor is kept so
 * older links and the secondary nav item still resolve here.
 */
export default function GatherWithUs() {
  const { t } = useLanguage();

  const services = [
    {
      name: t("hero.factSunday"),
      day: t("services.sundayDay"),
      time: t("hero.factSundayTime"),
      calendarUrl: calendarLinks.sundayWorship,
    },
    {
      name: t("hero.factBible"),
      day: t("services.bibleStudyDay"),
      time: t("hero.factBibleTime"),
      calendarUrl: calendarLinks.bibleStudy,
    },
  ];

  const expectItems = [
    t("visit.warm"),
    t("visit.worship"),
    t("visit.teaching"),
    t("visit.fellowship"),
    t("visit.parking"),
  ];

  return (
    <section id="visit" className="relative bg-cream px-[5%] py-20 sm:py-24 lg:py-32">
      <span id="services" aria-hidden className="absolute top-0" />

      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <Reveal className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <Eyebrow>{t("gather.eyebrow")}</Eyebrow>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-balance text-navy">
                {t("gather.title")}
              </h2>
              <p className="max-w-[46ch] text-[17px] leading-[1.75] text-[#3f4a5a]">{t("gather.body")}</p>
            </div>

            <ul className="flex flex-col border-y border-navy/10">
              {services.map((service) => (
                <li
                  key={service.name}
                  className="grid grid-cols-1 gap-y-1 border-b border-navy/10 py-6 last:border-b-0 sm:grid-cols-[1fr_auto] sm:gap-x-6"
                >
                  <span className="label-caps text-[12px] font-semibold uppercase tracking-[0.18em] text-gold-deep sm:col-start-1">
                    {service.day}
                  </span>
                  <span className="font-serif text-[22px] font-semibold text-navy sm:col-start-1 sm:text-2xl">
                    {service.name}
                  </span>
                  <span className="mt-1 font-serif text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-none text-navy sm:col-start-2 sm:row-span-3 sm:row-start-1 sm:mt-0 sm:self-center">
                    {service.time}
                  </span>
                  <a
                    href={service.calendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-self-start text-[14px] font-semibold text-gold-deep underline decoration-gold/40 underline-offset-4 hover:decoration-gold-deep sm:col-start-1"
                  >
                    {t("services.addCalendar")}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-start gap-4">
              <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold-deep">
                <PinIcon />
              </span>
              <address className="flex flex-col not-italic">
                <span className="label-caps text-[12px] font-semibold uppercase tracking-[0.18em] text-gold-deep">
                  {t("visit.location")}
                </span>
                <span className="mt-1 text-[18px] leading-[1.5] text-navy">
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
                </span>
              </address>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button href={siteConfig.directionsUrl} external>
                {t("visit.directions")}
              </Button>
              <Button href="#contact" variant="outline-dark">
                {t("nav.planVisit")}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-8">
            <div className="relative h-[320px] overflow-hidden rounded-[20px] shadow-[0_30px_60px_-30px_rgba(11,31,58,0.45)] ring-1 ring-navy/10 sm:h-[400px] lg:h-auto lg:min-h-[460px] lg:flex-1">
              <iframe
                src={siteConfig.mapsEmbedUrl}
                className="absolute inset-0 h-full w-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="True Light International Evangelical Church location map"
              />
            </div>

            <div>
              <h3 className="mb-4 label-caps text-[12px] font-semibold uppercase tracking-[0.18em] text-gold-deep">
                {t("visit.expect")}
              </h3>
              <ul className="grid grid-cols-1 gap-x-6 gap-y-2.5 text-[16px] text-[#3f4a5a] sm:grid-cols-2">
                {expectItems.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
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
