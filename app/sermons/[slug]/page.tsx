import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sermons } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlayGlyph from "@/components/ui/PlayGlyph";

interface SermonPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return sermons.map((sermon) => ({ slug: sermon.slug }));
}

export async function generateMetadata({
  params,
}: SermonPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sermon = sermons.find((s) => s.slug === slug);
  if (!sermon) return { title: "Sermon not found" };

  return {
    title: sermon.title,
    description: sermon.description,
    openGraph: {
      title: `${sermon.title} | ${siteConfig.shortName}`,
      description: sermon.description,
    },
  };
}

export default async function SermonPage({ params }: SermonPageProps) {
  const { slug } = await params;
  const sermon = sermons.find((s) => s.slug === slug);

  if (!sermon) notFound();

  return (
    <div className="w-full overflow-x-hidden bg-cream text-[#1b2430]">
      <Navbar />

      <main id="main-content">
      <article className="mx-auto max-w-[820px] px-[5%] py-24">
        <Link
          href="/sermons"
          className="mb-8 inline-block text-sm font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4"
        >
          ← All sermons
        </Link>

        <div className="relative mb-8 flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-[repeating-linear-gradient(135deg,#0b1f3a,#0b1f3a_12px,#122a4d_12px,#122a4d_24px)] shadow-[0_20px_50px_rgba(11,31,58,0.15)]">
          <PlayGlyph size={72} />
          <span className="absolute bottom-4 left-4 text-xs text-[#c9d3e2]">
            Full video coming soon
          </span>
        </div>

        <span className="text-[12.5px] font-bold uppercase tracking-[0.1em] text-gold-deep">
          {sermon.series}
        </span>
        <h1 className="mt-3 font-serif text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-navy">
          {sermon.title}
        </h1>
        <p className="mt-3 text-sm text-[#5b6472]">
          {sermon.speaker} · {sermon.date}
        </p>
        <p className="mt-6 text-base leading-relaxed text-[#4b5566]">
          {sermon.description}
        </p>
      </article>
      </main>

      <Footer />
    </div>
  );
}
