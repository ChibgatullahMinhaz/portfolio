"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

import { skillGroupsData as skillGroups } from "@/db";

const SkillsPage = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-60px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background overflow-x-clip">
      <Navbar />

      <section ref={heroRef} className="pt-32 pb-16 md:pt-40 md:pb-24 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="text-sm font-mono text-muted-foreground">03</span>
            <span className="h-px w-12 bg-border" />
            <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">Skills</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight max-w-4xl"
          >
            More than a logo wall.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">
              What each tool unlocks.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed"
          >
            Grouped by the kind of work they power, not the alphabetic order of
            vendor names. Open any row for a plain-language note on what those
            tools actually let me ship.
          </motion.p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6">
        <div className="border-t border-border/50">
          {skillGroups.map((group, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={group.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.04 * index }}
                className="border-b border-border/50"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left py-7 md:py-9 flex items-start gap-5 group"
                >
                  <span
                    className={`text-sm font-mono pt-1 transition-colors ${
                      isOpen ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                    }`}
                  >
                    {group.num}
                  </span>

                  <span
                    className={`flex-1 text-2xl md:text-4xl font-bold tracking-tight transition-colors ${
                      isOpen ? "text-primary" : "text-foreground group-hover:text-primary"
                    }`}
                  >
                    {group.title}
                  </span>

                  <span
                    className={`mt-1 shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                      isOpen
                        ? "border-primary text-primary"
                        : "border-border text-muted-foreground group-hover:border-primary group-hover:text-primary"
                    }`}
                  >
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </span>
                </button>

                <AnimatePresence initial={false} mode="wait">
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-10 pl-0 md:pl-11 grid md:grid-cols-2 gap-8">
                        <div>
                          <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">
                            {group.tagline}
                          </p>
                          <p className="text-sm md:text-base text-foreground/85 leading-relaxed mb-4">
                            {group.unlocks}
                          </p>
                          <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-2">
                            Seen in practice
                          </p>
                          <p className="text-sm text-muted-foreground">{group.proof}</p>
                        </div>

                        <div>
                          <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4">
                            In the toolkit
                          </p>
                          <ul className="flex flex-wrap gap-2">
                            {group.items.map((item) => (
                              <li
                                key={item}
                                className="px-3 py-1.5 rounded-full border border-border text-xs font-mono text-muted-foreground"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="border-t border-border/50 mt-16 py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl font-semibold"
          >
            That&apos;s the toolkit.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">
              Want to see it in use?
            </span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-8"
          >
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              Explore projects
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default SkillsPage;
