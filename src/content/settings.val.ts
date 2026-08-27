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
  availableForFreelance: s.boolean(),
});

export type Settings = t.inferSchema<typeof schema>;

export default c.define("/src/content/settings.val.ts", schema, {
  siteTitle: "Zaim Imran",
  seoDescription:
    "Developer in Norway building websites, apps and games. Work, freelance and hobby projects.",
  email: "zaim.imran@gmail.com",
  socials: [
    { label: "GitHub", url: "https://github.com/zaimimr" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/zaim/" },
  ],
  availableForFreelance: true,
});
