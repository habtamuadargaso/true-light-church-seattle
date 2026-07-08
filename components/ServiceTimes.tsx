"use client";

import { calendarLinks } from "@/lib/site-config";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
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
    <section id="services" className="bg-navy px-[5%] py-24">
      <div className="mx-auto max-w-[1160px]">
        <div className="mb-14 flex justify-center">
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
              <div className="flex flex-col gap-2.5 rounded-2xl border border-gold/30 bg-white/5 px-6 py-8 text-center">
                <div className="font-serif text-xl font-semibold text-cream">
                  {service.name}
                </div>
                <div className="text-2xl font-bold text-gold">{service.time}</div>
                <div className="text-[13.5px] text-[#a9b3c4]">{service.day}</div>
                <a
                  href={service.calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 text-xs font-semibold text-gold underline underline-offset-2"
                >
                  {t("services.addCalendar")}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
