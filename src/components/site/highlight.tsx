import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type HighlightProps = {
  children: ReactNode;
  animate?: boolean;
  className?: string;
};

export function Highlight({ children, animate = false, className }: HighlightProps) {
  return (
    <mark
      className={cn(
        "marker-highlight",
        animate && "marker-highlight-animate",
        className,
      )}
    >
      {children}
    </mark>
  );
}
