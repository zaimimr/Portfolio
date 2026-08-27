import Link from "next/link";
import { val } from "../../../val.config";
import profileVal from "@/content/profile.val";
import settingsVal from "@/content/settings.val";
import { fetchVal } from "@/val/val.rsc";
import { Highlight } from "@/components/site/highlight";
import { SignatureStroke } from "@/components/site/signature-stroke";
import { ScrollCue } from "@/components/site/scroll-cue";
import { Button } from "@/components/ui/button";
import { SketchIcon } from "@/components/ui/sketch-icon";
import type { SketchIconName } from "@/components/ui/sketch-icon";

const iconByLabel: Record<string, SketchIconName> = {
  github: "github",
  linkedin: "linkedin",
};

export async function PortfolioHero() {
  const [profile, settings] = await Promise.all([
    fetchVal(profileVal),
    fetchVal(settingsVal),
  ]);

  const name = val.raw(settings.siteTitle);
  const [firstName, ...restName] = name.split(" ");
  const socials = settings.socials.map((social) => ({
    label: val.raw(social.label),
    url: val.raw(social.url),
    icon:
      iconByLabel[val.raw(social.label).toLowerCase()] ?? ("external" as const),
  }));

  return (
    <section
      aria-labelledby="portfolio-heading"
      className="px-gutter relative mx-auto flex w-full max-w-6xl flex-col justify-between pt-8 pb-12 md:min-h-[calc(100svh-5rem)] md:pt-14"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-24 -bottom-8 -z-10 md:hidden"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, var(--bg) 12%, color-mix(in oklab, var(--bg) 96%, transparent) 74%, color-mix(in oklab, var(--bg) 58%, transparent) 89%, transparent)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-24 bottom-1/3 -z-10 hidden md:block"
        style={{
          backgroundImage:
            "radial-gradient(84% 62% at 22% 38%, color-mix(in oklab, var(--bg) 95%, transparent) 34%, transparent 78%), radial-gradient(62% 54% at 82% 44%, var(--bg) 30%, color-mix(in oklab, var(--bg) 88%, transparent) 58%, transparent 82%)",
        }}
      />
      <div className="md:grid md:grid-cols-12 md:gap-8">
        <div className="md:col-span-8">
          <h1
            id="portfolio-heading"
            className="font-display text-display text-ink font-bold tracking-[-0.045em] uppercase"
          >
            <span className="block">{firstName}</span>
            <span className="block">{restName.join(" ")}</span>
          </h1>
          <SignatureStroke className="mt-1 max-w-[min(28rem,80%)] md:mt-2" />
          <p className="font-display text-h2 text-ink mt-7 font-bold tracking-[-0.02em] md:mt-9">
            <Highlight animate>{profile.role}</Highlight>
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-7 md:col-span-4 md:mt-2 md:self-end">
          <p className="text-body-lg text-ink-muted max-w-[38ch]">
            {profile.heroLine}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="accent" size="lg" asChild>
              <Link href="/projects">
                See the work
                <SketchIcon name="arrow-right" size={20} />
              </Link>
            </Button>
            <ul className="flex items-center gap-2">
              {socials.map((social) => (
                <li key={social.url}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="border-line bg-surface/70 text-ink hover:text-accent-strong rounded-wobble-sm shadow-offset-sm inline-flex size-13 items-center justify-center border-2 backdrop-blur-sm transition-[transform,color] duration-[var(--duration-fast)] ease-out hover:-translate-x-px hover:-translate-y-px hover:-rotate-2 active:translate-x-0.5 active:translate-y-0.5 active:rotate-0 active:shadow-none motion-reduce:transition-none"
                  >
                    <SketchIcon name={social.icon} size={24} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-20 hidden md:block">
        <ScrollCue note={val.raw(profile.heroNote)} />
      </div>
    </section>
  );
}
