import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { articles } from "@/content/resources";

/** Generates /sitemap.xml. New pages must be added to this list. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/services", priority: 0.9 },
    { path: "/mediation-explained", priority: 0.8 },
    { path: "/legal-awareness", priority: 0.8 },
    { path: "/community-programmes", priority: 0.7 },
    { path: "/partner-with-us", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
    { path: "/privacy-notice", priority: 0.3 },
    { path: "/disclaimer", priority: 0.3 },
  ];

  return [
    ...pages.map((page) => ({
      url: `${site.url}${page.path}`,
      changeFrequency: "monthly" as const,
      priority: page.priority,
    })),
    ...articles.map((article) => ({
      url: `${site.url}/legal-awareness/${article.slug}`,
      lastModified: article.reviewed,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
