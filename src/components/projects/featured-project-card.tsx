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
import { LanternGlow } from "@/components/site/terrain/lantern-glow";

const wobbles = ["rounded-wobble-1", "rounded-wobble-3"];

const LANTERN_BORDER =
  "color-mix(in oklab, var(--scene-glow) calc(var(--lantern-step, 0) * 46%), var(--line))";

const LANTERN_HALO =
  "0 0 calc(var(--lantern-step, 0) * 80px) calc(var(--lantern-step, 0) * 10px) color-mix(in oklab, var(--scene-glow) calc(var(--lantern-step, 0) * 28%), transparent)";

type FeaturedProjectCardProps = {
  project: ProjectCardModel;
  index: number;
};

export function FeaturedProjectCard({
  project,
  index,
}: FeaturedProjectCardProps) {
  const reversed = index % 2 === 1;

  return (
    <div className="relative">
      <motion.div
        whileHover={{ y: -6, rotate: reversed ? 0.6 : -0.6 }}
        transition={spring.snappy}
      >
        <Link
          href={`/projects/${project.slug}`}
          className="group grid items-stretch gap-0 md:grid-cols-12"
        >
          <div
            style={{
              borderColor: LANTERN_BORDER,
              boxShadow: LANTERN_HALO,
            }}
            className={cn(
              "bg-surface-raised/80 relative flex min-h-52 items-center justify-center overflow-hidden border-2 backdrop-blur-md md:col-span-7 md:min-h-72",
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
                className="font-display text-ink/10 text-[7rem] font-bold select-none"
              >
                {project.title.trim().charAt(0)}
              </span>
            )}
            <LanternGlow />
          </div>
          <div
            style={{
              borderColor: LANTERN_BORDER,
              boxShadow: `var(--card-offset-shadow), ${LANTERN_HALO}`,
            }}
            className={cn(
              "bg-surface/85 relative z-10 flex flex-col gap-3 overflow-hidden border-2 p-6 backdrop-blur-md md:col-span-5 md:my-8 md:p-8",
              index % 2 === 1
                ? "rounded-wobble-2 md:-mr-10"
                : "rounded-wobble-2 md:-ml-10",
            )}
          >
            <LanternGlow edgeOnly />
            <h3 className="font-display text-h2 text-ink group-hover:text-accent-strong relative font-bold transition-colors duration-[var(--duration-fast)] ease-out">
              {project.title}
            </h3>
            <p className="text-body text-ink-muted relative">
              {project.description}
            </p>
            <div className="relative mt-auto flex flex-wrap items-center gap-2 pt-2">
              <Tag category={project.category}>
                {categoryLabels[project.category]}
              </Tag>
              <Tag>{typeLabels[project.type]}</Tag>
            </div>
            <span className="text-mono-sm text-accent-strong relative inline-flex items-center gap-2 font-mono">
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
