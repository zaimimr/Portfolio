import { cn } from "@/lib/utils";

type SpinnerProps = {
  size?: number;
  label?: string;
  className?: string;
};

export function Spinner({ size = 24, label = "Loading", className }: SpinnerProps) {
  return (
    <svg
      role="status"
      aria-label={label}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={cn("text-ink", className)}
    >
      <path
        d="M12 3.2C7.4 3.4 3.6 7.2 3.9 12.1 4.1 16.8 8 20.6 12.4 20.4 17 20.2 20.6 16.2 20.3 11.6 20 7.3 16.4 3.9 12.6 4.1 8.5 4.3 5.4 7.8 5.7 11.9"
        pathLength={1}
        strokeLinecap="round"
        className="animate-scribble fill-none stroke-current stroke-2 [stroke-dasharray:1] motion-reduce:animate-none"
      />
    </svg>
  );
}
