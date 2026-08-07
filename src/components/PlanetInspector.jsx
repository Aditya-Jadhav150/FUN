import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PLANETS } from '../data/planets';

export default function PlanetInspector({ selectedPlanet, onSelectPlanet }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Sci-Fi HUD Header Badge */}
      <header className="fixed top-6 left-6 z-40 flex items-center gap-3">
        <div className="px-4 py-2 rounded-full glass-panel-cyan border border-sky-400/40 text-xs font-mono text-sky-200 flex items-center gap-2 shadow-2xl">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Cosmic Simulator v5.0</span>
        </div>
      </header>

      {/* Planet Selector Carousel */}
      <nav aria-label="Solar System Navigation" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-full px-4">
        <div className="flex items-center gap-2 p-2 rounded-full glass-panel-cyan border border-sky-400/40 overflow-x-auto max-w-[94vw] shadow-[0_0_35px_rgba(8,4,14,0.8)]">
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
                className={`px-3.5 py-2 rounded-full text-xs font-mono whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-sky-400 flex items-center gap-2 ${isSelected ? 'bg-gradient-to-r from-sky-400 to-cyan-300 text-slate-950 font-bold shadow-[0_0_20px_rgba(56,189,248,0.9)] scale-105' : 'text-slate-200 hover:bg-white/10'}`}
              >
                <span className="w-2.5 h-2.5 rounded-full inline-block shadow-sm" style={{ backgroundColor: planet.color }} />
                <span>{planet.name}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Sci-Fi Telemetry Inspector Modal */}
      <AnimatePresence>
        {isOpen && selectedPlanet && (
          <motion.aside
            aria-label={`Telemetry data for ${selectedPlanet.name}`}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-20 right-4 sm:right-6 z-40 w-[92vw] sm:w-[390px] max-h-[76vh] glass-panel-cyan rounded-3xl p-6 shadow-2xl border border-sky-400/40 overflow-y-auto"
          >
            {/* Header & Target Lock */}
            <div className="flex items-start justify-between mb-4 pb-3 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                  <span className="text-[10px] uppercase font-mono tracking-widest text-sky-300">
                    TARGET LOCK: {selectedPlanet.id.toUpperCase()}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif italic text-cyan-gradient mt-1">
                  {selectedPlanet.name}
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close telemetry inspector"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 flex items-center justify-center text-sm focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                ✕
              </button>
            </div>

            {/* Type & Description */}
            <div className="mb-4">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-sky-500/10 text-sky-300 border border-sky-400/30 inline-block mb-2">
                {selectedPlanet.type}
              </span>
              <p className="text-slate-200 text-xs sm:text-sm font-light leading-relaxed">
                {selectedPlanet.description}
              </p>
            </div>

            {/* Telemetry Stats Grid */}
            <div className="grid grid-cols-2 gap-2.5 mb-5 font-mono">
              <div className="p-3 rounded-2xl bg-slate-950/70 border border-white/10">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Diameter</span>
                <span className="text-xs sm:text-sm text-sky-300 font-medium">{selectedPlanet.diameter}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950/70 border border-white/10">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Sun Distance</span>
                <span className="text-xs sm:text-sm text-amber-200 font-medium">{selectedPlanet.distanceFromSun}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950/70 border border-white/10">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Orbit Time</span>
                <span className="text-xs sm:text-sm text-rose-300 font-medium">{selectedPlanet.orbitalPeriod}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950/70 border border-white/10">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Day Length</span>
                <span className="text-xs sm:text-sm text-emerald-300 font-medium">{selectedPlanet.dayLength}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950/70 border border-white/10">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Temperature</span>
                <span className="text-xs sm:text-sm text-orange-300 font-medium">{selectedPlanet.temperature}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950/70 border border-white/10">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Moons</span>
                <span className="text-xs sm:text-sm text-purple-300 font-medium">{selectedPlanet.moonsCount}</span>
              </div>
            </div>

            {/* Atmosphere */}
            <div className="p-3 rounded-2xl bg-slate-950/70 border border-white/10 mb-4 font-mono">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1">Atmosphere Composition</span>
              <span className="text-xs text-slate-200">{selectedPlanet.atmosphere}</span>
            </div>

            {/* Fun Fact */}
            <div className="p-4 rounded-2xl glass-panel border border-sky-400/30">
              <span className="text-xs font-mono text-sky-400 font-bold block mb-1">💡 Planetary Telemetry Fact</span>
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
