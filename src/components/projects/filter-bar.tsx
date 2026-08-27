"use client";

import { motion } from "motion/react";
import { projectCategories, projectTypes } from "@/config/taxonomy";
import type { ProjectCategory, ProjectType } from "@/config/taxonomy";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

const categoryIndicatorClasses: Record<ProjectCategory | "all", string> = {
  all: "bg-accent",
  work: "bg-cat-work",
  freelance: "bg-cat-freelance",
  hobby: "bg-cat-hobby",
};

const segments = [{ value: "all" as const, label: "All" }, ...projectCategories];

type FilterBarProps = {
  category: ProjectCategory | null;
  types: readonly ProjectType[];
  typeCounts: Record<ProjectType, number>;
  onCategoryChange: (category: ProjectCategory | null) => void;
  onTypeToggle: (type: ProjectType) => void;
};

export function FilterBar({
  category,
  types,
  typeCounts,
  onCategoryChange,
  onTypeToggle,
}: FilterBarProps) {
  const activeSegment = category ?? "all";

  return (
    <div className="flex flex-col gap-4">
      <div
        role="group"
        aria-label="Filter by category"
        className="grid grid-cols-4 gap-1 rounded-wobble-sm border-2 border-line bg-surface p-1 md:inline-grid md:w-fit md:auto-cols-fr md:grid-flow-col"
      >
        {segments.map((segment) => {
          const selected = activeSegment === segment.value;
          return (
            <button
              key={segment.value}
              type="button"
              aria-pressed={selected}
              onClick={() =>
                onCategoryChange(segment.value === "all" ? null : segment.value)
              }
              className={cn(
                "relative rounded-md px-2 py-2 text-center text-sm font-semibold transition-colors duration-[var(--duration-fast)] ease-out md:px-5",
                selected
                  ? "text-accent-ink"
                  : "text-ink-muted hover:text-ink",
              )}
            >
              {selected ? (
                <motion.span
                  layoutId="category-indicator"
                  transition={spring.snappy}
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-0 rounded-md",
                    categoryIndicatorClasses[segment.value],
                  )}
                />
              ) : null}
              <span className="relative">{segment.label}</span>
            </button>
          );
        })}
      </div>
      <div
        role="group"
        aria-label="Filter by type"
        className="-mx-gutter flex gap-2 overflow-x-auto px-gutter [mask-image:linear-gradient(to_right,transparent,black_var(--spacing-gutter),black_calc(100%-var(--spacing-gutter)),transparent)] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:[mask-image:none]"
      >
        {projectTypes.map((type) => {
          const selected = types.includes(type.value);
          const count = typeCounts[type.value];
          return (
            <button
              key={type.value}
              type="button"
              aria-pressed={selected}
              disabled={count === 0 && !selected}
              onClick={() => onTypeToggle(type.value)}
              className={cn(
                "shrink-0 rounded-wobble-sm border-2 px-3.5 py-1.5 font-mono text-mono-sm transition-[color,border-color,background-color,transform] duration-[var(--duration-fast)] ease-out disabled:pointer-events-none disabled:opacity-40",
                selected
                  ? "border-line bg-ink text-bg"
                  : "border-line/40 text-ink-muted hover:-rotate-1 hover:border-line hover:text-ink",
              )}
            >
              {type.label} · {count}
            </button>
          );
        })}
      </div>
    </div>
  );
}
