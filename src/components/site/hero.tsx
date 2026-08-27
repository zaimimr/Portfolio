import Link from "next/link";
import { AvatarScene } from "@/components/site/avatar-scene";
import { HeroSignature } from "@/components/site/hero-signature";
import { Highlight } from "@/components/site/highlight";
import { Button } from "@/components/ui/button";
import { SketchIcon } from "@/components/ui/sketch-icon";
import type { SketchIconName } from "@/components/ui/sketch-icon";
import type { SocialLink } from "@/components/layout/footer";

const iconByLabel: Record<string, SketchIconName> = {
  github: "github",
  linkedin: "linkedin",
};

type HeroProps = {
  name: string;
  tagline: string;
  socials: SocialLink[];
};

export function Hero({ name, tagline, socials }: HeroProps) {
  const [firstName, ...restName] = name.split(" ");

  return (
    <section className="mx-auto grid w-full max-w-6xl items-center gap-x-12 gap-y-8 px-gutter pb-section pt-10 md:grid-cols-12 md:pt-16">
      <div className="relative mx-auto w-full max-w-64 md:col-span-5 md:max-w-none">
        <AvatarScene />
        <p
          aria-hidden="true"
          className="absolute -right-2 top-6 hidden rotate-6 font-hand text-hand text-ink-muted md:block"
        >
          the screen does
          <br />
          something, btw
        </p>
      </div>
      <div className="md:col-span-7">
        <p className="font-hand text-hand text-accent-strong">
          Hei! My name is
        </p>
        <h1 className="mt-2 font-display text-display font-bold tracking-tight text-ink">
          <Highlight animate>{firstName}</Highlight>{" "}
          <span className="font-medium">{restName.join(" ")}</span>
        </h1>
        <p className="mt-5 max-w-xl text-body-lg text-ink-muted">{tagline}</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button variant="accent" size="lg" asChild>
            <Link href="/projects">See my work</Link>
          </Button>
          <ul className="flex items-center gap-1">
            {socials.map((social) => (
              <li key={social.url}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="inline-flex size-11 items-center justify-center rounded-md text-ink transition-colors duration-[var(--duration-fast)] ease-out hover:bg-surface-raised hover:text-accent-strong"
                >
                  <SketchIcon
                    name={iconByLabel[social.label.toLowerCase()] ?? "external"}
                    size={24}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <HeroSignature className="mt-10" />
      </div>
    </section>
  );
}
