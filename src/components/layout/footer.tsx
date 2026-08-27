import Link from "next/link";
import { SquiggleLink } from "@/components/ui/squiggle-link";
import { SketchIcon } from "@/components/ui/sketch-icon";
import type { SketchIconName } from "@/components/ui/sketch-icon";
import { Divider } from "@/components/ui/divider";
import { Wordmark } from "@/components/layout/wordmark";
import { navItems } from "@/components/layout/nav-items";

const socials: { href: string; label: string; icon: SketchIconName }[] = [
  { href: "https://github.com/Zenjjim", label: "GitHub", icon: "github" },
  { href: "https://www.linkedin.com/in/zaim/", label: "LinkedIn", icon: "linkedin" },
  { href: "mailto:zaim.imran@gmail.com", label: "Email", icon: "mail" },
];

export function Footer() {
  return (
    <footer className="mt-section">
      <div className="mx-auto w-full max-w-6xl px-gutter pb-10">
        <Divider variant={2} className="mb-10 text-line/30" />
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              aria-label="Zaim Imran, home"
              className="w-fit text-ink transition-colors duration-[var(--duration-fast)] ease-out hover:text-accent-strong"
            >
              <Wordmark className="size-12" />
            </Link>
            <p className="font-hand text-hand text-ink-muted">Tegnet og bygget i Norge</p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-7 gap-y-3">
              <li>
                <SquiggleLink href="/" className="text-sm">
                  Home
                </SquiggleLink>
              </li>
              {navItems.map((item) => (
                <li key={item.href}>
                  <SquiggleLink href={item.href} className="text-sm">
                    {item.label}
                  </SquiggleLink>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="flex gap-2">
            {socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={social.label}
                  className="inline-flex size-10 items-center justify-center rounded-md text-ink transition-colors duration-[var(--duration-fast)] ease-out hover:bg-surface-raised hover:text-accent-strong"
                >
                  <SketchIcon name={social.icon} size={22} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-10 text-sm text-ink-faint">
          © {new Date().getFullYear()} Zaim Imran
        </p>
      </div>
    </footer>
  );
}
