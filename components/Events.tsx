"use client";

import { events } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/lib/language";

export default function Events() {
  const { t } = useLanguage();

  return (
    <section id="events" className="bg-cream/20 py-32">
      <div className="mx-auto max-w-[1200px] px-[5%]">
        <div className="mb-16 flex justify-center">
          <SectionHeading
            eyebrow={t("events.eyebrow")}
            title={t("events.title")}
            description={t("events.description")}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {events.map((event, i) => (
            <Reveal key={`${event.title}-${i}`} delay={Math.min(i * 0.08, 0.24)}>
              <div className="flex flex-col gap-4 rounded-2xl border border-navy/10 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-gold to-gold-light">
                      <svg className="h-6 w-6 text-navy" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M7 10h10V5H7v5zm10-3h3V5h-3v2zM4 14h4v-4H4v4zm6 0h4v-4h-4v4zm6 0h4v-4h-4v4zM4 19h4v-4H4v4zm6 0h4v-4h-4v4z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gold">{event.month} {event.day}</div>
                      <div className="text-xs text-[#5b6472]">{event.time}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 font-serif text-xl font-bold text-navy">
                    {event.title}
                  </h3>
                  <p className="text-[16px] text-[#4b5566]">
                    {event.description || "Join us for worship, fellowship, and growth in God's Word."}
                  </p>
                </div>
                <div className="border-t border-navy/10 pt-4">
                  <p className="text-sm text-[#5b6472]">
                    <span className="font-semibold">{t("events.location")}:</span> {event.location}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="mt-12 flex justify-center">
          <Button href="#contact">{t("events.viewAll")}</Button>
        </Reveal>
      </div>
    </section>
  );
}
