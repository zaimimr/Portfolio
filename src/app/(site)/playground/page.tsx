import type { Metadata } from "next";
import { val } from "../../../../val.config";
import pagesVal from "@/content/pages.val";
import playgroundVal from "@/content/playground.val";
import { fetchVal } from "@/val/val.rsc";
import { LabCard } from "@/components/site/lab-card";
import type { LabCardModel } from "@/components/site/lab-card";
import { Highlight } from "@/components/site/highlight";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Small experiments, tools and half-serious ideas by Zaim Imran.",
};

export default async function PlaygroundPage() {
  const playground = await fetchVal(playgroundVal);
  const copy = await fetchVal(pagesVal);
  const experiments: LabCardModel[] = Object.entries(playground)
    .map(([slug, experiment]) => ({
      slug,
      title: experiment.title,
      description: experiment.description,
      href: val.raw(experiment.href),
      external: val.raw(experiment.href).startsWith("http"),
      year: val.raw(experiment.date).slice(0, 4),
      tags: experiment.tags.map((tag) => val.raw(tag)),
      image: experiment.image,
    }))
    .sort((a, b) => b.year.localeCompare(a.year));

  return (
    <div className="mx-auto w-full max-w-6xl px-gutter pb-section pt-10 md:pt-16">
      <header className="mb-10 flex flex-col gap-4 md:mb-14">
        <h1 className="font-display text-h1 font-bold text-ink">
          <Highlight>Playground</Highlight>
        </h1>
        <p className="font-hand text-hand text-ink-muted">{copy.playgroundIntro}</p>
      </header>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {experiments.map((experiment, index) => (
          <li key={experiment.slug}>
            <LabCard experiment={experiment} index={index} />
          </li>
        ))}
      </ul>
    </div>
  );
}
