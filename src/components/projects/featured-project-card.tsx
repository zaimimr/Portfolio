"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ValImage } from "@valbuild/next";
import { Tag } from "@/components/ui/tag";
import { SketchIcon } from "@/components/ui/sketch-icon";
import { categoryLabels, typeLabels } from "@/lib/labels";
import type { ProjectCardModel } from "@/lib/project-view";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

const wobbles = ["rounded-wobble-1", "rounded-wobble-3"];

type FeaturedProjectCardProps = {
  project: ProjectCardModel;
  index: number;
};

export function FeaturedProjectCard({ project, index }: FeaturedProjectCardProps) {
  const reversed = index % 2 === 1;

  return (
    <div className="relative">
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-[0.5em] z-10 select-none font-display text-[clamp(6rem,14vw,11rem)] font-bold leading-none text-accent/25",
          reversed ? "-right-2 md:-right-6" : "-left-2 md:-left-6",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <motion.div
        whileHover={{ y: -6, rotate: reversed ? 0.6 : -0.6 }}
        transition={spring.snappy}
      >
        <Link
          href={`/projects/${project.slug}`}
          className="group grid items-stretch gap-0 md:grid-cols-12"
        >
          <div
            className={cn(
              "relative flex min-h-52 items-center justify-center overflow-hidden border-2 border-line bg-surface-raised md:col-span-7 md:min-h-72",
              wobbles[index % wobbles.length],
              reversed ? "md:order-last" : "",
            )}
          >
            {project.cover ? (
              <ValImage
                src={project.cover}
                alt=""
                fill
                sizes="(min-width: 48rem) 40rem, 100vw"
                className="object-cover"
              />
            ) : (
              <span
                aria-hidden="true"
                className="select-none font-display text-[7rem] font-bold text-ink/10"
              >
                {project.title.trim().charAt(0)}
              </span>
            )}
          </div>
          <div
            className={cn(
              "relative z-10 flex flex-col gap-3 border-2 border-line bg-surface p-6 shadow-offset md:col-span-5 md:my-8 md:p-8",
              index % 2 === 1 ? "rounded-wobble-2 md:-mr-10" : "rounded-wobble-2 md:-ml-10",
            )}
          >
            <h3 className="font-display text-h2 font-bold text-ink transition-colors duration-[var(--duration-fast)] ease-out group-hover:text-accent-strong">
              {project.title}
            </h3>
            <p className="text-body text-ink-muted">{project.description}</p>
            <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
              <Tag category={project.category}>
                {categoryLabels[project.category]}
              </Tag>
              <Tag>{typeLabels[project.type]}</Tag>
            </div>
            <span className="inline-flex items-center gap-2 font-mono text-mono-sm text-accent-strong">
              Read the story
              <SketchIcon
                name="arrow-right"
                size={16}
                className="transition-transform duration-[var(--duration-base)] ease-out group-hover:translate-x-1 motion-reduce:transition-none"
              />
            </span>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
