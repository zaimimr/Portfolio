import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const wobbles = ["rounded-wobble-1", "rounded-wobble-2", "rounded-wobble-3"];

type CardProps = ComponentProps<"div"> & {
  index?: number;
};

export function Card({ index = 0, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "border-2 border-line bg-surface p-6 shadow-offset",
        wobbles[index % wobbles.length],
        className,
      )}
      {...props}
    />
  );
}
