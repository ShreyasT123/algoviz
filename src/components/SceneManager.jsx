import React, { Suspense, lazy } from 'react'
import ZoomControls from './ZoomControls/ZoomControls'

const LandingScene    = lazy(() => import('../scenes/Landing/LandingScene'))
const StackScene      = lazy(() => import('../scenes/Stack/StackScene'))
const QueueScene      = lazy(() => import('../scenes/Queue/QueueScene'))
const LinkedListScene = lazy(() => import('../scenes/LinkedList/LinkedListScene'))
const TreeScene       = lazy(() => import('../scenes/Tree/TreeScene'))
const GraphScene      = lazy(() => import('../scenes/Graph/GraphScene'))
const DPScene         = lazy(() => import('../scenes/DP/DPScene'))
const BacktrackingScene = lazy(() => import('../scenes/Backtracking/BacktrackingScene'))
const DivConqScene    = lazy(() => import('../scenes/DivConq/DivConqScene'))
const GreedyScene     = lazy(() => import('../scenes/Greedy/GreedyScene'))
const SortingScene    = lazy(() => import('../scenes/Sorting/SortingScene'))
const RecursionScene  = lazy(() => import('../scenes/Recursion/RecursionScene'))

export default function SceneManager({ sceneIndex }) {
  const renderScene = () => {
    switch (sceneIndex) {
      case 0: return <LandingScene />
      case 1: return <StackScene />
      case 2: return <QueueScene />
      case 3: return <LinkedListScene />
      case 4: return <TreeScene />
      case 5: return <GraphScene />
      case 6: return <DPScene />
      case 7: return <BacktrackingScene />
      case 8: return <DivConqScene />
      case 9: return <GreedyScene />
      case 10: return <SortingScene />
      case 11: return <RecursionScene />
      default: return <LandingScene />
    }
  }

  return (
    <div className="w-full h-full relative overflow-hidden">
      <Suspense fallback={<div className="flex items-center justify-center h-full text-blue-500 font-bold">LOADING SCENE...</div>}>
        {renderScene()}
      </Suspense>
      {sceneIndex !== 0 && sceneIndex !== 12 && <ZoomControls />}
    </div>
  )
}
