import type { Metadata } from "next";
import projectsVal from "@/content/projects.val";
import { fetchVal } from "@/val/val.rsc";
import { getVisibleProjects, sortByDate, toProjectEntries } from "@/lib/projects";
import { rawEntry, toCardModel } from "@/lib/project-view";
import { ProjectsExplorer } from "@/components/projects/projects-explorer";
import { Highlight } from "@/components/site/highlight";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Work, freelance and hobby projects by Zaim Imran: websites, apps and games.",
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await searchParams;
  const projects = await fetchVal(projectsVal);
  const visible = sortByDate(
    getVisibleProjects(toProjectEntries(projects).map(rawEntry), false),
  );
  const cards = visible.map(toCardModel);

  return (
    <div className="mx-auto w-full max-w-6xl px-gutter pb-section pt-10 md:pt-16">
      <header className="mb-10 flex flex-col gap-4 md:mb-14">
        <h1 className="font-display text-h1 font-bold text-ink">
          <Highlight>Projects</Highlight>
        </h1>
        <p className="max-w-xl text-body-lg text-ink-muted">
          Everything I&apos;ve built worth showing, from member platforms to
          cake-debt calculators.
        </p>
      </header>
      <ProjectsExplorer projects={cards} />
    </div>
  );
}
