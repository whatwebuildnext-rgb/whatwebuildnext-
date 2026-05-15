import { useEffect, useState } from "react";

import { supabase } from "@/utils/supabase";
import { motion } from "framer-motion";
import Thanks from "./thanks";
import {
  Send,
  Loader2,
  CheckCircle,
  Twitter,
  Github,
  Linkedin,
  Youtube,
  Instagram,
  MessageCircle,
} from "lucide-react";

export const Contact: React.FC = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [links, setLinks] = useState<any[]>([]);
  const [isThanksOpen, setIsThanksOpen] = useState(false);



  const iconMap: any = {
    github: Github,
    linkedin: Linkedin,
    instagram: Instagram,
    youtube: Youtube,
    twitter: Twitter,
    whatsapp: MessageCircle,
  };
  const fetchLinks = async () => {
    const { data, error } = await supabase
      .from("social_links")
      .select("*")
      .eq("status", "active")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(error);
    } else {

      setLinks(data || []);
    }
  };

  const [contactInfo, setContactInfo] = useState({
    location: "India",
    email: "whatwebuildnext@gmail.com",
    phone: "+91 8805388474",
  });

  const fetchContactInfo = async () => {
    const { data, error } = await supabase
      .from("contact_details")
      .select("*")
      .maybeSingle();

    if (error) {
      console.error("Error fetching contact info:", error);
    } else if (data) {
      setContactInfo({
        location: data.location || "India",
        email: data.email || "whatwebuildnext@gmail.com",
        phone: data.phone || "+91 8805388474",
      });
    }
  };

  useEffect(() => {
    fetchLinks();
    fetchContactInfo();
  }, []);

  const handlesubmit = async (e: any) => {
    e.preventDefault();
    setStatus("loading");

    const obj = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    try {
      const { error } = await supabase
        .from("contact_inquiries")
        .insert([obj]);

      if (error) throw error;

      setStatus("success");
      e.target.reset(); // Clear the form
      
      // Small delay before showing modal to allow success state to be seen
      setTimeout(() => {
        setIsThanksOpen(true);
        setStatus("idle");
      }, 500);

    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setStatus("idle");
    }
  };
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto glass rounded-[40px] p-8 md:p-16 border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-black mb-6">
                Let's build <br />
                something epic.
              </h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Ready to take your digital presence to the next level? Our
                engineers are waiting to hear from you.
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-2">
                    Location
                  </h4>
                  <p className="text-slate-300">{contactInfo.location}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-2">
                    Inquiries
                  </h4>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-slate-300 hover:underline"
                  >
                    {contactInfo.email}
                  </a>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-2">
                    Phone
                  </h4>
                  <a
                    href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`}
                    className="text-slate-300 hover:underline"
                  >
                    {contactInfo.phone}
                  </a>
                </div>

                {/* Social Links */}
                <div className="flex gap-3 pt-2">
                  {links.map((social, index) => {
                    const Icon = iconMap[social.platform_name?.toLowerCase()];
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-white/5 hover:bg-blue-600 border border-white/10 hover:border-blue-500 flex items-center justify-center transition-all duration-300 group"
                      >
                        {Icon ? (
                          <Icon className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                        ) : social.icon_url ? (
                          <img
                            src={social.icon_url}
                            alt={social.platform_name}
                            className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity"
                          />
                        ) : null}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            <form onSubmit={handlesubmit} className="space-y-6">
              <div className="group">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 group-focus-within:text-blue-500 transition-colors">
                  Name
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500 transition-all text-white"
                  placeholder="John Doe"
                />
              </div>
              <div className="group">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 group-focus-within:text-blue-500 transition-colors">
                  Email
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500 transition-all text-white"
                  placeholder="john@example.com"
                />
              </div>
              <div className="group">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 group-focus-within:text-blue-500 transition-colors">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  name="message"
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500 transition-all text-white resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={status !== "idle"}
                className="w-full py-5 bg-blue-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 disabled:opacity-50"
              >
                {status === "loading" ? (
                  <Loader2 size={24} className="animate-spin" />
                ) : status === "success" ? (
                  <>
                    <CheckCircle size={24} /> Sent Successfully
                  </>
                ) : (
                  <>
                    <Send size={20} /> Send Inquiry
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </div>
      
      <Thanks 
        isOpen={isThanksOpen} 
        onClose={() => setIsThanksOpen(false)} 
      />
    </section>
  );
};
