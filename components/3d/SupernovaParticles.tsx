"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SupernovaProps {
  position: [number, number, number];
  color: string;
  onComplete: () => void;
}

export default function SupernovaParticles({ position, color, onComplete }: SupernovaProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 120;
  const startTime = useRef(Date.now());

  // Generate initial particle vectors
  const [positions, velocities] = useMemo(() => {
    const posArr = new Float32Array(count * 3);
    const velArr = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Start all particles at the explosion origin coordinate
      posArr[i * 3] = position[0];
      posArr[i * 3 + 1] = position[1];
      posArr[i * 3 + 2] = position[2];

      // Random expanding vector on a unit sphere
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      // Speed multiplier
      const speed = 1.0 + Math.random() * 2.8;

      velArr[i * 3] = speed * Math.sin(phi) * Math.cos(theta);
      velArr[i * 3 + 1] = speed * Math.sin(phi) * Math.sin(theta);
      velArr[i * 3 + 2] = speed * Math.cos(phi);
    }
    return [posArr, velArr];
  }, [position]);

  useFrame((state, delta) => {
    const elapsed = (Date.now() - startTime.current) / 1000;
    
    // Auto terminate after 1.5 seconds
    if (elapsed > 1.5) {
      onComplete();
      return;
    }

    if (pointsRef.current) {
      const geo = pointsRef.current.geometry;
      const posAttr = geo.attributes.position;
      
      if (posAttr) {
        for (let i = 0; i < count; i++) {
          posAttr.setX(i, posAttr.getX(i) + velocities[i * 3] * delta);
          posAttr.setY(i, posAttr.getY(i) + velocities[i * 3 + 1] * delta);
          posAttr.setZ(i, posAttr.getZ(i) + velocities[i * 3 + 2] * delta);
        }
        posAttr.needsUpdate = true;
      }

      // Linear fade to 0 opacity
      const material = pointsRef.current.material as THREE.PointsMaterial;
      if (material) {
        material.opacity = Math.max(0, 1 - elapsed / 1.5);
      }
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.14}
        color={color}
        transparent
        opacity={1.0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}
