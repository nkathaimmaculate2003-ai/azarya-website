"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useId, useRef, useState } from "react";
import { mainNav, type NavItem } from "@/content/site";
import { Container } from "@/components/ui";
import { Wordmark } from "@/components/wordmark";

function isCurrent(pathname: string | null, href: string) {
  if (!pathname) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

const mobileItems: NavItem[] = [...mainNav, { label: "Contact Us", href: "/contact" }];

function NavLinks({ pathname, variant }: { pathname: string | null; variant: "desktop" | "mobile" }) {
  const items = variant === "desktop" ? mainNav : mobileItems;
  return (
    <ul className={variant === "desktop" ? "flex items-center gap-1" : "py-3"}>
      {items.map((item) => {
        const current = isCurrent(pathname, item.href);
        const style =
          variant === "desktop"
            ? `rounded px-3 py-2 text-[0.95rem] font-semibold whitespace-nowrap no-underline hover:bg-offwhite hover:text-teal ${
                current ? "text-teal underline decoration-2 underline-offset-8" : "text-charcoal"
              }`
            : `block rounded px-3 py-3 text-lg font-semibold no-underline hover:bg-offwhite ${
                current ? "text-teal" : "text-charcoal"
              }`;
        return (
          <li key={item.href}>
            <Link href={item.href} aria-current={current ? "page" : undefined} className={style}>
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Reading the current URL can suspend while pages are prerendered, so these
 * small components sit inside <Suspense>. The fallback renders the same links
 * without the "current page" highlight.
 */
function CurrentNavLinks({ variant }: { variant: "desktop" | "mobile" }) {
  return <NavLinks pathname={usePathname()} variant={variant} />;
}

/** Closes the mobile menu whenever the page changes. `setOpen` is a stable state setter. */
function CloseOnNavigate({ setOpen }: { setOpen: (open: boolean) => void }) {
  const pathname = usePathname();
  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);
  return null;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape and return focus to the menu button.
  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-mist bg-white/95 backdrop-blur">
      <Suspense fallback={null}>
        <CloseOnNavigate setOpen={setOpen} />
      </Suspense>

      <Container className="flex min-h-20 items-center justify-between gap-4">
        <Wordmark />

        <nav aria-label="Main" className="hidden xl:block">
          <Suspense fallback={<NavLinks pathname={null} variant="desktop" />}>
            <CurrentNavLinks variant="desktop" />
          </Suspense>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden min-h-11 items-center rounded-md bg-teal px-4 py-2 font-semibold text-white no-underline hover:bg-teal-dark sm:inline-flex"
          >
            Contact Us
          </Link>
          <button
            ref={buttonRef}
            type="button"
            className="inline-flex min-h-11 items-center gap-2 rounded-md border-2 border-navy px-3 py-2 font-semibold text-navy xl:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
          >
            <span aria-hidden="true" className="text-lg leading-none">
              {open ? "✕" : "☰"}
            </span>
            Menu
          </button>
        </div>
      </Container>

      <nav id={menuId} aria-label="Main mobile" hidden={!open} className="border-t border-mist bg-white xl:hidden">
        <Container>
          <Suspense fallback={<NavLinks pathname={null} variant="mobile" />}>
            <CurrentNavLinks variant="mobile" />
          </Suspense>
        </Container>
      </nav>
    </header>
  );
}
