"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { spySections as sections } from "@/db";

export const ScrollSpyDots = () => {
  const [activeSection, setActiveSection] = useState("intro");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    if (window.scrollY < 50) {
      setActiveSection("intro");
      return;
    }

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(section.id);
        }
      }
    }
  }, []);

  useEffect(() => {
    // Browser scroll restoration sesh howar somoy dewar jonno small timeout
    const timer = setTimeout(() => {
      handleScroll();
    }, 150);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const activeIndex = sections.findIndex((s) => s.id === activeSection);

  const scrollUp = () => {
    if (activeIndex > 0) {
      scrollToSection(sections[activeIndex - 1].id);
    }
  };

  const scrollDown = () => {
    if (activeIndex < sections.length - 1 && activeIndex !== -1) {
      scrollToSection(sections[activeIndex + 1].id);
    }
  };

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center">
      <div className="glass-card py-4 px-2 rounded-full flex flex-col items-center gap-4 border border-border/50 shadow-lg backdrop-blur-md">
        
        {/* Up Arrow */}
        <button
          onClick={scrollUp}
          className="text-muted-foreground hover:text-foreground transition-colors p-1"
          aria-label="Scroll Up"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>

        <div className="w-[1px] h-4 bg-border/60" />

        {/* Dots List */}
        <div className="flex flex-col gap-3.5 items-center relative py-1">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            const isHovered = hoveredSection === section.id;

            return (
              <div
                key={section.id}
                className="relative flex items-center justify-end"
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection(null)}
              >
                {/* Popup Label on Hover */}
                <AnimatePresence>
                  {(isHovered || isActive) && (
                    <motion.div
                      initial={{ opacity: 0, x: 10, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-8 px-3 py-1.5 rounded-xl glass-card text-xs font-mono tracking-wider text-foreground whitespace-nowrap shadow-md border border-primary/30 pointer-events-none"
                    >
                      <span className="text-primary font-bold mr-1.5">
                        {section.label.split(" ")[0]}
                      </span>
                      <span>{section.label.split(" ")[1]}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Dot Button */}
                <button
                  onClick={() => scrollToSection(section.id)}
                  className="relative p-1.5 flex items-center justify-center group focus:outline-none"
                  aria-label={section.label}
                >
                  <div
                    className={`rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-3 h-3 bg-primary shadow-[0_0_10px_var(--primary)] scale-110"
                        : "w-2 h-2 bg-muted-foreground/40 group-hover:bg-muted-foreground group-hover:scale-125"
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>

        <div className="w-[1px] h-4 bg-border/60" />

        {/* Down Arrow */}
        <button
          onClick={scrollDown}
          className="text-muted-foreground hover:text-foreground transition-colors p-1"
          aria-label="Scroll Down"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

      </div>
    </div>
  );
};
