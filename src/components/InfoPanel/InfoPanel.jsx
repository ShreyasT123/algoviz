import { useState } from 'react'
import { useAppStore } from '../../store/dsStore'
import { ALGORITHM_INFO } from '../../data/algorithmInfo'
import './InfoPanel.css'

export default function InfoPanel() {
  const currentScene = useAppStore(s => s.currentScene)
  const [isExpanded, setIsExpanded] = useState(true)

  if (currentScene === 0 || currentScene === 12) return null

  const info = ALGORITHM_INFO[currentScene]
  if (!info) return null

  return (
    <div className="info-panel">
      <div className="info-header">
        <h2 className="info-title">{info.name}</h2>
        <button 
          className="info-toggle"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label="Toggle info panel"
        >
          {isExpanded ? '▼' : '▶'}
        </button>
      </div>

      {isExpanded && (
        <div className="info-content">
          <p className="info-description">{info.description}</p>

          <div className="info-section">
            <h3 className="info-label">Time Complexity</h3>
            <code className="info-code">{info.timeComplexity}</code>
          </div>

          <div className="info-section">
            <h3 className="info-label">Space Complexity</h3>
            <code className="info-code">{info.spaceComplexity}</code>
          </div>

          <div className="info-section">
            <h3 className="info-label">Key Points</h3>
            <ul className="info-list">
              {info.keyPoints.map((point, idx) => (
                <li key={idx} className="info-list-item">{point}</li>
              ))}
            </ul>
          </div>

          <div className="info-section">
            <h3 className="info-label">Use Cases</h3>
            <p className="info-use-cases">{info.useCases}</p>
          </div>
        </div>
      )}
    </div>
  )
}
