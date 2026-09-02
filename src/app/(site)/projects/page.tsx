import type { Metadata } from "next";
import { ogImage } from "@/lib/site";
import pagesVal from "@/content/pages.val";
import projectsVal from "@/content/projects.val";
import { fetchVal } from "@/val/val.rsc";
import {
  getVisibleProjects,
  sortByDate,
  toProjectEntries,
} from "@/lib/projects";
import { rawEntry, toCardModel } from "@/lib/project-view";
import { ProjectsExplorer } from "@/components/projects/projects-explorer";
import { Highlight } from "@/components/site/highlight";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, projectListSchema } from "@/lib/structured-data";

const projectsDescription =
  "Client work, freelance projects and side projects by Zaim Imran: event-driven platforms, data infrastructure, websites, mobile apps and games.";

export const metadata: Metadata = {
  title: "Projects by Zaim Imran",
  description: projectsDescription,
  alternates: { canonical: "/projects" },
  openGraph: {
    url: "/projects",
    title: "Projects by Zaim Imran",
    description: projectsDescription,
    images: [ogImage],
  },
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await searchParams;
  const projects = await fetchVal(projectsVal);
  const copy = await fetchVal(pagesVal);
  const visible = sortByDate(
    getVisibleProjects(toProjectEntries(projects).map(rawEntry), false),
  );
  const cards = visible.map(toCardModel);

  return (
    <div className="px-gutter pb-section mx-auto w-full max-w-6xl pt-10 md:pt-16">
      <JsonLd
        id="ld-projects"
        data={[
          projectListSchema(
            cards.map(({ slug, titleText }) => ({ slug, title: titleText })),
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
          ]),
        ]}
      />
      <header className="mb-10 flex flex-col gap-4 md:mb-14">
        <h1 className="font-display text-h1 text-ink font-bold">
          <Highlight>Projects</Highlight>
        </h1>
        <p className="text-body-lg text-ink-muted max-w-xl">
          {copy.projectsIntro}
        </p>
      </header>
      <ProjectsExplorer projects={cards} />
    </div>
  );
}
