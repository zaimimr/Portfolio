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
import { Card } from "@/components/ui/card";
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
    <div className="px-gutter pb-section mx-auto w-full max-w-6xl pt-10 md:pt-16">
      <header className="max-w-3xl">
        <h1 className="font-display text-h1 text-ink font-bold">
          About <Highlight>me</Highlight>
        </h1>
        <div className="mt-6">
          <Prose content={profile.intro} />
        </div>
      </header>

      <section aria-labelledby="experience-heading" className="mt-section">
        <h2
          id="experience-heading"
          className="font-display text-h2 text-ink mb-10 font-bold"
        >
          Experience
        </h2>
        <Timeline entries={experience} />
      </section>

      <section aria-labelledby="education-heading" className="mt-section">
        <h2
          id="education-heading"
          className="font-display text-h2 text-ink mb-10 font-bold"
        >
          Education
        </h2>
        <Timeline entries={education} />
      </section>

      <section aria-labelledby="skills-heading" className="mt-section">
        <h2
          id="skills-heading"
          className="font-display text-h2 text-ink mb-6 font-bold"
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

      <section aria-labelledby="awards-heading" className="mt-section">
        <h2
          id="awards-heading"
          className="font-display text-h2 text-ink mb-10 font-bold"
        >
          Awards
        </h2>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cv.awards.map((award, index) => (
            <li key={val.raw(award.title)}>
              <Card index={index} className="flex h-full flex-col gap-2">
                <p className="text-mono-sm text-ink-muted font-mono tracking-wider uppercase">
                  {award.year}
                </p>
                <h3 className="font-display text-h3 text-ink font-bold">
                  {award.title}
                </h3>
                <p className="text-mono-sm text-accent-strong font-mono">
                  {award.org}
                </p>
                <p className="text-body text-ink-muted">{award.detail}</p>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="talks-heading" className="mt-section">
        <h2
          id="talks-heading"
          className="font-display text-h2 text-ink mb-10 font-bold"
        >
          Talks
        </h2>
        <ul className="flex flex-col gap-6">
          {cv.talks.map((talk, index) => (
            <li key={val.raw(talk.title)}>
              <Card index={index} className="flex flex-col gap-2">
                <p className="text-mono-sm text-ink-muted font-mono tracking-wider uppercase">
                  {talk.year} · {talk.venue}
                </p>
                <h3 className="font-display text-h3 text-ink font-bold">
                  {talk.title}
                </h3>
                <p className="text-body text-ink-muted max-w-3xl">
                  {talk.description}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="certifications-heading" className="mt-section">
        <h2
          id="certifications-heading"
          className="font-display text-h2 text-ink mb-6 font-bold"
        >
          Certifications
        </h2>
        <ul className="flex flex-col gap-3">
          {cv.certifications.map((certification) => (
            <li
              key={val.raw(certification.title)}
              className="flex flex-wrap items-baseline gap-x-3 gap-y-1"
            >
              <span className="text-mono-sm text-ink-muted font-mono">
                {certification.year}
              </span>
              <span className="font-display text-ink font-semibold">
                {certification.title}
              </span>
              <span className="text-mono-sm text-accent-strong font-mono">
                {certification.org}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Download CV" className="mt-section">
        <Divider className="mb-10" />
        <div className="rounded-wobble-1 border-line bg-surface shadow-offset flex flex-col items-start gap-6 border-2 p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div className="flex flex-col gap-2">
            <p className="font-display text-h3 text-ink font-bold">
              Prefer the paper version?
            </p>
            <p className="text-body text-ink-muted">
              The whole story, neatly typeset on two pages.
            </p>
          </div>
          <Button
            variant="accent"
            size="lg"
            asChild
            className="h-auto min-h-13 flex-wrap py-2.5"
          >
            <a href={pdfUrl} download>
              <SketchIcon name="download" size={20} />
              <span className="whitespace-nowrap">Download CV</span>
              <span className="text-mono-sm font-mono font-normal whitespace-nowrap">
                {pdfSize ? `PDF · ${pdfSize}` : "PDF"}
              </span>
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
