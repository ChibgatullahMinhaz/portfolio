import { ImageResponse } from "next/og";
import { projects } from "@/db";
import { OgImageMarkup } from "@/lib/og-image";
import { siteConfig } from "@/lib/seo";

export const alt = "Project by Chibgatullah Minhaz";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  return new ImageResponse(
    OgImageMarkup({
      title: project?.title ?? "Selected Work",
      subtitle: project?.subtitle ?? siteConfig.role,
    }),
    { ...size },
  );
}
