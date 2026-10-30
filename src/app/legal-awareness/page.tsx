import Link from "next/link";
import { ButtonLink, Notice, PageHeader, Section } from "@/components/ui";
import { FaqList } from "@/components/faq-list";
import { disclaimer, safetyNotice } from "@/content/site";
import { articles, faqs } from "@/content/resources";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Legal Awareness & Resources",
  description:
    "Plain-language articles and FAQs on mediation and access to justice for communities in Nairobi, Kenya. General information, not legal advice.",
  path: "/legal-awareness",
});

export default function LegalAwarenessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal Awareness & Resources"
        title="Understanding mediation and access to justice"
        intro={
          <p>
            Plain-language articles and answers to common questions, to help you understand your options and where to
            seek qualified help.
          </p>
        }
      />

      <Section tone="white" className="!pb-0">
        <Notice title="General information, not legal advice">
          <p>
            {disclaimer.short} For advice about your situation, please speak to a qualified legal professional.
          </p>
        </Notice>
      </Section>

      <Section id="articles" title="Articles" tone="white">
        <ul className="grid gap-6 md:grid-cols-2">
          {articles.map((article) => (
            <li key={article.slug}>
              <article className="flex h-full flex-col rounded-lg border border-mist bg-offwhite p-6">
                <h3 className="font-heading text-xl font-bold text-navy">
                  <Link href={`/legal-awareness/${article.slug}`} className="text-navy no-underline hover:underline">
                    {article.title}
                  </Link>
                </h3>
                <p className="mt-1 text-sm">
                  Published <time dateTime={article.published}>{formatDate(article.published)}</time>
                </p>
                <p className="mt-3 flex-1 leading-relaxed">{article.summary}</p>
                <Link href={`/legal-awareness/${article.slug}`} className="mt-4 font-semibold" aria-hidden="true" tabIndex={-1}>
                  Read article →
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="downloads" title="Downloadable resources">
        <p className="max-w-3xl leading-relaxed">
          Printable leaflets and guides will be added here once they have been prepared and approved. We also plan to
          offer Kiswahili versions of priority resources in a future phase.
        </p>
      </Section>

      <Section id="faq" title="Frequently asked questions" tone="white">
        <FaqList faqs={faqs} />
      </Section>

      <Section id="where-to-get-help" title="Where to get help">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="space-y-4 leading-relaxed">
            <p>
              Where appropriate, we can help you identify qualified legal professionals or relevant services. A list of
              verified referral contacts will be published here once confirmed.
            </p>
            <ButtonLink href="/contact">Ask a Question</ButtonLink>
          </div>
          <Notice kind="safety" title={safetyNotice.title}>
            <p>{safetyNotice.body}</p>
          </Notice>
        </div>
      </Section>
    </>
  );
}
