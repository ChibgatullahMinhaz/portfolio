import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ScrollToTop } from "@/components/ScrollToTop";

export const metadata = {
  title: "Experience - Chibgatullah Minhaz",
  description: "My freelance experience and how I work with clients.",
};

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
