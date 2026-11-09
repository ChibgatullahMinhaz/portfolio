import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Resume",
  description:
    "Resume of Chibgatullah Minhaz — freelance full-stack & mobile developer. MERN/PERN, React Native, Firebase, Docker, CI/CD, and AI integration. Open to new projects.",
  path: "/resume",
  keywords: ["developer resume", "full stack developer CV", "freelance developer hire"],
});

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
