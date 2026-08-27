"use client";

import { Slot } from "@radix-ui/react-slot";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const variants = {
  "solid-ink":
    "rounded-md bg-ink text-bg shadow-offset-sm hover:-translate-x-px hover:-translate-y-px active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
  accent:
    "rounded-md bg-accent text-accent-ink shadow-offset-sm hover:-translate-x-px hover:-translate-y-px active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
  ghost:
    "rounded-md bg-transparent text-ink hover:bg-surface-raised active:translate-y-px",
  sketch:
    "rounded-wobble-2 border-2 border-line bg-surface text-ink shadow-offset-sm hover:-rotate-1 active:translate-x-0.5 active:translate-y-0.5 active:rotate-0 active:shadow-none",
} as const;

const sizes = {
  sm: "h-9 gap-1.5 px-4 text-sm",
  md: "h-11 gap-2 px-5 text-body",
  lg: "h-13 gap-2.5 px-7 text-body-lg",
} as const;

type ButtonProps = ComponentProps<"button"> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  asChild?: boolean;
};

export function Button({
  variant = "solid-ink",
  size = "md",
  asChild = false,
  className,
  type,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      type={asChild ? type : (type ?? "button")}
      className={cn(
        "inline-flex items-center justify-center font-sans font-semibold transition-[transform,box-shadow,background-color,color] duration-[var(--duration-fast)] ease-out disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
