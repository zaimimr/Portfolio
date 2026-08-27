import { stat } from "node:fs/promises";
import { join } from "node:path";
import type { Metadata } from "next";
import { val } from "../../../../val.config";
import cvVal from "@/content/cv.val";
import profileVal from "@/content/profile.val";
import { fetchVal } from "@/val/val.rsc";
import type { CvEntry } from "@/content/cv.val";
import { Prose } from "@/components/content/rich-text";
import { Highlight } from "@/components/site/highlight";
import { Timeline } from "@/components/site/timeline";
import type { TimelineEntryModel } from "@/components/site/timeline";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { SketchIcon } from "@/components/ui/sketch-icon";
import { Tag } from "@/components/ui/tag";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who Zaim Imran is: developer in Norway, his experience, education and skills.",
};

const monthFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  year: "numeric",
});

function formatPeriod(from: string, to: string | null): string {
  const start = monthFormatter.format(new Date(from));
  const end = to ? monthFormatter.format(new Date(to)) : "now";
  return `${start} – ${end}`;
}

function toTimelineEntry(entry: CvEntry): TimelineEntryModel {
  return {
    title: val.raw(entry.title),
    org: val.raw(entry.org),
    period: formatPeriod(val.raw(entry.from), val.raw(entry.to)),
    description: val.raw(entry.description),
  };
}

async function readPdfSize(pdfUrl: string): Promise<string | null> {
  try {
    const { size } = await stat(join(process.cwd(), "public", pdfUrl));
    return `${(size / 1024 / 1024).toFixed(1)} MB`;
  } catch {
    return null;
  }
}

export default async function AboutPage() {
  const [profile, cv] = await Promise.all([
    fetchVal(profileVal),
    fetchVal(cvVal),
  ]);
  const pdfUrl = val.raw(cv.pdfUrl);
  const pdfSize = await readPdfSize(pdfUrl);
  const experience = cv.experience.map(toTimelineEntry);
  const education = cv.education.map(toTimelineEntry);

  return (
    <div className="mx-auto w-full max-w-6xl px-gutter pb-section pt-10 md:pt-16">
      <header className="max-w-3xl">
        <h1 className="font-display text-h1 font-bold text-ink">
          About <Highlight>me</Highlight>
        </h1>
        <div className="mt-6">
          <Prose content={profile.intro} />
        </div>
      </header>

      <section aria-labelledby="experience-heading" className="mt-section">
        <h2
          id="experience-heading"
          className="mb-10 font-display text-h2 font-bold text-ink"
        >
          Experience
        </h2>
        <Timeline entries={experience} />
      </section>

      <section aria-labelledby="education-heading" className="mt-section">
        <h2
          id="education-heading"
          className="mb-10 font-display text-h2 font-bold text-ink"
        >
          Education
        </h2>
        <Timeline entries={education} />
      </section>

      <section aria-labelledby="skills-heading" className="mt-section">
        <h2
          id="skills-heading"
          className="mb-6 font-display text-h2 font-bold text-ink"
        >
          Skills
        </h2>
        <ul className="flex max-w-2xl flex-wrap gap-2.5">
          {cv.skills.map((skill) => (
            <li key={val.raw(skill)}>
              <Tag className="px-3 py-1.5">{skill}</Tag>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Download CV" className="mt-section">
        <Divider className="mb-10" />
        <div className="flex flex-col items-start gap-6 rounded-wobble-1 border-2 border-line bg-surface p-8 shadow-offset md:flex-row md:items-center md:justify-between md:p-10">
          <div className="flex flex-col gap-2">
            <p className="font-display text-h3 font-bold text-ink">
              Prefer the paper version?
            </p>
            <p className="text-body text-ink-muted">
              The whole story, neatly typeset on two pages.
            </p>
          </div>
          <Button variant="accent" size="lg" asChild>
            <a href={pdfUrl} download>
              <SketchIcon name="download" size={20} />
              Download CV
              <span className="font-mono text-mono-sm font-normal">
                {pdfSize ? `PDF · ${pdfSize}` : "PDF"}
              </span>
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
