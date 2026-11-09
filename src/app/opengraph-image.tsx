import { ImageResponse } from "next/og";
import { OgImageMarkup } from "@/lib/og-image";
import { siteConfig } from "@/lib/seo";

export const alt = "Chibgatullah Minhaz — Full-Stack & Mobile Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    OgImageMarkup({ title: siteConfig.name, subtitle: siteConfig.role }),
    { ...size },
  );
}
