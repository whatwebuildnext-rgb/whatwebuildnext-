import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { TEAM } from "../constants";
// Import TeamMember type from types
import { TeamMember } from "../types";
import { Github, Linkedin, ExternalLink } from "lucide-react";

// Use React.FC to properly handle React props like 'key' and type the member prop
const TeamCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative p-6 glass rounded-3xl group cursor-pointer"
    >
      <div
        className="relative h-64 mb-6 rounded-2xl overflow-hidden"
        style={{ transform: "translateZ(50px)" }}
      >
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-blue-600/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div style={{ transform: "translateZ(30px)" }}>
        <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
        <p className="text-blue-500 text-sm font-medium mb-4">{member.role}</p>

        <div className="flex flex-wrap gap-1 mb-6">
          {member.skills.map((skill: string) => (
            <span
              key={skill}
              className="px-2 py-0.5 text-[9px] font-bold bg-white/5 rounded border border-white/5 text-slate-500"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          <motion.a
            whileHover={{ y: -2 }}
            href={member.socials.github}
            target="_blank"
            className="text-slate-500 hover:text-white transition-colors"
          >
            <Github size={20} />
          </motion.a>
          <motion.a
            whileHover={{ y: -2 }}
            href={member.socials.linkedin}
            target="_blank"
            className="text-slate-500 hover:text-white transition-colors"
          >
            <Linkedin size={20} />
          </motion.a>

          <motion.a
            whileHover={{ y: -2 }}
            href={member.socials.LiveDemo}
            target="_blank"
            className="text-slate-500 hover:text-white transition-colors"
          >
            <ExternalLink size={20} />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export const Team: React.FC = () => {
  return (
    <section id="team" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Meet the Experts
          </h2>
          <p className="text-slate-400">
            The collective brain behind CodeCraft's successful deployments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};
