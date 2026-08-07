import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Scene5Timeline({ content, sceneColors, onComplete }) {
  const [expandedNode, setExpandedNode] = useState(null);

  const title = content?.title || "Our Story";
  const nodes = content?.nodes || [
    { label: "When we first met", detail: "I didn't know it then, but everything was about to change" },
    { label: "When I realized you're special", detail: "Something about you felt different from everyone else" },
    { label: "Every moment since", detail: "Each one more precious than the last" },
    { label: "Right now", detail: "Reading this, knowing how much you mean to me" }
  ];

  const handleNodeClick = (index) => {
    setExpandedNode(expandedNode === index ? null : index);
  };

  return (
    <div className="relative w-full min-h-[100dvh] flex flex-col items-center justify-start py-14 px-6 text-white pb-32 select-none">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-serif italic text-rose-gradient text-center mb-14 z-10 shrink-0"
      >
        {title}
      </motion.h2>

      {/* Constellation Star Path */}
      <div className="relative w-full max-w-2xl flex flex-col gap-12 z-10">
        {/* Glowing Vertical Line */}
        <div className="absolute top-4 bottom-4 left-6 md:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-rose-400/40 via-amber-200/50 to-rose-400/40 rounded-full" />

        {nodes.map((node, index) => {
          const isExpanded = expandedNode === index;
          const isLeft = index % 2 === 0;

          return (
            <div key={index} className="relative flex items-center w-full min-h-[4rem]">
              {/* Star Node */}
              <motion.button
                type="button"
                aria-label={`Story node ${index + 1}: ${node.label}`}
                onClick={() => handleNodeClick(index)}
                className="absolute left-6 md:left-1/2 -translate-x-1/2 w-7 h-7 rounded-full glass-panel-romantic z-20 flex items-center justify-center cursor-pointer border border-rose-300/60 focus-visible:ring-2 focus-visible:ring-rose-400"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + index * 0.2, type: "spring" }}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="text-xs">✨</span>
              </motion.button>

              {/* Blooming Card */}
              <div
                onClick={() => handleNodeClick(index)}
                className={`w-full cursor-pointer pl-16 md:pl-0 ${
                  isLeft ? 'md:pr-[calc(50%+2.5rem)] md:text-right' : 'md:pl-[calc(50%+2.5rem)] md:text-left'
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.2 }}
                  className="glass-panel-romantic p-5 rounded-2xl border border-rose-300/20 shadow-xl hover:border-rose-400/50 transition-colors"
                >
                  <h3 className="text-lg md:text-xl font-medium text-rose-100 flex items-center gap-2 justify-start md:justify-inherit">
                    <span>{node.label}</span>
                  </h3>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-sm md:text-base font-light text-slate-300 mt-3 pt-3 border-t border-rose-400/20 leading-relaxed"
                      >
                        {node.detail}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Permanent Floating Action */}
      <motion.button
        type="button"
        onClick={onComplete}
        className="fixed bottom-8 right-8 z-50 px-8 py-3.5 rounded-full font-medium text-base text-white glass-panel-romantic shadow-[0_0_30px_rgba(251,113,133,0.5)] hover:shadow-[0_0_45px_rgba(251,113,133,0.8)] transition-all focus-visible:ring-2 focus-visible:ring-rose-400"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Continue &rarr;
      </motion.button>
    </div>
  );
}
