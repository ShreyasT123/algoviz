import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { animate, createScope, stagger } from 'animejs';
import { useAppStore } from '../store/dsStore';

const INTRO_DATA = {
  1:  { label:'01', title:'STACK',              subtitle:'Last In, First Out',      color:'rgba(37,99,235,0.8)',   text:'Think of a physical pile of plates. You can only add to the very top, and must remove the top plate before accessing anything underneath. Stacks govern how programs handle function calls and undo histories.' },
  2:  { label:'02', title:'QUEUE',              subtitle:'First In, First Out',     color:'rgba(16,185,129,0.8)',  text:'Exactly like a line at a movie theater. The first person to join is the first one served. Queues power web traffic management, task scheduling, and message protocols.' },
  3:  { label:'03', title:'LINKED LIST',        subtitle:'Scattered Memory Chains', color:'rgba(245,158,11,0.8)',  text:'Unlike arrays, linked lists scatter data across memory. Each node contains a value and a pointer to the next node — forming a chain across non-contiguous memory addresses.' },
  4:  { label:'04', title:'BINARY TREE',        subtitle:'Hierarchical Traversal',  color:'rgba(99,102,241,0.8)', text:'Data organized like a root system. Every node branches into at most two directions — smaller values left, larger right. This geometry collapses search time from O(n) to O(log n).' },
  5:  { label:'05', title:'GRAPH',              subtitle:'Webs of Reality',         color:'rgba(6,182,212,0.8)',   text:'The most versatile data structure. Graphs model roads, social networks, and the internet itself. Nodes connect via edges — forming complex, traversable networks.' },
  6:  { label:'06', title:'DYNAMIC PROG.',      subtitle:'Remember the Past',       color:'rgba(168,85,247,0.8)', text:'Why calculate what you already know? DP breaks massive problems into subproblems, storing results in a table. The grid traveler algorithm fills an n×m table of paths from (0,0) to (n,m).' },
  7:  { label:'07', title:'BACKTRACKING',       subtitle:'The N-Queens Paradigm',   color:'rgba(239,68,68,0.8)',  text:'The ultimate trial and error. Backtracking explores a path until it hits a dead end, then physically undoes its last move. Visualized using the classic N-Queens chess problem.' },
  8:  { label:'08', title:'DIVIDE & CONQUER',   subtitle:'Shatter to Solve',        color:'rgba(20,184,166,0.8)', text:'Solving 10,000 items is hard. Solving 1 item is trivial. D&C recursively splits a problem in half until each piece is solvable, then stitches results back together.' },
  9:  { label:'09', title:'GREEDY',             subtitle:"The Cashier's Dilemma",   color:'rgba(251,146,60,0.8)', text:"Greedy logic asks only: 'What's the best move right now?' Visualized with coin change — always picking the largest denomination until the target sum is reached." },
  10: { label:'10', title:'SORTING',            subtitle:'Imposing Order on Chaos', color:'rgba(52,211,153,0.8)', text:'The foundational problem of Computer Science. Watch entropy resolve as Bubble Sort and Quick Sort physically swap array elements into their correct positions.' },
  11: { label:'11', title:'RECURSION',          subtitle:'The Call Stack',          color:'rgba(129,140,248,0.8)',text:'A function that summons copies of itself. Memory frames stack up until the base case is hit, then collapse back down carrying the final answer. Visualized as factorial recursion.' },
};

export default function IntroOverlay() {
  const currentScene = useAppStore(s => s.currentScene);
  const hasSeenIntro = useAppStore(s => s.hasSeenIntro);
  const setSeenIntro = useAppStore(s => s.setSeenIntro);

  if (currentScene === 0) return null;
  const data = INTRO_DATA[currentScene];
  if (!data) return null;

  return (
    <AnimatePresence>
      {!hasSeenIntro && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(10,10,14,0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: '640px', width: '100%' }}
          >
            {/* Index label */}
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px', color: 'rgba(255,255,255,0.2)',
              letterSpacing: '0.25em', marginBottom: '24px',
            }}>
              {data.label} / 11
            </p>

            {/* Accent line */}
            <div style={{
              width: '40px', height: '2px',
              background: data.color,
              marginBottom: '28px',
              borderRadius: '2px',
            }}/>

            {/* Title */}
            <h1 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(36px, 6vw, 72px)',
              fontWeight: 900, lineHeight: 0.9,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              marginBottom: '12px',
            }}>
              {data.title}
            </h1>

            {/* Subtitle */}
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '13px', color: data.color,
              letterSpacing: '0.08em', marginBottom: '32px',
            }}>
              {data.subtitle}
            </p>

            {/* Body text */}
            <p style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '15px', lineHeight: '1.7',
              color: 'rgba(255,255,255,0.45)',
              marginBottom: '48px',
              maxWidth: '520px',
            }}>
              {data.text}
            </p>

            {/* CTA */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                onClick={() => setSeenIntro(true)}
                style={{
                  padding: '13px 32px',
                  background: '#ffffff',
                  color: '#0c0c0e',
                  border: 'none',
                  borderRadius: '40px',
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '12px',
                  fontWeight: 800,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'transform 0.15s, opacity 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
                onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                Start Exploring
              </button>
              <span style={{
                fontFamily: 'monospace', fontSize: '11px',
                color: 'rgba(255,255,255,0.18)', letterSpacing: '0.1em',
              }}>
                press anywhere to skip →
              </span>
            </div>

          </motion.div>

          {/* Click-anywhere-to-skip */}
          <div
            style={{ position: 'absolute', inset: 0, zIndex: -1, cursor: 'pointer' }}
            onClick={() => setSeenIntro(true)}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
