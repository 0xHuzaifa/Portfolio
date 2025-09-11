'use client';

import { motion } from 'framer-motion';
import { Code2, Smartphone, Server, Database, Globe, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Services = () => {
  const services = [
    {
      icon: Code2,
      title: 'Full-Stack Development',
      description: 'End-to-end web application development using modern technologies like React, Node.js, and databases.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Smartphone,
      title: 'Frontend Development',
      description: 'Responsive and interactive user interfaces with React, Next.js, and modern CSS frameworks.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Server,
      title: 'Backend Development',
      description: 'Scalable server-side applications with RESTful APIs, authentication, and cloud deployment.',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Database,
      title: 'Database Design',
      description: 'Efficient database architecture and optimization for both SQL and NoSQL databases.',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: Globe,
      title: 'Web Applications',
      description: 'Custom web applications tailored to your business needs with modern architecture.',
      color: 'from-pink-500 to-pink-600',
    },
    {
      icon: Zap,
      title: 'Performance Optimization',
      description: 'Speed optimization, SEO implementation, and best practices for enhanced user experience.',
      color: 'from-yellow-500 to-yellow-600',
    },
  ];

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
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            My <span className="text-blue-600">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive development services to bring your digital vision to life
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="relative overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border-0 h-full group">
                  <CardContent className="p-8 text-center relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className={`inline-flex p-4 rounded-full bg-gradient-to-r ${service.color} shadow-lg mb-6`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </motion.div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                  
                  {/* Hover effect background */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full -translate-y-10 translate-x-10" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full translate-y-8 -translate-x-8" />
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;