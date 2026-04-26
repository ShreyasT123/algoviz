import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../../store/dsStore'
import { ALGORITHM_INFO } from '../../data/algorithmInfo'

function InfoModal({ info, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(5, 5, 7, 0.9)',
        backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '40px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={e => e.stopPropagation()}
        style={{
          width: 'calc(100% - 80px)', maxWidth: '900px', maxHeight: 'calc(100vh - 80px)',
          background: '#0c0c0e', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '24px', overflowY: 'auto', padding: '60px',
          boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <span style={{ height: '1px', flex: '0 0 40px', background: 'var(--accent-blue)' }}/>
          <span style={{
            fontFamily: "'JetBrains Mono',monospace", fontSize: '11px',
            letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--accent-blue)',
          }}>Deep Dive</span>
        </div>

        <h1 style={{
          fontFamily: "'Syne',sans-serif", fontSize: '64px', fontWeight: 900,
          color: 'var(--text-primary)', marginBottom: '32px', letterSpacing: '-0.03em', lineHeight: 0.9,
        }}>{info.name}</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', marginBottom: '48px' }}>
          <div>
            <h3 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-tertiary)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Theoretical Overview</h3>
            {info.inDepth.split('\n\n').map((para, i) => (
              <p key={i} style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '16px' }}>{para}</p>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <h3 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-tertiary)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Complexity Bounds</h3>
              <div style={{ display: 'flex', gap: '24px' }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--panel-border)', padding: '16px', borderRadius: '12px', flex: 1 }}>
                  <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Time</p>
                  <p style={{ fontFamily: 'monospace', fontSize: '18px', color: 'var(--accent-blue)' }}>{info.timeComplexity}</p>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--panel-border)', padding: '16px', borderRadius: '12px', flex: 1 }}>
                  <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Space</p>
                  <p style={{ fontFamily: 'monospace', fontSize: '18px', color: 'var(--accent-purple)' }}>{info.spaceComplexity}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-tertiary)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Key Mechanics</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {info.keyPoints.map((pt, i) => (
                  <div key={i} style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>{pt.title}</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{pt.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-tertiary)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Real-world Use Cases</h3>
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-secondary)', background: 'var(--accent-blue-glow)', padding: '20px', borderRadius: '12px', borderLeft: '3px solid var(--accent-blue)' }}>{info.useCases}</p>
        </div>

        <button
          onClick={onClose}
          style={{
            marginTop: '60px', width: '100%', padding: '16px', borderRadius: '12px',
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff', cursor: 'pointer', fontFamily: "'Syne',sans-serif", fontWeight: 700,
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
        >Close Deep Dive</button>
      </motion.div>
    </motion.div>
  )
}

export default function InfoPanel() {
  const currentScene = useAppStore(s => s.currentScene)
  const [expanded, setExpanded] = useState(true)
  const [showModal, setShowModal] = useState(false)

  if (currentScene === 0 || currentScene === 12) return null
  const info = ALGORITHM_INFO[currentScene]
  if (!info) return null

  return (
    <>
      <div style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '10px',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <button
          onClick={() => setExpanded(v => !v)}
          style={{
            width: '100%', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', padding: '12px 14px',
            background: 'transparent', border: 'none', cursor: 'pointer',
            borderBottom: expanded ? '1px solid rgba(255,255,255,0.05)' : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              width: '4px', height: '4px', borderRadius: '50%',
              background: 'var(--text-tertiary)', display: 'inline-block',
            }}/>
            <span style={{
              fontFamily: "'Syne', sans-serif", fontSize: '9px', fontWeight: 800,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--text-secondary)',
            }}>
              {info.name}
            </span>
          </div>
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ color: 'var(--text-muted)', fontSize: '10px', display: 'inline-block' }}
          >
            ▼
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <p style={{
                  fontFamily: "'Syne', sans-serif", fontSize: '11px', lineHeight: '1.6',
                  color: 'var(--text-secondary)',
                }}>
                  {info.description}
                </p>

                <button
                  onClick={() => setShowModal(true)}
                  style={{
                    padding: '8px', borderRadius: '6px',
                    background: 'var(--accent-blue-glow)',
                    border: '1px solid rgba(59,130,246,0.3)',
                    color: 'var(--accent-blue)', fontSize: '9px', fontWeight: 800,
                    textTransform: 'uppercase', letterSpacing: '0.1em',
                    cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.5)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--accent-blue-glow)'}
                >Read Full Deep Dive →</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showModal && <InfoModal info={info} onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </>
  )
}
