import { c, s, type t } from "../../val.config";

export const schema = s.object({
  projectsIntro: s
    .string()
    .describe("Paragraph under the Projects page heading"),
  playgroundIntro: s
    .string()
    .describe("Hand-written line under the Playground heading"),
  contactBlurb: s.string().describe("Paragraph in the contact section"),
  freelanceBadge: s
    .string()
    .describe("Badge text shown when available for freelance"),
});

export type PagesCopy = t.inferSchema<typeof schema>;

export default c.define("/src/content/pages.val.ts", schema, {
  projectsIntro:
    "Everything I've built worth showing, from member platforms to cake-debt calculators.",
  playgroundIntro:
    "Experiments, toys and things that seemed like a good idea at 23:40.",
  contactBlurb:
    "Got a project, a question, or a very strong opinion about cake debt? My inbox is open.",
  freelanceBadge: "Currently open for freelance work",
});
