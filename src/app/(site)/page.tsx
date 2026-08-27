import { val } from "../../../val.config";
import profileVal from "@/content/profile.val";
import projectsVal from "@/content/projects.val";
import settingsVal from "@/content/settings.val";
import { fetchVal } from "@/val/val.rsc";
import { getVisibleProjects, sortByDate, toProjectEntries } from "@/lib/projects";
import { rawEntry, toCardModel } from "@/lib/project-view";
import { Hero } from "@/components/site/hero";
import { FeaturedProjects } from "@/components/site/featured-projects";
import { AboutTeaser } from "@/components/site/about-teaser";
import { ContactSection } from "@/components/site/contact-section";

export default async function HomePage() {
  const [profile, projects, settings] = await Promise.all([
    fetchVal(profileVal),
    fetchVal(projectsVal),
    fetchVal(settingsVal),
  ]);

  const featured = sortByDate(
    getVisibleProjects(toProjectEntries(projects).map(rawEntry), false),
  )
    .filter((project) => project.featured)
    .map(toCardModel);

  const socials = settings.socials.map((social) => ({
    label: val.raw(social.label),
    url: val.raw(social.url),
  }));

  return (
    <>
      <Hero
        name={val.raw(profile.name)}
        tagline={val.raw(profile.tagline)}
        socials={socials}
      />
      <FeaturedProjects projects={featured} />
      <AboutTeaser intro={profile.intro} />
      <div className="pt-section">
        <ContactSection />
      </div>
    </>
  );
}
