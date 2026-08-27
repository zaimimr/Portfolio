"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export function HeroSignature({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion();
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem("hero-drawn")) return;
      window.sessionStorage.setItem("hero-drawn", "1");
    } catch {
      return;
    }
    if (reducedMotion) return;
    const frame = requestAnimationFrame(() => setDrawing(true));
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion]);

  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={cn("size-16 text-accent-strong", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={3.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path
        d="M9.5 9.6C19 8.2 28.4 8 37.6 9 28.6 18.9 19.6 29.2 11 40 20.6 41 30.2 40.8 39.5 39.4"
        initial={false}
        animate={drawing ? { pathLength: [0, 1] } : { pathLength: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      />
      <motion.path
        d="M44 39.6C44.1 39.7 44.2 39.8 44.3 39.9"
        initial={false}
        animate={drawing ? { pathLength: [0, 1], opacity: [0, 1] } : { pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.15, delay: drawing ? 1.35 : 0 }}
      />
    </svg>
  );
}
