"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { approachPoints, journeyData as journey, educationData as education } from "@/db";

const formatLocalTime = () =>
  new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Dhaka",
  }).format(new Date());

const LocalTime = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => setTime(formatLocalTime());
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  return <span>{time} GMT+6</span>;
};

const focusFacts = [
  { label: "Role", value: "Freelance Developer" },
  { label: "Based in", value: "Chittagong, Bangladesh" },
  { label: "Local time", value: <LocalTime /> },
  { label: "Status", value: "Open to new projects" },
];

const AboutPage = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-60px" });

  return (
    <div className="min-h-screen bg-background overflow-x-clip">
      <Navbar />

      {/* Hero statement */}
      <section ref={heroRef} className="pt-32 pb-16 md:pt-44 md:pb-28">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="text-sm font-mono text-muted-foreground">06</span>
            <span className="h-px w-12 bg-border" />
            <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
              About
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-8xl font-bold leading-[1.05] tracking-tight max-w-5xl"
          >
            A developer who likes{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">
              both ends
            </span>{" "}
            of the stack.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed"
          >
            I&apos;m Chibgatullah Minhaz, a freelance developer working from
            Chittagong. I picked up React first, stayed for the backend, and
            now I spend my days building products where the stylesheet and the
            schema get equal attention.
          </motion.p>
        </div>
      </section>

      {/* Profile card + who I am / approach */}
      <section className="border-t border-border/50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-14 lg:gap-10">
          {/* Profile card */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-32 rounded-3xl border border-border/60 bg-secondary/20 backdrop-blur-sm p-8 relative overflow-hidden"
            >
              <div className="floating-orb w-40 h-40 bg-primary/30 -top-10 -right-10" />

              <p className="text-xs font-mono tracking-[0.25em] uppercase text-muted-foreground mb-8 relative z-10">
                Profile
              </p>

              <div className="relative z-10">
                <p className="text-2xl font-bold tracking-tight">Chibgatullah Minhaz</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Full Stack &amp; Mobile Developer
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-border/50 relative z-10">
                <dl className="space-y-4">
                  {focusFacts.map((fact) => (
                    <div key={fact.label} className="flex items-center justify-between gap-4">
                      <dt className="text-xs text-muted-foreground">{fact.label}</dt>
                      <dd className="text-sm font-medium text-right">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-8 pt-6 border-t border-border/50 flex items-center justify-between relative z-10">
                <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  Currently freelancing
                </span>
                <MapPin size={14} className="text-primary" />
              </div>
            </motion.div>
          </div>

          {/* Copy sections */}
          <div className="lg:col-span-8 space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Who I am</h2>
              <p className="text-base md:text-lg text-foreground/85 leading-relaxed">
                A developer with roughly a year and a half of shipped client
                work behind me. My week moves between React and Next.js
                interfaces, Node and Express APIs, React Native screens and the
                occasional Dockerfile — whichever layer the project needs
                attention on. Working solo with clients has made me ruthless
                about clarity: clear estimates, clear commits, clear
                communication.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
                How I approach work
              </h2>
              <ul>
                {approachPoints.map((point, index) => (
                  <motion.li
                    key={point}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: index * 0.06 }}
                    className="flex gap-4 py-5 border-b border-border/50 first:border-t text-sm md:text-base text-foreground/85 leading-relaxed"
                  >
                    <span className="mt-3 h-px w-5 bg-primary shrink-0" />
                    {point}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                What I enjoy building
              </h2>
              <p className="text-base md:text-lg text-foreground/85 leading-relaxed">
                Products where every layer matters: dashboards people open
                every morning, mobile apps that survive flaky connections, and
                little automations that quietly save someone an hour a day. My
                favourite moment in a project is when the interface, the API
                and the deployment all click into each other.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Where I&apos;m going
              </h2>
              <p className="text-base md:text-lg text-foreground/85 leading-relaxed">
                Deeper into the stack and wider into delivery — better
                TypeScript discipline, stronger testing habits, and gradually
                more of the infrastructure between a laptop and production. The
                goal stays simple: keep being the developer a client can hand a
                whole product to.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="border-t border-border/50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-14 md:mb-20"
          >
            The path{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">
              so far.
            </span>
          </motion.h2>

          <div className="border-t border-border/50">
            {journey.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="grid md:grid-cols-12 gap-3 md:gap-8 py-8 md:py-10 border-b border-border/50"
              >
                <p className="md:col-span-3 font-mono text-xs text-muted-foreground md:pt-2">
                  {step.period}
                </p>
                <h3 className="md:col-span-4 text-xl md:text-2xl font-bold tracking-tight">
                  {step.title}
                </h3>
                <p className="md:col-span-5 text-sm md:text-base text-muted-foreground leading-relaxed">
                  {step.note}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Education — same full-width rhythm as the journey above */}
          <motion.h2
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-20 md:mt-28 mb-6"
          >
            Education.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl mb-10 md:mb-14"
          >
            Still a student on paper. Most of my learning, though, happened in
            codebases and client briefs — school just gave it structure.
          </motion.p>

          <div className="border-t border-border/50 mb-14">
            {education.map((entry, index) => (
              <motion.div
                key={entry.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="grid md:grid-cols-12 gap-3 md:gap-8 py-8 md:py-10 border-b border-border/50"
              >
                <p className="md:col-span-3 font-mono text-xs text-muted-foreground flex items-center gap-3 md:pt-2">
                  {entry.period}
                  {entry.ongoing && (
                    <span className="inline-flex items-center gap-1.5 text-primary">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                      </span>
                      Ongoing
                    </span>
                  )}
                </p>
                <h3 className="md:col-span-4 text-xl md:text-2xl font-bold tracking-tight">
                  {entry.title}
                </h3>
                <p className="md:col-span-5 text-sm md:text-base text-muted-foreground leading-relaxed">
                  {entry.note}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <Link
              href="/#experience"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              Read my experience
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-medium text-muted-foreground transition-all hover:border-primary hover:text-primary"
            >
              Contact me
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              View projects
              <ArrowUpRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default AboutPage;
