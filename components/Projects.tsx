import React from "react";
import { motion } from "framer-motion";
import { PROJECTS } from "../constants";
import { ExternalLink } from "lucide-react";

export const Projects: React.FC = () => {
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
          <button className="px-6 py-2 border border-white/10 rounded-full text-sm font-semibold hover:bg-white/5 transition-colors">
            View All Work
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-[10px] bg-blue-600 rounded-full font-bold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4">
                  {project.category}
                </p>

                <div className="flex items-center gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-widest"
                  >
                    GitHub <ExternalLink size={14} />
                  </a>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-widest"
                  >
                    View Detail <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
