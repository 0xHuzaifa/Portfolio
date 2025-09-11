'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('Frontend');

  const skillCategories = {
    'Frontend': [
      { name: 'React.js', level: 95, color: 'from-blue-500 to-cyan-500' },
      { name: 'Next.js', level: 90, color: 'from-gray-700 to-gray-900' },
      { name: 'TypeScript', level: 88, color: 'from-blue-600 to-blue-800' },
      { name: 'Tailwind CSS', level: 92, color: 'from-cyan-400 to-blue-500' },
      { name: 'JavaScript', level: 94, color: 'from-yellow-400 to-orange-500' },
      { name: 'HTML/CSS', level: 96, color: 'from-orange-500 to-red-500' },
    ],
    'Backend': [
      { name: 'Node.js', level: 90, color: 'from-green-500 to-green-700' },
      { name: 'Express.js', level: 88, color: 'from-gray-600 to-gray-800' },
      { name: 'Python', level: 85, color: 'from-blue-500 to-yellow-500' },
      { name: 'PostgreSQL', level: 87, color: 'from-blue-600 to-indigo-600' },
      { name: 'MongoDB', level: 89, color: 'from-green-600 to-emerald-600' },
      { name: 'Redis', level: 82, color: 'from-red-500 to-red-700' },
    ],
    'Full-Stack': [
      { name: 'MERN Stack', level: 92, color: 'from-green-500 to-blue-500' },
      { name: 'REST APIs', level: 94, color: 'from-purple-500 to-pink-500' },
      { name: 'GraphQL', level: 80, color: 'from-pink-500 to-rose-500' },
      { name: 'Docker', level: 78, color: 'from-blue-500 to-blue-700' },
      { name: 'AWS/Cloud', level: 75, color: 'from-yellow-500 to-orange-600' },
      { name: 'Git/GitHub', level: 93, color: 'from-gray-700 to-gray-900' },
    ],
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
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Technical <span className="text-blue-600">Skills</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive overview of my technical expertise across different domains
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Category Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:w-1/4"
          >
            <div className="space-y-4">
              {Object.keys(skillCategories).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`w-full text-left p-4 rounded-lg font-semibold transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Skills Display */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            key={activeCategory}
            className="lg:w-3/4 space-y-6"
          >
            {skillCategories[activeCategory as keyof typeof skillCategories].map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{skill.name}</h3>
                  <span className="text-sm font-medium text-gray-600">{skill.level}%</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                  >
                    <motion.div
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute right-0 top-0 h-full w-2 bg-white/30 rounded-full"
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Additional Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { number: '50+', label: 'Projects Completed' },
            { number: '3+', label: 'Years Experience' },
            { number: '20+', label: 'Technologies' },
            { number: '100%', label: 'Client Satisfaction' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-blue-600 mb-2"
              >
                {stat.number}
              </motion.div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;