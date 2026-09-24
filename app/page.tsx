import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ServiceTimes from "@/components/ServiceTimes";
import Ministries from "@/components/Ministries";
import Pastor from "@/components/Pastor";
import SundayWorshipService from "@/components/SundayWorshipService";
import Sermons from "@/components/Sermons";
import Gallery from "@/components/Gallery";
import Events from "@/components/Events";
import Mission from "@/components/Mission";
import Giving from "@/components/Giving";
import Visit from "@/components/Visit";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import {
  getEvents,
  getGalleryItems,
  getPastorImageUrl,
  getSermons,
  getSiteSettings,
  getSundayWorshipService,
} from "@/lib/cms/queries";

export default async function Home() {
  const [sermons, events, gallery, settings, sundayService] = await Promise.all([
    getSermons(),
    getEvents(),
    getGalleryItems(),
    getSiteSettings(),
    getSundayWorshipService(),
  ]);
  const pastorImageUrl = getPastorImageUrl(settings);

  return (
    <div className="w-full overflow-x-hidden bg-cream text-[#1b2430]">
      <SiteHeader />
      <main id="main-content">
        <Hero />
        <About />
        <ServiceTimes />
        <Ministries />
        <Pastor settings={settings} imageUrl={pastorImageUrl} />
        <Sermons sermons={sermons} />
        <SundayWorshipService service={sundayService} />
        <Gallery items={gallery} />
        <Events events={events} />
        <Mission />
        <Giving givingUrl={settings.giving_url} />
        <Visit />
        <Contact
          contact={{ email: settings.church_email, phone: settings.church_phone }}
          social={{
            facebook: settings.facebook_url,
            tiktok: settings.tiktok_url,
            youtube: settings.youtube_channel_url,
          }}
        />
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
