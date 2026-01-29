
import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../constants';
import { Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <span className="text-blue-500 font-black uppercase tracking-[0.4em] text-xs mb-6 block">Feedback</span>
          <h2 className="text-4xl md:text-5xl font-black mb-6">Voice of Our <span className="text-gradient">Partners.</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="p-8 glass rounded-[32px] border-white/5 relative flex flex-col"
            >
              <Quote size={40} className="text-blue-500/20 absolute top-8 right-8" />
              <p className="text-slate-300 italic mb-8 relative z-10 font-light leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="mt-auto flex items-center gap-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full border-2 border-blue-500/30"
                />
                <div>
                  <h4 className="text-white font-bold text-sm">{testimonial.name}</h4>
                  <p className="text-slate-500 text-xs uppercase tracking-wider">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
