import { writeFileSync } from "node:fs";

const W = 1600;
const BAND = 1400;

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const n = (v, p = 0) => Number(v.toFixed(p));

function smoothPath(points, close) {
  if (points.length < 2) return "";
  let d = `M${n(points[0][0])} ${n(points[0][1])}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i === 0 ? 0 : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    d += `C${n(p1[0] + (p2[0] - p0[0]) / 6)} ${n(p1[1] + (p2[1] - p0[1]) / 6)} ${n(p2[0] - (p3[0] - p1[0]) / 6)} ${n(p2[1] - (p3[1] - p1[1]) / 6)} ${n(p2[0])} ${n(p2[1])}`;
  }
  return close ? `${d}Z` : d;
}

function fractal(random, count, amp, roughness) {
  let values = [0, 0];
  let spread = amp;
  while (values.length - 1 < count) {
    const next = [values[0]];
    for (let i = 0; i < values.length - 1; i += 1) {
      next.push(
        (values[i] + values[i + 1]) / 2 + (random() - 0.5) * spread,
        values[i + 1],
      );
    }
    values = next;
    spread *= roughness;
  }
  return values;
}

function sampler(points, from, to) {
  return (x) => {
    const t = Math.min(Math.max((x - from) / (to - from), 0), 1);
    const position = t * (points.length - 1);
    const lo = Math.floor(position);
    const hi = Math.min(lo + 1, points.length - 1);
    return points[lo][1] + (points[hi][1] - points[lo][1]) * (position - lo);
  };
}

function crest(
  random,
  {
    top,
    amp,
    roughness = 0.52,
    bottom,
    tilt = 0,
    from = -90,
    to = W + 90,
    tone,
    rim = 0,
  },
) {
  const heights = fractal(random, 32, amp, roughness);
  const points = heights.map((h, i) => {
    const t = i / (heights.length - 1);
    return [from + (to - from) * t, top + h + tilt * t];
  });
  const edge = smoothPath(points, false);
  const d = `${edge}L${n(to)} ${n(bottom)}L${n(from)} ${n(bottom)}Z`;
  const shape = { d, tone, edge };
  if (rim) {
    shape.rim = rim;
    shape.rimTop = n(Math.min(...points.map((p) => p[1])) - 6);
  }
  return { shape, yAt: sampler(points, from, to) };
}

function slab(
  random,
  { top, amp, thickness, tilt = 0, from = -90, to = W + 90, tone, rim = 0 },
) {
  const topPoints = fractal(random, 16, amp, 0.5).map((h, i, arr) => {
    const t = i / (arr.length - 1);
    return [from + (to - from) * t, top + h + tilt * t];
  });
  const bottomPoints = fractal(random, 16, amp * 0.7, 0.5)
    .map((h, i, arr) => {
      const t = i / (arr.length - 1);
      return [from + (to - from) * t, top + thickness + h + tilt * t];
    })
    .reverse();
  const edge = smoothPath(topPoints, false);
  const d = `${edge}${smoothPath(bottomPoints, false).replace(/^M/, "L")}Z`;
  const shape = { d, tone, edge };
  if (rim) {
    shape.rim = rim;
    shape.rimTop = n(Math.min(...topPoints.map((p) => p[1])) - 6);
  }
  return { shape, yAt: sampler(topPoints, from, to) };
}

function spire(
  random,
  { x, baseY, height, width, lean = 0, notch = 0.5, tone },
) {
  const left = [];
  const right = [];
  const steps = 9;
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const y = baseY - height * t;
    const halfWidth = (width / 2) * Math.pow(1 - t, notch);
    const cx = x + lean * t;
    const jitter = (random() - 0.5) * width * 0.16;
    left.push([cx - halfWidth + jitter, y]);
    right.push([cx + halfWidth + jitter * 0.6, y]);
  }
  right.reverse();
  return {
    d: smoothPath([...left, [x + lean, baseY - height * 1.02], ...right], true),
    tone,
  };
}

function blob(random, { cx, cy, rx, ry, wobble = 0.22, points = 11, tone }) {
  const pts = [];
  for (let i = 0; i < points; i += 1) {
    const angle = (i / points) * Math.PI * 2;
    const r = 1 + (random() - 0.5) * wobble * 2;
    pts.push([cx + Math.cos(angle) * rx * r, cy + Math.sin(angle) * ry * r]);
  }
  pts.push(pts[0], pts[1]);
  return { d: smoothPath(pts, true), tone };
}

function seatedRocks(random, { yAt, count, from, to, minR, maxR, tone }) {
  const shapes = [];
  for (let i = 0; i < count; i += 1) {
    const cx = from + ((to - from) * (i + random() * 0.85)) / count;
    const rx = minR + random() * (maxR - minR);
    const ry = rx * (0.42 + random() * 0.26);
    const cy = yAt(cx) + ry * 0.4;
    shapes.push(
      blob(random, { cx, cy, rx, ry, wobble: 0.26, points: 9, tone }),
    );
    if (rx > 26) {
      shapes.push(
        blob(random, {
          cx: cx - rx * 0.16,
          cy: cy - ry * 0.44,
          rx: rx * 0.58,
          ry: ry * 0.46,
          wobble: 0.3,
          points: 8,
          tone: Math.max(0, tone - 1),
        }),
      );
    }
  }
  return shapes;
}

function drip(random, { x, y, length, width }) {
  const w = width / 2;
  const bulge = length * (0.5 + random() * 0.3);
  const tipR = w * (0.7 + random() * 0.5);
  return `M${n(x - w)} ${n(y)}C${n(x - w * 0.9)} ${n(y + bulge)} ${n(x - tipR)} ${n(y + length - tipR)} ${n(x)} ${n(y + length)}C${n(x + tipR)} ${n(y + length - tipR)} ${n(x + w * 0.9)} ${n(y + bulge)} ${n(x + w)} ${n(y)}Z`;
}

function fill(tone) {
  return {
    d: `M-90 -40L${W + 90} -40L${W + 90} ${BAND + 40}L-90 ${BAND + 40}Z`,
    tone,
  };
}

function chasm(random, { top, height, tone, from, to }) {
  const topPoints = fractal(random, 16, height * 0.28, 0.5).map((h, i, arr) => {
    const t = i / (arr.length - 1);
    return [from + (to - from) * t, top + h];
  });
  const bottomRaw = fractal(random, 16, height * 0.22, 0.5).map((h, i, arr) => {
    const t = i / (arr.length - 1);
    return [from + (to - from) * t, top + height + h];
  });
  const edge = smoothPath(topPoints, false);
  const d = `${edge}${smoothPath(bottomRaw.slice().reverse(), false).replace(/^M/, "L")}Z`;
  return { shape: { d, tone, fog: 1 }, yAt: sampler(bottomRaw, from, to) };
}

function periodicTrunk(random, { baseX, width, phase, swayAmount }) {
  const steps = 12;
  const left = [];
  const right = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const y = -60 + (BAND + 120) * t;
    const drift = Math.sin(t * Math.PI * 2 + phase) * swayAmount;
    const breathe = 1 + Math.sin(t * Math.PI * 2 + phase * 1.7) * 0.05;
    left.push([baseX + drift - (width / 2) * breathe, y]);
    right.push([baseX + drift + (width / 2) * breathe, y]);
  }
  right.reverse();
  return { d: smoothPath([...left, ...right], true), tone: 5 };
}

function trail(random, { startX, endX, sway }) {
  const controls = 7;
  const points = [[startX, 0]];
  for (let i = 1; i < controls; i += 1) {
    const t = i / controls;
    points.push([
      startX +
        Math.sin(t * Math.PI * 1.7 + sway) * 215 +
        (random() - 0.5) * 115,
      BAND * t,
    ]);
  }
  points.push([endX, BAND]);
  const samples = [];
  for (let i = 0; i <= 64; i += 1) {
    const y = (BAND * i) / 64;
    let lo = 0;
    for (let k = 0; k < points.length - 1; k += 1)
      if (points[k][1] <= y) lo = k;
    const hi = Math.min(lo + 1, points.length - 1);
    const span = points[hi][1] - points[lo][1] || 1;
    const t = Math.min(Math.max((y - points[lo][1]) / span, 0), 1);
    const eased = t * t * (3 - 2 * t);
    samples.push(n(points[lo][0] + (points[hi][0] - points[lo][0]) * eased));
  }
  return samples;
}

function backdrop() {
  const random = rng(9001);
  const H = 1000;
  const shapes = [];
  const dust = [];
  for (let i = 0; i < 120; i += 1) {
    dust.push({
      x: n(random() * W),
      y: n(random() * H * 0.72),
      r: n(0.7 + random() * 2.1, 2),
      o: n(0.12 + random() * 0.45, 2),
    });
  }

  shapes.push(
    blob(random, {
      cx: 1215,
      cy: 235,
      rx: 190,
      ry: 187,
      wobble: 0.03,
      points: 24,
      tone: 0,
    }),
  );
  shapes.push(
    blob(random, {
      cx: 1160,
      cy: 205,
      rx: 54,
      ry: 50,
      wobble: 0.13,
      points: 13,
      tone: 1,
    }),
  );
  shapes.push(
    blob(random, {
      cx: 1294,
      cy: 320,
      rx: 39,
      ry: 35,
      wobble: 0.15,
      points: 13,
      tone: 1,
    }),
  );

  const ridgeA = crest(random, {
    top: 430,
    amp: 330,
    roughness: 0.52,
    bottom: H,
    tone: 0,
    rim: 150,
  });
  shapes.push(ridgeA.shape);
  for (let i = 0; i < 4; i += 1) {
    const x = 130 + i * (W / 4) + random() * 140;
    shapes.push(
      spire(random, {
        x,
        baseY: ridgeA.yAt(x) + 130,
        height: 330 + random() * 320,
        width: 120 + random() * 110,
        lean: (random() - 0.5) * 100,
        notch: 0.45 + random() * 0.45,
        tone: 1,
      }),
    );
  }

  const ridgeB = crest(random, {
    top: 700,
    amp: 220,
    roughness: 0.5,
    bottom: H,
    tilt: -60,
    tone: 1,
    rim: 140,
  });
  shapes.push(ridgeB.shape);
  const ridgeC = crest(random, {
    top: 880,
    amp: 150,
    roughness: 0.48,
    bottom: H,
    tone: 2,
    rim: 110,
  });
  shapes.push(ridgeC.shape);
  shapes.push(
    ...seatedRocks(random, {
      yAt: ridgeC.yAt,
      count: 5,
      from: 0,
      to: W,
      minR: 20,
      maxR: 50,
      tone: 2,
    }),
  );

  return { height: H, shapes, dust, anchor: meanCrest(ridgeA.yAt) };
}

function meanCrest(yAt) {
  let total = 0;
  const steps = 32;
  for (let i = 0; i <= steps; i += 1) total += yAt((W * i) / steps);
  return n(total / (steps + 1));
}

function footprints(random, samples, { from, to, step }) {
  const prints = [];
  for (let y = from; y <= to; y += step) {
    const t = y / BAND;
    const index = Math.round(t * (samples.length - 1));
    const x = samples[Math.min(Math.max(index, 0), samples.length - 1)];
    const side = (prints.length % 2 === 0 ? -1 : 1) * (9 + random() * 5);
    prints.push({
      x: n(x + side),
      y: n(y),
      r: n(6 + random() * 3),
    });
  }
  return prints;
}

function scratches(random, { count, from, to, top, bottom }) {
  const out = [];
  for (let i = 0; i < count; i += 1) {
    const x = from + random() * (to - from);
    const y = top + random() * (bottom - top);
    const len = 40 + random() * 130;
    const lift = (random() - 0.5) * 26;
    out.push(
      smoothPath(
        [
          [x, y],
          [x + len * 0.4, y + lift * 0.6],
          [x + len * 0.75, y + lift],
          [x + len, y + lift * 1.3],
        ],
        false,
      ),
    );
  }
  return out;
}

function midLayer() {
  const random0 = rng(2400);
  const headShapes = [];
  const horizon = crest(random0, {
    top: 520,
    amp: 300,
    roughness: 0.5,
    bottom: BAND,
    tone: 3,
    rim: 160,
  });
  headShapes.push(horizon.shape);
  for (let i = 0; i < 3; i += 1) {
    const x = i % 2 === 0 ? 140 + random0() * 220 : W - 200 - random0() * 260;
    headShapes.push(
      spire(random0, {
        x,
        baseY: horizon.yAt(x) + 90,
        height: 420 + random0() * 300,
        width: 150 + random0() * 120,
        lean: (random0() - 0.5) * 130,
        notch: 0.5,
        tone: 3,
      }),
    );
  }
  headShapes.push(
    ...seatedRocks(random0, {
      yAt: horizon.yAt,
      count: 6,
      from: 0,
      to: W,
      minR: 22,
      maxR: 56,
      tone: 4,
    }),
  );
  const head = { height: BAND, shapes: headShapes };
  const anchor = meanCrest(horizon.yAt);

  const body = [];
  for (let b = 0; b < 3; b += 1) {
    const random = rng(2600 + b * 131);
    const shapes = [fill(3)];
    const drips = [];
    const accents = [];

    const gap = chasm(random, {
      top: 250 + b * 40,
      height: 430,
      tone: 1,
      from: -90,
      to: W + 90,
    });
    shapes.push(gap.shape);
    for (let i = 0; i < 4; i += 1) {
      const x = 120 + i * 400 + random() * 200;
      shapes.push(
        spire(random, {
          x,
          baseY: gap.yAt(x) + 20,
          height: 200 + random() * 240,
          width: 90 + random() * 110,
          lean: (random() - 0.5) * 90,
          notch: 0.5,
          tone: 3,
        }),
      );
      if (i === 2) {
        for (let k = 0; k < 3; k += 1) {
          drips.push(
            drip(random, {
              x: x + (random() - 0.5) * 120,
              y: gap.yAt(x) - 190 - random() * 120,
              length: 110 + random() * 190,
              width: 8 + random() * 9,
            }),
          );
        }
      }
    }

    const shelf = slab(random, {
      top: 880 + b * 45,
      amp: 130,
      thickness: 300,
      tilt: b % 2 ? 60 : -60,
      tone: 4,
      rim: 120,
    });
    shapes.push(shelf.shape);
    shapes.push(
      ...seatedRocks(random, {
        yAt: shelf.yAt,
        count: 6,
        from: 40,
        to: W - 40,
        minR: 22,
        maxR: 58,
        tone: 3,
      }),
    );

    if (b === 1)
      accents.push({ kind: "beacon", x: 1250, y: n(shelf.yAt(1250)) - 100 });

    body.push({
      height: BAND,
      shapes,
      drips,
      accents,
      scratches: scratches(random, {
        count: 9,
        from: 0,
        to: W,
        top: 1220,
        bottom: BAND,
      }),
    });
  }

  return { head, body, anchor };
}

function terrainLayer() {
  const random0 = rng(3700);
  const headShapes = [];
  const horizon = crest(random0, {
    top: 620,
    amp: 240,
    roughness: 0.5,
    bottom: BAND,
    tone: 4,
    rim: 150,
  });
  headShapes.push(horizon.shape);
  headShapes.push(
    ...seatedRocks(random0, {
      yAt: horizon.yAt,
      count: 7,
      from: 0,
      to: W,
      minR: 20,
      maxR: 58,
      tone: 5,
    }),
  );
  headShapes.push(
    ...seatedRocks(random0, {
      yAt: horizon.yAt,
      count: 3,
      from: 200,
      to: W - 200,
      minR: 26,
      maxR: 44,
      tone: 3,
    }),
  );
  const headTrail = trail(random0, { startX: 800, endX: 800, sway: 0.4 });
  const anchor = meanCrest(horizon.yAt);
  const head = {
    height: BAND,
    shapes: headShapes,
    accents: [{ kind: "cairn", x: 1215, y: n(horizon.yAt(1215)) - 74 }],
    trailSamples: headTrail,
    prints: footprints(random0, headTrail, {
      from: 780,
      to: BAND - 30,
      step: 78,
    }),
    scratches: scratches(random0, {
      count: 14,
      from: 0,
      to: W,
      top: 820,
      bottom: BAND - 20,
    }),
  };

  const body = [];
  for (let b = 0; b < 4; b += 1) {
    const random = rng(3900 + b * 197);
    const shapes = [fill(4)];
    const accents = [];
    const samples = trail(random, {
      startX: 800,
      endX: 800,
      sway: 1.1 + b * 1.7,
    });

    const gap = chasm(random, {
      top: 150 + (b % 2) * 90,
      height: 300,
      tone: 2,
      from: -90,
      to: W + 90,
    });
    shapes.push(gap.shape);
    for (let i = 0; i < 4; i += 1) {
      const x = 180 + i * 380 + random() * 170;
      shapes.push(
        spire(random, {
          x,
          baseY: gap.yAt(x) + 14,
          height: 140 + random() * 190,
          width: 66 + random() * 84,
          lean: (random() - 0.5) * 70,
          notch: 0.5,
          tone: 4,
        }),
      );
    }

    const shelfA = slab(random, {
      top: b % 2 ? 300 : 640,
      amp: 150,
      thickness: 260,
      tilt: b % 2 ? 55 : -55,
      tone: 5,
      rim: 130,
    });
    shapes.push(shelfA.shape);
    shapes.push(
      ...seatedRocks(random, {
        yAt: shelfA.yAt,
        count: 6,
        from: 0,
        to: W,
        minR: 20,
        maxR: 54,
        tone: 3,
      }),
    );

    const shelfB = slab(random, {
      top: 980 + (b % 3) * 40,
      amp: 130,
      thickness: 240,
      tilt: b % 2 ? -50 : 50,
      tone: 5,
      rim: 120,
    });
    shapes.push(shelfB.shape);
    shapes.push(
      ...seatedRocks(random, {
        yAt: shelfB.yAt,
        count: 7,
        from: 0,
        to: W,
        minR: 22,
        maxR: 62,
        tone: 4,
      }),
    );

    const shelfC = slab(random, {
      top: 1250,
      amp: 110,
      thickness: 220,
      tilt: b % 2 ? 40 : -40,
      tone: 5,
      rim: 100,
    });
    shapes.push(shelfC.shape);
    shapes.push(
      ...seatedRocks(random, {
        yAt: shelfC.yAt,
        count: 5,
        from: 60,
        to: W - 60,
        minR: 24,
        maxR: 56,
        tone: 3,
      }),
    );

    if (b === 0)
      accents.push({ kind: "flag", x: 400, y: n(shelfB.yAt(400)) - 94 });
    if (b === 1)
      accents.push({ kind: "cairn", x: 1120, y: n(shelfA.yAt(1120)) - 74 });
    if (b === 2) {
      const x = 1260;
      const base = n(shelfA.yAt(x));
      for (let k = 0; k < 4; k += 1) {
        accents.push({
          kind: "vent",
          x: n(x + (random() - 0.5) * 190),
          y: n(base - 40 - k * 48),
        });
      }
    }
    if (b === 3) {
      accents.push({ kind: "cairn", x: 520, y: n(shelfA.yAt(520)) - 74 });
      accents.push({ kind: "flag", x: 1180, y: n(shelfB.yAt(1180)) - 94 });
    }

    body.push({
      height: BAND,
      shapes,
      accents,
      trailSamples: samples,
      prints: footprints(random, samples, {
        from: 40,
        to: BAND - 30,
        step: 74,
      }),
      scratches: scratches(random, {
        count: 18,
        from: 0,
        to: W,
        top: 520,
        bottom: BAND - 20,
      }),
    });
  }

  return { head, body, anchor };
}

function nearLayer() {
  const body = [];
  for (let b = 0; b < 3; b += 1) {
    const random = rng(5100 + b * 233);
    const shapes = [];

    shapes.push(
      periodicTrunk(random, {
        baseX: 18,
        width: 118 + random() * 62,
        phase: b * 1.3,
        swayAmount: 44 + random() * 26,
      }),
    );
    shapes.push(
      periodicTrunk(random, {
        baseX: W - 26,
        width: 126 + random() * 64,
        phase: 2.1 + b * 1.1,
        swayAmount: 42 + random() * 28,
      }),
    );
    for (let i = 0; i < 2; i += 1) {
      const cx = 360 + random() * (W - 720);
      const rx = 130 + random() * 120;
      shapes.push(
        blob(random, {
          cx,
          cy: 1170 + random() * 110,
          rx,
          ry: rx * (0.3 + random() * 0.14),
          wobble: 0.22,
          points: 11,
          tone: 5,
        }),
      );
    }

    body.push({ height: BAND, shapes });
  }
  return { body };
}

const art = {
  backdrop: backdrop(),
  mid: midLayer(),
  terrain: terrainLayer(),
  near: nearLayer(),
};

const header = `export type ScenePath = {
  d: string;
  tone: number;
  edge?: string;
  rim?: number;
  rimTop?: number;
  fog?: number;
};

export type SceneAccent = {
  kind: "cairn" | "flag" | "beacon" | "vent";
  x: number;
  y: number;
};

export type SceneBand = {
  height: number;
  shapes: ScenePath[];
  drips?: string[];
  accents?: SceneAccent[];
  trailSamples?: number[];
  prints?: { x: number; y: number; r: number }[];
  scratches?: string[];
};

export type Backdrop = SceneBand & {
  dust: { x: number; y: number; r: number; o: number }[];
  anchor: number;
};

export const sceneWidth = ${W};
export const bandHeight = ${BAND};
`;

const body = [
  `export const backdropBand: Backdrop = ${JSON.stringify(art.backdrop)};`,
  `export const midHead: SceneBand = ${JSON.stringify(art.mid.head)};`,
  `export const midBody: SceneBand[] = ${JSON.stringify(art.mid.body)};`,
  `export const terrainHead: SceneBand = ${JSON.stringify(art.terrain.head)};`,
  `export const terrainBody: SceneBand[] = ${JSON.stringify(art.terrain.body)};`,
  `export const nearBody: SceneBand[] = ${JSON.stringify(art.near.body)};`,
  `export const midAnchor = ${art.mid.anchor};`,
  `export const terrainAnchor = ${art.terrain.anchor};`,
].join("\n\n");

const target = process.argv[2] ?? "src/components/site/terrain/terrain-art.ts";

writeFileSync(target, `${header}\n${body}\n`);
console.log(
  JSON.stringify(
    {
      backdrop: art.backdrop.shapes.length,
      midHead: art.mid.head.shapes.length,
      midBody: art.mid.body.reduce((s, b) => s + b.shapes.length, 0),
      terrainHead: art.terrain.head.shapes.length,
      terrainBody: art.terrain.body.reduce((s, b) => s + b.shapes.length, 0),
      nearBody: art.near.body.reduce((s, b) => s + b.shapes.length, 0),
    },
    null,
    2,
  ),
);
