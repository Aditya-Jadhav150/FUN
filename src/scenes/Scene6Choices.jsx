import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Scene6Choices({ content, sceneColors, onComplete }) {
  const [dodgeCount, setDodgeCount] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [hearts, setHearts] = useState([]);
  const [maybePos, setMaybePos] = useState({ x: 0, y: 0 });

  const questionText = content?.question || "Can you forgive me?";
  const choiceA = content?.choiceA || "Yes 💖";
  const choiceB = content?.choiceB || "Maybe... 🤔";
  const reactionText = content?.reactionText || "I knew you would 💕";

  const handleYes = () => {
    if (chosen) return;
    setChosen("yes");

    const newHearts = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * (typeof window !== 'undefined' ? window.innerWidth * 0.7 : 300),
      y: (Math.random() - 0.5) * (typeof window !== 'undefined' ? window.innerHeight * 0.7 : 300),
      rotation: Math.random() * 360,
      scale: Math.random() * 1.5 + 0.6,
    }));
    setHearts(newHearts);

    setTimeout(() => {
      onComplete();
    }, 2800);
  };

  const handleMaybe = () => {
    if (chosen) return;

    setDodgeCount(prev => prev + 1);

    const rangeX = typeof window !== 'undefined' ? window.innerWidth * 0.25 : 120;
    const rangeY = typeof window !== 'undefined' ? window.innerHeight * 0.25 : 120;

    const newX = (Math.random() - 0.5) * rangeX * 2;
    const newY = (Math.random() - 0.5) * rangeY * 2;

    setMaybePos({ x: newX, y: newY });
  };

  const getMaybeLabel = () => {
    if (dodgeCount >= 5) return "Just say yes already! 😄";
    if (dodgeCount >= 3) return "Are you sure? 🥺";
    if (dodgeCount >= 1) return "Wait, really? 💔";
    return choiceB;
  };

  return (
    <div className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center p-6 text-center select-none">
      {/* Glow Overlay */}
      <AnimatePresence>
        {chosen === "yes" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            className="absolute inset-0 z-0 bg-rose-500/30 blur-[120px] pointer-events-none"
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {!chosen ? (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif italic text-rose-gradient mb-12"
          >
            {questionText}
          </motion.h2>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-3xl md:text-4xl font-serif italic text-gold-gradient mb-12"
          >
            {reactionText}
          </motion.div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
          <AnimatePresence>
            {!chosen && (
              <motion.button
                type="button"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={handleYes}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="px-10 py-4 rounded-full font-medium text-lg text-white bg-rose-500 hover:bg-rose-400 shadow-[0_0_35px_rgba(251,113,133,0.6)] transition-all z-20 focus-visible:ring-2 focus-visible:ring-rose-400"
              >
                {choiceA}
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {!chosen && (
              <motion.button
                type="button"
                initial={{ opacity: 0, scale: 0.9, x: 0, y: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: maybePos.x,
                  y: maybePos.y
                }}
                transition={{
                  x: { type: "spring", stiffness: 220, damping: 14 },
                  y: { type: "spring", stiffness: 220, damping: 14 }
                }}
                onClick={handleMaybe}
                className="px-8 py-3.5 rounded-full font-medium text-base text-rose-200 glass-panel-romantic shadow-lg z-20 focus-visible:ring-2 focus-visible:ring-rose-400"
              >
                {getMaybeLabel()}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Heart Explosion */}
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
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 text-4xl pointer-events-none z-30 -translate-x-1/2 -translate-y-1/2"
          >
            ❤️
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
