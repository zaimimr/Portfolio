import type { Metadata } from "next";
import { ogImage } from "@/lib/site";
import { val } from "../../../../val.config";
import pagesVal from "@/content/pages.val";
import playgroundVal from "@/content/playground.val";
import { fetchVal } from "@/val/val.rsc";
import { LabCard } from "@/components/site/lab-card";
import type { LabCardModel } from "@/components/site/lab-card";
import { Highlight } from "@/components/site/highlight";

const playgroundDescription =
  "Small experiments, side tools and half-serious ideas built by Zaim Imran, developer in Oslo.";

export const metadata: Metadata = {
  title: "Playground, experiments by Zaim Imran",
  description: playgroundDescription,
  alternates: { canonical: "/playground" },
  openGraph: {
    url: "/playground",
    title: "Playground, experiments by Zaim Imran",
    description: playgroundDescription,
    images: [ogImage],
  },
};

export default async function PlaygroundPage() {
  const playground = await fetchVal(playgroundVal);
  const copy = await fetchVal(pagesVal);
  const experiments: LabCardModel[] = Object.entries(playground)
    .map(([slug, experiment]) => ({
      slug,
      title: experiment.title,
      titleText: val.raw(experiment.title),
      description: experiment.description,
      href: val.raw(experiment.href),
      external: val.raw(experiment.href).startsWith("http"),
      year: val.raw(experiment.date).slice(0, 4),
      tags: experiment.tags.map((tag) => val.raw(tag)),
      image: experiment.image,
    }))
    .sort((a, b) => b.year.localeCompare(a.year));

  return (
    <div className="px-gutter pb-section mx-auto w-full max-w-6xl pt-10 md:pt-16">
      <header className="mb-10 flex flex-col gap-4 md:mb-14">
        <h1 className="font-display text-h1 text-ink font-bold">
          <Highlight>Playground</Highlight>
        </h1>
        <p className="text-body-lg text-ink-muted max-w-xl">
          {copy.playgroundIntro}
        </p>
      </header>
      {experiments.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {experiments.map((experiment, index) => (
            <li key={experiment.slug}>
              <LabCard experiment={experiment} index={index} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-wobble-2 border-line bg-surface shadow-offset flex max-w-md flex-col gap-3 border-2 p-8">
          <p className="font-hand text-h3 text-ink">The bench is empty.</p>
          <p className="text-body text-ink-muted">
            The next experiment is probably brewing right now, at 23:40.
          </p>
        </div>
      )}
    </div>
  );
}
