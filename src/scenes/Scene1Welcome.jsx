import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Scene1Welcome({ content, sceneColors, onComplete }) {
  const { title = "Welcome", subtitle = "To the experience", buttonText = "Enter" } = content || {};
  
  const titleWords = title.split(' ');
  const subtitleChars = subtitle.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const subtitleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: titleWords.length * 0.1 + 0.5,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[100dvh] w-full overflow-y-auto bg-black text-white px-4 pb-20">
      {/* Glowing orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] opacity-50 mix-blend-screen"
        style={{ width: '40vw', height: '40vw', backgroundColor: sceneColors?.glow || '#3b82f6' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 flex flex-wrap justify-center gap-x-4">
          {titleWords.map((word, i) => (
            <motion.span key={i} variants={itemVariants} style={{ color: sceneColors?.accent || '#ffffff' }}>
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.div
          className="text-xl md:text-2xl font-light mb-12 flex flex-wrap justify-center text-white/80"
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
          onClick={onComplete}
          className="px-8 py-3 rounded-full font-medium text-lg uppercase tracking-wider relative group overflow-hidden mt-8"
          style={{ 
            backgroundColor: sceneColors?.accent || '#8b5cf6',
            boxShadow: `0 0 20px ${sceneColors?.glow || '#3b82f6'}40`
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="absolute inset-0 z-0 opacity-50"
            style={{ backgroundColor: sceneColors?.primary || '#3b82f6' }}
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="relative z-10 text-white" style={{ color: '#ffffff' }}>
            {buttonText}
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
}
