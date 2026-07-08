import type { Metadata } from "next";
import Link from "next/link";
import { sermons } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlayGlyph from "@/components/ui/PlayGlyph";

export const metadata: Metadata = {
  title: "Sermons",
  description: `Watch and read recent messages from ${siteConfig.name}.`,
};

export default function SermonsPage() {
  return (
    <div className="w-full overflow-x-hidden bg-cream text-[#1b2430]">
      <Navbar />

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
      </section>
      </main>

      <Footer />
    </div>
  );
}
