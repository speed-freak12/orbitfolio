"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SpaceStationProps {
  color: string;
  hovered: boolean;
  isActive: boolean;
}

export default function SpaceStation({ color, hovered, isActive }: SpaceStationProps) {
  const stationRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const panelsRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    // Slow drift of the entire space station
    if (stationRef.current) {
      const time = state.clock.getElapsedTime();
      stationRef.current.position.y += Math.sin(time * 1.5) * 0.001;
      
      const targetScale = isActive ? 1.6 : hovered ? 1.3 : 1.0;
      const currentScale = stationRef.current.scale.x;
      const lerpedScale = THREE.MathUtils.lerp(currentScale, targetScale, 6 * delta);
      stationRef.current.scale.set(lerpedScale, lerpedScale, lerpedScale);

      // Rotate overall station slowly
      stationRef.current.rotation.y += delta * 0.1;
    }

    // Spin the outer ring counter-clockwise
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.8;
    }

    // Spin/flutter solar arrays gently
    if (panelsRef.current) {
      panelsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime()) * 0.05;
    }
  });

  return (
    <group ref={stationRef}>
      {/* 1. Core Module (Cylinder) */}
      <mesh>
        <cylinderGeometry args={[0.07, 0.07, 0.7, 16]} />
        <meshStandardMaterial
          color="#3f3f46"
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={1.0}
        />
      </mesh>

      {/* 2. Docking nodes at poles */}
      <mesh position={[0, 0.35, 0]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, -0.35, 0]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>

      {/* 3. Rotating Command Ring (Torus) */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.3, 0.02, 12, 48]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isActive ? 1.5 : hovered ? 1.0 : 0.4}
          metalness={0.8}
          roughness={0.2}
          wireframe
        />
      </mesh>

      {/* Connecting struts */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.015, 0.015, 0.6, 8]} />
        <meshStandardMaterial color="#71717a" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh rotation={[0, Math.PI / 4, Math.PI / 2]}>
        <cylinderGeometry args={[0.015, 0.015, 0.6, 8]} />
        <meshStandardMaterial color="#71717a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* 4. Solar Arrays (Solar Panels) */}
      <group ref={panelsRef} position={[0, 0, 0]}>
        {/* Panel Left */}
        <group position={[-0.45, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.35, 0.01, 0.18]} />
            <meshStandardMaterial
              color="#0f172a"
              emissive="#1e3a8a"
              emissiveIntensity={hovered ? 0.8 : 0.3}
              metalness={0.9}
              roughness={0.05}
            />
          </mesh>
          {/* Wireframe grids for panels to make them look technological */}
          <mesh scale={[1.01, 1.01, 1.01]}>
            <boxGeometry args={[0.35, 0.01, 0.18]} />
            <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.3} />
          </mesh>
        </group>

        {/* Panel Right */}
        <group position={[0.45, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.35, 0.01, 0.18]} />
            <meshStandardMaterial
              color="#0f172a"
              emissive="#1e3a8a"
              emissiveIntensity={hovered ? 0.8 : 0.3}
              metalness={0.9}
              roughness={0.05}
            />
          </mesh>
          <mesh scale={[1.01, 1.01, 1.01]}>
            <boxGeometry args={[0.35, 0.01, 0.18]} />
            <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.3} />
          </mesh>
        </group>
      </group>

      {/* Glowing Indicator beacon light */}
      <pointLight
        color={color}
        intensity={isActive ? 6 : hovered ? 4 : 1.5}
        distance={4}
        decay={2}
      />
    </group>
  );
}
