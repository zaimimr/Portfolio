"use client";

import { useRef, useSyncExternalStore } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

export type TimelineEntryModel = {
  title: string;
  org: string;
  period: string;
  description: string;
};

const emptySubscribe = () => () => {};

export function Timeline({ entries }: { entries: TimelineEntryModel[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reducedMotion = useReducedMotion();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 26 });
  const remaining = useTransform(progress, (value) => (1 - value) * 100);
  const clipPath = useMotionTemplate`inset(0 0 ${remaining}% 0)`;

  const drawOnScroll = mounted && !reducedMotion;

  return (
    <ol ref={ref} className="relative flex flex-col gap-10 md:gap-14">
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 12 100"
        preserveAspectRatio="none"
        className="absolute left-2.75 top-2 h-[calc(100%-1rem)] w-3 md:left-1/2 md:-translate-x-1/2"
        style={drawOnScroll ? { clipPath } : undefined}
      >
        <path
          d="M6 0C3 8 9 14 5 22 2 29 10 35 6 43 3 51 9 57 5 65 2 72 10 79 6 87 4 93 7 97 6 100"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          className="fill-none stroke-accent-strong stroke-2"
        />
      </motion.svg>
      {entries.map((entry, index) => {
        const right = index % 2 === 1;
        return (
          <li
            key={`${entry.org}-${entry.period}`}
            className="relative grid pl-10 md:grid-cols-2 md:pl-0"
          >
            <span
              aria-hidden="true"
              className="absolute left-1.25 top-1.5 size-3.5 rounded-full border-2 border-line bg-accent md:left-1/2 md:-translate-x-1/2"
            />
            <div
              className={cn(
                "flex flex-col gap-1.5",
                right
                  ? "md:col-start-2 md:pl-12"
                  : "md:col-start-1 md:pr-12 md:text-right",
              )}
            >
              <p className="font-mono text-mono-sm uppercase tracking-wider text-ink-faint">
                {entry.period}
              </p>
              <h3 className="font-display text-h3 font-bold text-ink">
                {entry.title}
              </h3>
              <p className="font-mono text-mono-sm text-accent-strong">
                {entry.org}
              </p>
              <p className="text-body text-ink-muted">{entry.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
