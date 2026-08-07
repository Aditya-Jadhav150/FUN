import { useState, useEffect, useCallback, lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import TouchRipple from './components/TouchRipple'
import Background from './components/Background'
import AudioToggle from './components/AudioToggle'

// Lazy load scenes for performance
const Scene1Welcome = lazy(() => import('./scenes/Scene1Welcome'))
const Scene2Mystery = lazy(() => import('./scenes/Scene2Mystery'))
const Scene3Cards = lazy(() => import('./scenes/Scene3Cards'))
const Scene4Gallery = lazy(() => import('./scenes/Scene4Gallery'))
const Scene5Timeline = lazy(() => import('./scenes/Scene5Timeline'))
const Scene6Choices = lazy(() => import('./scenes/Scene6Choices'))
const Scene7Message = lazy(() => import('./scenes/Scene7Message'))

// Scene color palettes — transitions from deep midnight velvet → champagne rose
const SCENE_COLORS = [
  { primary: '#0a0512', secondary: '#12091f', accent: '#fb7185', glow: 'rgba(251,113,133,0.4)' },
  { primary: '#0f0518', secondary: '#180a27', accent: '#f43f5e', glow: 'rgba(244,63,94,0.45)' },
  { primary: '#14051a', secondary: '#1f0927', accent: '#e11d48', glow: 'rgba(225,29,72,0.4)' },
  { primary: '#1a0516', secondary: '#270921', accent: '#fb7185', glow: 'rgba(251,113,133,0.4)' },
  { primary: '#12051a', secondary: '#1d0929', accent: '#f472b6', glow: 'rgba(244,114,182,0.4)' },
  { primary: '#1f0518', secondary: '#2e0924', accent: '#fb7185', glow: 'rgba(251,113,133,0.45)' },
  { primary: '#27051a', secondary: '#3a0927', accent: '#fda4af', glow: 'rgba(253,164,175,0.5)' },
]

const SCENES = [
  Scene1Welcome,
  Scene2Mystery,
  Scene3Cards,
  Scene4Gallery,
  Scene5Timeline,
  Scene6Choices,
  Scene7Message,
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
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="text-6xl mb-4 drop-shadow-[0_0_25px_rgba(251,113,133,0.6)]"
        >
          💖
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-rose-200/70 text-xs font-light tracking-[0.2em] uppercase"
        >
          Preparing something special…
        </motion.p>
      </motion.div>
    </div>
  )
}

export default function App() {
  const [content, setContent] = useState(null)
  const [currentScene, setCurrentScene] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch content from JSON
  useEffect(() => {
    fetch('/content.json')
      .then(res => res.json())
      .then(data => {
        setContent(data)
        setTimeout(() => setIsLoading(false), 1400)
      })
      .catch(err => {
        console.error('Failed to load content:', err)
        setIsLoading(false)
      })
  }, [])

  const handleSceneComplete = useCallback(() => {
    setCurrentScene(prev => Math.min(prev + 1, SCENES.length - 1))
  }, [])

  if (isLoading || !content) {
    return <LoadingScreen />
  }

  const contentKeys = ['scene1', 'scene2', 'scene3', 'scene4', 'scene5', 'scene6', 'scene7']
  const CurrentSceneComponent = SCENES[currentScene]
  const currentColors = SCENE_COLORS[currentScene]
  const currentContent = content[contentKeys[currentScene]]

  return (
    <main className="relative min-h-screen bg-[#0a0512] overflow-x-hidden selection:bg-rose-500 selection:text-white">
      {/* Audio Ambient Control */}
      <AudioToggle />

      {/* Animated 3D Background */}
      <Background colorScheme={currentColors} />

      {/* Touch Ripple Visual FX */}
      <TouchRipple color={currentColors.accent} />

      {/* Scene Crossfade Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 min-h-screen"
        >
          <Suspense fallback={<LoadingScreen />}>
            <CurrentSceneComponent
              content={currentContent}
              sceneColors={currentColors}
              onComplete={handleSceneComplete}
            />
          </Suspense>
        </motion.div>
      </AnimatePresence>

      {/* Scene Progress Indicator */}
      <nav aria-label="Progress dots" className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex gap-2 p-2 rounded-full glass-panel-romantic">
        {SCENES.map((_, i) => (
          <button
            type="button"
            key={i}
            aria-label={`Go to scene ${i + 1}`}
            onClick={() => setCurrentScene(i)}
            className="w-2 h-2 rounded-full focus-visible:ring-1 focus-visible:ring-rose-400 p-0 border-none outline-none cursor-pointer"
          >
            <motion.div
              className="w-full h-full rounded-full"
              animate={{
                backgroundColor: i === currentScene ? '#fb7185' : 'rgba(255,255,255,0.2)',
                scale: i === currentScene ? 1.4 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          </button>
        ))}
      </nav>
    </main>
  )
}
