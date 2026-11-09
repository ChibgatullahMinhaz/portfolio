"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { processSteps as steps } from "@/db";

export const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" ref={ref} className="relative border-t border-border py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="text-primary font-mono text-sm">08</span>
          <span className="h-px w-12 bg-border" />
          <span className="font-mono text-sm tracking-widest text-muted-foreground uppercase">
            How I Work
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight max-w-3xl mb-14 md:mb-20"
        >
          Five steps from first call to live product.
        </motion.h2>

        <ol className="relative grid gap-10 md:gap-8 lg:grid-cols-5">
          {/* Horizontal line, drawn left to right once in view (desktop) */}
          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block absolute left-0 right-0 top-[5px] h-px origin-left bg-border"
          />
          {/* Vertical line (mobile / tablet) */}
          <motion.span
            aria-hidden
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden absolute left-[5px] top-1 bottom-1 w-px origin-top bg-border"
          />

          {steps.map((step, index) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.12 }}
              className="relative pl-8 lg:pl-0 lg:pr-6"
            >
              <span className="absolute left-0 top-0 h-[11px] w-[11px] rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
              <p className="font-mono text-xs text-muted-foreground lg:mt-8 mb-3">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="text-2xl font-bold tracking-tight mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};
