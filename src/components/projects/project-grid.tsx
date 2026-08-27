"use client";

import { AnimatePresence, motion } from "motion/react";
import { ProjectCard } from "@/components/projects/project-card";
import type { ProjectCardModel } from "@/lib/project-view";
import { spring } from "@/lib/motion";

export function ProjectGrid({ projects }: { projects: ProjectCardModel[] }) {
  return (
    <motion.ul layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout" initial={false}>
        {projects.map((project, index) => (
          <motion.li
            key={project.slug}
            layout
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.16 } }}
            transition={spring.gentle}
          >
            <ProjectCard project={project} index={index} />
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}
