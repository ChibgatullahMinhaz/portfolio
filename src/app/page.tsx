import type { Metadata } from "next";
import { About } from "@/components/About";
import { CTA } from "@/components/CTA";
import { CurrentFocus } from "@/components/CurrentFocus";
import { Footer } from "@/components/Footer";
import { SelectedWork } from "@/components/SelectedWork";
import { Ecosystem } from "@/components/Ecosystem";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Philosophy } from "@/components/Philosophy";
import { Process } from "@/components/Process";
import { ScrollSpyDots } from "@/components/ScrollSpyDots";
import { ScrollToTop } from "@/components/ScrollToTop";
import { WhatIDo } from "@/components/WhatIDo";
import { WhyWorkWithMe } from "@/components/WhyWorkWithMe";

// Title, description, and Open Graph inherit from the root layout;
// only the canonical URL is route-specific here.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-background overflow-x-clip lg:pr-14 xl:pr-20 2xl:pr-0">
        <ScrollSpyDots />
        <Navbar />
        <Hero />
        <About />
        <WhatIDo />
        <Philosophy />
        <Ecosystem />
        <SelectedWork />
        <Experience />
        <Process />
        <CurrentFocus />
        <WhyWorkWithMe />
        <CTA />
        <Footer />
        <ScrollToTop />
      </div>   </>
  );
}
