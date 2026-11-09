import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ScrollToTop } from "@/components/ScrollToTop";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Hire Chibgatullah Minhaz for your next project — freelance full-stack web development, React Native mobile apps, and AI integration. Based in Chittagong, working worldwide.",
  path: "/contact",
  keywords: [
    "hire full stack developer",
    "hire React Native developer",
    "freelance developer contact",
  ],
});

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background overflow-x-clip">
      <Navbar />
      <main className="pt-20">
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
