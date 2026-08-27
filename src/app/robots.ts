import type { MetadataRoute } from "next";
import { envOptional } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = envOptional("NEXT_PUBLIC_SITE_URL") ?? "https://zaim.no";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/val", "/styleguide", "/sign-in", "/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
