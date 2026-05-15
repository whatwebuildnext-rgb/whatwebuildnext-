import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { supabase } from '../utils/supabase';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Testimonial = {
  id: number
  name: string
  company: string
  content: string
  avatar: string
  status: boolean
}

export const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const updateSettings = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setSlidesToShow(3);
      } else if (width >= 768) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(1);
      }
    };

    updateSettings();
    window.addEventListener("resize", updateSettings);
    return () => window.removeEventListener("resize", updateSettings);
  }, []);

  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .eq('status', true)
        .order('id', { ascending: true });

      if (error) {
        console.error("Failed to fetch feedback", error);
      } else {
        setTestimonials(data || []);
      }
      setLoading(false)
    }

    fetchTestimonials()
  }, [])

  if (loading) return null;

  const settingsPauseOnHover = {
    dots: false,
    infinite: true,
    slidesToShow: slidesToShow,
    rows: 1, // Forced to 1 row as requested
    autoplay: true,
    autoplaySpeed: 0,
    speed: 10000,
    cssEase: "linear",
    pauseOnHover: true,
    arrows: false,
    slidesPerRow: 1,
  };

  return (
    <section id="testimonials" className="py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <span className="text-blue-500 font-black uppercase tracking-[0.4em] text-xs mb-6 block">Feedback</span>
          <h2 className="text-4xl md:text-5xl font-black mb-6">Voice of Our <span className="text-gradient">Partners.</span></h2>
        </div>

        <div className="testimonial-slider-container mt-16">
          <Slider {...settingsPauseOnHover}>
            {testimonials.map((testimonial, idx) => (
              <div key={testimonial.id} className="px-4">
                <motion.div
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
                      src={testimonial.avatar || "/images/default_avatar.png"} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full border-2 border-blue-500/30 object-cover"
                    />
                    <div>
                      <h4 className="text-white font-bold text-sm">{testimonial.name}</h4>
                      <p className="text-slate-500 text-xs uppercase tracking-wider">{testimonial.company}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};
