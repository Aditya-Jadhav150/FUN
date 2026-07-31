import React from 'react';
import { motion } from 'motion/react';

export default function AnimatedText({ text, type = 'body', delay = 0, className = '' }) {
  if (!text) return null;

  if (type === 'heading') {
    const words = text.split(' ');
    
    return (
      <div className={`flex flex-wrap font-bold text-4xl md:text-6xl ${className}`}>
        {words.map((word, index) => (
          <motion.span
            key={index}
            className="mr-2 mb-2 inline-block"
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              duration: 0.8,
              delay: delay + index * 0.15,
              ease: [0.2, 0.65, 0.3, 0.9]
            }}
          >
            {word}
          </motion.span>
        ))}
      </div>
    );
  }

  if (type === 'subtitle') {
    const letters = text.split('');
    
    return (
      <div className={`font-medium text-xl md:text-2xl opacity-90 ${className}`}>
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className="inline-block"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: delay + index * 0.03,
              ease: "easeOut"
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </div>
    );
  }

  // Body type
  return (
    <motion.p
      className={`text-base md:text-lg opacity-80 leading-relaxed ${className}`}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {text}
    </motion.p>
  );
}
