import { ButtonLink, Card, PageHeader, Section } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Who Azarya Justice and Mediation Hub is: a community-based organisation in Kasarani, Nairobi, working on mediation awareness and access to justice.",
  path: "/about",
});

/**
 * EDIT HERE: mission, vision, values and objectives.
 * The mission and vision are drafts from the brief and must be approved before launch.
 */
const mission =
  "To empower residents of Nairobi through community legal education, early dispute resolution, mediation support, safe referrals to formal and informal justice mechanisms, and advocacy for improved access to justice.";

const vision =
  "A Nairobi community where all residents, especially the poor and marginalized, can access timely, fair, and affordable justice and resolve disputes without fear, favor or undue cost.";

const values = [
  { name: "Dialogue", text: "Encouraging respectful communication and practical problem-solving." },
  {
    name: "Inclusion",
    text: "Making information and community engagement accessible to people who may otherwise be underserved.",
  },
  {
    name: "Local ownership",
    text: "Listening to communities and designing awareness activities around local needs.",
  },
  { name: "Dignity and respect", text: "Treating every person fairly and without stigma." },
  {
    name: "Integrity",
    text: "Being transparent about our role, limitations, partnerships and experience.",
  },
  {
    name: "Accessibility",
    text: "Communicating in plain language and considering disability, language and digital-access barriers.",
  },
  {
    name: "Confidentiality and care",
    text: "Handling enquiries thoughtfully and avoiding unnecessary collection or disclosure of sensitive information.",
  },
];

const objectives = [
  "Increase public understanding of mediation, negotiation and other appropriate dispute-resolution pathways.",
  "Improve awareness of access-to-justice options and where people can seek further assistance.",
  "Promote constructive dialogue and peaceful approaches to community and interpersonal conflict.",
  "Help community members identify when a dispute may be suitable for mediation and when other professional or formal processes may be necessary.",
  "Connect people to qualified legal professionals or relevant service providers when a matter falls outside our role.",
  "Build relationships with community groups, mediators, legal professionals, civil-society organisations and potential supporters to strengthen outreach.",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Making justice-related information accessible to our community"
        intro={
          <p>
            Azarya Justice and Mediation Hub is a community-based organisation (CBO) working from Kasarani, Off
            Seasons Road, Nairobi, Kenya.
          </p>
        }
      />

      <Section id="who-we-are" title="Who we are" tone="white">
        <div className="max-w-3xl space-y-4 text-lg leading-relaxed">
          <p>
            Azarya Justice and Mediation Hub exists to help make justice-related information more accessible to
            underserved communities. We believe that people should be able to understand their options when facing
            conflict and know where to seek appropriate help.
          </p>
          <p>
            Through mediation awareness, legal awareness, community engagement and responsible referrals, we aim to
            support informed decisions and constructive ways of addressing disputes. Our work is guided by dialogue,
            inclusion, local ownership, dignity and integrity.
          </p>
          <p>
            We are not a law firm and do not provide legal representation. Where a matter needs a qualified legal
            professional, we can help people identify appropriate services.
          </p>
        </div>
      </Section>

      <Section id="mission-vision" title="Mission and vision">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <h3 className="font-heading text-xl font-bold text-navy">Our mission</h3>
            <p className="mt-3 leading-relaxed">{mission}</p>
          </Card>
          <Card>
            <h3 className="font-heading text-xl font-bold text-navy">Our vision</h3>
            <p className="mt-3 leading-relaxed">{vision}</p>
          </Card>
        </div>
      </Section>

      <Section id="values" title="Our values" tone="white">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <li key={value.name} className="rounded-lg border-l-4 border-teal bg-offwhite p-5">
              <h3 className="font-heading text-lg font-bold text-navy">{value.name}</h3>
              <p className="mt-2 leading-relaxed">{value.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="objectives" title="What we aim to do">
        <ol className="max-w-3xl list-decimal space-y-3 pl-6 text-lg leading-relaxed marker:font-bold marker:text-teal">
          {objectives.map((objective) => (
            <li key={objective}>{objective}</li>
          ))}
        </ol>
      </Section>

      <Section id="registration" title="Registration and governance" tone="white">
        <p className="max-w-3xl leading-relaxed">
          Details of our registration and governance will be published here once they are verified and approved for
          public display.
        </p>
      </Section>

      <Section>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/services">Explore Our Services</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact the Hub
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
