import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { ScrollSpyDots } from "@/components/ScrollSpyDots";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Skills } from "@/components/Skills";
import { WhatIDo } from "@/components/WhatIDo";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-background overflow-x-clip">
        <ScrollSpyDots />
        <Navbar />
        <Hero />
        <About />
        <WhatIDo />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
        <ScrollToTop />
      </div>   </>
  );
}
