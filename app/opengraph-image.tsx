import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(ellipse at 50% 0%, #16305a 0%, #0b1f3a 55%, #081729 100%)",
          padding: 80,
        }}
      >
        <div
          style={{
            width: 90,
            height: 90,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 35% 30%, #f0d9a3, #c9a45c 70%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <div style={{ width: 8, height: 42, background: "#0b1f3a" }} />
        </div>
        <div
          style={{
            fontSize: 58,
            fontWeight: 700,
            color: "#faf6ec",
            textAlign: "center",
            lineHeight: 1.15,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#c9a45c",
            marginTop: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          {siteConfig.city}
        </div>
      </div>
    ),
    { ...size }
  );
}
