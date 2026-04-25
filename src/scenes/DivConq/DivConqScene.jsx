import React, { useEffect, useRef } from 'react'
import { animate, createScope, stagger } from 'animejs'
import { useAppStore } from '../../store/dsStore'

export default function DivConqScene() {
  const dcBoxes = useAppStore(s => s.dcBoxes)
  const containerRef = useRef(null)
  const scope = useRef(null)

  useEffect(() => {
    scope.current = createScope({ root: containerRef.current }).add(() => {
      // Animate new boxes
      animate('.dc-box', {
        translateY: [20, 0],
        opacity: [0, 1],
        scale: [0.9, 1]
      }, {
        delay: stagger(100),
        ease: 'outBack',
        duration: 600
      });
    });

    return () => scope.current?.revert();
  }, [dcBoxes.length]);

  const boxesToRender = dcBoxes.length > 0 ? dcBoxes : [{ id: 'root', level: 0, xOffset: 0, width: 8, arr: [8,3,5,4,7,1,2,6] }];

  // Group boxes by level for vertical layout
  const levels = {}
  boxesToRender.forEach(box => {
    if (!levels[box.level]) levels[box.level] = []
    levels[box.level].push(box)
  })

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center h-full p-10 overflow-auto custom-scrollbar">
      <div className="flex flex-col gap-16 min-w-max px-20 pb-20">
        {Object.keys(levels).sort((a, b) => a - b).map(level => (
          <div key={level} className="flex justify-center gap-12 relative">
            {levels[level].map(box => (
              <div 
                key={box.id}
                className="dc-box p-4 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col items-center gap-3 min-w-[120px] transition-all hover:border-blue-500/50"
              >
                <div className="flex items-center gap-1">
                  {box.arr.map((val, i) => (
                    <div 
                      key={i}
                      className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-sm font-bold text-white shadow-inner"
                    >
                      {val}
                    </div>
                  ))}
                </div>
                
                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-400/50">
                  Level {box.level} • {box.width} Elements
                </div>
              </div>
            ))}

            {/* Level label on the left */}
            <div className="absolute -left-20 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
              <div className="h-12 w-[1px] bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
              <span className="text-[10px] font-black text-blue-500/30 rotate-90 uppercase tracking-widest whitespace-nowrap">Step {level}</span>
              <div className="h-12 w-[1px] bg-gradient-to-t from-transparent via-blue-500/20 to-transparent" />
            </div>
          </div>
        ))}
      </div>

      {/* Intro Label */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 py-3 px-6 rounded-full bg-blue-500/5 border border-blue-500/10 backdrop-blur-md">
        <p className="text-[10px] text-blue-400 font-bold tracking-[0.2em] uppercase text-center">
          Divide and Conquer: Recursive Decomposition
        </p>
      </div>
    </div>
  )
}
