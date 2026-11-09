"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { servicesPageData as services } from "@/db";

const ServicesPage = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-60px" });

  return (
    <div className="min-h-screen bg-background overflow-x-clip">
      <Navbar />

      <section ref={heroRef} className="pt-32 pb-16 md:pt-40 md:pb-24 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="text-sm font-mono text-muted-foreground">02</span>
            <span className="h-px w-12 bg-border" />
            <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">Services</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight max-w-4xl"
          >
            Six ways I can help you{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">
              ship something real.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed"
          >
            Everything below is grounded in work I have actually done. No
            buzzword bingo, no services I offer to chase trends — web, mobile,
            backend, deployment. That&apos;s it.
          </motion.p>
        </div>
      </section>

      <section className="py-0">
        <div className="max-w-7xl mx-auto px-6">
          {services.map((service, index) => (
            <motion.article
              key={service.num}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: 0.05 * index }}
              className="border-b border-border/50 py-14 md:py-16 grid lg:grid-cols-12 gap-10 lg:gap-8"
            >
              <div className="lg:col-span-4">
                <p className="text-sm font-mono text-muted-foreground mb-4">{service.num}</p>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">{service.title}</h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                  {service.summary}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {service.stack.map((item) => (
                    <li
                      key={item}
                      className="px-3 py-1.5 rounded-full border border-border text-xs font-mono text-muted-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-4">
                <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-5">
                  Where it fits
                </h3>
                <ul className="space-y-3">
                  {service.fits.map((item) => (
                    <li key={item} className="text-sm text-foreground/85 flex gap-3">
                      <span className="mt-2 h-px w-5 bg-border shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4 mt-9">
                  Related work
                </h3>
                <ul className="space-y-3">
                  {service.related.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`/project/${item.id}`}
                        className="group inline-flex items-baseline gap-2 text-sm"
                      >
                        <span className="font-semibold group-hover:text-primary transition-colors">
                          {item.name}
                        </span>
                        <span className="text-muted-foreground">— {item.kind}</span>
                        <ArrowUpRight size={12} className="text-muted-foreground group-hover:text-primary transition-colors" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-4">
                <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-5">
                  What you receive
                </h3>
                <ul className="space-y-3">
                  {service.deliverables.map((item) => (
                    <li key={item} className="text-sm text-foreground/85 flex gap-3">
                      <span className="mt-2 h-px w-5 bg-primary shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="border-t border-border/50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight"
          >
            Sound like a fit?{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">
              Let&apos;s talk about it.
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              Start a project
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-sm font-medium text-muted-foreground transition-all hover:border-primary hover:text-primary"
            >
              Browse the work
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default ServicesPage;
