import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * Builds consistent page metadata: a unique title and description, a
 * canonical URL and Open Graph tags. `path` is the page's URL path, e.g. "/about".
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: path,
      siteName: site.name,
      locale: "en_KE",
      type: "website",
      // Page-level openGraph replaces the site-wide one, so repeat the shared image.
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.name }],
    },
  };
}
