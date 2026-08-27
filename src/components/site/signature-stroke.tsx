"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const storageKey = "hero-stroke-drawn";

export function SignatureStroke({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(storageKey)) return;
      window.sessionStorage.setItem(storageKey, "1");
      ref.current?.setAttribute("data-draw", "true");
    } catch {
      return;
    }
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 320 22"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn("h-3.5 w-full overflow-visible md:h-5", className)}
    >
      <path
        d="M4 13.5C46 6.5 92 15.2 138 9.4 184 3.6 232 13.8 278 8.2 292 6.5 304 9.4 316 12.8"
        pathLength={1}
        strokeDasharray="1"
        fill="none"
        stroke="var(--accent-strong)"
        strokeWidth="5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        className="signature-stroke-main"
      />
    </svg>
  );
}
