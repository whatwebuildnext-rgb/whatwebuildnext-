import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowLeft, ExternalLink, Globe, Github } from 'lucide-react';
import { supabase } from '../utils/supabase';

type Project = {
  id: number
  title: string
  description: string
  image_url: string
  tags: string[]
  github_url: string
  live_url: string
  frontend_repo: string
  backend_repo: string
  status: string
  is_featured: boolean
  team?: {
    name: string
  }
}

export const PortfolioPage = ({ onBack }: { onBack: () => void }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('portfolio')
        .select('*, team(name)')
        .eq('status', 'active')
        .order('id', { ascending: false });
      
      if (error) {
        console.error("Error fetching portfolio:", error);
      } else {
        setProjects(data || []);
        setFilteredProjects(data || []);
      }
      setLoading(false);
    }
    fetchAll();
  }, []);

  useEffect(() => {
    const results = projects.filter(p => 
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tags?.some(t => t.toLowerCase().includes(search.toLowerCase())) ||
      p.team?.name?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProjects(results);
  }, [search, projects]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20 selection:bg-blue-500/30"
    >

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Navigation & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-20">
          <button 
            onClick={onBack} 
            className="group flex items-center gap-3 text-white/50 hover:text-white transition-all bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-2xl border border-white/10"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
            <span className="text-sm font-bold uppercase tracking-widest">Back to Home</span>
          </button>
          
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={20} />
            <input 
              type="text"
              placeholder="Search projects, technologies, or experts..."
              className="w-full h-14 pl-14 pr-6 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all shadow-2xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-16">
          <h1 className="text-6xl md:text-7xl font-black text-white mb-4 tracking-tighter">
            Full <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400">Portfolio.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl font-light">
            Explore our complete archive of digital excellence. From complex web ecosystems to innovative mobile solutions.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-[500px] rounded-[32px] bg-white/5 animate-pulse border border-white/10" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <AnimatePresence mode='popLayout'>
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="rounded-[40px] border border-white/10 bg-slate-900/40 backdrop-blur-2xl overflow-hidden flex flex-col shadow-2xl group hover:border-blue-500/30 transition-colors duration-500"
                >
                  {/* Media Section */}
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={project.image_url || "/images/placeholder.png"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#020617] to-transparent opacity-60" />
                    <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-blue-600/20 backdrop-blur-xl border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
                      {project.team?.name || "Independent"}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-10 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-4xl font-black text-white tracking-tight group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-white/10 font-mono text-xs mt-3">#{project.id}</span>
                    </div>

                    <p className="text-slate-400 text-base leading-relaxed mb-8 line-clamp-3 font-light">
                      {project.description}
                    </p>

                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-2.5 mb-10">
                      {project.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-white/60 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all duration-300 cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Footer */}
                    <div className="mt-auto pt-8 border-t border-white/5 flex flex-wrap items-center gap-4">
                      {project.live_url && project.live_url !== "#" && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noreferrer"
                          className="h-14 px-10 rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-[0_20px_40px_rgba(37,99,235,0.25)] hover:scale-105 active:scale-95 transition-all text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3"
                        >
                          Live Preview <Globe size={16} />
                        </a>
                      )}
                      {project.github_url && project.github_url !== "#" && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noreferrer"
                          className="h-14 px-8 rounded-2xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-all text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3"
                        >
                          Repo <Github size={16} />
                        </a>
                      )}
                      {project.frontend_repo && project.frontend_repo !== "#" && (
                        <a
                          href={project.frontend_repo}
                          target="_blank"
                          rel="noreferrer"
                          className="h-14 px-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-all text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2"
                        >
                          Frontend <ExternalLink size={14} />
                        </a>
                      )}
                      {project.backend_repo && project.backend_repo !== "#" && (
                        <a
                          href={project.backend_repo}
                          target="_blank"
                          rel="noreferrer"
                          className="h-14 px-6 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500/20 transition-all text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2"
                        >
                          Backend <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-40">
            <div className="text-white/20 text-8xl font-black mb-8">404</div>
            <h2 className="text-3xl font-bold text-white mb-4">No matching projects found</h2>
            <p className="text-slate-500">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
