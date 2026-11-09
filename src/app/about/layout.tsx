import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description:
    "Learn about Chibgatullah Minhaz — a freelance full-stack & mobile developer from Chittagong, Bangladesh, his journey, product-building approach, and education.",
  path: "/about",
  keywords: ["about Chibgatullah Minhaz", "developer journey", "web developer Chittagong"],
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
