"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { InteractiveDotGrid } from "./InteractiveDotGrid";
import { marqueeSkills } from "@/db";

const socials = [
  { icon: FaGithub, href: "https://github.com/ChibgatullahMinhaz", label: "GitHub" },
  { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Mail, href: "mailto:chminhaz.info@gmail.com", label: "Email" },
];

export const Hero = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Dhaka",
        })
      );
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="intro" className="relative min-h-screen flex flex-col overflow-hidden hero-gradient">
      <div className="floating-orb w-96 h-96 bg-primary top-20 -left-48" />
      <div className="floating-orb w-72 h-72 bg-accent bottom-20 -right-36" style={{ animationDelay: "-4s" }} />

      <InteractiveDotGrid />

      <div className="relative z-10 px-6 pt-24 md:pt-28 pb-16 md:pb-20 flex-1 flex flex-col justify-between w-full max-w-7xl mx-auto">
        {/* Top row: status pill + location/time */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-card/80 backdrop-blur border border-border text-sm shadow-soft"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
            </span>
            <span className="font-medium text-foreground">Now:</span>
            <span className="text-muted-foreground">Currently working on Freelancing</span>
          </motion.span>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-xs md:text-sm tracking-wider text-muted-foreground"
          >
            Chittagong, Bangladesh {time && <span>· {time} GMT+6</span>}
          </motion.p>
        </div>

        {/* Middle: name + role */}
        <div className="mt-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-balance"
          >
            Chibgatullah Minhaz
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-4 text-xl sm:text-2xl md:text-4xl font-semibold gradient-text"
          >
            Full Stack & Mobile Developer
          </motion.p>
        </div>

        {/* Bottom row: description left, CTAs + socials right */}
        <div className="mt-8 md:mt-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8 md:gap-10">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-base md:text-lg text-muted-foreground max-w-xl text-balance"
          >
            I build modern, responsive web and mobile experiences with the MERN/PERN stacks and
            React Native — crafting scalable platforms and cross-platform apps with clean,
            maintainable code.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-wrap items-center gap-4"
          >
            <motion.a
              href="#projects"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-primary-foreground glow-primary transition-all"
              style={{ background: "var(--gradient-primary)" }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              View My Work
              <ArrowUpRight size={18} />
            </motion.a>
            <motion.a
              href="#contact"
              className="px-7 py-3.5 rounded-full font-medium border border-border bg-card hover:bg-secondary transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Get in Touch
            </motion.a>

            <div className="flex items-center gap-3 lg:ml-4">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Skills marquee — left to right, pauses on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 border-y border-border/60 bg-card/40 backdrop-blur-sm overflow-hidden group"
      >
        <div className="flex w-max animate-marquee group-hover:paused py-4">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
              {marqueeSkills.map((skill) => (
                <span
                  key={`${copy}-${skill}`}
                  className="flex items-center font-mono text-xs md:text-sm tracking-[0.2em] uppercase text-muted-foreground"
                >
                  <span className="px-6">{skill}</span>
                  <span className="text-primary">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
