"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects, type Project } from "@/db";

const categoryLabel: Record<Project["category"], string> = {
  web: "Web application",
  android: "Mobile application",
  ai: "AI integration",
  backend: "Backend system",
};

const featured = projects.slice(0, 4);

const Thumb = ({ project }: { project: Project }) => {
  const image = project.images?.[0];
  const Icon = project.icon;
  return (
    <span
      aria-hidden
      className="relative inline-flex h-12 w-28 md:h-20 md:w-48 shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary-foreground/30 bg-background bg-cover bg-center"
      style={image ? { backgroundImage: `url(${image})` } : undefined}
    >
      {!image && (
        <span className="absolute inset-0 bg-gradient-to-br from-primary to-accent" />
      )}
      {!image && <Icon className="relative h-6 w-6 md:h-9 md:w-9 text-primary-foreground" />}
    </span>
  );
};

export const SelectedWork = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="selected-work" ref={ref} className="relative border-t border-border py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="text-primary font-mono text-sm">06</span>
          <span className="h-px w-12 bg-border" />
          <span className="font-mono text-sm tracking-widest text-muted-foreground uppercase">
            Selected Work
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight max-w-3xl"
        >
          Projects I&apos;m proud to have shipped.
        </motion.h2>
      </div>

      {/* Full-bleed project rows. Hovering one turns it into a scrolling band. */}
      <div className="mt-12 md:mt-16 border-t border-border">
        {featured.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
          >
            <Link
              href={`/project/${project.id}`}
              aria-label={`${project.title} — view project`}
              className="group/row relative block overflow-hidden border-b border-border"
            >
              <div className="flex items-center justify-center px-6 py-10 md:py-14 transition-opacity duration-300 group-hover/row:opacity-0 group-focus-visible/row:opacity-0">
                <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-center">
                  {project.title}
                </span>
              </div>

              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 flex items-center bg-primary text-primary-foreground opacity-0 transition-opacity duration-300 group-hover/row:opacity-100 group-focus-visible/row:opacity-100"
              >
                <div className="flex w-max animate-marquee" style={{ animationDuration: "28s" }}>
                  {[0, 1].map((copy) => (
                    <div key={copy} className="flex shrink-0 items-center">
                      {[0, 1, 2].map((n) => (
                        <span key={n} className="flex items-center gap-6 md:gap-10 pr-6 md:pr-10">
                          <span className="whitespace-nowrap text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
                            {project.title}
                          </span>
                          <Thumb project={project} />
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 md:gap-10 pt-10 md:pt-12">
          {featured.slice(0, 3).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.08 }}
            >
              <p className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase mb-3">
                {String(index + 1).padStart(2, "0")} · {categoryLabel[project.category]}
              </p>
              <p className="text-sm md:text-base text-foreground/85 leading-relaxed max-w-sm">
                {project.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-x-10 gap-y-4 mt-12">
          {[
            { label: "Explore all works", href: "/portfolio" },
            { label: "Get in touch about a project", href: "#contact" },
          ].map((link) => (
            <Link key={link.label} href={link.href} className="group inline-flex items-center gap-3 text-sm font-medium">
              {link.label}
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
