import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Scene4Gallery({ content, sceneColors, onComplete }) {
  const { title = "Us", caption = "My favorite picture in the world", images = ["/gallery/PIC.jpeg"] } = content || {};
  const [isExpanded, setIsExpanded] = useState(false);

  const photoSrc = images[0] || "/gallery/PIC.jpeg";

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[100dvh] w-full px-6 py-12 select-none">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-serif italic text-rose-gradient text-center mb-8 z-10"
      >
        {title}
      </motion.h2>

      {/* Polaroid Frame Container */}
      <motion.div
        className="relative z-10 max-w-sm w-full p-4 pb-6 bg-slate-900/90 backdrop-blur-2xl rounded-3xl border border-rose-300/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-pointer group"
        initial={{ opacity: 0, scale: 0.88, rotate: -2 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.02, rotate: 1 }}
        onClick={() => setIsExpanded(true)}
      >
        {/* Glowing Photo Backlight */}
        <div className="absolute inset-0 rounded-3xl bg-rose-500/20 blur-xl group-hover:bg-rose-400/30 transition-colors pointer-events-none" />

        <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-black/40 mb-4">
          <img
            src={photoSrc}
            alt="Us"
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        </div>

        <p className="font-serif italic text-center text-lg text-rose-100 px-2">
          "{caption}"
        </p>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-6"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-2xl max-h-[80vh] w-full h-full flex items-center justify-center"
            >
              <img
                src={photoSrc}
                alt="Us Expanded"
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border border-rose-300/30"
              />
            </motion.div>
            <p className="text-white/70 text-sm mt-4 tracking-widest uppercase">Tap anywhere to close</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={onComplete}
        className="mt-10 px-10 py-4 rounded-full font-medium text-lg tracking-wider text-white glass-panel-romantic shadow-[0_0_30px_rgba(251,113,133,0.4)] hover:shadow-[0_0_45px_rgba(251,113,133,0.7)] transition-all z-20 focus-visible:ring-2 focus-visible:ring-rose-400"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Continue &rarr;
      </motion.button>
    </div>
  );
}
