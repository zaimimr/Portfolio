import {
  characterInk as ink,
  characterRobe as robe,
  characterRobeLining as lining,
  characterRobeShade as robeShade,
  characterSkin as skin,
  characterSkinShade as skinShade,
} from "@/components/site/character-palette";

const hip = { transformBox: "view-box", transformOrigin: "22px 46px" } as const;
const staffArm = {
  transformBox: "view-box",
  transformOrigin: "30px 34px",
} as const;

export function Explorer() {
  return (
    <svg
      viewBox="0 0 44 66"
      className="h-full w-full overflow-visible"
      aria-hidden="true"
    >
      <ellipse
        cx="21"
        cy="63"
        rx="12"
        ry="2.4"
        fill="var(--scene-deep)"
        opacity="0.42"
      />

      <g style={{ transform: "translateY(calc(var(--lift, 0) * -1.3px))" }}>
        <g
          style={{
            ...hip,
            transform: "rotate(calc(var(--swing, 0) * -14deg))",
          }}
        >
          <path
            d="M18.6 45.5C18 52.2 17.6 56.8 17.4 60.4"
            fill="none"
            stroke={lining}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M17.4 60.6C16.2 60.9 15.2 61.3 14.6 61.8"
            fill="none"
            stroke={skinShade}
            strokeWidth="3.4"
            strokeLinecap="round"
          />
        </g>
        <g
          style={{ ...hip, transform: "rotate(calc(var(--swing, 0) * 14deg))" }}
        >
          <path
            d="M24.4 45.5C25 52.2 25.4 56.8 25.6 60.4"
            fill="none"
            stroke={lining}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M25.6 60.6C26.8 60.9 27.8 61.3 28.4 61.8"
            fill="none"
            stroke={skinShade}
            strokeWidth="3.4"
            strokeLinecap="round"
          />
        </g>

        <path
          d="M15.6 30C12.4 36.4 10.6 43.4 10.2 50.6 16.8 52.6 26.2 52.6 32.8 50.6 32.4 43.4 30.6 36.4 27.4 30 23.4 28.8 19.6 28.8 15.6 30"
          fill={robe}
        />
        <path
          d="M21.5 30.4C21.9 37.4 22.2 44.4 22.2 51.9 26.2 51.8 30 51.4 32.8 50.6 32.4 43.4 30.6 36.4 27.4 30 25.4 29.4 23.5 29.1 21.5 30.4"
          fill={robeShade}
        />
        <path
          d="M10.4 48.8C16.9 51 26.1 51 32.6 48.8 32.7 49.8 32.8 50.3 32.8 50.6 26.2 52.6 16.8 52.6 10.2 50.6 10.2 50.3 10.3 49.8 10.4 48.8"
          fill={lining}
          opacity="0.55"
        />

        <g
          style={{
            ...staffArm,
            transform: "rotate(calc(var(--swing, 0) * 7deg))",
          }}
        >
          <path
            d="M31.6 15.6C32.4 27.4 32.9 39.4 33 51.6"
            fill="none"
            stroke={robeShade}
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <g className="text-scene-glow">
            <circle
              cx="31.4"
              cy="12.2"
              r="10"
              fill="currentColor"
              opacity="0.34"
              className="animate-flicker [filter:blur(5px)] motion-reduce:animate-none"
            />
            <circle
              cx="31.4"
              cy="12.2"
              r="4.4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="31.4" cy="12.2" r="1.7" fill="currentColor" />
          </g>
          <path
            d="M27.6 33.4C29.6 32.4 31.4 32.3 32.8 33"
            fill="none"
            stroke={skin}
            strokeWidth="3.6"
            strokeLinecap="round"
          />
        </g>

        <path
          d="M12.6 31.6C10.6 33.4 9.6 36.6 9.8 40.4 11.4 41.2 13.2 41.2 14.8 40.4 14.6 36.8 15.2 33.8 16.4 31.4 15.2 30.8 13.8 30.8 12.6 31.6"
          fill={robeShade}
        />

        <path
          d="M8.4 25.2C7.2 13.8 13.4 7 21.4 7 29.4 7 35.6 13.8 34.4 25.2 34.2 28.4 32 30.2 29.2 29.4 27.8 31.2 24.9 32.2 21.4 32.2 17.9 32.2 15 31.2 13.6 29.4 10.8 30.2 8.6 28.4 8.4 25.2"
          fill={robe}
        />
        <ellipse cx="21.4" cy="20.8" rx="11.2" ry="10.8" fill={skin} />
        <path
          d="M9.8 23.8C8.8 13.4 14.2 7.6 21.4 7.6 28.6 7.6 34 13.4 33 23.8 32.8 26.2 30.8 27.4 28.8 26.6 28.4 18.4 25 15.4 21.4 15.4 17.8 15.4 14.4 18.4 14 26.6 12 27.4 10 26.2 9.8 23.8"
          fill={robeShade}
        />
        <path
          d="M14 26.6C14.4 18.4 17.8 15.4 21.4 15.4 25 15.4 28.4 18.4 28.8 26.6"
          fill="none"
          stroke={ink}
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.3"
        />

        <ellipse cx="17" cy="21.8" rx="3.1" ry="3.5" fill={ink} />
        <ellipse cx="25.8" cy="21.8" rx="3.1" ry="3.5" fill={ink} />
        <circle cx="18.1" cy="20.5" r="1.1" fill="#ffffff" opacity="0.9" />
        <circle cx="26.9" cy="20.5" r="1.1" fill="#ffffff" opacity="0.9" />
        <ellipse
          cx="13.2"
          cy="24.4"
          rx="1.9"
          ry="1.3"
          fill={skinShade}
          opacity="0.6"
        />
        <ellipse
          cx="29.6"
          cy="24.4"
          rx="1.9"
          ry="1.3"
          fill={skinShade}
          opacity="0.6"
        />
        <path
          d="M19.8 26.4C20.8 27.2 22 27.2 23 26.4"
          fill="none"
          stroke={ink}
          strokeWidth="1.3"
          strokeLinecap="round"
          opacity="0.75"
        />
      </g>
    </svg>
  );
}
