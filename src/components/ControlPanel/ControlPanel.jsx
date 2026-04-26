import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { animate, createScope, stagger } from 'animejs'
import { useAppStore } from '../../store/dsStore'

/* ─── Scene config ───────────────────────────────────────────── */
const SCENE_OPS = {
  1:  [
    { id: 'push', label: 'Push',    desc: 'Add to top',     variant: 'primary' },
    { id: 'pop',  label: 'Pop',     desc: 'Remove from top',variant: 'danger'  },
    { id: 'peek', label: 'Peek',    desc: 'View top value', variant: 'ghost'   },
  ],
  2:  [
    { id: 'enqueue', label: 'Enqueue', desc: 'Add to rear',  variant: 'primary' },
    { id: 'dequeue', label: 'Dequeue', desc: 'Remove front', variant: 'danger'  },
  ],
  3:  [
    { id: 'insert', label: 'Insert', desc: 'Add node',        variant: 'primary' },
    { id: 'delete', label: 'Delete', desc: 'Remove last node',variant: 'danger'  },
  ],
  4:  [
    { id: 'insert', label: 'Insert', desc: 'Add node to BST',variant: 'primary' },
    { id: 'bfs',    label: 'BFS',    desc: 'Level-order traversal', variant: 'accent' },
    { id: 'dfs',    label: 'DFS',    desc: 'Depth-first traversal', variant: 'ghost'  },
  ],
  5:  [
    { id: 'addNode', label: 'Add Node', desc: 'Create a vertex', variant: 'primary' },
    { id: 'addEdge', label: 'Add Edge', desc: 'Connect two nodes',variant: 'accent'  },
    { id: 'bfs',     label: 'BFS',      desc: 'Breadth-first',   variant: 'ghost'   },
  ],
  6:  [
    { id: 'dpRun',   label: 'Run DP',  desc: 'Solve grid traveler',variant: 'primary' },
    { id: 'dpReset', label: 'Reset',   desc: 'Clear grid',         variant: 'ghost'   },
  ],
  7:  [
    { id: 'btRun',   label: 'Solve',     desc: 'Run N-Queens',   variant: 'primary' },
    { id: 'btReset', label: 'Reset',     desc: 'Clear board',    variant: 'ghost'   },
  ],
  8:  [
    { id: 'dcRun',   label: 'Split',  desc: 'Divide the array', variant: 'primary' },
    { id: 'dcReset', label: 'Reset',  desc: 'Restore array',    variant: 'ghost'   },
  ],
  9:  [
    { id: 'greedyRun',   label: 'Run', desc: 'Solve coin change', variant: 'primary' },
    { id: 'greedyReset', label: 'Reset',desc: 'Clear state',      variant: 'ghost'   },
  ],
  10: [
    { id: 'sortBubble', label: 'Bubble Sort', desc: 'O(n²) comparisons',  variant: 'primary' },
    { id: 'sortQuick',  label: 'Quick Sort',  desc: 'O(n log n) average', variant: 'accent'  },
    { id: 'sortReset',  label: 'Reset',       desc: 'Restore array',      variant: 'ghost'   },
  ],
  11: [
    { id: 'recRun',   label: 'Recurse', desc: 'Run factorial recursion', variant: 'primary' },
    { id: 'recReset', label: 'Reset',   desc: 'Clear call stack',        variant: 'ghost'   },
  ],
}

const SCENE_PLACEHOLDERS = {
  1:  'value to push (e.g. 42)',
  2:  'value to enqueue (e.g. 99)',
  3:  'value to insert (e.g. 7)',
  4:  'value to insert (e.g. 15)',
  5:  'label or src-tgt (e.g. A-B)',
  6:  'grid size (e.g. 4)',
  7:  'board size N (4–8)',
  8:  'array (e.g. 8,3,5,1)',
  9:  'target amount (e.g. 87)',
  10: 'array (e.g. 5,2,8,1,9)',
  11: 'depth (e.g. 6)',
}

const SCENE_NAMES = [
  '', 'Stack', 'Queue', 'Linked List', 'Binary Tree', 'Graph',
  'Dynamic Prog.', 'Backtracking', 'Divide & Conquer',
  'Greedy', 'Sorting', 'Recursion',
]

const SCENE_COMPLEXITY = {
  1:  { time: 'O(1)',     space: 'O(n)', note: 'All ops constant time' },
  2:  { time: 'O(1)',     space: 'O(n)', note: 'FIFO pointer updates'  },
  3:  { time: 'O(n)',     space: 'O(n)', note: 'Traversal required'    },
  4:  { time: 'O(log n)', space: 'O(n)', note: 'Balanced BST'          },
  5:  { time: 'O(V+E)',   space: 'O(V)', note: 'BFS / DFS traversal'   },
  6:  { time: 'O(n²)',    space: 'O(n²)',note: 'Grid tabulation'        },
  7:  { time: 'O(n!)',    space: 'O(n)', note: 'Backtracking pruning'   },
  8:  { time: 'O(n log n)',space:'O(n)', note: 'Merge / recombine'      },
  9:  { time: 'O(n/k)',   space: 'O(1)', note: 'Greedy coin selection'  },
  10: { time: 'O(n²)',    space: 'O(1)', note: 'Bubble · O(n log n) Quick' },
  11: { time: 'O(n)',     space: 'O(n)', note: 'Call stack depth'       },
}

/* ─── Variant styles ─────────────────────────────────────────── */
const VARIANT = {
  primary: {
    bg:     'rgba(255,255,255,0.07)',
    border: 'rgba(255,255,255,0.12)',
    hover:  'rgba(255,255,255,0.12)',
    color:  'rgba(255,255,255,0.9)',
  },
  accent: {
    bg:     'rgba(37,99,235,0.1)',
    border: 'rgba(37,99,235,0.25)',
    hover:  'rgba(37,99,235,0.18)',
    color:  'rgba(147,197,253,0.9)',
  },
  danger: {
    bg:     'rgba(220,38,38,0.07)',
    border: 'rgba(220,38,38,0.2)',
    hover:  'rgba(220,38,38,0.14)',
    color:  'rgba(252,165,165,0.9)',
  },
  ghost: {
    bg:     'transparent',
    border: 'rgba(255,255,255,0.07)',
    hover:  'rgba(255,255,255,0.05)',
    color:  'rgba(255,255,255,0.4)',
  },
}

/* ─── OpButton ───────────────────────────────────────────────── */
function OpButton({ op, onClick, index }) {
  const v = VARIANT[op.variant] || VARIANT.ghost
  const [hovered, setHovered] = useState(false)
  return (
    <motion.button
      id={`btn-${op.id}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? v.hover : v.bg,
        border: `1px solid ${hovered ? v.border : v.border}`,
        color: v.color,
        borderRadius: '8px',
        padding: '10px 14px',
        cursor: 'pointer',
        width: '100%',
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'background 0.18s, border-color 0.18s',
        fontFamily: 'inherit',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          {op.label}
        </span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.04em' }}>
          {op.desc}
        </span>
      </div>
      <span style={{ fontSize: '12px', opacity: 0.3 }}>→</span>
    </motion.button>
  )
}

/* ─── Main Component ─────────────────────────────────────────── */
export default function ControlPanel({ onOperation }) {
  const currentScene = useAppStore((s) => s.currentScene)
  const audioEnabled = useAppStore((s) => s.audioEnabled)
  const toggleAudio  = useAppStore((s) => s.toggleAudio)
  const speed        = useAppStore((s) => s.speed)
  const setSpeed     = useAppStore((s) => s.setSpeed)
  const [input, setInput] = useState('')

  const ops         = SCENE_OPS[currentScene] || []
  const placeholder = SCENE_PLACEHOLDERS[currentScene] || 'value…'
  const sceneName   = SCENE_NAMES[currentScene] || ''
  const complexity  = SCENE_COMPLEXITY[currentScene]

  if (!ops.length) return null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>

      {/* ── Scene header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            width: '5px', height: '5px', borderRadius: '50%', background: '#3b82f6',
            display: 'inline-block', boxShadow: '0 0 8px rgba(59,130,246,0.6)',
            animation: 'pulse 2s infinite',
          }}/>
          <span style={{
            fontFamily: "'Syne', sans-serif", fontSize: '9px', fontWeight: 800,
            letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
          }}>
            {sceneName}
          </span>
        </div>
      </div>

      {/* ── Input field ── */}
      <div style={{ position: 'relative' }}>
        <input
          id="ds-value-input"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '8px',
            padding: '10px 40px 10px 14px',
            color: 'rgba(255,255,255,0.85)',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            outline: 'none',
            width: '100%',
            boxSizing: 'border-box',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
          onFocus={e => {
            e.target.style.borderColor = 'rgba(255,255,255,0.2)'
            e.target.style.boxShadow = '0 0 0 3px rgba(255,255,255,0.04)'
          }}
          onBlur={e => {
            e.target.style.borderColor = 'rgba(255,255,255,0.08)'
            e.target.style.boxShadow = 'none'
          }}
          placeholder={placeholder}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && ops[0]) onOperation(ops[0].id, input) }}
        />
        <span style={{
          position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
          fontFamily: 'monospace', fontSize: '9px', color: 'rgba(255,255,255,0.15)',
          letterSpacing: '0.05em',
        }}>↵</span>
      </div>

      {/* ── Operation buttons ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <p style={{
          fontFamily: "'Syne', sans-serif", fontSize: '8px', fontWeight: 700,
          letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)',
          marginBottom: '4px',
        }}>OPERATIONS</p>
        {ops.map((op, i) => (
          <OpButton key={op.id} op={op} index={i} onClick={() => onOperation(op.id, input)} />
        ))}
      </div>

      {/* ── Complexity badge ── */}
      {complexity && (
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '8px',
          padding: '12px 14px',
        }}>
          <p style={{
            fontFamily: "'Syne', sans-serif", fontSize: '8px', fontWeight: 700,
            letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)',
            marginBottom: '10px',
          }}>COMPLEXITY</p>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
            <div style={{
              flex: 1, padding: '6px 10px', borderRadius: '6px',
              background: 'rgba(220,38,38,0.07)', border: '1px solid rgba(220,38,38,0.18)',
              textAlign: 'center',
            }}>
              <p style={{ fontFamily: 'monospace', fontSize: '8px', color: 'rgba(252,165,165,0.5)', marginBottom: '3px' }}>TIME</p>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', fontWeight: 700, color: 'rgba(252,165,165,0.85)' }}>{complexity.time}</p>
            </div>
            <div style={{
              flex: 1, padding: '6px 10px', borderRadius: '6px',
              background: 'rgba(168,85,247,0.07)', border: '1px solid rgba(168,85,247,0.18)',
              textAlign: 'center',
            }}>
              <p style={{ fontFamily: 'monospace', fontSize: '8px', color: 'rgba(216,180,254,0.5)', marginBottom: '3px' }}>SPACE</p>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', fontWeight: 700, color: 'rgba(216,180,254,0.85)' }}>{complexity.space}</p>
            </div>
          </div>
          <p style={{ fontFamily: 'monospace', fontSize: '9px', color: 'rgba(255,255,255,0.2)' }}>{complexity.note}</p>
        </div>
      )}

      {/* ── Speed control ── */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        paddingTop: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{
              fontFamily: "'Syne', sans-serif", fontSize: '8px', fontWeight: 700,
              letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)',
            }}>SPEED</span>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: '10px',
              color: 'rgba(255,255,255,0.5)',
            }}>{speed}×</span>
          </div>
          <input
            id="speed-slider"
            type="range" min="0.25" max="3" step="0.25"
            value={speed}
            onChange={e => setSpeed(parseFloat(e.target.value))}
            style={{
              WebkitAppearance: 'none',
              appearance: 'none',
              width: '100%',
              height: '3px',
              background: `linear-gradient(to right, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.6) ${((speed - 0.25) / 2.75) * 100}%, rgba(255,255,255,0.1) ${((speed - 0.25) / 2.75) * 100}%, rgba(255,255,255,0.1) 100%)`,
              borderRadius: '2px',
              outline: 'none',
              cursor: 'pointer',
            }}
          />
        </div>

        {/* Audio toggle */}
        <button
          id="audio-toggle"
          onClick={toggleAudio}
          style={{
            background: audioEnabled ? 'rgba(255,255,255,0.06)' : 'transparent',
            border: `1px solid ${audioEnabled ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.07)'}`,
            borderRadius: '8px',
            padding: '9px 14px',
            color: audioEnabled ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.28)',
            fontFamily: "'Syne', sans-serif",
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: '12px' }}>{audioEnabled ? '♪' : '♭'}</span>
          Sound {audioEnabled ? 'On' : 'Off'}
        </button>
      </div>
    </div>
  )
}
