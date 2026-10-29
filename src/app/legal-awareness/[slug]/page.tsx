import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BulletList, ButtonLink, Container, Notice } from "@/components/ui";
import { disclaimer, site } from "@/content/site";
import { articles } from "@/content/resources";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";

function findArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps<"/legal-awareness/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) return { title: "Article not found" };
  return pageMetadata({
    title: article.title,
    description: article.summary,
    path: `/legal-awareness/${article.slug}`,
  });
}

export default async function ArticlePage({ params }: PageProps<"/legal-awareness/[slug]">) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    datePublished: article.published,
    dateModified: article.reviewed,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/legal-awareness/${article.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <article>
        <header className="border-b border-mist bg-white">
          <Container className="py-12 sm:py-16">
            <nav aria-label="Breadcrumb" className="mb-4 text-sm">
              <ol className="flex flex-wrap gap-2">
                <li>
                  <Link href="/">Home</Link>
                  <span aria-hidden="true"> /</span>
                </li>
                <li>
                  <Link href="/legal-awareness">Legal Awareness &amp; Resources</Link>
                  <span aria-hidden="true"> /</span>
                </li>
                <li aria-current="page">{article.title}</li>
              </ol>
            </nav>
            <h1 className="max-w-3xl font-heading text-3xl leading-tight font-bold text-navy sm:text-4xl">
              {article.title}
            </h1>
            <p className="mt-4 text-sm">
              Published <time dateTime={article.published}>{formatDate(article.published)}</time> · Last reviewed{" "}
              <time dateTime={article.reviewed}>{formatDate(article.reviewed)}</time>
            </p>
          </Container>
        </header>

        <Container className="py-12">
          <div className="max-w-3xl space-y-8 text-lg leading-relaxed">
            {article.sections.map((section, index) => (
              <section key={section.heading ?? index}>
                {section.heading && <h2 className="mb-3 font-heading text-2xl font-bold text-navy">{section.heading}</h2>}
                <div className="space-y-4">
                  {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets && <BulletList items={section.bullets} />}
                </div>
              </section>
            ))}

            <Notice title="General information, not legal advice">
              <p>{disclaimer.short}</p>
            </Notice>

            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/legal-awareness" variant="secondary">
                ← All resources
              </ButtonLink>
              <ButtonLink href="/contact">Ask a Question</ButtonLink>
            </div>
          </div>
        </Container>
      </article>
    </>
  );
}
