import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { getSermons, getSiteSettings } from "@/lib/cms/queries";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import PlayGlyph from "@/components/ui/PlayGlyph";

export const metadata: Metadata = {
  title: "Sermons",
  description: `Watch and read recent messages from ${siteConfig.name}.`,
};

export default async function SermonsPage() {
  const [sermons, settings] = await Promise.all([getSermons(), getSiteSettings()]);
  const contact = { email: settings.church_email, phone: settings.church_phone };

  return (
    <div className="w-full overflow-x-hidden bg-cream text-[#1b2430]">
      <SiteHeader />

      <main id="main-content">
      <section className="mx-auto max-w-[1160px] px-[5%] py-24">
        <div className="mb-14 flex flex-col items-center gap-3.5 text-center">
          <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-gold-deep">
            Sermons &amp; Media
          </span>
          <h1 className="font-serif text-[clamp(1.875rem,4vw,2.625rem)] font-bold text-navy">
            All Messages
          </h1>
        </div>

        {sermons.length === 0 ? (
          <div className="mx-auto flex max-w-[560px] flex-col items-center gap-5 rounded-[24px] border border-navy/10 bg-gradient-to-br from-white to-cream/20 px-8 py-16 text-center shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/15">
              <svg className="h-7 w-7 text-gold-deep" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <h2 className="font-serif text-2xl font-bold text-navy">New Messages Coming Soon</h2>
            <p className="max-w-[46ch] text-[16px] leading-[1.7] text-[#4b5566]">
              We&apos;re building our online sermon library. Join us in person for worship, or
              check back soon for recordings.
            </p>
            <Link
              href="/#services"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-linear-to-br from-gold-light to-gold px-8 py-4 text-[15px] font-semibold text-navy shadow-[0_8px_28px_rgba(201,164,92,0.35)] transition-all duration-300 hover:-translate-y-0.5"
            >
              View Service Times
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {sermons.map((sermon) => (
              <Link
                key={sermon.slug}
                href={`/sermons/${sermon.slug}`}
                className="overflow-hidden rounded-2xl bg-white shadow-[0_8px_24px_rgba(11,31,58,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(11,31,58,0.12)]"
              >
                <div className="flex aspect-video items-center justify-center bg-[repeating-linear-gradient(135deg,#e5dac2,#e5dac2_10px,#eee6d5_10px,#eee6d5_20px)]">
                  <PlayGlyph size={44} />
                </div>
                <div className="flex flex-col gap-1.5 p-5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gold-deep">
                    {sermon.series}
                  </span>
                  <div className="font-serif text-lg font-semibold text-navy">
                    {sermon.title}
                  </div>
                  <div className="text-[13px] text-[#5b6472]">
                    {sermon.speaker} · {sermon.date}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
      </main>

      <Footer
        social={{ facebook: settings.facebook_url, tiktok: settings.tiktok_url, youtube: settings.youtube_channel_url }}
        contact={contact}
      />
    </div>
  );
}
