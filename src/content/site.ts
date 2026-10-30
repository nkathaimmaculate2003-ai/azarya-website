/**
 * Organisation-wide details used across the website.
 *
 * EDIT HERE to update the organisation name, contact details, location,
 * navigation and disclaimer text. Every page reads from this file, so a change
 * here updates the whole site. Optional details left as `null` (WhatsApp,
 * opening hours, response time) are simply hidden until filled in.
 */

export const site = {
  name: "Azarya Justice and Mediation Hub",
  shortName: "Azarya",
  /** Other names people may search for. Used in structured data for Google. */
  alternateNames: ["Azarya", "Azarya Mediation Hub", "Azarya Justice Hub"],
  tagline: "Making Justice and Mediation More Accessible",
  description:
    "Learn about mediation, legal awareness and access-to-justice support from Azarya Justice and Mediation Hub in Kasarani, Nairobi.",
  ogDescription:
    "Community-centred mediation awareness, legal awareness and access-to-justice information in Nairobi, Kenya.",
  organisationType: "Community-based organisation (CBO)",

  /**
   * Public website address. Set NEXT_PUBLIC_SITE_URL in your environment once
   * the domain is confirmed; the fallback below is a placeholder.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.azaryamediationhub.org").replace(/\/$/, ""),

  location: {
    display: "Kasarani, Off Seasons Road, Nairobi, Kenya",
    street: "Off Seasons Road",
    locality: "Kasarani",
    city: "Nairobi",
    country: "Kenya",
    countryCode: "KE",
    /** Exact map pin not yet confirmed. Replace with the approved Google Maps share link. */
    mapUrl: null as string | null,
    /** Search link used until an exact map pin is confirmed. */
    mapSearchUrl:
      "https://www.google.com/maps/search/?api=1&query=Seasons+Road%2C+Kasarani%2C+Nairobi%2C+Kenya",
  },

  contact: {
    phoneDisplay: "0705 423 690",
    phoneHref: "tel:+254705423690",
    phoneInternational: "+254705423690",
    email: "azaryajusticeandmediationhub@gmail.com",
    /** Not yet confirmed as a WhatsApp number. Set to a wa.me link once confirmed. */
    whatsappUrl: null as string | null,
    /** Opening days and hours, if the organisation decides to publish them. */
    openingHours: null as string | null,
    /** Expected response time for enquiries, if confirmed. */
    responseTime: null as string | null,
  },

  /** Add approved social media profile links here, e.g. { label: "Facebook", href: "https://..." }. */
  social: [] as { label: string; href: string }[],
} as const;

export type NavItem = { label: string; href: string };

/** Primary navigation (kept to six items plus the Contact button, per the brief). */
export const mainNav: NavItem[] = [
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Mediation Explained", href: "/mediation-explained" },
  { label: "Legal Awareness", href: "/legal-awareness" },
  { label: "Programmes", href: "/community-programmes" },
  { label: "Partner With Us", href: "/partner-with-us" },
];

export const footerLegalNav: NavItem[] = [
  { label: "Privacy Notice", href: "/privacy-notice" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Contact Us", href: "/contact" },
];

/** General information disclaimer (from the brief; review before launch). */
export const disclaimer = {
  short:
    "Information on this website is for general awareness and education. It is not individual legal advice, and not every dispute is suitable for mediation.",
  full: [
    "Information on this website is provided for general awareness and educational purposes. It is not a substitute for individual legal advice from a qualified legal professional.",
    "Each situation is different, and not every dispute is suitable for mediation.",
    "Contacting Azarya Justice and Mediation Hub through this website does not by itself create a professional relationship or guarantee that the organisation can take on a matter. Where appropriate, users may be directed to qualified professionals or relevant services.",
  ],
};

/** Safety message shown wherever people might be facing urgent risk. */
export const safetyNotice = {
  title: "If you are in immediate danger",
  body: "This website and its contact form are not an emergency service and may not be monitored continuously. If you or someone else faces immediate danger, violence or coercion, contact the police, emergency services or a qualified protection and support service straight away.",
};
