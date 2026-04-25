import React, { useEffect, useRef } from 'react'
import { animate, createScope, stagger } from 'animejs'
import { useAppStore } from '../../store/dsStore'

export default function SortingScene() {
  const sortArray = useAppStore(s => s.sortArray)
  const sortHighlights = useAppStore(s => s.sortHighlights)
  const containerRef = useRef(null)
  const scope = useRef(null)

  useEffect(() => {
    scope.current = createScope({ root: containerRef.current }).add(() => {
      animate('.sort-bar', {
        scaleY: [0, 1],
        opacity: [0, 1]
      }, {
        delay: stagger(50),
        ease: 'outElastic(1, .8)',
        duration: 800
      });
    });

    return () => scope.current?.revert();
  }, []);

  const maxVal = Math.max(...sortArray, 1)

  return (
    <div className="flex flex-col items-center justify-center h-full px-10">
      <div 
        ref={containerRef}
        className="flex items-end justify-center gap-2 w-full h-64 max-w-4xl border-b border-white/10 pb-2"
      >
        {sortArray.map((val, idx) => {
          const isHigh = sortHighlights.includes(idx)
          const heightPercent = (val / maxVal) * 100
          
          return (
            <div 
              key={`bar-${idx}-${val}`}
              className={`sort-bar flex-1 rounded-t-lg transition-all duration-300 relative group flex items-center justify-center ${
                isHigh 
                ? 'bg-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.5)] z-10 scale-x-110' 
                : 'bg-gradient-to-t from-blue-600/40 to-blue-400/20 border border-white/5'
              }`}
              style={{ 
                height: `${heightPercent}%`,
                transformOrigin: 'bottom'
              }}
            >
              <div className={`absolute -top-10 font-mono font-bold text-lg transition-colors ${isHigh ? 'text-blue-400' : 'text-white/50'}`}>
                {val}
              </div>
              
              {isHigh && (
                <div className="absolute inset-0 bg-white/20 animate-pulse rounded-t-lg" />
              )}
            </div>
          )
        })}
      </div>

      {/* Controls Info */}
      <div className="mt-16 flex flex-col items-center gap-4">
        <div className="flex gap-8">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-blue-500/30 border border-blue-500/50" />
            <span className="text-[10px] text-blue-400/50 font-black uppercase tracking-widest">Unsorted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
            <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Active Swap</span>
          </div>
        </div>
        
        <p className="text-white/30 text-[11px] font-medium max-w-md text-center leading-relaxed">
          The visualization uses relative heights to represent values. <br/>
          Watch the bars shift as the algorithm partitions the dataset.
        </p>
      </div>
    </div>
  )
}
