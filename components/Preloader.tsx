
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.8, ease: 'circIn' }}
          className="fixed inset-0 z-[100] bg-slate-950 flex items-center justify-center flex-col"
        >
          <div className="relative mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-20 h-20 border-t-2 border-r-2 border-blue-600 rounded-full"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-lg animate-pulse" />
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white font-bold tracking-[0.4em] uppercase text-sm"
          >
            Engineering Excellence
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
