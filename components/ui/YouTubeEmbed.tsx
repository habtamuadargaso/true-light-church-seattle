import { getYouTubeEmbedUrl } from "@/lib/youtube";

interface YouTubeEmbedProps {
  url: string;
  title: string;
  className?: string;
}

export default function YouTubeEmbed({ url, title, className = "" }: YouTubeEmbedProps) {
  const embedUrl = getYouTubeEmbedUrl(url);
  if (!embedUrl) return null;

  return (
    <div className={`relative aspect-video overflow-hidden rounded-2xl shadow-lg ${className}`}>
      <iframe
        src={embedUrl}
        title={title}
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
