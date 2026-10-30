import { ContactForm } from "@/components/contact-form";
import { Card, Notice, PageHeader, Section } from "@/components/ui";
import { safetyNotice, site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Contact Azarya Justice and Mediation Hub in Kasarani, Off Seasons Road, Nairobi. Call 0705 423 690, email us or send a short enquiry.",
  path: "/contact",
});

export default function ContactPage() {
  const mapLink = site.location.mapUrl ?? site.location.mapSearchUrl;
  return (
    <>
      <PageHeader
        eyebrow="Contact Us"
        title="Get in touch with the Hub"
        intro={
          <p>
            Ask a question, request information, discuss a community awareness session or explore partnership
            opportunities.
          </p>
        }
      />

      <Section tone="white" className="!pb-0">
        <Notice kind="safety" title={safetyNotice.title}>
          <p>{safetyNotice.body}</p>
        </Notice>
      </Section>

      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-6">
            <Card className="bg-offwhite">
              <h2 className="font-heading text-2xl font-bold text-navy">Contact details</h2>
              <address className="mt-4 space-y-4 not-italic">
                <div>
                  <p className="font-semibold text-navy">Location</p>
                  <p>{site.location.display}</p>
                  <p className="mt-1">
                    <a href={mapLink} target="_blank" rel="noopener noreferrer">
                      Get directions on Google Maps<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-navy">Phone</p>
                  <p>
                    <a href={site.contact.phoneHref}>{site.contact.phoneDisplay}</a>
                  </p>
                  {site.contact.whatsappUrl && (
                    <p className="mt-1">
                      <a href={site.contact.whatsappUrl} target="_blank" rel="noopener noreferrer">
                        Message us on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </p>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-navy">Email</p>
                  <p className="break-words">
                    <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
                  </p>
                </div>
                {site.contact.openingHours && (
                  <div>
                    <p className="font-semibold text-navy">Opening hours</p>
                    <p>{site.contact.openingHours}</p>
                  </div>
                )}
                {site.contact.responseTime && (
                  <div>
                    <p className="font-semibold text-navy">When to expect a reply</p>
                    <p>{site.contact.responseTime}</p>
                  </div>
                )}
              </address>
            </Card>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-navy">Send an enquiry</h2>
            <p className="mt-2 mb-6 leading-relaxed">
              Use this short form for general questions. We collect only what we need to reply to you.
            </p>
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
