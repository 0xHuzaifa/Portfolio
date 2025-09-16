"use client";

import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import {
  Github,
  Eye,
  ExternalLink,
  Calendar,
  Users,
  Code2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProjectDetailsDrawer } from "@/components/ProjectDrawer";
import Image from "next/image";
import { PROJECTS } from "@/mock/Project";

export function filterProjects(projects: typeof PROJECTS, category: string) {
  if (category === "All") return [...projects];
  const normalized = category.toLowerCase();
  return projects.filter(
    (project) => String(project.category).toLowerCase() === normalized
  );
}

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<
    (typeof PROJECTS)[0] | null
  >(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const categories = ["All", "Full-Stack", "Frontend", "Backend"];

  const filteredProjects = useMemo(
    () => filterProjects(PROJECTS, activeCategory),
    [activeCategory]
  );

  const handleViewDetails = (project: (typeof PROJECTS)[0]) => {
    setSelectedProject(project);
    setIsDrawerOpen(true);
  };

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
    <section
      id="projects"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50/20"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Projects
            </span>
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
              className={`rounded-full px-6 py-2 transition-all duration-300 font-medium ${
                activeCategory === category
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                  : "border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 hover:shadow-md"
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              layout
              className="group h-full"
            >
              <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:border-blue-200 h-full flex flex-col">
                <div className="relative overflow-hidden">
                  <div className="relative w-full h-52">
                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      fill
                      className=" object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Project Status Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge
                      variant={
                        project.status === "Completed" ? "default" : "secondary"
                      }
                      className={`${
                        project.status === "Completed"
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-orange-500 hover:bg-orange-600"
                      } text-white border-none shadow-lg`}
                    >
                      {project.status}
                    </Badge>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-white/20 hover:bg-white/30 text-white backdrop-blur-md rounded-lg border border-white/30 shadow-lg"
                        asChild
                      >
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md rounded-lg border border-white/30 shadow-lg"
                        asChild
                      >
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <Badge
                      variant="outline"
                      className="ml-2 text-xs font-medium border-blue-200 text-blue-700 bg-blue-50"
                    >
                      {project.category}
                    </Badge>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed text-sm flex-1">
                    {project.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-md text-xs font-medium border border-blue-100"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {project.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {project.team}
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleViewDetails(project)}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg font-medium"
                    >
                      <Code2 className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Details Drawer */}
      <ProjectDetailsDrawer
        project={selectedProject}
        isOpen={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
      />
    </section>
  );
};

export default Projects;
