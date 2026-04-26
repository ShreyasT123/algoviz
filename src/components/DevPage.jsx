import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/dsStore';

/* ── Team data — real-ish placeholder profiles ─────────────── */
const TEAM = [
  {
    index: '01',
    initials: 'AR',
    name: 'Alex R.',
    role: 'System Architect',
    handle: '@arch_alex',
    quote: 'Recursion is not a pattern. It is a world view.',
    tags: ['Graphs', 'Trees', 'Backtracking'],
    color: '#3b82f6',
  },
  {
    index: '02',
    initials: 'SY',
    name: 'Sara Y.',
    role: 'Visualization Engineer',
    handle: '@syara_dev',
    quote: 'If the user can\'t see it, the algorithm doesn\'t exist.',
    tags: ['Animations', 'Canvas', 'WebGL'],
    color: '#10b981',
  },
  {
    index: '03',
    initials: 'MK',
    name: 'Marcus K.',
    role: 'Algorithm Specialist',
    handle: '@mkern_algo',
    quote: 'Dynamic Programming is just organized cheating.',
    tags: ['DP', 'Greedy', 'Sorting'],
    color: '#a855f7',
  },
  {
    index: '04',
    initials: 'EL',
    name: 'Elena L.',
    role: 'UI / Design Lead',
    handle: '@elena_ui',
    quote: 'Design is the invisible layer between logic and understanding.',
    tags: ['Typography', 'Motion', 'Systems'],
    color: '#f59e0b',
  },
]

const FadeUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
)

function MemberCard({ m, idx }) {
  const [hov, setHov] = useState(false)

  return (
    <FadeUp delay={idx * 0.08}>
      <motion.div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '32px',
          alignItems: 'start',
          padding: '36px 40px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          background: hov ? 'rgba(255,255,255,0.018)' : 'transparent',
          transition: 'background 0.25s',
          cursor: 'default',
        }}
      >
        {/* Left content */}
        <div>
          {/* Index + role */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <span style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: '10px', color: 'rgba(255,255,255,0.18)',
              letterSpacing: '0.2em',
            }}>{m.index}</span>
            <span style={{
              height: '1px', flex: '0 0 32px',
              background: 'rgba(255,255,255,0.1)',
            }}/>
            <span style={{
              fontFamily: 'monospace', fontSize: '9px',
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: m.color, opacity: 0.75,
            }}>{m.role}</span>
          </div>

          {/* Name */}
          <h2 style={{
            fontFamily: "'Syne',sans-serif",
            fontSize: 'clamp(28px, 3.5vw, 52px)',
            fontWeight: 900, lineHeight: 0.95,
            letterSpacing: '-0.02em',
            color: '#fff',
            marginBottom: '18px',
          }}>{m.name}</h2>

          {/* Quote */}
          <p style={{
            fontFamily: "'Syne',sans-serif",
            fontSize: '14px', lineHeight: '1.65',
            color: 'rgba(255,255,255,0.38)',
            maxWidth: '480px',
            marginBottom: '24px',
            fontStyle: 'italic',
          }}>"{m.quote}"</p>

          {/* Tags */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {m.tags.map(tag => (
              <span key={tag} style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: '9px', letterSpacing: '0.1em',
                padding: '4px 10px', borderRadius: '4px',
                border: `1px solid ${m.color}30`,
                color: m.color, opacity: 0.7,
              }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Right avatar block */}
        <div style={{ textAlign: 'right', paddingTop: '8px' }}>
          {/* Avatar initials */}
          <motion.div
            animate={{ scale: hov ? 1.04 : 1 }}
            transition={{ duration: 0.3 }}
            style={{
              width: '80px', height: '80px',
              borderRadius: '12px',
              background: `linear-gradient(135deg, ${m.color}22, ${m.color}08)`,
              border: `1px solid ${m.color}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginLeft: 'auto', marginBottom: '10px',
            }}
          >
            <span style={{
              fontFamily: "'Syne',sans-serif",
              fontSize: '22px', fontWeight: 900,
              color: m.color, opacity: 0.7,
            }}>{m.initials}</span>
          </motion.div>

          {/* Handle */}
          <p style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: '9px', letterSpacing: '0.12em',
            color: 'rgba(255,255,255,0.2)',
          }}>{m.handle}</p>
        </div>
      </motion.div>
    </FadeUp>
  )
}

export default function DevPage() {
  const setScene = useAppStore(s => s.setScene)

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 60,
      background: '#0c0c0e',
      overflowY: 'auto',
      fontFamily: "'Syne',sans-serif",
    }}>
      {/* ── Hero ── */}
      <div style={{ padding: '120px 40px 64px', maxWidth: '900px' }}>
        <FadeUp>
          <p style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: '10px', letterSpacing: '0.3em',
            color: 'rgba(255,255,255,0.2)',
            textTransform: 'uppercase', marginBottom: '28px',
          }}>AlgoReef / Team</p>
        </FadeUp>

        <FadeUp delay={0.05}>
          <h1 style={{
            fontSize: 'clamp(48px, 7vw, 96px)',
            fontWeight: 900, lineHeight: 0.88,
            letterSpacing: '-0.03em',
            color: '#fff',
            marginBottom: '32px',
          }}>
            The<br />
            <span style={{ color: 'rgba(255,255,255,0.22)' }}>Architects.</span>
          </h1>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p style={{
            fontSize: '16px', lineHeight: '1.7',
            color: 'rgba(255,255,255,0.35)',
            maxWidth: '480px',
          }}>
            A small team that believes every algorithm deserves a visual explanation. 
            We built AlgoReef to make CS intuition accessible.
          </p>
        </FadeUp>
      </div>

      {/* ── Divider ── */}
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '0 40px' }}/>

      {/* ── Stats row ── */}
      <FadeUp delay={0.12}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          {[
            { n: '11', label: 'Algorithms' },
            { n: '3', label: 'Panel layout' },
            { n: '∞', label: 'Visualizations' },
            { n: '01', label: 'Platform' },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '32px 40px',
              borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}>
              <p style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: 'clamp(28px, 3vw, 44px)',
                fontWeight: 900, color: '#fff', marginBottom: '6px',
              }}>{s.n}</p>
              <p style={{
                fontFamily: 'monospace', fontSize: '9px',
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.25)',
              }}>{s.label}</p>
            </div>
          ))}
        </div>
      </FadeUp>

      {/* ── Members ── */}
      <div>
        {TEAM.map((m, i) => <MemberCard key={m.index} m={m} idx={i} />)}
      </div>

      {/* ── Footer CTA ── */}
      <FadeUp>
        <div style={{
          padding: '80px 40px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '24px',
        }}>
          <div>
            <p style={{
              fontFamily: "'Syne',sans-serif",
              fontSize: 'clamp(20px, 2.5vw, 32px)',
              fontWeight: 900, color: '#fff', marginBottom: '8px',
            }}>Start visualizing.</p>
            <p style={{
              fontFamily: 'monospace', fontSize: '10px',
              letterSpacing: '0.15em', color: 'rgba(255,255,255,0.25)',
            }}>11 algorithms. Real JavaScript. Live execution.</p>
          </div>
          <button
            id="dev-page-cta"
            onClick={() => setScene(1)}
            style={{
              fontFamily: "'Syne',sans-serif",
              fontSize: '11px', fontWeight: 800,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              padding: '14px 32px', borderRadius: '40px',
              background: '#fff', color: '#0c0c0e',
              border: 'none', cursor: 'pointer',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Open Stack →
          </button>
        </div>
      </FadeUp>
    </div>
  )
}
