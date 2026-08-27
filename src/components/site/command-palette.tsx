"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Command } from "cmdk";
import { SketchIcon } from "@/components/ui/sketch-icon";
import type { SketchIconName } from "@/components/ui/sketch-icon";
import { Kbd } from "@/components/ui/kbd";
import type { SocialLink } from "@/components/layout/footer";

const eggFlags = [
  "promise-kept",
  "hero-drawn",
  "konami",
  "wordmark-dance",
  "admin-found",
  "console-noticed",
] as const;

function readFlag(flag: string): boolean {
  try {
    return (
      window.localStorage.getItem(flag) !== null ||
      window.sessionStorage.getItem(flag) !== null
    );
  } catch {
    return false;
  }
}

function markAdminFound() {
  try {
    window.localStorage.setItem("admin-found", "1");
  } catch {
    return;
  }
}

const pages: { label: string; href: string; icon: SketchIconName }[] = [
  { label: "Home", href: "/", icon: "sparkle" },
  { label: "Projects", href: "/projects", icon: "play" },
  { label: "Playground", href: "/playground", icon: "sparkle" },
  { label: "About", href: "/about", icon: "check" },
  { label: "Contact", href: "/contact", icon: "mail" },
];

const iconByLabel: Record<string, SketchIconName> = {
  github: "github",
  linkedin: "linkedin",
};

type CommandPaletteProps = {
  socials: SocialLink[];
  email: string;
};

export function CommandPalette({ socials, email }: CommandPaletteProps) {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [eggsFound, setEggsFound] = useState(0);

  const handleOpenChange = useCallback((next: boolean) => {
    if (next) {
      setEggsFound(eggFlags.filter(readFlag).length);
    } else {
      setSearch("");
    }
    setOpen(next);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setEggsFound(eggFlags.filter(readFlag).length);
        setSearch("");
        setOpen((current) => !current);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const runAction = useCallback((action: () => void) => {
    setOpen(false);
    action();
  }, []);

  const showAdmin =
    search.length > 0 && "admin".startsWith(search.trim().toLowerCase());

  const itemClass =
    "flex cursor-pointer select-none items-center gap-3 rounded-md px-3 py-2.5 text-body text-ink data-[selected=true]:bg-surface-raised data-[selected=true]:text-accent-strong";

  return (
    <Command.Dialog
      open={open}
      onOpenChange={handleOpenChange}
      shouldFilter
      label="Command menu"
      overlayClassName="fixed inset-0 z-50 bg-black/50"
      contentClassName="fixed left-1/2 top-24 z-50 w-[min(34rem,calc(100vw-2rem))] -translate-x-1/2 rounded-wobble-2 border-2 border-line bg-surface shadow-[var(--shadow-overlay)]"
    >
      <div className="flex items-center gap-3 border-b-2 border-line/15 px-4">
        <SketchIcon name="search" size={18} className="shrink-0 text-ink-muted" />
        <Command.Input
          value={search}
          onValueChange={setSearch}
          placeholder="Where to?"
          className="h-13 w-full bg-transparent text-body text-ink outline-none placeholder:text-ink-faint"
        />
        <Kbd>esc</Kbd>
      </div>
      <Command.List className="max-h-80 overflow-y-auto p-2">
        <Command.Empty className="px-3 py-6 text-center font-hand text-hand text-ink-muted">
          Nothing here. Yet.
        </Command.Empty>
        <Command.Group
          heading="Pages"
          className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-mono-sm [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-ink-muted"
        >
          {pages.map((page) => (
            <Command.Item
              key={page.href}
              value={page.label}
              onSelect={() => runAction(() => router.push(page.href))}
              className={itemClass}
            >
              <SketchIcon name={page.icon} size={18} className="text-ink-muted" />
              {page.label}
            </Command.Item>
          ))}
        </Command.Group>
        <Command.Group
          heading="Theme"
          className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-mono-sm [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-ink-muted"
        >
          <Command.Item
            value="Toggle theme light dark mode"
            onSelect={() =>
              runAction(() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark"),
              )
            }
            className={itemClass}
          >
            <SketchIcon
              name={resolvedTheme === "dark" ? "sun" : "moon"}
              size={18}
              className="text-ink-muted"
            />
            {resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          </Command.Item>
        </Command.Group>
        <Command.Group
          heading="Elsewhere"
          className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-mono-sm [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-ink-muted"
        >
          {socials.map((social) => (
            <Command.Item
              key={social.url}
              value={social.label}
              onSelect={() =>
                runAction(() => window.open(social.url, "_blank", "noreferrer"))
              }
              className={itemClass}
            >
              <SketchIcon
                name={iconByLabel[social.label.toLowerCase()] ?? "external"}
                size={18}
                className="text-ink-muted"
              />
              {social.label}
            </Command.Item>
          ))}
          <Command.Item
            value="Email"
            onSelect={() =>
              runAction(() => {
                window.location.href = `mailto:${email}`;
              })
            }
            className={itemClass}
          >
            <SketchIcon name="mail" size={18} className="text-ink-muted" />
            Email
          </Command.Item>
        </Command.Group>
        <Command.Group
          heading="Secrets"
          className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-mono-sm [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-ink-muted"
        >
          <Command.Item
            value="Easter eggs found"
            onSelect={() => setOpen(false)}
            className={itemClass}
          >
            <SketchIcon name="sparkle" size={18} className="text-ink-muted" />
            <span>
              Easter eggs found{" "}
              <span className="font-hand text-hand text-accent-strong">
                {eggsFound}/{eggFlags.length}
              </span>
            </span>
          </Command.Item>
        </Command.Group>
        {showAdmin ? (
          <Command.Item
            value="admin"
            onSelect={() =>
              runAction(() => {
                markAdminFound();
                router.push("/admin");
              })
            }
            className={itemClass}
          >
            <SketchIcon name="command" size={18} className="text-ink-muted" />
            <span>
              Admin{" "}
              <span className="font-hand text-hand text-ink-muted">
                you found the back door
              </span>
            </span>
          </Command.Item>
        ) : null}
      </Command.List>
    </Command.Dialog>
  );
}
