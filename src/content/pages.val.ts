import { c, s, type t } from "../../val.config";

export const schema = s.object({
  projectsIntro: s
    .string()
    .describe("Paragraph under the Projects page heading"),
  playgroundIntro: s
    .string()
    .describe("Hand-written line under the Playground heading"),
  contactBlurb: s.string().describe("Paragraph in the contact section"),
});

export type PagesCopy = t.inferSchema<typeof schema>;

export default c.define("/src/content/pages.val.ts", schema, {
  projectsIntro: "A complete archive of work, freelance and hobby projects.",
  playgroundIntro: "Small experiments, tools and unfinished ideas.",
  contactBlurb:
    "For project enquiries or anything else, send a message or email me directly.",
});
