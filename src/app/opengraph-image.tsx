import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Zaim Imran, developer in Oslo";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#1b222a",
        color: "#e9ecef",
        padding: 72,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 40, color: "#f4de5d" }}>Z.</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", fontSize: 96, fontWeight: 800 }}>
          Zaim Imran
        </div>
        <div style={{ display: "flex", fontSize: 36, color: "#8a97a6" }}>
          Developer in Oslo. Platforms, data and the tools on top.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: 320,
          height: 10,
          background: "#f4de5d",
          borderRadius: 6,
          transform: "rotate(-1deg)",
        }}
      />
    </div>,
    size,
  );
}
