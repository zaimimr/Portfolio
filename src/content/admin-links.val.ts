import { c, s, type t } from "../../val.config";

export const schema = s.array(
  s.object({
    label: s.string(),
    description: s.string(),
    url: s.string(),
    adminUrl: s.string().nullable(),
    accent: s.string().nullable(),
  }),
);

export type AdminLink = t.inferSchema<typeof schema>[number];

export default c.define("/src/content/admin-links.val.ts", schema, [
  {
    label: "zaim.no",
    description: "This site, in production.",
    url: "https://zaim.no",
    adminUrl: null,
    accent: "#f4de5d",
  },
  {
    label: "Vercel",
    description: "Deployments, domains and project settings.",
    url: "https://vercel.com/dashboard",
    adminUrl: null,
    accent: null,
  },
]);
