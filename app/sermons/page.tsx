import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { getSermons, getSiteSettings } from "@/lib/cms/queries";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import SermonsLibrary from "@/components/sermons/SermonsLibrary";

export const metadata: Metadata = {
  title: "Messages",
  description: `Watch and read recent messages from ${siteConfig.name}.`,
  alternates: {
    canonical: "/sermons",
  },
};

export default async function SermonsPage() {
  const [sermons, settings] = await Promise.all([getSermons(), getSiteSettings()]);
  const contact = { email: settings.church_email, phone: settings.church_phone };

  return (
    <div className="w-full overflow-x-hidden bg-cream text-[#1b2430]">
      <SiteHeader />

      <main id="main-content">
        <SermonsLibrary sermons={sermons} />
      </main>

      <Footer
        social={{ facebook: settings.facebook_url, tiktok: settings.tiktok_url, youtube: settings.youtube_channel_url }}
        contact={contact}
      />
    </div>
  );
}
