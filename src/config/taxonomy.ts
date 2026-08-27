export const projectCategories = [
  { value: "work", label: "Work" },
  { value: "freelance", label: "Freelance" },
  { value: "hobby", label: "Hobby" },
] as const;

export const projectTypes = [
  { value: "website", label: "Website" },
  { value: "app", label: "App" },
  { value: "game", label: "Game" },
  { value: "non-technical", label: "Non-technical" },
] as const;

export type ProjectCategory = (typeof projectCategories)[number]["value"];
export type ProjectType = (typeof projectTypes)[number]["value"];

export const categoryValues = projectCategories.map(
  (category) => category.value,
) as readonly ProjectCategory[];

export const typeValues = projectTypes.map(
  (type) => type.value,
) as readonly ProjectType[];
