"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { whyWorkReasons } from "@/db";

const iconMap: Record<string, React.ReactNode> = {
  collaboration: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
      <path d="M16 4.5v6M13 7.5h6" />
    </svg>
  ),
  ownership: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
      <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
    </svg>
  ),
  timelines: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  ),
  support: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M12 21c-4-3.5-8-6.5-8-11a5 5 0 019-3 5 5 0 019 3c0 4.5-4 7.5-8 11h-2z" />
      <path d="M9.5 11.5l2 2 3.5-3.5" />
    </svg>
  ),
};

const reasons: {
  title: string;
  description: string;
  icon: React.ReactNode;
}[] = whyWorkReasons.map((r) => ({
  title: r.title,
  description: r.description,
  icon: iconMap[r.icon],
}));

export function WhyWorkWithMe() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why-work" ref={ref} className="py-24 lg:py-32 relative border-y border-border/50 -mt-px">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="text-sm font-mono text-muted-foreground">10</span>
              <span className="h-px w-12 bg-border" />
              <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
                Why work with me
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight"
            >
              What you can{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">
                count on.
              </span>
            </motion.h2>
          </div>

          <div className="lg:col-span-8">
            <div className="grid sm:grid-cols-2">
              {reasons.map((reason, index) => (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.15 + index * 0.08 }}
                  className="border-t border-border/50 pt-6 pb-10 pr-8 group"
                >
                  <div className="flex items-start justify-between gap-4 mb-8">
                    <span className="text-sm font-mono text-muted-foreground group-hover:text-primary transition-colors">
                      0{index + 1}
                    </span>
                    <span className="text-muted-foreground group-hover:text-primary transition-colors">
                      {reason.icon}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {reason.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
