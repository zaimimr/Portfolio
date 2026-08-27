import { FeaturedProjectCard } from "@/components/projects/featured-project-card";
import { SquiggleLink } from "@/components/ui/squiggle-link";
import type { ProjectCardModel } from "@/lib/project-view";

export function FeaturedProjects({ projects }: { projects: ProjectCardModel[] }) {
  if (projects.length === 0) return null;

  return (
    <section
      aria-labelledby="featured-heading"
      className="mx-auto w-full max-w-6xl px-gutter pb-section"
    >
      <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <h2
          id="featured-heading"
          className="font-display text-h1 font-bold text-ink"
        >
          Selected work
        </h2>
        <SquiggleLink href="/projects">Browse everything</SquiggleLink>
      </div>
      <div className="flex flex-col gap-16 md:gap-20">
        {projects.map((project, index) => (
          <FeaturedProjectCard
            key={project.slug}
            project={project}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
