import React, { useState } from 'react';
import SparkIgnition from './SparkIgnition';
import SolarSystemCanvas from './SolarSystemCanvas';
import PlanetInspector from './PlanetInspector';
import { PLANETS } from '../data/planets';

export default function SolarSystemExperience() {
  const [isIgnited, setIsIgnited] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState(PLANETS[3]); // Earth default

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-[#040208]">
      {/* Phase 1: Cosmic Spark Intro */}
      {!isIgnited && (
        <SparkIgnition onIgnite={() => setIsIgnited(true)} />
      )}

      {/* Phase 2 & 3: 3D Solar System & Telemetry Inspector */}
      {isIgnited && (
        <>
          <SolarSystemCanvas
            selectedPlanet={selectedPlanet}
            onSelectPlanet={(planet) => setSelectedPlanet(planet)}
          />

          <PlanetInspector
            selectedPlanet={selectedPlanet}
            onSelectPlanet={(planet) => setSelectedPlanet(planet)}
          />
        </>
      )}
    </div>
  );
}
