import {
  absoluteUrl,
  email,
  employer,
  jobTitle,
  knowsAbout,
  location,
  ogImage,
  siteDescription,
  siteName,
  siteUrl,
  socialProfiles,
} from "@/lib/site";

export const personId = absoluteUrl("/#person");
export const websiteId = absoluteUrl("/#website");

export function personSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: siteName,
    givenName: "Zaim",
    familyName: "Imran",
    url: siteUrl,
    email: `mailto:${email}`,
    image: absoluteUrl(ogImage.url),
    jobTitle,
    description: siteDescription,
    worksFor: {
      "@type": "Organization",
      name: employer,
      url: "https://www.blank.no",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Norwegian University of Science and Technology (NTNU)",
      url: "https://www.ntnu.edu",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: location.city,
      addressRegion: location.region,
      addressCountry: location.countryCode,
    },
    workLocation: {
      "@type": "Place",
      name: `${location.city}, ${location.country}`,
    },
    nationality: { "@type": "Country", name: location.country },
    knowsLanguage: [
      { "@type": "Language", name: "English", alternateName: "en" },
      { "@type": "Language", name: "Norwegian", alternateName: "no" },
    ],
    knowsAbout,
    seeks: {
      "@type": "Demand",
      name: "Freelance and contract software development",
      description:
        "Open to selected freelance and contract work on platform, data and product engineering.",
      areaServed: [
        { "@type": "Country", name: location.country },
        { "@type": "Place", name: "Remote" },
      ],
    },
    sameAs: socialProfiles,
  };
}

export function websiteSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: siteUrl,
    name: siteName,
    description: siteDescription,
    inLanguage: "en",
    publisher: { "@id": personId },
    about: { "@id": personId },
  };
}

export function professionalServiceSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": absoluteUrl("/#service"),
    name: `${siteName}, software development`,
    url: siteUrl,
    email: `mailto:${email}`,
    founder: { "@id": personId },
    description:
      "Freelance and contract software development: event-driven platforms, real-time data infrastructure, internal tooling, web and mobile apps.",
    areaServed: [
      { "@type": "Country", name: location.country },
      { "@type": "Place", name: "Remote" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: location.city,
      addressCountry: location.countryCode,
    },
    knowsAbout,
    sameAs: socialProfiles,
  };
}

type BreadcrumbItem = { name: string; path: string };

export function breadcrumbSchema(
  items: BreadcrumbItem[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

type ProjectSchemaInput = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tech: string[];
  type: string;
  images: string[];
  links: string[];
};

export function projectSchema(
  project: ProjectSchemaInput,
): Record<string, unknown> {
  const isApp = project.type === "app";
  const isGame = project.type === "game";

  return {
    "@context": "https://schema.org",
    "@type": isApp
      ? "SoftwareApplication"
      : isGame
        ? "VideoGame"
        : "CreativeWork",
    "@id": absoluteUrl(`/projects/${project.slug}#project`),
    name: project.title,
    headline: project.title,
    description: project.description,
    url: absoluteUrl(`/projects/${project.slug}`),
    dateCreated: project.date,
    datePublished: project.date,
    inLanguage: "en",
    author: { "@id": personId },
    creator: { "@id": personId },
    ...(project.images.length > 0 ? { image: project.images } : {}),
    ...(project.links.length > 0 ? { sameAs: project.links } : {}),
    ...(isApp || isGame
      ? { applicationCategory: isGame ? "GameApplication" : "Application" }
      : {}),
    keywords: project.tech.join(", "),
    isPartOf: { "@id": websiteId },
  };
}

export function projectListSchema(
  projects: { slug: string; title: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": absoluteUrl("/projects#list"),
    name: `Projects by ${siteName}`,
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.title,
      url: absoluteUrl(`/projects/${project.slug}`),
    })),
  };
}
