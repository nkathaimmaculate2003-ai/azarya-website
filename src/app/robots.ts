import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/** Generates /robots.txt. All public pages may be crawled; the form endpoint may not. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
