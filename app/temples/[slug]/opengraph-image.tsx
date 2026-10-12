import { ImageResponse } from "next/og";
import { getTempleBySlug } from "@/lib/temple-data";

export const runtime = "nodejs";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function TempleOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getTempleBySlug(slug);

  const temple = result?.temple || {
    name: "Hoysala Sanctuary",
    nameKannada: "ಹೊಯ್ಸಳ ದೇವಾಲಯ",
    town: "Karnataka",
    district: "Karnataka",
    yearBuilt: "12th Century CE",
    deity: "Sacred Shrine",
    unescoStatus: "Monument",
  };

  const isUnesco = temple.unescoStatus?.toLowerCase().includes("unesco") || temple.unescoStatus?.toLowerCase().includes("world heritage");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0b0c12",
          backgroundImage: "radial-gradient(circle at 75% 30%, #1c2030 0%, #0b0c12 70%)",
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

        {/* Top Bar with Star & Region */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "48px",
                height: "48px",
                backgroundColor: "#141724",
                border: "1.5px solid #e8c36a",
                borderRadius: "4px",
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#e8c36a"
                strokeWidth="1.5"
              >
                <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z" fill="#b07512" fillOpacity="0.4" />
              </svg>
            </div>
            <div
              style={{
                fontSize: "18px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#e8c36a",
                fontWeight: 600,
              }}
            >
              Hoysala Sacred Network
            </div>
          </div>

          {isUnesco && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 16px",
                backgroundColor: "#b07512",
                color: "#0b0c12",
                fontWeight: 700,
                fontSize: "14px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                borderRadius: "2px",
              }}
            >
              UNESCO World Heritage
            </div>
          )}
        </div>

        {/* Center: Temple Names & Details */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              fontSize: "56px",
              fontWeight: 700,
              color: "#ede7de",
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
            }}
          >
            {temple.name}
          </div>

          <div
            style={{
              fontSize: "32px",
              color: "#c4bba8",
            }}
          >
            {temple.nameKannada}
          </div>

          <div
            style={{
              fontSize: "20px",
              color: "#9e9787",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginTop: "4px",
            }}
          >
            {temple.town}, {temple.district} District • Built {temple.yearBuilt}
          </div>
        </div>

        {/* Bottom Bar: Facts & Domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid #2d3244",
            paddingTop: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              fontSize: "16px",
              color: "#9e9787",
            }}
          >
            <span>Deity: {temple.deity}</span>
            <span>•</span>
            <span>Soapstone Carving</span>
          </div>

          <div
            style={{
              fontSize: "16px",
              color: "#e8c36a",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            hoysalatemples.online
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
