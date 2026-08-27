import { useId } from "react";
import type { Backdrop, SceneAccent, SceneBand } from "./terrain-art";
import { sceneWidth } from "./terrain-art";

const toneClass = [
  "fill-scene-0",
  "fill-scene-1",
  "fill-scene-2",
  "fill-scene-3",
  "fill-scene-4",
  "fill-scene-5",
] as const;

function Accent({ accent, index }: { accent: SceneAccent; index: number }) {
  if (accent.kind === "vent") {
    return (
      <circle
        cx={accent.x}
        cy={accent.y}
        r="24"
        className="fill-scene-haze animate-vent [filter:blur(9px)] motion-reduce:animate-none motion-reduce:opacity-15"
        style={{
          animationDelay: `${index * 1.35}s`,
          transformOrigin: `${accent.x}px ${accent.y}px`,
        }}
      />
    );
  }

  if (accent.kind === "beacon") {
    return (
      <g className="text-scene-glow">
        <circle
          cx={accent.x}
          cy={accent.y}
          r="40"
          fill="currentColor"
          opacity="0.2"
          className="animate-glow [filter:blur(14px)] motion-reduce:animate-none motion-reduce:opacity-25"
        />
        <path
          d={`M${accent.x} ${accent.y + 12}L${accent.x - 5} ${accent.y + 104}`}
          className="stroke-scene-5"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        <circle
          cx={accent.x}
          cy={accent.y}
          r="8"
          fill="currentColor"
          opacity="0.8"
        />
      </g>
    );
  }

  if (accent.kind === "flag") {
    return (
      <g>
        <path
          d={`M${accent.x} ${accent.y}L${accent.x + 4} ${accent.y + 96}`}
          className="stroke-scene-5"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d={`M${accent.x + 2} ${accent.y + 6}C${accent.x + 44} ${accent.y + 2} ${accent.y % 2 ? accent.x + 66 : accent.x + 60} ${accent.y + 22} ${accent.x + 52} ${accent.y + 40}L${accent.x + 3} ${accent.y + 44}Z`}
          className="fill-scene-glow"
          opacity="0.62"
        />
      </g>
    );
  }

  return (
    <g className="fill-scene-5">
      <ellipse cx={accent.x} cy={accent.y + 74} rx="44" ry="14" />
      <ellipse cx={accent.x - 3} cy={accent.y + 46} rx="33" ry="16" />
      <ellipse cx={accent.x + 4} cy={accent.y + 20} rx="22" ry="13" />
      <ellipse cx={accent.x - 1} cy={accent.y} rx="13" ry="9" />
    </g>
  );
}

function BandShapes({ band, idPrefix }: { band: SceneBand; idPrefix: string }) {
  const generated = useId().replace(/[^a-zA-Z0-9]/g, "");
  const uid = `${idPrefix}${generated}`;
  const rimId = `rim-${uid}`;

  return (
    <>
      <defs>
        {[1, 2].map((tone) => (
          <linearGradient
            key={tone}
            id={`${uid}-fog${tone}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor={`var(--scene-t${tone})`}
              stopOpacity="0"
            />
            <stop
              offset="26%"
              stopColor={`var(--scene-t${tone})`}
              stopOpacity="1"
            />
            <stop
              offset="74%"
              stopColor={`var(--scene-t${tone})`}
              stopOpacity="1"
            />
            <stop
              offset="100%"
              stopColor={`var(--scene-t${tone})`}
              stopOpacity="0"
            />
          </linearGradient>
        ))}
        <linearGradient id={rimId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--scene-haze)" stopOpacity="0.34" />
          <stop offset="55%" stopColor="var(--scene-haze)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="var(--scene-haze)" stopOpacity="0" />
        </linearGradient>
        {band.shapes.map((shape, index) =>
          shape.rim ? (
            <clipPath key={`clip-${index}`} id={`${uid}-c${index}`}>
              <path d={shape.d} />
            </clipPath>
          ) : null,
        )}
      </defs>

      {band.shapes.map((shape, index) => (
        <g key={`${index}-${shape.tone}`}>
          {shape.fog ? (
            <path d={shape.d} fill={`url(#${uid}-fog${shape.tone})`} />
          ) : (
            <path d={shape.d} className={toneClass[shape.tone]} />
          )}
          {shape.rim && shape.rimTop !== undefined ? (
            <rect
              x={-120}
              y={shape.rimTop}
              width={sceneWidth + 240}
              height={shape.rim}
              fill={`url(#${rimId})`}
              clipPath={`url(#${uid}-c${index})`}
            />
          ) : null}
          {shape.edge ? (
            <path
              d={shape.edge}
              className="stroke-scene-haze"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.3"
            />
          ) : null}
          {!shape.edge && !shape.fog && shape.tone >= 4 ? (
            <path
              d={shape.d}
              className="stroke-scene-haze"
              strokeWidth="2"
              fill="none"
              opacity="0.12"
            />
          ) : null}
        </g>
      ))}

      {band.drips?.length ? (
        <g className="fill-scene-haze" opacity="0.26">
          {band.drips.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
      ) : null}

      {band.accents?.map((accent, index) => (
        <Accent
          key={`${accent.kind}-${accent.x}-${accent.y}`}
          accent={accent}
          index={index}
        />
      ))}
    </>
  );
}

export function BandGroup({
  band,
  idPrefix,
}: {
  band: SceneBand;
  idPrefix: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${sceneWidth} ${band.height}`}
      preserveAspectRatio="xMidYMid meet"
      className="block h-auto w-full"
      aria-hidden="true"
    >
      <BandShapes band={band} idPrefix={idPrefix} />
    </svg>
  );
}

export function BackdropLayer({ band }: { band: Backdrop }) {
  return (
    <svg
      viewBox={`0 0 ${sceneWidth} ${band.height}`}
      preserveAspectRatio="xMidYMin meet"
      className="block h-auto w-full"
      aria-hidden="true"
    >
      <g className="fill-scene-haze">
        {band.dust.map((dot) => (
          <circle
            key={`${dot.x}-${dot.y}`}
            cx={dot.x}
            cy={dot.y}
            r={dot.r}
            opacity={dot.o}
          />
        ))}
      </g>
      <BandShapes band={band} idPrefix="backdrop" />
    </svg>
  );
}
