
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SERVICES } from '../constants';
import { Service } from '../types';
import * as LucideIcons from 'lucide-react';

const ServiceIcon = ({ name }: { name: string }) => {
  const Icon = (LucideIcons as any)[name];
  return Icon ? <Icon size={32} /> : null;
};

// Typed ServiceCard with React.FC and the correct Service interface to handle mapping keys and props
const ServiceCard: React.FC<{ service: Service, idx: number }> = ({ service, idx }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: idx * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="p-8 glass rounded-[32px] group relative perspective-1000"
    >
      <div style={{ transform: 'translateZ(50px)' }}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16 transition-all group-hover:bg-blue-600/20 blur-xl" />
        
        <div className="mb-8 text-blue-500 bg-blue-500/10 w-fit p-4 rounded-2xl group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500 shadow-xl shadow-blue-500/0 group-hover:shadow-blue-500/20">
          <ServiceIcon name={service.icon} />
        </div>
        
        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">{service.title}</h3>
        <p className="text-base text-slate-400 mb-8 leading-relaxed font-light">
          {service.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {service.tools.map((tool: string) => (
            <span
              key={tool}
              className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-300 bg-white/5 rounded-xl border border-white/5 group-hover:border-blue-500/30 transition-colors"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      <motion.div
        className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/20 rounded-[32px] pointer-events-none transition-all duration-500"
      />
    </motion.div>
  );
};

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="mb-6"
          >
            <span className="text-blue-500 font-black uppercase tracking-[0.4em] text-xs">Capabilities</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black mb-6 tracking-tight"
          >
            Engineering <span className="text-slate-600">The Impossible.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg font-light"
          >
            We don't just write code; we architect experiences. Our multidisciplinary team combines technical rigor with design excellence.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, idx) => (
            <ServiceCard key={service.id} service={service} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};
