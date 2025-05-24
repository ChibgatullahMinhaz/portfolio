import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
        const scrollY = window.scrollY;
        const innerHeight = window.innerHeight;

      if (scrollY > innerHeight* 0.2) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <motion.button
      onClick={scrollToTop}
      className="fixed bottom-6  cursor-pointer right-6 z-50000 p-3 rounded-full bg-yellow-400 text-black shadow-lg hover:bg-yellow-500 transition-all"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
    >
      <FaArrowUp size={20} />
    </motion.button>
  );
};

export default ScrollToTopButton;
