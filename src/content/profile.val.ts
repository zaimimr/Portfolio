import { c, s, type t } from "../../val.config";

export const schema = s.object({
  name: s.string().describe("Full name shown in the hero and metadata"),
  tagline: s.string().describe("Short line under the name"),
  intro: s
    .richtext({
      style: {
        bold: true,
        italic: true,
      },
      inline: {
        a: true,
      },
    })
    .describe("Introduction paragraph shown on the front page"),
  portrait: s.image().nullable().describe("Portrait photo, the drawn avatar is used when empty"),
  socials: s
    .array(
      s.object({
        label: s.string(),
        url: s.string(),
      }),
    )
    .describe("Social profiles shown in the footer and contact section"),
});

export type Profile = t.inferSchema<typeof schema>;

export default c.define("/src/content/profile.val.ts", schema, {
  name: "Zaim Imran",
  tagline: "Developer in Norway building websites, apps and games.",
  intro: [
    {
      tag: "p",
      children: [
        "I'm Zaim, a developer based in Norway. I build websites, apps and games, from student association platforms to cake-debt calculators.",
      ],
    },
    {
      tag: "p",
      children: [
        "This site is my workshop: my work, my experiments and the occasional easter egg.",
      ],
    },
  ],
  portrait: null,
  socials: [
    { label: "GitHub", url: "https://github.com/zaimimr" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/zaim/" },
  ],
});
