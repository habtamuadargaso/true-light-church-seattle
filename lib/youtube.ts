/**
 * Extracts the video ID from common YouTube URL formats: watch?v=,
 * youtu.be/, embed/, shorts/, and live/. Returns null for anything else, including
 * malformed URLs — callers should treat that as "no valid video" and fall
 * back to a placeholder rather than rendering a broken player/thumbnail.
 */
export function getYouTubeVideoId(url: string | null | undefined): string | null {
  if (!url) return null;

  let id: string | null = null;
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase();

    if (hostname === "youtu.be") {
      id = parsed.pathname.slice(1);
    } else if (hostname === "youtube.com" || hostname.endsWith(".youtube.com")) {
      if (parsed.pathname === "/watch") {
        id = parsed.searchParams.get("v");
      } else if (parsed.pathname.startsWith("/embed/")) {
        id = parsed.pathname.split("/embed/")[1];
      } else if (parsed.pathname.startsWith("/shorts/")) {
        id = parsed.pathname.split("/shorts/")[1];
      } else if (parsed.pathname.startsWith("/live/")) {
        id = parsed.pathname.split("/live/")[1];
      }
    }
  } catch {
    return null;
  }

  if (!id) return null;
  id = id.split("?")[0].split("&")[0].split("/")[0].trim();
  return id || null;
}

/** Privacy-enhanced embed URL for a stored YouTube URL, or null if invalid. */
export function getYouTubeEmbedUrl(url: string | null | undefined): string | null {
  const id = getYouTubeVideoId(url);
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
}

/**
 * Public YouTube-hosted thumbnail for a stored YouTube URL, or null if
 * invalid. Uses hqdefault, which YouTube generates for every video
 * (maxresdefault frequently 404s for Shorts/older uploads).
 */
export function getYouTubeThumbnailUrl(url: string | null | undefined): string | null {
  const id = getYouTubeVideoId(url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
}
