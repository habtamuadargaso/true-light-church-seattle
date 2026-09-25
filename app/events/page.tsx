import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { getEvents, getSiteSettings } from "@/lib/cms/queries";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import Events from "@/components/Events";

// Admin event actions only revalidate "/", so this page refreshes on a
// timer instead — also drops events once their date has passed.
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Events",
  description: `Upcoming gatherings and special events at ${siteConfig.name}.`,
  alternates: {
    canonical: "/events",
  },
};

export default async function EventsPage() {
  const [events, settings] = await Promise.all([getEvents(), getSiteSettings()]);
  const contact = { email: settings.church_email, phone: settings.church_phone };

  return (
    <div className="w-full overflow-x-hidden bg-cream text-[#1b2430]">
      <SiteHeader />

      <main id="main-content" className="pt-24">
        <Events events={events} />
      </main>

      <Footer
        social={{ facebook: settings.facebook_url, tiktok: settings.tiktok_url, youtube: settings.youtube_channel_url }}
        contact={contact}
      />
    </div>
  );
}
