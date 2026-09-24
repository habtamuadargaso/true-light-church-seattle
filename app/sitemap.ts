import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getSermons } from "@/lib/cms/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["", "/sermons"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  // Live, published sermons from the CMS — the static list in lib/data.ts
  // is only a build-time fallback and is normally empty.
  const sermons = await getSermons();
  const sermonRoutes = sermons.map((sermon) => ({
    url: `${siteConfig.url}/sermons/${sermon.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...sermonRoutes];
}
