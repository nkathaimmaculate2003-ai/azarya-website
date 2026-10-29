import Link from "next/link";
import { BulletList, Container, PageHeader, Placeholder } from "@/components/ui";
import { site } from "@/content/site";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy Notice",
  description:
    "How Azarya Justice and Mediation Hub collects, uses and protects information submitted through this website.",
  path: "/privacy-notice",
});

/** EDIT HERE: update this date whenever the privacy notice changes. */
const lastUpdated = "2026-10-29";

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-10 mb-3 font-heading text-2xl font-bold text-navy">{children}</h2>;
}

export default function PrivacyNoticePage() {
  return (
    <>
      <PageHeader
        eyebrow="Privacy Notice"
        title="How we handle your information"
        intro={
          <p>
            Last updated <time dateTime={lastUpdated}>{formatDate(lastUpdated)}</time>
          </p>
        }
      />
      <Container className="py-12">
        <div className="max-w-3xl text-lg leading-relaxed">
          <p className="mb-6">
            <Placeholder>
              This notice is a draft. Have it reviewed against applicable Kenyan data-protection requirements, including
              the Data Protection Act, 2019, before launch.
            </Placeholder>
          </p>

          <p>
            {site.name} (&quot;we&quot;, &quot;us&quot;) respects your privacy. This notice explains what information
            this website collects, why we collect it, how long we keep it and how to contact us about it.
          </p>

          <H2>What we collect</H2>
          <p>When you send an enquiry through our contact form, we collect:</p>
          <BulletList
            items={[
              "Your name, if you choose to give it",
              "Your phone number and/or email address, so we can reply",
              "Your preferred contact method",
              "The reason for your enquiry and your short message",
            ]}
          />
          <p className="mt-4">
            Please do not send confidential case details, identity documents, ID numbers or other sensitive personal
            information through the website.
          </p>

          <H2>What we do not collect</H2>
          <p>
            This website does not use advertising trackers, and it does not set cookies for analytics or advertising.
            Our web hosting provider may keep standard technical logs (such as IP addresses and the pages requested)
            to keep the website secure and working.
          </p>

          <H2>Why we use your information</H2>
          <p>We use the information you send only to read and respond to your enquiry.</p>

          <H2>Who can see it</H2>
          <p>
            Enquiries are sent to our organisation by email through a secure email delivery service. Access is limited
            to the people in our organisation who need it to respond. We do not sell your information or share it for
            marketing. Our website hosting and email delivery providers may process this information on servers
            located outside Kenya.
          </p>
          <p className="mt-3">
            <Placeholder>Names of the hosting and email delivery providers used, once chosen</Placeholder>
          </p>

          <H2>How long we keep it</H2>
          <p>
            We keep enquiries only for as long as needed to respond and for reasonable record-keeping, after which they
            are deleted.
          </p>
          <p className="mt-3">
            <Placeholder>Specific retention period for enquiries (for example, 12 months) and deletion process</Placeholder>
          </p>

          <H2>Your choices and rights</H2>
          <p>
            You can ask us what information we hold about you, ask us to correct it or ask us to delete it. To do so,
            contact us using the details below.
          </p>

          <H2>Contact us about privacy</H2>
          <p>
            Email <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> or call{" "}
            <a href={site.contact.phoneHref}>{site.contact.phoneDisplay}</a>.
          </p>
          <p className="mt-4">
            See also our <Link href="/disclaimer">disclaimer</Link>.
          </p>
        </div>
      </Container>
    </>
  );
}
