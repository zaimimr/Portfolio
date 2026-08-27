import Link from "next/link";
import type { RichText } from "@valbuild/next";
import type { RichTextOptions } from "@valbuild/core";
import { Prose } from "@/components/content/rich-text";

export function AboutTeaser<O extends RichTextOptions>({ intro }: { intro: RichText<O> }) {
  return (
    <section aria-labelledby="about-heading" className="bg-accent">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-gutter py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <h2
            id="about-heading"
            className="font-display text-h1 font-bold text-accent-ink"
          >
            Who&apos;s drawing all this?
          </h2>
        </div>
        <div className="flex flex-col items-start gap-7 md:col-span-7 md:col-start-6">
          <Prose content={intro} onAccent />
          <Link
            href="/about"
            className="inline-flex h-11 items-center justify-center rounded-md bg-accent-ink px-5 font-sans text-body font-semibold text-accent transition-transform duration-[var(--duration-fast)] ease-out hover:-translate-y-px active:translate-y-0.5 motion-reduce:transition-none"
          >
            More about me
          </Link>
        </div>
      </div>
    </section>
  );
}
