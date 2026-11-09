"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { resumeSnapshot as snapshot } from "@/db";

const ResumePage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div className="min-h-screen bg-background overflow-x-clip">
      <Navbar />

      <main ref={ref} className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="text-sm font-mono text-muted-foreground">07</span>
            <span className="h-px w-12 bg-border" />
            <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
              Resume
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight max-w-4xl"
          >
            The short version,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">
              on paper.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed"
          >
            Everything on this site as a one-page document — stack, recent
            work and how to reach me. Handy when you need to forward something
            to a teammate or a hiring manager.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10"
          >
            <a
              href="/resume.pdf"
              download
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              Download resume (PDF)
              <Download size={16} className="transition-transform group-hover:translate-y-0.5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 md:mt-20 border-t border-border/50"
          >
            {snapshot.map((row) => (
              <div
                key={row.label}
                className="grid sm:grid-cols-12 gap-2 sm:gap-6 py-6 border-b border-border/50"
              >
                <p className="sm:col-span-3 text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground sm:pt-1">
                  {row.label}
                </p>
                <p className="sm:col-span-9 text-sm md:text-base text-foreground/85">{row.value}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-medium text-muted-foreground transition-all hover:border-primary hover:text-primary"
            >
              Get in touch
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/works"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Browse the work
              <ArrowUpRight size={15} />
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default ResumePage;
