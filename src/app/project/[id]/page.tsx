"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowLeft, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useParams } from "next/navigation";
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

const DetailRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="grid md:grid-cols-12 gap-6 md:gap-10 py-10 border-t border-border/50">
    <div className="md:col-span-4">
      <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
        {label}
      </span>
    </div>
    <div className="md:col-span-8">{children}</div>
  </div>
);

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full border border-border/60 bg-muted/30 px-4 py-1.5 text-sm text-foreground/90">
    {children}
  </span>
);

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const index = projects.findIndex((p) => p.id === id);
  const project = index >= 0 ? projects[index] : undefined;

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">
            404 — Lost
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            This project doesn&apos;t exist.
          </h1>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all"
          >
            <ArrowLeft size={16} />
            Back to all projects
          </Link>
        </div>
      </div>
    );
  }

  const Icon = project.icon;
  const categoryLabel =
    categories.find((c) => c.value === project.category)?.label ??
    project.category;
  const hasLinks = project.github !== "#" || project.live !== "#";
  const related = (project.related ?? [])
    .map((relId) => projects.find((p) => p.id === relId))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 2);

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
            className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-10"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/portfolio"
              className="hover:text-primary transition-colors"
            >
              Projects
            </Link>
            <span>/</span>
            <span className="text-foreground">{project.title}</span>
          </motion.nav>

          {/* Hero */}
          <motion.p
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="visible"
            className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4"
          >
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")} —— {categoryLabel}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
          >
            {project.title}
          </motion.h1>
          {project.subtitle && (
            <motion.p
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate="visible"
              className="font-mono text-sm text-muted-foreground mb-6"
            >
              {project.subtitle}
            </motion.p>
          )}
          <motion.p
            variants={fadeUp}
            custom={4}
            initial="hidden"
            animate="visible"
            className="max-w-2xl text-lg text-muted-foreground leading-relaxed"
          >
            {project.description}
          </motion.p>

          {/* Meta grid */}
          {project.meta && (
            <motion.div
              variants={fadeUp}
              custom={5}
              initial="hidden"
              animate="visible"
              className="mt-12 grid grid-cols-2 lg:grid-cols-4 border-y border-border/50 divide-x divide-border/50"
            >
              {(
                [
                  ["Role", project.meta.role],
                  ["Type", project.meta.type],
                  ["Status", project.meta.status],
                  ["Availability", project.meta.availability],
                ] as const
              ).map(([label, value]) => (
                <div key={label} className="px-5 py-6 first:pl-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
                    {label}
                  </p>
                  <p
                    className={`text-sm md:text-base font-medium ${
                      label === "Status" ? "text-primary" : ""
                    }`}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </motion.div>
          )}

          {/* Showcase card */}
          <motion.div
            variants={fadeUp}
            custom={6}
            initial="hidden"
            animate="visible"
            className="mt-12 md:mt-16"
          >
            <div
              className={`relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br ${project.gradient} p-8 md:p-14 min-h-[280px] md:min-h-[380px] flex flex-col justify-between`}
            >
              <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -left-10 -bottom-20 w-72 h-72 rounded-full bg-black/20 blur-3xl" />
              <div className="relative flex items-start justify-between gap-4">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-background/20 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/80 border border-white/30 rounded-full px-3 py-1">
                  {categoryLabel}
                </span>
              </div>
              <div className="relative">
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
                  {project.title}
                </h2>
                <p className="text-white/80 max-w-xl text-sm md:text-base leading-relaxed">
                  {project.subtitle ?? project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-white/90 bg-white/10 border border-white/20 rounded-full px-3 py-1 backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Detail rows */}
          <div className="mt-16 md:mt-24">
            {(project.overview ?? project.fullDescription) && (
              <DetailRow label="Overview">
                <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                  {project.overview ?? project.fullDescription}
                </p>
              </DetailRow>
            )}

            {project.myRole && (
              <DetailRow label="My role">
                <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                  {project.myRole}
                </p>
              </DetailRow>
            )}

            {project.problem && (
              <DetailRow label="The problem">
                <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                  {project.problem}
                </p>
              </DetailRow>
            )}

            {project.built && project.built.length > 0 && (
              <DetailRow label="What I built">
                <ul className="space-y-3">
                  {project.built.map((item) => (
                    <li key={item} className="flex items-start gap-4">
                      <span className="mt-[0.65em] h-px w-6 bg-primary shrink-0" />
                      <span className="text-muted-foreground leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </DetailRow>
            )}

            <DetailRow label="Key features">
              <div className="flex flex-wrap gap-2.5">
                {project.features.map((feature) => (
                  <Pill key={feature}>{feature}</Pill>
                ))}
              </div>
            </DetailRow>

            <DetailRow label="Technology stack">
              <div className="flex flex-wrap gap-2.5">
                {project.techStack.map((tech) => (
                  <Pill key={tech}>{tech}</Pill>
                ))}
              </div>
            </DetailRow>

            {project.implementation && project.implementation.length > 0 && (
              <DetailRow label="Implementation details">
                <ul className="space-y-3">
                  {project.implementation.map((item) => (
                    <li key={item} className="flex items-start gap-4">
                      <span className="mt-[0.65em] h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      <span className="text-muted-foreground leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </DetailRow>
            )}

            {project.outcome && (
              <DetailRow label="Outcome">
                <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                  {project.outcome}
                </p>
              </DetailRow>
            )}

            <DetailRow label="Links">
              {hasLinks ? (
                <div className="flex flex-wrap gap-4">
                  {project.github !== "#" && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border/60 px-5 py-2.5 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
                    >
                      <FaGithub size={16} />
                      Repository
                    </a>
                  )}
                  {project.live !== "#" && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border/60 px-5 py-2.5 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
                    >
                      <ExternalLink size={16} />
                      Live demo
                    </a>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground leading-relaxed">
                  No public demo or repository is listed for this project. If
                  you&apos;d like to know more,{" "}
                  <Link
                    href="/contact"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    get in touch
                  </Link>
                  .
                </p>
              )}
            </DetailRow>
          </div>

          {/* Related projects */}
          {related.length > 0 && (
            <div className="mt-24 md:mt-32">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-3">
                    Keep exploring
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                    Related work
                  </h2>
                </div>
                <Link
                  href="/portfolio"
                  className="hidden md:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  All projects
                  <ArrowUpRight size={16} />
                </Link>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {related.map((rel) => {
                  const RelIcon = rel.icon;
                  const relIndex = projects.findIndex((p) => p.id === rel.id);
                  return (
                    <Link
                      key={rel.id}
                      href={`/project/${rel.id}`}
                      className="group rounded-3xl border border-border/50 overflow-hidden hover:border-primary/50 transition-colors"
                    >
                      <div
                        className={`relative bg-gradient-to-br ${rel.gradient} h-44 md:h-52 flex items-end p-6`}
                      >
                        <div className="absolute inset-0 bg-black/10" />
                        <div className="relative w-12 h-12 rounded-xl bg-background/20 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                          <RelIcon className="w-6 h-6 text-white" />
                        </div>
                        <span className="absolute top-5 left-6 font-mono text-[10px] uppercase tracking-[0.25em] text-white/80">
                          {String(relIndex + 1).padStart(2, "0")} /{" "}
                          {String(projects.length).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="p-6">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                            {rel.title}
                          </h3>
                          <ArrowUpRight
                            size={18}
                            className="shrink-0 mt-1 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                          />
                        </div>
                        {rel.subtitle && (
                          <p className="text-sm text-muted-foreground mb-4">
                            {rel.subtitle}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-2">
                          {rel.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs font-mono text-muted-foreground border border-border/50 rounded-full px-3 py-1"
                            >
                              {tag}
                            </span>
                          ))}
                          {rel.tags.length > 3 && (
                            <span className="text-xs font-mono text-muted-foreground px-1 py-1">
                              +{rel.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* End CTA */}
          <div className="mt-24 md:mt-32 border-t border-border/50 pt-16 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">
              Building something similar?
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
              Let&apos;s work together.
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Get in touch
                <ArrowUpRight size={16} />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 px-7 py-3.5 text-sm font-semibold hover:border-primary hover:text-primary transition-colors"
              >
                View all projects
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default ProjectDetail;
