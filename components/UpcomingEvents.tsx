"use client";

import type { ChurchEvent } from "@/lib/data";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/language";
import { renderInlineRichText } from "@/lib/richText";

const HOMEPAGE_EVENT_LIMIT = 3;

/**
 * The next few published events from the CMS (getEvents returns upcoming
 * events soonest first). The full list lives on /events.
 */
export default function UpcomingEvents({ events }: { events: ChurchEvent[] }) {
  const { t } = useLanguage();
  const visible = events.slice(0, HOMEPAGE_EVENT_LIMIT);
  // Keep cards aligned when only some events have flyers: the others get a
  // plain date panel of the same size rather than a stretched empty card.
  const anyFlyer = visible.some((event) => Boolean(event.imageUrl));
  const columns = visible.length >= 3 ? "lg:grid-cols-3" : visible.length === 2 ? "md:grid-cols-2" : "";

  return (
    <section id="events" className="bg-cream-warm px-[5%] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:mb-14">
          <div className="flex flex-col gap-5">
            <Eyebrow>{t("events.eyebrow")}</Eyebrow>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-balance text-navy">
              {t("events.upcoming")}
            </h2>
          </div>
          {visible.length > 0 && (
            <Button href="/events" variant="outline-dark" className="self-start sm:self-auto">
              {t("events.viewAll")}
            </Button>
          )}
        </Reveal>

        {visible.length === 0 ? (
          <Reveal className="flex flex-col gap-4 border-t border-navy/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex max-w-[60ch] flex-col gap-2">
              <h3 className="font-serif text-2xl font-semibold text-navy">{t("events.emptyTitle")}</h3>
              <p className="text-[16px] leading-[1.7] text-[#4b5566]">{t("events.emptyBody")}</p>
            </div>
            <Button href="#visit" className="self-start sm:self-auto">
              {t("nav.planVisit")}
            </Button>
          </Reveal>
        ) : (
          <div className={`grid grid-cols-1 gap-6 lg:gap-8 ${columns}`}>
            {visible.map((event, i) => (
              <Reveal key={`${event.title}-${i}`} delay={Math.min(i * 0.08, 0.16)}>
                <article className="flex h-full flex-col overflow-hidden rounded-[18px] bg-white ring-1 ring-navy/10">
                  {event.imageUrl ? (
                    <div className="relative aspect-[4/3] bg-navy">
                      {/* Flyers are shown whole (contain), never cropped. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-contain"
                      />
                    </div>
                  ) : anyFlyer ? (
                    <div
                      aria-hidden
                      className="flex aspect-[4/3] flex-col items-center justify-center gap-2 bg-navy text-center"
                    >
                      <span className="font-serif text-[64px] font-semibold leading-none text-cream">{event.day}</span>
                      <span className="label-caps text-[13px] font-semibold uppercase tracking-[0.24em] text-gold">{event.month}</span>
                    </div>
                  ) : null}

                  <div className="flex flex-1 flex-col gap-3 p-6 sm:p-7">
                    <p className="label-caps text-[13px] font-semibold uppercase tracking-[0.16em] text-gold-deep">
                      {[`${event.month} ${event.day}`.trim(), event.time].filter(Boolean).join(" · ")}
                    </p>
                    <h3 className="font-serif text-[22px] font-semibold leading-snug text-navy sm:text-2xl">
                      {event.title}
                    </h3>
                    {event.description && (
                      <p className="line-clamp-3 text-[16px] leading-[1.65] text-[#4b5566]">
                        {renderInlineRichText(event.description)}
                      </p>
                    )}
                    {(event.location || event.registrationUrl) && (
                      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-navy/10 pt-4">
                        {event.location && <p className="text-[15px] text-[#5b6472]">{event.location}</p>}
                        {event.registrationUrl && (
                          <a
                            href={event.registrationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-11 items-center text-[15px] font-semibold text-gold-deep underline decoration-gold/40 underline-offset-4"
                          >
                            {t("events.register")}
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
