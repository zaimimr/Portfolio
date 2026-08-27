import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ValImage } from "@valbuild/next";
import { val } from "../../../../../val.config";
import projectsVal from "@/content/projects.val";
import { fetchVal } from "@/val/val.rsc";
import { getVisibleProjects, sortByDate, toProjectEntries } from "@/lib/projects";
import { rawEntry } from "@/lib/project-view";
import { categoryLabels, typeLabels } from "@/lib/labels";
import { Prose } from "@/components/content/rich-text";
import { Highlight } from "@/components/site/highlight";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Tag } from "@/components/ui/tag";
import { SketchIcon } from "@/components/ui/sketch-icon";
import type { SketchIconName } from "@/components/ui/sketch-icon";

const linkPresentation: Record<string, { label: string; icon: SketchIconName }> = {
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

export async function generateStaticParams() {
  const visible = await getVisibleEntries();
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
    <article className="mx-auto w-full max-w-6xl px-gutter pb-section pt-8 md:pt-12">
      <nav aria-label="Breadcrumb">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-mono text-mono-sm text-ink-muted transition-colors duration-[var(--duration-fast)] ease-out hover:text-accent-strong"
        >
          <SketchIcon name="arrow-right" size={16} className="rotate-180" />
          All projects
        </Link>
      </nav>
      <header className="mt-8 max-w-3xl">
        <h1 className="font-display text-h1 font-bold tracking-tight text-ink">
          <Highlight>{project.title}</Highlight>
        </h1>
        <p className="mt-4 text-body-lg text-ink-muted">{project.description}</p>
        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-y-2 border-line/15 py-4 font-mono text-mono-sm">
          <div className="flex flex-col gap-1">
            <dt className="uppercase tracking-wider text-ink-muted">Category</dt>
            <dd>
              <Tag category={project.category}>
                {categoryLabels[project.category]}
              </Tag>
            </dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="uppercase tracking-wider text-ink-muted">Type</dt>
            <dd className="text-ink">{typeLabels[project.type]}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="uppercase tracking-wider text-ink-muted">Year</dt>
            <dd className="text-ink">{project.date.slice(0, 4)}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="uppercase tracking-wider text-ink-muted">Stack</dt>
            <dd className="text-ink">{project.tech.join(" · ")}</dd>
          </div>
        </dl>
      </header>
      {project.images.length > 0 ? (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {project.images.map((image, imageIndex) => (
            <div
              key={imageIndex}
              className="relative aspect-video overflow-hidden rounded-lg border-2 border-line"
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
            const presentation =
              linkPresentation[kind] ?? { label: "See it live", icon: "external" as const };
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
            <p className="mt-2 flex items-center gap-4 font-display text-h2 font-bold text-ink transition-colors duration-[var(--duration-fast)] ease-out group-hover:text-accent-strong">
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
