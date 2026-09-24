"use client";

import type { ChurchEvent } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/lib/language";
import { renderInlineRichText } from "@/lib/richText";

export default function Events({ events }: { events: ChurchEvent[] }) {
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

        {events.length === 0 ? (
          <Reveal className="mx-auto flex max-w-[560px] flex-col items-center gap-5 rounded-[24px] border border-navy/10 bg-white p-8 py-16 text-center shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/15">
              <svg className="h-7 w-7 text-gold-deep" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 10h10V5H7v5zm10-3h3V5h-3v2zM4 14h4v-4H4v4zm6 0h4v-4h-4v4zm6 0h4v-4h-4v4zM4 19h4v-4H4v4zm6 0h4v-4h-4v4z" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl font-bold text-navy">{t("events.emptyTitle")}</h3>
            <p className="max-w-[46ch] text-[16px] leading-[1.7] text-[#4b5566]">
              {t("events.emptyBody")}
            </p>
            <Button href="#services" className="mt-2">
              {t("services.title")}
            </Button>
          </Reveal>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {events.map((event, i) => (
                <Reveal key={`${event.title}-${i}`} delay={Math.min(i * 0.08, 0.24)}>
                  <div className="flex flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    {event.imageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        loading="lazy"
                        className="h-auto w-full"
                      />
                    )}
                    <div className="flex flex-1 flex-col gap-4 p-8">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-gold to-gold-light">
                            <svg className="h-6 w-6 text-navy" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M7 10h10V5H7v5zm10-3h3V5h-3v2zM4 14h4v-4H4v4zm6 0h4v-4h-4v4zm6 0h4v-4h-4v4zM4 19h4v-4H4v4zm6 0h4v-4h-4v4z" />
                            </svg>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gold-deep">{event.month} {event.day}</div>
                            <div className="text-xs text-[#5b6472]">{event.time}</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="mb-2 font-serif text-xl font-bold text-navy">
                          {event.title}
                        </h3>
                        {event.description && (
                          <p className="text-[16px] text-[#4b5566]">{renderInlineRichText(event.description)}</p>
                        )}
                      </div>
                      <div className="mt-auto flex items-center justify-between gap-3 border-t border-navy/10 pt-4">
                        <p className="text-sm text-[#5b6472]">
                          <span className="font-semibold">{t("events.location")}:</span> {event.location}
                        </p>
                        {event.registrationUrl && (
                          <a
                            href={event.registrationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 text-sm font-semibold text-gold-deep underline underline-offset-2"
                          >
                            {t("events.register")}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3} className="mt-12 flex justify-center">
              <Button href="#contact">{t("events.viewAll")}</Button>
            </Reveal>
          </>
        )}
      </div>
    </section>
  );
}
