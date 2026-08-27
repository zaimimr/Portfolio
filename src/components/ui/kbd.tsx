import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Kbd({ className, ...props }: ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "inline-flex min-w-6 items-center justify-center rounded-sm border border-line/50 bg-surface-raised px-1.5 py-0.5 font-mono text-mono-sm text-ink-muted [box-shadow:1px_1px_0_var(--line)]",
        className,
      )}
      {...props}
    />
  );
}
