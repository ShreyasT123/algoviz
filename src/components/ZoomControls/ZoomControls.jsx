import { useState, useEffect } from 'react'
import './ZoomControls.css'

export default function ZoomControls() {
  const [zoom, setZoom] = useState(100)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    const handleWheel = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        const delta = e.deltaY > 0 ? -10 : 10
        setZoom(prev => Math.max(50, Math.min(200, prev + delta)))
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [])

  const handleZoom = (delta) => {
    setZoom(prev => Math.max(50, Math.min(200, prev + delta)))
  }

  const handleReset = () => {
    setZoom(100)
  }

  useEffect(() => {
    const sceneContainer = document.querySelector('.scene-container')
    if (sceneContainer) {
      sceneContainer.style.transform = `scale(${zoom / 100})`
      sceneContainer.style.transformOrigin = 'top center'
      sceneContainer.style.transition = isDragging ? 'none' : 'transform 0.2s ease-out'
    }
  }, [zoom, isDragging])

  return (
    <div className="zoom-controls" title="Use Ctrl+Scroll to zoom">
      <button
        className="zoom-btn zoom-out"
        onClick={() => handleZoom(-10)}
        aria-label="Zoom out"
        title="Zoom Out (Ctrl+Scroll)"
      >
        <span className="zoom-icon">−</span>
      </button>

      <div className="zoom-display">
        <span className="zoom-value">{zoom}%</span>
      </div>

      <button
        className="zoom-btn zoom-in"
        onClick={() => handleZoom(10)}
        aria-label="Zoom in"
        title="Zoom In (Ctrl+Scroll)"
      >
        <span className="zoom-icon">+</span>
      </button>

      <button
        className="zoom-btn zoom-reset"
        onClick={handleReset}
        aria-label="Reset zoom"
        title="Reset to 100%"
      >
        <span className="zoom-icon">⟲</span>
      </button>
    </div>
  )
}
