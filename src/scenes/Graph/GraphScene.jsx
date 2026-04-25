import React, { useEffect, useMemo, useRef, useState } from 'react'
import { animate, createScope, stagger } from 'animejs'
import * as d3 from 'd3'
import { useAppStore } from '../../store/dsStore'

export default function GraphScene() {
  const nodes = useAppStore(s => s.graphNodes)
  const edges = useAppStore(s => s.graphEdges)
  const highlights = useAppStore(s => s.graphHighlights)
  const containerRef = useRef(null)
  const scope = useRef(null)
  
  const [coords, setCoords] = useState([])
  const [links, setLinks] = useState([])

  const simulation = useMemo(() => {
    return d3.forceSimulation()
      .force('link', d3.forceLink().id(d => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(0, 0))
      .force('collision', d3.forceCollide().radius(50))
  }, [])

  useEffect(() => {
    simulation.nodes(nodes).on('tick', () => {
      setCoords([...simulation.nodes()])
    })
    const linkForce = simulation.force('link')
    if (linkForce) linkForce.links(edges)
    simulation.alpha(1).restart()
    
    // Set links for rendering
    setLinks([...edges])

    return () => simulation.stop()
  }, [nodes, edges, simulation])

  useEffect(() => {
    scope.current = createScope({ root: containerRef.current }).add(() => {
      animate('.graph-node', {
        scale: [0, 1],
        opacity: [0, 1]
      }, {
        delay: stagger(100),
        ease: 'outBack',
        duration: 500
      });
    });

    return () => scope.current?.revert();
  }, [nodes.length]);

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center bg-transparent overflow-hidden">
      {/* Simulation Wrapper - Centered */}
      <div className="relative w-0 h-0">
        {/* SVG Links */}
        <svg className="absolute inset-[-1000px] w-[2000px] h-[2000px] pointer-events-none">
          {links.map((link, i) => {
            const source = coords.find(n => n.id === (link.source.id || link.source))
            const target = coords.find(n => n.id === (link.target.id || link.target))
            if (!source || !target) return null
            return (
              <line 
                key={`${link.source}-${link.target}-${i}`}
                x1={source.x + 1000} y1={source.y + 1000}
                x2={target.x + 1000} y2={target.y + 1000}
                stroke="#3b82f6"
                strokeWidth="1"
                className="opacity-20"
              />
            )
          })}
        </svg>

        {/* DOM Nodes */}
        {coords.map(node => {
          const isHighlighted = highlights.includes(node.id)
          return (
            <div 
              key={node.id}
              className={`graph-node absolute w-14 h-14 -ml-7 -mt-7 rounded-2xl border-2 flex flex-col items-center justify-center transition-all duration-300 z-10 shadow-2xl backdrop-blur-md ${
                isHighlighted 
                ? 'bg-blue-500 border-white text-white scale-125 z-20' 
                : 'bg-[#0a0a0f]/80 border-blue-500/30 text-blue-400'
              }`}
              style={{ 
                transform: `translate(${node.x}px, ${node.y}px)` 
              }}
            >
              <span className="text-xs font-black uppercase tracking-tighter">{node.label}</span>
              <div className={`w-1 h-1 rounded-full mt-1 ${isHighlighted ? 'bg-white' : 'bg-blue-500/50'}`} />
            </div>
          )
        })}
      </div>

      {nodes.length === 0 && (
        <div className="text-gray-500 font-medium italic opacity-50 select-none">
          Graph is empty. Add a node to begin.
        </div>
      )}

      {/* Stats Overlay */}
      <div className="absolute top-10 left-10 p-4 border border-white/5 bg-white/5 backdrop-blur-md rounded-xl">
        <div className="text-[10px] text-blue-400 font-black uppercase tracking-[0.2em] mb-1">Topology</div>
        <div className="text-xl font-black text-white">{nodes.length} <span className="text-xs font-normal opacity-50">Nodes</span></div>
        <div className="text-xl font-black text-white">{edges.length} <span className="text-xs font-normal opacity-50">Edges</span></div>
      </div>
    </div>
  )
}
