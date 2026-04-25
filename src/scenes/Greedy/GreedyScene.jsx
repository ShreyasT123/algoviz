import React, { useMemo, useEffect, useRef } from 'react'
import { animate, createScope, stagger } from 'animejs'
import { useAppStore } from '../../store/dsStore'

// Denomination metadata
const DENOMS = [
  { value: 25, label: 'Quarter', symbol: '25¢', color: '#ffd700', bg: 'rgba(255,215,0,0.12)', border: '#ffd70066' },
  { value: 10, label: 'Dime',    symbol: '10¢', color: '#c0c0c0', bg: 'rgba(192,192,192,0.12)', border: '#c0c0c066' },
  { value:  5, label: 'Nickel',  symbol:  '5¢', color: '#cd7f32', bg: 'rgba(205,127,50,0.12)',  border: '#cd7f3266' },
  { value:  1, label: 'Penny',   symbol:  '1¢', color: '#b87333', bg: 'rgba(184,115,51,0.12)',  border: '#b8733366' },
]

export default function GreedyScene() {
  const target    = useAppStore(s => s.greedyTarget)
  const coinsUsed = useAppStore(s => s.greedyCoinsUsed)
  const containerRef = useRef(null)
  const scope = useRef(null)

  const currentSum = coinsUsed.reduce((a, v) => a + v, 0)
  const remaining  = target - currentSum
  const pct        = target > 0 ? Math.min((currentSum / target) * 100, 100) : 0
  const done       = remaining === 0 && target > 0

  useEffect(() => {
    scope.current = createScope({ root: containerRef.current }).add(() => {
      // Animate coin entry
      animate('.coin-badge', {
        translateY: [20, 0],
        opacity: [0, 1],
        scale: [0.8, 1]
      }, {
        delay: stagger(50),
        ease: 'outBack',
        duration: 500
      });
    });

    return () => scope.current?.revert();
  }, [coinsUsed.length]);

  // Count per denomination
  const counts = useMemo(() => {
    const map = { 25: 0, 10: 0, 5: 0, 1: 0 }
    coinsUsed.forEach(c => { if (map[c] !== undefined) map[c]++ })
    return map
  }, [coinsUsed])

  const lastCoin = coinsUsed[coinsUsed.length - 1]

  if (target === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 font-medium italic opacity-50 px-10 text-center">
        <div className="text-3xl mb-4 font-black not-italic opacity-20 uppercase tracking-widest">Greedy Solver</div>
        Enter a target amount and press "Climb" to begin.
      </div>
    )
  }

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center h-full p-10 overflow-auto custom-scrollbar">
      <div className="w-full max-w-2xl flex flex-col gap-6">
        {/* Header Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl">
            <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Target</div>
            <div className="text-3xl font-black text-white">{target}¢</div>
          </div>
          <div className="p-6 bg-blue-600/10 border border-blue-500/20 rounded-3xl backdrop-blur-xl">
            <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Collected</div>
            <div className="text-3xl font-black text-white">{currentSum}¢</div>
          </div>
          <div className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl">
            <div className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-1">Remaining</div>
            <div className="text-3xl font-black text-white">{remaining}¢</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative w-full h-4 bg-white/5 border border-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
            style={{ width: `${pct}%` }}
          />
        </div>

        {/* Denominations */}
        <div className="grid grid-cols-4 gap-4 mt-4">
          {DENOMS.map(d => {
            const count = counts[d.value] || 0
            const isActive = lastCoin === d.value
            
            return (
              <div 
                key={d.value}
                className={`p-4 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center gap-3 relative ${
                  isActive 
                  ? 'bg-blue-600 border-white text-white scale-110 z-10 shadow-[0_0_30px_rgba(59,130,246,0.5)]' 
                  : count > 0 
                    ? 'bg-white/10 border-blue-500/30 text-white' 
                    : 'bg-white/5 border-white/5 text-white/20'
                }`}
              >
                <div 
                  className="w-12 h-12 rounded-full border-2 flex items-center justify-center font-black text-xs"
                  style={{ 
                    borderColor: isActive ? 'white' : d.color,
                    backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'transparent',
                    color: isActive ? 'white' : d.color
                  }}
                >
                  {d.symbol}
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[9px] font-black uppercase tracking-widest opacity-50">{d.label}</span>
                  <span className="text-xl font-black">{count > 0 ? `×${count}` : '—'}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Sequence Receipt */}
        {coinsUsed.length > 0 && (
          <div className="p-6 bg-black/40 border border-white/5 rounded-3xl backdrop-blur-2xl">
            <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-4">Selection Sequence</div>
            <div className="flex flex-wrap gap-2">
              {coinsUsed.map((c, i) => (
                <div 
                  key={i}
                  className="coin-badge px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-[10px] font-black text-blue-400"
                >
                  {c}¢
                </div>
              ))}
            </div>
          </div>
        )}

        {done && (
          <div className="p-4 bg-green-500/20 border border-green-500/40 rounded-2xl text-center">
            <span className="text-xs font-black text-green-400 uppercase tracking-[0.4em]">Optimal Solution Found</span>
          </div>
        )}
      </div>
    </div>
  )
}
