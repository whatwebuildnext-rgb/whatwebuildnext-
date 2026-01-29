
import React from 'react';
import { motion } from 'framer-motion';
import { TECH_STACK } from '../constants';

export const Technologies: React.FC = () => {
  return (
    <section id="tech" className="py-24 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-500 mb-12">
          Engineered With
        </h2>
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 opacity-50">
          {TECH_STACK.map((tech, idx) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ opacity: 1, scale: 1.1, color: '#60a5fa' }}
              className="text-2xl md:text-4xl font-black text-slate-400 cursor-default transition-all"
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
