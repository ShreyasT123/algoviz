import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/dsStore';

export default function LandingOverlay() {
  const setScene = useAppStore(s => s.setScene);

  const handleStart = () => {
    setScene(1); // Go to Stack as first DS
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center overflow-y-auto overflow-x-hidden bg-[#0a0a0f] custom-scrollbar py-20">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/5 blur-[150px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/5 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '3s' }} />
      
      {/* Decorative Lines */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl w-full px-8 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-block px-4 py-1.5 mb-8 rounded-full border border-blue-500/20 bg-blue-500/5 backdrop-blur-md">
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-blue-400">Next Gen DSA Engine</span>
          </div>
          
          <h1 className="text-[14vw] md:text-[9vw] font-black tracking-tighter text-white leading-none mb-10 select-none">
            ALGO<span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-400 via-blue-600 to-indigo-600 drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">REEF</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 font-medium tracking-tight max-w-4xl mx-auto mb-16 leading-relaxed">
            Where abstract complexity transforms into a living, breathing digital experience.
            Visualize, analyze, and master data structures in <span className="text-white border-b border-blue-500/50">real-time</span>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8"
        >
          <button
            onClick={handleStart}
            className="relative group px-14 py-6 bg-white text-black font-black rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
          >
            <span className="relative z-10 uppercase tracking-widest text-sm">Enter the Reef</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-white to-indigo-100 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button
            onClick={() => setScene(11)} // Point to Recursion or similar
            className="px-14 py-6 border border-white/10 text-white/60 font-black rounded-2xl hover:bg-white/5 hover:text-white transition-all backdrop-blur-md active:scale-95 uppercase tracking-widest text-sm"
          >
            System Logs
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-32 pt-16 grid grid-cols-1 md:grid-cols-3 gap-16 text-left border-t border-white/5 w-full"
        >
          {[
            { title: "Fluid Visuals", desc: "Interactive DOM-based structures that react instantly to every command." },
            { title: "Step Analysis", desc: "Deep-dive into algorithm logic with high-performance state tracking." },
            { title: "Tactile Logic", desc: "Build spatial intuition through smooth, responsive digital representations." }
          ].map((item, i) => (
            <div key={i} className="group cursor-default">
              <h3 className="text-blue-500 font-black uppercase text-[10px] tracking-[0.3em] mb-4 group-hover:text-blue-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">
                {item.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
