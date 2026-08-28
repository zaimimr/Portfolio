import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ValImage } from "@valbuild/next";
import { val } from "../../../../../val.config";
import projectsVal from "@/content/projects.val";
import { fetchVal } from "@/val/val.rsc";
import {
  getVisibleProjects,
  sortByDate,
  toProjectEntries,
} from "@/lib/projects";
import { rawEntry } from "@/lib/project-view";
import { categoryLabels, typeLabels } from "@/lib/labels";
import { Prose } from "@/components/content/rich-text";
import { Highlight } from "@/components/site/highlight";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Tag } from "@/components/ui/tag";
import { SketchIcon } from "@/components/ui/sketch-icon";
import { BisapDiagram } from "@/components/projects/bisap-diagram";
import type { SketchIconName } from "@/components/ui/sketch-icon";

const linkPresentation: Record<
  string,
  { label: string; icon: SketchIconName }
> = {
  github: { label: "View the code", icon: "github" },
  web: { label: "Visit the site", icon: "external" },
  store: { label: "Get the app", icon: "download" },
};

async function getVisibleEntries() {
  const projects = await fetchVal(projectsVal);
  return sortByDate(
    getVisibleProjects(toProjectEntries(projects).map(rawEntry), false),
  );
}

export function generateStaticParams() {
  const projects = val.unstable_getUnpatchedUnencodedVal(projectsVal);
  const visible = sortByDate(
    getVisibleProjects(toProjectEntries(projects).map(rawEntry), false),
  );
  return visible.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const visible = await getVisibleEntries();
  const project = visible.find((entry) => entry.slug === slug);
  if (!project) return {};
  return {
    title: val.raw(project.title),
    description: val.raw(project.description),
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const visible = await getVisibleEntries();
  const index = visible.findIndex((entry) => entry.slug === slug);
  const project = visible[index];
  if (!project) notFound();

  const nextProject = visible[(index + 1) % visible.length] ?? project;

  return (
    <article className="px-gutter pb-section mx-auto w-full max-w-6xl pt-8 md:pt-12">
      <nav aria-label="Breadcrumb">
        <Link
          href="/projects"
          className="text-mono-sm text-ink-muted hover:text-accent-strong inline-flex items-center gap-2 font-mono transition-colors duration-[var(--duration-fast)] ease-out"
        >
          <SketchIcon name="arrow-right" size={16} className="rotate-180" />
          All projects
        </Link>
      </nav>
      <header className="mt-8 max-w-3xl">
        <h1 className="font-display text-h1 text-ink font-bold tracking-tight">
          <Highlight>{project.title}</Highlight>
        </h1>
        <p className="text-body-lg text-ink-muted mt-4">
          {project.description}
        </p>
        <dl className="border-line/15 text-mono-sm mt-8 flex flex-wrap gap-x-10 gap-y-4 border-y-2 py-4 font-mono">
          <div className="flex flex-col gap-1">
            <dt className="text-ink-muted tracking-wider uppercase">
              Category
            </dt>
            <dd>
              <Tag category={project.category}>
                {categoryLabels[project.category]}
              </Tag>
            </dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-ink-muted tracking-wider uppercase">Type</dt>
            <dd className="text-ink">{typeLabels[project.type]}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-ink-muted tracking-wider uppercase">Year</dt>
            <dd className="text-ink">{project.date.slice(0, 4)}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-ink-muted tracking-wider uppercase">Stack</dt>
            <dd className="text-ink">{project.tech.join(" · ")}</dd>
          </div>
        </dl>
      </header>
      {slug === "bisap" ? <BisapDiagram className="mt-10" /> : null}
      {project.images.length > 0 ? (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {project.images.map((image, imageIndex) => (
            <div
              key={imageIndex}
              className="border-line relative aspect-video overflow-hidden rounded-lg border-2"
            >
              <ValImage
                src={image}
                alt=""
                fill
                sizes="(min-width: 48rem) 34rem, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      ) : null}
      <div className="mt-10">
        <Prose content={project.body} />
      </div>
      {project.links.length > 0 ? (
        <div className="mt-10 flex flex-wrap gap-4">
          {project.links.map((link) => {
            const kind = val.raw(link.kind);
            const presentation = linkPresentation[kind] ?? {
              label: "See it live",
              icon: "external" as const,
            };
            return (
              <Button key={val.raw(link.url)} variant="sketch" asChild>
                <a href={val.raw(link.url)} target="_blank" rel="noreferrer">
                  <SketchIcon name={presentation.icon} size={18} />
                  {presentation.label}
                </a>
              </Button>
            );
          })}
        </div>
      ) : null}
      {nextProject.slug !== project.slug ? (
        <footer className="mt-section">
          <Divider className="mb-10" />
          <Link href={`/projects/${nextProject.slug}`} className="group block">
            <p className="font-hand text-hand text-ink-muted">Next up</p>
            <p className="font-display text-h2 text-ink group-hover:text-accent-strong mt-2 flex items-center gap-4 font-bold transition-colors duration-[var(--duration-fast)] ease-out">
              {nextProject.title}
              <SketchIcon
                name="arrow-right"
                size={28}
                className="transition-transform duration-[var(--duration-base)] ease-out group-hover:translate-x-1.5 motion-reduce:transition-none"
              />
            </p>
          </Link>
        </footer>
      ) : null}
    </article>
  );
}
