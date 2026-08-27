import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Category = "work" | "freelance" | "hobby";

const categoryClasses: Record<Category, string> = {
  work: "bg-cat-work",
  freelance: "bg-cat-freelance",
  hobby: "bg-cat-hobby",
};

type TagProps = ComponentProps<"span"> & {
  category?: Category;
};

export function Tag({ category, className, ...props }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-wobble-sm px-2.5 py-1 font-mono text-mono-sm",
        category
          ? cn(categoryClasses[category], "text-accent-ink")
          : "border border-line/60 text-ink-muted",
        className,
      )}
      {...props}
    />
  );
}
