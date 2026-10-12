import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Hoysala Temples of Karnataka — hoysalatemples.online";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          backgroundColor: "#0b0c12",
          backgroundImage: "radial-gradient(circle at 50% 35%, #1c2030 0%, #0b0c12 70%)",
          color: "#ede7de",
          padding: "60px",
          position: "relative",
          fontFamily: "serif",
        }}
      >
        {/* Ornate Gold Border */}
        <div
          style={{
            position: "absolute",
            inset: "24px",
            border: "2px solid #b07512",
            opacity: 0.8,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: "32px",
            border: "1px dashed #6b7868",
            opacity: 0.4,
            display: "flex",
          }}
        />

        {/* Stellate 8-point Star Symbol */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "80px",
            height: "80px",
            marginBottom: "24px",
            backgroundColor: "#141724",
            border: "2px solid #e8c36a",
            borderRadius: "4px",
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#e8c36a"
            strokeWidth="1.5"
          >
            <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z" fill="#b07512" fillOpacity="0.3" />
          </svg>
        </div>

        {/* Small Caps Subtitle */}
        <div
          style={{
            fontSize: "20px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#e8c36a",
            marginBottom: "12px",
            display: "flex",
          }}
        >
          Sacred Stone Architecture • 12th–13th Century CE
        </div>

        {/* Main Title */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            color: "#ede7de",
            letterSpacing: "-0.02em",
            textAlign: "center",
            marginBottom: "8px",
            display: "flex",
          }}
        >
          Hoysala Temples
        </div>

        {/* Kannada Title */}
        <div
          style={{
            fontSize: "36px",
            color: "#c4bba8",
            marginBottom: "24px",
            display: "flex",
          }}
        >
          ಹೊಯ್ಸಳ ದೇವಾಲಯಗಳು • ಕರ್ನಾಟಕ
        </div>

        {/* Description Pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px 24px",
            backgroundColor: "#10121a",
            border: "1px solid #2d3244",
            borderRadius: "4px",
            fontSize: "18px",
            color: "#9e9787",
            letterSpacing: "0.05em",
          }}
        >
          13 Chloritic Schist Sanctuaries • Stellate Plans • Belur • Halebidu • Somanathapura
        </div>

        {/* Domain Footer */}
        <div
          style={{
            position: "absolute",
            bottom: "44px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "16px",
            color: "#6b7868",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          hoysalatemples.online
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
