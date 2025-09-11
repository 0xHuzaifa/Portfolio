"use client";

import { motion } from "framer-motion";
import { Award, Coffee, Heart, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Profile from "../../public/ProfilePicture.png";
import Image from "next/image";

const About = () => {
  const achievements = [
    {
      icon: Award,
      title: "Certified Developer",
      description:
        "Full-stack development certifications from leading platforms",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Users,
      title: "Team Player",
      description:
        "Experienced in agile development and collaborative environments",
      color: "from-blue-500 to-purple-500",
    },
    {
      icon: Coffee,
      title: "Problem Solver",
      description:
        "Passionate about tackling complex challenges with innovative solutions",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Heart,
      title: "User-Focused",
      description:
        "Dedicated to creating exceptional user experiences and interfaces",
      color: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <section
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50"
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
            About <span className="text-blue-600">Me</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get to know the person behind the code
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Profile Image and Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative mx-auto lg:mx-0 w-80 h-80 rounded-2xl overflow-hidden shadow-2xl">
              {/* <img
                src={Profile}
                alt="Huzaifa Ahmed"
                className="w-full h-full object-cover"
              /> */}
              <Image
                src={Profile}
                alt="Huzaifa Ahmed"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent" />
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 blur-xl"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 blur-xl"
            />
          </motion.div>

          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Full Stack Developer & Tech Enthusiast
            </h3>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Hello! I'm Huzaifa Ahmed, a passionate full-stack developer with
                over 3 years of experience crafting digital solutions that make
                a difference. I specialize in modern web technologies and love
                turning complex problems into simple, beautiful, and intuitive
                solutions.
              </p>

              <p>
                My journey in tech started with curiosity about how websites
                work, which quickly evolved into a deep passion for creating
                exceptional user experiences. I'm constantly learning new
                technologies and staying up-to-date with industry trends to
                deliver cutting-edge solutions.
              </p>

              <p>
                When I'm not coding, you'll find me exploring new technologies,
                contributing to open-source projects, or sharing knowledge with
                the developer community. I believe in writing clean,
                maintainable code and creating applications that users love to
                interact with.
              </p>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Let's Work Together
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 h-full">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className={`inline-flex p-3 rounded-full bg-gradient-to-r ${achievement.color} shadow-lg mb-4`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </motion.div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {achievement.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      {achievement.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
