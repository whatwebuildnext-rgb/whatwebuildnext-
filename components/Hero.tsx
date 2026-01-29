
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { ChevronRight, Play } from 'lucide-react';

const TYPED_TEXTS = [
  "Scalable Web Applications",
  "Modern Cloud Architectures",
  "AI-Driven Digital Experiences",
  "High-Performance API Design"
];

// Added React.FC typing to explicitly handle the children prop and avoid JSX assignment errors
const MagneticButton: React.FC<{ children: React.ReactNode, className?: string, onClick?: () => void }> = ({ children, className, onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.4);
    y.set((e.clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
};

export const Hero: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % TYPED_TEXTS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Animated Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -50, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" 
      />

      <div className="container mx-auto px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] text-blue-400 uppercase bg-blue-400/5 border border-blue-400/20 rounded-full backdrop-blur-sm"
          >
            The Future of Engineering is Here
          </motion.span>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter text-white leading-[1.05]">
            We build <br />
            <span className="relative inline-flex flex-col items-center justify-start h-[1.1em] overflow-hidden min-w-full">
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ y: 80, opacity: 0, rotateX: -45 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  exit={{ y: -80, opacity: 0, rotateX: 45 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="block text-gradient whitespace-normal sm:whitespace-nowrap px-4"
                >
                  {TYPED_TEXTS[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto text-base md:text-xl text-slate-400 mb-10 leading-relaxed font-light"
          >
            What We Build Next Solutions transforms complex business challenges into seamless, high-performance digital architectures. From concept to scale, we engineer excellence.
          </motion.p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <MagneticButton 
              onClick={scrollToContact}
              className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white font-bold rounded-2xl flex items-center justify-center gap-3 group transition-all shadow-2xl shadow-blue-500/25"
            >
              Launch Project
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
            
            <MagneticButton 
              className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-white/10 transition-all backdrop-blur-md"
            >
              <Play size={18} fill="currentColor" />
              Watch Reel
            </MagneticButton>
          </div>
        </motion.div>

        {/* Dynamic Code Card */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, type: 'spring' }}
          className="hidden xl:block absolute bottom-12 right-12 p-8 glass rounded-[32px] border-white/10 text-left max-w-sm shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]"
        >
          <div className="flex gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500/30" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/30" />
            <div className="w-3 h-3 rounded-full bg-green-500/30" />
          </div>
          <code className="text-[13px] font-mono leading-relaxed block overflow-hidden">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-purple-400">class</span> <span className="text-blue-400">Solution</span> <span className="text-yellow-400">{"{"}</span><br />
              &nbsp;&nbsp;<span className="text-blue-300">constructor</span>() <span className="text-yellow-400">{"{"}</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">this</span>.quality = <span className="text-green-400">Infinity</span>;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">this</span>.innovation = <span className="text-green-400">true</span>;<br />
              &nbsp;&nbsp;<span className="text-yellow-400">{"}"}</span><br />
              <span className="text-yellow-400">{"}"}</span>
            </motion.div>
          </code>
        </motion.div>
      </div>
    </section>
  );
};
