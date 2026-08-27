import type { MetadataRoute } from "next";
import projectsVal from "@/content/projects.val";
import { fetchVal } from "@/val/val.rsc";
import { getVisibleProjects, toProjectEntries } from "@/lib/projects";
import { rawEntry } from "@/lib/project-view";
import { envOptional } from "@/lib/env";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = envOptional("NEXT_PUBLIC_SITE_URL") ?? "https://zaim.no";
  const projects = await fetchVal(projectsVal);
  const visible = getVisibleProjects(
    toProjectEntries(projects).map(rawEntry),
    false,
  );

  return [
    { url: baseUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/projects`, changeFrequency: "monthly", priority: 0.9 },
    ...visible.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    { url: `${baseUrl}/about`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${baseUrl}/playground`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, changeFrequency: "yearly", priority: 0.5 },
  ];
}
