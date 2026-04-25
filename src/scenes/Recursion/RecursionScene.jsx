import React, { useEffect, useRef } from 'react'
import { animate, createScope, stagger } from 'animejs'
import { useAppStore } from '../../store/dsStore'

export default function RecursionScene() {
  const frames = useAppStore(s => s.recursionFrames)
  const containerRef = useRef(null)
  const scope = useRef(null)

  useEffect(() => {
    scope.current = createScope({ root: containerRef.current }).add(() => {
      animate('.recursion-frame', {
        translateX: [30, 0],
        opacity: [0, 1],
        scale: [0.9, 1]
      }, {
        delay: stagger(100),
        ease: 'outElastic(1, .8)',
        duration: 800
      });
    });

    return () => scope.current?.revert();
  }, [frames.length]);

  if (!frames || frames.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 font-medium italic opacity-50 px-10 text-center">
        <div className="text-3xl mb-4 font-black not-italic opacity-20 uppercase tracking-widest">Recursion Engine</div>
        Enter a number and press "Recurse" to visualize the call stack.
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-full px-10 relative">
      <div className="absolute top-10 flex flex-col items-center">
        <h2 className="text-[10px] font-black tracking-[0.4em] uppercase text-blue-500/50 mb-2">Recursive Call Stack</h2>
        <div className="w-12 h-[2px] bg-blue-500/20" />
      </div>

      <div 
        ref={containerRef}
        className="flex flex-col-reverse items-center gap-4 w-full max-w-lg mt-10"
      >
        {frames.map((frame, i) => {
          const isBase = frame.phase === 'base'
          const isRet = frame.phase === 'returning'
          
          return (
            <div 
              key={`${frame.arg}-${i}`}
              className={`recursion-frame w-full p-5 rounded-2xl border-2 transition-all duration-500 backdrop-blur-xl flex items-center justify-between shadow-2xl relative ${
                isBase 
                ? 'bg-blue-600 border-white text-white z-20 scale-105 shadow-[0_0_30px_rgba(255,255,255,0.3)]' 
                : isRet
                  ? 'bg-red-600/20 border-red-500 text-red-400'
                  : 'bg-blue-600/10 border-blue-500/30 text-blue-400'
              }`}
            >
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">Frame {i}</span>
                <span className="text-xl font-black">factorial({frame.arg})</span>
              </div>

              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold uppercase tracking-tighter opacity-50 mb-1">State</span>
                <span className={`text-sm font-black uppercase ${isBase ? 'text-white' : ''}`}>
                  {frame.phase === 'calling' ? 'Calling...' : isBase ? 'Base Case Hit' : `Returning ${frame.result}`}
                </span>
              </div>

              {isBase && (
                <div className="absolute -inset-1 rounded-2xl border border-white/50 animate-ping pointer-events-none" />
              )}
            </div>
          )
        })}
      </div>

      {/* Legend Overlay */}
      <div className="fixed bottom-20 right-10 flex flex-col gap-3 p-6 bg-black/40 border border-white/5 rounded-3xl backdrop-blur-2xl">
        <div className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 mb-2">Phase Indicators</div>
        {[
          { color: 'bg-blue-500', label: 'Calling' },
          { color: 'bg-white', label: 'Base Case' },
          { color: 'bg-red-500', label: 'Returning' },
        ].map(p => (
          <div key={p.label} className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${p.color}`} />
            <span className="text-[10px] font-bold text-white/50 uppercase">{p.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
