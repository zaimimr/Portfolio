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

export default async function HomePage() {
  const projects = await fetchVal(projectsVal);

  const featured = sortByDate(
    getVisibleProjects(toProjectEntries(projects).map(rawEntry), false),
  )
    .filter((project) => project.featured)
    .map(toCardModel);

  return (
    <>
      <PortfolioHero />
      <FeaturedProjects projects={featured} />
      <div className="pt-section">
        <ContactSection />
      </div>
    </>
  );
}
