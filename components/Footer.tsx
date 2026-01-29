import React from "react";
import { Github, Twitter, Linkedin, Mail, MapPin, Phone, Youtube, Instagram } from "lucide-react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: "Features", href: "#Services" },
      { label: "Pricing", href: "#contact" },
      { label: "Case Studies", href: "#process" },
    ],
    company: [
      { label: "About Us", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Testimonials", href: "#testimonials" },
    ],
    legal: [
      { label: "Privacy Policy", href: "#contact" },
      { label: "Terms of Service", href: "#contact" },
      { label: "Cookie Policy", href: "#contact" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Github, href: "https://github.com/whatwebuildnext-rgb", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Youtube, href: "https://youtube.com/@whatwebuildnext?si=8KvKN7LoiixmuM6r", label: "YouTube" },
    { icon: Instagram, href: "https://www.instagram.com/whatwebuildnext?igsh=czZ0aDFvdGZnenB3", label: "Instagram" },
  ];

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
                <span className="text-blue-500 text-4xl leading-none">.</span>
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Building the future of technology, one innovation at a time. We
              create cutting-edge solutions that transform ideas into reality.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span className="text-slate-300">India</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-500" />
                <a href="tel:+918805388474" className="text-slate-300 hover:underline">+91 8805388474</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-500" />
                <a href="mailto:whatwebuildnext@gmail.com" className="text-slate-300 hover:underline">whatwebuildnext@gmail.com</a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-blue-600 border border-white/10 hover:border-blue-500 flex items-center justify-center transition-all duration-300 group"
                >
                  <social.icon className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                </a>
              ))}
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

        {/* Newsletter Section */}
        <div className="py-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-white font-bold text-lg mb-2">
                Stay Updated
              </h3>
              <p className="text-slate-400 text-sm">
                Subscribe to our newsletter for the latest updates and insights.
              </p>
            </div>
            <form className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all w-full md:w-64"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm text-center md:text-left">
              &copy; {currentYear} What We Build Next. All rights reserved.
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
