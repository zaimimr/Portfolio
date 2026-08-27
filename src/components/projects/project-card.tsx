"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ValImage } from "@valbuild/next";
import { Card } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { categoryLabels, typeLabels } from "@/lib/labels";
import type { ProjectCardModel } from "@/lib/project-view";
import { spring } from "@/lib/motion";

type ProjectCardProps = {
  project: ProjectCardModel;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, rotate: -1 }}
      transition={spring.snappy}
      className="h-full"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block h-full rounded-lg"
      >
        <Card
          index={index}
          className="relative flex h-full flex-col gap-4 overflow-hidden pt-10"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-8 right-1 select-none font-display text-[6.5rem] font-bold leading-none text-ink/8"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          {project.cover ? (
            <div className="relative aspect-video w-full overflow-hidden rounded-md border-2 border-line">
              <ValImage
                src={project.cover}
                alt=""
                fill
                sizes="(min-width: 48rem) 24rem, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}
          <div className="relative flex flex-col gap-2 pr-14">
            <h3 className="font-display text-h3 font-bold text-ink transition-colors duration-[var(--duration-fast)] ease-out group-hover:text-accent-strong">
              {project.title}
            </h3>
            <p className="text-sm text-ink-muted">{project.description}</p>
          </div>
          <div className="mt-auto flex flex-wrap items-center gap-2">
            <Tag category={project.category}>
              {categoryLabels[project.category]}
            </Tag>
            <Tag>{typeLabels[project.type]}</Tag>
            <span className="ml-auto font-mono text-mono-sm text-ink-faint">
              {project.year}
            </span>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
