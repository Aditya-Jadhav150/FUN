import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Scene3Cards({ content, sceneColors, onComplete }) {
  const { title = "Discover", cards = [], buttonText = "Continue" } = content || {};
  const [flippedCards, setFlippedCards] = useState(new Set());
  const [allFlippedOnce, setAllFlippedOnce] = useState(false);

  // Default cards if none provided
  const displayCards = cards.length === 4 ? cards : [
    { id: 1, front: "?", back: "Memory 1" },
    { id: 2, front: "?", back: "Memory 2" },
    { id: 3, front: "?", back: "Memory 3" },
    { id: 4, front: "?", back: "Memory 4" },
  ];

  const handleCardTap = (index) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // Track if all cards have been flipped at least once
  const [flippedHistory, setFlippedHistory] = useState(new Set());
  
  useEffect(() => {
    setFlippedHistory(prev => {
      const newHistory = new Set(prev);
      flippedCards.forEach(val => newHistory.add(val));
      if (newHistory.size === 4 && !allFlippedOnce) {
        setAllFlippedOnce(true);
      }
      return newHistory;
    });
  }, [flippedCards, allFlippedOnce]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[100dvh] w-full bg-black text-white px-6 py-12 overflow-y-auto overflow-x-hidden pb-20">
      {/* Background elements */}
      <div 
        className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-30 pointer-events-none"
        style={{ backgroundColor: sceneColors?.glow || '#8b5cf6' }}
      />
      <div 
        className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full blur-[100px] opacity-20 pointer-events-none"
        style={{ backgroundColor: sceneColors?.secondary || '#3b82f6' }}
      />

      <motion.h2 
        className="text-3xl md:text-5xl font-bold text-center mb-12 mt-8 z-10"
        style={{ color: sceneColors?.accent || '#ffffff' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {title}
      </motion.h2>

      <div className="grid grid-cols-2 gap-4 md:gap-8 w-full max-w-2xl z-10 mb-16 perspective-1000">
        {displayCards.slice(0, 4).map((card, index) => {
          const isFlipped = flippedCards.has(index);
          
          return (
            <motion.div
              key={index}
              className="relative w-full aspect-[3/4] cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: 1, 
                y: [0, -5, 5, 0],
                rotateY: isFlipped ? 180 : 0
              }}
              transition={{ 
                y: { duration: 4 + index, repeat: Infinity, ease: "easeInOut" },
                rotateY: { duration: 0.6, type: "spring", stiffness: 200, damping: 20 },
                opacity: { duration: 0.6, delay: index * 0.1 }
              }}
              onClick={() => handleCardTap(index)}
            >
              {/* Front of card */}
              <div 
                className="absolute inset-0 w-full h-full backface-hidden rounded-2xl p-6 flex flex-col items-center justify-center bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
                style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
              >
                <div 
                  className="text-4xl md:text-6xl font-light text-center text-white/80"
                >
                  {card.front}
                </div>
              </div>

              {/* Back of card */}
              <div 
                className="absolute inset-0 w-full h-full backface-hidden rounded-2xl p-6 flex flex-col items-center justify-center bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
                style={{ 
                  backfaceVisibility: 'hidden', 
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <div 
                  className="text-xl md:text-2xl font-medium text-center text-white"
                  style={{ color: '#ffffff' }}
                >
                  {card.back}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {allFlippedOnce && (
          <motion.button
            onClick={onComplete}
            className="px-10 py-4 rounded-full font-semibold text-lg tracking-wider z-20 mt-8"
            style={{ 
              backgroundColor: sceneColors?.accent || '#8b5cf6',
              color: '#ffffff',
              boxShadow: `0 8px 32px ${sceneColors?.glow || '#8b5cf6'}60`
            }}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {buttonText}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
