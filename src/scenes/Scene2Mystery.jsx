import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Scene2Mystery({ content, sceneColors, onComplete }) {
  const { revealText = "You found the secret!", buttonText = "Continue" } = content || {};
  const [isRevealed, setIsRevealed] = useState(false);

  const handleTap = () => {
    if (!isRevealed) setIsRevealed(true);
  };

  const burstParticles = Array.from({ length: 12 });

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[100dvh] w-full bg-black text-white px-4 overflow-y-auto pb-20">
      {/* Background glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] mix-blend-screen pointer-events-none"
        style={{ 
          width: '60vw', 
          height: '60vw', 
          background: `radial-gradient(circle, ${sceneColors?.glow || '#ec4899'} 0%, transparent 70%)` 
        }}
        animate={{ opacity: isRevealed ? 0.8 : 0.2, scale: isRevealed ? 1.5 : 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full">
        <div className="relative mb-12">
          {/* Main Heart */}
          <motion.div
            onClick={handleTap}
            className="text-8xl md:text-[9rem] cursor-pointer drop-shadow-2xl flex items-center justify-center select-none"
            animate={isRevealed ? { 
              scale: [1, 1.3, 1],
              rotate: [0, -10, 10, 0]
            } : {
              y: [-10, 10, -10]
            }}
            transition={isRevealed ? {
              type: "spring", stiffness: 300, damping: 10
            } : {
              duration: 3, repeat: Infinity, ease: "easeInOut"
            }}
            whileTap={{ scale: 0.9 }}
          >
            💖
          </motion.div>

          {/* Burst Particles */}
          {isRevealed && burstParticles.map((_, i) => {
            const angle = (i / burstParticles.length) * Math.PI * 2;
            const distance = 150 + Math.random() * 100;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            return (
              <motion.span
                key={i}
                className="absolute top-1/2 left-1/2 text-2xl md:text-3xl pointer-events-none"
                initial={{ x: "-50%", y: "-50%", opacity: 1, scale: 0.5 }}
                animate={{
                  x: `calc(-50% + ${x}px)`,
                  y: `calc(-50% + ${y}px)`,
                  opacity: 0,
                  scale: Math.random() * 1.5 + 0.5,
                  rotate: Math.random() * 360
                }}
                transition={{ duration: 1 + Math.random(), ease: "easeOut" }}
              >
                💖
              </motion.span>
            );
          })}
        </div>

        {/* Text and Button Reveal */}
        <AnimatePresence>
          {!isRevealed ? (
            <motion.div
              key="prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-lg font-light tracking-wide mt-8 text-white/80"
            >
              Tap the heart
            </motion.div>
          ) : (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex flex-col items-center w-full max-w-md mt-8"
            >
              <h2 
                className="text-2xl md:text-4xl font-bold text-center mb-8 px-4 leading-tight"
                style={{ color: sceneColors?.accent || '#ffffff' }}
              >
                {revealText}
              </h2>
              
              <motion.button
                onClick={onComplete}
                className="px-10 py-4 rounded-full font-semibold text-lg tracking-wider mt-4"
                style={{ 
                  backgroundColor: sceneColors?.accent || '#ec4899',
                  color: '#ffffff',
                  boxShadow: `0 8px 32px ${sceneColors?.glow || '#ec4899'}60`
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
              >
                {buttonText}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
