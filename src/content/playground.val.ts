import { c, s, type t } from "../../val.config";

const experimentSchema = s.object({
  title: s.string().describe("Name of the experiment"),
  description: s.string().describe("One-liner shown on the card"),
  href: s
    .string()
    .describe("Where the experiment lives, internal route or external URL"),
  image: s.image().nullable().describe("Optional preview image"),
  date: s.date().describe("When the experiment was made"),
  tags: s.array(s.string()).describe("Freeform tags"),
});

export const schema = s.record(experimentSchema.describe("Experiment")).render({
  as: "list",
  select: ({ val }) => ({
    title: val.title,
    subtitle: val.description,
    image: val.image,
  }),
});

export type Experiment = t.inferSchema<typeof experimentSchema>;
export type Playground = t.inferSchema<typeof schema>;

export default c.define("/src/content/playground.val.ts", schema, {
  "ai-slides": {
    title: "AI Slides",
    description:
      "A talk deck built as a web app, on keeping code quality when AI joins the project.",
    href: "https://ai-slides-navy.vercel.app",
    image: c.image("/public/val/projects/ai-slides-1.webp", {
      width: 2000,
      height: 1250,
      mimeType: "image/webp",
    }),
    date: "2026-02-27",
    tags: ["slides", "ai", "next.js"],
  },
});
