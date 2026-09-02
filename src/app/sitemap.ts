import type { MetadataRoute } from "next";
import projectsVal from "@/content/projects.val";
import { fetchVal } from "@/val/val.rsc";
import { getVisibleProjects, toProjectEntries } from "@/lib/projects";
import { rawEntry } from "@/lib/project-view";
import { absoluteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await fetchVal(projectsVal);
  const visible = getVisibleProjects(
    toProjectEntries(projects).map(rawEntry),
    false,
  );
  const newestProject = visible
    .map((project) => project.date)
    .sort()
    .at(-1);

  return [
    {
      url: absoluteUrl("/"),
      lastModified: newestProject ? new Date(newestProject) : new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/projects"),
      lastModified: newestProject ? new Date(newestProject) : new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/about"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...visible.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      lastModified: new Date(project.date),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    {
      url: absoluteUrl("/playground"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: absoluteUrl("/contact"),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
