const skin = "#b06c49";
const hairInk = "#2b2929";
const jacket = "#308c8b";

const hip = { transformBox: "view-box", transformOrigin: "20px 39px" } as const;
const shoulder = {
  transformBox: "view-box",
  transformOrigin: "28px 24px",
} as const;

export function Explorer() {
  return (
    <svg
      viewBox="0 0 40 64"
      className="h-full w-full overflow-visible"
      aria-hidden="true"
    >
      <ellipse
        cx="20"
        cy="60.5"
        rx="10.5"
        ry="2.2"
        fill="var(--scene-deep)"
        opacity="0.4"
      />
      <g
        style={{
          transform: "translateY(calc(var(--lift, 0) * -1.4px))",
        }}
      >
        <g
          style={{
            ...hip,
            transform: "rotate(calc(var(--swing, 0) * -17deg))",
          }}
        >
          <path
            d="M18.6 38C17.8 45.4 17 52 16.4 59.2"
            fill="none"
            stroke={hairInk}
            strokeWidth="3.4"
            strokeLinecap="round"
          />
        </g>
        <g
          style={{
            ...hip,
            transform: "rotate(calc(var(--swing, 0) * 17deg))",
          }}
        >
          <path
            d="M21.6 38C22.6 45.4 23.4 52 24 59.2"
            fill="none"
            stroke={hairInk}
            strokeWidth="3.4"
            strokeLinecap="round"
          />
        </g>

        <path
          d="M11.4 22.6C10.2 30.4 10 36 11 41.4 17 42.8 23 42.8 29 41.4 30 36 29.8 30.4 28.6 22.6 22.8 20.8 17.2 20.8 11.4 22.6"
          fill={jacket}
        />
        <path
          d="M6.2 24C3.6 26.6 2.6 31.4 3 36.4 4.4 37.4 6.4 37.6 8.4 36.8 8 32.2 8.6 27.8 10 24.6 8.8 23.8 7.4 23.5 6.2 24"
          fill={hairInk}
          opacity="0.9"
        />
        <path
          d="M11.4 22.8C9 24.4 7.6 28.8 7 35 6.8 37.2 7 38.8 7.6 40"
          fill="none"
          stroke={jacket}
          strokeWidth="4.4"
          strokeLinecap="round"
        />

        <g
          style={{
            ...shoulder,
            transform: "rotate(calc(var(--swing, 0) * 9deg))",
          }}
        >
          <path
            d="M28.6 23C31.6 24.8 33.2 29.2 33.6 33.6"
            fill="none"
            stroke={jacket}
            strokeWidth="4.4"
            strokeLinecap="round"
          />
          <g className="text-scene-glow" transform="translate(33.8 35.6)">
            <circle
              r="12"
              fill="currentColor"
              opacity="0.28"
              className="animate-flicker [filter:blur(6px)] motion-reduce:animate-none"
            />
            <circle r="3.2" fill="currentColor" opacity="0.9" />
            <path
              d="M-2.4 -3.2C-1 -5 1 -5 2.4 -3.2"
              fill="none"
              stroke={hairInk}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M0 -4.8C0.2 -6.8 -0.4 -8.4 -2.2 -9.4"
              fill="none"
              stroke={hairInk}
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </g>
        </g>

        <ellipse cx="20" cy="15.4" rx="8.4" ry="8.6" fill={skin} />
        <path
          d="M11.8 13.4C11.4 8 15.2 4.4 20 4.4 24.8 4.4 28.6 8 28.2 13.4 26.2 11 23.4 9.8 20 9.8 16.6 9.8 13.8 11 11.8 13.4"
          fill={hairInk}
        />
        <path
          d="M14.8 20.2C16.8 22.4 23.2 22.4 25.2 20.2"
          fill="none"
          stroke={hairInk}
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.7"
        />
      </g>
    </svg>
  );
}
