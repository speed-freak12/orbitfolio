"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";
import { CareerEntity, careerEntities } from "@/data/milestones";
import Planet from "./3d/Planet";
import SpaceStation from "./3d/SpaceStation";
import Satellite from "./3d/Satellite";
import SupernovaParticles from "./3d/SupernovaParticles";
import { Html } from "@react-three/drei";

interface CameraControllerProps {
  selectedEntity: CareerEntity | null;
  viewMode: "home" | "universe" | "recruiter" | "contact";
  gameState: "landing" | "entering" | "active";
  controlsRef: React.RefObject<any>;
}

function CameraController({ selectedEntity, viewMode, gameState, controlsRef }: CameraControllerProps) {
  const { camera } = useThree();

  const targetPos = useMemo(() => {
    const pos = new THREE.Vector3(0, 0, 10);
    if (gameState === "landing") {
      pos.set(0, 0, 20);
    } else if (gameState === "entering") {
      pos.set(0, 0, 0.42);
    } else {
      if (viewMode === "home") {
        pos.set(0, 0, 4.8);
      } else if (viewMode === "universe") {
        pos.set(0, 0, 10.5);
      } else if (viewMode === "recruiter") {
        pos.set(-3.2, 0, 11.5);
      } else if (viewMode === "contact") {
        const sat = careerEntities.find((e) => e.type === "satellite");
        if (sat) {
          const [sx, sy, sz] = sat.position;
          pos.set(sx - 0.2, sy + 0.25, sz + 1.85);
        } else {
          pos.set(5.0, -2.5, 3.5);
        }
      }
    }
    return pos;
  }, [gameState, viewMode]);

  useFrame((state, delta) => {
    const actualDelta = Math.min(delta, 0.1);
    
    // Adjusted lerpSpeed from 4.0 to 2.6 for realistic fluid camera momentum (inertia)
    const lerpSpeed = gameState === "entering" ? 2.5 : 2.6;

    if (gameState === "active" && selectedEntity) {
      const [mx, my, mz] = selectedEntity.position;
      
      let cameraDistance = 2.0;
      let heightOffset = 0.22;
      
      if (selectedEntity.type === "planet") {
        cameraDistance = (selectedEntity.radius || 0.3) * 4.6;
        heightOffset = 0.12;
      } else if (selectedEntity.type === "station") {
        cameraDistance = 1.85;
      } else if (selectedEntity.type === "satellite") {
        cameraDistance = 1.75;
      }

      const camTarget = new THREE.Vector3(mx, my + heightOffset, mz + cameraDistance);
      camera.position.lerp(camTarget, lerpSpeed * actualDelta);
      
      if (controlsRef.current) {
        controlsRef.current.target.lerp(new THREE.Vector3(mx, my, mz), lerpSpeed * actualDelta);
        controlsRef.current.update();
      }
    } else {
      camera.position.lerp(targetPos, lerpSpeed * actualDelta);
      
      const centerTarget = new THREE.Vector3(0, 0, 0);
      if (gameState === "active") {
        if (viewMode === "recruiter") {
          centerTarget.set(-2.0, 0, 0);
        } else if (viewMode === "contact") {
          const sat = careerEntities.find((e) => e.type === "satellite");
          if (sat) centerTarget.set(...sat.position);
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

// Procedural Shooting Star streak
function ShootingStar() {
  const lineRef = useRef<any>(null);
  const speed = 14;
  const active = useRef(false);
  const direction = useMemo(() => new THREE.Vector3(1.2, -0.4, 0.1).normalize(), []);
  const startPos = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    if (!lineRef.current) return;
    
    if (!active.current) {
      // Periodically spawn (0.4% chance per frame)
      if (Math.random() < 0.004) {
        active.current = true;
        startPos.set(
          (Math.random() - 0.5) * 20 - 6,
          (Math.random() - 0.5) * 12 + 6,
          (Math.random() - 0.5) * 15 - 5
        );
        lineRef.current.position.copy(startPos);
        lineRef.current.visible = true;
      } else {
        lineRef.current.visible = false;
      }
    } else {
      lineRef.current.position.addScaledVector(direction, speed * delta);
      const mat = lineRef.current.material as THREE.LineBasicMaterial;
      const dist = lineRef.current.position.distanceTo(startPos);
      
      // Fade out opacity after moving past 8 units
      mat.opacity = Math.max(0, 1 - dist / 8.0);
      
      if (mat.opacity <= 0.02) {
        active.current = false;
        lineRef.current.visible = false;
      }
    }
  });

  const points = useMemo(() => [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.5, -0.16, 0.04)], []);

  return (
    <Line
      ref={lineRef}
      points={points}
      color="#38bdf8"
      lineWidth={1.5}
      transparent
      opacity={0}
      blending={THREE.AdditiveBlending}
    />
  );
}

// Skill Orbs cell
function TechOrbs({ color, hovered, isActive }: { color: string; hovered: boolean; isActive: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
      groupRef.current.rotation.x += delta * 0.15;
      
      const targetScale = isActive ? 1.5 : hovered ? 1.25 : 1.0;
      const current = groupRef.current.scale.x;
      const lerped = THREE.MathUtils.lerp(current, targetScale, 6 * delta);
      groupRef.current.scale.set(lerped, lerped, lerped);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <dodecahedronGeometry args={[0.2, 1]} />
        <meshStandardMaterial
          color={color}
          wireframe
          emissive={color}
          emissiveIntensity={isActive ? 1.8 : hovered ? 1.2 : 0.45}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      <mesh position={[0.3, 0.25, -0.1]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </mesh>
      <mesh position={[-0.25, -0.3, 0.2]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshBasicMaterial color="#38bdf8" toneMapped={false} />
      </mesh>
      <mesh position={[0.15, -0.2, -0.35]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color="#a7f3d0" toneMapped={false} />
      </mesh>

      <pointLight
        color={color}
        intensity={isActive ? 6 : hovered ? 4 : 1.2}
        distance={4.5}
        decay={2}
      />
    </group>
  );
}

interface EntityNodeProps {
  entity: CareerEntity;
  isActive: boolean;
  onClick: () => void;
  onSupernova: (pos: [number, number, number], col: string) => void;
}

function EntityNode({ entity, isActive, onClick, onSupernova }: EntityNodeProps) {
  const [hovered, setHovered] = useState(false);
  const clickCount = useRef(0);
  const doubleClickTimeout = useRef<any>(null);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = "pointer";
    }
    return () => {
      document.body.style.cursor = "default";
    };
  }, [hovered]);

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    clickCount.current += 1;

    if (clickCount.current === 1) {
      doubleClickTimeout.current = setTimeout(() => {
        onClick();
        clickCount.current = 0;
      }, 250);
    } else if (clickCount.current === 2) {
      clearTimeout(doubleClickTimeout.current);
      onSupernova(entity.position, entity.color);
      clickCount.current = 0;
    }
  };

  return (
    <group position={entity.position}>
      <mesh
        onPointerDown={handlePointerDown}
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
        <sphereGeometry args={[0.65, 16, 16]} />
      </mesh>

      {entity.type === "planet" && (
        <Planet
          color={entity.color}
          radius={entity.radius || 0.3}
          hasRings={!!entity.hasRings}
          hovered={hovered}
          isActive={isActive}
        />
      )}

      {entity.type === "station" && (
        <SpaceStation
          color={entity.color}
          hovered={hovered}
          isActive={isActive}
        />
      )}

      {entity.type === "satellite" && (
        <Satellite
          color={entity.color}
          hovered={hovered}
          isActive={isActive}
        />
      )}

      {entity.type === "orbs" && (
        <TechOrbs
          color={entity.color}
          hovered={hovered}
          isActive={isActive}
        />
      )}

      {entity.type === "constellation" && (
        <group>
          <mesh>
            <octahedronGeometry args={[0.22]} />
            <meshStandardMaterial
              color={entity.color}
              emissive={entity.color}
              emissiveIntensity={isActive ? 1.5 : hovered ? 1.0 : 0.3}
              wireframe
            />
          </mesh>
          <pointLight color={entity.color} intensity={isActive ? 5 : hovered ? 3 : 1.0} distance={4} />
        </group>
      )}

      <Html
        distanceFactor={6}
        position={[0, 0.5, 0]}
        center
        className="pointer-events-none select-none transition-all duration-300"
      >
        <div
          className={`flex flex-col items-center whitespace-nowrap transition-all duration-500 ${
            isActive
              ? "scale-110 opacity-100"
              : hovered
              ? "scale-100 opacity-100 translate-y-[-4px]"
              : "scale-90 opacity-45"
          }`}
        >
          <div
            className={`px-3 py-1 rounded-md text-[9px] font-display tracking-[0.2em] uppercase font-bold border backdrop-blur-md transition-all duration-300 ${
              isActive
                ? "bg-blue-950/80 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.4)]"
                : hovered
                ? "bg-zinc-900/80 border-white/30 text-white shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                : "bg-black/60 border-white/10 text-white/70"
            }`}
          >
            {entity.title}
          </div>
        </div>
      </Html>
    </group>
  );
}

// Background stars with twinkling oscillations
function BackgroundStars({ gameState, warpActive }: { gameState: string; warpActive: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1500;

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = ["#ffffff", "#60a5fa", "#c084fc", "#22d3ee"];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

      const col = new THREE.Color(palette[Math.floor(Math.random() * palette.length)]);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }
    return [positions, colors];
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      const geo = pointsRef.current.geometry;
      const posAttr = geo.attributes.position;
      const speed = warpActive ? 42.0 : gameState === "entering" ? 8.0 : 0.35;

      if (posAttr) {
        for (let i = 0; i < count; i++) {
          let z = posAttr.getZ(i);
          z += speed * delta;
          
          if (z > 22) {
            z = -25;
            posAttr.setX(i, (Math.random() - 0.5) * 40);
            posAttr.setY(i, (Math.random() - 0.5) * 30);
          }
          posAttr.setZ(i, z);
        }
        posAttr.needsUpdate = true;
      }
      
      pointsRef.current.rotation.y += delta * 0.01;

      // Twinkling amplitude modulation using sine waves over clocks
      const mat = pointsRef.current.material as THREE.PointsMaterial;
      if (mat && !warpActive) {
        mat.opacity = 0.55 + Math.sin(state.clock.getElapsedTime() * 3.5) * 0.15;
      } else if (mat && warpActive) {
        mat.opacity = 0.95;
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
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={warpActive ? 0.16 : 0.075}
        sizeAttenuation={true}
        vertexColors
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function NebulaDust() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 250;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const palette = [new THREE.Color("#1e1b4b"), new THREE.Color("#2e1065"), new THREE.Color("#082f49")];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;

      const color = palette[Math.floor(Math.random() * palette.length)];
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
    }
    return [pos, cols];
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta * 0.006;
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
        size={3.2}
        sizeAttenuation={true}
        vertexColors
        transparent
        opacity={0.25}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CentralOriginStar({ gameState }: { gameState: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.rotation.x += delta * 0.15;
      const material = meshRef.current.material as THREE.MeshBasicMaterial;

      if (gameState === "landing") {
        const pulse = 1 + Math.sin(state.clock.getElapsedTime() * 3) * 0.08;
        meshRef.current.scale.set(pulse, pulse, pulse);
      } else if (gameState === "entering") {
        const current = meshRef.current.scale.x;
        const next = THREE.MathUtils.lerp(current, 2.2, 4.0 * delta);
        meshRef.current.scale.set(next, next, next);
      } else if (gameState === "active") {
        const current = meshRef.current.scale.x;
        const next = THREE.MathUtils.lerp(current, 22.0, 2.5 * delta);
        meshRef.current.scale.set(next, next, next);

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
      <meshBasicMaterial color="#ffffff" transparent opacity={1.0} toneMapped={false} />
      <pointLight intensity={25} distance={15} color="#38bdf8" />
    </mesh>
  );
}

function ConstellationLines({ visible }: { visible: boolean }) {
  const points = useMemo(() => {
    return careerEntities
      .filter((e) => e.type !== "star")
      .map((e) => new THREE.Vector3(...e.position));
  }, []);

  if (!visible) return null;

  return (
    <group>
      <Line points={points} color="#818cf8" lineWidth={0.7} transparent opacity={0.25} />
      <Line points={points} color="#22d3ee" lineWidth={1.5} transparent opacity={0.1} blending={THREE.AdditiveBlending} />
    </group>
  );
}

interface UniverseCanvasProps {
  selectedEntity: CareerEntity | null;
  onEntitySelect: (entity: CareerEntity | null) => void;
  viewMode: "home" | "universe" | "recruiter" | "contact";
  gameState: "landing" | "entering" | "active";
  warpActive: boolean;
}

export default function UniverseCanvas({
  selectedEntity,
  onEntitySelect,
  viewMode,
  gameState,
  warpActive,
}: UniverseCanvasProps) {
  const controlsRef = useRef<any>(null);
  const [supernovas, setSupernovas] = useState<{ id: string; position: [number, number, number]; color: string }[]>([]);

  const handleSupernova = (pos: [number, number, number], col: string) => {
    const id = Math.random().toString();
    setSupernovas((prev) => [...prev, { id, position: pos, color: col }]);
  };

  return (
    <div className="absolute inset-0 z-0 w-full h-full bg-black pointer-events-auto select-none">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        // Clicking in empty canvas space triggers fly-back (selection reset)
        onPointerMissed={() => onEntitySelect(null)}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 15, 10]} intensity={1.5} />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} />

        <BackgroundStars gameState={gameState} warpActive={warpActive} />
        <NebulaDust />
        <ConstellationLines visible={gameState === "active"} />

        <CentralOriginStar gameState={gameState} />

        {gameState === "active" &&
          careerEntities.map((entity) => (
            <EntityNode
              key={entity.id}
              entity={entity}
              isActive={selectedEntity?.id === entity.id}
              onClick={() => onEntitySelect(entity)}
              onSupernova={handleSupernova}
            />
          ))}

        {/* Dynamic shooting stars flashing periodically */}
        {gameState === "active" && (
          <>
            <ShootingStar />
            <ShootingStar />
          </>
        )}

        {supernovas.map((s) => (
          <SupernovaParticles
            key={s.id}
            position={s.position}
            color={s.color}
            onComplete={() => setSupernovas((prev) => prev.filter((x) => x.id !== s.id))}
          />
        ))}

        <CameraController
          selectedEntity={selectedEntity}
          viewMode={viewMode}
          gameState={gameState}
          controlsRef={controlsRef}
        />

        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.05}
          maxDistance={25}
          minDistance={1.8}
          enableZoom={gameState === "active" && !selectedEntity}
          enablePan={gameState === "active" && !selectedEntity}
          enableRotate={gameState === "active" && !selectedEntity}
        />
      </Canvas>
    </div>
  );
}
