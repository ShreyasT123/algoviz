import React, { useEffect, useRef } from 'react'
import { animate, createScope, stagger } from 'animejs'
import { useAppStore } from '../../store/dsStore'

export default function StackScene() {
  const stack = useAppStore(s => s.stack)
  const containerRef = useRef(null)
  const scope = useRef(null)

  useEffect(() => {
    scope.current = createScope({ root: containerRef.current }).add(() => {
      animate('.stack-plate', {
        translateY: [50, 0],
        opacity: [0, 1],
        scale: [0.9, 1]
      }, {
        delay: stagger(100),
        ease: 'outElastic(1, .8)',
        duration: 800
      });
    });
    return () => scope.current?.revert();
  }, [stack.length]);

  return (
    <div className="flex flex-col items-center justify-end h-full pb-20 px-4 overflow-hidden">
      <div 
        ref={containerRef}
        className="flex flex-col-reverse items-center gap-3 w-full max-w-md"
      >
        {stack.map((item, index) => (
          <div 
            key={`${item}-${index}`}
            className="stack-plate w-full py-4 px-6 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl flex items-center justify-between group hover:border-blue-500/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className="text-blue-400 font-mono text-xs opacity-50">[{index}]</span>
              <span className="text-xl font-bold tracking-tight text-white">{item}</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
          </div>
        ))}
        
        {stack.length === 0 && (
          <div className="text-gray-500 font-medium italic opacity-50 select-none">
            Stack is empty. Push an element to begin.
          </div>
        )}
      </div>
      
      {/* Visual Base */}
      <div className="w-64 h-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent mt-4 blur-sm" />
    </div>
  )
}
