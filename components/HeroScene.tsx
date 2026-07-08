"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function GlowingCross() {
  const groupRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const reduceMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const particlePositions = useMemo(() => {
    const count = 260;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }

    return positions;
  }, []);

  useFrame((state) => {
    if (reduceMotion) return;

    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.28) * 0.22;
      groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.05;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.018;
    }

    if (lightRef.current) {
      lightRef.current.intensity = 1.9 + Math.sin(t * 1.4) * 0.4;
    }

    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.1 + Math.sin(t * 1.1) * 0.03;
    }
  });

  return (
    <>
      <ambientLight intensity={0.35} />

      <pointLight
        ref={lightRef}
        position={[2, 3, 4]}
        color="#ffe9c2"
        intensity={2.2}
        distance={24}
      />

      <pointLight
        position={[-3, -2, 3]}
        color="#88a6d9"
        intensity={0.6}
        distance={24}
      />

      <mesh ref={glowRef}>
        <sphereGeometry args={[2.4, 32, 32]} />
        <meshBasicMaterial
          color="#f0d9a3"
          transparent
          opacity={0.12}
        />
      </mesh>

      <group ref={groupRef}>
        <mesh>
          <boxGeometry args={[0.34, 3.1, 0.34]} />
          <meshStandardMaterial
            color="#c9a45c"
            emissive="#c9a45c"
            emissiveIntensity={0.55}
            metalness={0.35}
            roughness={0.35}
          />
        </mesh>

        <mesh position={[0, 0.55, 0]}>
          <boxGeometry args={[1.7, 0.34, 0.34]} />
          <meshStandardMaterial
            color="#c9a45c"
            emissive="#c9a45c"
            emissiveIntensity={0.55}
            metalness={0.35}
            roughness={0.35}
          />
        </mesh>
      </group>

      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>

        <pointsMaterial
          color="#f5efe0"
          size={0.028}
          transparent
          opacity={0.55}
        />
      </points>
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 8.5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      className="!absolute !inset-0"
    >
      <GlowingCross />
    </Canvas>
  );
}