import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PLANETS } from '../data/planets';

export default function PlanetInspector({ selectedPlanet, onSelectPlanet }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Horizontal Planet Selection Carousel Bar */}
      <nav aria-label="Solar System Navigation" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-full px-4">
        <div className="flex items-center gap-2 p-2 rounded-full glass-panel-cyan border border-sky-400/30 overflow-x-auto max-w-[92vw] shadow-2xl">
          {PLANETS.map((planet) => {
            const isSelected = selectedPlanet?.id === planet.id;
            return (
              <button
                type="button"
                key={planet.id}
                onClick={() => {
                  onSelectPlanet(planet);
                  setIsOpen(true);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-sky-400 flex items-center gap-1.5 ${isSelected ? 'bg-sky-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(56,189,248,0.8)]' : 'text-slate-200 hover:bg-white/10'}`}
              >
                <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: planet.color }} />
                <span>{planet.name}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Slide-Out Glassmorphism Telemetry Inspector Card */}
      <AnimatePresence>
        {isOpen && selectedPlanet && (
          <motion.aside
            aria-label={`Telemetry data for ${selectedPlanet.name}`}
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-20 right-4 sm:right-6 z-40 w-[92vw] sm:w-[380px] max-h-[75vh] glass-panel-cyan rounded-3xl p-6 shadow-2xl border border-sky-400/30 overflow-y-auto"
          >
            {/* Header & Close Action */}
            <div className="flex items-start justify-between mb-4 pb-3 border-b border-white/10">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-sky-300">
                  {selectedPlanet.type}
                </span>
                <h2 className="text-3xl font-serif italic text-cyan-gradient mt-0.5">
                  {selectedPlanet.name}
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close inspector"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 flex items-center justify-center text-sm focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                ✕
              </button>
            </div>

            {/* Description */}
            <p className="text-slate-200 text-xs sm:text-sm font-light leading-relaxed mb-6">
              {selectedPlanet.description}
            </p>

            {/* Telemetry Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/10">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-mono">Diameter</span>
                <span className="text-xs sm:text-sm font-mono text-sky-300 font-medium">{selectedPlanet.diameter}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/10">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-mono">Sun Distance</span>
                <span className="text-xs sm:text-sm font-mono text-amber-200 font-medium">{selectedPlanet.distanceFromSun}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/10">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-mono">Orbit Time</span>
                <span className="text-xs sm:text-sm font-mono text-rose-300 font-medium">{selectedPlanet.orbitalPeriod}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/10">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-mono">Day Length</span>
                <span className="text-xs sm:text-sm font-mono text-emerald-300 font-medium">{selectedPlanet.dayLength}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/10">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-mono">Temperature</span>
                <span className="text-xs sm:text-sm font-mono text-orange-300 font-medium">{selectedPlanet.temperature}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/10">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-mono">Moons</span>
                <span className="text-xs sm:text-sm font-mono text-purple-300 font-medium">{selectedPlanet.moonsCount}</span>
              </div>
            </div>

            {/* Atmosphere */}
            <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/10 mb-4">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-mono mb-1">Atmosphere</span>
              <span className="text-xs font-mono text-slate-200">{selectedPlanet.atmosphere}</span>
            </div>

            {/* Fun Fact */}
            <div className="p-4 rounded-2xl glass-panel border border-sky-400/30">
              <span className="text-xs font-mono text-sky-400 font-bold block mb-1">💡 Cosmic Fact</span>
              <p className="text-xs text-slate-200 font-serif italic leading-relaxed">
                "{selectedPlanet.funFact}"
              </p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
