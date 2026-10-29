import Link from "next/link";
import { site } from "@/content/site";

/**
 * Text-based wordmark used until an approved logo is supplied.
 * To use a logo instead, put the file in /public (e.g. /public/logo.svg) and
 * replace the content of this component with a next/image <Image>.
 */
export function Wordmark({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const main = tone === "dark" ? "text-navy" : "text-white";
  const sub = tone === "dark" ? "text-teal" : "text-mist";
  return (
    <Link href="/" className="inline-flex flex-col leading-none no-underline" aria-label={`${site.name}, home`}>
      <span className={`font-heading text-2xl font-bold tracking-[0.2em] ${main}`}>AZARYA</span>
      <span className={`mt-1 text-[0.65rem] font-semibold tracking-[0.18em] whitespace-nowrap uppercase ${sub}`}>
        Justice and Mediation Hub
      </span>
    </Link>
  );
}
