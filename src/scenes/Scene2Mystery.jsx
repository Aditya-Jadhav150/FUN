import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Scene2Mystery({ content, sceneColors, onComplete }) {
  const { revealText = "Every beat is for you", buttonText = "Continue" } = content || {};
  const [isRevealed, setIsRevealed] = useState(false);
  const [tapRipples, setTapRipples] = useState([]);

  const handleTap = (e) => {
    if (!isRevealed) setIsRevealed(true);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setTapRipples(prev => [...prev, { id: Date.now(), x, y }]);
  };

  const burstParticles = Array.from({ length: 16 });

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[100dvh] w-full px-6 py-12 text-center select-none">
      {/* Background Heart Glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] pointer-events-none opacity-40"
        style={{
          width: '500px',
          height: '500px',
          background: `radial-gradient(circle, ${sceneColors?.glow || '#fb7185'} 0%, rgba(10,5,18,0) 70%)`
        }}
        animate={{ opacity: isRevealed ? 0.75 : 0.35, scale: isRevealed ? 1.3 : 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md">
        <div className="relative mb-10 flex items-center justify-center">
          {/* Main Pulsing Heart */}
          <motion.button
            type="button"
            onClick={handleTap}
            aria-label="Tap the heart"
            className="text-8xl md:text-9xl cursor-pointer drop-shadow-[0_10px_35px_rgba(251,113,133,0.5)] flex items-center justify-center bg-transparent border-none outline-none focus-visible:ring-4 focus-visible:ring-rose-400 rounded-full p-4"
            animate={isRevealed ? {
              scale: [1, 1.25, 1],
              rotate: [0, -8, 8, 0]
            } : {
              scale: [1, 1.08, 1, 1.15, 1],
            }}
            transition={isRevealed ? {
              type: "spring", stiffness: 300, damping: 12
            } : {
              duration: 2.2, repeat: Infinity, ease: "easeInOut"
            }}
            whileTap={{ scale: 0.88 }}
          >
            💖
          </motion.button>

          {/* Spark Particles Burst */}
          {isRevealed && burstParticles.map((_, i) => {
            const angle = (i / burstParticles.length) * Math.PI * 2;
            const distance = 140 + Math.random() * 80;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            return (
              <motion.span
                key={i}
                className="absolute text-xl pointer-events-none"
                initial={{ x: 0, y: 0, opacity: 1, scale: 0.4 }}
                animate={{
                  x,
                  y,
                  opacity: 0,
                  scale: Math.random() * 1.4 + 0.6,
                  rotate: Math.random() * 360
                }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                ✨
              </motion.span>
            );
          })}
        </div>

        {/* Text & Action Reveal */}
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.p
              key="prompt"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.7, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-base font-light text-rose-200 tracking-widest uppercase animate-pulse"
            >
              Tap the heart
            </motion.p>
          ) : (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel-romantic p-8 rounded-3xl w-full flex flex-col items-center shadow-2xl"
            >
              <h2 className="text-3xl md:text-4xl font-serif italic text-rose-gradient mb-6 leading-tight">
                {revealText}
              </h2>

              <motion.button
                type="button"
                onClick={onComplete}
                className="px-10 py-3.5 rounded-full font-medium text-base tracking-wider text-white bg-rose-500/80 hover:bg-rose-500 shadow-[0_0_25px_rgba(251,113,133,0.5)] transition-all focus-visible:ring-2 focus-visible:ring-rose-400"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                {buttonText} &rarr;
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
