import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ScrollToTop } from "@/components/ScrollToTop";

export const metadata = {
  title: "Contact - Chibgatullah Minhaz",
  description:
    "Get in touch for freelance web and mobile development projects.",
};

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
