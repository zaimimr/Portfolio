import { describe, expect, it } from "vitest";
import type { ProjectEntry } from "./projects";
import {
  countByType,
  filterProjects,
  getVisibleProjects,
  sortByDate,
} from "./projects";

function project(overrides: Partial<ProjectEntry> & { slug: string }): ProjectEntry {
  return {
    title: overrides.slug,
    description: "",
    body: [],
    category: "work",
    type: "website",
    tech: [],
    links: [],
    images: [],
    date: "2024-01-01",
    featured: false,
    hidden: false,
    ...overrides,
  } as ProjectEntry;
}

const projects: ProjectEntry[] = [
  project({ slug: "work-site", category: "work", type: "website", date: "2024-01-01" }),
  project({ slug: "hobby-game", category: "hobby", type: "game", date: "2024-06-01" }),
  project({
    slug: "freelance-app",
    category: "freelance",
    type: "app",
    date: "2023-01-01",
    hidden: true,
  }),
];

describe("filterProjects", () => {
  it("returns all projects when no filter is given", () => {
    expect(filterProjects(projects, {})).toEqual(projects);
  });

  it("filters by category", () => {
    expect(filterProjects(projects, { category: "hobby" })).toEqual([
      projects[1],
    ]);
  });

  it("filters by a list of types", () => {
    expect(filterProjects(projects, { types: ["website", "app"] })).toEqual([
      projects[0],
      projects[2],
    ]);
  });

  it("treats an empty types list as no filter", () => {
    expect(filterProjects(projects, { types: [] })).toEqual(projects);
  });

  it("combines category and type filters", () => {
    expect(
      filterProjects(projects, { category: "work", types: ["game"] }),
    ).toEqual([]);
  });
});

describe("sortByDate", () => {
  it("orders projects from newest to oldest", () => {
    expect(sortByDate(projects).map((p) => p.slug)).toEqual([
      "hobby-game",
      "work-site",
      "freelance-app",
    ]);
  });

  it("does not mutate the input list", () => {
    const copy = [...projects];
    sortByDate(projects);
    expect(projects).toEqual(copy);
  });
});

describe("getVisibleProjects", () => {
  it("excludes hidden projects when not authenticated", () => {
    expect(getVisibleProjects(projects, false).map((p) => p.slug)).toEqual([
      "work-site",
      "hobby-game",
    ]);
  });

  it("includes hidden projects when authenticated", () => {
    expect(getVisibleProjects(projects, true)).toEqual(projects);
  });
});

describe("countByType", () => {
  it("counts projects per type, including zero for unused types", () => {
    expect(countByType(projects)).toEqual({
      website: 1,
      app: 1,
      game: 1,
      "non-technical": 0,
    });
  });

  it("returns all zeros for an empty list", () => {
    expect(countByType([])).toEqual({
      website: 0,
      app: 0,
      game: 0,
      "non-technical": 0,
    });
  });
});
