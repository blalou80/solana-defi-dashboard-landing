import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Solana DeFi Dashboard — A clearer view of DeFi risk";

/* The crystal mark at brand scale — same geometry as icon.svg and the
   hero gem. Black field, white type, purple facets, one green pulse. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "80px 90px",
          backgroundColor: "#000000",
          color: "#f4f5fa",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* horizon glow */}
        <div
          style={{
            position: "absolute",
            bottom: "-260px",
            left: "50%",
            width: "900px",
            height: "520px",
            marginLeft: "-450px",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(153,69,255,0.22) 0%, transparent 65%)",
          }}
        />

        {/* crystal mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "84px",
          }}
        >
          <svg width="300" height="300" viewBox="0 0 64 64">
            <polygon points="32,4 54,26 32,60 10,26" fill="#0a0b12" />
            <polygon points="32,4 54,26 32,60 10,26" fill="none" stroke="#9945ff" strokeWidth="2" />
            <polyline points="10,26 32,20 54,26" fill="none" stroke="#9945ff" strokeWidth="1.2" opacity="0.8" />
            <line x1="32" y1="20" x2="32" y2="60" stroke="#9945ff" strokeWidth="1" opacity="0.55" />
            <polygon points="32,4 32,20 10,26" fill="#9945ff" opacity="0.35" />
            <polygon points="32,4 32,20 54,26" fill="#c05af5" opacity="0.5" />
            <circle cx="44" cy="36" r="2" fill="#14f195" />
          </svg>
        </div>

        {/* copy */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "26px", color: "#99a1b8", letterSpacing: "6px" }}>
            SOLANA DEFI DASHBOARD
          </div>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              lineHeight: 1.12,
              marginTop: "18px",
              maxWidth: "620px",
            }}
          >
            A clearer view of DeFi risk.
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#99a1b8",
              marginTop: "26px",
            }}
          >
            Paste a wallet. See the risk.
          </div>
          <div
            style={{
              fontSize: "17px",
              color: "#4b5168",
              marginTop: "44px",
              letterSpacing: "1px",
            }}
          >
            Independent · Open source · Illustrative sample data throughout
          </div>
        </div>
      </div>
    ),
    size
  );
}
