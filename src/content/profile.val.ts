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
        "I am a developer at Blank in Oslo, and I build whole systems rather than parts of them. Event-driven platforms, the data that flows through them, and the tools people actually open every morning to do their job.",
      ],
    },
    {
      tag: "p",
      children: [
        "Most of my work has been as a consultant. At Aneo Mobility I spent two years going from portal features to owning the real-time data platform the company now runs on, then the operations tool on top of it, then the algorithm that cut grid costs across their charging sites. At BI Norwegian Business School I am rebuilding the integrations behind a move to SAP, where the hard part is making systems with completely different ideas of what a person is agree with each other.",
      ],
    },
    {
      tag: "p",
      children: [
        "Alongside that I ship my own things. Two apps on the App Store, a site a Sunday school in Bærum runs on, a grade calculator Norwegian students still use years after I built it for myself. I also spend a lot of time on how AI fits into real development work, and I teach it: onboarding a model like a colleague rather than prompting it like a chatbot.",
      ],
    },
  ],
});
