import "server-only";
import { z } from "zod";
import { envOptional, envRequired } from "@/lib/env";

const dailySchema = z.object({
  data: z.array(
    z.object({
      timestamp: z.string(),
      pageviews: z.number(),
      visitors: z.number(),
    }),
  ),
});

const topPagesSchema = z.object({
  data: z.array(
    z.object({
      route: z.string().nullish(),
      pageviews: z.number(),
      visitors: z.number(),
    }),
  ),
});

export type DailyPoint = z.infer<typeof dailySchema>["data"][number];

export type TopPage = {
  route: string;
  pageviews: number;
  visitors: number;
};

export type AnalyticsSummary = {
  days: number;
  pageviews: number;
  avgDailyVisitors: number;
  daily: DailyPoint[];
  topPages: TopPage[];
};

export type AnalyticsResult =
  | { status: "unconfigured" }
  | { status: "error"; message: string }
  | { status: "ok"; summary: AnalyticsSummary };

export function isAnalyticsConfigured(): boolean {
  return (
    envOptional("VERCEL_API_TOKEN") !== undefined &&
    envOptional("VERCEL_PROJECT_ID") !== undefined
  );
}

function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

async function queryVisitsAggregate(
  params: Record<string, string>,
): Promise<unknown> {
  const searchParams = new URLSearchParams({
    ...params,
    projectId: envRequired("VERCEL_PROJECT_ID"),
  });
  const teamId = envOptional("VERCEL_TEAM_ID");
  if (teamId !== undefined) {
    searchParams.set("teamId", teamId);
  }
  const response = await fetch(
    `https://api.vercel.com/v1/query/web-analytics/visits/aggregate?${searchParams.toString()}`,
    {
      headers: { Authorization: `Bearer ${envRequired("VERCEL_API_TOKEN")}` },
      next: { revalidate: 300 },
    },
  );
  if (!response.ok) {
    throw new Error(`Vercel Web Analytics responded with ${response.status}`);
  }
  return response.json();
}

function rangeParams(days: number): { since: string; until: string } {
  const until = new Date();
  const since = new Date(until.getTime() - days * 24 * 60 * 60 * 1000);
  return { since: isoDate(since), until: isoDate(until) };
}

async function getDailyTraffic(days: number): Promise<DailyPoint[]> {
  const json = await queryVisitsAggregate({ ...rangeParams(days), by: "day" });
  return dailySchema.parse(json).data;
}

async function getTopPages(days: number, limit: number): Promise<TopPage[]> {
  const json = await queryVisitsAggregate({
    ...rangeParams(days),
    by: "route",
    limit: String(limit),
  });
  return topPagesSchema.parse(json).data.map((row) => ({
    route: row.route ?? "unknown",
    pageviews: row.pageviews,
    visitors: row.visitors,
  }));
}

export async function getAnalytics(days: number): Promise<AnalyticsResult> {
  if (!isAnalyticsConfigured()) {
    return { status: "unconfigured" };
  }
  try {
    const [daily, topPages] = await Promise.all([
      getDailyTraffic(days),
      getTopPages(days, 8),
    ]);
    const pageviews = daily.reduce((sum, point) => sum + point.pageviews, 0);
    const visitorTotal = daily.reduce((sum, point) => sum + point.visitors, 0);
    const avgDailyVisitors =
      daily.length === 0 ? 0 : Math.round(visitorTotal / daily.length);
    return {
      status: "ok",
      summary: { days, pageviews, avgDailyVisitors, daily, topPages },
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
