import { c, s, type t } from "../../val.config";

const entrySchema = s.object({
  title: s.string().describe("Role or degree"),
  org: s.string().describe("Company, association or school"),
  from: s.date().describe("Start date"),
  to: s.date().nullable().describe("End date, empty means ongoing"),
  description: s.string().describe("One or two sentences about the entry"),
});

const awardSchema = s.object({
  title: s.string().describe("Name of the award"),
  org: s.string().describe("Who gave it"),
  year: s.string().describe("Year it was received"),
  detail: s.string().describe("What it was for"),
});

const talkSchema = s.object({
  title: s.string().describe("Talk or workshop title"),
  venue: s.string().describe("Where it was given"),
  year: s.string().describe("Year it was given"),
  description: s.string().describe("What the talk covers"),
});

const certificationSchema = s.object({
  title: s.string().describe("Certification name"),
  org: s.string().describe("Issuing body"),
  year: s.string().describe("Year it was issued"),
});

export const schema = s.object({
  pdfUrl: s.string().describe("Path to the downloadable CV PDF"),
  experience: s.array(entrySchema).describe("Work experience, newest first"),
  education: s.array(entrySchema).describe("Education, newest first"),
  skills: s.array(s.string()).describe("Skills shown as tags"),
  awards: s.array(awardSchema).describe("Awards and honours, newest first"),
  talks: s.array(talkSchema).describe("Talks and workshops, newest first"),
  certifications: s
    .array(certificationSchema)
    .describe("Certifications, newest first"),
});

export type Cv = t.inferSchema<typeof schema>;
export type CvEntry = t.inferSchema<typeof entrySchema>;
export type CvAward = t.inferSchema<typeof awardSchema>;
export type CvTalk = t.inferSchema<typeof talkSchema>;
export type CvCertification = t.inferSchema<typeof certificationSchema>;

export default c.define("/src/content/cv.val.ts", schema, {
  pdfUrl: "/cv/zaim-cv.pdf",
  experience: [
    {
      title: "Technologist",
      org: "Blank",
      from: "2023-08-01",
      to: null,
      description:
        "Consultant building whole systems for clients, most recently the integration platform behind BI Norwegian Business School's move to SAP, and before that two years owning the data platform and operations tooling at Aneo Mobility.",
    },
    {
      title: "Developer, part time",
      org: "Blank",
      from: "2021-01-01",
      to: "2023-08-01",
      description:
        "Worked alongside my studies at NTNU, mainly on Trak, an onboarding and personnel follow-up product that started as an internal tool and was generalised for other customers.",
    },
    {
      title: "Summer intern",
      org: "Bekk",
      from: "2022-06-01",
      to: "2022-08-01",
      description:
        "Built 4 Key Metric for Møller Mobility Group, implementing Google's four key metrics inside Møller's Azure estate. It is still in active use.",
    },
    {
      title: "Summer intern",
      org: "Bekk",
      from: "2021-06-01",
      to: "2021-08-01",
      description:
        "Built the moderation platform for Klimabrølet, including automatic filtering of uploaded videos with Azure Image Recognition at 60 percent lower cost.",
    },
    {
      title: "Summer intern",
      org: "Knowit Objectnet",
      from: "2020-06-01",
      to: "2020-08-01",
      description:
        "Frontend developer in Entur's Team Betjent, working on the internal portal staff use to sell, change and refund tickets.",
    },
    {
      title: "Teaching assistant",
      org: "NTNU",
      from: "2019-08-01",
      to: "2020-12-01",
      description:
        "Taught and mentored students in programming courses, which is also where Snittet started, because the students I mentored asked for the grade calculator I had built for myself.",
    },
  ],
  education: [
    {
      title: "MSc, Computer Science",
      org: "Norwegian University of Science and Technology (NTNU)",
      from: "2021-08-01",
      to: "2023-06-30",
      description:
        "Master's degree in computer science, with a thesis written in 2023.",
    },
    {
      title: "BEng, Computer Engineering",
      org: "Norwegian University of Science and Technology (NTNU)",
      from: "2018-08-01",
      to: "2021-06-30",
      description:
        "Bachelor's degree in computer engineering. The bachelor thesis in 2021 became Trak, which turned into a product and a part-time job.",
    },
  ],
  skills: [
    "TypeScript",
    "C#",
    ".NET",
    "Python",
    "Kotlin",
    "React",
    "Next.js",
    "Node.js",
    "React Native",
    "Vue.js",
    "Kafka",
    "Azure",
    "PostgreSQL",
    "ClickHouse",
    "MongoDB",
    "Supabase",
    "Docker",
    "Pulumi",
    "Event-driven architecture",
    "Data platform architecture",
    "Agentic development",
    "MCP",
  ],
  awards: [
    {
      title: "Visueltprisen, Gold",
      org: "Grafill",
      year: "2024",
      detail:
        "Installations and Games, for the browser game B-Boy Infinite. I was one of four frontend developers on it.",
    },
    {
      title: "Best first-year team",
      org: "IDI Open",
      year: "2019",
      detail: "Competitive programming contest at NTNU.",
    },
  ],
  talks: [
    {
      title: "Set up your environment to work better with AI",
      venue: "BI Norwegian Business School",
      year: "2026",
      description:
        "Most of us have tried AI tools for coding, and just as many have hit the same frustrations: the model forgets everything between sessions, does not know our systems, and gives generic answers that do not fit the stack we actually work in. This is the setup I built to solve exactly that, with real examples from BISAP. You leave with three concrete things you can set up the same day.",
    },
    {
      title: "Stop prompting. Start onboarding.",
      venue: "Workshop",
      year: "2026",
      description:
        "Using coding AI as a smarter chatbot leads to long prompts, a lot of correcting and unpredictable quality. This workshop shows how to onboard AI as a developer on the team instead, with AGENTS.md, subagents and standardised slash commands. Demonstrated with Claude Code, but the patterns work with any assistant.",
    },
    {
      title: "Development speed at Aneo with AI",
      venue: "Aneo",
      year: "2025",
      description:
        "How we used AI and vibe coding to keep development speed high at Aneo.",
    },
  ],
  certifications: [
    {
      title: "Academy Accreditation, Databricks Fundamentals",
      org: "Databricks",
      year: "2025",
    },
    {
      title: "AZ-900, Microsoft Azure Fundamentals",
      org: "Microsoft",
      year: "2023",
    },
  ],
});
