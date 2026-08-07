import React from 'react';
import { motion } from 'motion/react';

export default function Scene1Welcome({ content, sceneColors, onComplete }) {
  const { title = "Hey...", subtitle = "I made something special for you", buttonText = "Enter" } = content || {};

  const titleWords = title.split(' ');
  const subtitleChars = subtitle.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  const subtitleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: titleWords.length * 0.12 + 0.4,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[100dvh] w-full px-6 text-center select-none">
      {/* Central Pulsing Heart Aura */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full blur-[100px] pointer-events-none opacity-40"
        style={{ backgroundColor: sceneColors?.glow || '#fb7185' }}
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.35, 0.6, 0.35],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center max-w-xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-4xl mb-4 animate-float-gentle">
          ✨
        </motion.div>

        <h1 className="text-6xl md:text-8xl font-serif italic tracking-tight mb-6 flex flex-wrap justify-center gap-x-4">
          {titleWords.map((word, i) => (
            <motion.span key={i} variants={itemVariants} className="text-rose-gradient drop-shadow-lg">
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.div
          className="text-lg md:text-2xl font-light text-slate-300 tracking-wide mb-14 flex flex-wrap justify-center max-w-md"
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
        >
          {subtitleChars.map((char, i) => (
            <motion.span key={i} variants={charVariants}>
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.div>

        <motion.button
          type="button"
          onClick={onComplete}
          aria-label={buttonText}
          className="px-12 py-4 rounded-full font-medium text-lg tracking-wider text-white glass-panel-romantic shadow-[0_0_30px_rgba(251,113,133,0.3)] hover:shadow-[0_0_45px_rgba(251,113,133,0.6)] transition-all flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-rose-400"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-rose-200">{buttonText}</span>
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-rose-400 group-hover:translate-x-1 transition-transform"
          >
            &rarr;
          </motion.span>
        </motion.button>
      </motion.div>
    </div>
  );
}
