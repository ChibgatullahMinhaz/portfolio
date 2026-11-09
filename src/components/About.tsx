"use client";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { aboutStats as stats } from "@/db";

const AnimatedNumber = ({
  value,
  suffix,
  decimals,
  start,
}: {
  value: number;
  suffix: string;
  decimals: number;
  start: boolean;
}) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!start) return;
    const duration = 1500;
    const startTime = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, value]);

  return (
    <span>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      <div className="floating-orb w-64 h-64 bg-accent/50 top-0 right-0" />
      <div className="floating-orb w-48 h-48 bg-primary/30 bottom-20 left-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4 mb-10"
          >
            <span className="text-primary font-mono text-sm">02</span>
            <span className="h-px w-12 bg-border" />
            <span className="font-mono text-sm tracking-widest text-muted-foreground uppercase">
              Who I Am
            </span>
          </motion.div>

          {/* Big statement */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight max-w-5xl"
          >
            I&apos;m Minhaz, a <span className="gradient-text">Full Stack Developer</span> from
            Chattogram, Bangladesh. For over 1.5 years I&apos;ve built scalable web & mobile
            applications with the <span className="gradient-text">MERN</span> and{" "}
            <span className="gradient-text">PERN</span> stacks — and today I&apos;m expanding that
            craft with AI-powered solutions.
          </motion.h2>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="origin-left h-px bg-border my-14 md:my-20"
          />

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-3">
                  <AnimatedNumber
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                    start={isInView}
                  />
                </div>
                <p className="text-sm md:text-base text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
