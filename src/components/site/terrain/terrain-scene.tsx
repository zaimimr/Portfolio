"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { BackdropLayer, BandGroup } from "./terrain-layers";
import { Explorer } from "./explorer";
import {
  backdropBand,
  bandHeight,
  midBody,
  midHead,
  nearBody,
  sceneWidth,
  terrainBody,
  terrainHead,
} from "./terrain-art";
import type { SceneBand } from "./terrain-art";

const terrainRate = 0.62;
const walkerBaseline = 0.76;
const walkerBaselineNarrow = 0.86;
const walkerUnits = 66;
const maxTiles = 9;

const layers = [
  {
    key: "mid",
    rate: 0.31,
    head: midHead,
    body: midBody,
    haze: 0.34,
    className: "",
  },
  {
    key: "terrain",
    rate: terrainRate,
    head: terrainHead,
    body: terrainBody,
    haze: 0.14,
    className: "",
  },
  {
    key: "near",
    rate: 1.04,
    head: null,
    body: nearBody,
    haze: 0,
    className: "hidden md:block",
  },
] as const;

type Metrics = { width: number; viewport: number; range: number; unit: number };

const initialMetrics: Metrics = {
  width: 1440,
  viewport: 900,
  range: 3400,
  unit: 0.9,
};

function measure(): Metrics {
  const width = window.innerWidth;
  const viewport = window.innerHeight;
  return {
    width,
    viewport,
    range: Math.max(document.documentElement.scrollHeight - viewport, 1),
    unit: Math.max(width / sceneWidth, viewport / backdropBand.height),
  };
}

function pick<T>(items: readonly T[], index: number): T {
  const wrapped = ((index % items.length) + items.length) % items.length;
  return items[wrapped] as T;
}

function sampleTrail(samples: readonly number[], t: number) {
  const clamped = Math.min(Math.max(t, 0), 1);
  const position = clamped * (samples.length - 1);
  const low = Math.floor(position);
  const start = samples[low] ?? 0;
  const end = samples[Math.min(low + 1, samples.length - 1)] ?? start;
  return start + (end - start) * (position - low);
}

function bandAt(
  head: SceneBand | null,
  body: readonly SceneBand[],
  index: number,
) {
  if (head && index === 0) return head;
  return pick(body, head ? index - 1 : index);
}

function tileCount(hasHead: boolean, rate: number, metrics: Metrics) {
  const rendered = bandHeight * metrics.unit;
  if (rendered <= 0) return 2;
  const needed =
    metrics.viewport + metrics.range * rate - (hasHead ? rendered : 0);
  return Math.min(maxTiles, Math.max(1, Math.ceil(needed / rendered) + 1));
}

function HazeBand({ strength }: { strength: number }) {
  if (!strength) return null;
  return (
    <div
      className="absolute inset-x-0 top-1/4 bottom-0"
      style={{
        opacity: strength,
        backgroundImage:
          "linear-gradient(to bottom, transparent, color-mix(in oklab, var(--scene-haze) 40%, transparent) 45%, color-mix(in oklab, var(--scene-haze) 18%, transparent) 78%, transparent)",
      }}
    />
  );
}

export function TerrainScene() {
  const reducedMotion = useReducedMotion();
  const [metrics, setMetrics] = useState<Metrics>(initialMetrics);
  const backdropRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const walkerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    let stride = 0;
    let previousWorld: number | null = null;
    let previousX = 0;
    let facing = 1;

    const apply = () => {
      frame = 0;
      const current = measure();
      const scroll = reducedMotion ? 0 : window.scrollY;

      if (backdropRef.current) {
        backdropRef.current.style.transform = `translate3d(0, ${(-scroll * 0.05).toFixed(2)}px, 0)`;
      }

      layers.forEach((layer, index) => {
        const element = layerRefs.current[index];
        if (!element) return;
        element.style.transform = `translate3d(0, ${(-scroll * layer.rate).toFixed(2)}px, 0)`;
      });

      const walker = walkerRef.current;
      if (!walker) return;

      const rendered = bandHeight * current.unit;
      const baseline =
        current.width < 768 ? walkerBaselineNarrow : walkerBaseline;
      const world = scroll * terrainRate + current.viewport * baseline;
      const index = Math.floor(world / rendered);
      const local = world / rendered - index;
      const samples = bandAt(terrainHead, terrainBody, index).trailSamples;
      const offset = (current.width - sceneWidth * current.unit) / 2;
      const raw = samples
        ? offset + sampleTrail(samples, local) * current.unit
        : current.width / 2;
      const pad = walkerUnits * current.unit * 0.7;
      const x = Math.min(Math.max(raw, pad), current.width - pad);

      if (previousWorld === null) {
        previousWorld = world;
        previousX = x;
      }
      if (Math.abs(x - previousX) > 0.35) facing = x > previousX ? 1 : -1;
      stride += Math.abs(world - previousWorld) / 15;
      previousWorld = world;
      previousX = x;

      walker.style.setProperty("--swing", Math.sin(stride).toFixed(3));
      walker.style.setProperty("--lift", Math.abs(Math.cos(stride)).toFixed(3));
      walker.style.transform = `translate3d(${x.toFixed(1)}px, ${(
        current.viewport * baseline
      ).toFixed(1)}px, 0) translate(-50%, -92%) scaleX(${facing})`;
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(apply);
    };

    const remeasure = () => {
      setMetrics((previous) => {
        const next = measure();
        const same =
          Math.abs(next.width - previous.width) < 1 &&
          Math.abs(next.viewport - previous.viewport) < 1 &&
          Math.abs(next.range - previous.range) < 24;
        return same ? previous : next;
      });
      schedule();
    };

    const resizeObserver = new ResizeObserver(remeasure);
    resizeObserver.observe(document.documentElement);

    remeasure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", remeasure);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", remeasure);
    };
  }, [reducedMotion]);

  const sceneStyle = {
    width: `${sceneWidth * metrics.unit}px`,
    marginLeft: `${(metrics.width - sceneWidth * metrics.unit) / 2}px`,
  };

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(125% 72% at 52% 56%, color-mix(in oklab, var(--scene-haze) 26%, transparent), transparent 72%)",
        }}
      />

      <div
        ref={backdropRef}
        style={sceneStyle}
        className="absolute top-0 will-change-transform"
      >
        <BackdropLayer band={backdropBand} />
      </div>

      {layers.map((layer, index) => (
        <div key={layer.key} className={layer.className}>
          <div
            ref={(element) => {
              layerRefs.current[index] = element;
            }}
            style={sceneStyle}
            className="absolute top-0 will-change-transform"
          >
            {Array.from({
              length:
                tileCount(Boolean(layer.head), layer.rate, metrics) +
                (layer.head ? 1 : 0),
            }).map((_, tile) => (
              <BandGroup
                key={tile}
                idPrefix={`${layer.key}${tile}`}
                band={bandAt(layer.head, layer.body, tile)}
              />
            ))}
          </div>
          <HazeBand strength={layer.haze} />
        </div>
      ))}

      <div
        ref={walkerRef}
        style={{
          height: `${walkerUnits * metrics.unit}px`,
          width: `${walkerUnits * metrics.unit * (40 / 64)}px`,
        }}
        className="absolute top-0 left-0 will-change-transform"
      >
        <Explorer />
      </div>

      <div
        className="absolute inset-0"
        style={{ backgroundColor: "var(--bg)", opacity: "var(--scene-veil)" }}
      />
      <div
        className="absolute inset-x-0 top-0 h-44"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, var(--bg), color-mix(in oklab, var(--bg) 45%, transparent) 55%, transparent)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(125% 88% at 50% 40%, transparent 28%, color-mix(in oklab, var(--bg) 62%, transparent) 100%)",
        }}
      />
    </div>
  );
}
