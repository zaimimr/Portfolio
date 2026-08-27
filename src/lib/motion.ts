import type { Transition, Variants } from "motion/react";

export const spring = {
  snappy: { type: "spring", stiffness: 500, damping: 32 },
  gentle: { type: "spring", stiffness: 200, damping: 26 },
  bouncy: { type: "spring", stiffness: 320, damping: 14 },
} as const satisfies Record<string, Transition>;

export const reveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: spring.gentle },
};

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};
