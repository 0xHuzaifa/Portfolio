"use client";

import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { Github, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const PROJECTS = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "Full-stack MERN application with payment integration, user authentication, and admin dashboard.",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    category: "Full-Stack",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "Modern task management application with real-time updates and team collaboration features.",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    category: "Full-Stack",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description:
      "Responsive portfolio website with smooth animations and modern design principles.",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    category: "Frontend",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    id: 4,
    title: "REST API Service",
    description:
      "Scalable RESTful API with authentication, rate limiting, and comprehensive documentation.",
    image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg",
    tech: ["Node.js", "Express", "MongoDB", "JWT"],
    category: "Backend",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    id: 5,
    title: "Weather Dashboard",
    description:
      "Interactive weather dashboard with location-based forecasts and beautiful data visualization.",
    image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg",
    tech: ["Vue.js", "Chart.js", "Weather API"],
    category: "Frontend",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    id: 6,
    title: "Microservices Architecture",
    description:
      "Distributed system with microservices, Docker containers, and load balancing.",
    image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg",
    tech: ["Docker", "Kubernetes", "Node.js", "Redis"],
    category: "Backend",
    github: "https://github.com",
    live: "https://example.com",
  },
];

export function filterProjects(projects: typeof PROJECTS, category: string) {
  if (category === "All") return [...projects];
  const normalized = category.toLowerCase();
  return projects.filter(
    (project) => String(project.category).toLowerCase() === normalized
  );
}

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Full-Stack", "Frontend", "Backend"];

  const filteredProjects = useMemo(
    () => filterProjects(PROJECTS, activeCategory),
    [activeCategory]
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured <span className="text-blue-600">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A collection of projects showcasing my expertise in full-stack
            development, from concept to deployment.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center mb-12 gap-4"
        >
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setActiveCategory(category)}
              variant={activeCategory === category ? "default" : "outline"}
              className={`rounded-full px-6 py-2 transition-all duration-300 ${
                activeCategory === category
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600"
              }`}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          key={activeCategory}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              layout
              className="group"
            >
              <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 bg-white border-0">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm rounded-full"
                        asChild
                      >
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Live
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/30 hover:bg-white/20 text-white backdrop-blur-sm rounded-full"
                        asChild
                      >
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-4 w-4 mr-1" />
                          Code
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
