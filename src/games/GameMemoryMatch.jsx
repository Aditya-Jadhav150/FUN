import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const PAIRS = [
  { id: 1, icon: '☕', label: 'Coffee Dates' },
  { id: 2, icon: '🌹', label: 'Surprise Roses' },
  { id: 3, icon: '✈️', label: 'Late Travels' },
  { id: 4, icon: '🎵', label: 'Our Favorite Song' },
];

export default function GameMemoryMatch({ onComplete }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    // Duplicate & shuffle pairs
    const deck = [...PAIRS, ...PAIRS]
      .map((item, index) => ({ ...item, uniqueId: index }))
      .sort(() => Math.random() - 0.5);
    setCards(deck);
  }, []);

  const handleCardClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(cards[index].uniqueId)) {
      return;
    }

    const nextFlipped = [...flipped, index];
    setFlipped(nextFlipped);

    if (nextFlipped.length === 2) {
      const [first, second] = nextFlipped;
      if (cards[first].id === cards[second].id) {
        setMatched(prev => [...prev, cards[first].uniqueId, cards[second].uniqueId]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 900);
      }
    }
  };

  const isWon = matched.length === cards.length && cards.length > 0;

  return (
    <div className="relative w-full min-h-[100dvh] flex flex-col items-center justify-between p-6 select-none text-center">
      {/* Header */}
      <div className="relative z-10 max-w-md w-full mt-4">
        <span className="text-xs uppercase tracking-widest text-rose-300/80 font-mono">Game 2 of 5</span>
        <h2 className="text-4xl md:text-5xl font-serif italic text-rose-gradient mt-1 mb-2">
          Memory Matcher 💖
        </h2>
        <p className="text-sm font-light text-slate-300 mb-4">
          Match all 4 pairs of special memory cards!
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-3 md:gap-4 w-full max-w-md my-auto [perspective:1000px] z-10">
        {cards.map((card, index) => {
          const isCardFlipped = flipped.includes(index) || matched.includes(card.uniqueId);

          return (
            <motion.button
              type="button"
              key={card.uniqueId}
              onClick={() => handleCardClick(index)}
              className="relative aspect-square w-full rounded-2xl cursor-pointer bg-transparent border-none outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{ rotateY: isCardFlipped ? 180 : 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileTap={{ scale: 0.94 }}
            >
              {/* Front Cover */}
              <div
                className="absolute inset-0 w-full h-full rounded-2xl flex items-center justify-center glass-panel-romantic border border-rose-300/30 text-2xl shadow-lg"
                style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
              >
                💌
              </div>

              {/* Back Content */}
              <div
                className="absolute inset-0 w-full h-full rounded-2xl flex flex-col items-center justify-center glass-panel bg-rose-950/80 border border-rose-400/50 text-3xl shadow-2xl p-1"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <span>{card.icon}</span>
                <span className="text-[9px] text-rose-200 mt-1 font-sans">{card.label}</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Level Completion */}
      <AnimatePresence>
        {isWon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-x-6 top-1/3 glass-panel-romantic rounded-3xl p-8 shadow-2xl z-30 max-w-md mx-auto"
          >
            <div className="text-6xl mb-3 animate-bounce">🎉</div>
            <h3 className="text-3xl font-serif italic text-gold-gradient mb-2">
              Stage 2 Cleared!
            </h3>
            <p className="text-sm text-rose-100 font-light mb-6">
              You matched all the memory cards! Scratch & Reveal is now unlocked.
            </p>

            <motion.button
              type="button"
              onClick={onComplete}
              className="px-10 py-4 rounded-full font-medium text-lg text-white bg-rose-500 hover:bg-rose-400 shadow-[0_0_35px_rgba(251,113,133,0.6)] transition-all focus-visible:ring-2 focus-visible:ring-rose-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Play Game 3 &rarr;
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 text-xs text-rose-300/60 uppercase tracking-widest pb-4">
        {isWon ? "Level Complete" : `${matched.length / 2} of 4 Pairs Matched`}
      </div>
    </div>
  );
}
