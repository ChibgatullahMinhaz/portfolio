/**
 * Shared markup for generated Open Graph / Twitter images.
 * ImageResponse (satori) only supports flexbox and a subset of CSS.
 */
export function OgImageMarkup({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#0E0F11",
        padding: 72,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          color: "#34D399",
          fontSize: 30,
          fontWeight: 600,
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 7,
            backgroundColor: "#34D399",
          }}
        />
        chibgatullahminhaz.dev
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            color: "#F6F7F8",
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.1,
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div style={{ color: "#9CA3AF", fontSize: 36, lineHeight: 1.3 }}>
            {subtitle}
          </div>
        ) : null}
      </div>
      <div style={{ color: "#34D399", fontSize: 26 }}>
        Full-Stack & Mobile Developer — MERN/PERN · React Native · AI
      </div>
    </div>
  );
}
