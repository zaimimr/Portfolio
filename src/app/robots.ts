import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

const privatePaths = ["/admin", "/val", "/api/", "/styleguide", "/sign-in"];

const publicPaths = ["/val/projects/"];

const answerEngines = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Bingbot",
  "DuckAssistBot",
  "Amazonbot",
  "cohere-ai",
  "MistralAI-User",
  "meta-externalagent",
  "YouBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: ["/", ...publicPaths], disallow: privatePaths },
      ...answerEngines.map((userAgent) => ({
        userAgent,
        allow: ["/", ...publicPaths],
        disallow: privatePaths,
      })),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
