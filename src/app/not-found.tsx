import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/layout/wordmark";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-gutter text-center">
      <Wordmark className="size-14 text-ink" />
      <h1 className="font-display text-h1 font-bold text-ink">
        Nothing drawn here
      </h1>
      <p className="max-w-md text-body-lg text-ink-muted">
        This page doesn&apos;t exist, or it&apos;s hiding really well.
      </p>
      <p aria-hidden="true" className="font-hand text-hand text-ink-muted">
        404, if you&apos;re keeping score
      </p>
      <Button variant="accent" asChild>
        <Link href="/">Back to the front page</Link>
      </Button>
    </main>
  );
}
