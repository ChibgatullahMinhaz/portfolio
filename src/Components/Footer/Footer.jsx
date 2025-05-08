import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

// React Icons
import { FaGithub, FaLinkedin, FaFacebook, FaYoutube, FaShopify } from "react-icons/fa";

export const Footer = () => {
  return (
    <motion.footer
      className="sticky text-base-content py-4 mt-10 px-4 md:px-6 lg:px-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
        {/* Logo + Social Icons Container */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center w-full gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <div className="text-2xl font-bold text-[#F8B90C]">
            <Link to="/">CH.Minhaz</Link>
          </div>

          {/* Social Icons */}
          <div className="flex flex-wrap justify-center gap-4 text-2xl">
            <Link to="https://github.com/chibgatullahminhaz" target="_blank" rel="noopener noreferrer" className="circle-icon">
              <FaGithub />
            </Link>
            <Link to="#" target="_blank" rel="noopener noreferrer" className="circle-icon">
              <FaLinkedin />
            </Link>
            <Link to="https://www.fiverr.com/chibgatullah_" target="_blank" rel="noopener noreferrer" className="circle-icon">
              <FaShopify />
            </Link>
            <Link to="https://www.facebook.com/profile.php?id=100073178942060" target="_blank" rel="noopener noreferrer" className="circle-icon">
              <FaFacebook />
            </Link>
            <Link to="#" target="_blank" rel="noopener noreferrer" className="circle-icon">
              <FaYoutube />
            </Link>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="text-center text-sm text-gray-500"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          © All Rights Reserved {new Date().getFullYear()} | Chibgatullah Minhaz
        </motion.div>
      </div>
    </motion.footer>
  );
};
