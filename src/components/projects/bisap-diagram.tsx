"use client";

import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type NodeSpec = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  tone?: "source" | "core" | "target";
};

type FlowSpec = {
  id: string;
  d: string;
  delay: number;
  duration: number;
};

const nodes: NodeSpec[] = [
  {
    id: "banner",
    x: 70,
    y: 210,
    w: 210,
    h: 110,
    label: "Banner",
    sub: "students",
    tone: "source",
  },
  {
    id: "success",
    x: 70,
    y: 370,
    w: 210,
    h: 110,
    label: "SuccessFactors",
    sub: "HR",
    tone: "source",
  },
  {
    id: "crm",
    x: 70,
    y: 530,
    w: 210,
    h: 110,
    label: "Salesforce",
    sub: "CRM",
    tone: "source",
  },
  {
    id: "person",
    x: 370,
    y: 240,
    w: 250,
    h: 340,
    label: "Person service",
    sub: "identity graph",
    tone: "core",
  },
  {
    id: "capability",
    x: 830,
    y: 150,
    w: 240,
    h: 120,
    label: "Capabilities",
    sub: "Azure Functions",
  },
  {
    id: "facade",
    x: 830,
    y: 320,
    w: 240,
    h: 120,
    label: "Facades",
    sub: "REST · OData",
  },
  {
    id: "sap",
    x: 1180,
    y: 195,
    w: 260,
    h: 200,
    label: "SAP S/4HANA",
    sub: "finance",
    tone: "target",
  },
  { id: "web", x: 850, y: 600, w: 180, h: 110, label: "BI.no", tone: "target" },
  {
    id: "timeedit",
    x: 1070,
    y: 600,
    w: 180,
    h: 110,
    label: "TimeEdit",
    tone: "target",
  },
  {
    id: "entra",
    x: 1290,
    y: 600,
    w: 180,
    h: 110,
    label: "Entra ID",
    tone: "target",
  },
];

const flows: FlowSpec[] = [
  {
    id: "f-banner",
    d: "M280 265C312 264 336 292 370 300",
    delay: 0,
    duration: 2.6,
  },
  {
    id: "f-success",
    d: "M280 425C314 424 338 402 370 400",
    delay: 0.45,
    duration: 2.6,
  },
  {
    id: "f-crm",
    d: "M280 585C316 584 340 512 370 500",
    delay: 0.9,
    duration: 2.6,
  },
  {
    id: "f-person-a",
    d: "M620 350C654 348 672 306 700 300",
    delay: 1.5,
    duration: 2.2,
  },
  {
    id: "f-person-b",
    d: "M620 470C656 470 674 472 700 470",
    delay: 1.9,
    duration: 2.2,
  },
  {
    id: "f-bus-cap",
    d: "M746 240C784 238 800 212 830 210",
    delay: 2.5,
    duration: 2,
  },
  {
    id: "f-cap-fac",
    d: "M950 270C948 292 952 304 950 320",
    delay: 3.1,
    duration: 1.4,
  },
  {
    id: "f-fac-sap",
    d: "M1070 380C1116 378 1140 306 1180 295",
    delay: 3.7,
    duration: 2,
  },
  {
    id: "f-rail",
    d: "M746 640C776 668 782 736 800 800 1000 806 1200 806 1380 800",
    delay: 2.6,
    duration: 3.4,
  },
  {
    id: "f-stub-web",
    d: "M940 800C942 768 938 740 940 710",
    delay: 4.3,
    duration: 1.2,
  },
  {
    id: "f-stub-time",
    d: "M1160 800C1162 768 1158 740 1160 710",
    delay: 4.6,
    duration: 1.2,
  },
  {
    id: "f-stub-entra",
    d: "M1380 800C1382 768 1378 740 1380 710",
    delay: 4.9,
    duration: 1.2,
  },
];

const busX = 700;
const busW = 46;
const busY = 120;
const busH = 660;

function toneFill(tone: NodeSpec["tone"]) {
  if (tone === "core") return "var(--accent)";
  if (tone === "target") return "var(--surface-raised)";
  return "var(--surface)";
}

function Node({ node }: { node: NodeSpec }) {
  const { x, y, w, h, label, sub, tone } = node;
  const isCore = tone === "core";
  return (
    <g>
      <rect
        x={x + 6}
        y={y + 6}
        width={w}
        height={h}
        rx={12}
        fill="var(--line)"
      />
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={12}
        fill={toneFill(tone)}
        stroke="var(--line)"
        strokeWidth={2.5}
      />
      <text
        x={x + w / 2}
        y={sub ? y + h / 2 - 6 : y + h / 2 + 8}
        textAnchor="middle"
        fill={isCore ? "var(--accent-ink)" : "var(--ink)"}
        className={cn(
          "font-mono",
          isCore ? "text-[26px] font-semibold" : "text-[22px]",
        )}
      >
        {label}
      </text>
      {sub ? (
        <text
          x={x + w / 2}
          y={y + h / 2 + 26}
          textAnchor="middle"
          fill={isCore ? "var(--accent-ink)" : "var(--ink-muted)"}
          className="font-mono text-[17px]"
        >
          {sub}
        </text>
      ) : null}
    </g>
  );
}

export function BisapDiagram({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion();

  return (
    <figure className={cn("not-prose", className)}>
      <div className="border-line bg-bg overflow-hidden rounded-lg border-2">
        <svg
          viewBox="0 0 1600 900"
          className="block h-auto w-full"
          role="img"
          aria-label="Source systems publish person events into a shared Person service, which distributes them over Azure Service Bus to Capabilities and Facades that reach SAP, and to downstream consumers BI.no, TimeEdit and Entra ID."
        >
          <text
            x={70}
            y={110}
            fill="var(--ink-muted)"
            className="font-mono text-[20px] tracking-[0.18em] uppercase"
          >
            Event flow
          </text>

          <g
            fill="none"
            stroke="var(--line)"
            strokeWidth={2.5}
            strokeLinecap="round"
          >
            {flows.map((flow) => (
              <path key={flow.id} id={flow.id} d={flow.d} opacity={0.45} />
            ))}
          </g>

          <rect
            x={busX + 6}
            y={busY + 6}
            width={busW}
            height={busH}
            rx={23}
            fill="var(--line)"
          />
          <rect
            x={busX}
            y={busY}
            width={busW}
            height={busH}
            rx={23}
            fill="var(--surface)"
            stroke="var(--line)"
            strokeWidth={2.5}
          />
          <text
            x={busX + busW / 2}
            y={busY + busH / 2}
            textAnchor="middle"
            fill="var(--ink-muted)"
            transform={`rotate(-90 ${busX + busW / 2} ${busY + busH / 2})`}
            className="font-mono text-[19px] tracking-[0.2em] uppercase"
          >
            Azure Service Bus
          </text>

          {nodes.map((node) => (
            <Node key={node.id} node={node} />
          ))}

          {flows.map((flow) =>
            reducedMotion ? null : (
              <circle key={`dot-${flow.id}`} r={9} fill="var(--accent-strong)">
                <animateMotion
                  dur={`${flow.duration}s`}
                  begin={`${flow.delay}s`}
                  repeatCount="indefinite"
                  keyPoints="0;1"
                  keyTimes="0;1"
                  calcMode="linear"
                >
                  <mpath href={`#${flow.id}`} />
                </animateMotion>
              </circle>
            ),
          )}

          <text
            x={70}
            y={800}
            fill="var(--ink-muted)"
            className="font-hand text-[24px]"
          >
            every line is an event
          </text>
          <text
            x={70}
            y={836}
            fill="var(--ink-faint)"
            className="font-mono text-[17px]"
          >
            dead-letter · dedup · correlation id
          </text>
        </svg>
      </div>
      <figcaption className="text-mono-sm text-ink-muted mt-3 font-mono">
        Simplified. Person and employee data moving across BI&apos;s core
        systems.
      </figcaption>
    </figure>
  );
}
