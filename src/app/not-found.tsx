import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink, Container } from "@/components/ui";
import { mainNav } from "@/content/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <Container className="py-20">
      <p className="text-sm font-semibold tracking-wide text-teal uppercase">Error 404</p>
      <h1 className="mt-2 font-heading text-3xl font-bold text-navy sm:text-4xl">We could not find that page</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed">
        The page may have moved, or the link may be incorrect. Try one of these pages instead:
      </p>
      <ul className="mt-6 space-y-2 text-lg">
        {mainNav.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/">Go to the homepage</ButtonLink>
        <ButtonLink href="/contact" variant="secondary">
          Contact Us
        </ButtonLink>
      </div>
    </Container>
  );
}
