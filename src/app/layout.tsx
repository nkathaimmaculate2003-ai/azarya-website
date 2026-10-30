import type { Metadata, Viewport } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/content/site";
import "./globals.css";

// Fonts are downloaded at build time and served from this site, so visitors'
// browsers never contact Google.
const sans = Source_Sans_3({ subsets: ["latin"], variable: "--font-source-sans", display: "swap" });
const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-source-serif", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    template: `%s | ${site.name}`,
    default: `${site.name} | Nairobi, Kenya`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    title: site.name,
    description: site.ogDescription,
    siteName: site.name,
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.ogDescription,
  },
  formatDetection: { telephone: false },
  robots: { index: true, follow: true },
  // Google Search Console "HTML tag" verification. Set GOOGLE_SITE_VERIFICATION
  // to the code from the tag's content="..." value. Not needed if you verified by DNS.
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#16384D",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-KE" className={`${sans.variable} ${serif.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main-content"
          className="sr-only z-50 rounded-md bg-navy px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
