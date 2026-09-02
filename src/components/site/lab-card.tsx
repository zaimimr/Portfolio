"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ValImage } from "@valbuild/next";
import type { Image } from "@valbuild/next";
import { Card } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { SketchIcon } from "@/components/ui/sketch-icon";
import { spring } from "@/lib/motion";

export type LabCardModel = {
  slug: string;
  title: string;
  titleText: string;
  description: string;
  href: string;
  external: boolean;
  year: string;
  tags: string[];
  image: Image | null;
};

type LabCardProps = {
  experiment: LabCardModel;
  index: number;
};

export function LabCard({ experiment, index }: LabCardProps) {
  const linkProps = experiment.external
    ? { target: "_blank", rel: "noreferrer" }
    : {};

  return (
    <motion.div
      whileHover={{ y: -6, rotate: index % 2 === 0 ? -1 : 1 }}
      transition={spring.snappy}
      className="h-full"
    >
      <Link
        href={experiment.href}
        {...linkProps}
        className="group block h-full rounded-lg"
      >
        <Card index={index} className="flex h-full flex-col gap-4">
          {experiment.image ? (
            <div className="border-line relative aspect-video w-full overflow-hidden rounded-md border-2">
              <ValImage
                src={experiment.image}
                alt={`${experiment.titleText}, cover image`}
                fill
                sizes="(min-width: 48rem) 24rem, 100vw"
                className="object-cover transition-transform duration-[var(--duration-slow)] ease-out group-hover:scale-105 motion-reduce:transition-none"
              />
            </div>
          ) : null}
          <div className="flex items-start justify-between gap-3">
            <h2 className="font-display text-h3 text-ink group-hover:text-accent-strong font-bold transition-colors duration-[var(--duration-fast)] ease-out">
              {experiment.title}
            </h2>
            {experiment.external ? (
              <SketchIcon
                name="external"
                size={18}
                className="text-ink-muted group-hover:text-accent-strong mt-1.5 shrink-0 transition-colors duration-[var(--duration-fast)] ease-out"
              />
            ) : null}
          </div>
          <p className="text-ink-muted text-sm">{experiment.description}</p>
          <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
            {experiment.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
            <span className="text-mono-sm text-ink-muted ml-auto font-mono">
              {experiment.year}
            </span>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
