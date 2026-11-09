"use client"
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ExternalLink,  Filter, X } from "lucide-react";
import { projects, categories, techFilters } from "@/db";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTech, setActiveTech] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProjects = projects.filter((project) => {
    const categoryMatch = activeCategory === "all" || project.category === activeCategory;
    const techMatch = activeTech.length === 0 || activeTech.some((tech) => 
      project.techStack.some((t) => t.toLowerCase().includes(tech.toLowerCase()))
    );
    return categoryMatch && techMatch;
  });

  const toggleTech = (tech: string) => {
    setActiveTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const clearFilters = () => {
    setActiveCategory("all");
    setActiveTech([]);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="container px-6 max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-primary font-mono text-sm mb-4 block"
            >
              MY WORK
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Portfolio <span className="gradient-text">Projects</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Explore my complete collection of projects, from web applications to mobile apps and AI solutions
            </motion.p>
          </motion.div>

          {/* Filter Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-between items-center mb-8"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <Filter size={18} />
                Filters
                {(activeCategory !== "all" || activeTech.length > 0) && (
                  <Badge variant="secondary" className="ml-2">
                    {(activeCategory !== "all" ? 1 : 0) + activeTech.length}
                  </Badge>
                )}
              </Button>
            </motion.div>
            
            <AnimatePresence>
              {(activeCategory !== "all" || activeTech.length > 0) && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <Button variant="ghost" onClick={clearFilters} className="gap-2 text-muted-foreground">
                    <X size={18} />
                    Clear all
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 32 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.3 }}
                className="glass-card rounded-2xl p-6 overflow-hidden"
              >
                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Category</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category, index) => (
                      <motion.div
                        key={category.value}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant={activeCategory === category.value ? "default" : "outline"}
                          size="sm"
                          onClick={() => setActiveCategory(category.value)}
                        >
                          {category.label}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Filter */}
                <div>
                  <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {techFilters.map((tech, index) => (
                      <motion.div
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + index * 0.03 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant={activeTech.includes(tech) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleTech(tech)}
                        >
                          {tech}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Projects Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => {
                const IconComponent = project.icon;
                return (
                  <motion.div
                    key={project.id}
                    variants={itemVariants}
                    layout
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="group"
                  >
                    <Link href={`/project/${project.id}`}>
                      <motion.div 
                        className="glass-card rounded-2xl overflow-hidden h-full relative hover:border-primary/50 transition-all duration-500 cursor-pointer"
                        whileHover={{ y: -8, scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        {/* Project Image */}
                        {project.images && project.images[0] && (
                          <div className="relative overflow-hidden">
                            <AspectRatio ratio={16 / 10}>
                              <motion.img
                                src={project.images[0]}
                                alt={project.title}
                                className="w-full h-full object-cover"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.5 }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                            </AspectRatio>
                            <motion.div 
                              className="absolute top-3 right-3"
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 }}
                            >
                              <span className="text-xs font-medium text-primary-foreground px-3 py-1 rounded-full glow-primary" style={{ background: "var(--gradient-primary)" }}>
                                {project.category}
                              </span>
                            </motion.div>
                          </div>
                        )}

                        <div className="p-6 relative z-10">
                          <div className="flex items-center gap-3 mb-4">
                            <motion.div 
                              className="w-10 h-10 rounded-xl flex items-center justify-center glow-primary"
                              style={{ background: "var(--gradient-primary)" }}
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.5 }}
                            >
                              <IconComponent className="w-5 h-5 text-primary-foreground" />
                            </motion.div>
                            <h3 className="text-lg font-bold group-hover:gradient-text transition-all line-clamp-1">
                              {project.title}
                            </h3>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {project.tags.slice(0, 3).map((tag, i) => (
                              <motion.span
                                key={tag}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="px-2 py-0.5 text-xs font-medium rounded-full bg-secondary text-secondary-foreground"
                              >
                                {tag}
                              </motion.span>
                            ))}
                            {project.tags.length > 3 && (
                              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-secondary text-secondary-foreground">
                                +{project.tags.length - 3}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-4 pt-3 border-t border-border">
                            <motion.span
                              whileHover={{ scale: 1.1 }}
                              onClick={(e) => {
                                e.preventDefault();
                                window.open(project.github, '_blank');
                              }}
                              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <FaGithub size={14} />
                              Code
                            </motion.span>
                            <motion.span
                              whileHover={{ scale: 1.1 }}
                              onClick={(e) => {
                                e.preventDefault();
                                window.open(project.live, '_blank');
                              }}
                              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                            >
                              <ExternalLink size={14} />
                              Demo
                            </motion.span>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* No Results */}
          <AnimatePresence>
            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-16"
              >
                <motion.p 
                  className="text-muted-foreground text-lg mb-4"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  No projects found with the selected filters
                </motion.p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Portfolio;
