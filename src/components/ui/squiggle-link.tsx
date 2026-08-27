"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type SquiggleLinkProps = ComponentProps<typeof Link> & {
  active?: boolean;
};

export function SquiggleLink({
  active = false,
  className,
  children,
  ...props
}: SquiggleLinkProps) {
  return (
    <Link
      {...props}
      data-active={active || undefined}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative inline-block pb-1.5 font-medium text-ink transition-colors duration-[var(--duration-fast)] hover:text-accent-strong",
        className,
      )}
    >
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 60 6"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 h-1.5 w-full overflow-visible"
      >
        <path
          d="M1 4.2C6 1.8 11 5.4 16 3.6 21 1.9 26 5.2 31 3.5 36 1.9 41 5.3 46 3.6 51 2 55.5 4.6 59 3.4"
          pathLength={1}
          className="fill-none stroke-accent-strong stroke-2 [stroke-dasharray:1_2] [stroke-dashoffset:1.02] transition-[stroke-dashoffset] duration-[var(--duration-slow)] ease-out group-hover:[stroke-dashoffset:0] group-focus-visible:[stroke-dashoffset:0] group-data-[active]:[stroke-dashoffset:0] motion-reduce:transition-none"
        />
      </svg>
    </Link>
  );
}
