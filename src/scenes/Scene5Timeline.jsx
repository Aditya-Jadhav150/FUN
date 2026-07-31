import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Scene5Timeline({ content, sceneColors, onComplete }) {
  const [expandedNode, setExpandedNode] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState(new Set());

  const title = content?.title || "Our Journey";
  const nodes = content?.nodes || [];

  const handleNodeClick = (index) => {
    setExpandedNode(expandedNode === index ? null : index);
    setVisitedNodes(prev => new Set(prev).add(index));
  };

  // Removed allVisited requirement

  return (
    <div 
      className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center py-12 px-6 overflow-y-auto overflow-x-hidden text-white pb-20" 
      style={{ backgroundColor: '#000' }}
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-5xl font-bold text-center mb-16 z-10 shrink-0"
        style={{ color: sceneColors?.accent || '#fff' }}
      >
        {title}
      </motion.h2>

      <div className="relative w-full max-w-4xl flex-1 flex flex-col pb-32 mt-4">
        {/* Vertical Connecting Line */}
        <div className="absolute top-0 bottom-0 w-1 left-8 md:left-1/2 md:-translate-x-1/2 bg-white/10 rounded-full">
          <motion.div 
            className="w-full rounded-full origin-top"
            style={{ 
              backgroundColor: sceneColors?.accent || '#fff',
              boxShadow: `0 0 15px ${sceneColors?.glow || sceneColors?.accent || '#fff'}`
            }}
            initial={{ height: "0%" }}
            animate={{ height: "100%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
        </div>

        {/* Timeline Nodes */}
        <div className="w-full flex flex-col gap-28 md:gap-36 relative z-10">
          {nodes.map((node, index) => {
            const isExpanded = expandedNode === index;
            const isLeft = index % 2 === 0;

            return (
              <div key={index} className="relative flex items-center w-full min-h-[3rem]">
                
                {/* Node Circle */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.4, type: "spring" }}
                  className="absolute left-8 md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full cursor-pointer z-20 flex items-center justify-center"
                  style={{ 
                    backgroundColor: sceneColors?.accent || '#fff',
                    boxShadow: `0 0 20px ${sceneColors?.glow || sceneColors?.accent || '#fff'}` 
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => handleNodeClick(index)}
                >
                  {/* Pulse Ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: sceneColors?.accent || '#fff' }}
                    animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  />
                </motion.div>

                {/* Expanded Detail Card */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, x: isLeft ? 20 : -20, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className={`absolute z-30
                        left-[4.5rem] right-4 w-auto 
                        md:left-auto md:right-auto md:w-[calc(50%-4rem)]
                        ${isLeft ? 'md:right-[calc(50%+2.5rem)]' : 'md:left-[calc(50%+2.5rem)]'}
                      `}
                    >
                      <div className="p-5 md:p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20"
                           style={{ boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.3)` }}>
                        <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ color: sceneColors?.accent || '#fff' }}>
                          {node.label}
                        </h3>
                        <p className="text-base md:text-lg text-white/80 leading-relaxed">
                          {node.detail}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Continue Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, type: "spring" }}
        onClick={onComplete}
        className="fixed bottom-8 right-8 md:bottom-12 md:right-12 z-50 px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg tracking-wider shadow-2xl flex items-center gap-2"
        style={{ 
          backgroundColor: sceneColors?.accent || '#fff',
          color: '#ffffff',
          boxShadow: `0 8px 32px ${sceneColors?.glow || sceneColors?.accent || '#fff'}80`
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Continue &rarr;
      </motion.button>
    </div>
  );
}
