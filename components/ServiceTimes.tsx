"use client";

import { calendarLinks } from "@/lib/site-config";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/lib/language";

export default function ServiceTimes() {
  const { t } = useLanguage();
  const services = [
    {
      name: t("services.sunday"),
      time: "1:30 – 3:00 PM",
      day: t("services.sundayDay"),
      calendarUrl: calendarLinks.sundayWorship,
    },
    {
      name: t("services.bibleStudy"),
      time: "6:00 PM",
      day: t("services.bibleStudyDay"),
      calendarUrl: calendarLinks.bibleStudy,
    },
  ];

  return (
    <section id="services" className="relative overflow-hidden bg-navy px-[5%] py-28">
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5"
      />

      <div className="relative mx-auto max-w-[1160px]">
        <div className="mb-16 flex justify-center">
          <SectionHeading
            eyebrow={t("services.eyebrow")}
            title={t("services.title")}
            description={t("services.description")}
            light
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.name} delay={Math.min(i * 0.1, 0.2)}>
              <div className="group flex h-full flex-col items-center gap-3 rounded-[24px] border border-gold/25 bg-white/[0.04] px-8 py-10 text-center transition-all duration-300 hover:border-gold/50 hover:bg-white/[0.07]">
                <div className="mb-1 flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" strokeWidth={1.6} />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 7v5l3.5 2" />
                  </svg>
                </div>
                <div className="font-serif text-xl font-semibold text-cream">
                  {service.name}
                </div>
                <div className="font-serif text-3xl font-bold text-gold">{service.time}</div>
                <div className="text-[13.5px] uppercase tracking-wide text-[#a9b3c4]">{service.day}</div>
                <a
                  href={service.calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 rounded-full border border-cream/15 px-4 py-2 text-xs font-semibold text-gold transition-colors duration-300 hover:border-gold/50 hover:bg-gold/10"
                >
                  {t("services.addCalendar")}
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-14 flex justify-center">
          <Button href="#visit" variant="outline-light">
            {t("nav.planVisit")}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
