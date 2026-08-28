import Link from "next/link";
import { val } from "../../../val.config";
import profileVal from "@/content/profile.val";
import settingsVal from "@/content/settings.val";
import { fetchVal } from "@/val/val.rsc";
import { Highlight } from "@/components/site/highlight";
import { SignatureStroke } from "@/components/site/signature-stroke";
import { ScrollCue } from "@/components/site/scroll-cue";
import { SceneWash } from "@/components/site/scene-wash";
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
      className="relative w-full overflow-x-clip"
    >
      <div className="px-gutter relative mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-6xl flex-col justify-between pt-8 pb-12 md:min-h-[calc(100svh-5rem)] md:pt-14">
        <div className="md:grid md:grid-cols-12 md:gap-8">
          <div className="relative md:col-span-8">
            <SceneWash className="-inset-x-12 -top-14 -bottom-6" />
            <h1
              id="portfolio-heading"
              className="font-display text-display text-ink font-bold tracking-[-0.045em] uppercase"
            >
              <span className="block">{firstName}</span>
              <span className="block">{restName.join(" ")}</span>
            </h1>
            <SignatureStroke className="mt-1 max-w-[min(20rem,66%)] md:mt-2 md:max-w-[min(28rem,78%)]" />
            <p className="font-display text-h2 text-ink mt-7 font-bold tracking-[-0.02em] md:mt-9">
              <Highlight animate>{profile.role}</Highlight>
            </p>
          </div>
          <div className="relative mt-8 flex flex-col gap-7 md:col-span-4 md:mt-2 md:self-end">
            <SceneWash className="-inset-x-12 -inset-y-14" />
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
      </div>
    </section>
  );
}
