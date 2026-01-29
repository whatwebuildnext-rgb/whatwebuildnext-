import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-white/5 mt-12 bg-slate-950/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 h-10 w-10 overflow-hidden rounded-xl group-hover:rotate-12 transition-transform duration-500">
              <img
                src="/images/logo.jpeg"
                alt="Logo"
                width={24}
                height={24}
                className="w-full h-full"
              />
            </div>
            <span className="text-xl font-black tracking-tighter text-white uppercase flex items-baseline">
              What We Build Next
              <span className="text-blue-500 text-3xl">.</span>
            </span>
          </div>

          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} What We Build Next. All rights
            reserved.
          </p>

          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
