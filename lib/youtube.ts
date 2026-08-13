/**
 * Extracts the video ID from common YouTube URL formats
 * (watch?v=, youtu.be/, embed/, shorts/) and returns a privacy-enhanced
 * embed URL, or null if the input isn't a recognizable YouTube URL.
 */
export function getYouTubeEmbedUrl(url: string | null | undefined): string | null {
  if (!url) return null;

  let id: string | null = null;
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") {
      id = parsed.pathname.slice(1);
    } else if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname === "/watch") {
        id = parsed.searchParams.get("v");
      } else if (parsed.pathname.startsWith("/embed/")) {
        id = parsed.pathname.split("/embed/")[1];
      } else if (parsed.pathname.startsWith("/shorts/")) {
        id = parsed.pathname.split("/shorts/")[1];
      }
    }
  } catch {
    return null;
  }

  if (!id) return null;
  id = id.split("?")[0].split("&")[0];
  return `https://www.youtube-nocookie.com/embed/${id}`;
}
