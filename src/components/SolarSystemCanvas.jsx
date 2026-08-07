import React, { useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Points, PointMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { PLANETS } from '../data/planets';

// 3,000 Multi-Colored Deep Space Stars
function DeepSpaceStarfield() {
  const count = 3000;
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const starColors = ['#ffffff', '#38bdf8', '#fb7185', '#fde68a', '#93c5fd'];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 220;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 220;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 220;

      const c = new THREE.Color(starColors[Math.floor(Math.random() * starColors.length)]);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  return (
    <Points positions={positions} colors={colors} stride={3}>
      <PointMaterial transparent vertexColors size={0.18} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </Points>
  );
}

// Orbital Ring Path
function OrbitRing({ radius }) {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 96; i++) {
      const theta = (i / 96) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
    }
    return pts;
  }, [radius]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial attach="material" color="#38bdf8" opacity={0.2} transparent linewidth={1} />
    </line>
  );
}

// Smooth Camera Controller with Smooth Flight Dampening
function CameraFlightController({ selectedPlanet, controlsRef }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 0));
  const cameraPos = useRef(new THREE.Vector3(0, 25, 55));

  useEffect(() => {
    if (!selectedPlanet) return;

    if (selectedPlanet.id === 'sun') {
      targetPos.current.set(0, 0, 0);
      cameraPos.current.set(0, 15, 25);
    } else {
      const dist = selectedPlanet.distance;
      const focus = selectedPlanet.focusDistance || 6;
      targetPos.current.set(dist, 0, 0);
      cameraPos.current.set(dist, focus * 0.8, focus * 2.2);
    }
  }, [selectedPlanet]);

  useFrame((state, delta) => {
    if (controlsRef.current) {
      controlsRef.current.target.lerp(targetPos.current, 0.05);
      camera.position.lerp(cameraPos.current, 0.05);
      controlsRef.current.update();
    }
  });

  return null;
}

// Photorealistic Planet Mesh
function PlanetMesh({ planet, onSelect, isSelected }) {
  const meshRef = useRef();
  const cloudsRef = useRef();
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += planet.rotationSpeed;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += planet.rotationSpeed * 1.3;
    }
    if (groupRef.current && planet.id !== 'sun') {
      groupRef.current.rotation.y += planet.orbitSpeed * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <group position={[planet.distance, 0, 0]}>
        {/* Planet Core Sphere */}
        <mesh
          ref={meshRef}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(planet);
          }}
          className="cursor-pointer"
        >
          <sphereGeometry args={[planet.size, 64, 64]} />
          {planet.id === 'sun' ? (
            <meshBasicMaterial color={planet.color} />
          ) : (
            <meshStandardMaterial
              color={planet.color}
              roughness={planet.roughness || 0.6}
              metalness={planet.metalness || 0.2}
              emissive={planet.emissive || '#000000'}
              emissiveIntensity={isSelected ? 0.6 : 0.2}
            />
          )}
        </mesh>

        {/* Sun Corona Glow Sphere */}
        {planet.id === 'sun' && (
          <mesh scale={[1.25, 1.25, 1.25]}>
            <sphereGeometry args={[planet.size, 32, 32]} />
            <meshBasicMaterial color="#ffaa00" opacity={0.35} transparent blending={THREE.AdditiveBlending} side={THREE.BackSide} />
          </mesh>
        )}

        {/* Atmosphere Rayleigh Scattering Shell */}
        {planet.hasAtmosphere && (
          <mesh scale={[1.12, 1.12, 1.12]}>
            <sphereGeometry args={[planet.size, 32, 32]} />
            <meshBasicMaterial color={planet.atmosphereColor || '#38bdf8'} opacity={0.25} transparent side={THREE.BackSide} blending={THREE.AdditiveBlending} />
          </mesh>
        )}

        {/* Earth Rotating Cloud Shell */}
        {planet.hasClouds && (
          <mesh ref={cloudsRef} scale={[1.04, 1.04, 1.04]}>
            <sphereGeometry args={[planet.size, 32, 32]} />
            <meshStandardMaterial color="#ffffff" opacity={0.3} transparent depthWrite={false} />
          </mesh>
        )}

        {/* Saturn / Ringed Planet System */}
        {planet.hasRings && (
          <group rotation={[-Math.PI / 3, 0, 0]}>
            <mesh>
              <ringGeometry args={[planet.size * 1.35, planet.size * 2.4, 64]} />
              <meshBasicMaterial color={planet.ringColor || '#fde047'} side={THREE.DoubleSide} opacity={0.8} transparent />
            </mesh>
          </group>
        )}

        {/* Earth Moon */}
        {planet.hasMoon && (
          <group rotation={[0.4, 0, 0]}>
            <mesh position={[planet.size + 0.8, 0, 0]}>
              <sphereGeometry args={[0.24, 16, 16]} />
              <meshStandardMaterial color="#cbd5e1" roughness={0.9} />
            </mesh>
          </group>
        )}
      </group>
    </group>
  );
}

export default function SolarSystemCanvas({ selectedPlanet, onSelectPlanet }) {
  const controlsRef = useRef();

  return (
    <div className="w-full h-[100dvh] relative z-10 bg-transparent select-none">
      <Canvas camera={{ position: [0, 25, 55], fov: 55 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.25} />
        {/* Sun Point Light Source */}
        <pointLight position={[0, 0, 0]} intensity={3.5} color="#fff" distance={150} decay={0.8} />
        <directionalLight position={[10, 25, 20]} intensity={1.2} />

        <Suspense fallback={null}>
          <DeepSpaceStarfield />

          {/* Orbital Paths */}
          {PLANETS.filter(p => p.id !== 'sun').map(p => (
            <OrbitRing key={p.id} radius={p.distance} />
          ))}

          {/* Planets */}
          {PLANETS.map(p => (
            <PlanetMesh
              key={p.id}
              planet={p}
              onSelect={onSelectPlanet}
              isSelected={selectedPlanet?.id === p.id}
            />
          ))}

          <CameraFlightController selectedPlanet={selectedPlanet} controlsRef={controlsRef} />

          <OrbitControls
            ref={controlsRef}
            enablePan={true}
            enableZoom={true}
            minDistance={4}
            maxDistance={90}
            maxPolarAngle={Math.PI / 2 + 0.1}
          />

          {/* Post-Processing Bloom & Vignette */}
          <EffectComposer>
            <Bloom intensity={1.2} luminanceThreshold={0.4} luminanceSmoothing={0.9} />
            <Vignette eskil={false} offset={0.1} darkness={0.6} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
