import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0b0c12",
          borderRadius: "4px",
          border: "1.5px solid #b07512",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#e8c36a"
          strokeWidth="2"
        >
          <path
            d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z"
            fill="#d4a017"
            fillOpacity="0.8"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
