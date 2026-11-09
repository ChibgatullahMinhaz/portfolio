"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { ecosystemMarqueeRows as marqueeRows, ecosystemAreas as ecosystem } from "@/db";

const Corners = () => (
  <>
    {["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map(
      (pos) => (
        <span
          key={pos}
          aria-hidden
          className={`pointer-events-none absolute h-3 w-3 border-primary opacity-0 transition-opacity duration-300 group-hover/item:opacity-100 ${pos}`}
        />
      )
    )}
  </>
);

export const Ecosystem = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="ecosystem" ref={ref} className="relative border-t border-border py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="text-primary font-mono text-sm">05</span>
          <span className="h-px w-12 bg-border" />
          <span className="font-mono text-sm tracking-widest text-muted-foreground uppercase">
            Technology Ecosystem
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight max-w-3xl"
        >
          My toolbox, and what it lets me ship.
        </motion.h2>
      </div>

      {/* Full-bleed marquee — rows run in opposite directions, hover pauses */}
      <div className="group my-12 md:my-16 space-y-2 md:space-y-4">
        {marqueeRows.map((row, rowIndex) => (
          <div key={rowIndex} className="overflow-hidden">
            <div
              className={`flex w-max group-hover:paused ${
                row.reverse ? "animate-marquee-reverse" : "animate-marquee"
              }`}
            >
              {[0, 1].map((copy) => (
                <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
                  {row.items.map((item) => (
                    <span
                      key={`${copy}-${item}`}
                      className="flex items-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground/85 whitespace-nowrap"
                    >
                      <span className="px-4 md:px-6">{item}</span>
                      <span className="text-primary">·</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 md:gap-x-12 lg:gap-x-16">
          {ecosystem.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + (index % 2) * 0.08 + Math.floor(index / 2) * 0.06 }}
              className="group/item relative grid grid-cols-[2.5rem_1fr] gap-x-2 border-t border-border px-1 py-6 md:py-7 transition-colors duration-300 hover:bg-secondary/40"
            >
              <Corners />
              <span className="font-mono text-xs text-muted-foreground pt-1.5">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <h3 className="text-lg md:text-xl font-semibold transition-colors duration-300 group-hover/item:text-primary">
                    {item.title}
                  </h3>
                  {item.tag && (
                    <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase text-right">
                      {item.tag}
                    </span>
                  )}
                </div>
                <p className="text-sm md:text-base text-foreground/85 leading-relaxed mb-3">
                  {item.description}
                </p>
                <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                  {item.stack.join(" / ")}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
