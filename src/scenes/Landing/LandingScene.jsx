import React, { useEffect, useRef } from 'react'
import { animate, createScope } from 'animejs'

export default function LandingScene() {
  const containerRef = useRef(null)
  const blobRef = useRef(null)
  const scope = useRef(null)

  useEffect(() => {
    scope.current = createScope({ root: containerRef.current }).add(() => {
      // Hero Blob Floating Animation
      animate(blobRef.current, {
        translateY: [-20, 20],
        translateX: [-10, 10],
        rotate: [0, 5]
      }, {
        duration: 3000,
        alternate: true,
        loop: true,
        ease: 'inOutQuad'
      });

      // Pulse Glow
      animate('.hero-glow', {
        scale: [1, 1.2],
        opacity: [0.3, 0.6]
      }, {
        duration: 2000,
        alternate: true,
        loop: true,
        ease: 'inOutSine'
      });
    });

    return () => scope.current?.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[#0a0a0f]" />
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" />

      {/* The Hero Blob */}
      <div className="relative z-10 flex items-center justify-center">
        <div className="hero-glow absolute w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[150px] pointer-events-none" />
        
        <div 
          ref={blobRef}
          className="w-80 h-80 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-gradient-to-br from-blue-600 to-indigo-600 shadow-[0_0_100px_rgba(59,130,246,0.3)] relative overflow-hidden group border border-white/20 backdrop-blur-3xl"
        >
          {/* Internal Reflections */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent" />
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/10 rotate-45 transform" />
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none" />
    </div>
  )
}
