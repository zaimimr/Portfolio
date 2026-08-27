import type {
  ProjectCategory,
  ProjectType,
} from "../config/taxonomy";
import { typeValues } from "../config/taxonomy";
import type { Project, Projects } from "../content/projects.val";

export type ProjectEntry = Project & { slug: string };

export type ProjectFilter = {
  category?: ProjectCategory;
  types?: readonly ProjectType[];
};

export function toProjectEntries(projects: Projects): ProjectEntry[] {
  return Object.entries(projects).map(([slug, project]) => ({
    ...project,
    slug,
  }));
}

export function filterProjects(
  list: readonly ProjectEntry[],
  filter: ProjectFilter,
): ProjectEntry[] {
  return list.filter((project) => {
    if (filter.category !== undefined && project.category !== filter.category) {
      return false;
    }
    if (
      filter.types !== undefined &&
      filter.types.length > 0 &&
      !filter.types.includes(project.type)
    ) {
      return false;
    }
    return true;
  });
}

export function sortByDate(list: readonly ProjectEntry[]): ProjectEntry[] {
  return [...list].sort((a, b) => b.date.localeCompare(a.date));
}

export function getVisibleProjects(
  list: readonly ProjectEntry[],
  isAuthed: boolean,
): ProjectEntry[] {
  return isAuthed ? [...list] : list.filter((project) => !project.hidden);
}

export function countByType(
  list: readonly ProjectEntry[],
): Record<ProjectType, number> {
  const counts = Object.fromEntries(
    typeValues.map((type) => [type, 0]),
  ) as Record<ProjectType, number>;
  for (const project of list) {
    counts[project.type] += 1;
  }
  return counts;
}
