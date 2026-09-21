import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import { getActiveAnnouncement } from "@/lib/cms/queries";

/**
 * Fixed top header: an optional announcement banner stacked above the
 * Navbar. Used on every page instead of rendering <Navbar /> directly, so
 * an active announcement pushes the nav down naturally instead of being
 * hidden behind it (both are fixed as one unit, not independently).
 */
export default async function SiteHeader() {
  const announcement = await getActiveAnnouncement();

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <AnnouncementBar announcement={announcement} />
      <Navbar />
    </div>
  );
}
