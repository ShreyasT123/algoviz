import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/dsStore';

/* ─────────────────────────────────────────
   Minimal SVG illustrations per topic
───────────────────────────────────────── */
function StackSVG() {
  return (
    <svg viewBox="0 0 260 180" fill="none" className="w-full h-full">
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x={30} y={130 - i*34} width={200} height={26} rx={2}
            fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.11)" strokeWidth="1"/>
          <text x={130} y={130 - i*34 + 17} textAnchor="middle"
            fill="rgba(255,255,255,0.22)" fontSize="9" fontFamily="monospace" letterSpacing="1">
            {['val : 42', 'val : 17', 'val : 88', 'val : 05'][i]}
          </text>
        </g>
      ))}
      <text x={55} y={22} fill="rgba(255,255,255,0.13)" fontSize="8" fontFamily="monospace" letterSpacing="3">TOP</text>
      <line x1="234" y1="14" x2="234" y2="158" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3,4"/>
    </svg>
  );
}

function TreeSVG() {
  const nodes = [[130,28],[82,86],[178,86],[55,148],[108,148],[155,148],[205,148]];
  const edges = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]];
  const vals  = [12,7,18,4,9,15,22];
  return (
    <svg viewBox="0 0 260 180" fill="none" className="w-full h-full">
      {edges.map(([a,b],i)=>(
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
          stroke="rgba(255,255,255,0.09)" strokeWidth="1"/>
      ))}
      {nodes.map(([cx,cy],i)=>(
        <g key={i}>
          <circle cx={cx} cy={cy} r={17} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
          <text x={cx} y={cy+4} textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="9" fontFamily="monospace">
            {vals[i]}
          </text>
        </g>
      ))}
    </svg>
  );
}

function GraphSVG() {
  const nodes = [[130,36],[65,108],[195,108],[42,162],[130,162],[218,162]];
  const edges = [[0,1],[0,2],[1,3],[1,4],[2,4],[2,5],[3,4],[4,5]];
  const lbls  = ['A','B','C','D','E','F'];
  return (
    <svg viewBox="0 0 260 180" fill="none" className="w-full h-full">
      {edges.map(([a,b],i)=>(
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
          stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
      ))}
      {nodes.map(([cx,cy],i)=>(
        <g key={i}>
          <circle cx={cx} cy={cy} r={16} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
          <text x={cx} y={cy+4} textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="9" fontFamily="monospace">
            {lbls[i]}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const FIG_COLS = [
  { fig:'FIG 0.1', title:'Built for clarity',      desc:'Every pointer, node, and edge rendered with mathematical precision — state tracked at each operation.', Svg: StackSVG },
  { fig:'FIG 0.2', title:'Powered by interaction', desc:'Push, pop, enqueue, dequeue — trigger live operations and watch the structure respond with fluid animation.', Svg: TreeSVG },
  { fig:'FIG 0.3', title:'Designed for depth',     desc:'Pseudocode synced with active-line highlighting shows exactly which instruction is executing at every step.', Svg: GraphSVG },
];

const ALL_ALGOS = [
  { label:'Stack',            scene:1  },
  { label:'Queue',            scene:2  },
  { label:'Linked List',      scene:3  },
  { label:'Binary Tree',      scene:4  },
  { label:'Graph',            scene:5  },
  { label:'Dynamic Prog.',    scene:6  },
  { label:'Backtracking',     scene:7  },
  { label:'Divide & Conquer', scene:8  },
  { label:'Greedy',           scene:9  },
  { label:'Sorting',          scene:10 },
  { label:'Recursion',        scene:11 },
];

const PSEUDOCODE = [
  'function push(val):',
  '  if top == capacity:',
  '    raise OverflowError',
  '  stack[top] = val',
  '  top += 1',
];

/* ─────────────────────────────────────────
   Reusable fade-in wrapper
───────────────────────────────────────── */
function FadeIn({ children, delay = 0, y = 20, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
export default function LandingOverlay() {
  const setScene = useAppStore(s => s.setScene);

  return (
    <div
      className="absolute inset-0 z-50 overflow-y-auto overflow-x-hidden custom-scrollbar"
      style={{ background: '#0c0c0e' }}
    >
      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col px-8 md:px-16 lg:px-24 pt-28 pb-16">

        {/* Dot-grid background */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}/>

        {/* Subtle ambient glow */}
        <div className="absolute top-[-10%] left-[-5%] w-[55%] h-[55%] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)' }}/>

        {/* Top-right live badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="absolute top-8 right-8 flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
          <span className="text-[10px] text-white/25 font-mono tracking-widest">11 algorithms · real-time</span>
        </motion.div>

        {/* Hero headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mt-auto"
        >
          <h1 className="font-black leading-[0.88] tracking-tighter text-white select-none"
            style={{ fontSize: 'clamp(56px, 10vw, 130px)' }}>
            The DSA<br/>
            <span style={{ color: 'rgba(255,255,255,0.22)' }}>visualization</span><br/>
            engine.
          </h1>

          <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8">
            <p className="text-base text-white/35 max-w-xs leading-relaxed font-light">
              Interactive structures that respond in real-time.<br/>
              Built for engineers who learn by doing.
            </p>

            <div className="flex gap-3 flex-shrink-0">
              <button
                id="landing-start-btn"
                onClick={() => setScene(1)}
                className="px-7 py-3 bg-white text-black text-sm font-bold rounded-full
                  hover:bg-white/90 transition-all active:scale-95 tracking-tight"
              >
                Start exploring
              </button>
              <button
                className="px-7 py-3 text-white/40 text-sm font-medium rounded-full border border-white/8
                  hover:bg-white/4 hover:text-white/70 transition-all"
              >
                Learn more ↓
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom edge fade */}
        <div className="absolute bottom-0 left-0 w-full h-40 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #0c0c0e, transparent)' }}/>
      </section>

      {/* ══ STATEMENT + 3-COL FEATURES ═══════════════════════════════════ */}
      <section className="px-8 md:px-16 lg:px-24 py-24 border-t" style={{ borderColor:'rgba(255,255,255,0.05)' }}>

        <FadeIn className="mb-24">
          <p style={{ fontSize: 'clamp(22px, 3.5vw, 46px)' }}
            className="font-bold leading-tight max-w-5xl">
            <span className="text-white">A new way to learn algorithms.</span>{' '}
            <span style={{ color:'rgba(255,255,255,0.25)' }}>
              Purpose-built for visual thinkers, AlgoReef sets a new standard for DSA mastery with live state inspection at its core.
            </span>
          </p>
        </FadeIn>

        {/* 3-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t" style={{ borderColor:'rgba(255,255,255,0.05)' }}>
          {FIG_COLS.map((col, i) => (
            <FadeIn key={i} delay={i * 0.12}
              className={`py-12 ${i < 2 ? 'md:border-r' : ''} ${i > 0 ? 'md:pl-12' : ''} ${i < 2 ? 'md:pr-12' : ''}`}
              style={{ borderColor:'rgba(255,255,255,0.05)' }}
            >
              <p className="text-[9px] text-white/20 font-mono tracking-[0.3em] mb-8">{col.fig}</p>
              <div className="h-44 mb-8 w-full">
                <col.Svg />
              </div>
              <h3 className="text-sm font-bold text-white mb-3">{col.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color:'rgba(255,255,255,0.3)' }}>{col.desc}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ══ SPLIT + MOCK UI PREVIEW ══════════════════════════════════════ */}
      <section className="px-8 md:px-16 lg:px-24 py-24 border-t" style={{ borderColor:'rgba(255,255,255,0.05)' }}>

        {/* Split text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-end mb-16">
          <FadeIn>
            <h2 className="font-black text-white leading-tight tracking-tighter"
              style={{ fontSize: 'clamp(30px, 4vw, 56px)' }}>
              Explore every<br/>structure
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} className="flex flex-col justify-end">
            <p className="text-[10px] text-white/20 font-mono tracking-widest mb-4">1.0  Structures →</p>
            <p className="text-base leading-relaxed" style={{ color:'rgba(255,255,255,0.38)' }}>
              From foundational linear structures to complex graph traversals and DP grids —
              all 11 algorithms are live, interactive, and instantly accessible.
            </p>
          </FadeIn>
        </div>

        {/* Mock 3-panel UI */}
        <FadeIn y={30}>
          <div className="rounded-xl overflow-hidden border" style={{ borderColor:'rgba(255,255,255,0.07)', background:'#111115' }}>
            {/* Window chrome */}
            <div className="flex items-center gap-3 px-5 py-3.5 border-b" style={{ borderColor:'rgba(255,255,255,0.05)' }}>
              <div className="flex gap-1.5">
                {['rgba(255,255,255,0.08)','rgba(255,255,255,0.08)','rgba(255,255,255,0.08)'].map((c,i)=>(
                  <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background:c }}/>
                ))}
              </div>
              <span className="text-[9px] text-white/12 font-mono tracking-widest mx-auto">
                AlgoReef — Stack · Interactive Mode
              </span>
            </div>

            {/* Three panels */}
            <div className="flex" style={{ height: '320px' }}>
              {/* Pseudocode panel */}
              <div className="hidden md:block border-r px-4 py-5" style={{ width:'220px', borderColor:'rgba(255,255,255,0.05)' }}>
                <p className="text-[8px] text-white/15 font-mono tracking-widest mb-5">PSEUDOCODE</p>
                {PSEUDOCODE.map((line, i) => (
                  <div key={i}
                    className="flex gap-2 items-center px-2 py-[3px] rounded mb-0.5"
                    style={{ background: i === 3 ? 'rgba(37,99,235,0.1)' : 'transparent',
                             borderLeft: i === 3 ? '2px solid rgba(37,99,235,0.6)' : '2px solid transparent' }}>
                    <span className="text-[8px] text-white/12 font-mono w-3 flex-shrink-0">{i+1}</span>
                    <span className="text-[8px] font-mono" style={{ color: i === 3 ? 'rgb(147,197,253)' : 'rgba(255,255,255,0.2)' }}>
                      {line}
                    </span>
                  </div>
                ))}
              </div>

              {/* Visualization panel */}
              <div className="flex-1 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  {[{v:42,active:true},{v:17,active:false},{v:88,active:false},{v:5,active:false}].map((item,i)=>(
                    <div key={i}
                      className="flex items-center justify-center font-mono text-sm rounded"
                      style={{
                        width:'128px', height:'36px',
                        border: item.active ? '1px solid rgba(37,99,235,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        background: item.active ? 'rgba(37,99,235,0.1)' : 'rgba(255,255,255,0.02)',
                        color: item.active ? 'rgb(147,197,253)' : 'rgba(255,255,255,0.25)',
                      }}>
                      {item.v}
                    </div>
                  ))}
                  <p className="mt-2 text-[8px] font-mono tracking-widest" style={{ color:'rgba(255,255,255,0.13)' }}>TOP ↑</p>
                </div>
              </div>

              {/* Controls panel */}
              <div className="hidden md:flex flex-col border-l px-4 py-5" style={{ width:'160px', borderColor:'rgba(255,255,255,0.05)' }}>
                <p className="text-[8px] text-white/15 font-mono tracking-widest mb-5">CONTROLS</p>
                {['PUSH','POP'].map((op,i)=>(
                  <div key={op}
                    className="mb-2 px-3 py-2 rounded text-[9px] font-bold font-mono text-center"
                    style={{
                      border: i === 0 ? '1px solid rgba(37,99,235,0.3)' : '1px solid rgba(255,255,255,0.07)',
                      color:  i === 0 ? 'rgba(147,197,253,0.7)' : 'rgba(255,255,255,0.18)',
                      background: i === 0 ? 'rgba(37,99,235,0.06)' : 'transparent',
                    }}>
                    {op}
                  </div>
                ))}
                <div className="mt-auto">
                  <p className="text-[8px] text-white/12 font-mono mb-2 tracking-widest">SPEED</p>
                  <div className="h-1 rounded-full" style={{ background:'rgba(255,255,255,0.06)' }}>
                    <div className="h-1 rounded-full w-2/3" style={{ background:'rgba(37,99,235,0.5)' }}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ══ ALL ALGORITHMS GRID ══════════════════════════════════════════ */}
      <section className="px-8 md:px-16 lg:px-24 py-24 border-t" style={{ borderColor:'rgba(255,255,255,0.05)' }}>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <FadeIn>
            <h2 className="font-black text-white tracking-tighter leading-tight"
              style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}>
              Everything,<br/>visualized.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} className="flex items-center">
            <p className="text-base leading-relaxed" style={{ color:'rgba(255,255,255,0.35)' }}>
              11 interactive algorithm visualizers — each hand-crafted with animated transitions,
              real-time state, and synced pseudocode.
            </p>
          </FadeIn>
        </div>

        {/* Algorithm grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          style={{ gap:'1px', background:'rgba(255,255,255,0.05)' }}>
          {ALL_ALGOS.map((algo, i) => (
            <motion.button
              key={algo.scene}
              id={`algo-card-${algo.scene}`}
              onClick={() => setScene(algo.scene)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group relative text-left px-6 py-8 transition-all"
              style={{ background:'#0c0c0e' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.025)'}
              onMouseLeave={e => e.currentTarget.style.background = '#0c0c0e'}
            >
              <p className="text-[9px] font-mono tracking-widest mb-3"
                style={{ color:'rgba(255,255,255,0.18)' }}>
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="text-sm font-medium transition-colors"
                style={{ color:'rgba(255,255,255,0.5)' }}
                onMouseEnter={e => e.currentTarget.style.color='rgba(255,255,255,0.9)'}
                onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.5)'}
              >
                {algo.label}
              </h3>
              <span className="absolute bottom-5 right-5 text-xs opacity-0 group-hover:opacity-40 transition-opacity"
                style={{ color:'#fff' }}>→</span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* ══ CTA CARDS ════════════════════════════════════════════════════ */}
      <section className="px-8 md:px-16 lg:px-24 pt-8 pb-24 border-t" style={{ borderColor:'rgba(255,255,255,0.05)' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Card 1 — primary */}
          <FadeIn>
            <div
              className="relative rounded-2xl p-10 overflow-hidden cursor-pointer group"
              style={{ background: 'linear-gradient(135deg, #1a1f3a 0%, #0f1420 100%)', border:'1px solid rgba(37,99,235,0.2)' }}
              onClick={() => setScene(1)}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background:'linear-gradient(135deg, rgba(37,99,235,0.12) 0%, transparent 60%)' }}/>
              <p className="text-[10px] font-mono tracking-widest mb-6" style={{ color:'rgba(100,140,255,0.6)' }}>
                GET STARTED
              </p>
              <h3 className="font-black text-white leading-tight mb-6"
                style={{ fontSize:'clamp(28px, 3.5vw, 44px)' }}>
                "You understand it<br/>when you see it."
              </h3>
              <button
                id="cta-start-viz"
                className="px-6 py-3 bg-white text-black text-sm font-bold rounded-full
                  group-hover:bg-blue-50 transition-all active:scale-95"
              >
                Start visualizing →
              </button>
              {/* Decorative SVG */}
              <div className="absolute right-8 bottom-8 opacity-10">
                <TreeSVG />
              </div>
            </div>
          </FadeIn>

          {/* Card 2 — secondary accent */}
          <FadeIn delay={0.1}>
            <div
              className="relative rounded-2xl p-10 overflow-hidden cursor-pointer group"
              style={{ background:'linear-gradient(135deg, #1a2a1a 0%, #0c140c 100%)', border:'1px solid rgba(16,185,129,0.15)' }}
              onClick={() => setScene(9)}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background:'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, transparent 60%)' }}/>
              <p className="text-[10px] font-mono tracking-widest mb-6" style={{ color:'rgba(52,211,153,0.5)' }}>
                EXPLORE ALGORITHMS
              </p>
              <h3 className="font-black text-white leading-tight mb-6"
                style={{ fontSize:'clamp(28px, 3.5vw, 44px)' }}>
                "Intuition beats<br/>memorization."
              </h3>
              <button
                id="cta-explore-algos"
                className="px-6 py-3 text-sm font-bold rounded-full transition-all active:scale-95"
                style={{ background:'rgba(16,185,129,0.15)', color:'rgb(52,211,153)', border:'1px solid rgba(16,185,129,0.3)' }}
              >
                Browse all topics →
              </button>
              <div className="absolute right-8 bottom-8 opacity-10">
                <GraphSVG />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════════════════════ */}
      <footer className="px-8 md:px-16 lg:px-24 py-12 border-t flex items-center justify-between flex-wrap gap-4"
        style={{ borderColor:'rgba(255,255,255,0.05)' }}>
        <span className="text-sm font-black tracking-tight" style={{ color:'rgba(255,255,255,0.3)' }}>
          ALGO<span style={{ color:'rgba(255,255,255,0.12)' }}>REEF</span>
        </span>
        <span className="text-[10px] font-mono" style={{ color:'rgba(255,255,255,0.15)' }}>
          Visual DSA Engine · {new Date().getFullYear()}
        </span>
      </footer>
    </div>
  );
}
