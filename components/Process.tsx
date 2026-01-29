
import React from 'react';
import { motion } from 'framer-motion';
import { PROCESS } from '../constants';
import * as LucideIcons from 'lucide-react';

const ProcessIcon = ({ name }: { name: string }) => {
  const Icon = (LucideIcons as any)[name];
  return Icon ? <Icon size={24} /> : null;
};

export const Process: React.FC = () => {
  return (
    <section id="process" className="py-32 relative bg-black/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <span className="text-blue-500 font-black uppercase tracking-[0.4em] text-xs mb-6 block">Workflow</span>
          <h2 className="text-4xl md:text-5xl font-black mb-6">How We <span className="text-gradient">Ship Excellence.</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto font-light">
            Our Battle-tested methodology ensures your project stays on track, on budget, and beyond expectations.
          </p>
        </div>

        <div className="relative">
          {/* Connector Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {PROCESS.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-2xl shadow-blue-500/20 group hover:rotate-6 transition-transform">
                  <ProcessIcon name={step.icon} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  <span className="text-blue-500 mr-2 opacity-50">0{idx + 1}.</span>
                  {step.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed px-4">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
