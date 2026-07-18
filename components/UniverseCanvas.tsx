"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";
import { Milestone, milestones } from "@/data/milestones";
import MilestoneStar from "./MilestoneStar";

interface CameraControllerProps {
  selectedMilestone: Milestone | null;
  viewMode: "home" | "universe" | "recruiter" | "contact";
  gameState: "landing" | "entering" | "active";
  controlsRef: React.RefObject<any>;
}

function CameraController({ selectedMilestone, viewMode, gameState, controlsRef }: CameraControllerProps) {
  const { camera } = useThree();

  // Determine standard camera positions based on state
  const targetPos = useMemo(() => {
    const pos = new THREE.Vector3(0, 0, 10);
    if (gameState === "landing") {
      pos.set(0, 0, 20); // Cinematic wide waiting distance
    } else if (gameState === "entering") {
      pos.set(0, 0, 0.42);  // Zoom deep into the central star core
    } else {
      // gameState === "active"
      if (viewMode === "home") {
        pos.set(0, 0, 5.5); // Tight central home view
      } else if (viewMode === "universe") {
        pos.set(0, 0, 11);  // Wide universe constellation view
      } else if (viewMode === "recruiter") {
        pos.set(-3.5, 0, 12.5); // Panned left to accommodate recruiter board on right
      } else if (viewMode === "contact") {
        pos.set(5.5, 2.5, 8.5);  // Fly to secondary stellar cluster
      }
    }
    return pos;
  }, [gameState, viewMode]);

  useFrame((state, delta) => {
    const actualDelta = Math.min(delta, 0.1);
    
    // Zoom/lerp speed adjustments for smooth cinematic effects
    const lerpSpeed = gameState === "entering" ? 2.5 : 4.2;

    if (gameState === "active" && selectedMilestone) {
      const [mx, my, mz] = selectedMilestone.position;
      
      // Calculate offset camera target (looking slightly down and closer)
      const starCamTarget = new THREE.Vector3(mx, my + 0.3, mz + 2.3);
      camera.position.lerp(starCamTarget, lerpSpeed * actualDelta);
      
      if (controlsRef.current) {
        controlsRef.current.target.lerp(new THREE.Vector3(mx, my, mz), lerpSpeed * actualDelta);
        controlsRef.current.update();
      }
    } else {
      // Return to global view mode targets
      camera.position.lerp(targetPos, lerpSpeed * actualDelta);
      
      const centerTarget = new THREE.Vector3(0, 0, 0);
      if (gameState === "active") {
        if (viewMode === "recruiter") {
          centerTarget.set(-2, 0, 0);
        } else if (viewMode === "contact") {
          centerTarget.set(3, 1, 1);
        }
      }
      
      if (controlsRef.current) {
        controlsRef.current.target.lerp(centerTarget, lerpSpeed * actualDelta);
        controlsRef.current.update();
      }
    }
  });

  return null;
}

// Glowing Central Origin Star that expands to reveal the portfolio universe
function CentralCoreStar({ gameState }: { gameState: "landing" | "entering" | "active" }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.6;
      meshRef.current.rotation.x += delta * 0.2;
      const material = meshRef.current.material as THREE.MeshBasicMaterial;

      if (gameState === "landing") {
        // Slow pulsing breath effect while waiting
        const breath = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.05;
        meshRef.current.scale.set(breath, breath, breath);
      } else if (gameState === "entering") {
        // Expand core star slightly as camera zooms in close
        const current = meshRef.current.scale.x;
        const nextScale = THREE.MathUtils.lerp(current, 1.8, 3.5 * delta);
        meshRef.current.scale.set(nextScale, nextScale, nextScale);
      } else if (gameState === "active") {
        // Expand to infinity (simulate cosmic bang reveal) and fade away
        const current = meshRef.current.scale.x;
        const nextScale = THREE.MathUtils.lerp(current, 18, 2.5 * delta);
        meshRef.current.scale.set(nextScale, nextScale, nextScale);

        const currentOpacity = material.opacity;
        material.opacity = THREE.MathUtils.lerp(currentOpacity, 0, 3.5 * delta);
        
        if (material.opacity < 0.01) {
          meshRef.current.visible = false;
        }
      }
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[0.3, 3]} />
      <meshBasicMaterial
        color="#ffffff"
        transparent
        opacity={1}
        toneMapped={false}
      />
      <pointLight intensity={20} distance={15} color="#60a5fa" />
    </mesh>
  );
}

// Background starfield particles
function BackgroundStars({ gameState }: { gameState: "landing" | "entering" | "active" }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const count = 1500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const colorPalette = [
      new THREE.Color("#ffffff"),
      new THREE.Color("#60a5fa"), // Blue
      new THREE.Color("#c084fc"), // Purple
      new THREE.Color("#22d3ee"), // Cyan
    ];

    for (let i = 0; i < count; i++) {
      // Distribute stars in a spherical shell
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 12 + Math.random() * 25; // Keep background stars far out

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return [positions, colors];
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      // Celestial rotation speed increases slightly during enter zoom
      const rotateSpeed = gameState === "entering" ? 0.08 : 0.015;
      pointsRef.current.rotation.y += delta * rotateSpeed;
      pointsRef.current.rotation.x += delta * (rotateSpeed / 3);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        sizeAttenuation={true}
        vertexColors
        transparent
        opacity={0.7}
        depthWrite={false}
      />
    </points>
  );
}

// Nebula dust cloud effect using larger soft-glowing points
function NebulaDust() {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const count = 300;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    const nebulaColors = [
      new THREE.Color("#1e1b4b"), // Deep indigo
      new THREE.Color("#2e1065"), // Deep purple
      new THREE.Color("#082f49"), // Deep sky
      new THREE.Color("#111827"), // Dark grey/black
    ];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;

      const color = nebulaColors[Math.floor(Math.random() * nebulaColors.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return [positions, colors];
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta * 0.008;
      
      const elapsed = state.clock.getElapsedTime();
      const material = pointsRef.current.material as THREE.PointsMaterial;
      material.opacity = 0.22 + Math.sin(elapsed * 0.5) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={3.0}
        sizeAttenuation={true}
        vertexColors
        transparent
        opacity={0.22}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Glowing constellation connection lines connecting milestones
function ConstellationLines({ visible }: { visible: boolean }) {
  const linePoints = useMemo(() => {
    return milestones.map((m) => new THREE.Vector3(...m.position));
  }, []);

  if (!visible) return null;

  return (
    <group>
      <Line
        points={linePoints}
        color="#818cf8"
        lineWidth={0.7}
        transparent
        opacity={0.3}
      />
      <Line
        points={linePoints}
        color="#38bdf8"
        lineWidth={1.5}
        transparent
        opacity={0.12}
        blending={THREE.AdditiveBlending}
      />
    </group>
  );
}

interface UniverseCanvasProps {
  selectedMilestone: Milestone | null;
  onMilestoneSelect: (milestone: Milestone | null) => void;
  viewMode: "home" | "universe" | "recruiter" | "contact";
  gameState: "landing" | "entering" | "active";
}

export default function UniverseCanvas({
  selectedMilestone,
  onMilestoneSelect,
  viewMode,
  gameState,
}: UniverseCanvasProps) {
  const controlsRef = useRef<any>(null);

  return (
    <div className="absolute inset-0 z-0 w-full h-full bg-black pointer-events-auto select-none">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} />

        {/* Constellations and Nebula Background */}
        <BackgroundStars gameState={gameState} />
        <NebulaDust />
        <ConstellationLines visible={gameState === "active"} />

        {/* Central Core Star (Cinematic zoom anchor) */}
        <CentralCoreStar gameState={gameState} />

        {/* Constellation Milestones */}
        {gameState === "active" &&
          milestones.map((milestone) => (
            <MilestoneStar
              key={milestone.id}
              milestone={milestone}
              isActive={selectedMilestone?.id === milestone.id}
              onClick={() => onMilestoneSelect(milestone)}
            />
          ))}

        {/* Camera transition tracking controller */}
        <CameraController
          selectedMilestone={selectedMilestone}
          viewMode={viewMode}
          gameState={gameState}
          controlsRef={controlsRef}
        />

        {/* Orbital user interaction */}
        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.05}
          maxDistance={25}
          minDistance={1.8}
          enableZoom={gameState === "active" && !selectedMilestone}
          enablePan={gameState === "active" && !selectedMilestone}
          enableRotate={gameState === "active" && !selectedMilestone}
        />
      </Canvas>
    </div>
  );
}
