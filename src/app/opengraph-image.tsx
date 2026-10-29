import { ImageResponse } from "next/og";
import { site } from "@/content/site";

// Social-sharing image generated at build time from the text wordmark.
// Replace with an approved image file (opengraph-image.png) once brand assets exist.
export const alt = `${site.name}: community mediation awareness and access to justice in Nairobi, Kenya`;
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
          justifyContent: "center",
          padding: "80px",
          background: "#16384D",
          color: "#F7F6F2",
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: "0.2em" }}>AZARYA</div>
        <div style={{ fontSize: 30, letterSpacing: "0.18em", color: "#E6EBED", marginTop: 8 }}>
          JUSTICE AND MEDIATION HUB
        </div>
        <div style={{ width: 120, height: 8, background: "#1D6970", marginTop: 48, marginBottom: 48 }} />
        <div style={{ fontSize: 44, lineHeight: 1.3, maxWidth: 950 }}>{site.tagline}</div>
        <div style={{ fontSize: 28, color: "#E6EBED", marginTop: 24 }}>{site.location.display}</div>
      </div>
    ),
    { ...size },
  );
}
