import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function GameCatcher({ onComplete }) {
  const [score, setScore] = useState(0);
  const [items, setItems] = useState([]);
  const targetScore = 10;
  const isWon = score >= targetScore;

  useEffect(() => {
    if (isWon) return;

    const interval = setInterval(() => {
      const id = Date.now() + Math.random();
      const x = Math.random() * 80 + 10; // %
      const speed = Math.random() * 3 + 3; // duration in seconds
      const emoji = Math.random() > 0.3 ? '💖' : '✨';

      setItems(prev => [...prev.slice(-15), { id, x, speed, emoji }]);
    }, 900);

    return () => clearInterval(interval);
  }, [isWon]);

  const handleCatch = (id) => {
    if (isWon) return;
    setItems(prev => prev.filter(item => item.id !== id));
    setScore(prev => Math.min(prev + 1, targetScore));
  };

  return (
    <div className="relative w-full min-h-[100dvh] flex flex-col items-center justify-between p-6 select-none overflow-hidden text-center">
      {/* Game Header */}
      <div className="relative z-10 max-w-md w-full mt-4">
        <span className="text-xs uppercase tracking-widest text-rose-300/80 font-mono">Game 1 of 5</span>
        <h2 className="text-4xl md:text-5xl font-serif italic text-rose-gradient mt-1 mb-2">
          Star Catcher 🌟
        </h2>
        <p className="text-sm font-light text-slate-300 mb-4">
          Tap 10 floating hearts to unlock the next level!
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-white/10 rounded-full h-3.5 p-0.5 glass-panel">
          <motion.div
            className="bg-gradient-to-r from-rose-400 to-pink-300 h-full rounded-full shadow-[0_0_15px_rgba(251,113,133,0.8)]"
            animate={{ width: `${(score / targetScore) * 100}%` }}
            transition={{ type: "spring", stiffness: 120 }}
          />
        </div>
        <div className="text-xs text-rose-200 mt-1 font-mono">{score} / {targetScore} Collected</div>
      </div>

      {/* Floating Game Items Area */}
      <div className="relative w-full flex-1 max-w-xl my-4">
        <AnimatePresence>
          {!isWon && items.map(item => (
            <motion.button
              type="button"
              key={item.id}
              onClick={() => handleCatch(item.id)}
              initial={{ y: -40, opacity: 1, scale: 0.8 }}
              animate={{ y: '75vh', opacity: [1, 1, 0] }}
              exit={{ scale: 1.6, opacity: 0 }}
              transition={{ duration: item.speed, ease: "linear" }}
              className="absolute text-4xl p-2 cursor-pointer border-none bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-rose-400 rounded-full shadow-lg"
              style={{ left: `${item.x}%` }}
            >
              {item.emoji}
            </motion.button>
          ))}
        </AnimatePresence>

        {/* Level Completion Screen */}
        <AnimatePresence>
          {isWon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center glass-panel-romantic rounded-3xl p-8 shadow-2xl z-20"
            >
              <div className="text-6xl mb-4 animate-bounce">🏆</div>
              <h3 className="text-3xl md:text-4xl font-serif italic text-gold-gradient mb-3">
                Stage 1 Cleared!
              </h3>
              <p className="text-base text-rose-100 font-light mb-8 max-w-xs">
                You caught all 10 hearts! Memory Matcher is now unlocked.
              </p>

              <motion.button
                type="button"
                onClick={onComplete}
                className="px-10 py-4 rounded-full font-medium text-lg text-white bg-rose-500 hover:bg-rose-400 shadow-[0_0_35px_rgba(251,113,133,0.6)] transition-all focus-visible:ring-2 focus-visible:ring-rose-400"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Play Game 2 &rarr;
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 text-xs text-rose-300/60 uppercase tracking-widest pb-4">
        {isWon ? "Level Complete" : "Tap falling items!"}
      </div>
    </div>
  );
}
