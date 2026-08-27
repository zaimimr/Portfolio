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
    "Zaim Imran builds event-driven platforms, data infrastructure and the tools on top of them. Selected work, apps and experiments.",
  email: "work@zaim.no",
  socials: [
    { label: "GitHub", url: "https://github.com/zaimimr" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/zaim/" },
  ],
});
