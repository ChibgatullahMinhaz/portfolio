"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight, Phone } from "lucide-react";

export const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden border-t border-border py-24 md:py-36"
    >
      <div className="floating-orb w-80 h-80 bg-primary/20 -bottom-40 left-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <span className="text-sm font-mono text-muted-foreground">11</span>
          <span className="h-px w-12 bg-border" />
          <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
            Let&apos;s talk
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight max-w-4xl mx-auto"
        >
          Got an idea?{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">
            Let&apos;s make it real.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed"
        >
          A project, a question, or just a hello — my inbox is open and I reply
          to everything.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
          >
            Start a conversation
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
          <a
            href="mailto:chminhaz.info@gmail.com"
            className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-sm font-medium text-muted-foreground transition-all hover:border-primary hover:text-primary"
          >
            chminhaz.info@gmail.com
            <ArrowUpRight size={16} />
          </a>
          <a
            href="tel:+8801825105554"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <Phone size={15} />
            Call me directly
          </a>
        </motion.div>
      </div>
    </section>
  );
};
