import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/dsStore';
import './TabNavigation.css';

const TABS = [
  { id: 0, label: 'Home', icon: <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> },
  { id: 1, label: 'Stack' },
  { id: 2, label: 'Queue' },
  { id: 3, label: 'LList' },
  { id: 4, label: 'Tree' },
  { id: 5, label: 'Graph' },
  { id: 6, label: 'DP' },
  { id: 7, label: 'BT' },
  { id: 8, label: 'D&C' },
  { id: 9, label: 'Greedy' },
  { id: 10, label: 'Sort' },
  { id: 11, label: 'Recursion' },
  { id: 12, label: 'Dev', icon: <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /> },
];

export default function TabNavigation() {
  const currentScene = useAppStore((s) => s.currentScene);
  const setScene = useAppStore((s) => s.setScene);
  const [isHovered, setIsHovered] = useState(false);

  // Always show on home (0), otherwise show on hover
  const isVisible = currentScene === 0 || isHovered;

  return (
    <>
      {/* Invisible Trigger Area for non-home scenes */}
      {currentScene !== 0 && (
        <div 
          className="nav-trigger"
          onMouseEnter={() => setIsHovered(true)}
        />
      )}

      <motion.nav 
        className="tab-navigation"
        initial={false}
        animate={{ 
          y: isVisible ? 0 : -80,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="tab-outer">
          <div className="tab-container">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={`tab-button ${currentScene === tab.id ? 'active' : ''}`}
                onClick={() => setScene(tab.id)}
              >
                {currentScene === tab.id && (
                  <motion.div
                    layoutId="active-pill"
                    className="active-bg"
                    transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                  />
                )}
                
                <div className="tab-content">
                  {tab.icon ? (
                    <svg className="tab-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      {tab.icon}
                    </svg>
                  ) : (
                    <span className="tab-label">{tab.label}</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </motion.nav>
    </>
  );
}
