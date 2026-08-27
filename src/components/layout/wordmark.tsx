import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={cn("size-10", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={3.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.5 9.6C19 8.2 28.4 8 37.6 9 28.6 18.9 19.6 29.2 11 40 20.6 41 30.2 40.8 39.5 39.4" />
      <path d="M44 39.6C44.1 39.7 44.2 39.8 44.3 39.9" />
    </svg>
  );
}
