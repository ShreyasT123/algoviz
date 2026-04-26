import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/dsStore';
import './TabNavigation.css';

/* ── Unique geometric SVG glyphs per scene ─────────────────── */
const Glyphs = {
  home: () => (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M1 7L7 1.5 13 7v5.5H9V9H5v3.5H1z"/>
    </svg>
  ),
  stack: () => (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="1" y="1.5" width="12" height="3" rx="1"/>
      <rect x="1" y="5.5" width="12" height="3" rx="1"/>
      <rect x="1" y="9.5" width="12" height="3" rx="1"/>
    </svg>
  ),
  queue: () => (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="1" y="4" width="3" height="6" rx="1"/>
      <rect x="5.5" y="4" width="3" height="6" rx="1"/>
      <rect x="10" y="4" width="3" height="6" rx="1"/>
      <path d="M10 7H14M0 7H4" strokeLinecap="round"/>
    </svg>
  ),
  linkedlist: () => (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="2.5" cy="7" r="2"/>
      <circle cx="7" cy="7" r="2"/>
      <circle cx="11.5" cy="7" r="2"/>
      <line x1="4.5" y1="7" x2="5" y2="7"/>
      <line x1="9" y1="7" x2="9.5" y2="7"/>
    </svg>
  ),
  tree: () => (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="7" cy="2.5" r="1.5"/>
      <circle cx="3.5" cy="8" r="1.5"/>
      <circle cx="10.5" cy="8" r="1.5"/>
      <line x1="7" y1="4" x2="4.5" y2="6.5"/>
      <line x1="7" y1="4" x2="9.5" y2="6.5"/>
    </svg>
  ),
  graph: () => (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="3" cy="3" r="1.5"/>
      <circle cx="11" cy="3" r="1.5"/>
      <circle cx="7" cy="11" r="1.5"/>
      <circle cx="3" cy="9" r="1.5"/>
      <line x1="4.5" y1="3" x2="9.5" y2="3"/>
      <line x1="3" y1="4.5" x2="3" y2="7.5"/>
      <line x1="4" y1="9.5" x2="6" y2="11"/>
      <line x1="10" y1="4" x2="7.8" y2="9.5"/>
    </svg>
  ),
  dp: () => (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="1" y="1" width="4" height="4" rx="0.5"/>
      <rect x="5.5" y="1" width="4" height="4" rx="0.5" opacity="0.6"/>
      <rect x="10" y="1" width="3" height="4" rx="0.5" opacity="0.4"/>
      <rect x="1" y="5.5" width="4" height="4" rx="0.5" opacity="0.6"/>
      <rect x="5.5" y="5.5" width="4" height="4" rx="0.5"/>
      <rect x="1" y="10" width="4" height="3" rx="0.5" opacity="0.4"/>
    </svg>
  ),
  backtracking: () => (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M7 1.5L12 5v4L7 12.5 2 9V5z"/>
      <path d="M7 1.5v11M2 5l10 8M12 5L2 13" opacity="0.35"/>
    </svg>
  ),
  divconq: () => (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="1" y="1" width="12" height="4" rx="1"/>
      <rect x="1" y="9" width="5" height="4" rx="1"/>
      <rect x="8" y="9" width="5" height="4" rx="1"/>
      <line x1="3.5" y1="5" x2="3.5" y2="9"/>
      <line x1="10.5" y1="5" x2="10.5" y2="9"/>
    </svg>
  ),
  greedy: () => (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="7" cy="5" r="4"/>
      <circle cx="7" cy="5" r="1.5"/>
      <path d="M7 9v4M5 11l2 2 2-2" strokeLinecap="round"/>
    </svg>
  ),
  sorting: () => (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
      <line x1="2" y1="11" x2="2" y2="3" strokeLinecap="round"/>
      <line x1="5" y1="11" x2="5" y2="5" strokeLinecap="round"/>
      <line x1="8" y1="11" x2="8" y2="2" strokeLinecap="round"/>
      <line x1="11" y1="11" x2="11" y2="7" strokeLinecap="round"/>
    </svg>
  ),
  recursion: () => (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M7 1a6 6 0 110 12A6 6 0 017 1z"/>
      <path d="M7 4a3 3 0 110 6 3 3 0 010-6z"/>
      <circle cx="7" cy="7" r="0.8" fill="currentColor" stroke="none"/>
    </svg>
  ),
  dev: () => (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
      <polyline points="4,3 1,7 4,11"/>
      <polyline points="10,3 13,7 10,11"/>
      <line x1="8.5" y1="2" x2="5.5" y2="12"/>
    </svg>
  ),
}

const TABS = [
  { id: 1,  label: 'Stack',     glyph: 'stack', desc: 'Last-In, First-Out stack structure' },
  { id: 2,  label: 'Queue',     glyph: 'queue', desc: 'First-In, First-Out queue structure' },
  { id: 3,  label: 'LList',     glyph: 'linkedlist', desc: 'Linear collection of data nodes' },
  { id: 4,  label: 'Tree',      glyph: 'tree', desc: 'Hierarchical data structure' },
  { id: 5,  label: 'Graph',     glyph: 'graph', desc: 'Network of interconnected nodes' },
  { id: 6,  label: 'DP',        glyph: 'dp', desc: 'Breaking down complex problems' },
  { id: 7,  label: 'BT',        glyph: 'backtracking', desc: 'Solving puzzles via recursion' },
  { id: 8,  label: 'D&C',       glyph: 'divconq', desc: 'Divide, conquer, and combine' },
  { id: 9,  label: 'Greedy',    glyph: 'greedy', desc: 'Local optimization algorithms' },
  { id: 10, label: 'Sort',      glyph: 'sorting', desc: 'Arranging elements in order' },
  { id: 11, label: 'Recursion', glyph: 'recursion', desc: 'Functions that call themselves' },
]

/* ── AlgoReef wordmark glyph ─────────────────────────────────── */
function WordmarkGlyph() {
  return (
    <svg className="wordmark-glyph" viewBox="0 0 20 20" fill="none">
      <polygon points="10,1 19,6.5 19,13.5 10,19 1,13.5 1,6.5" stroke="var(--accent-blue)" strokeWidth="1.5"/>
      <polygon points="10,5 16,8.5 16,11.5 10,15 4,11.5 4,8.5" fill="var(--accent-blue-glow)" stroke="var(--accent-cyan)" strokeWidth="1"/>
      <circle cx="10" cy="10" r="2" fill="var(--text-primary)"/>
    </svg>
  )
}

function MegaMenu({ visible, onSelect }) {
  const categories = [
    {
      title: 'Structures',
      items: TABS.slice(0, 5)
    },
    {
      title: 'Algorithms',
      items: TABS.slice(5)
    }
  ]

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="mega-menu-overlay"
        >
          {categories.map((cat, ci) => (
            <div key={ci} className="mega-column">
              <h3 className="mega-section-title">{cat.title}</h3>
              <div className="mega-items-grid">
                {cat.items.map(item => (
                  <button
                    key={item.id}
                    className="mega-item"
                    onClick={() => onSelect(item.id)}
                  >
                    <span className="mega-item-name">{item.label}</span>
                    <span className="mega-item-desc">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div className="mega-footer">
            <span className="mega-footer-text">Visual interactive DSA cheatsheet</span>
            <a href="#" className="mega-changelog">View Changelog</a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function TabNavigation() {
  const currentScene = useAppStore(s => s.currentScene)
  const setScene     = useAppStore(s => s.setScene)
  const [hovered, setHovered] = useState(false)
  const [showMega, setShowMega] = useState(false)

  const visible = currentScene === 0 || hovered || showMega

  return (
    <>
      {currentScene !== 0 && (
        <div className="nav-trigger" onMouseEnter={() => setHovered(true)} />
      )}

      <motion.nav
        className="tab-navigation"
        initial={false}
        animate={{ y: visible ? 0 : -52, opacity: visible ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 340, damping: 34 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setShowMega(false); }}
      >
        <div className="tab-outer">
          <div className="tab-container">

            {/* ── Wordmark / Home ── */}
            <div
              className="nav-wordmark-container"
              onMouseEnter={() => setShowMega(true)}
              style={{ position: 'relative', display: 'flex', alignItems: 'stretch' }}
            >
              <button
                id="tab-home"
                className="nav-wordmark"
                onClick={() => setScene(0)}
                aria-label="Go home"
              >
                <WordmarkGlyph />
                <span className="wordmark-text">AlgoReef</span>
              </button>

              <MegaMenu
                visible={showMega}
                onSelect={(id) => { setScene(id); setShowMega(false); }}
              />
            </div>

            {/* ── Scene tabs ── */}
            <div className="tab-list">
              {TABS.map(tab => {
                const G = Glyphs[tab.glyph]
                const isActive = currentScene === tab.id
                return (
                  <button
                    key={tab.id}
                    id={`tab-${tab.id}`}
                    className={`tab-button ${isActive ? 'active' : ''}`}
                    onClick={() => setScene(tab.id)}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-line"
                        className="tab-active-line"
                        transition={{ type: 'spring', bounce: 0.18, duration: 0.4 }}
                      />
                    )}
                    <div className="tab-content">
                      <svg className="tab-glyph" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
                        <G />
                      </svg>
                      <span className="tab-label">{tab.label}</span>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* ── Right actions ── */}
            <div className="nav-actions">
              <button
                id="tab-dev"
                className="nav-action-btn"
                onClick={() => setScene(12)}
                aria-label="Dev team"
              >
                <svg className="nav-action-icon" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <polyline points="4,3 1,7 4,11"/>
                  <polyline points="10,3 13,7 10,11"/>
                  <line x1="8.5" y1="2" x2="5.5" y2="12"/>
                </svg>
                <span className="nav-action-label">Team</span>
              </button>
            </div>

          </div>
        </div>
      </motion.nav>
    </>
  )
}
