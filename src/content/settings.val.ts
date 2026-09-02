import { c, s, type t } from "../../val.config";

export const schema = s.object({
  siteTitle: s.string(),
  seoDescription: s.string(),
  email: s.string(),
  socials: s.array(
    s.object({
      label: s.string(),
      url: s.string(),
    }),
  ),
});

export type Settings = t.inferSchema<typeof schema>;

export default c.define("/src/content/settings.val.ts", schema, {
  siteTitle: "Zaim Imran",
  seoDescription:
    "Zaim Imran is a developer and consultant in Oslo, Norway. He builds event-driven platforms, real-time data infrastructure and the internal tools teams use every day, and takes on selected freelance and contract work.",
  email: "work@zaim.no",
  socials: [
    { label: "GitHub", url: "https://github.com/zaimimr" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/zaim/" },
  ],
});
