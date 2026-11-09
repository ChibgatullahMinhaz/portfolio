import type { Metadata } from "next";
import { projects } from "@/db";
import {
  createPageMetadata,
  jsonLdScript,
  personJsonLd,
  siteConfig,
} from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return {
      title: "Project Not Found",
      robots: { index: false, follow: false },
    };
  }

  return createPageMetadata({
    title: project.title,
    description: project.description,
    path: `/project/${project.id}`,
    keywords: [...project.tags, ...project.techStack],
  });
}

export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return children;
  }

  const projectUrl = `${siteConfig.url}/project/${project.id}`;
  const jsonLd = jsonLdScript({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${projectUrl}#work`,
        name: project.title,
        description: project.description,
        url: projectUrl,
        keywords: project.tags.join(", "),
        author: personJsonLd(),
        ...(project.github !== "#" ? { codeRepository: project.github } : {}),
        ...(project.live !== "#" ? { sameAs: project.live } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Works", item: `${siteConfig.url}/works` },
          { "@type": "ListItem", position: 3, name: project.title, item: projectUrl },
        ],
      },
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      {children}
    </>
  );
}
