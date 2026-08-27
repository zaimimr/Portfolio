"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { subscribeLantern } from "./lantern-store";
import { cn } from "@/lib/utils";

const reach = 240;

export function LanternGlow({
  className,
  scale = 1,
}: {
  className?: string;
  scale?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    const host = element?.parentElement;
    if (!element || !host) return;

    let box = { top: 0, left: 0, width: 0, height: 0 };

    const remeasure = () => {
      const rect = host.getBoundingClientRect();
      box = {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height,
      };
    };

    remeasure();
    const resizeObserver = new ResizeObserver(remeasure);
    resizeObserver.observe(document.documentElement);
    resizeObserver.observe(host);

    const unsubscribe = subscribeLantern(({ x, y }) => {
      if (!box.width || !box.height) return;
      const localX = x + window.scrollX - box.left;
      const localY = y + window.scrollY - box.top;
      const nearestX = Math.min(Math.max(localX, 0), box.width);
      const nearestY = Math.min(Math.max(localY, 0), box.height);
      const distance = Math.hypot(localX - nearestX, localY - nearestY);
      const strength = Math.max(0, 1 - distance / reach);

      element.style.setProperty("--lantern-x", `${localX.toFixed(1)}px`);
      element.style.setProperty("--lantern-y", `${localY.toFixed(1)}px`);
      element.style.setProperty(
        "--lantern-strength",
        (strength * scale).toFixed(3),
      );
    });

    return () => {
      unsubscribe();
      resizeObserver.disconnect();
    };
  }, [scale]);

  if (reducedMotion) return null;

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] opacity-[var(--lantern-strength,0)] transition-opacity duration-200 ease-out",
        className,
      )}
      style={{
        backgroundImage:
          "radial-gradient(circle 200px at var(--lantern-x, -999px) var(--lantern-y, -999px), color-mix(in oklab, var(--scene-glow) 46%, transparent), color-mix(in oklab, var(--scene-glow) 14%, transparent) 45%, transparent 72%)",
      }}
    />
  );
}
