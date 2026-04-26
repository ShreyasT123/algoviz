import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../../store/dsStore'
import InfoPanel from '../InfoPanel/InfoPanel'
import JSPlayground from '../JSPlayground/JSPlayground'

/* ─── Pseudocode data ─────────────────────────────────────────── */
const PSEUDOCODE = {
  push: [
    'function push(value):',
    '  if stack is full:',
    '    raise OverflowError',
    '  stack[top] ← value',
    '  top ← top + 1',
  ],
  pop: [
    'function pop():',
    '  if stack is empty:',
    '    raise UnderflowError',
    '  val ← stack[top]',
    '  top ← top - 1',
    '  return val',
  ],
  peek: [
    'function peek():',
    '  return stack[top]',
  ],
  enqueue: [
    'function enqueue(value):',
    '  queue[tail] ← value',
    '  tail ← tail + 1',
  ],
  dequeue: [
    'function dequeue():',
    '  if isEmpty() → error',
    '  val ← queue[head]',
    '  head ← head + 1',
    '  return val',
  ],
  insert: [
    'function insert(val, pos):',
    '  node ← new Node(val)',
    '  node.next ← list[pos]',
    '  list[pos-1].next ← node',
  ],
  delete: [
    'function delete(node):',
    '  prev.next ← node.next',
    '  free(node)',
  ],
  bfs: [
    'function BFS(root):',
    '  queue ← [root]',
    '  while queue not empty:',
    '    node ← queue.dequeue()',
    '    visit(node)',
    '    enqueue(node.children)',
  ],
  dfs: [
    'function DFS(node):',
    '  visit(node)',
    '  for child in children:',
    '    DFS(child)',
  ],
  addNode: [
    'function addNode(graph, val):',
    '  node ← new Node(val)',
    '  graph.nodes.append(node)',
  ],
  addEdge: [
    'function addEdge(u, v):',
    '  u.edges.append(v)',
    '  v.edges.append(u)',
  ],
  dpRun: [
    'function gridTraveler(r, c):',
    '  dp[0][0] = 1',
    '  for r in rows:',
    '    for c in cols:',
    '      dp[r][c] = dp[r-1][c]',
    '               + dp[r][c-1]',
  ],
  dcRun: [
    'function split(Array):',
    '  mid ← len(Array) / 2',
    '  left ← Array[0 … mid]',
    '  right ← Array[mid … end]',
    '  return left, right',
  ],
  greedyRun: [
    'function coinChange(target):',
    '  for coin in [25,10,5,1]:',
    '    while target >= coin:',
    '      target -= coin',
    '      coins.push(coin)',
    '  return coins',
  ],
  sortBubble: [
    'function bubbleSort(A):',
    '  for i from 0 to n:',
    '    for j from 0 to n-i-1:',
    '      if A[j] > A[j+1]:',
    '        swap(A[j], A[j+1])',
  ],
  sortQuick: [
    'function quickSort(A, lo, hi):',
    '  if lo < hi:',
    '    p ← partition(A, lo, hi)',
    '    quickSort(A, lo, p-1)',
    '    quickSort(A, p+1, hi)',
  ],
  recRun: [
    'function factorial(n):',
    '  if n <= 1:',
    '    return 1          // base',
    '  return n * fact(n-1)',
  ],
  btRun: [
    'function nQueens(row):',
    '  if row == N: return True',
    '  for col in 0..N-1:',
    '    if isSafe(row, col):',
    '      placeQueen(row, col)',
    '      if nQueens(row+1): True',
    '      removeQueen(row, col)',
    '  return False',
  ],
}

const BIG_O = {
  push:       { time: 'O(1)',      space: 'O(1)'    },
  pop:        { time: 'O(1)',      space: 'O(1)'    },
  peek:       { time: 'O(1)',      space: 'O(1)'    },
  enqueue:    { time: 'O(1)',      space: 'O(1)'    },
  dequeue:    { time: 'O(1)',      space: 'O(1)'    },
  insert:     { time: 'O(n)',      space: 'O(1)'    },
  delete:     { time: 'O(n)',      space: 'O(1)'    },
  bfs:        { time: 'O(V+E)',    space: 'O(V)'    },
  dfs:        { time: 'O(V+E)',    space: 'O(V)'    },
  addNode:    { time: 'O(1)',      space: 'O(1)'    },
  addEdge:    { time: 'O(1)',      space: 'O(1)'    },
  dpRun:      { time: 'O(n²)',     space: 'O(n²)'   },
  dcRun:      { time: 'O(n log n)',space: 'O(n)'    },
  greedyRun:  { time: 'O(n/k)',    space: 'O(1)'    },
  sortBubble: { time: 'O(n²)',     space: 'O(1)'    },
  sortQuick:  { time: 'O(n log n)',space: 'O(log n)'},
  recRun:     { time: 'O(n)',      space: 'O(n)'    },
  btRun:      { time: 'O(n!)',     space: 'O(n)'    },
}

/* ─── Token colouring (minimal) ─────────────────────────────── */
function colorToken(word) {
  if (/^(function|return|if|for|while|raise|in)$/.test(word)) return 'rgba(147,197,253,0.8)'
  if (/^(True|False|None|null|error)$/.test(word)) return 'rgba(252,165,165,0.8)'
  if (/^\d+$/.test(word)) return 'rgba(216,180,254,0.8)'
  if (word.startsWith('//')) return 'rgba(255,255,255,0.2)'
  return null
}

function CodeLine({ line, isActive, lineNum }) {
  return (
    <motion.div
      animate={{ opacity: isActive ? 1 : 0.42 }}
      transition={{ duration: 0.2 }}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '10.5px',
        padding: '4px 10px',
        borderRadius: '4px',
        background: isActive ? 'rgba(37,99,235,0.1)' : 'transparent',
        borderLeft: isActive ? '2px solid rgba(37,99,235,0.7)' : '2px solid transparent',
        transition: 'background 0.2s',
      }}
    >
      <span style={{ color: 'rgba(255,255,255,0.18)', minWidth: '16px', textAlign: 'right', fontSize: '9px' }}>
        {lineNum}
      </span>
      <span style={{ color: isActive ? 'rgba(147,197,253,0.9)' : 'rgba(255,255,255,0.6)', letterSpacing: '-0.01em' }}>
        {line}
      </span>
      {isActive && (
        <motion.span
          layoutId="beam"
          style={{
            position: 'absolute', right: '10px',
            width: '6px', height: '6px', borderRadius: '50%',
            background: 'rgba(37,99,235,0.9)',
            boxShadow: '0 0 8px rgba(37,99,235,0.6)',
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
    </motion.div>
  )
}

/* ─── Main component ─────────────────────────────────────────── */
export default function CodePanel({ activeOp, activeLine }) {
  const lines = PSEUDOCODE[activeOp] || []
  const bigo  = BIG_O[activeOp]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>

      {/* Info panel (structure description) */}
      <InfoPanel />


      {/* Pseudocode panel */}
      <AnimatePresence>
        {activeOp && (
          <motion.div
            key={activeOp}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 12px',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              background: 'rgba(255,255,255,0.02)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Traffic light dots */}
                {['rgba(255,95,87,0.5)','rgba(255,189,46,0.5)','rgba(40,200,64,0.5)'].map((c,i) => (
                  <span key={i} style={{ width: '7px', height: '7px', borderRadius: '50%', background: c, display: 'inline-block' }}/>
                ))}
              </div>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: '9px',
                color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em',
              }}>
                {activeOp.toUpperCase()} · pseudocode
              </span>
              {bigo && (
                <div style={{ display: 'flex', gap: '5px' }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: '8px',
                    padding: '2px 6px', borderRadius: '4px',
                    background: 'rgba(220,38,38,0.1)', color: 'rgba(252,165,165,0.7)',
                    border: '1px solid rgba(220,38,38,0.18)',
                  }}>T: {bigo.time}</span>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: '8px',
                    padding: '2px 6px', borderRadius: '4px',
                    background: 'rgba(168,85,247,0.1)', color: 'rgba(216,180,254,0.7)',
                    border: '1px solid rgba(168,85,247,0.18)',
                  }}>S: {bigo.space}</span>
                </div>
              )}
            </div>

            {/* Code body */}
            <div style={{ padding: '8px 4px' }}>
              {lines.map((line, i) => (
                <CodeLine
                  key={i}
                  line={line}
                  lineNum={i + 1}
                  isActive={i === activeLine}
                />
              ))}
            </div>

            {/* Progress bar */}
            {activeLine >= 0 && activeLine < lines.length && (
              <div style={{ padding: '0 12px 10px' }}>
                <div style={{ height: '2px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
                  <motion.div
                    style={{
                      height: '100%', borderRadius: '2px',
                      background: 'rgba(37,99,235,0.6)',
                    }}
                    animate={{ width: `${((activeLine + 1) / lines.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p style={{
                  fontFamily: 'monospace', fontSize: '8px',
                  color: 'rgba(255,255,255,0.15)', marginTop: '5px',
                  textAlign: 'right',
                }}>
                  line {activeLine + 1} / {lines.length}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* JS Playground */}
      <JSPlayground />
    </div>
  )
}
