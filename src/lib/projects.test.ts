import { describe, expect, it } from "vitest";
import type { ProjectEntry } from "./projects";
import {
  countByType,
  filterProjects,
  getVisibleProjects,
  sortByDate,
  toProjectEntries,
} from "./projects";

function project(overrides: Partial<ProjectEntry>): ProjectEntry {
  return {
    title: "Project",
    description: "Description",
    body: [],
    category: "work",
    type: "website",
    tech: [],
    links: [],
    images: [],
    date: "2024-01-01",
    featured: false,
    hidden: false,
    slug: "project",
    ...overrides,
  } as ProjectEntry;
}

describe("toProjectEntries", () => {
  it("attaches the record key as the slug", () => {
    const a = project({ slug: "a" });
    const b = project({ slug: "b" });
    expect(toProjectEntries({ a, b })).toEqual([
      { ...a, slug: "a" },
      { ...b, slug: "b" },
    ]);
  });
});

describe("filterProjects", () => {
  const list = [
    project({ slug: "work-website", category: "work", type: "website" }),
    project({ slug: "hobby-app", category: "hobby", type: "app" }),
    project({ slug: "hobby-game", category: "hobby", type: "game" }),
  ];

  it("returns everything when no filter is set", () => {
    expect(filterProjects(list, {})).toEqual(list);
  });

  it("filters by category", () => {
    expect(filterProjects(list, { category: "hobby" })).toEqual([
      list[1],
      list[2],
    ]);
  });

  it("filters by type", () => {
    expect(filterProjects(list, { types: ["game"] })).toEqual([list[2]]);
  });

  it("treats an empty types list as no filter", () => {
    expect(filterProjects(list, { types: [] })).toEqual(list);
  });

  it("combines category and type filters", () => {
    expect(filterProjects(list, { category: "hobby", types: ["app"] })).toEqual(
      [list[1]],
    );
  });
});

describe("sortByDate", () => {
  it("orders newest first without mutating the input", () => {
    const oldest = project({ slug: "oldest", date: "2022-01-01" });
    const newest = project({ slug: "newest", date: "2024-06-01" });
    const middle = project({ slug: "middle", date: "2023-03-01" });
    const list = [oldest, newest, middle];

    expect(sortByDate(list)).toEqual([newest, middle, oldest]);
    expect(list).toEqual([oldest, newest, middle]);
  });
});

describe("getVisibleProjects", () => {
  const visible = project({ slug: "visible", hidden: false });
  const hidden = project({ slug: "hidden", hidden: true });
  const list = [visible, hidden];

  it("hides hidden projects for unauthenticated visitors", () => {
    expect(getVisibleProjects(list, false)).toEqual([visible]);
  });

  it("shows every project when authenticated", () => {
    expect(getVisibleProjects(list, true)).toEqual(list);
  });
});

describe("countByType", () => {
  it("counts every known type, including zero counts", () => {
    const list = [
      project({ type: "website" }),
      project({ type: "website" }),
      project({ type: "app" }),
    ];

    expect(countByType(list)).toEqual({
      website: 2,
      app: 1,
      game: 0,
      "non-technical": 0,
    });
  });
});
