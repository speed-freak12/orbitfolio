"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PlanetProps {
  color: string;
  radius: number;
  hasRings: boolean;
  hovered: boolean;
  isActive: boolean;
}

export default function Planet({ color, radius, hasRings, hovered, isActive }: PlanetProps) {
  const planetRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const moonRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();

    if (planetRef.current) {
      // 1. Slow automatic rotation combined with pointer coordinates tracking (cursor attraction)
      const targetRotateX = state.pointer.y * 0.25;
      const targetRotateY = (elapsed * 0.1) + (state.pointer.x * 0.3);
      
      planetRef.current.rotation.x = THREE.MathUtils.lerp(planetRef.current.rotation.x, targetRotateX, 4 * delta);
      planetRef.current.rotation.y = THREE.MathUtils.lerp(planetRef.current.rotation.y, targetRotateY, 4 * delta);
      
      // 2. Interpolate scale on hover or active selection
      const targetScale = isActive ? 1.6 : hovered ? 1.3 : 1.0;
      const currentScale = planetRef.current.scale.x;
      const lerpedScale = THREE.MathUtils.lerp(currentScale, targetScale, 6 * delta);
      planetRef.current.scale.set(lerpedScale, lerpedScale, lerpedScale);
    }

    // 3. Slow breathing pulse on the core planet scale
    if (coreRef.current) {
      const pulse = 1 + Math.sin(elapsed * 2.2) * 0.035;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }

    // Spin atmosphere shell in opposite direction
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y -= delta * 0.08;
      atmosphereRef.current.rotation.x += delta * 0.02;
    }

    // Orbiting moon
    if (moonRef.current) {
      const orbitSpeed = elapsed * 1.6;
      const orbitRadius = radius * 1.95;
      moonRef.current.position.set(
        Math.cos(orbitSpeed) * orbitRadius,
        Math.sin(orbitSpeed * 0.5) * (orbitRadius * 0.25),
        Math.sin(orbitSpeed) * orbitRadius
      );
      moonRef.current.rotation.y += delta * 1.2;
    }
  });

  return (
    <group ref={planetRef}>
      {/* Solid Core Planet Sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.7}
          metalness={0.2}
          emissive={color}
          emissiveIntensity={isActive ? 0.45 : hovered ? 0.25 : 0.08}
        />
      </mesh>

      {/* Holographic wireframe atmosphere envelope */}
      <mesh ref={atmosphereRef} scale={[1.08, 1.08, 1.08]}>
        <sphereGeometry args={[radius, 14, 14]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={isActive ? 0.28 : hovered ? 0.18 : 0.06}
          toneMapped={false}
        />
      </mesh>

      {/* Orbiting moon Node */}
      <mesh ref={moonRef}>
        <sphereGeometry args={[radius * 0.18, 8, 8]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={color}
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Planetary rings */}
      {hasRings && (
        <mesh rotation={[Math.PI / 2.6, 0, 0]}>
          <ringGeometry args={[radius * 1.35, radius * 2.1, 48]} />
          <meshStandardMaterial
            color={color}
            side={THREE.DoubleSide}
            transparent
            opacity={isActive ? 0.55 : hovered ? 0.35 : 0.12}
            roughness={0.8}
            metalness={0.1}
            toneMapped={false}
          />
        </mesh>
      )}

      {/* Emitted Point Light */}
      <pointLight
        color={color}
        intensity={isActive ? 6 : hovered ? 4 : 1.2}
        distance={5}
        decay={2}
      />
    </group>
  );
}
