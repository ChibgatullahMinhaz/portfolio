// "use client";
// import { motion } from "framer-motion";
// import { ThemeToggle } from "./ThemeToggle";
// import { Menu, X } from "lucide-react";
// import { useState } from "react";
// import Link from "next/link"; 
// import { usePathname } from "next/navigation";
// import { NavLink } from "./NavLink";
// const navLinks = [
//   { href: "#about", label: "About" },
//   { href: "#skills", label: "Skills" },
//   { href: "#services", label: "Services" },
//   { href: "#projects", label: "Projects" },
//   { href: "/portfolio", label: "Portfolio", isPage: true },
//   { href: "#contact", label: "Contact" },
// ];

// export const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = usePathname();
//   const isHomePage = location === "/";

//   const handleNavClick = (href: string, isPage?: boolean) => {
//     if (isPage) return; // Let Link handle it
    
//     if (!isHomePage && href.startsWith("#")) {
//       // Navigate to home first, then scroll
//       window.location.href = "/" + href;
//       return;
//     }
//   };

//   return (
//     <motion.nav
//       initial={{ y: -100, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//       className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
//     >
//       <div className="max-w-6xl mx-auto">
//         <div className="glass-card rounded-2xl px-6 py-3 flex items-center justify-between">
//           <motion.div whileHover={{ scale: 1.02 }}>
//             <Link href="/" className="text-xl font-bold gradient-text">
//               Ch Minhaz
//             </Link>
//           </motion.div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-8">
//             {navLinks.map((link, index) => (
//               link.isPage ? (
//                 <motion.div
//                   key={link.href}
//                   initial={{ opacity: 0, y: -20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.1 * index }}
//                 >
//                   <NavLink
//                     href={link.href}
//                     className="text-muted-foreground hover:text-foreground transition-colors relative group"
//                   >
//                     {link.label}
//                     <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
//                   </NavLink>
//                 </motion.div>
//               ) : (
//                 <motion.a
//                   key={link.href}
//                   href={link.href}
//                   className="text-muted-foreground hover:text-foreground transition-colors relative group"
//                   initial={{ opacity: 0, y: -20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.1 * index }}
//                   onClick={() => handleNavClick(link.href)}
//                 >
//                   {link.label}
//                   <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
//                 </motion.a>
//               )
//             ))}
//             <ThemeToggle />
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden flex items-center gap-4">
//             <ThemeToggle />
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="p-2 text-foreground"
//             >
//               {isOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="md:hidden mt-2 glass-card rounded-2xl p-4"
//           >
//             {navLinks.map((link) => (
//               link.isPage ? (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   className="block py-3 text-muted-foreground hover:text-foreground transition-colors"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   {link.label}
//                 </Link>
//               ) : (
//                 <a
//                   key={link.href}
//                   href={link.href}
//                   className="block py-3 text-muted-foreground hover:text-foreground transition-colors"
//                   onClick={() => {
//                     setIsOpen(false);
//                     handleNavClick(link.href);
//                   }}
//                 >
//                   {link.label}
//                 </a>
//               )
//             ))}
//           </motion.div>
//         )}
//       </div>
//     </motion.nav>
//   );
// };


"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link"; 
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "#home", label: "Home", num: "01" },
  { href: "#services", label: "Services", num: "02" },
  { href: "#skills", label: "Skills", num: "03" },
  { href: "#works", label: "Works", num: "04" },
  { href: "#experience", label: "Experience", num: "05" },
  { href: "#about", label: "About", num: "06" },
  { href: "#resume", label: "Resume", num: "07" },
  { href: "#contact", label: "Contact", num: "08" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = usePathname();
  const isHomePage = location === "/";

  const containerVariants = {
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

  const itemVariants = {
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
        <div className="max-w-6xl mx-auto">
          <div className="glass-card rounded-2xl px-6 py-3 flex items-center justify-between">
            <motion.div whileHover={{ scale: 1.02 }}>
              <Link href="/" className="text-xl font-bold gradient-text flex items-center gap-2">
                <span className="w-8 h-8 rounded-full glass-card flex items-center justify-center text-xs font-bold text-foreground">
                  CH
                </span>
                <span>Minhaz</span>
              </Link>
            </motion.div>

            {/* Desktop Navigation (Hidden on mobile, visible on md and up) */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href.startsWith("#") && !isHomePage ? "/" + link.href : link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors relative group text-sm"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  {link.label}
                </motion.a>
              ))}
              <ThemeToggle />
            </div>

            {/* Mobile / SM Menu Trigger Button (Visible only on mobile, hidden on md and up) */}
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
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md text-foreground flex flex-col justify-between px-6 py-6 overflow-y-auto md:hidden"
          >
            {/* Top Bar inside Overlay */}
            <div className="flex items-center justify-between w-full max-w-6xl mx-auto">
              <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full glass-card flex items-center justify-center text-xs font-bold text-foreground">
                  CH
                </div>
                <span className="text-lg font-bold gradient-text">Minhaz</span>
              </Link>

              <div className="flex items-center gap-3">
                <ThemeToggle />
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-1 text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors glass-card px-3 py-1.5 rounded-xl"
                >
                  <X size={18} />
                  <span>Close</span>
                </button>
              </div>
            </div>

            {/* Links List with staggered top-to-bottom drop animation */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="flex flex-col gap-2 my-auto py-8 max-w-6xl mx-auto w-full"
            >
              {navLinks.map((link) => (
                <motion.div key={link.href} variants={itemVariants} className="w-fit">
                  <a
                    href={link.href.startsWith("#") && !isHomePage ? "/" + link.href : link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-3xl sm:text-4xl font-light tracking-tight text-muted-foreground hover:text-foreground transition-colors flex items-baseline gap-3 group"
                  >
                    <span className="group-hover:translate-x-2 transition-transform duration-300">
                      {link.label}
                    </span>
                    <span className="text-xs sm:text-sm font-mono text-primary align-super">
                      {link.num}
                    </span>
                  </a>
                </motion.div>
              ))}
            </motion.div>

            {/* Footer / Socials inside overlay */}
            <div className="flex flex-col gap-3 pt-6 border-t border-border max-w-6xl mx-auto w-full">
              <span className="text-xs text-primary uppercase tracking-widest font-mono">
                Socials
              </span>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
                  GitHub
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
                  LinkedIn
                </a>
                <a href="mailto:example@gmail.com" className="hover:text-foreground transition-colors">
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