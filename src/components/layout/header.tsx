"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SquiggleLink } from "@/components/ui/squiggle-link";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Wordmark } from "@/components/layout/wordmark";
import { navItems } from "@/components/layout/nav-items";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [condensed, setCondensed] = useState(false);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-[padding,background-color,border-color] duration-[var(--duration-base)] ease-out motion-reduce:transition-none",
        condensed
          ? "border-line/15 bg-bg/85 py-2 backdrop-blur-md"
          : "border-transparent py-5",
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-gutter">
        <Link
          href="/"
          aria-label="Zaim Imran, home"
          className="text-ink transition-colors duration-[var(--duration-fast)] ease-out hover:text-accent-strong"
        >
          <Wordmark className={cn("transition-[width,height] duration-[var(--duration-base)] ease-out", condensed ? "size-8" : "size-10")} />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <SquiggleLink
              key={item.href}
              href={item.href}
              active={pathname.startsWith(item.href)}
              className="text-sm"
            >
              {item.label}
            </SquiggleLink>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <MobileNav pathname={pathname} />
        </div>
      </div>
    </header>
  );
}
