import React, { useEffect, useMemo, useRef } from 'react'
import { animate, createScope, stagger } from 'animejs'
import { useAppStore } from '../../store/dsStore'

function calculateTreeLayout(node, x = 50, y = 10, hSpacing = 25, layout = []) {
  if (!node) return layout
  layout.push({ ...node, x, y })
  
  const nextY = y + 20
  const nextHSpacing = hSpacing * 0.55
  
  if (node.left) calculateTreeLayout(node.left, x - hSpacing, nextY, nextHSpacing, layout)
  if (node.right) calculateTreeLayout(node.right, x + hSpacing, nextY, nextHSpacing, layout)
  return layout
}

export default function TreeScene() {
  const treeRoot = useAppStore(s => s.tree)
  const highlights = useAppStore(s => s.traversalHighlights)
  const containerRef = useRef(null)
  const scope = useRef(null)
  
  const layout = useMemo(() => calculateTreeLayout(treeRoot), [treeRoot])

  useEffect(() => {
    scope.current = createScope({ root: containerRef.current }).add(() => {
      animate('.tree-node', {
        scale: [0, 1],
        opacity: [0, 1]
      }, {
        delay: stagger(100),
        ease: 'outBack',
        duration: 500
      });

      animate('.tree-edge', {
        opacity: [0, 0.2]
      }, {
        delay: stagger(100, { start: 200 }),
        duration: 600
      });
    });

    return () => scope.current?.revert();
  }, [layout.length]);

  return (
    <div ref={containerRef} className="relative w-full h-full flex flex-col items-center pt-10 overflow-hidden">
      {/* SVG Edges Layer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {layout.map(node => {
          const edges = []
          if (node.left) {
            const leftChild = layout.find(n => n.id === node.left.id)
            if (leftChild) edges.push({ x1: node.x, y1: node.y, x2: leftChild.x, y2: leftChild.y })
          }
          if (node.right) {
            const rightChild = layout.find(n => n.id === node.right.id)
            if (rightChild) edges.push({ x1: node.x, y1: node.y, x2: rightChild.x, y2: rightChild.y })
          }
          
          return edges.map((e, i) => (
            <line 
              key={`${node.id}-${i}`}
              x1={`${e.x1}%`} y1={`${e.y1}%`}
              x2={`${e.x2}%`} y2={`${e.y2}%`}
              stroke="#3b82f6"
              strokeWidth="1.5"
              className="tree-edge opacity-20"
            />
          ))
        })}
      </svg>

      {/* Nodes Layer */}
      {layout.map(node => {
        const isHighlighted = highlights.includes(node.id)
        return (
          <div 
            key={node.id}
            className={`tree-node absolute w-12 h-12 -ml-6 -mt-6 rounded-full border flex items-center justify-center font-bold text-sm transition-all duration-300 z-10 ${
              isHighlighted 
              ? 'bg-blue-500 border-white text-white shadow-[0_0_20px_rgba(255,255,255,0.5)] scale-110' 
              : 'bg-[#0a0a0f] border-blue-500/30 text-blue-400'
            }`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            {node.val}
            {isHighlighted && <div className="absolute inset-0 rounded-full border-4 border-white/20 animate-ping" />}
          </div>
        )
      })}

      {layout.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-gray-500 italic opacity-50">
          Tree is empty.
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-10 left-10 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
          <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Active Search</span>
        </div>
      </div>
    </div>
  )
}
