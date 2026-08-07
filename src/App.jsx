import { useState, useEffect, useCallback, lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import TouchRipple from './components/TouchRipple'
import Background from './components/Background'
import AudioToggle from './components/AudioToggle'

// Lazy load mini-games
const GameCatcher = lazy(() => import('./games/GameCatcher'))
const GameMemoryMatch = lazy(() => import('./games/GameMemoryMatch'))
const GameScratchCard = lazy(() => import('./games/GameScratchCard'))
const GameSlotMachine = lazy(() => import('./games/GameSlotMachine'))
const GameTriviaQuiz = lazy(() => import('./games/GameTriviaQuiz'))
const GrandFinale = lazy(() => import('./games/GrandFinale'))

const GAMES = [
  GameCatcher,
  GameMemoryMatch,
  GameScratchCard,
  GameSlotMachine,
  GameTriviaQuiz,
  GrandFinale,
]

function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0a0512] z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-6xl mb-4 drop-shadow-[0_0_25px_rgba(251,113,133,0.7)]"
        >
          🎮
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-rose-200/80 text-xs font-light tracking-[0.2em] uppercase font-mono"
        >
          Loading Romantic Arcade…
        </motion.p>
      </motion.div>
    </div>
  )
}

export default function App() {
  const [content, setContent] = useState(null)
  const [currentGame, setCurrentGame] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/content.json')
      .then(res => res.json())
      .then(data => {
        setContent(data)
        setTimeout(() => setIsLoading(false), 1200)
      })
      .catch(err => {
        console.error('Failed to load content:', err)
        setIsLoading(false)
      })
  }, [])

  const handleGameComplete = useCallback(() => {
    setCurrentGame(prev => Math.min(prev + 1, GAMES.length - 1))
  }, [])

  if (isLoading || !content) {
    return <LoadingScreen />
  }

  const CurrentGameComponent = GAMES[currentGame]
  const currentColors = { primary: '#0a0512', secondary: '#12091f', accent: '#fb7185', glow: 'rgba(251,113,133,0.45)' }

  return (
    <main className="relative min-h-screen bg-[#0a0512] overflow-x-hidden selection:bg-rose-500 selection:text-white">
      {/* Audio Ambient Control */}
      <AudioToggle />

      {/* Animated 3D Background */}
      <Background colorScheme={currentColors} />

      {/* Touch Ripple Visual FX */}
      <TouchRipple color={currentColors.accent} />

      {/* Game Stage Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentGame}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 min-h-screen"
        >
          <Suspense fallback={<LoadingScreen />}>
            <CurrentGameComponent
              content={content}
              onComplete={handleGameComplete}
            />
          </Suspense>
        </motion.div>
      </AnimatePresence>

      {/* Arcade Level Progress Indicator */}
      <nav aria-label="Arcade game stages" className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex gap-2 p-2 rounded-full glass-panel-romantic">
        {GAMES.map((_, i) => (
          <button
            type="button"
            key={i}
            aria-label={`Jump to level ${i + 1}`}
            onClick={() => setCurrentGame(i)}
            className="w-2.5 h-2.5 rounded-full focus-visible:ring-1 focus-visible:ring-rose-400 p-0 border-none outline-none cursor-pointer"
          >
            <motion.div
              className="w-full h-full rounded-full"
              animate={{
                backgroundColor: i === currentGame ? '#fb7185' : 'rgba(255,255,255,0.2)',
                scale: i === currentGame ? 1.4 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          </button>
        ))}
      </nav>
    </main>
  )
}
