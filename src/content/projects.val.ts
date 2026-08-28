import { c, s, type t } from "../../val.config";

const linkSchema = s.union(
  "kind",
  s.object({
    kind: s.literal("github"),
    url: s.string().describe("Link to the GitHub repository"),
  }),
  s.object({
    kind: s.literal("web"),
    url: s.string().describe("Link to the live site"),
  }),
  s.object({
    kind: s.literal("store"),
    url: s.string().describe("Link to an app store listing"),
  }),
);

const projectSchema = s.object({
  title: s
    .string()
    .describe("Project name shown in lists and on the project page"),
  description: s.string().describe("One-liner shown on project cards"),
  body: s
    .richtext({
      style: {
        bold: true,
        italic: true,
      },
      block: {
        h2: true,
        h3: true,
        ul: true,
        ol: true,
      },
      inline: {
        a: true,
        img: true,
      },
    })
    .describe("Full project story shown on the project page"),
  category: s
    .union(s.literal("work"), s.literal("freelance"), s.literal("hobby"))
    .describe("Who the project was for"),
  type: s
    .union(
      s.literal("website"),
      s.literal("app"),
      s.literal("game"),
      s.literal("non-technical"),
    )
    .describe("What kind of thing the project is"),
  tech: s.array(s.string()).describe("Technologies used, shown as tags"),
  links: s.array(linkSchema).describe("Where to see the project"),
  images: s
    .array(s.image())
    .describe("Screenshots or artwork, first image is the cover"),
  date: s.date().describe("When the project shipped or was last active"),
  featured: s.boolean().describe("Featured projects appear on the front page"),
  hidden: s.boolean().describe("Hidden projects are only visible to the admin"),
});

export const schema = s.record(projectSchema.describe("Project")).render({
  as: "list",
  select: ({ val }) => ({
    title: val.title,
    subtitle: val.description,
    image: val.images[0] ?? null,
  }),
});

export type Project = t.inferSchema<typeof projectSchema>;
export type Projects = t.inferSchema<typeof schema>;

export default c.define("/src/content/projects.val.ts", schema, {
  "aneo-mobility": {
    title: "Aneo Mobility",
    description:
      "Two years building the data platform, operations tooling and grid optimisation behind a Norwegian EV charging operator.",
    body: [
      {
        tag: "p",
        children: [
          "Aneo Mobility runs large charging sites as a service, from the hardware in the ground to the customer app. Over two years I went from building features in their portal to owning the data platform the rest of the company now runs on.",
        ],
      },
      {
        tag: "h2",
        children: ["Atlas, the data platform"],
      },
      {
        tag: "p",
        children: [
          "Atlas is the central platform for collecting, processing and distributing real-time data. I designed the architecture and built the streaming application on Kafka and Redpanda, with services in both Node.js and .NET.",
        ],
      },
      {
        tag: "p",
        children: [
          "It orchestrates every dataflow between external vendors and internal systems: eMabler, Zaptec, Easee, Garo, Meraki, Com4, Elhub and Salesforce. Each one models the world differently, so a large part of the work was standardising complex and unstructured data into something the rest of the organisation could trust.",
        ],
      },
      {
        tag: "p",
        children: [
          "As demand for data grew internally, the project expanded into running the company data warehouse. We chose ClickHouse, which suits a smaller organisation while still holding up as a serious analysis tool, and I set up an MCP server against it so colleagues could pull their own answers with AI instead of filing a request.",
        ],
      },
      {
        tag: "h2",
        children: ["Pulse, the operations tool"],
      },
      {
        tag: "p",
        children: [
          "Pulse is the real-time system for monitoring the entire charging fleet. Operators watch sensor values from chargers across every vendor, plus network health from Meraki and Com4, in one place.",
        ],
      },
      {
        tag: "p",
        children: [
          "It sits on Atlas as a flexible filtering and rule engine that surfaces faults at charger, circuit and station level. I designed the dataflow end to end and built the Next.js frontend that gives the operations team alerts, status overviews, custom filters and full control of the portfolio. After launch it also became a sales and support tool for other parts of the company.",
        ],
      },
      {
        tag: "h2",
        children: ["kWatch, cutting grid costs"],
      },
      {
        tag: "p",
        children: [
          "kWatch reduces grid rent by optimising the power tier of each site without making charging worse for the customer. It reads Atlas as its data source and runs a custom load management algorithm that works out the lowest tier a site can safely operate on.",
        ],
      },
      {
        tag: "p",
        children: [
          "I was the only developer on it, which meant a hybrid role across data science, data engineering, analysis and development. I learned the power grid, tariff tiers, charging technology and charging behaviour in enough detail to understand what actually drives an optimal downgrade, then wrote the Python for collection, analysis and dynamic adjustment, including a bespoke algorithm that estimates realistic hourly demand for chargers that report irregularly or only sporadically.",
        ],
      },
      {
        tag: "p",
        children: [
          "The project worked. Several sites now run two to three power tiers lower than at the start, which is a real annual saving for Aneo.",
        ],
      },
      {
        tag: "h2",
        children: ["ChargeFlex, selling the flexibility back"],
      },
      {
        tag: "p",
        children: [
          "With kWatch proving that power could be controlled precisely, the obvious next step was to sell that control. ChargeFlex offers available capacity back to grid operators through the NODES marketplace.",
        ],
      },
      {
        tag: "p",
        children: [
          "The MaxUsage products were brand new in the regulation when we started, so much of the job was defining what participation even meant for charging infrastructure, and working directly with grid operators to establish workable, mutually useful terms. Technically it runs on .NET and Hangfire to handle, verify and monitor activations in real time, with PostgreSQL and ClickHouse behind it and infrastructure on Azure set up with Pulumi.",
        ],
      },
      {
        tag: "p",
        children: [
          "I also ran a pilot at Aneo Mobility on using AI in development work, setting the ground rules and building the agents, skills and processes for how work gets started and documented alongside a model.",
        ],
      },
    ],
    category: "work",
    type: "website",
    tech: [
      "Kafka",
      "Redpanda",
      ".NET",
      "Node.js",
      "Next.js",
      "TypeScript",
      "ClickHouse",
      "PostgreSQL",
      "Python",
      "Azure",
      "Pulumi",
      "Hangfire",
      "NestJS",
      "Blazor",
      "MCP",
    ],
    links: [{ kind: "web", url: "https://aneo.com/" }],
    images: [
      c.image("/public/val/projects/aneo-mobility-1.webp", {
        width: 2000,
        height: 1192,
        mimeType: "image/webp",
      }),
    ],
    date: "2025-12-01",
    featured: true,
    hidden: false,
  },
  bisap: {
    title: "BISAP",
    description:
      "Replacing BI Norwegian Business School's ageing ERP with an event-driven integration platform on Azure.",
    body: [
      {
        tag: "p",
        children: [
          "BISAP is BI Norwegian Business School's programme to replace the ageing Agresso ERP with SAP S/4HANA for finance and SAP SuccessFactors for HR. It means rebuilding every integration between BI's core systems: Banner for students, Salesforce for CRM, SAP, and internal services like TimeEdit and Entra ID.",
        ],
      },
      {
        tag: "p",
        children: [
          "At the centre sits an event-driven microservice platform on Azure. A shared Person service collects identity data from every source system and distributes updates to downstream consumers over Azure Service Bus. The integration layers follow a Capability and Facade pattern: Capabilities are Azure Functions that consume messages, persist locally and forward to Facades, which are REST APIs translating requests into SAP-specific calls over OData, OAuth and SAML.",
        ],
      },
      {
        tag: "p",
        children: [
          "Most of the work has been establishing robust, event-driven dataflows for person and employee data across systems with very different data models and ID structures.",
        ],
      },
      {
        tag: "h2",
        children: ["As fullstack developer"],
      },
      {
        tag: "ul",
        children: [
          {
            tag: "li",
            children: [
              {
                tag: "p",
                children: [
                  "Built the event engine in the Person service that publishes employee, lecturer and student events to downstream systems including BI.no, TimeEdit and Entra ID",
                ],
              },
            ],
          },
          {
            tag: "li",
            children: [
              {
                tag: "p",
                children: [
                  "Designed and implemented a third-party API response structure, Slim, Default and Extended, with granular authorisation roles and database-level privacy filtering so protected personal data never reaches an unauthorised consumer",
                ],
              },
            ],
          },
          {
            tag: "li",
            children: [
              {
                tag: "p",
                children: [
                  "Implemented message reliability across the whole integration chain: error classification, dead-letter handling, deterministic deduplication and correlation tracing",
                ],
              },
            ],
          },
          {
            tag: "li",
            children: [
              {
                tag: "p",
                children: [
                  "Implemented UPN and email generation against Entra Graph, plus detection of inactive people with automatic delete events",
                ],
              },
            ],
          },
          {
            tag: "li",
            children: [
              {
                tag: "p",
                children: [
                  "Upgraded every service to .NET 10 with the matching CI/CD pipelines in GitHub Actions",
                ],
              },
            ],
          },
          {
            tag: "li",
            children: [
              {
                tag: "p",
                children: [
                  "Established a framework for agentic development wired into DevOps for tasks, Confluence for docs, Slack for communication, GitHub for code and Azure for environments, where an automated agent team picks up a task, gathers the context it needs, asks questions, finishes the implementation and documents the result",
                ],
              },
            ],
          },
        ],
      },
      {
        tag: "h2",
        children: ["As project lead for finance"],
      },
      {
        tag: "ul",
        children: [
          {
            tag: "li",
            children: [
              {
                tag: "p",
                children: [
                  "Owned the finance integrations against SAP S/4HANA, including the order flow from BI's internal systems and handling of payment discrepancies",
                ],
              },
            ],
          },
          {
            tag: "li",
            children: [
              {
                tag: "p",
                children: [
                  "Built, with agentic coding, a finance dashboard that traces an order through all five systems and gives full visibility into status and errors across the entire chain",
                ],
              },
            ],
          },
        ],
      },
    ],
    category: "work",
    type: "website",
    tech: [
      ".NET",
      "Azure Functions",
      "Azure Service Bus",
      "Azure Web Apps",
      "SAP S/4HANA",
      "SAP SuccessFactors",
      "Entra ID",
      "Salesforce",
      "OData",
      "SAML",
      "GitHub Actions",
      "Claude Code",
      "MCP",
    ],
    links: [{ kind: "web", url: "https://www.bi.no/" }],
    images: [
      c.image("/public/val/projects/bisap-1.webp", {
        width: 2000,
        height: 1128,
        mimeType: "image/webp",
      }),
    ],
    date: "2026-08-01",
    featured: true,
    hidden: false,
  },
  "bboy-infinite": {
    title: "B-Boy Infinite",
    description:
      "A browser game for B-Boy Myhre's album release. Gold at Visueltprisen 2024.",
    body: [
      {
        tag: "p",
        children: [
          "B-Boy Myhre released a new album in November, and our team at Blank was asked to make a browser game for it. The result was B-Boy Infinite, an infinite runner built for the track 1-2 step, made in three weeks.",
        ],
      },
      {
        tag: "p",
        children: [
          "It was built in Three.js and JavaScript rather than a game engine so it would run anywhere, on a phone or a laptop, without an install. You swipe or use the arrow keys, collect coins worth different amounts and dodge blocks of varying heights. It is still playable.",
        ],
      },
      {
        tag: "h2",
        children: ["What I did"],
      },
      {
        tag: "ul",
        children: [
          {
            tag: "li",
            children: [
              {
                tag: "p",
                children: [
                  "Implemented large parts of the game itself, including game logic, physics and much of the graphics",
                ],
              },
            ],
          },
          {
            tag: "li",
            children: [
              {
                tag: "p",
                children: [
                  "Optimised it to play well regardless of hardware, on desktop and mobile",
                ],
              },
            ],
          },
          {
            tag: "li",
            children: [
              {
                tag: "p",
                children: [
                  "Built security measures on both server and client to protect the leaderboard from tampering, which mattered because the competition was real",
                ],
              },
            ],
          },
        ],
      },
      {
        tag: "h2",
        children: ["Recognition"],
      },
      {
        tag: "p",
        children: [
          "The game won Gold in Installations and Games at Grafill's Visueltprisen 2024. The jury singled out the deliberately rough late-2000s game aesthetic crossed with modern internet culture, and how well it fit the visual universe built up around the artist through music videos and merchandise.",
        ],
      },
      {
        tag: "p",
        children: [
          "Credited alongside Bendik Schrøder on design, Kim Midtlid, Mathilde Tillman Hegdal and Kristine Jevne Berge on frontend, Astri Eiterstraum and Maria Brandt on concept, and Magne Davidsen as project manager. Clients were Little Big Sister and B-Boy Myhre.",
        ],
      },
    ],
    category: "work",
    type: "game",
    tech: ["Three.js", "Pixi.js", "JavaScript", "Supabase", "CSS"],
    links: [
      { kind: "web", url: "https://bboymyhre.neocities.org/" },
      {
        kind: "web",
        url: "https://www.grafill.no/visuelt/vinnere/2024/installasjoner-og-spill/nettleserspill-b-boy-infinite",
      },
    ],
    images: [
      c.image("/public/val/projects/bboy-1.webp", {
        width: 2000,
        height: 1250,
        mimeType: "image/webp",
      }),
      c.image("/public/val/projects/bboy-2.webp", {
        width: 2000,
        height: 1250,
        mimeType: "image/webp",
      }),
    ],
    date: "2023-11-01",
    featured: true,
    hidden: false,
  },
  recapd: {
    title: "Recapd",
    description:
      'An event photo sharing app on the App Store. One shared feed per party, no more "send me your photos".',
    body: [
      {
        tag: "p",
        children: [
          "Every event ends the same way: someone asks everyone to send their photos, and then half of them never arrive. Recapd is my answer to that. It gives an event one shared feed, collects the right photos automatically and asks nothing of you while the party is happening.",
        ],
      },
      {
        tag: "h2",
        children: ["How it works"],
      },
      {
        tag: "p",
        children: [
          "You create a private event with a start and end time and invite people by link or QR code. Then you put your phone away. Recapd does not replace your camera, so guests keep shooting with whatever they already use. When the event ends, everyone gets a notification and the app surfaces the photos taken inside the event window.",
        ],
      },
      {
        tag: "p",
        children: [
          "It is built with Expo and React Native in TypeScript, and shipped to the App Store where it is now on version 1.9.2.",
        ],
      },
      {
        tag: "p",
        children: [
          "Some of the more interesting problems have been the ones that only show up once real people use it: matching photos to the right event window from device metadata, handling uploads that finish long after the party does, and deciding what happens to an event once it is over. Deleting an event is deliberately delayed by seven days so a host cannot wipe everyone's memories on impulse.",
        ],
      },
    ],
    category: "hobby",
    type: "app",
    tech: [
      "React Native",
      "Expo",
      "TypeScript",
      "iOS",
      "StoreKit",
      "Biome",
      "Jest",
    ],
    links: [
      { kind: "web", url: "https://recapd.app" },
      {
        kind: "store",
        url: "https://apps.apple.com/no/app/recapd/id6758083751",
      },
    ],
    images: [
      c.image("/public/val/projects/recapd-1.webp", {
        width: 2000,
        height: 1250,
        mimeType: "image/webp",
      }),
      c.image("/public/val/projects/recapd-2.webp", {
        width: 2000,
        height: 1125,
        mimeType: "image/webp",
      }),
    ],
    date: "2026-06-01",
    featured: true,
    hidden: false,
  },
  bonnetid: {
    title: "Bønnetid",
    description:
      "The official prayer times app for Islamsk Råd Norge, on the App Store.",
    body: [
      {
        tag: "p",
        children: [
          "Islamsk Råd Norge established new standardised prayer times for the whole of Norway, and Bønnetid is how they reach people's phones. Until now, Muslims in Norway have had to find and compare different prayer time tables depending on which mosque or source they trusted. This is one table for the whole country.",
        ],
      },
      {
        tag: "p",
        children: [
          "It grew out of earlier volunteer work for IRN, where I built and scaled the prayer time API that serves over 100,000 users across Norway.",
        ],
      },
      {
        tag: "h2",
        children: ["What it does"],
      },
      {
        tag: "ul",
        children: [
          {
            tag: "li",
            children: [
              {
                tag: "p",
                children: [
                  "Next prayer countdown and today's times for any Norwegian kommune, with an alarm or a silent notification when a prayer starts",
                ],
              },
            ],
          },
          {
            tag: "li",
            children: [
              {
                tag: "p",
                children: [
                  "Nearby mosques with jamat and jummah times, as a list or on a map",
                ],
              },
            ],
          },
          {
            tag: "li",
            children: [
              {
                tag: "p",
                children: ["A hijri calendar with upcoming Islamic events"],
              },
            ],
          },
          {
            tag: "li",
            children: [
              {
                tag: "p",
                children: ["A qibla compass with distance to Mekka"],
              },
            ],
          },
        ],
      },
      {
        tag: "h2",
        children: ["Built for Ramadan-scale load"],
      },
      {
        tag: "p",
        children: [
          "The app reads directly from Supabase Postgres and caches on device, which keeps it working offline and keeps it standing up when usage spikes during Ramadan. It is written with Expo, React Native and TypeScript, with expo-router for navigation, react-query over a typed API layer, semantic light and dark themes, and a zustand settings store persisted to AsyncStorage.",
        ],
      },
      {
        tag: "p",
        children: [
          "The project is run with IRN alongside member mosques and partners including Islamic Cultural Centre and Det Islamske Forbundet.",
        ],
      },
    ],
    category: "freelance",
    type: "app",
    tech: [
      "React Native",
      "Expo",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "React Query",
      "Zustand",
      "iOS",
      "Android",
    ],
    links: [
      {
        kind: "store",
        url: "https://apps.apple.com/no/app/b%C3%B8nnetid/id6792056685",
      },
    ],
    images: [
      c.image("/public/val/projects/bonnetid-1.webp", {
        width: 2000,
        height: 1125,
        mimeType: "image/webp",
      }),
    ],
    date: "2026-07-20",
    featured: false,
    hidden: false,
  },
  islamskole: {
    title: "Islamskole Bærum",
    description:
      "A bilingual site with registration and payments for a Sunday school in Bærum.",
    body: [
      {
        tag: "p",
        children: [
          "Islamskole Bærum is a Sunday Islamic school in Bærum. The site is where parents find the classes, read what happens week to week, and register their children.",
        ],
      },
      {
        tag: "p",
        children: [
          "It runs on Next.js 16 with the App Router and Turbopack, React 19 and Tailwind CSS v4, with Supabase behind it for database, auth and file storage. The whole site is bilingual through next-intl, with Norwegian and English under locale prefixes, because the parents and the children do not always share a first language.",
        ],
      },
      {
        tag: "p",
        children: [
          "Registration is not just a form. It is a real intake flow with payment through Vipps, which is what most Norwegian families actually reach for, wired up over a registered epayment webhook.",
        ],
      },
    ],
    category: "freelance",
    type: "website",
    tech: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "shadcn/ui",
      "Supabase",
      "next-intl",
      "Vipps",
      "Vercel",
    ],
    links: [{ kind: "web", url: "https://islamskole.no" }],
    images: [
      c.image("/public/val/projects/islamskole-1.webp", {
        width: 2000,
        height: 1250,
        mimeType: "image/webp",
      }),
    ],
    date: "2026-08-01",
    featured: false,
    hidden: false,
  },
  "activity-merger": {
    title: "Activity Merger",
    description:
      "Merge split Garmin activities back into one, with a preview before anything is deleted.",
    body: [
      {
        tag: "p",
        children: [
          "Watches split runs in two. An auto-pause hangs, you stop and start by accident, the battery dies, a multisport mode guesses wrong. Garmin Connect gives you no way to put the pieces back together. This does.",
        ],
      },
      {
        tag: "p",
        children: [
          "You sign in, pick the recordings, see the merged activity before committing to it, then slide to confirm. Confirming saves the untouched originals to your machine first, and only then deletes them from Garmin and uploads the merged file.",
        ],
      },
      {
        tag: "h2",
        children: ["Designed around a destructive action"],
      },
      {
        tag: "p",
        children: [
          "The whole thing is an exercise in being careful with someone else's data. There is no database, no object storage and no accounts. Garmin tokens live in an encrypted JWE httpOnly cookie with no max-age, so closing the browser signs you out. Credentials go to Garmin and are never written down.",
        ],
      },
      {
        tag: "p",
        children: [
          "The preview runs the real merge in memory and charts the result, so what you approve is byte-for-byte what gets uploaded. Nothing is deleted until the backup save is a fact, and where the browser supports the File System Access API the write is awaited. Where it does not, the flow stops and asks you to confirm the file arrived, because a download link returns while the browser may still be asking permission.",
        ],
      },
      {
        tag: "h2",
        children: ["The one rule about time"],
      },
      {
        tag: "p",
        children: [
          "The merged activity always follows real-world time. Timestamps are copied through exactly as recorded. A gap between two recordings is never closed by shifting the second activity earlier, never compressed and never filled with invented samples. It is written into the file as a pause, which is how a watch records one.",
        ],
      },
    ],
    category: "hobby",
    type: "website",
    tech: [
      "Next.js",
      "TypeScript",
      "Garmin FIT SDK",
      "JOSE",
      "OAuth 1.0a",
      "Leaflet",
      "Zod",
      "Vitest",
      "Vercel",
    ],
    links: [{ kind: "web", url: "https://activitymerger.vercel.app/" }],
    images: [
      c.image("/public/val/projects/activity-merger-1.webp", {
        width: 2000,
        height: 1250,
        mimeType: "image/webp",
      }),
    ],
    date: "2026-08-18",
    featured: false,
    hidden: false,
  },
  trak: {
    title: "Trak",
    description:
      "An onboarding and personnel follow-up tool that started inside Blank and became a product.",
    body: [
      {
        tag: "p",
        children: [
          "Trak is a startup building an onboarding, offboarding and personnel follow-up tool. It was originally built for Blank's own internal use, then generalised so it could be sold to other customers.",
        ],
      },
      {
        tag: "p",
        children: [
          "The core of the product is defining roles and role structures, then automating the tasks those roles need to complete and sending the reminders that keep them moving. It integrates with the systems companies already live in, including Tripletex, Slack and single sign-on providers.",
        ],
      },
      {
        tag: "p",
        children: [
          "I worked on Trak first as part of my bachelor thesis in 2021, then as a part-time developer alongside my studies, across both frontend and backend.",
        ],
      },
      {
        tag: "h2",
        children: ["What I did"],
      },
      {
        tag: "ul",
        children: [
          {
            tag: "li",
            children: [
              {
                tag: "p",
                children: ["Built several of the frontend pages in Next.js"],
              },
            ],
          },
          {
            tag: "li",
            children: [
              {
                tag: "p",
                children: [
                  "Implemented backend endpoints and the automatic systems that are the heart of Trak",
                ],
              },
            ],
          },
          {
            tag: "li",
            children: [
              {
                tag: "p",
                children: [
                  "Implemented authentication against Google and Microsoft",
                ],
              },
            ],
          },
          {
            tag: "li",
            children: [
              {
                tag: "p",
                children: [
                  "Configured the project with design systems suited to a professional environment, set up CI/CD and hosting for production and development",
                ],
              },
            ],
          },
          {
            tag: "li",
            children: [
              {
                tag: "p",
                children: [
                  "Designed the database with relational database design, and made data collection from external sources such as Tripletex more efficient",
                ],
              },
            ],
          },
          {
            tag: "li",
            children: [
              {
                tag: "p",
                children: [
                  "Made my first attempt at building with AI here, implementing functionality with ChatGPT",
                ],
              },
            ],
          },
        ],
      },
    ],
    category: "work",
    type: "website",
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Node.js",
      "OAuth2",
      "Material UI",
      "Heroku",
    ],
    links: [{ kind: "web", url: "https://www.trak.no/" }],
    images: [
      c.image("/public/val/projects/trak-1.webp", {
        width: 2000,
        height: 1250,
        mimeType: "image/webp",
      }),
    ],
    date: "2023-06-01",
    featured: false,
    hidden: false,
  },
  "four-key-metric": {
    title: "4 Key Metric",
    description:
      "Google's four key metrics, rebuilt inside Møller Mobility Group's Azure estate. Still in use.",
    body: [
      {
        tag: "p",
        children: [
          "A summer project implementing Google's Four Key Metrics, originally built for Google Cloud Platform, inside Møller's Azure ecosystem. It measures how effective a development team is across both quantitative and qualitative metrics: how often code ships to production and how long it takes to get there, how often failures happen and how long they take to fix.",
        ],
      },
      {
        tag: "p",
        children: [
          "The .NET backend pulls data from Azure, Jira, Datadog and GitHub, then cleans and analyses it. The cleaned data surfaces in a React dashboard where each team can follow its own project while leadership sees the whole company in one view. It was a success and is now actively used at Møller.",
        ],
      },
      {
        tag: "h2",
        children: ["What I did"],
      },
      {
        tag: "ul",
        children: [
          {
            tag: "li",
            children: [
              {
                tag: "p",
                children: [
                  "Implemented the automatic systems that collect and clean the data",
                ],
              },
            ],
          },
          {
            tag: "li",
            children: [
              {
                tag: "p",
                children: ["Implemented authentication against Microsoft"],
              },
            ],
          },
          {
            tag: "li",
            children: [
              {
                tag: "p",
                children: [
                  "Built the dashboard that presents the data clearly, and set up CI/CD and hosting for production and development",
                ],
              },
            ],
          },
          {
            tag: "li",
            children: [
              {
                tag: "p",
                children: [
                  "As data analyst, analysed and formatted the data, joined sources together and set the rules for measuring the qualitative metrics",
                ],
              },
            ],
          },
        ],
      },
    ],
    category: "work",
    type: "website",
    tech: [
      ".NET",
      "React",
      "Azure",
      "Azure DevOps",
      "MongoDB",
      "Pandas",
      "Jira",
      "Datadog",
    ],
    links: [],
    images: [],
    date: "2022-08-01",
    featured: false,
    hidden: false,
  },
  klimabrolet: {
    title: "Klimabrølet",
    description:
      "An admin platform for moderating climate protest videos, with automatic filtering.",
    body: [
      {
        tag: "p",
        children: [
          "Klimabrølet ran a site where people uploaded their own roar for the climate to a public gallery. Anyone could log in with Vipps and upload, but nothing appeared until an admin approved it.",
        ],
      },
      {
        tag: "p",
        children: [
          "I built large parts of the admin solution volunteers used to make sure the roars were not political, hateful or otherwise inappropriate, and extended the site so a video could be viewed as an image.",
        ],
      },
      {
        tag: "p",
        children: [
          "The moderation queue was the real problem. I set up the Azure Image Recognition API to automatically filter inappropriate videos before a human ever saw them, then wrote a feature versus price report on the approach, which cut the cost of using image recognition by 60 percent.",
        ],
      },
    ],
    category: "work",
    type: "website",
    tech: [
      "Elm",
      "Kotlin",
      "Spring Boot",
      "Azure",
      "Azure Image Recognition",
      "PostgreSQL",
      "Vipps",
      "Vimeo",
    ],
    links: [],
    images: [],
    date: "2021-08-01",
    featured: false,
    hidden: false,
  },
  "entur-team-betjent": {
    title: "Entur Team Betjent",
    description:
      "The internal admin portal Entur staff use to sell, change and refund tickets.",
    body: [
      {
        tag: "p",
        children: [
          "Team Betjent maintains the web portal used by Entur employees. It is the admin panel for buying tickets, changing or refunding tickets for customers who need help, and the portal staff open when a large group needs a tailored journey booked.",
        ],
      },
      {
        tag: "p",
        children: [
          "I spent a summer inside an already established team, so the job was less about new features and more about working with the people who own this code and making the existing solution better.",
        ],
      },
      {
        tag: "h2",
        children: ["What I did"],
      },
      {
        tag: "ul",
        children: [
          {
            tag: "li",
            children: [
              {
                tag: "p",
                children: [
                  "Rewrote parts of the project for keyboard shortcut navigation, which Entur staff had asked for repeatedly",
                ],
              },
            ],
          },
          {
            tag: "li",
            children: [
              {
                tag: "p",
                children: ["Rewrote Svelte code to TypeScript"],
              },
            ],
          },
          {
            tag: "li",
            children: [
              {
                tag: "p",
                children: ["Improved the seat selector UI"],
              },
            ],
          },
          {
            tag: "li",
            children: [
              {
                tag: "p",
                children: [
                  "Standardised the modal component so it is reusable, dynamic and optimised for slower machines",
                ],
              },
            ],
          },
        ],
      },
    ],
    category: "work",
    type: "app",
    tech: ["React", "Svelte", "TypeScript", "Electron", "Styled Components"],
    links: [{ kind: "web", url: "https://entur.no/" }],
    images: [],
    date: "2020-08-01",
    featured: false,
    hidden: false,
  },
  snittet: {
    title: "Snittet",
    description:
      "A grade average calculator for Norwegian students. Built for myself, then picked up by the student press.",
    body: [
      {
        tag: "p",
        children: [
          "I built Snittet because I needed my own grade average when applying for a master's, and working it out by hand was tedious and error-prone. I showed it to the students I was mentoring, they asked for access, so I polished it and released it to everyone.",
        ],
      },
      {
        tag: "p",
        children: [
          "It pulls official course and grade statistics from DBH, so you search for a course code or name instead of typing in credit weights yourself, pick your grade, and get your average immediately. It has since grown past NTNU to cover universities and colleges across Norway.",
        ],
      },
      {
        tag: "p",
        children: [
          "Other platforms showed either course grades or exam statistics. Snittet combines them, so you see how a course grades on average while it computes your personal result.",
        ],
      },
      {
        tag: "p",
        children: ["Universitetsavisa covered it in June 2022."],
      },
    ],
    category: "hobby",
    type: "website",
    tech: [
      "Next.js",
      "TypeScript",
      "React",
      "Radix UI",
      "Vercel Postgres",
      "DBH",
    ],
    links: [
      { kind: "web", url: "https://snitt.zaim.no" },
      { kind: "github", url: "https://github.com/zaimimr/Snittet" },
      {
        kind: "web",
        url: "https://www.universitetsavisa.no/karaktersnitt/finpusset-eget-prosjekt-til-a-bli-snittkalkulator-for-alle/364521",
      },
    ],
    images: [
      c.image("/public/val/projects/snittet-1.webp", {
        width: 2000,
        height: 975,
        mimeType: "image/webp",
      }),
    ],
    date: "2025-04-04",
    featured: false,
    hidden: false,
  },
  loltracker: {
    title: "LoL Champion Tracker",
    description:
      "Track progress across all 170-odd League of Legends champions in custom sets.",
    body: [
      {
        tag: "p",
        children: [
          "A tracker for working your way through the League of Legends champion roster. You build sets, mark off what you have played, and filter and search across the whole pool.",
        ],
      },
      {
        tag: "p",
        children: [
          "It reads champion data and splash art straight from Riot's Data Dragon. That is also where the fiddly bits live: Data Dragon keys champions by internal id, so Wukong arrives as MonkeyKing and sorts under M unless you sort by display name instead.",
        ],
      },
      {
        tag: "p",
        children: [
          "Built as a fast Vite and React app with Tailwind and Radix, with a command palette for finding a champion without reaching for the mouse.",
        ],
      },
    ],
    category: "hobby",
    type: "website",
    tech: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Radix UI",
      "cmdk",
      "Riot Data Dragon",
    ],
    links: [
      { kind: "web", url: "https://lolchampionstracker.com/" },
      { kind: "github", url: "https://github.com/zaimimr/LolTracker" },
    ],
    images: [
      c.image("/public/val/projects/loltracker-1.webp", {
        width: 2000,
        height: 1250,
        mimeType: "image/webp",
      }),
    ],
    date: "2026-06-16",
    featured: false,
    hidden: false,
  },
  "rishta-studio": {
    title: "Rishta Studio",
    description:
      "A scraping, OCR and extraction pipeline that turns image-only listings into a searchable register.",
    body: [
      {
        tag: "p",
        children: [
          "Rishta Studio is a research project on a Facebook page where matchmaking listings are posted as images, not text. That makes them impossible to search, sort or reason about. This turns them into structured data.",
        ],
      },
      {
        tag: "h2",
        children: ["The pipeline"],
      },
      {
        tag: "p",
        children: [
          "One entry point runs the whole chain: scrape the newest listings, OCR them, extract fields, upsert to Postgres. The grid scraper is incremental Playwright running headless, OCR goes through Apple Vision locally with a Gemini pass for the images Vision struggles with, and field extraction is regex over the OCR text. A launchd job runs it daily.",
        ],
      },
      {
        tag: "p",
        children: [
          "The web UI is a Vite and React app, served by Express locally and as a serverless function on Vercel, reading from Neon Postgres.",
        ],
      },
      {
        tag: "p",
        children: [
          "The register itself is password protected, and the interesting engineering is all upstream of it: getting reliable structure out of low-quality photographs of text.",
        ],
      },
    ],
    category: "hobby",
    type: "website",
    tech: [
      "Python",
      "Playwright",
      "Apple Vision OCR",
      "Gemini",
      "PostgreSQL",
      "Neon",
      "React",
      "Vite",
      "Express",
      "Vercel",
    ],
    links: [{ kind: "web", url: "https://rishta-studio.vercel.app" }],
    images: [
      c.image("/public/val/projects/rishta-1.webp", {
        width: 2000,
        height: 1250,
        mimeType: "image/webp",
      }),
    ],
    date: "2026-08-21",
    featured: false,
    hidden: false,
  },
  agentsmd: {
    title: "Agentic coding workshop",
    description:
      "A hands-on workshop teaching developers to onboard AI as a teammate rather than prompt it as a chatbot.",
    body: [
      {
        tag: "p",
        children: [
          "Most people use coding AI as a smarter chatbot, which leads to long prompts, a lot of correcting and unpredictable quality. This workshop teaches the opposite: onboard the model like a colleague, with clear rules, the right context and explicit expectations.",
        ],
      },
      {
        tag: "h2",
        children: ["What it covers"],
      },
      {
        tag: "ul",
        children: [
          {
            tag: "li",
            children: [
              {
                tag: "p",
                children: [
                  "AGENTS.md, so a model arrives already knowing the project",
                ],
              },
            ],
          },
          {
            tag: "li",
            children: [
              {
                tag: "p",
                children: [
                  "Subagents that divide work, and when delegation beats collaboration",
                ],
              },
            ],
          },
          {
            tag: "li",
            children: [
              {
                tag: "p",
                children: [
                  "Custom slash commands that standardise a workflow across a team",
                ],
              },
            ],
          },
          {
            tag: "li",
            children: [
              {
                tag: "p",
                children: [
                  "Giving a model durable memory, so it remembers earlier debugging and decisions between sessions",
                ],
              },
            ],
          },
          {
            tag: "li",
            children: [
              {
                tag: "p",
                children: [
                  "Wiring AI to the real stack: DevOps, Jira, databases, the terminal and the browser, not only the open files",
                ],
              },
            ],
          },
        ],
      },
      {
        tag: "p",
        children: [
          "It is demonstrated with Claude Code, but the patterns are deliberately vendor-neutral and work with Codex, Gemini and other assistants. The repository is a real Next.js codebase participants build features in, with a template AGENTS.md to take home.",
        ],
      },
      {
        tag: "p",
        children: [
          "I have run versions of this at BI and internally, and a related talk on keeping development speed high with AI at Aneo.",
        ],
      },
    ],
    category: "work",
    type: "non-technical",
    tech: [
      "Claude Code",
      "Codex",
      "Gemini",
      "MCP",
      "Agentic Development",
      "Next.js",
      "TypeScript",
    ],
    links: [
      { kind: "github", url: "https://github.com/zaimimr/agentsmd" },
      {
        kind: "github",
        url: "https://github.com/zaimimr/snake-game-workshop",
      },
    ],
    images: [
      c.image("/public/val/projects/agentsmd-1.webp", {
        width: 2000,
        height: 1250,
        mimeType: "image/webp",
      }),
    ],
    date: "2026-02-26",
    featured: false,
    hidden: false,
  },
  tihlde: {
    title: "TIHLDE",
    description:
      "Member platform and event system for the TIHLDE student association.",
    body: [
      {
        tag: "p",
        children: [
          "Tech lead for TIHLDE's webpage and member system, a platform members use daily at uni, at home and at a party.",
        ],
      },
      {
        tag: "p",
        children: [
          "I built the entire events system, helping the association organise and promote events and business presentations to its members.",
        ],
      },
      {
        tag: "p",
        children: [
          "The stack pairs a React frontend with a Django REST backend on MySQL, maintained by a volunteer team I led.",
        ],
      },
    ],
    category: "work",
    type: "website",
    tech: ["React", "Django REST", "MySQL", "JavaScript", "CSS"],
    links: [{ kind: "web", url: "https://tihlde.org/" }],
    images: [
      c.image("/public/val/projects/tihlde-1.webp", {
        width: 2000,
        height: 1250,
        mimeType: "image/webp",
      }),
    ],
    date: "2021-06-01",
    featured: false,
    hidden: false,
  },
  "ntnui-sprint": {
    title: "NTNUI Sprint",
    description: "Member administration portal for NTNUI's 12,000 members.",
    body: [
      {
        tag: "p",
        children: [
          "Frontend developer on the member system serving NTNUI's 12,000 members across Norway's largest sports association.",
        ],
      },
      {
        tag: "p",
        children: [
          "I developed the portal that lets admins and coaches view and administrate their members, built with Vue and TypeScript.",
        ],
      },
    ],
    category: "work",
    type: "website",
    tech: ["Vue.js", "TypeScript", "SASS"],
    links: [{ kind: "web", url: "https://medlem.ntnui.no/" }],
    images: [
      c.image("/public/val/projects/ntnui-sprint-1.webp", {
        width: 2000,
        height: 1250,
        mimeType: "image/webp",
      }),
    ],
    date: "2021-03-01",
    featured: false,
    hidden: false,
  },
});
