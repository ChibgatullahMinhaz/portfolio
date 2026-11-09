"use client";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Plus, X } from "lucide-react";

const roles = [
  {
    num: "01",
    title: "Frontend Development",
    tag: null,
    description:
      "The part of a product people see and touch — built to be quick, clear and consistent.",
    builds: [
      "Responsive web interfaces",
      "Reusable component libraries",
      "Validated forms and dashboards",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit"],
    responsibilities: [
      "Translating Figma designs into responsive, interactive React applications.",
      "Keeping apps fast with code splitting, memoization and lazy loading.",
      "Testing components and hooks with React Testing Library.",
    ],
    problem: "Slow, inconsistent or duplicated interfaces that are hard to change.",
  },
  {
    num: "02",
    title: "Full Stack Development",
    tag: "MERN / PERN",
    description:
      "A React interface connected to a Node.js and Express.js API, so the data path makes sense end to end.",
    builds: [
      "REST APIs behind React apps",
      "Feature-complete small products",
      "PostgreSQL & MongoDB data layers",
    ],
    technologies: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "Prisma"],
    responsibilities: [
      "Designing REST APIs with authentication, validation and rate limiting.",
      "Modeling data in PostgreSQL and MongoDB with Prisma and Mongoose.",
      "Deploying with Docker and CI/CD pipelines.",
    ],
    problem: "Disconnected frontends and backends that break when data flows change.",
  },
  {
    num: "03",
    title: "Mobile App Development",
    tag: "React Native",
    description:
      "Cross-platform mobile apps that feel native — one codebase, both stores, no compromise on polish.",
    builds: [
      "iOS & Android apps with React Native",
      "Offline-first data sync",
      "Push notifications & deep linking",
    ],
    technologies: ["React Native", "Expo", "Firebase", "TypeScript", "React Navigation"],
    responsibilities: [
      "Building cross-platform apps with shared business logic.",
      "Implementing offline-first storage and background sync.",
      "Integrating push notifications, deep links and native modules.",
    ],
    problem: "Maintaining two separate codebases for iOS and Android.",
  },
];

export const WhatIDo = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerWrapRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
  const [progress, setProgress] = useState(0);
  const [slotHeights, setSlotHeights] = useState<number[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  // Layout facts read from untransformed layout (offsetHeight / padding), so
  // the transforms applied below can never feed back into the measurement.
  const [layout, setLayout] = useState({ stickyH: 0, padTop: 0, headerH: 0, desktop: false });

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollableHeight = section.offsetHeight - window.innerHeight;

      if (rect.top > 0 || rect.bottom < window.innerHeight) return;

      const scrolled = Math.min(Math.max(-rect.top, 0), scrollableHeight);
      setProgress(scrollableHeight > 0 ? scrolled / scrollableHeight : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Measure each role block's natural height and the pinned-screen layout
  // (re-runs on expand / resize / font load).
  useEffect(() => {
    const measure = () => {
      setSlotHeights(slotRefs.current.map((el) => el?.offsetHeight ?? 0));

      const sticky = stickyRef.current;
      const content = contentRef.current;
      if (!sticky || !content) return;

      const next = {
        stickyH: sticky.clientHeight,
        padTop: parseFloat(getComputedStyle(content).paddingTop) || 0,
        // 0 below lg, where the header is hidden and lives inside the first role
        headerH: headerWrapRef.current?.offsetHeight ?? 0,
        desktop: window.innerWidth >= 1024,
      };
      setLayout((prev) =>
        prev.stickyH === next.stickyH &&
        prev.padTop === next.padTop &&
        prev.headerH === next.headerH &&
        prev.desktop === next.desktop
          ? prev
          : next
      );
    };

    const observers: ResizeObserver[] = [];
    slotRefs.current.forEach((el) => {
      if (!el) return;
      const ro = new ResizeObserver(measure);
      ro.observe(el);
      observers.push(ro);
    });
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => {
      observers.forEach((ro) => ro.disconnect());
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Continuous position across the role stack: 0 .. roles.length - 1
  const position = progress * (roles.length - 1);
  const activeIndex = Math.min(Math.max(Math.round(position), 0), roles.length - 1);
  const lastPosition = roles.length - 1;

  // The header scrolls away over the first role transition, so from role 02
  // on the number and the details start at the top of the screen.
  const headerExit = Math.min(Math.max(position, 0), 1);
  const stageShift = -layout.headerH * headerExit;

  // The CTA appears once the last role is (almost) the active one.
  const ctaOpacity = Math.min(Math.max((position - (lastPosition - 0.5)) / 0.5, 0), 1);

  // Cumulative offsets so the column slides by each slot's real height
  const offsets: number[] = [0];
  for (let i = 1; i < roles.length; i++) {
    offsets.push(offsets[i - 1] + (slotHeights[i - 1] ?? 0));
  }
  const baseIdx = Math.min(Math.floor(position), roles.length - 1);
  const frac = Math.min(Math.max(position - baseIdx, 0), 1);
  const columnY = -((offsets[baseIdx] ?? 0) + frac * (slotHeights[baseIdx] ?? 0));
  const viewportHeight = slotHeights[activeIndex] ? slotHeights[activeIndex] + 64 : undefined;

  // Room between the top of the number/column grid and the bottom of the
  // pinned screen. On desktop the last role also keeps its CTA row clear.
  const ctaReserve = layout.desktop && ctaOpacity > 0.5 ? 48 : 0;
  const roomHeight =
    layout.stickyH - layout.padTop - layout.headerH * (1 - headerExit) - ctaReserve;

  // When a detail is expanded and the active block is taller than the room,
  // lift only the details column (the big number stays put, like the
  // reference) by exactly the overflow. The slot's own bottom padding stays on
  // screen, so the last line always has clear breathing space below it.
  const activeBottom =
    (offsets[activeIndex] ?? 0) + (slotHeights[activeIndex] ?? 0) + columnY;
  const expandOverflow = activeBottom - roomHeight;
  const expandShift =
    expandedIndex !== null && layout.stickyH > 0 && expandOverflow > 0 ? -expandOverflow : 0;
  const isShifted = expandShift < 0;
  const headerOpacity = isShifted ? 0 : 1 - Math.min(position * 1.6, 1);

  const [prevActive, setPrevActive] = useState(activeIndex);
  if (prevActive !== activeIndex) {
    setPrevActive(activeIndex);
    if (expandedIndex !== null) setExpandedIndex(null);
  }

  // Opacity per role based on distance from the current position:
  // active = 1, next peeks from below dimmed, previous fades out upward.
  // While a detail is open only that role is shown, so nothing crowds it.
  const roleOpacity = (i: number) => {
    if (expandedIndex !== null) return i === expandedIndex ? 1 : 0;
    const d = i - position;
    if (d <= -1) return 0;
    if (d < 0) return 1 + d;
    if (d < 1) return 1 - d * 0.65;
    return Math.max(0, 0.35 - (d - 1) * 0.35);
  };

  // Expanding a role in the middle of a transition first snaps the scroll to
  // that role, so its details open in their final, fully visible position.
  const toggleDetail = (i: number) => {
    if (expandedIndex === i) {
      setExpandedIndex(null);
      return;
    }
    setExpandedIndex(i);
    const section = sectionRef.current;
    if (section && Math.abs(position - i) > 0.02) {
      const scrollable = section.offsetHeight - window.innerHeight;
      window.scrollTo({
        top: section.offsetTop + scrollable * (i / (roles.length - 1)),
        behavior: "smooth",
      });
    }
  };

  const numberStyle = (i: number) => {
    const d = i - position;
    return {
      opacity: Math.max(0, 1 - Math.abs(d)),
      transform: `translateY(${d * 80}px)`,
    };
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative"
      style={{ height: `${roles.length * 100}vh` }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen flex flex-col justify-start overflow-hidden"
      >
        <div
          ref={contentRef}
          className="max-w-7xl mx-auto px-6 w-full pb-6 pt-20 md:pt-28 lg:pt-24"
        >
          <div
            className="will-change-transform"
            style={{ transform: `translateY(${stageShift}px)` }}
          >
          {/* Section header — desktop only; it scrolls away with the first role
              transition. On mobile it travels with the role column (rendered
              inside the first role block). Fades out while an expanded detail
              lifts the column. */}
          <div
            ref={headerWrapRef}
            className="hidden lg:block pb-6 transition-opacity duration-200"
            style={{ opacity: headerOpacity }}
          >
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-3">
              <span className="text-primary font-mono text-sm">03</span>
              <span className="h-px w-12 bg-border" />
              <span className="font-mono text-sm tracking-widest text-muted-foreground uppercase">
                What I Do
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight max-w-3xl">
              Three ways I turn ideas into working software.
            </h2>
          </motion.div>
          </div>

          {/* Main content: number left, details right (stacked on mobile). */}
          <div className="grid lg:grid-cols-2 gap-2 lg:gap-8 items-start">
            {/* Big number — desktop only */}
            <div className="relative hidden lg:block h-32">
              {roles.map((role, i) => (
                <span
                  key={role.num}
                  style={numberStyle(i)}
                  className="absolute inset-0 text-[8rem] font-bold leading-none gradient-text select-none will-change-transform"
                >
                  {role.num}
                </span>
              ))}
            </div>

            {/* Role details — vertical stack that slides up on scroll */}
            <div
              className="relative"
              style={{ height: viewportHeight ?? "auto" }}
            >
              <div
                className="will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `translateY(${expandShift}px)` }}
              >
              <div
                className="will-change-transform"
                style={{ transform: `translateY(${columnY}px)` }}
              >
              {roles.map((role, i) => (
                <div
                  key={role.num}
                  ref={(el) => {
                    slotRefs.current[i] = el;
                  }}
                  style={{
                    opacity: roleOpacity(i),
                    pointerEvents: i === activeIndex ? "auto" : "none",
                  }}
                  className="pb-8 md:pb-12 will-change-[opacity]"
                >
                  {i === 0 && (
                    <div className="lg:hidden mb-8">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-primary font-mono text-xs">03</span>
                        <span className="h-px w-8 bg-border" />
                        <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                          What I Do
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold leading-[1.15] tracking-tight">
                        Three ways I turn ideas into working software.
                      </h2>
                    </div>
                  )}
                  <div className="flex flex-wrap items-center gap-3 mb-3 md:mb-2.5">
                    {/* Mobile number — inline with title */}
                    <span className="lg:hidden text-primary font-mono text-sm font-bold">
                      {role.num}
                    </span>
                    <h3 className="text-xl md:text-3xl font-bold">{role.title}</h3>
                    {role.tag && (
                      <span className="px-3 py-1 rounded-full border border-primary/40 text-primary font-mono text-xs tracking-wider uppercase">
                        {role.tag}
                      </span>
                    )}
                  </div>

                  <p className="text-muted-foreground text-sm md:text-lg leading-relaxed mb-4 max-w-lg">
                    {role.description}
                  </p>

                  <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-2.5">
                    What I build
                  </p>
                  <ul className="space-y-1.5 md:space-y-2 mb-4 md:mb-4">
                    {role.builds.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-xs md:text-base">
                        <span className="h-px w-5 bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => toggleDetail(i)}
                    className={`flex items-center justify-between w-full border-t pt-4 text-sm font-medium group transition-colors ${
                      expandedIndex === i ? "border-primary/50" : "border-border"
                    }`}
                  >
                    <span>The technical detail</span>
                    <span
                      className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                        expandedIndex === i
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary"
                      }`}
                    >
                      {expandedIndex === i ? <X size={14} /> : <Plus size={14} />}
                    </span>
                  </button>

                  <AnimatePresence>
                    {expandedIndex === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-5 space-y-5 md:pt-4 md:space-y-4">
                          <div>
                            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-2.5">
                              Technologies
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {role.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-3 py-1.5 rounded-full border border-border text-xs font-mono text-muted-foreground"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-2.5">
                              Responsibilities
                            </p>
                            <ul className="space-y-2">
                              {role.responsibilities.map((item) => (
                                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                                  <span className="h-px w-5 bg-primary mt-2.5 shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-2.5">
                              Problem it solves
                            </p>
                            <p className="text-sm text-muted-foreground">{role.problem}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Mobile CTA — the desktop one is pinned to the screen */}
                  {i === roles.length - 1 && (
                    <a
                      href="#contact"
                      className="lg:hidden mt-6 flex items-center gap-3 text-sm font-medium"
                    >
                      See how I can help
                      <span className="w-8 h-8 rounded-full border border-border flex items-center justify-center">
                        <ArrowRight size={14} />
                      </span>
                    </a>
                  )}
                </div>
              ))}
              </div>
              </div>
            </div>
          </div>
          </div>
        </div>

        {/* Bottom row, pinned on desktop: role list on the left, divider + CTA
            on the right. Absolute, so an expanded detail can use the full
            height without pushing it off screen. */}
        <div className="hidden lg:block absolute bottom-6 inset-x-0 pointer-events-none">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 gap-8 items-end">
            <div className="w-fit space-y-2 pointer-events-auto">
            {roles.map((role, i) => (
              <button
                key={role.num}
                onClick={() => {
                  const section = sectionRef.current;
                  if (!section) return;
                  const sectionTop = section.offsetTop;
                  const scrollable = section.offsetHeight - window.innerHeight;
                  const target = sectionTop + scrollable * (i / (roles.length - 1));
                  window.scrollTo({ top: target, behavior: "smooth" });
                }}
                className="flex items-center gap-4 group w-full text-left"
              >
                <span
                  className={`h-px transition-all duration-300 ${
                    i === activeIndex ? "w-10 bg-primary" : "w-6 bg-border group-hover:bg-muted-foreground"
                  }`}
                />
                <span
                  className={`text-base transition-colors duration-300 ${
                    i === activeIndex
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  {role.title}
                </span>
              </button>
            ))}
            </div>

            <div
              className="border-t border-border pt-4 transition-opacity duration-300"
              style={{
                opacity: ctaOpacity,
                pointerEvents: ctaOpacity > 0.5 ? "auto" : "none",
              }}
            >
              <a href="#contact" className="inline-flex items-center gap-3 text-sm font-medium group">
                See how I can help
                <span className="w-8 h-8 rounded-full border border-border flex items-center justify-center transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
                  <ArrowRight size={14} />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
