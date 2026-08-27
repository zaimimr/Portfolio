import {
  projectCategories,
  projectTypes,
  type ProjectCategory,
  type ProjectType,
} from "@/config/taxonomy";

export const categoryLabels = Object.fromEntries(
  projectCategories.map((category) => [category.value, category.label]),
) as Record<ProjectCategory, string>;

export const typeLabels = Object.fromEntries(
  projectTypes.map((type) => [type.value, type.label]),
) as Record<ProjectType, string>;
