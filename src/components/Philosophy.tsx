"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { principlesData as principles } from "@/db";

export const Philosophy = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="philosophy" ref={ref} className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="text-primary font-mono text-sm">04</span>
          <span className="h-px w-12 bg-border" />
          <span className="font-mono text-sm tracking-widest text-muted-foreground uppercase">
            Development Philosophy
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight max-w-3xl mb-14 md:mb-20"
        >
          How I think about building software.
        </motion.h2>

        <div className="border-t border-border">
          {principles.map((item, index) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 + index * 0.1 }}
              className="grid md:grid-cols-12 gap-3 md:gap-8 py-8 md:py-10 border-b border-border"
            >
              <span className="md:col-span-1 font-mono text-xs text-muted-foreground pt-2">
                {item.num}
              </span>
              <h3 className="md:col-span-5 text-2xl md:text-3xl font-bold tracking-tight">
                {item.title}
              </h3>
              <p className="md:col-span-6 text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
