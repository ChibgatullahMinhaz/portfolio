"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MoveUp } from "lucide-react";
import { footerExploreLinks as navigateLinks, elsewhereLinks } from "@/db";

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

  if (!time) return null;
  return <p className="text-sm text-muted-foreground">{time} GMT+6</p>;
};

export const Footer = () => {
  return (
    <footer className="border-t border-border pt-16 md:pt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-medium tracking-[0.25em] uppercase text-muted-foreground mb-5">
              Say hello
            </p>
            <a
              href="mailto:chminhaz.info@gmail.com"
              className="text-xl sm:text-2xl font-semibold underline decoration-border underline-offset-4 hover:text-primary hover:decoration-primary transition-colors"
            >
              chminhaz.info@gmail.com
            </a>
            <p className="text-sm text-muted-foreground mt-5 max-w-xs leading-relaxed">
              Open to freelance work across web and mobile. A quick email is all it takes to get started.
            </p>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            aria-label="Footer navigation"
          >
            <p className="text-xs font-medium tracking-[0.25em] uppercase text-muted-foreground mb-5">
              Explore
            </p>
            <ul className="space-y-3">
              {navigateLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-xs font-medium tracking-[0.25em] uppercase text-muted-foreground mb-5">
              Elsewhere
            </p>
            <ul className="space-y-3 mb-8">
              {elsewhereLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                  >
                    {link.label}
                    {!link.href.startsWith("mailto") && <ArrowUpRight size={13} />}
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground">Chittagong, Bangladesh</p>
            <LocalTime />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          aria-hidden="true"
          className="mt-20 md:mt-28 font-bold uppercase leading-[0.85] tracking-tight text-foreground/90 select-none"
          style={{ fontSize: "clamp(2.75rem, 10.5vw, 9.5rem)" }}
        >
          Chibgatullah
          <br />
          Minhaz
        </motion.p>

        <div className="mt-10 border-t border-border/50 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Chibgatullah Minhaz. Crafted with coffee in Chittagong.
          </p>
          <div className="flex items-center gap-6">
            <p className="hidden md:block text-xs text-muted-foreground">
              Built with Next.js, Tailwind CSS & Framer Motion
            </p>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-xs font-medium inline-flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              Back to top
              <MoveUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
