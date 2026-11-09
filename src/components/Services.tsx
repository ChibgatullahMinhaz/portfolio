"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Code2, 
  Database, 
  Bot, 
  Workflow, 
  Server, 
  Layers,
  Cpu,
  Cloud
} from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    description: "End-to-end web application development using MERN and PERN stacks with modern UI/UX design principles.",
    features: ["React & Next.js", "Node.js & Express", "MongoDB & PostgreSQL", "TypeScript"],
    gradient: "from-primary to-accent",
  },
  {
    icon: Server,
    title: "Backend Development",
    description: "Robust and scalable backend solutions with RESTful APIs, GraphQL, and microservices architecture.",
    features: ["REST & GraphQL APIs", "Express.js", "Prisma ORM", "Authentication & Security"],
    gradient: "from-accent to-primary",
  },
  {
    icon: Database,
    title: "Database Design",
    description: "Efficient database architecture with PostgreSQL, MongoDB, optimized queries, and data modeling.",
    features: ["Schema Design", "Query Optimization", "Data Migration", "Backup Strategies"],
    gradient: "from-primary via-accent to-primary",
  },
  {
    icon: Bot,
    title: "AI Integration",
    description: "Seamlessly integrate AI capabilities into your applications using OpenAI, LangChain, and custom models.",
    features: ["OpenAI & GPT", "LangChain", "Custom AI Models", "RAG Systems"],
    gradient: "from-accent via-primary to-accent",
  },
  {
    icon: Workflow,
    title: "AI Agents & Automation",
    description: "Build intelligent AI agents and automation workflows using n8n to streamline your business processes.",
    features: ["n8n Workflows", "AI Agents", "Task Automation", "API Integrations"],
    gradient: "from-primary to-accent",
  },
  {
    icon: Cloud,
    title: "DevOps & Deployment",
    description: "Containerization with Docker, CI/CD pipelines, and cloud deployment on AWS, GCP, or Azure.",
    features: ["Docker & Kubernetes", "CI/CD Pipelines", "Cloud Services", "Monitoring"],
    gradient: "from-accent to-primary",
  },
  {
    icon: Layers,
    title: "System Design",
    description: "Architect scalable, distributed systems with high availability, fault tolerance, and optimal performance.",
    features: ["Scalability Planning", "Load Balancing", "Caching Strategies", "Microservices"],
    gradient: "from-primary via-accent to-primary",
    highlight: true,
  },
  {
    icon: Cpu,
    title: "API Development",
    description: "Design and develop secure, well-documented APIs that power your applications and integrations.",
    features: ["RESTful Design", "Rate Limiting", "Documentation", "Versioning"],
    gradient: "from-accent via-primary to-accent",
  },
];

export const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 md:py-32 relative overflow-hidden">
      <div className="floating-orb w-80 h-80 bg-accent/30 bottom-0 left-0" />
      <div className="floating-orb w-64 h-64 bg-primary/20 top-1/4 right-0" />
      
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
              04. SERVICES
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              What I Can{" "}
              <span className="gradient-text">Build For You</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              From full-stack development to AI integration, I offer comprehensive solutions to bring your ideas to life
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + index * 0.08 }}
                className="group relative"
              >
                <div className={`glass-card rounded-2xl p-6 h-full relative overflow-hidden transition-all duration-500 hover:border-primary/50 ${service.highlight ? 'ring-2 ring-primary/30' : ''}`}>
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {service.highlight && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary">
                        Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="relative z-10">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform glow-primary"
                      style={{ background: "var(--gradient-primary)" }}
                    >
                      <service.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    
                    <h3 className="text-lg font-bold mb-2 group-hover:gradient-text transition-all">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
