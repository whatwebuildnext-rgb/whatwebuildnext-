
import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Zap, ShieldCheck } from 'lucide-react';

const StatCard = ({ label, value, icon: Icon }: { label: string, value: string, icon: any }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-6 glass rounded-2xl border-white/5 flex flex-col items-center text-center"
  >
    <div className="mb-4 text-blue-500">
      <Icon size={32} />
    </div>
    <div className="text-3xl font-black text-white mb-1">{value}</div>
    <div className="text-xs uppercase tracking-widest text-slate-500 font-bold">{label}</div>
  </motion.div>
);

export const About: React.FC = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-blue-500 font-black uppercase tracking-[0.4em] text-xs mb-6 block">Our Mission</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-[1.1]">
              Engineered for the <span className="text-gradient">Next Generation</span> of Web.
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed font-light">
              Founded in 2024, What we build next. Solutions was born from a simple observation: the bridge between complex enterprise logic and intuitive user interface was often broken. We fixed it.
            </p>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed font-light">
              We specialize in <strong className="font-bold">"heavy-lifting"</strong> frontend engineering. When standard libraries aren't enough, we build custom solutions that push the boundaries of what's possible in a browser.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><Target size={20} /></div>
                <div>
                  <h4 className="font-bold text-white mb-1">Precision</h4>
                  <p className="text-xs text-slate-500">Pixel-perfect implementation across all viewports.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500"><Zap size={20} /></div>
                <div>
                  <h4 className="font-bold text-white mb-1">Velocity</h4>
                  <p className="text-xs text-slate-500">Rapid deployment cycles without sacrificing stability.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 lg:gap-8">
            <StatCard label="Deployments" value="10+" icon={Zap} />
            <StatCard label="Engineers" value="6+" icon={Users} />
            <StatCard label="Client Uptime" value="99.9%" icon={ShieldCheck} />
            <StatCard label="Awards" value="5" icon={Target} />
          </div>
        </div>
      </div>
    </section>
  );
};
