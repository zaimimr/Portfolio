import { c, s, type t } from "../../val.config";

const linkSchema = s.union(
  "kind",
  s.object({
    kind: s.literal("github"),
    url: s.string().describe("Link to the GitHub repository"),
  }),
  s.object({
    kind: s.literal("web"),
    url: s.string().describe("Link to the live site"),
  }),
  s.object({
    kind: s.literal("store"),
    url: s.string().describe("Link to an app store listing"),
  }),
);

const projectSchema = s.object({
  title: s
    .string()
    .describe("Project name shown in lists and on the project page"),
  description: s.string().describe("One-liner shown on project cards"),
  body: s
    .richtext({
      style: {
        bold: true,
        italic: true,
      },
      block: {
        h2: true,
        h3: true,
        ul: true,
        ol: true,
      },
      inline: {
        a: true,
        img: true,
      },
    })
    .describe("Full project story shown on the project page"),
  category: s
    .union(s.literal("work"), s.literal("freelance"), s.literal("hobby"))
    .describe("Who the project was for"),
  type: s
    .union(
      s.literal("website"),
      s.literal("app"),
      s.literal("game"),
      s.literal("non-technical"),
    )
    .describe("What kind of thing the project is"),
  tech: s.array(s.string()).describe("Technologies used, shown as tags"),
  links: s.array(linkSchema).describe("Where to see the project"),
  images: s
    .array(s.image())
    .describe("Screenshots or artwork, first image is the cover"),
  date: s.date().describe("When the project shipped or was last active"),
  featured: s.boolean().describe("Featured projects appear on the front page"),
  hidden: s.boolean().describe("Hidden projects are only visible to the admin"),
});

export const schema = s.record(projectSchema.describe("Project")).render({
  as: "list",
  select: ({ val }) => ({
    title: val.title,
    subtitle: val.description,
    image: val.images[0] ?? null,
  }),
});

export type Project = t.inferSchema<typeof projectSchema>;
export type Projects = t.inferSchema<typeof schema>;

export default c.define("/src/content/projects.val.ts", schema, {
  tihlde: {
    title: "TIHLDE",
    description:
      "Member platform and event system for the TIHLDE student association.",
    body: [
      {
        tag: "p",
        children: [
          "Tech lead for TIHLDE's webpage and member system, a platform members use daily at uni, at home and at a party.",
        ],
      },
      {
        tag: "p",
        children: [
          "I built the entire events system, helping the association organize and promote events and business presentations to its members.",
        ],
      },
      {
        tag: "p",
        children: [
          "The stack pairs a React frontend with a Django REST backend on MySQL, maintained by a volunteer team I led.",
        ],
      },
    ],
    category: "work",
    type: "website",
    tech: ["React", "Django REST", "MySQL", "JavaScript", "CSS"],
    links: [{ kind: "web", url: "https://tihlde.org/" }],
    images: [],
    date: "2021-06-01",
    featured: true,
    hidden: false,
  },
  "ntnui-sprint": {
    title: "NTNUI Sprint",
    description: "Member administration portal for NTNUI's 12,000 members.",
    body: [
      {
        tag: "p",
        children: [
          "Frontend developer on the member system serving NTNUI's 12,000 members across Norway's largest sports association.",
        ],
      },
      {
        tag: "p",
        children: [
          "I developed the portal that lets admins and coaches view and administrate their members, built with Vue and TypeScript.",
        ],
      },
    ],
    category: "work",
    type: "website",
    tech: ["Vue.js", "TypeScript", "SASS"],
    links: [{ kind: "web", url: "https://medlem.ntnui.no/" }],
    images: [],
    date: "2021-03-01",
    featured: true,
    hidden: false,
  },
  "zaims-constant": {
    title: "Zaim's Constant",
    description: "A calculator for tracking team fines in NTNUI Sprint.",
    body: [
      {
        tag: "p",
        children: [
          "A small calculator that tracks team fines in NTNUI Sprint.",
        ],
      },
      {
        tag: "p",
        children: [
          "It started as a team joke and became a shared tool, built with React and Material-UI and designed in Adobe XD.",
        ],
      },
    ],
    category: "hobby",
    type: "website",
    tech: ["React", "Material-UI", "Adobe XD"],
    links: [
      { kind: "github", url: "https://github.com/Zenjjim/Zaims-constant" },
      { kind: "web", url: "https://zenjjim.github.io/Zaims-constant/" },
    ],
    images: [],
    date: "2020-10-01",
    featured: false,
    hidden: false,
  },
  portfolio: {
    title: "Portfolio",
    description: "This site, designed and built from scratch.",
    body: [
      {
        tag: "p",
        children: [
          "I designed and developed my portfolio from the bottom up, drawing inspiration from my resume and editorial design found online.",
        ],
      },
      {
        tag: "p",
        children: [
          "The design took shape in Adobe Illustrator and XD before any code was written, and React was chosen over plain HTML and jQuery for future expandability.",
        ],
      },
      {
        tag: "p",
        children: [
          "It has since been rebuilt several times, each version a snapshot of what I enjoy building at the time.",
        ],
      },
    ],
    category: "hobby",
    type: "website",
    tech: ["React", "JavaScript", "SASS", "Adobe XD"],
    links: [
      { kind: "github", url: "https://github.com/Zenjjim/Portfolio" },
      { kind: "web", url: "https://zaim.no/" },
    ],
    images: [],
    date: "2020-08-01",
    featured: false,
    hidden: false,
  },
  squiggle: {
    title: "Squiggle",
    description:
      "A JavaFX drawing game built as a second-semester school project.",
    body: [
      {
        tag: "p",
        children: [
          "A Java game developed as a school project in my second semester, with a GUI built in JavaFX.",
        ],
      },
      {
        tag: "p",
        children: [
          "I was Scrum master and responsible for the database layer, using Java connection pools against MySQL.",
        ],
      },
      {
        tag: "p",
        children: [
          "The team also produced extensive documentation, from ER diagrams to vision documents.",
        ],
      },
    ],
    category: "hobby",
    type: "game",
    tech: ["Java", "JavaFX", "MySQL", "Scrum"],
    links: [{ kind: "github", url: "https://github.com/Zenjjim/Squiggle" }],
    images: [],
    date: "2019-05-01",
    featured: false,
    hidden: false,
  },
  "secret-lab": {
    title: "Secret Lab",
    description: "A placeholder project used to test the hidden flow.",
    body: [
      {
        tag: "p",
        children: [
          "This is a sample hidden project. It should only be visible when logged in as admin.",
        ],
      },
      {
        tag: "p",
        children: [
          "Replace or delete this entry in the studio once the hidden flow is verified.",
        ],
      },
    ],
    category: "hobby",
    type: "app",
    tech: ["TypeScript"],
    links: [],
    images: [],
    date: "2026-08-01",
    featured: false,
    hidden: true,
  },
});
