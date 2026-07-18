"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { Milestone } from "@/data/milestones";

interface MilestoneStarProps {
  milestone: Milestone;
  isActive: boolean;
  onClick: () => void;
}

export default function MilestoneStar({ milestone, isActive, onClick }: MilestoneStarProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerMeshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Set document cursor style on hover
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "default";
    return () => {
      document.body.style.cursor = "default";
    };
  }, [hovered]);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    const outerMesh = outerMeshRef.current;

    if (mesh) {
      // Smoothly interpolate scale on hover or active selection
      const targetScale = isActive ? 1.8 : hovered ? 1.4 : 1.0;
      const currentScale = mesh.scale.x;
      const lerpedScale = THREE.MathUtils.lerp(currentScale, targetScale, 8 * delta);
      mesh.scale.set(lerpedScale, lerpedScale, lerpedScale);

      // Rotate the core star
      mesh.rotation.y += delta * 0.4;
      mesh.rotation.z += delta * 0.2;
    }

    if (outerMesh) {
      // Outer glow rotating counter-clockwise, breathing gently
      outerMesh.rotation.y -= delta * 0.2;
      outerMesh.rotation.x += delta * 0.1;

      // Breath effect using sine wave based on time
      const time = state.clock.getElapsedTime();
      const breath = 1 + Math.sin(time * 3) * 0.08;
      const outerScale = (isActive ? 2.2 : hovered ? 1.8 : 1.4) * breath;
      outerMesh.scale.set(outerScale, outerScale, outerScale);
    }
  });

  return (
    <group position={milestone.position}>
      {/* Invisible larger click detector area for better mobile experience */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
        }}
        visible={false}
      >
        <sphereGeometry args={[0.7, 16, 16]} />
      </mesh>

      {/* Main Core Star */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.25, 2]} />
        <meshBasicMaterial
          color={new THREE.Color(milestone.color).multiplyScalar(isActive ? 1.5 : 1)}
          toneMapped={false}
        />
      </mesh>

      {/* Outer Glow Halo / Atmosphere */}
      <mesh ref={outerMeshRef}>
        <icosahedronGeometry args={[0.25, 1]} />
        <meshBasicMaterial
          color={milestone.color}
          transparent
          opacity={isActive ? 0.35 : hovered ? 0.25 : 0.12}
          wireframe
          toneMapped={false}
        />
      </mesh>

      {/* Subtle point light source emitted by the star */}
      <pointLight
        color={milestone.color}
        intensity={isActive ? 8 : hovered ? 4 : 1.5}
        distance={6}
        decay={2}
      />

      {/* Floating Star Name Tag Card (HTML overlay) */}
      <Html
        distanceFactor={6}
        position={[0, 0.45, 0]}
        center
        className="pointer-events-none select-none transition-all duration-300"
      >
        <div
          className={`flex flex-col items-center whitespace-nowrap transition-all duration-500 ${
            isActive
              ? "scale-110 opacity-100"
              : hovered
              ? "scale-100 opacity-100 translate-y-[-4px]"
              : "scale-90 opacity-40"
          }`}
        >
          {/* Futuristic Connecting Dot-Line */}
          <div
            className={`w-[1px] h-3 transition-colors duration-300 ${
              isActive ? "bg-blue-400" : hovered ? "bg-white/50" : "bg-white/20"
            }`}
          />
          
          {/* Label Container */}
          <div
            className={`px-3 py-1 rounded-full text-[10px] font-display tracking-[0.15em] uppercase font-semibold border backdrop-blur-md transition-all duration-300 ${
              isActive
                ? "bg-blue-950/80 border-blue-400 text-blue-300 shadow-[0_0_12px_rgba(96,165,250,0.4)]"
                : hovered
                ? "bg-zinc-900/80 border-white/30 text-white shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                : "bg-black/60 border-white/10 text-white/70"
            }`}
          >
            {milestone.title}
          </div>
        </div>
      </Html>
    </group>
  );
}
