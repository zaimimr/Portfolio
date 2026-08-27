import { cn } from "@/lib/utils";

type SceneWashProps = {
  variant?: "pool" | "band";
  className?: string;
};

export function SceneWash({ variant = "pool", className }: SceneWashProps) {
  if (variant === "band") {
    return (
      <div
        aria-hidden="true"
        className={cn("pointer-events-none absolute -z-10", className)}
        style={{
          backgroundImage:
            "linear-gradient(to bottom, transparent, color-mix(in oklab, var(--bg) 86%, transparent) 34%, var(--bg) 72%)",
        }}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -z-10 rounded-[3rem] blur-xl",
        className,
      )}
      style={{ backgroundColor: "var(--bg)", opacity: "var(--scene-wash)" }}
    />
  );
}
