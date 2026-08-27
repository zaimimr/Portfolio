import { c, s, type t } from "../../val.config";

export const schema = s.object({
  role: s.string().describe("Short role line shown under the name in the hero"),
  heroLine: s
    .string()
    .describe("One sentence in the hero, under the role line"),
  heroNote: s
    .string()
    .describe("Hand-written note in the hero, next to the scroll cue"),
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
});

export type Profile = t.inferSchema<typeof schema>;

export default c.define("/src/content/profile.val.ts", schema, {
  role: "Developer",
  heroLine:
    "I build websites, apps and games, from member platforms used by thousands of students to experiments nobody asked for.",
  heroNote: "more terrain below",
  intro: [
    {
      tag: "p",
      children: [
        "My work spans websites, apps and games, from student association platforms to smaller independent projects.",
      ],
    },
    {
      tag: "p",
      children: [
        "The projects here cover professional work, freelance projects and personal experiments.",
      ],
    },
  ],
});
