import Link from "next/link";
import { Container, Notice, PageHeader } from "@/components/ui";
import { disclaimer, safetyNotice } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Disclaimer",
  description:
    "Information on the Azarya Justice and Mediation Hub website is general awareness, not individual legal advice.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <>
      <PageHeader eyebrow="Disclaimer" title="About the information on this website" />
      <Container className="py-12">
        <div className="max-w-3xl space-y-4 text-lg leading-relaxed">
          {disclaimer.full.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>
            Azarya Justice and Mediation Hub is a community-based organisation. It is not a law firm and does not
            provide legal representation.
          </p>
          <div className="pt-4">
            <Notice kind="safety" title={safetyNotice.title}>
              <p>{safetyNotice.body}</p>
            </Notice>
          </div>
          <p className="pt-4">
            Read our <Link href="/privacy-notice">privacy notice</Link> or <Link href="/contact">contact us</Link>.
          </p>
        </div>
      </Container>
    </>
  );
}
