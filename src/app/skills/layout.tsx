import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Skills",
  description:
    "Technical skills of Chibgatullah Minhaz — React, Next.js, Node.js, TypeScript, React Native, PostgreSQL, MongoDB, Firebase, Docker, CI/CD, and AI/ML integrations.",
  path: "/skills",
  keywords: [
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "React Native",
    "PostgreSQL",
    "MongoDB",
    "Docker",
  ],
});

export default function SkillsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
