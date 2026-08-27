"use client";

import { useId } from "react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

function SketchUnderline({ error }: { error: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 6"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -bottom-0.5 left-0 h-1.5 w-full overflow-visible"
    >
      <path
        d="M1 3.8C9 1.9 17 5.2 25 3.6 33 2.1 41 5.1 50 3.5 59 2 67 5 75 3.6 83 2.2 91 4.9 99 3.4"
        pathLength={1}
        strokeLinecap="round"
        className={cn(
          "fill-none stroke-2 transition-[stroke-dashoffset] duration-[var(--duration-slow)] ease-out [stroke-dasharray:1_2] [stroke-dashoffset:1.02] group-focus-within:[stroke-dashoffset:0] motion-reduce:transition-none",
          error ? "stroke-danger" : "stroke-accent-strong",
        )}
      />
    </svg>
  );
}

const shellClass = "group flex flex-col gap-1.5";
const labelClass = "font-mono text-mono-sm uppercase tracking-wider text-ink-muted";
const controlClass =
  "w-full border-b-2 bg-transparent pb-2 text-body text-ink outline-none placeholder:text-ink-faint";

function useFieldIds(id: string | undefined) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return { fieldId, errorId: `${fieldId}-error` };
}

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={id} className="text-sm text-danger">
      {error}
    </p>
  );
}

type InputProps = ComponentProps<"input"> & {
  label: string;
  error?: string;
};

export function Input({ label, error, id, className, ...props }: InputProps) {
  const { fieldId, errorId } = useFieldIds(id);

  return (
    <div className={cn(shellClass, className)}>
      <label htmlFor={fieldId} className={labelClass}>
        {label}
      </label>
      <div className="relative">
        <input
          id={fieldId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(controlClass, error ? "border-danger/60" : "border-line/25")}
          {...props}
        />
        <SketchUnderline error={Boolean(error)} />
      </div>
      <FieldError id={errorId} error={error} />
    </div>
  );
}

type TextareaProps = ComponentProps<"textarea"> & {
  label: string;
  error?: string;
};

export function Textarea({ label, error, id, className, ...props }: TextareaProps) {
  const { fieldId, errorId } = useFieldIds(id);

  return (
    <div className={cn(shellClass, className)}>
      <label htmlFor={fieldId} className={labelClass}>
        {label}
      </label>
      <div className="relative">
        <textarea
          id={fieldId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            controlClass,
            "min-h-28 resize-y",
            error ? "border-danger/60" : "border-line/25",
          )}
          {...props}
        />
        <SketchUnderline error={Boolean(error)} />
      </div>
      <FieldError id={errorId} error={error} />
    </div>
  );
}
