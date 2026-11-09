"use client";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/link"; 
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "#intro", label: "Home", num: "01" },
  { href: "#services", label: "Services", num: "02" },
  { href: "#skills", label: "Skills", num: "03" },
  { href: "#projects", label: "Works", num: "04" },
  { href: "#experience", label: "Experience", num: "05" },
  { href: "#about", label: "About", num: "06" },
  { href: "#resume", label: "Resume", num: "07" },
  { href: "#contact", label: "Contact", num: "08" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = usePathname();
  const isHomePage = location === "/";

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: -40 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } 
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      >
        <div className=" flex items-center justify-between">
          {/* Logo — left */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <Link href="/" className="text-xl font-bold gradient-text flex items-center gap-2">
              <span className="w-8 h-8 rounded-full glass-card flex items-center justify-center text-xs font-bold text-foreground">
                CH
              </span>
              <span>Minhaz</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation — right pill */}
          <div className="hidden md:flex items-center gap-1 glass-card rounded-full px-2 py-1.5">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href.startsWith("#") && !isHomePage ? "/" + link.href : link.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  index === 0
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                {link.label}
              </motion.a>
            ))}
            <div className="pl-2 pr-1">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile / SM Menu Trigger Button */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 text-foreground flex items-center gap-1.5 text-sm font-medium glass-card rounded-xl px-3 py-1.5"
            >
              <Menu size={18} />
              <span>Menu</span>
            </button>
          </div>
        </div>
      </motion.nav>
{/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-background text-foreground flex flex-col justify-between px-6 py-5 overflow-y-auto md:hidden"
          >
            {/* Top Bar inside Overlay */}
            <div className="flex items-center justify-between w-full">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                aria-label="Home"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-xs font-bold text-foreground"
              >
                CH
              </Link>

              <div className="flex items-center gap-4">
                <ThemeToggle />
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-base font-semibold text-foreground hover:text-primary transition-colors"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Links List with staggered top-to-bottom drop animation */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="flex flex-col gap-1 my-auto py-8 w-full"
            >
              {navLinks.map((link) => (
                <motion.div key={link.href} variants={itemVariants} className="w-fit">
                  <a
                    href={link.href.startsWith("#") && !isHomePage ? "/" + link.href : link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] text-foreground hover:text-primary active:text-primary transition-colors flex items-start gap-2"
                  >
                    <span>{link.label}</span>
                    <span className="text-sm sm:text-base font-medium text-primary mt-1">
                      {link.num}
                    </span>
                  </a>
                </motion.div>
              ))}
            </motion.div>

            {/* Footer / Socials inside overlay */}
            <div className="flex flex-col gap-4 pb-2 w-full">
              <span className="text-sm text-primary font-medium">Socials</span>
              <div className="flex items-center gap-5 text-lg font-semibold text-foreground">
                <a href="https://github.com/ChibgatullahMinhaz" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                  GitHub
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                  LinkedIn
                </a>
                <a href="mailto:chminhaz.info@gmail.com" className="hover:text-primary transition-colors">
                  Email
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};