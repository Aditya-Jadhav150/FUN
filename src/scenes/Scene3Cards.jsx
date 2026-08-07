import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Scene3Cards({ content, sceneColors, onComplete }) {
  const { title = "Things I Love About You", cards = [] } = content || {};
  const [flippedCards, setFlippedCards] = useState(new Set());
  const [hasInteractedAll, setHasInteractedAll] = useState(false);

  const displayCards = cards.length === 4 ? cards : [
    { front: "The way you smile", back: "It lights up my entire world, every single time" },
    { front: "Your laugh", back: "The sound I never want to stop hearing" },
    { front: "Every moment with you", back: "Even silence feels perfect when you're next to me" },
    { front: "The way you care", back: "You make everyone around you feel special" }
  ];

  const handleCardTap = (index) => {
    setFlippedCards(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  useEffect(() => {
    if (flippedCards.size === displayCards.length) {
      setHasInteractedAll(true);
    }
  }, [flippedCards, displayCards.length]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[100dvh] w-full px-6 py-12 select-none">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-serif italic text-rose-gradient text-center mb-10 z-10"
      >
        {title}
      </motion.h2>

      <div className="grid grid-cols-2 gap-4 md:gap-6 w-full max-w-xl z-10 mb-12 [perspective:1000px]">
        {displayCards.slice(0, 4).map((card, index) => {
          const isFlipped = flippedCards.has(index);

          return (
            <motion.button
              type="button"
              key={index}
              aria-label={`Memory card ${index + 1}: ${card.front}`}
              className="relative w-full aspect-[4/5] cursor-pointer rounded-2xl border-none outline-none focus-visible:ring-2 focus-visible:ring-rose-400 bg-transparent"
              style={{ transformStyle: 'preserve-3d' }}
              initial={{ opacity: 0, y: 40 }}
              animate={{
                opacity: 1,
                y: 0,
                rotateY: isFlipped ? 180 : 0
              }}
              transition={{
                rotateY: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.5, delay: index * 0.1 }
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCardTap(index)}
            >
              {/* Card Front */}
              <div
                className="absolute inset-0 w-full h-full rounded-2xl p-5 flex flex-col items-center justify-center glass-panel-romantic shadow-xl text-center border border-white/20"
                style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
              >
                <span className="text-3xl mb-3">💌</span>
                <p className="text-lg md:text-xl font-medium text-rose-100 leading-snug">
                  {card.front}
                </p>
                <span className="text-xs text-rose-300/70 uppercase tracking-widest mt-4">Tap to reveal</span>
              </div>

              {/* Card Back */}
              <div
                className="absolute inset-0 w-full h-full rounded-2xl p-5 flex flex-col items-center justify-center glass-panel bg-rose-950/60 shadow-2xl text-center border border-rose-400/30"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <p className="text-sm md:text-base font-light text-rose-100 leading-relaxed">
                  "{card.back}"
                </p>
                <span className="text-xs text-amber-200/80 mt-3 font-serif italic">💖</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Floating Continue Action */}
      <motion.button
        type="button"
        onClick={onComplete}
        className="px-10 py-4 rounded-full font-medium text-lg tracking-wider text-white glass-panel-romantic shadow-[0_0_30px_rgba(251,113,133,0.4)] hover:shadow-[0_0_45px_rgba(251,113,133,0.7)] transition-all z-20 focus-visible:ring-2 focus-visible:ring-rose-400"
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
