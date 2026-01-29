
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 2000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto glass rounded-[40px] p-8 md:p-16 border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-black mb-6">Let's build <br />something epic.</h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Ready to take your digital presence to the next level? Our engineers are waiting to hear from you.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-2">Location</h4>
                  <p className="text-slate-300">India</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-2">Inquiries</h4>
                  <a href="mailto:whatwebuildnext@gmail.com" className="text-slate-300 hover:underline">whatwebuildnext@gmail.com</a>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-2">Phone</h4>
                  <a href="tel:+918805388474" className="text-slate-300 hover:underline">+91 8805388474</a>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 group-focus-within:text-blue-500 transition-colors">Name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500 transition-all text-white"
                  placeholder="John Doe"
                />
              </div>
              <div className="group">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 group-focus-within:text-blue-500 transition-colors">Email</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500 transition-all text-white"
                  placeholder="john@example.com"
                />
              </div>
              <div className="group">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 group-focus-within:text-blue-500 transition-colors">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500 transition-all text-white resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={status !== 'idle'}
                className="w-full py-5 bg-blue-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <Loader2 size={24} className="animate-spin" />
                ) : status === 'success' ? (
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
    </section>
  );
};
