import { Highlight } from "@/components/site/highlight";
import { Divider } from "@/components/ui/divider";

export function PortfolioHero() {
  return (
    <section
      aria-labelledby="portfolio-heading"
      className="px-gutter mx-auto w-full max-w-6xl pt-10 md:pt-16"
    >
      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <h1
          id="portfolio-heading"
          className="font-display text-display text-ink font-bold tracking-[-0.03em] md:col-span-8"
        >
          <Highlight animate>Portfolio</Highlight>
        </h1>
        <p className="text-body-lg text-ink-muted max-w-lg md:col-span-4 md:pb-2">
          Websites, apps, games and experiments by Zaim Imran.
        </p>
      </div>
      <Divider className="mt-10 md:mt-14" />
    </section>
  );
}
