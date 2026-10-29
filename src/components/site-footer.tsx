import Link from "next/link";
import { disclaimer, footerLegalNav, mainNav, site } from "@/content/site";
import { Container } from "@/components/ui";
import { Wordmark } from "@/components/wordmark";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-white">
      <Container className="grid gap-10 py-14 md:grid-cols-3">
        <div>
          <Wordmark tone="light" />
          <p className="mt-4 text-sm leading-relaxed text-mist">
            A community-based organisation working to improve awareness of mediation, legal pathways and access to
            justice in Nairobi, Kenya.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-heading text-lg font-bold">Explore</h2>
          <ul className="mt-4 space-y-2">
            {[{ label: "Home", href: "/" }, ...mainNav].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white underline-offset-4 hover:text-mist">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-heading text-lg font-bold">Contact</h2>
          <address className="mt-4 space-y-2 not-italic">
            <p>{site.location.display}</p>
            <p>
              Phone:{" "}
              <a href={site.contact.phoneHref} className="text-white hover:text-mist">
                {site.contact.phoneDisplay}
              </a>
            </p>
            <p className="break-words">
              Email:{" "}
              <a href={`mailto:${site.contact.email}`} className="text-white hover:text-mist">
                {site.contact.email}
              </a>
            </p>
          </address>
          {site.social.length > 0 && (
            <ul className="mt-4 flex gap-4">
              {site.social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} className="text-white hover:text-mist" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>

      <div className="border-t border-white/20">
        <Container className="py-6 text-sm text-mist">
          <p className="max-w-4xl leading-relaxed">
            <strong className="text-white">Disclaimer:</strong> {disclaimer.short}{" "}
            <Link href="/disclaimer" className="text-white hover:text-mist">
              Read the full disclaimer
            </Link>
            .
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>© {site.name}</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {footerLegalNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white hover:text-mist">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>
    </footer>
  );
}
