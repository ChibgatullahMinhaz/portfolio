"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { projects, categories } from "@/db";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function WorksPage() {
  const [active, setActive] = useState("all");

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of projects) map.set(p.category, (map.get(p.category) ?? 0) + 1);
    return map;
  }, []);

  const list = useMemo(
    () =>
      active === "all"
        ? projects
        : projects.filter((p) => p.category === active),
    [active],
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 md:pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <motion.nav
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-12"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground">Works</span>
          </motion.nav>

          {/* Heading */}
          <motion.p
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="visible"
            className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-primary inline-block" />
            The full record
          </motion.p>
          <motion.h1
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          >
            Every project,
            <br />
            <span className="gradient-text">catalogued.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={3}
            initial="hidden"
            animate="visible"
            className="max-w-2xl text-lg text-muted-foreground leading-relaxed"
          >
            The home page shows the highlights — this list is the complete
            ledger: what each build is, the part I played in it, and the stack
            underneath. Open any row for the full story.
          </motion.p>

          {/* Filters */}
          <motion.div
            variants={fadeUp}
            custom={4}
            initial="hidden"
            animate="visible"
            className="mt-12 flex flex-wrap items-center gap-3"
          >
            <button
              onClick={() => setActive("all")}
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-mono transition-colors ${
                active === "all"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border/60 text-muted-foreground hover:border-primary/60 hover:text-foreground"
              }`}
            >
              All
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded ${
                  active === "all"
                    ? "bg-primary-foreground/20"
                    : "bg-muted/60"
                }`}
              >
                {projects.length}
              </span>
            </button>
            {categories
              .filter((c) => c.value !== "all" && counts.has(c.value))
              .map((c) => (
                <button
                  key={c.value}
                  onClick={() => setActive(c.value)}
                  className={`inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-mono transition-colors ${
                    active === c.value
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border/60 text-muted-foreground hover:border-primary/60 hover:text-foreground"
                  }`}
                >
                  {c.label}
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded ${
                      active === c.value
                        ? "bg-primary-foreground/20"
                        : "bg-muted/60"
                    }`}
                  >
                    {counts.get(c.value)}
                  </span>
                </button>
              ))}
          </motion.div>

          {/* Archive table */}
          <div className="mt-12">
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-border/50 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              <span className="col-span-1">No.</span>
              <span className="col-span-4">Project</span>
              <span className="col-span-3">Type</span>
              <span className="col-span-2">Role</span>
              <span className="col-span-2">Technologies</span>
            </div>

            {list.map((project, i) => {
              const rowIndex = projects.findIndex((p) => p.id === project.id);
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                >
                  <Link
                    href={`/project/${project.id}`}
                    className="group grid md:grid-cols-12 gap-3 md:gap-4 py-7 border-b border-border/50 hover:bg-muted/20 md:px-3 md:-mx-3 rounded-lg transition-colors"
                  >
                    <span className="col-span-1 font-mono text-xs text-muted-foreground">
                      {String(rowIndex + 1).padStart(2, "0")}
                    </span>

                    <div className="col-span-4">
                      <span className="flex items-start gap-2 text-lg font-bold group-hover:text-primary transition-colors underline-offset-4 group-hover:underline">
                        {project.title}
                        <ArrowUpRight
                          size={16}
                          className="shrink-0 mt-1.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary"
                        />
                      </span>
                      {project.subtitle && (
                        <span className="block text-sm text-muted-foreground mt-1">
                          {project.subtitle}
                        </span>
                      )}
                    </div>

                    <div className="col-span-3">
                      <span className="block text-sm">
                        {project.meta?.type ??
                          categories.find((c) => c.value === project.category)
                            ?.label ??
                          project.category}
                      </span>
                      {project.meta && (
                        <span className="block font-mono text-xs text-muted-foreground mt-1">
                          {project.meta.status} · {project.meta.availability}
                        </span>
                      )}
                    </div>

                    <span className="col-span-2 text-sm text-muted-foreground">
                      {project.meta?.role ?? "Developer"}
                    </span>

                    <div className="col-span-2 flex flex-wrap gap-1.5 content-start">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono text-muted-foreground border border-border/50 rounded-full px-2.5 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="text-[11px] font-mono text-muted-foreground px-1 py-0.5">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* End hint */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 md:mt-24 border-t border-border/50 pt-12 flex flex-wrap items-center justify-between gap-6"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-2">
                Seen enough of the list?
              </p>
              <p className="text-lg font-medium">
                Every build here started as a conversation.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Start yours
              <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
