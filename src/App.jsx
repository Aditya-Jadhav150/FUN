import { useState, useEffect, useCallback, lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import TouchRipple from './components/TouchRipple'
import Background from './components/Background'

// Lazy load scenes for code splitting
const Scene1Welcome = lazy(() => import('./scenes/Scene1Welcome'))
const Scene2Mystery = lazy(() => import('./scenes/Scene2Mystery'))
const Scene3Cards = lazy(() => import('./scenes/Scene3Cards'))
const Scene4Gallery = lazy(() => import('./scenes/Scene4Gallery'))
const Scene5Timeline = lazy(() => import('./scenes/Scene5Timeline'))
const Scene6Choices = lazy(() => import('./scenes/Scene6Choices'))
const Scene7Message = lazy(() => import('./scenes/Scene7Message'))

// Scene color palettes — transitions from deep violet → royal blue → warm rose/gold
const SCENE_COLORS = [
  { primary: '#2d1b69', secondary: '#1a0b3e', accent: '#8b5cf6', glow: '#7c3aed' },  // Scene 1 - Deep Violet
  { primary: '#1e1b4b', secondary: '#0f0b2e', accent: '#818cf8', glow: '#6366f1' },  // Scene 2 - Indigo
  { primary: '#172554', secondary: '#0c1a3d', accent: '#60a5fa', glow: '#3b82f6' },  // Scene 3 - Royal Blue
  { primary: '#1e3a5f', secondary: '#0c2340', accent: '#38bdf8', glow: '#0ea5e9' },  // Scene 4 - Sky Blue
  { primary: '#3b1f5b', secondary: '#2a1245', accent: '#c084fc', glow: '#a855f7' },  // Scene 5 - Purple
  { primary: '#4a1942', secondary: '#2d0f29', accent: '#f472b6', glow: '#ec4899' },  // Scene 6 - Rose
  { primary: '#4a1530', secondary: '#2d0a1c', accent: '#fb7185', glow: '#f43f5e' },  // Scene 7 - Warm Rose/Gold
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
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-5xl mb-4"
        >
          💖
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/50 text-sm tracking-widest uppercase"
        >
          Loading something special...
        </motion.p>
      </motion.div>
    </div>
  )
}

export default function App() {
  const [content, setContent] = useState(null)
  const [currentScene, setCurrentScene] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Load content from JSON
  useEffect(() => {
    fetch('/content.json')
      .then(res => res.json())
      .then(data => {
        setContent(data)
        // Simulate minimum loading time for the intro feel
        setTimeout(() => setIsLoading(false), 2000)
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
    <div className="relative min-h-screen bg-black">
      {/* Animated Background */}
      <Background colorScheme={currentColors} />

      {/* Touch Ripple Effect */}
      <TouchRipple color={currentColors.accent} />

      {/* Scene Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
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

      {/* Scene Progress Dots */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex gap-1.5">
        {SCENES.map((_, i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            animate={{
              backgroundColor: i === currentScene ? currentColors.accent : 'rgba(255,255,255,0.2)',
              scale: i === currentScene ? 1.3 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  )
}
