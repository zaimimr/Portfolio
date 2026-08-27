import Link from "next/link";
import { SquiggleLink } from "@/components/ui/squiggle-link";
import { SketchIcon } from "@/components/ui/sketch-icon";
import type { SketchIconName } from "@/components/ui/sketch-icon";
import { Divider } from "@/components/ui/divider";
import { Wordmark } from "@/components/layout/wordmark";
import { navItems } from "@/components/layout/nav-items";

const iconByLabel: Record<string, SketchIconName> = {
  github: "github",
  linkedin: "linkedin",
  email: "mail",
  mail: "mail",
};

export type SocialLink = {
  label: string;
  url: string;
};

type FooterProps = {
  socials: SocialLink[];
  email: string;
};

export function Footer({ socials, email }: FooterProps) {
  const links = [
    ...socials.map((social) => ({
      href: social.url,
      label: social.label,
      icon: iconByLabel[social.label.toLowerCase()] ?? ("external" as const),
    })),
    { href: `mailto:${email}`, label: "Email", icon: "mail" as const },
  ];
  return (
    <footer className="mt-section">
      <div className="px-gutter mx-auto w-full max-w-6xl pb-10">
        <Divider variant={2} className="text-line/30 mb-10" />
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <Link
            href="/"
            aria-label="Zaim Imran, home"
            className="text-ink hover:text-accent-strong w-fit transition-colors duration-[var(--duration-fast)] ease-out"
          >
            <Wordmark className="size-12" />
          </Link>
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
            {links.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.href.startsWith("http") ? "noreferrer" : undefined
                  }
                  aria-label={social.label}
                  className="text-ink hover:bg-surface-raised hover:text-accent-strong inline-flex size-10 items-center justify-center rounded-md transition-colors duration-[var(--duration-fast)] ease-out"
                >
                  <SketchIcon name={social.icon} size={22} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-ink-muted mt-10 text-sm">
          © {new Date().getFullYear()} Zaim Imran
        </p>
      </div>
    </footer>
  );
}
