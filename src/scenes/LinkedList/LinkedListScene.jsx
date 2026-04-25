import React, { useEffect, useRef } from 'react'
import { animate, createScope, stagger } from 'animejs'
import { useAppStore } from '../../store/dsStore'

export default function LinkedListScene() {
  const linkedList = useAppStore(s => s.linkedList)
  const containerRef = useRef(null)
  const scope = useRef(null)

  useEffect(() => {
    scope.current = createScope({ root: containerRef.current }).add(() => {
      // Animate nodes
      animate('.ll-node', {
        scale: [0, 1],
        opacity: [0, 1]
      }, {
        delay: stagger(150),
        ease: 'outBack',
        duration: 600
      });

      // Animate paths
      animate('.ll-connector', {
        opacity: [0, 1]
      }, {
        delay: stagger(150, { start: 300 }),
        duration: 500
      });
    });

    return () => scope.current?.revert();
  }, [linkedList.length]);

  return (
    <div className="flex flex-col items-center justify-center h-full px-12 overflow-x-auto custom-scrollbar">
      <div 
        ref={containerRef}
        className="flex items-center gap-16 py-10 min-w-max px-20"
      >
        {linkedList.map((node, index) => (
          <div key={node.id} className="relative flex items-center">
            {/* The Node */}
            <div className="ll-node w-24 h-24 rounded-full bg-[#0a0a0f] border-2 border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.15)] flex items-center justify-center relative group hover:border-blue-500 transition-colors cursor-pointer">
              <div className="absolute inset-2 rounded-full border border-blue-500/10 animate-pulse" />
              <span className="text-2xl font-black text-white">{node.val}</span>
              
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-mono text-blue-400/40 uppercase tracking-widest whitespace-nowrap">
                Node {index}
              </div>
            </div>

            {/* The Connector (Arrow) */}
            {index < linkedList.length - 1 && (
              <div className="absolute left-full w-16 h-8 flex items-center justify-center">
                <svg width="64" height="20" viewBox="0 0 64 20" fill="none">
                  <path 
                    className="ll-connector"
                    d="M0 10H60M60 10L52 2M60 10L52 18" 
                    stroke="#3b82f6" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    style={{ opacity: 0.3 }}
                  />
                </svg>
              </div>
            )}

            {/* Null Pointer */}
            {index === linkedList.length - 1 && (
              <div className="absolute left-full ml-4 flex items-center gap-2 opacity-30">
                <div className="w-4 h-4 rounded-sm border border-red-500 rotate-45" />
                <span className="text-[10px] font-black text-red-500 uppercase tracking-tighter">NULL</span>
              </div>
            )}
          </div>
        ))}

        {linkedList.length === 0 && (
          <div className="text-gray-500 font-medium italic opacity-50 select-none">
            Linked List is empty. Insert a node to begin.
          </div>
        )}
      </div>

      {/* Info Label */}
      <div className="mt-12 py-2 px-4 rounded-full bg-blue-500/5 border border-blue-500/10 text-[10px] text-blue-400 font-bold tracking-[0.2em] uppercase">
        Singly Linked List Sequence
      </div>
    </div>
  )
}
