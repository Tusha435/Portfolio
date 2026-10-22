import { ImageResponse } from "next/og";

import { site } from "@/data/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#090B0F",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          color: "#F4F5F7",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, color: "#A0A7B4", letterSpacing: 3 }}>
          <div style={{ width: 10, height: 10, borderRadius: 10, background: "#8BAAFF" }} />
          {site.hero.eyebrow.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, fontWeight: 600, letterSpacing: -3, lineHeight: 1.04 }}>
          <span>{site.hero.headline[0]}</span>
          <span style={{ color: "#7A8390" }}>{site.hero.headline[1]}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#A0A7B4" }}>
          <span style={{ color: "#F4F5F7" }}>{site.name}</span>
          <span>{site.hero.focusAreas.join("  ·  ")}</span>
        </div>
      </div>
    ),
    size,
  );
}
