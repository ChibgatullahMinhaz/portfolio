"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { experienceData as experience } from "@/db";

export const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" ref={ref} className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="text-primary font-mono text-sm">07</span>
          <span className="h-px w-12 bg-border" />
          <span className="font-mono text-sm tracking-widest text-muted-foreground uppercase">
            Experience
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight max-w-3xl mb-14 md:mb-20"
        >
          Building for real clients, end to end.
        </motion.h2>

        <div className="border-t border-border">
          {experience.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 + index * 0.1 }}
              className="grid md:grid-cols-12 gap-4 md:gap-8 py-8 md:py-10 border-b border-border"
            >
              <div className="md:col-span-3 font-mono text-xs text-muted-foreground md:pt-2">
                <p className="flex items-center gap-3">
                  {item.period}
                  {item.current && (
                    <span className="inline-flex items-center gap-1.5 text-primary">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                      </span>
                      Now
                    </span>
                  )}
                </p>
                <p className="mt-2 text-muted-foreground/70">{item.location}</p>
              </div>

              <div className="md:col-span-4">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{item.title}</h3>
                <p className="mt-2 text-sm md:text-base text-muted-foreground">{item.role}</p>
              </div>

              <div className="md:col-span-5">
                <p className="text-sm md:text-base text-foreground/85 leading-relaxed mb-4">
                  {item.description}
                </p>
                {item.highlights && (
                  <ul className="space-y-2">
                    {item.highlights.map((point) => (
                      <li key={point} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="h-px w-5 bg-primary" />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <Link
          href="#contact"
          className="group mt-10 inline-flex items-center gap-3 text-sm font-medium"
        >
          Let&apos;s work together
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowRight size={14} />
          </span>
        </Link>
      </div>
    </section>
  );
};
