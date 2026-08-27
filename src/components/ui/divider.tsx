import { cn } from "@/lib/utils";

const paths = {
  1: "M1 4.4C25 1.6 49 6.4 73 3.9 97 1.5 121 5.9 145 4 169 2.2 193 5.6 199 4.6",
  2: "M1 3.6C20 6.2 40 1.5 60 4.1 80 6.6 100 2 120 4.4 140 6.8 160 1.9 180 4.2 190 5.3 195 4.4 199 3.8",
} as const;

type DividerProps = {
  variant?: keyof typeof paths;
  className?: string;
};

export function Divider({ variant = 1, className }: DividerProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 8"
      preserveAspectRatio="none"
      className={cn("h-2 w-full text-line/40", className)}
    >
      <path
        d={paths[variant]}
        vectorEffect="non-scaling-stroke"
        className="fill-none stroke-current stroke-2"
        strokeLinecap="round"
      />
    </svg>
  );
}
