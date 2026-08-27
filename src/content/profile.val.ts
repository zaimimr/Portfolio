import { c, s, type t } from "../../val.config";

export const schema = s.object({
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
