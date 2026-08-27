"use client";

import { useState } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "motion/react";
import { SketchIcon } from "@/components/ui/sketch-icon";
import { Wordmark } from "@/components/layout/wordmark";
import { navItems } from "@/components/layout/nav-items";
import { reveal, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

const links = [{ href: "/", label: "Home" }, ...navItems];

export function MobileNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="inline-flex size-10 items-center justify-center rounded-md text-ink transition-colors duration-[var(--duration-fast)] ease-out hover:bg-surface-raised md:hidden"
        >
          <SketchIcon name="menu" size={22} />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-50 flex flex-col bg-bg"
        >
          <Dialog.Title className="sr-only">Menu</Dialog.Title>
          <div className="flex items-center justify-between px-gutter py-4">
            <span className="text-ink">
              <Wordmark />
            </span>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close menu"
                className="inline-flex size-10 items-center justify-center rounded-md text-ink transition-colors duration-[var(--duration-fast)] ease-out hover:bg-surface-raised"
              >
                <SketchIcon name="close" size={24} />
              </button>
            </Dialog.Close>
          </div>
          <motion.nav
            aria-label="Main"
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-1 flex-col items-start justify-center gap-2 px-gutter pb-16"
          >
            {links.map((item) => (
              <motion.div key={item.href} variants={reveal}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "inline-block py-2 font-display text-h1 font-bold transition-colors duration-[var(--duration-fast)] ease-out",
                    isActive(item.href)
                      ? "text-accent-strong"
                      : "text-ink hover:text-accent-strong",
                  )}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
