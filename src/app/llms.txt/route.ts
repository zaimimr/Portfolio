import { val } from "../../../val.config";
import cvVal from "@/content/cv.val";
import playgroundVal from "@/content/playground.val";
import projectsVal from "@/content/projects.val";
import { fetchVal } from "@/val/val.rsc";
import {
  getVisibleProjects,
  sortByDate,
  toProjectEntries,
} from "@/lib/projects";
import { rawEntry } from "@/lib/project-view";
import { categoryLabels, typeLabels } from "@/lib/labels";
import { absoluteUrl, email, siteName, socialProfiles } from "@/lib/site";

export const dynamic = "force-static";

function formatYear(date: string): string {
  return date.slice(0, 4);
}

export async function GET(): Promise<Response> {
  const [projects, playground, cv] = await Promise.all([
    fetchVal(projectsVal),
    fetchVal(playgroundVal),
    fetchVal(cvVal),
  ]);

  const visible = sortByDate(
    getVisibleProjects(toProjectEntries(projects).map(rawEntry), false),
  );

  const experience = cv.experience.map((entry) => {
    const from = formatYear(val.raw(entry.from));
    const to = val.raw(entry.to);
    return `- **${val.raw(entry.title)}, ${val.raw(entry.org)}** (${from}–${to ? formatYear(to) : "present"}): ${val.raw(entry.description)}`;
  });

  const education = cv.education.map(
    (entry) =>
      `- **${val.raw(entry.title)}**, ${val.raw(entry.org)} (${formatYear(val.raw(entry.from))}–${formatYear(val.raw(entry.to) ?? val.raw(entry.from))})`,
  );

  const awards = cv.awards.map(
    (award) =>
      `- **${val.raw(award.title)}**, ${val.raw(award.org)}, ${val.raw(award.year)}: ${val.raw(award.detail)}`,
  );

  const talks = cv.talks.map(
    (talk) =>
      `- **${val.raw(talk.title)}**, ${val.raw(talk.venue)}, ${val.raw(talk.year)}`,
  );

  const skills = cv.skills.map((skill) => val.raw(skill)).join(", ");

  const projectLines = visible.map((project) => {
    const url = absoluteUrl(`/projects/${project.slug}`);
    const tech = project.tech.map((item) => val.raw(item)).join(", ");
    const category = categoryLabels[project.category];
    const type = typeLabels[project.type];
    return `- [${val.raw(project.title)}](${url}): ${val.raw(project.description)} (${category}, ${type}, ${formatYear(project.date)}. Stack: ${tech})`;
  });

  const playgroundLines = Object.values(playground).map(
    (experiment) =>
      `- [${val.raw(experiment.title)}](${val.raw(experiment.href)}): ${val.raw(experiment.description)}`,
  );

  const body = `# ${siteName}

> ${siteName} is a developer and technology consultant based in Oslo, Norway. He builds event-driven platforms, real-time data infrastructure and the internal tools teams use every day, and is open to selected freelance and contract work alongside his role at Blank.

## Who he is

- **Name**: ${siteName}
- **Location**: Oslo, Norway. Works on site in the Oslo region and remotely.
- **Current role**: Technologist at Blank, a consultancy in Oslo.
- **Availability**: open to selected freelance and contract work, and to talks and workshops.
- **Contact**: ${email}
- **Website**: ${absoluteUrl("/")}
- **Languages**: English, Norwegian.
- **Elsewhere**: ${socialProfiles.join(", ")}

## What he does

He works across the whole system rather than one layer of it: event-driven backends, the data platforms behind them, integrations between systems that disagree with each other, and the web and mobile products on top. He also works on how AI fits into real development work, and teaches it.

**Stack and skills**: ${skills}

## Experience

${experience.join("\n")}

## Education

${education.join("\n")}

## Awards

${awards.join("\n")}

## Talks and workshops

${talks.join("\n")}

## Projects

${projectLines.join("\n")}

## Playground

${playgroundLines.join("\n")}

## Pages

- [Home](${absoluteUrl("/")}): overview and featured work.
- [Projects](${absoluteUrl("/projects")}): every public project, filterable by category and type.
- [About](${absoluteUrl("/about")}): experience, education, skills, awards and talks.
- [Playground](${absoluteUrl("/playground")}): experiments and smaller tools.
- [Contact](${absoluteUrl("/contact")}): contact form and email.
- [CV](${absoluteUrl(val.raw(cv.pdfUrl))}): downloadable PDF.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control":
        "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
