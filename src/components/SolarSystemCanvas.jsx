import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { PLANETS } from '../data/planets';

// 3D Starlight Background
function Starfield() {
  const count = 1200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 120;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 120;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 120;
    }
    return pos;
  }, [count]);

  return (
    <Points positions={positions} stride={3}>
      <PointMaterial transparent color="#ffffff" size={0.15} sizeAttenuation depthWrite={false} />
    </Points>
  );
}

// Orbital Ring Line
function OrbitRing({ radius }) {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
    }
    return pts;
  }, [radius]);

  const lineGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    return geom;
  }, [points]);

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial attach="material" color="#38bdf8" opacity={0.25} transparent />
    </line>
  );
}

// 3D Celestial Body Mesh
function PlanetMesh({ planet, onSelect, isSelected }) {
  const meshRef = useRef();
  const groupRef = useRef();

  useFrame((state, delta) => {
    // Self Rotation
    if (meshRef.current) {
      meshRef.current.rotation.y += planet.rotationSpeed;
    }
    // Orbit around Sun
    if (groupRef.current && planet.id !== 'sun') {
      groupRef.current.rotation.y += planet.orbitSpeed * 0.4;
    }
  });

  return (
    <group ref={groupRef}>
      <group position={[planet.distance, 0, 0]}>
        <mesh
          ref={meshRef}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(planet);
          }}
          className="cursor-pointer"
        >
          <sphereGeometry args={[planet.size, 32, 32]} />
          {planet.id === 'sun' ? (
            <meshBasicMaterial color={planet.color} />
          ) : (
            <meshStandardMaterial
              color={planet.color}
              roughness={0.6}
              metalness={0.2}
              emissive={isSelected ? '#38bdf8' : '#000000'}
              emissiveIntensity={isSelected ? 0.4 : 0}
            />
          )}
        </mesh>

        {/* Saturn Rings */}
        {planet.hasRings && (
          <mesh rotation={[-Math.PI / 3, 0, 0]}>
            <ringGeometry args={[planet.size * 1.3, planet.size * 2.2, 32]} />
            <meshBasicMaterial color={planet.ringColor || '#fde047'} side={THREE.DoubleSide} opacity={0.7} transparent />
          </mesh>
        )}

        {/* Earth Moon */}
        {planet.hasMoon && (
          <mesh position={[planet.size + 0.6, 0, 0]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color="#cbd5e1" />
          </mesh>
        )}
      </group>
    </group>
  );
}

export default function SolarSystemCanvas({ selectedPlanet, onSelectPlanet }) {
  return (
    <div className="w-full h-[100dvh] relative z-10 bg-transparent">
      <Canvas camera={{ position: [0, 22, 45], fov: 55 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 0, 0]} intensity={2.5} color="#fff" distance={100} decay={1} />
        <directionalLight position={[10, 20, 15]} intensity={1} />

        <Suspense fallback={null}>
          <Starfield />

          {/* Orbital Rings */}
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

          <OrbitControls
            enablePan={true}
            enableZoom={true}
            minDistance={10}
            maxDistance={80}
            maxPolarAngle={Math.PI / 2 + 0.1}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
