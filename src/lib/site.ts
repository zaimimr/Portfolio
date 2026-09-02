export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://zaim.no";

export const siteName = "Zaim Imran";

export const siteTagline =
  "Developer in Oslo building event-driven platforms, data infrastructure and the tools on top of them";

export const siteDescription =
  "Zaim Imran is a developer and consultant in Oslo, Norway. He builds event-driven platforms, real-time data infrastructure and the internal tools teams use every day, and takes on selected freelance and contract work.";

export const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Zaim Imran, developer in Oslo",
} as const;

export const jobTitle = "Developer and technology consultant";

export const employer = "Blank";

export const location = {
  city: "Oslo",
  region: "Oslo",
  country: "Norway",
  countryCode: "NO",
} as const;

export const email = "work@zaim.no";

export const socialProfiles = [
  "https://github.com/zaimimr",
  "https://www.linkedin.com/in/zaim/",
];

export const knowsAbout = [
  "Software development",
  "Event-driven architecture",
  "Data platform architecture",
  "Real-time data infrastructure",
  "TypeScript",
  "React",
  "Next.js",
  "C#",
  ".NET",
  "Python",
  "Kotlin",
  "React Native",
  "Apache Kafka",
  "Microsoft Azure",
  "PostgreSQL",
  "ClickHouse",
  "System integration",
  "SAP integration",
  "AI-assisted development",
  "Model Context Protocol",
];

export const searchKeywords = [
  "Zaim Imran",
  "Zaim",
  "freelance developer Oslo",
  "freelance developer Norway",
  "hire a developer Oslo",
  "software consultant Oslo",
  "fullstack developer Oslo",
  "event-driven architecture consultant",
  "data platform developer Norway",
  "React developer Oslo",
  "Next.js developer Norway",
  "TypeScript developer Oslo",
  "app developer Norway",
];

export function absoluteUrl(path = "/"): string {
  return new URL(path, `${siteUrl}/`).toString();
}
