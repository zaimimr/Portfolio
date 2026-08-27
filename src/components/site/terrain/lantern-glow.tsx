"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { subscribeLantern } from "./lantern-store";
import { cn } from "@/lib/utils";

const reach = 340;

export function LanternGlow({
  className,
  scale = 1,
  edgeOnly = false,
}: {
  className?: string;
  scale?: number;
  edgeOnly?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    const host = element?.parentElement;
    if (!element || !host) return;

    let box = { top: 0, left: 0, width: 0, height: 0 };
    let lastStep = -1;

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
      const linear = Math.max(0, 1 - distance / reach);
      const eased = linear * linear * (3 - 2 * linear);

      host.style.setProperty("--lantern-x", `${localX.toFixed(1)}px`);
      host.style.setProperty("--lantern-y", `${localY.toFixed(1)}px`);
      const strength = eased * scale;
      host.style.setProperty("--lantern-strength", strength.toFixed(3));

      const step = Math.round(strength * 10) / 10;
      if (step !== lastStep) {
        lastStep = step;
        host.style.setProperty("--lantern-step", step.toFixed(1));
      }
    });

    return () => {
      unsubscribe();
      resizeObserver.disconnect();
      host.style.removeProperty("--lantern-strength");
      host.style.removeProperty("--lantern-step");
    };
  }, [scale]);

  if (reducedMotion) return null;

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] opacity-[var(--lantern-strength,0)]",
        className,
      )}
      style={
        edgeOnly
          ? {
              boxShadow:
                "inset 0 0 20px -2px color-mix(in oklab, var(--scene-glow) 30%, transparent), inset 0 0 7px color-mix(in oklab, var(--scene-glow) 34%, transparent)",
            }
          : {
              backgroundImage: [
                "radial-gradient(circle 240px at var(--lantern-x, -999px) var(--lantern-y, -999px), color-mix(in oklab, var(--scene-glow) 40%, transparent), color-mix(in oklab, var(--scene-glow) 12%, transparent) 46%, transparent 74%)",
                "linear-gradient(to bottom, color-mix(in oklab, var(--scene-glow) 8%, transparent), color-mix(in oklab, var(--scene-glow) 4%, transparent))",
              ].join(","),
              boxShadow:
                "inset 0 0 40px 2px color-mix(in oklab, var(--scene-glow) 26%, transparent), inset 0 0 8px color-mix(in oklab, var(--scene-glow) 32%, transparent)",
            }
      }
    />
  );
}
