import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/** Centred page-width wrapper with consistent side gutters. */
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

type ButtonVariant = "primary" | "secondary" | "light";

const buttonStyles: Record<ButtonVariant, string> = {
  primary: "bg-teal text-white hover:bg-teal-dark",
  secondary: "border-2 border-navy text-navy hover:bg-navy hover:text-white",
  light: "bg-white text-navy hover:bg-mist",
};

/** A link styled as a button. Use for navigation; use <button> for actions. */
export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant }) {
  return (
    <Link
      {...props}
      className={`inline-flex min-h-12 items-center justify-center rounded-md px-5 py-3 text-base font-semibold no-underline transition-colors ${buttonStyles[variant]} ${className}`}
    />
  );
}

/** Top-of-page heading area used on every inner page. Renders the page's single H1. */
export function PageHeader({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: ReactNode }) {
  return (
    <div className="border-b border-mist bg-white">
      <Container className="py-12 sm:py-16">
        {eyebrow && <p className="mb-3 text-sm font-semibold tracking-wide text-teal uppercase">{eyebrow}</p>}
        <h1 className="max-w-3xl font-heading text-3xl leading-tight font-bold text-navy sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {intro && <div className="mt-5 max-w-3xl text-lg leading-relaxed">{intro}</div>}
      </Container>
    </div>
  );
}

/** A content section with an optional heading. */
export function Section({
  id,
  title,
  intro,
  children,
  tone = "default",
  className = "",
}: {
  id?: string;
  title?: string;
  intro?: ReactNode;
  children?: ReactNode;
  tone?: "default" | "white" | "mist" | "navy";
  className?: string;
}) {
  const tones = {
    default: "",
    white: "bg-white",
    mist: "bg-mist",
    navy: "bg-navy text-white",
  };
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <section id={id} aria-labelledby={title ? headingId : undefined} className={`scroll-mt-24 py-14 sm:py-20 ${tones[tone]} ${className}`}>
      <Container>
        {title && (
          <h2
            id={headingId}
            className={`font-heading text-2xl font-bold sm:text-3xl ${tone === "navy" ? "text-white" : "text-navy"}`}
          >
            {title}
          </h2>
        )}
        {intro && <div className="mt-4 max-w-3xl text-lg leading-relaxed">{intro}</div>}
        {children && <div className={title || intro ? "mt-8" : ""}>{children}</div>}
      </Container>
    </section>
  );
}

/**
 * A clearly labelled placeholder for information the organisation has not yet
 * confirmed. Search the code for <Placeholder to find every one.
 */
export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded border-2 border-dashed border-amber-700 bg-amber-50 px-2 py-0.5 text-sm text-amber-900">
      <strong className="font-semibold">To confirm before launch:</strong> {children}
    </span>
  );
}

/** Highlighted notice box. Uses an icon and a text label, not colour alone. */
export function Notice({
  kind = "info",
  title,
  children,
}: {
  kind?: "info" | "safety";
  title: string;
  children: ReactNode;
}) {
  const styles =
    kind === "safety" ? "border-l-red-800 bg-red-50 text-charcoal" : "border-l-teal bg-white text-charcoal";
  return (
    <aside className={`rounded-md border border-l-8 border-mist p-5 ${styles}`} aria-label={title}>
      <p className="flex items-center gap-2 font-heading text-lg font-bold text-navy">
        <span aria-hidden="true">{kind === "safety" ? "⚠" : "ℹ"}</span>
        {title}
      </p>
      <div className="mt-2 leading-relaxed">{children}</div>
    </aside>
  );
}

/** Simple card container. */
export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-lg border border-mist bg-white p-6 shadow-sm ${className}`}>{children}</div>;
}

/** Bulleted list with consistent styling. */
export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-6 marker:text-teal">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
