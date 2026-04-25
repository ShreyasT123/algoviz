import React from 'react';
import { motion } from 'framer-motion';
import teamData from '../config/team.json';

const TeamCard = ({ member, idx }) => {
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };
  
  const iconVars = {
    hidden: { scale: 0, opacity: 0, y: 10 },
    show: { scale: 1, opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, type: 'spring', stiffness: 100 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
      className={`group relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 p-8 md:p-12 border-y md:border-y-0 md:border-x border-[var(--plasma-teal)]/20 bg-black/60 backdrop-blur-xl overflow-hidden shadow-[0_0_50px_rgba(37,99,235,0.02)] hover:shadow-[0_0_100px_rgba(37,99,235,0.1)] transition-all duration-500 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
    >
      <div className={`relative z-30 flex flex-col ${idx % 2 === 1 ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} w-full flex-1`}>
         <motion.h3 className="text-5xl md:text-7xl font-black text-white mb-2 font-['Syne'] uppercase tracking-tight">
           {member.name}
         </motion.h3>
         <h4 className="text-xl md:text-2xl font-bold text-[var(--plasma-teal)] font-['JetBrains_Mono'] tracking-widest mb-6 border-b border-white/10 pb-4 inline-block">
           {member.role}
         </h4>
         <p className="text-gray-400 font-['Syne'] text-xl md:text-2xl max-w-xl mb-8 leading-relaxed font-medium">
           {member.description}
         </p>
         
         <motion.div 
           variants={containerVars}
           initial="hidden"
           whileInView="show"
           viewport={{ once: true }}
           className="flex space-x-6"
         >
           <motion.a variants={iconVars} href={member.linkedin} target="_blank" rel="noreferrer" className="w-14 h-14 flex items-center justify-center bg-white/5 border border-white/10 hover:border-[var(--plasma-teal)] hover:bg-[var(--plasma-teal)]/10 text-white hover:text-[var(--plasma-teal)] transition-colors group/icon">
             <svg className="w-6 h-6 group-hover/icon:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
           </motion.a>
           <motion.a variants={iconVars} href={`mailto:${member.email}`} className="w-14 h-14 flex items-center justify-center bg-white/5 border border-white/10 hover:border-[var(--deep-violet)] hover:bg-[var(--deep-violet)]/10 text-white hover:text-[var(--deep-violet)] transition-colors group/icon">
             <svg className="w-7 h-7 group-hover/icon:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
           </motion.a>
         </motion.div>
      </div>
      
      <div className="relative z-30 shrink-0 w-64 h-64 md:w-80 md:h-80 border border-white/10 group-hover:border-[var(--plasma-teal)]/50 overflow-hidden transform transition-all duration-500 shadow-2xl bg-black">
         <motion.img 
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            src={member.avatar}
            alt={member.name}
            className="w-full h-full object-cover"
         />
      </div>
    </motion.div>
  );
}

export default function DevPage() {
  return (
    <div className="absolute inset-0 z-[60] bg-[var(--void-black)] overflow-y-auto px-8 py-32">
      <div className="max-w-6xl mx-auto">
        <div className="mb-32 text-center">
          <h2 className="text-6xl md:text-8xl font-['Syne'] font-black text-[var(--ghost-white)] tracking-widest uppercase">
            The <span className="text-[var(--plasma-teal)]">Architects</span>
          </h2>
          <p className="mt-8 text-xl text-gray-600 font-['Syne'] font-medium">
            Building the future of algorithm visualization.
          </p>
        </div>

        <div className="space-y-40">
          {teamData.map((member, idx) => (
            <TeamCard key={`team-member-${idx}`} member={member} idx={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}
