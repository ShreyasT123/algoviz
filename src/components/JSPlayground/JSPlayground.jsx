import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../../store/dsStore'

// Syntax Highlighting
import Editor from 'react-simple-code-editor'
import Prism from 'prismjs'
// JavaScript is included in the default prismjs bundle, so we don't need to import the component.
import 'prismjs/themes/prism-tomorrow.css'

const CodeEditor = Editor.default || Editor;

/* ── Lightweight Chart Component ────────────────────────────── */
function MiniChart({ data, isLarge }) {
  if (!data || data.length < 2) return null
  const maxVal = Math.max(...data.map(d => d.y))
  const minVal = Math.min(...data.map(d => d.y))
  const range = maxVal - minVal || 1
  const width = 400
  const height = 150
  const points = data.map((d, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - ((d.y - minVal) / range) * height
  }))
  const path = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ 
        marginTop: '24px', 
        background: 'rgba(255,255,255,0.03)', 
        padding: '20px', 
        borderRadius: '16px', 
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
      }}
    >
      <p style={{ fontSize: '10px', fontWeight: 800, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' }}>Performance Profiler</p>
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path d={path} fill="none" stroke="url(#lineGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill="#3b82f6" />
        ))}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
        <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace' }}>N = {data[0].x}</span>
        <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace' }}>N = {data[data.length-1].x}</span>
      </div>
    </motion.div>
  )
}

/* ── Comprehensive Templates ────────────────────────────────── */
const TEMPLATES = {
  1: { label: 'Stack', code: `// Stack (LIFO)\nclass Stack {\n  constructor() { this.items = []; }\n  push(v) { this.items.push(v); }\n  pop() { return this.items.pop(); }\n}\n\nbenchmark("Stack Operations", (n) => {\n  const s = new Stack();\n  const start = performance.now();\n  for(let i=0; i<n; i++) s.push(i);\n  return performance.now() - start;\n}, { maxN: 50000 });` },
  2: { label: 'Queue', code: `// Queue (FIFO)\nclass Queue {\n  constructor() { this.items = []; }\n  enqueue(v) { this.items.push(v); }\n  dequeue() { return this.items.shift(); }\n}\n\nbenchmark("Queue Dequeue", (n) => {\n  const q = new Queue();\n  for(let i=0; i<n; i++) q.enqueue(i);\n  const start = performance.now();\n  for(let i=0; i<n; i++) q.dequeue();\n  return performance.now() - start;\n}, { maxN: 20000 });` },
  3: { label: 'Linked List', code: `// Node Chain\nclass Node {\n  constructor(v) { this.val = v; this.next = null; }\n}\n\nbenchmark("List Insertion", (n) => {\n  const head = new Node(0);\n  let curr = head;\n  const start = performance.now();\n  for(let i=0; i<n; i++) {\n    curr.next = new Node(i);\n    curr = curr.next;\n  }\n  return performance.now() - start;\n}, { maxN: 30000 });` },
  4: { label: 'Binary Tree', code: `// BST Insertion\nclass TNode {\n  constructor(v) { this.val = v; this.left = null; this.right = null; }\n}\n\nfunction insert(root, v) {\n  if(!root) return new TNode(v);\n  if(v < root.val) root.left = insert(root.left, v);\n  else root.right = insert(root.right, v);\n  return root;\n}\n\nbenchmark("BST Balance Case", (n) => {\n  let root = null;\n  const start = performance.now();\n  for(let i=0; i<n; i++) root = insert(root, Math.random());\n  return performance.now() - start;\n}, { maxN: 10000 });` },
  5: { label: 'Graph', code: `// Adjacency List\nconst adj = new Map();\nfunction addEdge(u, v) {\n  if(!adj.has(u)) adj.set(u, []);\n  adj.get(u).push(v);\n}\n\nbenchmark("Graph Building", (n) => {\n  adj.clear();\n  const start = performance.now();\n  for(let i=0; i<n; i++) addEdge(i, i+1);\n  return performance.now() - start;\n}, { maxN: 20000 });` },
  6: { label: 'DP', code: `// Grid Traveler (Memoization)\nfunction gridTraveler(m, n, memo = {}) {\n  const key = m + ',' + n;\n  if(key in memo) return memo[key];\n  if(m === 1 && n === 1) return 1;\n  if(m === 0 || n === 0) return 0;\n  memo[key] = gridTraveler(m-1, n, memo) + gridTraveler(m, n-1, memo);\n  return memo[key];\n}\n\nbenchmark("DP Grid Scaling", (n) => {\n  const start = performance.now();\n  gridTraveler(n, n);\n  return performance.now() - start;\n}, { maxN: 15 });` },
  7: { label: 'Backtracking', code: `// N-Queens Logic\nfunction isSafe(board, row, col) {\n  for(let i=0; i<row; i++) \n    if(board[i] === col || Math.abs(board[i]-col) === row-i) return false;\n  return true;\n}\n\nbenchmark("Safe Checks", (n) => {\n  const start = performance.now();\n  isSafe(Array(n).fill(0), n-1, n-1);\n  return performance.now() - start;\n}, { maxN: 10000 });` },
  8: { label: 'Divide & Conquer', code: `// Merge Sort\nfunction mergeSort(arr) {\n  if(arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  return merge(left, right);\n}\n\nfunction merge(left, right) {\n  let res = [], i=0, j=0;\n  while(i<left.length && j<right.length)\n    res.push(left[i] < right[j] ? left[i++] : right[j++]);\n  return res.concat(left.slice(i)).concat(right.slice(j));\n}\n\nbenchmark("Merge Sort O(n log n)", (n) => {\n  const test = Array.from({length: n}, () => Math.random());\n  const start = performance.now();\n  mergeSort(test);\n  return performance.now() - start;\n}, { maxN: 5000 });` },
  9: { label: 'Greedy', code: `// Greedy Change\nfunction getChange(target, coins) {\n  let count = 0, rem = target;\n  for(const c of coins) {\n    count += Math.floor(rem / c);\n    rem %= c;\n  }\n  return count;\n}\n\nbenchmark("Greedy iterations", (n) => {\n  const start = performance.now();\n  for(let i=0; i<n; i++) getChange(100, [25, 10, 5, 1]);\n  return performance.now() - start;\n}, { maxN: 50000 });` },
  10: { label: 'Sorting', code: `// Bubble Sort (O(n^2))\nfunction bubbleSort(a) {\n  a = [...a];\n  for(let i=0; i<a.length; i++)\n    for(let j=0; j<a.length-i-1; j++)\n      if(a[j] > a[j+1]) [a[j],a[j+1]]=[a[j+1],a[j]];\n  return a;\n}\n\nbenchmark("Bubble Sort", (n) => {\n  const test = Array.from({length: n}, () => Math.random());\n  const start = performance.now();\n  bubbleSort(test);\n  return performance.now() - start;\n}, { maxN: 1500 });` },
  11: { label: 'Recursion', code: `// Factorial Recursion\nfunction fact(n) {\n  if(n <= 1) return 1;\n  return n * fact(n-1);\n}\n\nbenchmark("Recursion Depth", (n) => {\n  const start = performance.now();\n  for(let i=0; i<100; i++) fact(n % 100);\n  return performance.now() - start;\n}, { maxN: 1000 });` },
}

export default function JSPlayground() {
  const currentScene = useAppStore(s => s.currentScene)
  const tmpl = TEMPLATES[currentScene] || { label: 'General', code: '// JS Editor\nconsole.log("Hello");' }
  const [code, setCode] = useState(tmpl.code)
  const [output, setOutput] = useState([])
  const [chartData, setChartData] = useState(null)
  const [error, setError] = useState(null)
  const [running, setRunning] = useState(false)
  const [open, setOpen] = useState(false)
  const [isLarge, setIsLarge] = useState(false)
  const [showResults, setShowResults] = useState(false)
  
  const setPlaygroundExpanded = useAppStore(s => s.setPlaygroundExpanded)
  const leftSidebarCollapsed = useAppStore(s => s.leftSidebarCollapsed)
  const prevScene = useRef(currentScene)

  useEffect(() => {
    if (prevScene.current !== currentScene) {
      prevScene.current = currentScene
      setCode(TEMPLATES[currentScene]?.code || tmpl.code)
      setOutput([]); setChartData(null); setError(null);
      setShowResults(false); setIsLarge(false); setPlaygroundExpanded(false);
    }
  }, [currentScene, tmpl.code, setPlaygroundExpanded])

  const toggleLarge = useCallback(() => {
    const next = !isLarge
    setIsLarge(next)
    setPlaygroundExpanded(next)
    if (next) setOpen(true)
  }, [isLarge, setPlaygroundExpanded])

  const run = useCallback(() => {
    setRunning(true); setChartData(null); setOutput([]); setError(null);
    if (isLarge) setShowResults(true)
    setTimeout(() => {
      const logs = [], plotPoints = []
      const fakeConsole = { log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')) }
      const benchmark = (name, fn, opts = {}) => {
        const steps = opts.steps || 10, maxN = opts.maxN || 10000, iters = opts.iterations || 3
        for(let i=1; i<=steps; i++) {
          const n = Math.floor((i/steps) * maxN); let totalTime = 0
          fn(Math.floor(n/10))
          for(let k=0; k<iters; k++) totalTime += fn(n)
          plotPoints.push({ x: n, y: totalTime / iters })
        }
      }
      try {
        const fn = new Function('console', 'benchmark', code)
        fn(fakeConsole, benchmark)
        setOutput(logs)
        if(plotPoints.length > 0) setChartData(plotPoints)
      } catch (e) { setError(e.message) }
      setRunning(false)
    }, 400)
  }, [code, isLarge])

  return (
    <div style={{ position: 'relative', marginTop: '16px' }}>
      {/* Container with layout animation */}
      <motion.div
        layout
        transition={{ type: 'spring', damping: 25, stiffness: 120 }}
        style={isLarge ? {
          position: 'fixed',
          top: '40px', right: '40px', bottom: '40px',
          left: leftSidebarCollapsed ? '40px' : '360px', // Clear the sidebar or take full width
          zIndex: 500,
          background: '#0c0c0e',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '24px',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 50px 150px rgba(0,0,0,0.9)',
          overflow: 'hidden',
        } : {
          position: 'relative',
          display: 'flex', flexDirection: 'column',
          background: 'rgba(255,255,255,0.01)',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.06)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: isLarge ? '20px 32px' : '12px 14px',
          background: 'rgba(255,255,255,0.02)',
          borderBottom: (isLarge || open) ? '1px solid rgba(255,255,255,0.08)' : 'none',
          cursor: isLarge ? 'default' : 'pointer',
        }} onClick={() => !isLarge && setOpen(v => !v)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '14px', height: '14px', borderRadius: '4px', background: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '8px', color: 'var(--text-primary)' }}>⚡</span>
            </div>
            <span style={{ fontFamily: "'Syne',sans-serif", fontSize: '10px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
              {tmpl.label} Sandbox
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
             <button 
               onClick={(e) => { e.stopPropagation(); toggleLarge(); }} 
               style={{ 
                 background: 'transparent', 
                 border: '1px solid var(--panel-border)', 
                 padding: '5px 12px', borderRadius: '6px', 
                 color: 'var(--text-primary)', fontSize: '9px', fontWeight: 800, cursor: 'pointer',
                 textTransform: 'uppercase', letterSpacing: '0.05em'
               }}
             >
               {isLarge ? 'CLOSE' : 'EXPAND'}
             </button>
             {!isLarge && <span style={{ color: 'var(--text-muted)', fontSize: '10px' }}>{open ? '▲' : '▼'}</span>}
          </div>
        </div>

        <AnimatePresence initial={false}>
          {(open || isLarge) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: 'flex', flex: 1, overflow: 'hidden' }}
            >
              <div style={{ display: 'flex', width: '100%', height: '100%' }}>
                <AnimatePresence>
                  {(isLarge && showResults) && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: '40%', opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      style={{ background: 'rgba(0,0,0,0.4)', borderRight: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', padding: '32px', overflowY: 'auto' }}
                    >
                      <h3 style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '24px' }}>Profiling Results</h3>
                      {error && <div style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '12px', color: 'var(--accent-rose)', fontSize: '12px', fontFamily: 'monospace', marginBottom: '24px' }}>{error}</div>}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {output.map((o, i) => <div key={i} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}><span style={{ color: 'var(--accent-blue)', marginRight: '8px' }}>λ</span>{o}</div>)}
                      </div>
                      {chartData && <MiniChart data={chartData} isLarge={true} />}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ flex: 1, padding: '24px', overflowY: 'auto', background: isLarge ? '#0c0c0e' : 'rgba(255,255,255,0.015)' }}>
                    <CodeEditor
                      value={code}
                      onValueChange={setCode}
                      highlight={code => Prism.highlight(code, Prism.languages.js, 'javascript')}
                      padding={20}
                      style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: isLarge ? 14 : 11, minHeight: '100%', color: '#9cdcfe' }}
                      textareaClassName="playground-textarea"
                    />
                  </div>
                  <div style={{ padding: isLarge ? '24px 32px' : '16px', borderTop: '1px solid var(--panel-border)', background: 'rgba(255,255,255,0.01)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <button onClick={run} disabled={running} style={{ padding: '10px 28px', borderRadius: '10px', background: 'var(--accent-blue)', color: 'var(--text-primary)', border: 'none', fontWeight: 800, fontSize: '11px', cursor: 'pointer' }}>{running ? '...' : 'RUN ANALYZER'}</button>
                    {!isLarge && <button onClick={() => { setOutput([]); setChartData(null); }} style={{ background: 'transparent', border: '1px solid var(--panel-border)', color: 'var(--text-tertiary)', padding: '10px 16px', borderRadius: '8px', fontSize: '10px' }}>RESET</button>}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
