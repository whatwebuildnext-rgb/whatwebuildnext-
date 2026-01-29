
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { Projects } from './components/Projects';
import { Technologies } from './components/Technologies';
import { Team } from './components/Team';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ParticleBackground } from './components/ParticleBackground';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { ChevronUp } from 'lucide-react';

const App: React.FC = () => {
  const { scrollYProgress, scrollY } = useScroll();
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const hueRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 1000);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let keys: string[] = [];
    const konami = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba';
    
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.push(e.key);
      keys = keys.slice(-10);
      if (keys.join('') === konami) {
        alert('🚀 INITIALIZING HYPER-SPACE DEPLOYMENT... (Easter Egg Found!)');
        document.body.style.filter = 'invert(1) hue-rotate(180deg)';
        setTimeout(() => document.body.style.filter = '', 2000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <motion.div 
      style={{ filter: `hue-rotate(${hueRotate}deg)` }}
      className="relative min-h-screen selection:bg-blue-500/30 selection:text-blue-200"
    >
      <Preloader />
      <CustomCursor />
      <ParticleBackground />
      
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 origin-left z-[100]"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Process />
        <Projects />
        <Technologies />
        <Team />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
      
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl z-40 hover:bg-blue-700 transition-colors"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-slate-950 via-transparent to-transparent opacity-50" />
        <div className="absolute bottom-0 left-0 w-full h-screen bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-50" />
      </div>
    </motion.div>
  );
};

export default App;
