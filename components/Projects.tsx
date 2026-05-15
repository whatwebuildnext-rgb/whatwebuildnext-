import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { supabase } from "../utils/supabase";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
type Project = {
  id: number
  title: string
  description: string
  image_url: string
  tags: string[]
  github_url: string
  live_url: string
  status: string
  is_featured: boolean
  team?: {
    name: string
  }
}

export const Projects: React.FC<{ onViewAll?: () => void }> = ({ onViewAll }) => {
  const [rows, setRows] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)


  const [slidesToShow, setSlidesToShow] = useState(1);
  const [sliderRows, setSliderRows] = useState(1);

  useEffect(() => {
    const updateSettings = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setSlidesToShow(2);
        setSliderRows(2);
      } else if (width >= 768) {
        setSlidesToShow(1); // On tablets, 1 might look better if 2 is too cramped, but I'll stick to 2 as requested if it fits. Actually user said "two he slide show karne hai".
        setSliderRows(1);
      } else {
        setSlidesToShow(1); // Mobile definitely needs 1
        setSliderRows(1);
      }
    };

    updateSettings();
    window.addEventListener("resize", updateSettings);
    return () => window.removeEventListener("resize", updateSettings);
  }, []);

  const fetchProjects = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("portfolio")
      .select(`
        *,
        team (
          name
        )
      `)
      .eq("status", "active")
      .eq("is_featured", true)
      .order("id", { ascending: false })

    if (error) {
      console.error("Failed to fetch projects", error)
    } else {
      setRows(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  if (loading) return null;

  const settingsPauseOnHover = {
    dots: false,
    infinite: true,
    slidesToShow: slidesToShow,
    rows: sliderRows,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 10000,
    cssEase: "linear",
    pauseOnHover: true,
    arrows: false,
    slidesPerRow: 1,
  };

  return (
    <section id="projects" className="py-24 bg-black/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Case Studies
            </h2>
            <p className="text-slate-400 max-w-md">
              A selection of our most ambitious projects, delivered with
              precision and flair.
            </p>
          </div>
          <button
            onClick={onViewAll}
            className="px-6 py-2 border border-white/10 rounded-full text-sm font-semibold hover:bg-white/5 transition-colors cursor-pointer"
          >
            View All Work
          </button>
        </div>

        <div className="portfolio-slider-container">
          <Slider {...settingsPauseOnHover}>
            {rows.map((project, idx) => (
              <div key={project.id} className="px-3 pb-10">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="rounded-[32px] border border-white/10 bg-slate-900/40 backdrop-blur-xl overflow-hidden flex flex-col shadow-2xl group h-full"
                >
                  {/* Media Preview Section */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.image_url || "/images/placeholder.png"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 to-transparent" />

                    {/* Expert Badge */}
                    <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-blue-600/20 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest text-blue-400">
                      {project.team?.name || "Independent"}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-3xl font-black text-white tracking-tight group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-white/20 font-mono text-xs mt-2">ID: {project.id}</span>
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-auto pt-6 border-t border-white/5 flex flex-wrap items-center gap-3">
                      {project.live_url && project.live_url !== "#" && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noreferrer"
                          className="h-10 px-6 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500 text-white shadow-[0_15px_30px_rgba(124,58,237,0.25)] hover:scale-105 active:scale-95 transition-all text-[10px] font-black uppercase tracking-[0.15em] flex items-center gap-2"
                        >
                          Live URL <ExternalLink size={12} />
                        </a>
                      )}
                      {project.github_url && project.github_url !== "#" && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noreferrer"
                          className="h-10 px-5 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all text-[10px] font-black uppercase tracking-[0.15em] flex items-center gap-2"
                        >
                          GitHub <ExternalLink size={12} />
                        </a>
                      )}
                      {project.frontend_repo && project.frontend_repo !== "#" && (
                        <a
                          href={project.frontend_repo}
                          target="_blank"
                          rel="noreferrer"
                          className="h-10 px-5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-all text-[10px] font-black uppercase tracking-[0.15em] flex items-center gap-2"
                        >
                          Frontend <ExternalLink size={12} />
                        </a>
                      )}
                      {project.backend_repo && project.backend_repo !== "#" && (
                        <a
                          href={project.backend_repo}
                          target="_blank"
                          rel="noreferrer"
                          className="h-10 px-5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500/20 transition-all text-[10px] font-black uppercase tracking-[0.15em] flex items-center gap-2"
                        >
                          Backend <ExternalLink size={12} />
                        </a>
                      )}
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
