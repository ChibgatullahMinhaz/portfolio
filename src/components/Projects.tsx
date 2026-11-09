"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, ArrowRight } from "lucide-react";
import { projects } from "@/db";
import { Button } from "./ui/button";
import { AspectRatio } from "./ui/aspect-ratio";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const featuredProjects = projects.slice(0, 4);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
      <div className="floating-orb w-96 h-96 bg-primary/20 top-1/2 -right-48" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.1, type: "spring" }}
              className="text-primary font-mono text-sm mb-4 block"
            >
              03. FEATURED WORK
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              Projects That{" "}
              <span className="gradient-text">Define Me</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              A selection of projects showcasing my expertise in full-stack development and AI integration
            </motion.p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 gap-8"
          >
            {featuredProjects.map((project) => {
              const IconComponent = project.icon;
              return (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  className="group perspective-1000"
                >
                  <Link href={`/project/${project.id}`}>
                    <motion.div 
                      className="glass-card rounded-3xl overflow-hidden h-full relative hover:border-primary/50 transition-all duration-500 cursor-pointer"
                      whileHover={{ 
                        y: -10, 
                        scale: 1.02,
                        rotateY: 2,
                        rotateX: 2,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {/* Gradient Background on Hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                      
                      {/* Project Image */}
                      {project.images && project.images[0] && (
                        <div className="relative overflow-hidden">
                          <AspectRatio ratio={16 / 9}>
                            <motion.img
                              src={project.images[0]}
                              alt={project.title}
                              className="w-full h-full object-cover"
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.6 }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                          </AspectRatio>
                        </div>
                      )}

                      <div className="p-8 relative z-10">
                        {/* Icon */}
                        <motion.div 
                          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 glow-primary"
                          style={{ background: "var(--gradient-primary)" }}
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <IconComponent className="w-7 h-7 text-primary-foreground" />
                        </motion.div>

                        {/* Content */}
                        <h3 className="text-xl font-bold mb-3 group-hover:gradient-text transition-all">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-2">
                          {project.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tags.map((tag, i) => (
                            <motion.span
                              key={tag}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5 + i * 0.05 }}
                              whileHover={{ scale: 1.1 }}
                              className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground"
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>

                        {/* Links */}
                        <div className="flex items-center gap-4">
                          <motion.span
                            whileHover={{ scale: 1.1, x: 2 }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              window.open(project.github, '_blank');
                            }}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                          >
                            <FaGithub size={18} />
                            <span>Code</span>
                          </motion.span>
                          <motion.span
                            whileHover={{ scale: 1.1, x: 2 }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              window.open(project.live, '_blank');
                            }}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                          >
                            <ExternalLink size={18} />
                            <span>Live Demo</span>
                          </motion.span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {/* View All Projects Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <Link href="/works">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="gap-2 group">
                  View All Projects
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight size={18} />
                  </motion.div>
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
