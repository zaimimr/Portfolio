"use client";

import { useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { FilterBar } from "@/components/projects/filter-bar";
import { ProjectGrid } from "@/components/projects/project-grid";
import { Button } from "@/components/ui/button";
import { categoryValues, typeValues } from "@/config/taxonomy";
import type { ProjectCategory, ProjectType } from "@/config/taxonomy";
import type { ProjectCardModel } from "@/lib/project-view";

function parseCategory(value: string | null): ProjectCategory | null {
  return categoryValues.find((category) => category === value) ?? null;
}

function parseTypes(values: string[]): ProjectType[] {
  const requested = values.flatMap((value) => value.split(","));
  return typeValues.filter((type) => requested.includes(type));
}

function countByType(
  list: readonly ProjectCardModel[],
): Record<ProjectType, number> {
  const counts = Object.fromEntries(
    typeValues.map((type) => [type, 0]),
  ) as Record<ProjectType, number>;
  for (const project of list) {
    counts[project.type] += 1;
  }
  return counts;
}

export function ProjectsExplorer({ projects }: { projects: ProjectCardModel[] }) {
  const searchParams = useSearchParams();
  const category = parseCategory(searchParams.get("category"));
  const types = useMemo(
    () => parseTypes(searchParams.getAll("type")),
    [searchParams],
  );

  const updateUrl = useCallback(
    (nextCategory: ProjectCategory | null, nextTypes: readonly ProjectType[]) => {
      const params = new URLSearchParams();
      if (nextCategory) params.set("category", nextCategory);
      for (const type of nextTypes) params.append("type", type);
      const query = params.toString();
      window.history.pushState(
        null,
        "",
        query ? `/projects?${query}` : "/projects",
      );
    },
    [],
  );

  const byCategory = useMemo(
    () =>
      category
        ? projects.filter((project) => project.category === category)
        : projects,
    [projects, category],
  );

  const typeCounts = useMemo(() => countByType(byCategory), [byCategory]);

  const filtered = useMemo(
    () =>
      types.length > 0
        ? byCategory.filter((project) => types.includes(project.type))
        : byCategory,
    [byCategory, types],
  );

  return (
    <div className="flex flex-col gap-10">
      <FilterBar
        category={category}
        types={types}
        typeCounts={typeCounts}
        onCategoryChange={(next) => updateUrl(next, types)}
        onTypeToggle={(type) =>
          updateUrl(
            category,
            types.includes(type)
              ? types.filter((current) => current !== type)
              : [...types, type],
          )
        }
      />
      <p aria-live="polite" className="sr-only">
        {filtered.length} {filtered.length === 1 ? "project" : "projects"} shown
      </p>
      {filtered.length > 0 ? (
        <ProjectGrid projects={filtered} />
      ) : (
        <div className="flex flex-col items-center gap-5 py-16 text-center">
          <p aria-hidden="true" className="font-hand text-h2 text-ink-muted">
            ¯\_(ツ)_/¯
          </p>
          <p className="text-body-lg text-ink-muted">
            Nothing matches that combination.
          </p>
          <Button variant="sketch" onClick={() => updateUrl(null, [])}>
            Show everything
          </Button>
        </div>
      )}
    </div>
  );
}
