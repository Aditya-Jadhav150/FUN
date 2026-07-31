import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Scene6Choices({ content, sceneColors, onComplete }) {
  const [dodgeCount, setDodgeCount] = useState(0);
  const [chosen, setChosen] = useState(null); // 'yes' or 'maybe'
  const [hearts, setHearts] = useState([]);
  const [maybePos, setMaybePos] = useState({ x: 0, y: 0 });

  const handleYes = () => {
    if (chosen) return;
    setChosen("yes");
    // Create heart explosion
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * window.innerWidth * 0.8,
      y: (Math.random() - 0.5) * window.innerHeight * 0.8,
      rotation: Math.random() * 360,
      scale: Math.random() * 1.5 + 0.5,
    }));
    setHearts(newHearts);

    setTimeout(() => {
      onComplete();
    }, 3000);
  };

  const handleMaybe = () => {
    if (chosen) return;
    
    setDodgeCount(prev => prev + 1);
    
    const dodgeMultiplier = Math.min(1 + (dodgeCount * 0.2), 2.5);
    const rangeX = window.innerWidth * 0.35 * dodgeMultiplier;
    const rangeY = window.innerHeight * 0.35 * dodgeMultiplier;
    
    const newX = (Math.random() - 0.5) * rangeX;
    const newY = (Math.random() - 0.5) * rangeY;
    
    setMaybePos({ x: newX, y: newY });
  };

  const questionWords = content.question?.split(" ") || [];

  return (
    <div className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center p-6 overflow-y-auto pb-20 bg-black">
      {/* Background warm glow when 'yes' is chosen */}
      <AnimatePresence>
        {chosen === "yes" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            className="absolute inset-0 z-0 bg-rose-500 blur-[100px]"
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {!chosen ? (
          <div className="text-center mb-16 h-32 flex flex-wrap justify-center content-center gap-x-3 gap-y-2">
            {questionWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.2,
                  ease: "easeOut",
                }}
                className="text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-lg"
                style={{ color: sceneColors?.accent || "#fff" }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-16 text-3xl font-bold text-white drop-shadow-md"
            style={{ color: sceneColors?.accent || "#ff69b4" }}
          >
            {content.reactionText}
          </motion.div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
          <AnimatePresence>
            {!chosen && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0, transition: { duration: 0.3 } }}
                transition={{ delay: questionWords.length * 0.2 + 0.5 }}
                onClick={handleYes}
                whileTap={{ scale: 0.9 }}
                className="px-10 py-4 rounded-full text-xl font-bold text-white shadow-lg z-20 mt-8"
                style={{ backgroundColor: sceneColors?.accent || "#8b5cf6" }}
              >
                {content.choiceA}
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {!chosen && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8, x: 0, y: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  x: maybePos.x, 
                  y: maybePos.y 
                }}
                exit={{ opacity: 0, scale: 0, transition: { duration: 0.3 } }}
                transition={{ 
                  opacity: { delay: questionWords.length * 0.2 + 0.7 },
                  scale: { delay: questionWords.length * 0.2 + 0.7 },
                  x: { type: "spring", stiffness: 200, damping: 15 },
                  y: { type: "spring", stiffness: 200, damping: 15 }
                }}
                onClick={handleMaybe}
                whileTap={{ scale: 1 }}
                className="px-10 py-4 rounded-full text-xl font-semibold text-white shadow-lg z-20 mt-8"
                style={{ backgroundColor: sceneColors?.accent || "#8b5cf6" }}
              >
                {dodgeCount >= 5 ? "Just say yes already! 😄" : content.choiceB}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Heart Explosion for Yes */}
      <AnimatePresence>
        {chosen === "yes" && hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
            animate={{ 
              opacity: 0, 
              scale: heart.scale, 
              x: heart.x, 
              y: heart.y,
              rotate: heart.rotation 
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 text-4xl pointer-events-none z-30 -translate-x-1/2 -translate-y-1/2"
          >
            ❤️
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
