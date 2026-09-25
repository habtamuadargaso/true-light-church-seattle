import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import Pathways from "@/components/Pathways";
import LatestMessage from "@/components/LatestMessage";
import SundayWorshipService from "@/components/SundayWorshipService";
import GatherWithUs from "@/components/GatherWithUs";
import UpcomingEvents from "@/components/UpcomingEvents";
import Mission from "@/components/Mission";
import Ministries from "@/components/Ministries";
import Pastor from "@/components/Pastor";
import Gallery from "@/components/Gallery";
import Giving from "@/components/Giving";
import Contact from "@/components/Contact";
import FinalInvitation from "@/components/FinalInvitation";
import Footer from "@/components/Footer";
import {
  getEvents,
  getGalleryItems,
  getPastorImageUrl,
  getSermons,
  getSiteSettings,
  getSundayWorshipService,
} from "@/lib/cms/queries";

// CMS edits revalidate "/" immediately; this timer additionally drops
// events from "Upcoming Events" once their date has passed.
export const revalidate = 300;

export default async function Home() {
  const [sermons, events, gallery, settings, sundayService] = await Promise.all([
    getSermons(),
    getEvents(),
    getGalleryItems(),
    getSiteSettings(),
    getSundayWorshipService(),
  ]);
  const pastorImageUrl = getPastorImageUrl(settings);
  const latestSermon = sermons[0];
  // The Sunday service recording only gets its own section when it isn't
  // already the message featured above it.
  const showSundayService = Boolean(sundayService && sundayService.slug !== latestSermon?.slug);

  return (
    <div className="w-full overflow-x-hidden bg-cream text-[#1b2430]">
      <SiteHeader />
      <main id="main-content">
        {/* Visitor journey */}
        <Hero />
        <Welcome />
        <Pathways />
        <LatestMessage sermon={latestSermon} />
        {showSundayService && <SundayWorshipService service={sundayService} />}
        <GatherWithUs />
        <UpcomingEvents events={events} />
        <Mission />
        <Ministries />
        <Pastor settings={settings} imageUrl={pastorImageUrl} />

        {/* Supporting sections — kept so every existing nav/footer anchor resolves */}
        <Gallery items={gallery} />
        <Giving givingUrl={settings.giving_url} />
        <Contact
          contact={{ email: settings.church_email, phone: settings.church_phone }}
          social={{
            facebook: settings.facebook_url,
            tiktok: settings.tiktok_url,
            youtube: settings.youtube_channel_url,
          }}
        />
        <FinalInvitation />
      </main>
      <Footer
        social={{
          facebook: settings.facebook_url,
          tiktok: settings.tiktok_url,
          youtube: settings.youtube_channel_url,
        }}
        contact={{ email: settings.church_email, phone: settings.church_phone }}
      />
    </div>
  );
}
