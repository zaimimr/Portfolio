import { c, s, type t } from "../../val.config";

const experimentSchema = s.object({
  title: s.string().describe("Name of the experiment"),
  description: s.string().describe("One-liner shown on the card"),
  href: s.string().describe("Where the experiment lives, internal route or external URL"),
  image: s.image().nullable().describe("Optional preview image"),
  date: s.date().describe("When the experiment was made"),
  tags: s.array(s.string()).describe("Freeform tags"),
});

export const schema = s
  .record(experimentSchema.describe("Experiment"))
  .render({
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
  "zaims-constant": {
    title: "Zaim's Constant",
    description: "The original cake-debt calculator, still crunching fines.",
    href: "https://zenjjim.github.io/Zaims-constant/",
    image: null,
    date: "2020-10-01",
    tags: ["calculator", "cake", "react"],
  },
});
