"use client";

import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function FloatingCross() {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (groupRef.current) {
        groupRef.current.rotation.y += 0.003;
        groupRef.current.position.y += Math.sin(Date.now() * 0.0005) * 0.01;
      }
    });
    return () => clearInterval(interval);
  }, []);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Vertical bar */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.3, 3, 0.3]} />
        <meshStandardMaterial
          color="#c9a45c"
          emissive="#f0d9a3"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Horizontal bar */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2, 0.3, 0.3]} />
        <meshStandardMaterial
          color="#c9a45c"
          emissive="#f0d9a3"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Glowing sphere around cross */}
      <mesh position={[0, 0.5, 0]} scale={2.5}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#c9a45c"
          emissive="#f0d9a3"
          emissiveIntensity={0.4}
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);

  useEffect(() => {
    if (!particlesRef.current) return;

    const positions = new Float32Array(300);
    for (let i = 0; i < 300; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 20;
    }

    particlesRef.current.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const animate = () => {
      const positions = particlesRef.current!.geometry.attributes
        .position as THREE.BufferAttribute;
      for (let i = 0; i < positions.count; i++) {
        positions.array[i * 3 + 1] -= 0.02;
        if (positions.array[i * 3 + 1] < -10) {
          positions.array[i * 3 + 1] = 10;
        }
      }
      positions.needsUpdate = true;
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <points ref={particlesRef}>
      <bufferGeometry />
      <pointsMaterial
        size={0.15}
        color="#c9a45c"
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </points>
  );
}

function LightBeams() {
  return (
    <>
      {/* Multiple light sources creating realistic illumination */}
      <pointLight position={[5, 5, 5]} intensity={1} color="#f0d9a3" />
      <pointLight position={[-5, 5, 5]} intensity={0.8} color="#c9a45c" />
      <pointLight position={[0, -3, 5]} intensity={1.2} color="#ffffff" />
      <ambientLight intensity={0.5} color="#0b1f3a" />
      <directionalLight position={[10, 10, 10]} intensity={0.6} color="#c9a45c" />
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas className="h-full w-full" dpr={[1, 2]}>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      
      <LightBeams />
      <FloatingCross />
      <ParticleField />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={2}
        maxPolarAngle={Math.PI * 0.6}
        minPolarAngle={Math.PI * 0.4}
      />
    </Canvas>
  );
}
