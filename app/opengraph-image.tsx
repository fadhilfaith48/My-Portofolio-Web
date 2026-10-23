import { ImageResponse } from "next/og";

// Social share card. Generated once at build time (static route), so it costs
// nothing at runtime and always matches the site's dark ice palette.
export const alt =
  "Fadhil Faith — Website Developer & Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#060e1c",
          backgroundImage:
            "radial-gradient(circle at 15% 10%, rgba(47,98,147,0.55), transparent 55%), radial-gradient(circle at 85% 90%, rgba(122,166,208,0.28), transparent 55%)",
          color: "#eaf2fb",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              backgroundColor: "#6ee7b7",
            }}
          />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#a6c5e4",
            }}
          >
            Portfolio
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 104,
              fontWeight: 700,
              letterSpacing: -4,
              lineHeight: 1,
            }}
          >
            Fadhil Faith
          </div>
          <div style={{ fontSize: 34, color: "#cfe0f2" }}>
            Website Developer & Software Engineer
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {["Laravel", "Next.js", "TypeScript", "MySQL"].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                padding: "10px 22px",
                borderRadius: 999,
                border: "1px solid rgba(166,197,228,0.35)",
                backgroundColor: "rgba(19,31,58,0.7)",
                fontSize: 24,
                color: "#eaf2fb",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
