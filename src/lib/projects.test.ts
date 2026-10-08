import { describe, expect, it } from "vitest";
import {
  countByType,
  filterProjects,
  getVisibleProjects,
  sortByDate,
  type ProjectEntry,
} from "./projects";

function makeProject(overrides: Partial<ProjectEntry>): ProjectEntry {
  return {
    slug: "example",
    title: "Example",
    description: "An example project",
    body: [],
    category: "hobby",
    type: "website",
    tech: [],
    links: [],
    images: [],
    date: "2024-01-01",
    featured: false,
    hidden: false,
    ...overrides,
  } as unknown as ProjectEntry;
}

describe("filterProjects", () => {
  const list = [
    makeProject({ slug: "a", category: "work", type: "website" }),
    makeProject({ slug: "b", category: "hobby", type: "game" }),
    makeProject({ slug: "c", category: "work", type: "app" }),
  ];

  it("returns everything when no filter is given", () => {
    expect(filterProjects(list, {})).toEqual(list);
  });

  it("filters by category", () => {
    expect(filterProjects(list, { category: "work" }).map((p) => p.slug)).toEqual([
      "a",
      "c",
    ]);
  });

  it("filters by type list", () => {
    expect(
      filterProjects(list, { types: ["game", "app"] }).map((p) => p.slug),
    ).toEqual(["b", "c"]);
  });

  it("treats an empty types list as no filter", () => {
    expect(filterProjects(list, { types: [] }).map((p) => p.slug)).toEqual([
      "a",
      "b",
      "c",
    ]);
  });

  it("combines category and type filters", () => {
    expect(
      filterProjects(list, { category: "work", types: ["app"] }).map(
        (p) => p.slug,
      ),
    ).toEqual(["c"]);
  });
});

describe("sortByDate", () => {
  it("orders newest first without mutating the input", () => {
    const list = [
      makeProject({ slug: "old", date: "2020-05-01" }),
      makeProject({ slug: "new", date: "2024-01-01" }),
      makeProject({ slug: "mid", date: "2022-03-15" }),
    ];
    const original = [...list];

    expect(sortByDate(list).map((p) => p.slug)).toEqual(["new", "mid", "old"]);
    expect(list).toEqual(original);
  });
});

describe("getVisibleProjects", () => {
  const list = [
    makeProject({ slug: "visible", hidden: false }),
    makeProject({ slug: "secret", hidden: true }),
  ];

  it("hides hidden projects when not authed", () => {
    expect(getVisibleProjects(list, false).map((p) => p.slug)).toEqual([
      "visible",
    ]);
  });

  it("shows every project when authed", () => {
    expect(getVisibleProjects(list, true).map((p) => p.slug)).toEqual([
      "visible",
      "secret",
    ]);
  });
});

describe("countByType", () => {
  it("counts projects per type, including zero for unused types", () => {
    const list = [
      makeProject({ slug: "a", type: "website" }),
      makeProject({ slug: "b", type: "website" }),
      makeProject({ slug: "c", type: "game" }),
    ];

    expect(countByType(list)).toEqual({
      website: 2,
      app: 0,
      game: 1,
      "non-technical": 0,
    });
  });

  it("returns all-zero counts for an empty list", () => {
    expect(countByType([])).toEqual({
      website: 0,
      app: 0,
      game: 0,
      "non-technical": 0,
    });
  });
});
