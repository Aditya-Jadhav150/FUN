import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function SparkIgnition({ onIgnite }) {
  const [isIgniting, setIsIgniting] = useState(false);

  const handleSparkClick = () => {
    if (isIgniting) return;
    setIsIgniting(true);
    setTimeout(() => {
      onIgnite();
    }, 1400);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 1.2 } }}
        className="fixed inset-0 z-50 bg-[#040208] flex flex-col items-center justify-center p-6 select-none cursor-pointer overflow-hidden text-center"
        onClick={handleSparkClick}
      >
        {/* Pulsing Spark Orb */}
        <div className="relative flex items-center justify-center">
          {/* Shockwave Flare on Click */}
          <motion.div
            className="absolute rounded-full bg-gradient-to-r from-sky-400 via-cyan-300 to-rose-400 blur-2xl pointer-events-none"
            animate={isIgniting ? {
              scale: [1, 25],
              opacity: [0.8, 0]
            } : {
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={isIgniting ? {
              duration: 1.4,
              ease: "easeOut"
            } : {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ width: '180px', height: '180px' }}
          />

          {/* Central Spark Core */}
          <motion.button
            type="button"
            aria-label="Click spark to ignite universe"
            className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-tr from-sky-300 via-cyan-200 to-white flex items-center justify-center shadow-[0_0_60px_rgba(56,189,248,0.9)] border-4 border-white/60 focus-visible:ring-4 focus-visible:ring-sky-400 cursor-pointer"
            animate={isIgniting ? {
              scale: [1, 3, 0],
              rotate: 360
            } : {
              scale: [1, 1.1, 1]
            }}
            transition={isIgniting ? { duration: 1.2 } : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-3xl animate-pulse">✨</span>
          </motion.button>
        </div>

        {/* Prompt Copy */}
        <motion.div
          animate={isIgniting ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          className="mt-12 max-w-sm"
        >
          <h1 className="text-3xl sm:text-4xl font-serif italic text-cyan-gradient mb-2">
            Cosmic Ignition
          </h1>
          <p className="text-sm font-light text-slate-300 tracking-wide uppercase font-mono animate-pulse">
            Tap the spark to awaken the universe
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
