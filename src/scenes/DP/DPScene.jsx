import React, { useEffect, useRef } from 'react'
import { animate, createScope, stagger } from 'animejs'
import { useAppStore } from '../../store/dsStore'

export default function DPScene() {
  const matrix = useAppStore(s => s.dpMatrix)
  const highlights = useAppStore(s => s.dpHighlights)
  const containerRef = useRef(null)
  const scope = useRef(null)

  useEffect(() => {
    scope.current = createScope({ root: containerRef.current }).add(() => {
      // Animate cell updates
      animate('.dp-cell-active', {
        scale: [0.8, 1],
        backgroundColor: ['#3b82f6', 'rgba(59, 130, 246, 0.2)']
      }, {
        duration: 500,
        ease: 'outSine'
      });
    });

    return () => scope.current?.revert();
  }, [matrix]);

  if (!matrix || matrix.length === 0) return (
    <div className="flex items-center justify-center h-full text-gray-500 italic opacity-50">
      Initialize matrix to start DP simulation.
    </div>
  );

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center h-full p-10">
      <div className="relative p-8 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-auto max-w-full max-h-full custom-scrollbar">
        <div className="flex flex-col gap-2">
          {matrix.map((rowArr, r) => (
            <div key={r} className="flex gap-2">
              {rowArr.map((val, c) => {
                const isHigh = highlights.some(h => h.r === r && h.c === c)
                const isFilled = val !== null
                
                return (
                  <div 
                    key={`${r}-${c}`}
                    className={`dp-cell w-16 h-16 rounded-xl border flex items-center justify-center font-mono text-lg transition-all duration-300 relative ${
                      isHigh 
                      ? 'bg-blue-500 border-white text-white z-20 scale-110 shadow-[0_0_20px_rgba(59,130,246,0.5)]' 
                      : isFilled 
                        ? 'bg-blue-600/20 border-blue-500/30 text-blue-400' 
                        : 'bg-white/5 border-white/5 text-transparent'
                    } ${isFilled && !isHigh ? 'dp-cell-active' : ''}`}
                  >
                    {val}
                    {isHigh && (
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-black text-white uppercase tracking-widest whitespace-nowrap bg-blue-600 px-2 py-0.5 rounded-full">
                        Computing
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Grid Coordinates Label */}
      <div className="mt-8 flex gap-8">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-md bg-blue-500/20 border border-blue-500/50" />
          <span className="text-[10px] text-blue-400/50 font-black uppercase tracking-widest">Computed States</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-md bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
          <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Active Calculation</span>
        </div>
      </div>
    </div>
  )
}
