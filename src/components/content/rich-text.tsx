import { ValRichText, type RichText } from "@valbuild/next";
import type { AllRichTextOptions, RichTextOptions } from "@valbuild/core";
import { cn } from "@/lib/utils";

const themes = {
  default: {
    p: "",
    br: null,
    span: null,
    h1: "font-display text-h1 font-bold text-ink",
    h2: "mt-6 font-display text-h2 font-bold text-ink",
    h3: "mt-4 font-display text-h3 font-semibold text-ink",
    h4: "font-display font-semibold text-ink",
    h5: "font-display font-semibold text-ink",
    h6: "font-display font-semibold text-ink",
    a: "text-accent-strong underline decoration-2 underline-offset-4 hover:decoration-wavy",
    ul: "flex list-disc flex-col gap-2 pl-6 marker:text-accent-strong",
    ol: "flex list-decimal flex-col gap-2 pl-6 marker:font-mono marker:text-accent-strong",
    li: "pl-1",
    img: "my-4 w-full rounded-lg border-2 border-line",
    bold: "font-semibold text-ink",
    italic: "italic",
    lineThrough: "line-through",
  },
  accent: {
    p: "",
    br: null,
    span: null,
    h1: "font-display text-h1 font-bold text-accent-ink",
    h2: "mt-6 font-display text-h2 font-bold text-accent-ink",
    h3: "mt-4 font-display text-h3 font-semibold text-accent-ink",
    h4: "font-display font-semibold text-accent-ink",
    h5: "font-display font-semibold text-accent-ink",
    h6: "font-display font-semibold text-accent-ink",
    a: "text-accent-ink underline decoration-2 underline-offset-4 hover:decoration-wavy",
    ul: "flex list-disc flex-col gap-2 pl-6 marker:text-accent-ink",
    ol: "flex list-decimal flex-col gap-2 pl-6 marker:font-mono marker:text-accent-ink",
    li: "pl-1",
    img: "my-4 w-full rounded-lg border-2 border-line",
    bold: "font-semibold text-accent-ink",
    italic: "italic",
    lineThrough: "line-through",
  },
};

type ProseProps<O extends RichTextOptions> = {
  content: RichText<O>;
  onAccent?: boolean;
  className?: string;
};

export function Prose<O extends RichTextOptions>({
  content,
  onAccent = false,
  className,
}: ProseProps<O>) {
  return (
    <ValRichText<AllRichTextOptions>
      content={content as unknown as RichText<AllRichTextOptions>}
      theme={themes[onAccent ? "accent" : "default"]}
      className={cn(
        "flex max-w-[68ch] flex-col gap-5 text-body-lg",
        onAccent ? "text-accent-ink" : "text-ink/90",
        className,
      )}
    />
  );
}
