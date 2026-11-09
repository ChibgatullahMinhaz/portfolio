import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Services",
  description:
    "Freelance services by Chibgatullah Minhaz: full-stack web development with MERN/PERN, React Native mobile apps, backend systems, DevOps, and AI integrations — with clear deliverables.",
  path: "/services",
  keywords: [
    "freelance web development services",
    "MERN stack development",
    "React Native app development",
    "AI integration services",
    "backend development services",
  ],
});

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
