import React, { useEffect, useRef } from 'react'
import { animate, createScope } from 'animejs'
import { useAppStore } from '../../store/dsStore'

export default function BacktrackingScene() {
  const N = useAppStore(s => s.btBoardSize)
  const board = useAppStore(s => s.btBoard)
  const activeCell = useAppStore(s => s.btActiveCell)
  const containerRef = useRef(null)
  const scope = useRef(null)

  useEffect(() => {
    scope.current = createScope({ root: containerRef.current }).add(() => {
      // Animate queen placements
      animate('.queen-token', {
        scale: [0, 1],
        opacity: [0, 1]
      }, {
        ease: 'outElastic(1, .8)',
        duration: 500
      });
    });

    return () => scope.current?.revert();
  }, [board]);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center h-full p-10 overflow-hidden">
      <div 
        className="relative p-4 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${N}, 1fr)`,
          gap: '4px',
          width: 'min(70vh, 80vw)',
          height: 'min(70vh, 80vw)'
        }}
      >
        {Array.from({ length: N * N }).map((_, i) => {
          const r = Math.floor(i / N)
          const c = i % N
          const isLight = (r + c) % 2 === 0
          const hasQueen = board[r] === c
          const isActive = activeCell && activeCell.r === r && activeCell.c === c
          const isClash = isActive && activeCell.status === 'clash'
          
          return (
            <div 
              key={i}
              className={`relative rounded-lg flex items-center justify-center transition-colors duration-300 ${
                isLight ? 'bg-white/10' : 'bg-black/20'
              } ${isActive ? 'ring-2 ring-blue-500 ring-inset' : ''}`}
            >
              {/* Tile Coordinates */}
              <span className="absolute top-1 left-1 text-[8px] opacity-20 font-mono text-white">
                {r},{c}
              </span>

              {/* Placed Queen */}
              {hasQueen && (
                <div className="queen-token w-2/3 h-2/3 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.8)] flex items-center justify-center border-2 border-white/20">
                  <span className="text-white text-xl">♛</span>
                </div>
              )}

              {/* Active Checking Queen */}
              {isActive && !hasQueen && (
                <div className={`w-2/3 h-2/3 rounded-full flex items-center justify-center border-2 animate-pulse ${
                  isClash ? 'bg-red-500 border-red-200 shadow-[0_0_20px_rgba(239,68,68,0.8)]' : 'bg-yellow-500/50 border-yellow-200 shadow-[0_0_20px_rgba(234,179,8,0.5)]'
                }`}>
                  <span className="text-white text-xl">{isClash ? '✕' : '♛'}</span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Stats Overlay */}
      <div className="mt-8 flex gap-8">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
          <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Placed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
          <span className="text-[10px] text-red-400 font-black uppercase tracking-widest">Conflict</span>
        </div>
        <div className="flex items-center gap-2 text-white/50">
          <span className="text-[10px] font-mono">N = {N}</span>
        </div>
      </div>
    </div>
  )
}
