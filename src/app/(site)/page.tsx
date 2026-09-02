import type { Metadata } from "next";
import projectsVal from "@/content/projects.val";
import { fetchVal } from "@/val/val.rsc";
import {
  getVisibleProjects,
  sortByDate,
  toProjectEntries,
} from "@/lib/projects";
import { rawEntry, toCardModel } from "@/lib/project-view";
import { PortfolioHero } from "@/components/site/portfolio-hero";
import { FeaturedProjects } from "@/components/site/featured-projects";
import { ContactSection } from "@/components/site/contact-section";
import { TerrainScene } from "@/components/site/terrain/terrain-scene";
import { ogImage, siteDescription, siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: `${siteName}, developer in Oslo`,
  },
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: `${siteName}, developer in Oslo`,
    description: siteDescription,
    images: [ogImage],
  },
};

export default async function HomePage() {
  const projects = await fetchVal(projectsVal);

  const featured = sortByDate(
    getVisibleProjects(toProjectEntries(projects).map(rawEntry), false),
  )
    .filter((project) => project.featured)
    .map(toCardModel);

  return (
    <>
      <TerrainScene />
      <div className="relative z-10">
        <PortfolioHero />
        <FeaturedProjects projects={featured} />
        <div className="pt-section">
          <ContactSection />
        </div>
      </div>
    </>
  );
}
