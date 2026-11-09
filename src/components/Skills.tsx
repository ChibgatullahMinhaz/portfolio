"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "TypeScript", level: 92 },
      { name: "Tailwind CSS", level: 95 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 93 },
      { name: "Express", level: 90 },
      { name: "PostgreSQL", level: 88 },
      { name: "MongoDB", level: 90 },
    ],
  },
  {
    title: "DevOps & Tools",
    skills: [
      { name: "Docker", level: 88 },
      { name: "Prisma", level: 85 },
      { name: "Git", level: 92 },
      { name: "CI/CD", level: 80 },
    ],
  },
  {
    title: "AI & Automation",
    skills: [
      { name: "n8n", level: 90 },
      { name: "AI Agents", level: 85 },
      { name: "OpenAI API", level: 88 },
      { name: "LangChain", level: 80 },
    ],
  },
];

const techStack = [
  "React", "Node.js", "TypeScript", "PostgreSQL", "MongoDB", 
  "Docker", "Prisma", "n8n", "Express", "Next.js", 
  "Tailwind", "Redis", "GraphQL", "AWS", "Python"
];

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden bg-secondary/30">
      <div className="floating-orb w-80 h-80 bg-primary/30 -bottom-40 -left-40" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-primary font-mono text-sm mb-4 block"
            >
              02. SKILLS & TECH
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              Technologies I{" "}
              <span className="gradient-text">Work With</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              A comprehensive toolkit for building modern, scalable applications
            </motion.p>
          </div>

          {/* Animated Tech Stack Marquee */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="mb-16 overflow-hidden"
          >
            <div className="flex gap-4 animate-marquee">
              {[...techStack, ...techStack].map((tech, index) => (
                <span
                  key={index}
                  className="px-6 py-3 rounded-full bg-card border border-border text-sm font-medium whitespace-nowrap"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, catIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + catIndex * 0.1 }}
                className="glass-card rounded-2xl p-6"
              >
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {category.title}
                </h3>
                <div className="space-y-5">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{ 
                            duration: 1, 
                            delay: 0.5 + catIndex * 0.1 + skillIndex * 0.1,
                            ease: "easeOut"
                          }}
                          className="h-full rounded-full"
                          style={{ background: "var(--gradient-primary)" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  );
};
