import { c, s, type t } from "../../val.config";

const entrySchema = s.object({
  title: s.string().describe("Role or degree"),
  org: s.string().describe("Company, association or school"),
  from: s.date().describe("Start date"),
  to: s.date().nullable().describe("End date, empty means ongoing"),
  description: s.string().describe("One or two sentences about the entry"),
});

export const schema = s.object({
  pdfUrl: s.string().describe("Path to the downloadable CV PDF"),
  experience: s.array(entrySchema).describe("Work experience, newest first"),
  education: s.array(entrySchema).describe("Education, newest first"),
  skills: s.array(s.string()).describe("Skills shown as tags"),
});

export type Cv = t.inferSchema<typeof schema>;
export type CvEntry = t.inferSchema<typeof entrySchema>;

export default c.define("/src/content/cv.val.ts", schema, {
  pdfUrl: "/cv/zaim-cv.pdf",
  experience: [
    {
      title: "Placeholder: current role",
      org: "Placeholder: edit in the studio",
      from: "2023-01-01",
      to: null,
      description:
        "Placeholder entry. Replace with your current position in the Val studio.",
    },
    {
      title: "Frontend Developer",
      org: "NTNUI Sprint",
      from: "2020-08-01",
      to: "2021-06-30",
      description:
        "Built the admin and coach portal for the member system serving NTNUI's 12,000 members.",
    },
    {
      title: "Tech Lead",
      org: "TIHLDE",
      from: "2019-08-01",
      to: "2021-06-30",
      description:
        "Led the volunteer team behind TIHLDE's webpage and member system, and built the events system.",
    },
  ],
  education: [
    {
      title: "Placeholder: degree",
      org: "NTNU",
      from: "2018-08-01",
      to: "2021-06-30",
      description:
        "Placeholder entry. Replace with the correct degree and dates in the Val studio.",
    },
  ],
  skills: [
    "TypeScript",
    "React",
    "Next.js",
    "Vue.js",
    "Java",
    "MySQL",
    "Django REST",
    "SASS",
    "Figma",
  ],
});
