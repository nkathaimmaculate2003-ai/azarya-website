import { BulletList, ButtonLink, Card, PageHeader, Section } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Partner With Us",
  description:
    "Explore collaboration with Azarya Justice and Mediation Hub on community awareness, educational resources and access to justice in Nairobi.",
  path: "/partner-with-us",
});

const audiences = [
  {
    title: "Community-based and civil-society organisations",
    text: "Work together on outreach and awareness activities for the communities you serve.",
  },
  {
    title: "Mediators and qualified legal professionals",
    text: "Discuss responsible referrals and contributions to community education.",
  },
  {
    title: "Educational institutions",
    text: "Explore awareness sessions and educational resources for students and young people.",
  },
  {
    title: "Funders, foundations and corporate supporters",
    text: "Discuss support for carefully planned access-to-justice and outreach activities.",
  },
];

const collaborationAreas = [
  "Community awareness sessions",
  "Educational resources",
  "Referral pathways",
  "Support for carefully planned outreach activities",
];

export default function PartnerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Partner With Us"
        title="Working together to improve access to justice"
        intro={
          <p>
            We welcome conversations with community-based organisations, mediators, qualified legal professionals,
            educational institutions, civil-society organisations and supporters who share an interest in improving
            access to justice.
          </p>
        }
      />

      <Section id="who" title="Who we would like to hear from" tone="white">
        <ul className="grid gap-6 md:grid-cols-2">
          {audiences.map((audience) => (
            <li key={audience.title}>
              <Card className="h-full bg-offwhite">
                <h3 className="font-heading text-xl font-bold text-navy">{audience.title}</h3>
                <p className="mt-2 leading-relaxed">{audience.text}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="how" title="How we could collaborate">
        <div className="max-w-3xl space-y-4 text-lg leading-relaxed">
          <p>Potential collaboration may include:</p>
          <BulletList items={collaborationAreas} />
          <p>
            Any partnership will be described publicly only after it has been confirmed. We value transparency about
            our role, limitations and experience.
          </p>
        </div>
      </Section>

      <Section id="start" title="Start a conversation" tone="mist">
        <p className="max-w-3xl text-lg leading-relaxed">
          Send us a short message about your organisation and the kind of collaboration you have in mind, and we will
          be in touch.
        </p>
        <div className="mt-6">
          <ButtonLink href="/contact">Explore Partnership Opportunities</ButtonLink>
        </div>
      </Section>
    </>
  );
}
