import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink, Card, Container, Notice, Section } from "@/components/ui";
import { FaqList } from "@/components/faq-list";
import { ServiceCard } from "@/components/service-card";
import { safetyNotice, site } from "@/content/site";
import { services } from "@/content/services";
import { faqs } from "@/content/resources";
import { programmes, statusLabels } from "@/content/programmes";

export const metadata: Metadata = {
  title: { absolute: `${site.name} | Nairobi, Kenya` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: site.name,
    description: site.ogDescription,
    url: "/",
    siteName: site.name,
    locale: "en_KE",
    type: "website",
  },
};

/** Structured data describing the organisation, limited to confirmed facts. */
const organisationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: site.name,
  description: site.ogDescription,
  url: site.url,
  telephone: site.contact.phoneInternational,
  email: site.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.location.street,
    addressLocality: `${site.location.locality}, ${site.location.city}`,
    addressCountry: site.location.countryCode,
  },
  areaServed: { "@type": "City", name: "Nairobi" },
  ...(site.social.length > 0 ? { sameAs: site.social.map((s) => s.href) } : {}),
};

const howWeHelp = [
  {
    title: "Awareness",
    text: "Community sessions and plain-language resources about mediation and access to justice.",
  },
  {
    title: "Information",
    text: "Clear information about possible options and what different processes involve.",
  },
  {
    title: "Appropriate support",
    text: "Information and support around mediation for suitable disputes, and help to consider whether it fits.",
  },
  {
    title: "Referrals",
    text: "Where appropriate, help identifying qualified legal professionals or relevant services.",
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationJsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Hero */}
      <div className="bg-navy text-white">
        <Container className="py-16 sm:py-24">
          <p className="mb-4 text-sm font-semibold tracking-wide text-mist uppercase">
            Community-based organisation · Kasarani, Nairobi
          </p>
          <h1 className="max-w-3xl font-heading text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
            {site.tagline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist sm:text-xl">
            We share practical information about mediation and access to justice, promote constructive dialogue and
            help communities understand where to seek appropriate support.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/services" variant="light">
              Explore Our Services
            </ButtonLink>
            <ButtonLink href="/contact" className="border-2 border-white bg-transparent hover:bg-white/10">
              Contact the Hub
            </ButtonLink>
          </div>
        </Container>
      </div>

      {/* Introduction */}
      <Section id="about-azarya" title="About Azarya" tone="white">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr] lg:items-start">
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              Azarya Justice and Mediation Hub is a community-based organisation in Kasarani, Nairobi, working to
              improve awareness of mediation, legal pathways and access to justice. We share practical information,
              promote constructive dialogue and help communities understand where to seek appropriate support.
            </p>
            <p>
              We aim to serve residents, families, youth, community groups and local leaders, especially people who face
              practical, financial, social or information barriers when seeking help.
            </p>
            <p>
              <Link href="/about">Learn more about who we are</Link>
            </p>
          </div>
          <Card className="bg-offwhite">
            <p className="font-heading text-lg font-bold text-navy">Our approach</p>
            <p className="mt-2 leading-relaxed">
              Community-centred, respectful, inclusive and grounded in dialogue. We are not a law firm and do not
              provide legal representation.
            </p>
          </Card>
        </div>
      </Section>

      {/* Services */}
      <Section
        id="services"
        title="Our services"
        intro="Every dispute is different. These are the areas where we share information, raise awareness and help people find appropriate next steps."
      >
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.id}>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <ButtonLink href="/services" variant="secondary">
            See all services
          </ButtonLink>
        </div>
      </Section>

      {/* How we can help */}
      <Section id="how-we-help" title="How we can help" tone="white">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howWeHelp.map((item) => (
            <li key={item.title} className="rounded-lg border-t-4 border-teal bg-offwhite p-6">
              <h3 className="font-heading text-xl font-bold text-navy">{item.title}</h3>
              <p className="mt-2 leading-relaxed">{item.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Mediation explainer */}
      <Section id="mediation" title="What is mediation?" tone="mist">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              Mediation is a voluntary process where a neutral person helps people in a disagreement talk to each
              other, understand the issues and explore outcomes they can both accept.
            </p>
            <p>
              It can help with some family, neighbourhood and community disagreements, but it is not suitable for every
              situation.
            </p>
            <ButtonLink href="/mediation-explained">Read: Mediation Explained</ButtonLink>
          </div>
          <Notice kind="safety" title={safetyNotice.title}>
            <p>{safetyNotice.body}</p>
          </Notice>
        </div>
      </Section>

      {/* Programmes */}
      <Section
        id="programmes"
        title="Community programmes"
        intro="We are planning community awareness activities. Each activity below is clearly labelled to show whether it is planned or has already taken place."
        tone="white"
      >
        <ul className="grid gap-6 sm:grid-cols-2">
          {programmes.slice(0, 2).map((programme) => (
            <li key={programme.title}>
              <Card className="h-full">
                <p className="inline-block rounded-full border border-teal px-3 py-0.5 text-sm font-semibold text-teal">
                  {statusLabels[programme.status]}
                </p>
                <h3 className="mt-3 font-heading text-xl font-bold text-navy">{programme.title}</h3>
                <p className="mt-2 leading-relaxed">{programme.description}</p>
              </Card>
            </li>
          ))}
        </ul>
        <p className="mt-8">
          <Link href="/community-programmes">See all community programmes</Link>
        </p>
      </Section>

      {/* Partnership */}
      <Section id="partner" tone="navy">
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr] lg:items-center">
          <div>
            <h2 id="partner-heading" className="font-heading text-2xl font-bold text-white sm:text-3xl">
              Partner with us
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-mist">
              We welcome conversations with community organisations, mediators, qualified legal professionals,
              educational institutions and supporters who share an interest in improving access to justice.
            </p>
          </div>
          <div className="lg:text-right">
            <ButtonLink href="/partner-with-us" variant="light">
              Explore Partnership Opportunities
            </ButtonLink>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" title="Common questions">
        <FaqList faqs={faqs} />
      </Section>

      {/* Contact */}
      <Section id="contact" title="Get in touch" tone="white">
        <div className="grid gap-8 md:grid-cols-2">
          <address className="space-y-3 text-lg not-italic">
            <p>
              <strong className="text-navy">Location:</strong> {site.location.display}
            </p>
            <p>
              <strong className="text-navy">Phone:</strong>{" "}
              <a href={site.contact.phoneHref}>{site.contact.phoneDisplay}</a>
            </p>
            <p className="break-words">
              <strong className="text-navy">Email:</strong>{" "}
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            </p>
          </address>
          <div className="flex flex-col items-start gap-3">
            <ButtonLink href="/contact">Ask a Question</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Discuss a Community Awareness Session
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
