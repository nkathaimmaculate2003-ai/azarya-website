import Link from "next/link";
import { BulletList, ButtonLink, Notice, PageHeader, Placeholder, Section } from "@/components/ui";
import { pendingConfirmation, safetyNotice } from "@/content/site";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Our Services",
  description:
    "Mediation information, family conflict mediation awareness, legal awareness, referrals, community peacebuilding and conflict-management support in Kasarani, Nairobi.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Services"
        title="How Azarya can support you and your community"
        intro={
          <p>
            Every dispute is different. Azarya shares information about mediation and other pathways, supports
            awareness and community education, and helps people identify appropriate next steps. Not every matter is
            suitable for mediation, and some situations require urgent protection, formal legal processes or advice
            from a qualified professional.
          </p>
        }
      />

      <Section tone="white" className="!pb-0">
        <nav aria-label="Services on this page">
          <h2 className="font-heading text-lg font-bold text-navy">On this page</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {services.map((service) => (
              <li key={service.id}>
                <Link href={`#${service.id}`}>{service.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </Section>

      <div className="bg-white">
        {services.map((service, index) => (
          <Section key={service.id} id={service.id} title={service.title} tone={index % 2 === 0 ? "white" : "default"}>
            <div className="grid gap-8 lg:grid-cols-[3fr_2fr]">
              <div className="space-y-4 text-lg leading-relaxed">
                {service.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-heading text-lg font-bold text-navy">This may include</h3>
                  <div className="mt-3">
                    <BulletList items={service.mayInclude} />
                  </div>
                </div>
                {service.note && (
                  <Notice kind={service.id === "family-mediation" ? "safety" : "info"} title="Please note">
                    <p>{service.note}</p>
                  </Notice>
                )}
              </div>
            </div>
          </Section>
        ))}
      </div>

      <Section id="fees-and-access" title="Fees, appointments and languages">
        <p className="max-w-3xl leading-relaxed">
          Please contact us to ask whether an appointment is needed, whether any costs apply and which languages we can
          support you in.
        </p>
        <ul className="mt-4 space-y-2">
          <li>
            <Placeholder>{pendingConfirmation.feesAppointments}</Placeholder>
          </li>
          <li>
            <Placeholder>{pendingConfirmation.languages}</Placeholder>
          </li>
        </ul>
      </Section>

      <Section tone="white">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <Notice kind="safety" title={safetyNotice.title}>
            <p>{safetyNotice.body}</p>
          </Notice>
          <div className="space-y-4">
            <p className="text-lg leading-relaxed">
              Not sure which service fits your situation? Get in touch with a short, general question and we will do
              our best to point you in the right direction.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact">Request Information</ButtonLink>
              <ButtonLink href="/mediation-explained" variant="secondary">
                Mediation Explained
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
