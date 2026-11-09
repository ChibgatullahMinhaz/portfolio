"use client";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const CurrentFocus = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
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

  const meta = [
    { label: "Role", value: "Full Stack & Mobile Developer" },
    { label: "Experience", value: "1.5+ years, freelancing" },
    { label: "Based in", value: "Chittagong, Bangladesh", extra: time && `${time} GMT+6` },
  ];

  return (
    <section id="current-focus" ref={ref} className="relative border-t border-border py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-10 lg:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="lg:col-span-3 flex items-center gap-4 lg:items-start lg:pt-3"
        >
          <span className="text-primary font-mono text-sm">09</span>
          <span className="h-px w-12 bg-border mt-0 lg:mt-2.5" />
          <span className="font-mono text-sm tracking-widest text-muted-foreground uppercase">
            Current Focus
          </span>
        </motion.div>

        <div className="lg:col-span-9">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight max-w-3xl"
          >
            Right now: freelancing as a{" "}
            <span className="gradient-text">full stack</span> developer, open to new projects.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl"
          >
            For the past year and a half I have been building web and mobile products directly with
            clients. I take a project from the first screen to the deployed API, and I am still
            taking on new work today.
          </motion.p>

          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-10 grid gap-6 sm:grid-cols-3 border-t border-border pt-8 max-w-3xl"
          >
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase mb-2">
                  {item.label}
                </dt>
                <dd className="text-sm font-medium">
                  {item.value}
                  {item.extra && (
                    <span className="ml-2 font-mono text-xs text-muted-foreground">
                      · {item.extra}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </motion.dl>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link
              href="#contact"
              className="group mt-10 inline-flex items-center gap-3 text-sm font-medium"
            >
              Start a project with me
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                <ArrowRight size={14} />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
