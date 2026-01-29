
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2 } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const navBackground = useTransform(
    scrollY,
    [0, 50],
    ['rgba(3, 7, 18, 0)', 'rgba(3, 7, 18, 0.95)']
  );

  const navBorder = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.1)']
  );

  const menuItems = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Projects', href: '#projects' },
    { name: 'Team', href: '#team' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <motion.nav
      style={{ 
        backgroundColor: navBackground,
        borderColor: navBorder 
      }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 border-b py-4"
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <motion.a 
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 group"
        >
          <div className="bg-blue-600 h-10 w-10 overflow-hidden rounded-xl group-hover:rotate-12 transition-transform duration-500">
            <img src="/images/logo.jpeg" alt="Logo" width={24} height={24} className="w-full h-full" />
          </div>
          <span className="text-xl font-black tracking-tighter text-white uppercase flex items-baseline">
            What We Build Next<span className="text-blue-500 text-3xl">.</span>
          </span>
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {menuItems.map((item, idx) => (
            <motion.a
              key={item.name}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative text-[10px] font-bold tracking-[0.2em] text-slate-400 hover:text-white transition-colors uppercase group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />
            </motion.a>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => scrollToSection(e, '#contact')}
            className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-colors shadow-xl shadow-blue-500/20"
          >
            Start Project
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 top-[73px] bg-slate-950/98 backdrop-blur-xl lg:hidden z-40 flex flex-col items-center justify-center gap-8"
          >
            {menuItems.map((item, idx) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={(e) => scrollToSection(e, item.href)}
                className="text-2xl font-black text-white uppercase tracking-tighter hover:text-blue-500 transition-colors"
              >
                {item.name}
              </motion.a>
            ))}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={(e) => scrollToSection(e, '#contact')}
              className="mt-4 px-10 py-4 rounded-2xl bg-blue-600 text-white font-black uppercase tracking-widest"
            >
              Get a Quote
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
