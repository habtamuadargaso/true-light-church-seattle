import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { sermons } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/sermons"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const sermonRoutes = sermons.map((sermon) => ({
    url: `${siteConfig.url}/sermons/${sermon.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...sermonRoutes];
}
