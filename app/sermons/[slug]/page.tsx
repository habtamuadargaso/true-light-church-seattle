import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { getSermonBySlug, getSermons, getSiteSettings } from "@/lib/cms/queries";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import SermonDetail from "@/components/sermons/SermonDetail";

interface SermonPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const sermons = await getSermons();
  return sermons.map((sermon) => ({ slug: sermon.slug }));
}

export async function generateMetadata({
  params,
}: SermonPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sermon = await getSermonBySlug(slug);
  if (!sermon) return { title: "Sermon not found" };

  return {
    title: sermon.title,
    description: sermon.description,
    alternates: {
      canonical: `/sermons/${slug}`,
    },
    openGraph: {
      title: `${sermon.title} | ${siteConfig.shortName}`,
      description: sermon.description,
    },
  };
}

export default async function SermonPage({ params }: SermonPageProps) {
  const { slug } = await params;
  const [sermon, allSermons, settings] = await Promise.all([
    getSermonBySlug(slug),
    getSermons(),
    getSiteSettings(),
  ]);

  if (!sermon) notFound();

  const others = allSermons.filter((s) => s.slug !== sermon.slug);
  const sameSeries = sermon.series ? others.filter((s) => s.series === sermon.series) : [];
  const related = (sameSeries.length > 0 ? sameSeries : others).slice(0, 3);

  return (
    <div className="w-full overflow-x-hidden bg-cream text-[#1b2430]">
      <SiteHeader />

      <main id="main-content">
        <SermonDetail sermon={sermon} related={related} />
      </main>

      <Footer
        social={{ facebook: settings.facebook_url, tiktok: settings.tiktok_url, youtube: settings.youtube_channel_url }}
        contact={{ email: settings.church_email, phone: settings.church_phone }}
      />
    </div>
  );
}
