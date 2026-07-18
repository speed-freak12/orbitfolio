"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SatelliteProps {
  color: string;
  hovered: boolean;
  isActive: boolean;
}

export default function Satellite({ color, hovered, isActive }: SatelliteProps) {
  const satelliteRef = useRef<THREE.Group>(null);
  const dishRef = useRef<THREE.Group>(null);
  const solarWingsRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    // Drifts in floating orbits
    if (satelliteRef.current) {
      const elapsed = state.clock.getElapsedTime();
      satelliteRef.current.position.y += Math.cos(elapsed * 1.2) * 0.001;
      satelliteRef.current.position.x += Math.sin(elapsed * 0.8) * 0.0006;
      
      const targetScale = isActive ? 1.6 : hovered ? 1.3 : 1.0;
      const currentScale = satelliteRef.current.scale.x;
      const lerpedScale = THREE.MathUtils.lerp(currentScale, targetScale, 6 * delta);
      satelliteRef.current.scale.set(lerpedScale, lerpedScale, lerpedScale);

      // Rotate overall body slowly
      satelliteRef.current.rotation.y += delta * 0.08;
      satelliteRef.current.rotation.x += delta * 0.03;
    }

    // Parabolic dish aligns / sweeps dynamically
    if (dishRef.current) {
      const elapsed = state.clock.getElapsedTime();
      dishRef.current.rotation.y = Math.sin(elapsed * 0.6) * 0.3;
      dishRef.current.rotation.x = (Math.PI / 4) + Math.cos(elapsed * 0.4) * 0.15;
    }

    // Solar wings adjust orientation
    if (solarWingsRef.current) {
      solarWingsRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group ref={satelliteRef}>
      {/* 1. Main cylindrical electronics bus */}
      <mesh>
        <cylinderGeometry args={[0.06, 0.06, 0.35, 12]} />
        <meshStandardMaterial
          color="#3f3f46"
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      {/* Foil wrap core center ring */}
      <mesh scale={[1.05, 0.25, 1.05]}>
        <cylinderGeometry args={[0.06, 0.06, 0.35, 12]} />
        <meshStandardMaterial
          color="#a1a1aa"
          metalness={0.9}
          roughness={0.1}
          emissive="#d4d4d8"
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* 2. Solar panels wings */}
      <group ref={solarWingsRef}>
        {/* Left wing array */}
        <group position={[-0.3, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.22, 0.008, 0.11]} />
            <meshStandardMaterial
              color="#0f172a"
              emissive="#1e293b"
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          <mesh scale={[1.01, 1.01, 1.01]}>
            <boxGeometry args={[0.22, 0.008, 0.11]} />
            <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.25} />
          </mesh>
        </group>

        {/* Right wing array */}
        <group position={[0.3, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.22, 0.008, 0.11]} />
            <meshStandardMaterial
              color="#0f172a"
              emissive="#1e293b"
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          <mesh scale={[1.01, 1.01, 1.01]}>
            <boxGeometry args={[0.22, 0.008, 0.11]} />
            <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.25} />
          </mesh>
        </group>

        {/* Connect struts */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.01, 0.01, 0.45, 8]} />
          <meshStandardMaterial color="#a1a1aa" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* 3. Parabolic Signal Dish */}
      <group ref={dishRef} position={[0, 0.22, 0]}>
        {/* Dish bowl (Open cone) */}
        <mesh rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.16, 0.06, 16, 1, true]} />
          <meshStandardMaterial
            color="#a1a1aa"
            metalness={0.95}
            roughness={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
        
        {/* Subreflector rod and tip */}
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.004, 0.004, 0.1, 8]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0, 0.13, 0]}>
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.0} />
        </mesh>
      </group>

      {/* Signal Emission indicator beacon */}
      <pointLight
        color={color}
        intensity={isActive ? 5 : hovered ? 3.5 : 1.2}
        distance={4.5}
        decay={2}
      />
    </group>
  );
}
