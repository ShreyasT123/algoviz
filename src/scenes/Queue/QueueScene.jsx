import React, { useEffect, useRef } from 'react'
import { animate, createScope, stagger } from 'animejs'
import { useAppStore } from '../../store/dsStore'

export default function QueueScene() {
  const queue = useAppStore(s => s.queue)
  const containerRef = useRef(null)
  const scope = useRef(null)

  useEffect(() => {
    scope.current = createScope({ root: containerRef.current }).add(() => {
      animate('.queue-item', {
        translateX: [-40, 0],
        opacity: [0, 1],
        scale: [0.8, 1]
      }, {
        delay: stagger(80),
        ease: 'outElastic(1, .8)',
        duration: 700
      });
    });
    return () => scope.current?.revert();
  }, [queue.length]);

  return (
    <div className="flex flex-col items-center justify-center h-full px-12 overflow-hidden">
      <div className="w-full flex items-center justify-center gap-1 mb-8">
        <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-orange-500/20" />
        <span className="text-[10px] font-black tracking-[0.3em] uppercase text-orange-500/50">Front</span>
        <div className="h-[2px] w-8 bg-orange-500/20" />
      </div>

      <div 
        ref={containerRef}
        className="flex items-center gap-4 w-full justify-center flex-wrap"
      >
        {queue.map((item, index) => (
          <div 
            key={`${item}-${index}`}
            className="queue-item min-w-[120px] py-6 px-4 bg-gradient-to-br from-orange-600/20 to-red-600/20 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col items-center justify-center relative group"
          >
            <div className="absolute top-2 left-3 text-[9px] font-mono text-orange-400/50 uppercase">
              Pos {index}
            </div>
            <span className="text-2xl font-black text-white mb-1">{item}</span>
            <div className="w-8 h-1 bg-orange-500/30 rounded-full" />
            
            {/* Directional Glow */}
            <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-orange-500/20 blur-sm" />
          </div>
        ))}

        {queue.length === 0 && (
          <div className="text-gray-500 font-medium italic opacity-50 select-none">
            Queue is empty. Enqueue an element to begin.
          </div>
        )}
      </div>

      <div className="w-full flex items-center justify-center gap-1 mt-8">
        <div className="h-[2px] w-8 bg-orange-500/20" />
        <span className="text-[10px] font-black tracking-[0.3em] uppercase text-orange-500/50">Back</span>
        <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-orange-500/20" />
      </div>
    </div>
  )
}
