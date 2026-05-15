import React from "react";

import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
  Instagram,
  MessageCircle,
} from "lucide-react";

import { useEffect, useState } from "react";

import { supabase } from "@/utils/supabase";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const [links, setLinks] = useState<any[]>([]);

  const footerLinks = {
    product: [
      { label: "Features", href: "#Services" },
      { label: "Pricing", href: "#contact" },
      { label: "Case Studies", href: "#process" },
    ],

    company: [
      { label: "About Us", href: "#about" },
      { label: "Services", href: "#services" },
      {
        label: "Testimonials",
        href: "#testimonials",
      },
    ],

    legal: [
      {
        label: "Privacy Policy",
        href: "#contact",
      },

      {
        label: "Terms of Service",
        href: "#contact",
      },

      {
        label: "Cookie Policy",
        href: "#contact",
      },
    ],
  };

  // Dynamic Icon Map
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

  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <footer className="relative border-t border-white/5 mt-12 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Decorative gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />

        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3 group">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 h-12 w-12 overflow-hidden rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-blue-600/20">
                <img
                  src="/images/logo.jpeg"
                  alt="What We Build Next Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>

              <span className="text-2xl font-black tracking-tighter text-white uppercase flex items-baseline">
                What We Build Next

                <span className="text-blue-500 text-4xl leading-none">
                  .
                </span>
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Building the future of technology,
              one innovation at a time. We create
              cutting-edge solutions that transform
              ideas into reality.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-blue-500" />

                <span className="text-slate-300">
                  India
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-500" />

                <a
                  href="tel:+918805388474"
                  className="text-slate-300 hover:underline"
                >
                  +91 8805388474
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-500" />

                <a
                  href="mailto:whatwebuildnext@gmail.com"
                  className="text-slate-300 hover:underline"
                >
                  whatwebuildnext@gmail.com
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              {links.map(
                (social: any, index: number) => {
                  const Icon =
                    iconMap[
                    social.platform_name?.toLowerCase()
                    ];

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
                }
              )}
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider">
              Product
            </h3>

            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white text-sm transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-blue-500 group-hover:w-4 transition-all duration-300" />

                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider">
              Company
            </h3>

            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white text-sm transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-blue-500 group-hover:w-4 transition-all duration-300" />

                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider">
              Legal
            </h3>

            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white text-sm transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-blue-500 group-hover:w-4 transition-all duration-300" />

                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm text-center md:text-left">
              &copy; {currentYear} What We Build
              Next. All rights reserved.
            </p>

            <div className="flex items-center gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />

                All systems operational
              </span>

              <span>Made with ❤️ in India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};