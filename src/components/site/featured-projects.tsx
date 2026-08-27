import { FeaturedProjectCard } from "@/components/projects/featured-project-card";
import { SquiggleLink } from "@/components/ui/squiggle-link";
import type { ProjectCardModel } from "@/lib/project-view";

export function FeaturedProjects({
  projects,
}: {
  projects: ProjectCardModel[];
}) {
  if (projects.length === 0) return null;

  return (
    <section
      aria-labelledby="featured-heading"
      className="pb-section w-full overflow-x-clip pt-16 md:pt-24"
    >
      <div className="px-gutter mx-auto w-full max-w-6xl">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-4 md:mb-24">
          <h2
            id="featured-heading"
            className="font-display text-h1 text-ink font-bold"
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
      </div>
    </section>
  );
}
