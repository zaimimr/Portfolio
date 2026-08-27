"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "motion/react";
import { SketchIcon } from "@/components/ui/sketch-icon";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

const emptySubscribe = () => () => {};

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={
        mounted ? (isDark ? "Switch to light mode" : "Switch to dark mode") : "Toggle theme"
      }
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-md text-ink transition-colors duration-[var(--duration-fast)] ease-out hover:bg-surface-raised hover:text-accent-strong",
        className,
      )}
    >
      {mounted ? (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ rotate: -60, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1, transition: spring.snappy }}
            exit={{ rotate: 60, opacity: 0, scale: 0.6, transition: { duration: 0.12 } }}
            className="inline-flex"
          >
            <SketchIcon name={isDark ? "moon" : "sun"} size={20} />
          </motion.span>
        </AnimatePresence>
      ) : (
        <SketchIcon name="moon" size={20} />
      )}
    </button>
  );
}
