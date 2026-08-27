import { getAnalytics, type AnalyticsResult } from "@/lib/vercel-analytics";
import { StatTile } from "@/components/admin/stat-tile";

const numberFormat = new Intl.NumberFormat("en-US");

function RangeSection({
  title,
  result,
}: {
  title: string;
  result: AnalyticsResult;
}) {
  if (result.status === "unconfigured") {
    return null;
  }
  if (result.status === "error") {
    return (
      <section className="mt-8">
        <h2 className="font-mono text-sm font-semibold">{title}</h2>
        <p className="mt-2 rounded-md border border-line/15 bg-surface p-4 font-mono text-mono-sm text-danger">
          {result.message}
        </p>
      </section>
    );
  }
  const { summary } = result;
  const maxPageviews = Math.max(
    1,
    ...summary.topPages.map((page) => page.pageviews),
  );
  return (
    <section className="mt-8">
      <h2 className="font-mono text-sm font-semibold">{title}</h2>
      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatTile
          label="Pageviews"
          value={numberFormat.format(summary.pageviews)}
        />
        <StatTile
          label="Avg daily visitors"
          value={numberFormat.format(summary.avgDailyVisitors)}
        />
        <StatTile
          label="Days with traffic"
          value={String(summary.daily.filter((d) => d.pageviews > 0).length)}
          hint={`of ${summary.days}`}
        />
      </div>
      <div className="mt-4 rounded-md border border-line/15 bg-surface p-4">
        <h3 className="font-mono text-mono-sm text-ink-muted">Top pages</h3>
        {summary.topPages.length === 0 ? (
          <p className="mt-2 font-mono text-mono-sm text-ink-faint">
            No traffic recorded in this range.
          </p>
        ) : (
          <ul className="mt-2 flex flex-col gap-2">
            {summary.topPages.map((page) => (
              <li key={page.route} className="font-mono text-mono-sm">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="truncate">{page.route}</span>
                  <span className="shrink-0 text-ink-muted">
                    {numberFormat.format(page.pageviews)} views ·{" "}
                    {numberFormat.format(page.visitors)} visitors
                  </span>
                </div>
                <div className="mt-1 h-1 rounded-full bg-surface-raised">
                  <div
                    className="h-1 rounded-full bg-accent"
                    style={{
                      width: `${(page.pageviews / maxPageviews) * 100}%`,
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default async function AnalyticsPage() {
  const [week, month] = await Promise.all([getAnalytics(7), getAnalytics(30)]);
  const unconfigured =
    week.status === "unconfigured" && month.status === "unconfigured";
  return (
    <section>
      <h1 className="font-display text-h3 font-bold">Analytics</h1>
      <p className="mt-1 font-mono text-mono-sm text-ink-muted">
        Vercel Web Analytics, straight from the API.
      </p>
      {unconfigured ? (
        <div className="mt-6 rounded-md border border-line/15 bg-surface p-6">
          <p className="font-mono text-sm">Not connected yet.</p>
          <p className="mt-2 font-mono text-mono-sm text-ink-muted">
            Set VERCEL_API_TOKEN and VERCEL_PROJECT_ID (plus VERCEL_TEAM_ID for
            team projects) to light this page up.
          </p>
        </div>
      ) : (
        <>
          <RangeSection title="Last 7 days" result={week} />
          <RangeSection title="Last 30 days" result={month} />
        </>
      )}
    </section>
  );
}
