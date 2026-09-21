import type { AnnouncementView } from "@/lib/cms/types";

export default function AnnouncementBar({ announcement }: { announcement: AnnouncementView | null }) {
  if (!announcement) return null;

  return (
    <div className="bg-gold px-[5%] py-2.5 text-center text-sm font-medium text-navy">
      <span className="font-semibold">{announcement.title}</span>
      {announcement.body && <span className="ml-2">{announcement.body}</span>}
    </div>
  );
}
