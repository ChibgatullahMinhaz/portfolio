import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Works",
  description:
    "Selected projects by Chibgatullah Minhaz — web applications, mobile apps, AI automation, and backend systems built with React, Next.js, Node.js, and React Native.",
  path: "/works",
  keywords: [
    "portfolio projects",
    "web application case studies",
    "mobile app projects",
    "AI automation projects",
  ],
});

export default function WorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
