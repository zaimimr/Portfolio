"use client";

import { motion } from "motion/react";

export function ScrollCue({ note }: { note: string }) {
  return (
    <div className="flex items-end gap-3">
      <p className="font-hand text-hand text-ink max-w-[18rem] leading-snug">
        {note}
      </p>
      <motion.svg
        viewBox="0 0 30 56"
        aria-hidden="true"
        className="text-accent-strong h-12 w-6 shrink-0 overflow-visible"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: [0.4, 0, 0.6, 1] }}
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
        >
          <path d="M16.5 3.5C10.5 14 20 25.5 14.2 41.5" />
          <path d="M6.8 33.5C9.6 37.2 12.2 40.4 14.4 43.2" />
          <path d="M22.2 32.6C19.8 36.4 17.1 40 14.4 43.2" />
        </g>
      </motion.svg>
    </div>
  );
}
