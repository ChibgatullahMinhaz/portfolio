import type { Metadata } from "next";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ScrollToTop } from "@/components/ScrollToTop";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Experience",
  description:
    "Freelance experience of Chibgatullah Minhaz — how he works with clients, projects delivered, and results across web, mobile, and AI projects.",
  path: "/experience",
  keywords: ["freelance developer experience", "client work", "project delivery"],
});

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-background overflow-x-clip">
      <Navbar />
      <main className="pt-32 md:pt-40">
        <Experience />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
