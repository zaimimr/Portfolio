import { val } from "../../val.config";
import type { Image } from "@valbuild/next";
import type { ProjectCategory, ProjectType } from "@/config/taxonomy";
import type { ProjectEntry } from "@/lib/projects";

export type ProjectCardModel = {
  slug: string;
  title: string;
  titleText: string;
  description: string;
  category: ProjectCategory;
  type: ProjectType;
  year: string;
  cover: Image | null;
  featured: boolean;
};

export function toCardModel(project: ProjectEntry): ProjectCardModel {
  return {
    slug: project.slug,
    title: project.title,
    titleText: val.raw(project.title),
    description: project.description,
    category: val.raw(project.category),
    type: val.raw(project.type),
    year: val.raw(project.date).slice(0, 4),
    cover: project.images[0] ?? null,
    featured: val.raw(project.featured),
  };
}

export function rawEntry(project: ProjectEntry): ProjectEntry {
  return {
    ...project,
    category: val.raw(project.category),
    type: val.raw(project.type),
    date: val.raw(project.date),
    featured: val.raw(project.featured),
    hidden: val.raw(project.hidden),
  };
}
