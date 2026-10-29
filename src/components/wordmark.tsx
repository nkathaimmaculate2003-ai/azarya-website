import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import logo from "../../public/logo.png";

/**
 * The organisation's logo, linking to the homepage.
 * To replace it, put the new file in /Assets and run `node scripts/optimize-images.mjs`.
 * On dark backgrounds the logo sits on a white panel, because it has dark text.
 */
export function Wordmark({ tone = "dark", eager = false }: { tone?: "dark" | "light"; eager?: boolean }) {
  return (
    <Link
      href="/"
      className={`inline-block shrink-0 no-underline ${tone === "light" ? "rounded-lg bg-white p-3" : ""}`}
      aria-label={`${site.name}, home`}
    >
      <Image
        src={logo}
        alt=""
        loading={eager ? "eager" : "lazy"}
        sizes="(min-width: 640px) 230px, 180px"
        className="h-11 w-auto sm:h-14"
      />
    </Link>
  );
}
